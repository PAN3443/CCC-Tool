var gWorkColor1 = undefined;
var gWorkColor2 = undefined;

/// color settings
// 2000
var de2000_k_L = 1.0,
  de2000_k_C = 1.0,
  de2000_k_H = 1.0;

// 94
var de94_k_L = 1.0,
  de94_k_C = 1.0,
  de94_k_H = 1.0;
var de94_k_1 = 0.045,
  de94_k_2 = 0.015;


var din99_kE = 1;
var din99_kCH = 1;
var cielab_ref_X = 94.811;
var cielab_ref_Y = 100.000;
var cielab_ref_Z = 107.304;

// Simulation Colorblindness
var doColorblindnessSim = false;
var tmXYZ_Selected = [
  [0.4124564, 0.3575761, 0.1804375],
  [0.2126729, 0.7151522, 0.0721750],
  [0.0193339, 0.1191920, 0.9503041]
];
var tmXYZ_Selected_Inv = [
  [3.2404542, -1.5371385, -0.4985314],
  [-0.9692660, 1.8760108, 0.0415560],
  [0.0556434, -0.2040259, 1.0572252]
];
var tmLMS_Selected = [
  [0.38971, 0.68898, -0.07868],
  [-0.22981, 1.18340, 0.04641],
  [0, 0, 1]
];
var tmLMS_Selected_Inv = [
  [5917000000 / 3097586539, -3444900000 / 3097586539, 625427369 / 3097586539],
  [1149050000 / 3097586539, 1948550000 / 3097586539, -49903 / 6195173078],
  [0, 0, 1]
];
var  sim_AdaptiveColorblindness = [
  [0, 1.05118294, -0.05116099],
  [0, 1, 0],
  [0, 0, 1]
];

// CMS
var drawCMS = undefined;
var somethingChanged = false;

// Offscreen Canvas
var canvas = undefined;
var canvasContex = undefined;

var error = 100; // 0.01
var errorMath = 1e12;

self.addEventListener('message', function(e) {
  switch (e.data.message) {
    case "init":
      self.importScripts('../../../../Global/worker/general_processingCases.js');
      //self.importScripts('../../../../Global/helper/canvasHelper.js');

      // Colors
      self.importScripts('../../../../Global/color/class_Colorspace_Allrounder.js');
      self.importScripts('../../../../Global/color/colorDifference.js');

      self.importScripts('../../../global/cms/class_Colormap_Specification.js');
      self.importScripts('../../../global/cms/class_Colormap_Key.js');
      self.importScripts('../../../global/cms/class_Colormap_Interval.js');
      self.importScripts('../../../global/cms/cmsIntervalHelper.js');

      self.importScripts('../../../../Global/helper/math.js');
      self.importScripts('../../../../Global/helper/quicksort.js');

      gWorkColor1 = new class_Color("rgb",0,0,0);
      gWorkColor2 = new class_Color("rgb",0,0,0);

      drawCMS = new class_CMS();
    break;
    case "draw":
      console.log("draaaaw");
    break;
    case "updateDrawCMS":
      console.log("updateDrawCMS");
      drawCMS.setCMSFromPackage(e.data.cmsInfoPackage);
    break;
  default:
    generalJSON_Processing(e.data);


  }

}, false);



function drawEditCMS(cmsPackage,img_W,img_H){


  var canvasObject = document.getElementById(this.cmsCanvasID);
  var canvasRect = canvasObject.getBoundingClientRect();

  if (canvasRect.width > 1 && canvasRect.height > 1) {
    var ratio = canvasRect.width / canvasRect.height;
    var predefinedHeight = 750;

    canvasObject.width = predefinedHeight * ratio;
    canvasObject.height = predefinedHeight;
  } else {
    return;
  }

  var fontColor = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');
  var strokeColor = getComputedStyle(document.documentElement).getPropertyValue('--menue-bg-color');
  var fillColor = getComputedStyle(document.documentElement).getPropertyValue('--menue-bg-color');
  var actionColor = getComputedStyle(document.documentElement).getPropertyValue('--general-active-color');

  var borderArea = Math.min(Math.round(canvasObject.width * 0.05), Math.round(canvasObject.height * 0.05));
  var x1 = borderArea;
  var y1 = borderArea;
  var limitedWidth = canvasObject.width - (2 * x1);
  var limitedHeight = canvasObject.height - (2 * y1);

  var context = canvasObject.getContext("2d");

  var strokeWidth = Math.min(Math.round(canvasObject.height * 0.005), Math.round(canvasObject.width * 0.005));
  if (strokeWidth == 0) {
    strokeWidth = 1;
  }
  context.lineWidth = strokeWidth;

  context.strokeStyle = strokeColor;
  context.fillStyle = strokeColor;
  context.clearRect(0, 0, canvasObject.width, canvasObject.height);

  if (this.editCMS.getKeyLength() == 0) {
    document.getElementById("id_EditPage_CMSVisDragDropLabel").style.visibility = "visible";
    context.setLineDash([5, 15]);
    context.strokeRect(x1, y1, limitedWidth, limitedHeight);
  } else {
    document.getElementById("id_EditPage_CMSVisDragDropLabel").style.visibility = "hidden";
    this.editCMS_key_size = Math.min(Math.round(limitedWidth * 0.1), Math.round(limitedHeight * 0.1));
    var lineHeight = Math.round(this.editCMS_key_size / 2.0);
    var numberHeight = this.editCMS_key_size;
    var labelFontSize = Math.round((numberHeight / 3) * 2);
    var distanceTop = (numberHeight / 6);

    var linearKeyLine_y1 = y1 + this.editCMS_key_size;

    this.editCMS_cmsArea_x1 = x1 + Math.round(this.editCMS_key_size / 2.0);
    var cmsAreaY1 = linearKeyLine_y1 + lineHeight;

    this.editCMS_cmsArea_width = limitedWidth - this.editCMS_key_size; // two times a half key width
    var cmsAreaHeight = limitedHeight - (2 * this.editCMS_key_size) - (2 * lineHeight) - numberHeight;

    this.editCMS_linearKey_y1 = y1;

    this.editCMS_burdock_y1 = cmsAreaY1;
    this.editCMS_burdock_height = Math.round(cmsAreaHeight * 0.1);

    this.editCMS_linearCMS_y1 = this.editCMS_burdock_y1 + this.editCMS_burdock_height;
    this.editCMS_linearCMS_height = Math.round(cmsAreaHeight * 0.35);

    var sectionLine_y1 = this.editCMS_linearCMS_y1 + this.editCMS_linearCMS_height;
    var sectionLine_Height = Math.round(cmsAreaHeight * 0.2);

    this.editCMS_sketchCMS_y1 = sectionLine_y1 + sectionLine_Height;
    this.editCMS_sketchCMS_height = Math.round(cmsAreaHeight * 0.35);

    var sketchKeyLine_y1 = this.editCMS_sketchCMS_y1 + this.editCMS_sketchCMS_height;

    this.editCMS_sketchKey_y1 = sketchKeyLine_y1 + lineHeight;

    var number_y1 = this.editCMS_sketchKey_y1 + this.editCMS_key_size;
    var font_yPos = number_y1 + numberHeight - distanceTop;

    /////// Draw CMS cmsArea
    var sketch_BandWidth = Math.round(this.editCMS_cmsArea_width / (this.editCMS.getKeyLength() - 1));
    var currentSktech_xPos = this.editCMS_cmsArea_x1;

    var canvasData = context.getImageData(0, 0, canvasObject.width, canvasObject.height);
    for (var i = 0; i < this.editCMS.getKeyLength() - 1; i++) {

      var linearKey_xPos = this.editCMS_cmsArea_x1 + Math.round((this.editCMS.getRefPosition(i) - this.editCMS.getRefPosition(0)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength() - 1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);

      var elementwidth = Math.round((this.editCMS.getRefPosition(i + 1) - this.editCMS.getRefPosition(i)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength() - 1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);

      switch (this.editCMS.getKeyType(i)) {
        case "nil key":
        case "left key":
          // Draw Linear Colormap
          canvasData = createConstantBand(canvasData, linearKey_xPos, this.editCMS_linearCMS_y1, elementwidth, this.editCMS_linearCMS_height, this.editCMS.getLeftKeyColor(i + 1, this.editCMS.getInterpolationSpace()), canvasObject.width);
          canvasData = createConstantBand(canvasData, currentSktech_xPos, this.editCMS_sketchCMS_y1, sketch_BandWidth, this.editCMS_sketchCMS_height, this.editCMS.getLeftKeyColor(i + 1, this.editCMS.getInterpolationSpace()), canvasObject.width);
          break;
        default:
          // Draw Sketch Colormap
          if ((this.editCMS.getInterpolationSpace() === "de94-ds" || this.editCMS.getInterpolationSpace() === "de2000-ds" || this.editCMS.getInterpolationType() === "spline") && this.editCMS.getIntervalLength(i) > 0) {
            var sketch_SubBandWidth = Math.round(sketch_BandWidth / (this.editCMS.getIntervalLength(i) + 1));
            var currentSktech_SubxPos = currentSktech_xPos;
            var linearKey_Sub_xPos = linearKey_xPos;

            // from left key to first interval
            elementwidth = Math.round((this.editCMS.getIntervalRef(i, 0) - this.editCMS.getRefPosition(i)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength() - 1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);
            canvasData = createScaledBand(canvasData, linearKey_Sub_xPos, this.editCMS_linearCMS_y1, elementwidth, this.editCMS_linearCMS_height, this.editCMS.getRightKeyColor(i, this.editCMS.getInterpolationSpace()), this.editCMS.getIntervalColor(i, 0, this.editCMS.getInterpolationSpace()), canvasObject.width);
            canvasData = createScaledBand(canvasData, currentSktech_SubxPos, this.editCMS_sketchCMS_y1, sketch_SubBandWidth, this.editCMS_sketchCMS_height, this.editCMS.getRightKeyColor(i, this.editCMS.getInterpolationSpace()), this.editCMS.getIntervalColor(i, 0, this.editCMS.getInterpolationSpace()), canvasObject.width);
            currentSktech_SubxPos += sketch_SubBandWidth;
            // between intervals
            for (var j = 0; j < this.editCMS.getIntervalLength(i) - 1; j++) {
              linearKey_Sub_xPos += elementwidth;
              elementwidth = Math.round((this.editCMS.getIntervalRef(i, j + 1) - this.editCMS.getIntervalRef(i, j)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength() - 1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);
              canvasData = createScaledBand(canvasData, linearKey_Sub_xPos, this.editCMS_linearCMS_y1, elementwidth, this.editCMS_linearCMS_height, this.editCMS.getIntervalColor(i, j, this.editCMS.getInterpolationSpace()), this.editCMS.getIntervalColor(i, j + 1, this.editCMS.getInterpolationSpace()), canvasObject.width);
              canvasData = createScaledBand(canvasData, currentSktech_SubxPos, this.editCMS_sketchCMS_y1, sketch_SubBandWidth, this.editCMS_sketchCMS_height, this.editCMS.getIntervalColor(i, j, this.editCMS.getInterpolationSpace()), this.editCMS.getIntervalColor(i, j + 1, this.editCMS.getInterpolationSpace()), canvasObject.width);
              currentSktech_SubxPos += sketch_SubBandWidth;
            }
            // from last interval to last key
            linearKey_Sub_xPos += elementwidth; //this.editCMS_cmsArea_x1+Math.round((this.editCMS.getIntervalRef(i,j) - this.editCMS.getRefPosition(0)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);
            var tmpEndPos = this.editCMS_cmsArea_x1 + Math.round((this.editCMS.getRefPosition(i + 1) - this.editCMS.getRefPosition(0)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength() - 1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);
            elementwidth = (tmpEndPos - linearKey_Sub_xPos);
            sketch_SubBandWidth = (currentSktech_xPos + sketch_BandWidth - currentSktech_SubxPos);
            canvasData = createScaledBand(canvasData, linearKey_Sub_xPos, this.editCMS_linearCMS_y1, elementwidth, this.editCMS_linearCMS_height, this.editCMS.getIntervalColor(i, this.editCMS.getIntervalLength(i) - 1, this.editCMS.getInterpolationSpace()), this.editCMS.getLeftKeyColor(i + 1, this.editCMS.getInterpolationSpace()), canvasObject.width);
            canvasData = createScaledBand(canvasData, currentSktech_SubxPos, this.editCMS_sketchCMS_y1, sketch_SubBandWidth, this.editCMS_sketchCMS_height, this.editCMS.getIntervalColor(i, this.editCMS.getIntervalLength(i) - 1, this.editCMS.getInterpolationSpace()), this.editCMS.getLeftKeyColor(i + 1, this.editCMS.getInterpolationSpace()), canvasObject.width);
          } else {
            canvasData = createScaledBand(canvasData, linearKey_xPos, this.editCMS_linearCMS_y1, elementwidth, this.editCMS_linearCMS_height, this.editCMS.getRightKeyColor(i, this.editCMS.getInterpolationSpace()), this.editCMS.getLeftKeyColor(i + 1, this.editCMS.getInterpolationSpace()), canvasObject.width);
            canvasData = createScaledBand(canvasData, currentSktech_xPos, this.editCMS_sketchCMS_y1, sketch_BandWidth, this.editCMS_sketchCMS_height, this.editCMS.getRightKeyColor(i, this.editCMS.getInterpolationSpace()), this.editCMS.getLeftKeyColor(i + 1, this.editCMS.getInterpolationSpace()), canvasObject.width);
          }

      }

      currentSktech_xPos += sketch_BandWidth;
    }
    context.putImageData(canvasData, 0, 0);


    var sectionColor1 = getComputedStyle(document.documentElement).getPropertyValue('--main-bg-color');
    var sectionColor2 = getComputedStyle(document.documentElement).getPropertyValue('--main-second-bg-color');
    var nilBackground = getComputedStyle(document.documentElement).getPropertyValue('--main-second-bg-color');
    var selectedSectionColor = true;
    var lastSectionLinearPos = this.editCMS_cmsArea_x1;
    var lastSectionSketchPos = this.editCMS_cmsArea_x1;

    context.fillRect(this.editCMS_cmsArea_x1, this.editCMS_burdock_y1, this.editCMS_cmsArea_width, this.editCMS_burdock_height); // for the burdock key line

    currentSktech_xPos = this.editCMS_cmsArea_x1;
    for (var i = 0; i < this.editCMS.getKeyLength(); i++) {

      var linearKey_xPos = this.editCMS_cmsArea_x1 + Math.round((this.editCMS.getRefPosition(i) - this.editCMS.getRefPosition(0)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength() - 1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);

      if (this.editCMS.getBur(i)) {
        ///////////////////////////////////////////////
        //////////// Section Line
        /////////////////////////////////////////////
        if (selectedSectionColor) {
          context.fillStyle = sectionColor1;
          selectedSectionColor = false;
        } else {
          context.fillStyle = sectionColor2;
          selectedSectionColor = true;
        }

        var newSectionLinearPos = linearKey_xPos;
        var newSectionSketchPos = currentSktech_xPos;

        context.beginPath();
        context.moveTo(lastSectionLinearPos, sectionLine_y1);
        context.lineTo(newSectionLinearPos, sectionLine_y1);
        context.lineTo(newSectionSketchPos, this.editCMS_sketchCMS_y1);
        context.lineTo(lastSectionSketchPos, this.editCMS_sketchCMS_y1);
        context.closePath();
        context.fill();

        lastSectionLinearPos = newSectionLinearPos;
        lastSectionSketchPos = newSectionSketchPos;

        ///////////////////////////////////////////////
        //////////// Burdock Key Line
        /////////////////////////////////////////////
        context.fillStyle = actionColor;
        var burkey_x1 = linearKey_xPos - Math.round(this.editCMS_key_size / 2.0);

        if (i == 0)
          burkey_x1 = this.editCMS_cmsArea_x1;

        var burkey_width = this.editCMS_key_size;

        if (i == this.editCMS.getKeyLength() - 1 || i == 0)
          burkey_width = Math.round(this.editCMS_key_size / 2.0);

        context.fillRect(burkey_x1, this.editCMS_burdock_y1, burkey_width, this.editCMS_burdock_height); // for the burdock key line
        context.fillStyle = strokeColor;

      }

      ///////////////////////////////////////////////
      //////////// Draw Key Lines
      /////////////////////////////////////////////
      context.beginPath();
      context.moveTo(linearKey_xPos, linearKeyLine_y1);
      context.lineTo(linearKey_xPos, this.editCMS_burdock_y1);
      context.stroke();

      context.beginPath();
      context.moveTo(currentSktech_xPos, sketchKeyLine_y1);
      context.lineTo(currentSktech_xPos, this.editCMS_sketchKey_y1);
      context.stroke();

      ///////////////////////////////////////////////
      //////////// Draw Key
      /////////////////////////////////////////////

      var keyRect_Linear_XPos = Math.round(linearKey_xPos - (this.editCMS_key_size / 2));
      var keyRect_Sketch_XPos = Math.round(currentSktech_xPos - (this.editCMS_key_size / 2));

      switch (this.editCMS.getKeyType(i)) {
        case "nil key":

          this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, this.editCMS_key_size, this.editCMS_key_size, nilBackground, true);
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          this.drawColorRect(context, keyRect_Sketch_XPos, this.editCMS_sketchKey_y1, this.editCMS_key_size, this.editCMS_key_size, nilBackground, true);
          break;
        case "twin key":

          if (this.editCMS.getMoT(i))
            this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size / 2), this.editCMS.getRightKeyColor(i, "rgb"), false);
          else
            this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size / 2), this.editCMS.getLeftKeyColor(i, "rgb"), false);

          var tmp_y1 = Math.round(this.editCMS_linearKey_y1 + this.editCMS_key_size / 2);

          this.drawColorRect(context, keyRect_Linear_XPos, tmp_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size / 2), this.editCMS.getLeftKeyColor(i, "rgb"), false);
          this.drawColorRect(context, linearKey_xPos, tmp_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size / 2), this.editCMS.getRightKeyColor(i, "rgb"), false);

          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          this.drawColorRect(context, keyRect_Sketch_XPos, this.editCMS_sketchKey_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size / 2), this.editCMS.getLeftKeyColor(i, "rgb"), false);
          this.drawColorRect(context, currentSktech_xPos, this.editCMS_sketchKey_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size / 2), this.editCMS.getRightKeyColor(i, "rgb"), false);

          tmp_y1 = Math.round(this.editCMS_sketchKey_y1 + this.editCMS_key_size / 2);

          if (this.editCMS.getMoT(i))
            this.drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size / 2), this.editCMS.getRightKeyColor(i, "rgb"), false);
          else
            this.drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size / 2), this.editCMS.getLeftKeyColor(i, "rgb"), false);

          break;
        case "left key":

          if (i != this.editCMS.getKeyLength() - 1)
            if (this.editCMS.getMoT(i))
              this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size / 2), this.editCMS.getLeftKeyColor(i + 1, "rgb"), false);
            else
              this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size / 2), this.editCMS.getLeftKeyColor(i, "rgb"), false);
          else
            this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size / 2), this.editCMS.getLeftKeyColor(i, "rgb"), false);

          var tmp_y1 = Math.round(this.editCMS_linearKey_y1 + this.editCMS_key_size / 2);

          this.drawColorRect(context, keyRect_Linear_XPos, tmp_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size / 2), this.editCMS.getLeftKeyColor(i, "rgb"), false);
          this.drawColorRect(context, linearKey_xPos, tmp_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size / 2), nilBackground, true);

          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

          this.drawColorRect(context, keyRect_Sketch_XPos, this.editCMS_sketchKey_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size / 2), this.editCMS.getLeftKeyColor(i, "rgb"), false);
          this.drawColorRect(context, currentSktech_xPos, this.editCMS_sketchKey_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size / 2), nilBackground, true);

          tmp_y1 = Math.round(this.editCMS_sketchKey_y1 + this.editCMS_key_size / 2);

          if (i != this.editCMS.getKeyLength() - 1)
            if (this.editCMS.getMoT(i))
              this.drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size / 2), this.editCMS.getLeftKeyColor(i + 1, "rgb"), false);
            else
              this.drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size / 2), this.editCMS.getLeftKeyColor(i, "rgb"), false);
          else
            this.drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size / 2), this.editCMS.getLeftKeyColor(i, "rgb"), false);

          break;
        case "right key":

          this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, Math.round(this.editCMS_key_size / 2), this.editCMS_key_size, nilBackground, true);
          this.drawColorRect(context, linearKey_xPos, this.editCMS_linearKey_y1, Math.round(this.editCMS_key_size / 2), this.editCMS_key_size, this.editCMS.getRightKeyColor(i, "rgb"), false);
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          this.drawColorRect(context, keyRect_Sketch_XPos, this.editCMS_sketchKey_y1, Math.round(this.editCMS_key_size / 2), this.editCMS_key_size, nilBackground, true);
          this.drawColorRect(context, currentSktech_xPos, this.editCMS_sketchKey_y1, Math.round(this.editCMS_key_size / 2), this.editCMS_key_size, this.editCMS.getRightKeyColor(i, "rgb"), false);

          break;
        default:

          this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, this.editCMS_key_size, this.editCMS_key_size, this.editCMS.getRightKeyColor(i, "rgb"), false);
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          this.drawColorRect(context, keyRect_Sketch_XPos, this.editCMS_sketchKey_y1, this.editCMS_key_size, this.editCMS_key_size, this.editCMS.getRightKeyColor(i, "rgb"), false);

      }


      ///////////////////////////////////////////////
      //////////// Key Number Key
      /////////////////////////////////////////////

      var text = "" + (i + 1);
      context.fillStyle = fontColor;
      context.font = labelFontSize + "px Arial";
      context.fillText(text, currentSktech_xPos - (labelFontSize / 3), font_yPos);

      currentSktech_xPos += sketch_BandWidth;
    }

    context.fillStyle = strokeColor;
    context.strokeStyle = strokeColor;

    context.strokeRect(this.editCMS_cmsArea_x1, this.editCMS_linearCMS_y1, this.editCMS_cmsArea_width, this.editCMS_linearCMS_height);
    context.strokeRect(this.editCMS_cmsArea_x1, this.editCMS_sketchCMS_y1, this.editCMS_cmsArea_width, this.editCMS_sketchCMS_height);
    context.strokeRect(this.editCMS_cmsArea_x1, sectionLine_y1, this.editCMS_cmsArea_width, sectionLine_Height);
    context.strokeRect(this.editCMS_cmsArea_x1, this.editCMS_burdock_y1, this.editCMS_cmsArea_width, this.editCMS_burdock_height);
  } // else number of keys !=0
}

function drawColorRect(contex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, rgbColor, isGrey) {

  if (isGrey == true) {
    contex.fillStyle = rgbColor;
    contex.fillRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);

    contex.beginPath();
    contex.moveTo(colorrectXPos, colorrectYPos + colorrectHeigth);
    contex.lineTo(colorrectXPos + colorrectWitdh, colorrectYPos);
    contex.stroke();
  } else {
    if (doColorblindnessSim) {
      var tmpLMS = rgbColor.calcLMSColor();
      rgbColor.deleteReferences();
      rgbColor = tmpLMS.calcColorBlindRGBColor();
      tmpLMS.deleteReferences();
      tmpLMS = null;
    }

    contex.fillStyle = rgbColor.getRGBString();
    contex.fillRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);
    rgbColor.deleteReferences();
    rgbColor = null;
  }

  contex.strokeRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);

}

function about_LinearKey_yPosition(mousePosY) {
  if (mousePosY > this.editCMS_linearKey_y1 && mousePosY < (this.editCMS_linearKey_y1 + this.editCMS_key_size)) {
    return true;
  } else {
    return false;
  }
}

function about_BurdockLine_yPosition(mousePosY) {
  if (mousePosY > this.editCMS_burdock_y1 && mousePosY < (this.editCMS_burdock_y1 + this.editCMS_burdock_height)) {
    return true;
  } else {
    return false;
  }
}

function around_LinearCMSVis_yPosition(mousePosY) {
  if (mousePosY > this.editCMS_linearKey_y1 && mousePosY < (this.editCMS_linearCMS_y1 + this.editCMS_linearCMS_height)) {
    return true;
  } else {
    return false;
  }
}

function around_SketchCMSVis_yPosition(mousePosY) {
  if (mousePosY > this.editCMS_sketchCMS_y1 && mousePosY < (this.editCMS_sketchKey_y1 + this.editCMS_key_size)) {
    return true;
  } else {
    return false;
  }
}

function getClosest_linearKey(mousePosX) {

  for (var index = 0; index < this.editCMS.getKeyLength(); index++) {
    var keyPos = this.editCMS_cmsArea_x1 + Math.round((this.editCMS.getRefPosition(index) - this.editCMS.getRefPosition(0)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength() - 1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);

    if (mousePosX > keyPos - (this.editCMS_key_size / 2) && mousePosX < keyPos + (this.editCMS_key_size / 2)) {
      return index;
    }
  }

  return undefined;
}

function getClosest_sketchKey(mousePosX) {

  var sketch_BandWidth = Math.round(this.editCMS_cmsArea_width / (this.editCMS.getKeyLength() - 1));
  var currentSktech_xPos = this.editCMS_cmsArea_x1;

  for (var index = 0; index < this.editCMS.getKeyLength(); index++) {

    if (mousePosX > currentSktech_xPos - (this.editCMS_key_size / 2) && mousePosX < currentSktech_xPos + (this.editCMS_key_size / 2)) {
      return index;
    }

    currentSktech_xPos += sketch_BandWidth;
  }

  return undefined;
}
