 class class_Node {

  constructor(color) {
    this.nodeColor = color;
  }

  getNodeLength(){
    return this.nodeArray.length;
  }

  deleteReferences() {
    delete this.nodeColor;
  }

  getNodeColor(colorspace) {
    gWorkColor1.updateColor(this.nodeColor[0],this.nodeColor[1],this.nodeColor[2],this.nodeColor[3]);
    return gWorkColor1.getColorInfo(colorspace);
  }

  setNodeColor(color) {
    this.nodeColor.deleteReferences();
    this.nodeColor = color;
  }


};
