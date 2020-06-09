class class_Graph {

  constructor(colorSpace) {
    this.graphColorSpace = colorSpace;
    this.nodeArray = [];
    this.edgeArray = [];
    this.distanceType = "eu"; // eu is (euclidean distance), de94, de2000
  }

  deleteReferences() {

    for (var i = this.nodeArray.length - 1; i >= 0; i--) {
      if (this.nodeArray[i] != undefined) {
        this.nodeArray[i].deleteReferences();
        this.nodeArray[i] = null;
      }
    }
    delete this.nodeArray;

    for (var i = this.edgeArray.length - 1; i >= 0; --i) {
      if (this.edgeArray[i] != undefined) {
        this.edgeArray[i].deleteReferences();
        this.edgeArray[i] = null;
      }
    }
    delete this.edgeArray;
    delete this.graphColorSpace;
    delete this.distanceType;
  }

  changeColorEdgeOptions(graphColorSpace, useSpeed, distanceType) {
    this.graphColorSpace = graphColorSpace;
    this.distanceType = distanceType;
  }

  setNodeSize(size) {
    if (this.nodeArray.length > 0) {
      for (var i = this.nodeArray.length - 1; i >= 0; i--) {
        this.nodeArray[i].deleteReferences();
        this.nodeArray[i] = null;
      }
    }
    this.nodeArray = new Array(size);
  }

  setEdgeSize(size) {
    if (this.edgeArray.length > 0) {
      for (var i = this.edgeArray.length - 1; i >= 0; i--) {
        this.edgeArray[i].deleteReferences();
        this.edgeArray[i] = null;
      }
    }
    this.edgeArray = new Array(size);
  }

  setNode(index, color) {
    var tmpColor = undefined;

    switch (this.graphColorSpace) {
      case "rgb":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_Node(color.calcRGBColor());
        break;
      case "hsv":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_Node(color.calcHSVColor());
        break;
      case "lab":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_Node(color.calcLABColor());
        break;
      case "din99":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_Node(color.calcDIN99Color());
        break;
      case "lch":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_Node(color.calcLCHColor());
        break;
    }
    color.deleteReferences();
  }


  pushNode(color, refPos) {
    switch (this.graphColorSpace) {
      case "rgb":
        this.nodeArray.push(new class_Node(color.calcRGBColor()));
        break;
      case "hsv":
        this.nodeArray.push(new class_Node(color.calcHSVColor()));
        break;
      case "lab":
        this.nodeArray.push(new class_Node(color.calcLABColor()));
        break;
      case "din99":
        this.nodeArray.push(new class_Node(color.calcDIN99Color()));
        break;
      case "lch":
        this.nodeArray.push(new class_Node(color.calcLCHColor()));
        break;
    }
    color.deleteReferences();
  }

  pushEdge(nodeID1, nodeID2) {

    if (nodeID1 == nodeID2)
      return;

    this.edgeArray.push(new class_Edge(nodeID1, nodeID2));
  }

  setEdge(index, nodeID1, nodeID2) {

    if (nodeID1 == nodeID2)
      return;

    this.edgeArray[index] = new class_Edge(nodeID1, nodeID2);
  }

  getGraphColorSpace() {
    return this.graphColorSpace;
  }

  getEdgeLength() {
    return this.edgeArray.length;
  }

  getEdgeNodeID_1(index) {
    return this.edgeArray[index].getNodeID1();
  }

  getEdgeNodeID_2(index) {
    return this.edgeArray[index].getNodeID2();
  }

  getEdgeWeight(index) {
    return this.edgeArray[index].getweight();
  }

  getgraphname() {
    return this.graphname;
  }

  getNodeLength() {
    return this.nodeArray.length;
  }

  getNodeColor(index) {
    return this.nodeArray[index].getNodeColor(this.graphColorSpace);
  }

};
