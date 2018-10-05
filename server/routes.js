var express = require('express');
var router = express.Router();
const request = require('request');
var moment = require('moment');
moment().format();
const weatherAPIKey = process.env.OPEN_WEATHER_API_KEY;
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY
});

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'point_route',
	multipleStatements: true
});

connection.connect()

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

var response_google;

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


module.exports = router;
