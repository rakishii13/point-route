/*
* The following global variables are moved across the files
* originPlace is the input of the autocomplete for oiiginPlace.
* destinationPlace is the input of the autocomplete for destinationPlace.
* map is the variable that contains the google map and will be set on initMap().
* routes contains the full JSON derived from the server containing the route.
* request is the JSON which contains the points and the type of transport.
* renderer is the google maps DirectionsRenderer which will use the routes JSON to manipulate for UI.
*/
var originPlace;
var destinationPlace;
var map;
var routes;
var request;
var renderer;

/**
 * initAutocomplete - Takes the variables from the autocompleteboxes
 * and using the google places autocomplete finds the most appropriate choice.
 * It contains the listeners to detect changes based on the user typing in.
 */
function initAutocomplete() {
  var originInput = document.getElementById('origin-input');

  var destinationInput = document.getElementById('destination-input');

  var originAutocomplete = new google.maps.places.Autocomplete(originInput, {});

  var destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput, {});

  originAutocomplete.addListener('place_changed', function() {
    originPlace = originAutocomplete.getPlace();
  });

  destinationAutocomplete.addListener('place_changed', function() {
    destinationPlace = destinationAutocomplete.getPlace();
  });
}


/**
 * initMap - This initializes the map using google maps,
 * This will be the one of the last things the app will do after getting
 * all the routes and directions, including the weather points. It sends for the renderDirections
 * function which will understand how to use the map, routes and request into an appropriate
 * line for directions on the map.
 *
 * @param  {type} routes  The JSON data containing the routes, legs and the step-by-step directions
 * @param  {type} request The JSON data containing the request with origin, destination and the type of transport
 */
function initMap(routes, request) {
  map = new google.maps.Map(document.getElementById('map'), {});
  renderDirections(map, routes, request);
}


/**
 * ajaxStop - This will cause the initMap() function
 * to load only after all the ajax calls have been completed
 * therefore causing no issues in loading the map.
 */
$(document).ajaxStop(function() {
  initMap(routes, request);
});
