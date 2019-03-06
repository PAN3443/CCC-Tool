

function draw_FunctionTypeMirrored(canvasID, exp, value_m, value_M, fctType ){

  var lineWidth = 2;
  var lineColor = "rgb(0,191,255)";
  var numberSteps = 21;
  var ratioStep = 1.0/(numberSteps-1);

  var isNeg = false;

  if(value_m>value_M){
    isNeg=true;
  }

  var canvas = document.getElementById(canvasID);
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  var middleX=canvas.width*0.5;
  var startX=canvas.width*0.15;
  var endX=canvas.width*0.85;
  var stepX =(endX-startX)/(numberSteps-1);
  var startY=canvas.height*0.85;
  var endY=canvas.height*0.15;
  var yGrad = endY-startY;
  context.lineWidth = lineWidth;
  context.strokeStyle = lineColor;

  if(isNeg){
    startY=canvas.height*0.15;
    endY=canvas.height*0.85;
  }

  context.moveTo(startX, startY);
  var yPos = undefined;


  switch (fctType) {
    case 0:
    /////// Draw Linear
    context.lineTo(middleX, endY);
    context.lineTo(endX, startY);
    context.stroke();
      break;
      case 1:
      /////// Draw Hunch
      for (var i = 0; i <numberSteps; i++) {
        var xPos = startX+i*stepX;
        var currentY = (i*ratioStep)*2-1;

        if(isNeg){
          if(currentY<0 && exp%2!=0){
            yPos= endY-yGrad*(Math.pow(currentY,exp));
          }
          else{
            yPos= endY+yGrad*(Math.pow(currentY,exp));
          }
        }
        else{
          if(currentY<0 && exp%2!=0){
            yPos= endY+yGrad*(Math.pow(currentY,exp));
          }
          else{
            yPos= endY-yGrad*(Math.pow(currentY,exp));
          }
        }
        context.lineTo(xPos,yPos);
      }
      context.stroke();
        break;
      case 2:
        /////// Draw Crook
        for (var i = 0; i <numberSteps; i++) {
          var xPos = startX+i*stepX;
          var currentY = (i*ratioStep)*2-1;

          if(isNeg){
            if(currentY<=0){
              yPos= endY+yGrad*(1-Math.pow(1+currentY,exp));
            }
            else {
              yPos= startY-yGrad*(Math.pow(1-currentY,exp));
            }

          }
          else{
            if(currentY<=0){
              yPos= startY+yGrad*(Math.pow(1+currentY,exp));
            }
            else{
              yPos= endY-yGrad*(1-Math.pow(1-currentY,exp));
            }
          }
          context.lineTo(xPos,yPos);
        }
        context.stroke();
          break;

  }


  draw_FunctionTypeMirrored_CoordinateSystem(context,canvas.height,canvas.width);

}

function draw_FunctionTypeMirrored_CoordinateSystem(context,canvasHight,canvasWidth){

    var arrowColor = "rgb(80,80,80)";
    var arrowlineWidth = 2;

    var value_m = document.getElementById("id_TestPage_NewTest_I1").value;
    var value_M = document.getElementById("id_TestPage_NewTest_I3").value;

    var isNeg = false;

    if(value_m>value_M){
      isNeg=true;
    }

    ////////////////////////////////////////////////
    // Y-Arrow
    context.strokeStyle = arrowColor;
    context.lineWidth = arrowlineWidth;

    context.beginPath();
    context.lineWidth = arrowlineWidth;
    context.moveTo(canvasWidth*0.5, canvasHight*0.1);
    context.lineTo(canvasWidth*0.5, canvasHight*0.9);
    context.stroke();

    // the triangle
    var arrowPeak = 0;
    var arrowBasis = canvasHight*0.1;
    var yPosXlineSmall = canvasHight*0.15;
    var yPosXlineBig = canvasHight*0.85;
    var label1 = "M";
    var label2 = "m";
    if(isNeg){
      yPosXlineSmall = canvasHight*0.85;
      yPosXlineBig = canvasHight*0.15;
      label1 = "m";
      label2 = "M";
    }

    context.beginPath();
    context.moveTo(canvasWidth*0.525, arrowBasis);
    context.lineTo(canvasWidth*0.5, arrowPeak);
    context.lineTo(canvasWidth*0.475, arrowBasis);
    context.closePath();
    context.fill();

    context.beginPath();
    context.moveTo(canvasWidth*0.1, yPosXlineBig);
    context.lineTo(canvasWidth*0.95, yPosXlineBig);
    context.stroke();
    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(canvasWidth*0.1, yPosXlineSmall);
    context.lineTo(canvasWidth*0.95, yPosXlineSmall);
    context.stroke();
    context.lineWidth = arrowlineWidth;

    context.fillText(label2, canvasWidth*0.05, canvasHight*0.85);
    context.fillText(label1, canvasWidth*0.05, canvasHight*0.15);

    //////////////////////////////////////////////////
    /// X-Arrow
    arrowPeak = canvasWidth*1.0;
    arrowBasis = canvasWidth*0.95;

    context.beginPath();
    context.moveTo(arrowBasis, yPosXlineBig-canvasHight*0.025);
    context.lineTo(arrowPeak, yPosXlineBig);
    context.lineTo(arrowBasis, yPosXlineBig+canvasHight*0.025);
    context.closePath();
    context.fill();

    context.beginPath();
    context.moveTo(canvasWidth*0.85, canvasHight*0.90); //yPosXlineBig);
    context.lineTo(canvasWidth*0.85, canvasHight*0.90);
    context.stroke();

    // the fill color
    context.fillStyle = arrowColor;
    context.fill();

    context.fillText("-1", canvasWidth*0.15, canvasHight*0.95);
    context.fillText("1", canvasWidth*0.85, canvasHight*0.95);

}


function draw_FunctionType(canvasID, exp, value_m, value_M, fctType){

  var lineWidth = 2;
  var lineColor = "rgb(0,191,255)";
  var numberSteps = 50;
  var ratioStep = 1.0/(numberSteps-1);

  var isNeg = false;

  if(value_m>value_M){
    isNeg=true;
  }


  var canvas = document.getElementById(canvasID);
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  var startX=canvas.width*0.15;
  var endX=canvas.width*0.85;
  var stepX =(endX-startX)/(numberSteps-1);
  startY=canvas.height*0.85;
  endY=canvas.height*0.15;
  var yGrad = endY-startY;
  context.lineWidth = lineWidth;
  context.strokeStyle = lineColor;


  if(isNeg){
    startY=canvas.height*0.15;
    endY=canvas.height*0.85;
  }

  context.moveTo(startX, startY);
  var yPos = undefined;


  switch (fctType) {
    case 0:
    /////// Draw Linear
    context.lineTo(endX, endY);
    context.stroke();
      break;
      case 1:
      /////// Draw Hunch
      for (var i = 0; i <numberSteps; i++) {
        var xPos = startX+i*stepX;
        var currentY = i*ratioStep;
        if(isNeg){
          yPos= startY-yGrad*(1-Math.pow(1-currentY,exp));
        }
        else{
          yPos= endY-yGrad*(Math.pow(1-currentY,exp));
        }
        context.lineTo(xPos,yPos);
      }
      context.stroke();
        break;
      case 2:
        /////// Draw Crook
        for (var i = 0; i <numberSteps; i++) {
          var xPos = startX+i*stepX;
          var currentY = i*ratioStep;
          if(isNeg){
            yPos= startY-yGrad*(Math.pow(currentY,exp));
          }
          else{
            yPos= endY-yGrad*(1-Math.pow(currentY,exp));
          }
          context.lineTo(xPos,yPos);
        }
        context.stroke();
          break;

  }

  draw_FunctionType_CoordinateSystem(context,canvas.height,canvas.width);

}

function draw_FunctionType_CoordinateSystem(context,canvasHight,canvasWidth){

    var arrowColor = "rgb(80,80,80)";
    var arrowlineWidth = 2;

    var value_m = document.getElementById("id_TestPage_NewTest_I1").value;
    var value_M = document.getElementById("id_TestPage_NewTest_I3").value;

    var isNeg = false;

    if(value_m>value_M){
      isNeg=true;
    }

    ////////////////////////////////////////////////
    // Y-Arrow
    context.strokeStyle = arrowColor;
    context.lineWidth = arrowlineWidth;

    context.beginPath();
    context.lineWidth = arrowlineWidth;
    context.moveTo(canvasWidth*0.15, canvasHight*0.1);
    context.lineTo(canvasWidth*0.15, canvasHight*0.9);
    context.stroke();

    // the triangle
    var arrowPeak = 0;
    var arrowBasis = canvasHight*0.1;
    var yPosXlineSmall = canvasHight*0.15;
    var yPosXlineBig = canvasHight*0.85;
    var label1 = "M";
    var label2 = "m";
    if(isNeg){
      yPosXlineSmall = canvasHight*0.85;
      yPosXlineBig = canvasHight*0.15;
      label1 = "m";
      label2 = "M";
    }

    context.beginPath();
    context.moveTo(canvasWidth*0.125, arrowBasis);
    context.lineTo(canvasWidth*0.15, arrowPeak);
    context.lineTo(canvasWidth*0.175, arrowBasis);
    context.closePath();
    context.fill();

    context.beginPath();
    context.moveTo(canvasWidth*0.1, yPosXlineBig);
    context.lineTo(canvasWidth*0.95, yPosXlineBig);
    context.stroke();
    context.beginPath();
    context.moveTo(canvasWidth*0.1, yPosXlineSmall);
    context.lineTo(canvasWidth*0.15, yPosXlineSmall);
    context.stroke();

    context.fillText(label2, canvasWidth*0.05, canvasHight*0.85);
    context.fillText(label1, canvasWidth*0.05, canvasHight*0.15);

    //////////////////////////////////////////////////
    /// X-Arrow
    arrowPeak = canvasWidth*1.0;
    arrowBasis = canvasWidth*0.95;

    context.beginPath();
    context.moveTo(arrowBasis, yPosXlineBig-canvasHight*0.025);
    context.lineTo(arrowPeak, yPosXlineBig);
    context.lineTo(arrowBasis, yPosXlineBig+canvasHight*0.025);
    context.closePath();
    context.fill();

    context.beginPath();
    context.moveTo(canvasWidth*0.85, canvasHight*0.90); //yPosXlineBig);
    context.lineTo(canvasWidth*0.85, canvasHight*0.90);
    context.stroke();

    // the fill color
    context.fillStyle = arrowColor;
    context.fill();

    context.fillText("0", canvasWidth*0.15, canvasHight*0.95);
    context.fillText("1", canvasWidth*0.85, canvasHight*0.95);


}
