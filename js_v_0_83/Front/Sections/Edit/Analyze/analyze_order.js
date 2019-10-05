function styleStructure_Order() {

  if (globalCMS1.getKeyLength() == 0) {
    document.getElementById("id_EditPage_Analyze_EmptyDiv").style.display = "flex";
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "none";
  } else {
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "flex";
    document.getElementById("id_EditPage_Analyze_EmptyDiv").style.display = "none";
    document.getElementById("id_EditPage_FixedAxisDiv_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_Average_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_Deviation_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_DoLogDiv_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_ColorAboveDiv_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_editPage_OrderAxisLabel1").style.visibility = "visible";
    document.getElementById("id_editPage_OrderAxisLabel2").style.visibility = "visible";
    document.getElementById("id_EditPage_Analyze_ContiuousSections").style.display = "none";
    document.getElementById("id_EditPage_MaxSetting_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_KeyOrSamplingSetting_GlobalLocalOrder").style.display = "block";


    styleGlobalLocalOrderPlot();

    var plotid = "id_EditPage_Canvas_GlobalLocalOrder";

    if (document.getElementById("id_PopUp_fullAnalzeWindow").style.display != "none")
      plotid = "id_PopUp_FullAnalayzeCanvas";

    drawOrderPlot(plotid, "id_EditPage_Min_GlobalLocalOrder", "id_EditPage_Max_GlobalLocalOrder");

  }

}



function drawOrderPlot(plotid, minId, minGlobalId) {

  var canvasPlot = document.getElementById(plotid);

  canvasPlot.width = 1000;
  canvasPlot.height = 1000;


  var canvasCtx = canvasPlot.getContext("2d");

  canvasCtx.mozImageSmoothingEnabled = false;
  canvasCtx.webkitImageSmoothingEnabled = false;
  canvasCtx.msImageSmoothingEnabled = false;
  canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
  canvasCtx.oImageSmoothingEnabled = false;

  ///////////////////////////////////////////////////////////////
  ///// init order plot
  //////////////////////////////////////////////////////////////

  var colormapbarwidth = canvasPlot.width * 0.9;
  var colormapXStart = (canvasPlot.width - colormapbarwidth) / 2;
  var plotHeight = canvasPlot.height * 0.9;
  var plotyStart = (canvasPlot.height - plotHeight) / 2;

  var arrowHeight = canvasPlot.height * 0.05;
  var arrowWidth = canvasPlot.width * 0.025;
  var labelFontSize = canvasPlot.height * 0.04;
  var labelYStart = (((canvasPlot.height - plotHeight) / 2) - (arrowHeight / 2) - labelFontSize) / 2 + labelFontSize;

  var arrowPlotHeight = (plotHeight * 0.95) / 2;
  var colormapHeight = plotHeight * 0.05;
  var colormapYStart = plotyStart + (plotHeight / 2) - (colormapHeight / 2);
  var colormapYEnd = colormapYStart + colormapHeight;

  // colormap interval rect

  //////////////////////////////////////////////////////////////////////
  //// Arrow 1
  canvasCtx.strokeStyle = "rgb(0,0,0)"; //"rgb(255,127,80)";
  canvasCtx.beginPath();
  canvasCtx.lineWidth = 10;
  canvasCtx.moveTo(colormapXStart, colormapYStart);
  canvasCtx.lineTo(colormapXStart, plotyStart);
  canvasCtx.stroke();

  // the triangle
  canvasCtx.beginPath();
  canvasCtx.moveTo(colormapXStart - arrowWidth, plotyStart);
  canvasCtx.lineTo(colormapXStart, plotyStart - arrowHeight);
  canvasCtx.lineTo(colormapXStart + arrowWidth, plotyStart);
  canvasCtx.closePath();

  // the fill color
  canvasCtx.fillStyle = "rgb(0,0,0)"; //"rgb(255,127,80)";
  canvasCtx.fill();

  /*canvasCtx.font = labelFontSize+"px Arial";
  canvasCtx.fillText("|local Order|",colormapXStart+arrowWidth,labelYStart);
  var width = canvasCtx.measureText("|local Order|").width;
  var height = canvasCtx.measureText("|local Order|").height;
  canvasCtx.fillStyle = "rgb(1,1,1)";
  canvasCtx.fillRect(colormapXStart+arrowWidth,labelYStart, width, height);*/
  //////////////////////////////////////////////////////////////////////
  //// Arrow 2
  canvasCtx.strokeStyle = "rgb(0,0,0)"; //"rgb(30,144,255)";
  canvasCtx.beginPath();
  canvasCtx.lineWidth = 10;
  canvasCtx.moveTo(colormapXStart, colormapYEnd);
  canvasCtx.lineTo(colormapXStart, plotyStart + plotHeight);
  canvasCtx.stroke();

  // the triangle
  canvasCtx.beginPath();
  canvasCtx.moveTo(colormapXStart - arrowWidth, plotyStart + plotHeight);
  canvasCtx.lineTo(colormapXStart, plotyStart + plotHeight + arrowHeight);
  canvasCtx.lineTo(colormapXStart + arrowWidth, plotyStart + plotHeight);
  canvasCtx.closePath();

  // the fill color
  canvasCtx.fillStyle = "rgb(0,0,0)"; //"rgb(30,144,255)";
  canvasCtx.fill();

  /*canvasCtx.font = labelFontSize+"px Arial";
  canvasCtx.fillText("negative global Order",colormapXStart+arrowWidth,canvasPlot.height-labelYStart);
  var width = canvasCtx.measureText("negative global Order").width;
  var height = canvasCtx.measureText("negative global Order").height;
  canvasCtx.fillStyle = "rgb(1,1,1)";
  canvasCtx.fillRect(colormapXStart+arrowWidth,canvasPlot.height-labelYStart, width, height);*/

  //////////////////////////////////////////////////////////// draw refLineSketchContainer
  canvasCtx.lineWidth = 1;

  //////////////////////////////////////////////////////////////////////
  //// get colors
  var colorArray = [];

  if (document.getElementById("id_EditPage_AnalyseOnlyUseKeys").checked) {
    for (var i = 0; i < globalCMS1.getKeyLength(); i++) {
      switch (globalCMS1.getKeyType(i)) {
        case "nil key":
          continue;
          break;
        case "left key":
          colorArray.push(globalCMS1.getLeftKeyColor(i, globalCMS1.getInterpolationSpace()));
          break;
        case "twin key":
          colorArray.push(globalCMS1.getLeftKeyColor(i, globalCMS1.getInterpolationSpace()));
          colorArray.push(globalCMS1.getRightKeyColor(i, globalCMS1.getInterpolationSpace()));
          break;
        case "right key":
          colorArray.push(globalCMS1.getRightKeyColor(i, globalCMS1.getInterpolationSpace()));
          break;
        default:
          colorArray.push(globalCMS1.getRightKeyColor(i, globalCMS1.getInterpolationSpace()));
      }
    }
  } else {
    for (var i = 0; i < globalCMS1.getKeyLength(); i++) {
      switch (globalCMS1.getKeyType(i)) {
        case "nil key":
          continue;
          break;
        case "left key":
          colorArray.push(globalCMS1.getLeftKeyColor(i, globalCMS1.getInterpolationSpace()));
          break;
        case "twin key":
          colorArray.push(globalCMS1.getLeftKeyColor(i, globalCMS1.getInterpolationSpace()));
          colorArray.push(globalCMS1.getRightKeyColor(i, globalCMS1.getInterpolationSpace()));
          for (var j = 0; j < globalCMS1.getIntervalLength(i) - 1; j++) {
            colorArray.push(globalCMS1.getIntervalColor(i, j, globalCMS1.getInterpolationSpace()));
          }
          break;
        case "right key":
          colorArray.push(globalCMS1.getRightKeyColor(i, globalCMS1.getInterpolationSpace()));
          for (var j = 0; j < globalCMS1.getIntervalLength(i) - 1; j++) {
            colorArray.push(globalCMS1.getIntervalColor(i, j, globalCMS1.getInterpolationSpace()));
          }
          break;
        default:
          colorArray.push(globalCMS1.getRightKeyColor(i, globalCMS1.getInterpolationSpace()));
          for (var j = 0; j < globalCMS1.getIntervalLength(i) - 1; j++) {
            colorArray.push(globalCMS1.getIntervalColor(i, j, globalCMS1.getInterpolationSpace()));
          }
      }
    }
  }


  //////////////////////////////////////////////////////////////////////
  //// Draw intervals


  var currentXPos = colormapXStart;
  var bandWidth = colormapbarwidth / (colorArray.length);

  for (var i = 0; i < colorArray.length; i++) {
    canvasCtx.fillStyle = colorArray[i].getRGBString();
    canvasCtx.fillRect(currentXPos, colormapYStart, bandWidth, colormapHeight);
    /*canvasCtx.strokeStyle = "rgb(0,0,0)";
    canvasCtx.rect(currentXPos,colormapYStart,bandWidth,colormapHeight);
    canvasCtx.stroke();*/
    currentXPos += bandWidth;
  }

  ///////////////////////////////////////////////////////////////
  ///// Calculation of Order
  //////////////////////////////////////////////////////////////

  var minLocal = Infinity;
  var maxLocal = -Infinity;
  var minGlobal = Infinity;
  ///////////////////////////////////////////////////////////////
  ///// Local Order
  //////////////////////////////////////////////////////////////

  var localOrder = [];

  for (var i = 1; i < colorArray.length - 1; i++) {

    var orderValues = getOrderValues(cloneColor(colorArray[i-1]), cloneColor(colorArray[i]), cloneColor(colorArray[i+1]), globalCMS1.getInterpolationSpace());
    var orderVal = Math.min(orderValues[3], orderValues[4]);

    maxLocal = Math.max(maxLocal, orderVal);
    minLocal = Math.min(minLocal, orderVal);

    localOrder.push(orderVal);
  }

  // draw
  currentXPos = colormapXStart + bandWidth;

  if (minLocal < 0)
    maxLocal = Math.max(maxLocal, minLocal * -1);

  for (var y = 0; y < localOrder.length; y++) {

    var colorRef = undefined;

    var tmpVal = localOrder[y];
    if (tmpVal < 0) {
      tmpVal *= -1;
      colorRef = new class_Color_RGB(1, 0, 0);
    } else {
      colorRef = new class_Color_RGB(0, 0, 1);
    }

    var deltaHeight = arrowPlotHeight * (tmpVal / maxLocal);
    var yPos = colormapYStart - deltaHeight;

    canvasCtx.fillStyle = colorRef.getRGBString();
    canvasCtx.fillRect(currentXPos, yPos, bandWidth, deltaHeight);

    colorRef.deleteReferences();
    colorRef = null;

    currentXPos += bandWidth;

  }


  ///////////////////////////////////////////////////////////////
  ///// Global Order
  //////////////////////////////////////////////////////////////

  var arrayk0 = [];
  var t1, t2, t3;

  var minGlobal = 1; // Infinity is not needed, because min is only intressting if it is negative
  for (var k0 = 0; k0 < colorArray.length - 2; k0++) {

    var deltaE_K0_K2 = 0;
    var deltaE_K1_K2 = 0;
    var deltaE_K0_K1 = 0;

    //var arrayk2 = [-1,-1,-1,-1];

    for (var k2 = k0 + 2; k2 < colorArray.length; k2++) {

      var arrayk2 = [0, -1, -1, -1];

      for (var k1 = k0 + 1; k1 < k2; k1++) {

        var orderValues = getOrderValues(cloneColor(colorArray[k0]), cloneColor(colorArray[k1]), cloneColor(colorArray[k2]), globalCMS1.getInterpolationSpace());
        var orderVal = Math.min(orderValues[3], orderValues[4]);

        minGlobal = Math.min(minGlobal, orderVal);

        if (orderVal < 0) {
          /*arrayk2[0] = orderVal;
          arrayk2[1] = k0;
          arrayk2[2] = k1;
          arrayk2[3] = k2;*/
          //
          arrayk0.push([orderVal,k0,k1,k2]);
        }
      }
      //if (arrayk2[3] != -1)
        //arrayk0.push(arrayk2);
    }
  }



  var dodraw = true;

  if (minGlobal >= 0)
    dodraw = false;

  if (dodraw) {

    // sort
    arrayk0 = quickSort(arrayk0);

    // draw

    for (var i = 0; i < arrayk0.length; i++) {

      var xPosK0 = colormapXStart + arrayk0[i][1] * bandWidth + (bandWidth / 2);
      var xPosK2 = colormapXStart + arrayk0[i][3] * bandWidth + (bandWidth / 2);
      var xPosK1 = colormapXStart + arrayk0[i][2] * bandWidth + (bandWidth / 2);

      var deltaHeight = (arrowPlotHeight * (arrayk0[i][0] / minGlobal) * 2);

      var yPosK1 = colormapYEnd + deltaHeight;

      //canvasCtx.globalAlpha=1.0+(-0.8*(tmpMin/maxNegMin));
      canvasCtx.strokeStyle = colorArray[arrayk0[i][2]].getRGBString(); //"rgb(0,0,0)";
      canvasCtx.beginPath();
      canvasCtx.lineWidth = 2;
      canvasCtx.beginPath();
      canvasCtx.moveTo(xPosK0, colormapYEnd);
      canvasCtx.quadraticCurveTo(xPosK1, yPosK1, xPosK2, colormapYEnd);
      canvasCtx.stroke();
    }

  }


  //////////////////////////////////////////////////////////////

  if (minLocal < 0)
    document.getElementById(minId).style.color = getComputedStyle(document.documentElement).getPropertyValue('--general-warning-color');
  else
    document.getElementById(minId).style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');

  if (minGlobal < 0)
    document.getElementById(minGlobalId).style.color = getComputedStyle(document.documentElement).getPropertyValue('--general-warning-color');
  else
    document.getElementById(minGlobalId).style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');

  document.getElementById(minId).innerHTML = "Local Minimum = " + minLocal; //.toFixed(numDecimalPlaces);
  document.getElementById(minGlobalId).innerHTML = "Global Minimum = " + minGlobal; //.toFixed(numDecimalPlaces);*/

}


function getOrderValues(c_K0, c_K1, c_K2, space) {

  var deltaE_K0_K2 = 0;
  var deltaE_K1_K2 = 0;
  var deltaE_K0_K1 = 0;

  switch (space) {
    case "rgb":
    case "hsv":
    case "lab":
    case "din99":
    case "de94-ds":
    case "de2000-ds":
      deltaE_K0_K2 = calc3DEuclideanDistance(cloneColor(c_K0), cloneColor(c_K2));
      deltaE_K1_K2 = calc3DEuclideanDistance(cloneColor(c_K1), cloneColor(c_K2));
      deltaE_K0_K1 = calc3DEuclideanDistance(cloneColor(c_K0), cloneColor(c_K1));
      break;
      case "de94":
       deltaE_K0_K2= calcDeltaDE94(cloneColor(color_K0),cloneColor(color_K2));
       deltaE_K1_K2= calcDeltaDE94(cloneColor(color_K1),cloneColor(color_K2));
       deltaE_K0_K1= calcDeltaDE94(cloneColor(color_K0),cloneColor(color_K1));
        break;
        case "de2000":
         deltaE_K0_K2= calcDeltaCIEDE2000(cloneColor(color_K0),cloneColor(color_K2));
         deltaE_K1_K2= calcDeltaCIEDE2000(cloneColor(color_K1),cloneColor(color_K2));
         deltaE_K0_K1= calcDeltaCIEDE2000(cloneColor(color_K0),cloneColor(color_K1));
          break;
  }

  c_K0.deleteReferences();
  c_K0 = null;
  c_K1.deleteReferences();
  c_K1 = null;
  c_K2.deleteReferences();
  c_K2 = null;


  var orderVal1 = (deltaE_K0_K2 - deltaE_K0_K1);// * errorMath / errorMath;
  var orderVal2 = (deltaE_K0_K2 - deltaE_K1_K2);// * errorMath / errorMath;

  if(orderVal1>-1*smallErrorMath && orderVal1<0){
    orderVal1=0;
  }

  if(orderVal2>-1*smallErrorMath && orderVal2<0){
    orderVal2=0;
  }

  return [deltaE_K0_K2, deltaE_K1_K2, deltaE_K0_K1, orderVal1, orderVal2];
}
