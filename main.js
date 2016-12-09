var address;
var map;
var infowindow;
var travel_mode;
var keywords = new Array();
var address = "";
var locate;
var addressPlaceID;
var activities;

function getInfo(){
  method = window.location.hash.substr(1);
  parts = method.split("&");
  travel_mode = parts[0].split("=");
  travel_mode = travel_mode[1];
  keywords = parts[1].split("=");
  keywords=keywords[1].split("_");
  activities = "";
  if (keywords.length == 2){
    activities = keywords[1];
  }
  else{
    for(i = 1; i < keywords.length; i++){
      if (i == 1){
        activities = activities + "(" + keywords[i] + ")"
      }
      else{
        activities = activities + " OR (" + keywords[i] + ")";
      }
    }
  }
  address = parts[2].split('=');
  address = address[1].split('+').join(' ');
}

function initMap() {
    getInfo();
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'address' : address}, function(results,status){
      if (status === google.maps.GeocoderStatus.OK) {
      console.log(results);
      locate = results[0].geometry.location;
      addressPlaceID = results[0].place_id;
      var origin_place_id = null;
      var destination_place_id = null;
      var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: locate,
        zoom: 16,
        styles:
        [
        {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
            {
                "color": "#6d6d6d"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c8e08b"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#d6e5a7"
            },
            {
                "lightness": "19"
            },
            {
                "saturation": "29"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d6e5a7"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d6e5a7"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "-4"
            },
            {
                "lightness": "69"
            },
            {
                "gamma": "1.22"
            },
            {
                "color": "#f7ffb6"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c0e8e4"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#89b7b0"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6b6b6b"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#5eddc5"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#9ac87b"
            },
            {
                "saturation": "13"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#00ffc4"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#33cee8"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#6bb1c2"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#67a4b2"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#82b6c2"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#93eb96"
            },
            {
                "saturation": "-33"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 700
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a4fff2"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ff0000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#7dcdcd"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#454545"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "weight": "0.50"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    }
]
    });
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: locate,
      radius: 500,
      keyword: activities,
      type: 'gym'
    }, callback);

    function callback(results, status) {
      var k = 0;
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < 10; i++) {
          createMarker(results[i]);
          service.getDetails({
              placeId: results[i].place_id,
            }, function(place, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                var marker = new google.maps.Marker({
                  icon: 'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png',
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
                  route(addressPlaceID, place.place_id, travel_mode,
                        directionsService, directionsDisplay);
                });
              }
            });
        }
      }
    }

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png',
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }


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
  else {
   alert('Geocode was not successful for the following reason: ' + status);
 }
 });
 }
