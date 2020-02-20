function calcSpaceGridLAB(){

  var numberOfSteps = 50;
  var numberOfParticles = 180;
  var radStep = 1.0/numberOfParticles;
  var lightStep = 100/numberOfSteps;
  var tmpLABColor = new class_Color_LAB(0,0,0);
  var tmpLABColorTest = new class_Color_LAB(0,0,0);

  if(positionsLAB!=undefined){
    for (var i = positionsLAB.length-1; i >=0; i--) {
      for (var j = positionsLAB[i].length-1; j >=0; j--) {
        positionsLAB[i][j].deleteReferences();
      }
    }
  }

  positionsLAB=[];
  labABMax = 0;


  for (var i = 1; i < numberOfSteps; i++) {

    var particelSet =[];
    var currentLightPos = i*lightStep;
    var distanceStep = 20;
    var errorStep = 0.1;
    tmpLABColor.set1Value(currentLightPos);
    tmpLABColorTest.set1Value(currentLightPos);

    for (var j = 0; j < numberOfParticles; j++) {

      var tmpStepSize = distanceStep;
      var currentRad = (j*radStep * Math.PI * 2) - Math.PI;
      var currentDistance = 0;
      var finishedSpreading = false;

      tmpLABColor.set2Value(Math.cos(currentRad));
      tmpLABColor.set3Value(Math.sin(currentRad));

      if(tmpLABColor.checkRGBPossiblity()){

          while (finishedSpreading == false) {

            var tmpDistance =  currentDistance+tmpStepSize;


              tmpLABColor.set2Value(tmpDistance *Math.cos(currentRad));
              tmpLABColor.set3Value(tmpDistance *Math.sin(currentRad));

              tmpLABColorTest.set2Value((tmpDistance+errorStep) *Math.cos(currentRad));
              tmpLABColorTest.set3Value((tmpDistance+errorStep) *Math.sin(currentRad));

              if(tmpLABColor.checkRGBPossiblity()){
                if(tmpLABColorTest.checkRGBPossiblity()){
                  // update current possition
                  currentDistance=tmpDistance;
                }
                else{
                  // finishedSpreading because plus errorStep would be out of the RGB possible Space
                  finishedSpreading=true;
                  labABMax = Math.max(labABMax,tmpLABColor.get2Value());
                  labABMax = Math.max(labABMax,tmpLABColor.get3Value());

                  particelSet.push(new class_Color_LAB(tmpLABColor.get1Value(), tmpLABColor.get2Value(), tmpLABColor.get3Value()));
                }
              }
              else {
                tmpStepSize=tmpStepSize/2;
              }


          }
        } // if (check if start color is possible)
        else{
          positionsLAB=[];
          labABMax = 0;
          return;
        }

    } // for particles



    positionsLAB.push(particelSet);

  } // for step

  tmpLABColor.deleteReferences();
  tmpLABColorTest.deleteReferences();

}

function calcSpaceGridDIN99(){

  var numberOfSteps = 50;
  var numberOfParticles = 180;
  var radStep = 1.0/numberOfParticles;
  var lightStep = 100/numberOfSteps;

  var tmpDIN99Color = new class_Color_DIN99(0,0,0);
  var tmpDIN99ColorTest = new class_Color_DIN99(0,0,0);

  if(positionsDIN99!=undefined){
    for (var i = positionsDIN99.length-1; i >=0; i--) {
      for (var j = positionsDIN99[i].length-1; j >=0; j--) {
        positionsDIN99[i][j].deleteReferences();
      }
    }
  }

  positionsDIN99=[];
  din99ABMax = 0;



  for (var i = 1; i < numberOfSteps; i++) {

    var particelSet =[];
    var currentLightPos = i*lightStep;
    var distanceStep = 20;
    var errorStep = 1;
    tmpDIN99Color.set1Value(currentLightPos);
    tmpDIN99ColorTest.set1Value(currentLightPos);

    for (var j = 0; j < numberOfParticles; j++) {

      var tmpStepSize = distanceStep;
      var currentRad = (j*radStep * Math.PI * 2) - Math.PI;
      var currentDistance = 0;
      var finishedSpreading = false;

      tmpDIN99Color.set2Value(Math.cos(currentRad));
      tmpDIN99Color.set3Value(Math.sin(currentRad));

      if(tmpDIN99Color.checkRGBPossiblity()){

          while (finishedSpreading == false) {

            var tmpDistance =  currentDistance+tmpStepSize;



              tmpDIN99Color.set2Value(tmpDistance *Math.cos(currentRad));
              tmpDIN99Color.set3Value(tmpDistance *Math.sin(currentRad));

              tmpDIN99ColorTest.set2Value((tmpDistance+errorStep) *Math.cos(currentRad));
              tmpDIN99ColorTest.set3Value((tmpDistance+errorStep) *Math.sin(currentRad));

              if(tmpDIN99Color.checkRGBPossiblity()){
                if(tmpDIN99ColorTest.checkRGBPossiblity()){
                  // update current possition
                  currentDistance=tmpDistance;
                }
                else{
                  // finishedSpreading because plus errorStep would be out of the RGB possible Space
                  finishedSpreading=true;
                  din99ABMax = Math.max(din99ABMax,tmpDIN99Color.get2Value());
                  din99ABMax = Math.max(din99ABMax,tmpDIN99Color.get3Value());
                  particelSet.push(new class_Color_DIN99(tmpDIN99Color.get1Value(), tmpDIN99Color.get2Value(), tmpDIN99Color.get3Value()));

                }
              }
              else {
                tmpStepSize=tmpStepSize/2;
              }


          }
        } // if (check if start color is possible)
        else{
          positionsDIN99=[];
          din99ABMax = 0;
          return;
        }

    } // for particles



    positionsDIN99.push(particelSet);


  } // for step

  tmpDIN99Color.deleteReferences();
  tmpDIN99ColorTest.deleteReferences();
}

function calcSpaceGridLMS(){


  positionsLMS=[];
  var lmsRes=50;
  lms3D_lmsStep = 100/(lmsRes-1);

  //  Marching Cubes Like Algorithm
  var tmpTestPositions=[];
  for (var i = 0; i < lmsRes; i++) {
    var lPos = i*lms3D_lmsStep;
    var lrow =[];
    var test_lrow =[];
    for (var j = 0; j < lmsRes; j++) {
      var mPos = j*lms3D_lmsStep;
      var mrow =[];
      var test_mrow =[];
      for (var k = 0; k < lmsRes; k++) {
        var sPos = k*lms3D_lmsStep;
        var tmpLMS = new class_Color_LMS(lPos,mPos,sPos);
        mrow.push(tmpLMS.checkRGBPossiblity());
        test_mrow.push(tmpLMS.checkRGBPossiblity());
        tmpLMS.deleteReferences();
      }
      lrow.push(mrow);
      test_lrow.push(test_mrow);
    }
    positionsLMS.push(lrow);
    tmpTestPositions.push(test_lrow);
  }

  //
  /*for (var i = 1; i < positionsLMS.length-1; i++) {
    for (var j = 1; j < positionsLMS[i].length-1; j++) {
      for (var k = 1; k < positionsLMS[i][j].length-1; k++) {
        if(positionsLMS[i][j][k]){
          if(tmpTestPositions[i-1][j-1][k-1] &&
            tmpTestPositions[i][j-1][k-1] &&
            tmpTestPositions[i+1][j-1][k-1] &&
            tmpTestPositions[i-1][j-1][k] &&
            tmpTestPositions[i][j-1][k] &&
            tmpTestPositions[i+1][j-1][k] &&
            tmpTestPositions[i-1][j-1][k+1] &&
            tmpTestPositions[i][j-1][k+1] &&
            tmpTestPositions[i+1][j-1][k+1] &&

            tmpTestPositions[i-1][j][k-1] &&
            tmpTestPositions[i][j][k-1] &&
            tmpTestPositions[i+1][j][k-1] &&
            tmpTestPositions[i-1][j][k] &&
            tmpTestPositions[i+1][j][k] &&
            tmpTestPositions[i-1][j][k+1] &&
            tmpTestPositions[i][j][k+1] &&
            tmpTestPositions[i+1][j][k+1] &&

            tmpTestPositions[i-1][j+1][k-1] &&
            tmpTestPositions[i][j+1][k-1] &&
            tmpTestPositions[i+1][j+1][k-1] &&
            tmpTestPositions[i-1][j+1][k] &&
            tmpTestPositions[i][j+1][k] &&
            tmpTestPositions[i+1][j+1][k] &&
            tmpTestPositions[i-1][j+1][k+1] &&
            tmpTestPositions[i][j+1][k+1] &&
            tmpTestPositions[i+1][j+1][k+1]
          ){ // if all entries in the neighbourhood are true ->  entry at i,j,k can be false
            positionsLMS[i][j][k]=false;
          }
        }
      }
    }
  }*/


  // Idea; Send xRays though the LMS space to get the RGB-Possible Area
  /*
  var errorStep = 0.001;

  for (var i = 0; i < lRes; i++) {
    var lColums=[]; // entries stand for different M-Values
    for (var j = 0; j < mRes; j++) {
      lColums.push([undefined,undefined]);
    }
    positionsLMS.push(lColums);
  }

  for (var i = 0; i < lRes; i++) {
    var lPos=i*lms3D_lStep;
    for (var j = 0; j < mRes; j++) {
      var mPos=i*lms3D_mStep;

      /////////////////////////////////////
      /// Search for Start Position
      var currentPos=0;
      var currentStep=0.01;
      var foundStartPos=false;

      var tmpLMS = new class_Color_LMS(lPos,mPos,currentPos);
      if(tmpLMS.checkRGBPossiblity()){
        positionsLMS[i][j][0]=currentPos;
        tmpLMS.deleteReferences();
        foundStartPos=true;
      }
      else{
        tmpLMS.deleteReferences();
        while(!foundStartPos){
          currentPos+=currentStep;
          tmpLMS = new class_Color_LMS(lPos,mPos,currentPos);
          if(tmpLMS.checkRGBPossiblity()){
            tmpLMS.deleteReferences();
            // After we found the first step with rough steps, we try finer steps
            currentPos=recursiveLMS_FinerStep(lPos,mPos,currentPos,currentStep,errorStep,false);
            positionsLMS[i][j][0]=currentPos;
            foundStartPos=true;
            break;
          }
        }
      }
      /////////////////////////////////////
      /// Search for End Position
      if(foundStartPos){
        currentStep=0.1;
        var oldPos=currentPos;
        var foundEndPos=false;

        //// Check if the Start Position is the only possible rgb color
        var testPos = currentPos+errorStep;
        tmpLMS = new class_Color_LMS(lPos,mPos,testPos);
        if(!tmpLMS.checkRGBPossiblity()){
          tmpLMS.deleteReferences();
          // do nothing, the entry at positionsLMS[i][j][1]=undefined;
        }
        else{
          tmpLMS.deleteReferences();
          while(!foundEndPos){
            currentPos+=currentStep;
            tmpLMS = new class_Color_LMS(lPos,mPos,currentPos);
            if(!tmpLMS.checkRGBPossiblity()){
              tmpLMS.deleteReferences();
              // After we found the first step with rough steps, we try finer steps
              oldPos=recursiveLMS_FinerStep(lPos,mPos,oldPos,currentStep,errorStep,true);
              positionsLMS[i][j][1]=oldPos;
              foundEndPos=true;
              break;
            }
            oldPos=currentPos;
          }
        }
      }
    }
  }*/

}

function recursiveLMS_FinerStep(lValue,mValue,sValue,currentStep,smallestStep,doAdd){

  var shorterStep=currentStep/2;

  if(shorterStep<smallestStep)
   return sValue;

  var nextSValue = undefined;
  if(doAdd)
    nextSValue=sValue+currentStep; // for finding the End Position
  else
    nextSValue=sValue-currentStep; // for finding the Start Position

  var tmpLMS = new class_Color_LMS(lValue,mValue,nextSValue);

  if(tmpLMS.checkRGBPossiblity()){
    tmpLMS.deleteReferences();
    return recursiveLMS_FinerStep(lValue,mValue,nextSValue,shorterStep,smallestStep,doAdd);
  }
  else{
    return recursiveLMS_FinerStep(lValue,mValue,sValue,shorterStep,smallestStep,doAdd);
  }

}
