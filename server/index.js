require('dotenv').config()
var express = require('express');
const path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var port = process.env.PORT;
var distDir = '../client/';

var ptRoutes = require('./api-routes');

var dbRoutes = require('./db-routes');

var mysql = require('mysql');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, distDir)));

app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

app.use('/api', ptRoutes);

app.use('/db', dbRoutes);

app.listen(port);

app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : process.env.DB_HOST,
		user     : process.env.DB_USER,
		password : process.env.DB_PASS,
    database : process.env.DB_NAME
	});
	res.locals.connect();
	next();
});
