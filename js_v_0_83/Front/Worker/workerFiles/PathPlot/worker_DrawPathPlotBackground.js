// Offscreen Canvas
var canvas = undefined;
var canvasContex = undefined;

/// color settings
var din99_kE = undefined;
var din99_kCH = undefined;
var cielab_ref_X = undefined;
var cielab_ref_Y = undefined;
var cielab_ref_Z = undefined;

// Simulation Colorblindness
var doColorblindnessSim = false;
var tmXYZ_Selected = undefined;
var tmXYZ_Selected_Inv = undefined;
var tmLMS_Selected = undefined;
var tmLMS_Selected_Inv = undefined;
var sim_AdaptiveColorblindness = undefined;

// Draw Settings
var lineWidthVPlot = 2;
var labSpaceRange = undefined;
var rangeA99Neg = undefined;
var rangeA99Pos = undefined;
var rangeB99Neg = undefined;
var rangeB99Pos = undefined;
var rangeA99 = undefined;
var rangeB99 = undefined;
var pathPlotResolution = 500;
var vPlotHeight = 200;
var vPlotWidth = undefined;

// CMS
var globalCMS1 = undefined;

var initIsDone = false;

self.addEventListener('message', function(e) {

  switch (e.data.message) {


    case "init":
      self.importScripts('../../processingCases.js');
      worker_LoadColorClasses();

      self.importScripts('../../../GlobalEvents/Helpers/canvasHelpers.js');
      self.importScripts('../../../GlobalEvents/Helpers/math.js');
      self.importScripts('../../../GlobalEvents/cmsIntervals.js');
      self.importScripts('../../../GlobalEvents/CMSColorGradient/calcGradientLinear.js');
      self.importScripts('../../../GlobalEvents/Helpers/calcColordifference.js');

      globalCMS1 = new class_CMS();

      // draw algorithm for the background
      self.importScripts('../../../Sections/Edit/PathPlot/drawPathPlot/drawPathPlotHelpers2D.js');
      self.importScripts('../../../Sections/Edit/PathPlot/drawPathPlot/drawPathPlotHelpersBackground.js');

      initIsDone = true;

      break;

    case "getData":

      var answerJSON = {};
      answerJSON['canvasID'] = undefined;
      answerJSON['imageData'] = undefined;

      pathPlotResolution = e.data.pathPlotResolution;
      vPlotWidth = e.data.vPlotWidth;
      vPlotHeight = e.data.vPlotHeight;

      answerJSON['pathPlotResolution'] = pathPlotResolution;
      answerJSON['vPlotWidth'] = vPlotWidth;

      var fixedColor = undefined;
      switch (e.data.space) {
        case "rgb":

          if (e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
            fixedColor = new classColor_RGB(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);

          answerJSON.additionalFct = 0;
          answerJSON.imageData = getRGBBackground(fixedColor, e.data.type);
          switch (e.data.type) {
            case "GR":
              answerJSON.canvasID = "id_EditPage_PathPlot_Canvas1_0";
              answerJSON.optionA = "G";
              answerJSON.optionB = "R";
              break;
            case "BR":
              answerJSON.canvasID = "id_EditPage_PathPlot_Canvas2_0";
              answerJSON.optionA = "B";
              answerJSON.optionB = "R";
              break;
            case "GB":
              answerJSON.canvasID = "id_EditPage_PathPlot_Canvas3_0";
              answerJSON.optionA = "G";
              answerJSON.optionB = "B";
              break;

          }

          break;

        case "hsv":
          answerJSON.canvasID = "id_EditPage_PathPlot_SingleCanvas_0";
          if (e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
            fixedColor = new classColor_HSV(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);
          answerJSON.imageData = getHSVBackground(fixedColor);
          break;

        case "lab":
          answerJSON.canvasID = "id_EditPage_PathPlot_SingleCanvas_0";
          if (e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
            fixedColor = new classColor_LAB(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);
          answerJSON.imageData = getLabBackground(fixedColor);
          break;

        case "din99":
          answerJSON.canvasID = "id_EditPage_PathPlot_SingleCanvas_0";
          if (e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
            fixedColor = new classColorDIN99(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);
          answerJSON.imageData = getDIN99Background(fixedColor);
          break;
        case "lch":
          answerJSON.canvasID = "id_EditPage_PathPlot_SingleCanvas_0";
          if (e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
            fixedColor = new classColor_LCH(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);
          answerJSON.imageData = getLCHBackground(fixedColor);
          break;


      }
      self.postMessage(answerJSON);



      break;

    case "draw":

      pathPlotResolution = e.data.pathPlotResolution;
      vPlotWidth = e.data.vPlotWidth;
      vPlotHeight = e.data.vPlotHeight;
      pathplotFontColor = e.data.pathplotFontColor;

      updateVPlotData();

      if (canvas == undefined)
        break;


      switch (e.data.space) {
        case "rgb":
          var fixedColor = undefined;
          canvas.height = pathPlotResolution;
          canvas.width = pathPlotResolution;

          if (e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
            fixedColor = new classColor_RGB(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);

          switch (e.data.type) {
            case "GR":
              drawGRBackground(canvasContex, fixedColor);
              break;
            case "BR":
              drawBRBackground(canvasContex, fixedColor);
              break;
            case "GB":
              drawGBBackground(canvasContex, fixedColor);
              break;

          }

          break;

        case "hsv":

          var fixedColor = undefined;

          if (e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
            fixedColor = new classColor_HSV(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);

          switch (e.data.type) {
            case "V1":
              canvas.height = vPlotHeight;
              canvas.width = vPlotWidth;
              drawVPlot(canvasContex, 0, 360);
              break;
            case "V2":
              canvas.height = vPlotHeight;
              canvas.width = vPlotWidth;
              drawVPlot(canvasContex, 0, 100);
              break;
            case "V3":
              canvas.height = vPlotHeight;
              canvas.width = vPlotWidth;
              drawVPlot(canvasContex, 0, 100);
              break;
            case "Hue":
              canvas.height = pathPlotResolution;
              canvas.width = pathPlotResolution;

              drawHSVBackground(canvasContex, fixedColor);

              break;

          }

          break;

        case "lab":

          var fixedColor = undefined;

          if (e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
            fixedColor = new classColor_LAB(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);

          switch (e.data.type) {
            case "V1":
              canvas.height = vPlotHeight;
              canvas.width = vPlotWidth;
              drawVPlot(canvasContex, 0, 100);
              break;
            case "V2":
              canvas.height = vPlotHeight;
              canvas.width = vPlotWidth;
              drawVPlot(canvasContex, labSpaceRange * -1, labSpaceRange);
              break;
            case "V3":
              canvas.height = vPlotHeight;
              canvas.width = vPlotWidth;
              drawVPlot(canvasContex, labSpaceRange * -1, labSpaceRange);
              break;
            case "Hue":
              canvas.height = pathPlotResolution;
              canvas.width = pathPlotResolution;

              drawLabBackground(canvasContex, fixedColor);
              break;

          }

          break;

        case "din99":

          var fixedColor = undefined;

          if (e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
            fixedColor = new classColorDIN99(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);

          switch (e.data.type) {
            case "V1":
              canvas.height = vPlotHeight;
              canvas.width = vPlotWidth;
              drawVPlot(canvasContex, 0, 100);
              break;
            case "V2":
              canvas.height = vPlotHeight;
              canvas.width = vPlotWidth;
              drawVPlot(canvasContex, rangeA99Neg, rangeA99Pos);
              break;
            case "V3":
              canvas.height = vPlotHeight;
              canvas.width = vPlotWidth;
              drawVPlot(canvasContex, rangeB99Neg, rangeB99Pos);
              break;
            case "Hue":
              canvas.height = pathPlotResolution;
              canvas.width = pathPlotResolution;

              drawDIN99Background(canvasContex, fixedColor);

              break;

          }

          break;

        case "lch":
          switch (e.data.type) {
            case "V1":
              canvas.height = vPlotHeight;
              canvas.width = vPlotWidth;
              drawVPlot(canvasContex, 0, 100);
              break;
            case "V2":
              canvas.height = vPlotHeight;
              canvas.width = vPlotWidth;
              drawVPlot(canvasContex, 0, 100);
              break;
            case "V3":
              canvas.height = vPlotHeight;
              canvas.width = vPlotWidth;
              drawVPlot(canvasContex, 0, 360);
              break;
            case "Hue":
              canvas.height = pathPlotResolution;
              canvas.width = pathPlotResolution;

              drawLCHBackground(canvasContex, fixedColor);

              break;

          }

          break;


      }

      break;

    default:

      if (initIsDone)
        generalJSON_Processing(e.data);


  }

}, false);
