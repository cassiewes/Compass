var map;
var infowindow;
var service;
function initMap() {

  var locate = {lat: 40.779598, lng: -73.977601};
    var origin_place_id = null;
    var destination_place_id = null;
    var travel_mode = 'WALKING';
    var map = new google.maps.Map(document.getElementById('map'), {
      mapTypeControl: false,
      center: locate,
      zoom: 16
    });

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: locate,
      radius: 500,
      keyword: 'pilate',
      type: 'gym'
    }, callback);

    function callback(results, status) {
      console.log(results);
      var k = 0;
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
          console.log('#name'+i);
          service.getDetails({
              placeId: results[i].place_id,
            }, function(place, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                var marker = new google.maps.Marker({
                  map: map,
                  position: place.geometry.location
                });
                $('#name'+k).append('name: ' +place.name);
                $('#address'+k).append('address: '+ place.formatted_address);
                $('#phone'+k).append('phone: ' +place.formatted_phone_number);
                $('#website'+k).append('website: '+place.website);
                if(place.price_level != null){
                  $('#price'+k).append('price level: '+ place.price_level);
                }
                if(place.rating != null){
                  $('#rating'+k).append('rating: '+place.rating);
                }
                k++;
                google.maps.event.addListener(marker, 'click', function() {
                  infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                     'Website:' + place.website + '<br>' +
                    place.formatted_address + '</div>');
                  infowindow.open(map, this);
                });
              }
            });
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

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

    var origin_input = document.getElementById('origin-input');
    var destination_input = document.getElementById('destination-input');
    var modes = document.getElementById('mode-selector');

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(modes);

    var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
    origin_autocomplete.bindTo('bounds', map);
    var destination_autocomplete =
        new google.maps.places.Autocomplete(destination_input);
    destination_autocomplete.bindTo('bounds', map);

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, mode) {
      var radioButton = document.getElementById(id);
      radioButton.addEventListener('click', function() {
        travel_mode = mode;
      });
    }
    setupClickListener('changemode-walking', 'WALKING');
    setupClickListener('changemode-transit', 'TRANSIT');
    setupClickListener('changemode-driving', 'DRIVING');

    function expandViewportToFitPlace(map, place) {
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
    }

    origin_autocomplete.addListener('place_changed', function() {
      var place = origin_autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }
      expandViewportToFitPlace(map, place);

      // If the place has a geometry, store its place ID and route if we have
      // the other place ID
      origin_place_id = place.place_id;
      route(origin_place_id, destination_place_id, travel_mode,
            directionsService, directionsDisplay);
    });

    destination_autocomplete.addListener('place_changed', function() {
      var place = destination_autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }
      expandViewportToFitPlace(map, place);

      // If the place has a geometry, store its place ID and route if we have
      // the other place ID
      destination_place_id = place.place_id;
      route(origin_place_id, destination_place_id, travel_mode,
            directionsService, directionsDisplay);
    });

    function route(origin_place_id, destination_place_id, travel_mode,
                   directionsService, directionsDisplay) {
      if (!origin_place_id || !destination_place_id) {
        return;
      }
      directionsService.route({
        origin: {'placeId': origin_place_id},
        destination: {'placeId': destination_place_id},
        travelMode: travel_mode
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  }
