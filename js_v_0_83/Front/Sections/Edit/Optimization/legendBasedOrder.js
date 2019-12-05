

function createLegendBasedGraph(){

  if(optiGraph!=undefined){
    optiGraph.deleteReferences();
    optiGraph=undefined;
  }

  optiGraph = new class_Graph_ForcedLegOrder(globalCMS1.getInterpolationSpace(),document.getElementById("id_EditPage_GlobalLegOrderOptimization").checked);
  optiGraph.changeColorEdgeOptions(globalCMS1.getInterpolationSpace(),false,"eu");
  //var continuousSections = searchForContinuousSections(0,globalCMS1.getKeyLength()-1);
  var continuousSections = searchForContinuousSections(document.getElementById("id_editPage_Optimization_FromKey").selectedIndex,document.getElementById("id_editPage_Optimization_TillKey").selectedIndex);

  //var ncounter = 0;

  for (var j = 0; j < continuousSections.length; j++) {
    //var nstart = ncounter;
    for (var i = continuousSections[j][0]; i < continuousSections[j][1]; i++){
      optiGraph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i));
      if(i == continuousSections[j][0] && (globalCMS1.getKeyType(i)==="right key"||globalCMS1.getKeyType(i)==="twin key"))
        optiGraph.pushCMSInfo([i,1]); // save key index information and if the node represent the right, left or both colors of the key
      else
        optiGraph.pushCMSInfo([i,2]);

        optiGraph.pushEdge(i,i+1);
    }// for

    optiGraph.pushNode(globalCMS1.getLeftKeyColor(continuousSections[j][1],globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(continuousSections[j][1]));
    if(globalCMS1.getKeyType(continuousSections[j][1])==="left key"|| globalCMS1.getKeyType(i)==="twin key")
      optiGraph.pushCMSInfo([continuousSections[j][1],0]);
    else
      optiGraph.pushCMSInfo([continuousSections[j][1],2]);

  }
}

function calcLegOrderOptimum(isGlobal,degree){

  createLegendBasedGraph();

  var distance = Math.abs(globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1) - globalCMS1.getRefPosition(0));
  var blackWhiteSpeed = undefined;
  switch (globalCMS1.getInterpolationSpace()) {
    case "rgb":
      var rgbBlack = new class_Color_RGB(0, 0, 0);
      var rgbWhite = new class_Color_RGB(1, 1, 1);
      blackWhiteSpeed = calc3DEuclideanDistance(rgbBlack,rgbWhite)/ distance; //
      break;
    case "hsv":
      blackWhiteSpeed = 100.0 / distance;
      break;
    case "lab":
    case "de94":
    case "de94-ds":
    case "de2000":
    case "de2000-ds":
      blackWhiteSpeed = 100.0 / distance;
      break;
    case "din99":
      blackWhiteSpeed = 100.0 / distance;
      break;
    case "lch":
      blackWhiteSpeed = 100.0 / distance;
      break;
    default:
  }

  if(isGlobal){
    var optiSpeed = blackWhiteSpeed*document.getElementById("id_EditPage_LegOrderOpti_Global_Speed").value;
    optiGraph.forceLayout(document.getElementById("id_EditPage_LegOrderOpti_Global_Iterations").value,degree,optiSpeed,isGlobal);
  }
  else {
    var optiSpeed = blackWhiteSpeed*document.getElementById("id_EditPage_LegOrderOpti_Local_Speed").value;
    optiGraph.forceLayout(document.getElementById("id_EditPage_LegOrderOpti_Local_Iterations").value,degree,optiSpeed,isGlobal);
  }

  optiGraphToCMS();
}




/*

function calcLegOrderOptimum(degree){

  // create graph

  var graph = new class_Graph(globalCMS1.getInterpolationSpace());
  graph.changeColorEdgeOptions(globalCMS1.getInterpolationSpace(),false,"eu");
  graph.setOF(document.getElementById("id_OrginForceCheck").checked);
  graph.setRGBCorr(document.getElementById("id_RGBCorrCheck").checked);
  graph.setAvgSpeedUpdate(document.getElementById("id_AvgSpeedUpdateCheck").checked);

  var continuousSections = searchForContinuousSections(0,globalCMS1.getKeyLength()-1);

  var ncounter = 0;
  for (var j = 0; j < continuousSections.length; j++) {
      if(continuousSections[j][0]<continuousSections[j][1]){
        var nstart = ncounter;
        for (var i = continuousSections[j][0]; i < continuousSections[j][1]; i++){
          graph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i));
          if(i == continuousSections[j][0] && (globalCMS1.getKeyType(i)==="right key"||globalCMS1.getKeyType(i)==="twin key"))
            graph.pushCMSInfo([i,1]); // save key index information and if the node represent the right, left or both colors of the key
          else
            graph.pushCMSInfo([i,2]);
        }// for
        graph.pushNode(globalCMS1.getLeftKeyColor(continuousSections[j][1],globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(continuousSections[j][1]));
        if(globalCMS1.getKeyType(i)==="left key"|| globalCMS1.getKeyType(i)==="twin key")
          graph.pushCMSInfo([continuousSections[j][1],0]);
        else
          graph.pushCMSInfo([continuousSections[j][1],2]);

      }
  }

  //////////////////////////////////////////////////////////////////////////////

  graph.speedForce_LegendOrder(document.getElementById("id_EditPage_LegOrderOpti_Iterations").value,degree);

  //////////////////////////////////////////////////////////////////////////////

  for ( var i = 0; i < graph.getNodeLength(); i ++ ) {
    // positions
    var tmpKeyInfo = graph.getCMSInfo(i);

    if(tmpKeyInfo==undefined)
      continue;

    switch (tmpKeyInfo[1]) {
      case 0:
        globalCMS1_Optimum.setLeftKeyColor(tmpKeyInfo[0],graph.getNodeColor(i));
      break;
      case 1:
        globalCMS1_Optimum.setRightKeyColor(tmpKeyInfo[0],graph.getNodeColor(i));
      break;
      case 2:
        globalCMS1_Optimum.setLeftKeyColor(tmpKeyInfo[0],graph.getNodeColor(i));
        globalCMS1_Optimum.setRightKeyColor(tmpKeyInfo[0],graph.getNodeColor(i));
      break;
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  graph.deleteReferences();

}
*/
