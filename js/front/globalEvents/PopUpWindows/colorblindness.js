


function openColorBlindnessSettings (){
  document.getElementById("id_PopUp_ColorBlindnessWindow").style.display="flex";
  document.getElementById("id_dropDownContainer").style.display="none";

  switch (colorblindnessType) {
    case 0:
    case 1:
    case 2:
      document.getElementById('id_radio_SelectTrichomacy_Dichromatism').checked = true;

      if(colorblindnessType == 0)
        document.getElementById('id_radio_Protanopia').checked=true;

        if(colorblindnessType == 1)
          document.getElementById('id_radio_Deuteranopia').checked=true;

          if(colorblindnessType == 2)
            document.getElementById('id_radio_Tritanopes').checked=true;

    break;
    case 3:
    case 4:
      document.getElementById('id_radio_Monochromatic').checked = true;

      break;

    case 5:
      document.getElementById('id_radio_CustomColorblindness').checked = true;

      break;
    default:

  }

  changeColorblindnessType();
}


function closeColorBlindnessSettings(){
  document.getElementById("id_PopUp_ColorBlindnessWindow").style.display="none";

  // Update Edit Page
  if(document.getElementById("id_EditPage").style.display!="none" && doColorblindnessSim==true)
    updateEditPage_ColorBlindness()

}

function updateEditPage_ColorBlindness(){


  var tmpColor = globalCMS1.getNaNColor("rgb");
  if(doColorblindnessSim){
    var tmpLMS = tmpColor.calcLMSColor();
    tmpColor = tmpLMS.calcColorBlindRGBColor();
  }
  document.getElementById("id_EditPage_CMS_NaN_Color").style.background=tmpColor.getRGBString();
  tmpColor = globalCMS1.getBelowColor("rgb");
  if(doColorblindnessSim){
    var tmpLMS = tmpColor.calcLMSColor();
    tmpColor = tmpLMS.calcColorBlindRGBColor();
  }
  document.getElementById("id_EditPage_CMS_Below_Color").style.background=tmpColor.getRGBString();
  tmpColor = globalCMS1.getAboveColor("rgb");
  if(doColorblindnessSim){
    var tmpLMS = tmpColor.calcLMSColor();
    tmpColor = tmpLMS.calcColorBlindRGBColor();
  }
  document.getElementById("id_EditPage_CMS_Above_Color").style.background=tmpColor.getRGBString();


  if(document.getElementById("id_EditPage_Add_Structures").style.display!="none"){

    if(document.getElementById("id_EditPage_Predefined_Div").style.display!="none"){
      drawCanvasColormap("id_EditPage_Preview_Multiband", cmsFourBandColormaps[0]);
      drawCanvasColormap("id_EditPage_Preview_Divergent", cmsDivergentColormaps[0]);
      drawCanvasColormap("id_EditPage_Preview_ScaledBlue", cmsBlueColormaps[0]);
      drawCanvasColormap("id_EditPage_Preview_ScaledBrown", cmsBrownColormaps[0]);
      drawCanvasColormap("id_EditPage_Preview_ScaledGreen", cmsGreenColormaps[0]);
      drawCanvasColormap("id_EditPage_Preview_ScaledRedPurple", cmsRedPurpleColormaps[0]);
      drawCanvasColormap("id_EditPage_Preview_ScaledYellowOrange", cmsYellowColormaps[0]);
    }


    updatePredefined();
  }



  updateEditPage();


  if(document.getElementById("id_EditPage_Edit_Keys").style.display!="none"){
     openEditKeyDiv(document.getElementById("id_EditPage_EditKey_List").selectedIndex);
  }

  if(document.getElementById("id_EditPage_Edit_Path").style.display!="none"){

    if(pathColorspace!="rgb"){
      drawcolormap_hueSpace(true, true, true);

      if(pathColorspace=="hsv")
        hsvMesh();
    }
    else{
      rgbMesh();
      drawcolormap_RGBSpace(true,true);
    }


  }
}

function changeColorblindness(){
  if(doColorblindnessSim){
    doColorblindnessSim=false;
    document.getElementById('id_header_colorBlindWarning').style.visibility = "hidden";
  }
  else{
    doColorblindnessSim=true;
    document.getElementById('id_header_colorBlindWarning').style.visibility = "visible";
  }
  updateEditPage_ColorBlindness();
}

function changeColorblindnessType(){

  document.getElementById("id_CBSettings_Warning").style.display="none";
  document.getElementById('AnomalousTrichomacy_Dichromatism_View_Div').style.display="none";

  document.getElementById('inputCBTransferMatrix00').disabled = true;
  document.getElementById('inputCBTransferMatrix01').disabled = true;
  document.getElementById('inputCBTransferMatrix02').disabled = true;

  document.getElementById('inputCBTransferMatrix10').disabled = true;
  document.getElementById('inputCBTransferMatrix11').disabled = true;
  document.getElementById('inputCBTransferMatrix12').disabled = true;

  document.getElementById('inputCBTransferMatrix20').disabled = true;
  document.getElementById('inputCBTransferMatrix21').disabled = true;
  document.getElementById('inputCBTransferMatrix22').disabled = true;


  if(document.getElementById('id_radio_SelectTrichomacy_Dichromatism').checked){

    document.getElementById('AnomalousTrichomacy_Dichromatism_View_Div').style.display="block";

    if(document.getElementById('id_radio_Protanopia').checked)
      colorblindnessType=0;

    if(document.getElementById('id_radio_Deuteranopia').checked)
      colorblindnessType=1;

    if(document.getElementById('id_radio_Tritanopes').checked)
      colorblindnessType=2;
  }

  if(document.getElementById('id_radio_Monochromatic').checked){

    if(document.getElementById('id_radio_Achromatopsia').checked)
      colorblindnessType=3;

    if(document.getElementById('id_radio_BlueCone').checked)
      colorblindnessType=4;
  }


  if(document.getElementById('id_radio_CustomColorblindness').checked){
    document.getElementById('inputCBTransferMatrix00').disabled = false;
    document.getElementById('inputCBTransferMatrix01').disabled = false;
    document.getElementById('inputCBTransferMatrix02').disabled = false;

    document.getElementById('inputCBTransferMatrix10').disabled = false;
    document.getElementById('inputCBTransferMatrix11').disabled = false;
    document.getElementById('inputCBTransferMatrix12').disabled = false;

    document.getElementById('inputCBTransferMatrix20').disabled = false;
    document.getElementById('inputCBTransferMatrix21').disabled = false;
    document.getElementById('inputCBTransferMatrix22').disabled = false;

    document.getElementById("inputCBTransferMatrix00").value = sim_Custom[0][0];
    document.getElementById("inputCBTransferMatrix01").value = sim_Custom[1][0];
    document.getElementById("inputCBTransferMatrix02").value = sim_Custom[2][0];

    document.getElementById("inputCBTransferMatrix10").value = sim_Custom[0][1];
    document.getElementById("inputCBTransferMatrix11").value = sim_Custom[1][1];
    document.getElementById("inputCBTransferMatrix12").value = sim_Custom[2][1];

    document.getElementById("inputCBTransferMatrix20").value = sim_Custom[0][2];
    document.getElementById("inputCBTransferMatrix21").value = sim_Custom[1][2];
    document.getElementById("inputCBTransferMatrix22").value = sim_Custom[2][2];

    colorblindnessType=5;
  }

  updateColorBlindness_TransferMatrices()
  doneWorkerPreparation=false;


}


function changeColorblindnessDegree(){

  if(parseFloat(document.getElementById("range_DegreeProtanopia").value)==100)
    document.getElementById("ProtanopiaLabel").style.visibility="visible";
  else
    document.getElementById("ProtanopiaLabel").style.visibility="hidden";

    if(parseFloat(document.getElementById("range_DegreeDeuteranopia").value)==100)
      document.getElementById("DeuteranopiaLabel").style.visibility="visible";
    else
      document.getElementById("DeuteranopiaLabel").style.visibility="hidden";

      if(parseFloat(document.getElementById("range_DegreeTritanopes").value)==100)
        document.getElementById("TritanopiaLabel").style.visibility="visible";
      else
        document.getElementById("TritanopiaLabel").style.visibility="hidden";

  updateColorBlindness_TransferMatrices()
  doneWorkerPreparation=false;

}

function changeCustomTransferMatrix(event){

  document.getElementById("id_CBSettings_Warning").style.display="none";


  var x = document.getElementById(event.target.id).value;

  if(isNaN(x)){
    document.getElementById("id_CBSettings_Warning").style.display="block";

    document.getElementById("inputCBTransferMatrix00").value = sim_Custom[0][0];
    document.getElementById("inputCBTransferMatrix01").value = sim_Custom[1][0];
    document.getElementById("inputCBTransferMatrix02").value = sim_Custom[2][0];

    document.getElementById("inputCBTransferMatrix10").value = sim_Custom[0][1];
    document.getElementById("inputCBTransferMatrix11").value = sim_Custom[1][1];
    document.getElementById("inputCBTransferMatrix12").value = sim_Custom[2][1];

    document.getElementById("inputCBTransferMatrix20").value = sim_Custom[0][2];
    document.getElementById("inputCBTransferMatrix21").value = sim_Custom[1][2];
    document.getElementById("inputCBTransferMatrix22").value = sim_Custom[2][2];
  }
  else{

    sim_Custom[0][0] = document.getElementById("inputCBTransferMatrix00").value;
    sim_Custom[1][0] = document.getElementById("inputCBTransferMatrix01").value;
    sim_Custom[2][0] = document.getElementById("inputCBTransferMatrix02").value;

    sim_Custom[0][1] = document.getElementById("inputCBTransferMatrix10").value;
    sim_Custom[1][1] = document.getElementById("inputCBTransferMatrix11").value;
    sim_Custom[2][1] = document.getElementById("inputCBTransferMatrix12").value;

    sim_Custom[0][2] = document.getElementById("inputCBTransferMatrix20").value;
    sim_Custom[1][2] = document.getElementById("inputCBTransferMatrix21").value;
    sim_Custom[2][2] = document.getElementById("inputCBTransferMatrix22").value;

    updateColorBlindness_TransferMatrices()
    doneWorkerPreparation=false;
  }






}



function updateColorBlindness_TransferMatrices() {
  var rgbWhiteOrigin = new classColor_RGB(1, 1, 1);
  var rgbBluePrimary = new classColor_RGB(0, 0, 1);
  var rgbRedPrimary = new classColor_RGB(1, 0, 0);
  //var rgbGreenPrimary = new classColor_RGB(0,1,0);

  var xyzWhiteOrigin = rgbWhiteOrigin.calcXYZColor();
  var xyzBluePrimary = rgbBluePrimary.calcXYZColor();
  var xyzRedPrimary = rgbRedPrimary.calcXYZColor();
  //var xyzGreenPrimary = rgbGreenPrimary.calcXYZColor();

  var lmsWhiteOrigin = xyzWhiteOrigin.calcLMSColor();
  var lmsBluePrimary = xyzBluePrimary.calcLMSColor();
  var lmsRedPrimary = xyzRedPrimary.calcLMSColor();
  //var lmsGreenPrimary = xyzGreenPrimary.calcLMSColor();



  switch (colorblindnessType) {
    case 0: // Protanopia

      degreeOFColorblindness = parseFloat(document.getElementById("range_DegreeProtanopia").value) / 100;



      //// Calc Protanopia
      //
      //  [ 0 a b ][l]    [a*m+b*s]
      //  [ 0 1 0 ][m]  = [m]
      //  [ 0 0 1 ][s]    [s]
      //
      //  L_blue =  a*M_blue + b*S_blue
      //  L_white =  a*M_white + b*S_white
      //
      //  a = (L_blue*S_white-L_white*S_blue)/(M_blue*S_white-M_white*S_blue);
      //  b = (L_blue*M_white-L_white*M_blue)/(S_blue*M_white-S_white*M_blue);
      var a = (lmsBluePrimary.getLValue() * lmsWhiteOrigin.getSValue() - lmsWhiteOrigin.getLValue() * lmsBluePrimary.getSValue()) / (lmsBluePrimary.getMValue() * lmsWhiteOrigin.getSValue() - lmsWhiteOrigin.getMValue() * lmsBluePrimary.getSValue()); // new a value
      var b = (lmsBluePrimary.getLValue() * lmsWhiteOrigin.getMValue() - lmsWhiteOrigin.getLValue() * lmsBluePrimary.getMValue()) / (lmsBluePrimary.getSValue() * lmsWhiteOrigin.getMValue() - lmsWhiteOrigin.getSValue() * lmsBluePrimary.getMValue());; // new b value
      sim_AdaptiveColorblindness = [
        [1 - degreeOFColorblindness, a * degreeOFColorblindness, b * degreeOFColorblindness],
        [0, 1, 0],
        [0, 0, 1]
      ];

      document.getElementById("inputCBTransferMatrix00").value = "1-" + degreeOFColorblindness;
      document.getElementById("inputCBTransferMatrix01").value = degreeOFColorblindness + "*" + a.toFixed(5);
      document.getElementById("inputCBTransferMatrix02").value = degreeOFColorblindness + "*" + b.toFixed(5);

      document.getElementById("inputCBTransferMatrix10").value = "0";
      document.getElementById("inputCBTransferMatrix11").value = "1";
      document.getElementById("inputCBTransferMatrix12").value = "0";

      document.getElementById("inputCBTransferMatrix20").value = "0";
      document.getElementById("inputCBTransferMatrix21").value = "0";
      document.getElementById("inputCBTransferMatrix22").value = "1";

      break;
    case 1:

      degreeOFColorblindness = parseFloat(document.getElementById("range_DegreeDeuteranopia").value) / 100;



      //// Calc Deuteranopia
      //
      //  [ 1 0 0 ][l]    [l]
      //  [ a 0 b ][m]  = [a*l+b*s]
      //  [ 0 0 1 ][s]    [s]
      //
      //  M_blue =  a*L_blue + b*S_blue
      //  M_white =  a*L_white + b*S_white
      //
      //  a = (M_blue*S_white-M_white*S_blue)/(L_blue*S_white-L_white*S_blue);
      //  b = (M_blue*L_white-M_white*L_blue)/(S_blue*L_white-S_white*L_blue);

      var a = (lmsBluePrimary.getMValue() * lmsWhiteOrigin.getSValue() - lmsWhiteOrigin.getMValue() * lmsBluePrimary.getSValue()) / (lmsBluePrimary.getLValue() * lmsWhiteOrigin.getSValue() - lmsWhiteOrigin.getLValue() * lmsBluePrimary.getSValue()); // new a value
      var b = (lmsBluePrimary.getMValue() * lmsWhiteOrigin.getLValue() - lmsWhiteOrigin.getMValue() * lmsBluePrimary.getLValue()) / (lmsBluePrimary.getSValue() * lmsWhiteOrigin.getLValue() - lmsWhiteOrigin.getSValue() * lmsBluePrimary.getLValue());; // new b value

      sim_AdaptiveColorblindness = [
        [1, 0, 0],
        [a * degreeOFColorblindness, 1 - degreeOFColorblindness, b * degreeOFColorblindness],
        [0, 0, 1]
      ];

      document.getElementById("inputCBTransferMatrix00").value = "1";
      document.getElementById("inputCBTransferMatrix01").value = "0";
      document.getElementById("inputCBTransferMatrix02").value = "0";

      document.getElementById("inputCBTransferMatrix10").value = degreeOFColorblindness + "*" + a.toFixed(5);
      document.getElementById("inputCBTransferMatrix11").value = "1-" + degreeOFColorblindness;
      document.getElementById("inputCBTransferMatrix12").value = degreeOFColorblindness + "*" + b.toFixed(5);

      document.getElementById("inputCBTransferMatrix20").value = "0";
      document.getElementById("inputCBTransferMatrix21").value = "0";
      document.getElementById("inputCBTransferMatrix22").value = "1";
      break;
    case 2:

      degreeOFColorblindness = parseFloat(document.getElementById("range_DegreeTritanopes").value) / 100;



      //// Calc Tritanopes
      //
      //  [ 1 0 0 ][l]    [l]
      //  [ 0 1 0 ][m]  = [m]
      //  [ a b 0 ][s]    [a*l+b*M]
      //
      //  S_red =  a*L_red + b*M_red
      //  S_white =  a*L_white + b*M_white
      //
      //  a = (S_red*M_white-S_white*M_red)/(L_red*M_white-L_white*M_red);
      //  b = (S_red*L_white-S_white*L_red)/(M_red*L_white-M_white*L_red);

      var a = (lmsRedPrimary.getSValue() * lmsWhiteOrigin.getMValue() - lmsWhiteOrigin.getSValue() * lmsRedPrimary.getMValue()) / (lmsRedPrimary.getLValue() * lmsWhiteOrigin.getMValue() - lmsWhiteOrigin.getLValue() * lmsRedPrimary.getMValue()); // new a value
      var b = (lmsRedPrimary.getSValue() * lmsWhiteOrigin.getLValue() - lmsWhiteOrigin.getSValue() * lmsRedPrimary.getLValue()) / (lmsRedPrimary.getMValue() * lmsWhiteOrigin.getLValue() - lmsWhiteOrigin.getMValue() * lmsRedPrimary.getLValue());; // new b value

      sim_AdaptiveColorblindness = [
        [1, 0, 0],
        [0, 1, 0],
        [a * degreeOFColorblindness, b * degreeOFColorblindness, 1 - degreeOFColorblindness]
      ];

      document.getElementById("inputCBTransferMatrix00").value = "1";
      document.getElementById("inputCBTransferMatrix01").value = "0";
      document.getElementById("inputCBTransferMatrix02").value = "0";

      document.getElementById("inputCBTransferMatrix10").value = "0";
      document.getElementById("inputCBTransferMatrix11").value = "1";
      document.getElementById("inputCBTransferMatrix12").value = "0";

      document.getElementById("inputCBTransferMatrix20").value = degreeOFColorblindness + "*" + a.toFixed(5);
      document.getElementById("inputCBTransferMatrix21").value = degreeOFColorblindness + "*" + b.toFixed(5);
      document.getElementById("inputCBTransferMatrix22").value = "1-" + degreeOFColorblindness;

      break;
    case 3: // Achromatopsia
      sim_AdaptiveColorblindness = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ];
      break;
    case 4: // BlueCone
      sim_AdaptiveColorblindness = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ];
      break;
    case 5: // CustomColorblindness

      sim_AdaptiveColorblindness = [
        [parseFloat(document.getElementById("inputCBTransferMatrix00").value), parseFloat(document.getElementById("inputCBTransferMatrix01").value), parseFloat(document.getElementById("inputCBTransferMatrix02").value)],
        [parseFloat(document.getElementById("inputCBTransferMatrix10").value), parseFloat(document.getElementById("inputCBTransferMatrix11").value), parseFloat(document.getElementById("inputCBTransferMatrix12").value)],
        [parseFloat(document.getElementById("inputCBTransferMatrix20").value), parseFloat(document.getElementById("inputCBTransferMatrix21").value), parseFloat(document.getElementById("inputCBTransferMatrix22").value)]
      ];
      break;
    default:

  }

}
