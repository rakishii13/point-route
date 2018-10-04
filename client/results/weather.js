function getWeather(point, type, coordinates){
  this.url_weather = '/api/weather?lat=' + coordinates.lat() + "&lon=" + coordinates.lng();
  return $.ajax({
    url: this.url_weather,
    success: function(response) {
      if(type == 'step') {
        point.instructions = modifyStepDirection(point.instructions, response.main.temp);
      } else if(type == 'start') {
        point.start_address = modifyStepDirection(point.start_address, response.main.temp);
      } else if(type == "end") {
        point.end_address = modifyStepDirection(point.end_address, response.main.temp);
      }
    }
  });
};

function modifyStepDirection(instruction, temp) {
  return (instruction + " Current Temperature: " + temp + " °F");
};
