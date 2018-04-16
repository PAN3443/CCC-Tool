function jsonColormapParserFile(jsonString){

      var jsonObj = JSON.parse(jsonString);

        var name = jsonObj[0].Name;
        var space = "";//jsonObj[0].ColorSpace;

        if(jsonObj[0].RGBPoints!=undefined){
          space = "rgb";
        }
        if(jsonObj[0].HSVPoints!=undefined){
          space = "hsv";
        }
        if(jsonObj[0].LabPoints!=undefined){
          space = "lab";
        }
        if(jsonObj[0].DIN99Points!=undefined){
          space = "din99";
        }

        var tmpColorMap = new classColorMapSpecification();
        var xValues = [];
        var tmpColors = [];
        var isrgb255 = false;
        var askInterval = false;
        var saveIntervals = false;
        var hasKeyInfo = false;
        if(jsonObj[0].isCMS != undefined){
          hasKeyInfo = true;
        }


        var hasNaNColor = false;
        if(jsonObj[0].NanColor != undefined){
          hasNaNColor = true;
        }




      if(space==undefined)return;
      ////////////////////////////////////////////


        switch (space) {
          case "RGB": case "rgb": case "Rgb":


                if(jsonObj[0].RGBPoints.length==0)return;

                for(var i =0; i<jsonObj[0].RGBPoints.length/4; i++)
                {
                    var r = parseFloat(jsonObj[0].RGBPoints[i*4+1]);
                    var g = parseFloat(jsonObj[0].RGBPoints[i*4+2]);
                    var b = parseFloat(jsonObj[0].RGBPoints[i*4+3]);

                    if(r>1.0 || g>1.0 || b>1.0){
                        isrgb255=true;
                        break;
                    }

                }

                for(var i =0; i<jsonObj[0].RGBPoints.length/4; i++){

                  var saveAttribute = true;

                  if(hasKeyInfo)
                  if(jsonObj[0].isCMS[i]==false){
                      saveAttribute=false;
                      /*if(askInterval){
                          saveAttribute=saveIntervals;
                      }
                      else{
                        if (confirm("You are loading a colormap created by the ccc-tool. Do you want to upload the falses as fixed key-colors?") == true) {
                          saveIntervals = true;
                        }
                        else{
                          saveAttribute=false;
                        }
                        askInterval=true;
                      }*/

                  }

                  if(saveAttribute){
                      var x = parseFloat(jsonObj[0].RGBPoints[i*4]);
                      var r = parseFloat(jsonObj[0].RGBPoints[i*4+1]);
                      var g = parseFloat(jsonObj[0].RGBPoints[i*4+2]);
                      var b = parseFloat(jsonObj[0].RGBPoints[i*4+3]);
                      //console.log("x="+x+",r="+x+",g="+g+",b="+b);

                      if(isrgb255){
                          r=r/255.0;
                          g=g/255.0;
                          b=b/255.0;
                      }

                      var tmpColor = new classColor_RGB(r,g,b);
                      tmpColorMap.pushPositionPoints(x);
                      tmpColorMap.pushRGBColor(tmpColor);
                  }
                }
                tmpColorMap.setColormapName(name);
                tmpColorMap.createKeys();
                tmpColorMap.calcBands();

                if(hasNaNColor){
                  var tmpColor = new classColor_RGB(jsonObj[0].NanColor[0],jsonObj[0].NanColor[1],jsonObj[0].NanColor[2]);
                  tmpColorMap.setNaNColor(tmpColor);
                }

                return tmpColorMap;
          case "HSV": case "hsv": case "Hsv":


            for(var i =0; i<jsonObj[0].HSVPoints.length/4; i++){

              var saveAttribute = true;

                if(hasKeyInfo)
                if(jsonObj[0].isCMS[i]==false){
                  saveAttribute=false;
                  /*if(askInterval){
                      saveAttribute=saveIntervals;
                  }
                  else{
                    if (confirm("You are loading a colormap created by the ccc-tool. Do you want to upload the falses as fixed key-colors?") == true) {
                      saveIntervals = true;
                    }
                    else{
                      saveAttribute=false;
                    }
                    askInterval=true;
                  }*/

              }

                if(saveAttribute){

                    var x = parseFloat(jsonObj[0].HSVPoints[i*4]);
                    var h = parseFloat(jsonObj[0].HSVPoints[i*4+1]);
                    var s = parseFloat(jsonObj[0].HSVPoints[i*4+2]);
                    var v = parseFloat(jsonObj[0].HSVPoints[i*4+3]);

                    var tmpColor = new classColor_HSV(h,s,v);
                    tmpColorMap.pushPositionPoints(x);
                    tmpColorMap.pushHSVColor(tmpColor);
                }
            }
            tmpColorMap.setColormapName(name);
            tmpColorMap.createKeys();
            tmpColorMap.calcBands();

            if(hasNaNColor){
              var tmpColor = new classColor_HSV(jsonObj[0].NanColor[0],jsonObj[0].NanColor[1],jsonObj[0].NanColor[2]);
              tmpColorMap.setNaNColor(tmpColor);
            }

            return tmpColorMap;

        case "LAB": case "lab": case "Lab":

           for(var i =0; i<jsonObj[0].LabPoints.length/4; i++){

             var saveAttribute = true;
             if(hasKeyInfo)
             if(jsonObj[0].isCMS[i]==false){
                saveAttribute=false;
                 /*if(askInterval){
                     saveAttribute=saveIntervals;
                 }
                 else{
                   if (confirm("You are loading a colormap created by the ccc-tool. Do you want to upload the falses as fixed key-colors?") == true) {
                     saveIntervals = true;
                   }
                   else{
                     saveAttribute=false;
                   }
                   askInterval=true;
                 }*/

             }

             if(saveAttribute){
                 var x = parseFloat(jsonObj[0].LabPoints[i*4]);
                 var l = parseFloat(jsonObj[0].LabPoints[i*4+1]);
                 var a = parseFloat(jsonObj[0].LabPoints[i*4+2]);
                 var b = parseFloat(jsonObj[0].LabPoints[i*4+3]);

                 var tmpColor = new classColor_LAB(l,a,b);
                 tmpColorMap.pushPositionPoints(x);
                 tmpColorMap.pushCIELabColor(tmpColor);
             }
           }
           tmpColorMap.setColormapName(name);
           tmpColorMap.createKeys();
           tmpColorMap.calcBands();

           if(hasNaNColor){
             var tmpColor = new classColor_LAB(jsonObj[0].NanColor[0],jsonObj[0].NanColor[1],jsonObj[0].NanColor[2]);
             tmpColorMap.setNaNColor(tmpColor);
           }

            return tmpColorMap;
          case "DIN99": case "din99": case "Din99":

          for(var i =0; i<jsonObj[0].DIN99Points.length/4; i++){

            var saveAttribute = true;
            if(hasKeyInfo)
            if(jsonObj[0].isCMS[i]==false){
                saveAttribute=false;
                /*if(askInterval){
                    saveAttribute=saveIntervals;
                }
                else{
                  if (confirm("You are loading a colormap created by the ccc-tool. Do you want to upload the falses as fixed key-colors?") == true) {
                    saveIntervals = true;
                  }
                  else{
                    saveAttribute=false;
                  }
                  askInterval=true;
                }*/

            }

            if(saveAttribute){
                var x = parseFloat(jsonObj[0].DIN99Points[i*4]);
                var l99 = parseFloat(jsonObj[0].DIN99Points[i*4+1]);
                var a99 = parseFloat(jsonObj[0].DIN99Points[i*4+2]);
                var b99 = parseFloat(jsonObj[0].DIN99Points[i*4+3]);


                var tmpColor = new classColorDIN99(l99,a99,b99);
                tmpColorMap.pushPositionPoints(x);
                tmpColorMap.pushDIN99Color(tmpColor);
            }
          }
          tmpColorMap.setColormapName(name);
          tmpColorMap.createKeys();
          tmpColorMap.calcBands();

          if(hasNaNColor){
            var tmpColor = new classColorDIN99(jsonObj[0].NanColor[0],jsonObj[0].NanColor[1],jsonObj[0].NanColor[2]);
            tmpColorMap.setNaNColor(tmpColor);
          }

           return tmpColorMap;
          default:

        }

}


/*function checkJSONColorspace(jsonObj){

    if(jsonObj[0].points[0].r != "undefined" && jsonObj[0].points[0].g != "undefined" && jsonObj[0].points[0].b != "undefined"){
        return "RGB";
    }

    if(jsonObj[0].points[0].h != "undefined" && jsonObj[0].points[0].s != "undefined" && jsonObj[0].points[0].v != "undefined"){
        return "HSV";
    }

    if(jsonObj[0].points[0].l != "undefined" && jsonObj[0].points[0].a != "undefined" && jsonObj[0].points[0].b != "undefined"){
        return "LAB";
    }

    if(jsonObj[0].points[0].l99 != "undefined" && jsonObj[0].points[0].a99 != "undefined" && jsonObj[0].points[0].b99 != "undefined"){
        return "DIN99";
    }

    return "NoSpace";

}*/
