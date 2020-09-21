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
    gWorkColor1.setColorInfo(this.nodeColor);
    return gWorkColor1.getColorInfo(colorspace);
  }

  setNodeColor(color) {

    gWorkColor1.autoRGBClipping=true;
    gWorkColor1.setColorInfo(color);

    this.nodeColor.deleteReferences();
    this.nodeColor = gWorkColor1.getColorInfo(color[0]);
  }


};
