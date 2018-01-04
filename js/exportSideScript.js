function initExportWindow(){

  //exportColormap

  //drawCanvasColormap("id_linearColormapExport",linearMap_resolution_X, linearMap_resolution_Y, exportColormap);


  document.getElementById("exportSide_IntervalApproximationCheckbox").checked = false;
  document.getElementById('exportSide_IntervallInput').value = "10";
  document.getElementById('exportSide_MergingCheckbox').checked=true;
  document.getElementById('exportSide_Radiobutton_XML').checked=true;

  var box = document.getElementById("id_intervalRect").getBoundingClientRect();

  document.getElementById("id_coverIntervalRect").style.display ="initial";
  document.getElementById("exportPage_IntervalPreview").style.display ="none";

  document.getElementById("id_coverIntervalRect").style.top = box.top; + "px"
  document.getElementById("id_coverIntervalRect").style.left = box.left + "px";
  document.getElementById("id_coverIntervalRect").style.width = box.width + "px";
  document.getElementById("id_coverIntervalRect").style.height = box.height + "px";



  //drawKeys("id_keyColormapExport",key_resolution_X, key_resolution_Y, exportColormap, "id_keyColormapLinesBottomExport",true,false)

  //fillExportTable();

  //var box2 = document.getElementById("id_keyColormapLinesBottomExport").getBoundingClientRect();
  //for(var i=0; i<refElementContainer.length; i++){
  //    refElementContainer[i].style.position = "fixed";
//refElementContainer[i].style.top = box2.height+box2.top;
  //}

  changeExportColorspace(0);

}

function cancelExport(){
    document.getElementById("id_exportWindow").style.display = "none";

    if(showSideID==1)
      orderColorSketch(colorspaceModus);
    else{
      for(var i = refElementContainer.length-1; i>=0; i--){
          refElementContainer[i].remove();
          refElementContainer.pop();
      }
     }


    exportSideOpen = false;
}


function fillExportTable(){

    var expMapBandSketchC1 =[];
    var expMapBandSketchC2 =[];
    var expMapBandSketchR1 =[];
    var expMapBandSketchR2 =[];

    for(var i=0; i<exportColormap.getNumberOfBands(); i++){

      expMapBandSketchC1.push(exportColormap.getBand(i).getLeftRGBColor());
      expMapBandSketchC2.push(exportColormap.getBand(i).getRightRGBColor());
      expMapBandSketchR1.push(exportColormap.getBand(i).getLeftRef());
      expMapBandSketchR2.push(exportColormap.getBand(i).getRightRef());

    }


    var old_tbody = document.getElementById("id_exportTableBody");
    var new_tbody = document.createElement('tbody');

    //fill table

    for (i = 0; i < expMapBandSketchC1.length; i++) {
        var tr = document.createElement('tr');

        var td = document.createElement('td')
        td.className = "class_tableInput";
        td.appendChild(document.createTextNode(i+1));
        tr.appendChild(td);

        td = document.createElement('td')
        td.className = "class_tableInput";
        td.appendChild(document.createTextNode(expMapBandSketchR1[i]));
        tr.appendChild(td);

        td = document.createElement('td')
        td.className = "class_tableInput";
        td.appendChild(document.createTextNode(expMapBandSketchR2[i]));
        tr.appendChild(td);

        td = document.createElement('td')
        td.className = "class_tableInput";
        if(expMapBandSketchC2[i].getRValue()!=expMapBandSketchC1[i].getRValue() ||  // i = scaled
           expMapBandSketchC2[i].getGValue()!=expMapBandSketchC1[i].getGValue() ||
           expMapBandSketchC2[i].getBValue()!=expMapBandSketchC1[i].getBValue())
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
                    td.appendChild(document.createTextNode(expMapBandSketchC1[i].getRGBString()));
                    td2.appendChild(document.createTextNode(expMapBandSketchC2[i].getRGBString()));
                break;
                case "hsv":
                    var tmpC1HSV = expMapBandSketchC1[i].calcHSVColor();
                    var tmpC2HSV = expMapBandSketchC2[i].calcHSVColor();
                    var string = "hsv("+tmpC1HSV.getHValue().toFixed(numDecimalPlaces)+","+tmpC1HSV.getSValue().toFixed(numDecimalPlaces)+","+tmpC1HSV.getVValue().toFixed(numDecimalPlaces)+")"
                    td.appendChild(document.createTextNode(string));
                    string = "hsv("+tmpC2HSV.getHValue().toFixed(numDecimalPlaces)+","+tmpC2HSV.getSValue().toFixed(numDecimalPlaces)+","+tmpC2HSV.getVValue().toFixed(numDecimalPlaces)+")"
                    td2.appendChild(document.createTextNode(string));
                break;
                case "lab":
                    var tmpC1LAB = expMapBandSketchC1[i].calcLABColor();
                    var tmpC2LAB = expMapBandSketchC2[i].calcLABColor();
                    var string = "lab("+tmpC1LAB.getLValue().toFixed(numDecimalPlaces)+","+tmpC1LAB.getAValue().toFixed(numDecimalPlaces)+","+tmpC1LAB.getBValue().toFixed(numDecimalPlaces)+")"
                    td.appendChild(document.createTextNode(string));
                    string = "lab("+tmpC2LAB.getLValue().toFixed(numDecimalPlaces)+","+tmpC2LAB.getAValue().toFixed(numDecimalPlaces)+","+tmpC2LAB.getBValue().toFixed(numDecimalPlaces)+")"
                    td2.appendChild(document.createTextNode(string));
                break;
                case "din99":
                    var tmpC1DIN99 = expMapBandSketchC1[i].calcDIN99Color(kE,kCH);
                    var tmpC2DIN99 = expMapBandSketchC2[i].calcDIN99Color(kE,kCH);
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
    new_tbody.id="id_exportTableBody";
}


function changeExportColorspace(type){
    changeColorspace(type);

    // Draw Colorspace
    drawCanvasColormap("id_linearColormapExport",linearMap_resolution_X, linearMap_resolution_Y, exportColormap);
    drawKeys("id_keyColormapExport",key_resolution_X, key_resolution_Y, exportColormap, "id_keyColormapLinesBottomExport",true,false);

    var box = document.getElementById("id_keyColormapLinesBottomExport").getBoundingClientRect();
    for(var i=0; i<refElementContainer.length; i++){
        refElementContainer[i].style.position = "fixed";
        refElementContainer[i].style.top = box.height+box.top;
    }
    // Fill Table
    fillExportTable();
    //
    if(document.getElementById("exportSide_IntervalApproximationCheckbox").checked == true){
      // draw orginal colormap
          drawCanvasColormap("id_IntervalPreviewColormapExport",linearMap_resolution_X, linearMap_resolution_Y, exportColormap);
    }
}

function showIntervalOptions(){
  if(document.getElementById("exportSide_IntervalApproximationCheckbox").checked == true){

    document.getElementById("id_coverIntervalRect").style.display ="none";
    document.getElementById("exportPage_IntervalPreview").style.display ="initial";

    exportSide_changeApproxSpace();

    // draw orginal colormap
        drawCanvasColormap("id_IntervalPreviewColormapExport",linearMap_resolution_X, linearMap_resolution_Y, exportColormap);
    // draw intervall interpolation
        drawIntervalColormap();
    // draw approx colormap

    var oldColorspace = colorspaceModus;
      if(document.getElementById("exportSide_Radiobutton_ApproxRGB").checked){
        colorspaceModus="rgb";
      }
      if(document.getElementById("exportSide_Radiobutton_ApproxHSV").checked==true){
        colorspaceModus="hsv";
      }
      if(document.getElementById("exportSide_Radiobutton_ApproxLAB").checked==true){
        colorspaceModus="lab";
      }
      if(document.getElementById("exportSide_Radiobutton_ApproxDIN99").checked==true){
        colorspaceModus="din99";
      }
      drawCanvasColormap("id_IntervalPreviewColormapApprox",linearMap_resolution_X, linearMap_resolution_Y, exportColormap);
    colorspaceModus = oldColorspace;

  }
  else{

    var box = document.getElementById("id_intervalRect").getBoundingClientRect();

    document.getElementById("id_coverIntervalRect").style.display ="initial";
    document.getElementById("exportPage_IntervalPreview").style.display ="none";

    document.getElementById("id_coverIntervalRect").style.top = box.top; + "px"
    document.getElementById("id_coverIntervalRect").style.left = box.left + "px";
    document.getElementById("id_coverIntervalRect").style.width = box.width + "px";
    document.getElementById("id_coverIntervalRect").style.height = box.height + "px";

  }
}


function exportSide_ChangeMerging(){

        if(document.getElementById('exportSide_MergingCheckbox').checked==true){
            exportColormap.setMerging(true);
        }
        else{
            exportColormap.setMerging(false);
        }


    // draw interval colormap
    drawIntervalColormap();
}

function exportSide_changeApproxSpace(){
   // change Metric
   var oldColorspace = colorspaceModus;
     if(document.getElementById("exportSide_Radiobutton_ApproxRGB").checked==true){
       colorspaceModus="rgb";
       exportColormap.setIntervalMetric(0);
     }
     if(document.getElementById("exportSide_Radiobutton_ApproxHSV").checked==true){
       colorspaceModus="hsv";
       exportColormap.setIntervalMetric(1);
     }
     if(document.getElementById("exportSide_Radiobutton_ApproxLAB").checked==true){
       colorspaceModus="lab";
       exportColormap.setIntervalMetric(2);
     }
     if(document.getElementById("exportSide_Radiobutton_ApproxDIN99").checked==true){
       colorspaceModus="din99";
       exportColormap.setIntervalMetric(3);
     }

    // draw approx colormap
     drawCanvasColormap("id_IntervalPreviewColormapApprox",linearMap_resolution_X, linearMap_resolution_Y, exportColormap);
     colorspaceModus = oldColorspace;

   // draw interval colormap // Do it with the right colorspace!!!! -> aver draw approx colormap
    drawIntervalColormap()
}

function exportSide_changeIntervalNumEnter(e){

    checkInputVal(document.getElementById('exportSide_IntervallInput'),false,false);

    if (e.keyCode == 13) {
      var intervalVal = parseInt(document.getElementById('exportSide_IntervallInput').value);
      exportColormap.setNumberIntervalsAllBands(intervalVal);
    }

    drawIntervalColormap();
}

function exportSide_changeIntervalNumChange(){

    checkInputVal(document.getElementById('exportSide_IntervallInput'),false,false);

    var intervalVal = parseInt(document.getElementById('exportSide_IntervallInput').value);
    exportColormap.setNumberIntervalsAllBands(intervalVal);

    drawIntervalColormap();
}

function changeOutputformat(){
  if(document.getElementById("exportSide_Radiobutton_XML").checked==true){
    outputFormat=1;
  }
  if(document.getElementById("exportSide_Radiobutton_TEXT").checked==true){
    outputFormat=0;
  }
  if(document.getElementById("exportSide_Radiobutton_JSON").checked==true){
    outputFormat=2;
  }
}

function drawIntervalColormap(){

    // calc intervals
    exportColormap.calcIntervalPointsAllBands();

    // start
    var canvasObject = document.getElementById("IntervalPreviewColormapInterval");

    canvasObject.width =linearMap_resolution_X;
    canvasObject.height=linearMap_resolution_Y;

    var canvasContex = canvasObject.getContext("2d");
    //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
    var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);

        /////////////////////////////////////////////////////////

    var colormapWidth = linearMap_resolution_X;
    var xPos = 0;
    var yPos = 0;
    var colormapHeigth = linearMap_resolution_Y;

    var twinStarted = false;
    var leftStarted = false;

    for(var i=0; i<exportColormap.getNumberOfBands(); i++){

       var bandObj = exportColormap.getBand(i);
       var tmpPos1, tmpPos2;
       var tmpColor1, tmpColor2;
       var elementwidth;
       // 1. KEY i=0

       tmpPos1 = (bandObj.getLeftRef()-exportColormap.getRangeStart())/(exportColormap.getRangeEnd()-exportColormap.getRangeStart())*colormapWidth;

        switch(bandObj.getIntervalMetric()) {
           case 0:
               tmpColor1 = getRightColorSpace(colorspaceModus, bandObj.getLeftRGBColor());
               break;
           case 1:
               tmpColor1 = getRightColorSpace(colorspaceModus, bandObj.getLeftHSVColor());
               break;
           case 2:
               tmpColor1 = getRightColorSpace(colorspaceModus, bandObj.getLeftLABColor());
               break;
           case 3:
               tmpColor1 = getRightColorSpace(colorspaceModus, bandObj.getLeftDIN99Color());
               break;
           default:
               return;
       }


       // Interval Points
       for(var j=0; j<bandObj.getNumberOfIntervalsPoints(); j++){
           var tmpIntervalPointObj = bandObj.getIntervalObject(j);

           tmpColor2 = getRightColorSpace(colorspaceModus, tmpIntervalPointObj.getColor());

           tmpPos2 = (tmpIntervalPointObj.getRefPosition()-exportColormap.getRangeStart())/(exportColormap.getRangeEnd()-exportColormap.getRangeStart())*colormapWidth;
           elementwidth =  tmpPos2-tmpPos1;

           canvasData = createScaledBand(canvasData, tmpPos1, elementwidth+1, colormapHeigth, tmpColor1, tmpColor2, colormapWidth);

           tmpColor1 = tmpColor2;
           tmpPos1 = tmpPos2;
       }

       // 2. KEY i=tmpNumObj-1

       tmpPos2 = (bandObj.getRightRef()-exportColormap.getRangeStart())/(exportColormap.getRangeEnd()-exportColormap.getRangeStart())*colormapWidth;
       switch(bandObj.getIntervalMetric()) {
          case 0:
              tmpColor2 = getRightColorSpace(colorspaceModus, bandObj.getRightRGBColor());
              break;
          case 1:
              tmpColor2 = getRightColorSpace(colorspaceModus, bandObj.getRightHSVColor());
              break;
          case 2:
              tmpColor2 = getRightColorSpace(colorspaceModus, bandObj.getRightLABColor());
              break;
          case 3:
              tmpColor2 = getRightColorSpace(colorspaceModus, bandObj.getRightDIN99Color());
              break;
          default:
              return;
      }

      elementwidth =  tmpPos2-tmpPos1;
      canvasData = createScaledBand(canvasData, tmpPos1, elementwidth+1, colormapHeigth, tmpColor1, tmpColor2, colormapWidth);//*/

   }//
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        canvasContex.putImageData(canvasData, 0, 0);
        //canvasContex.lineWidth = 2;
        //canvasContex.strokeStyle = 'rgb(0,0,0)';
        //canvasContex.strokeRect(0,0, colormapWidth, colormapHeigth);

}

function exportSide_downloadFile(){

    var filename;
    var text;


     switch(outputFormat) {
        case 0:
            // lookup table
            filename = "ccc-tool_colormap_"+exportColormap.getColormapName()+".csv";
            text = exportSide_createCSV_Lookup();
            break;
        case 1:
            // xml
            filename = "ccc-tool_colormap_"+exportColormap.getColormapName()+".xml";
            text = exportSide_createXML();
            break;
        case 2:
            filename = "ccc-tool_colormap_"+exportColormap.getColormapName()+".json";
            text = exportSide_createJSON()
            break;
        default:
            return;

    }

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function exportSide_createXML(){

    var xmltxt = "<ColorMaps>\n<ColorMap name=\""+exportColormap.getColormapName()+"\" space=\"";

    switch(colorspaceModus) {
            case "rgb":
                xmltxt = xmltxt+"RGB";
                break;
            case "hsv":
                xmltxt = xmltxt+"HSV";
                break;
            case "lab":
                xmltxt = xmltxt+"LAB";
                break;
            case "din99":
                xmltxt = xmltxt+"DIN99";
                break;
            default:
                return;
    }

    xmltxt = xmltxt+"\" creator=\"CCC-Tool\">\n";

    for(var i=0; i<exportColormap.getNumberOfBands(); i++){

        var bandObj = exportColormap.getBand(i);

        xmltxt=xmltxt+"<Point x=\""+bandObj.getLeftRef()+"\" o=\"1\" ";
        // 1. KEY i=0
        //console.log(bandObj.getLeftRef());
         switch(colorspaceModus) {
            case "rgb":
                xmltxt=xmltxt+"r=\""+bandObj.getLeftRGBColor().getRValue()+"\" g=\""+bandObj.getLeftRGBColor().getGValue()+"\" b=\""+bandObj.getLeftRGBColor().getBValue()+"\" ccctype=\"key\"/>\n";
                break;
            case "hsv":
                xmltxt=xmltxt+"h=\""+bandObj.getLeftHSVColor().getHValue()+"\" s=\""+bandObj.getLeftHSVColor().getSValue()+"\" v=\""+bandObj.getLeftHSVColor().getVValue()+"\" ccctype=\"key\"/>\n";
                break;
            case "lab":
                xmltxt=xmltxt+"l=\""+bandObj.getLeftLABColor().getLValue()+"\" a=\""+bandObj.getLeftLABColor().getAValue()+"\" b=\""+bandObj.getLeftLABColor().getBValue()+"\" ccctype=\"key\"/>\n";
                break;
            case "din99":
                xmltxt=xmltxt+"l99=\""+bandObj.getLeftDIN99Color().getL99Value()+"\" a99=\""+bandObj.getLeftDIN99Color().getA99Value()+"\" b99=\""+bandObj.getLeftDIN99Color().getB99Value()+"\" ccctype=\"key\"/>\n";
                break;
            default:
                return;
        }


        // Interval Points
        for(var j=0; j<bandObj.getNumberOfIntervalsPoints(); j++){
            var tmpIntervalPointObj = bandObj.getIntervalObject(j);
            var tmpColor = getRightColorSpace(colorspaceModus, tmpIntervalPointObj.getColor());
            xmltxt=xmltxt+"<Point x=\""+tmpIntervalPointObj.getRefPosition()+"\" o=\"1\" ";
            switch(colorspaceModus) {
            case "rgb":
                xmltxt=xmltxt+"r=\""+tmpColor.getRValue()+"\" g=\""+tmpColor.getGValue()+"\" b=\""+tmpColor.getBValue()+"\" ccctype=\"interval point\"/>\n";
                break;
            case "hsv":
                xmltxt=xmltxt+"h=\""+tmpColor.getHValue()+"\" s=\""+tmpColor.getSValue()+"\" v=\""+tmpColor.getVValue()+"\" ccctype=\"interval point\"/>\n";
                break;
            case "lab":
                xmltxt=xmltxt+"l=\""+tmpColor.getLValue()+"\" a=\""+tmpColor.getAValue()+"\" b=\""+tmpColor.getBValue()+"\" ccctype=\"interval point\"/>\n";
                break;
            case "din99":
                xmltxt=xmltxt+"l99=\""+tmpColor.getL99Value()+"\" a99=\""+tmpColor.getA99Value()+"\" b99=\""+tmpColor.getB99Value()+"\" ccctype=\"interval point\"/>\n";
                break;
            default:
                return;
            }

        }

        // 2. key i=tmpNumObj-1

        xmltxt=xmltxt+"<Point x=\""+bandObj.getRightRef()+"\" o=\"1\" ";

        switch(colorspaceModus) {
            case "rgb":
                xmltxt=xmltxt+"r=\""+bandObj.getRightRGBColor().getRValue()+"\" g=\""+bandObj.getRightRGBColor().getGValue()+"\" b=\""+bandObj.getRightRGBColor().getBValue()+"\" ccctype=\"key\"/>\n";
                break;
            case "hsv":
                xmltxt=xmltxt+"h=\""+bandObj.getRightHSVColor().getHValue()+"\" s=\""+bandObj.getRightHSVColor().getSValue()+"\" v=\""+bandObj.getRightHSVColor().getVValue()+"\" ccctype=\"key\"/>\n";
                break;
            case "lab":
                xmltxt=xmltxt+"l=\""+bandObj.getRightLABColor().getLValue()+"\" a=\""+bandObj.getRightLABColor().getAValue()+"\" b=\""+bandObj.getRightLABColor().getBValue()+"\" ccctype=\"key\"/>\n";
                break;
            case "din99":
                xmltxt=xmltxt+"l99=\""+bandObj.getRightDIN99Color().getL99Value()+"\" a99=\""+bandObj.getRightDIN99Color().getA99Value()+"\" b99=\""+bandObj.getRightDIN99Color().getB99Value()+"\" ccctype=\"key\"/>\n";
                break;
            default:
                return;
        }
    }

    var tmpColor = exportColormap.getNaNColor(colorspaceModus);
    switch(colorspaceModus) {
        case "rgb":
            xmltxt=xmltxt+"<NaN o=\"1\" r=\""+tmpColor.getRValue()+"\" g=\""+tmpColor.getGValue()+"\" b=\""+tmpColor.getBValue()+"\"/>\n";
            break;
        case "hsv":
            xmltxt=xmltxt+"<NaN o=\"1\" h=\""+tmpColor.getHValue()+"\" s=\""+tmpColor.getSValue()+"\" v=\""+tmpColor.getVValue()+"\"/>\n";
            break;
        case "lab":
            xmltxt=xmltxt+"<NaN o=\"1\" l=\""+tmpColor.getLValue()+"\" a=\""+tmpColor.getAValue()+"\" b=\""+tmpColor.getBValue()+"\"/>\n";
            break;
        case "din99":
            xmltxt=xmltxt+"<NaN o=\"1\" l99=\""+tmpColor.getL99Value()+"\" a99=\""+tmpColor.getA99Value()+"\" b99=\""+tmpColor.getB99Value()+"\"/>\n";
            break;
        default:
            return;
    }//
    xmltxt=xmltxt+"</ColorMap>\n</ColorMaps>";
    return xmltxt;
}

function exportSide_createCSV_Lookup(){

    var txt = "";

    var opacityVal =1;
    var tmpColor = exportColormap.getNaNColor(colorspaceModus);
    switch(colorspaceModus) {
            case "rgb":
                txt = txt+"Reference;R;G;B;Opacity;ccctype;;NaN;R;"+tmpColor.getRValue()+";G;"+tmpColor.getGValue()+";B;"+tmpColor.getBValue()+"\n";
                break;
            case "hsv":
                txt = txt+"Reference;H;S;V;Opacity;ccctype;;NaN;H;"+tmpColor.getHValue()+";S;"+tmpColor.getSValue()+";V;"+tmpColor.getVValue()+"\n";
                break;
            case "lab":
                txt = txt+"Reference;L;A;B;Opacity;ccctype;;NaN;L;"+tmpColor.getLValue()+";A;"+tmpColor.getAValue()+";B;"+tmpColor.getBValue()+"\n";
                break;
            case "din99":
                txt = txt+"Reference;L99;A99;B99;Opacity;ccctype;;NaN;L99;"+tmpColor.getL99Value()+";A99;"+tmpColor.getA99Value()+";B99;"+tmpColor.getB99Value()+"\n";
                break;
            default:
                return;
    }

    for(var i=0; i<exportColormap.getNumberOfBands(); i++){

        var bandObj = exportColormap.getBand(i);

        // 1. key i=0
        //console.log(bandObj.getLeftRef());
         switch(colorspaceModus) {
            case "rgb":
                txt=txt+bandObj.getLeftRef()+";"+bandObj.getLeftRGBColor().getRValue()+";"+bandObj.getLeftRGBColor().getGValue()+";"+bandObj.getLeftRGBColor().getBValue()+";"+opacityVal+";key\n";
                break;
            case "hsv":
                txt=txt+bandObj.getLeftRef()+";"+bandObj.getLeftHSVColor().getHValue()+";"+bandObj.getLeftHSVColor().getSValue()+";"+bandObj.getLeftHSVColor().getVValue()+";"+opacityVal+";key\n";
                break;
            case "lab":
                txt=txt+bandObj.getLeftRef()+";"+bandObj.getLeftLABColor().getLValue()+";"+bandObj.getLeftLABColor().getAValue()+";"+bandObj.getLeftLABColor().getBValue()+";"+opacityVal+";key\n";
                break;
            case "din99":
                txt=txt+bandObj.getLeftRef()+";"+bandObj.getLeftDIN99Color().getL99Value()+";"+bandObj.getLeftDIN99Color().getA99Value()+";"+bandObj.getLeftDIN99Color().getB99Value()+";"+opacityVal+";key\n";
                break;
            default:
                return;
        }


        // Interval Points
        for(var j=0; j<bandObj.getNumberOfIntervalsPoints(); j++){
            var tmpIntervalPointObj = bandObj.getIntervalObject(j);
            var tmpColor = getRightColorSpace(colorspaceModus, tmpIntervalPointObj.getColor());
            switch(colorspaceModus) {
            case "rgb":
                txt=txt+tmpIntervalPointObj.getRefPosition()+";"+tmpColor.getRValue()+";"+tmpColor.getGValue()+";"+tmpColor.getBValue()+";"+opacityVal+";interval point\n";
                break;
            case "hsv":
                txt=txt+tmpIntervalPointObj.getRefPosition()+";"+tmpColor.getHValue()+";"+tmpColor.getSValue()+";"+tmpColor.getVValue()+";"+opacityVal+";interval point\n";
                break;
            case "lab":
                txt=txt+tmpIntervalPointObj.getRefPosition()+";"+tmpColor.getLValue()+";"+tmpColor.getAValue()+";"+tmpColor.getBValue()+";"+opacityVal+";interval point\n";
                break;
            case "din99":
                txt=txt+tmpIntervalPointObj.getRefPosition()+";"+tmpColor.getL99Value()+";"+tmpColor.getA99Value()+";"+tmpColor.getB99Value()+";"+opacityVal+";interval point\n";
                break;
            default:
                return;
            }

        }

        // 2. key i=tmpNumObj-1


        switch(colorspaceModus) {
            case "rgb":
                txt=txt+bandObj.getRightRef()+";"+bandObj.getRightRGBColor().getRValue()+";"+bandObj.getRightRGBColor().getGValue()+";"+bandObj.getRightRGBColor().getBValue()+";"+opacityVal+";key\n";
                break;
            case "hsv":
                txt=txt+bandObj.getRightRef()+";"+bandObj.getRightHSVColor().getHValue()+";"+bandObj.getRightHSVColor().getSValue()+";"+bandObj.getRightHSVColor().getVValue()+";"+opacityVal+";key\n";
                break;
            case "lab":
                txt=txt+bandObj.getRightRef()+";"+bandObj.getRightLABColor().getLValue()+";"+bandObj.getRightLABColor().getAValue()+";"+bandObj.getRightLABColor().getBValue()+";"+opacityVal+";key\n";
                break;
            case "din99":
                txt=txt+bandObj.getRightRef()+";"+bandObj.getRightDIN99Color().getL99Value()+";"+bandObj.getRightDIN99Color().getA99Value()+";"+bandObj.getRightDIN99Color().getB99Value()+";"+opacityVal+";key\n";
                break;
            default:
                return;
        }
    }

    return txt;
}

function exportSide_createJSON(){

    var jsontxt = "{\"colormaps\":[{\"name\":\""+exportColormap.getColormapName()+"\",\"space\":";

    switch(colorspaceModus) {
            case "rgb":
                jsontxt = jsontxt+"\"RGB\"";
                break;
            case "hsv":
                jsontxt = jsontxt+"\"HSV\"";
                break;
            case "lab":
                jsontxt = jsontxt+"\"Lab\"";
                break;
            case "din99":
                jsontxt = jsontxt+"\"DIN99\"";
                break;
            default:
                return;
    }

    jsontxt = jsontxt+",\"points\":[";

    for(var i=0; i<exportColormap.getNumberOfBands(); i++){

        var bandObj = exportColormap.getBand(i);

        jsontxt=jsontxt+"{\"x\":\""+bandObj.getLeftRef()+"\",\"o\":\"1\",";
        // 1. key i=0
        //console.log(bandObj.getLeftRef());
         switch(colorspaceModus) {
            case "rgb":
                jsontxt=jsontxt+"\"r\":\""+bandObj.getLeftRGBColor().getRValue()+"\",\"g\":\""+bandObj.getLeftRGBColor().getGValue()+"\",\"b\":\""+bandObj.getLeftRGBColor().getBValue()+"\",\"ccctype\":\"key\"},";
                break;
            case "hsv":
                jsontxt=jsontxt+"\"h\":\""+bandObj.getLeftHSVColor().getHValue()+"\",\"s\":\""+bandObj.getLeftHSVColor().getSValue()+"\",\"v\":\""+bandObj.getLeftHSVColor().getVValue()+"\",\"ccctype\":\"key\"},";
                break;
            case "lab":
                jsontxt=jsontxt+"\"l\":\""+bandObj.getLeftLABColor().getLValue()+"\",\"a\":\""+bandObj.getLeftLABColor().getAValue()+"\",\"b\":\""+bandObj.getLeftLABColor().getBValue()+"\",\"ccctype\":\"key\"},";
                break;
            case "din99":
                jsontxt=jsontxt+"\"l99\":\""+bandObj.getLeftDIN99Color().getL99Value()+"\",\"a99\":\""+bandObj.getLeftDIN99Color().getA99Value()+"\",\"b99\":\""+bandObj.getLeftDIN99Color().getB99Value()+"\",\"ccctype\":\"key\"},";
                break;
            default:
                return;
        }


        // Interval Points
        for(var j=0; j<bandObj.getNumberOfIntervalsPoints(); j++){
            var tmpIntervalPointObj = bandObj.getIntervalObject(j);
            var tmpColor = getRightColorSpace(colorspaceModus, tmpIntervalPointObj.getColor());
            jsontxt=jsontxt+"{\"x\":\""+tmpIntervalPointObj.getRefPosition()+"\",\"o\":\"1\",";
            switch(colorspaceModus) {
            case "rgb":
                jsontxt=jsontxt+"\"r\":\""+tmpColor.getRValue()+"\",\"g\":\""+tmpColor.getGValue()+"\",\"b\":\""+tmpColor.getBValue()+"\",\"ccctype\":\"interval point\"},";
                break;
            case "hsv":
                jsontxt=jsontxt+"\"h\":\""+tmpColor.getHValue()+"\",\"s\":\""+tmpColor.getSValue()+"\",\"v\":\""+tmpColor.getVValue()+"\",\"ccctype\":\"interval point\"},";
                break;
            case "lab":
                jsontxt=jsontxt+"\"l\":\""+tmpColor.getLValue()+"\",\"a\":\""+tmpColor.getAValue()+"\",\"b\":\""+tmpColor.getBValue()+"\",\"ccctype\":\"interval point\"},";
                break;
            case "din99":
                jsontxt=jsontxt+"\"l99\":\""+tmpColor.getL99Value()+"\",\"a99\":\""+tmpColor.getA99Value()+"\",\"b99\":\""+tmpColor.getB99Value()+"\",\"ccctype\":\"interval point\"},";
                break;
            default:
                return;
            }

        }

        // 2. key i=tmpNumObj-1

        jsontxt=jsontxt+"{\"x\":\""+bandObj.getRightRef()+"\",\"o\":\"1\",";
        switch(colorspaceModus) {
            case "rgb":
                jsontxt=jsontxt+"\"r\":\""+bandObj.getRightRGBColor().getRValue()+"\",\"g\":\""+bandObj.getRightRGBColor().getGValue()+"\",\"b\":\""+bandObj.getRightRGBColor().getBValue()+"\",\"ccctype\":\"key\"}";
                break;
            case "hsv":
                jsontxt=jsontxt+"\"h\":\""+bandObj.getRightHSVColor().getHValue()+"\",\"s\":\""+bandObj.getRightHSVColor().getSValue()+"\",\"v\":\""+bandObj.getRightHSVColor().getVValue()+"\",\"ccctype\":\"key\"}";
                break;
            case "lab":
                jsontxt=jsontxt+"\"l\":\""+bandObj.getRightLABColor().getLValue()+"\",\"a\":\""+bandObj.getRightLABColor().getAValue()+"\",\"b\":\""+bandObj.getRightLABColor().getBValue()+"\",\"ccctype\":\"key\"}";
                break;
            case "din99":
                jsontxt=jsontxt+"\"l99\":\""+bandObj.getRightDIN99Color().getL99Value()+"\",\"a99\":\""+bandObj.getRightDIN99Color().getA99Value()+"\",\"b99\":\""+bandObj.getRightDIN99Color().getB99Value()+"\",\"ccctype\":\"key\"}";
                break;
            default:
                return;
        }

        if(i != exportColormap.getNumberOfBands()-1){
          jsontxt=jsontxt+",";
        }
    }

    jsontxt=jsontxt+"]}]}";
    return jsontxt;
}
