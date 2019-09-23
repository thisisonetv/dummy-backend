const fs = require('fs-extra');
const path = require('path');
const { isNumber } = require('./tools');

const BASE_PATH = path.join(__dirname, '../data');

const urlToFolderPath = (url, folderPath = []) => {
  const route = url.split('?')[0];
  const urlPaths = route.split('/');
  const filePath = folderPath;
  const fileName = [];
  let pathArr = filePath;
  urlPaths
    .filter((p) => p)
    .forEach((path) => {
      if (isNumber(path)) pathArr = fileName;
      pathArr.push(path);
    });
  const fileNameExt = `${fileName.join('-')}.json`;
  return path.join('/', filePath.join('/'), fileNameExt);
};

const read = (filePath) => {
  return fs.readJsonSync(path.join(BASE_PATH, filePath));
};

const write = (filePath, body) => {
  const relativePath = path.join(BASE_PATH, filePath);
  fs.outputFileSync(relativePath, JSON.stringify(body, null, 2));
};

const fileManager = {
  read,
  write,
  urlToFolderPath,
}

module.exports = fileManager;