////////////////////////////////////////////////
// ------------ Class LMS ---------------//
////////////////////////////////////////////////
class classColor_LMS{
    constructor(lValue, mValue, sValue) {

    //this.protanopie = rValue; // max perception red
    //this.deuteranopie = gValue; // max perception green
    //this.tritanopie = bValue; // max perception blue

    this.lValue = lValue; // long wave red area
    this.mValue = mValue; // middle wave green area
    this.sValue = sValue; // short wave blue area
    this.colorType = "lms"
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

  getColorType(){
    return this.colorType;
  }

  calcXYZColor(){

    var var_X = this.lValue * tmLMS_Selected_Inv[0][0] + this.mValue * tmLMS_Selected_Inv[0][1] + this.sValue * tmLMS_Selected_Inv[0][2];
    var var_Y = this.lValue * tmLMS_Selected_Inv[1][0] + this.mValue * tmLMS_Selected_Inv[1][1] + this.sValue * tmLMS_Selected_Inv[1][2];
    var var_Z = this.lValue * tmLMS_Selected_Inv[2][0] + this.mValue * tmLMS_Selected_Inv[2][1] + this.sValue * tmLMS_Selected_Inv[2][2];

    return (new classColor_XYZ(var_X, var_Y, var_Z));

  }

  calcRGBColor(){
    var tmpXYZ = this.calcXYZColor();
    return tmpXYZ.calcRGBColor();
  }

  checkRGBPossiblity(){
    var tmpXYZ = this.calcXYZColor();
    return tmpXYZ.checkRGBPossiblity();
  }

  getRGBString() {
    var tmpRGB = this.calcRGBColor();
    return tmpRGB.getRGBString();
  }

  calcColorBlindRGBColor(){

    var newL = this.lValue * sim_AdaptiveColorblindness[0][0] + this.mValue * sim_AdaptiveColorblindness[0][1] + this.sValue * sim_AdaptiveColorblindness[0][2];
    var newM = this.lValue * sim_AdaptiveColorblindness[1][0] + this.mValue * sim_AdaptiveColorblindness[1][1] + this.sValue * sim_AdaptiveColorblindness[1][2];
    var newS = this.lValue * sim_AdaptiveColorblindness[2][0] + this.mValue * sim_AdaptiveColorblindness[2][1] + this.sValue * sim_AdaptiveColorblindness[2][2];

    var var_X = newL * tmLMS_Selected_Inv[0][0] + newM * tmLMS_Selected_Inv[0][1] + newS * tmLMS_Selected_Inv[0][2];
    var var_Y = newL * tmLMS_Selected_Inv[1][0] + newM * tmLMS_Selected_Inv[1][1] + newS * tmLMS_Selected_Inv[1][2];
    var var_Z = newL * tmLMS_Selected_Inv[2][0] + newM * tmLMS_Selected_Inv[2][1] + newS * tmLMS_Selected_Inv[2][2];

    var tmpXYZ = new classColor_XYZ(var_X, var_Y, var_Z);

    return tmpXYZ.calcRGBColor();

  }


};
