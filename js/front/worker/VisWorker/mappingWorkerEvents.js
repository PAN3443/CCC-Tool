function eventFunctionColorMapping(e){

  var data = e.data;

  var nanColor = globalCMS1.getNaNColor("rgb");

  if(doColorblindnessSim){
    var tmpLMS = nanColor.calcLMSColor();
    nanColor = tmpLMS.calcColorBlindRGBColor();
  }

  if(data.mmm!=undefined){
    console.log(data.mmm);
    console.log(data.mm);
    return;
  }
  //console.log(data.test);

  for (var index = 0; index < data.cVal1.length; index++) {

    if(mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 0]==undefined){
      console.log(data.cellStartIndex+index);
      continue;
    }

    if(mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 1]==undefined){
      console.log(data.cellStartIndex+index);
      continue;
    }

    if(data.cVal1[index]==undefined){
      mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 0].color.setRGB( nanColor.getRValue(),nanColor.getGValue(),nanColor.getBValue());
      mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 1].color.setRGB( nanColor.getRValue(),nanColor.getGValue(),nanColor.getBValue());
    }
    else{

      if(doColorblindnessSim){
        var toolColor = new classColor_RGB(data.cVal1[index],data.cVal2[index],data.cVal3[index]);
        var tmpLMS = toolColor.calcLMSColor();
        toolColor = tmpLMS.calcColorBlindRGBColor();
        mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 0].color.setRGB( toolColor.getRValue(),toolColor.getGValue(),toolColor.getBValue());
        mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 1].color.setRGB( toolColor.getRValue(),toolColor.getGValue(),toolColor.getBValue());
      }
      else{
        mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 0].color.setRGB( data.cVal1[index],data.cVal2[index],data.cVal3[index]);
        mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 1].color.setRGB( data.cVal1[index],data.cVal2[index],data.cVal3[index]);
      }

    }

  }


  workerFinished[data.workerIndex]=true;

  var tmpFinished=true;
  for (var i = 0; i < workerFinished.length; i++) {

    if(workerFinished[i]==false){
    tmpFinished=false;
    break;}

  }


  if(tmpFinished){

    for (var i = workerArray.length-1; i >= 0 ; i--) {
        workerArray[i].terminate();
        workerArray.pop();
    }
    workerFinished=[];
    mappingMesh.geometry.verticesNeedUpdate = true;
    mappingMesh.geometry.colorsNeedUpdate = true;
  }

  allWorkerFinished=tmpFinished;




}
