var regList = [];
if(localStorage['regNumbers']) {
    regList = localStorage.getItem('regNumbers').split(',')
}

var filter = regNumFilter();
var addBtn = document.querySelector(".add_btn");
var regDisplayList = document.querySelector(".reg_display_list");
var townOptions = document.querySelector(".town");
var resetBtn = document.querySelector(".reset_btn");
var validNum = 0;
var invalidNum = 0;
var clearBtn = document.querySelector(".clear_filter_btn");

function displayNum(regNum) {
    var plate = document.createElement("LI");
    plate.innerHTML = regNum;
    regDisplayList.insertBefore(plate,regDisplayList.firstChild);
}

regList.forEach(displayNum);

// var regStr = "CA 797 920,CJ 698 624,CL 449 592,CJ 526 250,CY 661 955,CL 896 784,CA 231 420,CY 553 506,CY 934 492,CL 133 445,CY 743 838,CY 761 312,CA 352 427,CY 351 575,CJ 379 543,CL 446 216,CJ 249 428,CJ 502 372,CJ 485 753,CY 736 149,CA 514 651,CL 759 952,CJ 816 811,CJ 839 718,CL 945 589,XCU 833 L,GKP 858 L,HRH 916 EC,AVP 705 GP,SID 498 GP,FHQ 438 L,HII 263 L,DEV 531 L,GIF 578 MP,RFN 956 MP,KAX 219 GP,LDZ 269 GP,TJK 441 EC,HHB 675 EC,JEE 854 L,KCE 205 L,JGD 838 L,GSF 931 L,KJQ 491 MP,AXS 828 L,ILI 604 MP,PSY 394 MP,JVK 582 EC,HAC 282 L,VCD 721 MP"
// regList = regStr.split(',');

addBtn.addEventListener("click", function(){
    invalidNum = 0;
    validNum = 0;
    regEntered = document.querySelector(".reg_input").value;
    document.querySelector(".confirmation").innerHTML = "";
    if (document.querySelector(".reg_input").classList.contains("no_value")) {
        document.querySelector(".reg_input").classList.remove("no_value");
    }
    if (regEntered == "") {
        document.querySelector(".reg_input").classList.add("no_value");
        return;
    }
    regEntered = regEntered.toUpperCase();
    var regEnteredList = regEntered.split(',');
    regEnteredList.forEach(function(value){
        var num = value.trim();
        num = filter.spaceCheck(num);

        if(filter.validityTest(num)) {
            filter.addToList(num);
            displayNum(num);
        }  
    });
    document.querySelector(".reg_input").value = "";
    validNum = regEnteredList.length - invalidNum;
    document.querySelector(".confirmation").innerHTML = "Valid registrations added: " + validNum + " | Invalid/Duplicate registrations not added: " + invalidNum;
    localStorage.setItem('regNumbers', regList.toString());
});

townOptions.onchange = function() {
    while (regDisplayList.firstChild) {
        regDisplayList.removeChild(regDisplayList.firstChild);
    }
    var townSelected = document.querySelector('.town').selectedIndex;
    var townList = filter.carsForTown(townOptions.options[townSelected].value);
    townList.forEach(displayNum);
}

resetBtn.addEventListener('click', function(){
    while (regDisplayList.firstChild) {
        regDisplayList.removeChild(regDisplayList.firstChild);
    }
    localStorage.setItem('regNumbers', "");
    regList=[];
});
clearBtn.addEventListener('click', function(){
    while (regDisplayList.firstChild) {
        regDisplayList.removeChild(regDisplayList.firstChild);
    }
    document.querySelector('.town').selectedIndex = 0;
    regList.forEach(displayNum);
});

