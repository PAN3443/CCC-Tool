

function createTopologyField(options){

  topologyField==undefined;

  switch (document.getElementById("id_Test_TopologyFoundation").selectedIndex) {
    case 0:
      createPlaneFoundation(options[1]);
    break;
    case 1:
      createGradientFoundation(options[1]);
    break;
    case 2:
      createRidgeValleyFoundation(options[1]);
    break;
    case 3:
      createExtremaFoundation(options[1]);
    break;
  }

  if(topologyField==undefined || topologyField.length<1)
    return;


  var max = -Infinity;
  var min = Infinity;
  var dis = undefined;

  if(document.getElementById("id_Test_TopologyFoundation").selectedIndex!=0){

    for (var i = 0; i < topologyField.length; i++) {
      for (var j = 0; j < topologyField[i].length; j++) {
        max = Math.max(topologyField[i][j],max);
        min = Math.min(topologyField[i][j],min);
      }
    }
    dis = max-min;

    if(dis==0)
      return;
  }


  var canvasPlot = document.getElementById("id_TestPage_newTestTopologyCanvas");
  var canvasCtx = canvasPlot.getContext("2d");

  canvasPlot.width = topologyField.length;
  canvasPlot.height = topologyField[0].length;

 canvasCtx.mozImageSmoothingEnabled = false;
 canvasCtx.webkitImageSmoothingEnabled = false;
 canvasCtx.msImageSmoothingEnabled = false;
 canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
 canvasCtx.oImageSmoothingEnabled = false;

  var canvasData = canvasCtx.createImageData(canvasPlot.width, canvasPlot.height);

  for (var x = 0; x < canvasPlot.width; x++) {

    for (var y = 0; y < canvasPlot.height; y++) {

        var val = (topologyField[x][y]-min)/dis;

        if(document.getElementById("id_Test_TopologyFoundation").selectedIndex!=0)
          val = (topologyField[x][y]-min)/dis*255;
        else
          val = 125;

        var index = (x + (canvasPlot.height-y) * canvasPlot.width) * 4;

        canvasData.data[index + 0] = Math.round(val); // r
        canvasData.data[index + 1] = Math.round(val); // g
        canvasData.data[index + 2] = Math.round(val); // b
        canvasData.data[index + 3] = 255; //a


    }

  }


  canvasCtx.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;

}


function drawTopologyPreview(){






}
