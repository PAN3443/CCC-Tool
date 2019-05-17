function jsonAddCanvas(json, canvasID){

  if(browserCanOffscreenCanvas){
    var htmlCanvas = document.getElementById(canvasID);

    var offscreen = htmlCanvas.transferControlToOffscreen();
    json['canvas'] = offscreen;
  }
    return json;
  
}
