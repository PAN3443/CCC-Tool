function checkInputVal(obj, allowFloat, allowNegative){
    
    var checkstring = obj.value;
    var pointIsSet = false;
    var pointIndex = 0;
    for(var i=checkstring.length-1; i>=0; i--){
        switch(checkstring[i]) {
            case "0":    
            break;
            case "1":    
            break;
            case "2":
            break;
            case "3":   
            break;
            case "4":   
            break;
            case "5":    
            break;
            case "6":
            break;
            case "7": 
            break;
            case "8":
            break;
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
                    if(i==checkstring.length-1){
                        checkstring = checkstring.slice(0, i);
                    }
                    else{
                        checkstring = checkstring.slice(0, i) + checkstring.slice(i+1);
                    }
                }
                break;
            }
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