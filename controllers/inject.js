const {
  makeJSONResponse,
} = require('../utils/jason');

const {
  readResultsFile,
} = require('../utils/fileManager');

const results = (req, res, next) => {
  const resultContents = readResultsFile(req);
  res.locals.response = makeJSONResponse(resultContents);
  next();
};

const inject = {
  results,
};

module.exports = inject;