function drawMapping() {
  if(globalCMS1.getKeyLength()==0)
  return;

  if (globalDomain.getNumberOfFaces() == undefined) {
    console.log("Error there are no generated cells.");
    return;
  }

  coordinateArrowsGroup.position.x = 0;
  coordinateArrowsGroup.position.y = 0;


  var geometry = new THREE.Geometry();
  geometry.vertices = globalDomain.getPointArray();
  var rgbString ="rgb(0,0,0)"

  if(updateFieldValueColors(false)){

    //// create faces
    var faceArray = [];

    for (var i = 0; i < globalDomain.getNumberOfFaces(); i++) {
      var tmpFace = new THREE.Face3( 0,1,2 );
      tmpFace.vertexColors[0] = new THREE.Color("rgb(255,0,0)");
      tmpFace.vertexColors[1] = new THREE.Color("rgb(255,0,0)");
      tmpFace.vertexColors[2] = new THREE.Color("rgb(255,0,0)");
      faceArray.push(tmpFace)
    }


    for (var i = 0; i < globalDomain.getLengthOfFaceRelationArray(); i++) {
      var faceRelations = globalDomain.getFaceRelations(i);


      if(faceRelations!=undefined){
        for (var j = 0; j < faceRelations.length; j++) {

            if(faceArray[faceRelations[j][0]]==undefined){
              //console.log(faceRelations[j][0]);
              // console.log(i); ab 1881
              //console.log(faceRelations[j][1]); // is 2 always ????
              continue;
            }

            switch (faceRelations[j][1]) {
              case 0:
                  faceArray[faceRelations[j][0]].a =i;
                  faceArray[faceRelations[j][0]].vertexColors[0].setRGB(domainFieldColors[faceRelations[j][2]].getRValue(),domainFieldColors[faceRelations[j][2]].getGValue(),domainFieldColors[faceRelations[j][2]].getBValue());

                break;
                case 1:
                    faceArray[faceRelations[j][0]].b =i;
                    faceArray[faceRelations[j][0]].vertexColors[1].setRGB(domainFieldColors[faceRelations[j][2]].getRValue(),domainFieldColors[faceRelations[j][2]].getGValue(),domainFieldColors[faceRelations[j][2]].getBValue());

                  break;
                  case 2:
                      faceArray[faceRelations[j][0]].c =i;
                      faceArray[faceRelations[j][0]].vertexColors[2].setRGB(domainFieldColors[faceRelations[j][2]].getRValue(),domainFieldColors[faceRelations[j][2]].getGValue(),domainFieldColors[faceRelations[j][2]].getBValue());

                    break;

              default:
                console.log("Error at vertex index. Value = "+faceRelations[j][1]);
                return

            }

        }
      }


    }


    geometry.faces = faceArray;

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
              vertexColors: THREE.VertexColors
            } );


    mappingMesh = new THREE.Mesh(geometry, material);

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

  }

}





function updateFieldValueColors(updateMesh){

  if(globalDomain==undefined)
  return false;

  if(globalDomain.getNumberOfFieldValues(currentFieldIndex)==0)
  return false;


  if(updateMesh && mappingMesh==undefined)
  return false;

  var workCMS;

  if(document.getElementById("id_EditPage_MappingCMS_Select").selectedIndex==0){
    workCMS = cloneCMS(globalCMS1);
  }
  else{
    workCMS = globalCMS1.getProbeSet(document.getElementById("id_EditPage_MappingCMS_Select").selectedIndex-1).generateProbeCMS(globalCMS1);
  }

  domainFieldColors = new Array(globalDomain.getNumberOfFieldValues(currentFieldIndex)).fill(undefined);


  if(browserCanWorker && doParallelProcessing && updateMesh){

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

      var tmpNaN = workCMS.getNaNColor("rgb");
      var tmpAbove = workCMS.getAboveColor("rgb");
      var tmpBelow = workCMS.getBelowColor("rgb");


        workerJSON.colorspace = globalCMS1.getInterpolationSpace();
        workerJSON.refVal=tmpRefVal;
        workerJSON.key1cVal1=tmpkey1CVal1;
        workerJSON.key1cVal2=tmpkey1CVal2;
        workerJSON.key1cVal3=tmpkey1CVal3;
        workerJSON.key2cVal1=tmpkey2CVal1;
        workerJSON.key2cVal2=tmpkey2CVal2;
        workerJSON.key2cVal3=tmpkey2CVal3;
        workerJSON.MoT = tmpMoT;
        workerJSON.din99_kE = din99_kE;
        workerJSON.din99_kCH = din99_kCH;
        workerJSON.cielab_ref_X = cielab_ref_X;
        workerJSON.cielab_ref_Y = cielab_ref_Y;
        workerJSON.cielab_ref_Z = cielab_ref_Z;


        workerJSON.simColorBlind = doColorblindnessSim;

        workerJSON.transferMatrixColorXYZ = tmXYZ_Selected;
        workerJSON.transferMatrixColorXYZ_Inv = tmXYZ_Selected_Inv;
        workerJSON.transferMatrixColorLMS = tmLMS_Selected;
        workerJSON.transferMatrixColorLMS_Inv = tmLMS_Selected_Inv;
        workerJSON.transferMatrixColorSIM = sim_AdaptiveColorblindness;



        workerJSON.nanC1 = tmpNaN.get1Value();
        workerJSON.nanC2 = tmpNaN.get2Value();
        workerJSON.nanC3 = tmpNaN.get3Value();

        workerJSON.aboveC1 = tmpAbove.get1Value();
        workerJSON.aboveC2 = tmpAbove.get2Value();
        workerJSON.aboveC3 = tmpAbove.get3Value();

        workerJSON.belowC1 = tmpBelow.get1Value();
        workerJSON.belowC2 = tmpBelow.get2Value();
        workerJSON.belowC3 = tmpBelow.get3Value();

        mappingWorker = new Worker('js/front/worker/VisWorker/colorMappingWorker.js');
        mappingWorker.addEventListener('message', eventFunctionColorMapping, false);

        // seperate start of Worker
        allWorkerFinished=false;

        mappingWorker.postMessage(workerJSON);


    }else{
      // recursive call for newest updated

      if(mappingWorker!=undefined)
      mappingWorker.terminate();


      allWorkerFinished=true;
      updateFieldValueColors(true);

    }
    return false; // should never happen
  }
  else{

    for (var i = 0; i < globalDomain.getLengthOfFaceRelationArray(); i++) {
      var faceRelations = globalDomain.getFaceRelations(i);

      if(faceRelations!=undefined)
        for (var j = 0; j < faceRelations.length; j++) {

          var tmpRGBColor = workCMS.calculateColor(globalDomain.getFieldValue(currentFieldIndex, faceRelations[j][2]));

          if(doColorblindnessSim){
            var tmpLMS = tmpRGBColor.calcLMSColor();
            tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
          }

          domainFieldColors[faceRelations[j][2]]=tmpRGBColor;

          if(updateMesh){
            mappingMesh.geometry.faces[faceRelations[j][0]].vertexColors[faceRelations[j][1]].setRGB(domainFieldColors[faceRelations[j][2]].getRValue(),domainFieldColors[faceRelations[j][2]].getGValue(),domainFieldColors[faceRelations[j][2]].getBValue());
          }


        }
    }

    if(updateMesh){
      mappingMesh.geometry.colorsNeedUpdate = true;

      if(document.getElementById("id_EditPage_Histogram_Div").style.display!="none"){
          drawHistogram(true);
      }
    }

    return true;

  }





}


function workerPreparation(){

   workerJSON = {};

   workerJSON['domainFieldValues'] = [];
   workerJSON['colorspace'] = globalCMS1.getInterpolationSpace();
   workerJSON['refVal'] = [];
   workerJSON['key1cVal1'] = [];
   workerJSON['key1cVal2'] = [];
   workerJSON['key1cVal3'] = [];
   workerJSON['key2cVal1'] = [];
   workerJSON['key2cVal2'] = [];
   workerJSON['key2cVal3'] = [];
   workerJSON['MoT'] = [];

   workerJSON['simColorBlind'] = doColorblindnessSim;

   workerJSON['transferMatrixColorXYZ'] = tmXYZ_Selected;
   workerJSON['transferMatrixColorXYZ_Inv'] = tmXYZ_Selected_Inv;
   workerJSON['transferMatrixColorLMS'] = tmLMS_Selected;
   workerJSON['transferMatrixColorLMS_Inv'] = tmLMS_Selected_Inv;
   workerJSON['transferMatrixColorSIM'] = sim_AdaptiveColorblindness;

   workerJSON['din99_kE'] = din99_kE;
   workerJSON['din99_kCH'] = din99_kCH;
   workerJSON['cielab_ref_X'] = cielab_ref_X;
   workerJSON['cielab_ref_Y'] = cielab_ref_Y;
   workerJSON['cielab_ref_Z'] = cielab_ref_Z;

   workerJSON['nanC1'] = undefined;
   workerJSON['nanC2'] = undefined;
   workerJSON['nanC3'] = undefined;

   workerJSON['aboveC1'] = undefined;
   workerJSON['aboveC2'] = undefined;
   workerJSON['aboveC3'] = undefined;

   workerJSON['belowC1'] = undefined;
   workerJSON['belowC2'] = undefined;
   workerJSON['belowC3'] = undefined;

   var tmpArrayValue = [];
   var tmpArrayFace = [];
   var tmpArrayVertex = [];
   for (var i = 0; i < globalDomain.getNumberOfFieldValues(currentFieldIndex); i++) {
     tmpArrayValue.push(undefined);
     var newArray1 = [];
     tmpArrayFace.push(newArray1);
     var newArray2 = [];
     tmpArrayVertex.push(newArray2);

   }

   for (var i = 0; i < globalDomain.getLengthOfFaceRelationArray(); i++) {
     var faceRelations = globalDomain.getFaceRelations(i);

     if(faceRelations!=undefined)
       for (var j = 0; j < faceRelations.length; j++) {


         tmpArrayValue[faceRelations[j][2]] = globalDomain.getFieldValue(currentFieldIndex, faceRelations[j][2]);

         tmpArrayFace[faceRelations[j][2]].push(faceRelations[j][0]);

         tmpArrayVertex[faceRelations[j][2]].push(faceRelations[j][1]);


       }
   }

   mappingFaceIndexArray = [];
   mappingVertexIndexArray = [];

   for (var i = 0; i < tmpArrayValue.length; i++) {
     if(tmpArrayValue!=undefined){
       workerJSON.domainFieldValues.push(tmpArrayValue[i]);
       mappingFaceIndexArray.push(tmpArrayFace[i]);
       mappingVertexIndexArray.push(tmpArrayVertex[i]);
     }
   }


   doneWorkerPreparation=true;

}
