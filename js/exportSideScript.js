function initExportWindow(){

  changeExportColorspace(0);
  drawCanvasColormap("id_previewColormapExport", linearMap_resolution_X, linearMap_resolution_Y, globalColormap1);

}

function changeMergeOption(type){

  document.getElementById("button_ExportMergeYes").style.border = "0.2vh solid black";
  document.getElementById("button_ExportMergeYes").style.color = "black";
  document.getElementById("button_ExportMergeNo").style.border = "0.2vh solid black";
  document.getElementById("button_ExportMergeNo").style.color = "black";

  switch (type) {
    case 0:
      doMerging=true;
      document.getElementById("button_ExportMergeYes").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportMergeYes").style.color = styleActiveColor;
      break;
    case 1:
      doMerging=false;
      document.getElementById("button_ExportMergeNo").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportMergeNo").style.color = styleActiveColor;
      break;
    default:
      return;
  }

    // Fill Table
    fillExportTable();
}

function fillExportTable(){

    intervalSize = parseFloat(document.getElementById("id_InputIntervalExport").value);
    var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);

    var old_tbody = document.getElementById("id_exportTableBody");
    var new_tbody = document.createElement('tbody');

    var counter = 1;
    for(var i = 0; i<intervalColormap.getColormapLength(); i++){

      var tmpKey = intervalColormap.getType(i);
      var tmpColor = intervalColormap.getColor(i, exportColorspace);

      if(doMerging && i!=intervalColormap.getColormapLength()-1){

        var tmpColor2 = intervalColormap.getColor(i+1, exportColorspace);
        if(tmpColor.get1Value()==tmpColor2.get1Value()&&
           tmpColor.get2Value()==tmpColor2.get2Value()&&
           tmpColor.get3Value()==tmpColor2.get3Value()&&
           tmpKey!="nil key"&&
           tmpKey!="interval nil key"&&
           tmpKey!="twin key"&&
           tmpKey!="interval twin key"&&
           tmpKey!="left key"&&
           tmpKey!="interval left key"){
           continue;
        }
      }

          var tr = document.createElement('tr');

          var td = document.createElement('td')
          td.className = "class_tableInput";
          td.appendChild(document.createTextNode(counter));
          tr.appendChild(td);

          td = document.createElement('td')
          td.className = "class_tableInput";
          td.appendChild(document.createTextNode(intervalColormap.getRef(i)));
          tr.appendChild(td);

          td = document.createElement('td')
          td.className = "class_tableInput";
          td.appendChild(document.createTextNode(tmpKey));
          tr.appendChild(td);

          td = document.createElement('td')
          td.className = "class_tableInput";
          td.appendChild(document.createTextNode(exportColorspace+"("+tmpColor.get1Value()+','+tmpColor.get2Value()+','+tmpColor.get3Value()+')'));
          tr.appendChild(td);

          tmpColor = intervalColormap.getColor(i, "rgb");
          td = document.createElement('td')
          td.className = "class_tableInput";
          td.style.background = tmpColor.getRGBString();
          tr.appendChild(td);

          new_tbody.appendChild(tr);
          counter++;
    }

    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
    new_tbody.id="id_exportTableBody";
}


function changeExportColorspace(type){


  document.getElementById("button_ExportSpaceRGB").style.border = "0.2vh solid black";
  document.getElementById("button_ExportSpaceRGB").style.color = "black";
  document.getElementById("button_ExportSpaceHSV").style.border = "0.2vh solid black";
  document.getElementById("button_ExportSpaceHSV").style.color = "black";
  document.getElementById("button_ExportSpaceLAB").style.border = "0.2vh solid black";
  document.getElementById("button_ExportSpaceLAB").style.color = "black";
  document.getElementById("button_ExportSpaceDIN99").style.border = "0.2vh solid black";
  document.getElementById("button_ExportSpaceDIN99").style.color = "black";

  switch (type) {
    case 0:
      exportColorspace = "rgb";
      document.getElementById("id_table_exportColor1").innerHTML = "Color (RGB)";
      document.getElementById("button_ExportSpaceRGB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportSpaceRGB").style.color = styleActiveColor;
      break;
    case 1:
      exportColorspace = "hsv";
      document.getElementById("id_table_exportColor1").innerHTML = "Color (HSV)";
      document.getElementById("button_ExportSpaceHSV").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportSpaceHSV").style.color = styleActiveColor;
      break;
    case 2:
      exportColorspace = "lab";
      document.getElementById("id_table_exportColor1").innerHTML = "Color (LAB)";
      document.getElementById("button_ExportSpaceLAB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportSpaceLAB").style.color = styleActiveColor;
      break;
    case 3:
      exportColorspace = "din99";
      document.getElementById("id_table_exportColor1").innerHTML = "Color (DIN99)";
      document.getElementById("button_ExportSpaceDIN99").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportSpaceDIN99").style.color = styleActiveColor;
      break;
    default:
      return;
  }

    // Fill Table
    fillExportTable();

}


function exportSide_changeIntervalNumEnter(e){

    checkInputVal(document.getElementById('id_InputIntervalExport'),false,false);

    if (e.keyCode == 13) {
    fillExportTable();
    }

}

function exportSide_changeIntervalNumChange(){

    checkInputVal(document.getElementById('id_InputIntervalExport'),false,false);
    fillExportTable();

}

function changeOutputformat(type){

  document.getElementById("button_ExportFormatXML").style.border = "0.2vh solid black";
  document.getElementById("button_ExportFormatXML").style.color = "black";
  document.getElementById("button_ExportFormatCSV").style.border = "0.2vh solid black";
  document.getElementById("button_ExportFormatCSV").style.color = "black";
  document.getElementById("button_ExportFormatJSON").style.border = "0.2vh solid black";
  document.getElementById("button_ExportFormatJSON").style.color = "black";

  switch (type) {
    case 0:
      document.getElementById("button_ExportFormatCSV").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportFormatCSV").style.color = styleActiveColor;
      break;
    case 1:
      document.getElementById("button_ExportFormatXML").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportFormatXML").style.color = styleActiveColor;
      break;
    case 2:
      document.getElementById("button_ExportFormatJSON").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportFormatJSON").style.color = styleActiveColor;
      break;
    default:
      return;
  }

  outputFormat=type;

}



function exportSide_downloadFile(){

    var filename;
    var text;


     switch(outputFormat) {
        case 0:
            // lookup table
            filename = "ccc-tool_colormap_"+globalColormap1.getColormapName()+".csv";
            text = exportSide_createCSV_Lookup();
            break;
        case 1:
            // xml
            filename = "ccc-tool_colormap_"+globalColormap1.getColormapName()+".xml";
            text = exportSide_createXML();
            break;
        case 2:
            filename = "ccc-tool_colormap_"+globalColormap1.getColormapName()+".json";
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

    intervalSize = parseFloat(document.getElementById("id_InputIntervalExport").value);
    var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);

    var xmltxt = "<ColorMaps>\n<ColorMap name=\""+globalColormap1.getColormapName()+"\" space=\"";

    switch(exportColorspace) {
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


    for(var i = 0; i<intervalColormap.getColormapLength(); i++){

      var tmpKey = intervalColormap.getType(i);
      var tmpColor = intervalColormap.getColor(i, exportColorspace);

        xmltxt=xmltxt+"<Point x=\""+intervalColormap.getRef(i)+"\" o=\"1\" ";
        // 1. KEY i=0
        //console.log(bandObj.getRef(i));
        var isCMS="true";
         if(tmpKey=="interval"){
           isCMS="false";
         }

         switch(exportColorspace) {
            case "rgb":
                xmltxt=xmltxt+"r=\""+tmpColor.getRValue()+"\" g=\""+tmpColor.getGValue()+"\" b=\""+tmpColor.getBValue()+"\" cms=\""+isCMS+"\"/>\n";
                break;
            case "hsv":
                xmltxt=xmltxt+"h=\""+tmpColor.getHValue()+"\" s=\""+tmpColor.getSValue()+"\" v=\""+tmpColor.getVValue()+"\" cms=\""+isCMS+"\"/>\n";
                break;
            case "lab":
                xmltxt=xmltxt+"l=\""+tmpColor.getLValue()+"\" a=\""+tmpColor.getAValue()+"\" b=\""+tmpColor.getBValue()+"\" cms=\""+isCMS+"\"/>\n";
                break;
            case "din99":
                xmltxt=xmltxt+"l99=\""+tmpColor.getL99Value()+"\" a99=\""+tmpColor.getA99Value()+"\" b99=\""+tmpColor.getB99Value()+"\" cms=\""+isCMS+"\"/>\n";
                break;
            default:
                return;
        }

    }

    switch(exportColorspace) {
            case "rgb":
                var tmpColor = globalColormap1.getNaNColor(exportColorspace);
                xmltxt=xmltxt+"<NaN r=\""+tmpColor.getRValue()+"\" g=\""+tmpColor.getGValue()+"\" b=\""+tmpColor.getBValue()+"\"/>\n";
                break;
            case "hsv":
                var tmpColor = globalColormap1.getNaNColor(exportColorspace);
                xmltxt=xmltxt+"<NaN h=\""+tmpColor.getHValue()+"\" s=\""+tmpColor.getSValue()+"\" v=\""+tmpColor.getVValue()+"\"/>\n";
                break;
            case "lab":
                var tmpColor = globalColormap1.getNaNColor(exportColorspace);
                xmltxt=xmltxt+"<NaN l=\""+tmpColor.getLValue()+"\" a=\""+tmpColor.getAValue()+"\" b=\""+tmpColor.getBValue()+"\"/>\n";
                break;
            case "din99":
                var tmpColor = globalColormap1.getNaNColor(exportColorspace);
                  xmltxt=xmltxt+"<NaN l99=\""+tmpColor.getL99Value()+"\" a99=\""+tmpColor.getA99Value()+"\" b99=\""+tmpColor.getB99Value()+"\"/>\n";
                break;
            default:
                return;
    }



    xmltxt=xmltxt+"</ColorMap>\n</ColorMaps>";
    return xmltxt;
}

function exportSide_createCSV_Lookup(){

    var txt = "";


    intervalSize = parseFloat(document.getElementById("id_InputIntervalExport").value);
    var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);

    var opacityVal =1;
    var tmpColor2 = globalColormap1.getNaNColor(exportColorspace);
    switch(exportColorspace) {
            case "rgb":
                txt = txt+"Reference;R;G;B;Opacity;cms;;NaN;R;"+tmpColor2.getRValue()+";G;"+tmpColor2.getGValue()+";B;"+tmpColor2.getBValue()+"\n";
                break;
            case "hsv":
                txt = txt+"Reference;H;S;V;Opacity;cms;;NaN;H;"+tmpColor2.getHValue()+";S;"+tmpColor2.getSValue()+";V;"+tmpColor2.getVValue()+"\n";
                break;
            case "lab":
                txt = txt+"Reference;L;A;B;Opacity;cms;;NaN;L;"+tmpColor2.getLValue()+";A;"+tmpColor2.getAValue()+";B;"+tmpColor2.getBValue()+"\n";
                break;
            case "din99":
                txt = txt+"Reference;L99;A99;B99;Opacity;cms;;NaN;L99;"+tmpColor2.getL99Value()+";A99;"+tmpColor2.getA99Value()+";B99;"+tmpColor2.getB99Value()+"\n";
                break;
            default:
                return;
    }

    for(var i = 0; i<intervalColormap.getColormapLength(); i++){

      var tmpKey = intervalColormap.getType(i);
      var tmpColor = intervalColormap.getColor(i, exportColorspace);

        var isCMS="true";
         if(tmpKey=="interval"){
           isCMS="false";
         }
        // 1. key i=0
        //console.log(bandObj.getRef(i));
         switch(exportColorspace) {
            case "rgb":
                txt=txt+intervalColormap.getRef(i)+";"+tmpColor.getRValue()+";"+tmpColor.getGValue()+";"+tmpColor.getBValue()+";"+opacityVal+";"+isCMS+"\n";
                break;
            case "hsv":
                txt=txt+intervalColormap.getRef(i)+";"+tmpColor.getHValue()+";"+tmpColor.getSValue()+";"+tmpColor.getVValue()+";"+opacityVal+";"+isCMS+"\n";
                break;
            case "lab":
                txt=txt+intervalColormap.getRef(i)+";"+tmpColor.getLValue()+";"+tmpColor.getAValue()+";"+tmpColor.getBValue()+";"+opacityVal+""+isCMS+"\n";
                break;
            case "din99":
                txt=txt+intervalColormap.getRef(i)+";"+tmpColor.getL99Value()+";"+tmpColor.getA99Value()+";"+tmpColor.getB99Value()+";"+opacityVal+";"+isCMS+"\n";
                break;
            default:
                return;
        }

    }

    return txt;
}

function exportSide_createJSON(){

    intervalSize = parseFloat(document.getElementById("id_InputIntervalExport").value);
    var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);

    var jsontxt = "[\n\t{\n\t\t\"ColorSpace\" : ";

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



    jsontxt = jsontxt+",\n\t\t\"Creator\" : \"CCC-Tool\",\n\t\t\"Name\" : \""+globalColormap1.getColormapName()+"\",\n\t\t\"NanColor\" : [";

    switch(exportColorspace) {
            case "rgb":
                var tmpColor = globalColormap1.getNaNColor(exportColorspace);
                jsontxt = jsontxt+ tmpColor.get1Value() +","+tmpColor.get2Value()+","+tmpColor.get3Value()+"],\n\t\t\"RGBPoints\" : [";
                break;
            case "hsv":
                var tmpColor = globalColormap1.getNaNColor(exportColorspace);
                jsontxt = jsontxt+tmpColor.get1Value() +","+tmpColor.get2Value()+","+tmpColor.get3Value()+"],\n\t\t\"HSVPoints\" : [";
                break;
            case "lab":
                var tmpColor = globalColormap1.getNaNColor(exportColorspace);
                jsontxt = jsontxt+tmpColor.get1Value() +","+tmpColor.get2Value()+","+tmpColor.get3Value()+"],\n\t\t\"LabPoints\" : [";
                break;
            case "din99":
                var tmpColor = globalColormap1.getNaNColor(exportColorspace);
                jsontxt = jsontxt+tmpColor.get1Value() +","+tmpColor.get2Value()+","+tmpColor.get3Value()+"],\n\t\t\"DIN99Points\" : [";
                break;
            default:
                return;
    }


    var colorTxt ="";
    var isCMSTxt ="\n\t\t],\n\t\t\"isCMS\" : [";
    var isMoTTxt="\n\t\t],\n\t\t\"isMoT\" : [";

    for(var i = 0; i<intervalColormap.getColormapLength(); i++){

      var tmpColor = intervalColormap.getColor(i, exportColorspace);
      var tmpKey = intervalColormap.getType(i);

        var isCMS=true;
         if(tmpKey=="interval"){
           isCMS=false;
         }

         var isMoT=false;
          /*if(tmpKey=="interval"){
            isCMS=false;
          }*/


        isCMSTxt=isCMSTxt+"\n\t\t\t"+isCMS;

        isMoTTxt=isMoTTxt+"\n\t\t\t"+isMoT;

        colorTxt=colorTxt+"\n\t\t\t"+intervalColormap.getRef(i)+",";

        // 1. key i=0
        //console.log(bandObj.getRef(i));
         switch(exportColorspace) {
            case "rgb":
                colorTxt=colorTxt+"\n\t\t\t"+tmpColor.getRValue()+",\n\t\t\t"+tmpColor.getGValue()+",\n\t\t\t"+tmpColor.getBValue();
                break;
            case "hsv":
                colorTxt=colorTxt+"\n\t\t\t"+tmpColor.getHValue()+",\n\t\t\t"+tmpColor.getSValue()+",\n\t\t\t"+tmpColor.getVValue();
                break;
            case "lab":
                colorTxt=colorTxt+"\n\t\t\t"+tmpColor.getLValue()+",\n\t\t\t"+tmpColor.getAValue()+",\n\t\t\t"+tmpColor.getBValue();
                break;
            case "din99":
                colorTxt=colorTxt+"\n\t\t\t"+tmpColor.getL99Value()+",\n\t\t\t"+tmpColor.getA99Value()+",\n\t\t\t"+tmpColor.getB99Value();
                break;
            default:
                return;
        }

        if(i != intervalColormap.getColormapLength()-1){
          colorTxt=colorTxt+",";
          isCMSTxt=isCMSTxt+",";
          isMoTTxt=isMoTTxt+",";
        }
    }


    jsontxt=jsontxt+colorTxt+isCMSTxt+isMoTTxt+"\n\t\t]\n\t}\n]";

    return jsontxt;
}
