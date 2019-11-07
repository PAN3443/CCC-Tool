

function calcLocalUniformityOptimum (){

  var r1 = globalCMS1_Optimum.getRefPosition(document.getElementById("id_editPage_Optimization_FromKey").selectedIndex);
  var r2 = globalCMS1_Optimum.getRefPosition(document.getElementById("id_editPage_Optimization_TillKey").selectedIndex);
  var relevantDistance = Math.abs(r2-r1);

  var bandsDeltaArray = [];
  var contBandsDistances = [];
  var bandsDeltaSum = 0;



  for (var i = document.getElementById("id_editPage_Optimization_FromKey").selectedIndex; i < document.getElementById("id_editPage_Optimization_TillKey").selectedIndex; i++) {

    if(globalCMS1_Optimum.getKeyType(i)==="nil key" || globalCMS1_Optimum.getKeyType(i)==="left key"){
      bandsDeltaArray.push(undefined);
      var constBandDis = Math.abs(globalCMS1_Optimum.getRefPosition(i+1)-globalCMS1_Optimum.getRefPosition(i));
      relevantDistance -= constBandDis;
      contBandsDistances.push(constBandDis);
    }
    else {
          var c1 = globalCMS1_Optimum.getRightKeyColor(i,globalCMS1_Optimum.getInterpolationSpace());
          var c2 = globalCMS1_Optimum.getLeftKeyColor(i+1,globalCMS1_Optimum.getInterpolationSpace());

          var tmpDeltaSum = 0;

          if(((globalCMS1_Optimum.getInterpolationType()==="linear" &&
             globalCMS1_Optimum.getInterpolationSpace()!="rgb" &&  // distance of intervals is the same like the distance of start and end color
             globalCMS1_Optimum.getInterpolationSpace()!="hsv" &&
             globalCMS1_Optimum.getInterpolationSpace()!="lab" &&
             globalCMS1_Optimum.getInterpolationSpace()!="din99") || globalCMS1_Optimum.getInterpolationType()==="spline") &&
             globalCMS1_Optimum.getIntervalLength(i)>0){

            switch (globalCMS1_Optimum.getInterpolationSpace()) {
              case "rgb":
              case "hsv":
              case "lab":
              case "din99":
                tmpDeltaSum += calc3DEuclideanDistance(c1,globalCMS1_Optimum.getIntervalColor(i,0,globalCMS1_Optimum.getInterpolationSpace()));
                for (var j = 0; j < globalCMS1_Optimum.getIntervalLength(i)-1; j++) {
                  tmpDeltaSum += calc3DEuclideanDistance(globalCMS1_Optimum.getIntervalColor(i,j,globalCMS1_Optimum.getInterpolationSpace()),globalCMS1_Optimum.getIntervalColor(i,j+1,globalCMS1_Optimum.getInterpolationSpace()));
                }
                tmpDeltaSum += calc3DEuclideanDistance(globalCMS1_Optimum.getIntervalColor(i,globalCMS1_Optimum.getIntervalLength(i)-1,globalCMS1_Optimum.getInterpolationSpace()),c2);
                break;
              case "de94":
              case "de94-ds":
                tmpDeltaSum += calcDeltaDE94(c1,globalCMS1_Optimum.getIntervalColor(i,0,globalCMS1_Optimum.getInterpolationSpace()));
                for (var j = 0; j < globalCMS1_Optimum.getIntervalLength(i)-1; j++) {
                  tmpDeltaSum += calcDeltaDE94(globalCMS1_Optimum.getIntervalColor(i,j,globalCMS1_Optimum.getInterpolationSpace()),globalCMS1_Optimum.getIntervalColor(i,j+1,globalCMS1_Optimum.getInterpolationSpace()));
                }
                tmpDeltaSum += calcDeltaDE94(globalCMS1_Optimum.getIntervalColor(i,globalCMS1_Optimum.getIntervalLength(i)-1,globalCMS1_Optimum.getInterpolationSpace()),c2);
              break;
              case "de2000":
              case "de2000-ds":
                tmpDeltaSum += calcDeltaCIEDE2000(c1,globalCMS1_Optimum.getIntervalColor(i,0,globalCMS1_Optimum.getInterpolationSpace()));
                for (var j = 0; j < globalCMS1_Optimum.getIntervalLength(i)-1; j++) {
                  tmpDeltaSum += calcDeltaCIEDE2000(globalCMS1_Optimum.getIntervalColor(i,j,globalCMS1_Optimum.getInterpolationSpace()),globalCMS1_Optimum.getIntervalColor(i,j+1,globalCMS1_Optimum.getInterpolationSpace()));
                }
                tmpDeltaSum += calcDeltaCIEDE2000(globalCMS1_Optimum.getIntervalColor(i,globalCMS1_Optimum.getIntervalLength(i)-1,globalCMS1_Optimum.getInterpolationSpace()),c2);
              break;
              default:
                return;
            }
          }
          else {
            switch (globalCMS1_Optimum.getInterpolationSpace()) {
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
    globalCMS1_Optimum.setRefPosition(document.getElementById("id_editPage_Optimization_FromKey").selectedIndex+i+1,currentPos);
  }
}


function calcGlobalUniformityLinearRegOptimum(){

  var fixedStartKey = document.getElementById('id_EditPage_UniOpti_FixedStart').checked;
  var fixedEndKey = document.getElementById('id_EditPage_UniOpti_FixedEnd').checked;
  var continuousSections = searchForContinuousSections(document.getElementById("id_editPage_Optimization_FromKey").selectedIndex,document.getElementById("id_editPage_Optimization_TillKey").selectedIndex);

  //console.log(i);
  for (var i = 0; i < continuousSections.length; i++) {
    linearRegression(continuousSections[i][0],continuousSections[i][1],fixedStartKey,fixedEndKey);
  }

  /// Local Optimization
  if(globalCMS1.getInterpolationSpace()!="lab" && globalCMS1.getInterpolationSpace()!="din99")
    calcLocalUniformityOptimum();

}

function linearRegression(startKey,endKey,fixedStartKey,fixedEndKey){

  var newLineColors = [];

  if(fixedStartKey && fixedEndKey){
    var lineStartColor = globalCMS1.getRightKeyColor(startKey,globalCMS1.getInterpolationSpace());
    var endStartColor =globalCMS1.getLeftKeyColor(endKey,globalCMS1.getInterpolationSpace());
    newLineColors.push(lineStartColor);
    var ref1 = globalCMS1_Optimum.getRefPosition(startKey);
    var ref2 = globalCMS1_Optimum.getRefPosition(endKey);
    var dis = ref2-ref1;
    for (var j = startKey+1; j < endKey; j++) {
      var ratio = (globalCMS1_Optimum.getRefPosition(j)-ref1)/dis;
      var newColor = calcGradientLinear(lineStartColor.get1Value(),lineStartColor.get2Value(),lineStartColor.get3Value(),endStartColor.get1Value(),endStartColor.get2Value(),endStartColor.get3Value(),ratio);
      newLineColors.push(createColor(newColor[0],newColor[1],newColor[2],globalCMS1.getInterpolationSpace()));
    }
    newLineColors.push(endStartColor);
  } else if (fixedStartKey || fixedEndKey) {

    ////////////////////////////////////////////////
    // normal linear linearRegression
    // standart formula: 0 = (X^T X)^-1 X^T y
    ////////////////////////////////////////////////
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

  globalCMS1_Optimum.setPreventIntervals(true);
  for (var i = newLineColors.length-1; i >= 0; i--) {
    if(!newLineColors[i].checkRGBPossiblity()){
      var tmpColor = newLineColors[i].calcRGBColor(); // will calculate the best next rgb colorXYZ
      newLineColors[i].deleteReferences();
      newLineColors[i]=tmpColor.calcLABColor();
      tmpColor.deleteReferences;
      tmpColor = null;
    }


    switch (globalCMS1_Optimum.getKeyType(startKey+i)){
      case "nil key":
          // should never happen
      break;
      case "right key":
        globalCMS1_Optimum.setRightKeyColor(startKey,cloneColor(newLineColors[i]));
      break;

      case "dual key":
        globalCMS1_Optimum.setLeftKeyColor(startKey+i,cloneColor(newLineColors[i]));
        globalCMS1_Optimum.setRightKeyColor(startKey+i,cloneColor(newLineColors[i]));
      break;
      case "twin key":
        if(i==0)
          globalCMS1_Optimum.setRightKeyColor(startKey+i,cloneColor(newLineColors[i]));
        else
          globalCMS1_Optimum.setLeftKeyColor(startKey+i,cloneColor(newLineColors[i]));
      break;
      case "left key":
        // should be alwas the endKey
        globalCMS1_Optimum.setLeftKeyColor(startKey+i,cloneColor(newLineColors[i]));
      break;
    }
    newLineColors[i].deleteReferences();
    newLineColors[i]=null;
  }
  globalCMS1_Optimum.setPreventIntervals(false);


}

function calcGlobalUniformityForcedGraphOptimum(degree){

  // create graph

  optiGraph = new class_Graph_ForcedGlobalSpeed(globalCMS1.getInterpolationSpace());
  optiGraph.changeColorEdgeOptions(globalCMS1.getInterpolationSpace(),true,"eu");

  var continuousSections = searchForContinuousSections(0,globalCMS1.getKeyLength()-1);

  for (var j = 0; j < continuousSections.length; j++) {
      if(continuousSections[j][0]<continuousSections[j][1]){
        for (var i = continuousSections[j][0]; i < continuousSections[j][1]; i++){
          optiGraph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i));
          if(i == continuousSections[j][0] && (globalCMS1.getKeyType(i)==="right key"||globalCMS1.getKeyType(i)==="twin key"))
            optiGraph.pushCMSInfo([i,1]); // save key index information and if the node represent the right, left or both colors of the key
          else
            optiGraph.pushCMSInfo([i,2]);
        }// for
        optiGraph.pushNode(globalCMS1.getLeftKeyColor(continuousSections[j][1],globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(continuousSections[j][1]));
        if(globalCMS1.getKeyType(continuousSections[j][1])==="left key"|| globalCMS1.getKeyType(continuousSections[j][1])==="twin key")
          optiGraph.pushCMSInfo([continuousSections[j][1],0]);
        else
          optiGraph.pushCMSInfo([continuousSections[j][1],2]);
      }
  }

  //////////////////////////////////////////////////////////////////////////////
  optiGraph.forceLayout(document.getElementById("id_EditPage_UniOpti_Iterations").value,degree);
  //////////////////////////////////////////////////////////////////////////////
  optiGraphToCMS();

}
