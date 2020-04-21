const bqs = require('d8-jsonapi-querystring');
const { buildQueryString } = bqs;

const isNumber = (value) => {
  const num = Number.parseInt(value, 10);
  return !Number.isNaN(num);
};

const folderName = (req, res, next, name) => {
  console.log("TCL: folderName -> folderName", name)
  if (!req.locals) req.locals = {};
  const folderPath = [].concat(name.split('/'));
  req.locals.folderPath = folderPath; // one for request snapshots
  console.log("TCL: folderName -> req.locals.folderPath", req.locals.folderPath)
};

const isCorrectQueryString = (requestParams, expectedParams) => {
  return expectedParams === buildQueryString(requestParams)
}

const tools = {
  isCorrectQueryString,
  isNumber,
  folderName,
};

module.exports = tools;