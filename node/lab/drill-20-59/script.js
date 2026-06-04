// Drill: drill-20-59
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');
const fs = require('fs');
const path = require('path');

// Путь к нашей картинке
const filePath = path.join(__dirname, 'image.png');

try {
  // Читаем файл в сырой буфер (без указания кодировки!)
  const buffer = fs.readFileSync(filePath);

  console.log(
    `Файл успешно прочитан. Размер на диске: ${buffer.length} байт.\n`,
  );

  // =======================================================
  // ЭТАП 1: Проверка сигнатуры (Magic Bytes)
  // =======================================================
  // Эталонная сигнатура PNG (8 байт)
  const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

  let isPNG = true;
  for (let i = 0; i < 8; i++) {
    if (buffer[i] !== pngSignature[i]) {
      isPNG = false;
      break;
    }
  }

  if (!isPNG) {
    console.error('Критическая ошибка: Файл не является валидным PNG!');
    process.exit(1);
  }

  console.log('Проверка сигнатуры пройдена: Это настоящий PNG-файл.');

  // Выведем первые 8 байт в шестнадцатеричном виде для наглядности
  const hexSignature = buffer
    .subarray(0, 8)
    .toString('hex')
    .toUpperCase()
    .match(/.{1,2}/g)
    .join(' ');
  console.log(`Магические байты файла: ${hexSignature}\n`);

  // =======================================================
  // ЭТАП 2: Парсинг чанка IHDR (Ширина и Высота)
  // =======================================================
  // Проверяем, что следующий блок — это действительно IHDR
  const chunkType = buffer.toString('ascii', 12, 16);
  console.log(`Тип первого чанка: ${chunkType}`);

  if (chunkType !== 'IHDR') {
    console.error('Ошибка: Ожидался заголовок IHDR');
    process.exit(1);
  }

  // Читаем ширину (смещение 16, длина 4 байта)
  // Используем метод BE (Big Endian), потому что PNG хранит данные инвертировано для нашего CPU
  const width = buffer.readInt32BE(16);

  // Читаем высоту (смещение 20, длина 4 байта)
  const height = buffer.readInt32BE(20);

  // Дополнительные метаданные, которые лежат следом
  const bitDepth = buffer[24]; // Глубина цвета (1 байт)
  const colorType = buffer[25]; // Тип цвета (1 байт: 2 - RGB, 6 - RGBA и т.д.)

  console.log('\n--- РЕЗУЛЬТАТ ПАРСИНГА ---');
  console.log(`Ширина:  ${width} px`);
  console.log(`Высота: ${height} px`);
  console.log(`Глубина цвета: ${bitDepth} бит`);
  console.log(`Режим цвета (Color Type): ${colorType}`);
} catch (err) {
  console.error('Ошибка при работе с файлом:', err.message);
}
