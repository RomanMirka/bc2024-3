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
