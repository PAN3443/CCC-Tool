////////////////////////////////////////////////
// ------------ Class LMS ---------------//
////////////////////////////////////////////////
class class_Color_LMS extends class_Color_Basis{

  constructor(value_1, value_2, value_3) {
    super(value_1, value_2, value_3); // l,m,s
    // l => long wave red area
    // m => middle wave green area
    // s => short wave blue area
    this.colorType = "lms";
  }

  getLValue(){
    return this.value_1;
  }

  getMValue(){
    return this.value_2;
  }

  getSValue(){
    return this.value_3;
  }

  calcXYZColor(){

    var var_X = this.value_1 * tmLMS_Selected_Inv[0][0] + this.value_2 * tmLMS_Selected_Inv[0][1] + this.value_3 * tmLMS_Selected_Inv[0][2];
    var var_Y = this.value_1 * tmLMS_Selected_Inv[1][0] + this.value_2 * tmLMS_Selected_Inv[1][1] + this.value_3 * tmLMS_Selected_Inv[1][2];
    var var_Z = this.value_1 * tmLMS_Selected_Inv[2][0] + this.value_2 * tmLMS_Selected_Inv[2][1] + this.value_3 * tmLMS_Selected_Inv[2][2];

    return (new class_Color_XYZ(var_X, var_Y, var_Z));

  }

  calcRGBColor(){
    var tmpXYZ = this.calcXYZColor();
    var result = tmpXYZ.calcRGBColor();
    tmpXYZ.deleteReferences();
    tmpXYZ=null;
    return result;
  }

  calcLABColor() {
    /// from RGB -> XYZ
    var tmpXYZ = this.calcXYZColor();
    var tmpLab = tmpXYZ.calcLABColor();
    tmpXYZ.deleteReferences();
    return tmpLab;
  }

  calcLMSColor() {
    return new class_Color_LMS(this.get1Value(), this.get2Value(), this.get3Value());;
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
    this.value_1 = tmpColor.get1Value();
    this.value_2 = tmpColor.get2Value();
    this.value_3 = tmpColor.get3Value();
    tmpColor.deleteReferences();
    tmpColor=null;
  }

  calcColorBlindRGBColor(){

    var newL = this.value_1 * sim_AdaptiveColorblindness[0][0] + this.value_2 * sim_AdaptiveColorblindness[0][1] + this.value_3 * sim_AdaptiveColorblindness[0][2];
    var newM = this.value_1 * sim_AdaptiveColorblindness[1][0] + this.value_2 * sim_AdaptiveColorblindness[1][1] + this.value_3 * sim_AdaptiveColorblindness[1][2];
    var newS = this.value_1 * sim_AdaptiveColorblindness[2][0] + this.value_2 * sim_AdaptiveColorblindness[2][1] + this.value_3 * sim_AdaptiveColorblindness[2][2];

    var var_X = newL * tmLMS_Selected_Inv[0][0] + newM * tmLMS_Selected_Inv[0][1] + newS * tmLMS_Selected_Inv[0][2];
    var var_Y = newL * tmLMS_Selected_Inv[1][0] + newM * tmLMS_Selected_Inv[1][1] + newS * tmLMS_Selected_Inv[1][2];
    var var_Z = newL * tmLMS_Selected_Inv[2][0] + newM * tmLMS_Selected_Inv[2][1] + newS * tmLMS_Selected_Inv[2][2];

    var tmpXYZ = new class_Color_XYZ(var_X, var_Y, var_Z);

    var tmpRGB =  tmpXYZ.calcRGBColor();
    tmpXYZ.deleteReferences();
    return tmpRGB;

  }


};
