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
  updateEditPage();

  if(document.getElementById("id_EditPage_Edit_Keys").style.display!="none"){
     openEditKeyDiv(document.getElementById("id_EditPage_EditKey_List").selectedIndex);
  }

  if(document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display!="none" && document.getElementById("id_EditPage_Edit_Path").style.display!="none" && pathColorspace!="rgb"){
      drawcolormap_hueSpace(true, true, true);
  }
}

function mouseMoveKeyRef(event){

 // cursor style:

 // calc mouse pos
 var rect = document.getElementById(event.target.id).getBoundingClientRect();

 var canvasPosX = event.clientX - rect.left;
 var canvasPosY = event.clientY - rect.top;

 //var ratioToColorspaceResolutionX = key_resolution_X/rect.width;
 //var  ratioToColorspaceResolutionY = key_resolution_Y/rect.height;

 mousePosX = canvasPosX;//*ratioToColorspaceResolutionX;
 mousePosY = canvasPosY;//*ratioToColorspaceResolutionY;

 // check if mouse is above a element

 if(grappedKey == false){
   document.getElementById(event.target.id).style.cursor="default";
   // check if Mouse is inside of a key rect

   overKeyID = -1;

   switch (event.target.id) {
     case "id_EditPage_CMS_VIS_LinearKeys":


     for(var i=keyRectPoint.length-1; i>=0; i--){

        if( mousePosX>=keyRectPoint[i] &&
            mousePosX<=keyRectPoint[i]+colorrectWitdh){
              document.getElementById(event.target.id).style.cursor="col-resize";
              overKeyID = i+1;
              break;
        }

     }
       break;

    case "id_EditPage_CMS_VIS_KeyBurs":
    for(var i=keyBurPoint.length-1; i>=0; i--){

        if(i==0 || i==keyBurPoint.length-1)
        continue;

       if( mousePosX>=keyBurPoint[i]-colorBurRadius &&
           mousePosX<=keyBurPoint[i]+colorBurRadius){
             document.getElementById(event.target.id).style.cursor="col-resize";
             overKeyID = i;
             break;
       }

    }
      break;
     default:

   }



 }
 else{



   var newRef = mousePosX/document.getElementById(event.target.id).width * Math.abs(globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1)-globalCMS1.getRefPosition(0))+globalCMS1.getRefPosition(0);
   newRef = parseFloat(newRef);



   switch (event.target.id) {
     case "id_EditPage_CMS_VIS_LinearKeys":
       if(newRef >= globalCMS1.getRefPosition(overKeyID-1) && newRef <= globalCMS1.getRefPosition(overKeyID+1)){
         globalCMS1.setRefPosition(overKeyID,newRef);
       }
       break;

    case "id_EditPage_CMS_VIS_KeyBurs":
      var oldDisBefore = Math.abs(globalCMS1.getRefPosition(keyBurKeyIndex[overKeyID-1])-globalCMS1.getRefPosition(keyBurKeyIndex[overKeyID]));
      var oldDisBehind = Math.abs(globalCMS1.getRefPosition(keyBurKeyIndex[overKeyID+1])-globalCMS1.getRefPosition(keyBurKeyIndex[overKeyID]));


      if(newRef >= globalCMS1.getRefPosition(keyBurKeyIndex[overKeyID-1]) && newRef <= globalCMS1.getRefPosition(keyBurKeyIndex[overKeyID+1])){

        var newDistance = Math.abs(globalCMS1.getRefPosition(keyBurKeyIndex[overKeyID+1])-newRef);
        var ratio = newDistance/oldDisBehind;

        for (var i = keyBurKeyIndex[overKeyID]+1; i < keyBurKeyIndex[overKeyID+1]; i++) {
          var tmpDis = Math.abs(globalCMS1.getRefPosition(i)-globalCMS1.getRefPosition(keyBurKeyIndex[overKeyID]));
          var tmpNewPos = newRef+tmpDis*ratio;
          globalCMS1.setRefPosition(i,tmpNewPos);
        }

        newDistance = Math.abs(globalCMS1.getRefPosition(keyBurKeyIndex[overKeyID-1])-newRef);
        ratio = newDistance/oldDisBefore;
        for (var i = keyBurKeyIndex[overKeyID]-1; i > keyBurKeyIndex[overKeyID-1]; i--) {
          var tmpDis = Math.abs(globalCMS1.getRefPosition(i)-globalCMS1.getRefPosition(keyBurKeyIndex[overKeyID-1]));
          var tmpNewPos = globalCMS1.getRefPosition(keyBurKeyIndex[overKeyID-1])+tmpDis*ratio;
          globalCMS1.setRefPosition(i,tmpNewPos);
        }

        globalCMS1.setRefPosition(keyBurKeyIndex[overKeyID],newRef);
      }

      break;
     default:

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
