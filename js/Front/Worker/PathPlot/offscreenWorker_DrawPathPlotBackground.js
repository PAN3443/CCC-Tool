

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

// CMS
var globalCMS1 = undefined;

var initIsDone = false;

self.addEventListener('message', function(e) {

  switch (e.data.message) {


   case "init":
      self.importScripts('../../GlobalEvents/WorkerDependent/standartJSON_Processing.js');
      // Colors
      self.importScripts('../../Classes/ColormapClass/class_Colorspace_RGB.js');
      self.importScripts('../../Classes/ColormapClass/class_Colorspace_XYZ.js');
      self.importScripts('../../Classes/ColormapClass/class_Colorspace_LMS.js');
      self.importScripts('../../Classes/ColormapClass/class_Colorspace_HSV.js');
      self.importScripts('../../Classes/ColormapClass/class_Colorspace_LAB.js');
      self.importScripts('../../Classes/ColormapClass/class_Colorspace_DIN99.js');

      self.importScripts('../../Classes/ColormapClass/class_colormapSpecification.js');
      self.importScripts('../../Classes/ColormapClass/class_Colormap_Key.js');
      self.importScripts('../../Classes/ColormapClass/class_Colormap_Interval.js');
      self.importScripts('../../Classes/ColormapClass/class_Colormap_Probe.js');
      self.importScripts('../../Classes/ColormapClass/class_Colormap_ProbeSet.js');

      globalCMS1 = new class_CMS();

      // draw algorithm for the background
      self.importScripts('../../Sections/Edit/PathPlot/drawPathPlot/drawColorspaceHelpersBackground.js');

      initIsDone=true;

    break;

  case "draw":

      if(canvas==undefined)
        break;

      var fixedColor = undefined;
      switch (e.data.space) {
        case "rgb":

          canvas.height=500;
          canvas.width=500;

          if(e.data.fixedColorR != undefined && e.data.fixedColorG != undefined && e.data.fixedColorB != undefined)
            fixedColor = new classColor_RGB(e.data.fixedColorR, e.data.fixedColorG, e.data.fixedColorB);

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
            case "H1":
                canvas.width=500;
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
            case "H1":
                canvas.width=500;
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
            case "H1":
                canvas.width=500;
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
