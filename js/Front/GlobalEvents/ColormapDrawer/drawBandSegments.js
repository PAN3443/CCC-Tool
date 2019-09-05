function createUnknownTypeBand(canvasData, xStart, yStart, bandWidth, bandHeight, color1, color2, canvasWidth) {

  if(color1.equalTo(color2)){
    canvasData=createConstantBand(canvasData, xStart, yStart, bandWidth, bandHeight, color1, canvasWidth);
  }
  else{
    canvasData=createScaledBand(canvasData, xStart, yStart, bandWidth, bandHeight, color1, color2, canvasWidth);
  }

  return canvasData;

}

function createScaledBand(canvasData, xStart, yStart, bandWidth, bandHeight, color1, color2, canvasWidth) {

  xStart = Math.round(xStart);
  bandWidth = Math.round(bandWidth);
  bandHeight = Math.round(bandHeight);

  //  console.log(typeof color1);
  //  console.log('createScaledBand: ' + color1.getColorType());

  /*switch (globalCMS1.getInterpolationSpace()) {
    case "rgb":
    case "lab":
    case "de94":
    case "de94-ds":
    case "de2000":
    case "de2000-ds":
    case "din99":*/

      var tmpWorkColor;

      if(globalCMS1.getInterpolationSpace()==="rgb")
        tmpWorkColor = new classColor_RGB(0, 0, 0);

      if(globalCMS1.getInterpolationSpace()==="lab" || globalCMS1.getInterpolationSpace()==="de2000" || globalCMS1.getInterpolationSpace()==="de94" || globalCMS1.getInterpolationSpace()==="de2000-ds" || globalCMS1.getInterpolationSpace()==="de94-ds")
        tmpWorkColor = new classColor_LAB(0, 0, 0);

      if(globalCMS1.getInterpolationSpace()==="din99")
        tmpWorkColor = new classColorDIN99(0, 0, 0);

        if(globalCMS1.getInterpolationSpace()==="hsv")
          tmpWorkColor = new classColor_HSV(0, 0, 0);

          if(globalCMS1.getInterpolationSpace()==="lch")
            tmpWorkColor = new classColor_LCH(0, 0, 0);

      for (var x = xStart; x < xStart + bandWidth; x++) {
       var tmpRatio = (x - xStart) / bandWidth;

        tmpWorkColor.set1Value(color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio);
        tmpWorkColor.set2Value(color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio);
        tmpWorkColor.set3Value(color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio);

        var tmpCurrentColor=tmpWorkColor.getInColorFormat("rgb");

        if(doColorblindnessSim){
          var tmpLMS = tmpCurrentColor.calcLMSColor();
          tmpCurrentColor = tmpLMS.calcColorBlindRGBColor();
        }

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + (y+yStart) * canvasWidth) * 4;
          //var index = ((xStart+x) + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a

        }

      }

    /*  break;
    /*case "hsv":
      var tmpDis = color1.getSValue() * 50; // radius 50; center(0,0,0);
      var tmpRad = (color1.getHValue() * Math.PI * 2) - Math.PI;
      var xPos = tmpDis * Math.cos(tmpRad);
      var yPos = tmpDis * Math.sin(tmpRad);
      var zPos = color1.getVValue() - 50;

      var tmpDis2 = color2.getSValue() * 50;
      var tmpRad2 = (color2.getHValue() * Math.PI * 2) - Math.PI;
      var xPos2 = tmpDis2 * Math.cos(tmpRad2);
      var yPos2 = tmpDis2 * Math.sin(tmpRad2);
      var zPos2 = color2.getVValue() - 50;


      for (var x = xStart; x <= xStart + bandWidth; x++) {

        var tmpRatio = (x - xStart) / bandWidth;

        var tmpX = xPos + (xPos2 - xPos) * tmpRatio;
        var tmpY = yPos + (yPos2 - yPos) * tmpRatio;
        var tmpZ = zPos + (zPos2 - zPos) * tmpRatio;

        var tmpH = (Math.atan2(tmpY, tmpX) + Math.PI) / (Math.PI * 2);
        var tmpS = Math.sqrt(Math.pow(tmpX, 2) + Math.pow(tmpY, 2)) / 50;
        var tmpV = tmpZ + 50;
        var tmpCurrentHSVColor = new classColor_HSV(tmpH, tmpS, tmpV);

        var tmpCurrentColor = tmpCurrentHSVColor.calcRGBColor();
        for (var y = 0; y < bandHeight; y++) {
          var index = (x + (y+yStart) * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }

      break;
      case "lch":
        var tmpDis = color1.getCValue() * 50; // radius 50; center(0,0,0);
        var tmpRad = (color1.getHValue() * Math.PI * 2) - Math.PI;
        var xPos = tmpDis * Math.cos(tmpRad);
        var yPos = tmpDis * Math.sin(tmpRad);
        var zPos = color1.getLValue() - 50;

        var tmpDis2 = color2.getCValue() * 50;
        var tmpRad2 = (color2.getHValue() * Math.PI * 2) - Math.PI;
        var xPos2 = tmpDis2 * Math.cos(tmpRad2);
        var yPos2 = tmpDis2 * Math.sin(tmpRad2);
        var zPos2 = color2.getLValue() - 50;


        for (var x = xStart; x <= xStart + bandWidth; x++) {

          var tmpRatio = (x - xStart) / bandWidth;

          var tmpX = xPos + (xPos2 - xPos) * tmpRatio;
          var tmpY = yPos + (yPos2 - yPos) * tmpRatio;
          var tmpZ = zPos + (zPos2 - zPos) * tmpRatio;

          var tmpH = (Math.atan2(tmpY, tmpX) + Math.PI) / (Math.PI * 2);
          var tmpC = Math.sqrt(Math.pow(tmpX, 2) + Math.pow(tmpY, 2)) / 50;
          var tmpL = tmpZ + 50;
          var tmpCurrentLCHColor = new classColor_LCH(tmpL, tmpC, tmpH);

          var tmpCurrentColor = tmpCurrentLCHColor.calcRGBColor();
          for (var y = 0; y < bandHeight; y++) {
            var index = (x + (y+yStart) * canvasWidth) * 4;
            canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
            canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
            canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
            canvasData.data[index + 3] = 255; //a
          }

        }

        break;


    default:
      console.log("Error at the createBand function");

  }*/

  return canvasData;
}


function createConstantBand(canvasData, xStart, yStart, bandWidth, bandHeight, color1, canvasWidth) {

  xStart = Math.round(xStart);
  bandWidth = Math.round(bandWidth);
  bandHeight = Math.round(bandHeight);

      var tmpCurrentColor = color1.calcRGBColor();

      for (var x = xStart; x <= xStart + bandWidth; x++) {

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + (y+yStart) * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }

  return canvasData;
}



function createScaledBandVertical(canvasData, yStart, bandWidth, bandHeight, color1, color2, canvasWidth) {

  yStart = Math.round(yStart);
  bandWidth = Math.round(bandWidth);
  bandHeight = Math.round(bandHeight);

  switch (globalCMS1.getInterpolationSpace()) {
    case "rgb":
    case "lab":
    case "de94":
    case "de94-ds":
    case "de2000":
    case "de2000-ds":
    case "din99":

      var tmpWorkColor;

      if(globalCMS1.getInterpolationSpace()==="rgb")
        tmpWorkColor = new classColor_RGB(0, 0, 0);

      if(globalCMS1.getInterpolationSpace()==="lab" || globalCMS1.getInterpolationSpace()==="de2000" || globalCMS1.getInterpolationSpace()==="de94" || globalCMS1.getInterpolationSpace()==="de2000-ds" || globalCMS1.getInterpolationSpace()==="de94-ds")
        tmpWorkColor = new classColor_LAB(0, 0, 0);

      if(globalCMS1.getInterpolationSpace()==="din99")
        tmpWorkColor = new classColorDIN99(0, 0, 0);

      for (var y = yStart; y >= yStart - bandHeight; y--) {
       var tmpRatio = (yStart - y) / bandHeight;

        tmpWorkColor.set1Value(color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio);
        tmpWorkColor.set2Value(color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio);
        tmpWorkColor.set3Value(color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio);

        var tmpCurrentColor=tmpWorkColor.getInColorFormat("rgb");

        if(doColorblindnessSim){
          var tmpLMS = tmpCurrentColor.calcLMSColor();
          tmpCurrentColor = tmpLMS.calcColorBlindRGBColor();
        }

        for (var x = 0; x < bandWidth; x++) {
          var index = (x + (y+yStart) * canvasWidth) * 4;
          //var index = ((xStart+x) + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a

        }

      }

      break;
    case "hsv":
      var tmpDis = color1.getSValue() * 50; // radius 50; center(0,0,0);
      var tmpRad = (color1.getHValue() * Math.PI * 2) - Math.PI;
      var xPos = tmpDis * Math.cos(tmpRad);
      var yPos = tmpDis * Math.sin(tmpRad);
      var zPos = color1.getVValue() - 50;

      var tmpDis2 = color2.getSValue() * 50;
      var tmpRad2 = (color2.getHValue() * Math.PI * 2) - Math.PI;
      var xPos2 = tmpDis2 * Math.cos(tmpRad2);
      var yPos2 = tmpDis2 * Math.sin(tmpRad2);
      var zPos2 = color2.getVValue() - 50;


      for (var y = yStart; y >= yStart - bandHeight; y--) {
       var tmpRatio = (yStart - y) / bandHeight;

        var tmpX = xPos + (xPos2 - xPos) * tmpRatio;
        var tmpY = yPos + (yPos2 - yPos) * tmpRatio;
        var tmpZ = zPos + (zPos2 - zPos) * tmpRatio;

        var tmpH = (Math.atan2(tmpY, tmpX) + Math.PI) / (Math.PI * 2);
        var tmpS = Math.sqrt(Math.pow(tmpX, 2) + Math.pow(tmpY, 2)) / 50;
        var tmpV = tmpZ + 50;
        var tmpCurrentHSVColor = new classColor_HSV(tmpH, tmpS, tmpV);

        var tmpCurrentColor = tmpCurrentHSVColor.calcRGBColor();
        for (var x = 0; x < bandWidth; x++) {
          var index = (x + (y+yStart) * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }

      break;
      case "lch":
        var tmpDis = color1.getCValue() * 50; // radius 50; center(0,0,0);
        var tmpRad = (color1.getHValue() * Math.PI * 2) - Math.PI;
        var xPos = tmpDis * Math.cos(tmpRad);
        var yPos = tmpDis * Math.sin(tmpRad);
        var zPos = color1.getLValue() - 50;

        var tmpDis2 = color2.getCValue() * 50;
        var tmpRad2 = (color2.getHValue() * Math.PI * 2) - Math.PI;
        var xPos2 = tmpDis2 * Math.cos(tmpRad2);
        var yPos2 = tmpDis2 * Math.sin(tmpRad2);
        var zPos2 = color2.getLValue() - 50;


        for (var y = yStart; y >= yStart - bandHeight; y--) {
         var tmpRatio = (yStart - y) / bandHeight;

          var tmpX = xPos + (xPos2 - xPos) * tmpRatio;
          var tmpY = yPos + (yPos2 - yPos) * tmpRatio;
          var tmpZ = zPos + (zPos2 - zPos) * tmpRatio;

          var tmpH = (Math.atan2(tmpY, tmpX) + Math.PI) / (Math.PI * 2);
          var tmpC = Math.sqrt(Math.pow(tmpX, 2) + Math.pow(tmpY, 2)) / 50;
          var tmpL = tmpZ + 50;
          var tmpCurrentLCHColor = new classColor_LCH(tmpL, tmpC, tmpH);

          var tmpCurrentColor = tmpCurrentLCHColor.calcRGBColor();
          for (var x = 0; x < bandHeight; x++) {
            var index = (x + (y+yStart) * canvasWidth) * 4;
            canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
            canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
            canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
            canvasData.data[index + 3] = 255; //a
          }

        }

        break;


    default:
      console.log("Error at the createBand function");

  }

  return canvasData;
}


function createConstantBandVertical(canvasData, yStart, bandWidth, bandHeight, color1, canvasWidth) {

  yStart = Math.round(yStart);
  bandWidth = Math.round(bandWidth);
  bandHeight = Math.round(bandHeight);


      var tmpCurrentColor = color1.calcRGBColor();

      for (var y = yStart; y >= yStart - bandHeight; y--) {

        for (var x = 0; x < bandWidth; x++) {
          var index = (x + (y+yStart) * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }


  return canvasData;
}
