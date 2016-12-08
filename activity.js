var method ="";
var keyword = "";
function getTransit(){
  method = window.location.hash.substr(1);
}

function addBarre() {
    document.getElementById("barre").style.border = "thick solid #67696d";
    document.getElementById("barretext").style.color = "#67696d";
    keyword = keyword+ "_barre";
    getTransit()

}
function addBoxing() {
    document.getElementById("boxing").style.border = "thick solid #67696d";
    document.getElementById("boxingtext").style.color = "#67696d";
    keyword = keyword + "_boxing";
    getTransit()
}
function addYoga() {
    document.getElementById("yoga").style.border = "thick solid #67696d";
    document.getElementById("yogatext").style.color = "#67696d";
    keyword = keyword +"_yoga";
    getTransit();
}
function addGym() {
    document.getElementById("gym").style.border = "thick solid #67696d";
    document.getElementById("gymtext").style.color = "#67696d";
    keyword = keyword + "_gym";
    getTransit()
}
function addPilates() {
    document.getElementById("pilates").style.border = "thick solid #67696d";
    document.getElementById("pilatestext").style.color = "#67696d";
    keyword=keyword +"_pilates";
    getTransit()
}
function addSpin() {
    document.getElementById("spin").style.border = "thick solid #67696d";
    document.getElementById("spintext").style.color = "#67696d";
    keyword=keyword +"_spin";
    getTransit()
}

function go(){
  location.href = "address.html#"+method+"&Activity="+keyword;
}
