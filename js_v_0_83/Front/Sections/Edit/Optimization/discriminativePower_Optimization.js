function calcDisPowerOptimum(degree){
  // create graph

  var graph = new class_Graph(globalCMS1.getInterpolationSpace());
  graph.changeColorEdgeOptions(globalCMS1.getInterpolationSpace(),true,"eu");

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
          ncounter++;
        }// for
        graph.pushNode(globalCMS1.getLeftKeyColor(continuousSections[j][1],globalCMS1.getInterpolationSpace()),globalCMS1.getRefPosition(continuousSections[j][1]));
        if(globalCMS1.getKeyType(i)==="left key"|| globalCMS1.getKeyType(i)==="twin key")
          graph.pushCMSInfo([continuousSections[j][1],0]);
        else
          graph.pushCMSInfo([continuousSections[j][1],2]);
        ncounter++;

        if(document.getElementById("id_EditPage_DisPowerOpti_AllNodeConnection").checked){
          for (var i = nstart; i < ncounter-1; i++){
            for (var k = i+1; k < ncounter; k++){
              graph.pushEdge_ColorWeight(i,k);
            }
          }
        }
        else{
          for (var i = nstart; i < ncounter-1; i++){
            graph.pushEdge_ColorWeight(i,i+1);
          }
        }


      }
  }

  //////////////////////////////////////////////////////////////////////////////
  graph.speedForce_DisPower_v2(document.getElementById("id_EditPage_DisPowerOpti_Iterations").value,document.getElementById("id_EditPage_DisPowerOpti_Power").value,degree);
  //graph.speedForce_DisPower(document.getElementById("id_EditPage_DisPowerOpti_Iterations").value,document.getElementById("id_EditPage_DisPowerOpti_Power").value,degree);

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
