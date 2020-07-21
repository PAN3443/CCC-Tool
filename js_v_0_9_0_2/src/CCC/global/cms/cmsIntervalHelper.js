
function calcGradientLinear(val1_1,val1_2,val1_3,val2_1,val2_2,val2_3,ratio){

  var val1 = val1_1+(val2_1-val1_1)*ratio;
  var val2 = val1_2+(val2_2-val1_2)*ratio;
  var val3 = val1_3+(val2_3-val1_3)*ratio;

  return [val1,val2,val3];

}

function  calcDeltaIntervalBetween_C1C2(tmpColor,tmpColor2, intervalDeltaDis, interpolationSpace){

  var results = [];

  /////////////////////////////////////////////////////////////
  //////// First Step : Get approx number of color
  /////////////////////////////////////////////////////////////

  if(tmpColor==undefined || tmpColor2==undefined){
    return undefined;
  }

  var tmpDelta = 0;

  switch (interpolationSpace) {
    case "rgb":
    case "hsv":
    case "lch":
    case "lab":
    case "lms":
    case "din99":
      tmpDelta = calc3DEuclideanDistance(tmpColor,tmpColor2);
    break;
    case "de94":
    case "de94-ds":
      tmpDelta = calcDeltaDE94(tmpColor,tmpColor2);
    break;
    case "de2000":
    case "de2000-ds":
      tmpDelta = calcDeltaCIEDE2000(tmpColor,tmpColor2);
    break;
    default:
      return undefined;
  }

  var numberIntervals = Math.round(tmpDelta/intervalDeltaDis); // number of colors = numberIntervals-1

  /////////////////////////////////////////////////////////////
  //////// First Step : Get approx number of color
  /////////////////////////////////////////////////////////////
    var colors = [];

    for (var i = 1; i < numberIntervals; i++) {

      var tmpRatio = i/numberIntervals;
      var newColor = calcGradientLinear(tmpColor[1],tmpColor[2],tmpColor[3],tmpColor2[1],tmpColor2[2],tmpColor2[3], tmpRatio);

      switch (interpolationSpace) {
        case "lab":
        case "de94-ds":
        case "de2000-ds":
        case "de94":
        case "de2000":
            colors.push(["lab",newColor[0],newColor[1],newColor[2]]);
        break;
        default:
            colors.push([interpolationSpace,newColor[0],newColor[1],newColor[2]]);
    }
  }

    if(colors.length==0){
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
        colorDifferences.push(calc3DEuclideanDistance(tmpColor,colors[0]));
      break;
      case "de94":
      case "de94-ds":
        colorDifferences.push(calcDeltaDE94(tmpColor,colors[0]));
      break;
      case "de2000":
      case "de2000-ds":
        colorDifferences.push(calcDeltaCIEDE2000(tmpColor,colors[0]));
      break;
    }

    for (var i = 0; i < colors.length-1; i++) {
      switch (interpolationSpace) {
        case "rgb":
        case "hsv":
        case "lch":
        case "lab":
        case "din99":
          colorDifferences.push(calc3DEuclideanDistance(colors[i],colors[i+1]));
        break;
        case "de94":
        case "de94-ds":
          colorDifferences.push(calcDeltaDE94(colors[i],colors[i+1]));
        break;
        case "de2000":
        case "de2000-ds":
          colorDifferences.push(calcDeltaCIEDE2000(colors[i],colors[i+1]));
        break;
      }
    }

    switch (interpolationSpace) {
      case "rgb":
      case "hsv":
      case "lch":
      case "lab":
      case "din99":
        colorDifferences.push(calc3DEuclideanDistance(colors[colors.length-1],tmpColor2));
      break;
      case "de94":
      case "de94-ds":
        colorDifferences.push(calcDeltaDE94(colors[colors.length-1],tmpColor2));
      break;
      case "de2000":
      case "de2000-ds":
        colorDifferences.push(calcDeltaCIEDE2000(colors[colors.length-1],tmpColor2));
      break;
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


    colorVal1 = 0.5*(c0[1]*influenceFactorP0 + c1[1]*influenceFactorP1 + c2[1]*influenceFactorP2 + c3[1]*influenceFactorP3); // half of  the values because influence factor P1 and P2 are between 0 and 2. and we want to have 0,1
    colorVal2 = 0.5*(c0[2]*influenceFactorP0 + c1[2]*influenceFactorP1 + c2[2]*influenceFactorP2 + c3[2]*influenceFactorP3);
    colorVal3 = 0.5*(c0[3]*influenceFactorP0 + c1[3]*influenceFactorP1 + c2[3]*influenceFactorP2 + c3[3]*influenceFactorP3);


    // check if color is RGB possible
    // IDEE scale influenceFactorP0 influenceFactorP3 with additional factor Curvescale. Start every time with curvescale 1 which would result in the wished curve. If a color is not possible reduce the curvescale factor.
    // if the factor is zero, the algorithm should produce a line and not a curve
    var newColor = undefined;
    switch (interpolationSpace){
          case "lab":
          case "de94":
          case "de94-ds":
          case "de2000-ds":
            newColor= ["lab",colorVal1,colorVal2,colorVal3];
            break;
          default:
            newColor= [interpolationSpace,colorVal1,colorVal2,colorVal3];
    }

    ///////////////// For later check here the RGB Possiblity and then reduce the spline scale (1=full spline, 0=straight line)
    // switch off the rgb auto clipping from the global work color
    // check the rgb possiblity
    // scale spline if
    // turn on the auto clipping from the global work color.

    // do rgb clipping using the global work color
    gWorkColor1.autoRGBClipping=true;
    gWorkColor1.updateColor(newColor[0],newColor[1],newColor[2],newColor[3]);

    resultColors.push(gWorkColor1.getColorInfo(newColor[0]));

  }

  if(resultColors.length==0){
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
      colorDifferences.push(calc3DEuclideanDistance(c1,resultColors[0]));
    break;
    case "de94":
    case "de94-ds":
      colorDifferences.push(calcDeltaDE94(c1,resultColors[0]));
    break;
    case "de2000":
    case "de2000-ds":
      colorDifferences.push(calcDeltaCIEDE2000(c1,resultColors[0]));
    break;
  }

  for (var i = 0; i < resultColors.length-1; i++) {
    switch (interpolationSpace) {
      case "rgb":
      case "hsv":
      case "lch":
      case "lab":
      case "din99":
        colorDifferences.push(calc3DEuclideanDistance(resultColors[i],resultColors[i+1]));
      break;
      case "de94":
      case "de94-ds":
        colorDifferences.push(calcDeltaDE94(resultColors[i],resultColors[i+1]));
      break;
      case "de2000":
      case "de2000-ds":
        colorDifferences.push(calcDeltaCIEDE2000(resultColors[i],resultColors[i+1]));
      break;
    }
  }

  switch (interpolationSpace) {
    case "rgb":
    case "hsv":
    case "lch":
    case "lab":
    case "din99":
      colorDifferences.push(calc3DEuclideanDistance(resultColors[resultColors.length-1],c2));
    break;
    case "de94":
    case "de94-ds":
      colorDifferences.push(calcDeltaDE94(resultColors[resultColors.length-1],c2));
    break;
    case "de2000":
    case "de2000-ds":
      colorDifferences.push(calcDeltaCIEDE2000(resultColors[resultColors.length-1],c2));
    break;
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



/*function checkIntervalInputFieldsChange(event){

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

/*function checkIntervalInputFieldsKey(event){

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
}*/
