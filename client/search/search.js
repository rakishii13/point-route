var originPlace;
var destinationPlace;
var map;
var weather_data = [];
var routes;
var request;
var renderer;

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

function initMap(routes, request) {
  map = new google.maps.Map(document.getElementById('map'), {});
  renderDirections(map, routes, request);
}

$(document).ajaxStop(function() {
  initMap(routes, request);
});
