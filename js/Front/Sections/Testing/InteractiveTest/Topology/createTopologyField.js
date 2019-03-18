

function createTopologyField(options){

  topologyField=undefined;

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

  if(topologyField[0].length<1)
    return;


  ///////////////////////////////////////////////////////////////
  for (var index = 0; index < cccTest_NewTopology_Options[2].length; index++) {

    var posX = Math.round(topologyField.length*cccTest_NewTopology_Options[2][index][1]);
    var posY = Math.round(topologyField[0].length*cccTest_NewTopology_Options[2][index][2]);
    var sizeX = Math.round(topologyField.length*cccTest_NewTopology_Options[2][index][3]);
    var sizeY = Math.round(topologyField[0].length*cccTest_NewTopology_Options[2][index][4]);
    var newPosX = Math.round(posX-sizeX/2.0);
    var newPosY = Math.round(posY-sizeY/2.0);

    // check field area min and max value
    var endX = newPosX+sizeX;
    var endY = newPosY+sizeY;

    var areaMax = -Infinity;
    var areaMin = Infinity;

    var template = new Array();

    for (var x = newPosX; x <= endX; x++) {

      var tmpArray= new Array(sizeY).fill(0);
      template.push(tmpArray);

      if(x<0 || x>=topologyField.length)
        continue;

      for (var y = newPosY; y <= endY; y++) {

        if(y<0 || y>=topologyField[0].length)
          continue;

        areaMax=Math.max(topologyField[x][y],areaMax);
        areaMin=Math.min(topologyField[x][y],areaMin);

      }
    }

    ////// Create Template

    switch (cccTest_NewTopology_Options[2][index][0]) {
      case 0:
      case 1:

        var sign = 1;

        if(cccTest_NewTopology_Options[2][index][0]==0)
          sign=-1;

        var amount = cccTest_NewTopology_Options[2][index][5];
        var exponent = 2;
        var xStart = -1;
        var yStart = -1;
        var xStep = 2 / (template.length - 1);
        var yStep = 2 / (template[0].length - 1);
        for (var x = 0; x < template.length; x++) {
          var currentX = xStart + x * xStep;
          for (var y = 0; y < template[x].length; y++) {
            var currentY = yStart + y * yStep;

            var val1 = -1*Math.pow(currentX, exponent)+1;
            var val2 = -1*Math.pow(currentY, exponent)+1;
            var value = Math.min(val1,val2);
            template[x][y]=sign*value*amount;
          }
        }
      break;

      case 2:

      break;

      case 3:

      break;

    }

    // Add Template to field
    for (var x = 0; x < template.length; x++) {
      var fieldPosX = newPosX + x;

      if(fieldPosX<0 || fieldPosX>=topologyField.length)
        continue;

      for (var y = 0; y < template[x].length; y++) {
        var fieldPosY = newPosY + y;

        if(fieldPosY<0 || fieldPosY>=topologyField[0].length)
          continue;

        topologyField[fieldPosX][fieldPosY]+=template[x][y];
      }
    }

  }

  ///

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


        var mirrorY = canvasPlot.height-1-y;

        var val = (topologyField[x][mirrorY]-min)/dis;

        if(document.getElementById("id_Test_TopologyFoundation").selectedIndex!=0)
          val = (topologyField[x][mirrorY]-min)/dis*255;
        else
          val = 125;

        var index = (x + y * canvasPlot.width) * 4;

        canvasData.data[index + 0] = Math.round(val); // r
        canvasData.data[index + 1] = Math.round(val); // g
        canvasData.data[index + 2] = Math.round(val); // b
        canvasData.data[index + 3] = 255; //a


    }

  }


  canvasCtx.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;

  if(drawElementInPreview && drawElementID!=-1 && drawElementID<cccTest_NewTopology_Options[2].length){
    var posX = Math.round(canvasPlot.width*cccTest_NewTopology_Options[2][drawElementID][1]);
    var posY = Math.round(canvasPlot.height-canvasPlot.height*cccTest_NewTopology_Options[2][drawElementID][2]);
    var sizeX = Math.round(canvasPlot.width*cccTest_NewTopology_Options[2][drawElementID][3]);
    var sizeY = Math.round(canvasPlot.height*cccTest_NewTopology_Options[2][drawElementID][4]);

    var newPosX = Math.round(posX-sizeX/2.0);
    var newPosY = Math.round(posY-sizeY/2.0);
    canvasCtx.strokeStyle = styleActiveColor;
    canvasCtx.rect(newPosX, newPosY, sizeX, sizeY);
    canvasCtx.stroke();
  }

}


function drawTopologyPreview(){






}
