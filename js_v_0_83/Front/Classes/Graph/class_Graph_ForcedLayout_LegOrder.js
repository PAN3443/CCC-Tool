class class_Graph_ForcedLegOrder extends class_Graph_ForcedLayout {


  constructor(colorSpace,isGlobal) {
    super(colorSpace);
    this.isGlobal=isGlobal;
  }



  forceLayout(iterations,degree, speedDegree) {
    return;
    var start_temperature = 1 * 10;
    var check_temperature = 1 * 10; // maximal distance, will be updated with each interval; convert to null at each step;

    var blackWhiteSpeed = undefined;
    switch (globalCMS1.getInterpolationSpace()) {
      case "rgb":
        var rgbBlack = new class_Color_RGB(0, 0, 0);
        var rgbWhite = new class_Color_RGB(1, 1, 1);
        blackWhiteSpeed = calc3DEuclideanDistance(rgbBlack,rgbWhite)/ distance; //
        break;
      case "hsv":
        blackWhiteSpeed = 100.0 / distance;
        break;
      case "lab":
      case "de94":
      case "de94-ds":
      case "de2000":
      case "de2000-ds":
        blackWhiteSpeed = 100.0 / distance;
        break;
      case "din99":
        blackWhiteSpeed = 100.0 / distance;
        break;
      case "lch":
        blackWhiteSpeed = 100.0 / distance;
        break;
      default:
    }

    var optiSpeed = blackWhiteSpeed*speedDegree;

    for (var i = 0; i < iterations; i++) {



      for (var v = 0; v < this.nodeArray.length; ++v) {
        //repusleForces.push([0, 0, 0]);
        this.nodeArray[v].resetDisp();

        /////////////////////////////////////////////////
        //// PART 1: add orgin force
        var color_v_Node = this.nodeArray[v].getNodeColor();
        var vec_d = [orginColors[v].get1Value() - color_v_Node.get1Value(), orginColors[v].get2Value() - color_v_Node.get2Value(), orginColors[v].get3Value() - color_v_Node.get3Value()];
        this.nodeArray[v].addDisp(vecScalMulti(vec_d, (1.0 - degree))); //this.nodeArray[v].addDisp(vec_d); // direction vector = force
      }

      if(this.isGlobal){
        for (var i = 0; i < this.edgeArray.length-1; i++) {
          for (var j = i+1; j < this.edgeArray.length; j++) {
            if(!this.areEdgeNeighbours(i,j)){

              /*var distanceInfo = this.getLineSegmentDistancePoints(eID1,eID2);
              var direction = vec_Diff_COLOR(distanceInfo[1],distanceInfo[0]);

              if(vecLength(distance) == 0){
                ///////////////////////////////////////////////////////////////////////////////////////////////////////
                // we have no direction and an intersection point => we don't want to use a random direction -> create a plane with the four key colors and use the plane normale as direction!

                // determine plane and norm


                // change direction a little bit


                ///////////////////////////////////////////////////////////////////////////////////////////////////////
              }

              var distance = vecLength(direction);
              var refPos1= this.nodeArray[this.edgeArray[eID1].getNodeID1()].getNodeRefPos()+distanceInfo[2]*Math.abs(this.nodeArray[this.edgeArray[eID1].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[eID1].getNodeID1()].getNodeRefPos());
              var refPos2= this.nodeArray[this.edgeArray[eID2].getNodeID1()].getNodeRefPos()+distanceInfo[3]*Math.abs(this.nodeArray[this.edgeArray[eID2].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[eID2].getNodeID1()].getNodeRefPos());

              var segmentSpeed = distance / Math.abs(refPos2 - refPos1);

              if(segmentSpeed<optiSpeed){

                var speedDif = segmentSpeed - optimumSpeed;
                var cDif_Change = ((speedDif * refDis) / 2) * degree;

                // Get direction?
              }

              distanceInfo[0].deleteReferences();
              distanceInfo[1].deleteReferences();*/
            }
          }
        }
      }
      else{

      }


      /////////////////////////////////////////////////
      //// PART 3: Do Movement with temperature
      for (var v = 0; v < this.nodeArray.length; v++)
        this.forceMovement_TMP(v, check_temperature);

      /////////////////////////////////////////////////
      //// PART 4: reduce the temperature as the layout approaches a better configuration and update the new edgeWeights
      check_temperature = start_temperature * (1 - i / (iterations - 1)); //temperature_steps;

    } // FOR (interations)

  }


  getMinSpeed(){

      var minSpeed = Infinity;

      //console.log("------------------------------------");
      if(this.isGlobal){ // check only edges, which are not neighbaurs
        for (var i = 0; i < this.edgeArray.length-1; i++) {
          for (var j = i+1; j < this.edgeArray.length; j++) {
            if(!this.areEdgeNeighbours(i,j))
              minSpeed=Math.min(minSpeed,this.getLineSegmentSpeed(i,j));
          }
        }
      }
      else{
          for (var i = 0; i < this.edgeArray.length; i++) {
              minSpeed=Math.min(minSpeed,this.getNodeSpeed(this.edgeArray[i].getNodeID1(), this.edgeArray[i].getNodeID2()));
          }
      }
      //console.log("------------------------------------");
      console.log(minSpeed);
      return minSpeed;

  }

  areEdgeNeighbours(id1,id2){
    if(this.edgeArray[id1].getNodeID1()==this.edgeArray[id2].getNodeID1() ||
       this.edgeArray[id1].getNodeID1()==this.edgeArray[id2].getNodeID2() ||
       this.edgeArray[id1].getNodeID2()==this.edgeArray[id2].getNodeID1() ||
       this.edgeArray[id1].getNodeID2()==this.edgeArray[id2].getNodeID2()){
      return true;
    }
    return false;
  }


  getLineSegmentSpeed(eID1,eID2){


    var distanceInfo = this.getLineSegmentDistancePoints(eID1,eID2);

    var distance = vecLength(vec_Diff_COLOR(distanceInfo[1],distanceInfo[0]);
    var refPos1= this.nodeArray[this.edgeArray[eID1].getNodeID1()].getNodeRefPos()+distanceInfo[2]*Math.abs(this.nodeArray[this.edgeArray[eID1].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[eID1].getNodeID1()].getNodeRefPos());
    var refPos2= this.nodeArray[this.edgeArray[eID2].getNodeID1()].getNodeRefPos()+distanceInfo[3]*Math.abs(this.nodeArray[this.edgeArray[eID2].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[eID2].getNodeID1()].getNodeRefPos());

    distanceInfo[0].deleteReferences();
    distanceInfo[1].deleteReferences();

    return distance / Math.abs(refPos2 - refPos1);

  }




  getLineSegmentDistancePoints(eID1,eID2){

        var small_Num = 1e-12;

        var tmp_s1p1 = this.nodeArray[this.edgeArray[eID1].getNodeID1()].getNodeColor();
        var tmp_s1p2 = this.nodeArray[this.edgeArray[eID1].getNodeID2()].getNodeColor();
        var tmp_s2p1 = this.nodeArray[this.edgeArray[eID2].getNodeID1()].getNodeColor();
        var tmp_s2p2 = this.nodeArray[this.edgeArray[eID2].getNodeID2()].getNodeColor();

        var vec_u = vec_Diff_COLOR(tmp_s1p2,tmp_s1p1);// S1.P1 - S1.P0;
        var vec_v = vec_Diff_COLOR(tmp_s2p2,tmp_s2p1); //S2.P1 - S2.P0;
        var vec_w = vec_Diff_COLOR(tmp_s1p1,tmp_s2p1); //S1.P0 - S2.P0;
        var tmp_a = vec_Dot(vec_u,vec_u);         // always >= 0
        var tmp_b = vec_Dot(vec_u,vec_v);
        var tmp_c = vec_Dot(vec_v,vec_v);         // always >= 0
        var tmp_d = vec_Dot(vec_u,vec_w);
        var tmp_e = vec_Dot(vec_v,vec_w);
        var tmp_D = tmp_a*tmp_c - tmp_b*tmp_b;        // always >= 0
        var tmp_sc, tmp_sN, tmp_sD = tmp_D;       // sc = sN / sD, default sD = D >= 0
        var tmp_tc, tmp_tN, tmp_tD = tmp_D;       // tc = tN / tD, default tD = D >= 0

        // compute the line parameters of the two closest points
        if (tmp_D < small_Num) { // the lines are almost parallel
            tmp_sN = 0.0;         // force using point P0 on segment S1
            tmp_sD = 1.0;         // to prevent possible division by 0.0 later
            tmp_tN = tmp_e;
            tmp_tD = tmp_c;
        }
        else {                 // get the closest points on the infinite lines
            tmp_sN = (tmp_b*tmp_e - tmp_c*tmp_d);
            tmp_tN = (tmp_a*tmp_e - tmp_b*tmp_d);
            if (tmp_sN < 0.0) {        // sc < 0 => the s=0 edge is visible
                tmp_sN = 0.0;
                tmp_tN = tmp_e;
                tmp_tD = tmp_c;
            }
            else if (tmp_sN > tmp_sD) {  // sc > 1  => the s=1 edge is visible
                tmp_sN = tmp_sD;
                tmp_tN = tmp_e + tmp_b;
                tmp_tD = tmp_c;
            }
        }

        if (tmp_tN < 0.0) {            // tc < 0 => the t=0 edge is visible
            tmp_tN = 0.0;
            // recompute sc for this edge
            if (-tmp_d < 0.0)
                tmp_sN = 0.0;
            else if (-tmp_d > tmp_a)
                tmp_sN = tmp_sD;
            else {
                tmp_sN = -tmp_d;
                tmp_sD = tmp_a;
            }
        }
        else if (tmp_tN > tmp_tD) {      // tc > 1  => the t=1 edge is visible
            tmp_tN = tmp_tD;
            // recompute sc for this edge
            if ((-tmp_d + tmp_b) < 0.0)
                tmp_sN = 0;
            else if ((-tmp_d + tmp_b) > tmp_a)
                tmp_sN = tmp_sD;
            else {
                tmp_sN = (-tmp_d + tmp_b);
                tmp_sD = tmp_a;
            }
        }
        // finally do the division to get sc and tc

        tmp_sc = (Math.abs(tmp_sN) < small_Num ? 0.0 : tmp_sN / tmp_sD);
        tmp_tc = (Math.abs(tmp_tN) < small_Num ? 0.0 : tmp_tN / tmp_tD);

        // get the difference of the two closest points

        //var vec_dP = vec_Add(vec_w, vec_Diff(vecScalMulti(vec_u,tmp_sc),vecScalMulti(vec_v,tmp_tc)));  // =  S1(sc) - S2(tc)
        //return vecLength(vec_dP);


        var vec_NP_S1 = vecScalMulti(vec_u,tmp_sc);
        var nearestPoint_S1 = createColor(tmp_s1p1.get1Value()+vec_NP_S1[0],tmp_s1p1.get2Value()+vec_NP_S1[1],tmp_s1p1.get3Value()+vec_NP_S1[2],this.graphColorSpace);
        var vec_NP_S2 = vecScalMulti(vec_v,tmp_tc);
        var nearestPoint_S2 = createColor(tmp_s2p1.get1Value()+vec_NP_S2[0],tmp_s2p1.get2Value()+vec_NP_S2[1],tmp_s2p1.get3Value()+vec_NP_S2[2],this.graphColorSpace);

        var length_S1 = vecLength(vec_u);
        var length_S1_P1NP = vecLength(vec_Diff_COLOR(nearestPoint_S1,tmp_s1p1));
        var ratioPos_S1_NP = length_S1_P1NP/length_S1;

        var length_S2 = vecLength(vec_v);
        var length_S2_P1NP = vecLength(vec_Diff_COLOR(nearestPoint_S2,tmp_s2p1));
        var ratioPos_S2_NP = length_S2_P1NP/length_S2;


        tmp_s1p1.deleteReferences();
        tmp_s1p2.deleteReferences();
        tmp_s2p1.deleteReferences();
        tmp_s2p2.deleteReferences();

      return [nearestPoint_S1,nearestPoint_S2,ratioPos_S1_NP,ratioPos_S2_NP];
  }


  hasIntersectionPoint(e1_id1, e1_id2, e2_id1, e2_id2) {
    var edge1_color1 = this.nodeArray[e1_id1].getNodeColor();
    var edge1_color2 = this.nodeArray[e1_id2].getNodeColor();
    var edge2_color1 = this.nodeArray[e2_id1].getNodeColor();
    var edge2_color2 = this.nodeArray[e2_id2].getNodeColor();

    ////////////////////////////
    /// two lines : positionVec+x*directionVec
    //  positionVec_1 = edge1_color1
    //  positionVec_1 = edge2_color1

    var directionVec_1 = [edge1_color2.get1Value() - edge1_color1.get1Value(), edge1_color2.get2Value() - edge1_color1.get2Value(), edge1_color2.get2Value() - edge1_color1.get2Value()];
    var directionVec_2 = [edge2_color2.get1Value() - edge2_color1.get1Value(), edge2_color2.get2Value() - edge2_color1.get2Value(), edge2_color2.get2Value() - edge2_color1.get2Value()];

    // check if lines are collinear
    var f1 = directionVec_1[0] / directionVec_2[0];
    var f2 = directionVec_1[1] / directionVec_2[1];
    var f3 = directionVec_1[2] / directionVec_2[2];


    if (f1 == f2 && f1 == f3 && f3 == f2)
      return false;

    // o1x*d1y + r*d1x*d1y = o2x*d1y + s*d2x*d1y
    // o1y*d1x + r*d1y*d1x = o2y*d1x + s*d2y*d1x
    // o1z*d1x + r*d1z*d1x = o2z*d1x + s*d2z*d1x


    //s = (o2x*d1y - o2y*d1x + o1x*d1y - o1x*d1y) / (d2y*d1x-d2x*d1y)

  }
}



/*
//////////////////////////////////////////////////////////
///// Old Versions


// Improve Min to second Min

forceLayout(iterations,degree) {

  var orginColors = [];
  for(var v=0; v < this.nodeArray.length; v++)
  {
     orginColors.push(this.nodeArray[v].getNodeColor());
  }

  if (degree == 1)
    degree = 1 - 1e-5;


  var start_temperature = 1 * 10;
  var check_temperature = 1 * 10; // maximal distance, will be updated with each interval; convert to null at each step;

  // Alternative use as optimal distance the average speed?

  for (var i = 0; i < iterations; i++) {

    var minFirstSpeed = Infinity;
    var min_1_SpeedIDs = [];
    var min_2_SpeedIDs = [];
    var minSecondSpeed = Infinity;

    /////////////////////////////////////////////////
    //// PART 1: Set Disp to zero and add orgin force
    for (var v = 0; v < this.nodeArray.length; ++v) {
    for (var u = v+1; u < this.nodeArray.length; ++u) {

      var edgeSpeed = this.getNodeSpeed(v, u);

      if(u==v)
        continue;
    //for (var e = 0; e < this.edgeArray.length; e++) {
      //var edgeSpeed = this.getNodeSpeed(this.edgeArray[e].getNodeID1(), this.edgeArray[e].getNodeID2());

      if(edgeSpeed == minFirstSpeed){ //
        min_1_SpeedIDs.push(v);
        min_2_SpeedIDs.push(u);
      }
      else if (edgeSpeed < minFirstSpeed) {
        minSecondSpeed=minFirstSpeed;
        minFirstSpeed = edgeSpeed;
        min_1_SpeedIDs=[];
        min_2_SpeedIDs=[];
        min_1_SpeedIDs.push(v);
        min_2_SpeedIDs.push(u);
      }
      else if(edgeSpeed < minSecondSpeed){
        minSecondSpeed = edgeSpeed;
      }
    }
  }

    if(minSecondSpeed == Infinity){ // all edges have the same speed
      break;
    }

    var optimumSpeed = minSecondSpeed; //this.getAvgSpeed();
    var impulseFactor = optimumSpeed * 1e-12;

    /////////////////////////////////////////////////
    //// PART 2:
    for (var o = 0; o < min_1_SpeedIDs.length; o++) {

      var color_v_Node = this.nodeArray[min_1_SpeedIDs[o]].getNodeColor();
      var color_u_Node = this.nodeArray[min_2_SpeedIDs[o]].getNodeColor();

      /////////////////////////////////////////////////
      //// PART 2.1: Force To Origin
      var vec_d = [orginColors[min_1_SpeedIDs[o]].get1Value() - color_v_Node.get1Value(), orginColors[min_1_SpeedIDs[o]].get2Value() - color_v_Node.get2Value(), orginColors[min_1_SpeedIDs[o]].get3Value() - color_v_Node.get3Value()];
      this.nodeArray[min_1_SpeedIDs[o]].addDisp(vecScalMulti(vec_d, (1.0 - degree)));

      vec_d = [orginColors[min_2_SpeedIDs[o]].get1Value() - color_u_Node.get1Value(), orginColors[min_2_SpeedIDs[o]].get2Value() - color_u_Node.get2Value(), orginColors[min_2_SpeedIDs[o]].get3Value() - color_u_Node.get3Value()];
      this.nodeArray[min_2_SpeedIDs[o]].addDisp(vecScalMulti(vec_d, (1.0 - degree)));

      /////////////////////////////////////////////////
      //// PART 2.2: Force To Opti Speed
      var refDis = Math.abs(this.nodeArray[min_2_SpeedIDs[o]].getNodeRefPos() - this.nodeArray[min_1_SpeedIDs[o]].getNodeRefPos());
      var vec_d = [color_v_Node.get1Value() - color_u_Node.get1Value(), color_v_Node.get2Value() - color_u_Node.get2Value(), color_v_Node.get3Value() - color_u_Node.get3Value()];
      var vec_dL = vecLength(vec_d);

      while (vec_dL == 0) {
        var impulseDistance = refDis * impulseFactor;
        if (impulseDistance == 0)
          impulseDistance = 1e-12;
        vec_d[0] = getRandomArbitrary(-impulseDistance, impulseDistance);
        vec_d[1] = getRandomArbitrary(-impulseDistance, impulseDistance);
        vec_d[2] = getRandomArbitrary(-impulseDistance, impulseDistance);
        vec_dL = vecLength(vec_d);
      }

      var vec_dN = vecNorm(vec_d);

      var speedDif = this.getNodeSpeed(min_1_SpeedIDs[o], min_2_SpeedIDs[o]) - optimumSpeed;
      var cDif_Change = ((speedDif * refDis) / 2) * degree;
      var force = vecScalMulti(vec_dN, cDif_Change);

      this.nodeArray[min_1_SpeedIDs[o]].subDisp(force);
      this.nodeArray[min_2_SpeedIDs[o]].addDisp(force);

      color_u_Node.deleteReferences();
      color_u_Node = null;
      color_v_Node.deleteReferences();
      color_v_Node = null;
    }

    /////////////////////////////////////////////////
    //// PART 3: limit max displacement to temperaturetand prevent from displacementoutside frame
    for (var v = 0; v < this.nodeArray.length; v++)
      this.forceMovement_TMP(v, check_temperature);

    /////////////////////////////////////////////////
    //// PART 4: reduce the temperature as the layout approaches a better configuration and update the new edgeWeights
    check_temperature = start_temperature * (1 - i / (iterations - 1)); //temperature_steps;

  } // FOR (interations)

}
*/
