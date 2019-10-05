function calcLegOrderOptimum(){

  /*for (var i = 0; i < legOrderColorArray.length; i++) {
    legOrderColorArray[i][2].deleteReferences();
    legOrderColorArray[i][2]=null;
  }
  legOrderColorArray=[];

  ///////////////////////////////////////////////////////////////////////////////////
  /////////// Search for Equal Colors and for Intersections of the lines  ///////////
  var lines = [];

  for (var i = 0; i < globalCMS1_Optimum.getKeyLength(); i++) {
    switch (globalCMS1_Optimum.getKeyType(i)) {
      case "right key":
        legOrderColorArray.push([i,1,globalCMS1_Optimum.getRightKeyColor(i,globalCMS1_Optimum.getInterpolationSpace()),globalCMS1_Optimum.getRefPosition(i)]); // 0 = leftt, 1=right, 2 = both
        lines.push(i);
      break;
      case "left key":
        legOrderColorArray.push([i,0,globalCMS1_Optimum.getLeftKeyColor(i,globalCMS1_Optimum.getInterpolationSpace()),globalCMS1_Optimum.getRefPosition(i)]);
      break;
      case "twin key":
        legOrderColorArray.push([i,1,globalCMS1_Optimum.getRightKeyColor(i,globalCMS1_Optimum.getInterpolationSpace()),globalCMS1_Optimum.getRefPosition(i)]);
        legOrderColorArray.push([i,0,globalCMS1_Optimum.getLeftKeyColor(i,globalCMS1_Optimum.getInterpolationSpace()),globalCMS1_Optimum.getRefPosition(i)]);
        lines.push(i);
      break;
      case "dual key":
        legOrderColorArray.push([i,2,globalCMS1_Optimum.getRightKeyColor(i,globalCMS1_Optimum.getInterpolationSpace()),globalCMS1_Optimum.getRefPosition(i)]);
        lines.push(i);
      break;
    }
  }

  var equalColors = [];
  for (var i = 0; i < legOrderColorArray.length-1; i++) {
    for (var j = i+1; j < legOrderColorArray.length; j++) {
      if(legOrderColorArray[i][2].equalTo(legOrderColorArray[j][2])){
        equalColors.push([i,j]);
      }
    }
  }

  var interSectionLines = [];
  for (var i = 0; i < lines.length-1; i++) {
    for (var j = i+1; j < lines.length; j++) {

    }
  }
  ///////////////////////////////////////////////////////////////////////////////////*/

}


function line_intersect(x1, y1, x2, y2, x3, y3, x4, y4)
{
    var ua, ub, denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1);
    if (denom == 0) {
        return null;
    }
    ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/denom;
    ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3))/denom;
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
        seg1: ua >= 0 && ua <= 1,
        seg2: ub >= 0 && ub <= 1
    };
}


function getLegOrderDeltaE(i,j){
  var deltaE=undefined;
  switch (globalCMS1_Optimum.getInterpolationSpace()) {
    case "rgb":
    case "hsv":
    case "lab":
    case "din99":
    case "de94-ds":
    case "de2000-ds":
      deltaE = calc3DEuclideanDistance(cloneColor(legOrderColorArray[i][2]),cloneColor(legOrderColorArray[j][2]));
    break;
    case "de94":
      deltaE = calcDeltaDE94(cloneColor(legOrderColorArray[i][2]),cloneColor(legOrderColorArray[j][2]));
    break;
    case "de2000":
      deltaE = calcDeltaCIEDE2000(cloneColor(legOrderColorArray[i][2]),cloneColor(legOrderColorArray[j][2]));
    break;
  }
  return deltaE;
}

function getLegOrderSpeed(i,j){

  var dis = Math.abs(legOrderColorArray[j][3]-legOrderColorArray[i][3]);

  if(dis==0)
    return undefined;

  var deltaE = getLegOrderDeltaE(i,j);

  if(deltaE==undefined)
    return undefined;

  return deltaE/dis;

}


function getAverageGlobalSpeed(){
  var sum = 0;
  var counter = 0;
  for (var i = 0; i < legOrderColorArray.length-1; i++) {
    for (var j = i+1; j < legOrderColorArray.length; j++) {

      // legOrderColorArray [0] = key pos
      // legOrderColorArray [1] = affect left, right key color or both
      // legOrderColorArray [2] = key color
      // legOrderColorArray [3] = key ref
      var speed = getLegOrderSpeed(i,j);

      if(speed==undefined)
        continue;

      sum += speed;
      counter++;
    }

    return sum/counter;
  }
}




/*function calcLegOrderOptimumOLD(){

  for (var i = 0; i < legOrderColorArray.length; i++) {
    legOrderColorArray[i][2].deleteReferences();
    legOrderColorArray[i][2]=null;
  }
  legOrderColorArray=[];

  ///////////////////////////////////////////////////////
  for (var i = 0; i < globalCMS1_Optimum.getKeyLength(); i++) {
    switch (globalCMS1_Optimum.getKeyType(i)) {
      case "right key":
          legOrderColorArray.push([i,1,globalCMS1_Optimum.getRightKeyColor(i,globalCMS1_Optimum.getInterpolationSpace()),globalCMS1_Optimum.getRefPosition(i)]); // 0 = leftt, 1=right, 2 = both
      break;
      case "left key":
        legOrderColorArray.push([i,0,globalCMS1_Optimum.getLeftKeyColor(i,globalCMS1_Optimum.getInterpolationSpace()),globalCMS1_Optimum.getRefPosition(i)]);
      break;
      case "twin key":
        legOrderColorArray.push([i,1,globalCMS1_Optimum.getRightKeyColor(i,globalCMS1_Optimum.getInterpolationSpace()),globalCMS1_Optimum.getRefPosition(i)]);
        legOrderColorArray.push([i,0,globalCMS1_Optimum.getLeftKeyColor(i,globalCMS1_Optimum.getInterpolationSpace()),globalCMS1_Optimum.getRefPosition(i)]);
      break;
      case "dual key":
        legOrderColorArray.push([i,2,globalCMS1_Optimum.getRightKeyColor(i,globalCMS1_Optimum.getInterpolationSpace()),globalCMS1_Optimum.getRefPosition(i)]);
      break;
    }
  }
  ///////////////////////////////////////////////////////
  var optimumParameter = getAverageGlobalSpeed();


  //////////////////////////////////////////////////////////
  //// Step one Detect.

  for (var i = 0; i < legOrderColorArray.length-1; i++) {
    for (var j = i+1; j < legOrderColorArray.length; j++) {
      var speed = getLegOrderSpeed(i,j);

      if(speed==undefined)
        continue;

      if(speed<optimumParameter){

        var directionI = vecNorm([legOrderColorArray[i][2].get1Value()-legOrderColorArray[j][2].get1Value(),legOrderColorArray[i][2].get2Value()-legOrderColorArray[j][2].get2Value(),legOrderColorArray[i][2].get3Value()-legOrderColorArray[j][2].get3Value()]);
        var directionJ = [directionI[0]*-1,directionI[1]*-1,directionI[2]*-1];

         // wished speed  = optimumParameter
         var newDeltaE = optimumParameter*Math.abs(legOrderColorArray[j][3]-legOrderColorArray[i][3]);
         var currentDeltaE = getLegOrderDeltaE(i,j);
         var dif = (newDeltaE-currentDeltaE)/2;

         var moveI = [dif*directionI[0],dif*directionI[1],dif*directionI[2]];
         var moveJ = [dif*directionJ[0],dif*directionJ[1],dif*directionJ[2]];

         var newC_I = createColor(legOrderColorArray[i][2].get1Value()+moveI[0],legOrderColorArray[i][2].get2Value()+moveI[1],legOrderColorArray[i][2].get3Value()+moveI[2],globalCMS1_Optimum.getInterpolationSpace());
         var newC_J = createColor(legOrderColorArray[j][2].get1Value()+moveJ[0],legOrderColorArray[j][2].get2Value()+moveJ[1],legOrderColorArray[j][2].get3Value()+moveJ[2],globalCMS1_Optimum.getInterpolationSpace());

         if(!newC_I.checkRGBPossiblity()){
           var tmpColor = newC_I.calcRGBColor(); // will calculate the best next rgb colorXYZ
           newC_I.deleteReferences();
           newC_I=tmpColor.calcLABColor();
           tmpColor.deleteReferences;
           tmpColor = null;
         }
         if(!newC_J.checkRGBPossiblity()){
           var tmpColor = newC_J.calcRGBColor(); // will calculate the best next rgb colorXYZ
           newC_J.deleteReferences();
           newC_J=tmpColor.calcLABColor();
           tmpColor.deleteReferences;
           tmpColor = null;
         }


         /// Change I Color
         switch (legOrderColorArray[i][1]) {
           case 0:
              globalCMS1_Optimum.setLeftKeyColor(legOrderColorArray[i][0],cloneColor(newC_I));
             break;
             case 1:
                globalCMS1_Optimum.setRightKeyColor(legOrderColorArray[i][0],cloneColor(newC_I));
               break;
               case 2:
                  globalCMS1_Optimum.setLeftKeyColor(legOrderColorArray[i][0],cloneColor(newC_I));
                  globalCMS1_Optimum.setRightKeyColor(legOrderColorArray[i][0],cloneColor(newC_I));
                 break;
         }

         /// Change J Color
         switch (legOrderColorArray[j][1]) {
           case 0:
              globalCMS1_Optimum.setLeftKeyColor(legOrderColorArray[j][0],cloneColor(newC_J));
             break;
             case 1:
                globalCMS1_Optimum.setRightKeyColor(legOrderColorArray[j][0],cloneColor(newC_J));
               break;
               case 2:
                  globalCMS1_Optimum.setLeftKeyColor(legOrderColorArray[j][0],cloneColor(newC_J));
                  globalCMS1_Optimum.setRightKeyColor(legOrderColorArray[j][0],cloneColor(newC_J));
                 break;
         }


      }
    }
  }
}*/
