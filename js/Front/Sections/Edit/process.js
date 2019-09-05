

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

    if(editPage_optimizationMode){
      updateOptimizationPage();
    }

  }

}

function redo(){
  if(processPosition<colormapProcess.length-1){
    processPosition++;
    globalCMS1 = colormapProcess[processPosition];
    updateEditPage();

    if(editPage_optimizationMode){
      updateOptimizationPage();
    }
  }
}
