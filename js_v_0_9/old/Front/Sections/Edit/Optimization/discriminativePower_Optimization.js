

function createDisPowerGraph(){

  if(optiGraph!=undefined){
    optiGraph.deleteReferences();
    optiGraph=undefined;
  }

  optiGraph = new class_Graph_ForcedDisPower(globalCMS1.getInterpolationSpace());
  optiGraph.changeColorEdgeOptions(globalCMS1.getInterpolationSpace(),true,"eu");

  //var continuousSections = searchForContinuousSections(0,globalCMS1.getKeyLength()-1);
  var continuousSections = searchForContinuousSections(document.getElementById("id_editPage_Optimization_FromKey").selectedIndex,document.getElementById("id_editPage_Optimization_TillKey").selectedIndex);

  ///////
   // save not editAble color
   var firstID = continuousSections[0][0];
   var lastID= continuousSections[continuousSections.length-1][1];
   for (var i = 0; i < firstID; i++) {
     switch (globalCMS1.getKeyType(i)) {
       case "dual key":
         optiGraph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i), true,i,2);
         break;
         case "left key":
           optiGraph.pushNode(globalCMS1.getLeftKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i), true,i,0);
           break;
           case "right key":
            optiGraph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i), true,i,1);
             break;
             case "twin key":
              optiGraph.pushNode(globalCMS1.getLeftKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i), true,i,0);
              optiGraph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i), true,i,1);
            break;
     }
   }

   if(globalCMS1.getKeyType(firstID)=="twin key"){
     optiGraph.pushNode(globalCMS1.getLeftKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i), true,i,0);
   }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  for (var j = 0; j < continuousSections.length; j++) {
    for (var i = continuousSections[j][0]; i < continuousSections[j][1]; i++){


      if(i == continuousSections[j][0] && (globalCMS1.getKeyType(i)==="right key"||globalCMS1.getKeyType(i)==="twin key"))
        optiGraph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i), false,i,1); // save key index information and if the node represent the right, left or both colors of the key
      else
        optiGraph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i), false,i,2);

        optiGraph.pushEdge(optiGraph.getNodeLength()-1,optiGraph.getNodeLength());
    }// for

    if(globalCMS1.getKeyType(continuousSections[j][1])==="left key"|| globalCMS1.getKeyType(i)==="twin key")
      optiGraph.pushNode(globalCMS1.getLeftKeyColor(continuousSections[j][1],globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(continuousSections[j][1]),false,continuousSections[j][1],0);
    else
      optiGraph.pushNode(globalCMS1.getLeftKeyColor(continuousSections[j][1],globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(continuousSections[j][1]),false,continuousSections[j][1],2);

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  if(globalCMS1.getKeyType(lastID)=="twin key"){
    optiGraph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i), true,lastID,1);
  }


  for (var i = lastID+1; i < globalCMS1.getKeyLength; i++) {
    switch (globalCMS1.getKeyType(i)) {
      case "dual key":
        optiGraph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i), true,i,2);
        break;
        case "left key":
          optiGraph.pushNode(globalCMS1.getLeftKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i), true,i,0);
          break;
          case "right key":
           optiGraph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i), true,i,1);
            break;
            case "twin key":
             optiGraph.pushNode(globalCMS1.getLeftKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i), true,i,0);
             optiGraph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i), true,i,1);
           break;
    }
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
