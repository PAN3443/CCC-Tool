class class_Edit_Section extends class_Edit_Basis_Section {

  constructor() {
    super('id_EditPage', 'id_EditPage_CMS_Canvas', 'id_edit_cms_name','id_edit_cms_interpolation','id_edit_cms_NaN','id_edit_cms_Below','id_edit_cms_Above');
    this.tmpWorkCMS = undefined;
    this.myDesignID = undefined;

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

    this.showPathplot = true;
    this.showMapping = false;
    this.showAnalysis = true;

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Key Edit in CMS Visualization
    this.keyModus = 0; // 0=grap and move, 1=add key, 2=remove key
    this.grappedKey = false;
    this.grappedBurdock = false;
    this.overKeyID = undefined;
    this.overBurdockID = undefined;
    this.burdockID_before = undefined;
    this.burdockID_after = undefined;

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
  }

  setCMS(cms, id) {
    super.setCMS(cms);
    this.myDesignID = id;
  }

  createCMS(name, intSpace) {
    this.editCMS.clear();
    this.editCMS.setColormapName(name);
    this.editCMS.setInterpolationSpace(intSpace);
    this.myDesignID = myDesignsSection.getMyDesignLength();
  }

  replaceWithWorkCMS(){
    this.editCMS.deleteReferences();
    this.editCMS = cloneCMS(this.tmpWorkCMS);
    this.tmpWorkCMS.deleteReferences();
    //updateSection() function at the drag end event or other events
    this.saveCreateProcess();
  }

  ////////////////////////////////////////////////////////////////////////////
  ////////////           (START )Update Section                   ////////////
  ////////////////////////////////////////////////////////////////////////////

  saveCreateProcess(){

  }

  updateSection() {
    if (this.editCMS.getKeyLength == 0) {
        this.updatePathPlot();
        this.updateMapping();
        this.updateAnalysis();
    } else {

    }

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

    // do something
  }

  doPagePeculiarity(){
    super.doPagePeculiarity();
    /// draw Predefined;
    this.drawPredefined();
    this.drawConstantBands();

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
    var tmpCMS = cloneCMS(this.editCMS);
    this.tmpWorkCMS = cloneCMS(this.editCMS);
    //this.tmpWorkCMS.setPreventIntervals(true);
    if(mousePosX==undefined || mousePosY==undefined)
      return;

    if(this.tmpWorkCMS.getKeyLength()!=0){

        /// Are we between Linear Key Start and Linear CMS End?
        var keyIndex = undefined;
        if(this.around_LinearCMSVis_yPosition(mousePosY)){
          keyIndex = this.getClosest_linearKey(mousePosX);
        }
        else if(this.around_SketchCMSVis_yPosition(mousePosY)){
          keyIndex = this.getClosest_sketchKey(mousePosX);
        }

        if(keyIndex!=undefined){
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
          }
    }
    else{
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
            break;
        }
    }
    //this.tmpWorkCMS.setPreventIntervals(false);
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

  ////////////////////////////////////////////////////////////////////////////
  ////////           (END) CMS Visualization Key Edit             ////////////
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
          editCMS_drawADDKey=true;
          editCMS_AddKeyDrawOriginal=true;
        }
        else{
          if(editCMS_AddKeyDrawOriginal){
            drawEditCMSVIS(this.editCMS,[]);
            editCMS_AddKeyDrawOriginal=false;
          }
          editCMS_drawADDKey=false;
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
};
