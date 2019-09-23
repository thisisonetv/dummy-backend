const isNumber = (value) => {
  const num = Number.parseInt(value, 10);
  return !Number.isNaN(num);
};

const folderName = (req, res, next, name) => {
  if (!req.locals) req.locals = {};
  const folderPath = [].concat(name.split('/'));
  req.locals.folderPath = [...folderPath]; // one for request snapshots
  res.locals.folderPath = [...folderPath]; // one for response snapshots
  next();
};

const tools = {
  isNumber,
  folderName,
};

module.exports = tools;