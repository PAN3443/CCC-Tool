

// Offscreen Canvas
var canvas = undefined;
var ctx = undefined;

// Simulation Colorblindness
var doColorblindnessSim = false;
var tmXYZ_Selected = undefined;
var tmXYZ_Selected_Inv = undefined;
var tmLMS_Selected = undefined;
var tmLMS_Selected_Inv = undefined;
var sim_AdaptiveColorblindness = undefined;

// Draw Settings
var lineWidthVPlot = 2;

self.addEventListener('message', function(e) {

  switch (e.data.message) {
    case "canvas":
        canvas = e.data.canvas;
        ctx = canvas.getContext("2d");
      break;

   case "init":
      // Colors
      self.importScripts('../../Classes/ColormapClass/class_Colorspace_RGB.js');
      self.importScripts('../../Classes/ColormapClass/class_Colorspace_XYZ.js');
      self.importScripts('../../Classes/ColormapClass/class_Colorspace_LMS.js');
      self.importScripts('../../Classes/ColormapClass/class_Colorspace_HSV.js');
      self.importScripts('../../Classes/ColormapClass/class_Colorspace_LAB.js');
      self.importScripts('../../Classes/ColormapClass/class_Colorspace_DIN99.js');

      // draw algorithm for the background
      self.importScripts('../../Sections/Edit/PathPlot/drawPathPlot/drawColorspaceHelpersBackground.js');
    break;

    case "colorSimSettings":
      doColorblindnessSim = e.data.doColorblindnessSim;
      tmXYZ_Selected = e.data.tmXYZ_Selected;
      tmXYZ_Selected_Inv = e.data.tmXYZ_Selected_Inv;
      tmLMS_Selected = e.data.tmLMS_Selected;
      tmLMS_Selected_Inv = e.data.tmLMS_Selected_Inv;
      sim_AdaptiveColorblindness = e.data.sim_AdaptiveColorblindness;
    break;

    case "draw":

      var fixedColor = undefined;
      switch (e.data.space) {
        case "rgb":

          canvas.height=500;
          canvas.width=500;

          if(e.data.fixedColorR != undefined && e.data.fixedColorG != undefined && e.data.fixedColorB != undefined)
            fixedColor = new classColor_RGB(e.data.fixedColorR, e.data.fixedColorG, e.data.fixedColorB);

          switch (e.data.type) {
            case "GR":
              drawGRBackground(ctx,canvas.width,canvas.height,fixedColor);
            break;
            case "BR":
              drawBRBackground(ctx,canvas.width,canvas.height,fixedColor);
            break;
            case "GB":
              drawGBBackground(ctx,canvas.width,canvas.height,fixedColor);
            break;

          }

        break;

      }

      break;
  }

}, false);
