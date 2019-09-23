const fileManager = require('../utils/fileManager');

const request = (req, res, next) => {
  const folderPath = req.locals.folderPath || [];
  folderPath.unshift('request');
  fileManager.write(fileManager.urlToFolderPath(req.url, folderPath), req.body);
  next();
};

const response = (req, res, next) => {
  const folderPath = res.locals.folderPath || [];
  folderPath.unshift('response');
  fileManager.write(fileManager.urlToFolderPath(req.url, folderPath), res.locals.response);
  next();
};

const snapshot = {
  request,
  response,
};

module.exports = snapshot;
