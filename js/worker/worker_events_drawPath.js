


function eventFunctionDrawPath_HSV_LAB_DIN99(e){

  var data = e.data;

  switch (data.modus){
      case 'drawLine':

      drawLine(workerPathContext,data.xPos,data.yPos,data.xPos2,data.yPos2, data.dashed, data.isCompareMap);

      break;

      case 'drawLineVContext':

      drawLine(workerVPathContext,data.xPos,data.yPos,data.xPos2,data.yPos2, data.dashed, data.isCompareMap);

      break;

      case 'finish':

      workerDrawPathIsBusy=false;

      default:

  };


}
