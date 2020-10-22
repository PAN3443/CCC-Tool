class class_Graph_ForcedLayout extends class_Graph {

  constructor(colorSpace) {
    super(colorSpace);

    // color depending weith options

    this.rgbCorr = true;




  }

  deleteReferences() {
    super.deleteReferences();
  }

  setRGBCorr(bool) {
    this.rgbCorr = bool;
  }

  /*setAvgSpeedUpdate(bool) {
    this.avgSpeedUpdate = bool;
  }


  pushEdge_ColorWeight(nodeID1, nodeID2) {
    this.edgeArray.push(new class_Edge(nodeID1, nodeID2));
    if (this.useSpeed) {
      this.edgeArray[this.edgeArray.length - 1].setForceWeight(this.getNodeSpeed(nodeID1, nodeID2));
    } else {
      this.edgeArray[this.edgeArray.length - 1].setForceWeight(this.getNodeColorDifference(nodeID1, nodeID2));
    }
  }

  updateEdgeColorWeights() {
    for (var i = this.edgeArray.length - 1; i >= 0; i--) {
      if (this.useSpeed) {
        this.edgeArray[i].setForceWeight(this.getNodeSpeed(this.edgeArray[i].getNodeID1(), this.edgeArray[i].getNodeID2()));
      } else {
        this.edgeArray[i].setForceWeight(this.getNodeColorDifference(this.edgeArray[i].getNodeID1(), this.edgeArray[i].getNodeID2()));
      }
    }
  }
  */


  getStartTemp(){

    // Start Tmeperatur is the longest possible way => black white
    switch (this.graphColorSpace) {
      case "rgb":
        return Math.sqrt(3);
      case "hsv":
        return 100;
      case "lab":
        return 100;
      case "din99":
        return 100;
      case "lch":
        return 100;
    }
  }


  setNode(index, color, refPos) {
    this.nodeArray[index].deleteReferences();
    this.nodeArray[index] = new class_ForcedGraph_Node(color, refPos);
  }


  pushNode(color, refPos, fixed, keyID, colorID) {
    this.nodeArray.push(new class_ForcedGraph_Node(color, refPos, fixed, keyID, colorID));
  }

  getCMSInfo(index) {
    return [this.nodeArray[index].getKeyID(),this.nodeArray[index].getColorID()];
  }

  getAvgSpeed() {
    var sum = 0;
    var counter=0;

    for (var v = 0; v < this.nodeArray.length; ++v) {
      for (var u = v+1; u < this.nodeArray.length; ++u) {
          sum += this.getNodeSpeed(v, u);
          counter++;
      }
    }
    return sum / counter;
  }

  forceMovement_TMP(nodeID, tmp) {
    var tmp_disp = this.nodeArray[nodeID].getDisp();
    var length = vecLength(tmp_disp);

    // check if it is colder than the check_temperature, if not -> update
    if (tmp < length) {
      var norm = vecNorm(tmp_disp);
      this.nodeArray[nodeID].setDisp(vecScalMulti(norm, tmp));
    }

    this.nodeArray[nodeID].forceMovement(this.rgbCorr);
  }


  getNodeSpeed(id1, id2) {
    var cDif = this.getNodeColorDifference(id1, id2);
    return cDif / Math.abs(this.nodeArray[id2].getNodeRefPos() - this.nodeArray[id1].getNodeRefPos());
  }

  getNodeColorDifference(id1, id2) {
    switch (this.distanceType) {
      case "eu":
        return calc3DEuclideanDistance(this.getNodeColor(id1), this.getNodeColor(id2));
        break;
      case "de2000":
        return calcDeltaCIEDE2000(this.getNodeColor(id1), this.getNodeColor(id2));
        break;
      case "de94":
        return calcDeltaDE94(this.getNodeColor(id1), this.getNodeColor(id2));
        break;
      default:
        return undefined;
    }
  }

  getNodeRefPos(indes) {
    return this.nodeArray[index].getNodeRefPos();
  }

  setNodeRefPos(indes, ref) {
    this.nodeArray[index].setNodeRefPos(ref);
  }


  forceLayout(){
    console.log("Original Forced Layout");
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

    var distance = vecLength(vec_Diff_COLOR(distanceInfo[1],distanceInfo[0]));
    var refPos1= this.nodeArray[this.edgeArray[eID1].getNodeID1()].getNodeRefPos()+distanceInfo[2]*Math.abs(this.nodeArray[this.edgeArray[eID1].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[eID1].getNodeID1()].getNodeRefPos());
    var refPos2= this.nodeArray[this.edgeArray[eID2].getNodeID1()].getNodeRefPos()+distanceInfo[3]*Math.abs(this.nodeArray[this.edgeArray[eID2].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[eID2].getNodeID1()].getNodeRefPos());

    return distance / Math.abs(refPos2 - refPos1);

  }


  getNearestPoint_PointSegmentDistance(nodeID,edgeID)
  {
    var tmp_p = this.getNodeColor(nodeID);
    var tmp_s_p1 = this.getNodeColor(this.edgeArray[edgeID].getNodeID1());
    var tmp_s_p2 = this.getNodeColor(this.edgeArray[edgeID].getNodeID2());

    var vec_v = vec_Diff_COLOR(tmp_s_p2,tmp_s_p1); //S.P1 - S.P0;
    var vec_w = vec_Diff_COLOR(tmp_p,tmp_s_p1); //P - S.P0;

     var tmp_c1 = vec_Dot(vec_w,vec_v);
     if ( tmp_c1 <= 0 ){
        return [tmp_s_p1,0.0];
     }

     var tmp_c2 = vec_Dot(vec_v,vec_v);
     if ( tmp_c2 <= tmp_c1 ){
       return [tmp_s_p2,1.0];
     }

     var tmp_b = tmp_c1 / tmp_c2;
     var vec_Pb = vec_Add([tmp_s_p1[1],tmp_s_p1[2],tmp_s_p1[3]], vecScalMulti(vec_v,tmp_b));
     var nearestColor = [this.graphColorSpace,vec_Pb[0],vec_Pb[1],vec_Pb[2]];

     var length_S = vecLength(vec_v);
     var length_S_Pb = vecLength(vec_Diff_COLOR(nearestColor,tmp_s_p1));
     var ratioPos_S_Pb = length_S_Pb/length_S;

     return [nearestColor,ratioPos_S_Pb];
   }



   searchEdgeBefore(v){
     for (var i = 0; i < this.edgeArray.length; i++) {
       if(this.edgeArray[i].getNodeID1()==v || this.edgeArray[i].getNodeID2()==v){
         return i-1;
       }
     }

     return undefined;// should never happen
   }

   searchEdgeAfter(v){
     var foundFirst = false;
     for (var i = 0; i < this.edgeArray.length; i++) {
       if(this.edgeArray[i].getNodeID1()==v || this.edgeArray[i].getNodeID2()==v){
         return i+1;
       }
     }
     return undefined; // should never happen
   }



  getEdgeCrossProduct(eID1,eID2){

    var tmp_s1p1 = this.getNodeColor(this.edgeArray[eID1].getNodeID1());
    var tmp_s1p2 = this.getNodeColor(this.edgeArray[eID1].getNodeID2());
    var tmp_s2p1 = this.getNodeColor(this.edgeArray[eID2].getNodeID1());
    var tmp_s2p2 = this.getNodeColor(this.edgeArray[eID2].getNodeID2());

    var vec_u = vec_Diff_COLOR(tmp_s1p2,tmp_s1p1);// S1.P1 - S1.P0;
    var vec_v = vec_Diff_COLOR(tmp_s2p2,tmp_s2p1); //S2.P1 - S2.P0;

    return [
      vec_u[1]*vec_v[2]-vec_u[2]*vec_v[1],
      vec_u[2]*vec_v[0]-vec_u[0]*vec_v[2],
      vec_u[0]*vec_v[1]-vec_u[1]*vec_v[0]
    ];

  }

  getLineSegmentDistancePoints(eID1,eID2){

        var small_Num = 1e-12;

        var tmp_s1p1 = this.getNodeColor(this.edgeArray[eID1].getNodeID1());
        var tmp_s1p2 = this.getNodeColor(this.edgeArray[eID1].getNodeID2());
        var tmp_s2p1 = this.getNodeColor(this.edgeArray[eID2].getNodeID1());
        var tmp_s2p2 = this.getNodeColor(this.edgeArray[eID2].getNodeID2());

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
        var nearestPoint_S1 = [this.graphColorSpace,tmp_s1p1[1]+vec_NP_S1[0],tmp_s1p1[2]+vec_NP_S1[1],tmp_s1p1[3]+vec_NP_S1[2]];
        var vec_NP_S2 = vecScalMulti(vec_v,tmp_tc);
        var nearestPoint_S2 = [this.graphColorSpace,tmp_s2p1[1]+vec_NP_S2[0],tmp_s2p1[2]+vec_NP_S2[1],tmp_s2p1[3]+vec_NP_S2[2]];

        var length_S1 = vecLength(vec_u);
        var length_S1_P1NP = vecLength(vec_Diff_COLOR(nearestPoint_S1,tmp_s1p1));
        var ratioPos_S1_NP = length_S1_P1NP/length_S1;

        var length_S2 = vecLength(vec_v);
        var length_S2_P1NP = vecLength(vec_Diff_COLOR(nearestPoint_S2,tmp_s2p1));
        var ratioPos_S2_NP = length_S2_P1NP/length_S2;


      return [nearestPoint_S1,nearestPoint_S2,ratioPos_S1_NP,ratioPos_S2_NP];
  }

}
