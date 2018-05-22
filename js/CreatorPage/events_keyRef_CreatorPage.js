function mouseEnterKeyRef(){
  overKeyID = -1;
  grappedKey = false;
}

function mouseLeaveKeyRef(){
  overKeyID = -1;
  grappedKey = false;
  clearInterval(timer2DAnimation);
  if(mouseKeyChangeUp == false){
      saveCreateProcess();
  }
}


function keyChange2DAnimation(){
  orderColorSketch(colorspaceModus);
}

function mouseMoveKeyRef(event){

 // cursor style:

 // calc mouse pos
 var rect = document.getElementById("id_keyColormap").getBoundingClientRect();

 var canvasPosX = event.clientX - rect.left;
 var canvasPosY = event.clientY - rect.top;

 var ratioToColorspaceResolutionX = key_resolution_X/rect.width;
 var ratioToColorspaceResolutionY = key_resolution_Y/rect.height;

 mousePosX = canvasPosX*ratioToColorspaceResolutionX;
 mousePosY = canvasPosY*ratioToColorspaceResolutionY;

 // check if mouse is above a element

 if(grappedKey == false){
   document.getElementById("id_keyColormap").style.cursor="default";
   // check if Mouse is inside of a key rect
   overKeyID = -1;
   for(var i=keyRectPoint.length-1; i>=0; i--){

      if( mousePosX>=keyRectPoint[i][0] &&
          mousePosX<=keyRectPoint[i][0]+colorrectWitdh &&
          mousePosY>keyRectPoint[i][1] &&
          mousePosY<keyRectPoint[i][1]+colorrectHeigth ){
            document.getElementById("id_keyColormap").style.cursor="col-resize";
            overKeyID = i+1;
            break;
      }

   }
 }
 else{
   // change value
   var newRef = mousePosX/key_resolution_X * Math.abs(globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1)-globalCMS1.getRefPosition(0))+globalCMS1.getRefPosition(0);
   newRef = parseFloat(newRef.toFixed(numDecimalPlaces));
   if(newRef >= globalCMS1.getRefPosition(overKeyID-1) && newRef <= globalCMS1.getRefPosition(overKeyID+1)){
     globalCMS1.setRefPosition(overKeyID,newRef);
     somethingChanged = true;
   }

 }
}

function mouseDownKeyRef(){

  if(overKeyID!=-1){
    timer2DAnimation = setInterval(keyChange2DAnimation, animationInterval);
    grappedKey = true;
    mouseKeyChangeUp = false;
  }

}

function mouseUpKeyRef(){
  overKeyID = -1;
  grappedKey = false;
  mouseKeyChangeUp = true;
  /////////////
  ////  Save Band Process
  clearInterval(timer2DAnimation);
  saveCreateProcess();
}
