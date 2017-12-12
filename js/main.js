window.onload = function () {


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// GLOBAL /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

    document.getElementById('id_ButtonToMyMapsPage').addEventListener("click", showMyMapsSide);
    document.getElementById('id_inputData').addEventListener("change", readSingleFile);

    createColormap= new xclassColorMap();
    exportColormap= new xclassColorMap();
    analysisColormap= new xclassColorMap();
    compareColormap1= new xclassColorMap();
    compareColormap2= new xclassColorMap();

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// Create Side /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // Style Init
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
        document.getElementById('id_MyListAnalysisButton').addEventListener("click", selectAnalysis);
        document.getElementById('id_MyListCompareButton').addEventListener("click", selectCompare);

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////// Analyse Side /////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        document.getElementById('id_workcanvasAnalyseHue').addEventListener("mouseleave", mouseLeaveColorspace);
        document.getElementById('id_workcanvasAnalyseHue').addEventListener("mousemove", mouseMoveColorspace);
        document.getElementById('id_workcanvasAnalyseHue').addEventListener("mousedown", mouseDownColorspace);
        document.getElementById('id_workcanvasAnalyseHue').addEventListener("mouseup", mouseUpColorspace);

        document.getElementById('id_anaylseValue').addEventListener("mouseleave", mouseLeaveValuePlot);
        document.getElementById('id_anaylseValue').addEventListener("mousemove", mouseMoveValuePlot);
        document.getElementById('id_anaylseValue').addEventListener("mousedown", mouseDownValuePlot);
        document.getElementById('id_anaylseValue').addEventListener("mouseup", mouseUpValuePlot);

        document.getElementById('analyseSideShowRGB').addEventListener("change", changeCourseSpace);
        document.getElementById('analyseSideShowHSV').addEventListener("change", changeCourseSpace);
        document.getElementById('analyseSideShowLAB').addEventListener("change", changeCourseSpace);

        document.getElementById('id_setValueRange').addEventListener("change", changeValueRange);
        //document.getElementById("id_setValueRange").addEventListener("input", function(){ changeValueRange(this.value)} );

        styleAnalysisPage();

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
    styleCreatorPage();
    styleAnalysisPage();
};

window.onscroll = function () {
    drawColorCircles();
};

function styleCreatorPage(){
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

function styleAnalysisPage(){
  var canvasColorspace = document.getElementById("id_workcanvasAnalyseHue");
  var backgroundCanvas = document.getElementById("id_anaylseCourseHueBackground").getBoundingClientRect();
  //canvasColorspace.style.display = "initial";
  canvasColorspace.style.position = "absolute";
  canvasColorspace.style.width = backgroundCanvas.width+"px";
  canvasColorspace.style.height = backgroundCanvas.height+"px";
  canvasColorspace.style.top = backgroundCanvas.top+"px";
  canvasColorspace.style.left = backgroundCanvas.left+"px";
}

///////////////////////////////////////////////
function sketchInfo2Colormap(){
    var saveNext = true;
    var tmpColormap = new xclassColorMap();

            for(var i=0; i<colormapBandSketchC1.length; i++){

                if(saveNext){

                    var tmpColor = new classColor_RGB(colormapBandSketchC1[i].getRValue(),colormapBandSketchC1[i].getGValue(),colormapBandSketchC1[i].getBValue());
                    tmpColormap.pushPositionPoints(colormapBandSketchR1[i]);
                    tmpColormap.pushRGBColor(tmpColor);
                }

                var tmpColor2 = new classColor_RGB(colormapBandSketchC2[i].getRValue(),colormapBandSketchC2[i].getGValue(),colormapBandSketchC2[i].getBValue());
                    //tmpColor2.setColorFromHEX(colormapBandSketchC2[i].getHexString());
                tmpColormap.pushPositionPoints(colormapBandSketchR2[i]);
                tmpColormap.pushRGBColor(tmpColor2);

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


    tmpColormap.createKeys();
    tmpColormap.calcBands();

    //tmpColormap.setColormapName(document.getElementById("id_InputMapName").value);

    return tmpColormap;
}

function colormap2Sketch(tmpColormap){

  colormapBandSketchC1 = [];
  colormapBandSketchC2 = [];
  colormapBandSketchR1 = [];
  colormapBandSketchR2 = [];

  for(var i=0; i<tmpColormap.getNumberOfBands(); i++){

    colormapBandSketchC1.push(tmpColormap.getBand(i).getLeftRGBColor());
    colormapBandSketchC2.push(tmpColormap.getBand(i).getRightRGBColor());
    colormapBandSketchR1.push(tmpColormap.getBand(i).getLeftRef());
    colormapBandSketchR2.push(tmpColormap.getBand(i).getRightRef());

  }

  orderColorSketch();
}

///////////////////////////////////////////////

function orderColorSketch(){

    document.getElementById("id_colormapSketch").innerHTML = null;

    for(var i = dropPositionElements.length-1; i>=0; i--){
      dropPositionElements[i].remove();
      dropPositionElements.pop();
    }

    for(var i = droppedBandElements.length-1; i>=0; i--){
      droppedBandElements[i].remove();
      droppedBandElements.pop();
    }

    for(var i = refLineSketchContainer.length-1; i>=0; i--){
      refLineSketchContainer[i].remove();
      refLineSketchContainer.pop();
    }


    var sketchObject;
    var sketchRefObj;

    if(showSideID == 0){
      return;
    }

    if(showSideID == 1){
      sketchObject = document.getElementById("id_colormapSketch");
      document.getElementById("id_LinearMap_Table_Div").style.display = "none";
      sketchRefObj = document.getElementById("id_colormapSketch_Ref");
    }

    if(showSideID == 2){
      sketchObject = document.getElementById("id_analyseColormapSketch");
      sketchRefObj = document.getElementById("id_analyseColormapSketch_Ref");
      analysisColormap = sketchInfo2Colormap();
      drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
    }

    if(colormapBandSketchC1.length!=0){

      if(showSideID == 1){
        // show and draw the colormap
        document.getElementById("id_LinearMap_Table_Div").style.display = "initial";
        createColormap = sketchInfo2Colormap();
        drawCanvasColormap("id_linearColormap",linearMap_resolution_X, linearMap_resolution_Y, createColormap);
        drawKeys("id_keyColormap",key_resolution_X, key_resolution_Y, createColormap, "id_keyColormapLinesBottom",false, true)
        fillTable();
      }

      //////////////////////////////////////////////////////////////////////////


        sketchObject.style.border = "none";

        var tmpRect = sketchObject.getBoundingClientRect();

        var tmpLength = tmpRect.width/colormapBandSketchC1.length-1;//100/(colormapBandSketchC1.length-1);

        for(var i=0; i<colormapBandSketchC1.length; i++){

            // create drop place
            var tDiv = document.createElement('div');
            tDiv.id = 'dragPos'+i;
            tDiv.style.border = "3px solid red";
            tDiv.style.height = 100 +'%';
            tDiv.style.width = 100+'%';
            tDiv.style.display = "none";
            //tDiv.style.visibility = "hidden";
            tDiv.style.lineHeight = "8vh";
            tDiv.style.fontSize = "2vh";
            tDiv.style.textAlign = "center";
            tDiv.style.verticalAlign = "middle";
            tDiv.innerHTML = "Here";

            tDiv.addEventListener("dragenter", bandOnEnter);
            tDiv.addEventListener("dragleave", bandOnLeave);
            //tDiv.addEventListener("drop dragdrop", createSide_BandOnDrop);

            tDiv.ondrop = function(event){
                event.preventDefault();
                bandOnDrop();
            }; // allow Drop
            tDiv.ondragover = function(event){event.preventDefault();}; // allow Drop

            sketchObject.appendChild(tDiv);
            dropPositionElements.push(tDiv);

            // create band
            var tCan = document.createElement('canvas');
            tCan.id = 'band'+i;

            tCan.style.border = "1px solid black";
            tCan.style.margin = "0px";
            tCan.setAttribute('draggable', true);

            sketchObject.appendChild(tCan);
            droppedBandElements.push(tCan);

            tCan.style.height = 100 +'%';
            tCan.style.maxWidth = tmpLength + "px"; //100 +'%';
            tCan.style.width = tmpLength + "px"; //100 +'%';
            tCan.style.cursor = "pointer";

            drawCanvasBand(tCan, colormapBandSketchC1[i], colormapBandSketchC2[i],tCan.width,tCan.height );

            //tCan.addEventListener("dragstart", createSide_BandOnDragStart);
            //tCan.addEventListener("dragend", createSide_BandOnDragEnd);
            tCan.addEventListener("click", bandOnClick);

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var refLineDiv = document.createElement('div');
            refLineDiv.style.height = 100 +'%';
            refLineDiv.style.width = 100+'%';
            refLineDiv.style.borderLeft = "1px solid black";

            //tDiv.style.visibility = "hidden";

            sketchRefObj.appendChild(refLineDiv);
            refLineSketchContainer.push(refLineDiv);


            /////////////////// draw ref /////////
            var tmpText = ''+colormapBandSketchR1[i].toFixed(numDecimalPlaces);

            var box = sketchRefObj.getBoundingClientRect();

            var body = document.body;
            var docEl = document.documentElement;

            var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
            var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

            var clientTop = docEl.clientTop || body.clientTop || 0;
            var clientLeft = docEl.clientLeft || body.clientLeft || 0;

            var top  = box.top +  scrollTop - clientTop;
            var left = box.left + scrollLeft - clientLeft;

            var p = document.createElement('p');
            var xposHTML = ((i)/colormapBandSketchC1.length)*box.width+left;
            var yposHTML = box.height+top;

            document.body.appendChild(p);
            p.innerHTML = tmpText;
            p.width = "min-content";
            p.style.background = "rgb(255,255,255)";
            p.style.paddingLeft = 5+"px";
            p.style.paddingRight = 5+"px";
            p.style.border = "1px solid rgb(0,0,0)";
            p.style.margin = "0px";

            p.style.position = "absolute";
            p.style.top = Math.round(yposHTML)+"px";
            p.style.left = Math.round(xposHTML)+"px";
            refLineSketchContainer.push(p);
            xposHTML = xposHTML-(p.getBoundingClientRect().width/2);
            p.style.left = Math.round(xposHTML)+"px";

            /////////////////// special case: last element /////////
            if(i==colormapBandSketchC1.length-1){
              refLineDiv.style.borderRight = "1px solid black";

              var tmpText = ''+colormapBandSketchR2[i].toFixed(numDecimalPlaces);

              var p2 = document.createElement('p');
              xposHTML = box.width+left;

              document.body.appendChild(p2);
              p2.innerHTML = tmpText;
              p2.width = "min-content";
              p2.style.background = "rgb(255,255,255)";
              p2.style.paddingLeft = 5+"px";
              p2.style.paddingRight = 5+"px";
              p2.style.border = "2px solid rgb(0,0,0)";
              p2.style.margin = "0px";

              p2.style.position = "absolute";
              p2.style.top = Math.round(yposHTML)+"px";
              p2.style.left = Math.round(xposHTML)+"px";
              refLineSketchContainer.push(p2);
              xposHTML = xposHTML-(p.getBoundingClientRect().width/2);
              p2.style.left = Math.round(xposHTML)+"px";
            }
        }



        var t2Div = document.createElement('div');
            t2Div.id = 'dragPos'+colormapBandSketchC1.length;
            t2Div.style.border = "3px solid red";
            t2Div.style.height = 99 +'%';
            t2Div.style.width = 100+'%';
            t2Div.style.display = "none";
            t2Div.style.lineHeight = "8vh";
            t2Div.style.fontSize = "2vh";
            t2Div.style.textAlign = "center";
            t2Div.style.verticalAlign = "middle";
            t2Div.innerHTML = "Here";

            t2Div.addEventListener("dragenter", bandOnEnter);
            t2Div.addEventListener("dragleave", bandOnLeave);

            t2Div.ondrop = function(event){
                event.preventDefault();
                bandOnDrop();
            }; // allow Drop
            t2Div.ondragover = function(event){event.preventDefault();}; // allow Drop

            sketchObject.appendChild(t2Div);
            dropPositionElements.push(t2Div);


    }
    else{

        var t2Div = document.createElement('div');
        t2Div.id = 'dragPos'+colormapBandSketchC1.length;
        t2Div.style.border = "2px dashed black";
        t2Div.style.height = 100 +'%';
        t2Div.style.width = 100+'%';
        t2Div.style.lineHeight = "8vh";
        t2Div.style.fontSize = "4vh";
        t2Div.style.textAlign = "center";
        t2Div.style.verticalAlign = "middle";
        t2Div.innerHTML = "Drop Here";

        t2Div.addEventListener("dragenter", bandOnEnter);
        t2Div.addEventListener("dragleave", bandOnLeave);

        t2Div.ondrop = function(event){
                event.preventDefault();
                bandOnDrop();
        }; // allow Drop
        t2Div.ondragover = function(event){event.preventDefault();}; // allow Drop

        sketchObject.appendChild(t2Div);
        dropPositionElements.push(t2Div);

    }


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
                    var tmpC1LAB = colormapBandSketchC1[i].calcLABColor();
                    var tmpC2LAB = colormapBandSketchC2[i].calcLABColor();
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
