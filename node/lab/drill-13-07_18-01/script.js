const fs = require('node:fs');
const { execSync } = require('node:child_process');

// 1. Забираем аргументы из консоли
const args = process.argv.slice(2);
const stream = args[0];
const hoursStr = args[1];
const descArr = args.slice(2);

// Проверка входных данных
if (!stream || !hoursStr || descArr.length === 0) {
  console.log('❌ Ошибка: мало данных.');
  console.log('Использование: node telemetry.js <Поток> <Часы> "<Описание>"');
  console.log('Пример: node telemetry.js Node.js 1.5 "Стримы и буферы"');
  process.exit(1);
}

const hours = parseFloat(hoursStr);
const desc = descArr.join(' ');
// Форматируем дату как DD.MM.YYYY
const date = new Date().toLocaleDateString('ru-RU');

// 2. Добавляем запись в log.md (в НАЧАЛО таблицы)
const logEntry = `| ${date} | ${stream} | ${hours} | ${desc} |`;
let logLines = fs.readFileSync('log.md', 'utf-8').split('\n');

// Ищем строку, где находится разделитель таблицы
const separatorIndex = logLines.findIndex((line) => line.includes(':---'));

if (separatorIndex !== -1) {
  // Вставляем новую запись сразу под разделителем
  logLines.splice(separatorIndex + 1, 0, logEntry);
  fs.writeFileSync('log.md', logLines.join('\n'));
} else {
  // Если разделитель не найден (файл сломан), дописываем в конец
  fs.appendFileSync('log.md', logEntry + '\n');
}

// 3. Парсим log.md и считаем общую сумму часов
const logContent = fs.readFileSync('log.md', 'utf-8');
const totalHours = logContent
  .split('\n')
  // Отбираем только строки таблицы, игнорируем шапку и разделители
  .filter(
    (line) =>
      line.startsWith('|') && !line.includes('Часы') && !line.includes(':---'),
  )
  .reduce((sum, line) => {
    const parts = line.split('|');
    if (parts.length > 3) {
      const h = parseFloat(parts[3].trim());
      return sum + (isNaN(h) ? 0 : h);
    }
    return sum;
  }, 0);

// 4. Математика прогресса
const MAX_GLOBAL = 12480;
const MAX_PHASE1 = 2080;

const globalPercent = ((totalHours / MAX_GLOBAL) * 100).toFixed(2);
// Фаза 1 не должна превышать 100% (2080 часов)
const phase1Hours = Math.min(totalHours, MAX_PHASE1);
const phase1Percent = ((phase1Hours / MAX_PHASE1) * 100).toFixed(2);

// Функция отрисовки ASCII-бара (длина 50 символов)
const makeBar = (percent) => {
  const filledCount = Math.floor(percent / 2);
  const emptyCount = 50 - filledCount;
  return (
    '█'.repeat(Math.max(0, filledCount)) + '░'.repeat(Math.max(0, emptyCount))
  );
};

// 5. Перезаписываем README.md новыми данными
let readme = fs.readFileSync('README.md', 'utf-8');

// Заменяем блок Глобального трека
readme = readme.replace(
  /\*\*Глобальный трек \([0-9.]+ \/ 12 480 часов\):\*\*\n`\[.*?\]` \*\*[0-9.]+\%\*\*/,
  `**Глобальный трек (${totalHours} / 12 480 часов):**\n\`[${makeBar(globalPercent)}]\` **${globalPercent}%**`,
);

// Заменяем блок Фазы 1
readme = readme.replace(
  /\*\*Фаза 1: Фундамент \([0-9.]+ \/ 2 080 часов\):\*\*\n`\[.*?\]` \*\*[0-9.]+\%\*\*/,
  `**Фаза 1: Фундамент (${phase1Hours} / 2 080 часов):**\n\`[${makeBar(phase1Percent)}]\` **${phase1Percent}%**`,
);

// Обновляем дату
readme = readme.replace(
  /\*Последнее обновление: .*\*/,
  `*Последнее обновление: ${date}*`,
);

fs.writeFileSync('README.md', readme);

// 6. Коммит (телеметрия)
console.log(`✅ Данные записаны. Всего часов в ядре: ${totalHours}`);

try {
  execSync('git add log.md README.md telemetry.js');
  execSync(`git commit -m "telemetry: ${date} | ${stream} | +${hours}h"`);
  // execSync('git push origin main'); // Раскомментируй, когда захочешь, чтобы он сам пушил на GitHub
  console.log('✅ Коммит успешно создан.');
} catch (error) {
  console.log('⚠️ Изменений для коммита не найдено или произошла ошибка Git.');
}
