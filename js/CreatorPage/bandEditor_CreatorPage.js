///////////////////////////
////   Band Editor ////
///////////////////////////

/*
var bandOptionsIndex = -1;
var hasRightNeig = false
var hasLeftNeig = false;
var changedColor = false;
var changedColorC1;
var changedColorC2;

*/

function changeAcitveColorBandEditor(type){

    c1IsActive = type;

    document.getElementById("bandEdit_LeftColor").style.border = "0.4vh solid black";
    document.getElementById("bandEdit_RightColor").style.border = "0.4vh solid black";

    if(type){
        document.getElementById("bandEdit_LeftColor").style.border = "0.4vh solid green";
    }
    else{
        document.getElementById("bandEdit_RightColor").style.border = "0.4vh solid green";
    }

    drawEditorBandColorCircles();

}

function changeBandEditorColorspace(type){

    document.getElementById("id_BandEditbutton_RGB").style.border = "0.4vh solid black";
    document.getElementById("id_BandEditbutton_RGB").style.color = "black";
    document.getElementById("id_BandEditbutton_HSV").style.border = "0.4vh solid black";
    document.getElementById("id_BandEditbutton_HSV").style.color = "black";
    document.getElementById("id_BandEditbutton_LAB").style.border = "0.4vh solid black";
    document.getElementById("id_BandEditbutton_LAB").style.color = "black";
    document.getElementById("id_BandEditbutton_DIN99").style.border = "0.4vh solid black";
    document.getElementById("id_BandEditbutton_DIN99").style.color = "black";

    switch(type){
        case 0:
                document.getElementById("id_BandEditbutton_RGB").style.border = "0.4vh solid green";
                document.getElementById("id_BandEditbutton_RGB").style.color = "green";
                break;
        case 1:
                document.getElementById("id_BandEditbutton_HSV").style.border = "0.4vh solid green";
                document.getElementById("id_BandEditbutton_HSV").style.color = "green";
                break;
        case 2:
                document.getElementById("id_BandEditbutton_LAB").style.border = "0.4vh solid green";
                document.getElementById("id_BandEditbutton_LAB").style.color = "green";
        break;
        case 3:
                document.getElementById("id_BandEditbutton_DIN99").style.border = "0.4vh solid green";
                document.getElementById("id_BandEditbutton_DIN99").style.color = "green";
        break;
        default:
        return;
    }

    changeColorspace(type);
    var oCan = document.getElementById("bandEdit_EditCanvas");
    drawCanvasBand(oCan, changedColorC1, changedColorC2,oCan.width,oCan.height );

}


function acceptBandEditor(){

    if(changedColor==true){
        bandSketch.setC1(changedColorC1, bandOptionsIndex);
        bandSketch.setC2(changedColorC2, bandOptionsIndex);

        bandSketch.setRefR1(bandOptionsIndex, changedRefR1);
        bandSketch.setRefR2(bandOptionsIndex, changedRefR2);

        if(hasRightNeig)
        bandSketch.setRefR1(bandOptionsIndex+1, changedNeiRefR1);
        if(hasLeftNeig)
        bandSketch.setRefR2(bandOptionsIndex-1, changedNeiRefR2);

        orderColorSketch(colorspaceModus);
        if(showSideID==2){
          changeCourseSpace();
          drawAnalyseMapPreviews();
          drawAnalyseDifferenceMaps();
        }

        /////////////
        ////  Save Band Process
        saveCreateProcess();
    }

    document.getElementById("bandEditWindow").style.display = "none";
    changedColor = false;
}


function deleteBandEditor(){

    if(hasLeftNeig&&hasRightNeig){

             var dist = Math.abs(bandSketch.getRefR1(bandOptionsIndex+1)-bandSketch.getRefR2(bandOptionsIndex-1));

            bandSketch.setRefR2(bandOptionsIndex-1, bandSketch.getRefR2(bandOptionsIndex-1)+(dist*0.5));
            bandSketch.setRefR1(bandOptionsIndex+1, bandSketch.getRefR1(bandOptionsIndex+1)-(dist*0.5));
    }

    bandSketch.deleteBand(bandOptionsIndex);

    orderColorSketch(colorspaceModus);

    /////////////
    ////  Save Band Process
    saveCreateProcess();

    document.getElementById("bandEditWindow").style.display = "none";
    changedColor = false;

}

function showHelpBandEditor(){

}

function hiddeHelpBandEditor(){

}


function cancelBandEditor(){
    document.getElementById("bandEditWindow").style.display = "none";
    changedColor = false;
}

function leftNeiColorToR1(){
    if(hasLeftNeig){
       changedColorC1 = bandSketch.getC2Color(bandOptionsIndex-1,"rgb");
       document.getElementById("bandEdit_LeftColor").style.background = changedColorC1.getRGBString();
       var oCan = document.getElementById("bandEdit_EditCanvas");
       drawCanvasBand(oCan, changedColorC1, changedColorC2,oCan.width,oCan.height );
       changedColor=true;
       drawEditorBandColorCircles();
    }

}

function rightNeiColorToR2(){
   if(hasRightNeig){
       changedColorC2 = bandSketch.getC1Color(bandOptionsIndex+1,"rgb");
       document.getElementById("bandEdit_RightColor").style.background = changedColorC2.getRGBString();
       var oCan = document.getElementById("bandEdit_EditCanvas");
       drawCanvasBand(oCan, changedColorC1, changedColorC2,oCan.width,oCan.height );
       changedColor=true;
       drawEditorBandColorCircles();
   }

}

function editC2IsC1(){
   changedColorC2=changedColorC1;
   var oCan = document.getElementById("bandEdit_EditCanvas");
   document.getElementById("bandEdit_RightColor").style.background = changedColorC2.getRGBString();
   drawCanvasBand(oCan, changedColorC1, changedColorC2,oCan.width,oCan.height );
   changedColor=true;
   drawEditorBandColorCircles();
}

function editC1IsC2(){
   changedColorC1=changedColorC2;
   var oCan = document.getElementById("bandEdit_EditCanvas");
   document.getElementById("bandEdit_LeftColor").style.background = changedColorC1.getRGBString();
   drawCanvasBand(oCan, changedColorC1, changedColorC2,oCan.width,oCan.height );
   changedColor=true;
   drawEditorBandColorCircles();
}



function drawEditorBandColorCircles(){

    var canvasColorspace = document.getElementById("id_bandEditWorkcanvasPicker");
    var rectPickerCanvas = document.getElementById("id_bandEditCanvasPickerHS").getBoundingClientRect();
        //canvasColorspace.style.display = "initial";
        canvasColorspace.style.position = "absolute";
        canvasColorspace.style.width = rectPickerCanvas.width+"px";
        canvasColorspace.style.height = rectPickerCanvas.height+"px";
        canvasColorspace.style.top = rectPickerCanvas.top+"px";
        canvasColorspace.style.left = rectPickerCanvas.left+"px";

    canvasColorspace.width = hs_resolution_X;
    canvasColorspace.height = hs_resolution_Y;
    var canvasColorspaceWidth = canvasColorspace.width;
    var canvasColorspaceHeight = canvasColorspace.height;
    //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
    var colorspaceContex = canvasColorspace.getContext("2d");

    var tmpC1RGB = changedColorC1;
    var tmpC1HSV = changedColorC1.calcHSVColor();
    var xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
    var yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

    colorspaceContex.beginPath();

    if(c1IsActive){
        colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);
        colorspaceContex.lineWidth = circleStrokeWidth;
        colorspaceContex.strokeStyle = 'rgb(0,0,0)';
        colorspaceContex.fillStyle = tmpC1RGB.getRGBStringAplha(1.0);
        colorspaceContex.fill();
        colorspaceContex.stroke();
        drawBandEditorVChangeRects();
    }
    else{
        colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
        colorspaceContex.lineWidth = circleStrokeWidth;
        colorspaceContex.strokeStyle = 'rgb(90,90,90)';
        colorspaceContex.fillStyle = tmpC1RGB.getRGBStringAplha(1.0);
        colorspaceContex.fill();
        colorspaceContex.stroke();
    }

    if(changedColorC1.getRGBString()===changedColorC2.getRGBString()){
        if(c1IsActive==false)
        drawBandEditorVChangeRects();
    }
    else{

        tmpC1RGB = changedColorC2;
        tmpC1HSV = changedColorC2.calcHSVColor();
        xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
        yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;


        colorspaceContex.beginPath();

        if(c1IsActive){
            colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
            colorspaceContex.lineWidth = circleStrokeWidth;
            colorspaceContex.strokeStyle = 'rgb(90,90,90)';
            colorspaceContex.fillStyle = tmpC1RGB.getRGBStringAplha(1.0);
            colorspaceContex.fill();
            colorspaceContex.stroke();
        }
        else{
            colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);
            colorspaceContex.lineWidth = circleStrokeWidth;
            colorspaceContex.strokeStyle = 'rgb(0,0,0)';
            colorspaceContex.fillStyle = tmpC1RGB.getRGBStringAplha(1.0);
            colorspaceContex.fill();
            colorspaceContex.stroke();
            drawBandEditorVChangeRects();
        }

    }

}

function drawBandEditorVChangeRects(){

    var canvasVInput1 = document.getElementById("id_BandEditcanvasPickerC1V");
    canvasVInput1.width = v_resolution_X;
    canvasVInput1.height = v_resolution_Y;

    var canvasVInputContex1 = canvasVInput1.getContext("2d");

    if(c1IsActive)
    drawValueRect(canvasVInputContex1, changedColorC1.calcHSVColor(), v_resolution_X, v_resolution_Y);
    else
    drawValueRect(canvasVInputContex1, changedColorC2.calcHSVColor(), v_resolution_X, v_resolution_Y);

}


/////////////////////////////////////////////
// Color-Picker Events
////////////////////////////////////////////

function colorpickerBandEditor_MouseMove(event){
    // calc mouse pos
    var rect = document.getElementById("id_bandEditWorkcanvasPicker").getBoundingClientRect();

    var canvasPosX = event.clientX - rect.left;
    var canvasPosY = event.clientY - rect.top;

    var ratioToColorspaceResolutionX = hs_resolution_X/rect.width;
    var ratioToColorspaceResolutionY = hs_resolution_Y/rect.height;

    mousePosX = canvasPosX*ratioToColorspaceResolutionX;
    mousePosY = canvasPosY*ratioToColorspaceResolutionY;

    // check if mouse is above a element
    var tmpC1HSV = getHSVColor(true);

    var xPos1 = tmpC1HSV.getHValue() * hs_resolution_X;
    var yPos1 = (1-tmpC1HSV.getSValue()) * hs_resolution_Y;

}


function colorpickerBandEditor_MouseClick(){


        var hVal = mousePosX/hs_resolution_X;
        var sVal = 1-mousePosY/hs_resolution_Y;

        if(c1IsActive){
            var tmpHSV = changedColorC1.calcHSVColor();
                if(tmpHSV.getVValue()==0)
                    tmpHSV.setVValue(0.00001);
            tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
            changedColorC1 = tmpHSV.calcRGBColor();
            document.getElementById("bandEdit_LeftColor").style.background = changedColorC1.getRGBString();
        }
        else{
            var tmpHSV = changedColorC2.calcHSVColor();
                if(tmpHSV.getVValue()==0)
                    tmpHSV.setVValue(0.00001);
            tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
            changedColorC2 = tmpHSV.calcRGBColor();
            document.getElementById("bandEdit_RightColor").style.background = changedColorC2.getRGBString();
        }

    drawEditorBandColorCircles()
    var oCan = document.getElementById("bandEdit_EditCanvas");
    drawCanvasBand(oCan, changedColorC1, changedColorC2,oCan.width,oCan.height );
     changedColor=true;

}


function c1VpickerBandEditor_MouseMove(event){

    // calc mouse pos
    var rect = document.getElementById("id_BandEditcanvasPickerC1V").getBoundingClientRect();

    var canvasPosX = event.clientX - rect.left;
    var canvasPosY = event.clientY - rect.top;

    var ratioToColorspaceResolutionX = v_resolution_X/rect.width;
    var ratioToColorspaceResolutionY = v_resolution_Y/rect.height;

    mousePosX = canvasPosX*ratioToColorspaceResolutionX;
    mousePosY = canvasPosY*ratioToColorspaceResolutionY;

}


function c1VpickerBandEditor_MouseClick(){

    var newV = 1-mousePosY/v_resolution_Y;

        if(c1IsActive){
            var tmpHSV = changedColorC1.calcHSVColor();
                if(tmpHSV.getVValue()==0)
                    tmpHSV.setVValue(0.00001);
            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
            changedColorC1 = tmpHSV.calcRGBColor();
            document.getElementById("bandEdit_LeftColor").style.background = changedColorC1.getRGBString();
        }
        else{
            var tmpHSV = changedColorC2.calcHSVColor();
                if(tmpHSV.getVValue()==0)
                    tmpHSV.setVValue(0.00001);
            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
            changedColorC2 = tmpHSV.calcRGBColor();
            document.getElementById("bandEdit_RightColor").style.background = changedColorC2.getRGBString();
        }

        drawEditorBandColorCircles()
        var oCan = document.getElementById("bandEdit_EditCanvas");
        drawCanvasBand(oCan, changedColorC1, changedColorC2,oCan.width,oCan.height );
         changedColor=true;
}


function checkR1Input(e){

    checkInputVal(document.getElementById('bandEdit_InputLeftRef'),true,true);

    if (e.keyCode == 13) {

        var newVal = parseFloat(document.getElementById('bandEdit_InputLeftRef').value);

        if(hasLeftNeig){

            if(bandSketch.getRefR1(bandOptionsIndex-1)>newVal){
                alert("The left ref is not allowed to be smaller than the left ref of the left neighbour");
                document.getElementById('bandEdit_InputLeftRef').value = changedRefR1;
            }
            else{

                if(changedRefR2<newVal){
                    alert("The left ref has to be smaller than the right ref");
                    document.getElementById('bandEdit_InputLeftRef').value = changedRefR1;
                }
                else{
                    changedRefR1 = newVal;
                    changedNeiRefR2 = newVal;
                    document.getElementById("bandEdit_LeftNeiRightRef").innerHTML = newVal;
                    changedColor=true;
                }
            }
        }
        else{
            if(changedRefR2<newVal){
                    alert("The left ref has to be smaller than the right ref");
                    document.getElementById('bandEdit_InputLeftRef').value = changedRefR1;
            }
            else{
             changedRefR1 = newVal;
             changedColor=true;
            }
        }
    }
}

function checkR2Input(e){
    checkInputVal(document.getElementById('bandEdit_InputRightRef'),true,true);
    if (e.keyCode == 13) {

        var newVal = parseFloat(document.getElementById('bandEdit_InputRightRef').value);

        if(hasRightNeig){

            if(bandSketch.getRefR2(bandOptionsIndex+1)<newVal){
                alert("The right ref is not allowed to be bigger than the right ref of the right neighbour");
                document.getElementById('bandEdit_InputRightRef').value = changedRefR2;
            }
            else{

                if(changedRefR1>newVal){
                    alert("The right ref has to be bigger than the left ref");
                    document.getElementById('bandEdit_InputRightRef').value = changedRefR2;
                }
                else{
                    changedRefR2 = newVal;
                     changedColor=true;
                    changedNeiRefR1 = newVal;
                    document.getElementById("bandEdit_RightNeiLeftRef").innerHTML = newVal;
                }

            }
        }
        else{
            if(changedRefR1>newVal){
                    alert("The right ref has to be bigger than the left ref");
                    document.getElementById('bandEdit_InputRightRef').value = changedRefR2;
            }
            else{
             changedRefR2 = newVal;
             changedColor=true;
            }
        }
    }
}

function checkR1Input_Change(e){

    checkInputVal(document.getElementById('bandEdit_InputLeftRef'),true,true);

        var newVal = parseFloat(document.getElementById('bandEdit_InputLeftRef').value);

        if(hasLeftNeig){

            if(bandSketch.getRefR1(bandOptionsIndex-1)>newVal){
                alert("The left ref is not allowed to be smaller than the left ref of the left neighbour");
                document.getElementById('bandEdit_InputLeftRef').value = changedRefR1;
            }
            else{

                if(changedRefR2<newVal){
                    alert("The left ref has to be smaller than the right ref");
                    document.getElementById('bandEdit_InputLeftRef').value = changedRefR1;
                }
                else{
                    changedRefR1 = newVal;
                     changedColor=true;
                    changedNeiRefR2 = newVal;
                    document.getElementById("bandEdit_LeftNeiRightRef").innerHTML = newVal;
                }
            }
        }
        else{
            if(changedRefR2<newVal){
                    alert("The left ref has to be smaller than the right ref");
                    document.getElementById('bandEdit_InputLeftRef').value = changedRefR1;
            }
            else{
             changedRefR1 = newVal;
             changedColor=true;
            }
        }
}

function checkR2Input_Change(e){
    checkInputVal(document.getElementById('bandEdit_InputRightRef'),true,true);

        var newVal = parseFloat(document.getElementById('bandEdit_InputRightRef').value);

        if(hasRightNeig){

            if(bandSketch.getRefR2(bandOptionsIndex+1)<newVal){
                alert("The right ref is not allowed to be bigger than the right ref of the right neighbour");
                document.getElementById('bandEdit_InputRightRef').value = changedRefR2;
            }
            else{

                if(changedRefR1>newVal){
                    alert("The right ref has to be bigger than the left ref");
                    document.getElementById('bandEdit_InputRightRef').value = changedRefR2;
                }
                else{
                    changedRefR2 = newVal;
                     changedColor=true;
                    changedNeiRefR1 = newVal;
                    document.getElementById("bandEdit_RightNeiLeftRef").innerHTML = newVal;
                }

            }
        }
        else{
            if(changedRefR1>newVal){
                    alert("The right ref has to be bigger than the left ref");
                    document.getElementById('bandEdit_InputRightRef').value = changedRefR2;
            }
            else{
             changedRefR2 = newVal;
             changedColor=true;
            }
        }

}
