var address = "";

$(document).ready(function() {
  document.getElementById('info').addEventListener('submit', function (e) {
    e.preventDefault();
    address = document.getElementById('address').value;
    var address = address.split(' ').join('+');
    var method = window.location.hash.substr(1);
    location.href= "main.html#"+method+"&Address="+address;

}, false);
});
