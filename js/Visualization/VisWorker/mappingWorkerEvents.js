function eventFunctionColorMapping(e){

  var data = e.data;

  var nanColor = globalCMS1.getNaNColor("rgb");


  //console.log(data.test);

  for (var index = 0; index < data.cVal1.length; index++) {

    if(mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 0]==undefined){
      continue;
    }

    if(mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 1]==undefined){
      continue;
    }


    if(data.cVal1[index]==undefined){
      mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 0].color.setRGB( nanColor.getRValue(),nanColor.getGValue(),nanColor.getBValue());
      mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 1].color.setRGB( nanColor.getRValue(),nanColor.getGValue(),nanColor.getBValue());
      counter++;
    }
    else{
      mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 0].color.setRGB( data.cVal1[index],data.cVal2[index],data.cVal3[index]);
      mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 1].color.setRGB( data.cVal1[index],data.cVal2[index],data.cVal3[index]);
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
