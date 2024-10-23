const { Command } = require('commander'); //Модуль для обробки командного рядка
const fs = require('fs'); //Модуль filesystem для роботи з файлами

const program = new Command(); //Створюю новий об'єкт з ім'ям main

program
  .requiredOption('-i, --input <path>', 'input file path') //Обов'язковий параметр -і або --input
  .option('-o, --output <path>', 'output file path') //Необов'язковий п. -о або --output для шляху, де зберігається рез.
  .option('-d, --display', 'display result'); //Необо'язковий п. -d для виведення результату

program.parse(process.argv); //Обробка аргуменів які були передані

const options = program.opts(); //Місце де зюергіються всі знач. -i, -o, -d

if (!options.input) { //Якщо немає input, виводиться помилка
  console.error('Please, specify input file');
  process.exit(1);
}

if (!fs.existsSync(options.input)) { //Перевірка існування файлу
  console.error('Cannot find input file');
  process.exit(1);
}

try {
  const data = fs.readFileSync(options.input, 'utf-8'); //Вик. метод fs, передається шлях до файлу
  const assets = JSON.parse(data); //Перетворює рядок json у js 

  let minAsset = null; //Огол. змінну minAsset з значенням null, для зберігання н. активу з найменш. значення
  let minValue = Infinity;//Огол. змінну minValue з знач. Infinity, щоб збер. найменше значення

  assets.forEach(asset => { //Перебираю кожен asset
    const value = asset.value; //Отримую значення активу
    if (typeof value === 'number' && value < minValue) { //Перевірка
      minValue = value; //Якщо код зверху виконався, то minValue оновлюєттться на value
      minAsset = asset.txt; // Отримуємо назву активу
    }
  });

  if (minAsset === null) { //Якщо не було знайдено asset
    console.error('No valid assets found.');
    process.exit(1);
  }

  const result = `${minAsset}:${minValue}`; //Виводить рез. у вигляді назва активу: занчення

  if (options.display) {
    console.log(result);
  }

  const outputFilePath = options.output || 'output.txt'; //Записує рез. у output.txt якщо нічого не задано
  fs.writeFileSync(outputFilePath, result);

} catch (error) {
  console.error('Error reading or processing the file:', error); //Ловить помилки
}