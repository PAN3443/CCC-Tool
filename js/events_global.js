function changeColorspace(type) {

  document.getElementById("button_RGB").style.border = "0.2vh solid white";
  document.getElementById("button_RGB").style.color = "white";
  document.getElementById("button_HSV").style.border = "0.2vh solid white";
  document.getElementById("button_HSV").style.color = "white";
  document.getElementById("button_LAB").style.border = "0.2vh solid white";
  document.getElementById("button_LAB").style.color = "white";
  document.getElementById("button_DIN99").style.border = "0.2vh solid white";
  document.getElementById("button_DIN99").style.color = "white";

  document.getElementById("exportSide_Radiobutton_ApproxRGB").style.display = "initial";
  document.getElementById("exportSide_Radiobutton_ApproxHSV").style.display = "initial";
  document.getElementById("exportSide_Radiobutton_ApproxLAB").style.display = "initial";
  document.getElementById("exportSide_Radiobutton_ApproxDIN99").style.display = "initial";
  document.getElementById("exportSide_Radiobutton_ApproxRGBLabel").style.display = "initial";
  document.getElementById("exportSide_Radiobutton_ApproxHSVLabel").style.display = "initial";
  document.getElementById("exportSide_Radiobutton_ApproxLABLabel").style.display = "initial";
  document.getElementById("exportSide_Radiobutton_ApproxDIN99Label").style.display = "initial";

  switch (type) {
    case 0:
      colorspaceModus = "rgb";
      document.getElementById("button_RGB").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_RGB").style.color = "rgb(0,191,255)";
      document.getElementById("id_color1_FirstLabel").innerHTML = "R:";
      document.getElementById("id_color1_SecondLabel").innerHTML = "G:";
      document.getElementById("id_color1_ThirdLabel").innerHTML = "B:";
      document.getElementById("id_table_Color1").innerHTML = "C1 (RGB)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (RGB)";
      document.getElementById("id_table_exportColor1").innerHTML = "C1 (RGB)";
      document.getElementById("id_table_exportColor2").innerHTML = "C2 (RGB)";
      document.getElementById("exportSide_Radiobutton_RGB").checked = "true";

      if(document.getElementById("exportSide_Radiobutton_ApproxRGB").checked){
        document.getElementById("exportSide_Radiobutton_ApproxLAB").checked=true;
        exportSide_changeApproxSpace();
      }
      document.getElementById("exportSide_Radiobutton_ApproxRGB").style.display = "none";
      document.getElementById("exportSide_Radiobutton_ApproxRGBLabel").style.display = "none";

      break;
    case 1:
      colorspaceModus = "hsv";
      document.getElementById("button_HSV").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_HSV").style.color = "rgb(0,191,255)";
      document.getElementById("id_color1_FirstLabel").innerHTML = "H:";
      document.getElementById("id_color1_SecondLabel").innerHTML = "S:";
      document.getElementById("id_color1_ThirdLabel").innerHTML = "V:";
      document.getElementById("id_table_Color1").innerHTML = "C1 (HSV)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (HSV)";
      document.getElementById("id_table_exportColor1").innerHTML = "C1 (HSV)";
      document.getElementById("id_table_exportColor2").innerHTML = "C2 (HSV)";
      document.getElementById("exportSide_Radiobutton_HSV").checked = "true";
      document.getElementById("exportSide_Radiobutton_ApproxHSV").style.display = "none";
      document.getElementById("exportSide_Radiobutton_ApproxHSVLabel").style.display = "none";

      if(document.getElementById("exportSide_Radiobutton_ApproxHSV").checked==true){
        document.getElementById("exportSide_Radiobutton_ApproxLAB").checked=true;
        exportSide_changeApproxSpace();
      }
      break;
    case 2:
      colorspaceModus = "lab";
      document.getElementById("button_LAB").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_LAB").style.color = "rgb(0,191,255)";
      document.getElementById("id_color1_FirstLabel").innerHTML = "L:";
      document.getElementById("id_color1_SecondLabel").innerHTML = "A:";
      document.getElementById("id_color1_ThirdLabel").innerHTML = "B:";
      document.getElementById("id_table_Color1").innerHTML = "C1 (LAB)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (LAB)";
      document.getElementById("id_table_exportColor1").innerHTML = "C1 (LAB)";
      document.getElementById("id_table_exportColor2").innerHTML = "C2 (LAB)";
      document.getElementById("exportSide_Radiobutton_LAB").checked = "true";
      document.getElementById("exportSide_Radiobutton_ApproxLAB").style.display = "none";
      document.getElementById("exportSide_Radiobutton_ApproxLABLabel").style.display = "none";

      if(document.getElementById("exportSide_Radiobutton_ApproxLAB").checked==true){
        document.getElementById("exportSide_Radiobutton_ApproxDIN99").checked=true;
        exportSide_changeApproxSpace();
      }
      break;
    case 3:
      colorspaceModus = "din99";
      document.getElementById("button_DIN99").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_DIN99").style.color = "rgb(0,191,255)";
      document.getElementById("id_color1_FirstLabel").innerHTML = "L99:";
      document.getElementById("id_color1_SecondLabel").innerHTML = "A99:";
      document.getElementById("id_color1_ThirdLabel").innerHTML = "B99:";
      document.getElementById("id_table_Color1").innerHTML = "C1 (DIN99)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (DIN99)";
      document.getElementById("id_table_exportColor1").innerHTML = "C1 (DIN99)";
      document.getElementById("id_table_exportColor2").innerHTML = "C2 (DIN99)";
      document.getElementById("exportSide_Radiobutton_DIN99").checked = "true";
      document.getElementById("exportSide_Radiobutton_ApproxDIN99").style.display = "none";
      document.getElementById("exportSide_Radiobutton_ApproxDIN99Label").style.display = "none";

      if(document.getElementById("exportSide_Radiobutton_ApproxDIN99").checked==true){
        document.getElementById("exportSide_Radiobutton_ApproxLAB").checked=true;
        exportSide_changeApproxSpace();
      }
      break;
    default:
      return;
  }


  if (showSideID == 0) { // MyMaps SIDE
    drawMyList();
  }

  if (showSideID == 2) { // Analyse SIDE
    orderColorSketch();
  }

  if (showSideID == 1) { // CREATE SIDE

    switch (type) {
      case 0:

        var tmpactivColorIndex = activColorIndex;

        activColorIndex = 0;
        var tmpRGB = getRGBColor();
        colorVal1_C1 = tmpRGB.getRValue() * 255;
        colorVal2_C1 = tmpRGB.getGValue() * 255;
        colorVal3_C1 = tmpRGB.getBValue() * 255;
        activColorIndex = 1;
        tmpRGB = getRGBColor();
        colorVal1_C2 = tmpRGB.getRValue() * 255;
        colorVal2_C2 = tmpRGB.getGValue() * 255;
        colorVal3_C2 = tmpRGB.getBValue() * 255;
        activColorIndex = 2;
        tmpRGB = getRGBColor();
        colorVal1_C3 = tmpRGB.getRValue() * 255;
        colorVal2_C3 = tmpRGB.getGValue() * 255;
        colorVal3_C3 = tmpRGB.getBValue() * 255;
        activColorIndex = 3;
        tmpRGB = getRGBColor();
        colorVal1_C4 = tmpRGB.getRValue() * 255;
        colorVal2_C4 = tmpRGB.getGValue() * 255;
        colorVal3_C4 = tmpRGB.getBValue() * 255;
        activColorIndex = 4;
        tmpRGB = getRGBColor();
        colorVal1_C5 = tmpRGB.getRValue() * 255;
        colorVal2_C5 = tmpRGB.getGValue() * 255;
        colorVal3_C5 = tmpRGB.getBValue() * 255;

        activColorIndex = tmpactivColorIndex;
        break;
      case 1:
        var tmpactivColorIndex = activColorIndex;

        activColorIndex = 0;
        var tmpHSV = getHSVColor();
        colorVal1_C1 = tmpHSV.getHValue();
        colorVal2_C1 = tmpHSV.getSValue();
        colorVal3_C1 = tmpHSV.getVValue();
        activColorIndex = 1;
        tmpHSV = getHSVColor();
        colorVal1_C2 = tmpHSV.getHValue();
        colorVal2_C2 = tmpHSV.getSValue();
        colorVal3_C2 = tmpHSV.getVValue();
        activColorIndex = 2;
        tmpHSV = getHSVColor();
        colorVal1_C3 = tmpHSV.getHValue();
        colorVal2_C3 = tmpHSV.getSValue();
        colorVal3_C3 = tmpHSV.getVValue();
        activColorIndex = 3;
        tmpHSV = getHSVColor();
        colorVal1_C4 = tmpHSV.getHValue();
        colorVal2_C4 = tmpHSV.getSValue();
        colorVal3_C4 = tmpHSV.getVValue();
        activColorIndex = 4;
        tmpHSV = getHSVColor();
        colorVal1_C5 = tmpHSV.getHValue();
        colorVal2_C5 = tmpHSV.getSValue();
        colorVal3_C5 = tmpHSV.getVValue();

        activColorIndex = tmpactivColorIndex;
        break;
      case 2:
        var tmpactivColorIndex = activColorIndex;
        activColorIndex = 0;
        var tmpLAB = getLABColor();
        colorVal1_C1 = tmpLAB.getLValue();
        colorVal2_C1 = tmpLAB.getAValue();
        colorVal3_C1 = tmpLAB.getBValue();
        activColorIndex = 1;
        tmpLAB = getLABColor();
        colorVal1_C2 = tmpLAB.getLValue();
        colorVal2_C2 = tmpLAB.getAValue();
        colorVal3_C2 = tmpLAB.getBValue();
        activColorIndex = 2;
        tmpLAB = getLABColor();
        colorVal1_C3 = tmpLAB.getLValue();
        colorVal2_C3 = tmpLAB.getAValue();
        colorVal3_C3 = tmpLAB.getBValue();
        activColorIndex = 3;
        tmpLAB = getLABColor();
        colorVal1_C4 = tmpLAB.getLValue();
        colorVal2_C4 = tmpLAB.getAValue();
        colorVal3_C4 = tmpLAB.getBValue();
        activColorIndex = 4;
        tmpLAB = getLABColor();
        colorVal1_C5 = tmpLAB.getLValue();
        colorVal2_C5 = tmpLAB.getAValue();
        colorVal3_C5 = tmpLAB.getBValue();
        activColorIndex = tmpactivColorIndex;

        break;
      case 3:
        var tmpactivColorIndex = activColorIndex;

        activColorIndex = 0;
        var tmpDIN99 = getDIN99Color();
        colorVal1_C1 = tmpDIN99.getL99Value();
        colorVal2_C1 = tmpDIN99.getA99Value();
        colorVal3_C1 = tmpDIN99.getB99Value();
        activColorIndex = 1;
        tmpDIN99 = getDIN99Color();
        colorVal1_C2 = tmpDIN99.getL99Value();
        colorVal2_C2 = tmpDIN99.getA99Value();
        colorVal3_C2 = tmpDIN99.getB99Value();
        activColorIndex = 2;
        tmpDIN99 = getDIN99Color();
        colorVal1_C3 = tmpDIN99.getL99Value();
        colorVal2_C3 = tmpDIN99.getA99Value();
        colorVal3_C3 = tmpDIN99.getB99Value();
        activColorIndex = 3;
        tmpDIN99 = getDIN99Color();
        colorVal1_C4 = tmpDIN99.getL99Value();
        colorVal2_C4 = tmpDIN99.getA99Value();
        colorVal3_C4 = tmpDIN99.getB99Value();
        activColorIndex = 4;
        tmpDIN99 = getDIN99Color();
        colorVal1_C5 = tmpDIN99.getL99Value();
        colorVal2_C5 = tmpDIN99.getA99Value();
        colorVal3_C5 = tmpDIN99.getB99Value();

        activColorIndex = tmpactivColorIndex;
        break;
      default:
        return;
    }

    switch (activColorIndex) {
      case 0:
        document.getElementById("id_color1_First").value = colorVal1_C1.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Second").value = colorVal2_C1.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Third").value = colorVal3_C1.toFixed(numDecimalPlaces);
        break;
      case 1:
        document.getElementById("id_color1_First").value = colorVal1_C2.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Second").value = colorVal2_C2.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Third").value = colorVal3_C2.toFixed(numDecimalPlaces);
        break;
      case 2:
        document.getElementById("id_color1_First").value = colorVal1_C3.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Second").value = colorVal2_C3.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Third").value = colorVal3_C3.toFixed(numDecimalPlaces);
        break;
      case 3:
        document.getElementById("id_color1_First").value = colorVal1_C4.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Second").value = colorVal2_C4.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Third").value = colorVal3_C4.toFixed(numDecimalPlaces);
        break;
      case 4:
        document.getElementById("id_color1_First").value = colorVal1_C5.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Second").value = colorVal2_C5.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Third").value = colorVal3_C5.toFixed(numDecimalPlaces);
        break;
      default:
        console.log("Error at the changeColorspace function");

    }
    drawPredefinedBands();
    updateCreatorBand();
    orderColorSketch();
  }
}


function showCreateSide() {


  if(myList.length<10){
    showSideID = 1;
    styleCreatorPage();
    document.getElementById("id_myListPage").style.display = "none";

    document.getElementById("id_Create_Menue").style.display = "inline";
    document.getElementById("id_Create_Menue").style.marginLeft = "20px";

    document.getElementById("id_creatorPage").style.display = "inline";

    document.getElementById("id_SideLabel").innerHTML = "Create Colormap";
    changeColorspace(0);
    orderColorSketch();
  }
  else{
    alert("There are only ten colormaps inside the My Maps list allowed. Please delete a colormap for adding a new one");
  }
}


function showMyMapsSide(){

  if(showSideID == 1){ // Create Side

    var doIt = false;
    if(colormapBandSketchC1.length!=0){
      if (confirm("Do you really want to leave the create page and delete the colormap?") == true) {
        doIt = true;
      }
    }
    else{
        doIt = true;
    }

    if(doIt){
        clearCreateSide();
        showSideID = 0;

        document.getElementById("id_myListPage").style.display = "initial";

        document.getElementById("id_Create_Menue").style.display = "none";
        document.getElementById("id_creatorPage").style.display = "none";

        document.getElementById("id_SideLabel").innerHTML = "My Maps";

        drawMyList();
    }

  }

  if(showSideID == 2){ // Analyse Side
    showSideID = 0;
    document.getElementById("id_myListPage").style.display = "initial";
    document.getElementById("id_analysisPage").style.display = "none";
    document.getElementById("id_SideLabel").innerHTML = "My Maps";
    colormapBandSketchC1 = [];
    colormapBandSketchC2 = [];
    colormapBandSketchR1 = [];
    colormapBandSketchR2 = [];
    for(var i = refElementContainer.length-1; i>=0; i--){
      refElementContainer[i].remove();
      refElementContainer.pop();
    }
  }


  if(showSideID == 3){ // Compare Side
    showSideID = 0;
    document.getElementById("id_myListPage").style.display = "initial";
    document.getElementById("id_analysisPage").style.display = "none";
    document.getElementById("id_SideLabel").innerHTML = "My Maps";
  }
}

function showCompareSide(){
    showSideID = 3;
    document.getElementById("id_myListPage").style.display = "none";
    document.getElementById("id_comparePage").style.display = "initial";
    document.getElementById("id_SideLabel").innerHTML = "Compare Colormaps";
}

function showAnalysisSide(){
    showSideID = 2;
    document.getElementById("id_myListPage").style.display = "none";
    document.getElementById("id_analysisPage").style.display = "initial";
    document.getElementById("id_SideLabel").innerHTML = "Analyse Colormap";
    initAnalysePage();
}

function readSingleFile(e) {

  var file = e.target.files[0];
  if (!file) {
    return;
  }

  var fileName = file.name;

  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;


    var fileExtension = fileName.replace(/^.*\./, '');
    var colormap;

    switch (fileExtension) {
            case 'xml': case 'XML':
                colormap = xmlColormapParserFile(contents);
                break;
            case 'json': case 'JSON':
                colormap = jsonColormapParserFile(contents);
                break;
            case 'csv': case 'CSV':
                colormap = csvColormapParserFile(contents);
                break;
            default:
                console.log("Error at readSingleFile function -> file extension is unknown!");
                return;
    }

    switch (showSideID) {
            case 0:

                break;
            case 1:
                createColormap = colormap;
                updateColormapSketch();
                break;
            default:
                console.log("Error at readSingleFile function -> showSideID is unknown!");
                return;
    }







  };


  reader.readAsText(file);


}
