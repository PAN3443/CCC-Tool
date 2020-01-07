
function calcGradientLinear(rVal1,gVal1,bVal1,rVal2,gVal2,bVal2,ratio){

  var rValue = rVal1+(rVal2-rVal1)*ratio;
  var gValue = gVal1+(gVal2-gVal1)*ratio;
  var bValue = bVal1+(bVal2-bVal1)*ratio;

  return [rValue,gValue,bValue];

}

function  calcDeltaIntervalBetween_C1C2(tmpColor,tmpColor2, intervalDeltaDis, interpolationSpace){

  var results = [];

  /////////////////////////////////////////////////////////////
  //////// First Step : Get approx number of color
  /////////////////////////////////////////////////////////////

  if(tmpColor==undefined || tmpColor2==undefined){

    if(tmpColor!=undefined){
      tmpColor.deleteReferences();
      tmpColor=null;
    }

    if(tmpColor2!=undefined){
      tmpColor2.deleteReferences();
      tmpColor2=null;
    }

    return undefined;
  }

  var tmpDelta = 0;

  switch (interpolationSpace) {
    case "rgb":
    case "hsv":
    case "lch":
    case "lab":
    case "din99":
      tmpDelta = calc3DEuclideanDistance(cloneColor(tmpColor),cloneColor(tmpColor2));
    break;
    case "de94":
    case "de94-ds":
      tmpDelta = calcDeltaDE94(cloneColor(tmpColor),cloneColor(tmpColor2));
    break;
    case "de2000":
    case "de2000-ds":
      tmpDelta = calcDeltaCIEDE2000(cloneColor(tmpColor),cloneColor(tmpColor2));
    break;
    default:
    tmpColor.deleteReferences();
    tmpColor2.deleteReferences();
    tmpColor=null;
    tmpColor2=null;
    return undefined;
  }

  var numberIntervals = Math.round(tmpDelta/intervalDeltaDis); // number of colors = numberIntervals-1

  /////////////////////////////////////////////////////////////
  //////// First Step : Get approx number of color
  /////////////////////////////////////////////////////////////
  var colors = [];

  for (var i = 1; i < numberIntervals; i++) {

    var tmpRatio = i/numberIntervals;
    var newColor = calcGradientLinear(tmpColor.get1Value(),tmpColor.get2Value(),tmpColor.get3Value(),tmpColor2.get1Value(),tmpColor2.get2Value(),tmpColor2.get3Value(), tmpRatio);

    switch (interpolationSpace) {
        case "rgb":
          colors.push(new class_Color_RGB(newColor[0],newColor[1],newColor[2]));
                  /*colors.push(new class_Color_HSV(newColor[0],newColor[1],newColor[2]));
                  var rValue = tmpColor.get1Value()+(tmpColor2.get1Value() - tmpColor.get1Value())*tmpRatio;
                  var gValue = tmpColor.get2Value()+(tmpColor2.get2Value() - tmpColor.get2Value())*tmpRatio;
                  var bValue = tmpColor.get3Value()+(tmpColor2.get3Value() - tmpColor.get3Value())*tmpRatio;

                  colors.push(new class_Color_RGB(rValue,gValue,bValue));*/
                break;
          case "hsv":
            colors.push(new class_Color_HSV(newColor[0],newColor[1],newColor[2]));

                /*  var tmpDis = tmpColor.getSValue()*50; // radius 50; center(0,0,0);
                  var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                  var xPos = tmpDis*Math.cos(tmpRad);
                  var yPos = tmpDis*Math.sin(tmpRad);
                  var zPos = tmpColor.getVValue()-50;

                  var tmpDis2 = tmpColor2.getSValue()*50;
                  var tmpRad2 = (tmpColor2.getHValue()*Math.PI*2)-Math.PI;
                  var xPos2 = tmpDis2*Math.cos(tmpRad2);
                  var yPos2 = tmpDis2*Math.sin(tmpRad2);
                  var zPos2 = tmpColor2.getVValue()-50;

                  var tmpX = xPos+(xPos2 - xPos)*tmpRatio;
                  var tmpY = yPos+(yPos2 - yPos)*tmpRatio;
                  var tmpZ = zPos+(zPos2 - zPos)*tmpRatio;

                  var tmpH =(Math.atan2(tmpY,tmpX)+Math.PI)/(Math.PI*2);
                  var tmpS = Math.sqrt(Math.pow(tmpX,2)+Math.pow(tmpY,2))/50;
                  var tmpV = tmpZ+50;
                  colors.push(new class_Color_HSV(tmpH,tmpS,tmpV));*/

        break;
        case "lch":
          colors.push(new class_Color_LCH(newColor[0],newColor[1],newColor[2]));
        break;
      case "lab":
      case "de94-ds":
      case "de2000-ds":
      case "de94":
      case "de2000":
          colors.push(new class_Color_LAB(newColor[0],newColor[1],newColor[2]));
          /*var lValue = tmpColor.get1Value()+(tmpColor2.get1Value() - tmpColor.get1Value())*tmpRatio;
          var aValue = tmpColor.get2Value()+(tmpColor2.get2Value() - tmpColor.get2Value())*tmpRatio;
          var bValue = tmpColor.get3Value()+(tmpColor2.get3Value() - tmpColor.get3Value())*tmpRatio;

          colors.push(new class_Color_LAB(lValue,aValue,bValue));*/

        break;
      case "din99":
          colors.push(new class_Color_DIN99(newColor[0],newColor[1],newColor[2]));
          /*var l99Value = tmpColor.get1Value()+(tmpColor2.get1Value() - tmpColor.get1Value())*tmpRatio;
          var a99Value = tmpColor.get2Value()+(tmpColor2.get2Value() - tmpColor.get2Value())*tmpRatio;
          var b99Value = tmpColor.get3Value()+(tmpColor2.get3Value() - tmpColor.get3Value())*tmpRatio;

          colors.push(new class_Color_DIN99(l99Value,a99Value,b99Value));*/
        break;
      case "lch":
            colors.push(new class_Color_LCH(newColor[0],newColor[1],newColor[2]));
            /*var tmpDis = tmpColor.getCValue()*50; // radius 50; center(0,0,0);
            var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
            var xPos = tmpDis*Math.cos(tmpRad);
            var yPos = tmpDis*Math.sin(tmpRad);
            var zPos = tmpColor.getLValue()-50;

            var tmpDis2 = tmpColor2.getCValue()*50;
            var tmpRad2 = (tmpColor2.getHValue()*Math.PI*2)-Math.PI;
            var xPos2 = tmpDis2*Math.cos(tmpRad2);
            var yPos2 = tmpDis2*Math.sin(tmpRad2);
            var zPos2 = tmpColor2.getLValue()-50;

            var tmpX = xPos+(xPos2 - xPos)*tmpRatio;
            var tmpY = yPos+(yPos2 - yPos)*tmpRatio;
            var tmpZ = zPos+(zPos2 - zPos)*tmpRatio;

            var tmpH =(Math.atan2(tmpY,tmpX)+Math.PI)/(Math.PI*2);
            var tmpC = Math.sqrt(Math.pow(tmpX,2)+Math.pow(tmpY,2))/50;
            var tmpL = tmpZ+50;
            colors.push(new class_Color_LCH(tmpL,tmpC,tmpH));
            */
          break;
    }

  }

    if(colors.length==0){
      tmpColor.deleteReferences();
      tmpColor2.deleteReferences();
      tmpColor=null;
      tmpColor2=null;
      return undefined;
    }
    /////////////////////////////////////////////////////////////
    //////// First Step : Get Color Differences
    /////////////////////////////////////////////////////////////
    var colorDifferences = [];

    switch (interpolationSpace) {
      case "rgb":
      case "hsv":
      case "lch":
      case "lab":
      case "din99":
        colorDifferences.push(calc3DEuclideanDistance(cloneColor(tmpColor),cloneColor(colors[0])));
      break;
      case "de94":
      case "de94-ds":
        colorDifferences.push(calcDeltaDE94(cloneColor(tmpColor),cloneColor(colors[0])));
      break;
      case "de2000":
      case "de2000-ds":
        colorDifferences.push(calcDeltaCIEDE2000(cloneColor(tmpColor),cloneColor(colors[0])));
      break;
    }

    for (var i = 0; i < colors.length-1; i++) {
      switch (interpolationSpace) {
        case "rgb":
        case "hsv":
        case "lch":
        case "lab":
        case "din99":
          colorDifferences.push(calc3DEuclideanDistance(cloneColor(colors[i]),cloneColor(colors[i+1])));
        break;
        case "de94":
        case "de94-ds":
          colorDifferences.push(calcDeltaDE94(cloneColor(colors[i]),cloneColor(colors[i+1])));
        break;
        case "de2000":
        case "de2000-ds":
          colorDifferences.push(calcDeltaCIEDE2000(cloneColor(colors[i]),cloneColor(colors[i+1])));
        break;
      }
    }

    switch (interpolationSpace) {
      case "rgb":
      case "hsv":
      case "lch":
      case "lab":
      case "din99":
        colorDifferences.push(calc3DEuclideanDistance(cloneColor(colors[colors.length-1]),cloneColor(tmpColor2)));
      break;
      case "de94":
      case "de94-ds":
        colorDifferences.push(calcDeltaDE94(cloneColor(colors[colors.length-1]),cloneColor(tmpColor2)));
      break;
      case "de2000":
      case "de2000-ds":
        colorDifferences.push(calcDeltaCIEDE2000(cloneColor(colors[colors.length-1]),cloneColor(tmpColor2)));
      break;
    }

    tmpColor.deleteReferences();
    tmpColor2.deleteReferences();
    tmpColor=null;
    tmpColor2=null;

    /////////////////////////////////////////////////////////////
    //////// First Step : Get ratios
    /////////////////////////////////////////////////////////////
    var deltaSum = 0;
    for (var i = 0; i < colorDifferences.length; i++) {
      deltaSum += colorDifferences[i];
    }

    if(deltaSum==0){
      return undefined;
    }

    var ratios= [];
    for (var i = 0; i < colorDifferences.length; i++) {
      ratios.push(colorDifferences[i]/deltaSum);
    }

    return [colors,colorDifferences,ratios];

}


//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////// Interval Functions : Spline interpolation /////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

/// Implementation for the CATMULL ROM Splines
function calcSplineIntervalBetween_C1C2(tArray, colorsArray, curvescale, interpolationSpace){


  if(curvescale<=0 ||
    colorsArray.length!=4 || colorsArray[0]==undefined || colorsArray[1]==undefined || colorsArray[2]==undefined ||
    colorsArray[3]==undefined){
    for (var i = colorsArray.length-1; i >=0 ; i--) {
      if(colorsArray[i]!=undefined){
        colorsArray[i].deleteReferences();
        colorsArray[i]=null;
      }
    }
    return undefined;
  }

  var resultColors = [];
  var c0 = colorsArray[0]; //
  var c1 = colorsArray[1]; //
  var c2 = colorsArray[2]; //
  var c3 = colorsArray[3]; //

  var continueCounter = 0;

  for (var i = 0; i < tArray.length; i++) {

    var t = tArray[i];
    var tt = Math.pow(t,2);
    var ttt = Math.pow(t,3);

    var influenceFactorP0 = (-ttt+2.0*tt-t)*curvescale; // f(x)=-x^3+2x^2-x
    var influenceFactorP1 = 3.0*ttt-5.0*tt+2.0; // f(x)=3x^3-5x^2+2
    var influenceFactorP2 = -3.0*ttt+4.0*tt+t; // f(x)=-3x^3+4x^2+x
    var influenceFactorP3 = (ttt-tt)*curvescale; // f(x)=x^3-x^2

    var colorVal1 = undefined;
    var colorVal2 = undefined;
    var colorVal3 = undefined;


    //if(interpolationSpace != "hsv"){
       colorVal1 = 0.5*(c0.get1Value()*influenceFactorP0 + c1.get1Value()*influenceFactorP1 + c2.get1Value()*influenceFactorP2 + c3.get1Value()*influenceFactorP3); // half of  the values because influence factor P1 and P2 are between 0 and 2. and we want to have 0,1
       colorVal2 = 0.5*(c0.get2Value()*influenceFactorP0 + c1.get2Value()*influenceFactorP1 + c2.get2Value()*influenceFactorP2 + c3.get2Value()*influenceFactorP3);
       colorVal3 = 0.5*(c0.get3Value()*influenceFactorP0 + c1.get3Value()*influenceFactorP1 + c2.get3Value()*influenceFactorP2 + c3.get3Value()*influenceFactorP3);
    /*}
    else{
      var tmpDis = c0.get2Value()*50; // radius 50; center(0,0,0);
      var tmpRad = (c0.get1Value()*Math.PI*2)-Math.PI;
      var xPos1 = tmpDis*Math.cos(tmpRad);
      var yPos1 = tmpDis*Math.sin(tmpRad);
      var zPos1 = c0.get3Value()-50;

      tmpDis = c1.get2Value()*50; // radius 50; center(0,0,0);
      tmpRad = (c1.get1Value()*Math.PI*2)-Math.PI;
      var xPos2 = tmpDis*Math.cos(tmpRad);
      var yPos2 = tmpDis*Math.sin(tmpRad);
      var zPos2 = c1.get3Value()-50;

      tmpDis = c2.get2Value()*50; // radius 50; center(0,0,0);
      tmpRad = (c2.get1Value()*Math.PI*2)-Math.PI;
      var xPos3 = tmpDis*Math.cos(tmpRad);
      var yPos3 = tmpDis*Math.sin(tmpRad);
      var zPos3 = c2.get3Value()-50;

      tmpDis = c3.get2Value()*50; // radius 50; center(0,0,0);
      tmpRad = (c3.get1Value()*Math.PI*2)-Math.PI;
      var xPos4 = tmpDis*Math.cos(tmpRad);
      var yPos4 = tmpDis*Math.sin(tmpRad);
      var zPos4 = c3.get3Value()-50;

      var tmpX = 0.5*(xPos1*influenceFactorP0 + xPos2*influenceFactorP1 + xPos3*influenceFactorP2 + xPos4*influenceFactorP3); // half of  the values because influence factor P1 and P2 are between 0 and 2. and we want to have 0,1
      var tmpY = 0.5*(yPos1*influenceFactorP0 + yPos2*influenceFactorP1 + yPos3*influenceFactorP2 + yPos4*influenceFactorP3);
      var tmpZ = 0.5*(zPos1*influenceFactorP0 + zPos2*influenceFactorP1 + zPos3*influenceFactorP2 + zPos4*influenceFactorP3);

      colorVal1 =(Math.atan2(tmpY,tmpX)+Math.PI)/(Math.PI*2);
      colorVal2 = Math.sqrt(Math.pow(tmpX,2)+Math.pow(tmpY,2))/50;
      colorVal3 = tmpZ+50;
    }*/

    // check if color is RGB possible
    // IDEE scale influenceFactorP0 influenceFactorP3 with additional factor Curvescale. Start every time with curvescale 1 which would result in the wished curve. If a color is not possible reduce the curvescale factor.
    // if the factor is zero, the algorithm should produce a line and not a curve
    var newColor = undefined;
    switch (interpolationSpace){
      case "rgb":
        newColor= new class_Color_RGB(colorVal1,colorVal2,colorVal3);
        break;
        case "hsv":
          newColor= new class_Color_HSV(colorVal1,colorVal2,colorVal3);
          break;
          case "lch":
          newColor= new class_Color_LCH(colorVal1,colorVal2,colorVal3);
          break;
          case "lab":
          case "de94":
          case "de94-ds":
          case "de2000-ds":
            newColor= new class_Color_LAB(colorVal1,colorVal2,colorVal3);
            break;
            case "din99":
              newColor= new class_Color_DIN99(colorVal1,colorVal2,colorVal3);
              break;
      default:

        for (var i = colorsArray.length-1; i >=0 ; i--) {
          if(colorsArray[i]!=undefined){
            colorsArray[i].deleteReferences();
            colorsArray[i]=null;
          }
        }
        return undefined;

    }

    if(newColor.checkRGBPossiblity()){
      resultColors.push(newColor);
    }
    else{
      //continueCounter++;
      continue;
      //var newCurvescale = curvescale-0.1;
      //return calcSplineIntervalBetween_C1C2(tArray, colorsArray, newCurvescale, interpolationSpace);
    }

  }

  if(continueCounter!=0)
    console.log(continueCounter);

  if(resultColors.length==0){
    for (var i = colorsArray.length-1; i >=0 ; i--) {
      if(colorsArray[i]!=undefined){
        colorsArray[i].deleteReferences();
        colorsArray[i]=null;
      }
    }
    return undefined;
  }
  /////////////////////////////////////////////////////////////
  //////// First Step : Get Color Differences
  /////////////////////////////////////////////////////////////
  var colorDifferences = [];

  switch (interpolationSpace) {
    case "rgb":
    case "hsv":
    case "lch":
    case "lab":
    case "din99":
      colorDifferences.push(calc3DEuclideanDistance(cloneColor(c1),cloneColor(resultColors[0])));
    break;
    case "de94":
    case "de94-ds":
      colorDifferences.push(calcDeltaDE94(cloneColor(c1),cloneColor(resultColors[0])));
    break;
    case "de2000":
    case "de2000-ds":
      colorDifferences.push(calcDeltaCIEDE2000(cloneColor(c1),cloneColor(resultColors[0])));
    break;
  }

  for (var i = 0; i < resultColors.length-1; i++) {
    switch (interpolationSpace) {
      case "rgb":
      case "hsv":
      case "lch":
      case "lab":
      case "din99":
        colorDifferences.push(calc3DEuclideanDistance(cloneColor(resultColors[i]),cloneColor(resultColors[i+1])));
      break;
      case "de94":
      case "de94-ds":
        colorDifferences.push(calcDeltaDE94(cloneColor(resultColors[i]),cloneColor(resultColors[i+1])));
      break;
      case "de2000":
      case "de2000-ds":
        colorDifferences.push(calcDeltaCIEDE2000(cloneColor(resultColors[i]),cloneColor(resultColors[i+1])));
      break;
    }
  }

  switch (interpolationSpace) {
    case "rgb":
    case "hsv":
    case "lch":
    case "lab":
    case "din99":
      colorDifferences.push(calc3DEuclideanDistance(cloneColor(resultColors[resultColors.length-1]),cloneColor(c2)));
    break;
    case "de94":
    case "de94-ds":
      colorDifferences.push(calcDeltaDE94(cloneColor(resultColors[resultColors.length-1]),cloneColor(c2)));
    break;
    case "de2000":
    case "de2000-ds":
      colorDifferences.push(calcDeltaCIEDE2000(cloneColor(resultColors[resultColors.length-1]),cloneColor(c2)));
    break;
  }

  for (var i = colorsArray.length-1; i >=0 ; i--) {
    if(colorsArray[i]!=undefined){
      colorsArray[i].deleteReferences();
      colorsArray[i]=null;
    }
  }

  /////////////////////////////////////////////////////////////
  //////// First Step : Get ratios
  /////////////////////////////////////////////////////////////
  var deltaSum = 0;
  for (var i = 0; i < colorDifferences.length; i++) {
    deltaSum += colorDifferences[i];
  }

  if(deltaSum==0){

    return undefined;
  }

  var ratios= [];
  for (var i = 0; i < colorDifferences.length; i++) {
    ratios.push(colorDifferences[i]/deltaSum);
  }

  return [resultColors,colorDifferences,ratios];

}



function checkIntervalInputFieldsChange(event){

    checkInputVal(document.getElementById(event.target.id),false,false);

    if(parseFloat(document.getElementById(event.target.id).value)>=1)
    intervalSize = parseFloat(document.getElementById(event.target.id).value);
    else{
      //openAlert("Attention: The number of interval points have to be at least two.");
      document.getElementById(event.target.id).value=intervalSize;
      return;
    }

    switch (event.target.id) {
      case "id_ExportIntervalNum":
        fillExportTable();
        break;
      default:

    }


}

function checkIntervalInputFieldsKey(event){

  checkInputVal(document.getElementById(event.target.id),false,false);

  if (event.keyCode == 13) {

    if(parseFloat(document.getElementById(event.target.id).value)>=1)
    intervalSize = parseFloat(document.getElementById(event.target.id).value);
    else{
      //openAlert("Attention: The number of interval points have to be at least two.");
      document.getElementById(event.target.id).value=intervalSize;
      return;
    }


    switch (event.target.id) {
      case "id_ExportIntervalNum":
        fillExportTable();
        break;
      default:

    }


  }

}
