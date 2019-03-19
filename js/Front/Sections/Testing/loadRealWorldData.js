function loadRealWorldData() {

  var path = "resource/realWorldData/Med/";
  medicalData = new Array(medicalFiles.length);
  for (var i = 0; i < medicalFiles.length; i++) {
      var url = path+medicalFiles[i];
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = (function(index) {
      return function () {
        medicalData[index] = getCanvasImgData(this);
      };
      })(i);

      img.src = url;
  }


  path = "resource/realWorldData/Bio/";
  bioData = new Array(bioFiles.length);
  for (var i = 0; i < bioFiles.length; i++) {
      var url = path+bioFiles[i];
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = (function(index) {
      return function () {
        bioData[index] = getCanvasImgData(this);
      };
      })(i);

      img.src = url;
  }


  path = "resource/realWorldData/Other/";
  otherData = new Array(otherFiles.length);
  for (var i = 0; i < otherFiles.length; i++) {
      var url = path+otherFiles[i];
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = (function(index) {
      return function () {
        otherData[index] = getCanvasImgData(this);
      };
      })(i);

      img.src = url;
  }


}


function getCanvasImgData(img){

  var canvas = document.createElement('canvas');
  canvas.width =img.width;
  canvas.height =img.height;

  var context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);

  var canvasData = context.getImageData(0,0,canvas.width,canvas.height);

  var newDataArray = new Array(canvas.width);
  for (var x = 0; x < canvas.width; x++) {

    var tmpArray = new Array(canvas.height);
    for (var y = 0; y < canvas.height; y++) {

        var index = (x + y * canvas.width) * 4;

        var value = canvasData.data[index + 0]/255;
        tmpArray[canvas.height-1-y]= value;

    }
    newDataArray[x]=tmpArray;
  }

  return newDataArray;
}
