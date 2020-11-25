const fsPromises = require('fs').promises;

/** Функция чтения json файлов */
module.exports = (pathUrl) => fsPromises
  .readFile(pathUrl, { encoding: 'utf8' })
  .then((file) => JSON.parse(file));
