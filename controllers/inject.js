const fileManager = require('../utils/fileManager');

const results = (req, res, next) => {
  const folderPath = [...req.locals.folderPath] || [];
  folderPath.unshift('results');
  const resultContents = fileManager.read(fileManager.urlToFolderPath(req.url, folderPath));
  if (resultContents) {
    res.locals.response = resultContents;
  }
  next();
};

const inject = {
  results,
};

module.exports = inject;