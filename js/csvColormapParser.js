function csvColormapParserFile(csvString) {

  var csvlines = csvString.split("\n");
  var askInterval = false;
  var saveIntervals = true;
  var tmpColorMap = new classColorMapSpecification();

  if (csvlines.length > 0) {
    var space = checkCSVColorspace(csvlines[0]);



    var isrgb255 = false;
    if (space === "RGB") {
      for (var i = 1; i < csvlines.length; i++) {
        var keyData = csvlines[i].split(/[;,]+/);

        if (keyData.length == 6) {
          var r = parseFloat(keyData[1]);
          var g = parseFloat(keyData[2]);
          var b = parseFloat(keyData[3]);
          if (r > 1.0 || g > 1.0 || b > 1.0) {
            isrgb255 = true;
            break;
          }
        }
      }
    }

    for (var i = 1; i < csvlines.length; i++) {

      var keyData = csvlines[i].split(/[;,]+/);

      if (keyData.length == 6) {
        var x = parseFloat(keyData[0]);
        var c1 = parseFloat(keyData[1]);
        var c2 = parseFloat(keyData[2]);
        var c3 = parseFloat(keyData[3]);
        var o = parseFloat(keyData[4]);
        var type = keyData[5];


        if (type == "interval point") {

          if (askInterval) {
            console.log(saveIntervals+" "+type);
            if (saveIntervals == false){

              continue;
            }
          } else {
            askInterval = true;
            if (confirm("You are loading a colormap created by the ccc-tool. Do you want to upload the interval points as fixed key-colors?") == true) {
              saveIntervals = true;
            } else {
              saveIntervals = false;
              continue;
            }
          }

        }

        switch (space) {
          case "RGB":
            var tmpColor = new classColor_RGB(c1,c2,c3);
            tmpColorMap.pushPositionPoints(x);
            tmpColorMap.pushRGBColor(tmpColor);
            break;
          case "HSV":

            var tmpColor = new classColor_HSV(c1,c2,c3);
            tmpColorMap.pushPositionPoints(x);
            tmpColorMap.pushHSVColor(tmpColor);
            break;

          case "LAB":

            var tmpColor = new classColorCIELab(c1,c2,c3);
            tmpColorMap.pushPositionPoints(x);
            tmpColorMap.pushCIELabColor(tmpColor);
            break;

          case "DIN99":

            var tmpColor = new classColorDIN99(c1,c2,c3);
            tmpColorMap.pushPositionPoints(x);
            tmpColorMap.pushDIN99Color(tmpColor);

            break;

          default:
            return;
        }


      }
    }

    // get NaN
    //tmpColorMap.

    var headerAttr = csvlines[0].split(/[;,]+/);

    if (headerAttr.length > 7) {
      if (headerAttr[6] == "NaN" || headerAttr[6] == "NAN" || headerAttr[6] == "nan" ){

        var c1 = parseFloat(headerAttr[8]);
        var c2 = parseFloat(headerAttr[10]);
        var c3 = parseFloat(headerAttr[12]);
        var tmpColor;
        switch (space) {
          case "RGB":
            if(isrgb255)
             tmpColor = new classColor_RGB(c1/255,c2/255,c3/255);
            else
             tmpColor = new classColor_RGB(c1,c2,c3);
            break;
          case "HSV":
            tmpColor = new classColor_HSV(c1,c2,c3);
            break;
          case "LAB":
            tmpColor = new classColorCIELab(c1,c2,c3);
            break;
          case "DIN99":
            tmpColor = new classColorDIN99(c1,c2,c3);
            break;
          default:
            return;
        }
        tmpColorMap.setNaNColor(tmpColor);

      }
    }

    tmpColorMap.createKeys();

    tmpColorMap.calcBands();

    return tmpColorMap;

  }



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
  }

  return "NoSpace";

}
