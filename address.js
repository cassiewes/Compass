var address = "";

function b(){
  var transit = window.location.hash.substr(1);
  t = transit.split("&")[0];
  location.href="activity.html#"+t;
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
    var address = address.split(' ').join('+');
    var method = window.location.hash.substr(1);
    location.href= "main.html#"+method+"&Address="+address;
  }
}, false);
});
