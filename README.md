Dummy server used to intercept calls to the api and alter them. 

In the one-web repo set the dummyApi attribute to 'true' in src/javascript/config/development.js

After this start this dummy server with 'npm start', which will serve a node server at locahost:3003

Now start your development environment as you usually would, e.g. 'npm start demo'

This will now route all traffic to the api through this dummy server. 

Please follow comments and example code in server.js to alter/intercept responses from the API.

