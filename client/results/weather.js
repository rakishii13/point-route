/**
 * getWeather - It takes each point, the type of point whether leg or step
 * , and the coordinates at that point. It then access the Server then to the API
 * and retrieve all the weather data and for this project we will mainly show the current temperature.
 *
 * @param  {type} point       The point of what we want the weather for.
 * @param  {type} type        The type of point, whether it is leg or step.
 * @param  {type} coordinates The Latitude and Longitude combo of the point.
 */
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

/**
 * modifyStepDirection - The following function takes the direction html from google maps
 * and then adds the temperaturethat we want to show on the map.
 *
 * @param  {type} instruction the pre-created instructionfrom google.
 * @param  {type} temp        THe current temperature from server.
 */
function modifyStepDirection(instruction, temp) {
  return (instruction + " Current Temperature: " + temp + " °F");
};
