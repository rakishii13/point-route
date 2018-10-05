/*
* Make sure to enter the google api key here so that the FE can
* load the google maps and directions when needed.
*/
var GOOGLE_API_KEY = "AIzaSyBkxf5ZwATGGsRfjmDh73786lucI--p54o";

/*
* The following function takes care of loading the script
* and create the inital load with the google api key on the browser.
* This way we can keep the key modular and easy to change at any point.
*/
function loadScript() {
  var url = 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY + '&callback=initAutocomplete&libraries=places,geometry'
  document.getElementById('google-url').src = url;
}

window.onload = loadScript;
