////////////////////////////////////////////////
// ------------ Class RGB ---------------//
////////////////////////////////////////////////
class classColor_RGB {
  constructor(rValue, gValue, bValue) {
    this.rValue = rValue;
    this.gValue = gValue;
    this.bValue = bValue;
    this.colorType = "rgb"
  }

  getColorType() {
    return this.colorType;
  }

  getRValue() {
    return this.rValue;
  }

  getGValue() {
    return this.gValue;
  }

  getBValue() {
    return this.bValue;
  }

  get1Value() {
    return this.rValue;
  }

  get2Value() {
    return this.gValue;
  }

  get3Value() {
    return this.bValue;
  }

  set1Value(newVal) {
    this.rValue = newVal;
  }

  set2Value(newVal) {
    this.gValue = newVal;
  }

  set3Value(newVal) {
    this.bValue = newVal;
  }

  setRValue(r) {
    this.rValue = r;
  }

  setGValue(g) {
    this.gValue = g;
  }

  setBValue(b) {
    this.bValue = b;
  }


  checkRGBPossiblity(){
    if(this.rvalue>1.0 || this.rvalue<0.0)
      return false;

      if(this.gvalue>1.0 || this.gvalue<0.0)
        return false;

        if(this.bvalue>1.0 || this.bvalue<0.0)
          return false;

    return true;
  }

  getRGBString() {
    var tmpString = "rgb(" + Math.round(this.rValue * 255) + "," + Math.round(this.gValue * 255) + "," + Math.round(this.bValue * 255) + ")"; // Math.round because Chrome needs integers
    return tmpString;
  }

  getRGBStringAplha(alpha) {
    var tmpString = "rgba(" + Math.round(this.rValue * 255) + "," + Math.round(this.gValue * 255) + "," + Math.round(this.bValue * 255) + "," + alpha + ")";
    return tmpString;
  }

  equalTo(color) {

    switch (color.getColorType()) {
      case "rgb":
        if (color.get1Value() == this.get1Value() &&
          color.get2Value() == this.get2Value() &&
          color.get3Value() == this.get3Value())
          return true;
        else
          return false;
      default:
        var tmpColor = color.calcRGBColor();
        if (color.get1Value() == this.get1Value() &&
          color.get2Value() == this.get2Value() &&
          color.get3Value() == this.get3Value())
          return true;
        else
          return false;

    }
  }

  getInColorFormat(format) {

    switch (format) {
      case "rgb":
        return new classColor_RGB(this.get1Value(), this.get2Value(), this.get3Value());
      case "hsv":
        return this.calcHSVColor();
      case "lab":
        return this.calcLABColor();
      case "din99":
        return this.calcDIN99Color();
      case "lch":
        return this.calcLCHColor();
      default:
        console.log("Error in function getColorFormat of RGB class");
    }

  }

  calcLMSColor() {
    var tmpXYZ = this.calcXYZColor();

    return tmpXYZ.calcLMSColor();
  }


  calcXYZColor() {

    var var_R = this.rValue;
    var var_G = this.gValue;
    var var_B = this.bValue;

    // remove standard gamma correction
    if (var_R > 0.04045) var_R = Math.pow(((var_R + 0.055) / 1.055), 2.4);
    else var_R = var_R / 12.92;
    if (var_G > 0.04045) var_G = Math.pow(((var_G + 0.055) / 1.055), 2.4);
    else var_G = var_G / 12.92;
    if (var_B > 0.04045) var_B = Math.pow(((var_B + 0.055) / 1.055), 2.4);
    else var_B = var_B / 12.92;

    var_R = var_R * 100;
    var_G = var_G * 100;
    var_B = var_B * 100;

    /*var var_X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805;
    var var_Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722;
    var var_Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505;*/

    var var_X = var_R * tmXYZ_Selected[0][0] + var_G * tmXYZ_Selected[0][1] + var_B * tmXYZ_Selected[0][2];
    var var_Y = var_R * tmXYZ_Selected[1][0] + var_G * tmXYZ_Selected[1][1] + var_B * tmXYZ_Selected[1][2];
    var var_Z = var_R * tmXYZ_Selected[2][0] + var_G * tmXYZ_Selected[2][1] + var_B * tmXYZ_Selected[2][2];


    return (new classColor_XYZ(var_X, var_Y, var_Z));
  }

  calcLABColor() {
    /// from RGB -> XYZ
    var tmpXYZ = this.calcXYZColor();
    return tmpXYZ.calcLABColor();
  }

  calcRGBColor() {
    return this;
  }

  calcHSVColor() {

    var max = Math.max(this.rValue, this.gValue, this.bValue),
      min = Math.min(this.rValue, this.gValue, this.bValue);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case this.rValue:
          h = (this.gValue - this.bValue) / d + (this.gValue < this.bValue ? 6 : 0);
          break;
        case this.gValue:
          h = (this.bValue - this.rValue) / d + 2;
          break;
        case this.bValue:
          h = (this.rValue - this.gValue) / d + 4;
          break;
      }
      h /= 6;
    }
    return (new classColor_HSV(h, s, v));

  }

  calcLCHColor(){
    var tmpLAB = this.calcLABColor();
    return tmpLAB.calcLCHColor();
  }

  calcDIN99Color() {
    var tmpLAB = this.calcLABColor();
    return tmpLAB.calcDIN99Color();
  }

  setColorFromHEX(hex) {
    this.rValue = parseInt(hex.slice(1, 3), 16) / 255;
    this.gValue = parseInt(hex.slice(3, 5), 16) / 255;
    this.bValue = parseInt(hex.slice(5, 7), 16) / 255;
  }

  valueToHex(val) {
    var hex = Number(val).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  }

  getHexString() {
    var rhex = this.valueToHex(parseInt(this.rValue * 255));
    var ghex = this.valueToHex(parseInt(this.gValue * 255));
    var bhex = this.valueToHex(parseInt(this.bValue * 255));
    return "#" + rhex + ghex + bhex;
  }
};
