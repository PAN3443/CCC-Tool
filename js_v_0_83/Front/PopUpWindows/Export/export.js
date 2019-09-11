

function changeIntervalOption(type){

  document.getElementById("button_ExportOnlyKeys").classList.remove("class_generalbuttonActive");
  document.getElementById("button_ExportKeysAndIntervals").classList.remove("class_generalbuttonActive");

  document.getElementById("button_ExportOnlyKeys").classList.add("class_generalbutton");
  document.getElementById("button_ExportKeysAndIntervals").classList.add("class_generalbutton");


  if(type==0){
    document.getElementById("button_ExportOnlyKeys").classList.remove("class_generalbutton");
    document.getElementById("button_ExportOnlyKeys").classList.add("class_generalbuttonActive");
    exportOnlyKeys=true;

    document.getElementById("id_Export_NumIntervalDiv").style.display = "none";
    document.getElementById("id_ExportIntervalNum").value = 1;
    intervalSize = parseFloat(document.getElementById("id_ExportIntervalNum").value);
  }
  else{
    document.getElementById("button_ExportKeysAndIntervals").classList.remove("class_generalbutton");
    document.getElementById("button_ExportKeysAndIntervals").classList.add("class_generalbuttonActive");
    exportOnlyKeys=false;
    document.getElementById("id_ExportIntervalNum").value = 100;
    intervalSize = parseFloat(document.getElementById("id_ExportIntervalNum").value);
    document.getElementById("id_Export_NumIntervalDiv").style.display = "flex";
  }

  // Fill Table
  fillExportTable();
}

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

  changeIntervalOption(1);
  changeExportColorspace(1);
  changeOutputformat(1);

  if(doTwinErrorSolution){
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").classList.remove("class_generalbutton");
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").classList.add("class_generalbuttonActive");
  }
  else{
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").classList.remove("class_generalbuttonActive");
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").classList.add("class_generalbutton");
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

  var className = "class_tableInput";
  if(counter%2==1){
    className = "class_tableInputDark";
  }

  var td = document.createElement('td')
  td.className = className;
  td.style.width = "5%";
  td.appendChild(document.createTextNode(counter));
  tr.appendChild(td);

  td = document.createElement('td')
  td.className = className;
  td.style.width = "20%";
  td.appendChild(document.createTextNode(ref));
  tr.appendChild(td);

  td = document.createElement('td')
  td.className = className;
  td.style.width = "10%";
  td.appendChild(document.createTextNode(type));
  tr.appendChild(td);

  td = document.createElement('td')
  td.className = className;
  td.style.width = "60%";
  td.appendChild(document.createTextNode(exportColorspace+"("+tmpColor.get1Value()*scaleExpVal1+','+tmpColor.get2Value()*scaleExpVal2+','+tmpColor.get3Value()*scaleExpVal3+')'));
  tr.appendChild(td);

  td = document.createElement('td')
  td.className = className;
  td.style.width = "5%";
  td.style.background = tmpColor.calcRGBColor().getRGBString();
  tr.appendChild(td);

  tmpColor.deleteReferences();
  tmpColor=null;
  return tr;
}

function changeExportColorspace(type){

  document.getElementById("button_ExportSpaceRGB").classList.remove("class_generalbuttonActive");
  document.getElementById("button_ExportSpaceRGBRatio").classList.remove("class_generalbuttonActive");
  document.getElementById("button_ExportSpaceHSV").classList.remove("class_generalbuttonActive");
  document.getElementById("button_ExportSpaceHSVRatio").classList.remove("class_generalbuttonActive");
  document.getElementById("button_ExportSpaceLAB").classList.remove("class_generalbuttonActive");
  document.getElementById("button_ExportSpaceLCh").classList.remove("class_generalbuttonActive");
  document.getElementById("button_ExportSpaceDIN99").classList.remove("class_generalbuttonActive");

  document.getElementById("button_ExportSpaceRGB").classList.add("class_generalbutton");
  document.getElementById("button_ExportSpaceRGBRatio").classList.add("class_generalbutton");
  document.getElementById("button_ExportSpaceHSV").classList.add("class_generalbutton");
  document.getElementById("button_ExportSpaceHSVRatio").classList.add("class_generalbutton");
  document.getElementById("button_ExportSpaceLAB").classList.add("class_generalbutton");
  document.getElementById("button_ExportSpaceLCh").classList.add("class_generalbutton");
  document.getElementById("button_ExportSpaceDIN99").classList.add("class_generalbutton");

  scaleExpVal1=1;
  scaleExpVal2=1;
  scaleExpVal3=1;

  switch (type) {
    case 0:
      exportColorspace = "rgb";
      document.getElementById("id_table_exportColor1").innerHTML = "RGB-Color (0-255,0-255,0-255)";
      document.getElementById("button_ExportSpaceRGB").classList.remove("class_generalbutton");
      document.getElementById("button_ExportSpaceRGB").classList.add("class_generalbuttonActive");
      scaleExpVal1=255;
      scaleExpVal2=255;
      scaleExpVal3=255;
      break;
    case 1:
      exportColorspace = "rgb";
      document.getElementById("id_table_exportColor1").innerHTML = "RGB-Color (0-1,0-1,0-1)";
      document.getElementById("button_ExportSpaceRGBRatio").classList.remove("class_generalbutton");
      document.getElementById("button_ExportSpaceRGBRatio").classList.add("class_generalbuttonActive");
      break;
    case 2:
      exportColorspace = "hsv";
      document.getElementById("id_table_exportColor1").innerHTML = "HSV-Color (0-360,0-100,0-100)";
      document.getElementById("button_ExportSpaceHSV").classList.remove("class_generalbutton");
      document.getElementById("button_ExportSpaceHSV").classList.add("class_generalbuttonActive");
      scaleExpVal1=360;
      scaleExpVal2=100;
      scaleExpVal3=100;
      break;
    case 3:
      exportColorspace = "hsv";
      document.getElementById("id_table_exportColor1").innerHTML = "HSV-Color (0-1,0-1,0-1)";
      document.getElementById("button_ExportSpaceHSVRatio").classList.remove("class_generalbutton");
      document.getElementById("button_ExportSpaceHSVRatio").classList.add("class_generalbuttonActive");
      break;
    case 4:
      exportColorspace = "lab";
      document.getElementById("id_table_exportColor1").innerHTML = "LAB-Color (0-100,-128-128,-128-128)";
      document.getElementById("button_ExportSpaceLAB").classList.remove("class_generalbutton");
      document.getElementById("button_ExportSpaceLAB").classList.add("class_generalbuttonActive");
      break;
    case 5:
      exportColorspace = "lch";
      document.getElementById("id_table_exportColor1").innerHTML = "LCH-Color (0-100,0-100,0-360)";
      document.getElementById("button_ExportSpaceLCh").classList.remove("class_generalbutton");
      document.getElementById("button_ExportSpaceLCh").classList.add("class_generalbuttonActive");
      scaleExpVal1=100;
      scaleExpVal2=100;
      scaleExpVal3=360;
      break;
    case 6:
      exportColorspace = "din99";
      document.getElementById("id_table_exportColor1").innerHTML = "DIN99-Color";
      document.getElementById("button_ExportSpaceDIN99").classList.remove("class_generalbutton");
      document.getElementById("button_ExportSpaceDIN99").classList.add("class_generalbuttonActive");
      break;
    default:
      return;
  }

    // Fill Table
    fillExportTable();

}

function changeOutputformat(type){

  document.getElementById("button_ExportFormatXML").classList.remove("class_generalbuttonActive");
  document.getElementById("button_ExportFormatCSV").classList.remove("class_generalbuttonActive");
  document.getElementById("button_ExportFormatJSON").classList.remove("class_generalbuttonActive");
  document.getElementById("button_ExportFormatPNGH").classList.remove("class_generalbuttonActive");
  document.getElementById("button_ExportFormatPNGV").classList.remove("class_generalbuttonActive");

  document.getElementById("button_ExportFormatXML").classList.add("class_generalbutton");
  document.getElementById("button_ExportFormatCSV").classList.add("class_generalbutton");
  document.getElementById("button_ExportFormatJSON").classList.add("class_generalbutton");
  document.getElementById("button_ExportFormatPNGH").classList.add("class_generalbutton");
  document.getElementById("button_ExportFormatPNGV").classList.add("class_generalbutton");

  document.getElementById("button_ExportSpaceRGB").style.display = "none";
  document.getElementById("button_ExportSpaceHSV").style.display = "none";
  document.getElementById("button_ExportSpaceHSVRatio").style.display = "none";
  document.getElementById("button_ExportSpaceLAB").style.display = "none";
  document.getElementById("button_ExportSpaceLCh").style.display = "none";
  document.getElementById("button_ExportSpaceDIN99").style.display = "none";

  document.getElementById("id_exportOptionsDiv").style.display = "block";
  document.getElementById("id_exportPNG_Info").style.display = "none";


  outputFormat=type;

  switch (type) {
    case 0:
      document.getElementById("button_ExportFormatCSV").classList.remove("class_generalbutton");
      document.getElementById("button_ExportFormatCSV").classList.add("class_generalbuttonActive");
      document.getElementById("button_ExportSpaceRGB").style.display = "block";
      document.getElementById("button_ExportSpaceHSV").style.display = "block";
      document.getElementById("button_ExportSpaceHSVRatio").style.display = "block";
      document.getElementById("button_ExportSpaceLAB").style.display = "block";
      document.getElementById("button_ExportSpaceLCh").style.display = "block";
      document.getElementById("button_ExportSpaceDIN99").style.display = "block";
      break;
    case 1:
      document.getElementById("button_ExportFormatXML").classList.remove("class_generalbutton");
      document.getElementById("button_ExportFormatXML").classList.add("class_generalbuttonActive");
      changeExportColorspace(1);
      break;
    case 2:
      document.getElementById("button_ExportFormatJSON").classList.remove("class_generalbutton");
      document.getElementById("button_ExportFormatJSON").classList.add("class_generalbuttonActive");
      changeExportColorspace(1);
      break;
    case 3:
      document.getElementById("button_ExportFormatPNGH").classList.remove("class_generalbutton");
      document.getElementById("button_ExportFormatPNGH").classList.add("class_generalbuttonActive");
      document.getElementById("id_exportOptionsDiv").style.display = "none";
      document.getElementById("id_exportPNG_Info").style.display = "block";
      break;
    case 4:
      document.getElementById("button_ExportFormatPNGV").classList.remove("class_generalbutton");
      document.getElementById("button_ExportFormatPNGV").classList.add("class_generalbuttonActive");
      document.getElementById("id_exportOptionsDiv").style.display = "none";
      document.getElementById("id_exportPNG_Info").style.display = "block";
      break;
  }



}

function changeTwinKeyIssue(){

  if(doTwinErrorSolution){
    doTwinErrorSolution=false;
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").innerHTML = "not active";
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").classList.remove("class_generalbuttonActive");
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").classList.add("class_generalbutton");
  }
  else{
    doTwinErrorSolution=true;
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").innerHTML = "active";
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").classList.remove("class_generalbutton");
    document.getElementById("id_ExportPage_Button_TwinKeyIssue").classList.add("class_generalbuttonActive");
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

    if(outputFormat==3 || outputFormat==4){

      var imageData = undefined;

      switch(outputFormat) {
         case 3:
           filename = "ccc-tool_colormap_horizontal_"+workCMS.getColormapName()+".png";
           imageData = exportSide_createPNG(workCMS,false)
           break;
         case 4:
           filename = "ccc-tool_colormap_vertical_"+workCMS.getColormapName()+".png";
           imageData = exportSide_createPNG(workCMS,true)
           break;
     }

     var element = document.createElement('a');
     element.href = document.getElementById("id_exportPNGCanvas").toDataURL("image/png")
       .replace("image/png", "image/octet-stream");
     element.download=filename;

     element.style.display = 'none';
     document.body.appendChild(element);

     element.click();

     document.body.removeChild(element);
    }
    else {
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
     }

     var element = document.createElement('a');
     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
     element.setAttribute('download', filename);

     element.style.display = 'none';
     document.body.appendChild(element);

     element.click();

     document.body.removeChild(element);
    }




}

function exportSide_createXML(workCMS){

    workCMS = calcCMSIntervals(workCMS,0,workCMS.getKeyLength()-1,globalIntervalMode);
    var xmltext = "<ColorMaps>\n<ColorMap name=\""+workCMS.getColormapName()+"\" space=\"";
    var txtNaN = "";
    var txtAbove = "";
    var txtBelow = "";

    var nanColor = workCMS.getNaNColor(exportColorspace);
    var aboveColor =  workCMS.getAboveColor(exportColorspace);
    var belowColor = workCMS.getBelowColor(exportColorspace);

    switch(exportColorspace) {
            case "rgb":
                xmltext = xmltext+"RGB";
                txtNaN="<NaN r=\""+nanColor.get1Value()*scaleExpVal1+"\" g=\""+nanColor.get2Value()*scaleExpVal2+"\" b=\""+nanColor.get3Value()*scaleExpVal3+"\"/>\n";
                txtAbove="<Above r=\""+aboveColor.get1Value()*scaleExpVal1+"\" g=\""+aboveColor.get2Value()*scaleExpVal2+"\" b=\""+aboveColor.get3Value()*scaleExpVal3+"\"/>\n";
                txtBelow="<Below r=\""+belowColor.get1Value()*scaleExpVal1+"\" g=\""+belowColor.get2Value()*scaleExpVal2+"\" b=\""+belowColor.get3Value()*scaleExpVal3+"\"/>\n";
                break;
            case "hsv":
                xmltext = xmltext+"HSV";
                txtNaN="<NaN h=\""+nanColor.get1Value()*scaleExpVal1+"\" s=\""+nanColor.get2Value()*scaleExpVal2+"\" v=\""+nanColor.get3Value()*scaleExpVal3+"\"/>\n";
                txtAbove="<Above h=\""+aboveColor.get1Value()*scaleExpVal1+"\" s=\""+aboveColor.get2Value()*scaleExpVal2+"\" v=\""+aboveColor.get3Value()*scaleExpVal3+"\"/>\n";
                txtBelow="<Below h=\""+belowColor.get1Value()*scaleExpVal1+"\" s=\""+belowColor.get2Value()*scaleExpVal2+"\" v=\""+belowColor.get3Value()*scaleExpVal3+"\"/>\n";
                break;
            case "lab":
                xmltext = xmltext+"LAB";
                txtNaN="<NaN l=\""+nanColor.get1Value()+"\" a=\""+nanColor.get2Value()+"\" b=\""+nanColor.get3Value()+"\"/>\n";
                txtAbove="<Above l=\""+aboveColor.get1Value()+"\" a=\""+aboveColor.get2Value()+"\" b=\""+aboveColor.get3Value()+"\"/>\n";
                txtBelow="<Below l=\""+belowColor.get1Value()+"\" a=\""+belowColor.get2Value()+"\" b=\""+belowColor.get3Value()+"\"/>\n";
                break;
            case "lch":
                xmltext = xmltext+"LCH";
                txtNaN="<NaN l=\""+nanColor.get1Value()*scaleExpVal1+"\" c=\""+nanColor.get2Value()*scaleExpVal2+"\" h=\""+nanColor.get3Value()*scaleExpVal3+"\"/>\n";
                txtAbove="<Above l=\""+aboveColor.get1Value()*scaleExpVal1+"\" c=\""+aboveColor.get2Value()*scaleExpVal2+"\" h=\""+aboveColor.get3Value()*scaleExpVal3+"\"/>\n";
                txtBelow="<Below l=\""+belowColor.get1Value()*scaleExpVal1+"\" c=\""+belowColor.get2Value()*scaleExpVal2+"\" h=\""+belowColor.get3Value()*scaleExpVal3+"\"/>\n";
                break;
            case "din99":
                xmltext = xmltext+"DIN99";
                txtNaN="<NaN l99=\""+nanColor.get1Value()+"\" a99=\""+nanColor.get2Value()+"\" b99=\""+nanColor.get3Value()+"\"/>\n";
                txtAbove="<Above l99=\""+aboveColor.get1Value()+"\" a99=\""+aboveColor.get2Value()+"\" b99=\""+aboveColor.get3Value()+"\"/>\n";
                txtBelow="<Below l99=\""+belowColor.get1Value()+"\" a99=\""+belowColor.get2Value()+"\" b99=\""+belowColor.get3Value()+"\"/>\n";
                break;
            default:
                return;
    }

    nanColor.deleteReferences();
    aboveColor.deleteReferences();
    belowColor.deleteReferences();

    nanColor=null;
    aboveColor=null;
    belowColor=null;

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
    var tmpColor3 = workCMS.getAboveColor(exportColorspace);
    var tmpColor4 = workCMS.getBelowColor(exportColorspace);
    switch(exportColorspace) {
            case "rgb":
                text = text+"Reference;R;G;B;Opacity;cms;isMoT;NaN;R;"+tmpColor2.getRValue()*scaleExpVal1+";G;"+tmpColor2.getGValue()*scaleExpVal2+";B;"+tmpColor2.getBValue()*scaleExpVal3+";Above;R;"+tmpColor3.get1Value()*scaleExpVal1+";G;"+tmpColor3.get2Value()*scaleExpVal2+";B;"+tmpColor3.get3Value()*scaleExpVal3+";Below;R;"+tmpColor4.get1Value()*scaleExpVal1+";G;"+tmpColor4.get2Value()*scaleExpVal2+";B;"+tmpColor4.get3Value()*scaleExpVal3+"\n";
                break;
            case "hsv":
                text = text+"Reference;H;S;V;Opacity;cms;isMoT;NaN;H;"+tmpColor2.getHValue()*scaleExpVal1+";S;"+tmpColor2.getSValue()*scaleExpVal2+";V;"+tmpColor2.getVValue()*scaleExpVal3+";Above;H;"+tmpColor3.get1Value()*scaleExpVal1+";S;"+tmpColor3.get2Value()*scaleExpVal2+";V;"+tmpColor3.get3Value()*scaleExpVal3+";Below;H;"+tmpColor4.get1Value()*scaleExpVal1+";S;"+tmpColor4.get2Value()*scaleExpVal2+";V;"+tmpColor4.get3Value()*scaleExpVal3+"\n";
                break;
            case "lab":
                text = text+"Reference;L;A;B;Opacity;cms;isMoT;NaN;L;"+tmpColor2.getLValue()+";A;"+tmpColor2.getAValue()+";B;"+tmpColor2.getBValue()+";Above;L;"+tmpColor3.get1Value()+";A;"+tmpColor3.get2Value()+";B;"+tmpColor3.get3Value()+";Below;L;"+tmpColor4.get1Value()+";A;"+tmpColor4.get2Value()+";B;"+tmpColor4.get3Value()+"\n";
                break;
            case "lch":
                text = text+"Reference;L;C;H;Opacity;cms;isMoT;NaN;L;"+tmpColor2.getLValue()*scaleExpVal1+";C;"+tmpColor2.getCValue()*scaleExpVal2+";H;"+tmpColor2.getHValue()*scaleExpVal3+";Above;L;"+tmpColor3.get1Value()*scaleExpVal1+";C;"+tmpColor3.get2Value()*scaleExpVal2+";H;"+tmpColor3.get3Value()*scaleExpVal3+";Below;L;"+tmpColor4.get1Value()*scaleExpVal1+";C;"+tmpColor4.get2Value()*scaleExpVal2+";H;"+tmpColor4.get3Value()*scaleExpVal3+"\n";
                break;
            case "din99":
                text = text+"Reference;L99;A99;B99;Opacity;cms;isMoT;NaN;L99;"+tmpColor2.get1Value()+";A99;"+tmpColor2.get2Value()+";B99;"+tmpColor2.get3Value()+";Above;L99;"+tmpColor3.get1Value()+";A99;"+tmpColor3.get2Value()+";B99;"+tmpColor3.get3Value()+";Below;L99;"+tmpColor4.get1Value()+";A99;"+tmpColor4.get2Value()+";B99;"+tmpColor4.get3Value()+"\n";
                break;
            default:
                return;
    }

    tmpColor2.deleteReferences();
    tmpColor3.deleteReferences();
    tmpColor4.deleteReferences();

    tmpColor2=null;
    tmpColor3=null;
    tmpColor4=null;

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
                      tmpColor.deleteReferences();
                      tmpColor=null;
                    break;
                  case 1: // one sided
                  case 2: // one sided trans

                    text=text+"<Probe type=\""+tmpProbe.getType()+"\" start=\""+tmpProbe.getStartPos()+"\" end=\""+tmpProbe.getEndPos()+"\">\n";

                    if(tmpProbe.getType()==1)
                    {
                      var tmpColor = tmpProbe.getProbeColor();
                      text=text+"<ProbeColor h=\""+tmpColor.get1Value()+"\" s=\""+tmpColor.get2Value()+"\" v=\""+tmpColor.get3Value()+"\"/>\n";
                      tmpColor.deleteReferences();
                      tmpColor=null;
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
                      tmpColor.deleteReferences();
                      tmpColor=null;
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
               text="<Point x=\""+refVal+"\" o=\""+opacityVal+"\" r=\""+tmpColor.getRValue()*scaleExpVal1+"\" g=\""+tmpColor.getGValue()*scaleExpVal2+"\" b=\""+tmpColor.getBValue()*scaleExpVal3+"\" cms=\""+isCMS+"\"";
               break;
           case "hsv":
               text="<Point x=\""+refVal+"\" o=\""+opacityVal+"\" h=\""+tmpColor.getHValue()*scaleExpVal1+"\" s=\""+tmpColor.getSValue()*scaleExpVal2+"\" v=\""+tmpColor.getVValue()*scaleExpVal3+"\" cms=\""+isCMS+"\"";
               break;
           case "lab":
               text="<Point x=\""+refVal+"\" o=\""+opacityVal+"\" l=\""+tmpColor.getLValue()+"\" a=\""+tmpColor.getAValue()+"\" b=\""+tmpColor.getBValue()+"\" cms=\""+isCMS+"\"";
               break;
           case "lch":
               text="<Point x=\""+refVal+"\" o=\""+opacityVal+"\" l=\""+tmpColor.getLValue()*scaleExpVal1+"\" c=\""+tmpColor.getCValue()*scaleExpVal2+"\" h=\""+tmpColor.getHValue()*scaleExpVal3+"\" cms=\""+isCMS+"\"";
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
               text=text+refVal+";"+tmpColor.getRValue()*scaleExpVal1+";"+tmpColor.getGValue()*scaleExpVal2+";"+tmpColor.getBValue()*scaleExpVal3+";";
               break;
           case "hsv":
               text=text+refVal+";"+tmpColor.getHValue()*scaleExpVal1+";"+tmpColor.getSValue()*scaleExpVal2+";"+tmpColor.getVValue()*scaleExpVal3+";";
               break;
           case "lab":
               text=text+refVal+";"+tmpColor.getLValue()+";"+tmpColor.getAValue()+";"+tmpColor.getBValue()+";";
               break;
          case "lch":
               text=text+refVal+";"+tmpColor.getLValue()*scaleExpVal1+";"+tmpColor.getCValue()*scaleExpVal2+";"+tmpColor.getHValue()*scaleExpVal3+";";
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
                text=text+"\n\t\t\t"+tmpColor.getRValue()*scaleExpVal1+",\n\t\t\t"+tmpColor.getGValue()*scaleExpVal2+",\n\t\t\t"+tmpColor.getBValue()*scaleExpVal3;
                break;
            case "hsv":
                text=text+"\n\t\t\t"+tmpColor.getHValue()*scaleExpVal1+",\n\t\t\t"+tmpColor.getSValue()*scaleExpVal2+",\n\t\t\t"+tmpColor.getVValue()*scaleExpVal3;
                break;
            case "lab":
                text=text+"\n\t\t\t"+tmpColor.getLValue()+",\n\t\t\t"+tmpColor.getAValue()+",\n\t\t\t"+tmpColor.getBValue();
                break;
            case "lch":
                text=text+"\n\t\t\t"+tmpColor.getLValue()*scaleExpVal1+",\n\t\t\t"+tmpColor.getCValue()*scaleExpVal2+",\n\t\t\t"+tmpColor.getHValue()*scaleExpVal3;
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


  tmpColor.deleteReferences();
  tmpColor=null;
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
            case "lch":
                jsontext = jsontext+"\"LCh\"";
                break;
            case "din99":
                jsontext = jsontext+"\"DIN99\"";
                break;
            default:
                return;
    }



    jsontext = jsontext+",\n\t\t\"Creator\" : \"CCC-Tool\",\n\t\t\"Name\" : \""+workCMS.getColormapName()+"\",\n\t\t\"NanColor\" : [";
    var tmpColor = workCMS.getNaNColor(exportColorspace);
    jsontext = jsontext+ tmpColor.get1Value()*scaleExpVal1 +","+tmpColor.get2Value()*scaleExpVal2+","+tmpColor.get3Value()*scaleExpVal3+"],\n\t\t\"AboveColor\" : [";
    tmpColor.deleteReferences();
    tmpColor = workCMS.getAboveColor(exportColorspace);
    jsontext = jsontext+ tmpColor.get1Value()*scaleExpVal1 +","+tmpColor.get2Value()*scaleExpVal2+","+tmpColor.get3Value()*scaleExpVal3+"],\n\t\t\"BelowColor\" : [";
    tmpColor.deleteReferences();
    tmpColor = workCMS.getBelowColor(exportColorspace);
    jsontext = jsontext+ tmpColor.get1Value()*scaleExpVal1 +","+tmpColor.get2Value()*scaleExpVal2+","+tmpColor.get3Value()*scaleExpVal3+"],\n\t\t";
    tmpColor.deleteReferences();
    tmpColor=null;

    switch(exportColorspace) {
            case "rgb":
                jsontext = jsontext+"\"RGBPoints\" : [";
                break;
            case "hsv":
                jsontext = jsontext+"\"HSVPoints\" : [";
                break;
            case "lab":
                jsontext = jsontext+"\"LabPoints\" : [";
                break;
            case "lch":
                jsontext = jsontext+"\"LChPoints\" : [";
                break;
            case "din99":
                jsontext = jsontext+"\"DIN99Points\" : [";
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


function exportSide_createPNG(workCMS,isVertical) {

  var testing_ImgData = undefined;

  var tmpDoColorblindSim = doColorblindnessSim;
  doColorblindnessSim=false;
  if(isVertical){
    drawCanvasColormapVertical("id_exportPNGCanvas", workCMS, 1000, 100);
  }
  else {
    drawCanvasColormapHorizontal("id_exportPNGCanvas", workCMS, 100,1000);
  }
  doColorblindnessSim = tmpDoColorblindSim;

}
