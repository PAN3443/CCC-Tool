

// Offscreen Canvas
var canvas = undefined;
var canvasContex = undefined;

// Offscreen Canvas
var canvas2 = undefined;
var canvasContex2 = undefined;

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
var pathplotLinesVPlot=[];

var pathplotElementPositions=[];
var vPlotElementPositions=[];

var intervalDelta = undefined;
var pathPlotResolution = 500;
var vPlotWidth = 1500;

var vPlotyStart = Math.round(pathPlotResolution * 0.9);
var vPlotyEnd = Math.round(pathPlotResolution * 0.1);
var vPlotxStart = Math.round(vPlotWidth * 0.1);
var vPlotxEnd = Math.round(vPlotWidth * 0.85);
var heigthVArea = vPlotyStart - vPlotyEnd;
var plotwidth = vPlotxEnd - vPlotxStart;

var lineWidthVPlot = 2;
var labSpaceRange = undefined;
var rangeA99Neg = undefined;
var rangeA99Pos = undefined;
var rangeB99Neg = undefined;
var rangeB99Pos = undefined;
var rangeA99 = undefined;
var rangeB99 = undefined;

var hsv3DRadius = undefined;
var vStart3D = undefined;
var vEnd3D = undefined;

var labABMax = undefined;
var labSPos = -150.0;
var labEPos = 150.0;

var din99ABMax = undefined;
var din99SPos = -150.0;
var din99EPos = 150.0;

var mouseAboveKeyID = undefined;
var mouseGrappedColorSide = undefined;
var mouseGrappedColor = undefined;

// CMS
var globalCMS1 = undefined;

var initIsDone = false;


/////////////

var circleRad = 6;//8;
var bigcircleRad = 8;// 12;
var bigLineWidth = 4;//8;
var smallLineWidth = 2;//4;

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
      self.importScripts('../../../Sections/Edit/PathPlot/drawPathPlot/drawPathPlotHelpers2D.js');
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

  if(vPlotWidth!=undefined)
    updateVPlotData();

  answerJSON['pathPlotResolution'] = pathPlotResolution;
  answerJSON['vPlotWidth'] = vPlotWidth;
  answerJSON['doOnly3D'] = false;
  answerJSON['do3D'] = e.data.do3D;
  intervalDelta = e.data.intervalDelta;

  answerJSON['pathplotLines'] = [];
  answerJSON['pathplotLinesDashed'] = [];
  answerJSON['pathplotLinesVPlot'] = [];

  answerJSON['pathplotElementPositions'] = [];
  answerJSON['vPlotElementPositions'] = [];

  answerJSON['index1'] = 0;
  answerJSON['index2'] = 1;
  answerJSON['isRGB'] = false;
  answerJSON['isVplot'] = false;
  answerJSON['drawInterpolationLine'] = e.data.drawInterpolationLine;


  if(e.data.space==="rgb"){
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


    answerJSON.pathplotLines = pathplotLines;
    answerJSON.pathplotLinesDashed = pathplotLinesDashed;
    answerJSON.pathplotElementPositions = pathplotElementPositions;
  }
  else {
    switch (e.data.space) {
      case "hsv":
        hsv3DRadius = e.data.hsv3DRadius;
        vStart3D = e.data.vStart3D;
        vEnd3D = e.data.vEnd3D;
        if(e.data.drawInterpolationLine)
          calcInterpolationLine_HSV();
        calcHSVElements();
      break;

      case "lab":
      labABMax = e.data.labABMax;
      labSPos =  e.data.labSPos;
      labEPos =  e.data.labEPos;
        if(e.data.drawInterpolationLine)
          calcInterpolationLine_Lab();
        calcLabElements();
      break;

      case "din99":
      din99ABMax = e.data.din99ABMax;
      din99SPos =  e.data.din99SPos;
      din99EPos =  e.data.din99EPos;
        if(e.data.drawInterpolationLine)
          calcInterpolationLine_DIN99();
        calcDIN99Elements();
      break;

    }

    switch (e.data.type) {
      case "vplot1":
        answerJSON.isVplot = true;
        answerJSON.canvasID="id_EditPage_PathPlot_Canvas1_1";
        answerJSON.canvasID2="id_EditPage_PathPlot_Canvas1_2";
        answerJSON.index1 = 0;
      break;
      case "vplot2":
        answerJSON.isVplot = true;
        answerJSON.canvasID="id_EditPage_PathPlot_Canvas2_1";
        answerJSON.canvasID2="id_EditPage_PathPlot_Canvas2_2";
        answerJSON.index1 = 1;
      break;
      case "vplot3":
        answerJSON.isVplot = true;
        answerJSON.canvasID="id_EditPage_PathPlot_Canvas3_1";
        answerJSON.canvasID2="id_EditPage_PathPlot_Canvas3_2";
        answerJSON.index1 = 2;
      break;
      case "hue":

        answerJSON.canvasID="id_EditPage_PathPlot_SingleCanvas_1";
        answerJSON.canvasID2="id_EditPage_PathPlot_SingleCanvas_2";
      break;
    }

    answerJSON.pathplotLines = pathplotLines;
    answerJSON.pathplotLinesDashed = pathplotLinesDashed;
    answerJSON.pathplotLinesVPlot = pathplotLinesVPlot;

    answerJSON.pathplotElementPositions = pathplotElementPositions;
    answerJSON.vPlotElementPositions = vPlotElementPositions;

    self.postMessage(answerJSON);
  }

  break;

  case "draw":
    pathPlotResolution = e.data.pathPlotResolution;
    vPlotWidth = e.data.vPlotWidth;
    mouseAboveKeyID = e.data.mouseAboveKeyID;
    mouseGrappedColorSide = e.data.mouseGrappedColorSide;
    mouseGrappedColor = e.data.mouseGrappedColor;
    updateVPlotData();



  if(canvas==undefined || canvas2 ==undefined)
      break;

    if(e.data.drawInterpolationLine)
      canvasContex.clearRect(0, 0, canvas.width, canvas.height);

    canvasContex2.clearRect(0, 0, canvas2.width, canvas2.height);

    var answerJSON = {};
    answerJSON['doOnly3D'] = true;
    answerJSON['pathplotLines'] = [];
    answerJSON['pathplotLinesDashed'] = [];
    answerJSON['pathplotElementPositions'] = [];
    answerJSON['drawInterpolationLine'] = e.data.drawInterpolationLine;

    if(e.data.space==="rgb"){

      answerJSON.isRGB = true;

      canvas2.height=pathPlotResolution;
      canvas2.width=pathPlotResolution;
      calcRGBElements();

      if(e.data.drawInterpolationLine){
        canvas.height=pathPlotResolution;
        canvas.width=pathPlotResolution;
        calcRGBInterpolationLine();
      }

        switch (e.data.type) {
          case "GR":
            drawPathplotElements(canvasContex2, 1, 0,true);
            if(e.data.drawInterpolationLine)
              drawInterpolationLine(canvasContex,1,0,true);
          break;
          case "BR":
            drawPathplotElements(canvasContex2, 2, 0,true);
            if(e.data.drawInterpolationLine)
              drawInterpolationLine(canvasContex,2,0,true);
          break;
          case "GB":
            drawPathplotElements(canvasContex2, 1, 2,true);
            if(e.data.drawInterpolationLine)
              drawInterpolationLine(canvasContex,1,2,true);
            answerJSON.pathplotLines = pathplotLines;
            answerJSON.pathplotLinesDashed = pathplotLinesDashed;
            answerJSON.pathplotElementPositions = pathplotElementPositions;
            self.postMessage(answerJSON);
          break;
        }
    }
    else {


      var width = vPlotWidth;
      if(vPlotWidth==undefined) // is undefined in case of the hue visualization, is not undefined in case of vplot vis
        width = pathPlotResolution;

      canvas2.height=pathPlotResolution;
      canvas2.width=width;

      if(e.data.drawInterpolationLine){
        canvas.height=pathPlotResolution;
        canvas.width=width;
      }

      switch (e.data.space) {
        case "hsv":
          hsv3DRadius = e.data.hsv3DRadius;
          vStart3D = e.data.vStart3D;
          vEnd3D = e.data.vEnd3D;
          calcHSVElements();

          if(e.data.drawInterpolationLine)
            calcInterpolationLine_HSV();

        break;

        case "lab":
        labABMax = e.data.labABMax;
        labSPos =  e.data.labSPos;
        labEPos =  e.data.labEPos;
        calcLabElements();
          if(e.data.drawInterpolationLine)
            calcInterpolationLine_Lab();

        break;

        case "din99":
        din99ABMax = e.data.din99ABMax;
        din99SPos =  e.data.din99SPos;
        din99EPos =  e.data.din99EPos;
        calcDIN99Elements();
          if(e.data.drawInterpolationLine)
            calcInterpolationLine_DIN99();

        break;

      }

      switch (e.data.type) {
        case "vplot1":
          drawVplotElements(canvasContex2,0);
          if(e.data.drawInterpolationLine)
            drawInterpolationLine_VPlot(canvasContex, 0);
        break;
        case "vplot2":
          drawVplotElements(canvasContex2,1);
          if(e.data.drawInterpolationLine)
            drawInterpolationLine_VPlot(canvasContex, 1);
        break;
        case "vplot3":
          drawVplotElements(canvasContex2,2);
          if(e.data.drawInterpolationLine)
            drawInterpolationLine_VPlot(canvasContex, 2);
        break;
        case "hue":
          drawPathplotElements(canvasContex2,0,1, false);

          if(e.data.drawInterpolationLine)
            drawInterpolationLine(canvasContex,0,1, false);

          answerJSON.pathplotLines = pathplotLines;
          answerJSON.pathplotLinesDashed = pathplotLinesDashed;
          answerJSON.pathplotElementPositions = pathplotElementPositions;
          self.postMessage(answerJSON);
        break;
      }
    }
    break;

    default:

      if(initIsDone)
        generalJSON_Processing(e.data);


  }

}, false);
