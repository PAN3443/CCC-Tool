function startReportCalc() {
  var answerJSON = {};
  answerJSON['type'] = reportType;
  switch (reportType) {
    case 0:
      answerJSON['canvasID'] = "id_TestPage_Report0Canvas";
      //answerJSON['imageData'] = calculateImageData(testFieldList[i],false);

      var imgData = new ImageData(imgWidth, imgHeight);

    break;
  }
  self.postMessage(answerJSON);
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
          tmpArray.push(globalCMS1.calculateColor(testfield[x, y]).calcLABColor());
        }
        tmpColorField.push(tmpArray);
      }
      break;
    case 3:
      for (var x = 0; x < xDim; x++) {
        var tmpArray = [];
        for (var y = 0; y < yDim; y++) {
          tmpArray.push(globalCMS1.calculateColor(testfield[x, y]).calcDIN99Color());
        }
        tmpColorField.push(tmpArray);
      }
      break;
  }
  return tmpColorField;
}
