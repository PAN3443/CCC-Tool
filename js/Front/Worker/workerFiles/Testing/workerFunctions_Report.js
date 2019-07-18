function startReportCalc() {

  switch (reportType) {
    case 0:

      ratioFields = getRatioDifField(testfield, colorfield, reportOptions_ColorDif);

      var answerJSON = {};
      answerJSON['type'] = reportType;
      answerJSON['canvasID'] = "id_TestPage_Report0Canvas";
      answerJSON['imageData'] = ratioFields[0];
      self.postMessage(answerJSON);

      answerJSON = {};
      answerJSON['type'] = reportType;
      answerJSON['canvasID'] = "id_TestPage_Report1Canvas";
      answerJSON['imageData'] = ratioFields[1];
      self.postMessage(answerJSON);

      answerJSON = {};
      answerJSON['type'] = reportType;
      answerJSON['canvasID'] = "id_TestPage_Report2Canvas";
      answerJSON['imageData'] = ratioFields[2];
      self.postMessage(answerJSON);

    break;
  }

}


function calcColorField() {
  var tmpColorField = [];
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
          tmpArray.push(tmpRGB.calcLABColor(tmpRGB));
        }
        tmpColorField.push(tmpArray);
      }
      break;
    case 3:
      for (var x = 0; x < xDim; x++) {
        var tmpArray = [];
        for (var y = 0; y < yDim; y++) {
          var tmpRGB = globalCMS1.calculateColor(testfield[x][y]);
          tmpArray.push(tmpRGB.calcDIN99Color());
        }
        tmpColorField.push(tmpArray);
      }
      break;
  }

  return tmpColorField;
}



function sendReportOriginalImage(){

  var answerJSON = {};
  answerJSON['type'] = 0;
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
  answerJSON['canvasID'] = "id_TestPage_ReportOrginalGCanvas";
  var imgData = new ImageData(testfield.length, testfield[0].length);
  var maxHeightIndex = testfield[0].length - 1;
  for (var y = 0; y < testfield[0].length; y++) {
    for (var x = 0; x < testfield.length; x++) {
      var greyVal = ((testfield[x][y]-min)/dis)*255;
      var indices = getColorIndicesForCoord(x, maxHeightIndex - y, testfield.length);
      imgData.data[indices[0]] = Math.round(greyVal); // r
      imgData.data[indices[1]] = Math.round(greyVal); // g
      imgData.data[indices[2]] = Math.round(greyVal); // b
      imgData.data[indices[3]] = 255; //a
    }
  }
  answerJSON['imageData'] = imgData;
  self.postMessage(answerJSON);
}
