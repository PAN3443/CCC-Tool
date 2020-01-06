class class_Edit_Section extends class_Edit_Basis_Section {

  constructor() {
    super('id_EditPage', 'id_EditPage_CMS_Canvas', 'id_edit_cms_name','id_edit_cms_interpolation','id_edit_cms_NaN','id_edit_cms_Below','id_edit_cms_Above');
    this.myDesignID = undefined;

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
    this.currentDraggedID = undefined;

    // Init Events
    document.getElementById("id_edit_cms_SetNaN").addEventListener("click", openColorPicker);
    document.getElementById("id_edit_cms_SetAbove").addEventListener("click", openColorPicker);
    document.getElementById("id_edit_cms_SetBelow").addEventListener("click", openColorPicker);
  }

  updateSection() {
    if (this.editCMS.getKeyLength == 0) {

    } else {

    }

    super.updateSection();
  }

  setDraggedID(id) {
    this.currentDraggedID = id;
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

    /*this.editCMS = new class_CMS();
    this.editCMS.setPreventIntervals(true);
    this.editCMS.pushKey(new class_Key(undefined, new class_Color_RGB(0.25, 0.25, 0.5), 0, false));
    this.editCMS.pushKey(new class_Key(new class_Color_RGB(0.5, 0.75, 0.5), new class_Color_RGB(0.5, 0.75, 0.5), 0.5, false));
    this.editCMS.pushKey(new class_Key(new class_Color_RGB(0.75, 0.25, 0.5), undefined, 1, false));
    this.editCMS.setAboveColor(new class_Color_RGB(1.0, 0, 0));
    this.editCMS.setBelowColor(new class_Color_RGB(0, 0, 1.0));
    this.editCMS.setInterpolationSpace("rgb");
    this.editCMS.setPreventIntervals(false);*/
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

      //iDiv.addEventListener("dragstart", cmsStructureOnDragStart);
      //iDiv.addEventListener("dragend", cmsStructureOnDragEnd);

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

      /*tmpCMSlinear.addEventListener("dragstart", cmsStructureOnDragStart);
      tmpCMSlinear.addEventListener("dragend", cmsStructureOnDragEnd);*/

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
        };
      })(i);

      document.getElementById('id_EditPage_Predefined_CMS_Div').appendChild(tmpCMSlinear);
      gallerySection.drawElementWithGalleryCMS("predefined_linear_" + i + "_" + this.selectedPredefinedType, this.selectedPredefinedType, i, 200, 1);
    }// END:FOR(i)

  }
};
