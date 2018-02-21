/////////////////////////////////////////////
// ------------ Calculation ---------------//
/////////////////////////////////////////////

self.addEventListener('message', function(e) {

  var data = e.data;


    var xPos, yPos, xPos2, yPos2, xVPos, xVPos2, tmpColor, tmpColor2;
    var plotwidth = data.plotXEnd-data.plotXStart;
    xVPos=data.plotXStart;
    xVPos2=data.plotXStart;

    var heigthVArea = data.plotYStart-data.plotYEnd;

    //var widthVAreaInterval = plotwidth/(intervalColormap.getRefNum()-1); //getColormapLength()-1);
    var refLength = data.ref[data.ref.length-1]-data.ref[0];

    var leftOrTwinStarted = false;


     var jsonObj = {};

     jsonObj['modus'] = "";
     jsonObj['xPos'] = 0;
     jsonObj['yPos'] = 0;
     jsonObj['xPos2'] = 0;
     jsonObj['yPos2'] = 0;
     jsonObj['dashed'] = true;
     jsonObj['isCompare'] = true;



     for(var i = 0; i<data.key.length; i++){


         var tmpKey = data.key[i];

         switch(data.analyzeColorspaceModus){
             case "hsv":
             var tmpDis = data.colorValue2[i]*data.colorspaceRadius;
             var tmpRad = (data.colorValue1[i]*Math.PI*2)-Math.PI;
             xPos = tmpDis*Math.cos(tmpRad)+data.colorspaceCenterX;
             yPos = tmpDis*Math.sin(tmpRad)+data.colorspaceCenterY;

             var tmpDis2 = data.colorValue2[i+1]*data.colorspaceRadius;
             var tmpRad2 = (data.colorValue1[i+1]*Math.PI*2)-Math.PI;
             xPos2 = tmpDis2*Math.cos(tmpRad2)+data.colorspaceCenterX;
             yPos2 = tmpDis2*Math.sin(tmpRad2)+data.colorspaceCenterY;
             break;
             case "lab":
             xPos = ((data.colorValue2[i]/data.labSpaceRange)*data.xWidth/2)+data.colorspaceCenterX;
             yPos = ((data.colorValue3[i]/data.labSpaceRange)*data.yHeight/2)+data.colorspaceCenterY;

             xPos2 = ((data.colorValue2[i+1]/data.labSpaceRange)*data.xWidth/2)+data.colorspaceCenterX;
             yPos2 = ((data.colorValue3[i+1]/data.labSpaceRange)*data.yHeight/2)+data.colorspaceCenterY;
             break;
             case "din99":
             xPos = ((data.colorValue2[i]-data.data.rangeA99Neg)/data.rangeA99*(data.xEnd-data.xStart))+data.xStart;
             yPos = ((data.colorValue3[i]-data.data.rangeB99Neg)/data.rangeB99*(data.yEnd-data.yStart))+data.yStart;

             xPos2 = ((data.colorValue2[i+1]-data.data.rangeA99Neg)/data.rangeA99*(data.xEnd-data.xStart))+data.xStart;
             yPos2 = ((data.colorValue3[i+1]-data.data.rangeB99Neg)/data.rangeB99*(data.yEnd-data.yStart))+data.yStart;
             break;
             default:
             console.log("Error at the changeColorspace function");
             return;
         }

         if(tmpKey=="left key" || tmpKey=="interval left key" || tmpKey=="twin key" ||  tmpKey=="interval twin key"){
             if(leftOrTwinStarted){
               leftOrTwinStarted=false;
             }
             else{
               leftOrTwinStarted=true;

               jsonObj.modus = "drawLine";
               jsonObj.xPos = xPos;
               jsonObj.yPos = yPos;
               jsonObj.xPos2 = xPos2;
               jsonObj.yPos2 = yPos2;
               jsonObj.dashed = true;
               jsonObj.isCompare = data.isCompareMap;

               self.postMessage(jsonObj);


               continue;
             }
         }


         jsonObj.modus = "drawLine";
         jsonObj.xPos = xPos;
         jsonObj.yPos = yPos;
         jsonObj.xPos2 = xPos2;
         jsonObj.yPos2 = yPos2;
         jsonObj.dashed = false;
         jsonObj.isCompare = data.isCompareMap;

         self.postMessage(jsonObj);



         //if(doOriginalValuePlot){
           xVPos = data.plotXStart+((data.ref[i]-data.ref[0])/refLength)*plotwidth;
           xVPos2 = data.plotXStart+((data.ref[i+1]-data.ref[0])/refLength)*plotwidth;
         /*}
         else{
           xVPos2 = xVPos+widthVAreaInterval;
         }*/

         switch(data.analyzeColorspaceModus){
             case "hsv":
             yPos = Math.round(data.plotYStart-(heigthVArea*data.colorValue3[i]));
             yPos2 = Math.round(data.plotYStart-(heigthVArea*data.colorValue3[i+1]));
             break;
             case "lab":
             yPos = Math.round(data.plotYStart-(heigthVArea*data.colorValue1[i]/100));
             yPos2 = Math.round(data.plotYStart-(heigthVArea*data.colorValue1[i+1]/100));
             break;
             case "din99":
             yPos = Math.round(data.plotYStart-(heigthVArea*data.colorValue1[i]/100));
             yPos2 = Math.round(data.plotYStart-(heigthVArea*data.colorValue1[i+1]/100));
             break;
             default:
             console.log("Error at the changeColorspace function");
             return;
         }


        jsonObj.modus = "drawLineVContext";
        jsonObj.xPos = xVPos;
        jsonObj.yPos = yPos;
        jsonObj.xPos2 = xVPos2;
        jsonObj.yPos2 = yPos2;
        jsonObj.dashed = false;
        jsonObj.isCompare = data.isCompareMap;

        self.postMessage(jsonObj);


         /*if(doOriginalValuePlot==false){
           xVPos = xVPos2;
         }*/

  }


  jsonObj.modus = "finish";

  self.postMessage(jsonObj);




}, false);
