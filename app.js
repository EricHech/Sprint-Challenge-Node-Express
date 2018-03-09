const config = require('./config.js');
const express = require('express');
const BITcontroller = require('./src/controllers/BITcontroller');
const server = express();

const PORT = config.port;

server.use(BITcontroller);

server.listen(PORT, err => {
  if (err) console.log('Error starting server: ', err);
  else console.log('Server listening on port: ', PORT);
});
