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

    gWorkColor1.autoRGBClipping=true;
    gWorkColor1.updateColor(color[0],color[1],color[2],color[3]);

    this.nodeColor.deleteReferences();
    this.nodeColor = gWorkColor1.getColorInfo(color[0]);
  }


};
