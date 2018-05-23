//console.log(String.fromCharCode.apply(null, new Uint16Array(rawData)));


function startReadFile(){
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
    var content = e.target.result;


    var fileExtension = fileName.replace(/^.*\./, '');
    var cms;

    switch (fileExtension) {
            case 'vtk': case 'VTK':
                cms = vtk_reader(content);
                break;
            default:
                console.log("Error at readCMSFile function -> file extension is unknown!");
                return;
    }


  };


  reader.readAsText(file);


}
