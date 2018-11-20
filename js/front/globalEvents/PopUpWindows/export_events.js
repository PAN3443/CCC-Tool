


function closeExportWindow(){
  document.getElementById("id_PopUp_ExportWindow").style.display="none";
}

function openExportWindow(){


  if(globalCMS1.getKeyLength()==0)
  return;

  document.getElementById("id_PopUp_ExportWindow").style.display="block";
  document.getElementById("id_dropDownContainer").style.display="none";
  document.getElementById("id_selectProbeListExport").selectedIndex=0;

  if(globalCMS1.getProbeSetLength()==0){
    document.getElementById("exportprobeDiv").style.display="none";
  }
  else{
    document.getElementById("exportprobeDiv").style.display="flex";
  }

  intervalSize = parseFloat(document.getElementById("id_ExportIntervalNum").value);

  if(doTwinErrorSolution){
    twinErrorValue = globalCMS1.getRefRange()*twinError;
  }
  else{
    twinErrorValue=0;
  }

  changeExportColorspace(0);
  changeOutputformat(0);


  /// updateProbeList

  var selectbox = document.getElementById("id_selectProbeListExport");

  for(var i = selectbox.options.length - 1 ; i > 0 ; i--)
  {
      selectbox.remove(i);
  }


  for (var i = 0; i < globalCMS1.getProbeSetLength(); i++) {
    var opt = document.createElement('option');

    opt.innerHTML = "Probe-Set: "+globalCMS1.getProbeSet(i).getProbeSetName();

    selectbox.appendChild(opt);
  }

  document.getElementById("id_selectProbeListExport").selectedIndex=0;

}



function fillExportTable(){

    var workCMS;

    if(document.getElementById("id_selectProbeListExport").selectedIndex==-1){
      document.getElementById("id_selectProbeListExport").selectedIndex=0;
    }
    if(document.getElementById("id_selectProbeListExport").selectedIndex!=0){
        var probeSet = globalCMS1.getProbeSet(document.getElementById("id_selectProbeListExport").selectedIndex-1);
        workCMS = probeSet.generateProbeCMS(globalCMS1);
    }
    else{
        workCMS = cloneCMS(globalCMS1);
    }


    workCMS = calcCMSIntervals(workCMS,0,workCMS.getKeyLength()-1,globalIntervalMode);


    var old_tbody = document.getElementById("id_exportTableBody");
    var new_tbody = document.createElement('tbody');

    var counter = 1;

    for (var i = 0; i < workCMS.getKeyLength(); i++) {

      switch (workCMS.getKeyType(i)) {
        case "nil key": case "left key":

          if(i==workCMS.getKeyLength()-1){
            new_tbody.appendChild(createExportTableRow(counter,workCMS.getRefPosition(i), workCMS.getKeyType(i), workCMS.getLeftKeyColor(i,"rgb")));
            counter++;
          }
          else{


            if(workCMS.getKeyType(i)=="left key"){
            new_tbody.appendChild(createExportTableRow(counter,workCMS.getRefPosition(i), workCMS.getKeyType(i), workCMS.getLeftKeyColor(i,"rgb")));
            counter++;
            }

            new_tbody.appendChild(createExportTableRow(counter,workCMS.getRefPosition(i), workCMS.getKeyType(i), workCMS.getLeftKeyColor(i+1,"rgb")));
            counter++;

        }

        break;
        case "twin key":

          var intervalIndexA = workCMS.getIntervalPositions(i);
          new_tbody.appendChild(createExportTableRow(counter,workCMS.getRefPosition(i), workCMS.getKeyType(i), workCMS.getLeftKeyColor(i,"rgb")));
          counter++;
          new_tbody.appendChild(createExportTableRow(counter,workCMS.getRefPosition(i)+twinErrorValue, workCMS.getKeyType(i), workCMS.getRightKeyColor(i,"rgb")));
          counter++;

          for(var j=intervalIndexA[0]; j<=intervalIndexA[1]; j++){

            if(workCMS.getIntervalisKey(j))
            continue;

            new_tbody.appendChild(createExportTableRow(counter,workCMS.getIntervalRef(j), "interval", workCMS.getIntervalColor(j,"rgb")));
            counter++;
          }

          break;
        default:
          var intervalIndexA = workCMS.getIntervalPositions(i);
          new_tbody.appendChild(createExportTableRow(counter,workCMS.getRefPosition(i), workCMS.getKeyType(i), workCMS.getRightKeyColor(i,"rgb")));
          counter++;

          for(var j=intervalIndexA[0]; j<=intervalIndexA[1]; j++){

            if(workCMS.getIntervalisKey(j))
            continue;

            new_tbody.appendChild(createExportTableRow(counter,workCMS.getIntervalRef(j), "interval", workCMS.getIntervalColor(j,"rgb")));
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
  td.style.width = "5%";
  td.appendChild(document.createTextNode(counter));
  tr.appendChild(td);

  td = document.createElement('td')
  td.className = "class_tableInput";
  td.style.width = "20%";
  td.appendChild(document.createTextNode(ref));
  tr.appendChild(td);

  td = document.createElement('td')
  td.className = "class_tableInput";
  td.style.width = "10%";
  td.appendChild(document.createTextNode(type));
  tr.appendChild(td);

  td = document.createElement('td')
  td.className = "class_tableInput";
  td.style.width = "60%";
  td.appendChild(document.createTextNode(exportColorspace+"("+tmpColor.get1Value()+','+tmpColor.get2Value()+','+tmpColor.get3Value()+')'));
  tr.appendChild(td);

  td = document.createElement('td')
  td.className = "class_tableInput";
  td.style.width = "5%";
  td.style.background = tmpColor.getRGBString();
  tr.appendChild(td);

  return tr;
}





function changeExportColorspace(type){


  document.getElementById("button_ExportSpaceRGB").style.border = "0.2vh solid black";
  document.getElementById("button_ExportSpaceRGB").style.background = "rgb(220,220,220)";
  document.getElementById("button_ExportSpaceRGB").style.color = "black";
  document.getElementById("button_ExportSpaceHSV").style.border = "0.2vh solid black";
  document.getElementById("button_ExportSpaceHSV").style.background = "rgb(220,220,220)";
  document.getElementById("button_ExportSpaceHSV").style.color = "black";
  document.getElementById("button_ExportSpaceLAB").style.border = "0.2vh solid black";
  document.getElementById("button_ExportSpaceLAB").style.background = "rgb(220,220,220)";
  document.getElementById("button_ExportSpaceLAB").style.color = "black";
  document.getElementById("button_ExportSpaceDIN99").style.border = "0.2vh solid black";
  document.getElementById("button_ExportSpaceDIN99").style.background = "rgb(220,220,220)";
  document.getElementById("button_ExportSpaceDIN99").style.color = "black";


  switch (type) {
    case 0:
      exportColorspace = "rgb";
      document.getElementById("id_table_exportColor1").innerHTML = "Color (RGB)";
      document.getElementById("button_ExportSpaceRGB").style.border = "0.2vh solid rgb(76, 175, 80)"
      document.getElementById("button_ExportSpaceRGB").style.background = "rgb(76, 175, 80)";
      document.getElementById("button_ExportSpaceRGB").style.color = "white";
      break;
    case 1:
      exportColorspace = "hsv";
      document.getElementById("id_table_exportColor1").innerHTML = "Color (HSV)";
      document.getElementById("button_ExportSpaceHSV").style.border = "0.2vh solid rgb(76, 175, 80)"
      document.getElementById("button_ExportSpaceHSV").style.background = "rgb(76, 175, 80)";
      document.getElementById("button_ExportSpaceHSV").style.color = "white";
      break;
    case 2:
      exportColorspace = "lab";
      document.getElementById("id_table_exportColor1").innerHTML = "Color (LAB)";
      document.getElementById("button_ExportSpaceLAB").style.border = "0.2vh solid rgb(76, 175, 80)"
      document.getElementById("button_ExportSpaceLAB").style.background = "rgb(76, 175, 80)";
      document.getElementById("button_ExportSpaceLAB").style.color = "white";
      break;
    case 3:
      exportColorspace = "din99";
      document.getElementById("id_table_exportColor1").innerHTML = "Color (DIN99)";
      document.getElementById("button_ExportSpaceDIN99").style.border = "0.2vh solid rgb(76, 175, 80)"
      document.getElementById("button_ExportSpaceDIN99").style.background = "rgb(76, 175, 80)";
      document.getElementById("button_ExportSpaceDIN99").style.color = "white";
      break;
    default:
      return;
  }

    // Fill Table
    fillExportTable();

}


function changeOutputformat(type){

  document.getElementById("button_ExportFormatXML").style.border = "0.2vh solid black";
  document.getElementById("button_ExportFormatXML").style.background = "rgb(220,220,220)";
  document.getElementById("button_ExportFormatXML").style.color = "black";
  document.getElementById("button_ExportFormatCSV").style.border = "0.2vh solid black";
  document.getElementById("button_ExportFormatCSV").style.background = "rgb(220,220,220)";
  document.getElementById("button_ExportFormatCSV").style.color = "black";
  document.getElementById("button_ExportFormatJSON").style.border = "0.2vh solid black";
  document.getElementById("button_ExportFormatJSON").style.background = "rgb(220,220,220)";
  document.getElementById("button_ExportFormatJSON").style.color = "black";

  switch (type) {
    case 0:
      document.getElementById("button_ExportFormatCSV").style.border = "0.2vh solid rgb(76, 175, 80)"
      document.getElementById("button_ExportFormatCSV").style.background = "rgb(76, 175, 80)";
      document.getElementById("button_ExportFormatCSV").style.color = "white";
      break;
    case 1:
      document.getElementById("button_ExportFormatXML").style.border = "0.2vh solid rgb(76, 175, 80)"
      document.getElementById("button_ExportFormatXML").style.background = "rgb(76, 175, 80)";
      document.getElementById("button_ExportFormatXML").style.color = "white";
      break;
    case 2:
      document.getElementById("button_ExportFormatJSON").style.border = "0.2vh solid rgb(76, 175, 80)"
      document.getElementById("button_ExportFormatJSON").style.background = "rgb(76, 175, 80)";
      document.getElementById("button_ExportFormatJSON").style.color = "white";
      break;
    default:
      return;
  }

  outputFormat=type;

}

function changeTwinKeyIssue(){

  if(doTwinErrorSolution){
    doTwinErrorSolution=false;
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").innerHTML = "not active";

    document.getElementById("id_ExportPage_Button_TwinKeyIssue").style.border = "0.2vh solid black";
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").style.background = "rgb(220,220,220)";
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").style.color = "black";
  }
  else{
    doTwinErrorSolution=true;
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").innerHTML = "active";

    document.getElementById("id_ExportPage_Button_TwinKeyIssue").style.border = "0.2vh solid rgb(76, 175, 80)"
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").style.background = "rgb(76, 175, 80)";
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").style.color = "white";

  }

  if(doTwinErrorSolution){
    twinErrorValue = globalCMS1.getRefRange()*twinError;
  }
  else{
    twinErrorValue=0;
  }

  fillExportTable();


}

function downloadCMSFile(){

    var filename;
    var text;

    var workCMS;

    if(document.getElementById("id_selectProbeListExport").selectedIndex==-1){
      document.getElementById("id_selectProbeListExport").selectedIndex=0;
    }
    if(document.getElementById("id_selectProbeListExport").selectedIndex!=0){
      var probeSet = globalCMS1.getProbeSet(document.getElementById("id_selectProbeListExport").selectedIndex-1);
      workCMS = probeSet.generateProbeCMS(globalCMS1);
    }
    else{
        workCMS = cloneCMS(globalCMS1);
    }


    // because of the issur that Paraview can not handle the twin key with two colors at the same position we add a very small value to the position of the second color


     switch(outputFormat) {
        case 0:
            // lookup table
            filename = "ccc-tool_colormap_"+workCMS.getColormapName()+".csv";
            text = exportSide_createCSV_Lookup(workCMS);
            break;
        case 1:
            // xml
            filename = "ccc-tool_colormap_"+workCMS.getColormapName()+".xml";
            text = exportSide_createXML(workCMS);
            break;
        case 2:
            filename = "ccc-tool_colormap_"+workCMS.getColormapName()+".json";
            text = exportSide_createJSON(workCMS)
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

function exportSide_createXML(workCMS){

    workCMS = calcCMSIntervals(workCMS,0,workCMS.getKeyLength()-1,globalIntervalMode);

    var xmltext = "<ColorMaps>\n<ColorMap name=\""+workCMS.getColormapName()+"\" space=\"";

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

      xmltext = xmltext+createCMSText(workCMS,"xml");

      xmltext=xmltext+"</ColorMap>\n</ColorMaps>";
      return xmltext;
}

function exportSide_createCSV_Lookup(workCMS){

    var text = "";

    workCMS = calcCMSIntervals(workCMS,0,workCMS.getKeyLength()-1,globalIntervalMode);

    var opacityVal =1;
    var tmpColor2 = workCMS.getNaNColor(exportColorspace);
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

    text = text+createCMSText(workCMS,"csv");

    return text.substring(0, text.length - 1);
}

function createCMSText(workCMS,format){

  var text = "";
  for (var i = 0; i < workCMS.getKeyLength(); i++) {

    switch (workCMS.getKeyType(i)) {
      case "nil key": case "left key":

        if(i==workCMS.getKeyLength()-1)
          text = text+createLine(format,workCMS.getLeftKeyColor(i,exportColorspace),workCMS.getRefPosition(i),workCMS.getOpacityVal(i,"left"),true,true);
        else{

          var isMot=false;
          if(workCMS.getKeyType(i)=="left key"){
            if(workCMS.getMoT(i)==false){
              text = text+createLine(format,workCMS.getLeftKeyColor(i,exportColorspace),workCMS.getRefPosition(i),workCMS.getOpacityVal(i,"left"),true,true);
            }
            else{
              text = text+createLine(format,workCMS.getLeftKeyColor(i,exportColorspace),workCMS.getRefPosition(i),workCMS.getOpacityVal(i,"left"),true,false);
              isMot=true;
            }

          }
          text = text+createLine(format,workCMS.getLeftKeyColor(i+1,exportColorspace),workCMS.getRefPosition(i),workCMS.getOpacityVal(i,"right"),true,isMot)  ;


      }

      break;
      case "twin key":

        var isMot=false;
        if(workCMS.getMoT(i)==false){
          text = text+createLine(format,workCMS.getLeftKeyColor(i,exportColorspace),workCMS.getRefPosition(i),workCMS.getOpacityVal(i,"left"),true,true);
        }
        else{
          text = text+createLine(format,workCMS.getLeftKeyColor(i,exportColorspace),workCMS.getRefPosition(i),workCMS.getOpacityVal(i,"left"),true,false);
          isMot=true;
        }
        text = text+createLine(format,workCMS.getRightKeyColor(i,exportColorspace),workCMS.getRefPosition(i)+twinErrorValue,workCMS.getOpacityVal(i,"right"),true,isMot)  ;

        if(workCMS.getIntervalLength()==0)
        break;

        var intervalIndexA = workCMS.getIntervalPositions(i);
        var numOfIntervals = (intervalIndexA[1]+1)-(intervalIndexA[0]+1);
        var intervalOpacityStep = (workCMS.getOpacityVal(i+1,"left")-workCMS.getOpacityVal(i,"right"))/(numOfIntervals+1);

        for(var j=intervalIndexA[0]; j<=intervalIndexA[1]; j++){

          if(workCMS.getIntervalisKey(j))
          continue;

          var intervalOpacity = workCMS.getOpacityVal(i,"right")-(intervalOpacityStep*(j-intervalIndexA[0]));
          text = text+createLine(format,workCMS.getIntervalColor(j,exportColorspace),workCMS.getIntervalRef(j),intervalOpacity,false,false);
        }

        break;
      default:

        text = text+createLine(format,workCMS.getRightKeyColor(i,exportColorspace),workCMS.getRefPosition(i),workCMS.getOpacityVal(i,"right"),true,false);

        if(workCMS.getIntervalLength()==0)
        break;

        var intervalIndexA = workCMS.getIntervalPositions(i);
        var numOfIntervals = (intervalIndexA[1]+1)-(intervalIndexA[0]+1);
        var intervalOpacityStep = (workCMS.getOpacityVal(i+1,"left")-workCMS.getOpacityVal(i,"right"))/(numOfIntervals+1);

        for(var j=intervalIndexA[0]; j<=intervalIndexA[1]; j++){

          if(workCMS.getIntervalisKey(j))
          continue;

          var intervalOpacity = workCMS.getOpacityVal(i,"right")-(intervalOpacityStep*(j-intervalIndexA[0]));
          text = text+createLine(format,workCMS.getIntervalColor(j,exportColorspace),workCMS.getIntervalRef(j),intervalOpacity,false,false);
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



function exportSide_createJSON(workCMS){

    workCMS = calcCMSIntervals(workCMS,0,workCMS.getKeyLength()-1,globalIntervalMode);

    var jsontext = "[\n\t{\n\t\t\"ColorSpace\" : ";

    switch(globalCMS1.getInterpolationSpace()) {
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



    jsontext = jsontext+",\n\t\t\"Creator\" : \"CCC-Tool\",\n\t\t\"Name\" : \""+workCMS.getColormapName()+"\",\n\t\t\"NanColor\" : [";
    var tmpColor = workCMS.getNaNColor(exportColorspace);

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


    for (var i = 0; i < workCMS.getKeyLength(); i++) {

          switch (workCMS.getKeyType(i)) {
            case "nil key": case "left key":

              if(i==workCMS.getKeyLength()-1){
                colortext = colortext+createLine("json",workCMS.getLeftKeyColor(i,exportColorspace),workCMS.getRefPosition(i),workCMS.getOpacityVal(i,"left"),true,true);
                isCMStext=isCMStext+"\n\t\t\t"+true;
                isMoTtext=isMoTtext+"\n\t\t\t"+false;
              }
              else{

                var isMot=false;
                if(workCMS.getKeyType(i)=="left key"){
                  if(workCMS.getMoT(i)==false){
                    colortext = colortext+createLine("json",workCMS.getLeftKeyColor(i,exportColorspace),workCMS.getRefPosition(i),workCMS.getOpacityVal(i,"left"),true,true)+",";
                    isMoTtext=isMoTtext+"\n\t\t\t"+true+",";
                  }
                  else{
                    colortext = colortext+createLine("json",workCMS.getLeftKeyColor(i,exportColorspace),workCMS.getRefPosition(i),workCMS.getOpacityVal(i,"left"),true,false)+",";
                    isMot=true;
                    isMoTtext=isMoTtext+"\n\t\t\t"+false+",";
                  }

                  isCMStext=isCMStext+"\n\t\t\t"+true+",";


                }
                colortext = colortext+createLine("json",workCMS.getLeftKeyColor(i+1,exportColorspace),workCMS.getRefPosition(i),workCMS.getOpacityVal(i,"right"),true,isMot)+",";
                isCMStext=isCMStext+"\n\t\t\t"+true+",";
                isMoTtext=isMoTtext+"\n\t\t\t"+isMot+",";


            }

            break;
            case "twin key":
              var intervalIndexA = workCMS.getIntervalPositions(i);
              var numOfIntervals = (intervalIndexA[1]+1)-(intervalIndexA[0]+1);
              var intervalOpacityStep = (workCMS.getOpacityVal(i+1,"left")-workCMS.getOpacityVal(i,"right"))/(numOfIntervals+1);


              var isMot=false;

              isCMStext=isCMStext+"\n\t\t\t"+true+",";
              if(workCMS.getMoT(i)==false){
                colortext = colortext+createLine("json",workCMS.getLeftKeyColor(i,exportColorspace),workCMS.getRefPosition(i),workCMS.getOpacityVal(i,"left"),true,true)+",";
                isMoTtext=isMoTtext+"\n\t\t\t"+true+",";
              }
              else{
                colortext = colortext+createLine("json",workCMS.getLeftKeyColor(i,exportColorspace),workCMS.getRefPosition(i),workCMS.getOpacityVal(i,"left"),true,false)+",";
                isMot=true;
                isMoTtext=isMoTtext+"\n\t\t\t"+false+",";
              }

              colortext = colortext+createLine("json",workCMS.getRightKeyColor(i,exportColorspace),workCMS.getRefPosition(i)+twinErrorValue,workCMS.getOpacityVal(i,"right"),true,isMot)+",";
              isCMStext=isCMStext+"\n\t\t\t"+true+",";
              isMoTtext=isMoTtext+"\n\t\t\t"+isMot+",";


              for(var j=intervalIndexA[0]; j<=intervalIndexA[1]; j++){

                if(workCMS.getIntervalisKey(j))
                continue;

                var intervalOpacity = workCMS.getOpacityVal(i,"right")-(intervalOpacityStep*(j-intervalIndexA[0]));
                colortext = colortext+createLine("json",workCMS.getIntervalColor(j,exportColorspace),workCMS.getIntervalRef(j),intervalOpacity,false,false)+",";
                isCMStext=isCMStext+"\n\t\t\t"+false+",";
                isMoTtext=isMoTtext+"\n\t\t\t"+false+",";
              }



              break;
            default:
              var intervalIndexA = workCMS.getIntervalPositions(i);
              var numOfIntervals = (intervalIndexA[1]+1)-(intervalIndexA[0]+1);
              var intervalOpacityStep = (workCMS.getOpacityVal(i+1,"left")-workCMS.getOpacityVal(i,"right"))/(numOfIntervals+1);
              colortext = colortext+createLine("json",workCMS.getRightKeyColor(i,exportColorspace),workCMS.getRefPosition(i),workCMS.getOpacityVal(i,"right"),true,false)+",";
              isCMStext=isCMStext+"\n\t\t\t"+true+",";
              isMoTtext=isMoTtext+"\n\t\t\t"+false+",";


              for(var j=intervalIndexA[0]; j<=intervalIndexA[1]; j++){

                if(workCMS.getIntervalisKey(j))
                continue;

                var intervalOpacity = workCMS.getOpacityVal(i,"right")-(intervalOpacityStep*(j-intervalIndexA[0]));
                colortext = colortext+createLine("json",workCMS.getIntervalColor(j,exportColorspace),workCMS.getIntervalRef(j),intervalOpacity,false,false)+",";
                isCMStext=isCMStext+"\n\t\t\t"+false+",";
                isMoTtext=isMoTtext+"\n\t\t\t"+false+",";
              }


            }
          }


    jsontext=jsontext+colortext+isCMStext+isMoTtext+"\n\t\t]\n\t}\n]";

    return jsontext;
}
