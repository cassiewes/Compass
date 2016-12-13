var address;
var map;
var infowindow;
var travel_mode;
var keywords = new Array();
var address = "";
var locate;
var addressPlaceID;
var activities;
var resultList = [];
var mode;
var favoriteList = [];
var generateResults = true;
var setFavDirListener = true;
var confirmRemoveID;


function conf(){
  var r = confirm("Are you sure you'd like to leave this page?");
  if(r == true){
    window.location = "index.html"
  }
}

function mainFAQ(){
  var method = window.location.hash.substr(1);
  location.href="faq.html#"+method;
}

function mainBack(){
  var method = window.location.hash.substr(1);
  location.href="main.html#"+method;
}

<!--------------------------------------------------------------------------------->
<!-------------------CODE HANDLING RESULTS AND SAVED LIST-------------------------->
<!--------------------------------------------------------------------------------->    
                               
//Saves users saved places to localStorage
window.onbeforeunload = function(){
    console.log("UNLOAD");
    console.log(favoriteList);

    if(favoriteList.length != 0){
        localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
    }else{
        localStorage.setItem("favoriteList", []);
    }
};

//Function that loads users saved places from local storage
function onLoad(){
    console.log("LOAD");

    var temp = localStorage.getItem("favoriteList");
    console.log(temp);
    if( temp == null || temp == undefined || temp.length ==0){
        return;
    }
    temp = JSON.parse(localStorage.getItem("favoriteList"));
    reloadFavorites(temp);
}

//loads users saved places
$(window).on("load", function(){
    onLoad(); 
});

//Used to display favorites on Favorite html
function reloadFavorites(tempList){
    var id;
    var i;
    for(i = 0; i < tempList.length; i++){
        id = tempList[i].Id;

        if($("#"+id).length == 0){
            var favorite = new Location(
                        tempList[i].Id,
                        tempList[i].Name,
                        tempList[i].Address,
                        tempList[i].Phone,
                        tempList[i].Website,
                        tempList[i].Price,
                        tempList[i].Rating);
            favoriteList.push(favorite);
            addFavoriteSaved(id);
        }
        else{
            $("#result-pane "+"#"+id+" label").trigger("click");
        }
    }
}

//Constructor fo creating places object
function Location(id, name, address, phone, website, price, rating){
    this.Id = id;
    this.Name = name;
    this.Address = address;
    this.Phone = phone;
    this.Website = website;
    this.Price = price;
    this.Rating = rating;
}

//Gets html templates from main html for list elements
function getTemplate(name){
    var temp = $("."+name).clone(true, true);
    temp.removeClass("hidden" + " " + name);
    return temp;
}

//Displays placce in result list
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
    console.log("Result Created: " + place.Id);
}


//compares two places for equality
function equal(location1, location2Id){
    return (location1.Id == location2Id);
}

//Returns the index of a place in favorite list
function getIndex(locationId){
    var i;
    for(i = 0; i < favoriteList.length; i++){
        if(equal(favoriteList[i], locationId)){
           return i;
        }
    }
    return false;
}

//Event listeners for adding a favorite place and removing a favoite
function addEventListeners(){
    //function for favoriting a workout location (click star)
    $(".star label input" ).change(function(event) {
        //get the html object for location

        var result = $(this).parents("button").first();

        //get result location information
        var favorite = getLocation(result);

        if($(this).first().prop("checked")){
            favoriteList.push(favorite);
            addFavoriteSaved(favorite.Id);

            console.log("add");
            console.log(favoriteList);
        }else{
            removeFavorite(favorite.Id);

            console.log("rm");
            console.log(favoriteList);
        }
    });

    $(".remove-link").click(function(event){
        confirmRemoveID = $(this).parents(".btn-group").first().attr("id");
        
        var temp = confirm("Are you sure you want to remove?");
        
        if(temp){
            var id = $(this).parents(".btn-group").first().attr("id");
            $("#result-pane"+" #"+id+" "+"label").first().trigger("click");

            if($("#result-pane"+" #"+id+" "+"label").first().length == 0){
                removeFavorite(id);
            }
        }
    });
}


//Add event listeners
addEventListeners();

//Remove favorite place from saved pane
function removeFavorite(favoriteId){
    var index = getIndex(favoriteId);
    favoriteList =  (favoriteList.slice(0,index)).concat(favoriteList.slice(index+1, favoriteList.length));
    $("#liked"+" "+"#"+favoriteId).fadeOut("fast", function(){
        $(this).remove();   
    });
}

//Create a location object from html element
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

//Display favorite in saved list 
function addFavoriteSaved(id){
    var resultTemplate= getTemplate("favorite-template");
    var index = getIndex(id);
    var favorite = favoriteList[index];

    resultTemplate.attr("id", favorite.Id);
    resultTemplate.find(".name").text(favorite.Name);
    resultTemplate.find(".address").text(favorite.Address);
    resultTemplate.find(".phone").text(favorite.Phone);
    resultTemplate.find(".website").text(favorite.Website);
    resultTemplate.find(".price").text(favorite.Price);
    resultTemplate.find(".rating").text(favorite.Rating);

    $("#liked").append(resultTemplate);
    $('[data-toggle="tooltip"]').tooltip();
    
}


<!--------------------------------------------------------------------------------->
<!-----------------------END OF RESULTS AND SAVED CODE----------------------------->
<!--------------------------------------------------------------------------------->
    

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

  generateResults = false;
  initMap();
}

function makeFirst(placeId){
  var place = getLocation($("#"+placeId).first());
  $('#titleD').empty();
  $('#nameD').empty();
  $('#addressD').empty();
  $('#phoneD').empty();
  $('#websiteD').empty();
  $('#priceD').empty();
  $('#ratingD').empty();
  $('#b').empty();
  $('#fav').empty();
  $('#writtenDirections').empty();
  $('#titleD').append("<h4><i> You've selected: </i></h4>")
  $('#nameD').append(place.Name);
  $('#addressD').append( place.Address);
  if(place.phone != null){
    $('#phoneD').append(place.Phone);
  }
  if(place.Website != null){
    $('#websiteD').append('<a href=\"'+place.Website+'\">'+place.Website+'</a>');
  }
  if(place.Price != null){
    $('#priceD').append(place.Price);
  }
  if(place.Rating != null){
    $('#ratingD').append(place.Rating);
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
//MAP STYLING
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
    //Opens new directions service
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    //executes the places search
    service.nearbySearch({
      location: locate,
      radius: 500,
      keyword: activities,
      type: 'gym'
    }, callback);

    function callback(results, status) {
      var k = 0;
      //If no results, display this
      if (results.length == 0){
        $('#nameD').append("<strong>Hmmm...Your search returned no results.</strong>")
        $('#addressD').append("<a href =\"index.html\">Try a new search!</a>")
      }
      //Dealing with places reuslts
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        //For each result:
        for (var i = 0; i < results.length; i++) {
          service.getDetails({
              placeId: results[i].place_id,
            }, function(place, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                //Creates a marker for each result
                var marker = new google.maps.Marker({
                  icon: 'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png',
                  map: map,
                  position: place.geometry.location
                });
                //Creates an info window with the place name
                //On hover pulls it up and when mouse goes away it hides it
                var infowindow = new google.maps.InfoWindow({
                  content: place.name,
                });
                marker.addListener('mouseover', function() {
                  infowindow.open(map, this);
                });
                marker.addListener('mouseout', function() {
                  infowindow.close()
                });
                if(generateResults){
                    var location = new Location(place.place_id,
                                                 place.name,
                                                 place.formatted_address,
                                                 place.formatted_phone_number,
                                                 place.website,
                                                 place.price_level,
                                                 place.rating);
                    displayResult(location);
                }
 
                 console.log("Current Place: "+place.place_id);
                 
                        $("#result-pane .list-button:nth-last-child(1)").find(".show-directions").click(function(){
                            
                            route(place.place_id,addressPlaceID, place.place_id, travel_mode,
                                directionsService, directionsDisplay);
                            });

                if(setFavDirListener){
                    $(".show-fav-directions").click(function(){
                        var id =  $(this).parents(".btn-group").first().attr("id");

                      route(id, addressPlaceID, id
                            ,travel_mode,
                            directionsService, directionsDisplay);

                    });

                    setFavDirListener = false;
                 }
                  
                //Displays information / directions on marker click
                google.maps.event.addListener(marker, 'click', function() {
                  route(place.place_id,addressPlaceID, place.place_id, travel_mode,
                        directionsService, directionsDisplay);
                });

                k++;
              }
            });
        }
      }
    }
//Function for creating a marker on the map
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

    //Function for obtaining directions
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
          makeFirst(place);
          directionsDisplay.setDirections(response);
          console.log(response);
          $('#writtenDirections').append('To '+mode+' there: <br>')
          for(i = 0; i < response.routes[0].legs[0].steps.length; i++){
            var instruction = response.routes[0].legs[0].steps[i].instructions
            $('#writtenDirections').append(instruction + '<br>');
          }
          $('#timeEst').empty();
          $('#timeEst').append("Time Estimate: "+response.routes[0].legs[0].duration.text);
        } else {
          console.log('directions');
        }
      });
    }
  }
  //If the status is not okay on the geocoding, send back to the address page with an address error
  else {
   var method = window.location.hash.substr(1);
   var parts = method.split("&");
   location.href = "addressError.html#" + parts[0] + "&" + parts[1];
 }
 });
 }
