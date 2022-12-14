import data from "./data.JSON" assert { type: "json" };
// console.log(data.Cookware[0].image);

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

for (let i = 0; i < btn_cookware.length; i++) {
  btn_cookware[i].onclick = function () {
    console.log("got it~");
  };
}

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

let img = document.querySelector("#display > img");
let btn_veg = document.querySelectorAll(".veg-table > button");
let btn_meat = document.querySelectorAll(".meat-table > button");
let btn_cookware = document.querySelectorAll(".cookware-table > button");

for (let i = 0; i < btn_veg.length; i++) {
  btn_veg[i].onclick = function () {
    document
      .querySelector(".veg-table > button.veg-butn-on ")
      .classList.remove("-on");
    this.classList.add("-on");
    result.innerHTML = btn_veg[i].innerHTML;
    // img.src = data.Vegetable[i].image;
  };

  let img = document.querySelector("#display > img");
  let btn_veg = document.querySelectorAll(".veg-table > button");
  let btn_meat = document.querySelectorAll(".meat-table > button");
  let btn_cookware = document.querySelectorAll(".cookware-table > button");
  var menuSpan = document.querySelectorAll(
    ".container > .result > #choice1 > .collasped"
  );
  var menuSpan2 = document.querySelectorAll(
    ".container > .result > #choice2 > .collasped"
  );
  var menuSpan3 = document.querySelectorAll(
    ".container > .result > #choice3 > .collasped"
  );

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
        document
          .querySelector(".veg-table > button.veg-butn-on ")
          .classList.remove("-on");
        this.classList.add("-on");
        result.innerHTML += menuSpan[i].innerHTML;
      }
    });
  }

  for (let i = 0; i < btn_meat.length; i++) {
    count2[i] = 0;
    btn_meat[i].onclick = function () {
      document
        .querySelector(".meat-table > button.meat-butn-on ")
        .classList.remove("-on");
      this.classList.add("-on");
      result.innerHTML = btn_meat[i].innerHTML;
    };
  }

  for (let i = 0; i < btn_cookware.length; i++) {
    btn_cookware[i].onclick = function () {
      document
        .querySelector(".cookware-table > button.cookware-butn-on ")
        .classList.remove("-on");
      this.classList.add("-on");
      result.innerHTML = btn_cookware[i].innerHTML;
      img.src = data.Cookware[i].image;
    };
  }

  count2[i]++;
  console.log(count2[i]);
  img.src = data.Meat[i].image;
  if (count2[i] <= 1) {
    document
      .querySelector(".meat-table > button.meat-butn-on ")
      .classList.remove("-on");
    this.classList.add("-on");
    result.innerHTML += menuSpan2[i].innerHTML;
  }
}

refresh.addEventListener("click", function () {
  window.location.reload();
  //refresh the page
});
