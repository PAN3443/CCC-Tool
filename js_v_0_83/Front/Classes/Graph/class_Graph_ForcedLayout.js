class class_Graph_ForcedLayout extends class_Graph {

  constructor(colorSpace) {
    super(colorSpace);

    // color depending weith options

    this.rgbCorr = true;


    this.cmsInfo = [];

  }

  deleteReferences() {
    super.deleteReferences();
    delete this.cmsInfo;
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


  setNode(index, color, refPos) {
    var tmpColor = undefined;

    switch (this.graphColorSpace) {
      case "rgb":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_ForcedGraph_Node(color.calcRGBColor(), refPos);
        break;
      case "hsv":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_ForcedGraph_Node(color.calcHSVColor(), refPos);
        break;
      case "lab":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_ForcedGraph_Node(color.calcLABColor(), refPos);
        break;
      case "din99":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_ForcedGraph_Node(color.calcDIN99Color(), refPos);
        break;
      case "lch":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_ForcedGraph_Node(color.calcLCHColor(), refPos);
        break;
    }
    color.deleteReferences();
  }


  pushNode(color, refPos) {
    switch (this.graphColorSpace) {
      case "rgb":
        this.nodeArray.push(new class_ForcedGraph_Node(color.calcRGBColor(), refPos));
        break;
      case "hsv":
        this.nodeArray.push(new class_ForcedGraph_Node(color.calcHSVColor(), refPos));
        break;
      case "lab":
        this.nodeArray.push(new class_ForcedGraph_Node(color.calcLABColor(), refPos));
        break;
      case "din99":
        this.nodeArray.push(new class_ForcedGraph_Node(color.calcDIN99Color(), refPos));
        break;
      case "lch":
        this.nodeArray.push(new class_ForcedGraph_Node(color.calcLCHColor(), refPos));
        break;
    }
    color.deleteReferences();
  }



  pushCMSInfo(info) {
    this.cmsInfo.push(info);
  }

  getCMSInfo(index) {
    return this.cmsInfo[index];
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

}
