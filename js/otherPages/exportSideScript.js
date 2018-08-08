function initExportWindow(){

  changeExportColorspace(0);

}


function fillExportTable(){

    globalCMS1.calcDeltaIntervalColors(intervalDelta, colorspaceModus,0,globalCMS1.getKeyLength()-1);

    var old_tbody = document.getElementById("id_exportTableBody");
    var new_tbody = document.createElement('tbody');

    var counter = 1;

    for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

      switch (globalCMS1.getKeyType(i)) {
        case "nil key": case "left key":

          if(i==globalCMS1.getKeyLength()-1){
            new_tbody.appendChild(createExportTableRow(counter,globalCMS1.getRefPosition(i), globalCMS1.getKeyType(i), globalCMS1.getLeftKeyColor(i,"rgb")));
            counter++;
          }
          else{


            if(globalCMS1.getKeyType(i)=="left key"){
            new_tbody.appendChild(createExportTableRow(counter,globalCMS1.getRefPosition(i), globalCMS1.getKeyType(i), globalCMS1.getLeftKeyColor(i,"rgb")));
            counter++;
            }

            new_tbody.appendChild(createExportTableRow(counter,globalCMS1.getRefPosition(i), globalCMS1.getKeyType(i), globalCMS1.getLeftKeyColor(i+1,"rgb")));
            counter++;

        }

        break;
        case "twin key":

          var intervalIndexA = globalCMS1.getIntervalPositions(i);
          new_tbody.appendChild(createExportTableRow(counter,globalCMS1.getRefPosition(i), globalCMS1.getKeyType(i), globalCMS1.getLeftKeyColor(i,"rgb")));
          counter++;
          new_tbody.appendChild(createExportTableRow(counter,globalCMS1.getRefPosition(i), globalCMS1.getKeyType(i), globalCMS1.getRightKeyColor(i,"rgb")));
          counter++;


          for(var j=intervalIndexA[0]; j<=intervalIndexA[1]; j++){

            if(globalCMS1.getIntervalisKey(j))
            continue;

            new_tbody.appendChild(createExportTableRow(counter,globalCMS1.getIntervalRef(j), "interval", globalCMS1.getIntervalColor(j,"rgb")));
            counter++;
          }

          break;
        default:
          var intervalIndexA = globalCMS1.getIntervalPositions(i);
          new_tbody.appendChild(createExportTableRow(counter,globalCMS1.getRefPosition(i), globalCMS1.getKeyType(i), globalCMS1.getRightKeyColor(i,"rgb")));
          counter++;

          for(var j=intervalIndexA[0]; j<=intervalIndexA[1]; j++){

            if(globalCMS1.getIntervalisKey(j))
            continue;

            new_tbody.appendChild(createExportTableRow(counter,globalCMS1.getIntervalRef(j), "interval", globalCMS1.getIntervalColor(j,"rgb")));
            counter++;
          }

        }
      }

    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
    new_tbody.id="id_exportTableBody";
}

function createExportTableRow(counter,ref, type, tmpColor){
  var tr = document.createElement('tr');

  var td = document.createElement('td')
  td.className = "class_tableInput";
  td.appendChild(document.createTextNode(counter));
  tr.appendChild(td);

  td = document.createElement('td')
  td.className = "class_tableInput";
  td.appendChild(document.createTextNode(ref));
  tr.appendChild(td);

  td = document.createElement('td')
  td.className = "class_tableInput";
  td.appendChild(document.createTextNode(type));
  tr.appendChild(td);

  td = document.createElement('td')
  td.className = "class_tableInput";
  td.appendChild(document.createTextNode(exportColorspace+"("+tmpColor.get1Value()+','+tmpColor.get2Value()+','+tmpColor.get3Value()+')'));
  tr.appendChild(td);

  td = document.createElement('td')
  td.className = "class_tableInput";
  td.style.background = tmpColor.getRGBString();
  tr.appendChild(td);

  return tr;
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
            filename = "ccc-tool_colormap_"+globalCMS1.getColormapName()+".csv";
            text = exportSide_createCSV_Lookup();
            break;
        case 1:
            // xml
            filename = "ccc-tool_colormap_"+globalCMS1.getColormapName()+".xml";
            text = exportSide_createXML();
            break;
        case 2:
            filename = "ccc-tool_colormap_"+globalCMS1.getColormapName()+".json";
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

    /*intervalSize = parseFloat(document.getElementById("id_InputIntervalExport").value);
    globalCMS1.calcIntervalColors(intervalSize, colorspaceModus);*/
    globalCMS1.calcDeltaIntervalColors(intervalDelta, colorspaceModus,0,globalCMS1.getKeyLength()-1);

    var xmltext = "<ColorMaps>\n<ColorMap name=\""+globalCMS1.getColormapName()+"\" space=\"";

    switch(exportColorspace) {
            case "rgb":
                xmltext = xmltext+"RGB";
                break;
            case "hsv":
                xmltext = xmltext+"HSV";
                break;
            case "lab":
                xmltext = xmltext+"LAB";
                break;
            case "din99":
                xmltext = xmltext+"DIN99";
                break;
            default:
                return;
    }

    xmltext = xmltext+"\" creator=\"CCC-Tool\">\n";

      xmltext = xmltext+createCMSText("xml");

      xmltext=xmltext+"</ColorMap>\n</ColorMaps>";
      return xmltext;
}

function exportSide_createCSV_Lookup(){

    var text = "";

    /*intervalSize = parseFloat(document.getElementById("id_InputIntervalExport").value);
    globalCMS1.calcIntervalColors(intervalSize, colorspaceModus);*/
    globalCMS1.calcDeltaIntervalColors(intervalDelta, colorspaceModus,0,globalCMS1.getKeyLength()-1);

    var opacityVal =1;
    var tmpColor2 = globalCMS1.getNaNColor(exportColorspace);
    switch(exportColorspace) {
            case "rgb":
                text = text+"Reference;R;G;B;Opacity;cms;isMoT;;NaN;R;"+tmpColor2.getRValue()+";G;"+tmpColor2.getGValue()+";B;"+tmpColor2.getBValue()+"\n";
                break;
            case "hsv":
                text = text+"Reference;H;S;V;Opacity;cms;isMoT;;NaN;H;"+tmpColor2.getHValue()+";S;"+tmpColor2.getSValue()+";V;"+tmpColor2.getVValue()+"\n";
                break;
            case "lab":
                text = text+"Reference;L;A;B;Opacity;cms;isMoT;;NaN;L;"+tmpColor2.getLValue()+";A;"+tmpColor2.getAValue()+";B;"+tmpColor2.getBValue()+"\n";
                break;
            case "din99":
                text = text+"Reference;L99;A99;B99;Opacity;cms;isMoT;;NaN;L99;"+tmpColor2.getL99Value()+";A99;"+tmpColor2.getA99Value()+";B99;"+tmpColor2.getB99Value()+"\n";
                break;
            default:
                return;
    }

    text = text+createCMSText("csv");

    return text.substring(0, text.length - 1);
}

function createCMSText(format){

  var text = "";
  for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

    switch (globalCMS1.getKeyType(i)) {
      case "nil key": case "left key":

        if(i==globalCMS1.getKeyLength()-1)
          text = text+createLine(format,globalCMS1.getLeftKeyColor(i,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"left"),true,true);
        else{

          var isMot=false;
          if(globalCMS1.getKeyType(i)=="left key"){
            if(globalCMS1.getMoT(i)==false){
              text = text+createLine(format,globalCMS1.getLeftKeyColor(i,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"left"),true,true);
            }
            else{
              text = text+createLine(format,globalCMS1.getLeftKeyColor(i,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"left"),true,false);
              isMot=true;
            }

          }
          text = text+createLine(format,globalCMS1.getLeftKeyColor(i+1,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"right"),true,isMot)  ;


      }

      break;
      case "twin key":

        var isMot=false;
        if(globalCMS1.getMoT(i)==false){
          text = text+createLine(format,globalCMS1.getLeftKeyColor(i,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"left"),true,true);
        }
        else{
          text = text+createLine(format,globalCMS1.getLeftKeyColor(i,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"left"),true,false);
          isMot=true;
        }
        text = text+createLine(format,globalCMS1.getRightKeyColor(i,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"right"),true,isMot)  ;

        if(globalCMS1.getIntervalLength()==0)
        break;

        var intervalIndexA = globalCMS1.getIntervalPositions(i);
        var numOfIntervals = (intervalIndexA[1]+1)-(intervalIndexA[0]+1);
        var intervalOpacityStep = (globalCMS1.getOpacityVal(i+1,"left")-globalCMS1.getOpacityVal(i,"right"))/(numOfIntervals+1);

        for(var j=intervalIndexA[0]; j<=intervalIndexA[1]; j++){

          if(globalCMS1.getIntervalisKey(j))
          continue;

          var intervalOpacity = globalCMS1.getOpacityVal(i,"right")-(intervalOpacityStep*(j-intervalIndexA[0]));
          text = text+createLine(format,globalCMS1.getIntervalColor(j,exportColorspace),globalCMS1.getIntervalRef(j),intervalOpacity,false,false);
        }

        break;
      default:

        text = text+createLine(format,globalCMS1.getRightKeyColor(i,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"right"),true,false);

        if(globalCMS1.getIntervalLength()==0)
        break;

        var intervalIndexA = globalCMS1.getIntervalPositions(i);
        var numOfIntervals = (intervalIndexA[1]+1)-(intervalIndexA[0]+1);
        var intervalOpacityStep = (globalCMS1.getOpacityVal(i+1,"left")-globalCMS1.getOpacityVal(i,"right"))/(numOfIntervals+1);

        for(var j=intervalIndexA[0]; j<=intervalIndexA[1]; j++){

          if(globalCMS1.getIntervalisKey(j))
          continue;

          var intervalOpacity = globalCMS1.getOpacityVal(i,"right")-(intervalOpacityStep*(j-intervalIndexA[0]));
          text = text+createLine(format,globalCMS1.getIntervalColor(j,exportColorspace),globalCMS1.getIntervalRef(j),intervalOpacity,false,false);
        }

      }
    }

    return text;

}

function createLine(format,tmpColor,refVal,opacityVal,isCMS,isMoT){
  var text = "";
  switch (format) {
    case "xml":
        switch(exportColorspace) {
           case "rgb":
               text="<Point x=\""+refVal+"\" o=\""+opacityVal+"\" r=\""+tmpColor.getRValue()+"\" g=\""+tmpColor.getGValue()+"\" b=\""+tmpColor.getBValue()+"\" cms=\""+isCMS+"\"";
               break;
           case "hsv":
               text="<Point x=\""+refVal+"\" o=\""+opacityVal+"\" h=\""+tmpColor.getHValue()+"\" s=\""+tmpColor.getSValue()+"\" v=\""+tmpColor.getVValue()+"\" cms=\""+isCMS+"\"";
               break;
           case "lab":
               text="<Point x=\""+refVal+"\" o=\""+opacityVal+"\" l=\""+tmpColor.getLValue()+"\" a=\""+tmpColor.getAValue()+"\" b=\""+tmpColor.getBValue()+"\" cms=\""+isCMS+"\"";
               break;
           case "din99":
               text="<Point x=\""+refVal+"\" o=\""+opacityVal+"\" l99=\""+tmpColor.getL99Value()+"\" a99=\""+tmpColor.getA99Value()+"\" b99=\""+tmpColor.getB99Value()+"\" cms=\""+isCMS+"\"";
               break;
           default:
               return;
       }

       /*if(isCMS)
        text=text+" isMoT=\""+isMoT+"\"";
       text=text+"/>\n";*/
       text=text+" isMoT=\""+isMoT+"\"/>\n";
      break;
    case "csv":
        switch(exportColorspace) {
           case "rgb":
               text=text+refVal+";"+tmpColor.getRValue()+";"+tmpColor.getGValue()+";"+tmpColor.getBValue()+";";
               break;
           case "hsv":
               text=text+refVal+";"+tmpColor.getHValue()+";"+tmpColor.getSValue()+";"+tmpColor.getVValue()+";";
               break;
           case "lab":
               text=text+refVal+";"+tmpColor.getLValue()+";"+tmpColor.getAValue()+";"+tmpColor.getBValue()+";";
               break;
           case "din99":
               text=text+refVal+";"+tmpColor.getL99Value()+";"+tmpColor.getA99Value()+";"+tmpColor.getB99Value()+";";
               break;
           default:
               return;
       }
       text=text+opacityVal+";"+isCMS+";"+isMoT+"\n";
      break;
    case "json":

        text=text+"\n\t\t\t"+refVal+",";

         switch(exportColorspace) {
            case "rgb":
                text=text+"\n\t\t\t"+tmpColor.getRValue()+",\n\t\t\t"+tmpColor.getGValue()+",\n\t\t\t"+tmpColor.getBValue();
                break;
            case "hsv":
                text=text+"\n\t\t\t"+tmpColor.getHValue()+",\n\t\t\t"+tmpColor.getSValue()+",\n\t\t\t"+tmpColor.getVValue();
                break;
            case "lab":
                text=text+"\n\t\t\t"+tmpColor.getLValue()+",\n\t\t\t"+tmpColor.getAValue()+",\n\t\t\t"+tmpColor.getBValue();
                break;
            case "din99":
                text=text+"\n\t\t\t"+tmpColor.getL99Value()+",\n\t\t\t"+tmpColor.getA99Value()+",\n\t\t\t"+tmpColor.getB99Value();
                break;
            default:
                return;
        }

      break;
    default:
  }



  return text;

}



function exportSide_createJSON(){

    /*intervalSize = parseFloat(document.getElementById("id_InputIntervalExport").value);
    globalCMS1.calcIntervalColors(intervalSize, colorspaceModus);*/
    globalCMS1.calcDeltaIntervalColors(intervalDelta, colorspaceModus,0,globalCMS1.getKeyLength()-1);

    var jsontext = "[\n\t{\n\t\t\"ColorSpace\" : ";

    switch(colorspaceModus) {
            case "rgb":
                jsontext = jsontext+"\"RGB\"";
                break;
            case "hsv":
                jsontext = jsontext+"\"HSV\"";
                break;
            case "lab":
                jsontext = jsontext+"\"Lab\"";
                break;
            case "din99":
                jsontext = jsontext+"\"DIN99\"";
                break;
            default:
                return;
    }



    jsontext = jsontext+",\n\t\t\"Creator\" : \"CCC-Tool\",\n\t\t\"Name\" : \""+globalCMS1.getColormapName()+"\",\n\t\t\"NanColor\" : [";
    var tmpColor = globalCMS1.getNaNColor(exportColorspace);

    switch(exportColorspace) {
            case "rgb":
                jsontext = jsontext+ tmpColor.get1Value() +","+tmpColor.get2Value()+","+tmpColor.get3Value()+"],\n\t\t\"RGBPoints\" : [";
                break;
            case "hsv":
                jsontext = jsontext+tmpColor.get1Value() +","+tmpColor.get2Value()+","+tmpColor.get3Value()+"],\n\t\t\"HSVPoints\" : [";
                break;
            case "lab":
                jsontext = jsontext+tmpColor.get1Value() +","+tmpColor.get2Value()+","+tmpColor.get3Value()+"],\n\t\t\"LabPoints\" : [";
                break;
            case "din99":
                jsontext = jsontext+tmpColor.get1Value() +","+tmpColor.get2Value()+","+tmpColor.get3Value()+"],\n\t\t\"DIN99Points\" : [";
                break;
            default:
                return;
    }


    var colortext ="";
    var isCMStext ="\n\t\t],\n\t\t\"isCMS\" : [";
    var isMoTtext="\n\t\t],\n\t\t\"isMoT\" : [";


    for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

          switch (globalCMS1.getKeyType(i)) {
            case "nil key": case "left key":

              if(i==globalCMS1.getKeyLength()-1){
                colortext = colortext+createLine("json",globalCMS1.getLeftKeyColor(i,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"left"),true,true);
                isCMStext=isCMStext+"\n\t\t\t"+true;
                isMoTtext=isMoTtext+"\n\t\t\t"+false;
              }
              else{

                var isMot=false;
                if(globalCMS1.getKeyType(i)=="left key"){
                  if(globalCMS1.getMoT(i)==false){
                    colortext = colortext+createLine("json",globalCMS1.getLeftKeyColor(i,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"left"),true,true)+",";
                    isMoTtext=isMoTtext+"\n\t\t\t"+true+",";
                  }
                  else{
                    colortext = colortext+createLine("json",globalCMS1.getLeftKeyColor(i,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"left"),true,false)+",";
                    isMot=true;
                    isMoTtext=isMoTtext+"\n\t\t\t"+false+",";
                  }

                  isCMStext=isCMStext+"\n\t\t\t"+true+",";


                }
                colortext = colortext+createLine("json",globalCMS1.getLeftKeyColor(i+1,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"right"),true,isMot)+",";
                isCMStext=isCMStext+"\n\t\t\t"+true+",";
                isMoTtext=isMoTtext+"\n\t\t\t"+isMot+",";


            }

            break;
            case "twin key":
              var intervalIndexA = globalCMS1.getIntervalPositions(i);
              var numOfIntervals = (intervalIndexA[1]+1)-(intervalIndexA[0]+1);
              var intervalOpacityStep = (globalCMS1.getOpacityVal(i+1,"left")-globalCMS1.getOpacityVal(i,"right"))/(numOfIntervals+1);

              var isMot=false;

              isCMStext=isCMStext+"\n\t\t\t"+true+",";
              if(globalCMS1.getMoT(i)==false){
                colortext = colortext+createLine("json",globalCMS1.getLeftKeyColor(i,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"left"),true,true)+",";
                isMoTtext=isMoTtext+"\n\t\t\t"+true+",";
              }
              else{
                colortext = colortext+createLine("json",globalCMS1.getLeftKeyColor(i,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"left"),true,false)+",";
                isMot=true;
                isMoTtext=isMoTtext+"\n\t\t\t"+false+",";
              }

              colortext = colortext+createLine("json",globalCMS1.getRightKeyColor(i,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"right"),true,isMot)+",";
              isCMStext=isCMStext+"\n\t\t\t"+true+",";
              isMoTtext=isMoTtext+"\n\t\t\t"+isMot+",";


              for(var j=intervalIndexA[0]; j<=intervalIndexA[1]; j++){

                if(globalCMS1.getIntervalisKey(j))
                continue;

                var intervalOpacity = globalCMS1.getOpacityVal(i,"right")-(intervalOpacityStep*(j-intervalIndexA[0]));
                colortext = colortext+createLine("json",globalCMS1.getIntervalColor(j,exportColorspace),globalCMS1.getIntervalRef(j),intervalOpacity,false,false)+",";
                isCMStext=isCMStext+"\n\t\t\t"+false+",";
                isMoTtext=isMoTtext+"\n\t\t\t"+false+",";
              }



              break;
            default:
              var intervalIndexA = globalCMS1.getIntervalPositions(i);
              var numOfIntervals = (intervalIndexA[1]+1)-(intervalIndexA[0]+1);
              var intervalOpacityStep = (globalCMS1.getOpacityVal(i+1,"left")-globalCMS1.getOpacityVal(i,"right"))/(numOfIntervals+1);
              colortext = colortext+createLine("json",globalCMS1.getRightKeyColor(i,exportColorspace),globalCMS1.getRefPosition(i),globalCMS1.getOpacityVal(i,"right"),true,false)+",";
              isCMStext=isCMStext+"\n\t\t\t"+true+",";
              isMoTtext=isMoTtext+"\n\t\t\t"+false+",";


              for(var j=intervalIndexA[0]; j<=intervalIndexA[1]; j++){

                if(globalCMS1.getIntervalisKey(j))
                continue;

                var intervalOpacity = globalCMS1.getOpacityVal(i,"right")-(intervalOpacityStep*(j-intervalIndexA[0]));
                colortext = colortext+createLine("json",globalCMS1.getIntervalColor(j,exportColorspace),globalCMS1.getIntervalRef(j),intervalOpacity,false,false)+",";
                isCMStext=isCMStext+"\n\t\t\t"+false+",";
                isMoTtext=isMoTtext+"\n\t\t\t"+false+",";
              }


            }
          }


    jsontext=jsontext+colortext+isCMStext+isMoTtext+"\n\t\t]\n\t}\n]";

    return jsontext;
}
