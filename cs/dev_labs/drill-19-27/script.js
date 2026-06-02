const buf = Buffer.alloc(8);
buf.writeDoubleLE(0.1, 0);

console.log('--- 1. Байт за байтом в двоичном виде ---');
for (let i = 0; i < buf.length; i++) {
  // Используем padStart, чтобы JS не съедал ведущие нули (например, 00001010 превратится в 1010 без него)
  const binaryStr = buf[i].toString(2).padStart(8, '0');
  console.log(
    `Байт ${i} (hex: ${buf[i].toString(16).padStart(2, '0')}): ${binaryStr}`,
  );
}

console.log('\n--- 2. Чтение со смещением (Сбой выравнивания) ---');
// Создаем буфер чуть больше, чтобы было куда смещаться
const offsetBuf = Buffer.alloc(9);
offsetBuf.writeDoubleLE(0.1, 1); // Записали число, начиная с 1-го байта

// Читаем правильно:
console.log('Правильное чтение (offset 1):', offsetBuf.readDoubleLE(1));
// Пытаемся прочитать те же байты, но ошиблись адресом на 1 байт (читаем с 0-го):
console.log('Ошибочное чтение (offset 0):', offsetBuf.readDoubleLE(0));
// Результат будет абсолютно непредсказуемым хаосом, потому что мантисса сместилась в зону экспоненты.

console.log('\n--- 3. Сборка кастомного заголовка файла ---');
// Допустим, мы проектируем свой формат файла.
// 2 байта под сигнатуру (AB) + 8 байт под число = 10 байт.
const filePacket = Buffer.alloc(10);

// Записываем заголовок (Magic Bytes)
filePacket[0] = 0x41; // 'A' в таблице ASCII
filePacket[1] = 0x42; // 'B' в таблице ASCII

// Записываем полезную нагрузку (payload) строго после заголовка, со смещением 2
filePacket.writeDoubleLE(0.1, 2);

console.log('Сырой бинарный пакет:', filePacket);
// Ожидаемый результат: <Buffer 41 42 9a 99 99 99 99 99 b9 3f>

// Проверяем, можем ли мы прочитать сигнатуру обратно:
const signature = filePacket.toString('ascii', 0, 2);
console.log('Прочитанная сигнатура:', signature);
