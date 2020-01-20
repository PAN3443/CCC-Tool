class class_Edit_Basis_Section extends class_Section {

  constructor(div_id, cmsID, nameID, intID, nanID, aboveID, belowID) {
    super(div_id);
    this.editCMS = new class_CMS();

    this.mousePosX = undefined;
    this.mousePosY = undefined;
    /////
    this.cmsCanvasID = cmsID;

    this.cmsNameID = nameID;
    this.cmsInterpolationID = intID;
    this.cmsNaNColorID = nanID;
    this.cmsAboveID = aboveID;
    this.cmsBelowID = belowID;

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

    // PathPlot
    this.pathPlotDivID=undefined;
    this.pathPlot_Height_VH=62;
    this.pathPlot_Width_VW=undefined;
    this.pathPlot_CoordID=undefined;
    this.pathplot_space = "rgb";

    this.pathplot_hueRes = "rgb";

    // PathPlot::Event
    this.mouseAboveKeyID=-1;
    this.mouseGrappedKeyID=-1;
    this.mouseGrappedColorSide=0;

    // PathPlot 3D
    this.pp_doAnimation = false;
    this.pp_animationID = undefined;

    this.pp_camera = undefined;
    this.pp_camera_radius=400;
    this.pp_cameraLight=undefined;
    this.pp_scene = undefined;
    this.pp_renderer = undefined;
    this.pp_colorspaceGroup = new THREE.Group();
    this.pp_LineGroup = new THREE.Group();
    this.pp_ElementGroup = new THREE.Group();


    // Pachplot 3D::Event Var
    this.pp_dorotation = false;
    this.pp_downXPos =0;
    this.pp_downYPos =0;
    this.pp_xRotationAngle=0;
    this.pp_yRotationAngle=0;
    this.pp_xRotationDownAngle=0;
    this.pp_yRotationDownAngle=0;

    this.updatePathPlotSpace("rgb");
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
    this.updatePathPlotSpace(this.pathplot_space);
  }

  updateSection(){
    // ONLY BASIS like draw CMS
    this.drawEditCMSVIS();
  }

  updateAnalysis(){
    // used in edit and optimization
    if (this.editCMS.getKeyLength == 0) {
    } else {
    }
  }

  updateMapping(){
    // used in edit and optimization and probe
    if (this.editCMS.getKeyLength == 0) {
    } else {
    }
  }

  updatePathPlot(){
    // used in edit and optimization
    if (this.editCMS.getKeyLength == 0) {
    } else {
    }
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

  setCMS(cms){
    this.editCMS.deleteReferences();
    this.editCMS=cms;
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
      if(doColorblindnessSim){
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

  ////////////////////////////////////////////////////////////////////////////
  ////////////                 (Start) Pathplot                   ////////////
  ////////////////////////////////////////////////////////////////////////////

  updatePathPlotSpace(space){

    if(!isNaN(space)){
      switch (space) {
        case 0:
          this.updatePathPlotSpace("rgb");
        return;
        case 1:
          this.updatePathPlotSpace("hsv");
        return;
        case 2:
          this.updatePathPlotSpace("lab");
        return;
        case 4:
          this.updatePathPlotSpace("din99");
        return;
        case 3:
          this.updatePathPlotSpace("lch");
        return;
        default:
          this.updatePathPlotSpace("lab");
          return;
      }
    }
    this.pathplot_space=space;
    this.arrangePathplotDivs();

    document.getElementById("id_EditPage_PP_RGB").style.background = "var(--main-menue-background)";
    document.getElementById("id_EditPage_PP_HSV").style.background = "var(--main-menue-background)";
    document.getElementById("id_EditPage_PP_LAB").style.background = "var(--main-menue-background)";
    document.getElementById("id_EditPage_PP_LCH").style.background = "var(--main-menue-background)";
    document.getElementById("id_EditPage_PP_DIN99").style.background = "var(--main-menue-background)";

    switch (this.pathplot_space) {
      case "rgb":
        this.pp_colorspaceGroup=rgbMesh(this.pp_colorspaceGroup);
        document.getElementById("id_EditPage_PP_RGB").style.background = "var(--main-menue-active)";
      break;
      case "hsv":
        this.pp_colorspaceGroup=hsvMesh(this.pp_colorspaceGroup);
        document.getElementById("id_EditPage_PP_HSV").style.background = "var(--main-menue-active)";
      break;
      case "lab":
        this.pp_colorspaceGroup=labMesh(this.pp_colorspaceGroup);
        document.getElementById("id_EditPage_PP_LAB").style.background = "var(--main-menue-active)";
      break;
      case "din99":
        this.pp_colorspaceGroup=din99Mesh(this.pp_colorspaceGroup);
        document.getElementById("id_EditPage_PP_DIN99").style.background = "var(--main-menue-active)";
      break;
      case "lch":
        this.pp_colorspaceGroup=lchMesh(this.pp_colorspaceGroup);
        document.getElementById("id_EditPage_PP_LCH").style.background = "var(--main-menue-active)";
      break;
      default:
        this.updatePathPlotSpace("lab")
        return;
    }

  }

  arrangePathplotDivs(){

    var container = document.getElementById(this.pathPlotDivID);

    if(container==undefined || container==null)
      return;

    var rect = container.getBoundingClientRect();
    var ratio = rect.width/rect.height;
    document.getElementById(this.pathPlotDivID).innerHTML="";
    if(this.pathplot_space==="rgb"){
      switch (true) {
        case (ratio<0):
          // do nothign
        break;
        case (ratio<0.6):
          document.getElementById(this.pathPlotDivID).style.flexDirection="column";
          var tmpDiv = document.createElement('div');
          tmpDiv.style.width="100%;";
          tmpDiv.style.height=this.pathPlot_Height_VH*0.25+"vh";
          tmpDiv.id=this.sectionID+"_PP_3D";
          tmpDiv=this.add_pp_3D_Events(tmpDiv);
          document.getElementById(this.pathPlotDivID).appendChild(tmpDiv);
          var tmpRow = document.createElement('div');
          tmpRow.style.width="100%";
          tmpRow.style.display="flex";
          tmpRow.style.height=this.pathPlot_Height_VH*0.25+"vh";
          tmpRow.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.25,this.pathPlot_Width_VW,true,this.sectionID+"_PP_RG"));
          document.getElementById(this.pathPlotDivID).appendChild(tmpRow);
          tmpRow = document.createElement('div');
          tmpRow.style.width="100%";
          tmpRow.style.display="flex";
          tmpRow.style.height=this.pathPlot_Height_VH*0.25+"vh";
          tmpRow.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.25,this.pathPlot_Width_VW,true,this.sectionID+"_PP_RB"));
          document.getElementById(this.pathPlotDivID).appendChild(tmpRow);
          tmpRow = document.createElement('div');
          tmpRow.style.width="100%";
          tmpRow.style.display="flex";
          tmpRow.style.height=this.pathPlot_Height_VH*0.25+"vh";
          tmpRow.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.25,this.pathPlot_Width_VW,true,this.sectionID+"_PP_BG"));
          document.getElementById(this.pathPlotDivID).appendChild(tmpRow);
        break;
        case (ratio<2):
          document.getElementById(this.pathPlotDivID).style.flexDirection="column";
          var tmpRow = document.createElement('div');
          tmpRow.style.width="100%";
          tmpRow.style.display="flex";
          tmpRow.style.height=this.pathPlot_Height_VH*0.5+"vh";
          var tmpDiv = document.createElement('div');
          tmpDiv.style.height=this.pathPlot_Height_VH*0.5+"vh";
          tmpDiv.style.width=this.pathPlot_Width_VW*0.5+"vw";
          tmpDiv.id=this.sectionID+"_PP_3D";
          tmpDiv=this.add_pp_3D_Events(tmpDiv);
          tmpRow.appendChild(tmpDiv);
          tmpRow.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.5,this.pathPlot_Width_VW*0.5,true,this.sectionID+"_PP_RG"));
          document.getElementById(this.pathPlotDivID).appendChild(tmpRow);
          tmpRow = document.createElement('div');
          tmpRow.style.width="100%";
          tmpRow.style.display="flex";
          tmpRow.style.height=this.pathPlot_Height_VH*0.5+"vh";
          tmpRow.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.5,this.pathPlot_Width_VW*0.5,true,this.sectionID+"_PP_RB"));
          tmpRow.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.5,this.pathPlot_Width_VW*0.5,true,this.sectionID+"_PP_BG"));
          document.getElementById(this.pathPlotDivID).appendChild(tmpRow);
        break;
        default: // (>2)
          document.getElementById(this.pathPlotDivID).style.flexDirection="row";
          var tmpDiv = document.createElement('div');
          tmpDiv.style.height=this.pathPlot_Height_VH+"vh";
          tmpDiv.style.width=this.pathPlot_Width_VW*0.25+"vw";
          tmpDiv.id=this.sectionID+"_PP_3D";
          tmpDiv=this.add_pp_3D_Events(tmpDiv);
          document.getElementById(this.pathPlotDivID).appendChild(tmpDiv);
          document.getElementById(this.pathPlotDivID).appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH,this.pathPlot_Width_VW*0.25,true,this.sectionID+"_PP_RG"));
          document.getElementById(this.pathPlotDivID).appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH,this.pathPlot_Width_VW*0.25,true,this.sectionID+"_PP_RB"));
          document.getElementById(this.pathPlotDivID).appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH,this.pathPlot_Width_VW*0.25,true,this.sectionID+"_PP_BG"));
      }

      if(document.getElementById(this.sectionID).style.display!=="none"){
        this.pp_drawRGB(true, true);
      }
    }
    else {
      switch (true) {
        case (ratio<0):
          // do nothing
        break;
        case (ratio<1):
          document.getElementById(this.pathPlotDivID).style.flexDirection="column";
          var tmpRow = document.createElement('div');
          tmpRow.style.width="100%";
          tmpRow.style.display="flex";
          tmpRow.style.height=this.pathPlot_Height_VH*0.25+"vh";
          var tmpDiv = document.createElement('div');
          tmpDiv.style.height=this.pathPlot_Height_VH*0.25+"vh";
          tmpDiv.style.width=this.pathPlot_Width_VW*0.5+"vw";
          tmpDiv.id=this.sectionID+"_PP_3D";
          tmpDiv=this.add_pp_3D_Events(tmpDiv);
          tmpRow.appendChild(tmpDiv);
          tmpRow.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.25,this.pathPlot_Width_VW*0.5,true,this.sectionID+"_PP_Hue"));
          document.getElementById(this.pathPlotDivID).appendChild(tmpRow);
          document.getElementById(this.pathPlotDivID).appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.25,this.pathPlot_Width_VW,false,this.sectionID+"_PP_C1"));
          document.getElementById(this.pathPlotDivID).appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.25,this.pathPlot_Width_VW,false,this.sectionID+"_PP_C2"));
          document.getElementById(this.pathPlotDivID).appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.25,this.pathPlot_Width_VW,false,this.sectionID+"_PP_C3"));
        break;
        case (ratio<2):
          document.getElementById(this.pathPlotDivID).style.flexDirection="row";
          var tmpCol = document.createElement('div');
          tmpCol.style.width=this.pathPlot_Width_VW*0.33+"vw";
          tmpCol.style.height=this.pathPlot_Height_VH+"vh";
          var tmpDiv = document.createElement('div');
          tmpDiv.style.height=this.pathPlot_Height_VH*0.5+"vh";
          tmpDiv.style.width=this.pathPlot_Width_VW*0.33+"vw";
          tmpDiv.id=this.sectionID+"_PP_3D";
          tmpDiv=this.add_pp_3D_Events(tmpDiv);
          tmpCol.appendChild(tmpDiv);
          tmpCol.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.5,this.pathPlot_Width_VW*0.33,true,this.sectionID+"_PP_Hue"));
          document.getElementById(this.pathPlotDivID).appendChild(tmpCol);
          tmpCol = document.createElement('div');
          tmpCol.style.width=this.pathPlot_Width_VW*0.67+"vw";
          tmpCol.style.height=this.pathPlot_Height_VH+"vh";
          tmpCol.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.67,false,this.sectionID+"_PP_C1"));
          tmpCol.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.67,false,this.sectionID+"_PP_C2"));
          tmpCol.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.67,false,this.sectionID+"_PP_C3"));
          document.getElementById(this.pathPlotDivID).appendChild(tmpCol);
        break;
        default: // (>2)
          document.getElementById(this.pathPlotDivID).style.flexDirection="row";
          var tmpDiv = document.createElement('div');
          tmpDiv.style.height=this.pathPlot_Height_VH+"vh";
          tmpDiv.style.width=this.pathPlot_Width_VW*0.25+"vw";
          tmpDiv.id=this.sectionID+"_PP_3D";
          tmpDiv=this.add_pp_3D_Events(tmpDiv);
          document.getElementById(this.pathPlotDivID).appendChild(tmpDiv);
          document.getElementById(this.pathPlotDivID).appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH,this.pathPlot_Width_VW*0.25,true,this.sectionID+"_PP_Hue"));
          var tmpCol = document.createElement('div');
          tmpCol.style.width=this.pathPlot_Width_VW*0.5+"vw";
          tmpCol.style.height=this.pathPlot_Height_VH+"vh";
          tmpCol.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.5,false,this.sectionID+"_PP_C1"));
          tmpCol.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.5,false,this.sectionID+"_PP_C2"));
          tmpCol.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.5,false,this.sectionID+"_PP_C3"));
          document.getElementById(this.pathPlotDivID).appendChild(tmpCol);
      }

      if(document.getElementById(this.sectionID).style.display!=="none"){
        this.pp_drawOthers(true, true, true);
      }
    }
    this.pp_3D_Resize()
  }

  add_pp_3D_Events(tmpDiv){
    tmpDiv.addEventListener("mousemove", pp_3D_mousemove);
    tmpDiv.addEventListener("mouseleave", pp_3D_mouseleave);
    tmpDiv.addEventListener("mousedown", pp_3D_mousedown);
    tmpDiv.addEventListener("mouseup", pp_3D_mouseup);
    return tmpDiv;
  }

  createTripleLayerCanvasDiv(height_VH, width_VW, isSquad, id){
    var tmpDiv = document.createElement('div');
    tmpDiv.style.width=width_VW+"vw";
    tmpDiv.style.height=height_VH+"vh";
    if(isSquad){
      tmpDiv.style.maxHeight=width_VW+"vw";
      tmpDiv.style.maxWidth=height_VH+"vh";
    }
    tmpDiv.style.margin="auto";
    tmpDiv.style.position="relative";
    //tmpDiv.style.background="rgb(10,10,20)";

    tmpDiv.appendChild(this.createAbsolutCanvas(0,id+"_l0"));
    tmpDiv.appendChild(this.createAbsolutCanvas(1,id+"_l1"));
    tmpDiv.appendChild(this.createAbsolutCanvas(2,id+"_l2"));
    return tmpDiv;
  }

  createAbsolutCanvas(zIndex,id){
    var tmpCanvas=document.createElement('canvas');
    tmpCanvas.style.position="absolute";
    tmpCanvas.style.zIndex=zIndex;
    tmpCanvas.style.width="100%";
    tmpCanvas.style.height="100%";
    tmpCanvas.id=id;
    return tmpCanvas;
  }

 pp_drawRGB(calcBackground, drawInterpolationLine) {
    this.pathplot_hueRes= document.getElementById(this.sectionID+"_PP_RG_l1").getBoundingClientRect().height;
    if(calcBackground)
      this.pp_rgb_background();

    if(drawInterpolationLine)
      this.pp_rgb_interpolationLine();

    this.pp_rgb_drawElements(); // do3D true
  }

  pp_rgb_background() {

    setSquadRes_Canvas(this.sectionID+"_PP_RG_l0"); // global -> helper -> canvasHelper
    setSquadRes_Canvas(this.sectionID+"_PP_RB_l0");
    setSquadRes_Canvas(this.sectionID+"_PP_BG_l0");

    var fixedColor = undefined;
    if (this.mouseGrappedKeyID != -1) {
      switch (this.mouseGrappedColorSide) {
        case 0:
        // left color
          fixedColor = this.editCMS.getLeftKeyColor(this.mouseGrappedKeyID, "rgb");
          break;
        default:
          // both colors
          fixedColor = this.editCMS.getRightKeyColor(this.mouseGrappedKeyID, "rgb");
      }
    }

    drawGRBackground(document.getElementById(this.sectionID+"_PP_RG_l0").getContext("2d"),fixedColor);
    drawBRBackground(document.getElementById(this.sectionID+"_PP_RB_l0").getContext("2d"),fixedColor);
    drawGBBackground(document.getElementById(this.sectionID+"_PP_BG_l0").getContext("2d"),fixedColor);

    if(fixedColor!=undefined){
      fixedColor.deleteReferences();
      fixedColor=null;
    }

  }

  pp_rgb_interpolationLine() {

    setSquadRes_Canvas(this.sectionID+"_PP_RG_l1"); // global -> helper -> canvasHelper
    setSquadRes_Canvas(this.sectionID+"_PP_RB_l1");
    setSquadRes_Canvas(this.sectionID+"_PP_BG_l1");

    calcRGBInterpolationLine(cloneCMS(this.editCMS),this.pathplot_hueRes);

    drawInterpolationLine(document.getElementById(this.sectionID+"_PP_RG_l1").getContext("2d"),1,0,true);
    drawInterpolationLine(document.getElementById(this.sectionID+"_PP_RB_l1").getContext("2d"),2,0,true);
    drawInterpolationLine(document.getElementById(this.sectionID+"_PP_BG_l1").getContext("2d"),1,2,true);

    this.pp_LineGroup=draw3DInterpolationLine(this.pp_LineGroup);

  }

  pp_rgb_drawElements(){

    setSquadRes_Canvas(this.sectionID+"_PP_RG_l2"); // global -> helper -> canvasHelper
    setSquadRes_Canvas(this.sectionID+"_PP_RB_l2");
    setSquadRes_Canvas(this.sectionID+"_PP_BG_l2");

    calcRGBElements(cloneCMS(this.editCMS),this.pathplot_hueRes);

    drawPathplotElements(document.getElementById(this.sectionID+"_PP_RG_l2").getContext("2d"), 1, 0,true,this.mouseAboveKeyID,this.mouseGrappedColorSide);
    drawPathplotElements(document.getElementById(this.sectionID+"_PP_RB_l2").getContext("2d"), 2, 0,true,this.mouseAboveKeyID,this.mouseGrappedColorSide);
    drawPathplotElements(document.getElementById(this.sectionID+"_PP_BG_l2").getContext("2d"), 1, 2,true,this.mouseAboveKeyID,this.mouseGrappedColorSide);

    this.pp_ElementGroup=drawPathplot3DElements(this.pp_ElementGroup,this.mouseAboveKeyID,this.mouseGrappedColorSide);
  }

  pp_drawOthers(calcBackground, drawInterpolationLine, initVplot) {

    //if (initVplot)
    //  pp_init_VPlot();

    if (calcBackground)
      this.pp_hueInit();

    /*if (drawInterpolationLine)
      drawInterpolationLineHSV_LAB_DIN99(false);

    drawElements_HSV_LAB_DIN99(false);*/
  }

  pp_hueInit() {

      setSquadRes_Canvas(this.sectionID+"_PP_Hue_l0");
      var fixedColor = undefined;
      if (this.mouseGrappedKeyID != -1) {
        switch (mouseGrappedColorSide) {
          case 0:
          // left color
            fixedColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, this.pathplot_space);
            break;
          default:
            // both colors
            fixedColor = globalCMS1.getRightKeyColor(mouseGrappedKeyID, this.pathplot_space);
        }
      }

      switch (this.pathplot_space) {
        case "hsv":
          drawHSVBackground(document.getElementById(this.sectionID+"_PP_Hue_l0").getContext("2d"),fixedColor);
          break;
          case "lab":
            drawLabBackground(document.getElementById(this.sectionID+"_PP_Hue_l0").getContext("2d"),fixedColor);
            break;
            case "din99":
              drawDIN99Background(document.getElementById(this.sectionID+"_PP_Hue_l0").getContext("2d"),fixedColor);
              break;
              case "lch":
                drawLCHBackground(document.getElementById(this.sectionID+"_PP_Hue_l0").getContext("2d"),fixedColor);
                break;
      }

      if(fixedColor!=undefined){
        fixedColor.deleteReferences();
        fixedColor=null;
      }
  }
  ////////////////////////////////////////////////////////////////////////////
  ////////////                (END) Pathplot                      ////////////
  ////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////
  ////////////               (Start) Pathplot 3D                  ////////////
  ////////////////////////////////////////////////////////////////////////////

  pp_3D_GetScreenshot(){
    this.pp_3D_StopAnimation();
    var oldSize = this.pp_renderer.getSize();
    this.pp_renderer.setSize(2160, 2160);
    this.pp_renderer.preserveDrawingBuffer = true;
    this.pp_renderer.render(this.pp_scene,this.pp_camera);
    var pathplotImgData = this.pp_renderer.domElement.toDataURL();
    this.pp_renderer.preserveDrawingBuffer = false;
    this.pp_renderer.setSize(oldSize.width, oldSize.height);
    this.pp_3D_StartAnimation();
    return pathplotImgData;
  }

  pp_3D_Resize(){
    if(this.pp_renderer == undefined){
      this.pp_3D_init();
    }
    else{
      var canvasObj = document.getElementById(this.sectionID+"_PP_3D");

      if(canvasObj==undefined || canvasObj==null)
        return;

      canvasObj.innerHTML = "";
      var box = canvasObj.getBoundingClientRect();
      var drawWidth = box.width; //window.innerWidth;
      var drawHeight =box.height; // window.innerHeight;
      canvasObj.appendChild( this.pp_renderer.domElement );
    	this.pp_camera.aspect = drawWidth/drawHeight;
    	this.pp_camera.updateProjectionMatrix();
    	this.pp_renderer.setSize(drawWidth, drawHeight);
    }
  }

  pp_3D_init(){

    var canvasObj = document.getElementById(this.sectionID+"_PP_3D");

    this.pp_renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, logarithmicDepthBuffer: true}); //this.pp_renderer = new THREE.WebGLthis.pp_renderer( { alpha: true } ); //new THREE.WebGLthis.pp_renderer();
    this.pp_renderer.setClearColor( 0xffffff, 0);

    var drawWidth = 100; //window.innerWidth;
    var drawHeight = 100; // window.innerHeight;

    if(canvasObj!=undefined && canvasObj!=null){
      canvasObj.innerHTML = "";
      var box = canvasObj.getBoundingClientRect();
      drawWidth = box.width; //window.innerWidth;
      drawHeight =box.height; // window.innerHeight;
      canvasObj.appendChild( this.pp_renderer.domElement );
    }

  	this.pp_scene = new THREE.Scene();
  	this.pp_camera = new THREE.PerspectiveCamera(75,drawWidth /drawHeight, 0.1, 1000);//new THREE.Orthographicthis.pp_camera( 0.5 * drawWidth * 2 / - 2, 0.5 * drawWidth * 2 / 2, drawWidth / 2, drawWidth / - 2, 150, 1000 ); //new THREE.Perspectivethis.pp_camera(75,drawWidth /drawHeight, 0.1, 1000);
    this.pp_renderer.setSize(drawWidth,drawHeight);//(window.innerWidth, window.innerHeight);

    this.pp_cameraLight = new THREE.PointLight( 0xffffff,1 );
    this.pp_cameraLight.position.set( 0, 0, this.pp_camera_radius );
    this.pp_scene.add( this.pp_cameraLight );

    this.pp_camera.position.x = 0;
    this.pp_camera.position.y = 0;
  	this.pp_camera.position.z = this.pp_camera_radius;

    this.pp_scene.add( this.pp_colorspaceGroup );
    this.pp_scene.add( this.pp_LineGroup );
    this.pp_scene.add( this.pp_ElementGroup );
  }

  pp_3D_StopAnimation(){
    if(this.pp_doAnimation){
      cancelAnimationFrame( this.pp_animationID );
      this.pp_doAnimation = false;
    }
  }

  pp_3D_Animation(){
    // is in the specific class of the subsection
  }

  pp_3D_StartAnimation(){
    this.pp_doAnimation=true;
    this.pp_3D_Animation();
  }

  pp_3D_Render() {
            this.pp_renderer.clear();
            this.pp_colorspaceGroup.rotation.y += ( this.pp_xRotationAngle - this.pp_colorspaceGroup.rotation.y ) * 0.05;
            this.pp_colorspaceGroup.rotation.x += ( this.pp_yRotationAngle - this.pp_colorspaceGroup.rotation.x ) * 0.05;
            this.pp_LineGroup.rotation.y += ( this.pp_xRotationAngle - this.pp_LineGroup.rotation.y ) * 0.05;
            this.pp_LineGroup.rotation.x += ( this.pp_yRotationAngle - this.pp_LineGroup.rotation.x ) * 0.05;
            this.pp_ElementGroup.rotation.y += ( this.pp_xRotationAngle - this.pp_ElementGroup.rotation.y ) * 0.05;
            this.pp_ElementGroup.rotation.x += ( this.pp_yRotationAngle - this.pp_ElementGroup.rotation.x ) * 0.05;

            this.pp_camera.lookAt( this.pp_scene.position );
            this.pp_renderer.render( this.pp_scene, this.pp_camera );
  }

  pp_3D_RotateCamera(){
    // Use Math.cos and Math.sin to set this.pp_camera X and Z values based on angle.
    this.pp_camera.position.x = this.pp_camera_radius * Math.sin( this.pp_xRotationAngle)* Math.cos( this.pp_yRotationAngle);
    this.pp_camera.position.y = this.pp_camera_radius * Math.sin( this.pp_xRotationAngle)* Math.sin( this.pp_yRotationAngle);
    this.pp_camera.position.z = this.pp_camera_radius *  Math.cos( this.pp_xRotationAngle);

    this.pp_cameraLight.position.x = this.pp_camera_radius * Math.sin( this.pp_xRotationAngle)* Math.cos( this.pp_yRotationAngle);
    this.pp_cameraLight.position.y = this.pp_camera_radius * Math.sin( this.pp_xRotationAngle)* Math.sin( this.pp_yRotationAngle);
    this.pp_cameraLight.position.z = this.pp_camera_radius *  Math.cos( this.pp_xRotationAngle);

    this.pp_camera.lookAt( this.pp_scene.position );
  }

  ////////////////////////////////////////////////////////////////////////////
  ////////////                (End) Pathplot 3D                   ////////////
  ////////////////////////////////////////////////////////////////////////////
};
