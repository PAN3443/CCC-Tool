function xmlColormapParserPath(path){
  var xmlFile;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlFile = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlFile = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlFile.open("GET", path, false);
        xmlFile.send(null);

        return xmlColormapParserFile(xmlFile.responseText);
}


function xmlColormapParserFile(xmlString){

      var xmlObject;
      // The GetBrowserType function returns a 2-letter code representing
      // ...the type of browser.
      //var browserType = GetBrowserType();

      // switch(browserType)
      // {
      //   case "ie":
      //     xmlObject = new ActiveXObject("MSXML2.DOMDocument")
      //     xmlObject.async = false;
      //     xmlObject.loadXML(xmlString);
      //     break;
      //   default:
          var dp = new DOMParser();
          xmlObject = dp.parseFromString(xmlString, "text/xml");
      //     break;
      // }

   //try {
            var colormapObject = xmlObject.getElementsByTagName("ColorMap");

            if(colormapObject.length>0){

                var pointObject = colormapObject[0].getElementsByTagName("Point");
                var space = checkXMLColorspace(pointObject);


                //colormapObjects.push(new classColorMapSpecification());
                //var index = colormapObjects.length-1;
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


                         //console.log("x="+x+",r="+x+",g="+g+",b="+b);

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
                                var newKey = new class_Key(undefined,undefined,x,true);
                                tmpCMS.pushKey(newKey);
                              }else{
                                // right key
                                var newKey = new class_Key(undefined,tmpColor,x,true);
                                tmpCMS.pushKey(newKey);
                              }
                             break;
                            case pointObject.length-1:
                                // right key
                                var newKey = new class_Key(tmpColor,undefined,x,true);
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
                                  var newKey = new class_Key(tmpColor_Prev,undefined,x,true);

                                  if(pointObject[i].hasAttribute("isMoT")){
                                    if(pointObject[i].getAttribute("isMoT")=="true")
                                      newKey.setMoT(true); // if right key color isMoT (left is default)
                                  }
                                  tmpCMS.pushKey(newKey);
                                }else{
                                  // twin key
                                  var newKey = new class_Key(tmpColor_Prev,tmpColor,x,true);
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
                                  var newKey = new class_Key(tmpColor,tmpColor,x,false);
                                  tmpCMS.pushKey(newKey);
                                }
                              }
                            }//switch

                        } // for

                        /////////////////// from here start loading the new probe set information

                          var probesetObjects= colormapObject[0].getElementsByTagName("ProbeSet");


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

                          //console.log(tmpCMS.getProbeLength());

                          /////////////////// till here new probe set information

                        if(colormapObject[0].hasAttribute("name")){
                            var name = colormapObject[0].getAttribute("name");
                            tmpCMS.setColormapName(name);
                        }

                        if(colormapObject[0].hasAttribute("interpolationspace")){
                          var interpolationSpace = colormapObject[0].getAttribute("interpolationspace");
                          tmpCMS.setInterpolationSpace(interpolationSpace);
                        }

                         if(colormapObject[0].getElementsByTagName("NaN").length !=0){
                           var nanObj = colormapObject[0].getElementsByTagName("NaN");

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


                         if(colormapObject[0].getElementsByTagName("Above").length !=0){
                           var aboveObj = colormapObject[0].getElementsByTagName("Above");

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

                         if(colormapObject[0].getElementsByTagName("Below").length !=0){
                           var belowObj = colormapObject[0].getElementsByTagName("Below");

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

                 return tmpCMS;

            }

            return undefined;
        /*} catch (error) {
         console.log("Error with XML File ");
       }*/

}

function getLoadedColor(val1,val2,val3,space){
  var tmpColor;
  switch (space) {
     case "RGB": case "rgb": case "Rgb":
         tmpColor = new classColor_RGB(val1,val2,val3);
         break;
     case "HSV": case "hsv": case "Hsv":
         tmpColor = new classColor_HSV(val1,val2,val3);
       break;
      case "LAB": case "lab": case "Lab":
          tmpColor = new classColor_LAB(val1,val2,val3);
       break;
     case "DIN99": case "din99": case "Din99":
         tmpColor = new classColorDIN99(val1,val2,val3);
       break;
     default:
           console.log("Error with XML File -> found no space ");
   }

   return tmpColor;
}

function checkXMLColorspace(xmlObj){

  if(xmlObj.length>0)

    if(xmlObj[0].hasAttribute("r") && xmlObj[0].hasAttribute("b") && xmlObj[0].hasAttribute("g") ){
        return "RGB";
    }

    if(xmlObj[0].hasAttribute("h") && xmlObj[0].hasAttribute("s") && xmlObj[0].hasAttribute("v") ){
        return "HSV";
    }

    if(xmlObj[0].hasAttribute("l") && xmlObj[0].hasAttribute("a") && xmlObj[0].hasAttribute("b") ){
        return "LAB";
    }

    if(xmlObj[0].hasAttribute("l99") && xmlObj[0].hasAttribute("a99") && xmlObj[0].hasAttribute("b99") ){
        return "DIN99";
    }

    return "NoSpace";

}
