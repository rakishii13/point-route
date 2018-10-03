var GOOGLE_API_KEY = "AIzaSyBkxf5ZwATGGsRfjmDh73786lucI--p54o";

function loadScript() {
  var url = 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY + '&callback=initAutocomplete&libraries=places,geometry'
  document.getElementById('google-url').src = url;
}

window.onload = loadScript;
