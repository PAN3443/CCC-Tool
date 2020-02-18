////////////////////////////////////////////////
// ------------ Class LMS ---------------//
////////////////////////////////////////////////
class class_Color_LMS{

  // for future # => private  .... change this. to this.#
  // private fields are not supported at the moment
  /*#lValue = undefined;
  #mValue = undefined;
  #sValue = undefined;
  #colorType = undefined;*/

    constructor(lValue, mValue, sValue) {

    //this.protanopie = rValue; // max perception red
    //this.deuteranopie = gValue; // max perception green
    //this.tritanopie = bValue; // max perception blue

    this.lValue = lValue; // long wave red area
    this.mValue = mValue; // middle wave green area
    this.sValue = sValue; // short wave blue area
    this.colorType = "lms";
  }

  deleteReferences(){
    delete this.lValue;
    delete this.cValue;
    delete this.hValue;
    delete this.colorType;
  }

  getLValue(){
    return this.lValue;
  }

  getMValue(){
    return this.mValue;
  }

  getSValue(){
    return this.sValue;
  }

  get1Value() {
    return this.lValue;
  }

  get2Value() {
    return this.mValue;
  }

  get3Value() {
    return this.sValue;
  }

  getColorType(){
    return this.colorType;
  }

  calcXYZColor(){

    var var_X = this.lValue * tmLMS_Selected_Inv[0][0] + this.mValue * tmLMS_Selected_Inv[0][1] + this.sValue * tmLMS_Selected_Inv[0][2];
    var var_Y = this.lValue * tmLMS_Selected_Inv[1][0] + this.mValue * tmLMS_Selected_Inv[1][1] + this.sValue * tmLMS_Selected_Inv[1][2];
    var var_Z = this.lValue * tmLMS_Selected_Inv[2][0] + this.mValue * tmLMS_Selected_Inv[2][1] + this.sValue * tmLMS_Selected_Inv[2][2];

    return (new class_Color_XYZ(var_X, var_Y, var_Z));

  }

  calcRGBColor(){
    var tmpXYZ = this.calcXYZColor();
    var result = tmpXYZ.calcRGBColor();
    tmpXYZ.deleteReferences();
    tmpXYZ=null;
    return result;
  }

  checkRGBPossiblity(){
    var tmpXYZ = this.calcXYZColor();
    var result = tmpXYZ.checkRGBPossiblity();
    tmpXYZ.deleteReferences();
    tmpXYZ=null;
    return result;
  }

  setColorToRGBPossiblity(){
    var tmpRGB = this.calcRGBColor();
    tmpRGB.setColorToRGBPossiblity();
    var tmpColor = tmpRGB.calcLMSColor();
    tmpRGB.deleteReferences();
    tmpRGB=null;
    this.lValue = tmpColor.get1Value();
    this.mValue = tmpColor.get2Value();
    this.sValue = tmpColor.get3Value();
    tmpColor.deleteReferences();
    tmpColor=null;
  }

  getRGBString() {
    var tmpRGB = this.calcRGBColor();
    var string = tmpRGB.getRGBString();
    tmpRGB.deleteReferences();
    return string;
  }

  calcColorBlindRGBColor(){

    var newL = this.lValue * sim_AdaptiveColorblindness[0][0] + this.mValue * sim_AdaptiveColorblindness[0][1] + this.sValue * sim_AdaptiveColorblindness[0][2];
    var newM = this.lValue * sim_AdaptiveColorblindness[1][0] + this.mValue * sim_AdaptiveColorblindness[1][1] + this.sValue * sim_AdaptiveColorblindness[1][2];
    var newS = this.lValue * sim_AdaptiveColorblindness[2][0] + this.mValue * sim_AdaptiveColorblindness[2][1] + this.sValue * sim_AdaptiveColorblindness[2][2];

    var var_X = newL * tmLMS_Selected_Inv[0][0] + newM * tmLMS_Selected_Inv[0][1] + newS * tmLMS_Selected_Inv[0][2];
    var var_Y = newL * tmLMS_Selected_Inv[1][0] + newM * tmLMS_Selected_Inv[1][1] + newS * tmLMS_Selected_Inv[1][2];
    var var_Z = newL * tmLMS_Selected_Inv[2][0] + newM * tmLMS_Selected_Inv[2][1] + newS * tmLMS_Selected_Inv[2][2];

    var tmpXYZ = new class_Color_XYZ(var_X, var_Y, var_Z);

    var tmpRGB =  tmpXYZ.calcRGBColor();
    tmpXYZ.deleteReferences();
    return tmpRGB;

  }


};
