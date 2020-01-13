
function initMyDesign(){
  document.getElementById('id_MyDesings_HelpButton').onmouseenter= function(){ document.getElementById("id_MyDesings_Example_Img").style.display="flex"};
  document.getElementById('id_MyDesings_HelpButton').onmouseleave= function(){ document.getElementById("id_MyDesings_Example_Img").style.display="none"};
}

function changeNewInterSpace(type){

    document.getElementById("id_NewCMS_SpaceRGB").classList.remove("class_generalbutton_DarkBackgroundActive");
    document.getElementById("id_NewCMS_SpaceHSV").classList.remove("class_generalbutton_DarkBackgroundActive");
    document.getElementById("id_NewCMS_SpaceLAB").classList.remove("class_generalbutton_DarkBackgroundActive");
    document.getElementById("id_NewCMS_SpaceDIN99").classList.remove("class_generalbutton_DarkBackgroundActive");

    document.getElementById("id_NewCMS_SpaceRGB").classList.add("class_generalbutton_DarkBackground");
    document.getElementById("id_NewCMS_SpaceHSV").classList.add("class_generalbutton_DarkBackground");
    document.getElementById("id_NewCMS_SpaceLAB").classList.add("class_generalbutton_DarkBackground");
    document.getElementById("id_NewCMS_SpaceDIN99").classList.add("class_generalbutton_DarkBackground");


    switch (type) {
      case 0:
        newCMSInterpolationSpace = "rgb";
        document.getElementById("id_NewCMS_SpaceRGB").classList.remove("class_generalbutton_DarkBackground");
        document.getElementById("id_NewCMS_SpaceRGB").classList.add("class_generalbutton_DarkBackgroundActive");
        scaleExpVal1=255;
        scaleExpVal2=255;
        scaleExpVal3=255;
        break;
      case 1:
        newCMSInterpolationSpace = "hsv";
        document.getElementById("id_NewCMS_SpaceHSV").classList.remove("class_generalbutton_DarkBackground");
        document.getElementById("id_NewCMS_SpaceHSV").classList.add("class_generalbutton_DarkBackgroundActive");
        scaleExpVal1=360;
        scaleExpVal2=100;
        scaleExpVal3=100;
        break;
      case 2:
        newCMSInterpolationSpace = "lab";
        document.getElementById("id_NewCMS_SpaceLAB").classList.remove("class_generalbutton_DarkBackground");
        document.getElementById("id_NewCMS_SpaceLAB").classList.add("class_generalbutton_DarkBackgroundActive");
        break;
      case 3:
        newCMSInterpolationSpace = "din99";
        document.getElementById("id_NewCMS_SpaceDIN99").classList.remove("class_generalbutton_DarkBackground");
        document.getElementById("id_NewCMS_SpaceDIN99").classList.add("class_generalbutton_DarkBackgroundActive");
        break;
    }


}


function saveSession() {

  if (myDesignsList.length == 0) {
    openAlert("The MyDesigns list is empty");
    return;
  }

  var filename;
  var text;

  var d = new Date();
  var dayText = d.getDate() + "";
  var monthText = d.getMonth() + "";

  if (d.getDate() < 10)
    dayText = 0 + dayText;

  if (d.getMonth() < 10)
    monthText = 0 + monthText;


  filename = "ccc-tool_session_" + d.getFullYear() + monthText + dayText + ".xml";

  ///// Settings
  text = "<CCCToolSession>\n<settings>\n";
  text = text + "<de2000_k_L value=\"" + de2000_k_L + "\"/>\n"; //></de2000_k_L>\n";
  text = text + "<de2000_k_C value=\"" + de2000_k_C + "\"/>\n"; //></de2000_k_C>\n";
  text = text + "<de2000_k_H value=\"" + de2000_k_H + "\"/>\n"; //></de2000_k_H>\n";

  text = text + "<de94_k_L value=\"" + de94_k_L + "\"/>\n"; //></de94_k_L>\n";
  text = text + "<de94_k_C value=\"" + de94_k_C + "\"/>\n"; //></de94_k_C>\n";
  text = text + "<de94_k_H value=\"" + de94_k_H + "\"/>\n"; //></de94_k_H>\n";
  text = text + "<de94_k_1 value=\"" + de94_k_1 + "\"/>\n"; //></de94_k_1>\n";
  text = text + "<de94_k_2 value=\"" + de94_k_2 + "\"/>\n"; //></de94_k_2>\n";

  text = text + "<din99_kE value=\"" + din99_kE + "\"/>\n"; //></din99_kE>\n";
  text = text + "<din99_kCH value=\"" + din99_kCH + "\"/>\n"; //></din99_kCH>\n";

  text = text + "<cielab_ref_X value=\"" + cielab_ref_X + "\"/>\n"; //></cielab_ref_X>\n";
  text = text + "<cielab_ref_Y value=\"" + cielab_ref_Y + "\"/>\n"; //></cielab_ref_Y>\n";
  text = text + "<cielab_ref_Z value=\"" + cielab_ref_Z + "\"/>\n"; //></cielab_ref_Z>\n";

  text = text + "</settings>\n";
  ///////


  text = text + "<ColorMaps>\n";

  //changeExportColorspace(2); // session save in LAB Colorspace

  //var tmpGlobalCMS = cloneCMS(globalCMS1);

  for (var i = 0; i < myDesignsList.length; i++) {
    globalCMS1 = cloneCMS(myDesignsList[i]);

    var txtNaN = "";
    var txtAbove = "";
    var txtBelow = "";

    /*globalCMS1 = calcCMSIntervals(globalCMS1,0,globalCMS1.getKeyLength()-1);*/
    text = text + "<ColorMap name=\"" + globalCMS1.getColormapName() + "\" space=\"";


    // RGB only in RGB [0,1]
    /*switch (exportColorspace) {
      case "rgb":*/
        text = text + "RGB";
        txtNaN="<NaN r=\""+globalCMS1.getNaNColor("rgb").get1Value()+"\" g=\""+globalCMS1.getNaNColor("rgb").get2Value()+"\" b=\""+globalCMS1.getNaNColor("rgb").get3Value()+"\"/>\n";
        txtAbove="<Above r=\""+globalCMS1.getAboveColor("rgb").get1Value()+"\" g=\""+globalCMS1.getAboveColor("rgb").get2Value()+"\" b=\""+globalCMS1.getAboveColor("rgb").get3Value()+"\"/>\n";
        txtBelow="<Below r=\""+globalCMS1.getBelowColor("rgb").get1Value()+"\" g=\""+globalCMS1.getBelowColor("rgb").get2Value()+"\" b=\""+globalCMS1.getBelowColor("rgb").get3Value()+"\"/>\n";
        /*break;
      case "hsv":
        text = text + "HSV";
        txtNaN="<NaN h=\""+globalCMS1.getNaNColor("hsv").get1Value()+"\" s=\""+globalCMS1.getNaNColor("hsv").get2Value()+"\" v=\""+globalCMS1.getNaNColor("hsv").get3Value()+"\"/>\n";
        txtAbove="<Above h=\""+globalCMS1.getAboveColor("hsv").get1Value()+"\" s=\""+globalCMS1.getAboveColor("hsv").get2Value()+"\" v=\""+globalCMS1.getAboveColor("hsv").get3Value()+"\"/>\n";
        txtBelow="<Below h=\""+globalCMS1.getBelowColor("hsv").get1Value()+"\" s=\""+globalCMS1.getBelowColor("hsv").get2Value()+"\" v=\""+globalCMS1.getBelowColor("hsv").get3Value()+"\"/>\n";
        break;
      case "lab":
        text = text + "LAB";
        txtNaN="<NaN l=\""+globalCMS1.getNaNColor("lab").get1Value()+"\" a=\""+globalCMS1.getNaNColor("lab").get2Value()+"\" b=\""+globalCMS1.getNaNColor("lab").get3Value()+"\"/>\n";
        txtAbove="<Above l=\""+globalCMS1.getAboveColor("lab").get1Value()+"\" a=\""+globalCMS1.getAboveColor("lab").get2Value()+"\" b=\""+globalCMS1.getAboveColor("lab").get3Value()+"\"/>\n";
        txtBelow="<Below l=\""+globalCMS1.getBelowColor("lab").get1Value()+"\" a=\""+globalCMS1.getBelowColor("lab").get2Value()+"\" b=\""+globalCMS1.getBelowColor("lab").get3Value()+"\"/>\n";
        break;
      case "din99":
        text = text + "DIN99";
        txtNaN="<NaN l99=\""+globalCMS1.getNaNColor("din99").get1Value()+"\" a99=\""+globalCMS1.getNaNColor("din99").get2Value()+"\" b99=\""+globalCMS1.getNaNColor("din99").get3Value()+"\"/>\n";
        txtAbove="<Above l99=\""+globalCMS1.getAboveColor("din99").get1Value()+"\" a99=\""+globalCMS1.getAboveColor("din99").get2Value()+"\" b99=\""+globalCMS1.getAboveColor("din99").get3Value()+"\"/>\n";
        txtBelow="<Below l99=\""+globalCMS1.getBelowColor("din99").get1Value()+"\" a99=\""+globalCMS1.getBelowColor("din99").get2Value()+"\" b99=\""+globalCMS1.getBelowColor("din99").get3Value()+"\"/>\n";
        break;
      default:
        return;
    }*/

    text = text + "\" interpolationspace=\""+globalCMS1.getInterpolationSpace()+"\" creator=\"CCC-Tool\">\n";

    text = text + createCMSText(globalCMS1,"xml");

    text = text + txtNaN;
    text = text + txtAbove;
    text = text + txtBelow;

    /// Addd Probes
    text = text + createProbeSetText(globalCMS1,"xml");



    text = text + "</ColorMap>\n";

    globalCMS1.deleteReferences();
    globalCMS1=null;
  }

  //globalCMS1 = cloneCMS(tmpGlobalCMS);

  text = text + "</ColorMaps>\n</CCCToolSession>";

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

  document.getElementById("id_dropDownContainer").style.display="none";

}
