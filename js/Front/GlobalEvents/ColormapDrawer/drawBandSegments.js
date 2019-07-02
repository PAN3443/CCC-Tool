function createUnknownTypeBand(canvasData, xStart, bandWidth, bandHeight, color1, color2, canvasWidth) {

  if(color1.equalTo(color2)){
    canvasData=createConstantBand(canvasData, xStart, bandWidth, bandHeight, color1, canvasWidth);
  }
  else{
    canvasData=createScaledBand(canvasData, xStart, bandWidth, bandHeight, color1, color2, canvasWidth);
  }

  return canvasData;

}

function createScaledBand(canvasData, xStart, bandWidth, bandHeight, color1, color2, canvasWidth) {

  xStart = Math.round(xStart);
  bandWidth = Math.round(bandWidth);
  bandHeight = Math.round(bandHeight);

  //  console.log(typeof color1);
  //  console.log('createScaledBand: ' + color1.getColorType());

  switch (globalCMS1.getInterpolationSpace()) {
    case "rgb": case "lab": case "din99":

      var tmpWorkColor;

      if(globalCMS1.getInterpolationSpace()==="rgb")
        tmpWorkColor = new classColor_RGB(0, 0, 0);

      if(globalCMS1.getInterpolationSpace()==="lab")
        tmpWorkColor = new classColor_LAB(0, 0, 0);

      if(globalCMS1.getInterpolationSpace()==="din99")
        tmpWorkColor = new classColorDIN99(0, 0, 0);

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
          var index = (x + y * canvasWidth) * 4;
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
          var index = (x + y * canvasWidth) * 4;
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
            var index = (x + y * canvasWidth) * 4;
            canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
            canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
            canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
            canvasData.data[index + 3] = 255; //a
          }

        }

        break;

      /*for (var x = xStart; x <= xStart + bandWidth; x++) {

        var tmpRatio = (x - xStart) / bandWidth;

        var lValue = color1.getLValue() + (color2.getLValue() - color1.getLValue()) * tmpRatio;
        var aValue = color1.getAValue() + (color2.getAValue() - color1.getAValue()) * tmpRatio;
        var bValue = color1.getBValue() + (color2.getBValue() - color1.getBValue()) * tmpRatio;
        var tmpCurrentLABColor = new classColor_LAB(lValue, aValue, bValue);

        var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }

      break;


      for (var x = xStart; x <= xStart + bandWidth; x++) {

        var tmpRatio = (x - xStart) / bandWidth;

        var l99Value = color1.getL99Value() + (color2.getL99Value() - color1.getL99Value()) * tmpRatio;
        var a99Value = color1.getA99Value() + (color2.getA99Value() - color1.getA99Value()) * tmpRatio;
        var b99Value = color1.getB99Value() + (color2.getB99Value() - color1.getB99Value()) * tmpRatio;

        var tmpCurrentDIN99Color = new classColorDIN99(l99Value, a99Value, b99Value);

        var tmpCurrentColor = tmpCurrentDIN99Color.calcRGBColor();

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }

      break;*/
    default:
      console.log("Error at the createBand function");

  }

  return canvasData;
}


function createConstantBand(canvasData, xStart, bandWidth, bandHeight, color1, canvasWidth) {

  xStart = Math.round(xStart);
  bandWidth = Math.round(bandWidth);
  bandHeight = Math.round(bandHeight);

  /*switch (globalCMS1.getInterpolationSpace()) {
    case "rgb":

      for (var x = xStart; x <= xStart + bandWidth; x++) {

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(color1.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(color1.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(color1.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }

      break;
    case "hsv":*/

      var tmpCurrentColor = color1.calcRGBColor();

      for (var x = xStart; x <= xStart + bandWidth; x++) {

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }
    /*  break;
    case "lab":

      var tmpCurrentColor = color1.calcRGBColor();

      for (var x = xStart; x <= xStart + bandWidth; x++) {

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }

      break;
    case "din99":

      var tmpCurrentColor = color1.calcRGBColor();

      for (var x = xStart; x <= xStart + bandWidth; x++) {

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }

      case "lch":

        var tmpCurrentColor = color1.calcRGBColor();

        for (var x = xStart; x <= xStart + bandWidth; x++) {

          for (var y = 0; y < bandHeight; y++) {
            var index = (x + y * canvasWidth) * 4;
            canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
            canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
            canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
            canvasData.data[index + 3] = 255; //a
          }

        }
        break;

      break;
    default:
      console.log("Error at the createBand function");

  }*/

  return canvasData;
}
