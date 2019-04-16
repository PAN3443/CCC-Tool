function jsonColormapParserFile(jsonString){

  var tmpCMS = new class_CMS();

      var jsonObj = JSON.parse(jsonString);


        var name = "Loaded Colormap";

        if(!jsonObj.hasOwnProperty("Name"))
        name=jsonObj[0].Name;

        var space = "";//jsonObj[0].ColorSpace;
        var pointName = "";

        if(jsonObj[0].hasOwnProperty("RGBPoints")){
          space = "rgb";
          pointName = "RGBPoints";
        }
        if(jsonObj[0].hasOwnProperty("HSVPoints")){
          space = "hsv";
          pointName = "HSVPoints";
        }
        if(jsonObj[0].hasOwnProperty("LabPoints")){
          space = "lab";
          pointName = "LabPoints";
        }
        if(jsonObj[0].hasOwnProperty("DIN99Points")){
          space = "din99";
          pointName = "DIN99Points";
        }

        if(pointName===""){
          openAlert("Sorry, you file has the wrong format and cannot be uploaded.");
          return tmpCMS;
        }

        if(jsonObj[0][pointName].length==0)
        return tmpCMS;

        var xValues = [];
        var tmpColors = [];
        var isrgb255 = false;
        var askInterval = false;
        var saveIntervals = false;
        var hasKeyInfo = false;
        var hasMoTInfo = false;

        if(jsonObj[0].hasOwnProperty("isCMS")){ //if(jsonObj[0].isCMS != undefined)
          hasKeyInfo = true;
        }

        if(jsonObj[0].hasOwnProperty("isMoT")){
          hasMoTInfo = true;
        }

        var hasNaNColor = false;
        if(jsonObj[0].hasOwnProperty("NanColor")){
          hasNaNColor = true;
        }

      if(space==undefined)
      return tmpCMS;
      ////////////////////////////////////////////


      if(space==="rgb" || space==="RGB" || space==="Rgb"){
        for(var i =0; i<jsonObj[0][pointName].length/4; i++)
        {
            var r = parseFloat(jsonObj[0][pointName][i*4+1]);
            var g = parseFloat(jsonObj[0][pointName][i*4+2]);
            var b = parseFloat(jsonObj[0][pointName][i*4+3]);

            if(r>1.0 || g>1.0 || b>1.0){
                isrgb255=true;
                break;
            }

        }
      }

      var lastIndex = (jsonObj[0][pointName].length/4)-1;
      for(var i =0; i<jsonObj[0][pointName].length/4; i++){


        var x = parseFloat(jsonObj[0].RGBPoints[i*4]);
        var val1 = parseFloat(jsonObj[0].RGBPoints[i*4+1]);
        var val2 = parseFloat(jsonObj[0].RGBPoints[i*4+2]);
        var val3 = parseFloat(jsonObj[0].RGBPoints[i*4+3]);


        if(isrgb255){
            val1=val1/255.0;
            val2=val2/255.0;
            val3=val2/255.0;
        }

        var tmpColor = getLoadedColor(val1,val2,val3,space);

        switch (i) {
          case 0:
              var val1_Next = parseFloat(jsonObj[0].RGBPoints[(i+1)*4+1]);
              var val2_Next = parseFloat(jsonObj[0].RGBPoints[(i+1)*4+2]);
              var val3_Next = parseFloat(jsonObj[0].RGBPoints[(i+1)*4+3]);

              if(isrgb255){
                  val1_Next=val1_Next/255.0;
                  val2_Next=val2_Next/255.0;
                  val3_Next=val2_Next/255.0;
              }

              var tmpColor2 = getLoadedColor(val1_Next,val2_Next,val3_Next,space);


             if(tmpColor2.equalTo(tmpColor)){
               // nil key
               var newKey = new class_Key(undefined,undefined,x,true);
               tmpCMS.pushKey(newKey);
             }else{
               // right key
               var newKey = new class_Key(undefined,tmpColor,x,true);
               tmpCMS.pushKey(newKey);
             }
            break;
           case lastIndex:
               // right key
               var newKey = new class_Key(tmpColor,undefined,x,true);
               tmpCMS.pushKey(newKey);
            break;
          default:


             if(hasKeyInfo){
               if(jsonObj[0].isCMS[i]==false){
                 continue; // continue if cms attribute exist and if it is false
               }
             }


             var x_Previous = parseFloat(jsonObj[0].RGBPoints[(i-1)*4]);

             var x_Next = parseFloat(jsonObj[0].RGBPoints[(i+1)*4]);
             var val1_Next = parseFloat(jsonObj[0].RGBPoints[(i+1)*4+1]);
             var val2_Next = parseFloat(jsonObj[0].RGBPoints[(i+1)*4+2]);
             var val3_Next = parseFloat(jsonObj[0].RGBPoints[(i+1)*4+3]);

             if(isrgb255){
                 val1_Next=val1_Next/255.0;
                 val2_Next=val2_Next/255.0;
                 val3_Next=val2_Next/255.0;
             }

             var tmpColor2 = getLoadedColor(val1_Next,val2_Next,val3_Next,space);


             if(x_Previous==x){

               var val1_Prev = parseFloat(jsonObj[0].RGBPoints[(i-1)*4+1]);
               var val2_Prev = parseFloat(jsonObj[0].RGBPoints[(i-1)*4+2]);
               var val3_Prev = parseFloat(jsonObj[0].RGBPoints[(i-1)*4+3]);

               if(isrgb255){
                   val1_Prev=val1_Prev/255.0;
                   val2_Prev=val2_Prev/255.0;
                   val3_Prev=val3_Prev/255.0;
               }

               var tmpColor_Prev = getLoadedColor(val1_Prev,val2_Prev,val3_Prev,space);


               if(tmpColor2.equalTo(tmpColor)){
                 // left key
                 var newKey = new class_Key(tmpColor_Prev,undefined,x,true);

                 if(hasMoTInfo){
                   if(jsonObj[0].isMoT[i]==true)
                     newKey.setMoT(true); // if right key color isMoT (left is default)
                 }
                 tmpCMS.pushKey(newKey);
               }else{
                 // twin key
                 var newKey = new class_Key(tmpColor_Prev,tmpColor,x,true);
                 if(hasMoTInfo){
                   if(jsonObj[0].isMoT[i]==true)
                     newKey.setMoT(true); // if right key color isMoT (left is default)
                 }
                 tmpCMS.pushKey(newKey);


               }

             }
             else{
               if(x!=x_Next){
                 // dual key
                 var newKey = new class_Key(tmpColor,tmpColor,x,false);
                 tmpCMS.pushKey(newKey);
               }
             }
           }//switch


      }

        return tmpCMS;

}
