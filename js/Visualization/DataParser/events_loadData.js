//console.log(String.fromCharCode.apply(null, new Uint16Array(rawData)));


function startReadFile(){

  document.getElementById("processWindow").style.display="inline-block";
  document.getElementById('id_inputData').click();

  document.getElementById("id_processBar").style.width = "0px";
  document.getElementById("id_processBar").style.background = styleActiveColor;

}

function readDataFile(e) {

  var file = e.target.files[0];
  if (!file) {
    return;
  }

  var fileName = file.name;

  var reader = new FileReader();
  reader.onload = function(e) {
    var content = e.target.result;


    var fileExtension = fileName.replace(/^.*\./, '');
    var cms;

    switch (fileExtension) {
            case 'vtk': case 'VTK':

                document.getElementById("id_taskText").innerHTML="Task: Load and render VTK file.";
                cms = vtk_reader(content);
                break;
            default:
                console.log("Error at readCMSFile function -> file extension is unknown!");
                return;
    }

    document.getElementById("processWindow").style.display="none";


  };


  reader.readAsText(file);


}
