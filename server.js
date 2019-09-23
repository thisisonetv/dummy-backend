const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();

const {
  folderName,
  isCorrectQueryString,
} = require('./utils/tools');

// Controllers
const backend = require('./controllers/backend');
const snapshot = require('./controllers/snapshot');
const inject = require('./controllers/inject');

app.use(cors());
app.use(bodyParser.json({
  type: 'application/vnd.api+json',
  limit: '50mb',
}));


/* Add Custom routes here... */

app.get(['/programmes/:id'],
  backend.createBackEndHeaders,
  (req, res, next) => {
    if (!isCorrectQueryString(req.query, 'include=video-banner,genres,qualities,production-companies,languages,custom-attributes,custom-attributes.custom-attribute-type,series,series.episodes,series.videos,series.episodes.videos,videos,related-programmes,related-programmes.genres&fields[programmes]=video-banner,genres,qualities,production-companies,languages,title,introduction,description,short-description,production-start,production-end,active,number-of-series,number-of-episodes,data,pdf-id,custom-attributes,promo-video-id,series,videos,show-related-programmes,related-programmes,thumbnail,publish-date,logo&fields[genres]=name&fields[qualities]=name&fields[languages]=name&fields[production-companies]=name&fields[custom-attributes]=value,custom-attribute-type,position&fields[series]=name,episodes,videos&fields[episodes]=name,videos&fields[videos]=name,restricted')) {
      return next(false); // query params do not match. break from middleware.
    }
    folderName(req, res, next, 'programme-edit');
    next();
  },
  snapshot.request,
  backend.get,
  snapshot.response,
  inject.results,
  (req, res) => {
    res.status(200).send(res.locals.response);
  },
);

/* Add Custom routes above here... */

app.get('/*',
  backend.createBackEndHeaders,
  backend.get,
  (req, res) => {
    res.status(200).send(res.locals.response);
  },
);

app.post('/*',
  backend.createBackEndHeaders,
  backend.post,
  (req, res) => {
    res.status(200).send(res.locals.response);
  },
);

app.patch('/*',
  backend.createBackEndHeaders,
  backend.patch,
  (req, res) => {
    res.status(200).send(res.locals.response);
  },
);

app.delete('/*',
  backend.createBackEndHeaders,
  backend.del,
  (req, res) => {
    res.status(200).send(res.locals.response);
  },
);

app.listen(3003, () => {
  console.log('Server listening on port 3003');
});