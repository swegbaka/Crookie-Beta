filterSelection("all")
    function filterSelection(c) {
      var fBtn, i;
      fBtn = document.getElementsByClassName("filterBtn");
      console.log(fBtn);
      if (c == "all")
        c = "";
      for (i = 0; i < fBtn.length; i++) {
        RemoveClass(fBtn[i], "show");
        if (fBtn[i].className.indexOf(c) > -1) {
          AddClass(fBtn[i], "show");
        }
      }

    }

    function AddClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
          element.className += " " + arr2[i];
        }
      }
    }

    
    function RemoveClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
          arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
      }
      element.className = arr1.join(" ");
    }

    // place the -on class to the current button
    var btns = document.getElementsByClassName("cookware-butn");
    let img = document.querySelector('#display > img');
    
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("-on");
        current[0].className = current[0].className.replace(" on", "");
        this.className += " on";
      });
    }