

//import {startAnimation_MetricInt_Graph, stopAnimation_MetricInt_Graph} from './graphRendering.js';

function closeMetricIntOpt(){
  document.getElementById("id_PopUp_MetricIntOpt").style.display="none";
  stopAnimation_MetricInt_Graph();
}

function openMetricIntOpt(){
  document.getElementById("id_PopUp_MetricIntOpt").style.display="flex";
  document.getElementById("id_dropDownContainer").style.display="none";
  updateMetricInterSpace();
  startAnimation_MetricInt_Graph();
  initForceGraph();
}


function updateMetricInterSpace(){
  if(document.getElementById("id_MetricInter_RGB_Select").checked){
    document.getElementById("id_metricInter_RGB_Options").style.display = "block";
    document.getElementById("id_metricInter_Lab_Options").style.display = "none";
    document.getElementById("id_MetricInter_RGB_Sampling").value = mericInt_rgb_IntervalDelta;
  }
  else{
    document.getElementById("id_metricInter_Lab_Options").style.display = "block";
    document.getElementById("id_metricInter_RGB_Options").style.display = "none";
    document.getElementById("id_MetricInter_L_Sampling").value = mericInt_lab_LSampling;
    document.getElementById("id_MetricInter_AB_Sampling").value = mericInt_lab_ABSampling;
  }
}


function calcMetricIntGraph(){

  testForceGraph();
  return;

  document.getElementById("id_MetricInter_ProcessBar").style.width = "0%";
  document.getElementById("id_MetricInter_ProcessBarDiv").style.visibility = "hidden";

  var workerJSON = {};

  workerJSON['message'] = "createGraph";

  if(document.getElementById("id_MetricInter_RGB_Select").checked){
    workerJSON['graphType'] = "rgb";
    var tmpVal = document.getElementById("id_MetricInter_RGB_Sampling").value;

    if(isNaN(tmpVal)){
      document.getElementById("id_MetricInter_InputWarn").innerHTML = "Invalid value for the RGB sampling!";
      return;
    }
    if(tmpVal<1){
      document.getElementById("id_MetricInter_InputWarn").innerHTML = "Invalid value for the AB sampling! The value has to be bigger than 1!";
      return;
    }
    if(tmpVal>255){
      document.getElementById("id_MetricInter_InputWarn").innerHTML = "Invalid value for the AB sampling! The value has to be smaller than 255!";
      return;
    }
    workerJSON['rgb_Sampling'] = tmpVal;

  }
  else{
    workerJSON['graphType'] = "lab";

    var tmpVal = document.getElementById("id_MetricInter_L_Sampling").value;

    if(isNaN(tmpVal)){
      document.getElementById("id_MetricInter_InputWarn").innerHTML = "Invalid value for the L sampling!";
      return;
    }
    if(tmpVal<1){
      document.getElementById("id_MetricInter_InputWarn").innerHTML = "Invalid value for the L sampling! The value has to be bigger than 1!";
      return;
    }
    if(tmpVal>50){
      document.getElementById("id_MetricInter_InputWarn").innerHTML = "Invalid value for the L sampling! The value has to be smaller than 50!";
      return;
    }

    var tmpVal2 = document.getElementById("id_MetricInter_AB_Sampling").value;

    if(isNaN(tmpVal2)){
      document.getElementById("id_MetricInter_InputWarn").innerHTML = "Invalid value for the AB sampling!";
      return;
    }
    if(tmpVal2<1){
      document.getElementById("id_MetricInter_InputWarn").innerHTML = "Invalid value for the AB sampling! The value has to be bigger than 1!";
      return;
    }
    if(tmpVal2>360){
      document.getElementById("id_MetricInter_InputWarn").innerHTML = "Invalid value for the AB sampling! The value has to be smaller than 360!";
      return;
    }


  }

  document.getElementById("id_MetricInter_ProcessBarDiv").style.visibility = "visible";
  metricInterpolationWorker.postMessage(workerJSON);

}
