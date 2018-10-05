// The following commands include all the needed things to load the routes.
var express = require('express');
require('dotenv').config();
var router = express.Router();
const request = require('request');

// Use the moment library to process date.
var moment = require('moment');
moment().format();

// The extraction of the open weather API key from .env file.
const weatherAPIKey = process.env.OPEN_WEATHER_API_KEY;

// The following is to connect and put the Google API Key for the server.
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY
});


// The following sets up the msql server for the following function
// to access. It will use the .env params to create the connection.
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME,
	multipleStatements: true
});
connection.connect()


/**
 * /directions - This will take the origin and destination
 * sent from the FE then check the DB if those reuslts exist and
 * try to send them to FE, otherwise, it will query the google maps api
 * and then send the results from to the FE and store them in the DB for future.
 */
router.get('/directions', function(req, res){
  var origin = req.query.origin;
  var destination = req.query.destination;
  var query = 'SELECT * FROM routes WHERE origin = ? AND destination = ?';
  connection.query(query, [origin, destination], function(error, results, fields) {
    if (results.length == 0) {
      console.log("google api routes")
      getGoogleDirections(req, res);
    } else if (error) {
      res.send(error);
    } else {
      console.log("routes db");
      res.send(results[0].directions);
    }
  });
});


/**
 * getGoogleDirections - It is an extenstion of the above directions route
 * and it process the route if it has to be sent to the google maps since it
 * is not there in the DB.
 *
 * @param  {type} req The request with the origin and detination
 * @param  {type} res The response that will be filled with the JSON
 */
function getGoogleDirections(req, res) {
  googleMapsClient.directions({
    origin: req.query.origin,
    destination: req.query.destination
  }, function(err, response) {
    if (!err) {
      var query = "INSERT INTO routes VALUES('" + req.query.origin + "','" + req.query.destination + "', '" + JSON.stringify(response.json) + "')";
      connection.query(query, function(error, results, fields) {
        if (error) throw error;
        res.send(response.json);
      });
    } else {
      res.send(err);
    }
  });
}

/**
 * /weather - Same as the directions, it will take input the
 * Latitude and Longitude and send it to the DB first and check if it exists there, if it is there then it sends it back to FE, otherwise sends
 * it to the API, then retireve it and send it to the FE
 * to be added to the step-by-step directions.
 */
router.get('/weather', function(req, res){
  var lat = req.query.lat;
  var lon = req.query.lon;
  var query = 'SELECT * FROM weather WHERE latitude = ? AND longitude = ?';
  connection.query(query, [lat, lon], function(error, results, fields) {
    if (results.length == 0) {
      console.log("weather api");
      getApiWeather(req, res);
    } else if (error) {
      res.send(error);
    } else {
      console.log("weather db");
      response = { main : {} };
      response.main['temp'] = results[0].temperature;
      res.send(response);
    }
  });
});

/**
 * getApiWeather - An extention function that contains the logic
 * to hit the Open Weather API to retireve the current weather details
 * for a specific latitude and longitude.
 *
 * @param  {type} req The request from the route to be sent to the API
 * @param  {type} res The response that will then be filled with the API
 */
function getApiWeather(req, res) {
  var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + req.query.lat + "&lon=" + req.query.lon + "&units=imperial&appid=" + weatherAPIKey ;
  request(url, {json: true}, (err, response, body) => {
    if (!err) {
      var dt = moment(body.dt * 1000).format("YYYY-MM-DD");
      var query = "INSERT INTO weather VALUES('" + req.query.lat + "','" + req.query.lon + "', '" + body.main.temp + "', '" + dt + "')";
      connection.query(query, function(error, results, fields) {
        if (error) throw error;
        res.send(body);
      });
    } else {
      res.send(err);
    }
  });
}

// Exports this file to be imported in the index.js to load at npm start.
module.exports = router;
