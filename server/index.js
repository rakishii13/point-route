// The following require commands includes all the needed libraries for the
// to take care of.
require('dotenv').config()
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const path = require('path');

// This creates the app from express which can be used for everything express related.
var app = express();

// The assignment of port where you want the app to load on localhost.
var port = process.env.PORT;

// The assignment of the folder that contains the client side code.
var clientDir = '../client/';

// Assignment of which routes file to use.
var ptRoutes = require('./routes');

// Setup the body parser that can parse the JSON in the middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// The command to connect the client side code ot the server side code.
app.use(express.static(path.join(__dirname, clientDir)));

// A regex formula that can process anything that has nothing to do with api connection
// will route the site to index.html in the client side code.
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, clientDir + '/index.html'));
});

// The url extention api should use the functions(routes) from that file.
app.use('/api', ptRoutes);

// Cause the server to push all changes and receive data from that port.
app.listen(port);
