class class_Gallery_Section extends class_Section {

  constructor() {
    super('id_GalleryPage');
    this.selectedID = 0;

    // load predefiend;
    this.pathColormaps = "resource/sciviscolor/";
    this.folderYellow = "Scaled/YellowOrange/";
    this.folderBlue = "Scaled/Blues/";
    this.folderRedPurple = "Scaled/RedPurple/";
    this.folderGreen = "Scaled/Green/";
    this.folderBrown = "Scaled/Brown/";
    this.folderDivergent = "Divergent/";
    this.folderMultiBand = "MultiBand/";
    this.fileYellowColormaps = ["YellowOrange1.xml", "YellowOrange2.xml", "YellowOrange3.xml", "YellowOrange4.xml", "YellowOrange5.xml", "YellowOrange6.xml", "YellowOrange7.xml", "YellowOrange8.xml"];
    this.fileBlueColormaps = ["Blue1.xml", "Blue2.xml", "Blue3.xml", "Blue4.xml", "Blue5.xml", "Blue6.xml", "Blue7.xml", "Blue8.xml", "Blue9.xml", "Blue10.xml", "Blue11.xml"];
    this.fileRedPurpleColormaps = ["RedPurple1.xml", "RedPurple2.xml", "RedPurple3.xml", "RedPurple4.xml", "RedPurple5.xml", "RedPurple6.xml", "RedPurple7.xml", "RedPurple8.xml"];
    this.fileGreenColormaps = ["Green1.xml", "Green2.xml", "Green3.xml", "Green4.xml", "Green5.xml", "Green6.xml", "Green7.xml", "Green8.xml"];
    this.fileBrownColormaps = ["ccc-tool_colormap_ScaledBlackBrown3.xml","ccc-tool_colormap_ScaledBlackBrown4.xml","ccc-tool_colormap_ScaledBlackBrown1.xml","ccc-tool_colormap_ScaledBlackBrown2.xml","Brown1.xml", "Brown2.xml", "Brown3.xml", "Brown4.xml", "Brown5.xml", "Brown6.xml", "Brown7.xml", "Brown8.xml", "Brown9.xml"];
    this.fileDivergentColormaps = ["Blue_Orange.xml", "Green_Brown.xml", "Grey_Gold.xml", "Turqoise_Olive.xml","ccc-tool_colormap_DoubleDiv1.xml","ccc-tool_colormap_DoubleDiv2.xml","ccc-tool_colormap_DoubleDiv3.xml","ccc-tool_colormap_DivQuadruple1.xml","ccc-tool_colormap_DivQuadruple2.xml"];
    this.fileMultiBandColormaps = ["brown_green_blue.xml", "brown_green_orangeRed.xml","yellowOrange_brown_blue.xml","blue_green_red.xml","1.xml", "2.xml", "3.xml", "4.xml", "5.xml"];
    this.predefinedCMS = [];
    this.predefinedCMS.push(this.loadPredefinedCMS(this.pathColormaps+this.folderMultiBand,this.fileMultiBandColormaps));
    this.predefinedCMS.push(this.loadPredefinedCMS(this.pathColormaps+this.folderDivergent,this.fileDivergentColormaps));
    this.predefinedCMS.push(this.loadPredefinedCMS(this.pathColormaps+this.folderBlue,this.fileBlueColormaps));
    this.predefinedCMS.push(this.loadPredefinedCMS(this.pathColormaps+this.folderBrown,this.fileBrownColormaps));
    this.predefinedCMS.push(this.loadPredefinedCMS(this.pathColormaps+this.folderGreen,this.fileGreenColormaps));
    this.predefinedCMS.push(this.loadPredefinedCMS(this.pathColormaps+this.folderRedPurple,this.fileRedPurpleColormaps));
    this.predefinedCMS.push(this.loadPredefinedCMS(this.pathColormaps+this.folderYellow,this.fileYellowColormaps));

    // For Gallery Page
    this.predefinedCMS[6][0].drawCMS_Horizontal("id_GalleryPage_Preview_ScaledYellowOrange");
    this.predefinedCMS[2][0].drawCMS_Horizontal("id_GalleryPage_Preview_ScaledBlue");
    this.predefinedCMS[5][0].drawCMS_Horizontal("id_GalleryPage_Preview_ScaledRedPurple");
    this.predefinedCMS[4][0].drawCMS_Horizontal("id_GalleryPage_Preview_ScaledGreen");
    this.predefinedCMS[3][0].drawCMS_Horizontal("id_GalleryPage_Preview_ScaledBrown");
    this.predefinedCMS[1][0].drawCMS_Horizontal("id_GalleryPage_Preview_Divergent");
    this.predefinedCMS[0][0].drawCMS_Horizontal("id_GalleryPage_Preview_Multiband"); //

    // For Edit Page
    this.predefinedCMS[6][0].drawCMS_Horizontal("id_EditPage_Preview_ScaledYellowOrange");
    this.predefinedCMS[2][0].drawCMS_Horizontal("id_EditPage_Preview_ScaledBlue");
    this.predefinedCMS[5][0].drawCMS_Horizontal("id_EditPage_Preview_ScaledRedPurple");
    this.predefinedCMS[4][0].drawCMS_Horizontal("id_EditPage_Preview_ScaledGreen");
    this.predefinedCMS[3][0].drawCMS_Horizontal("id_EditPage_Preview_ScaledBrown");
    this.predefinedCMS[1][0].drawCMS_Horizontal("id_EditPage_Preview_Divergent");
    this.predefinedCMS[0][0].drawCMS_Horizontal("id_EditPage_Preview_Multiband"); //
  }

  getPredefinedSize(type){
    if(type<this.predefinedCMS.length){
      return this.predefinedCMS[type].length;
    }
    return undefined;
  }

  getPredefinedCMS(type,id){
    if(type<this.predefinedCMS.length){
      if(id<this.predefinedCMS[type].length){
        return cloneCMS(this.predefinedCMS[type][id]);
      }
    }
    return undefined;
  }

  calcReverse(type,id){
    if(type<this.predefinedCMS.length){
      if(id<this.predefinedCMS[type].length){
        this.predefinedCMS[type][id].calcReverse();
        if(document.getElementById(this.sectionID).style.display!=='none')
          this.predefinedCMS[type][id].drawCMS_Horizontal("id_Gallery_"+type+"_"+id);
      }
    }
  }

  loadPredefinedCMS(subPath,fileNames){
    var tmpArray = [];
    for (var i = 0; i < fileNames.length; i++) {
      tmpArray.push(xmlColormapParserPath(subPath+fileNames[i]));
    }
    return tmpArray;
  }

  switchGalleryID (type) {
    this.selectedID = type;
    this.updateSection();
  }

  updateSection(){

    document.getElementById("id_GalleryPage_Div_Multiband").classList.remove("class_TabRowBorderButtonActive");
    document.getElementById("id_GalleryPage_Div_Divergent").classList.remove("class_TabRowBorderButtonActive");
    document.getElementById("id_GalleryPage_Div_ScaledBlue").classList.remove("class_TabRowBorderButtonActive");
    document.getElementById("id_GalleryPage_Div_ScaledBrown").classList.remove("class_TabRowBorderButtonActive");
    document.getElementById("id_GalleryPage_Div_ScaledGreen").classList.remove("class_TabRowBorderButtonActive");
    document.getElementById("id_GalleryPage_Div_ScaledRedPurple").classList.remove("class_TabRowBorderButtonActive");
    document.getElementById("id_GalleryPage_Div_ScaledYellowOrange").classList.remove("class_TabRowBorderButtonActive");

    document.getElementById("id_GalleryPage_Div_Multiband").classList.add("class_TabRowBorderButtonNotActive");
    document.getElementById("id_GalleryPage_Div_Divergent").classList.add("class_TabRowBorderButtonNotActive");
    document.getElementById("id_GalleryPage_Div_ScaledBlue").classList.add("class_TabRowBorderButtonNotActive");
    document.getElementById("id_GalleryPage_Div_ScaledBrown").classList.add("class_TabRowBorderButtonNotActive");
    document.getElementById("id_GalleryPage_Div_ScaledGreen").classList.add("class_TabRowBorderButtonNotActive");
    document.getElementById("id_GalleryPage_Div_ScaledRedPurple").classList.add("class_TabRowBorderButtonNotActive");
    document.getElementById("id_GalleryPage_Div_ScaledYellowOrange").classList.add("class_TabRowBorderButtonNotActive");

    var children = document.getElementById("id_GalleryPage_CMS_Div").children;
    for (var i = children.length-1; i >=0; i--) {
      children[i].parentNode.removeChild(children[i]);
    }

    switch (this.selectedID) {
      case 0:
      document.getElementById("id_GalleryPage_Div_Multiband").classList.remove("class_TabRowBorderButtonNotActive");
      document.getElementById("id_GalleryPage_Div_Multiband").classList.add("class_TabRowBorderButtonActive");
        break;
        case 1:
        document.getElementById("id_GalleryPage_Div_Divergent").classList.remove("class_TabRowBorderButtonNotActive");
        document.getElementById("id_GalleryPage_Div_Divergent").classList.add("class_TabRowBorderButtonActive");
          break
          case 2:
          document.getElementById("id_GalleryPage_Div_ScaledBlue").classList.remove("class_TabRowBorderButtonNotActive");
          document.getElementById("id_GalleryPage_Div_ScaledBlue").classList.add("class_TabRowBorderButtonActive");
            break
              case 3:
              document.getElementById("id_GalleryPage_Div_ScaledBrown").classList.remove("class_TabRowBorderButtonNotActive");
              document.getElementById("id_GalleryPage_Div_ScaledBrown").classList.add("class_TabRowBorderButtonActive");
                break
                case 4:
                document.getElementById("id_GalleryPage_Div_ScaledGreen").classList.remove("class_TabRowBorderButtonNotActive");
                document.getElementById("id_GalleryPage_Div_ScaledGreen").classList.add("class_TabRowBorderButtonActive");
                  break
                  case 5:
                  document.getElementById("id_GalleryPage_Div_ScaledRedPurple").classList.remove("class_TabRowBorderButtonNotActive");
                  document.getElementById("id_GalleryPage_Div_ScaledRedPurple").classList.add("class_TabRowBorderButtonActive");
                    break
                    case 6:
                      document.getElementById("id_GalleryPage_Div_ScaledYellowOrange").classList.remove("class_TabRowBorderButtonNotActive");
                      document.getElementById("id_GalleryPage_Div_ScaledYellowOrange").classList.add("class_TabRowBorderButtonActive");
                      break

      default:
        this.updateSection();
        return;
    }
    this.drawGalleryPredefinedCMS();
  }

  drawGalleryPredefinedCMS(){

    for (var i = 0; i < this.predefinedCMS[this.selectedID].length; i++) {

      var divRow = document.createElement("div");
      divRow.className = "row";
      divRow.style.width = "100%";


      var div1 = this.createGalleryElement( i);
      divRow.appendChild(div1);

      if(i+1<this.predefinedCMS[this.selectedID].length){
        i++;
        var div2 = this.createGalleryElement( i);
        divRow.appendChild(div2);
      }

      document.getElementById("id_GalleryPage_CMS_Div").appendChild(divRow);
    }

    for (var i = 0; i < this.predefinedCMS[this.selectedID].length; i++) {
      this.predefinedCMS[this.selectedID][i].drawCMS_Horizontal("id_Gallery_"+this.selectedID+"_"+i);
    }

  }

  createGalleryElement(i){

    var tmpDiv = document.createElement("div");
    tmpDiv.className = "class_GalleryCMSDIV";

    var tmpLabelDiv = document.createElement("div");
    tmpLabelDiv.className = "class_GalleryObjCMSLabel";
    tmpLabelDiv.style.display="flex";
    tmpLabelDiv.style.borderRadius = "0.5vh 0.5vh 0px 0px";

    var tmpLabel = document.createElement("div");
    tmpLabel.style.width="85%";
    tmpLabel.style.paddingLeft="5%";
    tmpLabel.className = "class_GalleryObjCMSLabel";
    tmpLabel.style.border = "none";

    var tmpReverseButton = document.createElement("div");
    tmpReverseButton.className = "class_GalleryObjButton";
    tmpReverseButton.title = "Reverse";
    tmpReverseButton.innerHTML="&#8644;";
    tmpReverseButton.onclick = (function(id,type) {
    return function() {
        gallerySection.calcReverse(type,id);
      };
    })(i,this.selectedID);

    var tmpExportButton = document.createElement("div");
    tmpExportButton.className = "class_GalleryObjButton";
    tmpExportButton.title = "Export";
    tmpExportButton.innerHTML="&#8615;";

    tmpExportButton.onclick = (function(id,type) {
    return function() {
        exportSection.setCMS(gallerySection.getPredefinedCMS(type,id));
        exportSection.showSection();
      };
    })(i,this.selectedID);

    var tmpADDButton = document.createElement("div");
    tmpADDButton.className = "class_GalleryObjButton";
    tmpADDButton.title = "Add to MyDesigns";
    tmpADDButton.innerHTML="+";

    tmpADDButton.onclick = (function(id,type) {
    return function() {
        if(myDesignsSection.checkMyDesignLimit()){
            openAlert("You already used the full CMS-storage!");
            return;
        }
        myDesignsSection.pushCMS(gallerySection.getPredefinedCMS(type,id));
        myDesignsSection.showSection();
      };
    })(i,this.selectedID);

    var tmpEditButton = document.createElement("div");
    tmpEditButton.className = "class_GalleryObjButton";
    tmpEditButton.innerHTML="&#9998;";
    tmpEditButton.title = "Edit";
    tmpEditButton.onclick = (function(id,type) {
    return function() {
      if(myDesignsSection.checkMyDesignLimit()){
          openAlert("You already used the full CMS-storage!");
          return;
      }
      myDesignsSection.pushCMS(gallerySection.getPredefinedCMS(type,id));
      editSection.setCMS(gallerySection.getPredefinedCMS(type,id), myDesignsSection.getMyDesignLength()-1);
      editSection.showSection();
      };
    })(i,this.selectedID);

    tmpLabelDiv.appendChild(tmpLabel);
    tmpLabelDiv.appendChild(tmpReverseButton);
    tmpLabelDiv.appendChild(tmpExportButton);
    tmpLabelDiv.appendChild(tmpADDButton);
    tmpLabelDiv.appendChild(tmpEditButton);

    tmpDiv.appendChild(tmpLabelDiv);

    var tmpCMSlinear = document.createElement("canvas");
    tmpCMSlinear.id = "id_Gallery_"+this.selectedID+"_"+i;
    tmpCMSlinear.className = "class_GalleryObjCMSCanvas class_ColormapCanvas";
    tmpCMSlinear.style.borderRadius = "0px 0px 0.5vh 0.5vh";
    tmpDiv.appendChild(tmpCMSlinear);

    tmpLabel.innerHTML=this.predefinedCMS[this.selectedID][i].getColormapName();

    return tmpDiv;

  }

  drawElementWithGalleryCMS(elemId,type,id,width,height){
    if(type<this.predefinedCMS.length){
      if(id<this.predefinedCMS[type].length){
        this.predefinedCMS[type][id].drawCMS_Horizontal(elemId,width,height);
      }
    }
  }
};
