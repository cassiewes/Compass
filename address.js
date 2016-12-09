var address = "";

function b(){
  var transit = window.location.hash.substr(1);
  t = transit.split("&")[0];
  location.href="activity.html#"+t;
}


$(document).ready(function() {
  document.getElementById('info').addEventListener('submit', function (e) {
    e.preventDefault();
    address = document.getElementById('address').value;
    var address = address.split(' ').join('+');
    var method = window.location.hash.substr(1);
    location.href= "main.html#"+method+"&Address="+address;
}, false);
});
