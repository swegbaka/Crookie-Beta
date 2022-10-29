import data from './data.JSON' assert { type: 'json' };
//console.log(data.Vegetable[0].image);

var menuBotton = document.getElementById("menuBotton");
var NavPanel = document.getElementById("NavPanel");
var menu = document.getElementById("menu");

NavPanel.style.right = "-250px";

menuBotton.onclick = function () {
  if (NavPanel.style.right == "-250px") {
    NavPanel.style.right = "0";
    menu.src = "IMG/close.png";
  } else {
    NavPanel.style.right = "-250px";
    menu.src = "IMG/menu.png";
  }
};

/*let btn_cookware = document.querySelectorAll('.cookware-butn');
console.log(btn_cookware.length);

for(let i = 0; i < btn_cookware.length; i++){
  btn_cookware[i].onclick = function(){
    console.log("got it~");
  }
}*/



/*window.onload = function(){
  //add a cookware to the box
  myClick(".cookware-butn",function(){
    alert("hello")
    var li = document.createElement("li");
    var gzText = document.createTextNode("cookware1");
    li.appendChild(gzText);

    var list = document.getElementById("display");
    list.appendChild(li);
  });
};

function myClick(idStr, fun){
  var btn = document.querySelector(idStr);
  btn.onclick = fun;
}*/


let img = document.querySelector('#display > img');
let btn_veg = document.querySelectorAll('.veg-table > button');
let btn_meat = document.querySelectorAll('.meat-table > button');
let btn_cookware = document.querySelectorAll('.cookware-table > button');


for (let i = 0; i < btn_veg.length; i++) {
  btn_veg[i].onclick = function () {
    document.querySelector('.veg-table > button.veg-butn-on ').classList.remove('-on');
    this.classList.add('-on');
    result.innerHTML = btn_veg[i].innerHTML;
    img.src = data.Vegetable[i].image;
  }
}


for (let i = 0; i < btn_meat.length; i++) {
  btn_meat[i].onclick = function () {
    document.querySelector('.meat-table > button.meat-butn-on ').classList.remove('-on');
    this.classList.add('-on');
    result.innerHTML = btn_meat[i].innerHTML;
    img.src = data.Meat[i].image;
  }
}

for (let i = 0; i < btn_cookware.length; i++) {
  btn_cookware[i].onclick = function () {
    document.querySelector('.cookware-table > button.cookware-butn-on ').classList.remove('-on');
    this.classList.add('-on');
    result.innerHTML = btn_cookware[i].innerHTML;
    img.src = data.Cookware[i].image;
  }
}
