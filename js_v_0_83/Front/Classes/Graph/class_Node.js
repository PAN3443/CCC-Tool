class class_Node {

  constructor(color, refPos) {
    this.nodeColor = color;
    this.isStart = false;
    this.isEnd = false;
    this.isIntermediate = false;
    this.intermediateIndex = 0;
    this.isInactive = false;

    // for force graph
    this.refPos = refPos;
    this.fixedNode = false;
    this.disp = [0, 0, 0];



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

  resetDisp() {
    this.disp = [0, 0, 0];
  }

  addDisp(vec) {
    if (Array.isArray(vec)) {
      if (vec.length == 3) {
        this.disp[0] += vec[0];
        this.disp[1] += vec[1];
        this.disp[2] += vec[2];
      }
    }
  }

  subDisp(vec) {
    if (Array.isArray(vec)) {
      if (vec.length == 3) {
        this.disp[0] -= vec[0];
        this.disp[1] -= vec[1];
        this.disp[2] -= vec[2];
      }
    }
  }

  getDisp() {
    return this.disp;
  }

  setDisp(vec) {
    this.disp = vec;
  }

  deleteReferences() {
    this.nodeColor.deleteReferences();
    delete this.nodeColor;
    delete this.isStart;
    delete this.isEnd;
    delete this.isIntermediate;
    delete this.intermediateIndex;
    delete this.isInactive;

    delete this.velocity_X;
    delete this.velocity_Y;
    delete this.velocity_Z;
    delete this.refPos;
  }

  setVelocity(x, y, z) {
    this.velocity_X = x;
    this.velocity_Y = y;
    this.velocity_Z = z;
  }

  getNodeRefPos() {
    return this.refPos;
  }

  setNodeRefPos(ref) {
    this.refPos = ref;
  }

  forceMovement(rgbCorrection) {

    /*console.log(this.nodeColor.get1Value(),this.nodeColor.get1Value()+this.disp[0]);
    console.log(this.nodeColor.get2Value(),this.nodeColor.get2Value()+this.disp[1]);
    console.log(this.nodeColor.get3Value(),this.nodeColor.get3Value()+this.disp[2]);*/

    if (!this.fixedNode) {
      this.nodeColor.set1Value(this.nodeColor.get1Value() + this.disp[0]);
      this.nodeColor.set2Value(this.nodeColor.get2Value() + this.disp[1]);
      this.nodeColor.set3Value(this.nodeColor.get3Value() + this.disp[2]);

      if (rgbCorrection && !this.nodeColor.checkRGBPossiblity()) {
        this.nodeColor.setColorToRGBPossiblity();
      } //*/
    }

    this.disp = [0, 0, 0];
  }


  getIntermediateIndex() {
    return this.intermediateIndex;
  }

  setIntermediateIndex(intermediateIndex) {
    this.intermediateIndex = intermediateIndex;
  }

  getNodeColor() {
    return cloneColor(this.nodeColor);
  }

  setNodeColor(color) {
    this.nodeColor.deleteReferences();
    this.nodeColor = color;
  }

  getIsStart() {
    return this.isStart;
  }

  setIsStart(isStart) {
    this.isStart = isStart;
  }

  getIsEnd() {
    return this.isEnd;
  }

  setIsEnd(isEnd) {
    this.isEnd = isEnd;
  }

  getIsIntermediate() {
    return this.isIntermediate;
  }

  setIsIntermediate(isIntermediate) {
    this.isIntermediate = isIntermediate;
  }

  getIsInactive() {
    return this.isInactive;
  }

  setIsInactive(isInactive) {
    this.isInactive = isInactive;
  }

};
