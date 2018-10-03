var express = require('express');
var router = express.Router();
const request = require('request');
const weatherAPIKey = process.env.OPEN_WEATHER_API_KEY;
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY
});

router.get('/directions', function(req, res){
  googleMapsClient.directions({
    origin: req.query.origin,
    destination: req.query.destination
  }, function(err, response) {
    if (!err) {
      res.send(response.json);
    } else {
      res.send(err);
    }
  });
});

router.get('/weather', function(req, res){
  var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + req.query.lat + "&lon=" + req.query.lon + "&units=imperial&appid=" + weatherAPIKey ;
  request(url, {json: true}, (err, response, body) => {
    if (err) { return res.send(err); }
    res.send(body);

  });
});

module.exports = router;
