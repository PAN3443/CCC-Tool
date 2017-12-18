

function initAnalysePage(){

    bandSketch.colormap2Sketch(analysisColormap);
    orderColorSketch(colorspaceModus);
    changeCourseSpace();
    drawAnalyseMapPreviews();
    drawAnalyseDifferenceMaps();
}

function changeCourseSpace(){

  document.getElementById("id_containerHueCourse").style.display = "none";
  document.getElementById("id_anaylseValue").style.display = "none";
  document.getElementById("id_hueValueOptions").style.display = "none";
  document.getElementById("id_RGBCourseDiv").style.display = "none";

  switch(colorspaceModus){
      case "rgb":;
        document.getElementById("id_RGBCourseDiv").style.display = "initial";
        //rgbInit("id_canvasRG","id_canvasRB","id_canvasBG", true);
        drawcolormap_RGBSpace(analysisColormap, "id_canvasRG","id_canvasRB","id_canvasBG", true);
      break;
      case "hsv":
        document.getElementById("id_containerHueCourse").style.display = "initial";
        document.getElementById("id_anaylseValue").style.display = "initial";
        document.getElementById("id_hueValueOptions").style.display = "initial";
        hueInit("id_anaylseCourseHueBackground");
        document.getElementById("id_setValueRange").value = 100;
        //document.getElementById("id_hueValueRange").style.display = "inline-block";
        hueInit("id_anaylseCourseHueBackground");
        drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
      break;
      case "lab": case "din99":
        document.getElementById("id_containerHueCourse").style.display = "initial";
        document.getElementById("id_anaylseValue").style.display = "initial";
        document.getElementById("id_hueValueOptions").style.display = "initial";
        hueInit("id_anaylseCourseHueBackground");
        document.getElementById("id_setValueRange").value = 65;
        hueInit("id_anaylseCourseHueBackground");
        drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
        //document.getElementById("id_hueValueRange").style.display = "inline-block";
      break;
      default:
      console.log("Error at the changeColorspace function");
      return;
  }//*/


}

function changeValueRange(){

      if(parseFloat(document.getElementById('id_setValueRange'))<0){
        document.getElementById('id_setValueRange').value = 0;
      }

      if(parseFloat(document.getElementById('id_setValueRange'))>100){
        document.getElementById('id_setValueRange').value = 100;
      }

      hueInit("id_anaylseCourseHueBackground");
      drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false);
}

function analyseColormapRGBPossible(){
  if(document.getElementById("id_checkboxRGB").checked==true){
    orderColorSketch('rgb');
    bandSketch.colormap2Sketch(analysisColormap);
    drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false);
  }
}

function drawAnalyseMapPreviews(){

  var oldColorspace = colorspaceModus;

  colorspaceModus="rgb";
      drawCanvasColormap("id_anaylseRGB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, analysisColormap);
  colorspaceModus="hsv";
      drawCanvasColormap("id_anaylseHSV_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, analysisColormap);
  colorspaceModus="lab";
      drawCanvasColormap("id_anaylseLAB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, analysisColormap);
  colorspaceModus="din99";
      drawCanvasColormap("id_anaylseDIN99_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, analysisColormap);
  colorspaceModus = oldColorspace;
}


function drawAnalyseDifferenceMaps(){

  var old_tbody = document.getElementById("id_analyseTableBody");
  var new_tbody = document.createElement('tbody');

  var resolutionX = 1024;

  var canvasREF = document.getElementById("id_anaylseRatioRef");
  var canvasRGB = document.getElementById("id_anaylseRatioRGB");
  var canvasHSV = document.getElementById("id_anaylseRatioHSV");
  var canvasLAB = document.getElementById("id_anaylseRatioLAB");
  var canvasCIEDE2000 = document.getElementById("id_anaylseRatioDe2000");
  var canvasDE94 = document.getElementById("id_anaylseRatioDE94");
  var canvasDIN99 = document.getElementById("id_anaylseRatioDIN99");

  canvasREF.width = resolutionX;
  canvasREF.height = 1;
  canvasRGB.width = resolutionX;
  canvasRGB.height = 1;
  canvasHSV.width = resolutionX;
  canvasHSV.height = 1;
  canvasLAB.width = resolutionX;
  canvasLAB.height = 1;
  canvasCIEDE2000.width = resolutionX;
  canvasCIEDE2000.height = 1;
  canvasDE94.width = resolutionX;
  canvasDE94.height = 1;
  canvasDIN99.width = resolutionX;
  canvasDIN99.height = 1;

  var refCtx = canvasREF.getContext("2d");
  var refData = refCtx.getImageData(0, 0, resolutionX, 1);
  var rgbCtx = canvasRGB.getContext("2d");
  var rgbData = rgbCtx.getImageData(0, 0, resolutionX, 1);
  var hsvCtx = canvasHSV.getContext("2d");
  var hsvData = hsvCtx.getImageData(0, 0, resolutionX, 1);
  var labCtx = canvasLAB.getContext("2d");
  var labData = labCtx.getImageData(0, 0, resolutionX, 1);
  var de94Ctx = canvasDE94.getContext("2d");
  var de94Data = de94Ctx.getImageData(0, 0, resolutionX, 1);
  var de2000Ctx = canvasCIEDE2000.getContext("2d");
  var de2000Data = de2000Ctx.getImageData(0, 0, resolutionX, 1);
  var din99Ctx = canvasDIN99.getContext("2d");
  var din99Data = din99Ctx.getImageData(0, 0, resolutionX, 1);

  analysisColormap.calcNewDistances();

  var currentPos = [0,0,0,0,0,0,0];
  var cuurentWidth = [0,0,0,0,0,0,0];
  var colorRef = new classColor_RGB(0.5,0.5,0.5);

  var borderWidth = 2; //px
  var restWidth = resolutionX-(analysisColormap.getNumColors()-2)*borderWidth;

  for (var i = 0; i < analysisColormap.getNumColors()-1; i++) {

    var tr = document.createElement('tr');

    var td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(i+1));
    tr.appendChild(td);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// REF

    var tmpRatio = analysisColormap.getRefDistance(i)/analysisColormap.getDistanceSumRef();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(analysisColormap.getRefDistance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    cuurentWidth[0] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<cuurentWidth[0]; x++){
      var index = (currentPos[0]+x) * 4;
      refData.data[index + 0] = Math.round(colorRef.getRValue() * 255); // r
      refData.data[index + 1] = Math.round(colorRef.getGValue() * 255); // g
      refData.data[index + 2] = Math.round(colorRef.getBValue() * 255); // b
      refData.data[index + 3] = 255; //a
    }
    currentPos[0]=currentPos[0]+cuurentWidth[0];

    if(i != analysisColormap.getNumColors()-2){
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

    var color1 = analysisColormap.getRGBColor(i);
    var color2 = analysisColormap.getRGBColor(i+1);

    tmpRatio = analysisColormap.getRGBDistance(i)/analysisColormap.getDistanceSumRGB();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(analysisColormap.getRGBDistance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    cuurentWidth[1] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<cuurentWidth[1]; x++){
      var index = (currentPos[1]+x) * 4;

      var tmpRatio = x/cuurentWidth[1];

      var rValue = color1.getRValue() + (color2.getRValue() - color1.getRValue()) * tmpRatio;
      var gValue = color1.getGValue() + (color2.getGValue() - color1.getGValue()) * tmpRatio;
      var bValue = color1.getBValue() + (color2.getBValue() - color1.getBValue()) * tmpRatio;

      rgbData.data[index + 0] = Math.round(rValue * 255); // r
      rgbData.data[index + 1] = Math.round(gValue * 255); // g
      rgbData.data[index + 2] = Math.round(bValue * 255); // b
      rgbData.data[index + 3] = 255; //a
    }
    currentPos[1]=currentPos[1]+cuurentWidth[1];

    if(i != analysisColormap.getNumColors()-2){
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

    var color1 = analysisColormap.getHSVColor(i);
    var color2 = analysisColormap.getHSVColor(i+1);

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

    tmpRatio = analysisColormap.getHSVDistance(i)/analysisColormap.getDistanceSumHSV();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(analysisColormap.getHSVDistance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    cuurentWidth[2] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<cuurentWidth[2]; x++){
      var index = (currentPos[2]+x) * 4;

      var tmpRatio = x/cuurentWidth[2];

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
    currentPos[2]=currentPos[2]+cuurentWidth[2];

    if(i != analysisColormap.getNumColors()-2){
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
    var color1 = analysisColormap.getLabColor(i);
    var color2 = analysisColormap.getLabColor(i+1);

    tmpRatio = analysisColormap.getLABDistance(i)/analysisColormap.getDistanceSumLAB();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(analysisColormap.getLABDistance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    cuurentWidth[3] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<cuurentWidth[3]; x++){
      var index = (currentPos[3]+x) * 4;

      var tmpRatio = x/cuurentWidth[3];

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
    currentPos[3]=currentPos[3]+cuurentWidth[3];

    if(i != analysisColormap.getNumColors()-2){
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
    tmpRatio = analysisColormap.getDE94Distance(i)/analysisColormap.getDistanceSumDE94();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(analysisColormap.getDE94Distance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    cuurentWidth[4] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<cuurentWidth[4]; x++){
      var index = (currentPos[4]+x) * 4;

      var tmpRatio = x/cuurentWidth[4];

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
    currentPos[4]=currentPos[4]+cuurentWidth[4];

    if(i != analysisColormap.getNumColors()-2){
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
    tmpRatio = analysisColormap.getCIEDE2000Distance(i)/analysisColormap.getDistanceSumCIEDE2000();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(analysisColormap.getCIEDE2000Distance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    cuurentWidth[5] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<cuurentWidth[5]; x++){
      var index = (currentPos[5]+x) * 4;

      var tmpRatio = x/cuurentWidth[5];

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
    currentPos[5]=currentPos[5]+cuurentWidth[5];

    if(i != analysisColormap.getNumColors()-2){
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
    tmpRatio = analysisColormap.getDIN99Distance(i)/analysisColormap.getDistanceSumDIN99();

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(analysisColormap.getDIN99Distance(i).toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    cuurentWidth[6] = Math.round(restWidth*tmpRatio);

    for(var x=0; x<cuurentWidth[6]; x++){
      var index = (currentPos[6]+x) * 4;

      var tmpRatio = x/cuurentWidth[6];

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
    currentPos[6]=currentPos[6]+cuurentWidth[6];

    if(i != analysisColormap.getNumColors()-2){
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

  refCtx.putImageData(refData, 0, 0); // update ColorspaceCanvas;
  rgbCtx.putImageData(rgbData, 0, 0); // update ColorspaceCanvas;
  hsvCtx.putImageData(hsvData, 0, 0); // update ColorspaceCanvas;
  labCtx.putImageData(labData, 0, 0); // update ColorspaceCanvas;
  de94Ctx.putImageData(de94Data, 0, 0); // update ColorspaceCanvas;
  de2000Ctx.putImageData(de2000Data, 0, 0); // update ColorspaceCanvas;
  din99Ctx.putImageData(din99Data, 0, 0); // update ColorspaceCanvas;

  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
  new_tbody.id="id_analyseTableBody";


}
