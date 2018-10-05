/**
 * The purpose of this file is to take all the needed requirements
 * to connect to the mysql database and then setup the 2 tables needed.
 * One is for the google routes with origin, destination and directions.
 * Second is for the weather data that contains the weather for a Latitude
 * and longitude with the temperature and date.
 */

var mysql = require('mysql');
require('dotenv').config();
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME,
	multipleStatements: true
});

connection.connect()

connection.query('CREATE TABLE routes (origin VARCHAR(40), destination VARCHAR(40), directions LONGTEXT); CREATE TABLE weather (latitude VARCHAR(32), longitude VARCHAR(32), temperature DECIMAL(5,2), date DATE)', function (err, rows, fields) {
  if (err) throw err
  console.log('tables created');
})

connection.end()
