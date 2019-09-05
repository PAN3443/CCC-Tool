

function keyAdd2DAnimation(){

  if(editCMS_drawADDKey){
    drawEditCMSVIS(workCMS_Edit,[]);
  }

}


function keyChange2DAnimation(){
  updateEditPage();
}

function editCMS_MouseMove(event){

  if(globalCMS1.getKeyLength()!=0){

    var rect = event.target.getBoundingClientRect();
    var canvasPosX = event.clientX - rect.left;
    var canvasPosY = event.clientY - rect.top;
    var ratioToColorspaceResolutionX = event.target.width / rect.width;
    var ratioToColorspaceResolutionY = event.target.height / rect.height;
    mousePosX = canvasPosX * ratioToColorspaceResolutionX;
    mousePosY = canvasPosY * ratioToColorspaceResolutionY;

    if(editCMS_AddKeyModus){
      if(around_LinearCMSVis_yPosition() && mousePosX>editCMS_cmsArea_x1 && mousePosX<editCMS_cmsArea_x1+editCMS_cmsArea_width){

        var tmpRef = (mousePosX-editCMS_cmsArea_x1)/editCMS_cmsArea_width * Math.abs(globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1)-globalCMS1.getRefPosition(0))+globalCMS1.getRefPosition(0);
        tmpRef = parseFloat(tmpRef);

        var tmpColor = globalCMS1.calculateColor(tmpRef);
        var tmpColor2 = new classColor_RGB(tmpColor.get1Value(),tmpColor.get2Value(),tmpColor.get3Value());

        workCMS_Edit = cloneCMS(globalCMS1);
        workCMS_Edit.addKey(new class_Key(tmpColor, tmpColor2, tmpRef, false));
        editCMS_drawADDKey=true;
        editCMS_AddKeyDrawOriginal=true;
      }
      else{
        if(editCMS_AddKeyDrawOriginal){
          drawEditCMSVIS(globalCMS1,[]);
          editCMS_AddKeyDrawOriginal=false;
        }
        editCMS_drawADDKey=false;
      }
    }
    else if(!grappedKey && !grappedBurdock){

        document.getElementById('id_EditPage_CMSVisCanvas').style.cursor = "default";

        /// Are we between Linear Key Start and Linear CMS End?
        var keyIndex = getClosest_linearKey();

        overKeyID = undefined;
        overBurdockID = undefined;
        if(about_LinearKey_yPosition()){
          overKeyID = keyIndex;

          if(overKeyID==0 || overKeyID == globalCMS1.getKeyLength()-1)
            overKeyID=undefined;
        }
        else if(about_BurdockLine_yPosition()){

          overBurdockID = keyIndex;

          if(keyIndex!=undefined){
            if(!globalCMS1.getBur(keyIndex)){
              keyIndex=undefined;
              overBurdockID=undefined;
            }
            else {
              if(overBurdockID==0 || overBurdockID == globalCMS1.getKeyLength()-1)
                overBurdockID=undefined;
            }

            // search for bur after and bur before
            if(overBurdockID!=undefined){

              burdockID_before = undefined;
              burdockID_after = undefined;

              for (var i = overBurdockID-1; i >=0; i--) {
                if(globalCMS1.getBur(i)){
                  burdockID_before=i;
                  break;
                }
              }

              for (var i = overBurdockID+1; i <globalCMS1.getKeyLength(); i++) {
                if(globalCMS1.getBur(i)){
                  burdockID_after=i;
                  break;
                }
              }
            }
          }

        }

        if(editCMS_RemoveKeyModus)
          overBurdockID=undefined;

        if(overKeyID!=undefined || overBurdockID!=undefined){
          document.getElementById('id_EditPage_CMSVisCanvas').style.cursor = "pointer";
        }
      }
      else if(grappedKey){
        var newRef = (mousePosX-editCMS_cmsArea_x1)/editCMS_cmsArea_width * Math.abs(globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1)-globalCMS1.getRefPosition(0))+globalCMS1.getRefPosition(0);
        newRef = parseFloat(newRef);

        if(newRef >= globalCMS1.getRefPosition(overKeyID-1) && newRef <= globalCMS1.getRefPosition(overKeyID+1)){
          globalCMS1.setRefPosition(overKeyID,newRef);
        }
      }
      else if(grappedBurdock) {

        if(burdockID_before == undefined || burdockID_after == undefined)
          return;

        var newRef = (mousePosX-editCMS_cmsArea_x1)/editCMS_cmsArea_width * Math.abs(globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1)-globalCMS1.getRefPosition(0))+globalCMS1.getRefPosition(0);
        newRef = parseFloat(newRef);

        var oldDisBefore = Math.abs(globalCMS1.getRefPosition(burdockID_before)-globalCMS1.getRefPosition(overBurdockID));
        var oldDisBehind = Math.abs(globalCMS1.getRefPosition(burdockID_after)-globalCMS1.getRefPosition(overBurdockID));


        if(newRef >= globalCMS1.getRefPosition(burdockID_before) && newRef <= globalCMS1.getRefPosition(burdockID_after)){

          var newDistance = Math.abs(globalCMS1.getRefPosition(burdockID_after)-newRef);
          var ratio = newDistance/oldDisBehind;

          for (var i = overBurdockID+1; i < burdockID_after; i++) {
            var tmpDis = Math.abs(globalCMS1.getRefPosition(i)-globalCMS1.getRefPosition(overBurdockID));
            var tmpNewPos = newRef+tmpDis*ratio;
            globalCMS1.setRefPosition(i,tmpNewPos);
          }

          newDistance = Math.abs(globalCMS1.getRefPosition(burdockID_before)-newRef);
          ratio = newDistance/oldDisBefore;
          for (var i = overBurdockID-1; i > burdockID_before; i--) {
            var tmpDis = Math.abs(globalCMS1.getRefPosition(i)-globalCMS1.getRefPosition(burdockID_before));
            var tmpNewPos = globalCMS1.getRefPosition(burdockID_before)+tmpDis*ratio;
            globalCMS1.setRefPosition(i,tmpNewPos);
          }

          globalCMS1.setRefPosition(overBurdockID,newRef);
        }

      }






  }

}

function editCMS_MouseDown(){

  if(editCMS_AddKeyModus){

    globalCMS1=cloneCMS(workCMS_Edit);
    updateEditPage();
    /////////////
    ////  Save Band Process
    saveCreateProcess();

    if(editPage_optimizationMode){
      updateOptimizationPage();
    }

  }
  else if(editCMS_RemoveKeyModus){

    if(overKeyID==0 || overKeyID==undefined || overKeyID==globalCMS1.getKeyLength()-1)
      return;

    globalCMS1.deleteKey(overKeyID);
    globalCMS1JSON=inform_Worker_GlobalCMS();
    /////////////
    ////  Save Band Process
    saveCreateProcess();

    if(editPage_optimizationMode){
      updateOptimizationPage();
    }

    updateEditPage();
  }
  else{
    if(overKeyID!=undefined){
        grappedKey = true;
        document.getElementById('id_EditPage_CMSVisCanvas').style.cursor="col-resize";
        timer2DAnimation = setInterval(keyChange2DAnimation, animationInterval);
    }
    else {
        grappedKey = false;
    }

    if(overBurdockID!=undefined){
        grappedBurdock = true;
        document.getElementById('id_EditPage_CMSVisCanvas').style.cursor="col-resize";
        timer2DAnimation = setInterval(keyChange2DAnimation, animationInterval);
    }
    else {
        grappedBurdock = false;
    }
  }

}

function editCMS_MouseUp(){
  if(grappedKey || grappedBurdock){
    clearInterval(timer2DAnimation);
    grappedKey = false;
    grappedBurdock = false;
    overKeyID = undefined;
    overBurdockID = undefined;
    saveCreateProcess();
    globalCMS1JSON=inform_Worker_GlobalCMS();

    if(editPage_optimizationMode){
      updateOptimizationPage();
    }
  }
}

function editCMS_MouseEnter(){

  if(editCMS_AddKeyModus){
    timer2DAnimation = setInterval(keyAdd2DAnimation, animationInterval);
  }
  else {
    if(grappedKey || grappedBurdock){
      clearInterval(timer2DAnimation);
      grappedKey = false;
      grappedBurdock = false;
      overKeyID = undefined;
      overBurdockID = undefined;
      saveCreateProcess();
      globalCMS1JSON=inform_Worker_GlobalCMS();

      if(editPage_optimizationMode){
        updateOptimizationPage();
      }
    }
  }

}

function editCMS_MouseLeave(){

  if(editCMS_AddKeyDrawOriginal){
    drawEditCMSVIS(globalCMS1,[]);
    editCMS_AddKeyDrawOriginal=false;
  }

  clearInterval(timer2DAnimation);
  grappedKey = false;
  grappedBurdock = false;
  overKeyID = undefined;
  overBurdockID = undefined;

  if(grappedKey || grappedBurdock){
    saveCreateProcess();
    globalCMS1JSON=inform_Worker_GlobalCMS();

    if(editPage_optimizationMode){
      updateOptimizationPage();
    }
  }
}


function about_LinearKey_yPosition(){
  if(mousePosY>editCMS_linearKey_y1 && mousePosY<(editCMS_linearKey_y1+editCMS_key_size)){
    return true;
  }
  else {
    return false;
  }
}

function about_BurdockLine_yPosition(){
  if(mousePosY>editCMS_burdock_y1 && mousePosY<(editCMS_burdock_y1+editCMS_burdock_height)){
    return true;
  }
  else {
    return false;
  }
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

function changeAddKeyModus(){


  if(editCMS_AddKeyModus){
    editCMS_AddKeyModus=false;
    document.getElementById("id_EditPage_AddKeyButton").classList.remove("class_EditPage_EditButtonActive");
    document.getElementById("id_EditPage_AddKeyButton").classList.add("class_EditPage_EditButton");
    document.getElementById("id_header_AddModus").style.visibility = "hidden";
  }
  else {

    if(editCMS_RemoveKeyModus){
      changeRemoveKeyModus();
    }

    editCMS_AddKeyModus=true;
    document.getElementById("id_EditPage_AddKeyButton").classList.remove("class_EditPage_EditButton");
    document.getElementById("id_EditPage_AddKeyButton").classList.add("class_EditPage_EditButtonActive");
    document.getElementById("id_header_AddModus").style.visibility = "visible";
    document.getElementById("id_header_AddModus").innerHTML = "+";
    document.getElementById("id_header_AddModus").title="ADD Key Modus";
  }

}

function changeRemoveKeyModus(){

  if(editCMS_RemoveKeyModus){
    editCMS_RemoveKeyModus=false;
    document.getElementById("id_EditPage_RemoveKeyButton").classList.remove("class_EditPage_EditButtonActive");
    document.getElementById("id_EditPage_RemoveKeyButton").classList.add("class_EditPage_EditButton");
    document.getElementById("id_header_AddModus").style.visibility = "hidden";
  }
  else {

    if(editCMS_AddKeyModus){
      changeAddKeyModus();
    }

    editCMS_RemoveKeyModus=true;
    document.getElementById("id_EditPage_RemoveKeyButton").classList.remove("class_EditPage_EditButton");
    document.getElementById("id_EditPage_RemoveKeyButton").classList.add("class_EditPage_EditButtonActive");
    document.getElementById("id_header_AddModus").style.visibility = "visible";
    document.getElementById("id_header_AddModus").innerHTML = "-";
    document.getElementById("id_header_AddModus").title="Remove Key Modus";
  }

}


function editCMS_equalKeyIntervals(){
  askType=7;
  openAskWindow();
}
