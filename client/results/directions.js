function getDirections(){
  var url = '/api/directions?' + 'origin=' + originPlace.geometry.location.toString().slice(1,-1) + '&destination=' + destinationPlace.geometry.location.toString().slice(1,-1);
  originLatLng = new google.maps.LatLng(originPlace.geometry.location.toJSON());
  destinationLatLng = new google.maps.LatLng(destinationPlace.geometry.location.toJSON());
  $.ajax({
    url: url,
    success: function(response) {
      routes = typecastRoutes(response.routes);
      request = {
        travelMode: 'DRIVING',
        origin: originPlace.geometry.location.toJSON(),
        destination: destinationPlace.geometry.location.toJSON()
      }
    }
  });
}

function typecastRoutes(routes){
  routes.forEach(function(route){
    route.bounds = asBounds(route.bounds);
    route.overview_path = asPath(route.overview_polyline);
    route.legs.forEach(function(leg){
      leg.start_location = asLatLng(leg.start_location);
      leg.end_location   = asLatLng(leg.end_location);
      getWeather(leg, 'start', leg.start_location);
      getWeather(leg, 'end', leg.end_location);
      leg.steps.forEach(function(step){
        step.start_location = asLatLng(step.start_location);
        step.end_location   = asLatLng(step.end_location);
        step.path = asPath(step.polyline);
        if(step.distance.value > 10000) {
          getWeather(step , 'step', step.end_location);
        };
        step.instructions = step.html_instructions;
      });
    });
  });
  return routes;
}

function asBounds(boundsObject){
  return new google.maps.LatLngBounds(asLatLng(boundsObject.southwest),
  asLatLng(boundsObject.northeast));
}

function asLatLng(latLngObject){
  return new google.maps.LatLng(latLngObject.lat, latLngObject.lng);
}

function asPath(encodedPolyObject){
  return google.maps.geometry.encoding.decodePath(encodedPolyObject.points);
}

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
