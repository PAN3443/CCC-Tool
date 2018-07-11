////////////////////////////////////
//// possible User Settings


// 2000
var de2000_k_L = 1.0, de2000_k_C = 1.0, de2000_k_H = 1.0; // K_l = 1 default, = 2 textiles

// 94
var de94_k_L = 1.0, de94_k_C = 1.0, de94_k_H = 1.0; // K_l = 1 default, = 2 textiles
var de94_k_1 = 0.045, de94_k_2 = 0.015; // K1: 0.045 graphic arts  0.048 textiles  K2: 0.015 graphic arts 0.014 textiles

/// Colorspace Parameter
var din99_kE = 1;
var din99_kCH = 1;

var cielab_ref_X = 94.811;
var cielab_ref_Y = 100.000;
var cielab_ref_Z = 107.304;

//////////////////////////////////////////////////////////////////////
// XYZ
var tmXYZ_sRGB_D65 = [[0.4124564,0.3575761,0.1804375],[0.2126729,0.7151522,0.0721750],[0.0193339,0.1191920,0.9503041]]; // Reference White D65
var tmXYZ_sRGB_D65_Inv = [[3.2404542,-1.5371385,-0.4985314],[-0.9692660,1.8760108,0.0415560],[0.0556434,-0.2040259,1.0572252]]; // Reference White D65
var tmXYZ_sRGB_D50 = [[0.4360747,0.3850649,0.1430804],[0.2225045,0.7168786,0.0606169],[0.0139322,0.0971045,0.7141733]]; // Reference White D50
var tmXYZ_sRGB_D50_Inv = [[3.1338561,-1.6168667,-0.4906146],[-0.9787684,1.9161415,0.0334540],[0.0719453,-0.2289914,1.4052427]]; // Reference White D50
var tmXYZ_AdobeRGB_D65 = [[0.5767309,0.1855540,0.1881852],[0.2973769,0.6273491,0.0752741],[0.0270343,0.0706872,0.9911085]];  // Reference White D65
var tmXYZ_AdobeRGB_D65_Inv = [[2.0413690,-0.5649464,-0.3446944],[-0.9692660,1.8760108,0.0415560],[0.0134474,-0.1183897,1.0154096]]; // Reference White D65
var tmXYZ_AdobeRGB_D50 = [[0.6097559,0.2052401,0.1492240],[0.3111242,0.6256560,0.0632197],[0.0194811,0.0608902,0.7448387]]; // Reference White D50
var tmXYZ_AdobeRGB_D50_Inv = [[1.9624274,-0.6105343,-0.3413404],[-0.9787684,1.9161415,0.0334540],[0.0286869,-0.1406752,1.3487655]]; // Reference White D50
var tmXYZ_AppleRGB_D65 = [[0.4497288,0.3162486,0.1844926],[0.2446525,0.6720283,0.0833192],[0.0251848,0.1411824,0.9224628]]; // Reference White D65
var tmXYZ_AppleRGB_D65_Inv = [[2.9515373,-1.2894116,-0.4738445],[-1.0851093,1.9908566,0.0372026],[0.0854934,-0.2694964,1.0912975]]; // Reference White D65
var tmXYZ_AppleRGB_D50 = [[0.4755678,0.3396722,0.1489800],[0.2551812,0.6725693,0.0722496],[0.0184697,0.1133771,0.6933632]]; // Reference White D50
var tmXYZ_AppleRGB_D50_Inv = [[2.8510695,-1.3605261,-0.4708281],[-1.0927680,2.0348871,0.0227598],[0.1027403,-0.2964984,1.4510659]]; // Reference White D50
var tmXYZ_BestRGB_D50 = [[0.6326696,0.2045558,0.1269946],[0.2284569,0.7373523,0.0341908],[0.0000000,0.0095142,0.8156958]]; // Reference White D50
var tmXYZ_BestRGB_D50_Inv = [[1.7552599,-0.4836786,-0.2530000],[-0.5441336,1.5068789,0.0215528],[0.0063467,-0.0175761,1.2256959]]; // Reference White D50
var tmXYZ_BetaRGB_D50 = [[0.6712537,0.1745834,0.1183829],[0.3032726,0.6637861,0.0329413],[0.0000000,0.0407010,0.7845090]]; // Reference White D50
var tmXYZ_BetaRGB_D50_Inv = [[1.6832270,-0.4282363,-0.2360185],[-0.7710229,1.7065571,0.0446900],[0.0400013,-0.0885376,1.2723640]]; // Reference White D50
var tmXYZ_BruceRGB_D65 = [[0.4674162,0.2944512,0.1886026],[0.2410115,0.6835475,0.0754410],[0.0219101,0.0736128,0.9933071]]; // Reference White D65
var tmXYZ_BruceRGB_D65_Inv = [[2.7454669,-1.1358136,-0.4350269],[-0.9692660,1.8760108,0.0415560],[0.0112723,-0.1139754,1.0132541]];//,Reference,White,D65
var tmXYZ_BruceRGB_D50 = [[0.4941816,0.3204834,0.1495550],[0.2521531,0.6844869,0.0633600],[0.0157886,0.0629304,0.7464909]]; // Reference White D50
var tmXYZ_BruceRGB_D50_Inv = [[2.6502856,-1.2014485,-0.4289936],[-0.9787684,1.9161415,0.0334540],[0.0264570,-0.1361227,1.3458542]]; // Reference White D50
var tmXYZ_CIERGB_E = [[0.4887180,0.3106803,0.2006017],[0.1762044,0.8129847,0.0108109],[0.0000000,0.0102048,0.9897952]]; // Reference White E
var tmXYZ_CIERGB_E_Inv = [[2.3706743,-0.9000405,-0.4706338],[-0.5138850,1.4253036,0.0885814],[0.0052982,-0.0146949,1.0093968]]; // Reference White E
var tmXYZ_CIERGB_D50 = [[0.4868870,0.3062984,0.1710347],[0.1746583,0.8247541,0.0005877],[-0.0012563,0.0169832,0.8094831]]; // Reference White D50
var tmXYZ_CIERGB_D50_Inv = [[2.3638081,-0.8676030,-0.4988161],[-0.5005940,1.3962369,0.1047562],[0.0141712,-0.0306400,1.2323842]]; // Reference White AppleRGB_D50
var tmXYZ_ColorMatchRGB_D50 = [[0.5093439,0.3209071,0.1339691],[0.2748840,0.6581315,0.0669845],[0.0242545,0.1087821,0.6921735]]; // Reference White D50
var tmXYZ_ColorMatchRGB_D50_Inv = [[2.6422874,-1.2234270,-0.3930143],[-1.1119763,2.0590183,0.0159614],[0.0821699,-0.2807254,1.4559877]]; // Reference White D50
var tmXYZ_DonRGB4_D50 = [[0.6457711,0.1933511,0.1250978],[0.2783496,0.6879702,0.0336802],[0.0037113,0.0179861,0.8035125]]; // Reference White D50
var tmXYZ_DonRGB4_D50_Inv = [[1.7603902,-0.4881198,-0.2536126],[-0.7126288,1.6527432,0.0416715],[0.0078207,-0.0347411,1.2447743]]; // Reference White D50
var tmXYZ_ECIRGB_D50 = [[0.6502043,0.1780774,0.1359384],[0.3202499,0.6020711,0.0776791],[0.0000000,0.0678390,0.7573710]]; // Reference White D50
var tmXYZ_ECIRGB_Inv_D50 = [[1.7827618,-0.4969847,-0.2690101],[-0.9593623,1.9477962,-0.0275807],[0.0859317,-0.1744674,1.3228273]]; // Reference White D50
var tmXYZ_EktaSpacePS5_D50 = [[0.5938914,0.2729801,0.0973485],[0.2606286,0.7349465,0.0044249],[0.0000000,0.0419969,0.7832131]]; // Reference White D50
var tmXYZ_EktaSpacePS5_D50_Inv = [[2.0043819,-0.7304844,-0.2450052],[-0.7110285,1.6202126,0.0792227],[0.0381263,-0.0868780,1.2725438]]; // Reference White D50
var tmXYZ_NTSC_RGB_C = [[0.6068909,0.1735011,0.2003480],[0.2989164,0.5865990,0.1144845],[0.0000000,0.0660957,1.1162243]]; // Reference White C
var tmXYZ_NTSC_RGB_C_Inv = [[1.9099961,-0.5324542,-0.2882091],[-0.9846663,1.9991710,-0.0283082],[0.0583056,-0.1183781,0.8975535]]; // Reference White C
var tmXYZ_NTSC_RGB_D50 = [[0.6343706,0.1852204,0.1446290],[0.3109496,0.5915984,0.0974520],[-0.0011817,0.0555518,0.7708399]]; // Reference White D50
var tmXYZ_NTSC_RGB_D50_Inv = [[1.8464881,-0.5521299,-0.2766458],[-0.9826630,2.0044755,-0.0690396],[0.0736477,-0.1453020,1.3018376]]; // Reference White D50
var tmXYZ_PAL_SECAM_RGB_D65 = [[0.4306190,0.3415419,0.1783091],[0.2220379,0.7066384,0.0713236],[0.0201853,0.1295504,0.9390944]]; // Reference White D65
var tmXYZ_PAL_SECAM_RGB_D65_Inv = [[3.0628971,-1.3931791,-0.4757517],[-0.9692660,1.8760108,0.0415560],[0.0678775,-0.2288548,1.0693490]]; // Reference White D65
var tmXYZ_PAL_SECAM_RGB_D50 = [[0.4552773,0.3675500,0.1413926],[0.2323025,0.7077956,0.0599019],[0.0145457,0.1049154,0.7057489]]; // Reference White D50
var tmXYZ_PAL_SECAM_RGB_D50_Inv = [[2.9603944,-1.4678519,-0.4685105],[-0.9787684,1.9161415,0.0334540],[0.0844874,-0.2545973,1.4216174]]; // Reference White D50
var tmXYZ_ProPhotoRGB_D50 = [[0.7976749,0.1351917,0.0313534],[0.2880402,0.7118741,0.0000857],[0.0000000,0.0000000,0.8252100]]; // Reference White D50
var tmXYZ_ProPhotoRGB_D50_Inv = [[1.3459433,-0.2556075,-0.0511118],[-0.5445989,1.5081673,0.0205351],[0.0000000,0.0000000,1.2118128]]; // Reference White D50
var tmXYZ_SMPTE_C_RGB_D65 = [[0.3935891,0.3652497,0.1916313],[0.2124132,0.7010437,0.0865432],[0.0187423,0.1119313,0.9581563]]; // Reference White D65
var tmXYZ_SMPTE_C_RGB_D65_Inv = [[3.5053960,-1.7394894,-0.5439640],[-1.0690722,1.9778245,0.0351722],[0.0563200,-0.1970226,1.0502026]]; // Reference White D65
var tmXYZ_SMPTE_C_RGB_D50 = [[0.4163290,0.3931464,0.1547446],[0.2216999,0.7032549,0.0750452],[0.0136576,0.0913604,0.7201920]]; // Reference White D50
var tmXYZ_SMPTE_C_RGB_D50_Inv = [[3.3921940,-1.8264027,-0.5385522],[-1.0770996,2.0213975,0.0207989],[0.0723073,-0.2217902,1.3960932]]; // Reference White D50
var tmXYZ_ProPhotoRGB_Wide_Gamut_RGB_D50 = [[0.7161046,0.1009296,0.1471858],[0.2581874,0.7249378,0.0168748],[0.0000000,0.0517813,0.7734287]]; // Reference White D50
var tmXYZ_ProPhotoRGB_Wide_Gamut_RGB_D50_Inv = [[1.4628067,-0.1840623,-0.2743606],[-0.5217933,1.4472381,0.0677227],[0.0349342,-0.0968930,1.2884099]]; // Reference White D50

var tmXYZ_Selected = tmXYZ_sRGB_D65;
var tmXYZ_Selected_Inv = tmXYZ_sRGB_D65_Inv;
///////////////////////////////////////////////////////////////////////
// LMS

var tmLMS_HPE = [[0.38971,0.68898,-0.07868],[-0.22981,1.18340,0.04641],[0,0,1]]; // (Hunt-Pointer-Estevez)
var tmLMS_vK  = [[0.4002,0.7076,-0.0808],[-0.2263,1.1653,0.0457],[0,0,0.9182]]; //  (von Kries)
var tmLMS_BFD = [[0.8951,0.2664,-0.1614],[-0.7502,1.7135,0.0367],[0.0389,-0.0685,1.0296]]; // (Bradford)
var tmLMS_CAT97s = [[0.8562,0.3372,-0.1934],[-0.8360,1.8327,0.0033],[0.0357,-0.0469,1.0112]]; //  (CIECAM97s)
var tmLMS_CAT02 = [[0.7328,0.4296,-0.1624],[-0.7036,1.6975,0.0061],[0.0030,0.0136,0.9834]]; //  (CIECAM02)

var tmLMS_HPE_Inv = [[5917000000/3097586539,  -3444900000/3097586539, 625427369/3097586539 ],[1149050000/3097586539,1948550000/3097586539,-49903/6195173078],[0 ,0 ,1]]; // (Hunt-Pointer-Estevez)
var tmLMS_vK_Inv  = [[58265000/31324147,-1220000/1080143,31623390000/143809158877],[11315000/31324147,690000/1080143,-1025000/143809158877],[0,0,5000/4591]]; //  (von Kries)
var tmLMS_BFD_Inv = [[353346710000/358003292671,-52645908000/358003292671,57267156000/358003292671],[154766710000/358003292671,185574684000/358003292671,17646422000/358003292671],[-3053290000/358003292671,14335462000/358003292671,346721426000/358003292671]]; // (Bradford)
var tmLMS_CAT97s_Inv = [[185338101/187703177,-33190618/187703177,35555694/187703177],[84548101/187703177,87269382/187703177,15885694/187703177],[-2621899/187703177,5219382/187703177,185105694/187703177]]; //  (CIECAM97s)
var tmLMS_CAT02_Inv = [[83461927/76142791,-21233864/76142791,13914728/76142791],[34596927/76142791,36056136/76142791,5489728/76142791],[-733073/76142791,-433864/76142791,77309728/76142791 ]]; //  (CIECAM02)

var tmLMS_Selected;
var tmLMS_Selected_Inv;

function updateXYZtoLMS_TransferMatrices(){

  if(document.getElementById("select_LMSTransferMatrix").selectedIndex==5){
    document.getElementById("label_lmstransferMatrixCol1").style.display = "none";
    document.getElementById("label_lmstransferMatrixCol2").style.display = "none";
    document.getElementById("label_lmstransferMatrixCol3").style.display = "none";
    document.getElementById("input_lmstransferMatrixCol1").style.display = "inline-block";
    document.getElementById("input_lmstransferMatrixCol2").style.display = "inline-block";
    document.getElementById("input_lmstransferMatrixCol3").style.display = "inline-block";
  }
  else{
    document.getElementById("label_lmstransferMatrixCol1").style.display = "inline-block";
    document.getElementById("label_lmstransferMatrixCol2").style.display = "inline-block";
    document.getElementById("label_lmstransferMatrixCol3").style.display = "inline-block";
    document.getElementById("input_lmstransferMatrixCol1").style.display = "none";
    document.getElementById("input_lmstransferMatrixCol2").style.display = "none";
    document.getElementById("input_lmstransferMatrixCol3").style.display = "none";
  }

  switch ( document.getElementById("select_LMSTransferMatrix").selectedIndex) {
    case 0:
      tmLMS_Selected=tmLMS_HPE;
      tmLMS_Selected_Inv=tmLMS_HPE_Inv;
      break;
      case 1:
        tmLMS_Selected=tmLMS_vK;
        tmLMS_Selected_Inv=tmLMS_vK_Inv;
        break;
        case 2:
          tmLMS_Selected=tmLMS_BFD;
          tmLMS_Selected_Inv=tmLMS_BFD_Inv;
          break;
          case 3:
            tmLMS_Selected=tmLMS_CAT97s;
            tmLMS_Selected_Inv=tmLMS_CAT97s_Inv;
            break;
            case 4:
              tmLMS_Selected=tmLMS_CAT02;
              tmLMS_Selected_Inv=tmLMS_CAT02_Inv;
              break;

              case 5: // Custom

                tmLMS_Selected= [[parseFloat(document.getElementById("inputXyztoLSMTransferMatrix00").value),parseFloat(document.getElementById("inputXyztoLSMTransferMatrix01").value),parseFloat(document.getElementById("inputXyztoLSMTransferMatrix02").value)],
                                              [parseFloat(document.getElementById("inputXyztoLSMTransferMatrix10").value),parseFloat(document.getElementById("inputXyztoLSMTransferMatrix11").value),parseFloat(document.getElementById("inputXyztoLSMTransferMatrix12").value)],
                                              [parseFloat(document.getElementById("inputXyztoLSMTransferMatrix20").value),parseFloat(document.getElementById("inputXyztoLSMTransferMatrix21").value),parseFloat(document.getElementById("inputXyztoLSMTransferMatrix22").value)]];


                var determinant =    +A(0,0)*(A(1,1)*A(2,2)-A(2,1)*A(1,2))-A(0,1)*(A(1,0)*A(2,2)-A(1,2)*A(2,0))+A(0,2)*(A(1,0)*A(2,1)-A(1,1)*A(2,0));

                if(determinant==0){
                  document.getElementById("mySelect").selectedIndex=1;
                  tmLMS_Selected=tmLMS_vK;
                  tmLMS_Selected_Inv=tmLMS_vK_Inv;
                  break;
                }
                var invdet = 1/determinant;
                tmLMS_Selected_Inv=[[0,0,0],[0,0,0],[0,0,0]];
                              tmLMS_Selected_Inv[0,0] = (tmLMS_Selected[1,1]*tmLMS_Selected[2,2]-tmLMS_Selected[2,1]*tmLMS_Selected[1,2])*invdet;
                              tmLMS_Selected_Inv[1,0] = -(tmLMS_Selected[0,1]*tmLMS_Selected[2,2]-tmLMS_Selected[0,2]*tmLMS_Selected[2,1])*invdet;
                              tmLMS_Selected_Inv[2,0] = (tmLMS_Selected[0,1]*tmLMS_Selected[1,2]-tmLMS_Selected[0,2]*tmLMS_Selected[1,1])*invdet;
                              tmLMS_Selected_Inv[0,1] = -(tmLMS_Selected[1,0]*tmLMS_Selected[2,2]-tmLMS_Selected[1,2]*tmLMS_Selected[2,0])*invdet;
                              tmLMS_Selected_Inv[1,1] = (tmLMS_Selected[0,0]*tmLMS_Selected[2,2]-tmLMS_Selected[0,2]*tmLMS_Selected[2,0])*invdet;
                              tmLMS_Selected_Inv[2,1] = -(tmLMS_Selected[0,0]*tmLMS_Selected[1,2]-tmLMS_Selected[1,0]*tmLMS_Selected[0,2])*invdet;
                              tmLMS_Selected_Inv[0,2] = (tmLMS_Selected[1,0]*tmLMS_Selected[2,1]-tmLMS_Selected[2,0]*tmLMS_Selected[1,1])*invdet;
                              tmLMS_Selected_Inv[1,2] = -(tmLMS_Selected[0,0]*tmLMS_Selected[2,1]-tmLMS_Selected[2,0]*tmLMS_Selected[0,1])*invdet;
                              tmLMS_Selected_Inv[2,2] = (tmLMS_Selected[0,0]*tmLMS_Selected[1,1]-tmLMS_Selected[1,0]*tmLMS_Selected[0,1])*invdet;
                break;

    default:
    document.getElementById("mySelect").selectedIndex=2;
    tmLMS_Selected=tmLMS_vK;
    tmLMS_Selected_Inv=tmLMS_vK_Inv;

  }

  document.getElementById("xyztoLSMTransferMatrix00").innerHTML=tmLMS_Selected[0][0];
  document.getElementById("xyztoLSMTransferMatrix01").innerHTML=tmLMS_Selected[1][0];
  document.getElementById("xyztoLSMTransferMatrix02").innerHTML=tmLMS_Selected[2][0];

  document.getElementById("xyztoLSMTransferMatrix10").innerHTML=tmLMS_Selected[0][1];
  document.getElementById("xyztoLSMTransferMatrix11").innerHTML=tmLMS_Selected[1][1];
  document.getElementById("xyztoLSMTransferMatrix12").innerHTML=tmLMS_Selected[2][1];

  document.getElementById("xyztoLSMTransferMatrix20").innerHTML=tmLMS_Selected[0][2];
  document.getElementById("xyztoLSMTransferMatrix21").innerHTML=tmLMS_Selected[1][2];
  document.getElementById("xyztoLSMTransferMatrix22").innerHTML=tmLMS_Selected[2][2];

}

////////////////////////// http://ixora.io/projects/colorblindness/color-blindness-simulation-research/

var colorblindnessType = 0; // 0=sim_Protanopia, 1=sim_Deuteranopia, 2=sim_Tritanopes, 3=sim_BlueConeMonochromatism, 4=sim_Achromatopsia sim_Custom

/*var sim_Protanopia = [[0,1.05118294,-0.05116099],[0,1,0],[0,0,1]]; // Red Blind
var sim_Deuteranopia = [[1,0,0],[0.9513092,0,0.04866992],[0,0,1]]; // Green Blind
var sim_Tritanopes = [[1,0,0],[0,1,0],[-0.86744736,1.86727089,0]]; // Blue Blind
var sim_BlueConeMonochromatism = [0.01775,0.10945,0.87262]; // Blue-Cone Monochromatism
var sim_Achromatopsia = [0.212656,0.715158,0.072186]; // Rod Monochromats*/
//var sim_Achromatopsia_Red_Blue = []); //
 //
//var sim_monochromacy = []);*/

var degreeOFColorblindness = 1.0;
var sim_AdaptiveColorblindness = [[0,1.05118294,-0.05116099],[0,1,0],[0,0,1]];


function updateColorBlindness_TransferMatrices(){
  var rgbWhiteOrigin = new classColor_RGB(1,1,1);
  var rgbBluePrimary = new classColor_RGB(0,0,1);
  var rgbRedPrimary = new classColor_RGB(1,0,0);
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

      degreeOFColorblindness=parseFloat(document.getElementById("range_DegreeProtanopia").value)/100;



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
        var a = (lmsBluePrimary.getLValue()*lmsWhiteOrigin.getSValue()-lmsWhiteOrigin.getLValue()*lmsBluePrimary.getSValue())/(lmsBluePrimary.getMValue()*lmsWhiteOrigin.getSValue()-lmsWhiteOrigin.getMValue()*lmsBluePrimary.getSValue());// new a value
        var b = (lmsBluePrimary.getLValue()*lmsWhiteOrigin.getMValue()-lmsWhiteOrigin.getLValue()*lmsBluePrimary.getMValue())/(lmsBluePrimary.getSValue()*lmsWhiteOrigin.getMValue()-lmsWhiteOrigin.getSValue()*lmsBluePrimary.getMValue());;// new b value
        sim_AdaptiveColorblindness= [[1-degreeOFColorblindness,a*degreeOFColorblindness,b*degreeOFColorblindness],[0,1,0],[0,0,1]];

        document.getElementById("infolabelTransferMatrix00").innerHTML="1-"+degreeOFColorblindness;
        document.getElementById("infolabelTransferMatrix01").innerHTML=degreeOFColorblindness+"*"+a.toFixed(5);
        document.getElementById("infolabelTransferMatrix02").innerHTML=degreeOFColorblindness+"*"+b.toFixed(5);

        document.getElementById("infolabelTransferMatrix10").innerHTML="0";
        document.getElementById("infolabelTransferMatrix11").innerHTML="1";
        document.getElementById("infolabelTransferMatrix12").innerHTML="0";

        document.getElementById("infolabelTransferMatrix20").innerHTML="0";
        document.getElementById("infolabelTransferMatrix21").innerHTML="0";
        document.getElementById("infolabelTransferMatrix22").innerHTML="1";

      break;
    case 1:

      degreeOFColorblindness=parseFloat(document.getElementById("range_DegreeDeuteranopia").value)/100;



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

        var a = (lmsBluePrimary.getMValue()*lmsWhiteOrigin.getSValue()-lmsWhiteOrigin.getMValue()*lmsBluePrimary.getSValue())/(lmsBluePrimary.getLValue()*lmsWhiteOrigin.getSValue()-lmsWhiteOrigin.getLValue()*lmsBluePrimary.getSValue());// new a value
        var b = (lmsBluePrimary.getMValue()*lmsWhiteOrigin.getLValue()-lmsWhiteOrigin.getMValue()*lmsBluePrimary.getLValue())/(lmsBluePrimary.getSValue()*lmsWhiteOrigin.getLValue()-lmsWhiteOrigin.getSValue()*lmsBluePrimary.getLValue());;// new b value

        sim_AdaptiveColorblindness= [[1,0,0],[a*degreeOFColorblindness,1-degreeOFColorblindness,b*degreeOFColorblindness],[0,0,1]];

        document.getElementById("infolabelTransferMatrix00").innerHTML="1";
        document.getElementById("infolabelTransferMatrix01").innerHTML="0";
        document.getElementById("infolabelTransferMatrix02").innerHTML="0";

        document.getElementById("infolabelTransferMatrix10").innerHTML=degreeOFColorblindness+"*"+a.toFixed(5);
        document.getElementById("infolabelTransferMatrix11").innerHTML="1-"+degreeOFColorblindness;
        document.getElementById("infolabelTransferMatrix12").innerHTML=degreeOFColorblindness+"*"+b.toFixed(5);

        document.getElementById("infolabelTransferMatrix20").innerHTML="0";
        document.getElementById("infolabelTransferMatrix21").innerHTML="0";
        document.getElementById("infolabelTransferMatrix22").innerHTML="1";
        break;
        case 2:

        degreeOFColorblindness=parseFloat(document.getElementById("range_DegreeTritanopes").value)/100;



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

        var a = (lmsRedPrimary.getSValue()*lmsWhiteOrigin.getMValue()-lmsWhiteOrigin.getSValue()*lmsRedPrimary.getMValue())/(lmsRedPrimary.getLValue()*lmsWhiteOrigin.getMValue()-lmsWhiteOrigin.getLValue()*lmsRedPrimary.getMValue());// new a value
        var b = (lmsRedPrimary.getSValue()*lmsWhiteOrigin.getLValue()-lmsWhiteOrigin.getSValue()*lmsRedPrimary.getLValue())/(lmsRedPrimary.getMValue()*lmsWhiteOrigin.getLValue()-lmsWhiteOrigin.getMValue()*lmsRedPrimary.getLValue());;// new b value

          sim_AdaptiveColorblindness= [[1,0,0],[0,1,0],[a*degreeOFColorblindness,b*degreeOFColorblindness,1-degreeOFColorblindness]];

          document.getElementById("infolabelTransferMatrix00").innerHTML="1";
          document.getElementById("infolabelTransferMatrix01").innerHTML="0";
          document.getElementById("infolabelTransferMatrix02").innerHTML="0";

          document.getElementById("infolabelTransferMatrix10").innerHTML="0";
          document.getElementById("infolabelTransferMatrix11").innerHTML="1";
          document.getElementById("infolabelTransferMatrix12").innerHTML="0";

          document.getElementById("infolabelTransferMatrix20").innerHTML=degreeOFColorblindness+"*"+a.toFixed(5);
          document.getElementById("infolabelTransferMatrix21").innerHTML=degreeOFColorblindness+"*"+b.toFixed(5);
          document.getElementById("infolabelTransferMatrix22").innerHTML="1-"+degreeOFColorblindness;

          break;
          case 3: // Achromatopsia
            sim_AdaptiveColorblindness= [[1,0,0],[0,1,0],[0,0,1]];
            break;
            case 4: // BlueCone
              sim_AdaptiveColorblindness= [[1,0,0],[0,1,0],[0,0,1]];
              break;
              case 5: // CustomColorblindness

                sim_AdaptiveColorblindness= [[parseFloat(document.getElementById("customTransferMatrix00").value),parseFloat(document.getElementById("customTransferMatrix01").value),parseFloat(document.getElementById("customTransferMatrix02").value)],
                                              [parseFloat(document.getElementById("customTransferMatrix10").value),parseFloat(document.getElementById("customTransferMatrix11").value),parseFloat(document.getElementById("customTransferMatrix12").value)],
                                              [parseFloat(document.getElementById("customTransferMatrix20").value),parseFloat(document.getElementById("customTransferMatrix21").value),parseFloat(document.getElementById("customTransferMatrix22").value)]];
                break;
    default:

  }

}

//////////////////////////////////////////////////////////////
/// from User
///////////////////////////////////////////////////////////////
var sim_Custom = [[1,0,0],[0,1,0],[0,0,1]];
