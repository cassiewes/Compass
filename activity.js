var method ="";
var keyword = "";
var next = document.getElementById("next");
var yoga = false;
var barre = false;
var spin = false;
var boxing = false;
var pilates = false;
var gym = false;

function checkError(){
  if((document.getElementById("barre").style.border != "thick solid rgb(103, 105, 109)")&&
  (document.getElementById("boxing").style.border != "thick solid rgb(103, 105, 109)")&&
  (document.getElementById("yoga").style.border != "thick solid rgb(103, 105, 109)")&&
  (document.getElementById("gym").style.border != "thick solid rgb(103, 105, 109)")&&
  (document.getElementById("pilates").style.border != "thick solid rgb(103, 105, 109)")&&
  (document.getElementById("spin").style.border != "thick solid rgb(103, 105, 109)")){
    $('#next').css('visibility','hidden');
  }
}

function getTransit(){
  method = window.location.hash.substr(1);
}

function addBarre() {
    if(document.getElementById("barre").style.border != "thick solid rgb(103, 105, 109)"){
      document.getElementById("barre").style.border = "thick solid #67696d";
      document.getElementById("barretext").style.color = "#67696d";
      $('#next').css('visibility','visible');
      barre = true;
    }
    else if(document.getElementById("barre").style.border == "thick solid rgb(103, 105, 109)"){
      document.getElementById("barre").style.border = "0";
      document.getElementById("barretext").style.color = "#eaedf2";
      checkError();
      barre = false;
    }
    getTransit();
  }

function addBoxing() {
  if(document.getElementById("boxing").style.border != "thick solid rgb(103, 105, 109)"){
    document.getElementById("boxing").style.border = "thick solid #67696d";
    document.getElementById("boxingtext").style.color = "#67696d";
    $('#next').css('visibility','visible');
    boxing = true;
  }
  else if(document.getElementById("boxing").style.border == "thick solid rgb(103, 105, 109)"){
    document.getElementById("boxing").style.border = "0";
    document.getElementById("boxingtext").style.color = "#eaedf2";
    boxing = false;
    checkError();
  }
    getTransit()
}
function addYoga() {
  if(document.getElementById("yoga").style.border != "thick solid rgb(103, 105, 109)"){
    document.getElementById("yoga").style.border = "thick solid #67696d";
    document.getElementById("yogatext").style.color = "#67696d";
    yoga = true;
    $('#next').css('visibility','visible');
  }
  else if(document.getElementById("yoga").style.border == "thick solid rgb(103, 105, 109)"){
    document.getElementById("yoga").style.border = "0";
    document.getElementById("yogatext").style.color = "#eaedf2";
    yoga = false;
    checkError();
  }
    getTransit();
}
function addGym() {
  if(document.getElementById("gym").style.border != "thick solid rgb(103, 105, 109)"){
    document.getElementById("gym").style.border = "thick solid #67696d";
    document.getElementById("gymtext").style.color = "#67696d";
    gym = true;
    $('#next').css('visibility','visible');
  }
  else if(document.getElementById("gym").style.border == "thick solid rgb(103, 105, 109)"){
    document.getElementById("gym").style.border = "0";
    document.getElementById("gymtext").style.color = "#eaedf2";
    gym = false;
    checkError();
  }
    getTransit()
}
function addPilates() {
  if(document.getElementById("pilates").style.border != "thick solid rgb(103, 105, 109)"){
    document.getElementById("pilates").style.border = "thick solid #67696d";
    document.getElementById("pilatestext").style.color = "#67696d";
    pilates = true;
    $('#next').css('visibility','visible');
  }
  else if(document.getElementById("pilates").style.border == "thick solid rgb(103, 105, 109)"){
    document.getElementById("pilates").style.border = "0";
    document.getElementById("pilatestext").style.color = "#eaedf2";
    pilates = false;
    checkError();
  }
    getTransit()
}
function addSpin() {
  if(document.getElementById("spin").style.border != "thick solid rgb(103, 105, 109)"){
    document.getElementById("spin").style.border = "thick solid #67696d";
    document.getElementById("spintext").style.color = "#67696d";
    $('#next').css('visibility','visible');
    spin = true;
  }
  else if(document.getElementById("spin").style.border == "thick solid rgb(103, 105, 109)"){
    document.getElementById("spin").style.border = "0";
    document.getElementById("spintext").style.color = "#eaedf2";
    spin = false;
    checkError();
  }
    getTransit()
}

function go(){
  if (yoga == true){
    keyword = keyword + "_yoga";
  }
  if (barre == true){
    keyword = keyword + "_barre";
  }
  if (gym == true){
    keyword = keyword + "_gym";
  }
  if (pilates == true){
    keyword = keyword + "_pilates";
  }
  if (spin == true){
    keyword = keyword + "_spin";
  }
  if (boxing == true){
    keyword = keyword + "_boxing";
  }

  location.href = "address.html#"+method+"&Activity="+keyword;
}

function back(){
  location.href = "index.html";
}

function backFAQ(){
  var transit = window.location.hash.substr(1);
  t = transit.split("&")[0];
  location.href="activity.html#"+t;
}

function FAQ(){
  getTransit()
  location.href="faq_activities.html#"+method;
}
