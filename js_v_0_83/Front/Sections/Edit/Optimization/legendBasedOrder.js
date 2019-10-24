function calcLegOrderOptimum(degree){

  // create graph

  var graph = new class_Graph(globalCMS1.getInterpolationSpace());
  graph.changeColorEdgeOptions(globalCMS1.getInterpolationSpace(),false,"eu");
  graph.setOF(document.getElementById("id_OrginForceCheck").checked);
  graph.setRGBCorr(document.getElementById("id_RGBCorrCheck").checked);
  graph.setAvgSpeedUpdate(document.getElementById("id_AvgSpeedUpdateCheck").checked);

  var continuousSections = searchForContinuousSections(0,globalCMS1.getKeyLength()-1);

  var ncounter = 0;
  for (var j = 0; j < continuousSections.length; j++) {
      if(continuousSections[j][0]<continuousSections[j][1]){
        var nstart = ncounter;
        for (var i = continuousSections[j][0]; i < continuousSections[j][1]; i++){
          graph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i));
          if(i == continuousSections[j][0] && (globalCMS1.getKeyType(i)==="right key"||globalCMS1.getKeyType(i)==="twin key"))
            graph.pushCMSInfo([i,1]); // save key index information and if the node represent the right, left or both colors of the key
          else
            graph.pushCMSInfo([i,2]);
          ncounter++;
        }// for
        graph.pushNode(globalCMS1.getLeftKeyColor(continuousSections[j][1],globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(continuousSections[j][1]));
        if(globalCMS1.getKeyType(i)==="left key"|| globalCMS1.getKeyType(i)==="twin key")
          graph.pushCMSInfo([continuousSections[j][1],0]);
        else
          graph.pushCMSInfo([continuousSections[j][1],2]);
        ncounter++;

        for (var i = nstart; i < ncounter-1; i++){
          for (var k = i+1; k < ncounter; k++){
            graph.pushEdge_ColorWeight(i,k);
          }
        }
      }
  }

  //////////////////////////////////////////////////////////////////////////////

  graph.speedForce_LegendOrder(document.getElementById("id_EditPage_LegOrderOpti_Iterations").value,degree);

  //////////////////////////////////////////////////////////////////////////////

  for ( var i = 0; i < graph.getNodeLength(); i ++ ) {
    // positions
    var tmpKeyInfo = graph.getCMSInfo(i);

    if(tmpKeyInfo==undefined)
      continue;

    switch (tmpKeyInfo[1]) {
      case 0:
        globalCMS1_Optimum.setLeftKeyColor(tmpKeyInfo[0],graph.getNodeColor(i));
      break;
      case 1:
        globalCMS1_Optimum.setRightKeyColor(tmpKeyInfo[0],graph.getNodeColor(i));
      break;
      case 2:
        globalCMS1_Optimum.setLeftKeyColor(tmpKeyInfo[0],graph.getNodeColor(i));
        globalCMS1_Optimum.setRightKeyColor(tmpKeyInfo[0],graph.getNodeColor(i));
      break;
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////




  graph.deleteReferences();

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

*/
