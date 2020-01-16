class class_Edit_Section extends class_Edit_Basis_Section {

  constructor() {
    super('id_EditPage', 'id_EditPage_CMS_Canvas', 'id_edit_cms_name','id_edit_cms_interpolation','id_edit_cms_NaN','id_edit_cms_Below','id_edit_cms_Above');
    this.tmpWorkCMS = undefined;
    this.myDesignID = undefined;

    this.showPathplot = true;
    this.showMapping = false;
    this.showAnalysis = false;
    this.showPredefined = true;


    this.pathPlotDivID="id_EditPage_PathplotContainer";
    this.pathPlot_CoordID="id_EditPage_PathplotCoord";


    ///////////////////////////////////////////////////////////////////////////////////////////////
    // save process
    this.colormapProcess = [];
    this.processPosition = -1;
    this.processLimitation = 20;
    this.somethingChanged= false;

    //////////////////////////////////////////////////////////////////////////////////////////////
    /// for predefined structures
    this.constBands = [new class_Color_RGB(0, 0, 0), new class_Color_RGB(1, 1, 1), new class_Color_RGB(70 / 255, 70 / 255, 70 / 255), new class_Color_RGB(145 / 255, 143 / 255, 129 / 255),
      new class_Color_RGB(225 / 255, 226 / 255, 211 / 255), new class_Color_RGB(253 / 255, 103 / 255, 105 / 255), new class_Color_RGB(252 / 255, 13 / 255, 28 / 255),
      new class_Color_RGB(151 / 255, 4 / 255, 12 / 255), new class_Color_RGB(254 / 255, 193 / 255, 109 / 255), new class_Color_RGB(253 / 255, 152 / 255, 39 / 255),
      new class_Color_RGB(152 / 255, 91 / 255, 19 / 255), new class_Color_RGB(95 / 255, 56 / 255, 23 / 255), new class_Color_RGB(199 / 255, 178 / 255, 155 / 255),
      new class_Color_RGB(248 / 255, 227 / 255, 197 / 255), new class_Color_RGB(255 / 255, 253 / 255, 186 / 255), new class_Color_RGB(255 / 255, 240 / 255, 42 / 255),
      new class_Color_RGB(191 / 255, 239 / 255, 134 / 255), new class_Color_RGB(102 / 255, 163 / 255, 107 / 255), new class_Color_RGB(6 / 255, 109 / 255, 40 / 255),
      new class_Color_RGB(186 / 255, 239 / 255, 236 / 255), new class_Color_RGB(68 / 255, 233 / 255, 239 / 255), new class_Color_RGB(27 / 255, 142 / 255, 163 / 255),
      new class_Color_RGB(89 / 255, 151 / 255, 235 / 255), new class_Color_RGB(17 / 255, 52 / 255, 230 / 255), new class_Color_RGB(21 / 255, 23 / 255, 114 / 255),
      new class_Color_RGB(126 / 255, 126 / 255, 174 / 255), new class_Color_RGB(170 / 255, 42 / 255, 185 / 255), new class_Color_RGB(74 / 255, 0 / 255, 72 / 255)
    ];

    this.selectedPredefinedType = 0;
    this.selectInterpolation = "lab";
    this.selectInterpolation = "linear";
    this.currentDraggedType = undefined;
    this.currentDraggedID = undefined;
    this.predefinedDrawStatus = -2; // needed so we dont have to draw the full cms with each mouse move again (-2=origianl, -1=drag over emtpy CMS, >-1 = key index)

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Key Edit in CMS Visualization
    this.keyModus = 0; // 0=grap and move, 1=add key, 2=remove key
    this.grappedKey = false;
    this.grappedBurdock = false;
    this.overKeyID = undefined;
    this.overBurdockID = undefined;
    this.burdockID_before = undefined;
    this.burdockID_after = undefined;
    this.drawAddKey=false;
    this.drawOriginal=false;

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Init Events
    document.getElementById("id_edit_cms_SetNaN").addEventListener("click", openColorPicker);
    document.getElementById("id_edit_cms_SetAbove").addEventListener("click", openColorPicker);
    document.getElementById("id_edit_cms_SetBelow").addEventListener("click", openColorPicker);

    var cmsCanvasElemtent = document.getElementById("id_EditPage_CMS_Canvas");
    cmsCanvasElemtent.addEventListener("dragenter", cmsStructureOnEnter);
    cmsCanvasElemtent.addEventListener("dragleave", cmsStructureOnLeave);
    cmsCanvasElemtent.ondrop = function(event) {
      event.preventDefault();
      editSection.replaceWithWorkCMS();
    }; // allow Drop

    cmsCanvasElemtent.addEventListener("dragover",cmsStructureDragOver);

    cmsCanvasElemtent.addEventListener("mousedown", editCMS_MouseDown);
    cmsCanvasElemtent.addEventListener("mouseup", editCMS_MouseUp);
    cmsCanvasElemtent.addEventListener("mousemove", editCMS_MouseMove);
    cmsCanvasElemtent.addEventListener("mouseenter",editCMS_MouseEnter);
    cmsCanvasElemtent.addEventListener("mouseleave",editCMS_MouseLeave);

    //
    this.styleEditPage();
  }

  setCMS(cms, id) {
    super.setCMS(cms);
    this.myDesignID = id;
    this.somethingChanged=false;
    document.getElementById("id_edit_editWarning").style.visibility="hidden";
  }

  createCMS(name, intSpace) {
    this.editCMS.clear();
    this.editCMS.setColormapName(name);
    this.editCMS.setInterpolationSpace(intSpace);
    this.myDesignID = myDesignsSection.getMyDesignLength();
    myDesignsSection.pushCMS(cloneCMS(this.editCMS));
    this.somethingChanged=false;
    document.getElementById("id_edit_editWarning").style.visibility="visible";
  }

  replaceWithWorkCMS(){
    this.editCMS.deleteReferences();
    this.editCMS = cloneCMS(this.tmpWorkCMS);
    this.tmpWorkCMS.deleteReferences();
    //updateSection() function at the drag end event or other events
    this.saveCreateProcess();
  }

  styleEditPage(){

    document.getElementById("id_EditPage_DisplayPredefined").style.background = "var(--main-menue-background)";
    document.getElementById("id_EditPage_DisplayPathplot").style.background = "var(--main-menue-background)";
    document.getElementById("id_EditPage_DisplayAnalysis").style.background = "var(--main-menue-background)";
    document.getElementById("id_EditPage_DisplayMapping").style.background = "var(--main-menue-background)";

    var possibleWidth = 85; //
    if(this.showPredefined){
      document.getElementById("id_EditPage_DisplayPredefined").style.background = "var(--main-menue-active)";
      document.getElementById("id_EditPage_PredefinedStructures").style.display="flex";
      document.getElementById("id_EditPage_CMS_PAM_Div").style.width="85vw";
      document.getElementById("id_EditPage_CMS_Div").style.width="60vw";
      document.getElementById("id_EditPage_PAM_Div").style.width="85vw";
      this.drawPredefined();
      this.drawConstantBands();
    }
    else{
      document.getElementById("id_EditPage_PredefinedStructures").style.display="none";
      document.getElementById("id_EditPage_CMS_PAM_Div").style.width="100vw";
      document.getElementById("id_EditPage_CMS_Div").style.width="85vw";
      document.getElementById("id_EditPage_PAM_Div").style.width="100vw";
      possibleWidth = 100;
    }



    var numberPAM = this.getNumPAM();

      switch (numberPAM) {
        case 1:
            // do nothing
        break;
        case 2:
            possibleWidth=possibleWidth/2;
        break;
          default:
            this.showPathplot=true;
            this.showAnalysis=false;
            this.showMapping=false;
            this.styleEditPage();
            return;
        }
        this.pathPlot_Width_VW=possibleWidth;

        if(this.showPathplot){
          document.getElementById("id_EditPage_PathplotDiv").style.width=possibleWidth+"vw";
          document.getElementById("id_EditPage_PathplotDiv").style.display="flex";
          document.getElementById("id_EditPage_DisplayPathplot").style.background = "var(--main-menue-active)";
          document.getElementById("id_EditPage_DisplayPathplot").innerHTML = "Hide Pathplot";
          this.arrangePathplotDivs();
        }
        else{
          document.getElementById("id_EditPage_DisplayPathplot").innerHTML = "Show Pathplot";
          document.getElementById("id_EditPage_PathplotDiv").style.display="none";
        }


        if(this.showAnalysis){
          document.getElementById("id_EditPage_AnalysisDiv").style.width=possibleWidth+"vw";
          document.getElementById("id_EditPage_AnalysisDiv").style.display="flex";
          document.getElementById("id_EditPage_DisplayAnalysis").style.background = "var(--main-menue-active)";
          document.getElementById("id_EditPage_DisplayAnalysis").innerHTML = "Hide Analysis";
        }
        else{
          document.getElementById("id_EditPage_DisplayAnalysis").innerHTML = "Show Analysis";
          document.getElementById("id_EditPage_AnalysisDiv").style.display="none";
        }


        if(this.showMapping){
          document.getElementById("id_EditPage_MappingDiv").style.width=possibleWidth+"vw";
          document.getElementById("id_EditPage_MappingDiv").style.display="flex";
          document.getElementById("id_EditPage_DisplayMapping").style.background = "var(--main-menue-active)";
          document.getElementById("id_EditPage_DisplayMapping").innerHTML = "Hide Mapping";
        }
        else{
          document.getElementById("id_EditPage_DisplayMapping").innerHTML = "Show Mapping";
          document.getElementById("id_EditPage_MappingDiv").style.display="none";
        }


        this.doPagePeculiarity();
        this.updateSection();
  }

  getNumPAM(){
    var numberPAM = 0;

    if(this.showMapping)
      numberPAM++;

      if(this.showAnalysis)
        numberPAM++;

        if(this.showPathplot)
          numberPAM++;

    return numberPAM;
  }

  ////////////////////////////////////////////////////////////////////////////
  ////////////           (START )Update Section                   ////////////
  ////////////////////////////////////////////////////////////////////////////

  saveCreateProcess(){

        if(this.processPosition<this.colormapProcess.length-1){
            this.colormapProcess[0].deleteReferences;
            this.colormapProcess[0]=undefined;
            this.colormapProcess = this.colormapProcess.slice(0, this.processPosition+1);
            this.colormapProcess.push(cloneCMS(this.editCMS));
            this.processPosition = this.colormapProcess.length-1
        }
        else{
          if(this.colormapProcess.length <= this.processLimitation){
            this.colormapProcess.push(cloneCMS(this.editCMS));
            this.processPosition = this.colormapProcess.length-1
          }
          else{
            this.colormapProcess.shift();
            this.colormapProcess.push(cloneCMS(this.editCMS));
            this.processPosition = this.colormapProcess.length-1
          }
        }

        this.somethingChanged=true;
        document.getElementById("id_edit_editWarning").style.visibility="visible";
  }

  undo(){
    if(this.processPosition>0){
      this.processPosition--;
      this.editCMS = this.colormapProcess[this.processPosition];
      this.updateSection();
    }
  }

  redo(){
    if(this.processPosition<this.colormapProcess.length-1){
      this.processPosition++;
      this.editCMS = this.colormapProcess[this.processPosition];
      this.updateSection();
    }
  }

  clear(){

  }

  saveAsNew(){
    if(!myDesignsSection.checkMyDesignLimit()){
      myDesignsSection.pushCMS(cloneCMS(this.editCMS));
      this.myDesignID=myDesignsSection.getMyDesignLength()-1;
      this.somethingChanged=false;
      document.getElementById("id_edit_editWarning").style.visibility="hidden";
    }
    else{
      openAlert("You already used the full CMS-storage and the CMS can not saved as new one!");
    }
  }

  save(){
    myDesignsSection.updateCMS(this.myDesignID,cloneCMS(this.editCMS));
    document.getElementById("id_edit_editWarning").style.visibility="hidden";
    this.somethingChanged=false;
  }

  updateSection() {
      this.updatePathPlot();
      this.updateMapping();
      this.updateAnalysis();
      this.updateKeyEdit();

    super.updateSection();
  }


  updateMapping(){
    if(!this.showMapping)
    return;
    super.updateMapping();
  }

  updateAnalysis(){
    if(!this.showAnalysis)
      return;

    super.updateAnalysis();
  }

  updatePathPlot(){
    if(!this.showPathplot)
      return;
      super.updatePathPlot();
    // do something
  }

  doPagePeculiarity(){
    super.doPagePeculiarity();
    /// draw Predefined;

    if(this.showPredefined){
      this.drawPredefined();
      this.drawConstantBands();
    }

    document.getElementById('id_edit_cms_SetName').value = this.editCMS.getColormapName();
    document.getElementById('id_edit_cms_SetNaN').style.background = this.editCMS.getNaNColor("rgb").getRGBString();
    document.getElementById('id_edit_cms_SetBelow').style.background = this.editCMS.getAboveColor("rgb").getRGBString();
    document.getElementById('id_edit_cms_SetAbove').style.background = this.editCMS.getBelowColor("rgb").getRGBString();

    document.getElementById("id_edit_SetSpaceLAB").style.background = "var(--main-coloredButton_Dark)";
    document.getElementById("id_edit_SetSpaceDIN99").style.background = "var(--main-coloredButton_Dark)";
    document.getElementById("id_edit_SetSpaceRGB").style.background = "var(--main-coloredButton_Dark)";
    document.getElementById("id_edit_SetSpaceHSV").style.background = "var(--main-coloredButton_Dark)";

    switch (this.editCMS.getInterpolationSpace()){
      case "lab":
        document.getElementById("id_edit_SetSpaceLAB").style.background = "var(--main-active-coloredButton_Dark)";
      break;
      case "din99":
        document.getElementById("id_edit_SetSpaceDIN99").style.background = "var(--main-active-coloredButton_Dark)";
      break;
      case "rgb":
        document.getElementById("id_edit_SetSpaceRGB").style.background = "var(--main-active-coloredButton_Dark)";
      break;
      case "hsv":
        document.getElementById("id_edit_SetSpaceHSV").style.background = "var(--main-active-coloredButton_Dark)";
      break;
    }

    document.getElementById("id_edit_SetTypeLinear").style.background = "var(--main-coloredButton_Dark)";
    document.getElementById("id_edit_SetTypeSpline").style.background = "var(--main-coloredButton_Dark)";
    switch (this.editCMS.getInterpolationType()){
      case "linear":
        document.getElementById("id_edit_SetTypeLinear").style.background = "var(--main-active-coloredButton_Dark)";
      break;
      case "spline":
        document.getElementById("id_edit_SetTypeSpline").style.background = "var(--main-active-coloredButton_Dark)";
      break;
    }
  }

  changeCMSName(){
    var newName = document.getElementById('id_edit_cms_SetName').value;
    if(newName!==""){
      this.editCMS.setColormapName(newName);
      this.doPagePeculiarity();
    }
    else{
      document.getElementById('id_edit_cms_SetName').value = this.editCMS.getColormapName();
    }

  }


  ////////////////////////////////////////////////////////////////////////////
  ////////////             (END)Update Section                    ////////////
  ////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////
  ////////        (START ) Predefined,Constant Bands Edit         ////////////
  ////////////////////////////////////////////////////////////////////////////

  setDraggedID(id) {
    this.currentDraggedID = id;
  }

  setDraggedType(type){
    this.currentDraggedType=type;
  }

  drawConstantBands() {

    //---------------------------
    // --------- Empty Divs
    document.getElementById('id_EditPage_ConstBandDiv').innerHTML = "";

    //---------------------------
    // --------- Const
    for (var i = 0; i < this.constBands.length; i++) {

      var iDiv = document.createElement('div');
      iDiv.id = 'const' + i;
      iDiv.className = 'class_predefinedConstBands';
      iDiv.setAttribute('draggable', true);

      if (this.doColorblindnessSim) {
        var tmpLMS = this.constBands[i].calcLMSColor();
        var toolColor = tmpLMS.calcColorBlindRGBColor();
        iDiv.style.background = toolColor.getRGBString();
        tmpLMS.deleteReferences();
        toolColor.deleteReferences();
        tmpLMS = null;
      } else {
        iDiv.style.background = this.constBands[i].getRGBString();
      }

      iDiv.addEventListener("dragstart", cmsStructureOnDragStart);
      iDiv.addEventListener("dragend", cmsStructureOnDragEnd);

      iDiv.onmousedown = (function(id) {
        return function() {
          editSection.setDraggedID(id);
          editSection.setDraggedType("c");
        };
      })(i);

      document.getElementById('id_EditPage_ConstBandDiv').appendChild(iDiv);

    }
  }

  changePredefined(type){
    this.selectedPredefinedType=type;
    this.drawPredefined();
  }

  drawPredefined() {
    var children = document.getElementById("id_EditPage_Predefined_CMS_Div").children;
    for (var i = children.length-1; i >=0; i--) {
      children[i].parentNode.removeChild(children[i]);
    }

    for (var i = 0; i < gallerySection.getPredefinedSize(this.selectedPredefinedType); i++) {
      var tmpCMSlinear = document.createElement('canvas');
      tmpCMSlinear.id = "predefined_linear_" + i + "_" + this.selectedPredefinedType;
      tmpCMSlinear.className = 'class_predefinedLinearCMSBands'
      tmpCMSlinear.setAttribute('draggable', true);

      tmpCMSlinear.addEventListener("dragstart", cmsStructureOnDragStart);
      tmpCMSlinear.addEventListener("dragend", cmsStructureOnDragEnd);

      tmpCMSlinear.oncontextmenu = (function(id, type) {
        return function() {
          gallerySection.calcReverse(type, id);
          gallerySection.drawElementWithGalleryCMS("predefined_linear_" + id + "_" + type, type, id);
          return false;
        };
      })(i, this.selectedPredefinedType);

      tmpCMSlinear.onmousedown = (function(id) {
        return function() {
          editSection.setDraggedID(id);
          editSection.setDraggedType("p");
        };
      })(i);

      document.getElementById('id_EditPage_Predefined_CMS_Div').appendChild(tmpCMSlinear);
      gallerySection.drawElementWithGalleryCMS("predefined_linear_" + i + "_" + this.selectedPredefinedType, this.selectedPredefinedType, i, 200, 1);
    }// END:FOR(i)

  }

  dragOver(mousePosX,mousePosY){

    if(mousePosX==undefined || mousePosY==undefined)
      return;

    if(this.editCMS.getKeyLength()!=0){

        /// Are we between Linear Key Start and Linear CMS End?
        var keyIndex = undefined;
        if(this.around_LinearCMSVis_yPosition(mousePosY)){
          keyIndex = this.getClosest_linearKey(mousePosX);
        }
        else if(this.around_SketchCMSVis_yPosition(mousePosY)){
          keyIndex = this.getClosest_sketchKey(mousePosX);
        }

        if(keyIndex!=undefined && this.predefinedDrawStatus!=keyIndex){

          this.tmpWorkCMS = cloneCMS(this.editCMS);
          this.tmpWorkCMS.setPreventIntervals(true);
          switch(this.currentDraggedType){
                case "c":
                        // ->const

                            // band at the end
                            switch (keyIndex) {
                              case this.tmpWorkCMS.getKeyLength()-1:
                                // case constant
                                var tmpVal = this.tmpWorkCMS.getRefPosition(keyIndex);
                                var dist = Math.abs(tmpVal-this.tmpWorkCMS.getRefPosition(keyIndex-1));
                                this.tmpWorkCMS.setRefPosition(keyIndex,tmpVal-dist*0.5);
                                this.tmpWorkCMS.pushKey(new class_Key(cloneColor(this.constBands[this.currentDraggedID]),undefined,tmpVal,true)); // push left key
                                break;

                              default:
                                var startPos = this.tmpWorkCMS.getRefPosition(keyIndex);
                                var endPos = (startPos+Math.abs(this.tmpWorkCMS.getRefPosition(keyIndex+1)-startPos)*0.5);

                                ///////////
                                ///// split key
                                this.tmpWorkCMS.setRefPosition(keyIndex,endPos);
                                this.tmpWorkCMS.setBur(keyIndex,true);
                                // case constant add Keys
                                var oldColor = this.tmpWorkCMS.getLeftKeyColor(keyIndex,"lab");
                                this.tmpWorkCMS.setLeftKeyColor(keyIndex,cloneColor(this.constBands[this.currentDraggedID])); // create left key
                                this.tmpWorkCMS.insertKey(keyIndex, new class_Key(oldColor,undefined,startPos,true));

                                if(oldColor!=undefined){
                                  oldColor.deleteReferences();
                                  oldColor=null;
                                }
                            }

                break;
                case "m":
                      // -> myDesign CMS
                      //this.tmpWorkCMS.insertCMS(myDesignsList[this.currentDraggedID], keyIndex);
                break;
                case "p":
                  this.tmpWorkCMS.insertCMS(gallerySection.getPredefinedCMS(this.selectedPredefinedType,this.currentDraggedID), keyIndex);
                break;
            }

            this.predefinedDrawStatus=keyIndex;
            this.tmpWorkCMS.setPreventIntervals(false);
            this.drawWorkCMS();

          }
          else if(keyIndex==undefined && this.predefinedDrawStatus!=-2){
            this.drawEditCMSVIS();
            this.drawEditCMSVIS();
            this.predefinedDrawStatus=-2;
          }
    }
    else{

      if(this.predefinedDrawStatus!=-1){

        this.tmpWorkCMS = cloneCMS(this.editCMS);
        this.tmpWorkCMS.setPreventIntervals(true);

        switch(this.currentDraggedType){
              case "c":
                this.tmpWorkCMS.clear();
                this.tmpWorkCMS.pushKey(new class_Key(undefined, undefined, 0, true));
                this.tmpWorkCMS.pushKey(new class_Key(cloneColor(this.constBands[this.currentDraggedID]), undefined, 1, true));
              break;

              case "m":
                    // -> myDesign CMS
                    //this.tmpWorkCMS = cloneCMS(myDesignsList[this.currentDraggedID]);
              break;
              case "p":
                this.tmpWorkCMS = gallerySection.getPredefinedCMS(this.selectedPredefinedType,this.currentDraggedID);
                this.tmpWorkCMS.setColormapName(this.editCMS.getColormapName());
              break;
          }

          this.tmpWorkCMS.setPreventIntervals(false);
          this.drawWorkCMS();
          this.predefinedDrawStatus=-1;
      }

    }

  }

  drawWorkCMS(){
    var tmpCMS = cloneCMS(this.editCMS);
    this.editCMS = cloneCMS(this.tmpWorkCMS);
    this.drawEditCMSVIS();
    this.editCMS.deleteReferences();
    this.editCMS=tmpCMS;
  }


  ////////////////////////////////////////////////////////////////////////////
  ////////         (End ) Predefined,Constant Bands Edit          ////////////
  ////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////
  ////////          (START ) CMS Visualization Key Edit           ////////////
  ////////////////////////////////////////////////////////////////////////////

  getKeyModus(){
    return this.keyModus;
  }

  setKeyModus(modus){
    document.getElementById("id_edit_AddModus").style.visibility = "hidden";
    switch (modus) {
      case 0:
          this.keyModus=0;
      break;
      case 1:
          this.keyModus=1;
          document.getElementById("id_edit_AddModus").style.visibility = "visible";
          document.getElementById("id_edit_AddModus").innerHTML = "+";
          document.getElementById("id_edit_AddModus").title="ADD Key Modus";
      break;
      case 2:
          this.keyModus=2;
          document.getElementById("id_edit_AddModus").style.visibility = "visible";
          document.getElementById("id_edit_AddModus").innerHTML = "-";
          document.getElementById("id_edit_AddModus").title="Remove Key Modus";
      break;
    }
  }

  cmsVisMouseMove(mousePosX,mousePosY){
    if(this.editCMS.getKeyLength()!=0){

      if(this.keyModus==1){
        if(this.around_LinearCMSVis_yPosition(mousePosY) && mousePosX>this.editCMS_cmsArea_x1 && mousePosX<this.editCMS_cmsArea_x1+this.editCMS_cmsArea_width){

          var tmpRef = (mousePosX-this.editCMS_cmsArea_x1)/this.editCMS_cmsArea_width * Math.abs(this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1)-this.editCMS.getRefPosition(0))+this.editCMS.getRefPosition(0);
          tmpRef = parseFloat(tmpRef);

          var tmpColor = this.editCMS.calculateColor(tmpRef);

          this.tmpWorkCMS = cloneCMS(this.editCMS);
          this.tmpWorkCMS.addKey(new class_Key(new class_Color_RGB(tmpColor.get1Value(),tmpColor.get2Value(),tmpColor.get3Value()), new class_Color_RGB(tmpColor.get1Value(),tmpColor.get2Value(),tmpColor.get3Value()), tmpRef, false));
          this.drawAddKey=true;
          drawOriginal=true;
        }
        else{
          if(drawOriginal){
            this.drawEditCMSVIS();
            drawOriginal=false;
          }
          this.drawAddKey=false;
        }
      }
      else if(!this.grappedKey && !this.grappedBurdock){

          document.getElementById('id_EditPage_CMS_Canvas').style.cursor = "default";

          /// Are we between Linear Key Start and Linear CMS End?
          var keyIndex = this.getClosest_linearKey(mousePosX);

          this.overKeyID = undefined;
          this.overBurdockID = undefined;
          if(this.about_LinearKey_yPosition(mousePosY)){
            this.overKeyID = keyIndex;

            if(this.overKeyID==0 || this.overKeyID == this.editCMS.getKeyLength()-1)
              this.overKeyID=undefined;
          }
          else if(this.about_BurdockLine_yPosition(mousePosY)){

            this.overBurdockID = keyIndex;

            if(keyIndex!=undefined){
              if(!this.editCMS.getBur(keyIndex)){
                keyIndex=undefined;
                this.overBurdockID=undefined;
              }
              else {
                if(this.overBurdockID==0 || this.overBurdockID == this.editCMS.getKeyLength()-1)
                  this.overBurdockID=undefined;
              }

              // search for bur after and bur before
              if(this.overBurdockID!=undefined){

                this.burdockID_before = undefined;
                this.burdockID_after = undefined;

                for (var i = this.overBurdockID-1; i >=0; i--) {
                  if(this.editCMS.getBur(i)){
                    this.burdockID_before=i;
                    break;
                  }
                }

                for (var i = this.overBurdockID+1; i <this.editCMS.getKeyLength(); i++) {
                  if(this.editCMS.getBur(i)){
                    this.burdockID_after=i;
                    break;
                  }
                }
              }
            }

          }

          if(this.keyModus==2)
            this.overBurdockID=undefined;

          if(this.overKeyID!=undefined || this.overBurdockID!=undefined){
            document.getElementById('id_EditPage_CMS_Canvas').style.cursor = "pointer";
          }
        }
        else if(this.grappedKey){
          var newRef = (mousePosX-this.editCMS_cmsArea_x1)/this.editCMS_cmsArea_width * Math.abs(this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1)-this.editCMS.getRefPosition(0))+this.editCMS.getRefPosition(0);
          newRef = parseFloat(newRef);

          if(newRef >= this.editCMS.getRefPosition(this.overKeyID-1) && newRef <= this.editCMS.getRefPosition(this.overKeyID+1)){
            this.editCMS.setRefPosition(this.overKeyID,newRef);
          }
        }
        else if(this.grappedBurdock) {

          if(this.burdockID_before == undefined || this.burdockID_after == undefined)
            return;

          var newRef = (mousePosX-this.editCMS_cmsArea_x1)/this.editCMS_cmsArea_width * Math.abs(this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1)-this.editCMS.getRefPosition(0))+this.editCMS.getRefPosition(0);
          newRef = parseFloat(newRef);

          var oldDisBefore = Math.abs(this.editCMS.getRefPosition(this.burdockID_before)-this.editCMS.getRefPosition(this.overBurdockID));
          var oldDisBehind = Math.abs(this.editCMS.getRefPosition(this.burdockID_after)-this.editCMS.getRefPosition(this.overBurdockID));

          if(newRef >= this.editCMS.getRefPosition(this.burdockID_before) && newRef <= this.editCMS.getRefPosition(this.burdockID_after)){

            var newDistance = Math.abs(this.editCMS.getRefPosition(this.burdockID_after)-newRef);
            var ratio = newDistance/oldDisBehind;

            for (var i = this.overBurdockID+1; i < this.burdockID_after; i++) {
              var tmpDis = Math.abs(this.editCMS.getRefPosition(i)-this.editCMS.getRefPosition(this.overBurdockID));
              var tmpNewPos = newRef+tmpDis*ratio;
              this.editCMS.setRefPosition(i,tmpNewPos);
            }

            newDistance = Math.abs(this.editCMS.getRefPosition(this.burdockID_before)-newRef);
            ratio = newDistance/oldDisBefore;
            for (var i = this.overBurdockID-1; i > this.burdockID_before; i--) {
              var tmpDis = Math.abs(this.editCMS.getRefPosition(i)-this.editCMS.getRefPosition(this.burdockID_before));
              var tmpNewPos = this.editCMS.getRefPosition(this.burdockID_before)+tmpDis*ratio;
              this.editCMS.setRefPosition(i,tmpNewPos);
            }

            this.editCMS.setRefPosition(this.overBurdockID,newRef);
          }

        }

    }
  }

  cmsVisDeleteKey(){
    if(this.overKeyID==0 || this.overKeyID==undefined || this.overKeyID==this.editCMS.getKeyLength()-1)
      return;

    this.editCMS.deleteKey(this.overKeyID);
    this.saveCreateProcess();
    this.updateSection();
  }

  grappedSomething(){
    if(this.grappedKey || this.grappedBurdock)
      return true;
    return false;
  }

  resetGrapMoveVars(){
    this.editCMS.setPreventIntervals(false);
    this.grappedKey = false;
    this.grappedBurdock = false;
    this.overKeyID = undefined;
    this.overBurdockID = undefined;
  }

  cmsVisGrap(){
    if(this.overKeyID!=undefined){
        this.grappedKey = true;
        this.editCMS.setPreventIntervals(true);
        document.getElementById('id_EditPage_CMS_Canvas').style.cursor="col-resize";
        timer2DAnimation = setInterval(keyChange2DAnimation, animationInterval);
    }
    else {
        this.editCMS.setPreventIntervals(false);
        this.grappedKey = false;
    }

    if(this.overBurdockID!=undefined){
        this.grappedBurdock = true;
        this.editCMS.setPreventIntervals(true);
        document.getElementById('id_EditPage_CMS_Canvas').style.cursor="col-resize";
        timer2DAnimation = setInterval(keyChange2DAnimation, animationInterval);
    }
    else {
        this.editCMS.setPreventIntervals(false);
        this.grappedBurdock = false;
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  ////////           (END) CMS Visualization Key Edit             ////////////
  ////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////
  ////////          (START ) CMS Visualization Key Edit           ////////////
  ////////////////////////////////////////////////////////////////////////////

  updateKeyEdit(keyIndex){
    //
    document.getElementById("id_EditPage_KeyValueEdit_dropdown").style.display="none";
    //
    var selectbox = document.getElementById("id_EditPage_EditKey_List");
    var lastSelectedIndex = selectbox.selectedIndex;
    for(var i = selectbox.options.length - 1 ; i >= 0 ; i--){selectbox.remove(i);}

    for (var i = 0; i < this.editCMS.getKeyLength(); i++) {
        var opt = document.createElement('option');
        opt.style.display = "flex";
        //opt.innerHTML = "Key : \t"+ (i+1) +";\t  "++";\t   Reference : " + ;

        var p_KeyIndex = document.createElement('p');
        p_KeyIndex.style.margin= "auto";
        p_KeyIndex.style.marginLeft= "0.25vw";
        p_KeyIndex.style.marginRight= "0.5vw";
        p_KeyIndex.style.width= "2vw";
        var p_RefValue = document.createElement('p');
        p_RefValue.style.margin= "auto";
        p_RefValue.style.marginRight= "0.25vw";
        p_RefValue.style.maxWidth= "7vw";
        p_RefValue.style.overflow="hidden";
        var keyDiv = document.createElement('div');
        keyDiv.id = "keyEdit_Div_"+i;
        keyDiv.style.width = "2vw";
        keyDiv.style.maxWidth = "2vh";
        keyDiv.style.height = "2vh";
        keyDiv.style.maxHeight = "2vw";
        keyDiv.style.marginTop="auto";
        keyDiv.style.marginBottom="auto";
        keyDiv.style.marginLeft="0.25vw";
        keyDiv.style.marginRight="0.25vw";
        keyDiv.style.borderRadius="10%";
        keyDiv.style.border = "0.02vh solid black";
        keyDiv.style.overflow = "hidden";

        p_KeyIndex.innerHTML = i+1;
        p_RefValue.innerHTML = this.editCMS.getRefPosition(i);
        opt.appendChild(p_KeyIndex);
        opt.appendChild(keyDiv);
        opt.appendChild(p_RefValue);
        selectbox.appendChild(opt);

        this.drawKeyDiv("keyEdit_Div_"+i,i,false);
    }

    if(keyIndex==undefined || keyIndex<0  || keyIndex>selectbox.options.length-1){
      if(lastSelectedIndex!=-1 && lastSelectedIndex<selectbox.options.length)
        selectbox.selectedIndex = lastSelectedIndex;
      else
        selectbox.selectedIndex = 0;
    }
    else{
      selectbox.selectedIndex = keyIndex;
    }

    this.selectKey();
  }

  selectKey(){
    //
    if(document.getElementById("id_EditPage_KeyValueEdit_dropdown").style.display!=="none")
    refreshKeyValueEdit(); // if the user open the value edit dropdown and switch the keys the dropdown window need to be updated
    //
    var selectedKey= document.getElementById("id_EditPage_EditKey_List").selectedIndex;
    this.updateKeyTypeButtons(this.editCMS.getKeyType(selectedKey));
    this.drawKeyDiv("id_EditPage_EditKey_DrawKeyDiv",selectedKey, true);

    document.getElementById("id_EditPage_ChangeKeyVal").style.visibility="visible";

    if(selectedKey<=0 || selectedKey==this.editCMS.getKeyLength()-1){

      if(selectedKey<0)
        document.getElementById("id_EditPage_ChangeKeyVal").style.visibility="hidden";

      document.getElementById("id_EditPage_DeleteKey").style.visibility="hidden";
      document.getElementById("id_editPage_KeyBurdock").style.visibility="hidden";
    }
    else{

      document.getElementById("id_EditPage_DeleteKey").style.visibility="visible";
      document.getElementById("id_editPage_KeyBurdock").style.visibility="visible";

      if(this.editCMS.getBur(selectedKey))
        document.getElementById("id_editPage_KeyBurdock").style.background = "var(--main-active-coloredButton)";
      else
        document.getElementById("id_editPage_KeyBurdock").style.background = "var(--main-coloredButton)";
    }
  }

  deleteSelectedKey(){
    var selectedKey= document.getElementById("id_EditPage_EditKey_List").selectedIndex;
    this.editCMS.deleteKey(selectedKey);
    //this.updateKeyEdit(selectedKey);
    this.updateSection();
    this.saveCreateProcess();
  }

  drawKeyDiv(divID,keyIndex, doColorPicker){

    document.getElementById(divID).innerHTML="";

    if(keyIndex==undefined || keyIndex<0 || keyIndex>=this.editCMS.getKeyLength())
      return;

      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.style.width = "100%";
      svg.style.height = "100%";
      svg.style.cursor = "not-allowed";
      svg.style.background = "rgb(125,125,125)";

      var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
      newLine.setAttribute('x1','0');
      newLine.setAttribute('y1','100%');
      newLine.setAttribute('x2','100%');
      newLine.setAttribute('y2','0');
      newLine.setAttribute("stroke", "black");
      svg.append(newLine);

    switch (this.editCMS.getKeyType(keyIndex)) {
      case "nil key": // Nil
          document.getElementById(divID).appendChild(svg);
        break;
      case "right key": case "twin key": case "left key": // right // twin // left

          var divTop = document.createElement('div');
          divTop.style.width = '100%';
          divTop.style.height = "25%";
          divTop.style.borderBottom = "0.2vh solid black";

          var divDouble = document.createElement('div');
          divDouble.className = 'row';
          divDouble.style.width = '100%';
          divDouble.style.height = "75%";

          var divLeft = document.createElement('div');
          divLeft.style.width = '50%';
          divLeft.style.height = "100%";
          divLeft.style.borderRight = "0.2vh solid black";

          var divRight = document.createElement('div');
          divRight.style.width = '50%';
          divRight.style.height = "100%";

          divDouble.appendChild(divLeft);
          divDouble.appendChild(divRight);

          if(doColorPicker){
            divLeft.id="id_EditPage_DrawnLeftKey";
            divRight.id="id_EditPage_DrawnRightKey";
            divLeft.addEventListener("click", openColorPicker);
            divRight.addEventListener("click", openColorPicker);
            divTop.style.cursor = "pointer";
            divTop.onclick = function() {
              var index = document.getElementById("id_EditPage_EditKey_List").selectedIndex;
              if(editSection.editCMS.getMoT(index)){
                  editSection.editCMS.setMoT(index,false);
              }
              else{
                editSection.editCMS.setMoT(index,true);
              }
              editSection.updateSection();
            }

          }

          switch (this.editCMS.getKeyType(keyIndex)){
            case "right key":
                divDouble.style.height = "100%";
                divLeft.appendChild(svg);
                if(doColorPicker)
                  divRight.style.cursor = "pointer";
                var tmpColor = this.editCMS.getRightKeyColorCB(keyIndex,this.doColorblindnessSim);
                divRight.style.background = tmpColor.getRGBString();
                tmpColor.deleteReferences();
                tmpColor=null;
              break;
              case "twin key":
              if(doColorPicker)
                divLeft.style.cursor = "pointer";
              var tmpColor = this.editCMS.getLeftKeyColorCB(keyIndex,this.doColorblindnessSim);
              divLeft.style.background = tmpColor.getRGBString();
              tmpColor.deleteReferences();
              tmpColor=null;
              if(doColorPicker)
                divRight.style.cursor = "pointer";
              var tmpColor2 = this.editCMS.getRightKeyColorCB(keyIndex,this.doColorblindnessSim);
              divRight.style.background = tmpColor2.getRGBString();
              tmpColor2.deleteReferences();
              tmpColor2=null;

              if(this.editCMS.getMoT(keyIndex)){
                  // right color is middle of triple
                  var tmpColor3 = this.editCMS.getRightKeyColorCB(keyIndex,this.doColorblindnessSim);
                  divTop.style.background = tmpColor3.getRGBString();
                  tmpColor3.deleteReferences();
                  tmpColor3=null;
              }
              else{
                  var tmpColor3 = this.editCMS.getLeftKeyColorCB(keyIndex,this.doColorblindnessSim);
                  divTop.style.background = tmpColor3.getRGBString();
                  tmpColor3.deleteReferences();
                  tmpColor3=null;
              }

              document.getElementById(divID).appendChild(divTop);
                break;
              case "left key":

                if(doColorPicker)
                  divLeft.style.cursor = "pointer";
                var tmpColor = this.editCMS.getLeftKeyColorCB(keyIndex,this.doColorblindnessSim);
                divLeft.style.background = tmpColor.getRGBString();
                tmpColor.deleteReferences();
                tmpColor=null;
                divRight.appendChild(svg);

                if(keyIndex==this.editCMS.getKeyLength()-1){
                  divDouble.style.height = "100%";
                }
                else{
                  if(this.editCMS.getMoT(keyIndex)){
                      // right color is middle of triple
                      var tmpColor2 = this.editCMS.getLeftKeyColorCB(keyIndex+1,this.doColorblindnessSim);
                      divTop.style.background = tmpColor2.getRGBString();
                      tmpColor2.deleteReferences();
                      tmpColor2=null;
                  }
                  else{
                      var tmpColor2 = this.editCMS.getLeftKeyColorCB(keyIndex,this.doColorblindnessSim);
                      divTop.style.background = tmpColor2.getRGBString();
                      tmpColor2.deleteReferences();
                      tmpColor2=null;
                  }


                  document.getElementById(divID).appendChild(divTop);
                }
                break;
            default:

          }

          document.getElementById(divID).appendChild(divDouble);

      break;
      default: // case 4 dual

      var divDual = document.createElement('div');

      divDual.style.width = '100%';
      divDual.style.height = "100%";

      var tmpColor = this.editCMS.getLeftKeyColorCB(keyIndex,this.doColorblindnessSim);
      divDual.style.background = tmpColor.getRGBString();
      tmpColor.deleteReferences();
      tmpColor=null;
      document.getElementById(divID).appendChild(divDual);

      if(doColorPicker){
        divDual.id="id_EditPage_DrawnDualKey";
        divDual.style.cursor = "pointer";
        divDual.addEventListener("click", openColorPicker);
      }

    }
  }

  updateKeyTypeButtons(type){

    document.getElementById("id_editPage_KeyTypeNil").style.background = "var(--main-coloredButton)";
    document.getElementById("id_editPage_KeyTypeTwin").style.background = "var(--main-coloredButton)";
    document.getElementById("id_editPage_KeyTypeLeft").style.background = "var(--main-coloredButton)";
    document.getElementById("id_editPage_KeyTypeRight").style.background = "var(--main-coloredButton)";
    document.getElementById("id_editPage_KeyTypeDual").style.background = "var(--main-coloredButton)";

    switch (type) {
      case "nil key":
      case "right key":

            document.getElementById("id_EditPage_Edit_Keys_RestKeyTypes").style.display="none";
            document.getElementById("id_EditPage_Edit_Keys_StartKeyTypes").style.display="flex";
          if(type==="nil key")
            document.getElementById("id_editPage_KeyTypeNil").style.background = "var(--main-active-coloredButton)";
          else
            document.getElementById("id_editPage_KeyTypeRight").style.background = "var(--main-active-coloredButton)";
      break;
      case "dual key":
      case "left key":
      case "twin key":
            document.getElementById("id_EditPage_Edit_Keys_RestKeyTypes").style.display="flex";
            document.getElementById("id_EditPage_Edit_Keys_StartKeyTypes").style.display="none";
            document.getElementById("id_editPage_KeyTypeTwin").style.display="block";
            document.getElementById("id_editPage_KeyTypeDual").style.display="block";
          if(type==="twin key"){
            document.getElementById("id_editPage_KeyTypeTwin").style.background = "var(--main-active-coloredButton)";
            break;
          }
          if(type==="dual key"){
            document.getElementById("id_editPage_KeyTypeDual").style.background = "var(--main-active-coloredButton)";
            break;
          }
          if(type==="left key"){
            if(document.getElementById("id_EditPage_EditKey_List").selectedIndex == this.editCMS.getKeyLength()-1){
              document.getElementById("id_editPage_KeyTypeTwin").style.display="none";
              document.getElementById("id_editPage_KeyTypeDual").style.display="none";
            }
            document.getElementById("id_editPage_KeyTypeLeft").style.background = "var(--main-active-coloredButton)";
          }

      break;
    }
  }

  changeKeyType(type){

    var selectedKey= document.getElementById("id_EditPage_EditKey_List").selectedIndex;

    if(selectedKey==-1)
      return;

    switch (type) {
      case 0:
      if(this.editCMS.getKeyType(selectedKey)==="right key"){

        this.editCMS.setRightKeyColor(selectedKey,undefined);
        this.editCMS.setLeftKeyColor(selectedKey,undefined);

      }
      this.updateKeyTypeButtons("nil key");
        break;
      case 3:
        if(this.editCMS.getKeyType(selectedKey)==="dual key" || this.editCMS.getKeyType(selectedKey)==="left key"){

          var tmpColor = this.editCMS.getLeftKeyColor(selectedKey,"hsv");

          if(tmpColor.get3Value()>0.5)
          {
            tmpColor.set3Value(0.25);
          }
          else{
            tmpColor.set3Value(0.75);
          }
          this.editCMS.setRightKeyColor(selectedKey,tmpColor);

        }
        this.updateKeyTypeButtons("twin key");
        break;
      case 4:
        if(this.editCMS.getKeyType(selectedKey)==="dual key" || this.editCMS.getKeyType(selectedKey)==="twin key"){
          this.editCMS.setRightKeyColor(selectedKey,undefined);
        }
this.updateKeyTypeButtons("left key");
        break;
      case 1:
        if(this.editCMS.getKeyType(selectedKey)==="nil key"){
          var tmpColor = this.editCMS.getLeftKeyColor(selectedKey+1,"hsv");

          if(tmpColor.get3Value()>0.5)
          {
            tmpColor.set3Value(0.25);
          }
          else{
            tmpColor.set3Value(0.75);
          }
          this.editCMS.setRightKeyColor(selectedKey,tmpColor);
        }
this.updateKeyTypeButtons("right key");
        break;
      case 2:
          if(this.editCMS.getKeyType(selectedKey)==="twin key" || this.editCMS.getKeyType(selectedKey)==="left key"){
              var tmpColor = this.editCMS.getLeftKeyColor(selectedKey,"lab"); // here lab so the key does not have to convert
              this.editCMS.setRightKeyColor(selectedKey,tmpColor);
          }
          this.updateKeyTypeButtons("dual key");
      break;
    }

    this.updateSection();
    this.saveCreateProcess();

  }

  changeBurdock(){
    var selectedKey= document.getElementById("id_EditPage_EditKey_List").selectedIndex;
    if(this.editCMS.getBur(selectedKey)){
      this.editCMS.setBur(selectedKey,false);
      document.getElementById("id_editPage_KeyBurdock").style.background = "var(--main-coloredButton)";
    }
    else{
      this.editCMS.setBur(selectedKey,true);
      document.getElementById("id_editPage_KeyBurdock").style.background = "var(--main-active-coloredButton)";
    }
    this.saveCreateProcess();
    this.drawEditCMSVIS();
  }
  ////////////////////////////////////////////////////////////////////////////
  ////////           (END) CMS Visualization Key Edit             ////////////
  ////////////////////////////////////////////////////////////////////////////


};
