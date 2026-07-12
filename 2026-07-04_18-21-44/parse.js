"use strict";

import fs from 'node:fs';
import readline from 'node:readline';
import EventEmitter from 'node:events';

/**
 * МОДУЛЬ 1: ДИСПЕТЧЕР, СОСТОЯНИЕ И ПУЛ ВОРКЕРОВ (Scheduler & WAL)
 */
export default class Scheduler extends EventEmitter {
  constructor(options = {}) {
    super();
    
    // Защита от 0 или отрицательных чисел через Math.max. Оператор ?? для проверки на null/undefined
    this.concurrency = Math.max(1, options.concurrency ?? 5);
    this.walPath = options.walPath ?? './progress.wal';
    
    this.queue = [];           // Очередь URL на обработку
    this.visited = new Set();  // Фильтр от дубликатов (простейший Bloom Filter)
    this.activeWorkers = 0;    // Текущие активные потоки
    
    this.isShuttingDown = false;
    this.walStream = null;
  }

  /**
   * ИНИЦИАЛИЗАЦИЯ: Читаем Несгораемый журнал (WAL)
   */
  async init() {
    // Если walPath передали как пустую строку "" — отключаем запись на диск (In-Memory режим)
    if (!this.walPath) {
      console.log(`[ДИСПЕТЧЕР] WAL отключен. Работаем только в оперативной памяти.`);
      return;
    }

    console.log(`[ДИСПЕТЧЕР] Чтение журнала состояний: ${this.walPath}`);
    
    if (fs.existsSync(this.walPath)) {
      const fileStream = fs.createReadStream(this.walPath);
      const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

      // Восстанавливаем очередь из файла
      for await (const line of rl) {
        if (!line.trim()) continue;
        const entry = JSON.parse(line);
        
        if (entry.status === 'COMPLETED') {
          this.visited.add(entry.url);
        } else if (entry.status === 'PENDING' || entry.status === 'FAILED') {
          if (!this.visited.has(entry.url)) {
            this.queue.push(entry.url);
            this.visited.add(entry.url);
          }
        }
      }
    }

    // Открываем файловый поток для дозаписи (flags: 'a')
    this.walStream = fs.createWriteStream(this.walPath, { flags: 'a' });
    console.log(`[ДИСПЕТЧЕР] Инициализация завершена. В очереди: ${this.queue.length}`);
  }

  /**
   * Добавление стартовых URL (семян)
   */
  addSeedUrls(urls) {
    for (const url of urls) {
      if (!this.visited.has(url)) {
        this.visited.add(url);
        this.queue.push(url);
        this._writeWal(url, 'PENDING');
      }
    }
    this.emit('tick'); // Будим пул воркеров
  }

  /**
   * ЗАПУСК: Главный цикл и управление пулом (Fork/Join)
   */
  async start(workerFn) {
    console.log(`[ДИСПЕТЧЕР] Запуск пула. Конкурентность: ${this.concurrency}`);
    
    this._setupGracefulShutdown();

    while (!this.isShuttingDown) {
      // Выход, если работа закончилась
      if (this.queue.length === 0 && this.activeWorkers === 0) {
        break;
      }

      // Если все воркеры заняты или очередь пуста — засыпаем до сигнала 'tick'
      if (this.activeWorkers >= this.concurrency || this.queue.length === 0) {
        await new Promise(resolve => this.once('tick', resolve));
        continue;
      }

      const url = this.queue.shift();
      this.activeWorkers++;
      
      // FORK: Запуск воркера без await, чтобы не блокировать цикл
      this._dispatchWorker(url, workerFn);
    }

    await this._finalizeShutdown();
  }

  /**
   * Изолированная логика выполнения одной задачи
   */
  async _dispatchWorker(url, workerFn) {
    try {
      this._writeWal(url, 'PROCESSING');
      
      const result = await workerFn(url);

      // Петля обратной связи (Динамическая пагинация)
      if (result && result.nextCursor && !this.visited.has(result.nextCursor)) {
        console.log(`[ДИСПЕТЧЕР] Найден следующий токен: ${result.nextCursor}`);
        this.visited.add(result.nextCursor);
        this.queue.push(result.nextCursor);
        this._writeWal(result.nextCursor, 'PENDING');
      }

      this._writeWal(url, 'COMPLETED');
    } catch (error) {
      console.error(`[АВАРИЯ] Ошибка на URL ${url}:`, error.message);
      this._writeWal(url, 'FAILED');
    } finally {
      // JOIN: Воркер освободился
      this.activeWorkers--;
      this.emit('tick'); // Будим главный цикл
    }
  }

  /**
   * Запись в WAL-файл в формате NDJSON
   */
  _writeWal(url, status) {
    if (this.walStream) {
      const entry = JSON.stringify({ url, status, ts: Date.now() });
      this.walStream.write(entry + '\n');
    }
  }

  /**
   * Перехват Ctrl+C (SIGINT)
   */
  _setupGracefulShutdown() {
    process.on('SIGINT', () => {
      console.log('\n[СИСТЕМА] Получен сигнал SIGINT (Ctrl+C). Остановка приема новых задач...');
      this.isShuttingDown = true;
      this.emit('tick');
    });
  }

  /**
   * Корректное закрытие: ждем завершения активных запросов
   */
  async _finalizeShutdown() {
    if (this.isShuttingDown && this.activeWorkers > 0) {
      console.log(`[СИСТЕМА] Ожидание возвращения ${this.activeWorkers} курьеров...`);
      while (this.activeWorkers > 0) {
        await new Promise(resolve => this.once('tick', resolve));
      }
    }
    
    console.log('[СИСТЕМА] Все потоки завершены. Закрытие журналов. Безопасный выход.');
    if (this.walStream) {
      this.walStream.end();
    }
  }
}
