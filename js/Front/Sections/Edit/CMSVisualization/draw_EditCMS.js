
function drawEditCMSVIS(tmpCMS, markedKeysArray){

  var canvasObject = document.getElementById("id_EditPage_CMSVisCanvas");
  var canvasRect = canvasObject.getBoundingClientRect();

  if(canvasRect.width>1 && canvasRect.height>1){

    /*canvasObject.width = canvasRect.width;
    canvasObject.height = canvasRect.height;*/

    var ratio = canvasRect.width/canvasRect.height;
    var predefinedHeight = 750;

    canvasObject.width = predefinedHeight*ratio;
    canvasObject.height = predefinedHeight;
  }
  else {
    return;
  }

  var fontColor = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');
  var strokeColor = getComputedStyle(document.documentElement).getPropertyValue('--menue-bg-color');
  var fillColor = getComputedStyle(document.documentElement).getPropertyValue('--menue-bg-color');
  var actionColor = getComputedStyle(document.documentElement).getPropertyValue('--general-active-color');

  var borderArea = Math.min(Math.round(canvasObject.width*0.05),Math.round(canvasObject.height*0.05));
  var x1 = borderArea;
  var y1 = borderArea;
  var limitedWidth = canvasObject.width-(2*x1);
  var limitedHeight = canvasObject.height-(2*y1);


  var context = canvasObject.getContext("2d");
  context.strokeStyle = strokeColor;
  context.fillStyle = strokeColor;
  context.clearRect(0, 0, canvasObject.width, canvasObject.height);

  if(tmpCMS.getKeyLength()==0){
    context.setLineDash([5, 15]);
    context.strokeRect(x1, y1, limitedWidth, limitedHeight);
  }
  else{

    editCMS_key_size = Math.min(Math.round(limitedWidth*0.1),Math.round(limitedHeight*0.1));
    editCMS_key_half = Math.round(editCMS_key_size/2.0);
    var lineHeight = editCMS_key_half;
    var numberHeight = editCMS_key_size;
    var labelFontSize = Math.round((numberHeight / 3) * 2);
    var distanceTop = (numberHeight / 6);

    var linearKeyLine_y1 = y1+editCMS_key_size;

    editCMS_cmsArea_x1 = x1+editCMS_key_half;
    var cmsAreaY1 = linearKeyLine_y1+lineHeight;

    editCMS_cmsArea_width = limitedWidth-editCMS_key_size; // two times a half key width
    var cmsAreaHeight = limitedHeight - (2*editCMS_key_size) - (2*lineHeight) - numberHeight;

    editCMS_linearKey_y1 = y1;

    var burkey_y1 = cmsAreaY1;
    var burKeyLine_Height = Math.round(cmsAreaHeight*0.1);

    editCMS_linearCMS_y1 = burkey_y1+burKeyLine_Height;
    editCMS_linearCMS_height = Math.round(cmsAreaHeight*0.35);

    var sectionLine_y1 = editCMS_linearCMS_y1+editCMS_linearCMS_height;
    var sectionLine_Height = Math.round(cmsAreaHeight*0.2);

    editCMS_sketchCMS_y1 = sectionLine_y1+sectionLine_Height;
    editCMS_sketchCMS_height = Math.round(cmsAreaHeight*0.35);

    var sketchKeyLine_y1 = editCMS_sketchCMS_y1+editCMS_sketchCMS_height;

    editCMS_sketchKey_y1 = sketchKeyLine_y1+lineHeight;

    var number_y1 = editCMS_sketchKey_y1 + editCMS_key_size;
    var font_yPos = number_y1 + numberHeight - distanceTop;

    /////// Draw CMS cmsArea
    var sketch_BandWidth = Math.round(editCMS_cmsArea_width/(tmpCMS.getKeyLength()-1));
    var currentSktech_xPos = editCMS_cmsArea_x1;

    var canvasData = context.getImageData(0, 0, canvasObject.width, canvasObject.height);
    for (var i = 0; i < tmpCMS.getKeyLength()-1; i++) {

      var linearKey_xPos = editCMS_cmsArea_x1+Math.round((tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * editCMS_cmsArea_width);

        var pos1 = Math.round((tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * editCMS_cmsArea_width);
        var pos2 = Math.round((tmpCMS.getRefPosition(i+1) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * editCMS_cmsArea_width);
        var elementwidth = pos2 - pos1;

        switch (tmpCMS.getKeyType(i)) {
          case "nil key": case "left key":
            // Draw Linear Colormap
            canvasData = createConstantBand(canvasData,linearKey_xPos, editCMS_linearCMS_y1, elementwidth, editCMS_linearCMS_height, tmpCMS.getLeftKeyColor(i+1,globalCMS1.getInterpolationSpace()), canvasObject.width);
            canvasData = createConstantBand(canvasData,currentSktech_xPos, editCMS_sketchCMS_y1, sketch_BandWidth, editCMS_sketchCMS_height, tmpCMS.getLeftKeyColor(i+1,globalCMS1.getInterpolationSpace()), canvasObject.width);
            break;
          default:
            // Draw Sketch Colormap
            canvasData = createScaledBand(canvasData,linearKey_xPos, editCMS_linearCMS_y1, elementwidth, editCMS_linearCMS_height, tmpCMS.getRightKeyColor(i,globalCMS1.getInterpolationSpace()), tmpCMS.getLeftKeyColor(i+1,globalCMS1.getInterpolationSpace()), canvasObject.width);
            canvasData = createScaledBand(canvasData,currentSktech_xPos, editCMS_sketchCMS_y1, sketch_BandWidth, editCMS_sketchCMS_height, tmpCMS.getRightKeyColor(i,globalCMS1.getInterpolationSpace()), tmpCMS.getLeftKeyColor(i+1,globalCMS1.getInterpolationSpace()), canvasObject.width);
        }

        currentSktech_xPos+=sketch_BandWidth;
      }
      context.putImageData(canvasData, 0, 0);


      var sectionColor1 = getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-bg');
      var sectionColor2 = getComputedStyle(document.documentElement).getPropertyValue('--menue-bg-color');
      var selectedSectionColor = true;
      var lastSectionLinearPos = editCMS_cmsArea_x1;
      var lastSectionSketchPos = editCMS_cmsArea_x1;

      context.fillRect(editCMS_cmsArea_x1,burkey_y1,editCMS_cmsArea_width,burKeyLine_Height); // for the burdock key line

      currentSktech_xPos = editCMS_cmsArea_x1;
      for (var i = 0; i < tmpCMS.getKeyLength(); i++) {

        var linearKey_xPos = editCMS_cmsArea_x1+Math.round((tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * editCMS_cmsArea_width);


        if( tmpCMS.getBur(i)){

          ///////////////////////////////////////////////
          //////////// Section Line
          /////////////////////////////////////////////
          if(selectedSectionColor){
            context.fillStyle = sectionColor1;
            selectedSectionColor=false;
          }
          else{
            context.fillStyle = sectionColor2;
            selectedSectionColor=true;
          }

          var newSectionLinearPos= linearKey_xPos;
          var newSectionSketchPos= currentSktech_xPos;

          context.beginPath();
          context.moveTo(lastSectionLinearPos, sectionLine_y1);
          context.lineTo(newSectionLinearPos,sectionLine_y1);
          context.lineTo(newSectionSketchPos, editCMS_sketchCMS_y1);
          context.lineTo(lastSectionSketchPos, editCMS_sketchCMS_y1);
          context.closePath();
          context.fill();

          lastSectionLinearPos = newSectionLinearPos;
          lastSectionSketchPos = newSectionSketchPos;

          ///////////////////////////////////////////////
          //////////// Burdock Key Line
          /////////////////////////////////////////////
          context.fillStyle = actionColor;
          var burkey_x1= linearKey_xPos-editCMS_key_half;

          if(i==0)
            burkey_x1=editCMS_cmsArea_x1;

          var burkey_width = editCMS_key_size;

          if(i==tmpCMS.getKeyLength()-1 || i==0)
            burkey_width=editCMS_key_half;

          context.fillRect(burkey_x1,burkey_y1,burkey_width,burKeyLine_Height); // for the burdock key line
          context.fillStyle = strokeColor;

        }

        ///////////////////////////////////////////////
        //////////// Draw Key Lines
        /////////////////////////////////////////////
        context.beginPath();
        context.moveTo(linearKey_xPos,linearKeyLine_y1);
        context.lineTo(linearKey_xPos,burkey_y1);
        context.stroke();

        context.beginPath();
        context.moveTo(currentSktech_xPos,sketchKeyLine_y1);
        context.lineTo(currentSktech_xPos,editCMS_sketchKey_y1);
        context.stroke();


        ///////////////////////////////////////////////
        //////////// Draw Key
        /////////////////////////////////////////////


        var keyRect_Linear_XPos = Math.round(linearKey_xPos-(editCMS_key_size / 2));
        var keyRect_Sketch_XPos = Math.round(currentSktech_xPos-(editCMS_key_size / 2));

        switch (tmpCMS.getKeyType(i)) {
          case "nil key":

            drawColorRect(context, keyRect_Linear_XPos, editCMS_linearKey_y1, editCMS_key_size, editCMS_key_size, new classColor_RGB(0.5,0.5,0.5), true);
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            drawColorRect(context, keyRect_Sketch_XPos, editCMS_sketchKey_y1, editCMS_key_size, editCMS_key_size, new classColor_RGB(0.5,0.5,0.5), true);
            break;
          case "twin key":

              if(tmpCMS.getMoT(i))
                drawColorRect(context, keyRect_Linear_XPos, editCMS_linearKey_y1, editCMS_key_size, Math.round(editCMS_key_size/2), tmpCMS.getRightKeyColor(i,"rgb"), false);
              else
                drawColorRect(context, keyRect_Linear_XPos, editCMS_linearKey_y1, editCMS_key_size, Math.round(editCMS_key_size/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);

              var tmp_y1=Math.round(editCMS_linearKey_y1+editCMS_key_size / 2);

              drawColorRect(context, keyRect_Linear_XPos, tmp_y1, Math.round(editCMS_key_size / 2), Math.round(editCMS_key_size/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);
              drawColorRect(context, linearKey_xPos, tmp_y1, Math.round(editCMS_key_size / 2), Math.round(editCMS_key_size/2), tmpCMS.getRightKeyColor(i,"rgb"), false);

              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              drawColorRect(context, keyRect_Sketch_XPos, editCMS_sketchKey_y1, Math.round(editCMS_key_size / 2), Math.round(editCMS_key_size/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);
              drawColorRect(context, currentSktech_xPos, editCMS_sketchKey_y1, Math.round(editCMS_key_size / 2), Math.round(editCMS_key_size/2), tmpCMS.getRightKeyColor(i,"rgb"), false);

              tmp_y1=Math.round(editCMS_sketchKey_y1+editCMS_key_size / 2);

              if(tmpCMS.getMoT(i))
                drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, editCMS_key_size, Math.round(editCMS_key_size/2), tmpCMS.getRightKeyColor(i,"rgb"), false);
              else
                drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, editCMS_key_size, Math.round(editCMS_key_size/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);

            break;
          case "left key":

              if(i!=tmpCMS.getKeyLength()-1)
                if(tmpCMS.getMoT(i))
                  drawColorRect(context, keyRect_Linear_XPos, editCMS_linearKey_y1, editCMS_key_size, Math.round(editCMS_key_size/2), tmpCMS.getLeftKeyColor(i+1,"rgb"), false);
                else
                  drawColorRect(context, keyRect_Linear_XPos, editCMS_linearKey_y1, editCMS_key_size, Math.round(editCMS_key_size/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);
              else
                drawColorRect(context, keyRect_Linear_XPos, editCMS_linearKey_y1, editCMS_key_size, Math.round(editCMS_key_size/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);

              var tmp_y1=Math.round(editCMS_linearKey_y1+editCMS_key_size / 2);

              drawColorRect(context, keyRect_Linear_XPos, tmp_y1, Math.round(editCMS_key_size / 2), Math.round(editCMS_key_size/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);
              drawColorRect(context, linearKey_xPos, tmp_y1, Math.round(editCMS_key_size / 2), Math.round(editCMS_key_size/2), new classColor_RGB(0.5,0.5,0.5), true);

              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

              drawColorRect(context, keyRect_Sketch_XPos, editCMS_sketchKey_y1, Math.round(editCMS_key_size / 2), Math.round(editCMS_key_size/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);
              drawColorRect(context, currentSktech_xPos, editCMS_sketchKey_y1, Math.round(editCMS_key_size / 2), Math.round(editCMS_key_size/2), new classColor_RGB(0.5,0.5,0.5), true);

              tmp_y1=Math.round(editCMS_sketchKey_y1+editCMS_key_size / 2);

              if(i!=tmpCMS.getKeyLength()-1)
                if(tmpCMS.getMoT(i))
                  drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, editCMS_key_size, Math.round(editCMS_key_size/2), tmpCMS.getLeftKeyColor(i+1,"rgb"), false);
                else
                  drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, editCMS_key_size, Math.round(editCMS_key_size/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);
              else
                drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, editCMS_key_size, Math.round(editCMS_key_size/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);

            break;
          case "right key":

            drawColorRect(context, keyRect_Linear_XPos, editCMS_linearKey_y1, Math.round(editCMS_key_size / 2), editCMS_key_size, new classColor_RGB(0.5,0.5,0.5), true);
            drawColorRect(context, linearKey_xPos, editCMS_linearKey_y1, Math.round(editCMS_key_size / 2), editCMS_key_size, tmpCMS.getRightKeyColor(i,"rgb"), false);
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            drawColorRect(context, keyRect_Sketch_XPos, editCMS_sketchKey_y1, Math.round(editCMS_key_size / 2), editCMS_key_size, new classColor_RGB(0.5,0.5,0.5), true);
            drawColorRect(context, currentSktech_xPos, editCMS_sketchKey_y1, Math.round(editCMS_key_size / 2), editCMS_key_size, tmpCMS.getRightKeyColor(i,"rgb"), false);

            break;
          default:

            drawColorRect(context, keyRect_Linear_XPos, editCMS_linearKey_y1, editCMS_key_size, editCMS_key_size, tmpCMS.getRightKeyColor(i,"rgb"), false);
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            drawColorRect(context, keyRect_Sketch_XPos, editCMS_sketchKey_y1, editCMS_key_size, editCMS_key_size, tmpCMS.getRightKeyColor(i,"rgb"), false);

        }


        ///////////////////////////////////////////////
        //////////// Key Number Key
        /////////////////////////////////////////////

        var text = ""+(i+1);
        context.fillStyle = fontColor;
        context.font = labelFontSize+"px Arial";
        context.fillText(text,currentSktech_xPos-(labelFontSize/3),font_yPos);

        currentSktech_xPos+=sketch_BandWidth;
      }

      context.fillStyle = strokeColor;
      context.strokeStyle = strokeColor;

      context.strokeRect(editCMS_cmsArea_x1,editCMS_linearCMS_y1,editCMS_cmsArea_width,editCMS_linearCMS_height);
      context.strokeRect(editCMS_cmsArea_x1,editCMS_sketchCMS_y1,editCMS_cmsArea_width,editCMS_sketchCMS_height);
      context.strokeRect(editCMS_cmsArea_x1,sectionLine_y1,editCMS_cmsArea_width,sectionLine_Height);
      context.strokeRect(editCMS_cmsArea_x1,burkey_y1,editCMS_cmsArea_width,burKeyLine_Height);

    } // else number of keys !=0


}


function drawColorRect(contex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, rgbColor, isGrey) {

  var strokeWidth =1;
  var lineColor =  getComputedStyle(document.documentElement).getPropertyValue('--menue-bg-color');

  if(doColorblindnessSim){
    var tmpLMS = rgbColor.calcLMSColor();
    rgbColor = tmpLMS.calcColorBlindRGBColor();
  }

  contex.fillStyle = rgbColor.getRGBString();
  contex.fillRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);

  if (isGrey == true) {
    contex.beginPath();
    contex.moveTo(colorrectXPos, colorrectYPos + colorrectHeigth);
    contex.lineTo(colorrectXPos + colorrectWitdh, colorrectYPos);
    contex.strokeStyle = lineColor;
    contex.lineWidth = strokeWidth;
    contex.stroke();
  }

  contex.lineWidth = strokeWidth;
  contex.strokeStyle = lineColor;
  contex.strokeRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);

}
