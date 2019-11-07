 class class_Node {

  constructor(color) {
    this.nodeColor = color;
  }


  changeColorType(type) {

    if (this.nodeColor.getColorType() === type)
      return;

    var tmpColor = cloneColor(this.nodeColor);
    this.nodeColor.deleteReferences();
    switch (type) {
      case "rgb":
        this.nodeColor = tmpColor.calcRGBColor();
        break;
      case "lab":
        this.nodeColor = tmpColor.calcLABColor();
        break;
      case "din99":
        this.nodeColor = tmpColor.calcDIN99Color();
        break;
      case "hsv":
        this.nodeColor = tmpColor.calcHSVColor();
        break;
      case "lch":
        this.nodeColor = tmpColor.calcLCHColor();
        break;
      default:
        return;
    }

    tmpColor.deleteReferences();
    tmpColor=null;
  }



  deleteReferences() {
    this.nodeColor.deleteReferences();
    delete this.nodeColor;

  }


  getNodeColor() {
    return cloneColor(this.nodeColor);
  }

  setNodeColor(color) {
    this.nodeColor.deleteReferences();
    this.nodeColor = color;
  }


};
