////////////////////////////////////////////////
// ------------ Class RGB ---------------//
////////////////////////////////////////////////
class class_Color_RGB extends class_Color_Basis{

  // for future # => private  .... change this. to this.#
  // private fields are not supported at the moment
  /*#rValue = undefined;
  #gValue = undefined;
  #bValue = undefined;
  #colorType = undefined;*/

  constructor(value_1, value_2, value_3) {
    super(value_1, value_2, value_3); // r,g,b
    this.colorType = "rgb";
  }

  getRValue() {
    return this.value_1;
  }

  getGValue() {
    return this.value_2;
  }

  getBValue() {
    return this.value_3;
  }

  setRValue(r) {
    this.value_1 = r;
  }

  setGValue(g) {
    this.value_2 = g;
  }

  setBValue(b) {
    this.value_3 = b;
  }

  checkRGBPossiblity(){
    if(this.value_1>1.0 || this.value_1<0.0)
      return false;

      if(this.value_2>1.0 || this.value_2<0.0)
        return false;

        if(this.value_3>1.0 || this.value_3<0.0)
          return false;

    return true;
  }

  setColorToRGBPossiblity(){
    if(this.value_1>1.0)
      this.value_1=1.0;
    else if(this.value_1<0.0)
      this.value_1=0.0;

      if(this.value_2>1.0)
        this.value_2=1.0;
      else if(this.value_2<0.0)
        this.value_2=0.0;

        if(this.value_3>1.0)
          this.value_3=1.0;
        else if(this.value_3<0.0)
          this.value_3=0.0;
  }

  getRGBString() {
    return "rgb(" + Math.round(this.value_1 * 255) + "," + Math.round(this.value_2 * 255) + "," + Math.round(this.value_3 * 255) + ")"; // Math.round because Chrome needs integers
  }

  getRGBStringAplha(alpha) {
    return "rgba(" + Math.round(this.value_1 * 255) + "," + Math.round(this.value_2 * 255) + "," + Math.round(this.value_3 * 255) + "," + alpha + ")";
  }

  calcLMSColor() {
    var tmpXYZ = this.calcXYZColor();
    var tmpLMS = tmpXYZ.calcLMSColor();
    tmpXYZ.deleteReferences();
    return tmpLMS;
  }


  calcXYZColor() {

    var var_R = this.value_1;
    var var_G = this.value_2;
    var var_B = this.value_3;

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


    return (new class_Color_XYZ(var_X, var_Y, var_Z));
  }

  calcLABColor() {
    /// from RGB -> XYZ
    var tmpXYZ = this.calcXYZColor();
    var tmpLab = tmpXYZ.calcLABColor();
    tmpXYZ.deleteReferences();
    return tmpLab;
  }

  calcRGBColor() {
    return new class_Color_RGB(this.get1Value(), this.get2Value(), this.get3Value());
  }

  calcHSVColor() {

    var max = Math.max(this.value_1, this.value_2, this.value_3),
      min = Math.min(this.value_1, this.value_2, this.value_3);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case this.value_1:
          h = (this.value_2 - this.value_3) / d + (this.value_2 < this.value_3 ? 6 : 0);
          break;
        case this.value_2:
          h = (this.value_3 - this.value_1) / d + 2;
          break;
        case this.value_3:
          h = (this.value_1 - this.value_2) / d + 4;
          break;
      }
      h /= 6;
    }
    return (new class_Color_HSV(h, s, v));

  }

  calcLCHColor(){
    var tmpLAB = this.calcLABColor();
    var tmpLch = tmpLAB.calcLCHColor();
    tmpLAB.deleteReferences();
    return tmpLch;
  }

  calcDIN99Color() {
    var tmpLAB = this.calcLABColor();
    var tmpDIN99 = tmpLAB.calcDIN99Color();
    tmpLAB.deleteReferences();
    return tmpDIN99;
  }

  setColorFromHEX(hex) {
    this.value_1 = parseInt(hex.slice(1, 3), 16) / 255;
    this.value_2 = parseInt(hex.slice(3, 5), 16) / 255;
    this.value_3 = parseInt(hex.slice(5, 7), 16) / 255;
  }

  valueToHex(val) {
    var hex = Number(val).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  }

  getHexString() {
    var rhex = this.valueToHex(parseInt(this.value_1 * 255));
    var ghex = this.valueToHex(parseInt(this.value_2 * 255));
    var bhex = this.valueToHex(parseInt(this.value_3 * 255));
    return "#" + rhex + ghex + bhex;
  }
};
