function calcRGBElements(canvasSize){

  var areaDim = canvasSize * 0.7;

  pathplotElementPositions=[];
  /*var xStart = canvasObj0.width * 0.1;
  var yStart = canvasObj0.height * 0.9;
  var xEnd = canvasObj0.width * 0.8;
  var yEnd = canvasObj0.height * 0.2;
  var xWidth = xEnd - xStart;
  var yHeight = yStart - yEnd;

  var xPos, yPos, xPos2, yPos2, tmpColor, tmpColor2;*/

    for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

      switch (globalCMS1.getKeyType(i)) {
        case "nil key":
          // do nothing

          break;
        case "twin key":

            tmpColor = globalCMS1.getLeftKeyColor(i, "rgb");

            var drawCircle = true;
            if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
              drawCircle = false;

            ////////////////////////////////////////////////////////////////
            /////// left Color
            pathplotElementPositions.push(calcRGBElementPos(tmpColor,drawCircle,areaDim,i,0));

            ////////////////////////////////////////////////////////////////
            /////// Right Color
            tmpColor = globalCMS1.getRightKeyColor(i, "rgb");
            pathplotElementPositions.push(calcRGBElementPos(tmpColor,true,areaDim,i,1));

          break;
        case "left key":
            var drawCircle = true;
            if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
              drawCircle = false;

            ////////////////////////////////////////////////////////////////
            /////// left Color
            tmpColor = globalCMS1.getLeftKeyColor(i, "rgb");
            pathplotElementPositions.push(calcRGBElementPos(tmpColor,drawCircle,areaDim,i,0));

            ////////////////////////////////////////////////////////
            ///// Right Color
            // do nothing
          break;

          case "right key":
            tmpColor = globalCMS1.getRightKeyColor(i, "rgb"); // right color because of right key
            pathplotElementPositions.push(calcRGBElementPos(tmpColor,true,areaDim,i,1));
          break;
        default:
            // dual Key
            tmpColor = globalCMS1.getRightKeyColor(i, "rgb"); // right color because of right key
            pathplotElementPositions.push(calcRGBElementPos(tmpColor,true,areaDim,i,2));

      }

    }



}


function calcRGBElementPos(tmpColor,shape,areaDim,keyindex,colorSide){

  var rgbPos = [];
  rgbPos.push(tmpColor.getRValue() * areaDim);
  rgbPos.push(tmpColor.getGValue() * areaDim);
  rgbPos.push(tmpColor.getBValue() * areaDim);

  var rgbPos3D = [];
  rgbPos3D.push(tmpColor.getRValue() *255 - 128);
  rgbPos3D.push(tmpColor.getGValue() *255 - 128);
  rgbPos3D.push(tmpColor.getBValue() *255 - 128);

  var posArray = [keyindex,tmpColor.getHexString(),shape,colorSide,rgbPos,rgbPos3D];

  return posArray;

}


function drawRGBElements(canvasContex,canvasSize, index1, index2){

  var startPosX = canvasSize * 0.1;
  var startPosY = canvasSize * 0.9;

  for (var i = 0; i < pathplotElementPositions.length; i++) {
    var xPos = pathplotElementPositions[i][4][index1]+startPosX;
    var yPos = startPosY-pathplotElementPositions[i][4][index2];
    drawElement(pathplotElementPositions[i][1], canvasContex, xPos, yPos, pathplotElementPositions[i][0],pathplotElementPositions[i][3], pathplotElementPositions[i][2]);
  }

}

function drawRGB3DElements(){
  for (var i = 0; i < pathplotElementPositions.length; i++) {
    draw3DElement(pathplotElementPositions[i][1], pathplotElementPositions[i][5][0], pathplotElementPositions[i][5][1], pathplotElementPositions[i][5][2], pathplotElementPositions[i][0],pathplotElementPositions[i][3], pathplotElementPositions[i][2]);
  }
}
