class class_Edit_Basis_Section extends class_Section {

  constructor(div_id, cmsID, nameID, intID, nanID, aboveID, belowID) {
    super(div_id);
    this.editCMS = new class_CMS();
    /////
    this.cmsCanvasID = cmsID;
    this.doColorblindnessSim = false;


    this.cmsNameID = nameID;
    this.cmsInterpolationID = intID;
    this.cmsNaNColorID = nanID;
    this.cmsAboveID = aboveID;
    this.cmsBelowID = belowID;

    // CMS Plot Information
    this.editCMS_key_size=undefined;
    this.editCMS_cmsArea_x1=undefined;
    this.editCMS_cmsArea_width=undefined;
    this.editCMS_linearKey_y1=undefined;
    this.editCMS_burdock_y1=undefined;
    this.editCMS_burdock_height=undefined;
    this.editCMS_linearCMS_y1=undefined;
    this.editCMS_linearCMS_height=undefined;
    this.editCMS_sketchCMS_y1=undefined;
    this.editCMS_sketchCMS_height=undefined;
    this.editCMS_sketchKey_y1=undefined;
  }


  showSection(){
    super.showSection();
    this.doPagePeculiarity();
  }

  doPagePeculiarity(){
    // is empty. Filled at the classes extends from this class
    // is for special updating of the section, which not need to be done with each call of updateSection()

    // update Name, Interpolation ....
    document.getElementById(this.cmsNameID).innerHTML = "Name: "+ this.editCMS.getColormapName();
    document.getElementById(this.cmsInterpolationID).innerHTML =  "Interpolation: "+this.editCMS.getInterpolationSpace()+" ("+this.editCMS.getInterpolationType()+")"
    document.getElementById(this.cmsNaNColorID).style.background = this.editCMS.getNaNColor("rgb").getRGBString();
    document.getElementById(this.cmsAboveID).style.background = this.editCMS.getAboveColor("rgb").getRGBString();
    document.getElementById(this.cmsBelowID).style.background = this.editCMS.getBelowColor("rgb").getRGBString();
  }

  updateSection(){
    // ONLY BASIS like draw CMS
    this.drawEditCMSVIS();
  }

  getColorblindnessInfo(){
    return this.doColorblindnessSim;
  }

  getCMSColor(type,space){
    switch (type) {
      case "nan":
          return this.editCMS.getNaNColor(space);
          case "below":
              return this.editCMS.getAboveColor(space);
              case "above":
                  return this.editCMS.getBelowColor(space);
      default:
        return undefined;
    }
  }

  changeInterpolationSpace(type){
    var intSpace = "lab";
    switch (type) {
      case 0:
        intSpace = "lab";
      break;
      case 1:
        intSpace = "din99";
      break;
      case 2:
        intSpace = "rgb";
      break;
      case 3:
        intSpace = "hsv";
      break;
    }
    this.editCMS.setInterpolationSpace(intSpace);
    this.updateSection();
    this.doPagePeculiarity();
  }

  changeInterpolationType(type){

    switch (type){
      case 0:
        this.editCMS.setInterpolationType("linear");
        break;
        case 1:
          this.editCMS.setInterpolationType("spline");
          break;
    }

    this.updateSection(); // = update CMS, Mapping and Analyze Plots
    this.doPagePeculiarity();
  }

  drawEditCMSVIS(){

    var canvasObject = document.getElementById(this.cmsCanvasID);
    var canvasRect = canvasObject.getBoundingClientRect();

    if(canvasRect.width>1 && canvasRect.height>1){
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

    var strokeWidth = Math.min(Math.round(canvasObject.height*0.005),Math.round(canvasObject.width*0.005));
    if(strokeWidth==0){
      strokeWidth=1;
    }
    context.lineWidth = strokeWidth;

    context.strokeStyle = strokeColor;
    context.fillStyle = strokeColor;
    context.clearRect(0, 0, canvasObject.width, canvasObject.height);

    if(this.editCMS.getKeyLength()==0){
      document.getElementById("id_EditPage_CMSVisDragDropLabel").style.visibility = "visible";
      context.setLineDash([5, 15]);
      context.strokeRect(x1, y1, limitedWidth, limitedHeight);
    }
    else{
      document.getElementById("id_EditPage_CMSVisDragDropLabel").style.visibility = "hidden";
      this.editCMS_key_size = Math.min(Math.round(limitedWidth*0.1),Math.round(limitedHeight*0.1));
      var lineHeight = Math.round(this.editCMS_key_size/2.0);
      var numberHeight = this.editCMS_key_size;
      var labelFontSize = Math.round((numberHeight / 3) * 2);
      var distanceTop = (numberHeight / 6);

      var linearKeyLine_y1 = y1+this.editCMS_key_size;

      this.editCMS_cmsArea_x1 = x1+Math.round(this.editCMS_key_size/2.0);
      var cmsAreaY1 = linearKeyLine_y1+lineHeight;

      this.editCMS_cmsArea_width = limitedWidth-this.editCMS_key_size; // two times a half key width
      var cmsAreaHeight = limitedHeight - (2*this.editCMS_key_size) - (2*lineHeight) - numberHeight;

      this.editCMS_linearKey_y1 = y1;

      this.editCMS_burdock_y1 = cmsAreaY1;
      this.editCMS_burdock_height = Math.round(cmsAreaHeight*0.1);

      this.editCMS_linearCMS_y1 = this.editCMS_burdock_y1+this.editCMS_burdock_height;
      this.editCMS_linearCMS_height = Math.round(cmsAreaHeight*0.35);

      var sectionLine_y1 = this.editCMS_linearCMS_y1+this.editCMS_linearCMS_height;
      var sectionLine_Height = Math.round(cmsAreaHeight*0.2);

      this.editCMS_sketchCMS_y1 = sectionLine_y1+sectionLine_Height;
      this.editCMS_sketchCMS_height = Math.round(cmsAreaHeight*0.35);

      var sketchKeyLine_y1 = this.editCMS_sketchCMS_y1+this.editCMS_sketchCMS_height;

      this.editCMS_sketchKey_y1 = sketchKeyLine_y1+lineHeight;

      var number_y1 = this.editCMS_sketchKey_y1 + this.editCMS_key_size;
      var font_yPos = number_y1 + numberHeight - distanceTop;

      /////// Draw CMS cmsArea
      var sketch_BandWidth = Math.round(this.editCMS_cmsArea_width/(this.editCMS.getKeyLength()-1));
      var currentSktech_xPos = this.editCMS_cmsArea_x1;

      var canvasData = context.getImageData(0, 0, canvasObject.width, canvasObject.height);
      for (var i = 0; i < this.editCMS.getKeyLength()-1; i++) {

          var linearKey_xPos = this.editCMS_cmsArea_x1+Math.round((this.editCMS.getRefPosition(i) - this.editCMS.getRefPosition(0)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);

          var elementwidth = Math.round((this.editCMS.getRefPosition(i+1) - this.editCMS.getRefPosition(i)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);

          switch (this.editCMS.getKeyType(i)) {
            case "nil key": case "left key":
              // Draw Linear Colormap
              canvasData = createConstantBand(canvasData,linearKey_xPos, this.editCMS_linearCMS_y1, elementwidth, this.editCMS_linearCMS_height, this.editCMS.getLeftKeyColor(i+1,this.editCMS.getInterpolationSpace()), canvasObject.width);
              canvasData = createConstantBand(canvasData,currentSktech_xPos, this.editCMS_sketchCMS_y1, sketch_BandWidth, this.editCMS_sketchCMS_height, this.editCMS.getLeftKeyColor(i+1,this.editCMS.getInterpolationSpace()), canvasObject.width);
              break;
            default:
              // Draw Sketch Colormap
              if((this.editCMS.getInterpolationSpace()==="de94-ds" || this.editCMS.getInterpolationSpace()==="de2000-ds" || this.editCMS.getInterpolationType()==="spline") && this.editCMS.getIntervalLength(i)>0){
                var sketch_SubBandWidth = Math.round(sketch_BandWidth/(this.editCMS.getIntervalLength(i)+1));
                var currentSktech_SubxPos = currentSktech_xPos;
                var linearKey_Sub_xPos = linearKey_xPos;

                // from left key to first interval
                elementwidth = Math.round((this.editCMS.getIntervalRef(i,0) - this.editCMS.getRefPosition(i)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);
                canvasData = createScaledBand(canvasData,linearKey_Sub_xPos, this.editCMS_linearCMS_y1, elementwidth, this.editCMS_linearCMS_height, this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()), this.editCMS.getIntervalColor(i,0,this.editCMS.getInterpolationSpace()), canvasObject.width);
                canvasData = createScaledBand(canvasData,currentSktech_SubxPos, this.editCMS_sketchCMS_y1, sketch_SubBandWidth, this.editCMS_sketchCMS_height, this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()), this.editCMS.getIntervalColor(i,0,this.editCMS.getInterpolationSpace()), canvasObject.width);
                currentSktech_SubxPos+=sketch_SubBandWidth;
                // between intervals
                for (var j = 0; j < this.editCMS.getIntervalLength(i)-1; j++) {
                  linearKey_Sub_xPos += elementwidth;
                  elementwidth = Math.round((this.editCMS.getIntervalRef(i,j+1) - this.editCMS.getIntervalRef(i,j)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);
                  canvasData = createScaledBand(canvasData,linearKey_Sub_xPos, this.editCMS_linearCMS_y1, elementwidth, this.editCMS_linearCMS_height, this.editCMS.getIntervalColor(i,j,this.editCMS.getInterpolationSpace()), this.editCMS.getIntervalColor(i,j+1,this.editCMS.getInterpolationSpace()), canvasObject.width);
                  canvasData = createScaledBand(canvasData,currentSktech_SubxPos, this.editCMS_sketchCMS_y1, sketch_SubBandWidth, this.editCMS_sketchCMS_height, this.editCMS.getIntervalColor(i,j,this.editCMS.getInterpolationSpace()), this.editCMS.getIntervalColor(i,j+1,this.editCMS.getInterpolationSpace()), canvasObject.width);
                  currentSktech_SubxPos+=sketch_SubBandWidth;
                }
                // from last interval to last key
                linearKey_Sub_xPos += elementwidth;//this.editCMS_cmsArea_x1+Math.round((this.editCMS.getIntervalRef(i,j) - this.editCMS.getRefPosition(0)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);
                var tmpEndPos = this.editCMS_cmsArea_x1+Math.round((this.editCMS.getRefPosition(i+1) - this.editCMS.getRefPosition(0)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);
                elementwidth = (tmpEndPos-linearKey_Sub_xPos);
                sketch_SubBandWidth = (currentSktech_xPos+sketch_BandWidth-currentSktech_SubxPos);
                canvasData = createScaledBand(canvasData,linearKey_Sub_xPos, this.editCMS_linearCMS_y1, elementwidth, this.editCMS_linearCMS_height, this.editCMS.getIntervalColor(i,this.editCMS.getIntervalLength(i)-1,this.editCMS.getInterpolationSpace()), this.editCMS.getLeftKeyColor(i+1,this.editCMS.getInterpolationSpace()), canvasObject.width);
                canvasData = createScaledBand(canvasData,currentSktech_SubxPos, this.editCMS_sketchCMS_y1, sketch_SubBandWidth, this.editCMS_sketchCMS_height, this.editCMS.getIntervalColor(i,this.editCMS.getIntervalLength(i)-1,this.editCMS.getInterpolationSpace()), this.editCMS.getLeftKeyColor(i+1,this.editCMS.getInterpolationSpace()), canvasObject.width);
              }
              else {
                canvasData = createScaledBand(canvasData,linearKey_xPos, this.editCMS_linearCMS_y1, elementwidth, this.editCMS_linearCMS_height, this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()), this.editCMS.getLeftKeyColor(i+1,this.editCMS.getInterpolationSpace()), canvasObject.width);
                canvasData = createScaledBand(canvasData,currentSktech_xPos, this.editCMS_sketchCMS_y1, sketch_BandWidth, this.editCMS_sketchCMS_height, this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()), this.editCMS.getLeftKeyColor(i+1,this.editCMS.getInterpolationSpace()), canvasObject.width);
              }

          }

          currentSktech_xPos+=sketch_BandWidth;
        }
        context.putImageData(canvasData, 0, 0);


        var sectionColor1 = getComputedStyle(document.documentElement).getPropertyValue('--main-bg-color');
        var sectionColor2 = getComputedStyle(document.documentElement).getPropertyValue('--main-second-bg-color');
        var nilBackground = getComputedStyle(document.documentElement).getPropertyValue('--main-second-bg-color');
        var selectedSectionColor = true;
        var lastSectionLinearPos = this.editCMS_cmsArea_x1;
        var lastSectionSketchPos = this.editCMS_cmsArea_x1;

        context.fillRect(this.editCMS_cmsArea_x1,this.editCMS_burdock_y1,this.editCMS_cmsArea_width,this.editCMS_burdock_height); // for the burdock key line

        currentSktech_xPos = this.editCMS_cmsArea_x1;
        for (var i = 0; i < this.editCMS.getKeyLength(); i++) {

          var linearKey_xPos = this.editCMS_cmsArea_x1+Math.round((this.editCMS.getRefPosition(i) - this.editCMS.getRefPosition(0)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);

          if( this.editCMS.getBur(i)){
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
            context.lineTo(newSectionSketchPos, this.editCMS_sketchCMS_y1);
            context.lineTo(lastSectionSketchPos, this.editCMS_sketchCMS_y1);
            context.closePath();
            context.fill();

            lastSectionLinearPos = newSectionLinearPos;
            lastSectionSketchPos = newSectionSketchPos;

            ///////////////////////////////////////////////
            //////////// Burdock Key Line
            /////////////////////////////////////////////
            context.fillStyle = actionColor;
            var burkey_x1= linearKey_xPos-Math.round(this.editCMS_key_size/2.0);

            if(i==0)
              burkey_x1=this.editCMS_cmsArea_x1;

            var burkey_width = this.editCMS_key_size;

            if(i==this.editCMS.getKeyLength()-1 || i==0)
              burkey_width=Math.round(this.editCMS_key_size/2.0);

            context.fillRect(burkey_x1,this.editCMS_burdock_y1,burkey_width,this.editCMS_burdock_height); // for the burdock key line
            context.fillStyle = strokeColor;

          }

          ///////////////////////////////////////////////
          //////////// Draw Key Lines
          /////////////////////////////////////////////
          context.beginPath();
          context.moveTo(linearKey_xPos,linearKeyLine_y1);
          context.lineTo(linearKey_xPos,this.editCMS_burdock_y1);
          context.stroke();

          context.beginPath();
          context.moveTo(currentSktech_xPos,sketchKeyLine_y1);
          context.lineTo(currentSktech_xPos,this.editCMS_sketchKey_y1);
          context.stroke();

          ///////////////////////////////////////////////
          //////////// Draw Key
          /////////////////////////////////////////////

          var keyRect_Linear_XPos = Math.round(linearKey_xPos-(this.editCMS_key_size / 2));
          var keyRect_Sketch_XPos = Math.round(currentSktech_xPos-(this.editCMS_key_size / 2));

          switch (this.editCMS.getKeyType(i)) {
            case "nil key":

              this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, this.editCMS_key_size, this.editCMS_key_size, nilBackground, true);
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              this.drawColorRect(context, keyRect_Sketch_XPos, this.editCMS_sketchKey_y1, this.editCMS_key_size, this.editCMS_key_size, nilBackground, true);
              break;
            case "twin key":

                if(this.editCMS.getMoT(i))
                  this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size/2), this.editCMS.getRightKeyColor(i,"rgb"), false);
                else
                  this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size/2), this.editCMS.getLeftKeyColor(i,"rgb"), false);

                var tmp_y1=Math.round(this.editCMS_linearKey_y1+this.editCMS_key_size / 2);

                this.drawColorRect(context, keyRect_Linear_XPos, tmp_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size/2), this.editCMS.getLeftKeyColor(i,"rgb"), false);
                this.drawColorRect(context, linearKey_xPos, tmp_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size/2), this.editCMS.getRightKeyColor(i,"rgb"), false);

                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                this.drawColorRect(context, keyRect_Sketch_XPos, this.editCMS_sketchKey_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size/2), this.editCMS.getLeftKeyColor(i,"rgb"), false);
                this.drawColorRect(context, currentSktech_xPos, this.editCMS_sketchKey_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size/2), this.editCMS.getRightKeyColor(i,"rgb"), false);

                tmp_y1=Math.round(this.editCMS_sketchKey_y1+this.editCMS_key_size / 2);

                if(this.editCMS.getMoT(i))
                  this.drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size/2), this.editCMS.getRightKeyColor(i,"rgb"), false);
                else
                  this.drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size/2), this.editCMS.getLeftKeyColor(i,"rgb"), false);

              break;
            case "left key":

                if(i!=this.editCMS.getKeyLength()-1)
                  if(this.editCMS.getMoT(i))
                    this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size/2), this.editCMS.getLeftKeyColor(i+1,"rgb"), false);
                  else
                    this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size/2), this.editCMS.getLeftKeyColor(i,"rgb"), false);
                else
                  this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size/2), this.editCMS.getLeftKeyColor(i,"rgb"), false);

                var tmp_y1=Math.round(this.editCMS_linearKey_y1+this.editCMS_key_size / 2);

                this.drawColorRect(context, keyRect_Linear_XPos, tmp_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size/2), this.editCMS.getLeftKeyColor(i,"rgb"), false);
                this.drawColorRect(context, linearKey_xPos, tmp_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size/2), nilBackground, true);

                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                this.drawColorRect(context, keyRect_Sketch_XPos, this.editCMS_sketchKey_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size/2), this.editCMS.getLeftKeyColor(i,"rgb"), false);
                this.drawColorRect(context, currentSktech_xPos, this.editCMS_sketchKey_y1, Math.round(this.editCMS_key_size / 2), Math.round(this.editCMS_key_size/2), nilBackground, true);

                tmp_y1=Math.round(this.editCMS_sketchKey_y1+this.editCMS_key_size / 2);

                if(i!=this.editCMS.getKeyLength()-1)
                  if(this.editCMS.getMoT(i))
                    this.drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size/2), this.editCMS.getLeftKeyColor(i+1,"rgb"), false);
                  else
                    this.drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size/2), this.editCMS.getLeftKeyColor(i,"rgb"), false);
                else
                  this.drawColorRect(context, keyRect_Sketch_XPos, tmp_y1, this.editCMS_key_size, Math.round(this.editCMS_key_size/2), this.editCMS.getLeftKeyColor(i,"rgb"), false);

              break;
            case "right key":

              this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, Math.round(this.editCMS_key_size / 2), this.editCMS_key_size, nilBackground, true);
              this.drawColorRect(context, linearKey_xPos, this.editCMS_linearKey_y1, Math.round(this.editCMS_key_size / 2), this.editCMS_key_size, this.editCMS.getRightKeyColor(i,"rgb"), false);
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              this.drawColorRect(context, keyRect_Sketch_XPos, this.editCMS_sketchKey_y1, Math.round(this.editCMS_key_size / 2), this.editCMS_key_size, nilBackground, true);
              this.drawColorRect(context, currentSktech_xPos, this.editCMS_sketchKey_y1, Math.round(this.editCMS_key_size / 2), this.editCMS_key_size, this.editCMS.getRightKeyColor(i,"rgb"), false);

              break;
            default:

              this.drawColorRect(context, keyRect_Linear_XPos, this.editCMS_linearKey_y1, this.editCMS_key_size, this.editCMS_key_size, this.editCMS.getRightKeyColor(i,"rgb"), false);
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              this.drawColorRect(context, keyRect_Sketch_XPos, this.editCMS_sketchKey_y1, this.editCMS_key_size, this.editCMS_key_size, this.editCMS.getRightKeyColor(i,"rgb"), false);

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

        context.strokeRect(this.editCMS_cmsArea_x1,this.editCMS_linearCMS_y1,this.editCMS_cmsArea_width,this.editCMS_linearCMS_height);
        context.strokeRect(this.editCMS_cmsArea_x1,this.editCMS_sketchCMS_y1,this.editCMS_cmsArea_width,this.editCMS_sketchCMS_height);
        context.strokeRect(this.editCMS_cmsArea_x1,sectionLine_y1,this.editCMS_cmsArea_width,sectionLine_Height);
        context.strokeRect(this.editCMS_cmsArea_x1,this.editCMS_burdock_y1,this.editCMS_cmsArea_width,this.editCMS_burdock_height);

      } // else number of keys !=0


  }

  drawColorRect(contex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, rgbColor, isGrey) {

    if (isGrey == true) {
      contex.fillStyle = rgbColor;
      contex.fillRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);

      contex.beginPath();
      contex.moveTo(colorrectXPos, colorrectYPos + colorrectHeigth);
      contex.lineTo(colorrectXPos + colorrectWitdh, colorrectYPos);
      contex.stroke();
    }
    else {
      if(this.doColorblindnessSim){
        var tmpLMS = rgbColor.calcLMSColor();
        rgbColor.deleteReferences();
        rgbColor = tmpLMS.calcColorBlindRGBColor();
        tmpLMS.deleteReferences();
        tmpLMS=null;
      }

      contex.fillStyle = rgbColor.getRGBString();
      contex.fillRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);
      rgbColor.deleteReferences();
      rgbColor=null;
    }

    contex.strokeRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);

  }

  setCMS(cms){
    this.editCMS.deleteReferences();
    this.editCMS=cms;
  }

  changeColorblindness(bin){
    this.doColorblindnessSim = bin;
    this.updateSection();
    this.doPagePeculiarity();
  }
};
