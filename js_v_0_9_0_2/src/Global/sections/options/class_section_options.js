
/////////////////////////////////////////////////////////////////////////////////
/////// Global Used Transfermatrices (Future Work add these varialbes to the class)
var tmLMS_Selected = [[1, 0, 0],[0, 1, 0],[0, 0, 1]];
var tmLMS_Selected_Inv = [[1, 0, 0],[0, 1, 0],[0, 0, 1]];

var tmXYZ_Selected = [[1, 0, 0],[0, 1, 0],[0, 0, 1]];
var tmXYZ_Selected_Inv = [[1, 0, 0],[0, 1, 0],[0, 0, 1]];

class class_Options_Section extends class_Section {

  constructor() {
    super('id_OptionsPage');
    this.settingType = 0;
    this.settingStatus = 0;

    var selectedColorTransformation =0;

    //////////////////////////////////////////////////////////////////////
    //********************** COLOR TRANSFORMATION **********************//
    //////////////////////////////////////////////////////////////////////

    // matrix entry: label, transformation-matrix, inverse-matrix

    ///////////////////////////////////////////
    // RGB->XYZ
    this.rgb2xyz_selected = 0; // current settings
    this.rgb2xyz_tmpSelected = 0; // user settings
    this.rgb2xyz_matrices=[
      // Reference White D65
      ["sRGB D65",[[0.4124564, 0.3575761, 0.1804375],[0.2126729, 0.7151522, 0.0721750],[0.0193339, 0.1191920, 0.9503041]]],
      // Reference White D50
      ["sRGB D50",[[0.4360747, 0.3850649, 0.1430804],[0.2225045, 0.7168786, 0.0606169],[0.0139322, 0.0971045, 0.7141733]]],
      ["Adobe D65",[[0.5767309, 0.1855540, 0.1881852],[0.2973769, 0.6273491, 0.0752741],[0.0270343, 0.0706872, 0.9911085]]],
      ["Adobe D50",[[0.6097559, 0.2052401, 0.1492240],[0.3111242, 0.6256560, 0.0632197],[0.0194811, 0.0608902, 0.7448387]]],
      ["Apple D65",[[0.4497288, 0.3162486, 0.1844926],[0.2446525, 0.6720283, 0.0833192],[0.0251848, 0.1411824, 0.9224628]]],
      ["Apple D50",[[0.4755678, 0.3396722, 0.1489800],[0.2551812, 0.6725693, 0.0722496],[0.0184697, 0.1133771, 0.6933632]]],
      ["Best RGB D50",[[0.6326696, 0.2045558, 0.1269946],[0.2284569, 0.7373523, 0.0341908],[0.0000000, 0.0095142, 0.8156958]]],
      ["tmXYZ_BetaRGB_D50",[[0.6712537, 0.1745834, 0.1183829],[0.3032726, 0.6637861, 0.0329413],[0.0000000, 0.0407010, 0.7845090]]],
      ["tmXYZ_BruceRGB_D65",[[0.4674162, 0.2944512, 0.1886026],[0.2410115, 0.6835475, 0.0754410],[0.0219101, 0.0736128, 0.9933071]]],
      ["tmXYZ_BruceRGB_D50",[[0.4941816, 0.3204834, 0.1495550],[0.2521531, 0.6844869, 0.0633600],[0.0157886, 0.0629304, 0.7464909]]],
      ["CIERGB_E",[[0.4887180, 0.3106803, 0.2006017],[0.1762044, 0.8129847, 0.0108109],[0.0000000, 0.0102048, 0.9897952]]], // Reference White E
      ["CIERGB_D50",[[0.4868870, 0.3062984, 0.1710347],[0.1746583, 0.8247541, 0.0005877],[-0.0012563, 0.0169832, 0.8094831]]], // Reference White D50
      ["ColorMatchRGB_D50",[[0.5093439, 0.3209071, 0.1339691],[0.2748840, 0.6581315, 0.0669845],[0.0242545, 0.1087821, 0.6921735]]], // Reference White D50
      ["DonRGB4_D50",[[0.6457711, 0.1933511, 0.1250978],[0.2783496, 0.6879702, 0.0336802],[0.0037113, 0.0179861, 0.8035125]]], // Reference White D50
      ["ECIRGB_D50",[[0.6502043, 0.1780774, 0.1359384],[0.3202499, 0.6020711, 0.0776791],[0.0000000, 0.0678390, 0.7573710]]], // Reference White D50
      ["EktaSpacePS5_D50",[[0.5938914, 0.2729801, 0.0973485],[0.2606286, 0.7349465, 0.0044249],[0.0000000, 0.0419969, 0.7832131]]], // Reference White D50
      ["NTSC_RGB_C",[[0.6068909, 0.1735011, 0.2003480],[0.2989164, 0.5865990, 0.1144845],[0.0000000, 0.0660957, 1.1162243]]], // Reference White C
      ["NTSC_RGB_D50",[[0.6343706, 0.1852204, 0.1446290],[0.3109496, 0.5915984, 0.0974520],[-0.0011817, 0.0555518, 0.7708399]]], // Reference White D50
      ["PAL_SECAM_RGB_D65",[[0.4306190, 0.3415419, 0.1783091],[0.2220379, 0.7066384, 0.0713236],[0.0201853, 0.1295504, 0.9390944]]], // Reference White D65
      ["PAL_SECAM_RGB_D50",[[0.4552773, 0.3675500, 0.1413926],[0.2323025, 0.7077956, 0.0599019],[0.0145457, 0.1049154, 0.7057489]]], // Reference White D50
      ["ProPhotoRGB_D50",[[0.7976749, 0.1351917, 0.0313534],[0.2880402, 0.7118741, 0.0000857],[0.0000000, 0.0000000, 0.8252100]]], // Reference White D50
      ["SMPTE_C_RGB_D65",[[0.3935891, 0.3652497, 0.1916313],[0.2124132, 0.7010437, 0.0865432],[0.0187423, 0.1119313, 0.9581563]]], // Reference White D65
      ["SMPTE_C_RGB_D50",[[0.4163290, 0.3931464, 0.1547446],[0.2216999, 0.7032549, 0.0750452],[0.0136576, 0.0913604, 0.7201920]]], // Reference White D50
      ["ProPhotoRGB_Wide_Gamut_RGB_D50",[[0.7161046, 0.1009296, 0.1471858],[0.2581874, 0.7249378, 0.0168748],[0.0000000, 0.0517813, 0.7734287]]], // Reference White D50
      ["Custom",[[1, 0, 0],[0, 1, 0],[0, 0, 1]]]
    ];

    ///////////////////////////////////////////
    // RGB->XYZ
    this.xyz2lms_selected = 0;// current settings
    this.xyz2lms_tmpSelected = 0; // user settings
    this.xyz2lms_matrices=[
      ["Hunt-Pointer-Estevez",[[0.38971, 0.68898, -0.07868],[-0.22981, 1.18340, 0.04641],[0, 0, 1]]],
      ["von Kries",[[0.4002, 0.7076, -0.0808],[-0.2263, 1.1653, 0.0457],[0, 0, 0.9182]]],
      ["Bradford",[[0.8951, 0.2664, -0.1614],[-0.7502, 1.7135, 0.0367],[0.0389, -0.0685, 1.0296]]],
      ["CIECAM97s (CAT97s)",[[0.8562, 0.3372, -0.1934],[-0.8360, 1.8327, 0.0033],[0.0357, -0.0469, 1.0112]]],
      ["CIECAM02 (CAT02)",[[0.7328, 0.4296, -0.1624],[-0.7036, 1.6975, 0.0061],[0.0030, 0.0136, 0.9834]]],
      ["Custom",[[1, 0, 0],[0, 1, 0],[0, 0, 1]]]
    ];

    tmLMS_Selected = this.get_xyz2lms();
    tmLMS_Selected_Inv = this.get_xyz2lms_INV();
    tmXYZ_Selected = this.get_rgb2xyz();
    tmXYZ_Selected_Inv = this.get_rgb2xyz_INV();

  }

  updateSection() {
    console.log(this.settingType,this.settingStatus);
    document.getElementById("id_CT_1_Settings").style.display = "none";
    document.getElementById("id_CT_2_Settings").style.display = "none";
    document.getElementById("id_CDM_Settings").style.display = "none";

    document.getElementById("id_Options_CT").style.background = "var(--main-coloredButton)";
    document.getElementById("id_Options_CDM").style.background = "var(--main-coloredButton)";

    document.getElementById("id_Options_RGBtoXYZ").style.background = "var(--main-coloredButton)";
    document.getElementById("id_Options_XYZtoLMS").style.background = "var(--main-coloredButton)";
    document.getElementById("id_Options_XYZtoLab").style.background = "var(--main-coloredButton)";
    document.getElementById("id_Options_LABtoDIN99").style.background = "var(--main-coloredButton)";
    document.getElementById("id_Options_de94").style.background = "var(--main-coloredButton)";
    document.getElementById("id_Options_de2000").style.background = "var(--main-coloredButton)";

    switch (this.settingType) {
      case 0:
        ///////////////////////////////////////////////////////
        /////////////// Color Transformation //////////////////
        ///////////////////////////////////////////////////////
        document.getElementById("id_Options_CT").style.background = "var(--main-active-coloredButton)";

        document.getElementById("id_Options_RGBtoXYZ").style.color = "var(--main-coloredFont)";
        document.getElementById("id_Options_XYZtoLMS").style.color = "var(--main-coloredFont)";
        document.getElementById("id_Options_XYZtoLab").style.color = "var(--main-coloredFont)";
        document.getElementById("id_Options_LABtoDIN99").style.color = "var(--main-coloredFont)";
        document.getElementById("id_Options_de94").style.color = "var(--main-coloredFont-deactivated)";
        document.getElementById("id_Options_de2000").style.color = "var(--main-coloredFont-deactivated)";

        document.getElementById("id_Options_CT_Subsections").style.width = "100vw";
        document.getElementById("id_Options_CDM_Subsections").style.width = "0vw";

        switch (this.settingStatus) {
          case 0:
            document.getElementById("id_CT_1_Settings").style.display = "flex";
            document.getElementById("id_Options_RGBtoXYZ").style.background = "var(--main-active-coloredButton)";
            document.getElementById("id_PopUp_ColorTrans_V1_1").innerHTML="R";
            document.getElementById("id_PopUp_ColorTrans_V1_2").innerHTML="G";
            document.getElementById("id_PopUp_ColorTrans_V1_3").innerHTML="B";
            document.getElementById("id_PopUp_ColorTrans_V2_1").innerHTML="X";
            document.getElementById("id_PopUp_ColorTrans_V2_2").innerHTML="Y";
            document.getElementById("id_PopUp_ColorTrans_V2_3").innerHTML="Z";
            document.getElementById("id_PopUp_InvColorTrans_V1_1").innerHTML="X";
            document.getElementById("id_PopUp_InvColorTrans_V1_2").innerHTML="Y";
            document.getElementById("id_PopUp_InvColorTrans_V1_3").innerHTML="Z";
            document.getElementById("id_PopUp_InvColorTrans_V2_1").innerHTML="R";
            document.getElementById("id_PopUp_InvColorTrans_V2_2").innerHTML="G";
            document.getElementById("id_PopUp_InvColorTrans_V2_3").innerHTML="B";
            this.fillSelect_Transfermatrices();
            this.changeTransformationMatrix();
            break;
          case 1:
            document.getElementById("id_CT_1_Settings").style.display = "flex";
            document.getElementById("id_Options_XYZtoLMS").style.background = "var(--main-active-coloredButton)";
            document.getElementById("id_PopUp_ColorTrans_V1_1").innerHTML="X";
            document.getElementById("id_PopUp_ColorTrans_V1_2").innerHTML="Y";
            document.getElementById("id_PopUp_ColorTrans_V1_3").innerHTML="Z";
            document.getElementById("id_PopUp_ColorTrans_V2_1").innerHTML="L";
            document.getElementById("id_PopUp_ColorTrans_V2_2").innerHTML="M";
            document.getElementById("id_PopUp_ColorTrans_V2_3").innerHTML="S";
            document.getElementById("id_PopUp_InvColorTrans_V1_1").innerHTML="L";
            document.getElementById("id_PopUp_InvColorTrans_V1_2").innerHTML="M";
            document.getElementById("id_PopUp_InvColorTrans_V1_3").innerHTML="S";
            document.getElementById("id_PopUp_InvColorTrans_V2_1").innerHTML="X";
            document.getElementById("id_PopUp_InvColorTrans_V2_2").innerHTML="Y";
            document.getElementById("id_PopUp_InvColorTrans_V2_3").innerHTML="Z";
            this.fillSelect_Transfermatrices();
            this.changeTransformationMatrix();
            break;
          case 2:
            document.getElementById("id_CT_2_Settings").style.display = "flex";
            document.getElementById("id_Options_XYZtoLab").style.background = "var(--main-active-coloredButton)";
            break;
          case 3:
            document.getElementById("id_CT_2_Settings").style.display = "flex";
            document.getElementById("id_Options_LABtoDIN99").style.background = "var(--main-active-coloredButton)";
            break;
          default:
            this.settingStatus = 0;
            this.updateSection();
        }
        break;
      case 1:
        //////////////////////////////////////////////////////
        /////////////////// Color Metric /////////////////////
        //////////////////////////////////////////////////////
        document.getElementById("id_Options_CDM").style.background = "var(--main-active-coloredButton)";
        document.getElementById("id_CDM_Settings").style.display = "flex";

        document.getElementById("id_Options_RGBtoXYZ").style.color = "var(--main-coloredFont-deactivated)";
        document.getElementById("id_Options_XYZtoLMS").style.color = "var(--main-coloredFont-deactivated)";
        document.getElementById("id_Options_XYZtoLab").style.color = "var(--main-coloredFont-deactivated)";
        document.getElementById("id_Options_LABtoDIN99").style.color = "var(--main-coloredFont-deactivated)";
        document.getElementById("id_Options_de94").style.color = "var(--main-coloredFont)";
        document.getElementById("id_Options_de2000").style.color = "var(--main-coloredFont)";

        document.getElementById("id_Options_CT_Subsections").style.width = "0vw";
        document.getElementById("id_Options_CDM_Subsections").style.width = "100vw";

        switch (this.settingStatus) {
          case 0:
            document.getElementById("id_Options_de94").style.background = "var(--main-active-coloredButton)";
            document.getElementById("id_PopUp_Metric_Div4").style.visibility="visible";
            document.getElementById("id_PopUp_Metric_Div5").style.visibility="hidden";
          break;
          case 1:
            document.getElementById("id_Options_de2000").style.background = "var(--main-active-coloredButton)";
            document.getElementById("id_PopUp_Metric_Div4").style.visibility="hidden";
            document.getElementById("id_PopUp_Metric_Div5").style.visibility="visible";
          break;
          default:
            this.settingStatus = 0;
            this.updateSection();
        }
        break;
      default:
        this.settingType = 0;
        this.updateSection();
    }

  }

  fillSelect_Transfermatrices(){
    var selectbox = document.getElementById("id_select_TransferMatrix");
    for(var i = selectbox.options.length - 1 ; i >= 0 ; i--){selectbox.remove(i);}

    switch (this.settingStatus) {
      case 0:
        for (var i = 0; i < this.rgb2xyz_matrices.length; i++) {
          var opt = document.createElement('option');
          opt.innerHTML=this.rgb2xyz_matrices[i][0];
          selectbox.appendChild(opt);
        }
        selectbox.selectedIndex=this.rgb2xyz_tmpSelected;
      break;
      case 1:
      for (var i = 0; i < this.xyz2lms_matrices.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML=this.xyz2lms_matrices[i][0];
        selectbox.appendChild(opt);
      }
        selectbox.selectedIndex=this.xyz2lms_tmpSelected;
      break;
    }

  }

  setDefault() {
    this.rgb2xyz_selected = 0;
    this.xyz2lms_selected = 0;
  }

  reset() {
    this.rgb2xyz_tmpSelected=this.rgb2xyz_selected;
    this.xyz2lms_tmpSelected=this.xyz2lms_selected;
  }

  applySettings() {
    this.rgb2xyz_selected = this.rgb2xyz_tmpSelected;
    tmLMS_Selected = this.get_xyz2lms();
    tmLMS_Selected_Inv = this.get_xyz2lms_INV();

    this.xyz2lms_selected = this.xyz2lms_tmpSelected;
    tmXYZ_Selected = this.get_rgb2xyz();
    tmXYZ_Selected_Inv = this.get_rgb2xyz_INV();
  }

  switchSettings(type, status){
    this.settingType = type;
    this.settingStatus = status;
    this.updateSection();
  }

  get_rgb2xyz(){
    return this.rgb2xyz_matrices[this.rgb2xyz_selected][1];
  }

  get_rgb2xyz_INV(){
    return invert3x3Matrix(this.rgb2xyz_matrices[this.rgb2xyz_selected][1]);
  }

  get_xyz2lms(){
    return this.xyz2lms_matrices[this.xyz2lms_selected][1];
  }

  get_xyz2lms_INV(){
    return invert3x3Matrix(this.xyz2lms_matrices[this.xyz2lms_selected][1]);
  }

  /*changeRGBtoXYZ(){

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
  }*/

  changeTransformationMatrix(){
    var selectbox = document.getElementById("id_select_TransferMatrix");

    switch (this.settingStatus) {
      case 0:
        this.rgb2xyz_tmpSelected = selectbox.selectedIndex;
        if(this.rgb2xyz_tmpSelected==selectbox.options.length-1){
          /// CUSTOM
        }
        document.getElementById("inputTransferMatrix00").value = this.rgb2xyz_matrices[this.rgb2xyz_tmpSelected][1][0][0];
        document.getElementById("inputTransferMatrix10").value = this.rgb2xyz_matrices[this.rgb2xyz_tmpSelected][1][1][0];
        document.getElementById("inputTransferMatrix20").value = this.rgb2xyz_matrices[this.rgb2xyz_tmpSelected][1][2][0];

        document.getElementById("inputTransferMatrix01").value = this.rgb2xyz_matrices[this.rgb2xyz_tmpSelected][1][0][1];
        document.getElementById("inputTransferMatrix11").value = this.rgb2xyz_matrices[this.rgb2xyz_tmpSelected][1][1][1];
        document.getElementById("inputTransferMatrix21").value = this.rgb2xyz_matrices[this.rgb2xyz_tmpSelected][1][2][1];

        document.getElementById("inputTransferMatrix02").value = this.rgb2xyz_matrices[this.rgb2xyz_tmpSelected][1][0][2];
        document.getElementById("inputTransferMatrix12").value = this.rgb2xyz_matrices[this.rgb2xyz_tmpSelected][1][1][2];
        document.getElementById("inputTransferMatrix22").value = this.rgb2xyz_matrices[this.rgb2xyz_tmpSelected][1][2][2];

        var tmpInv = invert3x3Matrix(this.rgb2xyz_matrices[this.rgb2xyz_tmpSelected][1])
        document.getElementById("inputInvTransferMatrix00").innerHTML = tmpInv[0][0];
        document.getElementById("inputInvTransferMatrix10").innerHTML = tmpInv[1][0];
        document.getElementById("inputInvTransferMatrix20").innerHTML = tmpInv[2][0];

        document.getElementById("inputInvTransferMatrix01").innerHTML = tmpInv[0][1];
        document.getElementById("inputInvTransferMatrix11").innerHTML = tmpInv[1][1];
        document.getElementById("inputInvTransferMatrix21").innerHTML = tmpInv[2][1];

        document.getElementById("inputInvTransferMatrix02").innerHTML = tmpInv[0][2];
        document.getElementById("inputInvTransferMatrix12").innerHTML = tmpInv[1][2];
        document.getElementById("inputInvTransferMatrix22").innerHTML = tmpInv[2][2];
      break;
      case 1:
      this.xyz2lms_tmpSelected = selectbox.selectedIndex;
      if(this.xyz2lms_tmpSelected==selectbox.options.length-1){
        /// CUSTOM
      }
      document.getElementById("inputTransferMatrix00").value = this.xyz2lms_matrices[this.xyz2lms_tmpSelected][1][0][0];
      document.getElementById("inputTransferMatrix10").value = this.xyz2lms_matrices[this.xyz2lms_tmpSelected][1][1][0];
      document.getElementById("inputTransferMatrix20").value = this.xyz2lms_matrices[this.xyz2lms_tmpSelected][1][2][0];

      document.getElementById("inputTransferMatrix01").value = this.xyz2lms_matrices[this.xyz2lms_tmpSelected][1][0][1];
      document.getElementById("inputTransferMatrix11").value = this.xyz2lms_matrices[this.xyz2lms_tmpSelected][1][1][1];
      document.getElementById("inputTransferMatrix21").value = this.xyz2lms_matrices[this.xyz2lms_tmpSelected][1][2][1];

      document.getElementById("inputTransferMatrix02").value = this.xyz2lms_matrices[this.xyz2lms_tmpSelected][1][0][2];
      document.getElementById("inputTransferMatrix12").value = this.xyz2lms_matrices[this.xyz2lms_tmpSelected][1][1][2];
      document.getElementById("inputTransferMatrix22").value = this.xyz2lms_matrices[this.xyz2lms_tmpSelected][1][2][2];

      var tmpInv = invert3x3Matrix(this.xyz2lms_matrices[this.xyz2lms_tmpSelected][1])
      document.getElementById("inputInvTransferMatrix00").innerHTML = tmpInv[0][0];
      document.getElementById("inputInvTransferMatrix10").innerHTML = tmpInv[1][0];
      document.getElementById("inputInvTransferMatrix20").innerHTML = tmpInv[2][0];

      document.getElementById("inputInvTransferMatrix01").innerHTML = tmpInv[0][1];
      document.getElementById("inputInvTransferMatrix11").innerHTML = tmpInv[1][1];
      document.getElementById("inputInvTransferMatrix21").innerHTML = tmpInv[2][1];

      document.getElementById("inputInvTransferMatrix02").innerHTML = tmpInv[0][2];
      document.getElementById("inputInvTransferMatrix12").innerHTML = tmpInv[1][2];
      document.getElementById("inputInvTransferMatrix22").innerHTML = tmpInv[2][2];
      break;
    }

  }


};
