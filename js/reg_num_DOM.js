var regListWidgA = [];
if (localStorage["regNumbers"]) {
  regListWidgA = localStorage.getItem("regNumbers").split(",");
}

var townsWidgA = {
  CJ: "Paarl",
  CY: "Bellville",
  CL: "Stellenbosch",
  CK: "Malmesbury",
  CA: "Cape Town",
  CF: "Kuilsriver",
};

var filter = regNumFilter(regListWidgA, townsWidgA);
var addBtn = document.querySelector(".add_btn");
var regDisplayList = document.querySelector(".reg_display_list");
var townOptions = document.querySelector(".town");
var resetBtn = document.querySelector(".reset_btn");
var clearBtn = document.querySelector(".clear_filter_btn");

function displayNum(regNum) {
  var plate = document.createElement("LI");
  plate.innerHTML = regNum;
  regDisplayList.insertBefore(plate, regDisplayList.firstChild);
}

filter.getRegList().forEach(displayNum);

addBtn.addEventListener("click", function () {
  while (regDisplayList.firstChild) {
    regDisplayList.removeChild(regDisplayList.firstChild);
  }
  document.querySelector(".town").selectedIndex = 0;
  filter.getRegList().forEach(displayNum);
  regEntered = document.querySelector(".reg_input").value;
  if (regEntered == "") {
    document.querySelector(".reg_input").classList.add("no_value");
    setTimeout(function () {
      document.querySelector(".reg_input").classList.remove("no_value");
    }, 1500);
    return;
  }

  regEnteredList = filter.inputToList(regEntered);
  regEnteredList.forEach(function (num, i) {
    setTimeout(function () {
      if (filter.validityTest(num)) {
        filter.addToList(num);
        displayNum(num);
        document.querySelector(".confirmation").classList.add("valid");
        document.querySelector(".confirmation").innerHTML = num + " was sucessfully captured.";
      } else {
        document.querySelector(".confirmation").classList.add("invalid");
        document.querySelector(".confirmation").innerHTML = num + " is an invalid or duplicate input. Registration number not captured.";
      }
    }, 2000 * i);
  });

  setTimeout(function () {
    localStorage.setItem("regNumbers", filter.getRegList().toString());

    if (document.querySelector(".confirmation").classList.contains("invalid")) {
      document.querySelector(".confirmation").classList.remove("invalid");
    }
    if (document.querySelector(".confirmation").classList.contains("valid")) {
      document.querySelector(".confirmation").classList.remove("valid");
    }
    document.querySelector(".confirmation").innerHTML = "Enter a registration number.";
  }, 2000 * regEnteredList.length);
  document.querySelector(".reg_input").value = "";
});

townOptions.onchange = function () {
  while (regDisplayList.firstChild) {
    regDisplayList.removeChild(regDisplayList.firstChild);
  }
  var townSelected = document.querySelector(".town").selectedIndex;
  var townList = filter.carsForTown(townOptions.options[townSelected].value);
  townList.forEach(displayNum);
};

resetBtn.addEventListener("click", function () {
  while (regDisplayList.firstChild) {
    regDisplayList.removeChild(regDisplayList.firstChild);
  }
  localStorage.removeItem("regNumbers");
  regListWidgA = [];
  filter = regNumFilter(regListWidgA, townsWidgA);
});
clearBtn.addEventListener("click", function () {
  while (regDisplayList.firstChild) {
    regDisplayList.removeChild(regDisplayList.firstChild);
  }
  document.querySelector(".town").selectedIndex = 0;
  filter.getRegList().forEach(displayNum);
});

//Handlebars Widget

var regWidg = {
  town: {
    CJ: "Paarl",
    CY: "Bellville",
    CL: "Stellenbosch",
    CK: "Malmesbury",
    CA: "Cape Town",
    CF: "Kuilsriver",
  },
  regNum: [],
};
if (localStorage["regNumbersHB"]) {
  regWidg.regNum = localStorage.getItem("regNumbersHB").split(",");
}
var filterHB = regNumFilter(regWidg.regNum, regWidg.town);

document.addEventListener("DOMContentLoaded", function () {
  var templateSource = document.querySelector("#regNumTemplate").innerHTML;
  var regNumTemplate = Handlebars.compile(templateSource);
  var regNum = document.querySelector("#regNumHandlebars");
  regNum.innerHTML = regNumTemplate(regWidg);
  var addBtn = document.querySelector("#add_btnHB");
  var regDisplayList = document.querySelector("#reg_display_listHB");
  var townOptions = document.querySelector("#townHB");
  var resetBtn = document.querySelector("#reset_btnHB");
  var clearBtn = document.querySelector("#clear_filter_btnHB");

  function displayNum(regNum) {
    var plate = document.createElement("LI");
    plate.innerHTML = regNum;
    regDisplayList.insertBefore(plate, regDisplayList.firstChild);
  }

  addBtn.addEventListener("click", function () {
    let regList = filterHB.getRegList();
    while (regDisplayList.firstChild) {
      regDisplayList.removeChild(regDisplayList.firstChild);
    }
    document.querySelector("#townHB").selectedIndex = 0;
    regList.forEach(displayNum);
    regEntered = document.querySelector("#reg_inputHB").value;
    if (regEntered == "") {
      document.querySelector("#reg_inputHB").classList.add("no_value");
      setTimeout(function () {
        document.querySelector("#reg_inputHB").classList.remove("no_value");
      }, 1500);
      return;
    }

    regEnteredList = filterHB.inputToList(regEntered);
    regEnteredList.forEach(function (num, i) {
      setTimeout(function () {
        if (filterHB.validityTest(num)) {
          filterHB.addToList(num);
          displayNum(num);
          document.querySelector("#confirmationHB").classList.add("valid");
          document.querySelector("#confirmationHB").innerHTML = num + " was sucessfully captured.";
        } else {
          document.querySelector("#confirmationHB").classList.add("invalid");
          document.querySelector("#confirmationHB").innerHTML = num + " is an invalid or duplicate input. Registration number not captured.";
        }
      }, 2000 * i);
    });

    setTimeout(function () {
      localStorage.setItem("regNumbersHB", filterHB.getRegList().toString());
      if (document.querySelector("#confirmationHB").classList.contains("invalid")) {
        document.querySelector("#confirmationHB").classList.remove("invalid");
      }
      if (document.querySelector("#confirmationHB").classList.contains("valid")) {
        document.querySelector("#confirmationHB").classList.remove("valid");
      }
      document.querySelector("#confirmationHB").innerHTML = "Enter a registration number.";
    }, 2000 * regEnteredList.length);
    document.querySelector("#reg_inputHB").value = "";
  });

  townOptions.onchange = function () {
    while (regDisplayList.firstChild) {
      regDisplayList.removeChild(regDisplayList.firstChild);
    }
    var townSelected = document.querySelector("#townHB").selectedIndex;
    var townList = filterHB.carsForTown(townOptions.options[townSelected].value);

    townList.forEach(displayNum);
  };

  resetBtn.addEventListener("click", function () {
    while (regDisplayList.firstChild) {
      regDisplayList.removeChild(regDisplayList.firstChild);
    }
    localStorage.removeItem("regNumbersHB");
    regWidg.regNum = [];
    filterHB = regNumFilter(regWidg.regNum, regWidg.town);
  });
  clearBtn.addEventListener("click", function () {
    while (regDisplayList.firstChild) {
      regDisplayList.removeChild(regDisplayList.firstChild);
    }
    document.querySelector("#townHB").selectedIndex = 0;
    filterHB.getRegList().forEach(displayNum);
  });
});
