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

  var counter = 0;
  var numberVerticesPerCell =4;
  var currentIndex = data.cellStartIndex;


  for (var index = 0; index < data.cVal1.length; index++) {

    var tmpRGBColor = new classColor_RGB(data.cVal1[index],data.cVal2[index],data.cVal3[index]);

    if(doColorblindnessSim){
      var tmpLMS = tmpRGBColor.calcLMSColor();
      tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
    }



      switch (counter) {
        case 0:
          mappingMesh.geometry.faces[currentIndex*2].vertexColors[0].setRGB(tmpRGBColor.getRValue(),tmpRGBColor.getGValue(),tmpRGBColor.getBValue());
          mappingMesh.geometry.faces[currentIndex*2+1].vertexColors[0].setRGB(tmpRGBColor.getRValue(),tmpRGBColor.getGValue(),tmpRGBColor.getBValue());
          break;
          case 1:
          mappingMesh.geometry.faces[currentIndex*2].vertexColors[1].setRGB(tmpRGBColor.getRValue(),tmpRGBColor.getGValue(),tmpRGBColor.getBValue());
          break;
          case 2:
          mappingMesh.geometry.faces[currentIndex*2].vertexColors[2].setRGB(tmpRGBColor.getRValue(),tmpRGBColor.getGValue(),tmpRGBColor.getBValue());
          mappingMesh.geometry.faces[currentIndex*2+1].vertexColors[1].setRGB(tmpRGBColor.getRValue(),tmpRGBColor.getGValue(),tmpRGBColor.getBValue());
          break;
          case 3:
          mappingMesh.geometry.faces[currentIndex*2+1].vertexColors[2].setRGB(tmpRGBColor.getRValue(),tmpRGBColor.getGValue(),tmpRGBColor.getBValue());
          break;

        default:

      }
      counter++;

      if(counter%4==0){
        counter = 0;
        currentIndex++;
      }

    }

    /*if(mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 0]==undefined){
      console.log(data.cellStartIndex+index);
      continue;
    }

    if(mappingMesh.geometry.faces[(data.cellStartIndex+index) * 2 + 1]==undefined){
      console.log(data.cellStartIndex+index);
      continue;
    }



  }*/


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
    //mappingMesh.geometry.verticesNeedUpdate = true;
    mappingMesh.geometry.colorsNeedUpdate = true;
  }

  allWorkerFinished=tmpFinished;




}
