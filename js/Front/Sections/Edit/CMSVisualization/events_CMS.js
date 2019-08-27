function editCMS_MouseMove(event){

  if(globalCMS1.getKeyLength()!=0){

    var rect = event.target.getBoundingClientRect();
    var canvasPosX = event.clientX - rect.left;
    var canvasPosY = event.clientY - rect.top;
    var ratioToColorspaceResolutionX = event.target.width / rect.width;
    var ratioToColorspaceResolutionY = event.target.height / rect.height;
    mousePosX = canvasPosX * ratioToColorspaceResolutionX;
    mousePosY = canvasPosY * ratioToColorspaceResolutionY;

    /// Are we between Linear Key Start and Linear CMS End?
    /*var keyIndex = undefined;
    if(around_LinearCMSVis_yPosition()){
      keyIndex = getClosest_linearKey();



    }
    else if(around_SketchCMSVis_yPosition()){
      keyIndex = getClosest_sketchKey();
    }

    if(keyIndex!=undefined){
      // do somethingChanged
    }*/
  }

}

function editCMS_MouseClick(){
  /*for (var i = 1; i <= globalCMS1.getKeyLength()-1; i++) {
    if(mousePosX-(bandSketchObjLength*i)<=0){
      askIndex=i-1;
      askType=1;
      openAskWindow()
      break;
    }
  }*/

}

function around_LinearCMSVis_yPosition(){
  if(mousePosY>editCMS_linearKey_y1 && mousePosY<(editCMS_linearCMS_y1+editCMS_linearCMS_height)){
    return true;
  }
  else {
    return false;
  }
}


function around_SketchCMSVis_yPosition(){
  if(mousePosY>editCMS_sketchCMS_y1 && mousePosY<(editCMS_sketchKey_y1+editCMS_key_size)){
    return true;
  }
  else {
    return false;
  }
}


function getClosest_linearKey(){

  for (var index = 0; index < globalCMS1.getKeyLength(); index++) {
    var keyPos = editCMS_cmsArea_x1+Math.round((globalCMS1.getRefPosition(index) - globalCMS1.getRefPosition(0)) / (globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1) - globalCMS1.getRefPosition(0)) * editCMS_cmsArea_width);

    if(mousePosX>keyPos-editCMS_key_half && mousePosX<keyPos+editCMS_key_half){
      return index;
    }
  }

  return undefined;
}


function getClosest_sketchKey(){

  var sketch_BandWidth = Math.round(editCMS_cmsArea_width/(globalCMS1.getKeyLength()-1));
  var currentSktech_xPos = editCMS_cmsArea_x1;

  for (var index = 0; index < globalCMS1.getKeyLength(); index++) {

    if(mousePosX>currentSktech_xPos-editCMS_key_half && mousePosX<currentSktech_xPos+editCMS_key_half){
      return index;
    }

    currentSktech_xPos+=sketch_BandWidth;
  }

  return undefined;
}
