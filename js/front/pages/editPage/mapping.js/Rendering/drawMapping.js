function drawMapping() {
  if(globalCMS1.getKeyLength()==0)
  return;

  if (globalDomain.getNumberOfCells() == 0) {
    console.log("Error there are no generated cells.");
    return;
  }

  coordinateArrowsGroup.position.x = 0;
  coordinateArrowsGroup.position.y = 0;

  var type = globalDomain.getCell(0).getCellType();

  switch (type) {
    case 1: // 1. Rectangle

      var geometry = new THREE.Geometry();
      geometry.vertices = globalDomain.getPointArray();

      var facesArray = new Array(globalDomain.getNumberOfCells()*2);

      var workCMS;

      if(document.getElementById("id_EditPage_MappingCMS_Select").selectedIndex==0){
        workCMS = cloneCMS(globalCMS1);
      }
      else{
        workCMS = globalCMS1.getProbeSet(document.getElementById("id_EditPage_MappingCMS_Select").selectedIndex-1).generateProbeCMS(globalCMS1);
      }

      for (var index = 0; index < globalDomain.getNumberOfCells(); index++) {

        var value= globalDomain.getCell(index).getCellValue();

        var toolColor = workCMS.calculateColor(globalDomain.getCell(index).getCellValue());

        if(toolColor==undefined){
          toolColor = workCMS.getNaNColor("rgb");
        }

        if(doColorblindnessSim){
          var tmpLMS = toolColor.calcLMSColor();
          toolColor = tmpLMS.calcColorBlindRGBColor();
        }

        facesArray[index * 2 + 0] = new THREE.Face3( globalDomain.getCell(index).getCellIndex(0), globalDomain.getCell(index).getCellIndex(1),globalDomain.getCell(index).getCellIndex(2));
        facesArray[index * 2 + 0].color.setRGB( toolColor.getRValue(),toolColor.getGValue(),toolColor.getBValue());
        facesArray[index * 2 + 1] = new THREE.Face3( globalDomain.getCell(index).getCellIndex(0), globalDomain.getCell(index).getCellIndex(2),globalDomain.getCell(index).getCellIndex(3));
        facesArray[index * 2 + 1].color.setRGB( toolColor.getRValue(),toolColor.getGValue(),toolColor.getBValue());
      }

      geometry.faces=facesArray;

      geometry.computeFaceNormals();
      //geometry.computeVertexNormals();*/


      geometry.computeBoundingBox ();

      var largestDis = Math.hypot(geometry.boundingBox.size().x,geometry.boundingBox.size().y,geometry.boundingBox.size().z);

      var center = geometry.boundingBox.getCenter()


      mapping_minRadius = largestDis*0.01;
      mapping_maxRadius = largestDis*2;
      mapping_zoomFactor = largestDis / 50;

      mapping_camera.position.z = mapping_maxRadius/2;

      mapping_camera.far = mapping_maxRadius*2;
      mapping_camera.updateProjectionMatrix();

      var material = new THREE.MeshLambertMaterial( {
    						side: THREE.DoubleSide,
    						color: 0xF5F5F5,
                vertexColors: THREE.FaceColors
    						//vertexColors: THREE.VertexColors
    					} );

      material.transparent = true;
      material.blending = THREE["NoBlending"];

      mappingMesh = new THREE.Mesh(geometry, material);

      /*mappingMesh.position.x += currentOriginX-center.x;
      mappingMesh.position.y += currentOriginY-center.y;
      mappingMesh.position.z += -1*center.z;*/

      mappingMesh.position.x = -1*center.x;
      mappingMesh.position.y = -1*center.y;
      mappingMesh.position.z = -1*center.z;

      //// update arrow

      for (var i = coordinateArrowsGroup.children.length - 1; i >= 0; i--) {
        coordinateArrowsGroup.remove(coordinateArrowsGroup.children[i]);
      }

      coordinateArrowsGroup.add(mappingMesh);

      var from = new THREE.Vector3( 0, 0, 0 );
      var to = new THREE.Vector3( geometry.boundingBox.size().x, 0, 0 );
      var direction = to.clone().sub(from);
      var length = direction.length();
      var arrowXAxis = new THREE.ArrowHelper(direction.normalize(), from, length, 0x0000ff );
      if(document.getElementById('id_EditPage_Mapping_ShowAxis').checked==false)
        arrowXAxis.visible=false;
      coordinateArrowsGroup.add( arrowXAxis );

      to = new THREE.Vector3( 0, geometry.boundingBox.size().y,  0 );
      direction = to.clone().sub(from);
      length = direction.length();
      var arrowYAxis = new THREE.ArrowHelper(direction.normalize(), from, length, 0xff0000 );
      if(document.getElementById('id_EditPage_Mapping_ShowAxis').checked==false)
        arrowYAxis.visible=false;
      coordinateArrowsGroup.add( arrowYAxis );

      to = new THREE.Vector3( 0, 0, geometry.boundingBox.size().z );
      direction = to.clone().sub(from);
      length = direction.length();
      var arrowZAxis = new THREE.ArrowHelper(direction.normalize(), from, length, 0x00ff00 );
      if(document.getElementById('id_EditPage_Mapping_ShowAxis').checked==false)
        arrowZAxis.visible=false;
      coordinateArrowsGroup.add( arrowZAxis );

      break;
    case 2: // 2. Triangle
      /*for (var i = 0; i < globalDomain.getNumberOfCells(); i++) {


      }*/
      break;
    case 3: //  3. Hexahedron
      /*for (var i = 0; i < globalDomain.getNumberOfCells(); i++) {


      }*/
      break;
    default:

  }




}


function updateMesh() {

  if(globalDomain==undefined || mappingMesh==undefined)
  return;


  ///////////////
  // Lets start with coloring

  if(browserCanWorker && doParallelProcessing){

    if(allWorkerFinished){

      if(doneWorkerPreparation==false)
      workerPreparation();


      // update colormap

      var tmpRefVal = [];
      var tmpkey1CVal1 = [];
      var tmpkey1CVal2 = [];
      var tmpkey1CVal3 = [];
      var tmpkey2CVal1 = [];
      var tmpkey2CVal2 = [];
      var tmpkey2CVal3 = [];
      var tmpMoT = [];

      var workCMS;

      if(document.getElementById("id_EditPage_MappingCMS_Select").selectedIndex==0){
        workCMS = cloneCMS(globalCMS1);
      }
      else{
        workCMS = globalCMS1.getProbeSet(document.getElementById("id_EditPage_MappingCMS_Select").selectedIndex-1).generateProbeCMS(globalCMS1);
      }

      for (var i = 0; i < workCMS.getKeyLength()-1; i++) {

        tmpRefVal.push(workCMS.getKey(i).getRefPosition());
        var color1=workCMS.getKey(i).getRightKeyColor(workCMS.getInterpolationSpace());
        var color2=workCMS.getKey(i+1).getLeftKeyColor(workCMS.getInterpolationSpace());

        if(color1!=undefined){
          tmpkey1CVal1.push(color1.get1Value());
          tmpkey1CVal2.push(color1.get2Value());
          tmpkey1CVal3.push(color1.get3Value());
        }
        else{
          tmpkey1CVal1.push(undefined);
          tmpkey1CVal2.push(undefined);
          tmpkey1CVal3.push(undefined);
        }

        if(color2!=undefined){
          tmpkey2CVal1.push(color2.get1Value());
          tmpkey2CVal2.push(color2.get2Value());
          tmpkey2CVal3.push(color2.get3Value());
        }
        else{
          tmpkey2CVal1.push(undefined);
          tmpkey2CVal2.push(undefined);
          tmpkey2CVal3.push(undefined);
        }

        tmpMoT.push(workCMS.getKey(i).getMoT());
      }
      tmpRefVal.push(workCMS.getKey(workCMS.getKeyLength()-1).getRefPosition());
      tmpMoT.push(workCMS.getKey(workCMS.getKeyLength()-1).getMoT());

      var tmpAbove = workCMS.getAboveColor("rgb");
      var tmpBelow = workCMS.getBelowColor("rgb");

      workerArray=[];
      workerFinished=[];
      for (var i = 0; i < workerJSON.length; i++) {
        workerJSON[i].colorspace = globalCMS1.getInterpolationSpace();
        workerJSON[i].refVal=tmpRefVal;
        workerJSON[i].key1cVal1=tmpkey1CVal1;
        workerJSON[i].key1cVal2=tmpkey1CVal2;
        workerJSON[i].key1cVal3=tmpkey1CVal3;
        workerJSON[i].key2cVal1=tmpkey2CVal1;
        workerJSON[i].key2cVal2=tmpkey2CVal2;
        workerJSON[i].key2cVal3=tmpkey2CVal3;
        workerJSON[i].MoT = tmpMoT;
        workerJSON[i].din99_kE = din99_kE;
        workerJSON[i].din99_kCH = din99_kCH;
        workerJSON[i].cielab_ref_X = cielab_ref_X;
        workerJSON[i].cielab_ref_Y = cielab_ref_Y;
        workerJSON[i].cielab_ref_Z = cielab_ref_Z;

        workerJSON[i].aboveC1 = tmpAbove.get1Value();
        workerJSON[i].aboveC2 = tmpAbove.get2Value();
        workerJSON[i].aboveC3 = tmpAbove.get3Value();

        workerJSON[i].belowC1 = tmpBelow.get1Value();
        workerJSON[i].belowC2 = tmpBelow.get2Value();
        workerJSON[i].belowC3 = tmpBelow.get3Value();

        var tmpWorker = new Worker('js/front/worker/VisWorker/colorMappingWorker.js');
        tmpWorker.addEventListener('message', eventFunctionColorMapping, false);

        workerArray.push(tmpWorker);
        workerFinished.push(false);

      }

      // seperate start of Worker
      allWorkerFinished=false;
      for (var i = 0; i < workerArray.length; i++) {
        workerArray[i].postMessage(workerJSON[i]);
      }

    }else{
      // recursive call for newest updated

      for (var i = workerArray.length-1; i >= 0 ; i--) {
          workerArray[i].terminate();
          workerArray.pop();
      }

      allWorkerFinished=true;
      updateMesh();

    }
  }
  else{

    var workCMS;

    if(document.getElementById("id_EditPage_MappingCMS_Select").selectedIndex==0){
      workCMS = cloneCMS(globalCMS1);
    }
    else{
      workCMS = globalCMS1.getProbeSet(document.getElementById("id_EditPage_MappingCMS_Select").selectedIndex-1).generateProbeCMS(globalCMS1);
    }

    for (var index = 0; index < globalDomain.getNumberOfCells(); index++) {

      var value= globalDomain.getCell(index).getCellValue();

      var toolColor = workCMS.calculateColor(globalDomain.getCell(index).getCellValue());

      if(doColorblindnessSim){
        var tmpLMS = toolColor.calcLMSColor();
        toolColor = tmpLMS.calcColorBlindRGBColor();
      }

      mappingMesh.geometry.faces[index * 2 + 0].color.setRGB( toolColor.getRValue(),toolColor.getGValue(),toolColor.getBValue());
      mappingMesh.geometry.faces[index * 2 + 1].color.setRGB( toolColor.getRValue(),toolColor.getGValue(),toolColor.getBValue());

    }

    mappingMesh.geometry.verticesNeedUpdate = true;
    mappingMesh.geometry.colorsNeedUpdate = true;

  }


  if(document.getElementById("id_EditPage_Histogram_Div").style.display!="none"){
      drawHistogram(true);
  }
}


function workerPreparation(){
   workerJSON=[];

   var numberOfCellsPerWorker= Math.floor(globalDomain.getNumberOfCells()/numWorkers);
   var rest = globalDomain.getNumberOfCells()%numWorkers;

   var currentIndex=0;
   for (var i = 0; i < numWorkers; i++) {
     var jsonObj = {};

     jsonObj['workerIndex'] = i;
     jsonObj['cellStartIndex'] = currentIndex;
     jsonObj['cellValues'] = [];
     jsonObj['colorspace'] = globalCMS1.getInterpolationSpace();
     jsonObj['refVal'] = [];
     jsonObj['key1cVal1'] = [];
     jsonObj['key1cVal2'] = [];
     jsonObj['key1cVal3'] = [];
     jsonObj['key2cVal1'] = [];
     jsonObj['key2cVal2'] = [];
     jsonObj['key2cVal3'] = [];
     jsonObj['MoT'] = [];

     jsonObj['simColorBlind'] = doColorblindnessSim;

     jsonObj['transferMatrixColorXYZ'] = tmXYZ_Selected;
     jsonObj['transferMatrixColorXYZ_Inv'] = tmXYZ_Selected_Inv;
     jsonObj['transferMatrixColorLMS'] = tmLMS_Selected;
     jsonObj['transferMatrixColorLMS_Inv'] = tmLMS_Selected_Inv;
     jsonObj['transferMatrixColorSIM'] = sim_AdaptiveColorblindness;

     jsonObj['din99_kE'] = din99_kE;
     jsonObj['din99_kCH'] = din99_kCH;
     jsonObj['cielab_ref_X'] = cielab_ref_X;
     jsonObj['cielab_ref_Y'] = cielab_ref_Y;
     jsonObj['cielab_ref_Z'] = cielab_ref_Z;

     jsonObj['aboveC1'] = undefined;
     jsonObj['aboveC2'] = undefined;
     jsonObj['aboveC3'] = undefined;

     jsonObj['belowC1'] = undefined;
     jsonObj['belowC2'] = undefined;
     jsonObj['belowC3'] = undefined;


     // fill cellIndices and cellValues
     if(i==numWorkers-1){
       numberOfCellsPerWorker+=rest; // last worker has to do a few more cells
     }

      for (var j = 0; j < numberOfCellsPerWorker; j++) {
        jsonObj.cellValues.push(globalDomain.getCell(currentIndex).getCellValue());
        currentIndex++;
      }


     workerJSON.push(jsonObj)
   }

   doneWorkerPreparation=true;


}
