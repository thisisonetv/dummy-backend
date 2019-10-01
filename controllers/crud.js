const {
  readResultsFile,
  writeResultsFile,
} = require('../utils/fileManager');

const {
  makeJSONResponse,
} = require('../utils/jason');

const nextAvailableId = (results) => {
  let maxId = 0;
  if (results.data && results.data.length) {
    results.data.forEach((result) => {
      maxId = Math.max(maxId, Number.parseInt(result.id, 10));
    });
  }
  return `${maxId + 1}`;
};

const useFileName = (req, fileName = '') => {
  if (!req.locals) req.locals = {};
  req.locals.fileName = fileName;
}

const create = (req, res, next) => {
  useFileName(req, 'all');
  const resultContents = readResultsFile(req);
  if (!resultContents.data) resultContents.data = [];
  resultContents.data.push({
    ...req.body.data,
    id: nextAvailableId(resultContents),
  });
  writeResultsFile(req, makeJSONResponse(resultContents));
  next();
};

const update = (req, res, next) => {
  useFileName(req, 'all');
  const resultContents = readResultsFile(req);
  if (!resultContents.data) {
    console.log('Cannot update results - no data array');
    next(false);
  }
  const updateData = req.body.data;
  resultContents.data = resultContents.data.map((result) => {
    let updateResult = { ...result };
    if (updateResult.id === updateData.id) {
      updateResult = {
        ...result,
        ...updateData,
      };
    }
    return updateResult;
  });
  writeResultsFile(req, makeJSONResponse(resultContents));
  next();
};

const deleteItem = (req, res, next) => {
  useFileName(req, 'all');
  const resultContents = readResultsFile(req);
  if (!resultContents.data) {
    console.log('Cannot delete results - no data array');
    next(false);
  }
  const deleteId = req.params.id || req.body.data.id;
  resultContents.data = resultContents.data.filter((result) => {
    return result.id !== deleteId;
  });
  writeResultsFile(req, makeJSONResponse(resultContents));
  next();
};

const crud = {
  create,
  update,
  delete: deleteItem,
};

module.exports = crud;