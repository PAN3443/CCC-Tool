class class_Edit_Part_Pathplot extends class_Edit_Part_Basis {

  constructor(divID,parentID) {
    super(divID,parentID);
    this.pathPlot_CoordID=undefined;

    // PathPlot
    this.pathPlot_Height_VH=62;
    this.pathPlot_Width_VW=undefined;
    this.pathPlot_CoordID=undefined;
    this.pathplot_space = "rgb";

    this.pathplot_hueRes = 500;
    this.vPlotHeight = 500;
    this.vPlotWidth = 1500;

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

    this.pp_3D_init();
    this.updatePathPlotSpace(this.pathplot_space); // produce RGB Mesh
  }

  updatePart(doBackground,doInterpolationline, initVPlot){
    super.updatePart();

    if(this.pathplot_space==="rgb")
      this.pp_drawRGB(doBackground, doInterpolationline);
    else
      this.pp_drawOthers(doBackground, doInterpolationline, initVPlot);
  }

  resize(){
    var container = document.getElementById(this.partDivID);

    if(container==undefined || container==null)
      return;

    var rect = container.getBoundingClientRect();
    var ratio = rect.width/rect.height;
    document.getElementById(this.partDivID).innerHTML="";
    if(this.pathplot_space==="rgb"){
      switch (true) {
        case (ratio<0):
          // do nothign
        break;
        case (ratio<0.6):
          document.getElementById(this.partDivID).style.flexDirection="column";
          var tmpDiv = document.createElement('div');
          tmpDiv.style.width="100%;";
          tmpDiv.style.height=this.pathPlot_Height_VH*0.25+"vh";
          tmpDiv.id=this.partDivID+"_PP_3D";
          tmpDiv=this.add_pp_3D_Events(tmpDiv);
          document.getElementById(this.partDivID).appendChild(tmpDiv);
          var tmpRow = document.createElement('div');
          tmpRow.style.width="100%";
          tmpRow.style.display="flex";
          tmpRow.style.height=this.pathPlot_Height_VH*0.25+"vh";
          tmpRow.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.25,this.pathPlot_Width_VW,true,this.partDivID+"_PP_RG"));
          document.getElementById(this.partDivID).appendChild(tmpRow);
          tmpRow = document.createElement('div');
          tmpRow.style.width="100%";
          tmpRow.style.display="flex";
          tmpRow.style.height=this.pathPlot_Height_VH*0.25+"vh";
          tmpRow.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.25,this.pathPlot_Width_VW,true,this.partDivID+"_PP_RB"));
          document.getElementById(this.partDivID).appendChild(tmpRow);
          tmpRow = document.createElement('div');
          tmpRow.style.width="100%";
          tmpRow.style.display="flex";
          tmpRow.style.height=this.pathPlot_Height_VH*0.25+"vh";
          tmpRow.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.25,this.pathPlot_Width_VW,true,this.partDivID+"_PP_BG"));
          document.getElementById(this.partDivID).appendChild(tmpRow);
        break;
        case (ratio<2):
          document.getElementById(this.partDivID).style.flexDirection="column";
          var tmpRow = document.createElement('div');
          tmpRow.style.width="100%";
          tmpRow.style.display="flex";
          tmpRow.style.height=this.pathPlot_Height_VH*0.5+"vh";
          var tmpDiv = document.createElement('div');
          tmpDiv.style.height=this.pathPlot_Height_VH*0.5+"vh";
          tmpDiv.style.width=this.pathPlot_Width_VW*0.5+"vw";
          tmpDiv.id=this.partDivID+"_PP_3D";
          tmpDiv=this.add_pp_3D_Events(tmpDiv);
          tmpRow.appendChild(tmpDiv);
          tmpRow.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.5,this.pathPlot_Width_VW*0.5,true,this.partDivID+"_PP_RG"));
          document.getElementById(this.partDivID).appendChild(tmpRow);
          tmpRow = document.createElement('div');
          tmpRow.style.width="100%";
          tmpRow.style.display="flex";
          tmpRow.style.height=this.pathPlot_Height_VH*0.5+"vh";
          tmpRow.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.5,this.pathPlot_Width_VW*0.5,true,this.partDivID+"_PP_RB"));
          tmpRow.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.5,this.pathPlot_Width_VW*0.5,true,this.partDivID+"_PP_BG"));
          document.getElementById(this.partDivID).appendChild(tmpRow);
        break;
        default: // (>2)
          document.getElementById(this.partDivID).style.flexDirection="row";
          var tmpDiv = document.createElement('div');
          tmpDiv.style.height=this.pathPlot_Height_VH+"vh";
          tmpDiv.style.width=this.pathPlot_Width_VW*0.25+"vw";
          tmpDiv.id=this.partDivID+"_PP_3D";
          tmpDiv=this.add_pp_3D_Events(tmpDiv);
          document.getElementById(this.partDivID).appendChild(tmpDiv);
          document.getElementById(this.partDivID).appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH,this.pathPlot_Width_VW*0.25,true,this.partDivID+"_PP_RG"));
          document.getElementById(this.partDivID).appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH,this.pathPlot_Width_VW*0.25,true,this.partDivID+"_PP_RB"));
          document.getElementById(this.partDivID).appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH,this.pathPlot_Width_VW*0.25,true,this.partDivID+"_PP_BG"));
      }
    }
    else {
      switch (true) {
        case (ratio<0):
          // do nothing
        break;
        case (ratio<1):
          document.getElementById(this.partDivID).style.flexDirection="column";
          var tmpRow = document.createElement('div');
          tmpRow.style.width="100%";
          tmpRow.style.display="flex";
          tmpRow.style.height=this.pathPlot_Height_VH*0.25+"vh";
          var tmpDiv = document.createElement('div');
          tmpDiv.style.height=this.pathPlot_Height_VH*0.25+"vh";
          tmpDiv.style.width=this.pathPlot_Width_VW*0.5+"vw";
          tmpDiv.id=this.partDivID+"_PP_3D";
          tmpDiv=this.add_pp_3D_Events(tmpDiv);
          tmpRow.appendChild(tmpDiv);
          tmpRow.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.25,this.pathPlot_Width_VW*0.5,true,this.partDivID+"_PP_Hue"));
          document.getElementById(this.partDivID).appendChild(tmpRow);
          document.getElementById(this.partDivID).appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.25,this.pathPlot_Width_VW,false,this.partDivID+"_PP_C1"));
          document.getElementById(this.partDivID).appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.25,this.pathPlot_Width_VW,false,this.partDivID+"_PP_C2"));
          document.getElementById(this.partDivID).appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.25,this.pathPlot_Width_VW,false,this.partDivID+"_PP_C3"));
        break;
        case (ratio<2):
          document.getElementById(this.partDivID).style.flexDirection="row";
          var tmpCol = document.createElement('div');
          tmpCol.style.width=this.pathPlot_Width_VW*0.33+"vw";
          tmpCol.style.height=this.pathPlot_Height_VH+"vh";
          var tmpDiv = document.createElement('div');
          tmpDiv.style.height=this.pathPlot_Height_VH*0.5+"vh";
          tmpDiv.style.width=this.pathPlot_Width_VW*0.33+"vw";
          tmpDiv.id=this.partDivID+"_PP_3D";
          tmpDiv=this.add_pp_3D_Events(tmpDiv);
          tmpCol.appendChild(tmpDiv);
          tmpCol.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.5,this.pathPlot_Width_VW*0.33,true,this.partDivID+"_PP_Hue"));
          document.getElementById(this.partDivID).appendChild(tmpCol);
          tmpCol = document.createElement('div');
          tmpCol.style.width=this.pathPlot_Width_VW*0.67+"vw";
          tmpCol.style.height=this.pathPlot_Height_VH+"vh";
          tmpCol.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.67,false,this.partDivID+"_PP_C1"));
          tmpCol.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.67,false,this.partDivID+"_PP_C2"));
          tmpCol.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.67,false,this.partDivID+"_PP_C3"));
          document.getElementById(this.partDivID).appendChild(tmpCol);
        break;
        default: // (>2)
          document.getElementById(this.partDivID).style.flexDirection="row";
          var tmpDiv = document.createElement('div');
          tmpDiv.style.height=this.pathPlot_Height_VH+"vh";
          tmpDiv.style.width=this.pathPlot_Width_VW*0.25+"vw";
          tmpDiv.id=this.partDivID+"_PP_3D";
          tmpDiv=this.add_pp_3D_Events(tmpDiv);
          document.getElementById(this.partDivID).appendChild(tmpDiv);
          document.getElementById(this.partDivID).appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH,this.pathPlot_Width_VW*0.25,true,this.partDivID+"_PP_Hue"));
          var tmpCol = document.createElement('div');
          tmpCol.style.width=this.pathPlot_Width_VW*0.5+"vw";
          tmpCol.style.height=this.pathPlot_Height_VH+"vh";
          tmpCol.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.5,false,this.partDivID+"_PP_C1"));
          tmpCol.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.5,false,this.partDivID+"_PP_C2"));
          tmpCol.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.5,false,this.partDivID+"_PP_C3"));
          document.getElementById(this.partDivID).appendChild(tmpCol);
      }
    }
    this.pp_3D_Resize();
    this.updatePart(true,true,true);
  }

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

    this.resize();

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
    this.pathplot_hueRes= document.getElementById(this.partDivID+"_PP_RG_l1").getBoundingClientRect().height;
    if(calcBackground)
      this.pp_rgb_background();

    if(drawInterpolationLine)
      this.pp_rgb_interpolationLine();

    this.pp_rgb_drawElements(); // do3D true
  }

  pp_rgb_background() {

    setSquadRes_Canvas(this.partDivID+"_PP_RG_l0"); // global -> helper -> canvasHelper
    setSquadRes_Canvas(this.partDivID+"_PP_RB_l0");
    setSquadRes_Canvas(this.partDivID+"_PP_BG_l0");

    var fixedColor = undefined;
    if (this.mouseGrappedKeyID != -1) {
      var tmpCMS = this.getParentCMS();
      switch (this.mouseGrappedColorSide) {
        case 0:
        // left color
          fixedColor = tmpCMS.getLeftKeyColor(this.mouseGrappedKeyID, "rgb");
          break;
        default:
          // both colors
          fixedColor = tmpCMS.getRightKeyColor(this.mouseGrappedKeyID, "rgb");
      }
      tmpCMS.deleteReferences();
    }

    drawGRBackground(document.getElementById(this.partDivID+"_PP_RG_l0").getContext("2d"),fixedColor);
    drawBRBackground(document.getElementById(this.partDivID+"_PP_RB_l0").getContext("2d"),fixedColor);
    drawGBBackground(document.getElementById(this.partDivID+"_PP_BG_l0").getContext("2d"),fixedColor);

    if(fixedColor!=undefined){
      fixedColor.deleteReferences();
      fixedColor=null;
    }

  }

  pp_rgb_interpolationLine() {

    setSquadRes_Canvas(this.partDivID+"_PP_RG_l1"); // global -> helper -> canvasHelper
    setSquadRes_Canvas(this.partDivID+"_PP_RB_l1");
    setSquadRes_Canvas(this.partDivID+"_PP_BG_l1");

    calcRGBInterpolationLine(this.getParentCMS(),this.pathplot_hueRes);

    drawInterpolationLine(document.getElementById(this.partDivID+"_PP_RG_l1").getContext("2d"),1,0,true);
    drawInterpolationLine(document.getElementById(this.partDivID+"_PP_RB_l1").getContext("2d"),2,0,true);
    drawInterpolationLine(document.getElementById(this.partDivID+"_PP_BG_l1").getContext("2d"),1,2,true);

    this.pp_LineGroup=draw3DInterpolationLine(this.pp_LineGroup);

  }

  pp_rgb_drawElements(){

    setSquadRes_Canvas(this.partDivID+"_PP_RG_l2"); // global -> helper -> canvasHelper
    setSquadRes_Canvas(this.partDivID+"_PP_RB_l2");
    setSquadRes_Canvas(this.partDivID+"_PP_BG_l2");

    calcRGBElements(this.getParentCMS(),this.pathplot_hueRes);

    drawPathplotElements(document.getElementById(this.partDivID+"_PP_RG_l2").getContext("2d"), 1, 0,true,this.mouseAboveKeyID,this.mouseGrappedColorSide);
    drawPathplotElements(document.getElementById(this.partDivID+"_PP_RB_l2").getContext("2d"), 2, 0,true,this.mouseAboveKeyID,this.mouseGrappedColorSide);
    drawPathplotElements(document.getElementById(this.partDivID+"_PP_BG_l2").getContext("2d"), 1, 2,true,this.mouseAboveKeyID,this.mouseGrappedColorSide);

    this.pp_ElementGroup=drawPathplot3DElements(this.pp_ElementGroup,this.mouseAboveKeyID,this.mouseGrappedColorSide);
  }

  pp_drawOthers(calcBackground, drawInterpolationLine, initVplot) {

    if (initVplot)
      this.pp_init_VPlot();

    if (calcBackground)
      this.pp_hueInit();

    if (drawInterpolationLine)
      this.pp_other_interpolationLine();

    this.pp_other_drawElements();
  }

  pp_hueInit() {
      this.pathplot_hueRes= document.getElementById(this.partDivID+"_PP_Hue_l0").getBoundingClientRect().height;
      setSquadRes_Canvas(this.partDivID+"_PP_Hue_l0");
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
          drawHSVBackground(document.getElementById(this.partDivID+"_PP_Hue_l0").getContext("2d"),fixedColor);
          break;
          case "lab":
            drawLabBackground(document.getElementById(this.partDivID+"_PP_Hue_l0").getContext("2d"),fixedColor);
            break;
            case "din99":
              drawDIN99Background(document.getElementById(this.partDivID+"_PP_Hue_l0").getContext("2d"),fixedColor);
              break;
              case "lch":
                drawLCHBackground(document.getElementById(this.partDivID+"_PP_Hue_l0").getContext("2d"),fixedColor);
                break;
      }

      if(fixedColor!=undefined){
        fixedColor.deleteReferences();
        fixedColor=null;
      }
  }

  pp_init_VPlot() {
    var canvasObj0 = document.getElementById(this.partDivID+"_PP_C1_l0");
    var box = canvasObj0.getBoundingClientRect();
    this.vPlotWidth = box.width;
    this.vPlotHeight = box.height;
    canvasObj0.width = this.vPlotWidth;
    canvasObj0.height = this.vPlotHeight;

    var canvasObj1 = document.getElementById(this.partDivID+"_PP_C2_l0");
    canvasObj1.width = this.vPlotWidth;
    canvasObj1.height = this.vPlotHeight;

    var canvasObj2 = document.getElementById(this.partDivID+"_PP_C3_l0");
    canvasObj2.width = this.vPlotWidth;
    canvasObj2.height = this.vPlotHeight;

    switch (this.pathplot_space) {
    case "hsv":
      drawVPlot(this.getParentCMS(),canvasObj0.getContext("2d"),0,360, "H");
      drawVPlot(this.getParentCMS(),canvasObj1.getContext("2d"),0,100, "S");
      drawVPlot(this.getParentCMS(),canvasObj2.getContext("2d"),0,100, "V");
     break;
    case "lab":
      drawVPlot(this.getParentCMS(),canvasObj0.getContext("2d"),0,100, "L");
      drawVPlot(this.getParentCMS(),canvasObj1.getContext("2d"),labSpaceRange*-1,labSpaceRange, "A");
      drawVPlot(this.getParentCMS(),canvasObj2.getContext("2d"),labSpaceRange*-1,labSpaceRange, "B");
      break;
    case "din99":
      drawVPlot(this.getParentCMS(),canvasObj0.getContext("2d"),0,100, "L99");
      drawVPlot(this.getParentCMS(),canvasObj1.getContext("2d"),rangeA99Neg,rangeA99Pos, "A99");
      drawVPlot(this.getParentCMS(),canvasObj2.getContext("2d"),rangeB99Neg,rangeB99Pos, "B99");
      break;
    case "lch":
      drawVPlot(this.getParentCMS(),canvasObj0.getContext("2d"),0,100, "L");
      drawVPlot(this.getParentCMS(),canvasObj1.getContext("2d"),0,100, "C");
      drawVPlot(this.getParentCMS(),canvasObj2.getContext("2d"),0,360, "H");
     break;
    }
  }

  pp_other_interpolationLine() {

    var canvasObj0 = document.getElementById(this.partDivID+"_PP_C1_l1");
    canvasObj0.width = this.vPlotWidth;
    canvasObj0.height = this.vPlotHeight;

    var canvasObj1 = document.getElementById(this.partDivID+"_PP_C2_l1");
    canvasObj1.width = this.vPlotWidth;
    canvasObj1.height = this.vPlotHeight;

    var canvasObj2 = document.getElementById(this.partDivID+"_PP_C3_l1");
    canvasObj2.width = this.vPlotWidth;
    canvasObj2.height = this.vPlotHeight;

    var canvasObj3 = document.getElementById(this.partDivID+"_PP_Hue_l1");
    canvasObj3.width = this.pathplot_hueRes;
    canvasObj3.height = this.pathplot_hueRes;

    /////////////////////////////////////////////////////////////////

    switch (this.pathplot_space) {
      case "hsv":
        calcInterpolationLine_HSV(this.getParentCMS(),this.pathplot_hueRes,this.vPlotWidth,this.vPlotHeight);
        break;
        case "lab":
          calcInterpolationLine_Lab(this.getParentCMS(),this.pathplot_hueRes,this.vPlotWidth,this.vPlotHeight);
          break;
          case "din99":
            calcInterpolationLine_DIN99(this.getParentCMS(),this.pathplot_hueRes,this.vPlotWidth,this.vPlotHeight);
            break;
            case "lch":
              calcInterpolationLine_LCH(this.getParentCMS(),this.pathplot_hueRes,this.vPlotWidth,this.vPlotHeight);
              break;
      default:
        return;

    }
    drawInterpolationLine(canvasObj3.getContext("2d"),0, 1, false);

    drawInterpolationLine_VPlot(canvasObj0.getContext("2d"), 0);
    drawInterpolationLine_VPlot(canvasObj1.getContext("2d"), 1);
    drawInterpolationLine_VPlot(canvasObj2.getContext("2d"), 2);

    this.pp_LineGroup=draw3DInterpolationLine(this.pp_LineGroup);
  }

  pp_other_drawElements() {

    var canvasObj0 = document.getElementById(this.partDivID+"_PP_C1_l2");
    canvasObj0.width = this.vPlotWidth;
    canvasObj0.height = this.vPlotHeight;

    var canvasObj1 = document.getElementById(this.partDivID+"_PP_C2_l2");
    canvasObj1.width = this.vPlotWidth;
    canvasObj1.height = this.vPlotHeight;

    var canvasObj2 = document.getElementById(this.partDivID+"_PP_C3_l2");
    canvasObj2.width = this.vPlotWidth;
    canvasObj2.height = this.vPlotHeight;

    var canvasObj3 = document.getElementById(this.partDivID+"_PP_Hue_l2");
    canvasObj3.width = this.pathplot_hueRes;
    canvasObj3.height = this.pathplot_hueRes;

    /////////////////////////////////////////////////////////////////

    switch (this.pathplot_space) {
      case "hsv":
        calcHSVElements(this.getParentCMS(),this.pathplot_hueRes,this.vPlotWidth,this.vPlotHeight);
        break;
        case "lab":
          calcLabElements(this.getParentCMS(),this.pathplot_hueRes,this.vPlotWidth,this.vPlotHeight);
          break;
          case "din99":
            calcDIN99Elements(this.getParentCMS(),this.pathplot_hueRes,this.vPlotWidth,this.vPlotHeight);
            break;
            case "lch":
              calcLCHElements(this.getParentCMS(),this.pathplot_hueRes,this.vPlotWidth,this.vPlotHeight);
              break;
      default:
        return;

    }

    drawPathplotElements(canvasObj3.getContext("2d"),0,1, false,this.mouseAboveKeyID,this.mouseGrappedColorSide);

    drawVplotElements(canvasObj0.getContext("2d"),0,this.mouseAboveKeyID,this.mouseGrappedColorSide);
    drawVplotElements(canvasObj1.getContext("2d"),1,this.mouseAboveKeyID,this.mouseGrappedColorSide);
    drawVplotElements(canvasObj2.getContext("2d"),2,this.mouseAboveKeyID,this.mouseGrappedColorSide);

    this.pp_ElementGroup=drawPathplot3DElements(this.pp_ElementGroup,this.mouseAboveKeyID,this.mouseGrappedColorSide);

  }
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
    /*if(this.pp_renderer == undefined){
      this.pp_3D_init();
    }
    else{*/
      var canvasObj = document.getElementById(this.partDivID+"_PP_3D");

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
    //}
  }

  pp_3D_init(){
    var canvasObj = document.getElementById(this.partDivID+"_PP_3D");

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
    if(editSection.isSectionOpen()){
      if(editSection.part_Pathplot.pp_doAnimation){
        editSection.part_Pathplot.pp_animationID = requestAnimationFrame(editSection.part_Pathplot.pp_3D_Animation);
        editSection.part_Pathplot.pp_3D_Render();
      }
    }
    else if(optiSection.isSectionOpen()){
      if(optiSection.part_Pathplot.pp_doAnimation){
        optiSection.part_Pathplot.pp_animationID = requestAnimationFrame(optiSection.part_Pathplot.pp_3D_Animation);
        optiSection.part_Pathplot.pp_3D_Render();
      }
    }
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
