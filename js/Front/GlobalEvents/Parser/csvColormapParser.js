function csvColormapParserFile(csvString) {

  var csvlines = csvString.split("\n");
  var askInterval = false;
  var saveIntervals = true;
  var tmpCMS = new class_CMS();

  if (csvlines.length == 0)
  return tmpCMS;

  var space = checkCSVColorspace(csvlines[0]);
  var val1_RatioFactor = 1;
  var val2_RatioFactor = 1;
  var val3_RatioFactor = 1;

  for (var i = 1; i < csvlines.length; i++) {
    var keyData = csvlines[i].split(/[;,]+/);


    if(space!="LAB" && space!="DIN99"){
      if (keyData.length > 3) {
        var v1 = parseFloat(keyData[1]);
        var v2 = parseFloat(keyData[2]);
        var v3 = parseFloat(keyData[3]);
        if (v1 > 1.0 || v2 > 1.0 || v3 > 1.0) {
          switch (space) {
              case "RGB":
              val1_RatioFactor = 255;
              val2_RatioFactor = 255;
              val3_RatioFactor = 255;
                break;
              case "HSV":
              val1_RatioFactor = 360;
              val2_RatioFactor = 100;
              val3_RatioFactor = 100;
                break;
              case "LCH":
              val1_RatioFactor = 100;
              val2_RatioFactor = 100;
              val3_RatioFactor = 360;
                break;
            }
          break;
        }
      }
    }

  }

    var checkData = csvlines[1].split(/[;,]+/);
    var hasCMS = false;
    var hasMoT = false;
    var minHeader = 6;

    switch (checkData.length) {
      case 5:
        // do nothing
        break;
      case 6:
        hasCMS=true;
        minHeader = 7;
        break;
      case 7:
        hasCMS=true;
        hasMoT=true;
        minHeader = 8;
        break;
      default:
        return tmpCMS;

    }

    for (var i = 1; i < csvlines.length; i++) {

      var keyData = csvlines[i].split(/[;,]+/);

        var x = parseFloat(keyData[0]);
        var val1 = parseFloat(keyData[1])/val1_RatioFactor;
        var val2 = parseFloat(keyData[2])/val2_RatioFactor;
        var val3 = parseFloat(keyData[3])/val3_RatioFactor;
        var o = parseFloat(keyData[4]);

        var tmpColor = getLoadedColor(val1,val2,val3,space);

        switch (i) {
          case 1:
              var keyData_Next = csvlines[i+1].split(/[;,]+/);
              var val1_Next = parseFloat(keyData_Next[1])/val1_RatioFactor;
              var val2_Next = parseFloat(keyData_Next[2])/val2_RatioFactor;
              var val3_Next = parseFloat(keyData_Next[3])/val3_RatioFactor;

            var tmpColor2 = getLoadedColor(val1_Next,val2_Next,val3_Next,space);

             if(tmpColor2.equalTo(tmpColor)){
               // nil key
               var newKey = new class_Key(undefined,undefined,x,true);
               newKey.setOpacityVal(o,"left");
               newKey.setOpacityVal(o,"right");
               tmpCMS.pushKey(newKey);

             }else{
               // right key
               var newKey = new class_Key(undefined,tmpColor,x,true);
               newKey.setOpacityVal(o,"left");
               newKey.setOpacityVal(o,"right");
               tmpCMS.pushKey(newKey);
             }
            break;
           case csvlines.length-1:
               // right key
               var newKey = new class_Key(tmpColor,undefined,x,true);
               newKey.setOpacityVal(o,"left");
               newKey.setOpacityVal(o,"right");
               tmpCMS.pushKey(newKey);
            break;
          default:


             if(hasCMS){
               if(keyData[5]=="false"){
                 continue; // continue if cms attribute exist and if it is false
               }
             }

             var keyData_Next = csvlines[i+1].split(/[;,]+/);
             var keyData_Previous = csvlines[i-1].split(/[;,]+/);

             var x_Previous = parseFloat(keyData_Previous[0]);

             var x_Next = parseFloat(keyData_Next[0]);
             var val1_Next = parseFloat(keyData_Next[1])/val1_RatioFactor;
             var val2_Next = parseFloat(keyData_Next[2])/val2_RatioFactor;
             var val3_Next = parseFloat(keyData_Next[3])/val3_RatioFactor;


             var tmpColor2 = getLoadedColor(val1_Next,val2_Next,val3_Next,space);


             if(x_Previous==x){

               var val1_Prev = parseFloat(keyData_Previous[1])/val1_RatioFactor;
               var val2_Prev = parseFloat(keyData_Previous[2])/val2_RatioFactor;
               var val3_Prev = parseFloat(keyData_Previous[3])/val3_RatioFactor;

               var tmpColor_Prev = getLoadedColor(val1_Prev,val2_Prev,val3_Prev,space);


               if(tmpColor2.equalTo(tmpColor)){
                 // left key
                 var o_Prev = parseFloat(keyData_Previous[4]);
                 var newKey = new class_Key(tmpColor_Prev,undefined,x,true);

                 newKey.setOpacityVal(o_Prev,"left");
                 newKey.setOpacityVal(o,"right");

                 if(hasMoT){
                   if(keyData[6]=="true")
                     newKey.setMoT(true); // if right key color isMoT (left is default)
                 }
                 tmpCMS.pushKey(newKey);
               }else{
                 // twin key
                 var o_Prev = parseFloat(keyData_Previous[4]);
                 var newKey = new class_Key(tmpColor_Prev,tmpColor,x,true);

                 newKey.setOpacityVal(o_Prev,"left");
                 newKey.setOpacityVal(o,"right");

                 if(hasMoT){
                   if(keyData[6]=="true")
                     newKey.setMoT(true); // if right key color isMoT (left is default)
                 }
                 tmpCMS.pushKey(newKey);


               }

             }
             else{
               if(x!=x_Next){
                 // dual key
                 var newKey = new class_Key(tmpColor,tmpColor,x,false);
                 newKey.setOpacityVal(o,"left");
                 newKey.setOpacityVal(o,"right");

                 tmpCMS.pushKey(newKey);
               }
             }
           }//switch
     }


     var firstLineElements =  csvlines[0].split(/[;,]+/);
     // NAN
     if(firstLineElements.length>13){
       var val1 = parseFloat(firstLineElements[9])/val1_RatioFactor;
       var val2 = parseFloat(firstLineElements[11])/val2_RatioFactor;
       var val3 = parseFloat(firstLineElements[13])/val3_RatioFactor;
       var tmpColor = getLoadedColor(val1,val2,val3,space);
       tmpCMS.setNaNColor(tmpColor);
     }
     // Above
     if(firstLineElements.length>20){
       var val1 = parseFloat(firstLineElements[16])/val1_RatioFactor;
       var val2 = parseFloat(firstLineElements[18])/val2_RatioFactor;
       var val3 = parseFloat(firstLineElements[20])/val3_RatioFactor;
       var tmpColor = getLoadedColor(val1,val2,val3,space);
       tmpCMS.setAboveColor(tmpColor);
     }
     // Below
     if(firstLineElements.length>27){
       var val1 = parseFloat(firstLineElements[23])/val1_RatioFactor;
       var val2 = parseFloat(firstLineElements[25])/val2_RatioFactor;
       var val3 = parseFloat(firstLineElements[27])/val3_RatioFactor;
       var tmpColor = getLoadedColor(val1,val2,val3,space);
       tmpCMS.setBelowColor(tmpColor);
     }

     return tmpCMS;

}


function checkCSVColorspace(headerLine) {

  var headerAttr = headerLine.split(/[;,]+/);

  if (headerAttr.length >= 6) {

    if ((headerAttr[1] === "r" || headerAttr[1] === "R") && (headerAttr[2] === "g" || headerAttr[2] === "G") && (headerAttr[3] === "b" || headerAttr[3] === "B")) {
      return "RGB";
    }

    if ((headerAttr[1] === "h" || headerAttr[1] === "H") && (headerAttr[2] === "s" || headerAttr[2] === "S") && (headerAttr[3] === "v" || headerAttr[3] === "V")) {
      return "HSV";
    }

    if ((headerAttr[1] === "l" || headerAttr[1] === "L") && (headerAttr[2] === "a" || headerAttr[2] === "A") && (headerAttr[3] === "b" || headerAttr[3] === "B")) {
      return "LAB";
    }

    if ((headerAttr[1] === "l99" || headerAttr[1] === "L99") && (headerAttr[2] === "a99" || headerAttr[2] === "A99") && (headerAttr[3] === "b99" || headerAttr[3] === "B99")) {
      return "DIN99";
    }

    if ((headerAttr[1] === "l" || headerAttr[1] === "L") && (headerAttr[2] === "c" || headerAttr[2] === "C") && (headerAttr[3] === "h" || headerAttr[3] === "H")) {
      return "LCH";
    }
  }

  return "NoSpace";

}
