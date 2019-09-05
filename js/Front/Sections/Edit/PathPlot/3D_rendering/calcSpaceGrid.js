function calcSpaceGridLAB(){

  var numberOfSteps = 50;
  var numberOfParticles = 180;
  var radStep = 1.0/numberOfParticles;
  var lightStep = 100/numberOfSteps;
  var tmpLABColor = new classColor_LAB(0,0,0);
  var tmpLABColorTest = new classColor_LAB(0,0,0);

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

                  particelSet.push(new classColor_LAB(tmpLABColor.get1Value(), tmpLABColor.get2Value(), tmpLABColor.get3Value()));
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



}


function calcSpaceGridDIN99(){

  var numberOfSteps = 50;
  var numberOfParticles = 180;
  var radStep = 1.0/numberOfParticles;
  var lightStep = 100/numberOfSteps;

  var tmpDIN99Color = new classColorDIN99(0,0,0);
  var tmpDIN99ColorTest = new classColorDIN99(0,0,0);

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
                  particelSet.push(new classColorDIN99(tmpDIN99Color.get1Value(), tmpDIN99Color.get2Value(), tmpDIN99Color.get3Value()));

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


}
