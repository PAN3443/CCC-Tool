// global varialbe for all objects of this class
var colorAccuracy = 1e-6;
var testconn=0;
/////////////////////////////////////
class class_Color {
  constructor(space, value_1, value_2, value_3) {

    this.originSpace = space; // this info is important, if the user change the settings for the color conversion
    this.autoRGBClipping = true;

    this.val_1_rgb = undefined;
    this.val_2_rgb = undefined;
    this.val_3_rgb = undefined;

    this.val_1_rgb_cb = undefined; // colorblind
    this.val_2_rgb_cb = undefined;
    this.val_3_rgb_cb = undefined;

    this.val_1_hsv = undefined;
    this.val_2_hsv = undefined;
    this.val_3_hsv = undefined;

    this.val_1_lab = undefined;
    this.val_2_lab = undefined;
    this.val_3_lab = undefined;

    this.val_1_din99 = undefined;
    this.val_2_din99 = undefined;
    this.val_3_din99 = undefined;

    this.val_1_lch = undefined;
    this.val_2_lch = undefined;
    this.val_3_lch = undefined;

    this.val_1_xyz = undefined;
    this.val_2_xyz = undefined;
    this.val_3_xyz = undefined;

    this.val_1_lms = undefined;
    this.val_2_lms = undefined;
    this.val_3_lms = undefined;

    this.getInfo=false;

    this.updateColor(space, value_1, value_2, value_3);
  }

  deleteReferences() {
    delete this.originSpace; // this info is important, if the user change the settings for the color conversion
    delete this.autoRGBClipping;
    delete this.val_1_rgb;
    delete this.val_2_rgb;
    delete this.val_3_rgb;
    delete this.val_1_rgb_cb;
    delete this.val_2_rgb_cb;
    delete this.val_3_rgb_cb;
    delete this.val_1_hsv;
    delete this.val_2_hsv;
    delete this.val_3_hsv;
    delete this.val_1_lab;
    delete this.val_2_lab;
    delete this.val_3_lab;
    delete this.val_1_din99;
    delete this.val_2_din99;
    delete this.val_3_din99;
    delete this.val_1_lch;
    delete this.val_2_lch;
    delete this.val_3_lch;
    delete this.val_1_xyz;
    delete this.val_2_xyz;
    delete this.val_3_xyz;
    delete this.val_1_lms;
    delete this.val_2_lms;
    delete this.val_3_lms;
  }

  resetColor() {
    this.val_1_rgb = undefined;
    this.val_2_rgb = undefined;
    this.val_3_rgb = undefined;

    this.val_1_rgb_cb = undefined;
    this.val_2_rgb_cb = undefined;
    this.val_3_rgb_cb = undefined;

    this.val_1_hsv = undefined;
    this.val_2_hsv = undefined;
    this.val_3_hsv = undefined;

    this.val_1_lab = undefined;
    this.val_2_lab = undefined;
    this.val_3_lab = undefined;

    this.val_1_din99 = undefined;
    this.val_2_din99 = undefined;
    this.val_3_din99 = undefined;

    this.val_1_lch = undefined;
    this.val_2_lch = undefined;
    this.val_3_lch = undefined;

    this.val_1_xyz = undefined;
    this.val_2_xyz = undefined;
    this.val_3_xyz = undefined;

    this.val_1_lms = undefined;
    this.val_2_lms = undefined;
    this.val_3_lms = undefined;
  }

  updateColor(space, value_1, value_2, value_3) {

    this.originSpace = space;
    switch (space) {
      case "RGB": case "rgb": case "Rgb":
        this.setRGB(value_1, value_2, value_3);
        break;
      case "HSV": case "hsv": case "Hsv":
        this.setHSV(value_1, value_2, value_3);
        break;
      case "LAB": case "lab": case "Lab":
      case "de94-ds": case "de2000-ds":
        this.originSpace = "lab";
        this.setLAB(value_1, value_2, value_3);
        break;
      case "LCH": case "lch": case "Lch":
        this.setLCH(value_1, value_2, value_3);
        break;
      case "DIN99": case "din99": case "Din99":
        this.setDIN99(value_1, value_2, value_3);
        break;
      case "XYZ": case "xyz": case "Xyz":
        this.setXYZ(value_1, value_2, value_3);
        break;
      case "LMS": case "lms": case "Lms":
        this.setLMS(value_1, value_2, value_3);
        break;
    }

    this.rgbClipping();
  }

  ////////////////////////////////////////////////////////////////
  ///////////////////////////// Get /////////////////////////////
  ///////////////////////////////////////////////////////////////

  getOriginColorInfo() {
    return this.getColorInfo(this.originSpace);
  }

  getColorInfo(colorspace){
    switch (colorspace) {
      case "RGB": case "rgb": case "Rgb":
        return ["rgb", this.val_1_rgb, this.val_2_rgb, this.val_3_rgb];
      case "rgb_cb":
        return ["rgb", this.val_1_rgb_cb, this.val_2_rgb_cb, this.val_3_rgb_cb];
      case "HSV": case "hsv": case "Hsv":
        return ["hsv", this.val_1_hsv, this.val_2_hsv, this.val_3_hsv];
      case "LAB": case "lab": case "Lab":
      case "de94-ds": case "de2000-ds":
        return ["lab", this.val_1_lab, this.val_2_lab, this.val_3_lab];
      case "LCH": case "lch": case "Lch":
        return ["lch", this.val_1_lch, this.val_2_lch, this.val_3_lch];
      case "DIN99": case "din99": case "Din99":
        return ["din99", this.val_1_din99, this.val_2_din99, this.val_3_din99];
      case "XYZ": case "xyz": case "Xyz":
        return ["xyz", this.val_1_xyz, this.val_2_xyz, this.val_3_xyz];
      case "LMS": case "lms": case "Lms":
        return ["lms", this.val_1_lms, this.val_2_lms, this.val_3_lms];
      case "rgb_string":
        return "rgb("+Math.round(this.val_1_rgb*255)+","+Math.round(this.val_2_rgb*255)+","+Math.round(this.val_3_rgb*255)+")";
      case "rgb_cb_string":
        return "rgb("+Math.round(this.val_1_rgb_cb*255)+","+Math.round(this.val_2_rgb_cb*255)+","+Math.round(this.val_3_rgb_cb*255)+")";
      case "rgb_hex":
        var rhex = this.valueToHex(Math.round(this.val_1_rgb * 255));
        var ghex = this.valueToHex(Math.round(this.val_2_rgb * 255));
        var bhex = this.valueToHex(Math.round(this.val_3_rgb * 255));
        return "#" + rhex + ghex + bhex;
      case "rgb_cb_hex":
        var rhex = this.valueToHex(Math.round(this.val_1_rgb_cb * 255));
        var ghex = this.valueToHex(Math.round(this.val_2_rgb_cb * 255));
        var bhex = this.valueToHex(Math.round(this.val_3_rgb_cb * 255));
        return "#" + rhex + ghex + bhex;
    }
      return undefined;
  }

  valueToHex(val) {
    var hex = Number(val).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  }

  getColorComponent(space, index){ // index is element of [0,1,2]
    var tmpInfo = this.getColorInfo(space);
      if(tmpInfo==undefined)
        return undefined;

      return tmpInfo[index+1];
  }

  get_RGB_String(){
    return "rgb("+Math.round(this.val_1_rgb*255)+","+Math.round(this.val_2_rgb*255)+","+Math.round(this.val_3_rgb*255)+")";
  }

  get_RGB_CB_String(){
    return "rgb("+Math.round(this.val_1_rgb_cb*255)+","+Math.round(this.val_2_rgb_cb*255)+","+Math.round(this.val_3_rgb_cb*255)+")";
  }
  ////////////////////////////////////////////////////////////////
  ///////////////////////////// Set /////////////////////////////
  ///////////////////////////////////////////////////////////////
  setColorInfo(colorInfo){
    if(Array.isArray(colorInfo)){
      if(colorInfo.length==4){
        this.updateColor(colorInfo[0],colorInfo[1],colorInfo[2],colorInfo[3]);
      }
    }
  }

  setValue(space, index, value){
    switch (space) {
      case "RGB": case "rgb": case "Rgb":
        switch (index) {
          case 0:
            this.setRGB(value, this.val_2_rgb, this.val_3_rgb);
          break;
          case 1:
            this.setRGB(this.val_1_rgb, value, this.val_3_rgb);
          break;
          case 2:
            this.setRGB(this.val_1_rgb, this.val_2_rgb, value);
          break;
        }
        break;
      case "HSV": case "hsv": case "Hsv":
        switch (index) {
          case 0:
            this.setHSV(value, this.val_2_hsv, this.val_3_hsv);
          break;
          case 1:
            this.setHSV(this.val_1_hsv, value, this.val_3_hsv);
          break;
          case 2:
            this.setHSV(this.val_1_hsv, this.val_2_hsv, value);
          break;
        }
        break;
      case "LAB": case "lab": case "Lab":
        switch (index) {
          case 0:
            this.setLAB(value, this.val_2_lab, this.val_3_lab);
          break;
          case 1:
            this.setLAB(this.val_1_lab, value, this.val_3_lab);
          break;
          case 2:
            this.setLAB(this.val_1_lab, this.val_2_lab, value);
          break;
        }
        break;
      case "LCH": case "lch": case "Lch":
        switch (index) {
          case 0:
            this.setLCH(value, this.val_2_lch, this.val_3_lch);
          break;
          case 1:
            this.setLCH(this.val_1_lch, value, this.val_3_lch);
          break;
          case 2:
            this.setLCH(this.val_1_lch, this.val_2_lch, value);
          break;
        }
        break;
      case "DIN99": case "din99": case "Din99":
        switch (index) {
          case 0:
            this.setDIN99(value, this.val_2_din99, this.val_3_din99);
          break;
          case 1:
            this.setDIN99(this.val_1_din99, value, this.val_3_din99);
          break;
          case 2:
            this.setDIN99(this.val_1_din99, this.val_2_din99, value);
          break;
        }
        break;
      case "XYZ": case "xyz": case "Xyz":
        switch (index) {
          case 0:
            this.setXYZ(value, this.val_2_xyz, this.val_3_xyz);
          break;
          case 1:
            this.setXYZ(this.val_1_xyz, value, this.val_3_xyz);
          break;
          case 2:
            this.setXYZ(this.val_1_xyz, this.val_2_xyz, value);
          break;
        }
        break;
      case "LMS": case "lms": case "Lms":
        switch (index) {
          case 0:
            this.setLMS(value, this.val_2_lms, this.val_3_lms);
          break;
          case 1:
            this.setLMS(this.val_1_lms, value, this.val_3_lms);
          break;
          case 2:
            this.setLMS(this.val_1_lms, this.val_2_lms, value);
          break;
        }
        break;
    }
    this.rgbClipping();
  }

  setRGB(value_1, value_2, value_3) {
    this.resetColor();
    this.originSpace = "rgb";

    this.val_1_rgb = value_1;
    this.val_2_rgb = value_2;
    this.val_3_rgb = value_3;

      this.conversion_RGB_2_HSV();
      this.conversion_RGB_2_XYZ();
      this.conversion_XYZ_2_LMS();
      this.conversion_LMS_2_RGB_CB();
      this.conversion_XYZ_2_LAB();
      this.conversion_LAB_2_LCH();
      this.conversion_LAB_2_DIN99();

    this.rgbClipping();
  }

  setRGBFromHEX(hex) {
    this.setRGB(parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255);
    this.rgbClipping();
  }

  setHSV(value_1, value_2, value_3) {
    this.resetColor();
    this.originSpace = "hsv";
    this.val_1_hsv = value_1;
    this.val_2_hsv = value_2;
    this.val_3_hsv = value_3;

      this.conversion_HSV_2_RGB();
      this.conversion_RGB_2_XYZ();
      this.conversion_XYZ_2_LMS();
      this.conversion_LMS_2_RGB_CB();
      this.conversion_XYZ_2_LAB();
      this.conversion_LAB_2_LCH();
      this.conversion_LAB_2_DIN99();

    this.rgbClipping();
  }

  setLAB(value_1, value_2, value_3) {
    this.resetColor();
    this.originSpace = "lab";
    this.val_1_lab = value_1;
    this.val_2_lab = value_2;
    this.val_3_lab = value_3;

      this.conversion_LAB_2_LCH();
      this.conversion_LAB_2_DIN99();
      this.conversion_LAB_2_XYZ();
      this.conversion_XYZ_2_LMS();
      this.conversion_XYZ_2_RGB();
      this.conversion_RGB_2_HSV();
      this.conversion_LMS_2_RGB_CB();

    this.rgbClipping();
  }

  setLCH(value_1, value_2, value_3) {
    this.resetColor();
    this.originSpace = "lch";
    this.val_1_lch = value_1;
    this.val_2_lch = value_2;
    this.val_3_lch = value_3;


      this.conversion_LCH_2_LAB();
      this.conversion_LAB_2_DIN99();
      this.conversion_LAB_2_XYZ();
      this.conversion_XYZ_2_LMS();
      this.conversion_XYZ_2_RGB();
      this.conversion_RGB_2_HSV();
      this.conversion_LMS_2_RGB_CB();

    this.rgbClipping();
  }

  setDIN99(value_1, value_2, value_3) {
    this.resetColor();
    this.originSpace = "din99";
    this.val_1_din99 = value_1;
    this.val_2_din99 = value_2;
    this.val_3_din99 = value_3;


      this.conversion_DIN99_2_LAB();
      this.conversion_LAB_2_LCH();
      this.conversion_LAB_2_XYZ();
      this.conversion_XYZ_2_LMS();
      this.conversion_XYZ_2_RGB();
      this.conversion_RGB_2_HSV();
      this.conversion_LMS_2_RGB_CB();

    this.rgbClipping();
  }

  setXYZ(value_1, value_2, value_3) {
    this.resetColor();
    this.originSpace = "xyz";
    this.val_1_xyz = value_1;
    this.val_2_xyz = value_2;
    this.val_3_xyz = value_3;


      this.conversion_XYZ_2_LMS();
      this.conversion_XYZ_2_RGB();
      this.conversion_RGB_2_HSV();
      this.conversion_LMS_2_RGB_CB();
      this.conversion_XYZ_2_LAB();
      this.conversion_LAB_2_LCH();
      this.conversion_LAB_2_DIN99();

    this.rgbClipping();
  }

  setLMS(value_1, value_2, value_3) {
    this.resetColor();
    this.originSpace = "lms";
    this.val_1_lms = value_1;
    this.val_2_lms = value_2;
    this.val_3_lms = value_3;


      this.conversion_LMS_2_XYZ();
      this.conversion_XYZ_2_RGB();
      this.conversion_RGB_2_HSV();
      this.conversion_LMS_2_RGB_CB();
      this.conversion_XYZ_2_LAB();
      this.conversion_LAB_2_LCH();
      this.conversion_LAB_2_DIN99();

    this.rgbClipping();
  }

  ////////////////////////////////////////////////////////////////
  //////////////////// Color Conversions /////////////////////////
  ////////////////////////////////////////////////////////////////

  conversion_HSV_2_RGB() {
    var r, g, b;

    var i = Math.floor(this.val_1_hsv * 6);
    var f = this.val_1_hsv * 6 - i;
    var p = this.val_3_hsv * (1 - this.val_2_hsv);
    var q = this.val_3_hsv * (1 - f * this.val_2_hsv);
    var t = this.val_3_hsv * (1 - (1 - f) * this.val_2_hsv);

    switch (i % 6) {
      case 0:
        r = this.val_3_hsv, g = t, b = p;
        break;
      case 1:
        r = q, g = this.val_3_hsv, b = p;
        break;
      case 2:
        r = p, g = this.val_3_hsv, b = t;
        break;
      case 3:
        r = p, g = q, b = this.val_3_hsv;
        break;
      case 4:
        r = t, g = p, b = this.val_3_hsv;
        break;
      case 5:
        r = this.val_3_hsv, g = p, b = q;
        break;
    }

    this.val_1_rgb = r;
    this.val_2_rgb = g;
    this.val_3_rgb = b;
  }

  conversion_RGB_2_HSV() {

    var max = Math.max(this.val_1_rgb, this.val_2_rgb, this.val_3_rgb),
      min = Math.min(this.val_1_rgb, this.val_2_rgb, this.val_3_rgb);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case this.val_1_rgb:
          h = (this.val_2_rgb - this.val_3_rgb) / d + (this.val_2_rgb < this.val_3_rgb ? 6 : 0);
          break;
        case this.val_2_rgb:
          h = (this.val_3_rgb - this.val_1_rgb) / d + 2;
          break;
        case this.val_3_rgb:
          h = (this.val_1_rgb - this.val_2_rgb) / d + 4;
          break;
      }
      h /= 6;
    }

    this.val_1_hsv = h;
    this.val_2_hsv = s;
    this.val_3_hsv = v;
  }

  conversion_RGB_2_XYZ() {
    // For this method we need the rgb Values
    if (this.val_1_rgb == undefined || this.val_2_rgb == undefined || this.val_3_rgb == undefined)
      return;

    var var_R = this.val_1_rgb;
    var var_G = this.val_2_rgb;
    var var_B = this.val_3_rgb;

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

    this.val_1_xyz = var_R * tmXYZ_Selected[0][0] + var_G * tmXYZ_Selected[0][1] + var_B * tmXYZ_Selected[0][2];
    this.val_2_xyz = var_R * tmXYZ_Selected[1][0] + var_G * tmXYZ_Selected[1][1] + var_B * tmXYZ_Selected[1][2];
    this.val_3_xyz = var_R * tmXYZ_Selected[2][0] + var_G * tmXYZ_Selected[2][1] + var_B * tmXYZ_Selected[2][2];
  }

  conversion_XYZ_2_RGB() {

    var var_X = this.val_1_xyz / 100.0;
    var var_Y = this.val_2_xyz / 100.0;
    var var_Z = this.val_3_xyz / 100.0;

    var var_R = var_X * tmXYZ_Selected_Inv[0][0] + var_Y * tmXYZ_Selected_Inv[0][1] + var_Z * tmXYZ_Selected_Inv[0][2];
    var var_G = var_X * tmXYZ_Selected_Inv[1][0] + var_Y * tmXYZ_Selected_Inv[1][1] + var_Z * tmXYZ_Selected_Inv[1][2];
    var var_B = var_X * tmXYZ_Selected_Inv[2][0] + var_Y * tmXYZ_Selected_Inv[2][1] + var_Z * tmXYZ_Selected_Inv[2][2];

    //apply standard gamma correction
    if (var_R > 0.0031308) var_R = 1.055 * Math.pow(var_R, (1.0 / 2.4)) - 0.055;
    else var_R = 12.92 * var_R;
    if (var_G > 0.0031308) var_G = 1.055 * Math.pow(var_G, (1.0 / 2.4)) - 0.055;
    else var_G = 12.92 * var_G;
    if (var_B > 0.0031308) var_B = 1.055 * Math.pow(var_B, (1.0 / 2.4)) - 0.055;
    else var_B = 12.92 * var_B;

    // RGB - Clipping
    if (var_R > 1.0 || var_G > 1.0 || var_B > 1.0 || var_R < 0.0 || var_G < 0.0 || var_B < 0.0) {
      // Wrong RGB -Values
      if (var_R > 1.0) {
        var_R = 1.0;
      }
      if (var_G > 1.0) {
        var_G = 1.0;
      }
      if (var_B > 1.0) {
        var_B = 1.0;
      }
      if (var_R < 0.0) {
        var_R = 0.0;
      }
      if (var_G < 0.0) {
        var_G = 0.0;
      }
      if (var_B < 0.0) {
        var_B = 0.0;
      }
    }

    this.val_1_rgb = var_R;
    this.val_2_rgb = var_G;
    this.val_3_rgb = var_B;
  }

  conversion_XYZ_2_LAB() {

    var var_X = this.val_1_xyz / cielab_ref_X;
    var var_Y = this.val_2_xyz / cielab_ref_Y;
    var var_Z = this.val_3_xyz / cielab_ref_Z;

    if (var_X > 0.008856) var_X = Math.pow(var_X, (1 / 3));
    else var_X = (7.787 * var_X) + (16 / 116);
    if (var_Y > 0.008856) var_Y = Math.pow(var_Y, (1 / 3));
    else var_Y = (7.787 * var_Y) + (16 / 116);
    if (var_Z > 0.008856) var_Z = Math.pow(var_Z, (1 / 3));
    else var_Z = (7.787 * var_Z) + (16 / 116);

    this.val_1_lab = (116 * var_Y) - 16
    this.val_2_lab = 500 * (var_X - var_Y)
    this.val_3_lab = 200 * (var_Y - var_Z)
  }

  conversion_XYZ_2_LMS() {
    this.val_1_lms = this.val_1_xyz * tmLMS_Selected[0][0] + this.val_2_xyz * tmLMS_Selected[0][1] + this.val_3_xyz * tmLMS_Selected[0][2];
    this.val_2_lms = this.val_1_xyz * tmLMS_Selected[1][0] + this.val_2_xyz * tmLMS_Selected[1][1] + this.val_3_xyz * tmLMS_Selected[1][2];
    this.val_3_lms = this.val_1_xyz * tmLMS_Selected[2][0] + this.val_2_xyz * tmLMS_Selected[2][1] + this.val_3_xyz * tmLMS_Selected[2][2];
  }

  conversion_LMS_2_XYZ() {

    this.val_1_xyz = this.val_1_lms * tmLMS_Selected_Inv[0][0] + this.val_2_lms * tmLMS_Selected_Inv[0][1] + this.val_3_lms * tmLMS_Selected_Inv[0][2];
    this.val_2_xyz = this.val_1_lms * tmLMS_Selected_Inv[1][0] + this.val_2_lms * tmLMS_Selected_Inv[1][1] + this.val_3_lms * tmLMS_Selected_Inv[1][2];
    this.val_3_xyz = this.val_1_lms * tmLMS_Selected_Inv[2][0] + this.val_2_lms * tmLMS_Selected_Inv[2][1] + this.val_3_lms * tmLMS_Selected_Inv[2][2];
  }

  conversion_LMS_2_RGB_CB() {
    var newL = this.val_1_lms * sim_AdaptiveColorblindness[0][0] + this.val_2_lms * sim_AdaptiveColorblindness[0][1] + this.val_3_lms * sim_AdaptiveColorblindness[0][2];
    var newM = this.val_1_lms * sim_AdaptiveColorblindness[1][0] + this.val_2_lms * sim_AdaptiveColorblindness[1][1] + this.val_3_lms * sim_AdaptiveColorblindness[1][2];
    var newS = this.val_1_lms * sim_AdaptiveColorblindness[2][0] + this.val_2_lms * sim_AdaptiveColorblindness[2][1] + this.val_3_lms * sim_AdaptiveColorblindness[2][2];

    var var_X = newL * tmLMS_Selected_Inv[0][0] + newM * tmLMS_Selected_Inv[0][1] + newS * tmLMS_Selected_Inv[0][2];
    var var_Y = newL * tmLMS_Selected_Inv[1][0] + newM * tmLMS_Selected_Inv[1][1] + newS * tmLMS_Selected_Inv[1][2];
    var var_Z = newL * tmLMS_Selected_Inv[2][0] + newM * tmLMS_Selected_Inv[2][1] + newS * tmLMS_Selected_Inv[2][2];

    var var_R = var_X * tmXYZ_Selected_Inv[0][0] + var_Y * tmXYZ_Selected_Inv[0][1] + var_Z * tmXYZ_Selected_Inv[0][2];
    var var_G = var_X * tmXYZ_Selected_Inv[1][0] + var_Y * tmXYZ_Selected_Inv[1][1] + var_Z * tmXYZ_Selected_Inv[1][2];
    var var_B = var_X * tmXYZ_Selected_Inv[2][0] + var_Y * tmXYZ_Selected_Inv[2][1] + var_Z * tmXYZ_Selected_Inv[2][2];

    //apply standard gamma correction
    if (var_R > 0.0031308) var_R = 1.055 * Math.pow(var_R, (1.0 / 2.4)) - 0.055;
    else var_R = 12.92 * var_R;
    if (var_G > 0.0031308) var_G = 1.055 * Math.pow(var_G, (1.0 / 2.4)) - 0.055;
    else var_G = 12.92 * var_G;
    if (var_B > 0.0031308) var_B = 1.055 * Math.pow(var_B, (1.0 / 2.4)) - 0.055;
    else var_B = 12.92 * var_B;

    // RGB - Clipping
    if (var_R > 1.0 || var_G > 1.0 || var_B > 1.0 || var_R < 0.0 || var_G < 0.0 || var_B < 0.0) {
      // Wrong RGB -Values
      if (var_R > 1.0) {
        var_R = 1.0;
      }
      if (var_G > 1.0) {
        var_G = 1.0;
      }
      if (var_B > 1.0) {
        var_B = 1.0;
      }
      if (var_R < 0.0) {
        var_R = 0.0;
      }
      if (var_G < 0.0) {
        var_G = 0.0;
      }
      if (var_B < 0.0) {
        var_B = 0.0;
      }
    }

    this.val_1_rgb_cb = var_R;
    this.val_2_rgb_cb = var_G;
    this.val_3_rgb_cb = var_B;
  }

  conversion_LAB_2_XYZ() {

    var var_Y = (this.val_1_lab + 16.0) / 116.0;
    var var_X = this.val_2_lab / 500.0 + var_Y;
    var var_Z = var_Y - this.val_3_lab / 200.0;

    if (Math.pow(var_Y, 3.0) > 0.008856) {
      var_Y = Math.pow(var_Y, 3.0);
    } else {
      var_Y = (var_Y - 16.0 / 116.0) / 7.787;
    }

    if (Math.pow(var_X, 3.0) > 0.008856) {
      var_X = Math.pow(var_X, 3.0);
    } else {
      var_X = (var_X - 16.0 / 116.0) / 7.787;
    }

    if (Math.pow(var_Z, 3.0) > 0.008856) {
      var_Z = Math.pow(var_Z, 3.0);
    } else {
      var_Z = (var_Z - 16.0 / 116.0) / 7.787;
    }

    this.val_1_xyz = (var_X * cielab_ref_X);
    this.val_2_xyz = (var_Y * cielab_ref_Y);
    this.val_3_xyz = (var_Z * cielab_ref_Z);
  }

  conversion_LAB_2_LCH() {
    this.val_1_lch = this.val_1_lab / 100;
    var normAVal = this.val_2_lab / 128.0;
    var normBVal = this.val_3_lab / 128.0;
    this.val_2_lch = Math.sqrt(Math.pow(normAVal, 2) + Math.pow(normBVal, 2));
    this.val_3_lch = atan2_360Degree(normAVal, normBVal) / 360; // values 0-1
  }

  conversion_LAB_2_DIN99() {
    var valueL99, valueA99, valueB99;
    var lScale = 100 / Math.log(139 / 100.0); // = 303.67
    valueL99 = lScale / din99_kE * Math.log(1 + .0039 * this.val_1_lab);
    if (this.val_2_lab == 0.0 && this.val_3_lab == 0.0) {
      valueA99 = 0.0;
      valueB99 = 0.0;
    } else {
      var angle = 2 * Math.PI / 360 * 26;
      var e = this.val_2_lab * Math.cos(angle) + this.val_3_lab * Math.sin(angle);
      var f = 0.83 * (this.val_3_lab * Math.cos(angle) - this.val_2_lab * Math.sin(angle));
      var G = Math.sqrt(Math.pow(e, 2) + Math.pow(f, 2));
      var C99 = Math.log(1 + 0.075 * G) / (0.0435 * din99_kCH * din99_kE);
      var hef = Math.atan2(f, e);
      var h99 = hef + angle;
      valueA99 = C99 * Math.cos(h99);
      valueB99 = C99 * Math.sin(h99);
    }
    this.val_1_din99 = valueL99;
    this.val_2_din99 = valueA99;
    this.val_3_din99 = valueB99;
  }

  conversion_LCH_2_LAB() {

    this.val_1_lab = this.val_1_lch * 100;
    var tmpRad = degree360ToRad(this.val_3_lch * 360);
    this.val_2_lab = Math.cos(tmpRad) * this.val_2_lch * 128;
    this.val_3_lab = Math.sin(tmpRad) * this.val_2_lch * 128;
  }

  conversion_DIN99_2_LAB() {

    var angle = 2 * Math.PI / 360 * 26;
    var lScale = 100 / Math.log(139 / 100.0); // = 303.67
    this.val_1_lab = (Math.exp(this.val_1_din99 * din99_kE / lScale) - 1.0) / 0.0039;
    var hef = Math.atan2(this.val_3_din99, this.val_2_din99);
    var h99 = hef - angle;
    var C99 = Math.sqrt(Math.pow(this.val_2_din99, 2) + Math.pow(this.val_3_din99, 2));
    var G = (Math.exp(0.0435 * C99 * din99_kCH * din99_kE) - 1) / 0.075;
    var e = G * Math.cos(h99);
    var f = G * Math.sin(h99);
    this.val_2_lab = e * Math.cos(angle) - (f / 0.83) * Math.sin(angle);
    this.val_3_lab = e * Math.sin(angle) + (f / 0.83) * Math.cos(angle);
  }
  ////////////////////////////////////////////////////////////////
  ////////////////////       Others      /////////////////////////
  ////////////////////////////////////////////////////////////////

  equalTo(colorInfo) { // colorInfo [space,val1,val2,val3]

    if(colorInfo==undefined)
      return false;

    switch (colorInfo[0]) {
      case "RGB": case "rgb": case "Rgb":
        return ( Math.abs(this.val_1_rgb-colorInfo[1])<colorAccuracy && Math.abs(this.val_2_rgb-colorInfo[2])<colorAccuracy && Math.abs(this.val_3_rgb-colorInfo[3])<colorAccuracy);
        break;
      case "HSV": case "hsv": case "Hsv":
        return (Math.abs(this.val_1_hsv-colorInfo[1])<colorAccuracy && Math.abs(this.val_2_hsv-colorInfo[2])<colorAccuracy && Math.abs(this.val_3_hsv-colorInfo[3])<colorAccuracy);
        break;
      case "LAB": case "lab": case "Lab":
        return (Math.abs(this.val_1_lab-colorInfo[1])<colorAccuracy && Math.abs(this.val_2_lab-colorInfo[2])<colorAccuracy && Math.abs(this.val_3_lab-colorInfo[3])<colorAccuracy);
        break;
      case "LCH": case "lch": case "Lch":
        return (Math.abs(this.val_1_lch-colorInfo[1])<colorAccuracy && Math.abs(this.val_2_lch-colorInfo[2])<colorAccuracy && Math.abs(this.val_3_lch-colorInfo[3])<colorAccuracy);
        break;
      case "DIN99": case "din99": case "Din99":
        return (Math.abs(this.val_1_din99-colorInfo[1])<colorAccuracy && Math.abs(this.val_2_din99-colorInfo[2])<colorAccuracy && Math.abs(this.val_3_din99-colorInfo[3])<colorAccuracy);
        break;
      case "XYZ": case "xyz": case "Xyz":
        return (Math.abs(this.val_1_xyz-colorInfo[1])<colorAccuracy && Math.abs(this.val_2_xyz-colorInfo[2])<colorAccuracy && Math.abs(this.val_3_xyz-colorInfo[3])<colorAccuracy);
        break;
      case "LMS": case "lms": case "Lms":
        return (Math.abs(this.val_1_lms-colorInfo[1])<colorAccuracy && Math.abs(this.val_2_lms-colorInfo[2])<colorAccuracy && Math.abs(this.val_3_lms-colorInfo[3])<colorAccuracy);
        break;
    }
    return false;
  }


  rgbClipping(){

    if(!this.autoRGBClipping)
      return;

    // do Clipping for the case of setRGBFromHEX or setRGB has set false values
    if (this.val_1_rgb > 1.0) {
      this.val_1_rgb = 1.0;
    }
    if (this.val_2_rgb > 1.0) {
      this.val_2_rgb = 1.0;
    }
    if (this.val_3_rgb > 1.0) {
      this.val_3_rgb = 1.0;
    }
    if (this.val_1_rgb < 0.0) {
      this.val_1_rgb = 0.0;
    }
    if (this.val_2_rgb < 0.0) {
      this.val_2_rgb = 0.0;
    }
    if (this.val_3_rgb < 0.0) {
      this.val_3_rgb = 0.0;
    }

    // rgb clipping is for the case, that a XYZ-Color ( or related Colorspace) is out of the rgb order
    if(!this.checkRGBPossiblity_XYZ()){
      // the rgb values of this class object are already clipped. Now we only have to update the colorvalues of the XYZ related Colorspaces
      this.conversion_RGB_2_HSV();
      this.conversion_RGB_2_XYZ();
      this.conversion_XYZ_2_LMS();
      this.conversion_LMS_2_RGB_CB();
      this.conversion_XYZ_2_LAB();
      this.conversion_LAB_2_LCH();
      this.conversion_LAB_2_DIN99();
    }

  }

  checkRGBPossiblity() {
    switch (this.originSpace) {
      case "RGB": case "rgb": case "Rgb":
        if (this.val_1_rgb > 1.0 || this.val_2_rgb > 1.0 || this.val_3_rgb > 1.0 || this.val_1_rgb < 0.0 || this.val_2_rgb < 0.0 || this.val_3_rgb < 0.0)
          return false;
        return true;
      case "HSV": case "hsv": case "Hsv":
        if (this.val_1_hsv > 1.0 || this.val_2_hsv > 1.0 || this.val_3_hsv > 1.0 || this.val_1_hsv < 0.0 || this.val_2_hsv < 0.0 || this.val_3_hsv < 0.0)
          return false;
        return true;
      case "XYZ": case "xyz": case "Xyz":
        return this.checkRGBPossiblity_XYZ();
      case "LMS": case "lms": case "Lms":
        /*if (!this.autoConversion)
          this.conversion_LMS_2_XYZ();*/
        return this.checkRGBPossiblity_XYZ();
      case "LAB": case "lab": case "Lab":
        /*if (!this.autoConversion)
          this.conversion_LAB_2_XYZ();*/
        return this.checkRGBPossiblity_XYZ();
      case "LCH": case "lch": case "Lch":
        /*if (!this.autoConversion) {
          this.conversion_LCH_2_LAB();
          this.conversion_LAB_2_XYZ();
        }*/
        return this.checkRGBPossiblity_XYZ();
      case "DIN99": case "din99": case "Din99":
        /*if (!this.autoConversion) {
          this.conversion_DIN99_2_LAB();
          this.conversion_LAB_2_XYZ();
        }*/
        return this.checkRGBPossiblity_XYZ();
      default:
        return true;
    }
  }

  checkRGBPossiblity_XYZ() {
    var var_X = this.val_1_xyz / 100.0;
    var var_Y = this.val_2_xyz / 100.0;
    var var_Z = this.val_3_xyz / 100.0;

    var var_R = var_X * tmXYZ_Selected_Inv[0][0] + var_Y * tmXYZ_Selected_Inv[0][1] + var_Z * tmXYZ_Selected_Inv[0][2];
    var var_G = var_X * tmXYZ_Selected_Inv[1][0] + var_Y * tmXYZ_Selected_Inv[1][1] + var_Z * tmXYZ_Selected_Inv[1][2];
    var var_B = var_X * tmXYZ_Selected_Inv[2][0] + var_Y * tmXYZ_Selected_Inv[2][1] + var_Z * tmXYZ_Selected_Inv[2][2];

    //apply standard gamma correction
    if (var_R > 0.0031308) var_R = 1.055 * Math.pow(var_R, (1.0 / 2.4)) - 0.055;
    else var_R = 12.92 * var_R;
    if (var_G > 0.0031308) var_G = 1.055 * Math.pow(var_G, (1.0 / 2.4)) - 0.055;
    else var_G = 12.92 * var_G;
    if (var_B > 0.0031308) var_B = 1.055 * Math.pow(var_B, (1.0 / 2.4)) - 0.055;
    else var_B = 12.92 * var_B;

    if (var_R > 1.0 || var_G > 1.0 || var_B > 1.0 || var_R < 0.0 || var_G < 0.0 || var_B < 0.0) {
      return false;
    } else {
      return true;
    }
  }

};
