function exportColormapFromMyDesigns(index) {

  if (index < myList.length) {
    globalCMS1 = cloneCMS(myList[index]);
    changePage(6);
  }

}


function deletetColormapFromMyDesigns(index) {

  if (index < myList.length) {
    askType=3;
    askIndex=index;
    openAskWindow();
  }

}


function acceptColormapFromMyDesigns(index) {
  if (index < myList.length) {

    document.getElementById("id_buttonAcceptMyList" + colormap1SelectIndex).style.border = "0.2vh solid rgb(0,0,0)";
    document.getElementById("id_buttonAcceptMyList" + colormap1SelectIndex).style.color = "rgb(0,0,0)";
    colormap1SelectIndex = index;
    document.getElementById("id_buttonAcceptMyList" + colormap1SelectIndex).style.border = "0.2vh solid " + styleActiveColor;
    document.getElementById("id_buttonAcceptMyList" + colormap1SelectIndex).style.color = styleActiveColor;

    globalCMS1 = cloneCMS(myList[colormap1SelectIndex]);
    orderColorSketch(colorspaceModus);

  }

}


function loadCMStoGallery() {
  if (myList.length > 9) {
    openAlert("Sorry, the CMS could not be uploaded, because the MyDesigns list is full.");
  } else {
    document.getElementById("id_inputCMSData").click();
  }
}

function saveSession() {

  if (myList.length == 0) {
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



  switch (colorspaceModus) {
    case "rgb":
      changeExportColorspace(0);
      break;
    case "hsv":
      changeExportColorspace(1);
      break;
    case "lab":
      changeExportColorspace(2);
      break;
    case "din99":
      changeExportColorspace(3);
      break;
    default:
      changeExportColorspace(2);
  }

  var tmpGlobalCMS = cloneCMS(globalCMS1);

  for (var i = 0; i < myList.length; i++) {
    globalCMS1 = cloneCMS(myList[i]);


    /*globalCMS1 = calcCMSIntervals(globalCMS1,0,globalCMS1.getKeyLength()-1);*/
    text = text + "<ColorMap name=\"" + globalCMS1.getColormapName() + "\" space=\"";

    switch (exportColorspace) {
      case "rgb":
        text = text + "RGB";
        break;
      case "hsv":
        text = text + "HSV";
        break;
      case "lab":
        text = text + "LAB";
        break;
      case "din99":
        text = text + "DIN99";
        break;
      default:
        return;
    }

    text = text + "\" creator=\"CCC-Tool\">\n";

    text = text + createCMSText(globalCMS1,"xml");

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

}


function loadSession() {
  if (myList.length != 0) {
    askType=2;
    openAskWindow();
  } else
    document.getElementById("id_inputSessionData").click();

}

function readSessionFile(e){

  var file = e.target.files[0];
  if (!file) {
    return;
  }

  myList=[];

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

                if(cmsObjects[j].hasAttribute("name")){
                    var name = cmsObjects[j].getAttribute("name");
                    tmpCMS.setColormapName(name);
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

            myList.push(tmpCMS);
     }
   }

   colormap1SelectIndex=myList.length-1;
   globalCMS1 = cloneCMS(myList[colormap1SelectIndex]);

    if (showSideID == -1)
      changePage(0);
    else{
      orderColorSketch();
      drawMyList();
    }



  };


  reader.readAsText(file);

}
