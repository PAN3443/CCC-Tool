//console.log(String.fromCharCode.apply(null, new Uint16Array(rawData)));


function startReadFile(){


  var selectobject=document.getElementById("combobox_selectField")
  for (var i=selectobject.length-1; i>=0; i--){
     selectobject.remove(i);
  }

  selectobject=document.getElementById("combobox_selectTimeStep")
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

      updateProgressBar(10);
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
        updateProgressBar(75);

        console.log("Start Color Mapping");
        drawMapping();
        updateProgressBar(100);

        if(document.getElementById("colormappingOptions_Container").style.display==="none")
        document.getElementById("colormappingOptions_Container").style.display="initial";


        if(document.getElementById("colormappingHistogram_Container").style.display==="none")
        document.getElementById("colormappingHistogram_Container").style.display="inline-block";

        if(document.getElementById("colormappingColorBlindnessSim_Container").style.display==="none")
        document.getElementById("colormappingColorBlindnessSim_Container").style.display="inline-block";

        if(document.getElementById("colormappingVis_Container").style.display==="none")
        document.getElementById("colormappingVis_Container").style.display="inline-block";

        document.getElementById("id_ProcessbarContainer").style.display="none";

        if(document.getElementById("showHideMappingHistogram").style.display!="none"){
            drawHistogram(false);
        }

        // update the positions of the input fields
        orderColorSketch(colorspaceModus);
      }







  }

  reader.onloadstart = function(e){

    if(document.getElementById("colormappingVis_Container").style.display=="none"){
      document.getElementById("colormappingVis_Container").style.display="inline-block";

      var canvasObj = document.getElementById("mappingDiv");
      var box = canvasObj.getBoundingClientRect();
      var drawWidth = box.width; //window.innerWidth;
      var drawHeight =box.height; // window.innerHeight;

    	mapping_camera.aspect = drawWidth/drawHeight;
    	mapping_camera.updateProjectionMatrix();

    	mapping_renderer.setSize(drawWidth, drawHeight);//*/

    }

    document.getElementById("mappingProcessText").innerHTML="Load Data:"
    document.getElementById("id_ProcessbarContainer").style.display="inline-block";
    updateProgressBar(0);

    // update the positions of the input fields
    orderColorSketch(colorspaceModus);

  }


    reader.onprogress = function(event) {

        var status = Math.round(event.loaded/event.total * 10);

        //setTimeout(function() {
            updateProgressBar(status);
        //}, 50);

    };



  reader.readAsText(file);

  doneWorkerPreparation=false;
}


function changeAutoUpdate(){
  if(document.getElementById('mapping_checkAutoUpdate')){
    orderColorSketch(colorspaceModus);
  }
}
