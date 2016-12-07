var map;
var infowindow;

function initMap() {
  var locate = {lat: 40.779598, lng: -73.977601}; //locate holds the user's inputed address

  map = new google.maps.Map(document.getElementById('map'), {
    center: locate,
    zoom: 16
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: locate,
    radius: 500,
    keyword: 'pilate',
    type: 'gym'
  }, callback);
}

function callback(results, status) {
  console.log(results);
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
