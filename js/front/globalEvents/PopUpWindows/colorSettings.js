
function openColorSettings (){
  document.getElementById("id_PopUp_ColorSettingsWindow").style.display="flex";
  document.getElementById("id_dropDownContainer").style.display="none";
  document.getElementById("select_XYZTransferMatrix").selectedIndex = tmXYZ_Selected_Index;
  document.getElementById("select_LMSTransferMatrix").selectedIndex = tmLMS_Selected_Index;
  switchColorTransformationSettings(selectedColorTransformation);
}


function closeColorSettings(){
  document.getElementById("id_PopUp_ColorSettingsWindow").style.display="none";

  // update CMS to the new

  for(var i=0; i<myDesignsList.length; i++){
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
  }


  // Update Edit Page
  if(document.getElementById("id_EditPage").style.display!="none"){
    globalCMS1.updateColorToNewSettings();

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




function switchColorTransformationSettings(type){

  selectedColorTransformation=type;

  document.getElementById("id_PopUp_Select_RGBtoXYZ").style.background=styleNotActiveColor;
  document.getElementById("id_PopUp_Select_XYZtoLMS").style.background=styleNotActiveColor;
  document.getElementById("id_PopUp_Select_XYZtoLab").style.background=styleNotActiveColor;
  document.getElementById("id_PopUp_Select_LABtoDIN99").style.background=styleNotActiveColor;

  document.getElementById("id_PopUp_Select_RGBtoXYZ").style.color=styleNotActiveColorFont;
  document.getElementById("id_PopUp_Select_XYZtoLMS").style.color=styleNotActiveColorFont;
  document.getElementById("id_PopUp_Select_XYZtoLab").style.color=styleNotActiveColorFont;
  document.getElementById("id_PopUp_Select_LABtoDIN99").style.color=styleNotActiveColorFont;

  // init
  document.getElementById("id_PopUp_Matrix_Selecter").style.display="none";
  document.getElementById("select_LMSTransferMatrix").style.display="none";
  document.getElementById("select_XYZTransferMatrix").style.display="none";



  switch (type) {
    case 0:
      document.getElementById("id_PopUp_Select_RGBtoXYZ").style.background=styleActiveColor;
      document.getElementById("id_PopUp_Select_RGBtoXYZ").style.color=styleActiveColorFont;
      document.getElementById("id_PopUp_Matrix_Selecter").style.display="block";
      document.getElementById("select_XYZTransferMatrix").style.display="block";

      document.getElementById("id_PopUp_ColorTrans_V1_1").innerHTML="R";
      document.getElementById("id_PopUp_ColorTrans_V1_2").innerHTML="G";
      document.getElementById("id_PopUp_ColorTrans_V1_3").innerHTML="B";
      document.getElementById("id_PopUp_ColorTrans_V2_1").innerHTML="X";
      document.getElementById("id_PopUp_ColorTrans_V2_2").innerHTML="Y";
      document.getElementById("id_PopUp_ColorTrans_V2_3").innerHTML="Z";

      updateRGBtoXYZ_TransferMatrices();
      break;
      case 1:
      document.getElementById("id_PopUp_Select_XYZtoLMS").style.background=styleActiveColor;
      document.getElementById("id_PopUp_Select_XYZtoLMS").style.color=styleActiveColorFont;
      document.getElementById("id_PopUp_Matrix_Selecter").style.display="block";
      document.getElementById("select_LMSTransferMatrix").style.display="block";

      document.getElementById("id_PopUp_ColorTrans_V1_1").innerHTML="X";
      document.getElementById("id_PopUp_ColorTrans_V1_2").innerHTML="Y";
      document.getElementById("id_PopUp_ColorTrans_V1_3").innerHTML="Z";
      document.getElementById("id_PopUp_ColorTrans_V2_1").innerHTML="L";
      document.getElementById("id_PopUp_ColorTrans_V2_2").innerHTML="M";
      document.getElementById("id_PopUp_ColorTrans_V2_3").innerHTML="S";

      updateXYZtoLMS_TransferMatrices();
        break;
        case 2:
        document.getElementById("id_PopUp_Select_XYZtoLab").style.background=styleActiveColor;
        document.getElementById("id_PopUp_Select_XYZtoLab").style.color=styleActiveColorFont;
          break;
          case 3:
          document.getElementById("id_PopUp_Select_LABtoDIN99").style.background=styleActiveColor;
          document.getElementById("id_PopUp_Select_LABtoDIN99").style.color=styleActiveColorFont;
            break;
    default:
        switchColorTransformationSettings(0);
  }

}


function updateTransferMatrix(){
  switch (selectedColorTransformation) {
    case 0:
      updateRGBtoXYZ_TransferMatrices();
      break;
      case 1:
        updateXYZtoLMS_TransferMatrices();
        break;
    default:

  }
}


function changeRGBtoXYZ_TransferMatrices(){
  tmXYZ_Selected_Index=document.getElementById("select_XYZTransferMatrix").selectedIndex
  updateRGBtoXYZ_TransferMatrices();
}


function updateRGBtoXYZ_TransferMatrices() {

  switch (tmXYZ_Selected_Index) {
    case 0:
      tmXYZ_Selected = tmXYZ_sRGB_D65;
      tmXYZ_Selected_Inv = tmXYZ_sRGB_D65_Inv;
      break;
    case 1:
      tmXYZ_Selected = tmXYZ_sRGB_D50;
      tmXYZ_Selected_Inv = tmXYZ_sRGB_D50_Inv;
      break;
    case 2:
      tmXYZ_Selected = tmXYZ_AdobeRGB_D65;
      tmXYZ_Selected_Inv = tmXYZ_AdobeRGB_D65_Inv;
      break;
    case 3:
      tmXYZ_Selected = tmXYZ_AdobeRGB_D50;
      tmXYZ_Selected_Inv = tmXYZ_AdobeRGB_D50_Inv;
      break;
    case 4:
      tmXYZ_Selected = tmXYZ_AppleRGB_D65;
      tmXYZ_Selected_Inv = tmXYZ_AppleRGB_D65_Inv;
      break;
    case 5:
      tmXYZ_Selected = tmXYZ_AppleRGB_D50;
      tmXYZ_Selected_Inv = tmXYZ_AppleRGB_D50_Inv;
      break;
    case 6:
      tmXYZ_Selected = tmXYZ_BestRGB_D50;
      tmXYZ_Selected_Inv = tmXYZ_BestRGB_D50_Inv;
      break;
    case 7:
      tmXYZ_Selected = tmXYZ_BetaRGB_D50;
      tmXYZ_Selected_Inv = tmXYZ_BetaRGB_D50_Inv;
      break;
    case 8:
      tmXYZ_Selected = tmXYZ_BruceRGB_D65;
      tmXYZ_Selected_Inv = tmXYZ_BruceRGB_D65_Inv;
      break;
    case 9:
      tmXYZ_Selected = tmXYZ_BruceRGB_D50;
      tmXYZ_Selected_Inv = tmXYZ_BruceRGB_D50_Inv;
      break;
    case 10:
      tmXYZ_Selected = tmXYZ_CIERGB_E;
      tmXYZ_Selected_Inv = tmXYZ_CIERGB_E_Inv;
      break;
    case 11:
      tmXYZ_Selected = tmXYZ_CIERGB_D50;
      tmXYZ_Selected_Inv = tmXYZ_CIERGB_D50_Inv;
      break;
    case 12:
      tmXYZ_Selected = tmXYZ_ColorMatchRGB_D50;
      tmXYZ_Selected_Inv = tmXYZ_ColorMatchRGB_D50_Inv;
      break;
    case 13:
      tmXYZ_Selected = tmXYZ_DonRGB4_D50;
      tmXYZ_Selected_Inv = tmXYZ_DonRGB4_D50_Inv;
      break;
    case 14:
      tmXYZ_Selected = tmXYZ_ECIRGB_D50;
      tmXYZ_Selected_Inv = tmXYZ_ECIRGB_Inv_D50;
      break;
    case 15:
      tmXYZ_Selected = tmXYZ_EktaSpacePS5_D50;
      tmXYZ_Selected_Inv = tmXYZ_EktaSpacePS5_D50_Inv;
      break;
    case 16:
      tmXYZ_Selected = tmXYZ_NTSC_RGB_C;
      tmXYZ_Selected_Inv = tmXYZ_NTSC_RGB_C_Inv;
      break;
    case 17:
      tmXYZ_Selected = tmXYZ_NTSC_RGB_D50;
      tmXYZ_Selected_Inv = tmXYZ_NTSC_RGB_D50_Inv;
      break;
    case 18:
      tmXYZ_Selected = tmXYZ_PAL_SECAM_RGB_D65;
      tmXYZ_Selected_Inv = tmXYZ_PAL_SECAM_RGB_D65_Inv;
      break;
    case 19:
      tmXYZ_Selected = tmXYZ_PAL_SECAM_RGB_D50;
      tmXYZ_Selected_Inv = tmXYZ_PAL_SECAM_RGB_D50_Inv;
      break;
    case 20:
      tmXYZ_Selected = tmXYZ_ProPhotoRGB_D50;
      tmXYZ_Selected_Inv = tmXYZ_ProPhotoRGB_D50_Inv;
      break;
    case 21:
      tmXYZ_Selected = tmXYZ_SMPTE_C_RGB_D65;
      tmXYZ_Selected_Inv = tmXYZ_SMPTE_C_RGB_D65_Inv;
      break;
    case 22:
      tmXYZ_Selected = tmXYZ_SMPTE_C_RGB_D50;
      tmXYZ_Selected_Inv = tmXYZ_SMPTE_C_RGB_D50_Inv;
      break;
    case 23:
      tmXYZ_Selected = tmXYZ_ProPhotoRGB_Wide_Gamut_RGB_D50;
      tmXYZ_Selected_Inv = tmXYZ_ProPhotoRGB_Wide_Gamut_RGB_D50_Inv;
      break;
    case 24: // Custom
      tmXYZ_Selected = [
        [parseFloat(document.getElementById("inputTransferMatrix00").value), parseFloat(document.getElementById("inputTransferMatrix01").value), parseFloat(document.getElementById("inputTransferMatrix02").value)],
        [parseFloat(document.getElementById("inputTransferMatrix10").value), parseFloat(document.getElementById("inputTransferMatrix11").value), parseFloat(document.getElementById("inputTransferMatrix12").value)],
        [parseFloat(document.getElementById("inputTransferMatrix20").value), parseFloat(document.getElementById("inputTransferMatrix21").value), parseFloat(document.getElementById("inputTransferMatrix22").value)]
      ];

      tmXYZ_Selected_Inv = invert3x3Matrix(tmLMS_Selected);

      if (tmXYZ_Selected_Inv == undefined) {
        document.getElementById("select_XYZTransferMatrix").selectedIndex = 0;
        tmXYZ_Selected = tmXYZ_sRGB_D65;
        tmXYZ_Selected_Inv = tmXYZ_sRGB_D65_Inv;
      }
      break;
    default:
      document.getElementById("select_XYZTransferMatrix").selectedIndex = 0;
      tmXYZ_Selected = tmXYZ_sRGB_D65;
      tmXYZ_Selected_Inv = tmXYZ_sRGB_D65_Inv;

  }

  document.getElementById("inputTransferMatrix00").value = tmXYZ_Selected[0][0];
  document.getElementById("inputTransferMatrix10").value = tmXYZ_Selected[1][0];
  document.getElementById("inputTransferMatrix20").value = tmXYZ_Selected[2][0];

  document.getElementById("inputTransferMatrix01").value = tmXYZ_Selected[0][1];
  document.getElementById("inputTransferMatrix11").value = tmXYZ_Selected[1][1];
  document.getElementById("inputTransferMatrix21").value = tmXYZ_Selected[2][1];

  document.getElementById("inputTransferMatrix02").value = tmXYZ_Selected[0][2];
  document.getElementById("inputTransferMatrix12").value = tmXYZ_Selected[1][2];
  document.getElementById("inputTransferMatrix22").value = tmXYZ_Selected[2][2];

}


function changeXYZtoLMS_TransferMatrices(){
  tmLMS_Selected_Index=document.getElementById("select_LMSTransferMatrix").selectedIndex
  updateXYZtoLMS_TransferMatrices();
}

function updateXYZtoLMS_TransferMatrices() {

  switch (tmLMS_Selected_Index) {
    case 0:
      tmLMS_Selected = tmLMS_HPE;
      tmLMS_Selected_Inv = tmLMS_HPE_Inv;
      break;
    case 1:
      tmLMS_Selected = tmLMS_vK;
      tmLMS_Selected_Inv = tmLMS_vK_Inv;
      break;
    case 2:
      tmLMS_Selected = tmLMS_BFD;
      tmLMS_Selected_Inv = tmLMS_BFD_Inv;
      break;
    case 3:
      tmLMS_Selected = tmLMS_CAT97s;
      tmLMS_Selected_Inv = tmLMS_CAT97s_Inv;
      break;
    case 4:
      tmLMS_Selected = tmLMS_CAT02;
      tmLMS_Selected_Inv = tmLMS_CAT02_Inv;
      break;

    case 5: // Custom

      tmLMS_Selected = [
        [parseFloat(document.getElementById("inputTransferMatrix00").value), parseFloat(document.getElementById("inputTransferMatrix01").value), parseFloat(document.getElementById("inputTransferMatrix02").value)],
        [parseFloat(document.getElementById("inputTransferMatrix10").value), parseFloat(document.getElementById("inputTransferMatrix11").value), parseFloat(document.getElementById("inputTransferMatrix12").value)],
        [parseFloat(document.getElementById("inputTransferMatrix20").value), parseFloat(document.getElementById("inputTransferMatrix21").value), parseFloat(document.getElementById("inputTransferMatrix22").value)]
      ];

      tmLMS_Selected_Inv = invert3x3Matrix(tmLMS_Selected);

      if (tmLMS_Selected_Inv == undefined) {
        document.getElementById("select_LMSTransferMatrix").selectedIndex = 1;
        tmLMS_Selected = tmLMS_vK;
        tmLMS_Selected_Inv = tmLMS_vK_Inv;
      }

      break;

    default:
      document.getElementById("select_LMSTransferMatrix").selectedIndex = 1;
      tmLMS_Selected = tmLMS_vK;
      tmLMS_Selected_Inv = tmLMS_vK_Inv;

  }

  document.getElementById("inputTransferMatrix00").value = tmLMS_Selected[0][0];
  document.getElementById("inputTransferMatrix10").value = tmLMS_Selected[1][0];
  document.getElementById("inputTransferMatrix20").value = tmLMS_Selected[2][0];

  document.getElementById("inputTransferMatrix01").value = tmLMS_Selected[0][1];
  document.getElementById("inputTransferMatrix11").value = tmLMS_Selected[1][1];
  document.getElementById("inputTransferMatrix21").value = tmLMS_Selected[2][1];

  document.getElementById("inputTransferMatrix02").value = tmLMS_Selected[0][2];
  document.getElementById("inputTransferMatrix12").value = tmLMS_Selected[1][2];
  document.getElementById("inputTransferMatrix22").value = tmLMS_Selected[2][2];

}
