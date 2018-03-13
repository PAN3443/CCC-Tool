function xmlColormapParserPath(path){

    var xmlFile;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlFile = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlFile = new ActiveXObject("Microsoft.XMLHTTP");
        }
    var allText = "";
    xmlFile.open("GET", path, false);
    xmlFile.setRequestHeader("Content-Type", "text/xml");
    xmlFile.send(null);

    // Place the response in an XML document.
    var xmlObject = xmlFile.responseXML;
    // Place the root node in an element.

    try {

        var colormapObject = xmlObject.getElementsByTagName("ColorMap");

        for(var j=0; j<colormapObject.length; j++){

            var pointObject = colormapObject[j].getElementsByTagName("Point");

            //colormapObjects.push(new classColorMapSpecification());
            //var index = colormapObjects.length-1;
            var tmpColorMap = new classColorMapSpecification();

            var distToNull = 0-parseFloat(pointObject[0].getAttribute("x"));
            var checkLast = parseFloat(pointObject[pointObject.length-1].getAttribute("x"))+distToNull;
            var notOne = false;

            if(checkLast!=1){
                notOne = true;
            }

            var xValues = [];
            var tmpColors = [];

            // check RGB Values
            var isrgb255 = false;
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

            for (var i = 0; i < pointObject.length; i++)
            {

                var x = parseFloat(pointObject[i].getAttribute("x"));
                var r = parseFloat(pointObject[i].getAttribute("r"));
                var g = parseFloat(pointObject[i].getAttribute("g"));
                var b = parseFloat(pointObject[i].getAttribute("b"));
                //console.log("x="+x+",r="+x+",g="+g+",b="+b);

                if(isrgb255){
                    r=r/255.0;
                    g=g/255.0;
                    b=b/255.0;
                }

                if(notOne)
                    xValues.push((x+distToNull)/checkLast);
                else
                    xValues.push(x+distToNull);

                var tmpColor = new classColor_RGB(r,g,b);
                tmpColors.push(tmpColor);
            }

            for (var i = 0; i < xValues.length; ++i)
            {
              tmpColorMap.pushPositionPoints(xValues[i]);
              tmpColorMap.pushRGBColor(tmpColors[i]);
            }

            try {

                var nanObj = colormapObject[j].getElementsByTagName("NaN");

                var r = parseFloat(nanObj[0].getAttribute("r"));
                var g = parseFloat(nanObj[0].getAttribute("g"));
                var b = parseFloat(nanObj[0].getAttribute("b"));

                if(isrgb255){
                    r=r/255.0;
                    g=g/255.0;
                    b=b/255.0;
                }

                var rgbColor = new classColor_RGB(r,g,b);
                tmpColorMap.setNaNColor(rgbColor);

            } catch (error) {
                console.log("colormap has no NaN Value");
            }

            try {
                var name = colormapObject[j].getAttribute("name");
                tmpColorMap.setColormapName(name);
            } catch (error) {
                console.log("colormap has no name");
            }
            tmpColorMap.createKeys();
            tmpColorMap.calcBands();

            return tmpColorMap;

      }
    } catch (error) {
       alert("Error with XML File " + path);
    }

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

    try {
            var colormapObject = xmlObject.getElementsByTagName("ColorMap");

            if(colormapObject.length>0){

                var pointObject = colormapObject[0].getElementsByTagName("Point");
                var space = checkXMLColorspace(pointObject);
//console.log(space);
                //var checkIfCCC_Tool_File = false;
                /*if(pointObject.length>0)
                  checkIfCCC_Tool_File = pointObject[0].hasAttribute("cms");

                  /// ASK if user want the Intervals
                  if(checkIfCCC_Tool_File){
                    if (confirm("You are loading a colormap created by the ccc-tool. Do you want to upload the falses as fixed key-colors?") == true) {
                      checkIfCCC_Tool_File = false;
                    }
                  }*/

                //colormapObjects.push(new classColorMapSpecification());
                //var index = colormapObjects.length-1;
                var tmpColorMap = new classColorMapSpecification();

                switch (space) {
                   case "RGB": case "rgb": case "Rgb":
                      var isrgb255 = false;
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



                       for (var i = 0; i < pointObject.length; i++)
                       {

                           var saveAttribute = true;
                           //if(checkIfCCC_Tool_File && pointObject[i].getAttribute("cms")=="false"){
                           //console.log(pointObject[i].getAttribute("cms"));
                           if(pointObject[i].getAttribute("cms")=="false"){
                               saveAttribute=false;
                           }


                           if(saveAttribute){
                               var x = parseFloat(pointObject[i].getAttribute("x"));
                               var r = parseFloat(pointObject[i].getAttribute("r"));
                               var g = parseFloat(pointObject[i].getAttribute("g"));
                               var b = parseFloat(pointObject[i].getAttribute("b"));
                               //console.log("x="+x+",r="+x+",g="+g+",b="+b);

                               if(isrgb255){
                                   r=r/255.0;
                                   g=g/255.0;
                                   b=b/255.0;
                               }

                               tmpColorMap.pushPositionPoints(x);

                               var tmpColor = new classColor_RGB(r,g,b);
                               tmpColorMap.pushRGBColor(tmpColor);

                           }
                       }

                       try {

                           var nanObj = colormapObject[0].getElementsByTagName("NaN");

                           var r = parseFloat(nanObj[0].getAttribute("r"));
                           var g = parseFloat(nanObj[0].getAttribute("g"));
                           var b = parseFloat(nanObj[0].getAttribute("b"));

                           if(isrgb255){
                               r=r/255.0;
                               g=g/255.0;
                               b=b/255.0;
                           }

                           var rgbColor = new classColor_RGB(r,g,b);
                           tmpColorMap.setNaNColor(rgbColor);

                       } catch (error) {
                           console.log("colormap has no NaN Value");
                       }


                       break;
                   case "HSV": case "hsv": case "Hsv":

                       for (var i = 0; i < pointObject.length; i++)
                       {

                           var saveAttribute = true;
                           if(checkIfCCC_Tool_File && pointObject[i].getAttribute("cms")=="false"){
                               saveAttribute=false;
                           }


                           if(saveAttribute){
                               var x = parseFloat(pointObject[i].getAttribute("x"));
                               var h = parseFloat(pointObject[i].getAttribute("h"));
                               var s = parseFloat(pointObject[i].getAttribute("s"));
                               var v = parseFloat(pointObject[i].getAttribute("v"));

                               tmpColorMap.pushPositionPoints(x);
                               var tmpColor = new classColor_HSV(h,s,v);
                               tmpColorMap.pushHSVColor(tmpColor);

                           }
                       }

                       try {

                           var nanObj = colormapObject[0].getElementsByTagName("NaN");

                           var h = parseFloat(nanObj[0].getAttribute("h"));
                           var s = parseFloat(nanObj[0].getAttribute("s"));
                           var v = parseFloat(nanObj[0].getAttribute("v"));

                           var tmpColor = new classColor_HSV(h,s,v);
                           tmpColorMap.setNaNColor(tmpColor);

                       } catch (error) {
                           console.log("colormap has no NaN Value");
                       }

                     break;
                    case "LAB": case "lab": case "Lab":
                        for (var i = 0; i < pointObject.length; i++)
                        {

                            var saveAttribute = true;
                            if(checkIfCCC_Tool_File && pointObject[i].getAttribute("cms")=="false"){
                                saveAttribute=false;
                            }


                            if(saveAttribute){
                                var x = parseFloat(pointObject[i].getAttribute("x"));
                                var l = parseFloat(pointObject[i].getAttribute("l"));
                                var a = parseFloat(pointObject[i].getAttribute("a"));
                                var b = parseFloat(pointObject[i].getAttribute("b"));

                                tmpColorMap.pushPositionPoints(x);
                                var tmpColor = new classColor_LAB(l,a,b);
                                tmpColorMap.pushCIELabColor(tmpColor);

                            }
                        }

                        try {

                            var nanObj = colormapObject[0].getElementsByTagName("NaN");

                            var l = parseFloat(nanObj[0].getAttribute("l"));
                            var a = parseFloat(nanObj[0].getAttribute("a"));
                            var b = parseFloat(nanObj[0].getAttribute("b"));

                            var tmpColor = new classColor_LAB(l,a,b);
                            tmpColorMap.setNaNColor(tmpColor);

                        } catch (error) {
                            console.log("colormap has no NaN Value");
                        }

                     break;
                   case "DIN99": case "din99": case "Din99":
                       for (var i = 0; i < pointObject.length; i++)
                       {

                           var saveAttribute = true;
                           if(checkIfCCC_Tool_File && pointObject[i].getAttribute("cms")=="false"){
                               saveAttribute=false;
                           }

                           if(saveAttribute){

                               var x = parseFloat(pointObject[i].getAttribute("x"));
                               var l99 = parseFloat(pointObject[i].getAttribute("l99"));
                               var a99 = parseFloat(pointObject[i].getAttribute("a99"));
                               var b99 = parseFloat(pointObject[i].getAttribute("b99"));

                               tmpColorMap.pushPositionPoints(x);
                               var tmpColor = new classColorDIN99(l99,a99,b99);
                               tmpColorMap.pushDIN99Color(tmpColor);

                           }
                       }

                       try {

                           var nanObj = colormapObject[0].getElementsByTagName("NaN");

                           var l99 = parseFloat(nanObj[0].getAttribute("l99"));
                           var a99 = parseFloat(nanObj[0].getAttribute("a99"));
                           var b99 = parseFloat(nanObj[0].getAttribute("b99"));

                           var tmpColor = new classColorDIN99(l99,a99,b99);
                           tmpColorMap.setNaNColor(tmpColor);

                       } catch (error) {
                           console.log("colormap has no NaN Value");
                       }
                     break;
                   default:
                         console.log("Error with XML File -> found no space ");
                 }

                 try {
                     var name = colormapObject[0].getAttribute("name");
                     tmpColorMap.setColormapName(name);
                 } catch (error) {
                     console.log("colormap has no name");
                 }
                 tmpColorMap.createKeys();
                 tmpColorMap.calcBands();

                 return tmpColorMap;



            }




         } catch (error) {
         console.log("Error with XML File ");
       }

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
