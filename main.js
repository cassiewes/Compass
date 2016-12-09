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
                "color": "#6195a0"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "0"
            },
            {
                "saturation": "0"
            },
            {
                "color": "#f5f5f2"
            },
            {
                "gamma": "1"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "-3"
            },
            {
                "gamma": "1.00"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#bae5ce"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fac9a9"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#787878"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "labels.icon",
        "stylers": [
            {
                "hue": "#0a00ff"
            },
            {
                "saturation": "-77"
            },
            {
                "gamma": "0.57"
            },
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#43321e"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.icon",
        "stylers": [
            {
                "hue": "#ff6c00"
            },
            {
                "lightness": "4"
            },
            {
                "gamma": "0.75"
            },
            {
                "saturation": "-68"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#eaf6f8"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c7eced"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "-49"
            },
            {
                "saturation": "-53"
            },
            {
                "gamma": "0.79"
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
                $('#name'+k).append('<h5><strong>' +place.name + '</strong></h5>');
                $('#address'+k).append('Address: '+ place.formatted_address);
                $('#phone'+k).append('Phone: ' +place.formatted_phone_number);
                $('#website'+k).append('Website: '+place.website);
                if(place.price_level != null){
                  $('#price'+k).append('Price level: '+ place.price_level);
                }
                if(place.rating != null){
                  $('#rating'+k).append('Rating: '+place.rating);
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
          console.log(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  }
<<<<<<< Updated upstream
  else {
   var method = window.location.hash.substr(1);
   var parts = method.split("&");
   location.href = "addressError.html#" + parts[0] + "&" + parts[1];
 }
 });
 }
=======

>>>>>>> Stashed changes
