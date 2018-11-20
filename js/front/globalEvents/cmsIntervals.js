function calcCMSIntervals(workCMS, startKeyIndex, endKeyIndex,intervalMode){

  switch (intervalMode) {
    case 0:

        workCMS.calcGlobalIntervalColors(intervalSize, startKeyIndex, endKeyIndex, doNoMerge);


      break;


    case 2:


        workCMS.calcDeltaIntervalColors(intervalDelta, startKeyIndex, endKeyIndex);

    break;
    default:
      intervalMode=0;

        workCMS.calcGlobalIntervalColors(intervalSize, startKeyIndex, endKeyIndex, doNoMerge);


  }

  return workCMS;

}


function checkIntervalInputFieldsChange(event){

    checkInputVal(document.getElementById(event.target.id),false,false);

    if(parseFloat(document.getElementById(event.target.id).value)>=1)
    intervalSize = parseFloat(document.getElementById(event.target.id).value);
    else{
      //openAlert("Attention: The number of interval points have to be at least two.");
      document.getElementById(event.target.id).value=intervalSize;
      return;
    }

    switch (event.target.id) {
      case "id_ExportIntervalNum":
        fillExportTable();
        break;
      default:

    }


}

function checkIntervalInputFieldsKey(event){

  checkInputVal(document.getElementById(event.target.id),false,false);

  if (event.keyCode == 13) {

    if(parseFloat(document.getElementById(event.target.id).value)>=1)
    intervalSize = parseFloat(document.getElementById(event.target.id).value);
    else{
      //openAlert("Attention: The number of interval points have to be at least two.");
      document.getElementById(event.target.id).value=intervalSize;
      return;
    }


    switch (event.target.id) {
      case "id_ExportIntervalNum":
        fillExportTable();
        break;
      default:

    }


  }

}
