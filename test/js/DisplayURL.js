// import Beef from "../models/beefMode.js";
// const Beef = require("../models/beefMode");

let b = 1;

var meatButtons = document.querySelectorAll(".meat-butn-on");
var foodNames = document.querySelectorAll(".testing");

// assign each button using className
for (let i = 0; i < meatButtons.length; i++) {
  meatButtons[i].onclick = function () {
    b++;
    if (b % 2 == 0) {
      foodNames[i * 2].style.display = "block";
      foodNames[i * 2 + 1].style.display = "block";
    } else {
      foodNames[i * 2].style.display = "none";
      foodNames[i * 2 + 1].style.display = "none";
    }
  };
}

// meatButtons.forEach((t, i) => {
//   t.addEventListener("click", function () {
//     b++;
//     if (b % 2 == 0) {
//       foodNames[i * 2].style.display = "block";
//       foodNames[i * 2 + 1].style.display = "block";
//     } else {
//       foodNames[i * 2].style.display = "none";
//       foodNames[i * 2 + 1].style.display = "none";
//     }
//   });
// });
