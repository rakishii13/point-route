var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'point_route',
	multipleStatements: true
});

connection.connect()

connection.query('CREATE TABLE routes (origin VARCHAR(40), destination VARCHAR(40), directions JSON); CREATE TABLE weather (latitude VARCHAR(32), longitude VARCHAR(32), temperature DECIMAL(5,2), date DATE)', function (err, rows, fields) {
  if (err) throw err
  console.log('tables created');
})

connection.end()
