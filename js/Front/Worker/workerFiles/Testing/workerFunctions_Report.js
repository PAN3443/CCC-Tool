function startReportCalc() {

  switch (reportType) {
    case 0:

      ratioFields = calcRatioDifFields(testTensorFieldValues,testTensorFieldColorDif);

      var answerJSON = {};
      answerJSON['type'] = reportType;
      answerJSON['canvasID'] = "id_TestPage_Report0Canvas";
      var imgData = new ImageData(ratioFields[0].length, ratioFields[0][0].length);
      var maxHeightIndex = ratioFields[0][0].length - 1;
      for (var y = 0; y < ratioFields[0][0].length; y++) {
        for (var x = 0; x < ratioFields[0].length; x++) {
          var colorRGB = ratioDifCMS.calculateColor(ratioFields[0][x][y]);
          var indices = getColorIndicesForCoord(x, maxHeightIndex - y, ratioFields[0].length);
          imgData.data[indices[0]] = Math.round(colorRGB.get1Value() * 255); // r
          imgData.data[indices[1]] = Math.round(colorRGB.get2Value() * 255); // g
          imgData.data[indices[2]] = Math.round(colorRGB.get3Value() * 255); // b
          imgData.data[indices[3]] = 255; //a
        }
      }
      answerJSON['imageData'] = imgData;
      self.postMessage(answerJSON);

      answerJSON = {};
      answerJSON['type'] = reportType;
      answerJSON['canvasID'] = "id_TestPage_Report1Canvas";
      imgData = new ImageData(ratioFields[1].length, ratioFields[1][0].length);
      maxHeightIndex = ratioFields[1][0].length - 1;
      for (var y = 0; y < ratioFields[1][0].length; y++) {
        for (var x = 0; x < ratioFields[1].length; x++) {
          var colorRGB = ratioDifCMS.calculateColor(ratioFields[1][x][y]);
          var indices = getColorIndicesForCoord(x, maxHeightIndex - y, ratioFields[1].length);
          imgData.data[indices[0]] = Math.round(colorRGB.get1Value() * 255); // r
          imgData.data[indices[1]] = Math.round(colorRGB.get2Value() * 255); // g
          imgData.data[indices[2]] = Math.round(colorRGB.get3Value() * 255); // b
          imgData.data[indices[3]] = 255; //a
        }
      }
      answerJSON['imageData'] = imgData;
      self.postMessage(answerJSON);

      answerJSON = {};
      answerJSON['type'] = reportType;
      answerJSON['canvasID'] = "id_TestPage_Report2Canvas";
      imgData = new ImageData(ratioFields[2].length, ratioFields[2][0].length);
      maxHeightIndex = ratioFields[2][0].length - 1;
      for (var y = 0; y < ratioFields[2][0].length; y++) {
        for (var x = 0; x < ratioFields[2].length; x++) {
          var colorRGB = ratioDifCMS.calculateColor(ratioFields[2][x][y]);
          var indices = getColorIndicesForCoord(x, maxHeightIndex - y, ratioFields[2].length);
          imgData.data[indices[0]] = Math.round(colorRGB.get1Value() * 255); // r
          imgData.data[indices[1]] = Math.round(colorRGB.get2Value() * 255); // g
          imgData.data[indices[2]] = Math.round(colorRGB.get3Value() * 255); // b
          imgData.data[indices[3]] = 255; //a
        }
      }
      answerJSON['imageData'] = imgData;
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
