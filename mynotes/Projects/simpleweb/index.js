// load express library
const express = require('express');

// create new app
const app = express();

// create single route handler
// simply send back Hi, there when visiting the root webpage
app.get('/', (req, res) => {
  res.send('Hi, there');
});

// set up our application to listen on a port
app.listen(8080, () => {
  console.log('Listening on port 8080');
});
