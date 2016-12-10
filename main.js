var address;
var map;
var infowindow;
var travel_mode;
var keywords = new Array();
var address = "";
var locate;
var addressPlaceID;
var activities;
var favoriteList = [];

function Location(name, address, phone, website, price, rating){
    this.Name = name;
    this.Address = address;
    this.Phone = phone;
    this.Website = website;
    this.Price = price;
    this.Rating = rating;
}

function equal(location1, location2){
    var eq = 0;
    eq = (location1.Name == location2.Name)?eq+0:eq+1;
    eq = (location1.Address == location2.Address)?eq+0:eq+1;
    eq = (location1.Phone == location2.Phone)?eq+0:eq+1;  
    return (eq == 0)?true:false;
}

function getIndex(location){
    var i;
    for(i = 0; i < favoriteList.length; i++){
        if(equal(favoriteList[i], location)){
           return i;   
        }
    }
    return false;
}

function addEventListeners(){
    //function for favoriting a workout location (click star)
    $(".star label input" ).change(function() {

        //get the html object for location
        var result = $(this).parents("button").first();

        //get the  result id of location
        var resultIdName = result.attr("id");

        //get result location information
        var favorite = getLocation(resultIdName);

        if($(this).first().prop("checked")){
            favoriteList.push(favorite);
            addFavoriteSaved();
            console.log("add");
            console.log(favoriteList);  
        }else{
            removeFavorite(favorite);
            console.log("rm");
            console.log(favoriteList);  
        }

        //add new favorite to favorite list
    });
}

addEventListeners()


function removeFavorite(favorite){
    var index = getIndex(favorite);
    favoriteList =  (favoriteList.slice(0,index)).concat(favoriteList.slice(index+1, favoriteList.length+1));
}

function getLocation(resultIdName){
    var resultNumber = resultIdName.charAt(resultIdName.length-1);
    
    //create new Location object from result info
    var name = $('#name'+resultNumber).text();
    var address = $('#address'+resultNumber).text();
    var phone = $('#phone'+resultNumber).text();
    var website = $('#website'+resultNumber).text();
    var price = $('#price'+resultNumber).text();
    var rating = $('#rating'+resultNumber).text();
    
    var favorite = new Location(name, address,phone,website,price,rating);
    
    return favorite;
}

function addFavoriteSaved(){
    var resultTemplate= $(".result-template").clone(true, true);
    console.log();

    var favorite = favoriteList[favoriteList.length-1];
    resultTemplate.find("#name").text(favorite.Name);
    resultTemplate.find("#address").text(favorite.Address);
    resultTemplate.find("#phone").text(favorite.Phone);
    resultTemplate.find("#website").text(favorite.Website);
    resultTemplate.find("#price").text(favorite.Price);
    resultTemplate.find("#rating").text(favorite.Rating);
    resultTemplate.removeClass("hidden");
    $("#liked").append(resultTemplate); 
}


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
                $('#name'+k).append('<h4><strong>' +place.name + '</strong></h4>');
                $('#address'+k).append('Address: '+ place.formatted_address);
                $('#phone'+k).append('Phone: ' +place.formatted_phone_number);
                $('#website'+k).append('Website: <a href=\"'+place.website+'\">'+place.website+'</a>');
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
          moveToLocation();
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  }
  else {
   var method = window.location.hash.substr(1);
   var parts = method.split("&");
   location.href = "addressError.html#" + parts[0] + "&" + parts[1];
 }
 });
 }