function mouseEnterKeyRef(){
  overKeyID = -1;
  grappedKey = false;
}

function mouseLeaveKeyRef(){
  overKeyID = -1;
  grappedKey = false;

  if(mouseKeyChangeUp == false){
      saveCreateProcess();
  }
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
 var tmpC1HSV = getHSVColor(true);

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
            overKeyID = i;
            break;
      }

   }
 }
 else{
   // change value
   var newRef = mousePosX/key_resolution_X * Math.abs(bandSketch.getRefR2(bandSketch.getBandLenght()-1)-bandSketch.getRefR1(0))+bandSketch.getRefR1(0);
   newRef = parseFloat(newRef.toFixed(numDecimalPlaces));
   if(newRef >= bandSketch.getRefR1(overKeyID) && newRef <= bandSketch.getRefR2(overKeyID+1)){
     bandSketch.setRefR2(overKeyID,newRef);
     bandSketch.setRefR1(overKeyID+1,newRef);
     orderColorSketch(colorspaceModus);
   }

 }
}

function mouseDownKeyRef(){

  if(overKeyID!=-1){
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

  saveCreateProcess();
}
