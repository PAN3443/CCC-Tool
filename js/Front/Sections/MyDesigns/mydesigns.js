

function saveSession() {

  if (myDesignsList.length == 0) {
    openAlert("The MyDesigns list is empty")
    return;
  }

  var filename;
  var text;

  var d = new Date();
  var dayText = d.getDate() + "";
  var monthText = d.getMonth() + "";

  if (d.getDate() < 10)
    dayText = 0 + dayText;

  if (d.getMonth() < 10)
    monthText = 0 + monthText;


  filename = "ccc-tool_session_" + d.getFullYear() + monthText + dayText + ".xml";

  ///// Settings
  text = "<CCCToolSession>\n<settings>\n";
  text = text + "<de2000_k_L value=\"" + de2000_k_L + "\"/>\n"; //></de2000_k_L>\n";
  text = text + "<de2000_k_C value=\"" + de2000_k_C + "\"/>\n"; //></de2000_k_C>\n";
  text = text + "<de2000_k_H value=\"" + de2000_k_H + "\"/>\n"; //></de2000_k_H>\n";

  text = text + "<de94_k_L value=\"" + de94_k_L + "\"/>\n"; //></de94_k_L>\n";
  text = text + "<de94_k_C value=\"" + de94_k_C + "\"/>\n"; //></de94_k_C>\n";
  text = text + "<de94_k_H value=\"" + de94_k_H + "\"/>\n"; //></de94_k_H>\n";
  text = text + "<de94_k_1 value=\"" + de94_k_1 + "\"/>\n"; //></de94_k_1>\n";
  text = text + "<de94_k_2 value=\"" + de94_k_2 + "\"/>\n"; //></de94_k_2>\n";

  text = text + "<din99_kE value=\"" + din99_kE + "\"/>\n"; //></din99_kE>\n";
  text = text + "<din99_kCH value=\"" + din99_kCH + "\"/>\n"; //></din99_kCH>\n";

  text = text + "<cielab_ref_X value=\"" + cielab_ref_X + "\"/>\n"; //></cielab_ref_X>\n";
  text = text + "<cielab_ref_Y value=\"" + cielab_ref_Y + "\"/>\n"; //></cielab_ref_Y>\n";
  text = text + "<cielab_ref_Z value=\"" + cielab_ref_Z + "\"/>\n"; //></cielab_ref_Z>\n";

  text = text + "</settings>\n";
  ///////


  text = text + "<ColorMaps>\n";

  changeExportColorspace(2); // session save in LAB Colorspace

  var tmpGlobalCMS = cloneCMS(globalCMS1);

  for (var i = 0; i < myDesignsList.length; i++) {
    globalCMS1 = cloneCMS(myDesignsList[i]);

    var txtNaN = "";
    var txtAbove = "";
    var txtBelow = "";

    /*globalCMS1 = calcCMSIntervals(globalCMS1,0,globalCMS1.getKeyLength()-1);*/
    text = text + "<ColorMap name=\"" + globalCMS1.getColormapName() + "\" space=\"";

    switch (exportColorspace) {
      case "rgb":
        text = text + "RGB";
        txtNaN="<NaN r=\""+globalCMS1.getNaNColor("rgb").get1Value()+"\" g=\""+globalCMS1.getNaNColor("rgb").get2Value()+"\" b=\""+globalCMS1.getNaNColor("rgb").get3Value()+"\"/>\n";
        txtAbove="<Above r=\""+globalCMS1.getAboveColor("rgb").get1Value()+"\" g=\""+globalCMS1.getAboveColor("rgb").get2Value()+"\" b=\""+globalCMS1.getAboveColor("rgb").get3Value()+"\"/>\n";
        txtBelow="<Below r=\""+globalCMS1.getBelowColor("rgb").get1Value()+"\" g=\""+globalCMS1.getBelowColor("rgb").get2Value()+"\" b=\""+globalCMS1.getBelowColor("rgb").get3Value()+"\"/>\n";
        break;
      case "hsv":
        text = text + "HSV";
        txtNaN="<NaN h=\""+globalCMS1.getNaNColor("hsv").get1Value()+"\" s=\""+globalCMS1.getNaNColor("hsv").get2Value()+"\" v=\""+globalCMS1.getNaNColor("hsv").get3Value()+"\"/>\n";
        txtAbove="<Above h=\""+globalCMS1.getAboveColor("hsv").get1Value()+"\" s=\""+globalCMS1.getAboveColor("hsv").get2Value()+"\" v=\""+globalCMS1.getAboveColor("hsv").get3Value()+"\"/>\n";
        txtBelow="<Below h=\""+globalCMS1.getBelowColor("hsv").get1Value()+"\" s=\""+globalCMS1.getBelowColor("hsv").get2Value()+"\" v=\""+globalCMS1.getBelowColor("hsv").get3Value()+"\"/>\n";
        break;
      case "lab":
        text = text + "LAB";
        txtNaN="<NaN l=\""+globalCMS1.getNaNColor("lab").get1Value()+"\" a=\""+globalCMS1.getNaNColor("lab").get2Value()+"\" b=\""+globalCMS1.getNaNColor("lab").get3Value()+"\"/>\n";
        txtAbove="<Above l=\""+globalCMS1.getAboveColor("lab").get1Value()+"\" a=\""+globalCMS1.getAboveColor("lab").get2Value()+"\" b=\""+globalCMS1.getAboveColor("lab").get3Value()+"\"/>\n";
        txtBelow="<Below l=\""+globalCMS1.getBelowColor("lab").get1Value()+"\" a=\""+globalCMS1.getBelowColor("lab").get2Value()+"\" b=\""+globalCMS1.getBelowColor("lab").get3Value()+"\"/>\n";
        break;
      case "din99":
        text = text + "DIN99";
        txtNaN="<NaN l99=\""+globalCMS1.getNaNColor("din99").get1Value()+"\" a99=\""+globalCMS1.getNaNColor("din99").get2Value()+"\" b99=\""+globalCMS1.getNaNColor("din99").get3Value()+"\"/>\n";
        txtAbove="<Above l99=\""+globalCMS1.getAboveColor("din99").get1Value()+"\" a99=\""+globalCMS1.getAboveColor("din99").get2Value()+"\" b99=\""+globalCMS1.getAboveColor("din99").get3Value()+"\"/>\n";
        txtBelow="<Below l99=\""+globalCMS1.getBelowColor("din99").get1Value()+"\" a99=\""+globalCMS1.getBelowColor("din99").get2Value()+"\" b99=\""+globalCMS1.getBelowColor("din99").get3Value()+"\"/>\n";
        break;
      default:
        return;
    }

    text = text + "\" interpolationspace=\""+globalCMS1.getInterpolationSpace()+"\" creator=\"CCC-Tool\">\n";

    text = text + createCMSText(globalCMS1,"xml");

    text = text + txtNaN;
    text = text + txtAbove;
    text = text + txtBelow;

    /// Addd Probes
    text = text + createProbeSetText(globalCMS1,"xml");



    text = text + "</ColorMap>\n";


  }

  globalCMS1 = cloneCMS(tmpGlobalCMS);

  text = text + "</ColorMaps>\n</CCCToolSession>";

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

  document.getElementById("id_dropDownContainer").style.display="none";

}


function loadSession() {
  if (myDesignsList.length != 0) {
    askType=2;
    openAskWindow();
  } else{
    document.getElementById("id_inputSessionData").click();
    document.getElementById("id_dropDownContainer").style.display="none";
  }


}

function readSessionFile(e){


  var file = e.target.files[0];
  if (!file) {
    return;
  }

  myDesignsList=[];

  var fileName = file.name;

  var reader = new FileReader();
  reader.onload = function(e) {

    var fileExtension = fileName.replace(/^.*\./, '');
    var cms;

    var dp = new DOMParser();
    var xmlObject = dp.parseFromString(e.target.result, "text/xml");

    if (xmlObject.getElementsByTagName("CCCToolSession") == 0) {
      openAlert("Sorry. The uploaded file has the wrong format. The load algorithm could not find the tag \"CCCToolSession\"");
      return;
    }

    // set Settings
    if (xmlObject.getElementsByTagName("settings").length != 0) {

      ////// DE 2000
      if (xmlObject.getElementsByTagName("de2000_k_L").length != 0)
        de2000_k_L = parseFloat(xmlObject.getElementsByTagName("de2000_k_L")[0].getAttribute("value"));
      else
        de2000_k_L = 1.0;

      if (xmlObject.getElementsByTagName("de2000_k_C").length != 0)
        de2000_k_C = parseFloat(xmlObject.getElementsByTagName("de2000_k_C")[0].getAttribute("value"));
      else
        de2000_k_C = 1.0;

      if (xmlObject.getElementsByTagName("de2000_k_H").length != 0)
        de2000_k_H = parseFloat(xmlObject.getElementsByTagName("de2000_k_H")[0].getAttribute("value"));
      else
        de2000_k_H = 1.0;

      ////// DE 94
      if (xmlObject.getElementsByTagName("d94_k_L").length != 0)
        d94_k_L = parseFloat(xmlObject.getElementsByTagName("d94_k_L")[0].getAttribute("value"));
      else
        d94_k_L = 1.0;

      if (xmlObject.getElementsByTagName("d94_k_C").length != 0)
        d94_k_L = parseFloat(xmlObject.getElementsByTagName("d94_k_C")[0].getAttribute("value"));
      else
        d94_k_L = 1.0;

      if (xmlObject.getElementsByTagName("d94_k_H").length != 0)
        d94_k_L = parseFloat(xmlObject.getElementsByTagName("d94_k_H")[0].getAttribute("value"));
      else
        d94_k_L = 1.0;

      if (xmlObject.getElementsByTagName("d94_k_1").length != 0)
        d94_k_1 = parseFloat(xmlObject.getElementsByTagName("d94_k_1")[0].getAttribute("value"));
      else
        d94_k_1 = 0.045;

      if (xmlObject.getElementsByTagName("d94_k_2").length != 0)
        d94_k_2 = parseFloat(xmlObject.getElementsByTagName("d94_k_2")[0].getAttribute("value"));
      else
        d94_k_2 = 0.015;


      ////// LAB
      if (xmlObject.getElementsByTagName("cielab_ref_X").length != 0)
        cielab_ref_X = parseFloat(xmlObject.getElementsByTagName("cielab_ref_X")[0].getAttribute("value"));
      else
        cielab_ref_X = 1.0;

      if (xmlObject.getElementsByTagName("cielab_ref_Y").length != 0)
        cielab_ref_Y = parseFloat(xmlObject.getElementsByTagName("cielab_ref_Y")[0].getAttribute("value"));
      else
        cielab_ref_Y = 1.0;

      if (xmlObject.getElementsByTagName("cielab_ref_Z").length != 0)
        cielab_ref_Z = parseFloat(xmlObject.getElementsByTagName("cielab_ref_Z")[0].getAttribute("value"));
      else
        cielab_ref_Z = 1.0;

      ////// DIN99
      if (xmlObject.getElementsByTagName("din99_kE").length != 0)
        din99_kE = parseFloat(xmlObject.getElementsByTagName("din99_kE")[0].getAttribute("value"));
      else
        din99_kE = 1.0;

      if (xmlObject.getElementsByTagName("din99_kCH").length != 0)
        din99_kCH = parseFloat(xmlObject.getElementsByTagName("din99_kCH")[0].getAttribute("value"));
      else
        din99_kCH = 1.0;


      updateSettingInputFields();

    }

    // read cms
    if (xmlObject.getElementsByTagName("ColorMap").length != 0){
      var cmsObjects= xmlObject.getElementsByTagName("ColorMap");

      for (var j = 0; j < cmsObjects.length; j++) {

        if(j>9)
        break;

        var pointObject = cmsObjects[j].getElementsByTagName("Point");
        var space = checkXMLColorspace(pointObject);

        var tmpCMS = new class_CMS();

        var isrgb255=false;
        var val1Name,val2Name,val3Name;
        switch (space) {
           case "RGB": case "rgb": case "Rgb":

              for (var i = 0; i < pointObject.length; i++)
              {

                 var r = parseFloat(pointObject[i].getAttribute("r"));
                 var g = parseFloat(pointObject[i].getAttribute("g"));
                 var b = parseFloat(pointObject[i].getAttribute("b"));

                 if(r>1.0 || g>1.0 || b>1.0){
                     isrgb255=true;
                     break;
                 }
               }
               val1Name="r";
               val2Name="g";
               val3Name="b";
               break;
           case "HSV": case "hsv": case "Hsv":
               val1Name="h";
               val2Name="s";
               val3Name="v";
             break;
            case "LAB": case "lab": case "Lab":
                val1Name="l";
                val2Name="a";
                val3Name="b";
             break;
           case "DIN99": case "din99": case "Din99":
               val1Name="l99";
               val2Name="a99";
               val3Name="b99";
             break;
           default:
                 console.log("Error with XML File -> found no space ");
         }


         for (var i = 0; i < pointObject.length; i++)
         {
                 var x = parseFloat(pointObject[i].getAttribute("x"));
                 var val1 = parseFloat(pointObject[i].getAttribute(val1Name));
                 var val2 = parseFloat(pointObject[i].getAttribute(val2Name));
                 var val3 = parseFloat(pointObject[i].getAttribute(val3Name));


                 if(isrgb255){
                     val1=val1/255.0;
                     val2=val2/255.0;
                     val3=val2/255.0;
                 }

                 var tmpColor = getLoadedColor(val1,val2,val3,space);


                 switch (i) {
                   case 0:

                       var val1_Next = parseFloat(pointObject[i+1].getAttribute(val1Name));
                       var val2_Next = parseFloat(pointObject[i+1].getAttribute(val2Name));
                       var val3_Next = parseFloat(pointObject[i+1].getAttribute(val3Name));

                       if(isrgb255){
                           val1_Next=val1_Next/255.0;
                           val2_Next=val2_Next/255.0;
                           val3_Next=val2_Next/255.0;
                       }

                       var tmpColor2 = getLoadedColor(val1_Next,val2_Next,val3_Next,space);


                      if(tmpColor2.equalTo(tmpColor)){
                        // nil key
                        var newKey = new class_Key(undefined,undefined,x);
                        tmpCMS.pushKey(newKey);
                      }else{
                        // right key
                        var newKey = new class_Key(undefined,tmpColor,x);
                        tmpCMS.pushKey(newKey);
                      }
                     break;
                    case pointObject.length-1:
                        // right key
                        var newKey = new class_Key(tmpColor,undefined,x);
                        tmpCMS.pushKey(newKey);
                     break;
                   default:


                      if(pointObject[i].hasAttribute("cms")){
                        if(pointObject[i].getAttribute("cms")=="false"){
                          continue; // continue if cms attribute exist and if it is false
                        }
                      }


                      var x_Previous = parseFloat(pointObject[i-1].getAttribute("x"));

                      var x_Next = parseFloat(pointObject[i+1].getAttribute("x"));
                      var val1_Next = parseFloat(pointObject[i+1].getAttribute(val1Name));
                      var val2_Next = parseFloat(pointObject[i+1].getAttribute(val2Name));
                      var val3_Next = parseFloat(pointObject[i+1].getAttribute(val3Name));

                      if(isrgb255){
                          val1_Next=val1_Next/255.0;
                          val2_Next=val2_Next/255.0;
                          val3_Next=val2_Next/255.0;
                      }

                      var tmpColor2 = getLoadedColor(val1_Next,val2_Next,val3_Next,space);


                      if(x_Previous==x){

                        var val1_Prev = parseFloat(pointObject[i-1].getAttribute(val1Name));
                        var val2_Prev = parseFloat(pointObject[i-1].getAttribute(val2Name));
                        var val3_Prev = parseFloat(pointObject[i-1].getAttribute(val3Name));

                        if(isrgb255){
                            val1_Prev=val1_Prev/255.0;
                            val2_Prev=val2_Prev/255.0;
                            val3_Prev=val3_Prev/255.0;
                        }

                        var tmpColor_Prev = getLoadedColor(val1_Prev,val2_Prev,val3_Prev,space);


                        if(tmpColor2.equalTo(tmpColor)){
                          // left key
                          var newKey = new class_Key(tmpColor_Prev,undefined,x);

                          if(pointObject[i].hasAttribute("isMoT")){
                            if(pointObject[i].getAttribute("isMoT")=="true")
                              newKey.setMoT(true); // if right key color isMoT (left is default)
                          }
                          tmpCMS.pushKey(newKey);
                        }else{
                          // twin key
                          var newKey = new class_Key(tmpColor_Prev,tmpColor,x);
                          if(pointObject[i].hasAttribute("isMoT")){
                            if(pointObject[i].getAttribute("isMoT")=="true")
                              newKey.setMoT(true); // if right key color isMoT (left is default)
                          }
                          tmpCMS.pushKey(newKey);
                        }

                      }
                      else{
                        if(x!=x_Next){
                          // dual key
                          var newKey = new class_Key(tmpColor,tmpColor,x);
                          tmpCMS.pushKey(newKey);
                        }
                      }
                    }//switch

                } // for


      /////////////////// from here start loading the new probe set information

        var probesetObjects= cmsObjects[j].getElementsByTagName("ProbeSet");


        for (var i = 0; i < probesetObjects.length; i++){

            var tmpProbeSet = new class_ProbeSet("New ProbeSet");

            if(probesetObjects[i].hasAttribute("name")){
                var name = probesetObjects[i].getAttribute("name");
                tmpProbeSet.setProbeSetName(name);
            }

            var probeObjects= probesetObjects[i].getElementsByTagName("Probe");

            for (var k = 0; k < probeObjects.length; k++) {

              var type = parseInt(probeObjects[k].getAttribute("type"));
              var start = parseFloat(probeObjects[k].getAttribute("start"));
              var end = parseFloat(probeObjects[k].getAttribute("end"));

              if(type==undefined || start==undefined || end==undefined )
              continue;

              var tmpProbe = new class_Probe(type, start, end ,'hsv'); //(type, start, end , space)

              if(probeObjects[k].getElementsByTagName("ProbeColor").length !=0){

                var probeColorObj = probeObjects[k].getElementsByTagName("ProbeColor");

                var val1 = parseFloat(probeColorObj[0].getAttribute("h"));
                var val2 = parseFloat(probeColorObj[0].getAttribute("s"));
                var val3 = parseFloat(probeColorObj[0].getAttribute("v"));

                tmpProbe.setProbeColor(new classColor_HSV(val1,val2,val3));
              }

              if(type == 0) // const _> no functions
              {
                tmpProbeSet.addProbe(tmpProbe);
                continue;
              }

              //// Determine Function
              var valueFunctionObj = probeObjects[k].getElementsByTagName("ValueFunction");
              var saturationFunctionObj = probeObjects[k].getElementsByTagName("SaturationFunction");

              /// One Sided
              if(valueFunctionObj.length==0){
                if(saturationFunctionObj.length==2){

                  var sat1 = parseFloat(saturationFunctionObj[0].getAttribute("s"));
                  var sat2 = parseFloat(saturationFunctionObj[1].getAttribute("s"));

                  if(sat1==100 && sat2==0){
                    tmpProbe.setFunctionType(2);
                  }
                  else{
                    tmpProbe.setFunctionType(3);
                  }

                  tmpProbeSet.addProbe(tmpProbe);
                }
                continue;
              }

              if(saturationFunctionObj.length==0){
                if(valueFunctionObj.length==2){

                  var val1 = parseFloat(valueFunctionObj[0].getAttribute("v"));
                  var val2 = parseFloat(valueFunctionObj[1].getAttribute("v"));

                  if(val1==100 && val2==0){
                    tmpProbe.setFunctionType(0);
                  }
                  else{
                    tmpProbe.setFunctionType(1);
                  }

                  tmpProbeSet.addProbe(tmpProbe);
                }
                continue;
              }

              /// Two Sided
              if(valueFunctionObj.length==2){
                if(saturationFunctionObj.length==3){
                  var val1 = parseFloat(valueFunctionObj[0].getAttribute("v"));
                  var val2 = parseFloat(valueFunctionObj[1].getAttribute("v"));

                  if(val1==0 && val2==100){
                    tmpProbe.setFunctionType(0);
                  }
                  else{
                    tmpProbe.setFunctionType(1);
                  }

                  tmpProbeSet.addProbe(tmpProbe);
                }
                continue;
              }

              if(saturationFunctionObj.length==2 && valueFunctionObj.length==3){

                var valMiddle = parseFloat(valueFunctionObj[1].getAttribute("v"));
                var sat1 = parseFloat(saturationFunctionObj[0].getAttribute("s"));
                var sat2 = parseFloat(saturationFunctionObj[1].getAttribute("s"));

                if(valMiddle==0){
                  if(sat1==0 && sat2==100){
                    tmpProbe.setFunctionType(2);
                  }
                  else{
                    tmpProbe.setFunctionType(3);
                  }
                  tmpProbeSet.addProbe(tmpProbe);
                  continue;
                }

                if(valMiddle==100){
                  if(sat1==0 && sat2==100){
                    tmpProbe.setFunctionType(4);
                  }
                  else{
                    tmpProbe.setFunctionType(5);
                  }
                }
                tmpProbeSet.addProbe(tmpProbe);

              }


            }

            if(tmpProbeSet.getProbeLength()!=0)
            tmpCMS.addProbeSet(tmpProbeSet);

        }


        /////////////////// till here new probe set information


                if(cmsObjects[j].hasAttribute("name")){
                    var name = cmsObjects[j].getAttribute("name");
                    tmpCMS.setColormapName(name);
                }

                if(cmsObjects[j].hasAttribute("interpolationspace")){
                  var interpolationSpace = cmsObjects[j].getAttribute("interpolationspace");
                  tmpCMS.setInterpolationSpace(interpolationSpace);
                }

                 if(cmsObjects[j].getElementsByTagName("NaN").length !=0){
                   var nanObj = cmsObjects[j].getElementsByTagName("NaN");

                   var val1 = parseFloat(nanObj[0].getAttribute(val1Name));
                   var val2 = parseFloat(nanObj[0].getAttribute(val2Name));
                   var val3 = parseFloat(nanObj[0].getAttribute(val3Name));

                   if(isrgb255){
                       val1=val1/255.0;
                       val2=val2/255.0;
                       val3=val2/255.0;
                   }

                   var tmpColor = getLoadedColor(val1,val2,val3,space);
                   tmpCMS.setNaNColor(tmpColor);
                 }


                 if(cmsObjects[j].getElementsByTagName("Above").length !=0){
                   var aboveObj = cmsObjects[j].getElementsByTagName("Above");

                   var val1 = parseFloat(aboveObj[0].getAttribute(val1Name));
                   var val2 = parseFloat(aboveObj[0].getAttribute(val2Name));
                   var val3 = parseFloat(aboveObj[0].getAttribute(val3Name));

                   if(isrgb255){
                       val1=val1/255.0;
                       val2=val2/255.0;
                       val3=val2/255.0;
                   }

                   var tmpColor = getLoadedColor(val1,val2,val3,space);
                   tmpCMS.setAboveColor(tmpColor);
                 }

                 if(cmsObjects[j].getElementsByTagName("Below").length !=0){
                   var belowObj = cmsObjects[j].getElementsByTagName("Below");

                   var val1 = parseFloat(belowObj[0].getAttribute(val1Name));
                   var val2 = parseFloat(belowObj[0].getAttribute(val2Name));
                   var val3 = parseFloat(belowObj[0].getAttribute(val3Name));

                   if(isrgb255){
                       val1=val1/255.0;
                       val2=val2/255.0;
                       val3=val2/255.0;
                   }

                   var tmpColor = getLoadedColor(val1,val2,val3,space);
                   tmpCMS.setBelowColor(tmpColor);
                 }

            myDesignsList.push(tmpCMS);
     }
   }

   drawMyDesigns();


  };


  reader.readAsText(file);

}


function loadCMS(){

  if (myDesignsList.length >= numberOfMyDesignsObj) {
    openAlert("The MyDesigns list is full. You can not import a new CMS!");
  }
  else{
    document.getElementById("id_inputCMSData").click();
  }

}


function readCMSFile(e) {

  var file = e.target.files[0];
  if (!file) {
    return;
  }

  var fileName = file.name;

  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;


    var fileExtension = fileName.replace(/^.*\./, '');
    var cms;

    switch (fileExtension) {
            case 'xml': case 'XML':
                cms = xmlColormapParserFile(contents);
                break;
            case 'json': case 'JSON':
                cms = jsonColormapParserFile(contents);
                break;
            case 'csv': case 'CSV':
                cms = csvColormapParserFile(contents);
                break;
            default:
                console.log("Error at readCMSFile function -> file extension is unknown!");
                return;
    }

    if(cms!=undefined){
      if(cms.getKeyLength()!=0){

        myDesignsList.push(cloneCMS(cms));
        drawMyDesigns();
      }
      else {
        openAlert("Sorry, the tool was not able to import the file.");
      }
    }
    else {
      openAlert("Sorry, the tool was not able to import the file.");
    }


  };


  reader.readAsText(file);


}
