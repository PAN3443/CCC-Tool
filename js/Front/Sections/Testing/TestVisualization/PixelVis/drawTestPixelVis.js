function drawTest_Pixel(field, doStatusbar){

  /*********************************************
  ***** OLD draw Function
  **********************************************/
  var canvasID="id_Test_PixelCanvas";
  var canvasIDGrey="id_Test_PixelCanvasGrey";

  if(document.getElementById("id_PopUp_fullTestingWindow").style.display!="none"){
    canvasID="id_Test_PixelCanvasFull";
    canvasIDGrey="id_Test_PixelCanvasGreyFull";
  }

  var canvasPlot = document.getElementById(canvasID);
  var canvasCtx = canvasPlot.getContext("2d");

  var canvasPlotGrey = document.getElementById(canvasIDGrey);
  var canvasCtxGrey = canvasPlotGrey.getContext("2d");


  if(field==undefined){
    canvasCtx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);
    canvasCtxGrey.clearRect(0, 0, canvasPlot.width, canvasPlot.height);
    return;
  }

  if(field.getCellValues()){
    canvasPlot.width = field.getXDim()-1;
    canvasPlot.height = field.getYDim()-1;
    canvasPlotGrey.width = field.getXDim()-1;
    canvasPlotGrey.height = field.getYDim()-1;
  }
  else {
    canvasPlot.width = field.getXDim();
    canvasPlot.height = field.getYDim();
    canvasPlotGrey.width = field.getXDim();
    canvasPlotGrey.height = field.getYDim();
  }

   canvasCtx.mozImageSmoothingEnabled = false;
   canvasCtx.webkitImageSmoothingEnabled = false;
   canvasCtx.msImageSmoothingEnabled = false;
   canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
   canvasCtx.oImageSmoothingEnabled = false;

   canvasCtxGrey.mozImageSmoothingEnabled = false;
   canvasCtxGrey.webkitImageSmoothingEnabled = false;
   canvasCtxGrey.msImageSmoothingEnabled = false;
   canvasCtxGrey.imageSmoothingEnabled = false; // did not work !?!?!
   canvasCtxGrey.oImageSmoothingEnabled = false;

  var canvasData = canvasCtx.createImageData(canvasPlot.width, canvasPlot.height);
  var canvasDataGrey = canvasCtxGrey.createImageData(canvasPlotGrey.width, canvasPlotGrey.height);


  for(var x=0; x<canvasPlot.width; x++){



      for(var y=0; y<canvasPlot.height; y++){

          var tmpColor = field.getFieldColor(x,y);
          var tmpColorGrey = field.getFieldGreyColor(x,y);

          if(tmpColor==undefined){
            tmpColor = new classColor_RGB(0,0,1);
          }

          if(tmpColorGrey==undefined){
            tmpColorGrey = new classColor_RGB(0,0,1);
          }

            var index = (x + (canvasPlot.height-(y+1)) * canvasPlot.width) * 4;
            canvasData.data[index + 0] = Math.round(tmpColor.getRValue() * 255); // r
            canvasData.data[index + 1] = Math.round(tmpColor.getGValue() * 255); // g
            canvasData.data[index + 2] = Math.round(tmpColor.getBValue() * 255); // b
            canvasData.data[index + 3] = 255; //a

            canvasDataGrey.data[index + 0] = Math.round(tmpColorGrey.getRValue() * 255); // r
            canvasDataGrey.data[index + 1] = Math.round(tmpColorGrey.getGValue() * 255); // g
            canvasDataGrey.data[index + 2] = Math.round(tmpColorGrey.getBValue() * 255); // b
            canvasDataGrey.data[index + 3] = 255; //a


    }

  }

  canvasCtx.putImageData(canvasData, 0, 0);
  canvasCtxGrey.putImageData(canvasDataGrey, 0, 0);


  /*********************************************
  ***** OLD draw Function
  **********************************************/

  /*var pixelsPerXStep = Math.floor(testingFieldResolution/field.getXDim());
  var pixelsPerYStep = Math.floor(testingFieldResolution/field.getYDim());

  var imageDIMX = field.getXDim()*pixelsPerXStep;
  var imageDIMY = field.getYDim()*pixelsPerXStep;

  canvasPlot.width = imageDIMX;
  canvasPlot.height = imageDIMY;

   canvasCtx.mozImageSmoothingEnabled = false;
   canvasCtx.webkitImageSmoothingEnabled = false;
   canvasCtx.msImageSmoothingEnabled = false;
   canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
   canvasCtx.oImageSmoothingEnabled = false;

  var canvasData = canvasCtx.createImageData(canvasPlot.width, canvasPlot.height); //getImageData(0, 0, canvasPlot.width, canvasPlot.height);


  for(var x=0; x<field.getXDim(); x++){

    for (var subX = 0; subX < pixelsPerXStep; subX++) {

      var currentX = x*pixelsPerXStep+subX;

      for(var y=0; y<field.getYDim(); y++){

          var tmpColor = field.getFieldColor(x,y);

          if(tmpColor==undefined){
            tmpColor = new classColor_RGB(0,0,1);
          }

          for (var subY = 0; subY < pixelsPerYStep; subY++) {

            var currentY = y*pixelsPerYStep+subY;

            var index = (currentX + currentY * canvasPlot.width) * 4;
            canvasData.data[index + 0] = Math.round(tmpColor.getRValue() * 255); // r
            canvasData.data[index + 1] = Math.round(tmpColor.getGValue() * 255); // g
            canvasData.data[index + 2] = Math.round(tmpColor.getBValue() * 255); // b
            canvasData.data[index + 3] = 255; //a

          }

      }

    }

  }

  canvasCtx.putImageData(canvasData, 0, 0);*/
}
