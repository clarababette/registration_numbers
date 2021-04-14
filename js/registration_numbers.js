var validNum = 0;
var invalidNum = 0;
var duplicateRegNums = [];
var invalidRegNums = [];


function regNumFilter() {


    const towns = {
        'CJ' : 'Paarl',
        'CY' : 'Bellville',
        'CL' : 'Stellenbosch',
        'CK' : 'Malmesbury',
        'CA' : 'Cape Town',
        'CF' : 'Kuilsriver'
    }

    function addToList(inputReg) {
        regList.unshift(inputReg);
    }

    function carsForTown(townName) {
        var townPrefix = '';
        var townCars = [];
      
          for (town in towns) {
            if (towns[town] === townName) {
              townPrefix = town;
            }
        }
       
      regList.forEach(function(car) {
          if(car.startsWith(townPrefix)) {
           townCars.push(car);
           }
      });
      return townCars;
    }

    function validityTest(reg) {
      var pattern = /^((CJ|CY|CL|CK|CA|CAA|CF)\s\d{3}\s\d{3})$/;
      var validity = true;

      if(pattern.test(reg)) {
        regList.forEach(function(x){
          if(x == reg) {
            invalidNum++;
            duplicateRegNums.push(reg);
            validity = false;
          } else {
            validNum++;
          }
        });
      } else {
        invalidNum++;
        invalidRegNums.push(reg);
        validity = false;
      }
      return validity;
    }

    function spaceCheck(num) {
      var patNoSpaces = /^((CJ|CY|CL|CK|CA|CF)\d{3}\d{3})$/;
        var patNoFirstSpace = /^((CJ|CY|CL|CK|CA|CF)\d{3}\s\d{3})$/;
        var patNoSecondSpace = /^((CJ|CY|CL|CK|CA|CF)\s\d{3}\d{3})$/;
       
        if (patNoSpaces.test(num)) {
            num = num.substring(0,2)+' '+num.substring(2,5)+' '+num.substring(5);
        }
        if (patNoFirstSpace.test(num)) {
            num = num.substring(0,2)+' '+num.substring(2);
        }
        if (patNoSecondSpace.test(num)) {
  
            num = num.substring(0,6)+' '+num.substring(6);
  
        }
        var patNoSpaces = /^(CAA\d{3}\d{3})$/;
        var patNoFirstSpace = /^(CAA\d{3}\s\d{3})$/;
        var patNoSecondSpace = /^(CAA\s\d{3}\d{3})$/;
       
        if (patNoSpaces.test(num)) {
            num = num.substring(0,3)+' '+num.substring(3,6)+' '+num.substring(6);
        }
        if (patNoFirstSpace.test(num)) {
            num = num.substring(0,3)+' '+num.substring(3);
        }
        if (patNoSecondSpace.test(num)) {
            num = num.substring(0,7)+' '+num.substring(7);
        }

        return num;
    }

    function inputToList(str) {
      str = str.toUpperCase();
      var list = str.split(',');
      list.forEach(function(value,i,list){
        value = value.trim();
        list[i] = spaceCheck(value);
      });
      return list;
    }

    function confirmationMsg() {
      if (invalidNum == 0) {
        return "Registration number successfully captured."
      } else {
        return "Invalid or duplicate input. Registration number not captured.";
      }
    }


    return {
        addToList,
        carsForTown,
        validityTest,
        spaceCheck,
        inputToList,
        confirmationMsg
    }
}