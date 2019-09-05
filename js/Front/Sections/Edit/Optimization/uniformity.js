

function calcUniformityOptimum (){

  globalCMS_Uniform = cloneCMS(globalCMS1_Original);

  var space = globalCMS1_Original.getInterpolationSpace();


  var r1 = globalCMS1_Original.getRefPosition(optimization_StartKey);
  var r2 = globalCMS1_Original.getRefPosition(optimization_EndKey);
  var relevantDistance = Math.abs(r2-r1);

  var bandsDeltaArray = [];
  var contBandsDistances = [];
  var bandsDeltaSum = 0;



  for (var i = optimization_StartKey; i < optimization_EndKey; i++) {

    if(globalCMS1_Original.getKeyType(i)==="nil key" || globalCMS1_Original.getKeyType(i)==="left key"){
      bandsDeltaArray.push(undefined);
      var constBandDis = Math.abs(globalCMS1_Original.getRefPosition(i+1)-globalCMS1_Original.getRefPosition(i));
      relevantDistance -= constBandDis;
      contBandsDistances.push(constBandDis);
    }
    else {
          var c1 = globalCMS1_Original.getRightKeyColor(i,space);
          var c2 = globalCMS1_Original.getLeftKeyColor(i+1,space);

          var tmpResults = calcDeltaIntervalBetween_C1C2(c1,c2, deltaSampling_Analyze, space);

          var tmpDeltaSum = 0;

          if(tmpResults==undefined){
            switch (space) {
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
          else {
             // for equal distances between the interval colors
            tmpDeltaSum=sumArray(tmpResults[1]);
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

  /////////////////////////////////////////////////////////////////////

  /*var bandDeltaRatio = [];
  for (var i = 0; i < bandsDeltaArray.length; i++) {
    if(bandsDeltaArray[i]==undefined)
      bandDeltaRatio.push(undefined);
    else
      bandDeltaRatio.push(bandsDeltaArray[i]/bandsDeltaSum);
  }*/

  /////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////

  /*var currentPos = r1;
  for (var i = 0; i < bandDeltaRatio.length-1; i++) {
    if(bandDeltaRatio[i]==undefined){
      currentPos+=contBandsDistances[i];
    }
    else {
      var test = currentPos;
      currentPos+=(bandDeltaRatio[i]*relevantDistance);
    }

    globalCMS_Uniform.setRefPosition(i+1,currentPos);
  }*/

  ////////

}
