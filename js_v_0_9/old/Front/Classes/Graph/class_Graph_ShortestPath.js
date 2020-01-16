class class_Graph_ShortestPath extends class_Graph {

  constructor(colorSpace) {
    super(colorSpace);
    this.startIndex = 0;
    this.startNodeSet = false;
    this.endIndex = 0;
    this.endNodeSet = false;
    this.intermediateNodes = [];

  }

  deleteReferences() {
    super.deleteReferences();

    delete this.startIndex;
    delete this.startNodeSet;
    delete this.endIndex;
    delete this.endNodeSet;
    delete this.intermediateNodes;
  }


  setNode(index, color) {
    var tmpColor = undefined;

    switch (this.graphColorSpace) {
      case "rgb":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_ShortestPath_Node(color.calcRGBColor());
        break;
      case "hsv":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_ShortestPath_Node(color.calcHSVColor());
        break;
      case "lab":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_ShortestPath_Node(color.calcLABColor());
        break;
      case "din99":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_ShortestPath_Node(color.calcDIN99Color());
        break;
      case "lch":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_ShortestPath_Node(color.calcLCHColor());
        break;
    }
    color.deleteReferences();
  }


  pushNode(color, refPos) {
    switch (this.graphColorSpace) {
      case "rgb":
        this.nodeArray.push(new class_ShortestPath_Node(color.calcRGBColor()));
        break;
      case "hsv":
        this.nodeArray.push(new class_ShortestPath_Node(color.calcHSVColor()));
        break;
      case "lab":
        this.nodeArray.push(new class_ShortestPath_Node(color.calcLABColor()));
        break;
      case "din99":
        this.nodeArray.push(new class_ShortestPath_Node(color.calcDIN99Color()));
        break;
      case "lch":
        this.nodeArray.push(new class_ShortestPath_Node(color.calcLCHColor()));
        break;
    }
    color.deleteReferences();
  }

  checkNodeActivity(index) {
    if (this.nodeArray[index].getIsInactive() == false) {
      return true;
    } else {
      return false;
    }
  }

  changeNodeActivity(index) {
    if (this.nodeArray[index].getIsInactive() == false) {
      this.nodeArray[index].setIsInactive(true);
    } else {
      this.nodeArray[index].setIsInactive(false);
    }
  }

  checkIfEndNodeSet() {
    return this.endNodeSet;
  }

  getEndNodeIndex() {
    return this.endIndex;
  }

  setEndNodeIndex(eIndex) {
    this.endNodeSet = true;
    this.endIndex = eIndex;
    this.nodeArray[this.endIndex].setIsEnd(true);
  }

  unsetEndNodeIndex() {
    this.endNodeSet = false;
    this.nodeArray[this.endIndex].setIsEnd(false);
  }

  checkIfStartNodeSet() {
    return this.startNodeSet;
  }

  getStartNodeIndex() {
    return this.startIndex;
  }

  setStartNodeIndex(sIndex) {
    this.startNodeSet = true;
    this.startIndex = sIndex;
    this.nodeArray[this.startIndex].setIsStart(true);
  }

  unsetStartNodeIndex() {
    this.startNodeSet = false;
    this.nodeArray[this.startIndex].setIsStart(false);
  }

  checkNodeState(index) {

    if (this.nodeArray[index].getIsStart() == true) {
      return 0;
    }

    if (this.nodeArray[index].getIsEnd() == true) {
      return 1;
    }

    if (this.nodeArray[index].getIsIntermediate() == true) {
      return 2;
    }

    if (this.nodeArray[index].getIsInactive() == true) {
      return 3;
    }
    return 4;
  }

  nodeIntermediateIndex(nIndex) {
    return this.nodeArray[nIndex].getIntermediateIndex();
  }

  pushIntermediateColor(nodeIndex) {
    this.intermediateNodes.push(nodeIndex);
    this.nodeArray[nodeIndex].setIntermediateIndex(this.intermediateNodes.length);
    this.nodeArray[nodeIndex].setIsIntermediate(true);
  }

  removeIntermediateColor(nodeIndex) {
    var index = -1;
    for (var i = this.intermediateNodes.length - 1; i >= 0; i--) {

      if (this.intermediateNodes[i] == nodeIndex) {
        index = i;
        break;
      }

    }


    if (index > -1) {
      this.intermediateNodes.splice(index, 1);
      this.nodeArray[nodeIndex].setIntermediateIndex(0);
      this.nodeArray[nodeIndex].setIsIntermediate(false);
    }
  }

  deleteIntermediateNodesWithL(lValue1, lValue2) {
    var deletedElements = false;

    for (var i = this.intermediateNodes.length - 1; i >= 0; i--) {
      if (this.nodeArray[this.intermediateNodes[i]].getXCoord() > lValue1 || this.nodeArray[this.intermediateNodes[i]].getXCoord() < lValue2) {
        this.nodeArray[this.intermediateNodes[i]].setIntermediateIndex(0);
        this.nodeArray[this.intermediateNodes[i]].setIsIntermediate(false);
        this.intermediateNodes.splice(i, 1);
        deletedElements = true;
      }
    }

    return deletedElements;
  }

  numberOfIntermediateColor() {
    return this.intermediateNodes.length;
  }

  getNodeindexIntermediateColor(index) {
    return this.intermediateNodes[index];
  }

}
