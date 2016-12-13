var address = "";

function b(){
  var transit = window.location.hash.substr(1);
  t = transit.split("&")[0];
  location.href="activity.html#"+t;
}

function addressFAQ(){
  var method = window.location.hash.substr(1);
  location.href="faq_address.html#"+method;
}

function ab(){
  var method = window.location.hash.substr(1);
  location.href="address.html#"+method;
}

$(document).ready(function() {
  document.getElementById('info').addEventListener('submit', function (e) {
    e.preventDefault();
    address = document.getElementById('myText').value;
    if (address.length == 0){
      $("#title").empty();
      $("#title").append("uh oh! please enter something in the address field!");
    }
    else{
    var address = address.split(' ')
    for(i=0; i< address.length; i++){
      if(address[i] == 'St' || address[i]=='St.'){
        address[i] = 'Street';
      }
    }
    var zip = address[address.length-1];
    if(isNaN(zip) == false){
      if (zip.length==5){
        address = address.join('+');
        var method = window.location.hash.substr(1);
        location.href= "main.html#"+method+"&Address="+address;
      }
      else{
        $("#title").empty();
        $("#title").append("make sure you end your address with a valid 5-digit zip code!");
      }
    }
    else{
      $("#title").empty();
      $("#title").append("make sure you end your address with a valid 5-digit zip code!");
    }
  }
}, false);
});
