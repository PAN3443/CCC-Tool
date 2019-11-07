function calcDisPowerOptimum(degree){
  // create graph

  optiGraph = new class_Graph_ForcedDisPower(globalCMS1.getInterpolationSpace());
  optiGraph.changeColorEdgeOptions(globalCMS1.getInterpolationSpace(),true,"eu");

  var continuousSections = searchForContinuousSections(0,globalCMS1.getKeyLength()-1);

  var ncounter = 0;
  for (var j = 0; j < continuousSections.length; j++) {
      if(continuousSections[j][0]<continuousSections[j][1]){
        var nstart = ncounter;
        for (var i = continuousSections[j][0]; i < continuousSections[j][1]; i++){
          optiGraph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(i));
          if(i == continuousSections[j][0] && (globalCMS1.getKeyType(i)==="right key"||globalCMS1.getKeyType(i)==="twin key"))
            optiGraph.pushCMSInfo([i,1]); // save key index information and if the node represent the right, left or both colors of the key
          else
            optiGraph.pushCMSInfo([i,2]);
          ncounter++;
        }// for
        optiGraph.pushNode(globalCMS1.getLeftKeyColor(continuousSections[j][1],globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(continuousSections[j][1]));
        if(globalCMS1.getKeyType(i)==="left key"|| globalCMS1.getKeyType(i)==="twin key")
          optiGraph.pushCMSInfo([continuousSections[j][1],0]);
        else
          optiGraph.pushCMSInfo([continuousSections[j][1],2]);
        ncounter++;

        if(document.getElementById("id_EditPage_DisPowerOpti_AllNodeConnection").checked){
          for (var i = nstart; i < ncounter-1; i++){
            for (var k = i+1; k < ncounter; k++){
              optiGraph.pushEdge(i,k);
            }
          }
        }
        else{
          for (var i = nstart; i < ncounter-1; i++){
            optiGraph.pushEdge(i,i+1);
          }
        }


      }
  }

  //////////////////////////////////////////////////////////////////////////////
  optiGraph.forceLayout(document.getElementById("id_EditPage_DisPowerOpti_Iterations").value,document.getElementById("id_EditPage_DisPowerOpti_Power").value,degree);
  optiGraphToCMS();

}
