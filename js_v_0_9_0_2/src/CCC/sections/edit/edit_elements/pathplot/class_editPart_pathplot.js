////////////////////////////
var gCMS_Pathplot = new class_CMS();

///////////////////////////////
class class_Edit_Part_Pathplot extends class_Edit_Part_Basis {

  constructor(divID,parentID) {
    super(divID,parentID);
    this.pathPlot_CoordID=undefined;

    // PathPlot
    this.pathPlot_Height_VH=62;
    this.pathPlot_Width_VW=undefined;
    this.pathPlot_CoordID=undefined;
    this.pathplot_space = "hsv";

    this.pathplot_hueRes = 500;
    this.lineChart_Height = 500;
    this.lineChart_Width = 1500;

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
    this.pp_isLineChart =false;

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

    ///////////////////////////////////////////
    /// WORKER
    this.pathplot_worker_background = undefined;
    if (doWorker && window.Worker){
      this.pathplot_worker_background= new Worker("../../"+version_JS_FolderName+"/src/CCC/sections/edit/edit_elements/pathplot/worker/worker_pp_background.js"); //, { type: "module" });
      this.pathplot_worker_background.postMessage({'message':'init'});
      this.pathplot_worker_background.addEventListener('message', workerEvent_Draw_PP_Background, false);
    }

    this.pp_3D_init();
  }

  showPart(){
    if(super.showPart){
      this.changePathPlotSpace(); // produce RGB Mesh
    }
  }

  updatePart(doBackground,doInterpolationline, initLineChart){
    if(!super.updatePart())
      return;

      switch (this.pathplot_space) {
        case "rgb":
          this.pp_drawRGB(doBackground, doInterpolationline);
        break;
        case "rgb-line":
        case "lms":
          this.pp_drawRGBorLMS_LineChart(doInterpolationline, initLineChart);
        break;
        default:
          this.pp_drawOthers(doBackground, doInterpolationline, initLineChart);
      }
  }

  resize(){
    var container = document.getElementById(this.partDivID);
    this.partIsReady=false;
    if(container==undefined || container==null)
      return;

    var rect = container.getBoundingClientRect();
    var ratio = rect.width/rect.height;
    document.getElementById(this.partDivID).innerHTML="";

    switch (this.pathplot_space) {
      case "rgb":
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
      break;
      case "rgb-line":
      case "lms":
        document.getElementById(this.partDivID).style.flexDirection="row";
        var tmpDiv = document.createElement('div');
        tmpDiv.style.height=this.pathPlot_Height_VH+"vh";
        tmpDiv.style.width=this.pathPlot_Width_VW*0.25+"vw";
        tmpDiv.style.borderRight="0.2vw solid black";
        tmpDiv.style.borderBottom="0.2vh solid black";
        tmpDiv.id=this.partDivID+"_PP_3D";
        tmpDiv=this.add_pp_3D_Events(tmpDiv);
        document.getElementById(this.partDivID).appendChild(tmpDiv);
        var tmpColumn = document.createElement('div');
        tmpColumn.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.75,false,this.partDivID+"_PP_C1"));
        tmpColumn.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.75,false,this.partDivID+"_PP_C2"));
        tmpColumn.appendChild(this.createTripleLayerCanvasDiv(this.pathPlot_Height_VH*0.33,this.pathPlot_Width_VW*0.75,false,this.partDivID+"_PP_C3"));
        document.getElementById(this.partDivID).appendChild(tmpColumn);
      break;
      default:
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

    this.pathplot_space=space;
    var tmpID = undefined;
    switch (true) {
      case editSection.isSectionOpen():
        tmpID="id_EditPage_SelectPathplotType";
      break;
      /*case optiSection.isSectionOpen():
        tmpID="id_OptiPage_SelectPathplotType";
      break;*/
      default:
          return;
    }

    for (var i = 0; i < document.getElementById(tmpID).options.length; i++) {
      if(document.getElementById(tmpID).options[i].value===space){
          document.getElementById(tmpID).selectedIndex = i;
          break;
      }
    }

    switch (this.pathplot_space) {
      case "rgb":
      case "rgb-line":
        this.pp_colorspaceGroup=rgbMesh(this.pp_colorspaceGroup);
      break;
      case "hsv":
        this.pp_colorspaceGroup=hsvMesh(this.pp_colorspaceGroup);
      break;
      case "lab":
        this.pp_colorspaceGroup=labMesh(this.pp_colorspaceGroup);
      break;
      case "din99":
        this.pp_colorspaceGroup=din99Mesh(this.pp_colorspaceGroup);
      break;
      case "lch":
        this.pp_colorspaceGroup=lchMesh(this.pp_colorspaceGroup);
      break;
      case "lms":
        this.pp_colorspaceGroup=lmsMesh(this.pp_colorspaceGroup);
      break;
      default:
        this.updatePathPlotSpace("lab")
        return;
    }

    this.resize();

  }

  changePathPlotSpace(){
    var tmpID = undefined;
    switch (true) {
      case editSection.isSectionOpen():
        this.pathplot_space=document.getElementById("id_EditPage_SelectPathplotType").options[document.getElementById("id_EditPage_SelectPathplotType").selectedIndex].value;
      break;
      case optiSection.isSectionOpen():
        this.pathplot_space=document.getElementById("id_OptiPage_SelectOptiSpace").options[document.getElementById("id_OptiPage_SelectOptiSpace").selectedIndex].value;
        if(this.pathplot_space==="de94-ds"||this.pathplot_space==="de2000-ds")
        this.pathplot_space="lab";
      break;
      default:
          return;
    }

    switch (this.pathplot_space) {
      case "rgb":
      case "rgb-line":
        this.pp_colorspaceGroup=rgbMesh(this.pp_colorspaceGroup);
      break;
      case "hsv":
        this.pp_colorspaceGroup=hsvMesh(this.pp_colorspaceGroup);
      break;
      case "lab":
        this.pp_colorspaceGroup=labMesh(this.pp_colorspaceGroup);
      break;
      case "din99":
        this.pp_colorspaceGroup=din99Mesh(this.pp_colorspaceGroup);
      break;
      case "lch":
        this.pp_colorspaceGroup=lchMesh(this.pp_colorspaceGroup);
      break;
      case "lms":
        this.pp_colorspaceGroup=lmsMesh(this.pp_colorspaceGroup);
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
    this.pp_isLineChart =false;
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
          this.pp_isLineChart =true;
          this.circleRad = Math.round(this.lineChart_Height*0.03);
          this.bigcircleRad = Math.round(this.lineChart_Height*0.06);

          this.pp_canvas_xStart = this.lineChart_Width*0.1;
          var pp_canvas_xEnd = this.lineChart_Width*0.98;
          this.pp_canvas_xWidth = pp_canvas_xEnd-this.pp_canvas_xStart;

          this.pp_canvas_yStart = this.lineChart_Height*0.9;
          var pp_canvas_yEnd = this.lineChart_Height*0.1;
          this.pp_canvas_yHeight =this.pp_canvas_yStart-pp_canvas_yEnd;
        }
    }
  }

  pp_rgb_background() {

    var fixedColor = undefined;
    if (this.mouseGrappedKeyID != -1) {
      gCMS_Pathplot.setCMSFromPackage(this.getParentCMS());
      switch (this.mouseGrappedColorSide) {
        case 0:
        // left color
          fixedColor = gCMS_Pathplot.getLeftKeyColor(this.mouseGrappedKeyID, "rgb");
          break;
        default:
          // both colors
          fixedColor = gCMS_Pathplot.getRightKeyColor(this.mouseGrappedKeyID, "rgb");
      }
    }

    if (doWorker && window.Worker){
      var workerJSON = {};
      workerJSON['message'] = "getBackground";
      workerJSON['pp_space'] = this.pathplot_space;
      workerJSON['hueResolution'] = this.pathplot_hueRes;
      workerJSON['canvasID_1'] = this.partDivID+"_PP_RG_l0";
      workerJSON['canvasID_2'] = this.partDivID+"_PP_RB_l0";
      workerJSON['canvasID_3'] = this.partDivID+"_PP_BG_l0";
      workerJSON['doColorblindnessSim'] = doColorblindnessSim;

      if(fixedColor==undefined){
        workerJSON['fixedValue1'] = undefined;
        workerJSON['fixedValue2'] = undefined;
        workerJSON['fixedValue3'] = undefined;
      }
      else {
        workerJSON['fixedValue1'] = fixedColor[1];
        workerJSON['fixedValue2'] = fixedColor[2];
        workerJSON['fixedValue3'] = fixedColor[3];
      }
      this.pathplot_worker_background.postMessage(workerJSON);
    }
    else {
      setSquadRes_Canvas(this.partDivID+"_PP_RG_l0"); // global -> helper -> canvasHelper
      setSquadRes_Canvas(this.partDivID+"_PP_RB_l0");
      setSquadRes_Canvas(this.partDivID+"_PP_BG_l0");
      drawRGBBackground(document.getElementById(this.partDivID+"_PP_RG_l0").getContext("2d"),document.getElementById(this.partDivID+"_PP_RB_l0").getContext("2d"),document.getElementById(this.partDivID+"_PP_BG_l0").getContext("2d"),fixedColor);
    }



  }

  pp_rgb_interpolationLine() {

    setSquadRes_Canvas(this.partDivID+"_PP_RG_l1"); // global -> helper -> canvasHelper
    setSquadRes_Canvas(this.partDivID+"_PP_RB_l1");
    setSquadRes_Canvas(this.partDivID+"_PP_BG_l1");

    calcRGBInterpolationLine(this.pathplot_hueRes);

    drawInterpolationLine(document.getElementById(this.partDivID+"_PP_RG_l1").getContext("2d"),1,0,true);
    drawInterpolationLine(document.getElementById(this.partDivID+"_PP_RB_l1").getContext("2d"),2,0,true);
    drawInterpolationLine(document.getElementById(this.partDivID+"_PP_BG_l1").getContext("2d"),1,2,true);

    this.pp_LineGroup=draw3DInterpolationLine(this.pp_LineGroup);

  }

  pp_rgb_drawElements(){

    setSquadRes_Canvas(this.partDivID+"_PP_RG_l2"); // global -> helper -> canvasHelper
    setSquadRes_Canvas(this.partDivID+"_PP_RB_l2");
    setSquadRes_Canvas(this.partDivID+"_PP_BG_l2");

    calcRGBElements(this.pathplot_hueRes);

    drawPathplotElements(document.getElementById(this.partDivID+"_PP_RG_l2").getContext("2d"), 1, 0,true,this.mouseAboveKeyID,this.mouseGrappedColorSide);
    drawPathplotElements(document.getElementById(this.partDivID+"_PP_RB_l2").getContext("2d"), 2, 0,true,this.mouseAboveKeyID,this.mouseGrappedColorSide);
    drawPathplotElements(document.getElementById(this.partDivID+"_PP_BG_l2").getContext("2d"), 1, 2,true,this.mouseAboveKeyID,this.mouseGrappedColorSide);

    this.pp_ElementGroup=drawPathplot3DElements(this.pp_ElementGroup,this.mouseAboveKeyID,this.mouseGrappedColorSide);
  }

  pp_drawRGBorLMS_LineChart(doInterpolationline, initLineChart){

    if (initLineChart)
      this.pp_init_LineChart();

    if (drawInterpolationLine)
      this.pp_rgblms_LineChart_interpolationLine();

    this.pp_rgblms_LineChart_drawElements();
  }

  pp_rgblms_LineChart_drawElements(){
    var canvasObj0 = document.getElementById(this.partDivID+"_PP_C1_l2");
    canvasObj0.width = this.lineChart_Width;
    canvasObj0.height = this.lineChart_Height;

    var canvasObj1 = document.getElementById(this.partDivID+"_PP_C2_l2");
    canvasObj1.width = this.lineChart_Width;
    canvasObj1.height = this.lineChart_Height;

    var canvasObj2 = document.getElementById(this.partDivID+"_PP_C3_l2");
    canvasObj2.width = this.lineChart_Width;
    canvasObj2.height = this.lineChart_Height;

    switch (this.pathplot_space) {
      case "rgb-line":
          calcRGBLineElements(this.lineChart_Width,this.lineChart_Height);
        break;
        case "lms":
          calcLMSElements(this.lineChart_Width,this.lineChart_Height);
          break;
      default:
        return;

    }

    drawLineChartElements(canvasObj0.getContext("2d"),0,this.mouseAboveKeyID,this.mouseGrappedColorSide);
    drawLineChartElements(canvasObj1.getContext("2d"),1,this.mouseAboveKeyID,this.mouseGrappedColorSide);
    drawLineChartElements(canvasObj2.getContext("2d"),2,this.mouseAboveKeyID,this.mouseGrappedColorSide);

    this.pp_ElementGroup=drawPathplot3DElements(this.pp_ElementGroup,this.mouseAboveKeyID,this.mouseGrappedColorSide);

  }

  pp_rgblms_LineChart_interpolationLine(){
    var canvasObj0 = document.getElementById(this.partDivID+"_PP_C1_l1");
    canvasObj0.width = this.lineChart_Width;
    canvasObj0.height = this.lineChart_Height;

    var canvasObj1 = document.getElementById(this.partDivID+"_PP_C2_l1");
    canvasObj1.width = this.lineChart_Width;
    canvasObj1.height = this.lineChart_Height;

    var canvasObj2 = document.getElementById(this.partDivID+"_PP_C3_l1");
    canvasObj2.width = this.lineChart_Width;
    canvasObj2.height = this.lineChart_Height;

    switch (this.pathplot_space) {
      case "rgb-line":
          calcInterpolationLine_RGBLine(this.lineChart_Width,this.lineChart_Height);
        break;
        case "lms":
          calcInterpolationLine_LMS(this.lineChart_Width,this.lineChart_Height);
          break;
      default:
        return;

    }

    drawInterpolationLine_LineChart(canvasObj0.getContext("2d"), 0);
    drawInterpolationLine_LineChart(canvasObj1.getContext("2d"), 1);
    drawInterpolationLine_LineChart(canvasObj2.getContext("2d"), 2);

    this.pp_LineGroup=draw3DInterpolationLine(this.pp_LineGroup);

  }

  pp_drawOthers(calcBackground, drawInterpolationLine, initLineChart) {


    if (initLineChart)
      this.pp_init_LineChart();

    if (calcBackground)
      this.pp_hueInit();


    if (drawInterpolationLine)
      this.pp_other_interpolationLine();

    this.pp_other_drawElements();
  }

  pp_hueInit() {
      this.pathplot_hueRes= document.getElementById(this.partDivID+"_PP_Hue_l0").getBoundingClientRect().height;

      var fixedColor = undefined;
      if (this.mouseGrappedKeyID != -1) {
        gCMS_Pathplot.setCMSFromPackage(this.getParentCMS());
        switch (this.mouseGrappedColorSide) {
          case 0:
          // left color
            fixedColor = gCMS_Pathplot.getLeftKeyColor(this.mouseGrappedKeyID, this.pathplot_space);
            break;
          default:
            // both colors
            fixedColor = gCMS_Pathplot.getRightKeyColor(this.mouseGrappedKeyID, this.pathplot_space);
        }
      }

      if (doWorker && window.Worker){
        var workerJSON = {};
        workerJSON['message'] = "getBackground";
        workerJSON['pp_space'] = this.pathplot_space;
        workerJSON['hueResolution'] = this.pathplot_hueRes;
        workerJSON['canvasID_1'] = this.partDivID+"_PP_Hue_l0";
        workerJSON['doColorblindnessSim'] = doColorblindnessSim;
        workerJSON['labSpaceRange'] = labSpaceRange;
        rangeA99 = rangeA99Pos - rangeA99Neg;
        rangeB99 = rangeB99Pos - rangeB99Neg;
        workerJSON['rangeA99'] = rangeA99;
        workerJSON['rangeA99Neg'] = rangeA99Neg;
        workerJSON['rangeB99'] = rangeB99;
        workerJSON['rangeB99Neg'] = rangeB99Neg;

        if(fixedColor==undefined){
          workerJSON['fixedValue1'] = undefined;
          workerJSON['fixedValue2'] = undefined;
          workerJSON['fixedValue3'] = undefined;
        }
        else {
          workerJSON['fixedValue1'] = fixedColor[1];
          workerJSON['fixedValue2'] = fixedColor[2];
          workerJSON['fixedValue3'] = fixedColor[3];
        }
        this.pathplot_worker_background.postMessage(workerJSON);
      }
      else {
        setSquadRes_Canvas(this.partDivID+"_PP_Hue_l0");

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
      }
  }

  pp_init_LineChart() {
    var canvasObj0 = document.getElementById(this.partDivID+"_PP_C1_l0");
    var box = canvasObj0.getBoundingClientRect();
    this.lineChart_Width = box.width;
    this.lineChart_Height = box.height;
    canvasObj0.width = this.lineChart_Width;
    canvasObj0.height = this.lineChart_Height;

    var canvasObj1 = document.getElementById(this.partDivID+"_PP_C2_l0");
    canvasObj1.width = this.lineChart_Width;
    canvasObj1.height = this.lineChart_Height;

    var canvasObj2 = document.getElementById(this.partDivID+"_PP_C3_l0");
    canvasObj2.width = this.lineChart_Width;
    canvasObj2.height = this.lineChart_Height;

    switch (this.pathplot_space) {
    case "rgb-line":
      draw_LineChart_Coordinates(canvasObj0.getContext("2d"),0,255, "R");
      draw_LineChart_Coordinates(canvasObj1.getContext("2d"),0,255, "G");
      draw_LineChart_Coordinates(canvasObj2.getContext("2d"),0,255, "B");
    break;
    case "lms":
      draw_LineChart_Coordinates(canvasObj0.getContext("2d"),0,100, "L");
      draw_LineChart_Coordinates(canvasObj1.getContext("2d"),0,100, "M");
      draw_LineChart_Coordinates(canvasObj2.getContext("2d"),0,100, "S");
    break;
    case "hsv":
      draw_LineChart_Coordinates(canvasObj0.getContext("2d"),0,360, "H");
      draw_LineChart_Coordinates(canvasObj1.getContext("2d"),0,100, "S");
      draw_LineChart_Coordinates(canvasObj2.getContext("2d"),0,100, "V");
     break;
    case "lab":
      draw_LineChart_Coordinates(canvasObj0.getContext("2d"),0,100, "L");
      draw_LineChart_Coordinates(canvasObj1.getContext("2d"),labSpaceRange*-1,labSpaceRange, "A");
      draw_LineChart_Coordinates(canvasObj2.getContext("2d"),labSpaceRange*-1,labSpaceRange, "B");
      break;
    case "din99":
      draw_LineChart_Coordinates(canvasObj0.getContext("2d"),0,100, "L99");
      draw_LineChart_Coordinates(canvasObj1.getContext("2d"),rangeA99Neg,rangeA99Pos, "A99");
      draw_LineChart_Coordinates(canvasObj2.getContext("2d"),rangeB99Neg,rangeB99Pos, "B99");
      break;
    case "lch":
      draw_LineChart_Coordinates(canvasObj0.getContext("2d"),0,100, "L");
      draw_LineChart_Coordinates(canvasObj1.getContext("2d"),0,100, "C");
      draw_LineChart_Coordinates(canvasObj2.getContext("2d"),0,360, "H");
     break;
    }
  }

  pp_other_interpolationLine() {

    var canvasObj0 = document.getElementById(this.partDivID+"_PP_C1_l1");
    canvasObj0.width = this.lineChart_Width;
    canvasObj0.height = this.lineChart_Height;

    var canvasObj1 = document.getElementById(this.partDivID+"_PP_C2_l1");
    canvasObj1.width = this.lineChart_Width;
    canvasObj1.height = this.lineChart_Height;

    var canvasObj2 = document.getElementById(this.partDivID+"_PP_C3_l1");
    canvasObj2.width = this.lineChart_Width;
    canvasObj2.height = this.lineChart_Height;

    var canvasObj3 = document.getElementById(this.partDivID+"_PP_Hue_l1");
    canvasObj3.width = this.pathplot_hueRes;
    canvasObj3.height = this.pathplot_hueRes;

    /////////////////////////////////////////////////////////////////

    switch (this.pathplot_space) {
      case "hsv":
        calcInterpolationLine_HSV(this.pathplot_hueRes,this.lineChart_Width,this.lineChart_Height);
        break;
        case "lab":
          calcInterpolationLine_Lab(this.pathplot_hueRes,this.lineChart_Width,this.lineChart_Height);
          break;
          case "din99":
            calcInterpolationLine_DIN99(this.pathplot_hueRes,this.lineChart_Width,this.lineChart_Height);
            break;
            case "lch":
              calcInterpolationLine_LCH(this.pathplot_hueRes,this.lineChart_Width,this.lineChart_Height);
              break;
      default:
        return;

    }
    drawInterpolationLine(canvasObj3.getContext("2d"),0, 1, false);

    drawInterpolationLine_LineChart(canvasObj0.getContext("2d"), 0);
    drawInterpolationLine_LineChart(canvasObj1.getContext("2d"), 1);
    drawInterpolationLine_LineChart(canvasObj2.getContext("2d"), 2);

    this.pp_LineGroup=draw3DInterpolationLine(this.pp_LineGroup);
  }

  pp_other_drawElements() {

    var canvasObj0 = document.getElementById(this.partDivID+"_PP_C1_l2");
    canvasObj0.width = this.lineChart_Width;
    canvasObj0.height = this.lineChart_Height;

    var canvasObj1 = document.getElementById(this.partDivID+"_PP_C2_l2");
    canvasObj1.width = this.lineChart_Width;
    canvasObj1.height = this.lineChart_Height;

    var canvasObj2 = document.getElementById(this.partDivID+"_PP_C3_l2");
    canvasObj2.width = this.lineChart_Width;
    canvasObj2.height = this.lineChart_Height;

    var canvasObj3 = document.getElementById(this.partDivID+"_PP_Hue_l2");
    canvasObj3.width = this.pathplot_hueRes;
    canvasObj3.height = this.pathplot_hueRes;

    /////////////////////////////////////////////////////////////////

    switch (this.pathplot_space) {
      case "hsv":
        calcHSVElements(this.pathplot_hueRes,this.lineChart_Width,this.lineChart_Height);
        break;
        case "lab":
          calcLabElements(this.pathplot_hueRes,this.lineChart_Width,this.lineChart_Height);
          break;
          case "din99":
            calcDIN99Elements(this.pathplot_hueRes,this.lineChart_Width,this.lineChart_Height);
            break;
            case "lch":
              calcLCHElements(this.pathplot_hueRes,this.lineChart_Width,this.lineChart_Height);
              break;
      default:
        return;

    }

    drawPathplotElements(canvasObj3.getContext("2d"),0,1, false,this.mouseAboveKeyID,this.mouseGrappedColorSide);

    drawLineChartElements(canvasObj0.getContext("2d"),0,this.mouseAboveKeyID,this.mouseGrappedColorSide);
    drawLineChartElements(canvasObj1.getContext("2d"),1,this.mouseAboveKeyID,this.mouseGrappedColorSide);
    drawLineChartElements(canvasObj2.getContext("2d"),2,this.mouseAboveKeyID,this.mouseGrappedColorSide);

    this.pp_ElementGroup=drawPathplot3DElements(this.pp_ElementGroup,this.mouseAboveKeyID,this.mouseGrappedColorSide);

  }

  pp_mouseMove(id,mousePosX,mousePosY){
    if(this.pp_CanvasMode == undefined)
      return;

    this.mousePosX =mousePosX;
    this.mousePosY =mousePosY;

    var tmpSpace = this.pathplot_space;
    if(tmpSpace==="rgb-line")
      tmpSpace="rgb";

    if(this.mouseGrappedKeyID==-1){
      gCMS_Pathplot.setCMSFromPackage(this.getParentCMS());
      document.getElementById(id).style.cursor = "default";
      var oldmouseAboveKeyID = this.mouseAboveKeyID;
      var found = false;

      for (var i = 0; i < gCMS_Pathplot.getKeyLength(); i++) {

          var position = [-1,-1];
          // tmpX is only important for the LineCharts
          var tmpX = this.pp_canvas_xStart+((gCMS_Pathplot.getRefPosition(i)-gCMS_Pathplot.getRefPosition(0))/gCMS_Pathplot.getRefRange())*this.pp_canvas_xWidth;

          switch (gCMS_Pathplot.getKeyType(i)) {
            case "nil key":
              // do nothing
              break;
            case "twin key":

            ////////////////////////////////////////////////////////////////
            /////// Right Color
            position =  this.getColorPosInCanvas(gCMS_Pathplot.getRightKeyColor(i, tmpSpace));
            if(this.pp_isLineChart)
              position[0]=tmpX;
            if(this.pp_checkPosition(position[0], position[1], i, 1, drawCircle)){
                found = true;
                break;
            }

            ////////////////////////////////////////////////////////////////
            /////// left Color
              var drawCircle = true;
              if (gCMS_Pathplot.getKeyType(i-1) === "nil key" || gCMS_Pathplot.getKeyType(i-1) === "left key")
                drawCircle = false;

              position =  this.getColorPosInCanvas(gCMS_Pathplot.getLeftKeyColor(i, tmpSpace));
              if(this.pp_isLineChart)
                position[0]=tmpX;
              if(this.pp_checkPosition(position[0], position[1], i, 0, drawCircle)){
                  found = true;
                  break;
              }

              // because we draw constant bands with two rects in the LineCharts
              if(this.pp_isLineChart && !drawCircle){
                tmpX = this.pp_canvas_xStart+((gCMS_Pathplot.getRefPosition(i-1)-gCMS_Pathplot.getRefPosition(0))/gCMS_Pathplot.getRefRange())*this.pp_canvas_xWidth;
                if(this.checkInsideRect(tmpX, position[1], i, 0)){
                    found = true;
                    break;
                }
              }

              break;
            case "left key":
              var drawCircle = true;
              if (gCMS_Pathplot.getKeyType(i-1) === "nil key" || gCMS_Pathplot.getKeyType(i-1) === "left key")
                drawCircle = false;
              ////////////////////////////////////////////////////////////////
              /////// left Color
              position =  this.getColorPosInCanvas(gCMS_Pathplot.getLeftKeyColor(i, tmpSpace));
              if(this.pp_isLineChart)
                position[0]=tmpX;
              if(this.pp_checkPosition(position[0], position[1], i, 0, drawCircle)){
                  found = true;
                  break;
              }


              // because we draw constant bands with two rects in the LineCharts
              if(this.pp_isLineChart && !drawCircle){
                tmpX = this.pp_canvas_xStart+((gCMS_Pathplot.getRefPosition(i-1)-gCMS_Pathplot.getRefPosition(0))/gCMS_Pathplot.getRefRange())*this.pp_canvas_xWidth;
                if(this.checkInsideRect(tmpX, position[1], i, 0)){
                    found = true;
                    break;
                }
              }

              ////////////////////////////////////////////////////////
              ///// Right Color
              // do nothing
              break;

              case "right key":
              position =  this.getColorPosInCanvas(gCMS_Pathplot.getRightKeyColor(i, tmpSpace));
              if(this.pp_isLineChart)
                position[0]=tmpX;
              if(this.pp_checkPosition(position[0], position[1], i, 1, true)){
                  found = true;
                  break;
              }
              break;
            default:
              // dual Key
              position = this.getColorPosInCanvas(gCMS_Pathplot.getRightKeyColor(i, tmpSpace));
              if(this.pp_isLineChart)
                position[0]=tmpX;
              if(this.pp_checkPosition(position[0], position[1], i, 2, true)){
                  found = true;
                  break;
              }
          }

          if(found){
            document.getElementById(id).style.cursor = "pointer";
            var tmpSpace = this.pathplot_space;
            if(tmpSpace==="rgb-line")
              tmpSpace="rgb";

            if(this.mouseGrappedColorSide==0){
              this.pp_currentColor=gCMS_Pathplot.getLeftKeyColor(this.mouseAboveKeyID, tmpSpace);
              this.update_CoordID();
            }
            else{
              this.pp_currentColor=gCMS_Pathplot.getRightKeyColor(this.mouseAboveKeyID, tmpSpace);
              this.update_CoordID();
            }
            break;
          }
      }

      if(!found){
        this.pp_currentColor=undefined;
        this.update_CoordID();
      }


      /*if(oldmouseAboveKeyID!=this.mouseAboveKeyID)
        this.updatePart(false,false,false);//*/

    } ///// END: if (mouseGrappedKeyID==-1)
    else{
      /// Determine new Color
      var newColor = this.pp_determinMouseColor();
      if(newColor==undefined)
        return;

      this.pp_currentColor = newColor;

      this.update_CoordID()

      switch (this.parentID) {
        case "id_EditPage":
          switch (this.mouseGrappedColorSide) {
            case 0:
            // left color
              editSection.editCMS.setLeftKeyColor(this.mouseGrappedKeyID, this.pp_currentColor);
              break;
            case 1:
              // right color
              editSection.editCMS.setRightKeyColor(this.mouseGrappedKeyID, this.pp_currentColor);
              break;
            case 2:
              // both colors
              editSection.editCMS.setLeftKeyColor(this.mouseGrappedKeyID, this.pp_currentColor);
              editSection.editCMS.setRightKeyColor(this.mouseGrappedKeyID, this.pp_currentColor);
              break;
          }
        break;
        case "id_OptimizationPage":
          switch (this.mouseGrappedColorSide) {
            case 0:
            // left color
              optiSection.editCMS.setLeftKeyColor(this.mouseGrappedKeyID, this.pp_currentColor);
              break;
            case 1:
              // right color
              optiSection.editCMS.setRightKeyColor(this.mouseGrappedKeyID, this.pp_currentColor);
              break;
            case 2:
              // both colors
              optiSection.editCMS.setLeftKeyColor(this.mouseGrappedKeyID, this.pp_currentColor);
              optiSection.editCMS.setRightKeyColor(this.mouseGrappedKeyID, this.pp_currentColor);
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
        position[0] = tmpColor[2] * this.pp_canvas_xWidth + this.pp_canvas_xStart;
        position[1] = this.pp_canvas_yStart - tmpColor[1] * this.pp_canvas_yHeight;
        break;
        case "RB":
        position[0] = tmpColor[3] * this.pp_canvas_xWidth + this.pp_canvas_xStart;
        position[1] = this.pp_canvas_yStart - tmpColor[1] * this.pp_canvas_yHeight;
        break;
        case "BG":
        position[0] = tmpColor[2] * this.pp_canvas_xWidth + this.pp_canvas_xStart;
        position[1] = this.pp_canvas_yStart - tmpColor[3] * this.pp_canvas_yHeight;
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
              var tmpDis = tmpColor[2] * colorspaceRadius;
              var tmpRad = degree360ToRad(tmpColor[1]*360);
              position[0] = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
              position[1] = this.pathplot_hueRes-(tmpDis * Math.sin(tmpRad) + colorspaceCenterY);
            break;
            case "lab":
              position[0] = ((tmpColor[2] / labSpaceRange) * this.pathplot_hueRes / 2) + colorspaceCenterX;
              position[1] = this.pathplot_hueRes-(((tmpColor[3] / labSpaceRange) * this.pathplot_hueRes / 2) + colorspaceCenterY);
            break;
            case "din99":
              position[0] = (tmpColor[2] - rangeA99Neg) / rangeA99 * this.pathplot_hueRes;
              position[1] = this.pathplot_hueRes-((tmpColor[3] - rangeB99Neg) / rangeB99 * this.pathplot_hueRes);
            break;
            case "lch":
              var colorspaceRadius =  Math.round((this.pathplot_hueRes*0.95 / 2));
              var tmpDis = tmpColor[2] * colorspaceRadius;
              var tmpRad = degree360ToRad(tmpColor[3]*360);
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
              relevantComponent=tmpColor[1];
              if(this.pathplot_space=="lab" || this.pathplot_space=="din99" || this.pathplot_space=="lms")
                factor=100;
            break;
            case "C2":
              switch (this.pathplot_space) {
                case "lms":
                  relevantComponent=tmpColor[2];
                  factor=100;
                  break;
                case "lab":
                  relevantComponent=(tmpColor[2]+labSpaceRange);
                  factor=(labSpaceRange*2);
                  break;
                case "din99":
                  relevantComponent=tmpColor[2]+(rangeA99Neg*-1);
                  factor=(rangeA99Pos-rangeA99Neg);
                  break;
                default:
                  relevantComponent=tmpColor[2];
              }
            break;
            case "C3":
            switch (this.pathplot_space) {
              case "lms":
                relevantComponent=tmpColor[3];
                factor=100;
                break;
              case "lab":
                relevantComponent=(tmpColor[3]+labSpaceRange);
                factor=(labSpaceRange*2);
                break;
              case "din99":
                relevantComponent=tmpColor[3]+(rangeB99Neg*-1);
                factor=(rangeB99Pos-rangeB99Neg);
                break;
              default:
                relevantComponent=tmpColor[3];
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
          return ["rgb",val2,val1,this.pp_currentColor[3]];
        break;
        case "RB":
          return ["rgb",val2,this.pp_currentColor[2],val1];
        break;
        case "BG":
          return ["rgb",this.pp_currentColor[1],val1,val2];
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
                return ["hsv",hVal,sVal,this.pp_currentColor[3]];
              }
            break;
            case "lab":
              var aVal = parseInt(((this.mousePosX - colorspaceCenterX) / (this.pathplot_hueRes / 2)) * labSpaceRange);
              var bVal = parseInt(((colorspaceCenterY-this.mousePosY) / (this.pathplot_hueRes / 2)) * labSpaceRange);
              gWorkColor1.updateColor("lab",this.pp_currentColor[1], aVal, bVal);
              if (gWorkColor1.checkRGBPossiblity())
                return gWorkColor1.getColorInfo("lab");

              return undefined;
            break;
            case "din99":
            var a99Val = parseInt((this.mousePosX / this.pathplot_hueRes) * rangeA99 + rangeA99Neg);
            var b99Val = parseInt(((this.pathplot_hueRes-this.mousePosY) / this.pathplot_hueRes) * rangeB99 + rangeB99Neg);
            if (a99Val < rangeA99Neg || a99Val > rangeA99Pos || b99Val < rangeB99Neg || b99Val > rangeB99Pos)
              return undefined;
            gWorkColor1.updateColor("din99",this.pp_currentColor[1], a99Val, b99Val);
            if (gWorkColor1.checkRGBPossiblity())
              return gWorkColor1.getColorInfo("din99");

            return undefined;
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
                gWorkColor1.updateColor("lch",this.pp_currentColor[1], cVal,hVal);
                if (gWorkColor1.checkRGBPossiblity())
                  return gWorkColor1.getColorInfo("lch");

                return undefined;
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
                case "rgb-line":
                  return ["rgb",parseInt(newValue*255)/255,this.pp_currentColor[2],this.pp_currentColor[3]];
                break;
                case "hsv":
                  return ["hsv",parseInt(newValue*360)/360,this.pp_currentColor[2],this.pp_currentColor[3]];
                break;
                case "lms":
                  gWorkColor1.updateColor("lms",parseInt(newValue*100),this.pp_currentColor[2],this.pp_currentColor[3]);
                  if (gWorkColor1.checkRGBPossiblity())
                    return gWorkColor1.getColorInfo("lms");

                  return undefined;
                break;
                case "lab":
                  gWorkColor1.updateColor("lab",parseInt(newValue*100),this.pp_currentColor[2],this.pp_currentColor[3]);
                  if (gWorkColor1.checkRGBPossiblity())
                    return gWorkColor1.getColorInfo("lab");

                  return undefined;
                break;
                case "din99":
                  gWorkColor1.updateColor("din99",parseInt(newValue*100),this.pp_currentColor[2],this.pp_currentColor[3]);
                  if (gWorkColor1.checkRGBPossiblity())
                    return gWorkColor1.getColorInfo("din99");

                  return undefined;
                break;
                case "lch":
                  gWorkColor1.updateColor("lch",parseInt(newValue*100)/100,this.pp_currentColor[2],this.pp_currentColor[3]);
                  if (gWorkColor1.checkRGBPossiblity())
                    return gWorkColor1.getColorInfo("lch");

                  return undefined;
                break;
                  default:
                    return undefined;
                }
            break;
            case "C2":
            switch (this.pathplot_space) {
                case "rgb-line":
                  return ["rgb",this.pp_currentColor[1],parseInt(newValue*255)/255,this.pp_currentColor[3]];
                break;
                case "hsv":
                  return ["hsv",this.pp_currentColor[1],parseInt(newValue*100)/100,this.pp_currentColor[3]];
                break;
                case "lms":
                  gWorkColor1.updateColor("lms",this.pp_currentColor[1],parseInt(newValue*100),this.pp_currentColor[3]);
                  if (gWorkColor1.checkRGBPossiblity())
                    return gWorkColor1.getColorInfo("lms");

                  return undefined;
                break;
                case "lab":
                  gWorkColor1.updateColor("lab",this.pp_currentColor[1],parseInt(newValue*(labSpaceRange*2)+(labSpaceRange*-1)),this.pp_currentColor[3]);
                  if (gWorkColor1.checkRGBPossiblity())
                    return gWorkColor1.getColorInfo("lab");

                  return undefined;
                break;
                case "din99":
                  gWorkColor1.updateColor("din99",this.pp_currentColor[1],parseInt(newValue*(rangeA99Pos-rangeA99Neg)+(rangeA99Neg)),this.pp_currentColor[3]);
                  if (gWorkColor1.checkRGBPossiblity())
                    return gWorkColor1.getColorInfo("din99");

                  return undefined;
                break;
                case "lch":
                  gWorkColor1.updateColor("lch",this.pp_currentColor[1],parseInt(newValue*100)/100,this.pp_currentColor[3]);
                  if (gWorkColor1.checkRGBPossiblity())
                    return gWorkColor1.getColorInfo("lch");

                  return undefined;
                break;
                  default:
                    return undefined;
                }
            break;
            case "C3":
            switch (this.pathplot_space) {
                case "rgb-line":
                  return ["rgb",this.pp_currentColor[1],this.pp_currentColor[2],parseInt(newValue*255)/255];
                break;
                case "hsv":
                  return ["hsv",this.pp_currentColor[1],this.pp_currentColor[2],parseInt(newValue*100)/100];
                break;
                case "lms":
                  gWorkColor1.updateColor("lms",this.pp_currentColor[1],this.pp_currentColor[2],parseInt(newValue*100));
                  if (gWorkColor1.checkRGBPossiblity())
                    return gWorkColor1.getColorInfo("lms");

                  return undefined;
                break;
                case "lab":
                  gWorkColor1.updateColor("lab",this.pp_currentColor[1],this.pp_currentColor[2],parseInt(newValue*(labSpaceRange*2)+(labSpaceRange*-1)));
                  if (gWorkColor1.checkRGBPossiblity())
                    return gWorkColor1.getColorInfo("lab");

                  return undefined;
                break;
                case "din99":
                  gWorkColor1.updateColor("din99",this.pp_currentColor[1],this.pp_currentColor[2],parseInt(newValue*(rangeB99Pos-rangeB99Neg)+(rangeB99Neg)));
                  if (gWorkColor1.checkRGBPossiblity())
                    return gWorkColor1.getColorInfo("din99");

                  return undefined;
                break;
                case "lch":
                  gWorkColor1.updateColor("lch",this.pp_currentColor[1],this.pp_currentColor[2],parseInt(newValue*360)/360);
                  if (gWorkColor1.checkRGBPossiblity())
                    return gWorkColor1.getColorInfo("lch");

                  return undefined;
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
            case "rgb-line":
            c1_name = "R : ";
            c1_val = parseInt(this.pp_currentColor[1]*255);
            c2_name = ",  G : ";
            c2_val = parseInt(this.pp_currentColor[2]*255);
            c3_name = ",  B : ";
            c3_val = parseInt(this.pp_currentColor[3]*255);
            break;
            case "hsv":
            c1_name = "H : ";
            c1_val = parseInt(this.pp_currentColor[1]*360);
            c2_name = ",  S : ";
            c2_val = parseInt(this.pp_currentColor[2]*100);
            c3_name = ",  V : ";
            c3_val = parseInt(this.pp_currentColor[3]*100);
            break;
            case "lab":
            c1_name = "L : ";
            c1_val = parseInt(this.pp_currentColor[1]);
            c2_name = ",  A : ";
            c2_val = parseInt(this.pp_currentColor[2]);
            c3_name = ",  B : ";
            c3_val = parseInt(this.pp_currentColor[3]);
              break;
            case "din99":
            c1_name = "L99 : ";
            c1_val = parseInt(this.pp_currentColor[1]);
            c2_name = ",  A99 : ";
            c2_val = parseInt(this.pp_currentColor[2]);
            c3_name = ",  B99 : ";
            c3_val = parseInt(this.pp_currentColor[3]);
            break;
            case "lms":
            c1_name = "L : ";
            c1_val = parseInt(this.pp_currentColor[1]);
            c2_name = ",  M : ";
            c2_val = parseInt(this.pp_currentColor[2]);
            c3_name = ",  S : ";
            c3_val = parseInt(this.pp_currentColor[3]);
              break;
            case "lch":
            c1_name = "L : ";
            c1_val = parseInt(this.pp_currentColor[1]*100);
            c2_name = ",  C : ";
            c2_val = parseInt(this.pp_currentColor[2]*100);
            c3_name = ",  H : ";
            c3_val = parseInt(this.pp_currentColor[3]*360);
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
    var ratio = oldSize.width/oldSize.height;
    this.pp_renderer.setSize(2160*ratio, 2160);
    this.pp_renderer.preserveDrawingBuffer = true;
    this.pp_renderer.render(this.pp_scene,this.pp_camera);
    var pathplotImgData = this.pp_renderer.domElement.toDataURL();
    this.pp_renderer.preserveDrawingBuffer = false;
    this.pp_renderer.setSize(oldSize.width, oldSize.height);
    this.pp_3D_StartAnimation();

    switch (true) {
      case editSection.isSectionOpen():
        document.getElementById("id_EditPage_PathplotScreenshot").href=pathplotImgData;
      break;
      case optiSection.isSectionOpen():
        document.getElementById("id_OptiPage_PathplotScreenshot").href=pathplotImgData;
      break;
    }

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
