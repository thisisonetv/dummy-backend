const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

//sockets
const http = require('http');
const sockjs = require('sockjs');

const app = express();

const {
  folderName,
  isCorrectQueryString,
} = require('./utils/tools');

const addRoutes = require('./addRoutes');

// Controllers
const backend = require('./controllers/backend');
const snapshot = require('./controllers/snapshot');
const inject = require('./controllers/inject');
const crud = require('./controllers/crud');

app.use(cors());
app.use(bodyParser.json({
  type: 'application/vnd.api+json',
  limit: '50mb',
}));

app.use(backend.createBackEndHeaders);

/*********   SOCKETS  ***********/


const clients = {};

const broadcast = (message) => {
  // iterate through each client in clients object
  for (const client in clients) {
    // send the message to that client
    clients[client].write(JSON.stringify(message));
  }
}

// create sockjs server
const sockjs_chat = sockjs.createServer();

// on new connection event
sockjs_chat.on('connection', (conn) => {

  // add this client to clients object
  clients[conn.id] = conn;

  // on receive new data from client event
  conn.on('data', (message) => {
    console.log(message);
    broadcast(JSON.parse(message));
  });

  // on connection close event
  conn.on('close', () => {
    delete clients[conn.id];
  });

});


/********************************/

/* SOME EXAMPLE CODE FOR INJECTING DATA / SNAPSHOTS
*
*  app.get(['/programmes/:id'],
*    (req, res, next) => {
*      if (!isCorrectQueryString(req.query, 'include=video-banner,genres,qualities,production-companies,languages,custom-attributes,custom-attributes.custom-attribute-type,series,series.episodes,series.videos,series.episodes.videos,videos,related-programmes,related-programmes.genres&fields[programmes]=video-banner,genres,qualities,production-companies,languages,title,introduction,description,short-description,production-start,production-end,active,number-of-series,number-of-episodes,data,pdf-id,custom-attributes,promo-video-id,series,videos,show-related-programmes,related-programmes,thumbnail,publish-date,logo&fields[genres]=name&fields[qualities]=name&fields[languages]=name&fields[production-companies]=name&fields[custom-attributes]=value,custom-attribute-type,position&fields[series]=name,episodes,videos&fields[episodes]=name,videos&fields[videos]=name,restricted')) {
*        return next(false); // query params do not match. break from middleware.
*      }
*      folderName(req, res, next, 'programme-edit');
*      next();
*    },
*    snapshot.request,
*    backend.get,
*    snapshot.response,
*    inject.results,
*    (req, res) => {
*      res.status(200).send(res.locals.response);
*    },
*  );
*/
/********* Add Custom routes here... **********/

/***** Add Custom routes above here... ********/

/** attempt at generic crud code.. **/
// const stylesConfigAdded = addRoutes.crudRoutes(app, '/custom-themes', 'config');
// if (stylesConfigAdded) {
//   console.log('/custom-themes - Crud Routes added successfully.');
// }
/**********************************/

app.get('/*',
  backend.get,
  (req, res) => {
    res.status(200).send(res.locals.response);
  },
);

app.post('/*',
  backend.post,
  (req, res) => {
    res.status(200).send(res.locals.response);
  },
);

app.patch('/*',
  backend.patch,
  (req, res) => {
    res.status(200).send(res.locals.response);
  },
);

app.delete('/*',
  backend.del,
  (req, res) => {
    res.status(200).send(res.locals.response);
  },
);

const server = http.createServer(app);
sockjs_chat.installHandlers(server, {prefix:'/chat'});
server.listen(3003, '0.0.0.0', () => {
  console.log('Server listening on port 3003');
})


// app.listen(3003, () => {
// });