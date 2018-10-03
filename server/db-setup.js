var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'point_route',
	multipleStatements: true
});

connection.connect()

connection.query('CREATE TABLE routes (latitude NUMERIC(9,6), longitude NUMERIC(10,6), routes JSON NOT NULL); CREATE TABLE weather (latitude NUMERIC(9,6), longitude NUMERIC(10,6), city VARCHAR(32), temperature DECIMAL(5,2), date DATE NOT NULL) ', function (err, rows, fields) {
  if (err) throw err
  console.log('table created');
})

connection.end()
