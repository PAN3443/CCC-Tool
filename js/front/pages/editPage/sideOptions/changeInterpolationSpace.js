
function changeColorspace(space){

  switch (space) {
    case 0:
        globalCMS1.setInterpolationSpace("rgb");
      break;
      case 1:
          globalCMS1.setInterpolationSpace("hsv");
        break;
        case 2:
            globalCMS1.setInterpolationSpace("lab");
          break;
          case 3:
              globalCMS1.setInterpolationSpace("din99");
            break;
            case 4:
                globalCMS1.setInterpolationSpace("de94");
              break;
              case 5:
                  globalCMS1.setInterpolationSpace("de2000");
                break;
    default:

  }


  if(document.getElementById("id_EditPage").style.display!="none"){
    updateInterpolationSpaceEditPage();
  }

}


function updateInterpolationSpaceEditPage(){

 document.getElementById("id_EditPage_SelectLab").innerHTML="";
 document.getElementById("id_EditPage_SelectDIN99").innerHTML="";
 document.getElementById("id_EditPage_SelectDE94").innerHTML="";
 document.getElementById("id_EditPage_SelectCIEDE2000").innerHTML="";
 document.getElementById("id_EditPage_SelectRGB").innerHTML="";
 document.getElementById("id_EditPage_SelectHSV").innerHTML="";

 document.getElementById("id_EditPage_SmileyImg").style.display="none";
 document.getElementById("id_EditPage_SadleyImg").style.display="none";


  switch (globalCMS1.getInterpolationSpace()) {
    case "rgb":
        document.getElementById("id_EditPage_SelectRGB").innerHTML="&#10004;";
        document.getElementById("id_EditPage_SadleyImg").style.display="inline-block";
        document.getElementById("id_EditPage_CMSSpaceLabel").innerHTML="Space : RGB";
      break;
      case "hsv":
          document.getElementById("id_EditPage_SelectHSV").innerHTML="&#10004;";
          document.getElementById("id_EditPage_SadleyImg").style.display="inline-block";
          document.getElementById("id_EditPage_CMSSpaceLabel").innerHTML="Space : HSV";
        break;
        case "lab":
            document.getElementById("id_EditPage_SelectLab").innerHTML="&#10004;";
            document.getElementById("id_EditPage_SmileyImg").style.display="inline-block";
            document.getElementById("id_EditPage_CMSSpaceLabel").innerHTML="Space : LAB";
          break;
          case "din99":
              document.getElementById("id_EditPage_SelectDIN99").innerHTML="&#10004;";
              document.getElementById("id_EditPage_SmileyImg").style.display="inline-block";
              document.getElementById("id_EditPage_CMSSpaceLabel").innerHTML="Space : DIN99";
            break;
            case "de94":
                document.getElementById("id_EditPage_SelectDE94").innerHTML="&#10004;";
                document.getElementById("id_EditPage_SmileyImg").style.display="inline-block";
                document.getElementById("id_EditPage_CMSSpaceLabel").innerHTML="Space : DE94";
              break;
              case "de2000":
                  document.getElementById("id_EditPage_SelectCIEDE2000").innerHTML="&#10004;";
                  document.getElementById("id_EditPage_SmileyImg").style.display="inline-block";
                  document.getElementById("id_EditPage_CMSSpaceLabel").innerHTML="Space : DE2000";
                break;
    default:

  }


  drawConstantBands();
  drawScaledBands();
  drawConstCustomBand();
  drawScaleCustomBand();
  updateEditPage();
}
