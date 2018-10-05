/**
 * getDirections - This is invoked when the "GO" button is clicked on the FE.
 * It will take the origin and destination, extract the Latitude and Longitude from it.
 * It then generates the url needed to hit the server side which will then hit the google API.
 * The ajax call then hits the nodeJS server and get all the needed JSON data to parse into the map.
 */
function getDirections(){
  var url = '/api/directions?' + 'origin=' + originPlace.geometry.location.toString().slice(1,-1) + '&destination=' + destinationPlace.geometry.location.toString().slice(1,-1);
  originLatLng = new google.maps.LatLng(originPlace.geometry.location.toJSON());
  destinationLatLng = new google.maps.LatLng(destinationPlace.geometry.location.toJSON());
  $.ajax({
    url: url,
    success: function(response) {
      if(typeof response == 'string') {
        var parsed_json = JSON.parse(response);
        routes = transformRoutes(parsed_json.routes);
      } else {
        routes = transformRoutes(response.routes);
      }
      request = {
        travelMode: 'DRIVING',
        origin: originPlace.geometry.location.toJSON(),
        destination: destinationPlace.geometry.location.toJSON()
      }
    }
  });
}

/**
 * transformRoutes - The following function takes the JSON from the server
 * and then extracts it to different function such as legs and steps which
 * will transform the data the Javascript Maps can then proces to the FE.
 *
 * @param  {type} routes the raw JSON from the server which will contain the full routes.
 */
function transformRoutes(routes){
  routes.forEach(function(route){
    route.bounds = transformBounds(route.bounds);
    route.overview_path = transformPath(route.overview_polyline);
    route.legs.forEach(function(leg){
      leg.start_location = transformLatLng(leg.start_location);
      leg.end_location   = transformLatLng(leg.end_location);
      getWeather(leg, 'start', leg.start_location);
      getWeather(leg, 'end', leg.end_location);
      leg.steps.forEach(function(step){
        step.start_location = transformLatLng(step.start_location);
        step.end_location   = transformLatLng(step.end_location);
        step.path = transformPath(step.polyline);
        if(step.distance.value > 10000) {
          getWeather(step , 'step', step.end_location);
        };
        step.instructions = step.html_instructions;
      });
    });
  });
  return routes;
}

/**
 * transformBounds - This will transform the raw bounds into bounds using the google library
 * that will include the required Latitude and Longitude which Javascript can process.
 *
 * @param  {type} boundsObject The raw object that contains the bounds of the route.
 */
function transformBounds(boundsObject){
  return new google.maps.LatLngBounds(transformLatLng(boundsObject.southwest),
  transformLatLng(boundsObject.northeast));
}

/**
 * transformLatLng - This will transform the raw Latitude and Longitude object into
 * the required format of the LatLng that google can use.
 *
 * @param  {type} latLngObject The raw object containing the Latitude and Longitude.
 */
function transformLatLng(latLngObject){
  return new google.maps.LatLng(latLngObject.lat, latLngObject.lng);
}

/**
 * transformPath - This will transform the overview_path and then decode it based on google
 * geometry class which can then be used by Google Maps JS to render on FE.
 *
 * @param  {type} encodedPolyObject description
 */
function transformPath(encodedPolyObject){
  return google.maps.geometry.encoding.decodePath(encodedPolyObject.points);
}

/**
 * renderDirections - The following function will take the the map, routes and request JSON
 * and render it according to the google maps DirectionsRenderer service which will make it
 * look good for the FE.
 *
 * @param  {type} map     The google map that will be initialized and contains the code for the FE map.
 * @param  {type} routes  The transformed routes that can be used to create the directions.
 * @param  {type} request The JSON containing the origin and destination with the type of transport.
 */
function renderDirections(map, routes, request){
  document.getElementById("directions-panel").innerHTML = "";
  renderer = new google.maps.DirectionsRenderer();
  renderer.setOptions({
    directions : {
      routes : routes,
      request : request
    },
    draggable : true,
    zoom: 13,
    map : map
  });
  renderer.setPanel(document.getElementById('directions-panel'));
}
