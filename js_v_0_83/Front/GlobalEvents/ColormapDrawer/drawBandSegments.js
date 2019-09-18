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


      if(color1.getColorType()!=color2.getColorType()){
        var newColor = color2.getInColorFormat(color1.getColorType());
        color2.deleteReferences();
        color2=newColor;
      }

      var tmpWorkColor;

      switch (color1.getColorType()) {

        case "rgb":
         tmpWorkColor = new class_Color_RGB(0, 0, 0);
         break;
        case "hsv":
        tmpWorkColor = new class_Color_HSV(0, 0, 0);
        break;
        case "lab":
        case "de2000-ds":
        case "de2000":
        case "de94-ds":
        case "de94":
          tmpWorkColor = new class_Color_LAB(0, 0, 0);
        break;
        case "din99":
        tmpWorkColor = new class_Color_DIN99(0, 0, 0);
        break;
        case "lch":
          tmpWorkColor = new class_Color_LCH(0, 0, 0);
        break;

     }



      for (var x = xStart; x < xStart + bandWidth; x++) {
       var tmpRatio = (x - xStart) / bandWidth;

        tmpWorkColor.set1Value(color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio);
        tmpWorkColor.set2Value(color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio);
        tmpWorkColor.set3Value(color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio);

        var tmpCurrentColor=tmpWorkColor.getInColorFormat("rgb");

        if(doColorblindnessSim){
          var tmpLMS = tmpCurrentColor.calcLMSColor();
          tmpCurrentColor.deleteReferences();
          tmpCurrentColor = tmpLMS.calcColorBlindRGBColor();
          tmpLMS.deleteReferences();
          tmpLMS=null;
        }

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + (y+yStart) * canvasWidth) * 4;
          //var index = ((xStart+x) + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }
        tmpCurrentColor.deleteReferences();
        tmpCurrentColor=null;

      }

      tmpWorkColor.deleteReferences();
      color1.deleteReferences();
      color2.deleteReferences();
      tmpWorkColor=null;
      color1=null;
      color2=null;


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

      tmpCurrentColor.deleteReferences();
      color1.deleteReferences();
      tmpCurrentColor=null;
      color1=null;
  return canvasData;
}



function createScaledBandVertical(canvasData, yStart, bandWidth, bandHeight, color1, color2, canvasWidth) {

  yStart = Math.round(yStart);
  bandWidth = Math.round(bandWidth);
  bandHeight = Math.round(bandHeight);

    if(color1.getColorType()!=color2.getColorType()){
      var newColor = color2.getInColorFormat(color1.getColorType());
      color2.deleteReferences();
      color2=newColor;
    }

    var tmpWorkColor;

    switch (color1.getColorType()) {

      case "rgb":
       tmpWorkColor = new class_Color_RGB(0, 0, 0);
       break;
      case "hsv":
      tmpWorkColor = new class_Color_HSV(0, 0, 0);
      break;
      case "lab":
      case "de2000-ds":
      case "de2000":
      case "de94-ds":
      case "de94":
        tmpWorkColor = new class_Color_LAB(0, 0, 0);
      break;
      case "din99":
      tmpWorkColor = new class_Color_DIN99(0, 0, 0);
      break;
      case "lch":
        tmpWorkColor = new class_Color_LCH(0, 0, 0);
      break;

   }

      for (var y = yStart; y >= yStart - bandHeight; y--) {
       var tmpRatio = (yStart - y) / bandHeight;

        tmpWorkColor.set1Value(color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio);
        tmpWorkColor.set2Value(color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio);
        tmpWorkColor.set3Value(color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio);

        var tmpCurrentColor=tmpWorkColor.getInColorFormat("rgb");

        if(doColorblindnessSim){
          var tmpLMS = tmpCurrentColor.calcLMSColor();
          tmpCurrentColor.deleteReferences();
          tmpCurrentColor = tmpLMS.calcColorBlindRGBColor();
          tmpLMS.deleteReferences();
          tmpLMS=null;
        }

        for (var x = 0; x < bandWidth; x++) {
          var index = (x + (y+yStart) * canvasWidth) * 4;
          //var index = ((xStart+x) + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a

        }
        tmpCurrentColor.deleteReferences();
        tmpCurrentColor=null;

      }

      tmpWorkColor.deleteReferences();
      color1.deleteReferences();
      color2.deleteReferences();
      tmpWorkColor=null;
      color1=null;
      color2=null;

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

      tmpCurrentColor.deleteReferences();
      color1.deleteReferences();
      tmpCurrentColor=null;
      color1=null;

  return canvasData;
}
