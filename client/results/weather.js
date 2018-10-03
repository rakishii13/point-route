function getWeather(point, type, coordinates){
  this.url_weather = '/api/weather?lat=' + coordinates.lat() + "&lon=" + coordinates.lng();
  return $.ajax({
    url: this.url_weather,
    success: function(response) {
      weather_data.push({
        type: type,
        city: response.name,
        temp: response.main.temp,
        temp_max: response.main.temp_max,
        temp_min: response.main.temp_min,
        date: response.dt,
      });
      if(type == 'step') {
        point.instructions = modifyStepDirection(point.instructions, response.main.temp);
      } else if(type == 'start') {
        point.start_address = modifyStepDirection(point.start_address, response.main.temp);
      } else if(type == "end") {
        point.end_address = modifyStepDirection(point.end_address, response.main.temp);
      }
    }
  });
}
