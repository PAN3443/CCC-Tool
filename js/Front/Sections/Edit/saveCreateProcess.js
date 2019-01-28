

function saveCreateProcess(){

      if(processPosition<colormapProcess.length-1){

          colormapProcess = colormapProcess.slice(0, processPosition+1);
          colormapProcess.push(cloneCMS(globalCMS1));
          processPosition = colormapProcess.length-1
      }
      else{
        if(colormapProcess.length <= processLimitation){
          colormapProcess.push(cloneCMS(globalCMS1));
          processPosition = colormapProcess.length-1
        }
        else{
          colormapProcess.shift();
          colormapProcess.push(cloneCMS(globalCMS1));
          processPosition = colormapProcess.length-1
        }
      }

      somethingChanged=true;
      document.getElementById("id_header_editWarning").style.visibility="visible";
}



function undo(){
  if(processPosition>0){
    processPosition--;
    globalCMS1 = colormapProcess[processPosition];
    updateEditPage();

    if(document.getElementById("id_editPage_SelectEditPath").style.display!="none"){

      if(pathColorspace!="rgb"){
        drawcolormap_hueSpace(true, true, true);
      }
      else{
        drawcolormap_RGBSpace(true,true);
      }

    }


    if(document.getElementById("id_editPage_SelectEditKeys").style.display!="none"){
      selectKey();
    }

  }

}

function redo(){
  if(processPosition<colormapProcess.length-1){
    processPosition++;
    globalCMS1 = colormapProcess[processPosition];
    updateEditPage();

    if(document.getElementById("id_editPage_SelectEditPath").style.display!="none"){
      if(pathColorspace!="rgb"){
        drawcolormap_hueSpace(true, true, true);
      }
      else{
        drawcolormap_RGBSpace(true,true);
      }
    }

    if(document.getElementById("id_editPage_SelectEditKeys").style.display!="none"){
      selectKey();
    }
  }
}
