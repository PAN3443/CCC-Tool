

function saveCreateProcess(){

      /*if(processPosition<colormapProcess.length-1){

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
      }*/
      
      somethingChanged=true;
      document.getElementById("id_header_editWarning").style.display="inline-block";
}
