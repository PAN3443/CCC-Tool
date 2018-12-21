function checkInputVal(obj, allowFloat, allowNegative){

    var checkstring = obj.value;
    var pointIsSet = false;
    var pointIndex = 0;

    var firstE = true;

    for(var i=checkstring.length-1; i>=0; i--){

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
            case ".":
                if(allowFloat==true){
                    if(pointIsSet==true){
                        if(i==0){
                            checkstring = checkstring.slice(i+1);
                        }
                        else{
                            if(i==checkstring.length-1){
                                checkstring = checkstring.slice(0, pointIndex);
                            }
                            else{
                                checkstring = checkstring.slice(0, pointIndex) + checkstring.slice(pointIndex+1);
                            }
                            pointIndex=i;
                        }

                    }
                    else{
                        pointIsSet=true;
                        pointIndex=i;
                    }
                    break;
                }

            case ",":
                if(allowFloat==true){
                    if(pointIsSet==true){
                        if(i==0){
                            checkstring = checkstring.slice(i+1);
                        }
                        else{
                            if(i==checkstring.length-1){
                                checkstring = checkstring.substr(0, i) + ".";
                                checkstring = checkstring.slice(0, pointIndex);
                            }
                            else{
                                checkstring = checkstring.substr(0, i) + "."+ checkstring.substr(i + 1);
                                checkstring = checkstring.slice(0, pointIndex) + checkstring.slice(pointIndex+1);
                            }
                            pointIndex=i;
                        }

                    }
                    else{
                        pointIsSet=true;
                        pointIndex=i;
                        if(i==checkstring.length-1)
                            checkstring = checkstring.substr(0, i) + ".";
                        else
                            checkstring = checkstring.substr(0, i) + "."+ checkstring.substr(i + 1);
                    }
                    break;
                }
            case "-":
            if(allowNegative==true){
                if(i!=0){

                    if(allowFloat && checkstring[i-1]=="e")
                    break;

                      if(i==checkstring.length-1){
                          checkstring = checkstring.slice(0, i);
                      }
                      else{
                          checkstring = checkstring.slice(0, i) + checkstring.slice(i+1);
                      }
                }
                break;
            }
            else{
              if(i==0){
                  checkstring = checkstring.slice(i+1);
              }
              else{
                  if(i==checkstring.length-1){
                      checkstring = checkstring.slice(0, i);
                  }
                  else{
                      checkstring = checkstring.slice(0, i) + checkstring.slice(i+1);
                  }
              }
              break;
            }

            case "e":

              if(i==0){
                checkstring = checkstring.slice(0, i) + checkstring.slice(i+1);
              }
              else{

                if(allowFloat){

                  if(firstE){

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
                    break;
                  }
                }
                if(i==checkstring.length-1){
                    checkstring = checkstring.slice(0, i);
                }
                else{
                    checkstring = checkstring.slice(0, i) + checkstring.slice(i+1);
                }

              }


            break;
            case "+":

              if(i!=0){
                  if(allowFloat && checkstring[i-1]=="e")
                  break;
              }
              // else default


            default:

            if(i==0){
                checkstring = checkstring.slice(i+1);
            }
            else{
                if(i==checkstring.length-1){
                    checkstring = checkstring.slice(0, i);
                }
                else{
                    checkstring = checkstring.slice(0, i) + checkstring.slice(i+1);
                }
            }


        }
    }
    obj.value = checkstring;

}
