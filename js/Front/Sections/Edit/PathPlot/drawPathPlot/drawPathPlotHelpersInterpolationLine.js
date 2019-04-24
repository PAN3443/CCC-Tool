

function calcRGBInterpolationLine(canvasSize){
  pathplotLines=[];
  pathplotLinesDashed=[];

  var areaDim = canvasSize * 0.7;

  globalCMS1.calcDeltaIntervalColors(intervalDelta, 0,globalCMS1.getKeyLength()-1);
  for (var i = 0; i < globalCMS1.getKeyLength()-1; i++) {

    switch (globalCMS1.getKeyType(i)) {
      case "nil key":

      break;
      case "twin key":
        var intervalIndexA = globalCMS1.getIntervalPositions(i);
        pathplotLinesDashed.push(getRGBLineSegment(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getRightKeyColor(i,"rgb"),areaDim));
          for(var j=intervalIndexA[0]; j<intervalIndexA[1]; j++){
            pathplotLines.push(getRGBLineSegment(globalCMS1.getIntervalColor(j,"rgb"),globalCMS1.getIntervalColor(j+1,"rgb"),areaDim));
          }
        break;
      case "left key":
        pathplotLinesDashed.push(getRGBLineSegment(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getLeftKeyColor(i+1,"rgb"),areaDim));
        break;

      default:

        var intervalIndexA = globalCMS1.getIntervalPositions(i);
        if(globalCMS1.getKeyType(i)=="dual key"){
          pathplotLines.push(getRGBLineSegment(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getIntervalColor(intervalIndexA[0],"rgb"),areaDim));
        }

          for(var j=intervalIndexA[0]; j<intervalIndexA[1]; j++){
            pathplotLines.push(getRGBLineSegment(globalCMS1.getIntervalColor(j,"rgb"),globalCMS1.getIntervalColor(j+1,"rgb"),areaDim));
          }

      }

    }

}


function getRGBLineSegment(fromColor, tillColor,areaDim){

  var rgbFromPos = [];
  rgbFromPos.push(fromColor.getRValue() * areaDim);
  rgbFromPos.push(fromColor.getGValue() * areaDim);
  rgbFromPos.push(fromColor.getBValue() * areaDim);

  var rgbTillPos = [];
  rgbTillPos.push(tillColor.getRValue() * areaDim);
  rgbTillPos.push(tillColor.getGValue() * areaDim);
  rgbTillPos.push(tillColor.getBValue() * areaDim);

  var rgbFromPos3D = [];
  rgbFromPos3D.push(fromColor.getRValue() *255 - 128);
  rgbFromPos3D.push(fromColor.getGValue() *255 - 128);
  rgbFromPos3D.push(fromColor.getBValue() *255 - 128);

  var rgbTillPos3D = [];
  rgbTillPos3D.push(tillColor.getRValue() *255 - 128);
  rgbTillPos3D.push(tillColor.getGValue() *255 - 128);
  rgbTillPos3D.push(tillColor.getBValue() *255 - 128);

  var posArray = [rgbFromPos,rgbTillPos,rgbFromPos3D,rgbTillPos3D];

  return posArray;

}

function drawInterpolationLine(canvasContex,canvasSize,lineArray, isDashed, index1, index2){

  var startPosX = canvasSize * 0.1;
  var startPosY = canvasSize * 0.9;

  canvasContex.beginPath();

  if(isDashed){
    var dash = Math.round(canvasSize*0.05);
    canvasContex.setLineDash([dash,dash]);
  }
  else
    canvasContex.setLineDash([]);


  for (var i = 0; i < lineArray.length; i++) {
      canvasContex.moveTo(lineArray[i][0][index1]+startPosX, startPosY-lineArray[i][0][index2]);
      canvasContex.lineTo(lineArray[i][1][index1]+startPosX, startPosY-lineArray[i][1][index2]);
  }


  canvasContex.lineWidth=bigLineWidth;
  canvasContex.strokeStyle = 'rgb(0,0,0)';
  canvasContex.stroke();

  canvasContex.lineWidth=smallLineWidth;
  canvasContex.strokeStyle = 'rgb(255,255,255)';
  canvasContex.stroke();
}

function draw3DInterpolationLine(lineArray,isDashed)
{
  for (var i = 0; i < lineArray.length; i++) {
    draw3DLine(lineArray[i][2][0], lineArray[i][2][1], lineArray[i][2][2], lineArray[i][3][0], lineArray[i][3][1], lineArray[i][3][2], isDashed);
  }
}
