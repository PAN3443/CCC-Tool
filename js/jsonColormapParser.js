function jsonColormapParserFile(jsonString){

      var jsonObj = JSON.parse(jsonString);

        var name = jsonObj.colormaps[0].name;
        var space = jsonObj.colormaps[0].space;
        var saveIntervals = false;
        var tmpColorMap = new xclassColorMap();
        var xValues = [];
        var tmpColors = [];
        var isrgb255 = false;
        var askInterval = false;
        var saveIntervals = false;

        if(jsonObj.colormaps[0].points.length==0)return;
        ///////////////////////////////////////////// check if saved colors like the space

       switch (space) {
          case "RGB": case "rgb": case "Rgb":
                if(jsonObj.colormaps[0].points[0].r == "undefined" || jsonObj.colormaps[0].points[0].g == "undefined" || jsonObj.colormaps[0].points[0].b == "undefined"){
                    space = checkJSONColorspace(jsonObj);
                }
            break;
          case "HSV": case "hsv": case "Hsv":
                if(jsonObj.colormaps[0].points[0].h == "undefined" || jsonObj.colormaps[0].points[0].s == "undefined" || jsonObj.colormaps[0].points[0].v == "undefined"){
                    space = checkJSONColorspace(jsonObj);
                }
            break;
           case "LAB": case "lab": case "Lab":
                 if(jsonObj.colormaps[0].points[0].l == "undefined" || jsonObj.colormaps[0].points[0].a== "undefined" || jsonObj.colormaps[0].points[0].b == "undefined"){
                     space = checkJSONColorspace(jsonObj);
                 }
            break;
          case "DIN99": case "din99": case "Din99":
                if(jsonObj.colormaps[0].points[0].r == "undefined" || jsonObj.colormaps[0].points[0].g == "undefined" || jsonObj.colormaps[0].points[0].b == "undefined"){
                    space = checkJSONColorspace(jsonObj);
                }
            break;
          default:
                  space = checkJSONColorspace(jsonObj);
        }

      if(space==="NoSpace")return;
        ////////////////////////////////////////////
        switch (space) {
          case "RGB": case "rgb": case "Rgb":

                for (var i = 0; i <jsonObj.colormaps[0].points.length; i++)
                {
                    var r = parseFloat(jsonObj.colormaps[0].points[i].r);
                    var g = parseFloat(jsonObj.colormaps[0].points[i].g);
                    var b = parseFloat(jsonObj.colormaps[0].points[i].b);

                    if(r>1.0 || g>1.0 || b>1.0){
                        isrgb255=true;
                        break;
                    }

                }

                for(var i =0; i<jsonObj.colormaps[0].points.length; i++){

                  var saveAttribute = true;
                  if(jsonObj.colormaps[0].points[i].ccctype=="interval point"){

                      if(askInterval){
                          saveAttribute=saveIntervals;
                      }
                      else{
                        if (confirm("You are loading a colormap created by the ccc-tool. Do you want to upload the interval points as fixed key-colors?") == true) {
                          saveIntervals = true;
                        }
                        else{
                          saveAttribute=false;
                        }
                        askInterval=true;
                      }

                  }

                  if(saveAttribute){
                      var x = parseFloat(jsonObj.colormaps[0].points[i].x);
                      var r = parseFloat(jsonObj.colormaps[0].points[i].r);
                      var g = parseFloat(jsonObj.colormaps[0].points[i].g);
                      var b = parseFloat(jsonObj.colormaps[0].points[i].b);
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

                return tmpColorMap;
          case "HSV": case "hsv": case "Hsv":


            for(var i =0; i<jsonObj.colormaps[0].points.length; i++){

              var saveAttribute = true;
              if(jsonObj.colormaps[0].points[i].ccctype=="interval point"){

                  if(askInterval){
                      saveAttribute=saveIntervals;
                  }
                  else{
                    if (confirm("You are loading a colormap created by the ccc-tool. Do you want to upload the interval points as fixed key-colors?") == true) {
                      saveIntervals = true;
                    }
                    else{
                      saveAttribute=false;
                    }
                    askInterval=true;
                  }

              }

                if(saveAttribute){
                    var x = parseFloat(jsonObj.colormaps[0].points[i].x);
                    var h = parseFloat(jsonObj.colormaps[0].points[i].h);
                    var s = parseFloat(jsonObj.colormaps[0].points[i].s);
                    var v = parseFloat(jsonObj.colormaps[0].points[i].v);


                    var tmpColor = new classColor_HSV(h,s,v);
                    tmpColorMap.pushPositionPoints(x);
                    tmpColorMap.pushHSVColor(tmpColor);
                }
            }
            tmpColorMap.setColormapName(name);
            tmpColorMap.createKeys();
            tmpColorMap.calcBands();

            return tmpColorMap;

        case "LAB": case "lab": case "Lab":

           for(var i =0; i<jsonObj.colormaps[0].points.length; i++){

             var saveAttribute = true;
             if(jsonObj.colormaps[0].points[i].ccctype=="interval point"){

                 if(askInterval){
                     saveAttribute=saveIntervals;
                 }
                 else{
                   if (confirm("You are loading a colormap created by the ccc-tool. Do you want to upload the interval points as fixed key-colors?") == true) {
                     saveIntervals = true;
                   }
                   else{
                     saveAttribute=false;
                   }
                   askInterval=true;
                 }

             }

             if(saveAttribute){
                 var x = parseFloat(jsonObj.colormaps[0].points[i].x);
                 var l = parseFloat(jsonObj.colormaps[0].points[i].l);
                 var a = parseFloat(jsonObj.colormaps[0].points[i].a);
                 var b = parseFloat(jsonObj.colormaps[0].points[i].b);


                 var tmpColor = new classColorCIELab(l,a,b);
                 tmpColorMap.pushPositionPoints(x);
                 tmpColorMap.pushCIELabColor(tmpColor);
             }
           }
           tmpColorMap.setColormapName(name);
           tmpColorMap.createKeys();
           tmpColorMap.calcBands();

            return tmpColorMap;
          case "DIN99": case "din99": case "Din99":

          for(var i =0; i<jsonObj.colormaps[0].points.length; i++){

            var saveAttribute = true;
            if(jsonObj.colormaps[0].points[i].ccctype=="interval point"){

                if(askInterval){
                    saveAttribute=saveIntervals;
                }
                else{
                  if (confirm("You are loading a colormap created by the ccc-tool. Do you want to upload the interval points as fixed key-colors?") == true) {
                    saveIntervals = true;
                  }
                  else{
                    saveAttribute=false;
                  }
                  askInterval=true;
                }

            }

            if(saveAttribute){
                var x = parseFloat(jsonObj.colormaps[0].points[i].x);
                var l99 = parseFloat(jsonObj.colormaps[0].points[i].l99);
                var a99 = parseFloat(jsonObj.colormaps[0].points[i].a99);
                var b99 = parseFloat(jsonObj.colormaps[0].points[i].b99);


                var tmpColor = new classColorDIN99(l99,a99,b99);
                tmpColorMap.pushPositionPoints(x);
                tmpColorMap.pushDIN99Color(tmpColor);
            }
          }
          tmpColorMap.setColormapName(name);
          tmpColorMap.createKeys();
          tmpColorMap.calcBands();

           return tmpColorMap;
          default:

        }

}


function checkJSONColorspace(jsonObj){

    if(jsonObj.colormaps[0].points[0].r != "undefined" && jsonObj.colormaps[0].points[0].g != "undefined" && jsonObj.colormaps[0].points[0].b != "undefined"){
        return "RGB";
    }

    if(jsonObj.colormaps[0].points[0].h != "undefined" && jsonObj.colormaps[0].points[0].s != "undefined" && jsonObj.colormaps[0].points[0].v != "undefined"){
        return "HSV";
    }

    if(jsonObj.colormaps[0].points[0].l != "undefined" && jsonObj.colormaps[0].points[0].a != "undefined" && jsonObj.colormaps[0].points[0].b != "undefined"){
        return "LAB";
    }

    if(jsonObj.colormaps[0].points[0].l99 != "undefined" && jsonObj.colormaps[0].points[0].a99 != "undefined" && jsonObj.colormaps[0].points[0].b99 != "undefined"){
        return "DIN99";
    }

    return "NoSpace";

}
