
function workerEvent_Draw_PP_Background(e) {

    var canvas = document.getElementById(e.data.canvasID);
    canvas.width = e.data.imageData.width;
    canvas.height = e.data.imageData.height;

    var canvasContex = canvas.getContext("2d");
    canvasContex.clearRect(0, 0, canvas.width, canvas.height);
    canvasContex.putImageData(e.data.imageData, 0, 0);

    if(e.data.pp_space==="rgb"){
      draw_RGB_Coordinates(canvasContex, canvas.clientWidth, e.data.label1, e.data.label2);
    }

}
