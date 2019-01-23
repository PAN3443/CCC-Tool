


function closeExportWindow(){
  document.getElementById("id_PopUp_ExportWindow").style.display="none";
}

function openExportWindow(){


  if(globalCMS1.getKeyLength()==0)
  return;

  document.getElementById("id_PopUp_ExportWindow").style.display="flex";
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
  changeOutputformat(1);

  if(doTwinErrorSolution){
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").style.background = styleActiveColor;
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").style.color=styleActiveColorFont;
  }
  else{
  document.getElementById("id_ExportPage_Button_TwinKeyIssue").style.background = styleNotActiveColor;
  document.getElementById("id_ExportPage_Button_TwinKeyIssue").style.color=styleNotActiveColorFont;
  }



  /// updateProbeList

  var selectbox = document.getElementById("id_selectProbeListExport");

  for(var i = selectbox.options.length - 1 ; i > 0 ; i--)
  {
      selectbox.remove(i);
  }


  for (var i = 0; i < globalCMS1.getProbeSetLength(); i++) {
    var opt = document.createElement('option');
    opt.style.fontSize = '1.8vh';
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
            new_tbody.appendChild(createExportTableRow(counter,workCMS.getRefPosition(i), workCMS.getKeyType(i), workCMS.getLeftKeyColor(i,exportColorspace)));
            counter++;
          }
          else{


            if(workCMS.getKeyType(i)=="left key"){
            new_tbody.appendChild(createExportTableRow(counter,workCMS.getRefPosition(i), workCMS.getKeyType(i), workCMS.getLeftKeyColor(i,exportColorspace)));
            counter++;
            }

            new_tbody.appendChild(createExportTableRow(counter,workCMS.getRefPosition(i), workCMS.getKeyType(i), workCMS.getLeftKeyColor(i+1,exportColorspace)));
            counter++;

        }

        break;
        case "twin key":

          var intervalIndexA = workCMS.getIntervalPositions(i);
          new_tbody.appendChild(createExportTableRow(counter,workCMS.getRefPosition(i), workCMS.getKeyType(i), workCMS.getLeftKeyColor(i,exportColorspace)));
          counter++;
          new_tbody.appendChild(createExportTableRow(counter,workCMS.getRefPosition(i)+twinErrorValue, workCMS.getKeyType(i), workCMS.getRightKeyColor(i,exportColorspace)));
          counter++;

          for(var j=intervalIndexA[0]; j<=intervalIndexA[1]; j++){

            if(workCMS.getIntervalisKey(j))
            continue;

            new_tbody.appendChild(createExportTableRow(counter,workCMS.getIntervalRef(j), "interval", workCMS.getIntervalColor(j,exportColorspace)));
            counter++;
          }

          break;
        default:
          var intervalIndexA = workCMS.getIntervalPositions(i);
          new_tbody.appendChild(createExportTableRow(counter,workCMS.getRefPosition(i), workCMS.getKeyType(i), workCMS.getRightKeyColor(i,exportColorspace)));
          counter++;

          for(var j=intervalIndexA[0]; j<=intervalIndexA[1]; j++){

            if(workCMS.getIntervalisKey(j))
            continue;

            new_tbody.appendChild(createExportTableRow(counter,workCMS.getIntervalRef(j), "interval", workCMS.getIntervalColor(j,exportColorspace)));
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
  td.style.background = tmpColor.calcRGBColor().getRGBString();
  tr.appendChild(td);

  return tr;
}





function changeExportColorspace(type){


  document.getElementById("button_ExportSpaceRGB").style.background = styleNotActiveColor;
  document.getElementById("button_ExportSpaceHSV").style.background = styleNotActiveColor;
  document.getElementById("button_ExportSpaceLAB").style.background = styleNotActiveColor;
  document.getElementById("button_ExportSpaceDIN99").style.background = styleNotActiveColor;

  document.getElementById("button_ExportSpaceRGB").style.color=styleNotActiveColorFont;
  document.getElementById("button_ExportSpaceHSV").style.color=styleNotActiveColorFont;
  document.getElementById("button_ExportSpaceLAB").style.color=styleNotActiveColorFont;
  document.getElementById("button_ExportSpaceDIN99").style.color=styleNotActiveColorFont;



  switch (type) {
    case 0:
      exportColorspace = "rgb";
      document.getElementById("id_table_exportColor1").innerHTML = "Color (RGB)";
      document.getElementById("button_ExportSpaceRGB").style.background = styleActiveColor;
      document.getElementById("button_ExportSpaceRGB").style.color=styleActiveColorFont;
      break;
    case 1:
      exportColorspace = "hsv";
      document.getElementById("id_table_exportColor1").innerHTML = "Color (HSV)";
      document.getElementById("button_ExportSpaceHSV").style.background = styleActiveColor;
      document.getElementById("button_ExportSpaceHSV").style.color=styleActiveColorFont;
      break;
    case 2:
      exportColorspace = "lab";
      document.getElementById("id_table_exportColor1").innerHTML = "Color (LAB)";
      document.getElementById("button_ExportSpaceLAB").style.background = styleActiveColor;
      document.getElementById("button_ExportSpaceLAB").style.color=styleActiveColorFont;
      break;
    case 3:
      exportColorspace = "din99";
      document.getElementById("id_table_exportColor1").innerHTML = "Color (DIN99)";
      document.getElementById("button_ExportSpaceDIN99").style.background = styleActiveColor;
      document.getElementById("button_ExportSpaceDIN99").style.color=styleActiveColorFont;
      break;
    default:
      return;
  }

    // Fill Table
    fillExportTable();

}


function changeOutputformat(type){


  document.getElementById("button_ExportFormatXML").style.background = styleNotActiveColor;
  document.getElementById("button_ExportFormatCSV").style.background = styleNotActiveColor;
  document.getElementById("button_ExportFormatJSON").style.background = styleNotActiveColor;

  document.getElementById("button_ExportFormatXML").style.color=styleNotActiveColorFont;
  document.getElementById("button_ExportFormatCSV").style.color=styleNotActiveColorFont;
  document.getElementById("button_ExportFormatJSON").style.color=styleNotActiveColorFont;

  switch (type) {
    case 0:
      document.getElementById("button_ExportFormatCSV").style.background = styleActiveColor;
      document.getElementById("button_ExportFormatCSV").style.color=styleActiveColorFont;
      break;
    case 1:
      document.getElementById("button_ExportFormatXML").style.background = styleActiveColor;
      document.getElementById("button_ExportFormatXML").style.color=styleActiveColorFont;
      break;
    case 2:
      document.getElementById("button_ExportFormatJSON").style.background = styleActiveColor;
      document.getElementById("button_ExportFormatJSON").style.color=styleActiveColorFont;
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
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").style.background = styleNotActiveColor;
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").style.color=styleNotActiveColorFont;
  }
  else{
    doTwinErrorSolution=true;
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").innerHTML = "active";

    document.getElementById("id_ExportPage_Button_TwinKeyIssue").style.background = styleActiveColor;
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").style.color=styleActiveColorFont;

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

    var txtNaN = "";
    var txtAbove = "";
    var txtBelow = "";

    switch(exportColorspace) {
            case "rgb":
                xmltext = xmltext+"RGB";
                txtNaN="<NaN r=\""+workCMS.getNaNColor("rgb").get1Value()+"\" g=\""+workCMS.getNaNColor("rgb").get2Value()+"\" b=\""+workCMS.getNaNColor("rgb").get3Value()+"\"/>\n";
                txtAbove="<Above r=\""+workCMS.getAboveColor("rgb").get1Value()+"\" g=\""+workCMS.getAboveColor("rgb").get2Value()+"\" b=\""+workCMS.getAboveColor("rgb").get3Value()+"\"/>\n";
                txtBelow="<Below r=\""+workCMS.getBelowColor("rgb").get1Value()+"\" g=\""+workCMS.getBelowColor("rgb").get2Value()+"\" b=\""+workCMS.getBelowColor("rgb").get3Value()+"\"/>\n";
                break;
            case "hsv":
                xmltext = xmltext+"HSV";
                txtNaN="<NaN h=\""+workCMS.getNaNColor("hsv").get1Value()+"\" s=\""+workCMS.getNaNColor("hsv").get2Value()+"\" v=\""+workCMS.getNaNColor("hsv").get3Value()+"\"/>\n";
                txtAbove="<Above h=\""+workCMS.getAboveColor("hsv").get1Value()+"\" s=\""+workCMS.getAboveColor("hsv").get2Value()+"\" v=\""+workCMS.getAboveColor("hsv").get3Value()+"\"/>\n";
                txtBelow="<Below h=\""+workCMS.getBelowColor("hsv").get1Value()+"\" s=\""+workCMS.getBelowColor("hsv").get2Value()+"\" v=\""+workCMS.getBelowColor("hsv").get3Value()+"\"/>\n";
                break;
            case "lab":
                xmltext = xmltext+"LAB";
                txtNaN="<NaN l=\""+workCMS.getNaNColor("lab").get1Value()+"\" a=\""+workCMS.getNaNColor("lab").get2Value()+"\" b=\""+workCMS.getNaNColor("lab").get3Value()+"\"/>\n";
                txtAbove="<Above l=\""+workCMS.getAboveColor("lab").get1Value()+"\" a=\""+workCMS.getAboveColor("lab").get2Value()+"\" b=\""+workCMS.getAboveColor("lab").get3Value()+"\"/>\n";
                txtBelow="<Below l=\""+workCMS.getBelowColor("lab").get1Value()+"\" a=\""+workCMS.getBelowColor("lab").get2Value()+"\" b=\""+workCMS.getBelowColor("lab").get3Value()+"\"/>\n";
                break;
            case "din99":
                xmltext = xmltext+"DIN99";
                txtNaN="<NaN l99=\""+workCMS.getNaNColor("din99").get1Value()+"\" a99=\""+workCMS.getNaNColor("din99").get2Value()+"\" b99=\""+workCMS.getNaNColor("din99").get3Value()+"\"/>\n";
                txtAbove="<Above l99=\""+workCMS.getAboveColor("din99").get1Value()+"\" a99=\""+workCMS.getAboveColor("din99").get2Value()+"\" b99=\""+workCMS.getAboveColor("din99").get3Value()+"\"/>\n";
                txtBelow="<Below l99=\""+workCMS.getBelowColor("din99").get1Value()+"\" a99=\""+workCMS.getBelowColor("din99").get2Value()+"\" b99=\""+workCMS.getBelowColor("din99").get3Value()+"\"/>\n";
                break;
            default:
                return;
    }

    xmltext = xmltext+"\" interpolationspace=\""+workCMS.getInterpolationSpace()+"\" creator=\"CCC-Tool\">\n";

      xmltext = xmltext+createCMSText(workCMS,"xml");

      xmltext = xmltext + txtNaN;
      xmltext = xmltext + txtAbove;
      xmltext = xmltext + txtBelow;

      xmltext = xmltext + createProbeSetText(workCMS,"xml");

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

function createProbeSetText(workCMS,format){


  var text = "";

    switch (format) {
      case "xml":

        for (var i = 0; i < workCMS.getProbeSetLength(); i++) {
          var tmpProbeSet = workCMS.getProbeSet(i);
          text=text+"<ProbeSet name=\""+tmpProbeSet.getProbeSetName()+"\">\n";

            for (var j = 0; j < tmpProbeSet.getProbeLength(); j++) {

                var tmpProbe = tmpProbeSet.getProbe(j);
                switch (tmpProbe.getType()) {
                  case 0: // const
                      text=text+"<Probe type=\""+tmpProbe.getType()+"\" start=\""+tmpProbe.getStartPos()+"\" end=\""+tmpProbe.getEndPos()+"\">\n";
                      var tmpColor = tmpProbe.getProbeColor();
                      text=text+"<ProbeColor h=\""+tmpColor.get1Value()+"\" s=\""+tmpColor.get2Value()+"\" v=\""+tmpColor.get3Value()+"\"/>\n";
                      text=text+"</Probe>\n";
                    break;
                  case 1: // one sided
                  case 2: // one sided trans

                    text=text+"<Probe type=\""+tmpProbe.getType()+"\" start=\""+tmpProbe.getStartPos()+"\" end=\""+tmpProbe.getEndPos()+"\">\n";

                    if(tmpProbe.getType()==1)
                    {
                      var tmpColor = tmpProbe.getProbeColor();
                      text=text+"<ProbeColor h=\""+tmpColor.get1Value()+"\" s=\""+tmpColor.get2Value()+"\" v=\""+tmpColor.get3Value()+"\"/>\n";
                    }

                    switch (tmpProbe.getFunctionType()) {
                      case 0: // val 100->0
                        text=text+"<ValueFunction r=\"0.0\" v=\"100.0\"/>\n";
                        text=text+"<ValueFunction r=\"1.0\" v=\"0.0\"/>\n";
                        break;
                        case 1: // val 0->100
                          text=text+"<ValueFunction r=\"0.0\" v=\"0.0\"/>\n";
                          text=text+"<ValueFunction r=\"1.0\" v=\"100.0\"/>\n";
                          break;
                          case 2: // sat 100->0
                          text=text+"<SaturationFunction r=\"0.0\" s=\"100.0\"/>\n";
                          text=text+"<SaturationFunction r=\"1.0\" s=\"0.0\"/>\n";
                            break;
                            case 3: // sat 0->100
                            text=text+"<SaturationFunction r=\"0.0\" s=\"0.0\"/>\n";
                            text=text+"<SaturationFunction r=\"1.0\" s=\"100.0\"/>\n";
                              break;
                      default:

                    }
                    text=text+"</Probe>\n";
                  break;

                  case 3: // two sided
                  case 4: // two sided trans

                    text=text+"<Probe type=\""+tmpProbe.getType()+"\" start=\""+tmpProbe.getStartPos()+"\" end=\""+tmpProbe.getEndPos()+"\">\n";

                    if(tmpProbe.getType()==3)
                    {
                      var tmpColor = tmpProbe.getProbeColor();
                      text=text+"<ProbeColor h=\""+tmpColor.get1Value()+"\" s=\""+tmpColor.get2Value()+"\" v=\""+tmpColor.get3Value()+"\"/>\n";
                    }

                    switch (tmpProbe.getFunctionType()) {
                      case 0: // val 0->100
                        text=text+"<ValueFunction r=\"0.0\" v=\"0.0\"/>\n";
                        text=text+"<ValueFunction r=\"1.0\" v=\"100.0\"/>\n";
                        text=text+"<SaturationFunction r=\"0.0\" s=\"0.0\"/>\n";
                        text=text+"<SaturationFunction r=\"0.5\" s=\"100.0\"/>\n";
                        text=text+"<SaturationFunction r=\"1.0\" s=\"0.0\"/>\n";
                        break;
                        case 1: // val 100->0
                        text=text+"<ValueFunction r=\"0.0\" v=\"100.0\"/>\n";
                        text=text+"<ValueFunction r=\"1.0\" v=\"0.0\"/>\n";
                        text=text+"<SaturationFunction r=\"0.0\" s=\"0.0\"/>\n";
                        text=text+"<SaturationFunction r=\"0.5\" s=\"100.0\"/>\n";
                        text=text+"<SaturationFunction r=\"1.0\" s=\"0.0\"/>\n";
                          break;
                          case 2: // sat 0->100
                          text=text+"<SaturationFunction r=\"0.0\" s=\"0.0\"/>\n";
                          text=text+"<SaturationFunction r=\"1.0\" s=\"100.0\"/>\n";
                          text=text+"<ValueFunction r=\"0.0\" v=\"100.0\"/>\n";
                          text=text+"<ValueFunction r=\"0.5\" v=\"0.0\"/>\n";
                          text=text+"<ValueFunction r=\"1.0\" v=\"100.0\"/>\n";
                            break;
                          case 3: // sat 100->0
                          text=text+"<SaturationFunction r=\"0.0\" s=\"100.0\"/>\n";
                          text=text+"<SaturationFunction r=\"1.0\" s=\"0.0\"/>\n";
                          text=text+"<ValueFunction r=\"0.0\" v=\"100.0\"/>\n";
                          text=text+"<ValueFunction r=\"0.5\" v=\"0.0\"/>\n";
                          text=text+"<ValueFunction r=\"1.0\" v=\"100.0\"/>\n";
                            break;
                            case 4: // sat 0->100
                            text=text+"<SaturationFunction r=\"0.0\" s=\"0.0\"/>\n";
                            text=text+"<SaturationFunction r=\"1.0\" s=\"100.0\"/>\n";
                            text=text+"<ValueFunction r=\"0.0\" v=\"0.0\"/>\n";
                            text=text+"<ValueFunction r=\"0.5\" v=\"100.0\"/>\n";
                            text=text+"<ValueFunction r=\"1.0\" v=\"0.0\"/>\n";
                              break;
                            case 5: // sat 100->0
                            text=text+"<SaturationFunction r=\"0.0\" s=\"100.0\"/>\n";
                            text=text+"<SaturationFunction r=\"1.0\" s=\"0.0\"/>\n";
                            text=text+"<ValueFunction r=\"0.0\" v=\"0.0\"/>\n";
                            text=text+"<ValueFunction r=\"0.5\" v=\"100.0\"/>\n";
                            text=text+"<ValueFunction r=\"1.0\" v=\"0.0\"/>\n";
                              break;
                      default:

                    }
                    text=text+"</Probe>\n";
                  break;


                  default:

                }


            }
          text=text+"</ProbeSet>\n";
        }

        break;

      default:
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
