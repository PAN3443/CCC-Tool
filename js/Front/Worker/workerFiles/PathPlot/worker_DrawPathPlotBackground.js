

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
var vPlotWidth = undefined;

// CMS
var globalCMS1 = undefined;

var initIsDone = false;

self.addEventListener('message', function(e) {

  switch (e.data.message) {


   case "init":
      self.importScripts('../../processingCases.js');
      // Colors
      self.importScripts('../../../Classes/ColormapClass/class_Colorspace_RGB.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colorspace_XYZ.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colorspace_LMS.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colorspace_HSV.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colorspace_LAB.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colorspace_DIN99.js');

      self.importScripts('../../../Classes/ColormapClass/class_colormapSpecification.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colormap_Key.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colormap_Interval.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colormap_Probe.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colormap_ProbeSet.js');

      self.importScripts('../../../GlobalEvents/Helpers/canvasHelpers.js');

      globalCMS1 = new class_CMS();

      // draw algorithm for the background
      self.importScripts('../../../Sections/Edit/PathPlot/drawPathPlot/drawPathPlotHelpersBackground.js');

      initIsDone=true;

    break;

  case "getData":

  var answerJSON = {};
  answerJSON['canvasID'] = undefined;
  answerJSON['imageData'] = undefined;

  pathPlotResolution = e.data.pathPlotResolution;
  vPlotWidth = e.data.vPlotWidth;

  answerJSON['pathPlotResolution'] = pathPlotResolution;
  answerJSON['vPlotWidth'] = vPlotWidth;

  var fixedColor = undefined;
  switch (e.data.space) {
    case "rgb":

      if(e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
        fixedColor = new classColor_RGB(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);

      answerJSON.additionalFct = 0;
      answerJSON.imageData=getRGBBackground(fixedColor, e.data.type);
      switch (e.data.type) {
        case "GR":
          answerJSON.canvasID="id_EditPage_PathPlot_Canvas1_0";
          answerJSON.optionA = "G";
          answerJSON.optionB = "R";
        break;
        case "BR":
          answerJSON.canvasID="id_EditPage_PathPlot_Canvas2_0";
          answerJSON.optionA = "B";
          answerJSON.optionB = "R";
        break;
        case "GB":
          answerJSON.canvasID="id_EditPage_PathPlot_Canvas3_0";
          answerJSON.optionA = "G";
          answerJSON.optionB = "B";
        break;

      }

    break;

    case "hsv":
      answerJSON.canvasID="id_EditPage_PathPlot_SingleCanvas_0";
      if(e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
        fixedColor = new classColor_HSV(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);
      answerJSON.imageData=getHSVBackground(fixedColor);
    break;

    case "lab":
      answerJSON.canvasID="id_EditPage_PathPlot_SingleCanvas_0";
      if(e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
        fixedColor = new classColor_LAB(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);
      answerJSON.imageData=getLabBackground(fixedColor);
    break;

    case "din99":
      answerJSON.canvasID="id_EditPage_PathPlot_SingleCanvas_0";
      if(e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
        fixedColor = new classColorDIN99(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);
      answerJSON.imageData=getDIN99Background(fixedColor);
    break;


  }
  self.postMessage(answerJSON);



  break;

  case "draw":

      pathPlotResolution = e.data.pathPlotResolution;

      if(canvas==undefined)
        break;

      var fixedColor = undefined;
      switch (e.data.space) {
        case "rgb":

          canvas.height=pathPlotResolution;
          canvas.width=pathPlotResolution;

          if(e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
            fixedColor = new classColor_RGB(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);

          switch (e.data.type) {
            case "GR":
              drawGRBackground(canvasContex,canvas.width,canvas.height,fixedColor);
            break;
            case "BR":
              drawBRBackground(canvasContex,canvas.width,canvas.height,fixedColor);
            break;
            case "GB":
              drawGBBackground(canvasContex,canvas.width,canvas.height,fixedColor);
            break;

          }

        break;

        case "hsv":

          //////////////////////
          updateVPlotWidth(canvas);
          canvas.height=pathPlotResolution;
          canvas.width=vPlotWidth;

          switch (e.data.type) {
            case "V1":
                drawVPlot(canvasContex,canvas.width,canvas.height,0,1);
            break;
            case "V2":
                drawVPlot(canvasContex,canvas.width,canvas.height,0,1);
            break;
            case "V3":
                drawVPlot(canvasContex,canvas.width,canvas.height,0,1);
            break;
            case "Hue":
                canvas.width=pathPlotResolution;

                if(e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
                  fixedColor = new classColor_HSV(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);

                drawHSVBackground(canvasContex,canvas.width,canvas.height,fixedColor);

            break;

          }

        break;

        case "lab":
          updateVPlotWidth(canvas);
          canvas.height=pathPlotResolution;
          canvas.width=vPlotWidth;

          switch (e.data.type) {
            case "V1":
                drawVPlot(canvasContex,canvas.width,canvas.height,0,1);
            break;
            case "V2":
                drawVPlot(canvasContex,canvas.width,canvas.height,labSpaceRange*-1,labSpaceRange);
            break;
            case "V3":
                drawVPlot(canvasContex,canvas.width,canvas.height,labSpaceRange*-1,labSpaceRange);
            break;
            case "Hue":
                canvas.width=pathPlotResolution;

                if(e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
                  fixedColor = new classColor_LAB(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);

                drawLabBackground(canvasContex,canvas.width,canvas.height,fixedColor);
            break;

          }

        break;

        case "din99":
          updateVPlotWidth(canvas);
          canvas.height=pathPlotResolution;
          canvas.width=vPlotWidth;

          switch (e.data.type) {
            case "V1":
                drawVPlot(canvasContex,canvas.width,canvas.height,0,1);
            break;
            case "V2":
                drawVPlot(canvasContex,canvas.width,canvas.height,rangeA99Neg,rangeA99Pos);
            break;
            case "V3":
                drawVPlot(canvasContex,canvas.width,canvas.height,rangeB99Neg,rangeB99Pos);
            break;
            case "Hue":
                canvas.width=pathPlotResolution;

                if(e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
                  fixedColor = new classColorDIN99(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);

                drawDIN99Background(canvasContex,canvas.width,canvas.height,fixedColor);

            break;

          }

        break;


      }

      break;

      default:

        if(initIsDone)
          generalJSON_Processing(e.data);


  }

}, false);
