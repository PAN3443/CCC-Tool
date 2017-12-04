window.onload = function () {


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// GLOBAL /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

    document.getElementById('id_ButtonToMyMapsPage').addEventListener("click", showMyMapsSide);
    document.getElementById('id_inputData').addEventListener("change", readSingleFile);

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// Create Side /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // Style Init
    styleMainPage();
    document.getElementById("id_table_workwindow").style.display = "none";

    //// set events
        // Table
        document.getElementById('id_expandTablebutton').addEventListener("click", expandTable);

        // Color Input
        document.getElementById('id_color1_First').addEventListener("change", insertColorChange);
        document.getElementById('id_color1_First').addEventListener("keyup", insertColor);
        document.getElementById('id_color1_Second').addEventListener("change", insertColorChange);
        document.getElementById('id_color1_Second').addEventListener("keyup", insertColor);
        document.getElementById('id_color1_Third').addEventListener("change", insertColorChange);
        document.getElementById('id_color1_Third').addEventListener("keyup", insertColor);

        // Color Input Colorpicker HS
        document.getElementById('id_workcanvasPicker').addEventListener("mousemove", colorpicker_MouseMove);
        document.getElementById('id_workcanvasPicker').addEventListener("click", colorpicker_MouseClick);

        // Color Input Colorpicker V
        document.getElementById('id_canvasPickerC1V').addEventListener("mousemove", c1Vpicker_MouseMove);
        document.getElementById('id_canvasPickerC1V').addEventListener("click",c1Vpicker_MouseClick);

        // Band Creator
        //document.getElementById('id_creatorBand').addEventListener("dragstart", bandOnDragStart);
        //document.getElementById('id_creatorBand').addEventListener("dragend", bandOnDragEnd);
        document.getElementById('acceptBandCreator').addEventListener("click", acceptNewBand);
        document.getElementById('cancelBandCreator').addEventListener("click", cancelNewBand);

        // Colormap Ref Min Max Change
        document.getElementById('id_linearMap_InputLeftRef').addEventListener("change", colormapRefInputChange);
        document.getElementById('id_linearMap_InputLeftRef').addEventListener("keyup", colormapRefInputChangeEnter);
        document.getElementById('id_linearMap_InputRightRef').addEventListener("change", colormapRefInputChange);
        document.getElementById('id_linearMap_InputRightRef').addEventListener("keyup", colormapRefInputChangeEnter);

        // Ref Change Key Rects
        document.getElementById('id_keyColormap').addEventListener("mouseenter", mouseEnterKeyRef);
        document.getElementById('id_keyColormap').addEventListener("mouseleave", mouseLeaveKeyRef);
        document.getElementById('id_keyColormap').addEventListener("mousemove", mouseMoveKeyRef);
        document.getElementById('id_keyColormap').addEventListener("mousedown", mouseDownKeyRef);
        document.getElementById('id_keyColormap').addEventListener("mouseup", mouseUpKeyRef);

        // Band Editor
        document.getElementById('cancelBandEdit').addEventListener("click", cancelBandEditor);
        document.getElementById('acceptBandEdit').addEventListener("click", acceptBandEditor);
        //document.getElementById('helpBandEdit').addEventListener("mouseenter", helpBandEditor);
        document.getElementById('deleteBandEdit').addEventListener("click", deleteBandEditor);
        document.getElementById('bandEdit_LeftNeiColor').addEventListener("click", leftNeiColorToR1);
        document.getElementById('bandEdit_RightNeiColor').addEventListener("click", rightNeiColorToR2);
        document.getElementById('bandEdit_LeftColorToRight').addEventListener("click", editC2IsC1);
        document.getElementById('bandEdit_RightColorToLeft').addEventListener("click", editC1IsC2);
        document.getElementById('id_bandEditWorkcanvasPicker').addEventListener("mousemove", colorpickerBandEditor_MouseMove);
        document.getElementById('id_bandEditWorkcanvasPicker').addEventListener("click", colorpickerBandEditor_MouseClick);
        document.getElementById('id_BandEditcanvasPickerC1V').addEventListener("mousemove", c1VpickerBandEditor_MouseMove);
        document.getElementById('id_BandEditcanvasPickerC1V').addEventListener("click",c1VpickerBandEditor_MouseClick);
        document.getElementById('bandEdit_InputLeftRef').addEventListener("keyup", checkR1Input);
        document.getElementById('bandEdit_InputRightRef').addEventListener("keyup", checkR2Input);
        document.getElementById('bandEdit_InputLeftRef').addEventListener("change", checkR1Input_Change);
        document.getElementById('bandEdit_InputRightRef').addEventListener("change", checkR2Input_Change);


        ////
        // Creat Colormap Menue
          // Colormap Name Change
          document.getElementById('id_InputMapName').addEventListener("change", colormapNameChange);
          document.getElementById('id_InputMapName').addEventListener("keyup", colormapNameChangeEnter);

          document.getElementById('id_buttonDeleteCreateColormap').addEventListener("click", deleteCreatedColormap);
          document.getElementById('id_buttonBackwardCreateColormap').addEventListener("click", backwardColormapProcess);
          document.getElementById('id_buttonForwardCreateColormap').addEventListener("click", forwardColormapProcess);
          document.getElementById('id_buttonSaveCreateColormap').addEventListener("click", saveColormapToList);
          document.getElementById('id_buttonExportCreateColormap').addEventListener("click", createSideExport);
          document.getElementById('id_buttonLoadCreateColormap').addEventListener("click", loadColormapCreateSide);
          document.getElementById('exportSide_MergingCheckbox').addEventListener("change", exportSide_ChangeMerging);



          // init //


          drawHSBackground("id_canvasPickerHS");
          drawHSBackground("id_bandEditCanvasPickerHS");
          drawColorCircles();
          updateCreatorBand();
          styleBandCreator();

          // for reload with F5
          document.getElementById('id_color1_First').value = 255;
          document.getElementById('id_color1_Second').value = 255;
          document.getElementById('id_color1_Third').value = 255;

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////// My List Side /////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        document.getElementById('id_MyListCreateColormapButton').addEventListener("click", showCreateSide);



        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////// Export Side /////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        document.getElementById('id_exportCancelButton').addEventListener("click", cancelExport);
        document.getElementById('exportSide_IntervalApproximationCheckbox').addEventListener("change", showIntervalOptions);

        document.getElementById('exportSide_IntervallInput').addEventListener("change", exportSide_changeIntervalNumChange);
        document.getElementById('exportSide_IntervallInput').addEventListener("keyup", exportSide_changeIntervalNumEnter);

        document.getElementById('exportSide_Radiobutton_ApproxRGB').addEventListener("change", exportSide_changeApproxSpace);
        document.getElementById('exportSide_Radiobutton_ApproxHSV').addEventListener("change", exportSide_changeApproxSpace);
        document.getElementById('exportSide_Radiobutton_ApproxLAB').addEventListener("change", exportSide_changeApproxSpace);
        document.getElementById('exportSide_Radiobutton_ApproxDIN99').addEventListener("change", exportSide_changeApproxSpace);

        document.getElementById('exportSide_Radiobutton_XML').addEventListener("change", changeOutputformat);
        document.getElementById('exportSide_Radiobutton_TEXT').addEventListener("change", changeOutputformat);
        document.getElementById('exportSide_Radiobutton_JSON').addEventListener("change", changeOutputformat);

        document.getElementById('id_exportExportButton').addEventListener("click", exportSide_downloadFile);






}

window.onresize = function(event) {
    drawColorCircles();
    styleMainPage();
};

window.onscroll = function () {
    drawColorCircles();
};

function styleMainPage(){
    //var workRec = document.getElementById("id_mainpage").getBoundingClientRect();
    //document.getElementById("id_expandTablebutton").style.height = workRec.height+"px";

    // Main Page colorpicker
    var canvasColorspace = document.getElementById("id_workcanvasPicker");
    var rectPickerCanvas = document.getElementById("id_canvasPickerHS").getBoundingClientRect();
    //canvasColorspace.style.display = "initial";
    canvasColorspace.style.position = "absolute";
    canvasColorspace.style.width = rectPickerCanvas.width+"px";
    canvasColorspace.style.height = rectPickerCanvas.height+"px";
    canvasColorspace.style.top = rectPickerCanvas.top+"px";
    canvasColorspace.style.left = rectPickerCanvas.left+"px";

    // Band Edit colorpicker
    canvasColorspace = document.getElementById("id_bandEditWorkcanvasPicker");
    rectPickerCanvas = document.getElementById("id_bandEditCanvasPickerHS").getBoundingClientRect();
    //canvasColorspace.style.display = "initial";
    canvasColorspace.style.position = "absolute";
    canvasColorspace.style.width = rectPickerCanvas.width+"px";
    canvasColorspace.style.height = rectPickerCanvas.height+"px";
    canvasColorspace.style.top = rectPickerCanvas.top+"px";
    canvasColorspace.style.left = rectPickerCanvas.left+"px";

    document.getElementById("bandEditWindow").style.height = document.height+"px"; // workRec.height+"px";

    orderColorSketch();

}

function calcColormap(){
    var saveNext = true;
    createColormap = new xclassColorMap();

            for(var i=0; i<colormapBandSketchC1.length; i++){

                if(saveNext){

                    var tmpColor = new classColor_RGB(colormapBandSketchC1[i].getRValue(),colormapBandSketchC1[i].getGValue(),colormapBandSketchC1[i].getBValue());
                    createColormap.pushPositionPoints(colormapBandSketchR1[i]);
                    createColormap.pushRGBColor(tmpColor);
                }

                var tmpColor2 = new classColor_RGB(colormapBandSketchC2[i].getRValue(),colormapBandSketchC2[i].getGValue(),colormapBandSketchC2[i].getBValue());
                    //tmpColor2.setColorFromHEX(colormapBandSketchC2[i].getHexString());
                createColormap.pushPositionPoints(colormapBandSketchR2[i]);
                createColormap.pushRGBColor(tmpColor2);

                saveNext=true;



                if(i+1<colormapBandSketchC1.length &&
                (colormapBandSketchC2[i].getRValue()!=colormapBandSketchC1[i].getRValue() ||  // i = scaled
                colormapBandSketchC2[i].getGValue()!=colormapBandSketchC1[i].getGValue() ||
                colormapBandSketchC2[i].getBValue()!=colormapBandSketchC1[i].getBValue())
                &&
                (colormapBandSketchC2[i+1].getRValue()!=colormapBandSketchC1[i+1].getRValue() || // i+1 = scaled
                colormapBandSketchC2[i+1].getGValue()!=colormapBandSketchC1[i+1].getGValue() ||
                colormapBandSketchC2[i+1].getBValue()!=colormapBandSketchC1[i+1].getBValue())
                &&
                (colormapBandSketchC2[i].getRValue()==colormapBandSketchC1[i+1].getRValue() && // -> dual key
                colormapBandSketchC2[i].getGValue()==colormapBandSketchC1[i+1].getGValue() &&
                colormapBandSketchC2[i].getBValue()==colormapBandSketchC1[i+1].getBValue()))
                saveNext=false; // case dual key

            }


    createColormap.createKeys();
    createColormap.calcBands();

    createColormap.setColormapName(document.getElementById("id_InputMapName").value);
}


function updateColormapSketch(){

  colormapBandSketchC1 = [];
  colormapBandSketchC2 = [];
  colormapBandSketchR1 = [];
  colormapBandSketchR2 = [];

  for(var i=0; i<createColormap.getNumberOfBands(); i++){

    colormapBandSketchC1.push(createColormap.getBand(i).getLeftRGBColor());
    colormapBandSketchC2.push(createColormap.getBand(i).getRightRGBColor());
    colormapBandSketchR1.push(createColormap.getBand(i).getLeftRef());
    colormapBandSketchR2.push(createColormap.getBand(i).getRightRef());

  }

  orderColorSketch();
}

function fillTable(){

    var old_tbody = document.getElementById("id_tableBody");
    var new_tbody = document.createElement('tbody');

    //fill table

    for (i = 0; i < colormapBandSketchC1.length; i++) {
        var tr = document.createElement('tr');

        var td = document.createElement('td')
        td.className = "class_tableInput";
        td.appendChild(document.createTextNode(i+1));
        tr.appendChild(td);

        td = document.createElement('td')
        td.className = "class_tableInput";
        td.appendChild(document.createTextNode(colormapBandSketchR1[i]));
        tr.appendChild(td);

        td = document.createElement('td')
        td.className = "class_tableInput";
        td.appendChild(document.createTextNode(colormapBandSketchR2[i]));
        tr.appendChild(td);

        td = document.createElement('td')
        td.className = "class_tableInput";
        if(colormapBandSketchC2[i].getRValue()!=colormapBandSketchC1[i].getRValue() ||  // i = scaled
           colormapBandSketchC2[i].getGValue()!=colormapBandSketchC1[i].getGValue() ||
           colormapBandSketchC2[i].getBValue()!=colormapBandSketchC1[i].getBValue())
            td.appendChild(document.createTextNode("scaled"));
        else
            td.appendChild(document.createTextNode("constant"));
        tr.appendChild(td);

        td = document.createElement('td')
        td.className = "class_tableInput";
        var td2 = document.createElement('td')
        td2.className = "class_tableInput";


        switch(colorspaceModus){
                case "rgb":;
                    td.appendChild(document.createTextNode(colormapBandSketchC1[i].getRGBString()));
                    td2.appendChild(document.createTextNode(colormapBandSketchC2[i].getRGBString()));
                break;
                case "hsv":
                    var tmpC1HSV = colormapBandSketchC1[i].calcHSVColor();
                    var tmpC2HSV = colormapBandSketchC2[i].calcHSVColor();
                    var string = "hsv("+tmpC1HSV.getHValue().toFixed(numDecimalPlaces)+","+tmpC1HSV.getSValue().toFixed(numDecimalPlaces)+","+tmpC1HSV.getVValue().toFixed(numDecimalPlaces)+")"
                    td.appendChild(document.createTextNode(string));
                    string = "hsv("+tmpC2HSV.getHValue().toFixed(numDecimalPlaces)+","+tmpC2HSV.getSValue().toFixed(numDecimalPlaces)+","+tmpC2HSV.getVValue().toFixed(numDecimalPlaces)+")"
                    td2.appendChild(document.createTextNode(string));
                break;
                case "lab":
                    var tmpC1LAB = colormapBandSketchC1[i].calcCIELabColor();
                    var tmpC2LAB = colormapBandSketchC2[i].calcCIELabColor();
                    var string = "lab("+tmpC1LAB.getLValue().toFixed(numDecimalPlaces)+","+tmpC1LAB.getAValue().toFixed(numDecimalPlaces)+","+tmpC1LAB.getBValue().toFixed(numDecimalPlaces)+")"
                    td.appendChild(document.createTextNode(string));
                    string = "lab("+tmpC2LAB.getLValue().toFixed(numDecimalPlaces)+","+tmpC2LAB.getAValue().toFixed(numDecimalPlaces)+","+tmpC2LAB.getBValue().toFixed(numDecimalPlaces)+")"
                    td2.appendChild(document.createTextNode(string));
                break;
                case "din99":
                    var tmpC1DIN99 = colormapBandSketchC1[i].calcDIN99Color(kE,kCH);
                    var tmpC2DIN99 = colormapBandSketchC2[i].calcDIN99Color(kE,kCH);
                    var string = "din99("+tmpC1DIN99.getL99Value().toFixed(numDecimalPlaces)+","+tmpC1DIN99.getA99Value().toFixed(numDecimalPlaces)+","+tmpC1DIN99.getB99Value().toFixed(numDecimalPlaces)+")"
                    td.appendChild(document.createTextNode(string));
                    string = "din99("+tmpC2DIN99.getL99Value().toFixed(numDecimalPlaces)+","+tmpC2DIN99.getA99Value().toFixed(numDecimalPlaces)+","+tmpC2DIN99.getB99Value().toFixed(numDecimalPlaces)+")"
                    td2.appendChild(document.createTextNode(string));
                break;
                default:
                console.log("Error at the changeColorspace function");
        }


        tr.appendChild(td);
        tr.appendChild(td2);

        new_tbody.appendChild(tr);

    }

    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
    new_tbody.id="id_tableBody";
}
