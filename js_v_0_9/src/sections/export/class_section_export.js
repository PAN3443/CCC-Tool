class class_Export_Section extends class_Section {

  constructor() {
    super('id_EditPage');
    this.exportCMS = new class_CMS();
    this.format = "xml";
    this.exportspace = "rgb";
    this.scaleExpVal1=255;
    this.scaleExpVal2=255;
    this.scaleExpVal3=255;
    this.doTwinErrorSolution=false;
    this.twinError = 0.00001;
  }

  showSection(){
    document.getElementById(this.sectionID).style.display='flex';
  }

  updateSection(){

  }

  setCMS(cms){
    this.exportCMS.deleteReferences();
    this.exportCMS=cms;
  }

  changeOutputformat(type){

    /*document.getElementById("button_ExportFormatXML").classList.remove("class_generalbuttonActive");
    document.getElementById("button_ExportFormatCSV").classList.remove("class_generalbuttonActive");
    document.getElementById("button_ExportFormatJSON").classList.remove("class_generalbuttonActive");
    document.getElementById("button_ExportFormatPNGH").classList.remove("class_generalbuttonActive");
    document.getElementById("button_ExportFormatPNGV").classList.remove("class_generalbuttonActive");

    document.getElementById("button_ExportFormatXML").classList.add("class_generalbutton");
    document.getElementById("button_ExportFormatCSV").classList.add("class_generalbutton");
    document.getElementById("button_ExportFormatJSON").classList.add("class_generalbutton");
    document.getElementById("button_ExportFormatPNGH").classList.add("class_generalbutton");
    document.getElementById("button_ExportFormatPNGV").classList.add("class_generalbutton");

    document.getElementById("button_this.exportspaceRGB").style.display = "none";
    document.getElementById("button_this.exportspaceHSV").style.display = "none";
    document.getElementById("button_this.exportspaceHSVRatio").style.display = "none";
    document.getElementById("button_this.exportspaceLAB").style.display = "none";
    document.getElementById("button_this.exportspaceLCh").style.display = "none";
    document.getElementById("button_this.exportspaceDIN99").style.display = "none";

    document.getElementById("id_exportOptionsDiv").style.display = "block";
    document.getElementById("id_exportPNG_Info").style.display = "none";*/


    switch (type) {
      case 0:
        /*document.getElementById("button_ExportFormatCSV").classList.remove("class_generalbutton");
        document.getElementById("button_ExportFormatCSV").classList.add("class_generalbuttonActive");
        document.getElementById("button_this.exportspaceRGB").style.display = "block";
        document.getElementById("button_this.exportspaceHSV").style.display = "block";
        document.getElementById("button_this.exportspaceHSVRatio").style.display = "block";
        document.getElementById("button_this.exportspaceLAB").style.display = "block";
        document.getElementById("button_this.exportspaceLCh").style.display = "block";
        document.getElementById("button_this.exportspaceDIN99").style.display = "block";*/
        this.format = "csv";
        break;
      case 1:
        /*document.getElementById("button_ExportFormatXML").classList.remove("class_generalbutton");
        document.getElementById("button_ExportFormatXML").classList.add("class_generalbuttonActive");*/
        this.changeExportColorspace(1);
        this.format = "xml";
        break;
      case 2:
        /*document.getElementById("button_ExportFormatJSON").classList.remove("class_generalbutton");
        document.getElementById("button_ExportFormatJSON").classList.add("class_generalbuttonActive");*/
        this.changeExportColorspace(1);
        this.format = "json";
        break;
      case 3:
        /*document.getElementById("button_ExportFormatPNGH").classList.remove("class_generalbutton");
        document.getElementById("button_ExportFormatPNGH").classList.add("class_generalbuttonActive");
        document.getElementById("id_exportOptionsDiv").style.display = "none";
        document.getElementById("id_exportPNG_Info").style.display = "block";*/
        this.format = "pngH";
        break;
      case 4:
        /*document.getElementById("button_ExportFormatPNGV").classList.remove("class_generalbutton");
        document.getElementById("button_ExportFormatPNGV").classList.add("class_generalbuttonActive");
        document.getElementById("id_exportOptionsDiv").style.display = "none";
        document.getElementById("id_exportPNG_Info").style.display = "block";*/
        this.format = "pngV";
        break;
    }
  }

  changeExportColorspace(type){

    /*document.getElementById("button_this.exportspaceRGB").classList.remove("class_generalbuttonActive");
    document.getElementById("button_this.exportspaceRGBRatio").classList.remove("class_generalbuttonActive");
    document.getElementById("button_this.exportspaceHSV").classList.remove("class_generalbuttonActive");
    document.getElementById("button_this.exportspaceHSVRatio").classList.remove("class_generalbuttonActive");
    document.getElementById("button_this.exportspaceLAB").classList.remove("class_generalbuttonActive");
    document.getElementById("button_this.exportspaceLCh").classList.remove("class_generalbuttonActive");
    document.getElementById("button_this.exportspaceDIN99").classList.remove("class_generalbuttonActive");

    document.getElementById("button_this.exportspaceRGB").classList.add("class_generalbutton");
    document.getElementById("button_this.exportspaceRGBRatio").classList.add("class_generalbutton");
    document.getElementById("button_this.exportspaceHSV").classList.add("class_generalbutton");
    document.getElementById("button_this.exportspaceHSVRatio").classList.add("class_generalbutton");
    document.getElementById("button_this.exportspaceLAB").classList.add("class_generalbutton");
    document.getElementById("button_this.exportspaceLCh").classList.add("class_generalbutton");
    document.getElementById("button_this.exportspaceDIN99").classList.add("class_generalbutton");*/

    this.scaleExpVal1=1;
    this.scaleExpVal2=1;
    this.scaleExpVal3=1;

    switch (type) {
      case 0:
        this.exportspace = "rgb";
        /*document.getElementById("id_table_exportColor1").innerHTML = "RGB-Color (0-255,0-255,0-255)";
        document.getElementById("button_this.exportspaceRGB").classList.remove("class_generalbutton");
        document.getElementById("button_this.exportspaceRGB").classList.add("class_generalbuttonActive");*/
        this.scaleExpVal1=255;
        this.scaleExpVal2=255;
        this.scaleExpVal3=255;
        break;
      case 1:
        this.exportspace = "rgb";
        /*document.getElementById("id_table_exportColor1").innerHTML = "RGB-Color (0-1,0-1,0-1)";
        document.getElementById("button_this.exportspaceRGBRatio").classList.remove("class_generalbutton");
        document.getElementById("button_this.exportspaceRGBRatio").classList.add("class_generalbuttonActive");
        break;
      case 2:
        this.exportspace = "hsv";
        /*document.getElementById("id_table_exportColor1").innerHTML = "HSV-Color (0-360,0-100,0-100)";
        document.getElementById("button_this.exportspaceHSV").classList.remove("class_generalbutton");
        document.getElementById("button_this.exportspaceHSV").classList.add("class_generalbuttonActive");*/
        this.scaleExpVal1=360;
        this.scaleExpVal2=100;
        this.scaleExpVal3=100;
        break;
      case 3:
        this.exportspace = "hsv";
        /*document.getElementById("id_table_exportColor1").innerHTML = "HSV-Color (0-1,0-1,0-1)";
        document.getElementById("button_this.exportspaceHSVRatio").classList.remove("class_generalbutton");
        document.getElementById("button_this.exportspaceHSVRatio").classList.add("class_generalbuttonActive");*/
        break;
      case 4:
        this.exportspace = "lab";
        /*document.getElementById("id_table_exportColor1").innerHTML = "LAB-Color (0-100,-128-128,-128-128)";
        document.getElementById("button_this.exportspaceLAB").classList.remove("class_generalbutton");
        document.getElementById("button_this.exportspaceLAB").classList.add("class_generalbuttonActive");*/
        break;
      case 5:
        this.exportspace = "lch";
        /*document.getElementById("id_table_exportColor1").innerHTML = "LCH-Color (0-100,0-100,0-360)";
        document.getElementById("button_this.exportspaceLCh").classList.remove("class_generalbutton");
        document.getElementById("button_this.exportspaceLCh").classList.add("class_generalbuttonActive");*/
        this.scaleExpVal1=100;
        this.scaleExpVal2=100;
        this.scaleExpVal3=360;
        break;
      case 6:
        this.exportspace = "din99";
        /*document.getElementById("id_table_exportColor1").innerHTML = "DIN99-Color";
        document.getElementById("button_this.exportspaceDIN99").classList.remove("class_generalbutton");
        document.getElementById("button_this.exportspaceDIN99").classList.add("class_generalbuttonActive");*/
        break;
      default:
        return;
    }

      // Fill Table
      if(document.getElementById(this.sectionID).style.display!=='none'){
        this.fillExportTable();
      }


  }

  setTwinIssue(bool){
    if(bool){
      this.doTwinErrorSolution=false;
      /*document.getElementById("id_ExportPage_Button_TwinKeyIssue").innerHTML = "not active";
      document.getElementById("id_ExportPage_Button_TwinKeyIssue").classList.remove("class_generalbuttonActive");
      document.getElementById("id_ExportPage_Button_TwinKeyIssue").classList.add("class_generalbutton");*/
    }
    else{
      this.doTwinErrorSolution=true;
      /*document.getElementById("id_ExportPage_Button_TwinKeyIssue").innerHTML = "active";
      document.getElementById("id_ExportPage_Button_TwinKeyIssue").classList.remove("class_generalbutton");
      document.getElementById("id_ExportPage_Button_TwinKeyIssue").classList.add("class_generalbuttonActive");*/
    }
  }

  changeTwinKeyIssue(){

    if(this.doTwinErrorSolution){
      this.setTwinIssue(false);
    }
    else{
      this.setTwinIssue(true);
    }

    fillExportTable();
  }


  /*function changeIntervalOption(type){

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
    }
    else{
      document.getElementById("button_ExportKeysAndIntervals").classList.remove("class_generalbutton");
      document.getElementById("button_ExportKeysAndIntervals").classList.add("class_generalbuttonActive");
      exportOnlyKeys=false;
      document.getElementById("id_ExportIntervalNum").value = 100;
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

    this.changeIntervalOption(1);
    this.changeExportColorspace(1);
    this.changeOutputformat(1);

    if(this.doTwinErrorSolution){
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

      var this.exportCMS;

      if(document.getElementById("id_selectProbeListExport").selectedIndex==-1){
        document.getElementById("id_selectProbeListExport").selectedIndex=0;
      }
      if(document.getElementById("id_selectProbeListExport").selectedIndex!=0){
          var probeSet = globalCMS1.getProbeSet(document.getElementById("id_selectProbeListExport").selectedIndex-1);
          this.exportCMS = probeSet.generateProbeCMS(globalCMS1);
      }
      else{
          this.exportCMS = cloneCMS(globalCMS1);
      }


      this.exportCMS.calcExportSampling(parseInt(document.getElementById("id_ExportIntervalNum").value)); // calcCMSIntervals(this.exportCMS,0,this.exportCMS.getKeyLength()-1,globalIntervalMode);

      var old_tbody = document.getElementById("id_exportTableBody");
      var new_tbody = document.createElement('tbody');

      var counter = 1;

      var twinErrorValue = 0;
      if(this.doTwinErrorSolution)
        twinErrorValue = this.exportCMS.getRefRange()*this.twinError;

      for (var i = 0; i < this.exportCMS.getKeyLength(); i++) {

        switch (this.exportCMS.getKeyType(i)) {
          case "nil key": case "left key":

            if(i==this.exportCMS.getKeyLength()-1){
              new_tbody.appendChild(createExportTableRow(counter,this.exportCMS.getRefPosition(i), this.exportCMS.getKeyType(i), this.exportCMS.getLeftKeyColor(i,this.exportspace)));
              counter++;
            }
            else{


              if(this.exportCMS.getKeyType(i)=="left key"){
              new_tbody.appendChild(createExportTableRow(counter,this.exportCMS.getRefPosition(i), this.exportCMS.getKeyType(i), this.exportCMS.getLeftKeyColor(i,this.exportspace)));
              counter++;
              }

              new_tbody.appendChild(createExportTableRow(counter,this.exportCMS.getRefPosition(i), this.exportCMS.getKeyType(i), this.exportCMS.getLeftKeyColor(i+1,this.exportspace)));
              counter++;

          }

          break;
          case "twin key":


            new_tbody.appendChild(createExportTableRow(counter,this.exportCMS.getRefPosition(i), this.exportCMS.getKeyType(i), this.exportCMS.getLeftKeyColor(i,this.exportspace)));
            counter++;
            new_tbody.appendChild(createExportTableRow(counter,this.exportCMS.getRefPosition(i)+twinErrorValue, this.exportCMS.getKeyType(i), this.exportCMS.getRightKeyColor(i,this.exportspace)));
            counter++;

            for(var j=0; j<this.exportCMS.getExportSamplingLength(i); j++){
              new_tbody.appendChild(createExportTableRow(counter,this.exportCMS.getExportSamplingRef(i,j), "interval", this.exportCMS.getExportSamplingColor(i,j,this.exportspace)));
              counter++;
            }

            break;
          default:

            new_tbody.appendChild(createExportTableRow(counter,this.exportCMS.getRefPosition(i), this.exportCMS.getKeyType(i), this.exportCMS.getRightKeyColor(i,this.exportspace)));
            counter++;

            for(var j=0; j<this.exportCMS.getExportSamplingLength(i); j++){
              new_tbody.appendChild(createExportTableRow(counter,this.exportCMS.getExportSamplingRef(i,j), "interval", this.exportCMS.getExportSamplingColor(i,j,this.exportspace)));
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
    td.appendChild(document.createTextNode(this.exportspace+"("+tmpColor.get1Value()*this.scaleExpVal1+','+tmpColor.get2Value()*this.scaleExpVal2+','+tmpColor.get3Value()*this.scaleExpVal3+')'));
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


  function downloadCMSFile(){

      var filename;
      var text;

      var this.exportCMS;

      if(document.getElementById("id_selectProbeListExport").selectedIndex==-1){
        document.getElementById("id_selectProbeListExport").selectedIndex=0;
      }
      if(document.getElementById("id_selectProbeListExport").selectedIndex!=0){
        var probeSet = globalCMS1.getProbeSet(document.getElementById("id_selectProbeListExport").selectedIndex-1);
        this.exportCMS = probeSet.generateProbeCMS(globalCMS1);
      }
      else{
          this.exportCMS = cloneCMS(globalCMS1);
      }

      if(this.format==="pngH" || this.format==="pngV"){

        var imageData = undefined;

        switch(this.format) {
           case "pngH":
             filename = "ccc-tool_colormap_horizontal_"+this.exportCMS.getColormapName()+".png";
             imageData = this.exportSide_createPNG(this.exportCMS,false)
             break;
           case "pngV":
             filename = "ccc-tool_colormap_vertical_"+this.exportCMS.getColormapName()+".png";
             imageData = this.exportSide_createPNG(this.exportCMS,true)
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
        switch(this.format) {
           case "csv":
               // lookup table
               filename = "ccc-tool_colormap_"+this.exportCMS.getColormapName()+".csv";
               text = this.exportSide_createCSV_Lookup(this.exportCMS);
               break;
           case "xml":
               // xml
               filename = "ccc-tool_colormap_"+this.exportCMS.getColormapName()+".xml";
               text = this.exportSide_createXML(this.exportCMS);
               break;
           case "json":
               filename = "ccc-tool_colormap_"+this.exportCMS.getColormapName()+".json";
               text = this.exportSide_createJSON(this.exportCMS)
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

  }*/

  exportSide_createXML(){

      this.exportCMS.calcExportSampling(parseInt(document.getElementById("id_ExportIntervalNum").value)); // calcCMSIntervals(this.exportCMS,0,this.exportCMS.getKeyLength()-1,globalIntervalMode);
      var xmltext = "<ColorMaps>\n<ColorMap name=\""+this.exportCMS.getColormapName()+"\" space=\"";
      var txtNaN = "";
      var txtAbove = "";
      var txtBelow = "";

      var nanColor = this.exportCMS.getNaNColor(this.exportspace);
      var aboveColor =  this.exportCMS.getAboveColor(this.exportspace);
      var belowColor = this.exportCMS.getBelowColor(this.exportspace);

      switch(this.exportspace) {
              case "rgb":
                  xmltext = xmltext+"RGB";
                  txtNaN="<NaN r=\""+nanColor.get1Value()*this.scaleExpVal1+"\" g=\""+nanColor.get2Value()*this.scaleExpVal2+"\" b=\""+nanColor.get3Value()*this.scaleExpVal3+"\"/>\n";
                  txtAbove="<Above r=\""+aboveColor.get1Value()*this.scaleExpVal1+"\" g=\""+aboveColor.get2Value()*this.scaleExpVal2+"\" b=\""+aboveColor.get3Value()*this.scaleExpVal3+"\"/>\n";
                  txtBelow="<Below r=\""+belowColor.get1Value()*this.scaleExpVal1+"\" g=\""+belowColor.get2Value()*this.scaleExpVal2+"\" b=\""+belowColor.get3Value()*this.scaleExpVal3+"\"/>\n";
                  break;
              case "hsv":
                  xmltext = xmltext+"HSV";
                  txtNaN="<NaN h=\""+nanColor.get1Value()*this.scaleExpVal1+"\" s=\""+nanColor.get2Value()*this.scaleExpVal2+"\" v=\""+nanColor.get3Value()*this.scaleExpVal3+"\"/>\n";
                  txtAbove="<Above h=\""+aboveColor.get1Value()*this.scaleExpVal1+"\" s=\""+aboveColor.get2Value()*this.scaleExpVal2+"\" v=\""+aboveColor.get3Value()*this.scaleExpVal3+"\"/>\n";
                  txtBelow="<Below h=\""+belowColor.get1Value()*this.scaleExpVal1+"\" s=\""+belowColor.get2Value()*this.scaleExpVal2+"\" v=\""+belowColor.get3Value()*this.scaleExpVal3+"\"/>\n";
                  break;
              case "lab":
                  xmltext = xmltext+"LAB";
                  txtNaN="<NaN l=\""+nanColor.get1Value()+"\" a=\""+nanColor.get2Value()+"\" b=\""+nanColor.get3Value()+"\"/>\n";
                  txtAbove="<Above l=\""+aboveColor.get1Value()+"\" a=\""+aboveColor.get2Value()+"\" b=\""+aboveColor.get3Value()+"\"/>\n";
                  txtBelow="<Below l=\""+belowColor.get1Value()+"\" a=\""+belowColor.get2Value()+"\" b=\""+belowColor.get3Value()+"\"/>\n";
                  break;
              case "lch":
                  xmltext = xmltext+"LCH";
                  txtNaN="<NaN l=\""+nanColor.get1Value()*this.scaleExpVal1+"\" c=\""+nanColor.get2Value()*this.scaleExpVal2+"\" h=\""+nanColor.get3Value()*this.scaleExpVal3+"\"/>\n";
                  txtAbove="<Above l=\""+aboveColor.get1Value()*this.scaleExpVal1+"\" c=\""+aboveColor.get2Value()*this.scaleExpVal2+"\" h=\""+aboveColor.get3Value()*this.scaleExpVal3+"\"/>\n";
                  txtBelow="<Below l=\""+belowColor.get1Value()*this.scaleExpVal1+"\" c=\""+belowColor.get2Value()*this.scaleExpVal2+"\" h=\""+belowColor.get3Value()*this.scaleExpVal3+"\"/>\n";
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

      xmltext = xmltext+"\" interpolationspace=\""+this.exportCMS.getInterpolationSpace()+"\" interpolationtype=\""+this.exportCMS.getInterpolationType()+"\" creator=\"CCC-Tool\">\n";

        xmltext = xmltext+this.createCMSText();

        xmltext = xmltext + txtNaN;
        xmltext = xmltext + txtAbove;
        xmltext = xmltext + txtBelow;

        xmltext = xmltext + this.createProbeSetText();

        xmltext=xmltext+"</ColorMap>\n</ColorMaps>";

        return xmltext;
  }

  exportSide_createCSV_Lookup(){

      var text = "";


      this.exportCMS.calcExportSampling(parseInt(document.getElementById("id_ExportIntervalNum").value)); // calcCMSIntervals(this.exportCMS,0,this.exportCMS.getKeyLength()-1,globalIntervalMode);


      var opacityVal =1;
      var tmpColor2 = this.exportCMS.getNaNColor(this.exportspace);
      var tmpColor3 = this.exportCMS.getAboveColor(this.exportspace);
      var tmpColor4 = this.exportCMS.getBelowColor(this.exportspace);
      switch(this.exportspace) {
              case "rgb":
                  text = text+"Reference;R;G;B;Opacity;cms;isMoT;NaN;R;"+tmpColor2.getRValue()*this.scaleExpVal1+";G;"+tmpColor2.getGValue()*this.scaleExpVal2+";B;"+tmpColor2.getBValue()*this.scaleExpVal3+";Above;R;"+tmpColor3.get1Value()*this.scaleExpVal1+";G;"+tmpColor3.get2Value()*this.scaleExpVal2+";B;"+tmpColor3.get3Value()*this.scaleExpVal3+";Below;R;"+tmpColor4.get1Value()*this.scaleExpVal1+";G;"+tmpColor4.get2Value()*this.scaleExpVal2+";B;"+tmpColor4.get3Value()*this.scaleExpVal3+"\n";
                  break;
              case "hsv":
                  text = text+"Reference;H;S;V;Opacity;cms;isMoT;NaN;H;"+tmpColor2.getHValue()*this.scaleExpVal1+";S;"+tmpColor2.getSValue()*this.scaleExpVal2+";V;"+tmpColor2.getVValue()*this.scaleExpVal3+";Above;H;"+tmpColor3.get1Value()*this.scaleExpVal1+";S;"+tmpColor3.get2Value()*this.scaleExpVal2+";V;"+tmpColor3.get3Value()*this.scaleExpVal3+";Below;H;"+tmpColor4.get1Value()*this.scaleExpVal1+";S;"+tmpColor4.get2Value()*this.scaleExpVal2+";V;"+tmpColor4.get3Value()*this.scaleExpVal3+"\n";
                  break;
              case "lab":
                  text = text+"Reference;L;A;B;Opacity;cms;isMoT;NaN;L;"+tmpColor2.getLValue()+";A;"+tmpColor2.getAValue()+";B;"+tmpColor2.getBValue()+";Above;L;"+tmpColor3.get1Value()+";A;"+tmpColor3.get2Value()+";B;"+tmpColor3.get3Value()+";Below;L;"+tmpColor4.get1Value()+";A;"+tmpColor4.get2Value()+";B;"+tmpColor4.get3Value()+"\n";
                  break;
              case "lch":
                  text = text+"Reference;L;C;H;Opacity;cms;isMoT;NaN;L;"+tmpColor2.getLValue()*this.scaleExpVal1+";C;"+tmpColor2.getCValue()*this.scaleExpVal2+";H;"+tmpColor2.getHValue()*this.scaleExpVal3+";Above;L;"+tmpColor3.get1Value()*this.scaleExpVal1+";C;"+tmpColor3.get2Value()*this.scaleExpVal2+";H;"+tmpColor3.get3Value()*this.scaleExpVal3+";Below;L;"+tmpColor4.get1Value()*this.scaleExpVal1+";C;"+tmpColor4.get2Value()*this.scaleExpVal2+";H;"+tmpColor4.get3Value()*this.scaleExpVal3+"\n";
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

      text = text+this.createCMSText(this.exportCMS,"csv");

      return text.substring(0, text.length - 1);
  }

  createCMSText(){

    var twinErrorValue = 0;
    if(this.doTwinErrorSolution)
      twinErrorValue = this.exportCMS.getRefRange()*this.twinError;

    var text = "";
    for (var i = 0; i < this.exportCMS.getKeyLength(); i++) {

      switch (this.exportCMS.getKeyType(i)) {
        case "nil key": case "left key":

          if(i==this.exportCMS.getKeyLength()-1)
            text = text+this.createLine(this.exportCMS.getLeftKeyColor(i,this.exportspace),this.exportCMS.getRefPosition(i),this.exportCMS.getOpacityVal(i,"left"),true,true);
          else{

            var isMot=false;
            if(this.exportCMS.getKeyType(i)=="left key"){
              if(this.exportCMS.getMoT(i)==false){
                text = text+this.createLine(this.exportCMS.getLeftKeyColor(i,this.exportspace),this.exportCMS.getRefPosition(i),this.exportCMS.getOpacityVal(i,"left"),true,true);
              }
              else{
                text = text+this.createLine(this.exportCMS.getLeftKeyColor(i,this.exportspace),this.exportCMS.getRefPosition(i),this.exportCMS.getOpacityVal(i,"left"),true,false);
                isMot=true;
              }

            }
            text = text+this.createLine(this.exportCMS.getLeftKeyColor(i+1,this.exportspace),this.exportCMS.getRefPosition(i),this.exportCMS.getOpacityVal(i,"right"),true,isMot)  ;


        }

        break;
        case "twin key":

          var isMot=false;
          if(this.exportCMS.getMoT(i)==false){
            text = text+this.createLine(this.exportCMS.getLeftKeyColor(i,this.exportspace),this.exportCMS.getRefPosition(i),this.exportCMS.getOpacityVal(i,"left"),true,true);
          }
          else{
            text = text+this.createLine(this.exportCMS.getLeftKeyColor(i,this.exportspace),this.exportCMS.getRefPosition(i),this.exportCMS.getOpacityVal(i,"left"),true,false);
            isMot=true;
          }
          text = text+this.createLine(this.exportCMS.getRightKeyColor(i,this.exportspace),this.exportCMS.getRefPosition(i)+twinErrorValue,this.exportCMS.getOpacityVal(i,"right"),true,isMot)  ;

          var numOfIntervals = this.exportCMS.getExportSamplingLength(i);

          for(var j=0; j<this.exportCMS.getExportSamplingLength(i); j++){
            text = text+this.createLine(this.exportCMS.getExportSamplingColor(i,j,this.exportspace),this.exportCMS.getExportSamplingRef(i,j),false,false);
          }

          break;
        default:

          text = text+this.createLine(this.exportCMS.getRightKeyColor(i,this.exportspace),this.exportCMS.getRefPosition(i),this.exportCMS.getOpacityVal(i,"right"),true,false);

          //console.log(this.exportCMS.getIntervalLength(),this.exportCMS.getExportSamplingLength(i));

          var numOfIntervals = this.exportCMS.getExportSamplingLength(i);

          for(var j=0; j<this.exportCMS.getExportSamplingLength(i); j++){
            text = text+this.createLine(this.exportCMS.getExportSamplingColor(i,j,this.exportspace),this.exportCMS.getExportSamplingRef(i,j),false,false);
          }

        }
      }

      return text;
  }

  createProbeSetText(){

    var text = "";

      switch (this.format) {
        case "xml":

          for (var i = 0; i < this.exportCMS.getProbeSetLength(); i++) {
            var tmpProbeSet = this.exportCMS.getProbeSet(i);
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

  createLine(tmpColor,refVal,isCMS,isMoT){
    var text = "";
    var opacityVal=1.0;
    switch (this.format) {
      case "xml":
          switch(this.exportspace) {
             case "rgb":
                 text="<Point x=\""+refVal+"\" o=\""+opacityVal+"\" r=\""+tmpColor.getRValue()*this.scaleExpVal1+"\" g=\""+tmpColor.getGValue()*this.scaleExpVal2+"\" b=\""+tmpColor.getBValue()*this.scaleExpVal3+"\" cms=\""+isCMS+"\"";
                 break;
             case "hsv":
                 text="<Point x=\""+refVal+"\" o=\""+opacityVal+"\" h=\""+tmpColor.getHValue()*this.scaleExpVal1+"\" s=\""+tmpColor.getSValue()*this.scaleExpVal2+"\" v=\""+tmpColor.getVValue()*this.scaleExpVal3+"\" cms=\""+isCMS+"\"";
                 break;
             case "lab":
                 text="<Point x=\""+refVal+"\" o=\""+opacityVal+"\" l=\""+tmpColor.getLValue()+"\" a=\""+tmpColor.getAValue()+"\" b=\""+tmpColor.getBValue()+"\" cms=\""+isCMS+"\"";
                 break;
             case "lch":
                 text="<Point x=\""+refVal+"\" o=\""+opacityVal+"\" l=\""+tmpColor.getLValue()*this.scaleExpVal1+"\" c=\""+tmpColor.getCValue()*this.scaleExpVal2+"\" h=\""+tmpColor.getHValue()*this.scaleExpVal3+"\" cms=\""+isCMS+"\"";
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
          switch(this.exportspace) {
             case "rgb":
                 text=text+refVal+";"+tmpColor.getRValue()*this.scaleExpVal1+";"+tmpColor.getGValue()*this.scaleExpVal2+";"+tmpColor.getBValue()*this.scaleExpVal3+";";
                 break;
             case "hsv":
                 text=text+refVal+";"+tmpColor.getHValue()*this.scaleExpVal1+";"+tmpColor.getSValue()*this.scaleExpVal2+";"+tmpColor.getVValue()*this.scaleExpVal3+";";
                 break;
             case "lab":
                 text=text+refVal+";"+tmpColor.getLValue()+";"+tmpColor.getAValue()+";"+tmpColor.getBValue()+";";
                 break;
            case "lch":
                 text=text+refVal+";"+tmpColor.getLValue()*this.scaleExpVal1+";"+tmpColor.getCValue()*this.scaleExpVal2+";"+tmpColor.getHValue()*this.scaleExpVal3+";";
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

           switch(this.exportspace) {
              case "rgb":
                  text=text+"\n\t\t\t"+tmpColor.getRValue()*this.scaleExpVal1+",\n\t\t\t"+tmpColor.getGValue()*this.scaleExpVal2+",\n\t\t\t"+tmpColor.getBValue()*this.scaleExpVal3;
                  break;
              case "hsv":
                  text=text+"\n\t\t\t"+tmpColor.getHValue()*this.scaleExpVal1+",\n\t\t\t"+tmpColor.getSValue()*this.scaleExpVal2+",\n\t\t\t"+tmpColor.getVValue()*this.scaleExpVal3;
                  break;
              case "lab":
                  text=text+"\n\t\t\t"+tmpColor.getLValue()+",\n\t\t\t"+tmpColor.getAValue()+",\n\t\t\t"+tmpColor.getBValue();
                  break;
              case "lch":
                  text=text+"\n\t\t\t"+tmpColor.getLValue()*this.scaleExpVal1+",\n\t\t\t"+tmpColor.getCValue()*this.scaleExpVal2+",\n\t\t\t"+tmpColor.getHValue()*this.scaleExpVal3;
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

  exportSide_createJSON(){

      this.exportCMS.calcExportSampling(parseInt(document.getElementById("id_ExportIntervalNum").value)); // calcCMSIntervals(this.exportCMS,0,this.exportCMS.getKeyLength()-1,globalIntervalMode);

      var twinErrorValue = 0;
      if(this.doTwinErrorSolution)
        twinErrorValue = this.exportCMS.getRefRange()*this.twinError;

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


      this.exportCMS.getInterpolationType()

      jsontext = jsontext+",\n\t\t\"InterpolationType\" : \""+globalCMS1.getInterpolationType()+"\",\n\t\t\"Creator\" : \"CCC-Tool\",\n\t\t\"Name\" : \""+this.exportCMS.getColormapName()+"\",\n\t\t\"NanColor\" : [";
      var tmpColor = this.exportCMS.getNaNColor(this.exportspace);
      jsontext = jsontext+ tmpColor.get1Value()*this.scaleExpVal1 +","+tmpColor.get2Value()*this.scaleExpVal2+","+tmpColor.get3Value()*this.scaleExpVal3+"],\n\t\t\"AboveColor\" : [";
      tmpColor.deleteReferences();
      tmpColor = this.exportCMS.getAboveColor(this.exportspace);
      jsontext = jsontext+ tmpColor.get1Value()*this.scaleExpVal1 +","+tmpColor.get2Value()*this.scaleExpVal2+","+tmpColor.get3Value()*this.scaleExpVal3+"],\n\t\t\"BelowColor\" : [";
      tmpColor.deleteReferences();
      tmpColor = this.exportCMS.getBelowColor(this.exportspace);
      jsontext = jsontext+ tmpColor.get1Value()*this.scaleExpVal1 +","+tmpColor.get2Value()*this.scaleExpVal2+","+tmpColor.get3Value()*this.scaleExpVal3+"],\n\t\t";
      tmpColor.deleteReferences();
      tmpColor=null;

      switch(this.exportspace) {
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


      for (var i = 0; i < this.exportCMS.getKeyLength(); i++) {

            switch (this.exportCMS.getKeyType(i)) {
              case "nil key": case "left key":

                if(i==this.exportCMS.getKeyLength()-1){
                  colortext = colortext+this.createLine(this.exportCMS.getLeftKeyColor(i,this.exportspace),this.exportCMS.getRefPosition(i),this.exportCMS.getOpacityVal(i,"left"),true,true);
                  isCMStext=isCMStext+"\n\t\t\t"+true;
                  isMoTtext=isMoTtext+"\n\t\t\t"+false;
                }
                else{

                  var isMot=false;
                  if(this.exportCMS.getKeyType(i)=="left key"){
                    if(this.exportCMS.getMoT(i)==false){
                      colortext = colortext+this.createLine(this.exportCMS.getLeftKeyColor(i,this.exportspace),this.exportCMS.getRefPosition(i),this.exportCMS.getOpacityVal(i,"left"),true,true)+",";
                      isMoTtext=isMoTtext+"\n\t\t\t"+true+",";
                    }
                    else{
                      colortext = colortext+this.createLine(this.exportCMS.getLeftKeyColor(i,this.exportspace),this.exportCMS.getRefPosition(i),this.exportCMS.getOpacityVal(i,"left"),true,false)+",";
                      isMot=true;
                      isMoTtext=isMoTtext+"\n\t\t\t"+false+",";
                    }

                    isCMStext=isCMStext+"\n\t\t\t"+true+",";


                  }
                  colortext = colortext+this.createLine(this.exportCMS.getLeftKeyColor(i+1,this.exportspace),this.exportCMS.getRefPosition(i),this.exportCMS.getOpacityVal(i,"right"),true,isMot)+",";
                  isCMStext=isCMStext+"\n\t\t\t"+true+",";
                  isMoTtext=isMoTtext+"\n\t\t\t"+isMot+",";


              }

              break;
              case "twin key":

                var numOfIntervals = this.exportCMS.getExportSamplingLength(i);

                var isMot=false;

                isCMStext=isCMStext+"\n\t\t\t"+true+",";
                if(this.exportCMS.getMoT(i)==false){
                  colortext = colortext+this.createLine(this.exportCMS.getLeftKeyColor(i,this.exportspace),this.exportCMS.getRefPosition(i),this.exportCMS.getOpacityVal(i,"left"),true,true)+",";
                  isMoTtext=isMoTtext+"\n\t\t\t"+true+",";
                }
                else{
                  colortext = colortext+this.createLine(this.exportCMS.getLeftKeyColor(i,this.exportspace),this.exportCMS.getRefPosition(i),this.exportCMS.getOpacityVal(i,"left"),true,false)+",";
                  isMot=true;
                  isMoTtext=isMoTtext+"\n\t\t\t"+false+",";
                }

                colortext = colortext+this.createLine(this.exportCMS.getRightKeyColor(i,this.exportspace),this.exportCMS.getRefPosition(i)+twinErrorValue,this.exportCMS.getOpacityVal(i,"right"),true,isMot)+",";
                isCMStext=isCMStext+"\n\t\t\t"+true+",";
                isMoTtext=isMoTtext+"\n\t\t\t"+isMot+",";


                for(var j=0; j<this.exportCMS.getExportSamplingLength(i); j++){
                  colortext = colortext+this.createLine(this.exportCMS.getExportSamplingColor(i,j,this.exportspace),this.exportCMS.getExportSamplingRef(i,j),false,false)+",";
                  isCMStext=isCMStext+"\n\t\t\t"+false+",";
                  isMoTtext=isMoTtext+"\n\t\t\t"+false+",";
                }



                break;
              default:

                var numOfIntervals = this.exportCMS.getExportSamplingLength(i);
                colortext = colortext+this.createLine(this.exportCMS.getRightKeyColor(i,this.exportspace),this.exportCMS.getRefPosition(i),this.exportCMS.getOpacityVal(i,"right"),true,false)+",";
                isCMStext=isCMStext+"\n\t\t\t"+true+",";
                isMoTtext=isMoTtext+"\n\t\t\t"+false+",";


                for(var j=0; j<this.exportCMS.getExportSamplingLength(i); j++){
                  colortext = colortext+this.createLine(this.exportCMS.getExportSamplingColor(i,j,this.exportspace),this.exportCMS.getExportSamplingRef(i,j),false,false)+",";
                  isCMStext=isCMStext+"\n\t\t\t"+false+",";
                  isMoTtext=isMoTtext+"\n\t\t\t"+false+",";
                }


              }
            }

      jsontext=jsontext+colortext+isCMStext+isMoTtext+"\n\t\t]\n\t}\n]";

      return jsontext;
  }

  exportSide_createPNG(isVertical){

    var testing_ImgData = undefined;

    var tmpDoColorblindSim = doColorblindnessSim;
    doColorblindnessSim=false;
    if(isVertical){
      drawCanvasColormapVertical("id_exportPNGCanvas", this.exportCMS, 1000, 100);
    }
    else {
      drawCanvasColormapHorizontal("id_exportPNGCanvas", this.exportCMS, 100,1000);
    }
    doColorblindnessSim = tmpDoColorblindSim;

  }

};
