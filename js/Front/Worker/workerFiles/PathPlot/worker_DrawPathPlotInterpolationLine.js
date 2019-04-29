

// Offscreen Canvas
var canvas = undefined;
var canvasContex = undefined;

/// color settings
var din99_kE = undefined;
var din99_kCH = undefined;
var cielab_ref_X = undefined;
var cielab_ref_Y = undefined;
var cielab_ref_Z = undefined;

/// color metric settings
de2000_k_L = undefined;
de2000_k_C = undefined;
de2000_k_H = undefined;
de94_k_L = undefined;
de94_k_C = undefined;
de94_k_H = undefined;
de94_k_1 = undefined;
de94_k_2 = undefined;

// Simulation Colorblindness
var doColorblindnessSim = false;
var tmXYZ_Selected = undefined;
var tmXYZ_Selected_Inv = undefined;
var tmLMS_Selected = undefined;
var tmLMS_Selected_Inv = undefined;
var sim_AdaptiveColorblindness = undefined;

// Draw Settings
var pathplotLines = [];
var pathplotLinesDashed = [];
var pathplotElementPositions=[];
var vPlotElementPositions=[];
var intervalDelta = undefined;
var pathPlotResolution = 500;
var vPlotWidth = 1500;

var lineWidthVPlot = 2;
var labSpaceRange = undefined;
var rangeA99Neg = undefined;
var rangeA99Pos = undefined;
var rangeB99Neg = undefined;
var rangeB99Pos = undefined;
var rangeA99 = undefined;
var rangeB99 = undefined;

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
      self.importScripts('../../../GlobalEvents/Helpers/calcColordifference.js');
      self.importScripts('../../../GlobalEvents/Helpers/math.js');


      globalCMS1 = new class_CMS();

      // draw algorithm for the background
      self.importScripts('../../../Sections/Edit/PathPlot/drawPathPlot/drawPathPlotHelpersInterpolationLine.js');
      self.importScripts('../../../Sections/Edit/PathPlot/drawPathPlot/drawPathPlotHelpersKeyElements.js');

      initIsDone=true;

    break;

  case "getData":

  var answerJSON = {};
  answerJSON['canvasID'] = undefined;
  answerJSON['canvasID2'] = undefined;

  pathPlotResolution = e.data.pathPlotResolution;
  vPlotWidth = e.data.vPlotWidth;

  answerJSON['pathPlotResolution'] = pathPlotResolution;
  answerJSON['vPlotWidth'] = vPlotWidth;

  answerJSON['do3D'] = e.data.do3D;
  intervalDelta = e.data.intervalDelta;

  answerJSON['pathplotLines'] = [];
  answerJSON['pathplotLinesDashed'] = [];
  answerJSON['pathplotElementPositions'] = [];
  answerJSON['index1'] = undefined;
  answerJSON['index2'] = undefined;
  answerJSON['isRGB'] = false;
  answerJSON['drawInterpolationLine'] = e.data.drawInterpolationLine;


  switch (e.data.space) {
    case "rgb":

      answerJSON.isRGB = true;
      if(e.data.drawInterpolationLine)
        calcRGBInterpolationLine();

        calcRGBElements();


      switch (e.data.type) {
        case "GR":
          answerJSON.canvasID="id_EditPage_PathPlot_Canvas1_1";
          answerJSON.canvasID2="id_EditPage_PathPlot_Canvas1_2";
          answerJSON.index1 = 1;
          answerJSON.index2 = 0;
        break;
        case "BR":
          answerJSON.canvasID="id_EditPage_PathPlot_Canvas2_1";
          answerJSON.canvasID2="id_EditPage_PathPlot_Canvas2_2";
          answerJSON.index1 = 2;
          answerJSON.index2 = 0;
        break;
        case "GB":
          answerJSON.canvasID="id_EditPage_PathPlot_Canvas3_1";
          answerJSON.canvasID2="id_EditPage_PathPlot_Canvas3_2";
          answerJSON.index1 = 1;
          answerJSON.index2 = 2;
        break;
      }

      if(e.data.do3D){
        for (var i = 0; i < pathplotLines.length; i++) {
          var tmpFrom = [];
          tmpFrom.push(pathplotLines[i][0][answerJSON.index1]);
          tmpFrom.push(pathplotLines[i][0][answerJSON.index2]);

          var tmpTill = [];
          tmpTill.push(pathplotLines[i][1][answerJSON.index1]);
          tmpTill.push(pathplotLines[i][1][answerJSON.index2]);

          var tmpFrom3D = [];
          tmpFrom3D.push(pathplotLines[i][2][0]);
          tmpFrom3D.push(pathplotLines[i][2][1]);
          tmpFrom3D.push(pathplotLines[i][2][2]);

          var tmpTill3D = [];
          tmpTill3D.push(pathplotLines[i][3][0]);
          tmpTill3D.push(pathplotLines[i][3][1]);
          tmpTill3D.push(pathplotLines[i][3][2]);

          var tmpPos = [tmpFrom,tmpTill,tmpFrom3D,tmpTill3D];
          answerJSON.pathplotLines.push(tmpPos);
        }

        for (var i = 0; i < pathplotLinesDashed.length; i++) {
          var tmpFrom = [];
          tmpFrom.push(pathplotLinesDashed[i][0][answerJSON.index1]);
          tmpFrom.push(pathplotLinesDashed[i][0][answerJSON.index2]);

          var tmpTill = [];
          tmpTill.push(pathplotLinesDashed[i][1][answerJSON.index1]);
          tmpTill.push(pathplotLinesDashed[i][1][answerJSON.index2]);

          var tmpFrom3D = [];
          tmpFrom3D.push(pathplotLinesDashed[i][2][0]);
          tmpFrom3D.push(pathplotLinesDashed[i][2][1]);
          tmpFrom3D.push(pathplotLinesDashed[i][2][2]);

          var tmpTill3D = [];
          tmpTill3D.push(pathplotLinesDashed[i][3][0]);
          tmpTill3D.push(pathplotLinesDashed[i][3][1]);
          tmpTill3D.push(pathplotLinesDashed[i][3][2]);

          var tmpPos = [tmpFrom,tmpTill,tmpFrom3D,tmpTill3D];
          answerJSON.pathplotLinesDashed.push(tmpPos);
        }
      }
      else {
        for (var i = 0; i < pathplotLines.length; i++) {
          var tmpFrom = [];
          tmpFrom.push(pathplotLines[i][0][answerJSON.index1]);
          tmpFrom.push(pathplotLines[i][0][answerJSON.index2]);

          var tmpTill = [];
          tmpTill.push(pathplotLines[i][1][answerJSON.index1]);
          tmpTill.push(pathplotLines[i][1][answerJSON.index2]);

          var tmpPos = [tmpFrom,tmpTill];
          answerJSON.pathplotLines.push(tmpPos);
        }

        for (var i = 0; i < pathplotLinesDashed.length; i++) {
          var tmpFrom = [];
          tmpFrom.push(pathplotLinesDashed[i][0][answerJSON.index1]);
          tmpFrom.push(pathplotLinesDashed[i][0][answerJSON.index2]);

          var tmpTill = [];
          tmpTill.push(pathplotLinesDashed[i][1][answerJSON.index1]);
          tmpTill.push(pathplotLinesDashed[i][1][answerJSON.index2]);

          var tmpPos = [tmpFrom,tmpTill];
          answerJSON.pathplotLinesDashed.push(tmpPos);
        }
      }

      answerJSON.pathplotElementPositions = pathplotElementPositions;


    break;

    case "hsv":
      answerJSON.canvasID="id_EditPage_PathPlot_SingleCanvas_1";

    break;

    case "lab":
      answerJSON.canvasID="id_EditPage_PathPlot_SingleCanvas_1";

    break;

    case "din99":
      answerJSON.canvasID="id_EditPage_PathPlot_SingleCanvas_1";

    break;


  }
  self.postMessage(answerJSON);



  break;

  case "draw":

    updateVPlotWidth(canvas);
    /*  if(canvas==undefined)
        break;

      var fixedColor = undefined;
      switch (e.data.space) {
        case "rgb":

          canvas.height=500;
          canvas.width=500;

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

          canvas.height=500;
          canvas.width=1500;

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
                canvas.width=500;

                if(e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
                  fixedColor = new classColor_HSV(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);

                drawHSVBackground(canvasContex,canvas.width,canvas.height,fixedColor);

            break;

          }

        break;

        case "lab":

          canvas.height=500;
          canvas.width=1500;

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
                canvas.width=500;

                if(e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
                  fixedColor = new classColor_LAB(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);

                drawLabBackground(canvasContex,canvas.width,canvas.height,fixedColor);
            break;

          }

        break;

        case "din99":

          canvas.height=500;
          canvas.width=1500;

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
                canvas.width=500;

                if(e.data.fixedColorV1 != undefined && e.data.fixedColorV2 != undefined && e.data.fixedColorV3 != undefined)
                  fixedColor = new classColorDIN99(e.data.fixedColorV1, e.data.fixedColorV2, e.data.fixedColorV3);

                drawDIN99Background(canvasContex,canvas.width,canvas.height,fixedColor);

            break;

          }

        break;


      }*/

      break;

      default:

        if(initIsDone)
          generalJSON_Processing(e.data);


  }

}, false);
