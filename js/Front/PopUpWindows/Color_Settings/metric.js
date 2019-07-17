function openColorMetrics (){
  document.getElementById("id_PopUp_ColorMetricsWindow").style.display="flex";
  document.getElementById("id_dropDownContainer").style.display="none";
  switchMetricSettings(selectedMetric);
}


function closeColorMetrics(){
  document.getElementById("id_PopUp_ColorMetricsWindow").style.display="none";

  // update CMS to the new

  /*for(var i=0; i<myDesignsList.length; i++){
    myDesignsList[i].updateColorToNewSettings();
  }

  // Gallery cms
  for(var i=0; i<cmsFourBandColormaps.length; i++){
    cmsFourBandColormaps[i].updateColorToNewSettings();
  }

  for(var i=0; i<cmsThreeBandColormaps.length; i++){
    cmsThreeBandColormaps[i].updateColorToNewSettings();
  }

  for(var i=0; i<cmsDivergentColormaps.length; i++){
    cmsDivergentColormaps[i].updateColorToNewSettings();
  }

  for(var i=0; i<cmsBlueColormaps.length; i++){
    cmsBlueColormaps[i].updateColorToNewSettings();
  }

  for(var i=0; i<cmsBrownColormaps.length; i++){
    cmsBrownColormaps[i].updateColorToNewSettings();
  }

  for(var i=0; i<cmsGreenColormaps.length; i++){
    cmsGreenColormaps[i].updateColorToNewSettings();
  }

  for(var i=0; i<cmsRedPurpleColormaps.length; i++){
    cmsRedPurpleColormaps[i].updateColorToNewSettings();
  }

  for(var i=0; i<cmsYellowColormaps.length; i++){
    cmsYellowColormaps[i].updateColorToNewSettings();
  }*/


  // Update Edit Page
  if(document.getElementById("id_EditPage").style.display!="none"){
    //globalCMS1.updateColorToNewSettings();

    updatePredefined();

    updateEditPage();


    if(document.getElementById("id_EditPage_Edit_Keys").style.display!="none"){
       openEditKeyDiv(document.getElementById("id_EditPage_EditKey_List").selectedIndex);
    }

    if(document.getElementById("id_EditPage_Edit_Path").style.display!="none"){

      if(pathColorspace!="rgb")
        drawcolormap_hueSpace(true, true, true);
      else
        drawcolormap_RGBSpace(true,true);

    }
  }



}




function switchMetricSettings(type){

  selectedMetric=type;

  document.getElementById("id_PopUp_Select_MetricDe94").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_PopUp_Select_MetricDe2000").classList.remove("class_TabRowButtonActive");

  document.getElementById("id_PopUp_Select_MetricDe94").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_PopUp_Select_MetricDe2000").classList.add("class_TabRowButtonNotActive");


  // init
  document.getElementById("id_PopUp_Metric_Div4").style.display="none";
  document.getElementById("id_PopUp_Metric_Div5").style.display="none";
  document.getElementById("id_PopUp_Metric_Warning").innerHTML = "";


  switch (type) {
    case 0:
      document.getElementById("id_PopUp_Select_MetricDe94").classList.remove("class_TabRowButtonNotActive");
      document.getElementById("id_PopUp_Select_MetricDe94").classList.add("class_TabRowButtonActive");

      document.getElementById("id_PopUp_Metric_Div4").style.display="flex";
      document.getElementById("id_PopUp_Metric_Div5").style.display="flex";

      document.getElementById("id_PopUp_Metric_Input1").value = de94_k_L;
      document.getElementById("id_PopUp_Metric_Input2").value = de94_k_C;
      document.getElementById("id_PopUp_Metric_Input3").value = de94_k_H;
      document.getElementById("id_PopUp_Metric_Input4").value = de94_k_1;
      document.getElementById("id_PopUp_Metric_Input5").value = de94_k_2;

      break;
      case 1:
      document.getElementById("id_PopUp_Select_MetricDe2000").classList.remove("class_TabRowButtonNotActive");
      document.getElementById("id_PopUp_Select_MetricDe2000").classList.add("class_TabRowButtonActive");

      document.getElementById("id_PopUp_Metric_Input1").value = de2000_k_L;
      document.getElementById("id_PopUp_Metric_Input2").value = de2000_k_C;
      document.getElementById("id_PopUp_Metric_Input3").value = de2000_k_H;

        break;
    default:
        switchMetricSettings(0);
  }

}

function retrieveMetricSettings(){

  switch (selectedMetric) {
    case 0:
    de94_k_L = 1.0,
    de94_k_C = 1.0,
    de94_k_H = 1.0;
    de94_k_1 = 0.045,
    de94_k_2 = 0.015;
    document.getElementById("id_PopUp_Metric_Input1").value = de94_k_L;
    document.getElementById("id_PopUp_Metric_Input2").value = de94_k_C;
    document.getElementById("id_PopUp_Metric_Input3").value = de94_k_H;
    document.getElementById("id_PopUp_Metric_Input4").value = de94_k_1;
    document.getElementById("id_PopUp_Metric_Input5").value = de94_k_2;
    break;
  case 1:
      de2000_k_L = 1.0,
      de2000_k_C = 1.0,
      de2000_k_H = 1.0;
      document.getElementById("id_PopUp_Metric_Input1").value = de2000_k_L;
      document.getElementById("id_PopUp_Metric_Input2").value = de2000_k_C;
      document.getElementById("id_PopUp_Metric_Input3").value = de2000_k_H;
      break;
    default:

  }
}


function changeMetricTransInput(event){

  document.getElementById("id_PopUp_Metric_Warning").innerHTML = "";

  switch (event.target.id) {

    /////////////////////////////////////////////////
    case "id_PopUp_Metric_Input1":
      var x = document.getElementById("id_PopUp_Metric_Input1").value;

      switch (selectedMetric) {
        case 0:

          if (isNaN(x)) {
            document.getElementById("id_PopUp_Metric_Warning").innerHTML = "Input for k_L was not valid";
            document.getElementById("id_PopUp_Metric_Input1").value = de94_k_L;
            break;
          }
          else{
            de94_k_L=x;
          }

          break;
        case 1:
          if (isNaN(x)) {
            document.getElementById("id_PopUp_Metric_Warning").innerHTML = "Input for k_L was not valid";
            document.getElementById("id_PopUp_Metric_Input1").value = de2000_k_L;
            break;
          }
          else {
            de2000_k_L=x;
          }
          break;
      }
    break;
    /////////////////////////////////////////
    case "id_PopUp_Metric_Input2":
        var x = document.getElementById("id_PopUp_Metric_Input2").value;

        switch (selectedMetric) {
          case 0:
            if (isNaN(x)) {
              document.getElementById("id_PopUp_Metric_Warning").innerHTML = "Input for k_C was not valid";
              document.getElementById("id_PopUp_Metric_Input2").value = de94_k_C;
              break;
            }
            else {
              de94_k_C=x;
            }
            break;
            case 1:
            if (isNaN(x)) {
              document.getElementById("id_PopUp_Metric_Warning").innerHTML = "Input for k_C was not valid";
              document.getElementById("id_PopUp_Metric_Input2").value = de2000_k_C;
              break;
            }
            else {
              de2000_k_C=x;
            }
            break;
        }
      break;
      /////////////////////////////////////////
      case "id_PopUp_Metric_Input3":
          var x = document.getElementById("id_PopUp_Metric_Input3").value;

          switch (selectedMetric) {
            case 0:
              if (isNaN(x)) {
                document.getElementById("id_PopUp_Metric_Warning").innerHTML = "Input for k_H was not valid";
                document.getElementById("id_PopUp_Metric_Input3").value = de94_k_H;
                break;
              }
              else {
                de94_k_H=x;
              }
              break;
              case 1:
              if (isNaN(x)) {
                document.getElementById("id_PopUp_Metric_Warning").innerHTML = "Input for k_H was not valid";
                document.getElementById("id_PopUp_Metric_Input3").value = de2000_k_H;
                break;
              }
              else {
                de2000_k_H=x;
              }
              break;
          }
        break;



  /////////////////////////////////////////
    case "id_PopUp_Metric_Input4":
        var x = document.getElementById("id_PopUp_Metric_Input4").value;
            if (isNaN(x)) {
              document.getElementById("id_PopUp_Metric_Warning").innerHTML = "Input for k_1 was not valid";
              document.getElementById("id_PopUp_Metric_Input4").value = de94_k_1;
              break;
            }
            else {
              de94_k_1=x;
            }
      break;

      /////////////////////////////////////////
        case "id_PopUp_Metric_Input5":
            var x = document.getElementById("id_PopUp_Metric_Input5").value;
                if (isNaN(x)) {
                  document.getElementById("id_PopUp_Metric_Warning").innerHTML = "Input for k_2 was not valid";
                  document.getElementById("id_PopUp_Metric_Input5").value = de94_k_2;
                  break;
                }
                else {
                  de94_k_2=x;
                }
          break;

    }

}
