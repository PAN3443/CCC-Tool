
function loadImgData(img){

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
