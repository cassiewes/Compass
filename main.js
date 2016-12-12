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
var resultList = [];
var mode;
var DISPLAYINTERVAL = 10;
var DISPLAYSTART= 0;

function mainFAQ(){
  var method = window.location.hash.substr(1);
  location.href="faq.html#"+method;
}

function mainBack(){
  var method = window.location.hash.substr(1);
  location.href="main.html#"+method;
}

function Location(id, name, address, phone, website, price, rating){
    this.Id = id;
    this.Name = name;
    this.Address = address;
    this.Phone = phone;
    this.Website = website;
    this.Price = price;
    this.Rating = rating;
    this.favorite = false;
}

function getTemplate(name){
    var temp = $("."+name).clone(true, true);
    temp.removeClass("hidden" + " " + name);
    return temp;
}


function displayResult(place){
    var resultHtml = getTemplate("result-template");
    resultHtml.attr("id", ""+place.Id);
    resultHtml.find(".name").append('<h4><strong>' + place.Name + '</strong></h4>');
    resultHtml.find(".address").append('Address: '+ place.Address);

    if (place.Phone != null){
      resultHtml.find(".phone").append('Phone: ' +place.Phone);
    }
    if (place.Website != null){
      resultHtml.find(".website").append('Website: <a href=\"'+place.Website+'\">'+place.Website+'</a>');
    }
    if(place.Price != null){
      resultHtml.find(".price").append('Price level: '+ place.Price);
    }
    if(place.Rating != null){
      resultHtml.find(".rating").append('Rating: '+place.Rating);
    }

    $("#result-pane").append(resultHtml);

    var id = $("#result-pane").find("#"+place.Id).attr("id");

    var result = $("#result-pane"+" "+"#"+id);
    resultList.push(getLocation(result));
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

        //get result location information
        var favorite = getLocation(result);

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
    favoriteList =  (favoriteList.slice(0,index)).concat(favoriteList.slice(index+1, favoriteList.length));
    console.log($("#liked"));
    $("#liked"+" "+"#"+favorite.Id).remove();
}

function getLocation(result){

    //create new Location object from result info
    var id = result.attr("id");
    var name = result.find(".name").text();
    var address = result.find(".address").text();
    var phone = result.find(".phone").text();
    var website = result.find(".website").text();
    var price = result.find(".price").text();
    var rating = result.find(".rating").text();

    var favorite = new Location(id, name, address,phone,website,price,rating);

    return favorite;
}

function addFavoriteSaved(){
    var resultTemplate= getTemplate("favorite-template");
    var favorite = favoriteList[favoriteList.length-1];

    resultTemplate.attr("id", favorite.Id);

    resultTemplate.find(".name").text(favorite.Name); resultTemplate.find(".address").text(favorite.Address);
    resultTemplate.find(".phone").text(favorite.Phone);
    resultTemplate.find(".website").text(favorite.Website);
    resultTemplate.find(".price").text(favorite.Price);
    resultTemplate.find(".rating").text(favorite.Rating);

    $("#liked").append(resultTemplate);
}

function message(travel_mode,activities,address){
  mode = "";
  var a = "";
  if (travel_mode == "WALKING")
  {
    mode = "walk"
  }
  if (travel_mode == "DRIVING")
  {
    mode = "drive"
  }
  if(travel_mode == "TRANSIT"){
    mode = "take the transit"
  }
  $('#meth').empty()
  $('#meth').append(mode);
  if(activities.length ==2){
    a = activities[1];
  }
  else if(activities.length==3){
    a = activities[1] + " or " + activities[2];
  }
  else{
    for(i = 1; i < activities.length -1; i++){
        a = a + activities[i] + ", "
    }
    a = a + " or " + activities[activities.length-1];
  }
  $('#active').empty();
  $('#add').empty();
  $('#active').append(a);
  $('#add').append(address + ".")

}

function backAddress(){
  location.href = "address.html#" + parts[0] + "&" + parts[1];
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
  message(travel_mode, keywords, address);
}

function removeFirst(){
  $('#titleD').empty();
  $('#nameD').empty();
  $('#addressD').empty();
  $('#phoneD').empty();
  $('#websiteD').empty();
  $('#priceD').empty();
  $('#ratingD').empty();
  $('#b').empty();
  $('#writtenDirections').empty();
  $('#timeEst').empty();
  initMap();
}

function makeFirst(place){
  $('#titleD').empty();
  $('#nameD').empty();
  $('#addressD').empty();
  $('#phoneD').empty();
  $('#websiteD').empty();
  $('#priceD').empty();
  $('#ratingD').empty();
  $('#b').empty();
  $('#writtenDirections').empty();
  $('#titleD').append("<h4><i> You've selected: </i></h4>")
  $('#nameD').append('<br><h5>' +place.name + '</h5>');
  $('#addressD').append('Address: '+ place.formatted_address);
  if(place.phone != null){
    $('#phoneD').append('Phone: ' +place.formatted_phone_number);
  }
  if(place.website != null){
    $('#websiteD').append('Website: <a href=\"'+place.website+'\">'+place.website+'</a>');
  }
  if(place.price_level != null){
    $('#priceD').append('Price level: '+ place.price_level);
  }
  if(place.rating != null){
    $('#ratingD').append('Rating: '+place.rating);
  }
  $("#b").append("<input type=\"button\" id=\"x\" onClick=\"removeFirst()\" value=\"x\"/>")
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
                var infowindow = new google.maps.InfoWindow({
                  content: place.name,
                });
                marker.addListener('mouseover', function() {
                  infowindow.open(map, this);
                });
                marker.addListener('mouseout', function() {
                  infowindow.close()
                });

                displayResult(new Location(place.place_id,
                                             place.name,
                                             place.formatted_address,
                                             place.phone,
                                             place.website,
                                             place.price_level,
                                             place.rating));

                google.maps.event.addListener(marker, 'click', function() {
                  route(place,addressPlaceID, place.place_id, travel_mode,
                        directionsService, directionsDisplay);
                });
                k++;
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

    function route(place,origin_place_id, destination_place_id, travel_mode,
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
          makeFirst(place)
          directionsDisplay.setDirections(response);
          console.log(response);
          $('#writtenDirections').append('To '+mode+' there: <br>')
          for(i = 0; i < response.routes[0].legs[0].steps.length; i++){
            var instruction = response.routes[0].legs[0].steps[i].instructions
            $('#writtenDirections').append(instruction + '<br>');
          }
          $('#timeEst').append("Time Estimate: "+response.routes[0].legs[0].duration.text);
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
