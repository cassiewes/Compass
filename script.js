var type = "walk";
var filters =[];
var address = "";

function walk()
{
  type = "walk";
  //sets the mode of transportation to walk
}

function bike()
{
  type="bike";
  //sets the mode of transportation to bike
}

function barre(){
  filters.push("barre");
}

function boxing(){
  filters.push("boxing");
}

function yoga(){
  filters.push("yoga");
}

function gym(){
  filters.push("gym");
}

function pilates(){
  filters.push("pilates");
}

function spin(){
  filers.push("spin");
}

$(document).ready(function() {
  document.getElementById('info').addEventListener('submit', function (e) {
    e.preventDefault();
    address = document.getElementById('address').value;
}, false);
});
