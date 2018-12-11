//console.log(String.fromCharCode.apply(null, new Uint16Array(rawData)));


function startReadFile(){


  var selectobject=document.getElementById("id_EditPage_SelectMappingField")
  for (var i=selectobject.length-1; i>=0; i--){
     selectobject.remove(i);
  }

  selectobject=document.getElementById("id_EditPage_SelectMappingTimeStep")
  for (var i=selectobject.length-1; i>=0; i--){
     selectobject.remove(i);
  }


  document.getElementById('id_inputData').click();


}

function readDataFile(e) {

  var file = e.target.files[0];
  if (!file) {
    return;
  }

  var fileName = file.name;

  var reader = new FileReader();

  reader.onload = function(e) {

    domainContent = e.target.result;

    var fileExtension = fileName.replace(/^.*\./, '');

    switch (fileExtension) {
            case 'vtk': case 'VTK':
                fileType = 0;
                break;
            default:
                fileType=-1;
                return;
    }


  };


  reader.onloadend = function(e){

      //updateProgressBar(10);
      var readerResult = false;
      switch (fileType) {
              case 0:
                  readerResult=vtk_reader(domainContent);
                  break;
              default:
                  console.log("Error at readCMSFile function -> file extension is unknown!");
                  return;
      }

      if(readerResult){


        console.log("Generate Cells");
        console.log("Number of generated Cells = "+ globalDomain.generateCells(currentFieldIndex,currentTimeIndex));

        console.log("Start Color Mapping");
        drawMapping();


        document.getElementById("id_EditPage_DataAutoScaleButton").style.visibility="visible";
        document.getElementById("id_EditPage_DataInfoButton").style.visibility="visible";

        if (document.getElementById("id_dropDownMenue_ShowHistogram").classList.contains('dropdownNotActiveMenuButton'))
          document.getElementById("id_dropDownMenue_ShowHistogram").classList.remove('dropdownNotActiveMenuButton');

        if (!document.getElementById("id_dropDownMenue_ShowHistogram").classList.contains('dropdownMenuButton'))
          document.getElementById("id_dropDownMenue_ShowHistogram").classList.toggle("dropdownMenuButton");



        if(document.getElementById("id_EditPage_Histogram_Div").style.display!="none"){
            drawHistogram(false);
        }

        // update the positions of the input fields
        updateEditPage();
      }







  }

  //reader.onloadstart = function(e){

    /*if(document.getElementById("colormappingVis_Container").style.display=="none"){
      document.getElementById("colormappingVis_Container").style.display="inline-block";

      var canvasObj = document.getElementById("mappingDiv");
      var box = canvasObj.getBoundingClientRect();
      var drawWidth = box.width; //window.innerWidth;
      var drawHeight =box.height; // window.innerHeight;

    	mapping_camera.aspect = drawWidth/drawHeight;
    	mapping_camera.updateProjectionMatrix();

    	mapping_renderer.setSize(drawWidth, drawHeight);//* /

    }*/

    //document.getElementById("mappingProcessText").innerHTML="Load Data:"
    //document.getElementById("id_ProcessbarContainer").style.display="inline-block";
    //updateProgressBar(0);

    // update the positions of the input fields
    //orderColorSketch(colorspaceModus);

  //}


    /*reader.onprogress = function(event) {

        var status = Math.round(event.loaded/event.total * 10);

        //setTimeout(function() {
            updateProgressBar(status);
        //}, 50);

    };*/



  reader.readAsText(file);

  doneWorkerPreparation=false;
}


function changeAutoUpdate(){
  if(document.getElementById('mapping_checkAutoUpdate')){
    orderColorSketch(colorspaceModus);
  }
}
