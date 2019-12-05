

function createDisPowerGraph(){

  if(optiGraph!=undefined){
    optiGraph.deleteReferences();
    optiGraph=undefined;
  }


  optiGraph = new class_Graph_ForcedDisPower(globalCMS1.getInterpolationSpace());
  optiGraph.changeColorEdgeOptions(globalCMS1.getInterpolationSpace(),true,"eu");

  //var continuousSections = searchForContinuousSections(0,globalCMS1.getKeyLength()-1);
  var continuousSections = searchForContinuousSections(document.getElementById("id_editPage_Optimization_FromKey").selectedIndex,document.getElementById("id_editPage_Optimization_TillKey").selectedIndex);

  for (var j = 0; j < continuousSections.length; j++) {
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



function calcDisPowerOptimum(isGlobal,degree){
  // create graph
  createDisPowerGraph();
  //////////////////////////////////////////////////////////////////////////////

  if(isGlobal)
    optiGraph.forceLayout(document.getElementById("id_EditPage_DisPowerOpti_Global_Iterations").value,document.getElementById("id_EditPage_DisPowerOpti_Global_Speed").value,degree,isGlobal);
  else
    optiGraph.forceLayout(document.getElementById("id_EditPage_DisPowerOpti_Local_Iterations").value,document.getElementById("id_EditPage_DisPowerOpti_Local_Speed").value,degree,isGlobal);

  optiGraphToCMS();

}
