function selectNewRidgeValleyTestType(){
  document.getElementById("id_TestPage_Dimension_Div").style.display="block";
  document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

  document.getElementById("id_TestPage_doRatioCheckbox").checked = cccTest_NewRidgeValley_Options[0];

  document.getElementById("id_TestPage_NewTest_I2").value=cccTest_NewRidgeValley_Options[4];
  document.getElementById("id_TestPage_NewTest_I4").value=cccTest_NewRidgeValley_Options[6];

  document.getElementById("id_TestPage_NewTest_I1").value=cccTest_NewRidgeValley_Options[1];
  document.getElementById("id_TestPage_NewTest_I3").value=cccTest_NewRidgeValley_Options[2];

  current_mType= cccTest_NewRidgeValley_Options[3];
  switch (current_mType) { // mType
    case 0:
      document.getElementById("id_TestPage_NewTest_MTypeLinear").checked = true;
      break;
      case 1:
        document.getElementById("id_TestPage_NewTest_MTypeHunch").checked = true;
        break;
        case 2:
          document.getElementById("id_TestPage_NewTest_MTypeCrook").checked = true;
          break;
  }

  current_MType= cccTest_NewRidgeValley_Options[5];
  switch (current_MType) { // mType
    case 0:
      document.getElementById("id_TestPage_NewTest_MTypeLinear").checked = true;
      break;
      case 1:
        document.getElementById("id_TestPage_NewTest_MTypeHunch").checked = true;
        break;
        case 2:
          document.getElementById("id_TestPage_NewTest_MTypeCrook").checked = true;
          break;
  }

document.getElementById("id_TestPage_GridDimX").value=cccTest_NewRidgeValley_Options[7];
document.getElementById("id_TestPage_GridDimY").value=cccTest_NewRidgeValley_Options[8];

  document.getElementById("id_TestPage_NewTest_I2").min=2;
  document.getElementById("id_TestPage_NewTest_I4").min=2;

  document.getElementById("id_TestPage_NewTest_I2").step=1;
  document.getElementById("id_TestPage_NewTest_I4").step=1;



  if(document.getElementById("id_TestPage_doRatioCheckbox").checked){

    document.getElementById("id_TestPage_NewTest_I1").min=0;
    document.getElementById("id_TestPage_NewTest_I1").max=1.0;

    document.getElementById("id_TestPage_NewTest_I1").min=0;
    document.getElementById("id_TestPage_NewTest_I1").max=1.0;

  }

  document.getElementById("id_TestPage_NewTest_V1").innerHTML="m-Value: ";
  document.getElementById("id_TestPage_NewTest_V2").innerHTML="m-Exponent: ";
  document.getElementById("id_TestPage_mType_Div").style.display="block";

  document.getElementById("id_TestPage_NewTest_V3").innerHTML="M-Value: ";
  document.getElementById("id_TestPage_NewTest_V4").innerHTML="M-Exponent: ";
  document.getElementById("id_TestPage_MType_Div").style.display="block";

  draw_RidgeValley_mType();
  draw_RidgeValley_MType();
  valleyTest_startWorker(cccTest_NewRidgeValley_Options);
}


function updateRidgeValleyTestVariables(){
  check_mType();
  check_MType();

  // check m-value
  var value_m = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
  if(isNaN(value_m)){
    openAlert("Invalid input for the m-Value");
    return;
  }
  if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_m<0 || value_m>1.0)){
    openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
    return;
  }

  // check M-value
  var value_M = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
  if(isNaN(value_M)){
    openAlert("Invalid input for M-Value");
    return;
  }
  if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_M<0 || value_M>1.0)){
    openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
    return;
  }


  if(value_m==value_M){
    openAlert("Invalid input! The m-Value and M-Value have to be different!");
    return;
  }

  // check m-exp
  var exp_m = parseInt(document.getElementById("id_TestPage_NewTest_I2").value);
  if(isNaN(exp_m)){
    openAlert("Invalid input for m-Exponent");
    return;
  }
  document.getElementById("id_TestPage_NewTest_I2").value =exp_m;
  if(exp_m<2){
    openAlert("Invalid input for m-Exponent. The exponent has to be an integer and has to be 2 or greater than 2.");
    return;
  }

  // check M-exp
  var exp_M = parseInt(document.getElementById("id_TestPage_NewTest_I4").value);
  document.getElementById("id_TestPage_NewTest_I4").value = exp_M;
  if(isNaN(exp_M)){
    openAlert("Invalid input for m-Exponent");
    return;
  }
  if(exp_M<2){
    openAlert("Invalid input for m-Exponent. The exponent has to be an integer and has to be 2 or greater than 2.");
    return;
  }

  // check x,y DIM
  var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
  document.getElementById("id_TestPage_GridDimX").value=dimX;
  if(isNaN(dimX)){
    openAlert("Invalid input for the Grid x-dimension!");
    return;
  }
  if(dimX<2){
    openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
    return;
  }

  var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
  document.getElementById("id_TestPage_GridDimY").value=dimY;
  if(isNaN(dimY)){
    openAlert("Invalid input for the Grid y-dimension!");
    return;
  }
  if(dimY<2){
    openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
    return;
  }
  console.log(typeof value_m,typeof value_M);

  draw_RidgeValley_mType();
  draw_RidgeValley_MType();
  valleyTest_startWorker(cccTest_NewRidgeValley_Options);
}

function check_mType(){

  document.getElementById("id_TestPage_NewTest_I2").disabled=false;
  if(document.getElementById("id_TestPage_NewTest_mTypeLinear").checked){
    current_mType=0;
    document.getElementById("id_TestPage_NewTest_I2").disabled=true;
  }

    if(document.getElementById("id_TestPage_NewTest_mTypeArc").checked)
      current_mType=1;

      if(document.getElementById("id_TestPage_NewTest_mTypePeak").checked)
        current_mType=2;

}

function check_MType(){

  document.getElementById("id_TestPage_NewTest_I4").disabled=false;
  if(document.getElementById("id_TestPage_NewTest_MTypeLinear").checked){
    current_MType=0;
    document.getElementById("id_TestPage_NewTest_I4").disabled=true;
  }


    if(document.getElementById("id_TestPage_NewTest_MTypeHunch").checked)
      current_MType=1;

      if(document.getElementById("id_TestPage_NewTest_MTypeCrook").checked)
        current_MType=2;

}


function draw_RidgeValley_MType(){

  var lineWidth = 2;
  var lineColor = "rgb(0,191,255)";
  var numberSteps = 50;
  var ratioStep = 1.0/(numberSteps-1);

  var exp_M= document.getElementById("id_TestPage_NewTest_I4").value;
  var value_m = document.getElementById("id_TestPage_NewTest_I1").value;
  var value_M = document.getElementById("id_TestPage_NewTest_I3").value;

  var isNeg = false;

  if(value_m>value_M){
    isNeg=true;
  }


  var canvas = document.getElementById("id_TestPage_Canvas_MType");
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


  switch (current_MType) {
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
          yPos= startY-yGrad*(1-Math.pow(1-currentY,exp_M));
        }
        else{
          yPos= endY-yGrad*(Math.pow(1-currentY,exp_M));
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
            yPos= startY-yGrad*(Math.pow(currentY,exp_M));
          }
          else{
            yPos= endY-yGrad*(1-Math.pow(currentY,exp_M));
          }
          context.lineTo(xPos,yPos);
        }
        context.stroke();
          break;

  }

  draw_RidgeValley_MType_CoordinateSystem(context,canvas.height,canvas.width);

}

function draw_RidgeValley_MType_CoordinateSystem(context,canvasHight,canvasWidth){

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

function draw_RidgeValley_mType(){

  var lineWidth = 2;
  var lineColor = "rgb(0,191,255)";
  var numberSteps = 21;
  var ratioStep = 1.0/(numberSteps-1);

  var exp_m= document.getElementById("id_TestPage_NewTest_I2").value;
  var value_m = document.getElementById("id_TestPage_NewTest_I1").value;
  var value_M = document.getElementById("id_TestPage_NewTest_I3").value;

  var isNeg = false;

  if(value_m>value_M){
    isNeg=true;
  }


  var canvas = document.getElementById("id_TestPage_Canvas_mType");
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


  switch (current_mType) {
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
          if(currentY<0 && exp_m%2!=0){
            yPos= endY-yGrad*(Math.pow(currentY,exp_m));
          }
          else{
            yPos= endY+yGrad*(Math.pow(currentY,exp_m));
          }
        }
        else{
          if(currentY<0 && exp_m%2!=0){
            yPos= endY+yGrad*(Math.pow(currentY,exp_m));
          }
          else{
            yPos= endY-yGrad*(Math.pow(currentY,exp_m));
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
              yPos= endY+yGrad*(1-Math.pow(1+currentY,exp_m));
            }
            else {
              yPos= startY-yGrad*(Math.pow(1-currentY,exp_m));
            }

          }
          else{
            if(currentY<=0){
              yPos= startY+yGrad*(Math.pow(1+currentY,exp_m));
            }
            else{
              yPos= endY-yGrad*(1-Math.pow(1-currentY,exp_m));
            }
          }
          context.lineTo(xPos,yPos);
        }
        context.stroke();
          break;

  }

  draw_RidgeValley_mType_CoordinateSystem(context,canvas.height,canvas.width);

}

function draw_RidgeValley_mType_CoordinateSystem(context,canvasHight,canvasWidth){

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
