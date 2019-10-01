const fs = require('fs-extra');
const path = require('path');
const {
  isNumber,
} = require('./tools');

const BASE_PATH = path.join(__dirname, '../data');

const urlToFolderPath = (req, folderPath = []) => {
  const route = req.url.split('?')[0];
  const urlPaths = route.split('/');
  const filePath = folderPath;
  const fileNameArr = [];
  let pathArr = filePath;
  urlPaths
    .filter((p) => p)
    .forEach((path) => {
      if (isNumber(path)) pathArr = fileNameArr;
      pathArr.push(path);
    });
  const fileName = req.locals.fileName || fileNameArr.join('-');
  const fileNameExt = `${fileName || 'all'}.json`;
  return path.join('/', filePath.join('/'), fileNameExt);
};

const read = (filePath) => {
  try {
    return fs.readJsonSync(path.join(BASE_PATH, filePath));
  } catch (error) {
    console.log('read -> error: ', path.join(BASE_PATH, filePath));
    console.log('>>>>> File does not exist, or is not valid JSON <<<<<<');
  }
  return {};
};

const write = (filePath, body) => {
  const relativePath = path.join(BASE_PATH, filePath);
  try {
    return fs.outputFileSync(relativePath, JSON.stringify(body, null, 2));
  } catch (error) {
    console.log('write -> error: ', path.join(BASE_PATH, filePath));
    console.log('>>>>> File does not exist, or is not valid JSON <<<<<<');
  }
};

const readResultsFile = (req) => {
  const folderPath = [...req.locals.folderPath] || [];
  folderPath.unshift('results');
  return read(urlToFolderPath(req, folderPath));
};

const writeResultsFile = (req, body) => {
  const folderPath = [...req.locals.folderPath] || [];
  folderPath.unshift('results');
  return write(urlToFolderPath(req, folderPath), body);
};

const fileManager = {
  read,
  write,
  urlToFolderPath,
  readResultsFile,
  writeResultsFile,
}

module.exports = fileManager;