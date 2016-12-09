var method ="";
var keyword = "";
var next = document.getElementById("next");

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
    }
    else if(document.getElementById("barre").style.border == "thick solid rgb(103, 105, 109)"){
      document.getElementById("barre").style.border = "0";
      document.getElementById("barretext").style.color = "#eaedf2";
      checkError();
    }
    keyword = keyword+ "_barre";
    getTransit();
  }

function addBoxing() {
  if(document.getElementById("boxing").style.border != "thick solid rgb(103, 105, 109)"){
    document.getElementById("boxing").style.border = "thick solid #67696d";
    document.getElementById("boxingtext").style.color = "#67696d";
    $('#next').css('visibility','visible');
  }
  else if(document.getElementById("boxing").style.border == "thick solid rgb(103, 105, 109)"){
    document.getElementById("boxing").style.border = "0";
    document.getElementById("boxingtext").style.color = "#eaedf2";
    checkError();
  }
    keyword = keyword + "_boxing";
    getTransit()
}
function addYoga() {
  if(document.getElementById("yoga").style.border != "thick solid rgb(103, 105, 109)"){
    document.getElementById("yoga").style.border = "thick solid #67696d";
    document.getElementById("yogatext").style.color = "#67696d";
    $('#next').css('visibility','visible');
  }
  else if(document.getElementById("yoga").style.border == "thick solid rgb(103, 105, 109)"){
    document.getElementById("yoga").style.border = "0";
    document.getElementById("yogatext").style.color = "#eaedf2";
    checkError();
  }
    keyword = keyword +"_yoga";
    getTransit();
}
function addGym() {
  if(document.getElementById("gym").style.border != "thick solid rgb(103, 105, 109)"){
    document.getElementById("gym").style.border = "thick solid #67696d";
    document.getElementById("gymtext").style.color = "#67696d";
    $('#next').css('visibility','visible');
  }
  else if(document.getElementById("gym").style.border == "thick solid rgb(103, 105, 109)"){
    document.getElementById("gym").style.border = "0";
    document.getElementById("gymtext").style.color = "#eaedf2";
    checkError();
  }
    keyword = keyword + "_gym";
    getTransit()
}
function addPilates() {
  if(document.getElementById("pilates").style.border != "thick solid rgb(103, 105, 109)"){
    document.getElementById("pilates").style.border = "thick solid #67696d";
    document.getElementById("pilatestext").style.color = "#67696d";
    $('#next').css('visibility','visible');
  }
  else if(document.getElementById("pilates").style.border == "thick solid rgb(103, 105, 109)"){
    document.getElementById("pilates").style.border = "0";
    document.getElementById("pilatestext").style.color = "#eaedf2";
    checkError();
  }
    keyword=keyword +"_pilates";
    getTransit()
}
function addSpin() {
  if(document.getElementById("spin").style.border != "thick solid rgb(103, 105, 109)"){
    document.getElementById("spin").style.border = "thick solid #67696d";
    document.getElementById("spintext").style.color = "#67696d";
    $('#next').css('visibility','visible');
  }
  else if(document.getElementById("spin").style.border == "thick solid rgb(103, 105, 109)"){
    document.getElementById("spin").style.border = "0";
    document.getElementById("spintext").style.color = "#eaedf2";
    checkError();
  }
    keyword=keyword +"_spin";
    getTransit()
}

function go(){
  location.href = "address.html#"+method+"&Activity="+keyword;
}

function back(){
  location.href = "index.html";
}
