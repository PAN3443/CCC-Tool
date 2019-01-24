function eventFunctionColorMapping(e){

  var data = e.data;

  for (var index = 0; index < data.cVal1.length; index++) {

    for (var i = 0; i < mappingFaceIndexArray[index].length; i++) {
      mappingMesh.geometry.faces[mappingFaceIndexArray[index][i]].vertexColors[mappingVertexIndexArray[index][i]].setRGB(data.cVal1[index],data.cVal2[index],data.cVal3[index]);
    }

  }

  allWorkerFinished=true;
  mappingMesh.geometry.colorsNeedUpdate = true;


}
