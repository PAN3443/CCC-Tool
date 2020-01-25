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
    this.pp_CanvasMode = undefined;
    this.circleRad = undefined;
    this.bigcircleRad = undefined;
    this.pp_canvas_xStart = undefined;
    this.pp_canvas_yStart = undefined;
    this.pp_canvas_xWidth = undefined;
    this.pp_canvas_yHeight = undefined;
    this.pp_currentColor = undefined;
    this.pp_isVPlot =false;

    // PathPlot 3D
    this.pp_doAnimation = false;
    this.pp_animationID = undefined;

    this.pp_camera = undefined;
    this.pp_camera_maxRadius=1500;
    this.pp_camera_minRadius=10;
    this.pp_zoomFactor=20;
    this.pp_scene = undefined;
    this.pp_renderer = undefined;
    this.pp_colorspaceGroup = new THREE.Group();
    this.pp_LineGroup = new THREE.Group();
    this.pp_ElementGroup = new THREE.Group();

    // Pachplot 3D::Event Var
    this.pp_doRotation = false;
    this.pp_doTranslation = false;
    this.mousePosX =0;
    this.mousePosY =0;
    this.translationBorder = 200;

    this.pp_3D_init();
    this.updatePathPlotSpace(this.pathplot_space); // produce RGB Mesh
  }

  updatePart(doBackground,doInterpolationline, initVPlot){
    if(!super.updatePart())
      return;

    this.pp_WorkCMS
    if(this.pathplot_space==="rgb")
      this.pp_drawRGB(doBackground, doInterpolationline);
    else
      this.pp_drawOthers(doBackground, doInterpolationline, initVPlot);
  }

  resize(){
    var container = document.getElementById(this.partDivID);
    this.partIsReady=false;
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
          tmpDiv.style.borderRight="0.2vw solid black";
          tmpDiv.style.borderBottom="0.2vh solid black";
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
          tmpDiv.style.borderRight="0.2vw solid black";
          tmpDiv.style.borderBottom="0.2vh solid black";
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
          tmpDiv.style.borderRight="0.2vw solid black";
          tmpDiv.style.borderBottom="0.2vh solid black";
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
          tmpDiv.style.borderRight="0.2vw solid black";
tmpDiv.style.borderBottom="0.2vh solid black";
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
          tmpDiv.style.borderRight="0.2vw solid black";
tmpDiv.style.borderBottom="0.2vh solid black";
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
          tmpDiv.style.borderRight="0.2vw solid black";
tmpDiv.style.borderBottom="0.2vh solid black";
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
    this.partIsReady=true;
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
    tmpDiv.addEventListener("wheel", pp_3D_mousewheel);
    tmpDiv.oncontextmenu=function(){return false;};
    return tmpDiv;
  }

  createTripleLayerCanvasDiv(height_VH, width_VW, isSquad, id){
    var tmpDiv = document.createElement('div');
    tmpDiv.id = id;
    tmpDiv.style.width=width_VW+"vw";
    tmpDiv.style.height=height_VH+"vh";
    if(isSquad){
      tmpDiv.style.maxHeight=width_VW+"vw";
      tmpDiv.style.maxWidth=height_VH+"vh";
    }
    tmpDiv.style.margin="auto";
    tmpDiv.style.position="relative";
    //tmpDiv.style.background="rgb(10,10,20)";

    tmpDiv.addEventListener("mousemove", pp_2D_mouseMove);
    tmpDiv.addEventListener("mouseleave", pp_2D_mouseLeave);
    tmpDiv.addEventListener("mouseenter", pp_2D_mouseEnter);
    tmpDiv.addEventListener("mousedown", pp_2D_mouseDown);
    tmpDiv.addEventListener("mouseup", pp_2D_mouseUp);

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

  pp_setCanvasMode(id){
    this.pp_isVPlot =false;
    this.pp_CanvasMode = id.slice(-2);
    this.circleRad=Math.round(this.pathplot_hueRes*0.015);
    this.bigcircleRad=Math.round(this.pathplot_hueRes*0.03);

    if(this.pathplot_space=="rgb"){
      this.pp_canvas_xStart = this.pathplot_hueRes*0.1;
      this.pp_canvas_yStart = this.pathplot_hueRes*0.9;
      var pp_canvas_xEnd = this.pathplot_hueRes*0.8;
      var pp_canvas_yEnd = this.pathplot_hueRes*0.2;
      this.pp_canvas_xWidth = pp_canvas_xEnd-this.pp_canvas_xStart;
      this.pp_canvas_yHeight =this.pp_canvas_yStart-pp_canvas_yEnd;

      /*console.log("pp_canvas_xStart",this.pp_canvas_xStart);
      console.log("pp_canvas_yStart",this.pp_canvas_yStart);
      console.log("pp_canvas_xWidth",this.pp_canvas_xWidth);
      console.log("pp_canvas_yHeight",this.pp_canvas_yHeight);
      console.log("------------------");*/
    }
    else {
      switch (this.pp_CanvasMode) {
        case "ue":

        break;
        default:
          this.pp_isVPlot =true;
          this.circleRad = Math.round(this.vPlotHeight*0.03);
          this.bigcircleRad = Math.round(this.vPlotHeight*0.06);

          this.pp_canvas_xStart = this.vPlotWidth*0.1;
          var pp_canvas_xEnd = this.vPlotWidth*0.98;
          this.pp_canvas_xWidth = pp_canvas_xEnd-this.pp_canvas_xStart;

          this.pp_canvas_yStart = this.vPlotHeight*0.9;
          var pp_canvas_yEnd = this.vPlotHeight*0.1;
          this.pp_canvas_yHeight =this.pp_canvas_yStart-pp_canvas_yEnd;
        }
    }
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
        var tmpCMS = this.getParentCMS();
        switch (this.mouseGrappedColorSide) {
          case 0:
          // left color
            fixedColor = tmpCMS.getLeftKeyColor(this.mouseGrappedKeyID, this.pathplot_space);
            break;
          default:
            // both colors
            fixedColor = tmpCMS.getRightKeyColor(this.mouseGrappedKeyID, this.pathplot_space);
        }
        tmpCMS.deleteReferences();
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

  pp_mouseMove(id,mousePosX,mousePosY){
    if(this.pp_CanvasMode == undefined)
      return;

    this.mousePosX =mousePosX;
    this.mousePosY =mousePosY;

    if(this.mouseGrappedKeyID==-1){
      var tmpCMS = this.getParentCMS();
      document.getElementById(id).style.cursor = "default";
      var oldmouseAboveKeyID = this.mouseAboveKeyID;
      var found = false;

      for (var i = 0; i < tmpCMS.getKeyLength(); i++) {

          var position = [-1,-1];
          // tmpX is only important for the VPlots
          var tmpX = this.pp_canvas_xStart+((tmpCMS.getRefPosition(i)-tmpCMS.getRefPosition(0))/tmpCMS.getRefRange())*this.pp_canvas_xWidth;

          switch (tmpCMS.getKeyType(i)) {
            case "nil key":
              // do nothing
              break;
            case "twin key":

            ////////////////////////////////////////////////////////////////
            /////// Right Color
            var tmpColor2 = tmpCMS.getRightKeyColor(i, this.pathplot_space);
            position =  this.getColorPosInCanvas(tmpColor2);
            if(this.pp_isVPlot)
              position[0]=tmpX;
            if(this.pp_checkPosition(position[0], position[1], i, 1, drawCircle)){
                found = true;
                tmpColor2.deleteReferences();
                tmpColor2=null;
                break;
            }

            ////////////////////////////////////////////////////////////////
            /////// left Color
              var tmpColor = tmpCMS.getLeftKeyColor(i, this.pathplot_space);
              var drawCircle = true;
              if (tmpCMS.getKeyType(i-1) === "nil key" || tmpCMS.getKeyType(i-1) === "left key")
                drawCircle = false;

              position =  this.getColorPosInCanvas(tmpColor);
              if(this.pp_isVPlot)
                position[0]=tmpX;
              if(this.pp_checkPosition(position[0], position[1], i, 0, drawCircle)){
                  found = true;
                  tmpColor.deleteReferences();
                  tmpColor=null;
                  tmpColor2.deleteReferences();
                  tmpColor2=null;
                  break;
              }

              // because we draw constant bands with two rects in the VPlots
              if(this.pp_isVPlot && !drawCircle){
                tmpX = this.pp_canvas_xStart+((tmpCMS.getRefPosition(i-1)-tmpCMS.getRefPosition(0))/tmpCMS.getRefRange())*this.pp_canvas_xWidth;
                if(this.checkInsideRect(tmpX, position[1], i, 0)){
                    found = true;
                    tmpColor.deleteReferences();
                    tmpColor=null;
                    tmpColor2.deleteReferences();
                    tmpColor2=null;
                    break;
                }
              }

              tmpColor.deleteReferences();
              tmpColor=null;
              tmpColor2.deleteReferences();
              tmpColor2=null;
              break;
            case "left key":
              var drawCircle = true;
              if (tmpCMS.getKeyType(i-1) === "nil key" || tmpCMS.getKeyType(i-1) === "left key")
                drawCircle = false;
              ////////////////////////////////////////////////////////////////
              /////// left Color
              var tmpColor = tmpCMS.getLeftKeyColor(i, this.pathplot_space);
              position =  this.getColorPosInCanvas(tmpColor);
              if(this.pp_isVPlot)
                position[0]=tmpX;
              if(this.pp_checkPosition(position[0], position[1], i, 0, drawCircle)){
                  found = true;
                  tmpColor.deleteReferences();
                  tmpColor=null;
                  break;
              }


              // because we draw constant bands with two rects in the VPlots
              if(this.pp_isVPlot && !drawCircle){
                tmpX = this.pp_canvas_xStart+((tmpCMS.getRefPosition(i-1)-tmpCMS.getRefPosition(0))/tmpCMS.getRefRange())*this.pp_canvas_xWidth;
                if(this.checkInsideRect(tmpX, position[1], i, 0)){
                    found = true;
                    tmpColor.deleteReferences();
                    tmpColor=null;
                    break;
                }
              }

              tmpColor.deleteReferences();
              tmpColor=null;
              ////////////////////////////////////////////////////////
              ///// Right Color
              // do nothing
              break;

              case "right key":
              var tmpColor = tmpCMS.getRightKeyColor(i, this.pathplot_space); // right color because of right key
              position =  this.getColorPosInCanvas(tmpColor);
              if(this.pp_isVPlot)
                position[0]=tmpX;
              if(this.pp_checkPosition(position[0], position[1], i, 1, true)){
                  found = true;
                  tmpColor.deleteReferences();
                  tmpColor=null;
                  break;
              }
              tmpColor.deleteReferences();
              tmpColor=null;
              break;
            default:
              // dual Key
              tmpColor = tmpCMS.getRightKeyColor(i, this.pathplot_space); // right color because of right key
              position = this.getColorPosInCanvas(tmpColor);
              if(this.pp_isVPlot)
                position[0]=tmpX;
              if(this.pp_checkPosition(position[0], position[1], i, 2, true)){
                  found = true;
                  tmpColor.deleteReferences();
                  tmpColor=null;
                  break;
              }
              tmpColor.deleteReferences();
              tmpColor=null;
          }

          if(found){
            document.getElementById(id).style.cursor = "pointer";
            if(this.mouseGrappedColorSide==0){
              this.pp_currentColor=tmpCMS.getLeftKeyColor(this.mouseAboveKeyID, this.pathplot_space);
              this.update_CoordID();
            }
            else{
              this.pp_currentColor=tmpCMS.getRightKeyColor(this.mouseAboveKeyID, this.pathplot_space);
              this.update_CoordID();
            }
            break;
          }
      }

      if(!found){
        this.pp_currentColor=undefined;
        this.update_CoordID();
      }

      tmpCMS.deleteReferences();

      /*if(oldmouseAboveKeyID!=this.mouseAboveKeyID)
        this.updatePart(false,false,false);//*/

    } ///// END: if (mouseGrappedKeyID==-1)
    else{
      /// Determine new Color
      var newColor = this.pp_determinMouseColor();
      if(newColor==undefined)
        return;

      this.pp_currentColor.deleteReferences();
      this.pp_currentColor = newColor;
      this.update_CoordID()

      switch (this.parentID) {
        case "id_EditPage":
          switch (this.mouseGrappedColorSide) {
            case 0:
            // left color
              editSection.editCMS.setLeftKeyColor(this.mouseGrappedKeyID, cloneColor(this.pp_currentColor));
              break;
            case 1:
              // right color
              editSection.editCMS.setRightKeyColor(this.mouseGrappedKeyID, cloneColor(this.pp_currentColor));
              break;
            case 2:
              // both colors
              editSection.editCMS.setLeftKeyColor(this.mouseGrappedKeyID, cloneColor(this.pp_currentColor));
              editSection.editCMS.setRightKeyColor(this.mouseGrappedKeyID, cloneColor(this.pp_currentColor));
              break;
          }
        break;
        case "id_OptimizationPage":
          switch (this.mouseGrappedColorSide) {
            case 0:
            // left color
              optiSection.editCMS.setLeftKeyColor(this.mouseGrappedKeyID, cloneColor(this.pp_currentColor));
              break;
            case 1:
              // right color
              optiSection.editCMS.setRightKeyColor(this.mouseGrappedKeyID, cloneColor(this.pp_currentColor));
              break;
            case 2:
              // both colors
              optiSection.editCMS.setLeftKeyColor(this.mouseGrappedKeyID, cloneColor(this.pp_currentColor));
              optiSection.editCMS.setRightKeyColor(this.mouseGrappedKeyID, cloneColor(this.pp_currentColor));
              break;
          }
        break;
      }

    } ///// END: else => (mouseGrappedKeyID!=-1)


  }

  pp_checkPosition(centerPosX, centerPosY, i, colorside, isCircle){

    if(isCircle)
      return this.checkInsideCirce(centerPosX, centerPosY, i, colorside);
    else
      return this.checkInsideRect(centerPosX, centerPosY, i, colorside);
  }

  checkInsideRect(centerPosX, centerPosY, i, colorside) {
    if (this.mouseAboveKeyID == i) {
      if (this.mousePosX < centerPosX - this.bigcircleRad ||
        this.mousePosX > centerPosX + this.bigcircleRad ||
        this.mousePosY < centerPosY - this.bigcircleRad ||
        this.mousePosY > centerPosY + this.bigcircleRad) {
        this.mouseAboveKeyID = -1;
        this.mouseGrappedColorSide=-1;
          //drawcolormap_hueSpace(false,false,false);
        return false;
      } else {
        return true;
      }

    } else {
      if (this.mousePosX >= centerPosX - this.circleRad &&
        this.mousePosX <= centerPosX + this.circleRad &&
        this.mousePosY >= centerPosY - this.circleRad &&
        this.mousePosY <= centerPosY + this.circleRad) {
        this.mouseAboveKeyID = i;
        this.mouseGrappedColorSide=colorside;
          //drawcolormap_hueSpace(false,false,false);
        return true;
      } else {
        this.mouseAboveKeyID = -1;
        this.mouseGrappedColorSide=-1;
        return false;
      }
    }
  }

  checkInsideCirce(centerPosX, centerPosY, i, colorside){

    var dis = Math.sqrt(Math.pow(centerPosX - this.mousePosX, 2) + Math.pow(centerPosY - this.mousePosY, 2));

    if (this.mouseAboveKeyID == i) {
      // Circle -> Part of Scaled Band
      if (dis > this.bigcircleRad) {
        this.mouseAboveKeyID = -1;
          //drawcolormap_hueSpace(false,false,false);
        return false;
      } else {
        return true;
      }
    } else {

      if (dis <= this.circleRad) {
        this.mouseAboveKeyID = i;
        this.mouseGrappedColorSide=colorside;
          //drawcolormap_hueSpace(false,false,false);
        return true;
      } else {
        return false;
      }
    }

  }

  getColorPosInCanvas(tmpColor){
    var position = [-1,-1];
    if(this.pathplot_space=="rgb"){
      switch (this.pp_CanvasMode) {
        case "RG":
        position[0] = tmpColor.getGValue() * this.pp_canvas_xWidth + this.pp_canvas_xStart;
        position[1] = this.pp_canvas_yStart - tmpColor.getRValue() * this.pp_canvas_yHeight;
        break;
        case "RB":
        position[0] = tmpColor.getBValue() * this.pp_canvas_xWidth + this.pp_canvas_xStart;
        position[1] = this.pp_canvas_yStart - tmpColor.getRValue() * this.pp_canvas_yHeight;
        break;
        case "BG":
        position[0] = tmpColor.getGValue() * this.pp_canvas_xWidth + this.pp_canvas_xStart;
        position[1] = this.pp_canvas_yStart - tmpColor.getBValue() * this.pp_canvas_yHeight;
        break;
        }
    }
    else {
      switch (this.pp_CanvasMode) {
        case "ue":
        var colorspaceCenterX = Math.round(this.pathplot_hueRes / 2);
        var colorspaceCenterY = Math.round(this.pathplot_hueRes / 2);
        switch (this.pathplot_space) {
            case "hsv":
              var colorspaceRadius =  Math.round((this.pathplot_hueRes*0.95 / 2));
              var tmpDis = tmpColor.getSValue() * colorspaceRadius;
              var tmpRad = degree360ToRad(tmpColor.getHValue()*360);
              position[0] = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
              position[1] = this.pathplot_hueRes-(tmpDis * Math.sin(tmpRad) + colorspaceCenterY);
            break;
            case "lab":
              position[0] = ((tmpColor.getAValue() / labSpaceRange) * this.pathplot_hueRes / 2) + colorspaceCenterX;
              position[1] = this.pathplot_hueRes-(((tmpColor.getBValue() / labSpaceRange) * this.pathplot_hueRes / 2) + colorspaceCenterY);
            break;
            case "din99":
              position[0] = (tmpColor.getA99Value() - rangeA99Neg) / rangeA99 * this.pathplot_hueRes;
              position[1] = this.pathplot_hueRes-((tmpColor.getB99Value() - rangeB99Neg) / rangeB99 * this.pathplot_hueRes);
            break;
            case "lch":
              var colorspaceRadius =  Math.round((this.pathplot_hueRes*0.95 / 2));
              var tmpDis = tmpColor.getCValue() * colorspaceRadius;
              var tmpRad = degree360ToRad(tmpColor.getHValue()*360);
              position[0] = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
              position[1] = this.pathplot_hueRes-(tmpDis * Math.sin(tmpRad) + colorspaceCenterY);
            break;
              default:
                console.log("Error at the changeColorspace function");
                return;
            }
        break;
        default:
          var relevantComponent=undefined;
          var factor =1;
          switch (this.pp_CanvasMode) {
            case "C1":
              relevantComponent=tmpColor.get1Value();
              if(this.pathplot_space=="lab" || this.pathplot_space=="din99")
                factor=100;
            break;
            case "C2":
              switch (this.pathplot_space) {
                case "lab":
                  relevantComponent=(tmpColor.getAValue()+labSpaceRange);
                  factor=(labSpaceRange*2);
                  break;
                case "din99":
                  relevantComponent=tmpColor.getA99Value()+(rangeA99Neg*-1);
                  factor=(rangeA99Pos-rangeA99Neg);
                  break;
                default:
                  relevantComponent=tmpColor.get2Value();
              }
            break;
            case "C3":
            switch (this.pathplot_space) {
              case "lab":
                relevantComponent=(tmpColor.getBValue()+labSpaceRange);
                factor=(labSpaceRange*2);
                break;
              case "din99":
                relevantComponent=tmpColor.getB99Value()+(rangeB99Neg*-1);
                factor=(rangeB99Pos-rangeB99Neg);
                break;
              default:
                relevantComponent=tmpColor.get3Value();
            }
            break;
            default:
              return position;
          }
          position[1] = Math.round(this.pp_canvas_yStart - (this.pp_canvas_yHeight * relevantComponent)/factor);
        }
    }
    return position;
  }

  pp_determinMouseColor(){

    if(this.pathplot_space=="rgb"){
      var val1 = parseInt((this.mousePosX-this.pp_canvas_xStart)/this.pp_canvas_xWidth*255)/255;
      var val2 = parseInt((this.pp_canvas_yStart-this.mousePosY)/this.pp_canvas_yHeight*255)/255;
      switch (this.pp_CanvasMode) {
        case "RG":
          return new class_Color_RGB(val2,val1,this.pp_currentColor.get3Value());
        break;
        case "RB":
          return new class_Color_RGB(val2,this.pp_currentColor.get2Value(),val1);
        break;
        case "BG":
          return new class_Color_RGB(this.pp_currentColor.get1Value(),val1,val2);
        break;
        }
    }
    else {
      switch (this.pp_CanvasMode) {
        case "ue":
        var colorspaceCenterX = Math.round(this.pathplot_hueRes / 2);
        var colorspaceCenterY = Math.round(this.pathplot_hueRes / 2);
        switch (this.pathplot_space) {
            case "hsv":
              var colorspaceRadius =  Math.round((this.pathplot_hueRes*0.95 / 2));
              var dis = Math.sqrt(Math.pow(colorspaceCenterX - this.mousePosX, 2) + Math.pow(colorspaceCenterY - this.mousePosY, 2));
              if (dis <= colorspaceRadius) {
                //canvasObj.style.cursor = "pointer"; // crosshair
                var ty = colorspaceCenterY- this.mousePosY;
                var tx = this.mousePosX - colorspaceCenterX;
                var angle = atan2_360Degree(tx,ty); // values 0-1 ...
                var hVal = parseInt(angle)/360;
                var sVal = parseInt(dis / colorspaceRadius *100)/100;
                return new class_Color_HSV(hVal,sVal,this.pp_currentColor.get3Value());
              }
            break;
            case "lab":
              var aVal = parseInt(((this.mousePosX - colorspaceCenterX) / (this.pathplot_hueRes / 2)) * labSpaceRange);
              var bVal = parseInt(((colorspaceCenterY-this.mousePosY) / (this.pathplot_hueRes / 2)) * labSpaceRange);
              var tmpColor = new class_Color_LAB(this.pp_currentColor.get1Value(), aVal, bVal);
              var testColor = tmpColor.calcRGBColorCorrect(undefined);
              if (testColor == undefined)
                return undefined;
              testColor.deleteReferences();
              testColor=null;
              return tmpColor;
            break;
            case "din99":
            var a99Val = parseInt((this.mousePosX / this.pathplot_hueRes) * rangeA99 + rangeA99Neg);
            var b99Val = parseInt(((this.pathplot_hueRes-this.mousePosY) / this.pathplot_hueRes) * rangeB99 + rangeB99Neg);
            if (a99Val < rangeA99Neg || a99Val > rangeA99Pos || b99Val < rangeB99Neg || b99Val > rangeB99Pos)
              return undefined;
            var tmpColor = new class_Color_DIN99(this.pp_currentColor.get1Value(), a99Val, b99Val);
            var colorRGB = tmpColor.calcRGBColor();
            /*if(colorRGB.getRValue()==0 && colorRGB.getGValue()==0 && colorRGB.getBValue()==0)
              if(tmpColor.getL99Value()!=0 || tmpColor.getA99Value() !=0 || tmpColor.getB99Value()!=0)
                return undefined;*/
                var testColor = tmpColor.calcRGBColorCorrect(undefined);
                if (testColor == undefined)
                  return undefined;
                testColor.deleteReferences();
                testColor=null;
              return tmpColor;
            break;
            case "lch":
              var colorspaceRadius =  Math.round((this.pathplot_hueRes*0.95 / 2));
              var dis = Math.sqrt(Math.pow(colorspaceCenterX - this.mousePosX, 2) + Math.pow(colorspaceCenterY - this.mousePosY, 2));
              if (dis <= colorspaceRadius) {
                var ty = colorspaceCenterY-this.mousePosY;
                var tx = this.mousePosX - colorspaceCenterX;
                var angle = atan2_360Degree(tx,ty); // values 0-1 ...
                var hVal = parseInt(angle)/360;
                var cVal = parseInt(dis / colorspaceRadius * 100)/100;
                var tmpColor = new class_Color_LCH(this.pp_currentColor.get1Value(), cVal,hVal);
                var testColor = tmpColor.calcRGBColorCorrect(undefined);
                if (testColor == undefined)
                  return undefined;
                testColor.deleteReferences();
                testColor=null;
                return tmpColor;
              }
            break;
              default:
                return undefined;
            }
        break;
        default:
          var relevantComponent=undefined;
          var newValue = (this.pp_canvas_yStart - this.mousePosY) / this.pp_canvas_yHeight;
          if (newValue < 0 && newValue > 1.0)
            return undefined;
          switch (this.pp_CanvasMode) {
            case "C1":
            switch (this.pathplot_space) {
                case "hsv":
                  return new class_Color_HSV(parseInt(newValue*360)/360,this.pp_currentColor.get2Value(),this.pp_currentColor.get3Value());
                break;
                case "lab":
                  var tmpColor = new class_Color_LAB(parseInt(newValue*100),this.pp_currentColor.get2Value(),this.pp_currentColor.get3Value());
                  var testColor = tmpColor.calcRGBColorCorrect(undefined);
                  if (testColor == undefined)
                    return undefined;
                  testColor.deleteReferences();
                  testColor=null;
                  return tmpColor;
                break;
                case "din99":
                  var tmpColor = new class_Color_DIN99(parseInt(newValue*100),this.pp_currentColor.get2Value(),this.pp_currentColor.get3Value());
                  var testColor = tmpColor.calcRGBColorCorrect(undefined);
                  if (testColor == undefined)
                    return undefined;
                  testColor.deleteReferences();
                  testColor=null;
                  return tmpColor;
                break;
                case "lch":
                  var tmpColor = new class_Color_LCH(parseInt(newValue*100)/100,this.pp_currentColor.get2Value(),this.pp_currentColor.get3Value());
                  var testColor = tmpColor.calcRGBColorCorrect(undefined);
                  if (testColor == undefined)
                    return undefined;
                  testColor.deleteReferences();
                  testColor=null;
                  return tmpColor;
                break;
                  default:
                    return undefined;
                }
            break;
            case "C2":
            switch (this.pathplot_space) {
                case "hsv":
                  return new class_Color_HSV(this.pp_currentColor.get1Value(),parseInt(newValue*100)/100,this.pp_currentColor.get3Value());
                break;
                case "lab":
                  var tmpColor = new class_Color_LAB(this.pp_currentColor.get1Value(),parseInt(newValue*(labSpaceRange*2)+(labSpaceRange*-1)),this.pp_currentColor.get3Value());
                  var testColor = tmpColor.calcRGBColorCorrect(undefined);
                  if (testColor == undefined)
                    return undefined;
                  testColor.deleteReferences();
                  testColor=null;
                  return tmpColor;
                break;
                case "din99":
                  var tmpColor = new class_Color_DIN99(this.pp_currentColor.get1Value(),parseInt(newValue*(rangeA99Pos-rangeA99Neg)+(rangeA99Neg)),this.pp_currentColor.get3Value());
                  var testColor = tmpColor.calcRGBColorCorrect(undefined);
                  if (testColor == undefined)
                    return undefined;
                  testColor.deleteReferences();
                  testColor=null;
                  return tmpColor;
                break;
                case "lch":
                  var tmpColor = new class_Color_LCH(this.pp_currentColor.get1Value(),parseInt(newValue*100)/100,this.pp_currentColor.get3Value());
                  var testColor = tmpColor.calcRGBColorCorrect(undefined);
                  if (testColor == undefined)
                    return undefined;
                  testColor.deleteReferences();
                  testColor=null;
                  return tmpColor;
                break;
                  default:
                    return undefined;
                }
            break;
            case "C3":
            switch (this.pathplot_space) {
                case "hsv":
                  return new class_Color_HSV(this.pp_currentColor.get1Value(),this.pp_currentColor.get2Value(),parseInt(newValue*100)/100);
                break;
                case "lab":
                  var tmpColor = new class_Color_LAB(this.pp_currentColor.get1Value(),this.pp_currentColor.get2Value(),parseInt(newValue*(labSpaceRange*2)+(labSpaceRange*-1)));
                  var testColor = tmpColor.calcRGBColorCorrect(undefined);
                  if (testColor == undefined)
                    return undefined;
                  testColor.deleteReferences();
                  testColor=null;
                  return tmpColor;
                break;
                case "din99":
                  var tmpColor = new class_Color_DIN99(this.pp_currentColor.get1Value(),this.pp_currentColor.get2Value(),parseInt(newValue*(rangeB99Pos-rangeB99Neg)+(rangeB99Neg)));
                  var testColor = tmpColor.calcRGBColorCorrect(undefined);
                  if (testColor == undefined)
                    return undefined;
                  testColor.deleteReferences();
                  testColor=null;
                  return tmpColor;
                break;
                case "lch":
                  var tmpColor = new class_Color_LCH(this.pp_currentColor.get1Value(),this.pp_currentColor.get2Value(),parseInt(newValue*360)/360);
                  var testColor = tmpColor.calcRGBColorCorrect(undefined);
                  if (testColor == undefined)
                    return undefined;
                  testColor.deleteReferences();
                  testColor=null;
                  return tmpColor;
                break;
                  default:
                    return undefined;
                }
            break;
            default:
              return undefined;
          }




        }
    }
    return undefined;
  }

  update_CoordID(){
    if(this.pathPlot_CoordID==undefined)
      return

    if(this.pp_currentColor==undefined){
      document.getElementById(this.pathPlot_CoordID).innerHTML="";
      return;
    }

      var c1_name = "";
      var c1_val = 0;
      var c2_name = "";
      var c2_val = 0;
      var c3_name = "";
      var c3_val = 0;

        switch (this.pathplot_space) {
            case "rgb":
            c1_name = "R : ";
            c1_val = parseInt(this.pp_currentColor.get1Value()*255);
            c2_name = ",  G : ";
            c2_val = parseInt(this.pp_currentColor.get2Value()*255);
            c3_name = ",  B : ";
            c3_val = parseInt(this.pp_currentColor.get3Value()*255);
            break;
            case "hsv":
            c1_name = "H : ";
            c1_val = parseInt(this.pp_currentColor.get1Value()*360);
            c2_name = ",  S : ";
            c2_val = parseInt(this.pp_currentColor.get2Value()*100);
            c3_name = ",  V : ";
            c3_val = parseInt(this.pp_currentColor.get3Value()*100);
            break;
            case "lab":
            c1_name = "L : ";
            c1_val = parseInt(this.pp_currentColor.get1Value());
            c2_name = ",  A : ";
            c2_val = parseInt(this.pp_currentColor.get2Value());
            c3_name = ",  B : ";
            c3_val = parseInt(this.pp_currentColor.get3Value());
              break;
            case "din99":
            c1_name = "L99 : ";
            c1_val = parseInt(this.pp_currentColor.get1Value());
            c2_name = ",  A99 : ";
            c2_val = parseInt(this.pp_currentColor.get2Value());
            c3_name = ",  B99 : ";
            c3_val = parseInt(this.pp_currentColor.get3Value());
            break;
            case "lch":
            c1_name = "L : ";
            c1_val = parseInt(this.pp_currentColor.get1Value()*100);
            c2_name = ",  C : ";
            c2_val = parseInt(this.pp_currentColor.get2Value()*100);
            c3_name = ",  H : ";
            c3_val = parseInt(this.pp_currentColor.get3Value()*360);
            break;
            default:
              document.getElementById(this.pathPlot_CoordID).innerHTML="";
              return;
          }
          document.getElementById(this.pathPlot_CoordID).innerHTML=c1_name.bold()+c1_val+c2_name.bold()+c2_val+c3_name.bold()+c3_val;
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
  	this.pp_camera = new THREE.PerspectiveCamera(75,drawWidth /drawHeight, 0.1, 10000);//new THREE.Orthographicthis.pp_camera( 0.5 * drawWidth * 2 / - 2, 0.5 * drawWidth * 2 / 2, drawWidth / 2, drawWidth / - 2, 150, 1000 ); //new THREE.Perspectivethis.pp_camera(75,drawWidth /drawHeight, 0.1, 1000);
    this.pp_renderer.setSize(drawWidth,drawHeight);//(window.innerWidth, window.innerHeight);


    this.pp_camera.position.x = 0;
    this.pp_camera.position.y = 0;
  	this.pp_camera.position.z = this.pp_camera_minRadius+(this.pp_camera_maxRadius-this.pp_camera_minRadius)/2;


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
      this.pp_renderer.render( this.pp_scene, this.pp_camera );
  }

  pp_3D_Mousemove(mousePosX,mousePosY,rectWidth,rectHeight){

    if(this.pp_doRotation){

        var angle1 = ((mousePosX-this.mousePosX)/rectWidth) * 2*Math.PI;
        var angle2 = ((mousePosY-this.mousePosY)/rectHeight) * 2*Math.PI;

        var rotationQuaternion = new THREE.Quaternion()
              .setFromEuler(new THREE.Euler(
                  angle2,
                  angle1,
                  0,
                  'XYZ'
              ));

        this.mousePosX=mousePosX;
        this.mousePosY=mousePosY;

        this.pp_colorspaceGroup.quaternion.multiplyQuaternions(rotationQuaternion, this.pp_colorspaceGroup.quaternion);
        this.pp_LineGroup.quaternion.multiplyQuaternions(rotationQuaternion, this.pp_LineGroup.quaternion);
        this.pp_ElementGroup.quaternion.multiplyQuaternions(rotationQuaternion, this.pp_ElementGroup.quaternion);
    }
    else if(this.pp_doTranslation){

      var newXPos = this.pp_colorspaceGroup.position.x - (this.mousePosX-mousePosX)/rectWidth * this.pp_camera.position.z;
      var newYPos = this.pp_colorspaceGroup.position.y + (this.mousePosY-mousePosY)/rectHeight * this.pp_camera.position.z;

      if(newXPos>=-this.translationBorder && newXPos<=this.translationBorder){
        this.pp_colorspaceGroup.position.x = newXPos;
        this.pp_LineGroup.position.x = newXPos;
        this.pp_ElementGroup.position.x = newXPos;
      }

      if(newYPos>=-this.translationBorder && newYPos<=this.translationBorder){
        this.pp_colorspaceGroup.position.y = newYPos;
        this.pp_LineGroup.position.y = newYPos;
        this.pp_ElementGroup.position.y = newYPos;
      }

      this.mousePosX=mousePosX;
      this.mousePosY=mousePosY;
    }
    else{
      this.mousePosX=mousePosX;
      this.mousePosY=mousePosY;
    }

  }

  pp_3D_zoom(zoomIn){
    if(zoomIn){
      var newRadius=this.pp_camera.position.z-this.pp_zoomFactor;
      if(newRadius<this.pp_camera_minRadius)
      return;
      this.pp_camera.position.z=newRadius;
    }
    else{
      var newRadius=this.pp_camera.position.z+this.pp_zoomFactor;
      if(newRadius>this.pp_camera_maxRadius)
      return;
      this.pp_camera.position.z=newRadius;
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  ////////////                (End) Pathplot 3D                   ////////////
  ////////////////////////////////////////////////////////////////////////////



};
