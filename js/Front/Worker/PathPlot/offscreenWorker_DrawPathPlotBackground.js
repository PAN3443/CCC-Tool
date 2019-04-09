

onmessage = function(evt) {
  var canvas = evt.data.canvas;
  var ctx = canvas.getContext("2d");

  var height = canvas.height;
  var width = canvas.width;

  var currentSize = 0;
  var rising = true;

  function render(time) {

    ctx.clearRect(0, 0, width, height);
    if(rising){
      currentSize+=0.01;
      if(currentSize>=1)
        rising=false;
    }
    else{
      currentSize-=0.01;

      if(currentSize<=0)
        rising=true;
    }

    ctx.fillRect(0, 0, width*currentSize, height*currentSize);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);*/


  //self.importScripts('js/Front/GlobalEvents/CMSColorGradient/calcGradientLinear.js');
  self.importScripts('../../GlobalEvents/CMSColorGradient/calcGradientLinear.js');

  var results = calcGradientWorker(0,0,255,255,0,0,0.25);
  console.log(results);




};
