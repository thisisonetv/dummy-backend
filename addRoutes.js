const {
  folderName,
} = require('./utils/tools');

// Controllers
const inject = require('./controllers/inject');
const crud = require('./controllers/crud');

const crudRoutes = (app, path, folder) => {
  if (!app || !path || !folder) {
    return false;
  }
  app.get([path],
    (req, res, next) => {
      folderName(req, res, next, folder);
      next();
    },
    inject.results,
    (req, res) => {
      res.status(200).send(res.locals.response);
    },
  );

  app.post([path],
    (req, res, next) => {
      folderName(req, res, next, folder);
      next();
    },
    crud.create,
    inject.results,
    (req, res) => {
      res.status(200).send(res.locals.response);
    },
  );

  app.patch([path, `${path}/:id`],
    (req, res, next) => {
      folderName(req, res, next, folder);
      next();
    },
    crud.update,
    inject.results,
    (req, res) => {
      res.status(200).send(res.locals.response);
    },
  );

  app.delete([path, `${path}/:id`],
    (req, res, next) => {
      folderName(req, res, next, folder);
      next();
    },
    crud.delete,
    inject.results,
    (req, res) => {
      res.status(200).send(res.locals.response);
    },
  );

  return true;
}

const addRoutes = {
  crudRoutes,
};

module.exports = addRoutes;
