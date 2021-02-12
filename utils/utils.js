const fsPromises = require('fs').promises;

function getDataFromFile(pathToFile) {
  return fsPromises.readFile(pathToFile, 'utf-8');
}

module.exports = { getDataFromFile };
