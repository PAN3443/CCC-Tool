function startReportCalc() {

  switch (reportType) {
    case 0:

      ratioFields = getRatioDifField(testfield, colorfield, reportOptions_ColorDif);

      var answerJSON = {};
      answerJSON['type'] = reportType;
      answerJSON['subtype'] = "reportIMG"
      answerJSON['canvasID'] = "id_TestPage_Report0Canvas";
      answerJSON['imageData'] = ratioFields[0];
      self.postMessage(answerJSON);

      answerJSON = {};
      answerJSON['type'] = reportType;
      answerJSON['subtype'] = "reportIMG"
      answerJSON['canvasID'] = "id_TestPage_Report1Canvas";
      answerJSON['imageData'] = ratioFields[1];
      self.postMessage(answerJSON);

      answerJSON = {};
      answerJSON['type'] = reportType;
      answerJSON['subtype'] = "reportIMG"
      answerJSON['canvasID'] = "id_TestPage_Report2Canvas";
      answerJSON['imageData'] = ratioFields[2];
      self.postMessage(answerJSON);


      //// calc statistics

      answerJSON = {};
      answerJSON['type'] = reportType;
      answerJSON['subtype'] = "statistics"
      answerJSON['valueDifInfo'] = ratioFields[3];
      answerJSON['valueDifStat'] = calcSubReportStatisics(ratioFields[3]);
      answerJSON['colorDifInfo'] = ratioFields[4];
      answerJSON['colorDifStat'] = calcSubReportStatisics(ratioFields[4]);
      answerJSON['valueRatioInfo'] = ratioFields[5];
      answerJSON['valueRatioStat'] = calcSubReportStatisics(ratioFields[5]);
      answerJSON['colorRatioInfo'] = ratioFields[6];
      answerJSON['colorRatioStat'] = calcSubReportStatisics(ratioFields[6]);
      answerJSON['subtractionInfo'] = ratioFields[7];
      answerJSON['subtractionStat'] = calcSubReportStatisics(ratioFields[7]);

      self.postMessage(answerJSON);

    break;
  }

}



function calcSubReportStatisics(tmpArrays){

  var sumForAverage = 0;
  var counter = 0;
  var min = Infinity;
  var max = -Infinity;

  for (var index = 0; index < tmpArrays.length; index++) {
    for (var x = 0; x < tmpArrays[index].length; x++) {
      for (var y = 0; y < tmpArrays[index][0].length; y++) {
        sumForAverage += tmpArrays[index][x][y];
        min = Math.min(min,tmpArrays[index][x][y]);
        max = Math.max(max,tmpArrays[index][x][y]);
        counter++;
      }
    }
  }

  var average=sumForAverage/counter;
  var sumForVariance = 0;

  for (var index = 0; index < tmpArrays.length; index++) {
    for (var x = 0; x < tmpArrays[index].length; x++) {
      for (var y = 0; y < tmpArrays[index][0].length; y++) {
        sumForVariance += Math.pow(tmpArrays[index][x][y]-average,2);
      }
    }
  }

  var variance = sumForVariance/counter;
  var deviation = Math.sqrt(variance);

  return [min,max,average,variance,deviation];
}


function calcColorField() {

  ///////////// delelte references of the colors
  if(colorField!=undefined){
    for (var i = colorField.length-1; i >=0 ; i--) {
      for (var j = colorField[i].length-1; j >=0 ; j--) {
        colorField[i][j].deleteReferences();
      }
    }
  }

  colorField = [];

  if (testfield.length == 0)
    return [];

  var xDim = testfield.length;
  var yDim = testfield[0].length;

  switch (reportOptions_ColorDif) {
    case 0: //
    case 1:
    case 2:
      for (var x = 0; x < xDim; x++) {
        var tmpArray = [];
        for (var y = 0; y < yDim; y++) {
          var tmpRGB = globalCMS1.calculateColor(testfield[x][y]);
          var labColor = tmpRGB.calcLABColor();
          tmpRGB.deleteReferences();
          tmpArray.push(labColor);
        }
        tmpColorField.push(tmpArray);
      }
      break;
    case 3:
      for (var x = 0; x < xDim; x++) {
        var tmpArray = [];
        for (var y = 0; y < yDim; y++) {
          var tmpRGB = globalCMS1.calculateColor(testfield[x][y]);
          var dinColor = tmpRGB.calcDIN99Color();
          tmpRGB.deleteReferences();
          tmpArray.push(dinColor);
        }
        tmpColorField.push(tmpArray);
      }
      break;
  }


}





function sendReportOriginalImage(){

  var answerJSON = {};
  answerJSON['type'] = 0;
  answerJSON['subtype'] = "reportIMG"
  answerJSON['canvasID'] = "id_TestPage_ReportOrginalCCanvas";
  var imgData = new ImageData(colorfield.length, colorfield[0].length);
  var maxHeightIndex = colorfield[0].length - 1;
  for (var y = 0; y < colorfield[0].length; y++) {
    for (var x = 0; x < colorfield.length; x++) {
      var colorRGB = colorfield[x][y].calcRGBColor();
      var indices = getColorIndicesForCoord(x, maxHeightIndex - y, colorfield.length);
      imgData.data[indices[0]] = Math.round(colorRGB.get1Value() * 255); // r
      imgData.data[indices[1]] = Math.round(colorRGB.get2Value() * 255); // g
      imgData.data[indices[2]] = Math.round(colorRGB.get3Value() * 255); // b
      imgData.data[indices[3]] = 255; //a
    }
  }
  answerJSON['imageData'] = imgData;
  self.postMessage(answerJSON);

}

function sendReportGreyImage(){

  var min = Infinity;
  var max = -Infinity;

  for (var y = 0; y < testfield[0].length; y++) {
    for (var x = 0; x < testfield.length; x++) {

        min = Math.min(min,testfield[x][y]);
        max = Math.max(max,testfield[x][y]);
  }}
  var dis=max-min;

  var answerJSON = {};
  answerJSON['type'] = 0;
  answerJSON['subtype'] = "reportIMG"
  answerJSON['canvasID'] = "id_TestPage_ReportOrginalGCanvas";
  var imgData = new ImageData(testfield.length, testfield[0].length);
  var maxHeightIndex = testfield[0].length - 1;
  for (var y = 0; y < testfield[0].length; y++) {
    for (var x = 0; x < testfield.length; x++) {
      var greyVal = greyScaledCMS.calculateColor(((testfield[x][y]-min)/dis));
      var indices = getColorIndicesForCoord(x, maxHeightIndex - y, testfield.length);
      imgData.data[indices[0]] = Math.round(greyVal.getRValue()*255); // r
      imgData.data[indices[1]] = Math.round(greyVal.getGValue()*255); // g
      imgData.data[indices[2]] = Math.round(greyVal.getBValue()*255); // b
      imgData.data[indices[3]] = 255; //a
      greyVal.deleteReferences();
    }
  }
  answerJSON['imageData'] = imgData;
  self.postMessage(answerJSON);
}
