function canvasToHTMLSize(canvasID){
  var canvasObj = document.getElementById(canvasID);
  var canvasObjBox = canvasObj.getBoundingClientRect();
  canvasObj.width = canvasObjBox.width;
  canvasObj.height = canvasObjBox.height;
}

function clearCanvas (canvasID){
  var canvasObj = document.getElementById(canvasID);
  const context = canvasObj.getContext('2d');
  context.clearRect(0, 0, canvasObj.width, canvasObj.height);
}

function getColorIndicesForCoord(x, y, width) {
  var red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}
