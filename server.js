const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();

const { folderName } = require('./utils/tools');

// Controllers
const backend = require('./controllers/backend');
const snapshot = require('./controllers/snapshot');

app.use(cors());
app.use(bodyParser.json({
  type: 'application/vnd.api+json',
  limit: '20mb',
}));


/* Add Custom routes here... */

app.get(['/programmes/:id'],
  backend.createBackEndHeaders,
  (req, res, next) => folderName(req, res, next, 'images'),
  snapshot.request,
  backend.get,
  snapshot.response,
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