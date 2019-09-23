const axios = require('axios');

const logErrorStatus = (str, error, next) => {
  const { response } = error;
  console.log(`Controllers: backend: ${str} - `, response.status, response.statusText);
  next(error);
}

const get = async (req, res, next) => {
  console.log('TCL: -> GET: ', req.url);
  try {
    const response = await axios({
      url: `${req.headers.devapiurl}${req.url}`,
      method: 'GET',
      headers: req.locals.headers,
    });
    res.locals.response = response.data;
    next();
  } catch (error) {
    logErrorStatus('GET', error, next);
  }
};

const post = async (req, res, next) => {
  console.log('TCL: -> POST: ', req.url);
  try {
    const response = await axios({
      url: `${req.headers.devapiurl}${req.url}`,
      method: 'POST',
      headers: req.locals.headers,
      data: req.body,
    });
    res.locals.response = response.data;
    next();
  } catch (error) {
    res.status(error.response.status).end();
    logErrorStatus('axiosPost', error, next);
  }
}

const patch = async (req, res, next) => {
  console.log('TCL: -> PATCH: ', req.url);
  try {
    const response = await axios({
      url: `${req.headers.devapiurl}${req.url}`,
      method: 'PATCH',
      headers: req.locals.headers,
      data: req.body,
    });
    res.locals.response = response.data;
    next();
  } catch (error) {
    logErrorStatus('PATCH', error, next);
  }
};

const del = async (req, res, next) => {
  console.log('TCL: -> DELETE: ', req.url);
  try {
    const response = await axios({
      url: `${req.headers.devapiurl}${req.url}`,
      method: 'DELETE',
      headers: req.locals.headers,
      data: req.body,
    });
    res.locals.response = response.data;
    next();
  } catch (error) {
    logErrorStatus('DELETE', error, next);
  }
};

const createBackEndHeaders = (req, res, next) => {
  const headers = {
    'API-Version': 1,
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
    'x-web-api-key': req.headers['x-web-api-key'],
  }
  if (req.headers.authorization) {
    headers.Authorization = req.headers.authorization;
  }
  if (!req.locals) req.locals = {};
  req.locals.headers = headers;
  next();
}

const backend = {
  get,
  post,
  patch,
  del,
  createBackEndHeaders,
};

module.exports = backend;
