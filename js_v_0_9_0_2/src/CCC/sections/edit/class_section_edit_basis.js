class class_Edit_Basis_Section extends class_Section {

  constructor(div_id) {
    super(div_id);
    this.editCMS = new class_CMS();
    this.part_Pathplot = new class_Edit_Part_Pathplot(undefined,div_id);
    this.part_Mapping = new class_Edit_Part_Mapping(undefined,div_id);
    this.part_Analysis = new class_Edit_Part_Analysis(undefined,div_id);

    this.mousePosX = undefined;
    this.mousePosY = undefined;
    /////
    this.cmsCanvasID = undefined;
    this.cmsNameID = undefined;
    this.cmsInterpolationID = undefined;
    this.cmsNaNColorID = undefined;
    this.cmsAboveID = undefined;
    this.cmsBelowID = undefined;

    // CMS Visualization Information
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

  resize(){
    if(this.isSectionOpen()){
      this.part_Pathplot.resize();
      this.part_Mapping.resize();
      this.part_Analysis.resize();
    }
  }

  showSection(){
    super.showSection();
    this.resize();
    this.doPagePeculiarity();
  }

  updateElements_CMS_Ref(){
    ref_GlobalCMS = this.editCMS;
  }

  doPagePeculiarity(){
    // is empty. Filled at the classes extends from this class
    // is for special updating of the section, which not need to be done with each call of updateSection()

    // update Name, Interpolation ....
    /*if(this.cmsNameID != undefined)
    document.getElementById(this.cmsNameID).innerHTML = "Name: "+ this.editCMS.getColormapName();
    if(this.cmsInterpolationID != undefined)
    document.getElementById(this.cmsInterpolationID).innerHTML =  "Interpolation: "+this.editCMS.getInterpolationSpace()+" ("+this.editCMS.getInterpolationType()+")"
    document.getElementById(this.cmsNaNColorID).style.background = this.editCMS.getNaNColor("rgb_string");
    document.getElementById(this.cmsAboveID).style.background = this.editCMS.getAboveColor("rgb_string");
    document.getElementById(this.cmsBelowID).style.background = this.editCMS.getBelowColor("rgb_string");*/
  }

  updateSection(){
    // ONLY BASIS like draw CMS
    this.drawEditCMSVIS();

    this.part_Pathplot.updatePart(false,true, true);
    this.part_Analysis.updatePart();
    this.part_Mapping.updatePart();
  }

  updateMapping(){
    this.part_Mapping.updatePart();
  }

  getSpecialCMSColor(type,space){
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

  setSpecialCMSColor(type,color){
    switch (type) {
      case "nan":
          this.editCMS.setNaNColor(color);
          break;
          case "below":
              this.editCMS.setAboveColor(color);
              break;
              case "above":
                  this.editCMS.setBelowColor(color);
                  break;
    }
  }

  setCMS(cmsPackage){
    this.editCMS.setCMSFromPackage(cmsPackage);
    this.editCMS.changePathPlotSpace(this.part_Pathplot.pathplot_space);
  }

  ////////////////////////////////////////////////////////////////////////////
  ////////////              (Start) CMS Drawing                     ////////////
  ////////////////////////////////////////////////////////////////////////////

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
              if((this.editCMS.getInterpolationSpace()==="de94-ds" || this.editCMS.getInterpolationSpace()==="de2000-ds" || this.editCMS.getInterpolationType()==="spline") && this.editCMS.getSupportColorsLength(i)>0){
                var sketch_SubBandWidth = Math.round(sketch_BandWidth/(this.editCMS.getSupportColorsLength(i)+1));
                var currentSktech_SubxPos = currentSktech_xPos;
                var linearKey_Sub_xPos = linearKey_xPos;

                // from left key to first interval
                elementwidth = Math.round((this.editCMS.getSupportColorRef(i,0) - this.editCMS.getRefPosition(i)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);
                canvasData = createScaledBand(canvasData,linearKey_Sub_xPos, this.editCMS_linearCMS_y1, elementwidth, this.editCMS_linearCMS_height, this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()), this.editCMS.getSupportColor(i,0,this.editCMS.getInterpolationSpace()), canvasObject.width);
                canvasData = createScaledBand(canvasData,currentSktech_SubxPos, this.editCMS_sketchCMS_y1, sketch_SubBandWidth, this.editCMS_sketchCMS_height, this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()), this.editCMS.getSupportColor(i,0,this.editCMS.getInterpolationSpace()), canvasObject.width);
                currentSktech_SubxPos+=sketch_SubBandWidth;
                // between intervals
                for (var j = 0; j < this.editCMS.getSupportColorsLength(i)-1; j++) {
                  linearKey_Sub_xPos += elementwidth;
                  elementwidth = Math.round((this.editCMS.getSupportColorRef(i,j+1) - this.editCMS.getSupportColorRef(i,j)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);
                  canvasData = createScaledBand(canvasData,linearKey_Sub_xPos, this.editCMS_linearCMS_y1, elementwidth, this.editCMS_linearCMS_height, this.editCMS.getSupportColor(i,j,this.editCMS.getInterpolationSpace()), this.editCMS.getSupportColor(i,j+1,this.editCMS.getInterpolationSpace()), canvasObject.width);
                  canvasData = createScaledBand(canvasData,currentSktech_SubxPos, this.editCMS_sketchCMS_y1, sketch_SubBandWidth, this.editCMS_sketchCMS_height, this.editCMS.getSupportColor(i,j,this.editCMS.getInterpolationSpace()), this.editCMS.getSupportColor(i,j+1,this.editCMS.getInterpolationSpace()), canvasObject.width);
                  currentSktech_SubxPos+=sketch_SubBandWidth;
                }
                // from last interval to last key
                linearKey_Sub_xPos += elementwidth;//this.editCMS_cmsArea_x1+Math.round((this.editCMS.getSupportColorRef(i,j) - this.editCMS.getRefPosition(0)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);
                var tmpEndPos = this.editCMS_cmsArea_x1+Math.round((this.editCMS.getRefPosition(i+1) - this.editCMS.getRefPosition(0)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);
                elementwidth = (tmpEndPos-linearKey_Sub_xPos);
                sketch_SubBandWidth = (currentSktech_xPos+sketch_BandWidth-currentSktech_SubxPos);
                canvasData = createScaledBand(canvasData,linearKey_Sub_xPos, this.editCMS_linearCMS_y1, elementwidth, this.editCMS_linearCMS_height, this.editCMS.getSupportColor(i,this.editCMS.getSupportColorsLength(i)-1,this.editCMS.getInterpolationSpace()), this.editCMS.getLeftKeyColor(i+1,this.editCMS.getInterpolationSpace()), canvasObject.width);
                canvasData = createScaledBand(canvasData,currentSktech_SubxPos, this.editCMS_sketchCMS_y1, sketch_SubBandWidth, this.editCMS_sketchCMS_height, this.editCMS.getSupportColor(i,this.editCMS.getSupportColorsLength(i)-1,this.editCMS.getInterpolationSpace()), this.editCMS.getLeftKeyColor(i+1,this.editCMS.getInterpolationSpace()), canvasObject.width);
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

      gWorkColor1.updateColor(rgbColor[0], rgbColor[1], rgbColor[2], rgbColor[3]);

      if(doColorblindnessSim)
        contex.fillStyle = gWorkColor1.getColorInfo("rgb_cb_string");
      else
        contex.fillStyle = gWorkColor1.getColorInfo("rgb_string");

      contex.fillRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);
    }
    contex.strokeRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);
  }

  about_LinearKey_yPosition(mousePosY){
    if(mousePosY>this.editCMS_linearKey_y1 && mousePosY<(this.editCMS_linearKey_y1+this.editCMS_key_size)){
      return true;
    }
    else {
      return false;
    }
  }

  about_BurdockLine_yPosition(mousePosY){
    if(mousePosY>this.editCMS_burdock_y1 && mousePosY<(this.editCMS_burdock_y1+this.editCMS_burdock_height)){
      return true;
    }
    else {
      return false;
    }
  }

  around_LinearCMSVis_yPosition(mousePosY){
    if(mousePosY>this.editCMS_linearKey_y1 && mousePosY<(this.editCMS_linearCMS_y1+this.editCMS_linearCMS_height)){
      return true;
    }
    else {
      return false;
    }
  }

  around_SketchCMSVis_yPosition(mousePosY){
    if(mousePosY>this.editCMS_sketchCMS_y1 && mousePosY<(this.editCMS_sketchKey_y1+this.editCMS_key_size)){
      return true;
    }
    else {
      return false;
    }
  }

  getClosest_linearKey(mousePosX){

    for (var index = 0; index < this.editCMS.getKeyLength(); index++) {
      var keyPos = this.editCMS_cmsArea_x1+Math.round((this.editCMS.getRefPosition(index) - this.editCMS.getRefPosition(0)) / (this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0)) * this.editCMS_cmsArea_width);

      if(mousePosX>keyPos-(this.editCMS_key_size/2) && mousePosX<keyPos+(this.editCMS_key_size/2)){
        return index;
      }
    }

    return undefined;
  }

  getClosest_sketchKey(mousePosX){

    var sketch_BandWidth = Math.round(this.editCMS_cmsArea_width/(this.editCMS.getKeyLength()-1));
    var currentSktech_xPos = this.editCMS_cmsArea_x1;

    for (var index = 0; index < this.editCMS.getKeyLength(); index++) {

      if(mousePosX>currentSktech_xPos-(this.editCMS_key_size/2) && mousePosX<currentSktech_xPos+(this.editCMS_key_size/2)){
        return index;
      }

      currentSktech_xPos+=sketch_BandWidth;
    }

    return undefined;
  }

  ////////////////////////////////////////////////////////////////////////////
  ////////////              (END) CMS Drawing                     ////////////
  ////////////////////////////////////////////////////////////////////////////


};
