function checkProbeInputVal(objID){

    var obj = document.getElementById(objID);
    var checkstring = obj.value;
    var pointIsSet = false;
    var pointIndex = 0;
    var newNumberStarted = true;
    var newRangeStarted = true;
    var lastBorderIsSemi = true;

    var indexArray=[];

    var firstE = true;

    var commaCounter = 0;
    var semiCounter = 0;

    for(var i=0; i<checkstring.length; i++){
        switch(checkstring[i]) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
          break;

            case "e":

              if(i==0)
                indexArray.push(i);
              else{
                if(firstE && checkstring[i-1]!=";" && checkstring[i-1]!=","){

                  if(i!=checkstring.length-1){
                      if(firstE && checkstring[i+1]==="+" || checkstring[i+1]==="-"){
                        firstE=false;
                      }
                      else{
                        indexArray.push(i);
                      }
                  }
                  else{
                    firstE=false;
                  }

                }
                else{
                  if(i==checkstring.length-1){
                    indexArray.push(i);
                  }
                }
              }


            break;
            case ".":

                    if(pointIsSet==true){
                            indexArray.push(i);
                    }
                    else{

                        if(checkstring[i-1]==="e" || checkstring[i-1]===";" || checkstring[i-1]==="," || checkstring[i-1]==="." || checkstring[i-1]==="-"|| checkstring[i-1]==="+"){
                          indexArray.push(i);
                        }
                        else{
                          pointIsSet=true;
                        }
                    }
                    break;


            case ",":


              if(lastBorderIsSemi){

                if(checkstring[i-1]==="e" || checkstring[i-1]===";" || checkstring[i-1]==="," || checkstring[i-1]==="." || checkstring[i-1]==="-"|| checkstring[i-1]==="+"){
                  indexArray.push(i);
                }
                else {
                  // new number
                  firstE=true;
                  pointIsSet=false;
                  lastBorderIsSemi=false;
                  commaCounter++;
                }

              }
              else{
                indexArray.push(i);
              }



            break;
            case ";":


                if(lastBorderIsSemi==false){

                  if(checkstring[i-1]==="e" || checkstring[i-1]===";" || checkstring[i-1]==="," || checkstring[i-1]==="." || checkstring[i-1]==="-"|| checkstring[i-1]==="+"){
                    indexArray.push(i);
                  }
                  else {
                    // new number
                    firstE=true;
                    pointIsSet=false;
                    lastBorderIsSemi=true;
                    semiCounter++;
                  }

                }
                else{
                  indexArray.push(i);
                }

                break;
            case "-": case "+":

                if(i!=0){
                  if(checkstring[i-1]!="e" && checkstring[i-1]!=";" && checkstring[i-1]!=","){
                    indexArray.push(i);
                  }
                }


                break;

            default:

            indexArray.push(i);


        }
    }




    //// check input semantic
    document.getElementById("CustomProbeInfoText").innerHTML = "";
    document.getElementById("CustomProbeInfoText").style.color="red";
    var content = checkstring;
    var errorMess3 = "Error: Following Chars are not compatible with the custom probe grammer: \n";
    var grammerErr = "";
    if(indexArray.length!=0){
      for(var i=indexArray.length-1; i>=0; i--){

        switch(checkstring[indexArray[i]]) {
            case " ":
            case "\n":
            case "\t":
            case "\r":
            if(indexArray[i]==0){
                content = content.slice(indexArray[i]+1);
            }
            else{
              if(indexArray[i]==content.length-1){
                  content = content.slice(0, indexArray[i]);
              }
              else{
                  content = content.slice(0, indexArray[i]) + content.slice(indexArray[i]+1);
              }
            }
            break;
            default:
            // add grammerErr

            grammerErr = "\n Index "+indexArray[i]+ ": Character=\""+ checkstring[indexArray[i]]+"\";"+ grammerErr;
         }
     }

     if(grammerErr != ""){
       document.getElementById("CustomProbeInfoText").innerHTML = errorMess3+grammerErr;
       return false;
     }


    }


    //obj.value = checkstring;





      if(document.getElementById("id_inputCustomProbeRanges").value===""){
        document.getElementById("CustomProbeInfoText").innerHTML = "Error: The input is emtpy.";
        return false;
      }
      else{
        if(commaCounter!=semiCounter){
          document.getElementById("CustomProbeInfoText").innerHTML = "Error: The number of commas is not equal to the number of semicolons.";
          return false;
        }

        var falseArrayElements = [];
        var startValue=[];
        var endValue=[];

        // to give the user a better overview, we allow new lines and spaces at the input field and remove them now


        var ranges = content.split(";");

        for (var i = 0; i < ranges.length; i++) {
          var range = ranges[i].split(",");
          if(range.length==2){

            var val1 = parseFloat(range[0]);
            var val2 = parseFloat(range[1]);
            startValue.push(val1);
            endValue.push(val2);

            if(val2<val1){
              falseArrayElements.push(i);
            }

          }
          else{
            if(range!=""){
              document.getElementById("CustomProbeInfoText").innerHTML = "Error: A false number of values has been detected. Please check the input part \""+ranges[i]+"\".";
              return false;
            }
          }
        }


        if(falseArrayElements.length>0){
          var errorMess = "Error: The algorithm found ranges with a bigger first value. Please check the following ranges:";

          for (var i = 0; i < falseArrayElements.length; i++) {
            errorMess = errorMess+ startValue[falseArrayElements[i]]+","+endValue[falseArrayElements[i]]+";";
          }

          document.getElementById("CustomProbeInfoText").innerHTML = errorMess;
          return false;
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        /// check Overlapping

        var errorMess = "Error: The algorithm found overlapping ranges. Please check the following ranges: ";
        var setError =false;

        for (var i = 0; i < startValue.length-1; i++) {

            var currentStart = startValue[i];
            var currentEnd = endValue[i];
            var isOverlapping = false;

            var errorMess2 = "\tThe range \""+currentStart+","+currentEnd+"; is overlapping with  ";

            for (var j = i+1; j < startValue.length; j++) {

                var checkStart = startValue[j];
                var checkEnd = endValue[j];


                if(checkEnd<=currentStart)
                  continue;

                if(checkStart>=currentEnd)
                  continue;


                isOverlapping=true;
                errorMess2=errorMess2+checkStart+","+checkEnd+";";

            }

            errorMess2=errorMess2+". \n"

            if(isOverlapping){
              setError=true;
              errorMess = errorMess + errorMess2;
            }
        }

        if(setError){
          document.getElementById("CustomProbeInfoText").innerHTML = errorMess;
          return false;
        }
        ///////////////////////////////////////////////////////////////////////////////////
        /// check order


        var changedOrder = false;
        var swapped = false;

        var n = startValue.length;

        do {
          swapped = false
          for (i=0; i<n-1; ++i){
            if (endValue[i] > startValue[i+1]){

              // swap
              var tmpVal = startValue[i];
              startValue[i]=startValue[i+1];
              startValue[i+1]=tmpVal;

              tmpVal = endValue[i];
              endValue[i]=endValue[i+1];
              endValue[i+1]=tmpVal;

              changedOrder=true;
              swapped = true
            } // Ende if
          } // Ende for
          n = n-1
        } while (swapped);

        if(changedOrder){

          var inputString = "";

          for (var i = 0; i < startValue.length; i++) {
            inputString=inputString+startValue[i]+","+endValue[i]+";";
          }

          document.getElementById("id_inputCustomProbeRanges").value=inputString;

          document.getElementById("CustomProbeInfoText").style.color="orange";
          document.getElementById("CustomProbeInfoText").innerHTML = "Info: The order of the probe ranges was not correct. The input has been adjusted automatically.";
        }
        else{
          document.getElementById("CustomProbeInfoText").style.color="green";
          document.getElementById("CustomProbeInfoText").innerHTML = "The input is correct.";
        }


      }


    return true;

}
