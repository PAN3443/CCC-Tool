function xmlColormapParser(path){

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

            //colormapObjects.push(new xclassColorMap());
            //var index = colormapObjects.length-1;
            var tmpColorMap = new xclassColorMap();

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