function initComparePage(){
    initRGB3D();

    bandSketch.colormap2Sketch(compareColormap1);
    bandSketch2.colormap2Sketch(compareColormap2);

    orderColorSketch(colorspaceModus);
    changeCourseSpaceCompare();

    drawCompareMapPreviews();
    drawCompareDifferenceMaps();
    //drawRGBSpace();

}

function switchCompareMaps(){
  var tmp = colormap2SelectIndex;
  colormap2SelectIndex = colormap1SelectIndex;
  colormap1SelectIndex = tmp;

  var tmpColormap = compareColormap2;
  compareColormap2 = compareColormap1;
  compareColormap1 = tmpColormap;

  initComparePage();
}

function changeCourseSpaceCompare(){

  document.getElementById("id_containerHueCourseCompare").style.display = "none";
  document.getElementById("id_compareValue").style.display = "none";
  document.getElementById("id_hueValueOptionsCompare").style.display = "none";
  document.getElementById("id_RGBCourseDivCompare").style.display = "none";

  switch(colorspaceModus){
      case "rgb":;
        document.getElementById("id_RGBCourseDivCompare").style.display = "initial";
        rgbInit("id_canvasRGCompare","id_canvasRBCompare","id_canvasBGCompare", true);
        //drawcolormap_RGBSpace(compareColormap1, "id_canvasRG","id_canvasRB","id_canvasBG", true);
        drawcolormap_compare_RGBSpace(compareColormap1, compareColormap2, "id_canvasRGCompare","id_canvasRBCompare","id_canvasBGCompare", true);
      break;
      case "hsv":
        document.getElementById("id_containerHueCourseCompare").style.display = "initial";
        document.getElementById("id_compareValue").style.display = "initial";
        document.getElementById("id_hueValueOptionsCompare").style.display = "initial";
        hueInit("id_compareCourseHueBackground");
        document.getElementById("id_setValueRangeCompare").value = 100;
        //drawcolormap_hueSpace(compareColormap1, "id_anaylseCourseHueBackground",false);
        drawcolormap_compare_hueSpace(compareColormap1, compareColormap2, "id_compareCourseHueBackground",false);
      break;
      case "lab": case "din99":
        document.getElementById("id_containerHueCourseCompare").style.display = "initial";
        document.getElementById("id_compareValue").style.display = "initial";
        document.getElementById("id_hueValueOptionsCompare").style.display = "initial";
        hueInit("id_compareCourseHueBackground");
        document.getElementById("id_setValueRangeCompare").value = 65;
        //drawcolormap_hueSpace(compareColormap1, "id_anaylseCourseHueBackground",false);
        drawcolormap_compare_hueSpace(compareColormap1, compareColormap2,"id_compareCourseHueBackground",false);
      break;
      default:
      console.log("Error at the changeColorspace function");
      return;
  }//*/


}

function changeValueRangeCompare(){

      if(parseFloat(document.getElementById('id_setValueRangeCompare'))<0){
        document.getElementById('id_setValueRangeCompare').value = 0;
      }

      if(parseFloat(document.getElementById('id_setValueRangeCompare'))>100){
        document.getElementById('id_setValueRangeCompare').value = 100;
      }

      hueInit("id_compareCourseHueBackground");
      drawcolormap_compare_hueSpace(compareColormap1, compareColormap2,"id_compareCourseHueBackground",false);
}

function compareColormapRGBPossible(){
  if(document.getElementById("id_checkboxRGBCompare").checked==true){
    orderColorSketch('rgb');
    bandSketch.colormap2Sketch(compareColormap1);
    bandSketch2.colormap2Sketch(compareColormap2);
    drawcolormap_compare_hueSpace(compareColormap1, compareColormap2,"id_compareCourseHueBackground",false);
    document.getElementById("id_checkboxRGB").checked=true;
  }
  else{
    document.getElementById("id_checkboxRGB").checked=false;
  }
}

function drawCompareMapPreviews(){

  var oldColorspace = colorspaceModus;

  colorspaceModus="rgb";
      drawCanvasColormap("id_compare1RGB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, compareColormap1);
      drawCanvasColormap("id_compare2RGB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, compareColormap2);
  colorspaceModus="hsv";
      drawCanvasColormap("id_compare1HSV_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, compareColormap1);
      drawCanvasColormap("id_compare2HSV_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, compareColormap2);
  colorspaceModus="lab";
      drawCanvasColormap("id_compare1LAB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, compareColormap1);
      drawCanvasColormap("id_compare2LAB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, compareColormap2);
  colorspaceModus="din99";
      drawCanvasColormap("id_compare1DIN99_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, compareColormap1);
      drawCanvasColormap("id_compare2DIN99_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, compareColormap2);
  colorspaceModus = oldColorspace;
}

function drawCompareDifferenceMaps(){

  var old_tbody = document.getElementById("id_compareTableBody");
  var new_tbody = document.createElement('tbody');

  var canvasREF = document.getElementById("id_compare1RatioRef");
  var canvasRGB = document.getElementById("id_compare1RatioRGB");
  var canvasHSV = document.getElementById("id_compare1RatioHSV");
  var canvasLAB = document.getElementById("id_compare1RatioLAB");
  var canvasCIEDE2000 = document.getElementById("id_compare1RatioDe2000");
  var canvasDE94 = document.getElementById("id_compare1RatioDE94");
  var canvasDIN99 = document.getElementById("id_compare1RatioDIN99");

  var canvasREF_2 = document.getElementById("id_compare2RatioRef");
  var canvasRGB_2 = document.getElementById("id_compare2RatioRGB");
  var canvasHSV_2 = document.getElementById("id_compare2RatioHSV");
  var canvasLAB_2 = document.getElementById("id_compare2RatioLAB");
  var canvasCIEDE2000_2 = document.getElementById("id_compare2RatioDe2000");
  var canvasDE94_2 = document.getElementById("id_compare2RatioDE94");
  var canvasDIN99_2 = document.getElementById("id_compare2RatioDIN99");

  canvasREF.width = resolutionX_differenceMetrics;
  canvasREF.height = 1;
  canvasRGB.width = resolutionX_differenceMetrics;
  canvasRGB.height = 1;
  canvasHSV.width = resolutionX_differenceMetrics;
  canvasHSV.height = 1;
  canvasLAB.width = resolutionX_differenceMetrics;
  canvasLAB.height = 1;
  canvasCIEDE2000.width = resolutionX_differenceMetrics;
  canvasCIEDE2000.height = 1;
  canvasDE94.width = resolutionX_differenceMetrics;
  canvasDE94.height = 1;
  canvasDIN99.width = resolutionX_differenceMetrics;
  canvasDIN99.height = 1;

  canvasREF_2.width = resolutionX_differenceMetrics;
  canvasREF_2.height = 1;
  canvasRGB_2.width = resolutionX_differenceMetrics;
  canvasRGB_2.height = 1;
  canvasHSV_2.width = resolutionX_differenceMetrics;
  canvasHSV_2.height = 1;
  canvasLAB_2.width = resolutionX_differenceMetrics;
  canvasLAB_2.height = 1;
  canvasCIEDE2000_2.width = resolutionX_differenceMetrics;
  canvasCIEDE2000_2.height = 1;
  canvasDE94_2.width = resolutionX_differenceMetrics;
  canvasDE94_2.height = 1;
  canvasDIN99_2.width = resolutionX_differenceMetrics;
  canvasDIN99_2.height = 1;

  var refCtx = canvasREF.getContext("2d");
  var refData = refCtx.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var rgbCtx = canvasRGB.getContext("2d");
  var rgbData = rgbCtx.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var hsvCtx = canvasHSV.getContext("2d");
  var hsvData = hsvCtx.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var labCtx = canvasLAB.getContext("2d");
  var labData = labCtx.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var de94Ctx = canvasDE94.getContext("2d");
  var de94Data = de94Ctx.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var de2000Ctx = canvasCIEDE2000.getContext("2d");
  var de2000Data = de2000Ctx.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var din99Ctx = canvasDIN99.getContext("2d");
  var din99Data = din99Ctx.getImageData(0, 0, resolutionX_differenceMetrics, 1);

  var refCtx_2 = canvasREF_2.getContext("2d");
  var refData_2 = refCtx_2.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var rgbCtx_2 = canvasRGB_2.getContext("2d");
  var rgbData_2 = rgbCtx_2.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var hsvCtx_2 = canvasHSV_2.getContext("2d");
  var hsvData_2 = hsvCtx_2.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var labCtx_2 = canvasLAB_2.getContext("2d");
  var labData_2 = labCtx_2.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var de94Ctx_2 = canvasDE94_2.getContext("2d");
  var de94Data_2 = de94Ctx_2.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var de2000Ctx_2 = canvasCIEDE2000_2.getContext("2d");
  var de2000Data_2 = de2000Ctx_2.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var din99Ctx_2 = canvasDIN99_2.getContext("2d");
  var din99Data_2 = din99Ctx_2.getImageData(0, 0, resolutionX_differenceMetrics, 1);

  bandSketch.calcNewDistances();
  bandSketch2.calcNewDistances();

  ///////////////////////////////////////////////////
  /// COLORMAP 1

  var currentPos = [0,0,0,0,0,0,0];
  var currentWidth = [0,0,0,0,0,0,0];
  var colorRef = new classColor_RGB(0.5,0.5,0.5);

  var borderWidth = 2; //px

  var restWidth = resolutionX_differenceMetrics-(bandSketch.getBandLenght()-bandSketch.getNumConstBands()-1)*borderWidth;

  for (var i = 0; i < bandSketch.getBandLenght(); i++) {

    var tr = document.createElement('tr');
    tr.style.background = 'rgb(144,238,144)';

    if(bandSketch.getRefDistance(i)==0){
      var td = document.createElement('td');
      td.className = "class_tableInput";
      var tmpVal = i+1;
      td.appendChild(document.createTextNode("constant "+tmpVal));
      tr.appendChild(td);
      // ref
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      // rgb
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      // hsv
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      // lab
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      // DE94
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      // DE00
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      // DIN99
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      new_tbody.appendChild(tr);
      continue;
    }

    var td = document.createElement('td')
    td.className = "class_tableInput";
    var tmpVal = i+1;
    td.appendChild(document.createTextNode("scaled "+tmpVal));
    tr.appendChild(td);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// REF

    var tmpRatio = bandSketch.getRefDistance(i)/bandSketch.getDistanceSumRef();
    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(bandSketch.getRefDistance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[0] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[0]; x++){
      var index = (currentPos[0]+x) * 4;
      refData.data[index + 0] = Math.round(colorRef.getRValue() * 255); // r
      refData.data[index + 1] = Math.round(colorRef.getGValue() * 255); // g
      refData.data[index + 2] = Math.round(colorRef.getBValue() * 255); // b
      refData.data[index + 3] = 255; //a
    }
    currentPos[0]=currentPos[0]+currentWidth[0];

    if(i != bandSketch.getBandLenght()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[0]+x) * 4;
        refData.data[index + 0] = Math.round(0); // r
        refData.data[index + 1] = Math.round(0); // g
        refData.data[index + 2] = Math.round(0); // b
        refData.data[index + 3] = 255; //a
      }
      currentPos[0]=currentPos[0]+borderWidth;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// RGB

    var color1 = bandSketch.getC1Color(i,"rgb");
    var color2 = bandSketch.getC2Color(i,"rgb");


    tmpRatio = bandSketch.getRGBDistance(i)/bandSketch.getDistanceSumRGB();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(bandSketch.getRGBDistance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[1] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[1]; x++){
      var index = (currentPos[1]+x) * 4;

      var tmpRatio = x/currentWidth[1];

      var rValue = color1.getRValue() + (color2.getRValue() - color1.getRValue()) * tmpRatio;
      var gValue = color1.getGValue() + (color2.getGValue() - color1.getGValue()) * tmpRatio;
      var bValue = color1.getBValue() + (color2.getBValue() - color1.getBValue()) * tmpRatio;

      rgbData.data[index + 0] = Math.round(rValue * 255); // r
      rgbData.data[index + 1] = Math.round(gValue * 255); // g
      rgbData.data[index + 2] = Math.round(bValue * 255); // b
      rgbData.data[index + 3] = 255; //a
    }
    currentPos[1]=currentPos[1]+currentWidth[1];

    if(i != bandSketch.getBandLenght()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[1]+x) * 4;
        rgbData.data[index + 0] = Math.round(0); // r
        rgbData.data[index + 1] = Math.round(0); // g
        rgbData.data[index + 2] = Math.round(0); // b
        rgbData.data[index + 3] = 255; //a
      }

    currentPos[1]=currentPos[1]+borderWidth;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// hsv

    color1 = bandSketch.getC1Color(i,"hsv");
    color2 = bandSketch.getC2Color(i,"hsv");

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

    tmpRatio = bandSketch.getHSVDistance(i)/bandSketch.getDistanceSumHSV();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(bandSketch.getHSVDistance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[2] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[2]; x++){
      var index = (currentPos[2]+x) * 4;

      var tmpRatio = x/currentWidth[2];

      var tmpX = xPos + (xPos2 - xPos) * tmpRatio;
      var tmpY = yPos + (yPos2 - yPos) * tmpRatio;
      var tmpZ = zPos + (zPos2 - zPos) * tmpRatio;

      var tmpH = (Math.atan2(tmpY, tmpX) + Math.PI) / (Math.PI * 2);
      var tmpS = Math.sqrt(Math.pow(tmpX, 2) + Math.pow(tmpY, 2)) / 50;
      var tmpV = tmpZ + 50;
      var tmpCurrentHSVColor = new classColor_HSV(tmpH, tmpS, tmpV);

      var tmpCurrentColor = tmpCurrentHSVColor.calcRGBColor();

      hsvData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      hsvData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      hsvData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      hsvData.data[index + 3] = 255; //a
    }
    currentPos[2]=currentPos[2]+currentWidth[2];

    if(i != bandSketch.getBandLenght()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[2]+x) * 4;
        hsvData.data[index + 0] = Math.round(0); // r
        hsvData.data[index + 1] = Math.round(0); // g
        hsvData.data[index + 2] = Math.round(0); // b
        hsvData.data[index + 3] = 255; //a
      }

    currentPos[2]=currentPos[2]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// lab
    color1 = bandSketch.getC1Color(i,"lab");
    color2 = bandSketch.getC2Color(i,"lab");

    tmpRatio = bandSketch.getLABDistance(i)/bandSketch.getDistanceSumLAB();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(bandSketch.getLABDistance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[3] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[3]; x++){
      var index = (currentPos[3]+x) * 4;

      var tmpRatio = x/currentWidth[3];

      var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
      var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

      labData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      labData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      labData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      labData.data[index + 3] = 255; //a
    }
    currentPos[3]=currentPos[3]+currentWidth[3];

    if(i != bandSketch.getBandLenght()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[3]+x) * 4;
        labData.data[index + 0] = Math.round(0); // r
        labData.data[index + 1] = Math.round(0); // g
        labData.data[index + 2] = Math.round(0); // b
        labData.data[index + 3] = 255; //a
      }

    currentPos[3]=currentPos[3]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// de94
    tmpRatio = bandSketch.getDE94Distance(i)/bandSketch.getDistanceSumDE94();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(bandSketch.getDE94Distance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[4] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[4]; x++){
      var index = (currentPos[4]+x) * 4;

      var tmpRatio = x/currentWidth[4];

      var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
      var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

      de94Data.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      de94Data.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      de94Data.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      de94Data.data[index + 3] = 255; //a
    }
    currentPos[4]=currentPos[4]+currentWidth[4];

    if(i != bandSketch.getBandLenght()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[4]+x) * 4;
        de94Data.data[index + 0] = Math.round(0); // r
        de94Data.data[index + 1] = Math.round(0); // g
        de94Data.data[index + 2] = Math.round(0); // b
        de94Data.data[index + 3] = 255; //a
      }

    currentPos[4]=currentPos[4]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// de2000
    tmpRatio = bandSketch.getCIEDE2000Distance(i)/bandSketch.getDistanceSumCIEDE2000();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(bandSketch.getCIEDE2000Distance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[5] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[5]; x++){
      var index = (currentPos[5]+x) * 4;

      var tmpRatio = x/currentWidth[5];

      var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
      var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

      de2000Data.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      de2000Data.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      de2000Data.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      de2000Data.data[index + 3] = 255; //a
    }
    currentPos[5]=currentPos[5]+currentWidth[5];

    if(i != bandSketch.getBandLenght()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[5]+x) * 4;
        de2000Data.data[index + 0] = Math.round(0); // r
        de2000Data.data[index + 1] = Math.round(0); // g
        de2000Data.data[index + 2] = Math.round(0); // b
        de2000Data.data[index + 3] = 255; //a
      }

    currentPos[5]=currentPos[5]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// din99
    color1 = bandSketch.getC1Color(i,"din99");
    color2 = bandSketch.getC2Color(i,"din99");
    tmpRatio = bandSketch.getDIN99Distance(i)/bandSketch.getDistanceSumDIN99();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(bandSketch.getDIN99Distance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[6] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[6]; x++){
      var index = (currentPos[6]+x) * 4;

      var tmpRatio = x/currentWidth[6];

      var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
      var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

      din99Data.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      din99Data.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      din99Data.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      din99Data.data[index + 3] = 255; //a
    }
    currentPos[6]=currentPos[6]+currentWidth[6];

    if(i != bandSketch.getBandLenght()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[6]+x) * 4;
        din99Data.data[index + 0] = Math.round(0); // r
        din99Data.data[index + 1] = Math.round(0); // g
        din99Data.data[index + 2] = Math.round(0); // b
        din99Data.data[index + 3] = 255; //a
      }

    currentPos[6]=currentPos[6]+borderWidth;
    }


    new_tbody.appendChild(tr);

  }


  ///////////////////////////////////////////////////
  /// COLORMAP 2

  currentPos = [0,0,0,0,0,0,0];
  currentWidth = [0,0,0,0,0,0,0];

  restWidth = resolutionX_differenceMetrics-(bandSketch2.getBandLenght()-bandSketch2.getNumConstBands()-1)*borderWidth;

  for (var i = 0; i < bandSketch2.getBandLenght(); i++) {

    var tr = document.createElement('tr');
    tr.style.background = 'rgb(255,250,205)';;//'rgb(255,255,224)';
    if(bandSketch2.getRefDistance(i)==0){
      var td = document.createElement('td');
      td.className = "class_tableInput";
      var tmpVal = i+1;
      td.appendChild(document.createTextNode("constant "+tmpVal));
      tr.appendChild(td);
      // ref
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      // rgb
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      // hsv
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      // lab
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      // DE94
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      // DE00
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      // DIN99
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("/"));
      tr.appendChild(td);
      new_tbody.appendChild(tr);
      continue;
    }

    var td = document.createElement('td')
    td.className = "class_tableInput";
    var tmpVal = i+1;
    td.appendChild(document.createTextNode("scaled "+tmpVal));
    tr.appendChild(td);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// REF

    var tmpRatio = bandSketch2.getRefDistance(i)/bandSketch2.getDistanceSumRef();
    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(bandSketch2.getRefDistance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[0] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[0]; x++){
      var index = (currentPos[0]+x) * 4;
      refData_2.data[index + 0] = Math.round(colorRef.getRValue() * 255); // r
      refData_2.data[index + 1] = Math.round(colorRef.getGValue() * 255); // g
      refData_2.data[index + 2] = Math.round(colorRef.getBValue() * 255); // b
      refData_2.data[index + 3] = 255; //a
    }
    currentPos[0]=currentPos[0]+currentWidth[0];

    if(i != bandSketch2.getBandLenght()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[0]+x) * 4;
        refData_2.data[index + 0] = Math.round(0); // r
        refData_2.data[index + 1] = Math.round(0); // g
        refData_2.data[index + 2] = Math.round(0); // b
        refData_2.data[index + 3] = 255; //a
      }
      currentPos[0]=currentPos[0]+borderWidth;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// RGB

    var color1 = bandSketch2.getC1Color(i,"rgb");
    var color2 = bandSketch2.getC2Color(i,"rgb");


    tmpRatio = bandSketch2.getRGBDistance(i)/bandSketch2.getDistanceSumRGB();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(bandSketch2.getRGBDistance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[1] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[1]; x++){
      var index = (currentPos[1]+x) * 4;

      var tmpRatio = x/currentWidth[1];

      var rValue = color1.getRValue() + (color2.getRValue() - color1.getRValue()) * tmpRatio;
      var gValue = color1.getGValue() + (color2.getGValue() - color1.getGValue()) * tmpRatio;
      var bValue = color1.getBValue() + (color2.getBValue() - color1.getBValue()) * tmpRatio;

      rgbData_2.data[index + 0] = Math.round(rValue * 255); // r
      rgbData_2.data[index + 1] = Math.round(gValue * 255); // g
      rgbData_2.data[index + 2] = Math.round(bValue * 255); // b
      rgbData_2.data[index + 3] = 255; //a
    }
    currentPos[1]=currentPos[1]+currentWidth[1];

    if(i != bandSketch2.getBandLenght()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[1]+x) * 4;
        rgbData_2.data[index + 0] = Math.round(0); // r
        rgbData_2.data[index + 1] = Math.round(0); // g
        rgbData_2.data[index + 2] = Math.round(0); // b
        rgbData_2.data[index + 3] = 255; //a
      }

    currentPos[1]=currentPos[1]+borderWidth;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// hsv

    color1 = bandSketch2.getC1Color(i,"hsv");
    color2 = bandSketch2.getC2Color(i,"hsv");

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

    tmpRatio = bandSketch2.getHSVDistance(i)/bandSketch2.getDistanceSumHSV();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(bandSketch2.getHSVDistance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[2] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[2]; x++){
      var index = (currentPos[2]+x) * 4;

      var tmpRatio = x/currentWidth[2];

      var tmpX = xPos + (xPos2 - xPos) * tmpRatio;
      var tmpY = yPos + (yPos2 - yPos) * tmpRatio;
      var tmpZ = zPos + (zPos2 - zPos) * tmpRatio;

      var tmpH = (Math.atan2(tmpY, tmpX) + Math.PI) / (Math.PI * 2);
      var tmpS = Math.sqrt(Math.pow(tmpX, 2) + Math.pow(tmpY, 2)) / 50;
      var tmpV = tmpZ + 50;
      var tmpCurrentHSVColor = new classColor_HSV(tmpH, tmpS, tmpV);

      var tmpCurrentColor = tmpCurrentHSVColor.calcRGBColor();

      hsvData_2.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      hsvData_2.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      hsvData_2.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      hsvData_2.data[index + 3] = 255; //a
    }
    currentPos[2]=currentPos[2]+currentWidth[2];

    if(i != bandSketch2.getBandLenght()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[2]+x) * 4;
        hsvData_2.data[index + 0] = Math.round(0); // r
        hsvData_2.data[index + 1] = Math.round(0); // g
        hsvData_2.data[index + 2] = Math.round(0); // b
        hsvData_2.data[index + 3] = 255; //a
      }

    currentPos[2]=currentPos[2]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// lab
    color1 = bandSketch2.getC1Color(i,"lab");
    color2 = bandSketch2.getC2Color(i,"lab");

    tmpRatio = bandSketch2.getLABDistance(i)/bandSketch2.getDistanceSumLAB();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(bandSketch2.getLABDistance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[3] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[3]; x++){
      var index = (currentPos[3]+x) * 4;

      var tmpRatio = x/currentWidth[3];

      var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
      var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

      labData_2.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      labData_2.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      labData_2.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      labData_2.data[index + 3] = 255; //a
    }
    currentPos[3]=currentPos[3]+currentWidth[3];

    if(i != bandSketch2.getBandLenght()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[3]+x) * 4;
        labData_2.data[index + 0] = Math.round(0); // r
        labData_2.data[index + 1] = Math.round(0); // g
        labData_2.data[index + 2] = Math.round(0); // b
        labData_2.data[index + 3] = 255; //a
      }

    currentPos[3]=currentPos[3]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// de94
    tmpRatio = bandSketch2.getDE94Distance(i)/bandSketch2.getDistanceSumDE94();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(bandSketch2.getDE94Distance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[4] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[4]; x++){
      var index = (currentPos[4]+x) * 4;

      var tmpRatio = x/currentWidth[4];

      var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
      var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

      de94Data_2.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      de94Data_2.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      de94Data_2.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      de94Data_2.data[index + 3] = 255; //a
    }
    currentPos[4]=currentPos[4]+currentWidth[4];

    if(i != bandSketch2.getBandLenght()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[4]+x) * 4;
        de94Data_2.data[index + 0] = Math.round(0); // r
        de94Data_2.data[index + 1] = Math.round(0); // g
        de94Data_2.data[index + 2] = Math.round(0); // b
        de94Data_2.data[index + 3] = 255; //a
      }

    currentPos[4]=currentPos[4]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// de2000
    tmpRatio = bandSketch2.getCIEDE2000Distance(i)/bandSketch2.getDistanceSumCIEDE2000();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(bandSketch2.getCIEDE2000Distance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[5] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[5]; x++){
      var index = (currentPos[5]+x) * 4;

      var tmpRatio = x/currentWidth[5];

      var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
      var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

      de2000Data_2.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      de2000Data_2.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      de2000Data_2.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      de2000Data_2.data[index + 3] = 255; //a
    }
    currentPos[5]=currentPos[5]+currentWidth[5];

    if(i != bandSketch2.getBandLenght()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[5]+x) * 4;
        de2000Data_2.data[index + 0] = Math.round(0); // r
        de2000Data_2.data[index + 1] = Math.round(0); // g
        de2000Data_2.data[index + 2] = Math.round(0); // b
        de2000Data_2.data[index + 3] = 255; //a
      }

    currentPos[5]=currentPos[5]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// din99
    color1 = bandSketch2.getC1Color(i,"din99");
    color2 = bandSketch2.getC2Color(i,"din99");
    tmpRatio = bandSketch2.getDIN99Distance(i)/bandSketch2.getDistanceSumDIN99();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(bandSketch2.getDIN99Distance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[6] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[6]; x++){
      var index = (currentPos[6]+x) * 4;

      var tmpRatio = x/currentWidth[6];

      var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
      var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

      din99Data_2.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      din99Data_2.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      din99Data_2.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      din99Data_2.data[index + 3] = 255; //a
    }
    currentPos[6]=currentPos[6]+currentWidth[6];

    if(i != bandSketch2.getBandLenght()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[6]+x) * 4;
        din99Data_2.data[index + 0] = Math.round(0); // r
        din99Data_2.data[index + 1] = Math.round(0); // g
        din99Data_2.data[index + 2] = Math.round(0); // b
        din99Data_2.data[index + 3] = 255; //a
      }

    currentPos[6]=currentPos[6]+borderWidth;
    }


    new_tbody.appendChild(tr);

  }



  refCtx.putImageData(refData, 0, 0); // update ColorspaceCanvas;
  rgbCtx.putImageData(rgbData, 0, 0); // update ColorspaceCanvas;
  hsvCtx.putImageData(hsvData, 0, 0); // update ColorspaceCanvas;
  labCtx.putImageData(labData, 0, 0); // update ColorspaceCanvas;
  de94Ctx.putImageData(de94Data, 0, 0); // update ColorspaceCanvas;
  de2000Ctx.putImageData(de2000Data, 0, 0); // update ColorspaceCanvas;
  din99Ctx.putImageData(din99Data, 0, 0); // update ColorspaceCanvas;

  refCtx_2.putImageData(refData_2, 0, 0); // update ColorspaceCanvas;
  rgbCtx_2.putImageData(rgbData_2, 0, 0); // update ColorspaceCanvas;
  hsvCtx_2.putImageData(hsvData_2, 0, 0); // update ColorspaceCanvas;
  labCtx_2.putImageData(labData_2, 0, 0); // update ColorspaceCanvas;
  de94Ctx_2.putImageData(de94Data_2, 0, 0); // update ColorspaceCanvas;
  de2000Ctx_2.putImageData(de2000Data_2, 0, 0); // update ColorspaceCanvas;
  din99Ctx_2.putImageData(din99Data_2, 0, 0); // update ColorspaceCanvas;

  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
  new_tbody.id="id_compareTableBody";


}
