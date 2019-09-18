

function calcLocalUniformityOptimum (cloneUnifomCMS){

  if(cloneUnifomCMS)
  globalCMS_Uniform = cloneCMS(globalCMS1_Original);

  var r1 = globalCMS_Uniform.getRefPosition(optimization_StartKey);
  var r2 = globalCMS_Uniform.getRefPosition(optimization_EndKey);
  var relevantDistance = Math.abs(r2-r1);

  var bandsDeltaArray = [];
  var contBandsDistances = [];
  var bandsDeltaSum = 0;

  for (var i = optimization_StartKey; i < optimization_EndKey; i++) {

    if(globalCMS_Uniform.getKeyType(i)==="nil key" || globalCMS_Uniform.getKeyType(i)==="left key"){
      bandsDeltaArray.push(undefined);
      var constBandDis = Math.abs(globalCMS_Uniform.getRefPosition(i+1)-globalCMS_Uniform.getRefPosition(i));
      relevantDistance -= constBandDis;
      contBandsDistances.push(constBandDis);
    }
    else {
          var c1 = globalCMS_Uniform.getRightKeyColor(i,globalCMS_Uniform.getInterpolationSpace());
          var c2 = globalCMS_Uniform.getLeftKeyColor(i+1,globalCMS_Uniform.getInterpolationSpace());

          var tmpDeltaSum = 0;

          if(((globalCMS_Uniform.getInterpolationType()==="linear" &&
             globalCMS_Uniform.getInterpolationSpace()!="rgb" &&  // distance of intervals is the same like the distance of start and end color
             globalCMS_Uniform.getInterpolationSpace()!="hsv" &&
             globalCMS_Uniform.getInterpolationSpace()!="lab" &&
             globalCMS_Uniform.getInterpolationSpace()!="din99") || globalCMS_Uniform.getInterpolationType()==="spline") &&
             globalCMS_Uniform.getIntervalLength(i)>0){

            switch (globalCMS_Uniform.getInterpolationSpace()) {
              case "rgb":
              case "hsv":
              case "lab":
              case "din99":
                tmpDeltaSum += calc3DEuclideanDistance(c1,globalCMS_Uniform.getIntervalColor(i,0,globalCMS_Uniform.getInterpolationSpace()));
                for (var j = 0; j < globalCMS_Uniform.getIntervalLength(i)-1; j++) {
                  tmpDeltaSum += calc3DEuclideanDistance(globalCMS_Uniform.getIntervalColor(i,j,globalCMS_Uniform.getInterpolationSpace()),globalCMS_Uniform.getIntervalColor(i,j+1,globalCMS_Uniform.getInterpolationSpace()));
                }
                tmpDeltaSum += calc3DEuclideanDistance(globalCMS_Uniform.getIntervalColor(i,globalCMS_Uniform.getIntervalLength(i)-1,globalCMS_Uniform.getInterpolationSpace()),c2);
                break;
              case "de94":
              case "de94-ds":
                tmpDeltaSum += calcDeltaDE94(c1,globalCMS_Uniform.getIntervalColor(i,0,globalCMS_Uniform.getInterpolationSpace()));
                for (var j = 0; j < globalCMS_Uniform.getIntervalLength(i)-1; j++) {
                  tmpDeltaSum += calcDeltaDE94(globalCMS_Uniform.getIntervalColor(i,j,globalCMS_Uniform.getInterpolationSpace()),globalCMS_Uniform.getIntervalColor(i,j+1,globalCMS_Uniform.getInterpolationSpace()));
                }
                tmpDeltaSum += calcDeltaDE94(globalCMS_Uniform.getIntervalColor(i,globalCMS_Uniform.getIntervalLength(i)-1,globalCMS_Uniform.getInterpolationSpace()),c2);
              break;
              case "de2000":
              case "de2000-ds":
                tmpDeltaSum += calcDeltaCIEDE2000(c1,globalCMS_Uniform.getIntervalColor(i,0,globalCMS_Uniform.getInterpolationSpace()));
                for (var j = 0; j < globalCMS_Uniform.getIntervalLength(i)-1; j++) {
                  tmpDeltaSum += calcDeltaCIEDE2000(globalCMS_Uniform.getIntervalColor(i,j,globalCMS_Uniform.getInterpolationSpace()),globalCMS_Uniform.getIntervalColor(i,j+1,globalCMS_Uniform.getInterpolationSpace()));
                }
                tmpDeltaSum += calcDeltaCIEDE2000(globalCMS_Uniform.getIntervalColor(i,globalCMS_Uniform.getIntervalLength(i)-1,globalCMS_Uniform.getInterpolationSpace()),c2);
              break;
              default:
                return;
            }
          }
          else {
            switch (globalCMS_Uniform.getInterpolationSpace()) {
              case "rgb":
              case "hsv":
              case "lab":
              case "din99":
                tmpDeltaSum = calc3DEuclideanDistance(c1,c2);
              break;
              case "de94":
              case "de94-ds":
                tmpDeltaSum = calcDeltaDE94(c1,c2);
              break;
              case "de2000":
              case "de2000-ds":
                tmpDeltaSum = calcDeltaCIEDE2000(c1,c2);
              break;
              default:
                return;
            }
          }

          bandsDeltaSum+=tmpDeltaSum;
          bandsDeltaArray.push(tmpDeltaSum);
          contBandsDistances.push(undefined);

    }


  }



  /////////////////////////////////////////////////////////////////////

  var perfectSpeend = bandsDeltaSum/relevantDistance;
  var currentPos = r1;
  for (var i = 0; i < bandsDeltaArray.length; i++) {
    if(bandsDeltaArray[i]==undefined){
      currentPos+=contBandsDistances[i];
    }
    else {
      currentPos+=(bandsDeltaArray[i]/perfectSpeend);
    }
    globalCMS_Uniform.setRefPosition(i+1,currentPos);
  }


}


function calcGlobalUniformityOptimum(){

  globalCMS_Uniform = cloneCMS(globalCMS1_Original);

  var fixedStartKey = true;
  var fixedEndKey = false;
  var continuousSections = searchForContinuousSections(optimization_StartKey,optimization_EndKey);

  //console.log(i);
  for (var i = 0; i < continuousSections.length; i++) {
    linearRegression(continuousSections[i][0],continuousSections[i][1],fixedStartKey,fixedEndKey);
  }

  /// Local Optimization
  if(globalCMS1.getInterpolationSpace()!="lab" && globalCMS1.getInterpolationSpace()!="din99")
    calcLocalUniformityOptimum(false);

}

function linearRegression(startKey,endKey,fixedStartKey,fixedEndKey){

  var newLineColors = [];

  if(fixedStartKey && fixedEndKey){
    var lineStartColor = globalCMS1.getRightKeyColor(startKey,globalCMS1.getInterpolationSpace());
    var endStartColor =globalCMS1.getLeftKeyColor(endKey,globalCMS1.getInterpolationSpace());
    newLineColors.push(lineStartColor);
    for (var j = startKey+1; j < endKey; j++) {
      var ratio = (globalCMS_Uniform.getRefPosition(j)-ref1)/dis;
      var newColor = calcGradientLinear(lineStartColor.get1Value(),lineStartColor.get2Value(),lineStartColor.get3Value(),endStartColor.get1Value(),endStartColor.get2Value(),endStartColor.get3Value(),ratio);
      newLineColors.push(createColor(newColor[0],newColor[1],newColor[2],globalCMS1.getInterpolationSpace()));
    }
    newLineColors.push(endStartColor);
  } else if (fixedStartKey || fixedEndKey) {

    ////////////////////////////////////////////////
    // normal linear linearRegression
    // standart formula: 0 = (X^T X)^-1 X^T y
    ////////////////////////////////////////////////////////////
    var transponse = [];
    var value_XT_X = 0;
    var vector_y_val1 = [];
    var vector_y_val2 = [];
    var vector_y_val3 = [];


    var fixedColor = undefined;

    var tmpStart = startKey;
    var tmpEnd = endKey;
    if(fixedStartKey){
      fixedColor = globalCMS1.getRightKeyColor(startKey,globalCMS1.getInterpolationSpace());
      //tmpStart++;
    }
    else{
      fixedColor = globalCMS1.getLeftKeyColor(endKey,globalCMS1.getInterpolationSpace());
      //tmpEnd--;
    }


    for (var i = tmpStart; i <= tmpEnd; i++) {

      /// the multipication of a transponse vector with the vector (X^T X) -
      transponse.push(globalCMS1.getRefPosition(i))
      value_XT_X+=Math.pow(globalCMS1.getRefPosition(i),2);

      var tmpColor = undefined;
      if(i!=endKey)
        tmpColor = globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace());
      else
        tmpColor = globalCMS1.getLeftKeyColor(endKey,globalCMS1.getInterpolationSpace());

        // Use insteed of three vectors a matrix
        //var y_row = [tmpColor.get1Value(),tmpColor.get2Value(),tmpColor.get3Value()];
        //vector_y.push(y_row);
        vector_y_val1.push(tmpColor.get1Value()-fixedColor.get1Value());
        vector_y_val2.push(tmpColor.get2Value()-fixedColor.get2Value());
        vector_y_val3.push(tmpColor.get3Value()-fixedColor.get3Value());

        tmpColor.deleteReferences();
        tmpColor=null;
    }

    // Inverse of (X^T X)
    var value_XT_X_inverse = 1/value_XT_X;

    // transponse of x multiply with inverse
    var rIT = [];
    for (var i = 0; i < transponse.length; i++) {
      rIT.push(transponse[i]*value_XT_X_inverse);
    }

    // multiplicaton with y
    var closestLine_Parameter1 = 0;
    var closestLine_Parameter2 = 0;
    var closestLine_Parameter3 = 0;
    for (var i = 0; i < rIT.length; i++) {
      closestLine_Parameter1 += rIT[i]*vector_y_val1[i];
      closestLine_Parameter2 += rIT[i]*vector_y_val2[i];
      closestLine_Parameter3 += rIT[i]*vector_y_val3[i];
    }

    // get new positions
    for (var i = startKey; i <= endKey; i++) {
      var newVal1 = fixedColor.get1Value()+(closestLine_Parameter1*globalCMS1.getRefPosition(i));
      var newVal2 = fixedColor.get2Value()+(closestLine_Parameter2*globalCMS1.getRefPosition(i));
      var newVal3 = fixedColor.get3Value()+(closestLine_Parameter3*globalCMS1.getRefPosition(i));
      newLineColors.push(createColor(newVal1,newVal2,newVal3,globalCMS1.getInterpolationSpace()));
    }
    fixedColor.deleteReferences();
    fixedColor=null;


  } else {

    ////////////////////////////////////////////////
    // normal linear linearRegression
    // standart formula: 0 = (X^T X)^-1 X^T y
    ////////////////////////////////////////////////////////////
    var designMatrix_X = [];
    // Use insteed of three vectors a matrix
    //var vector_y = [];
    var vector_y_val1 = [];
    var vector_y_val2 = [];
    var vector_y_val3 = [];


    for (var i = startKey; i <= endKey; i++) {

      designMatrix_X.push([1,globalCMS1.getRefPosition(i)]);

      var tmpColor = undefined;
      if(i!=endKey)
        tmpColor = globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace());
      else
        tmpColor = globalCMS1.getLeftKeyColor(endKey,globalCMS1.getInterpolationSpace());

        // Use insteed of three vectors a matrix
        //var y_row = [tmpColor.get1Value(),tmpColor.get2Value(),tmpColor.get3Value()];
        //vector_y.push(y_row);

        vector_y_val1.push(tmpColor.get1Value());
        vector_y_val2.push(tmpColor.get2Value());
        vector_y_val3.push(tmpColor.get3Value());

        tmpColor.deleteReferences()
        tmpColor=null;

    }


    ///////////////////////////////////////////////////////////////

    var designMatrix_X_Transponse = [[],[]];

    for (var i = 0; i < designMatrix_X.length; i++) {
      for (var j = 0; j < 2; j++) {
        designMatrix_X_Transponse[j].push(designMatrix_X[i][j]);
      }
    }

    /////////////////////////////////////////////////////////////
    var designMatrix_X_x_XT = matrixMultiplication(designMatrix_X_Transponse,designMatrix_X);
    var designMatrix_X_x_XT_Inverse = matrix_invert(designMatrix_X_x_XT);
    var designMatrix_Inverse_x_Transponse = matrixMultiplication(designMatrix_X_x_XT_Inverse,designMatrix_X_Transponse);

    // Use insteed of three vectors a matrix
    //var closestLine_Parameter = matrixMultiplication(designMatrix_Inverse_x_Transponse,vector_y);

    var closestLine_Parameter1 = matrixVectorMultiplication(designMatrix_Inverse_x_Transponse,vector_y_val1);
    var closestLine_Parameter2 = matrixVectorMultiplication(designMatrix_Inverse_x_Transponse,vector_y_val2);
    var closestLine_Parameter3 = matrixVectorMultiplication(designMatrix_Inverse_x_Transponse,vector_y_val3);

    for (var i = startKey; i <= endKey; i++) {
      var newVal1 = closestLine_Parameter1[0]+(closestLine_Parameter1[1]*globalCMS1.getRefPosition(i));
      var newVal2 = closestLine_Parameter2[0]+(closestLine_Parameter2[1]*globalCMS1.getRefPosition(i));
      var newVal3 = closestLine_Parameter3[0]+(closestLine_Parameter3[1]*globalCMS1.getRefPosition(i));
      newLineColors.push(createColor(newVal1,newVal2,newVal3,globalCMS1.getInterpolationSpace()));
    }

  }

  /////////////////////////////////////////////////////////////////////////////////////

  globalCMS_Uniform.setPreventIntervals(true);
  for (var i = newLineColors.length-1; i >= 0; i--) {
    if(!newLineColors[i].checkRGBPossiblity()){
      var tmpColor = newLineColors[i].calcRGBColor(); // will calculate the best next rgb colorXYZ
      newLineColors[i].deleteReferences();
      newLineColors[i]=tmpColor.calcLABColor();
      tmpColor.deleteReferences;
      tmpColor = null;
    }

    switch (i) {
      case 0:
          globalCMS_Uniform.setRightKeyColor(startKey,cloneColor(newLineColors[i]));
        break;
        case newLineColors.length-1:
          globalCMS_Uniform.setLeftKeyColor(endKey,cloneColor(newLineColors[i])); // startKey+i
          break;
      default:
        globalCMS_Uniform.setLeftKeyColor(startKey+i,cloneColor(newLineColors[i]));
        globalCMS_Uniform.setRightKeyColor(startKey+i,cloneColor(newLineColors[i]));
    }

    newLineColors[i].deleteReferences();
    newLineColors[i]=null;
  }
  globalCMS_Uniform.setPreventIntervals(false);


}
