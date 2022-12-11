import data from './data.JSON' assert { type: 'json' };
console.log(data.Cookware[0].image);


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


var menuSpan = document.querySelectorAll(".menuSpan");

let img = document.querySelector('#display > img');
let btn_veg = document.querySelectorAll('.veg-table > button');
let btn_meat = document.querySelectorAll('.meat-table > button');
let btn_cookware = document.querySelectorAll('.cookware-table > button');
var menuSpan = document.querySelectorAll('.container > .result > #choice1 > .collasped');
var menuSpan2 = document.querySelectorAll('.container > .result > #choice2 > .collasped');
var menuSpan3 = document.querySelectorAll('.container > .result > #choice3 > .collasped');

var count = [];
var count2 = [];

var refresh = document.getElementById("clear-butn");

for (let i = 0; i < btn_veg.length; i++) {
  count[i] = 0;
  btn_veg[i].addEventListener("click", function () {
    count[i]++;
    console.log(count[i]);
    img.src = data.Vegetable[i].image;
    if (count[i] <= 1) {
      document.querySelector('.veg-table > button.veg-butn-on ').classList.remove('-on');
      this.classList.add('-on');
      result.innerHTML += menuSpan[i].innerHTML;
    }
  });


}
for (let i = 0; i < btn_meat.length; i++) {
  btn_meat[i].onclick = function () {
    count2[i]++;
    console.log(count2[i]);
    img.src = data.Meat[i].image;
 
      document.querySelector('.meat-table > button.meat-butn-on ').classList.remove('-on');
      this.classList.add('-on');
      result.innerHTML += menuSpan2[i].innerHTML;
  }
}


refresh.addEventListener("click",function(){
  window.location.reload();
  //refresh the page
});








