function init_CCCPageStyle(){



  ///////////////
  // Edit Page


/*  document.getElementById("id_EditPage").style.width = windowWidth + "px";

  var tmpHeight1 = Math.floor(windowHeight*0.95);
  document.getElementById("id_EditPage").style.height = tmpHeight1 + "px";

  var tmpHeight3= tmpHeight1-tmpHeightSubsectionButton;
  document.getElementById("id_EditPage_Add_Structures").style.height = tmpHeight3 + "px";
  document.getElementById("id_EditPage_Edit_Keys").style.height = tmpHeight3 + "px";
  document.getElementById("id_EditPage_Edit_Path").style.height = tmpHeight3 + "px";


  tmpBox = document.getElementById("id_editPage_AnalyzeMappingDiv");
  var tmpHeight2= tmpBox.height-Math.floor(windowHeight*0.025);
  document.getElementById("id_EditPage_DivAnalyze").style.height = tmpHeight2 + "px";
  document.getElementById("id_EditPage_DivMapping").style.height = tmpHeight2 + "px";
/*


  document.getElementById("id_EditPage_MainPartDiv").style.width = windowWidth*0.95 + "px";
  document.getElementById("id_EditPage_MainPartDiv").style.marginLeft = windowWidth*0.025 + "px";


  document.getElementById("id_EditPage_CMS_VIS_PreviewProbe").style.height = Math.floor(windowHeight*0.06) + "px";


  document.getElementById("id_EditPage_CMS_VIS_Histogramm").style.height = Math.floor(windowHeight*0.3) + "px";
  document.getElementById("id_EditPage_CMS_VIS_HistogrammCMS").style.height = Math.floor(windowHeight*0.06) + "px";


  document.getElementById("id_EditPage_CMS_VIS_LinearKeys").style.height = Math.floor(windowHeight*0.03) + "px";
  document.getElementById("id_EditPage_CMS_VIS_Lines1").style.height = Math.floor(windowHeight*0.01) + "px";
  document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").style.height = Math.floor(windowHeight*0.06) + "px";

  document.getElementById("id_EditPage_CMS_VIS_KeyBurs").style.height = Math.floor(windowHeight*0.1) + "px";

  document.getElementById("id_EditPage_CMS_VIS_SketchKeyNumbers").style.height = Math.floor(windowHeight*0.03) + "px";
  document.getElementById("id_EditPage_CMS_VIS_SketchKeys").style.height = Math.floor(windowHeight*0.03) + "px";
  document.getElementById("id_EditPage_CMS_VIS_ColormapSketch").style.height = Math.floor(windowHeight*0.06) + "px";
  document.getElementById("id_EditPage_CMS_VIS_Lines2").style.height = Math.floor(windowHeight*0.01) + "px";
  document.getElementById("id_EditPage_CMS_VIS_Lines3").style.height = Math.floor(windowHeight*0.01) + "px";
  document.getElementById("id_EditPage_RefPlaceholder").style.height = Math.floor(windowHeight*0.03) + "px";


  document.getElementById("id_editPage_DragImage").style.height = Math.floor(windowHeight*0.17) + "px";
  document.getElementById("id_editPage_HelpImage1").style.height = Math.floor(windowHeight*0.1) + "px";



    // Edit Div
    tmpHeight1 = Math.floor(windowHeight*0.5);
    document.getElementById("id_editPage_EditDiv").style.height = tmpHeight1 + "px";

    tmpBox = document.getElementById("id_editPage_EditDiv").getBoundingClientRect();

    var tmpHeight3= tmpHeight1-Math.floor(windowHeight*0.025);



    //document.getElementById("id_EditPage_Add_Keys").style.display = "none";
    d
    //document.getElementById("id_EditPage_Edit_Keys").style.display = "none";
    document.getElementById("id_EditPage_Edit_Path").style.height = tmpHeight3 + "px";
    //document.getElementById("id_EditPage_Edit_Path").style.display = "none";



    tmpElementList = document.getElementsByClassName('class_EditDivLabel');
    var tmpHeight4 = Math.floor(tmpHeight3*0.08);
    for (var i = 0; i < tmpElementList.length; ++i) {

      if (tmpElementList[i].classList.contains("class_noSizeUpdate"))
        continue;

        tmpElementList[i].style.height =  tmpHeight4 + "px";
        tmpElementList[i].style.lineHeight =  tmpHeight4 + "px";
    }

    tmpElementList = document.getElementsByClassName('class_EditDiv_SubDiv');
    tmpHeight4 = Math.floor(tmpHeight3*0.92);
    for (var i = 0; i < tmpElementList.length; ++i) {

      if (tmpElementList[i].classList.contains("class_noSizeUpdate"))
        continue;

        tmpElementList[i].style.height =  tmpHeight4 + "px";
        tmpElementList[i].style.maxHeight =  tmpHeight4 + "px";
        tmpElementList[i].style.minHeight =  tmpHeight4 + "px";
    }


    tmpElementList = document.getElementsByClassName('class_Analysis_Colormaps');
    tmpHeight4 = Math.floor(tmpHeight1*0.1);
    for (var i = 0; i < tmpElementList.length; ++i) {
        tmpElementList[i].style.height =  tmpHeight4 + "px";
        tmpElementList[i].style.maxHeight =  tmpHeight4 + "px";
        tmpElementList[i].style.minHeight =  tmpHeight4 + "px";
    }

    document.getElementById("id_editPage_DescriptionDiv").style.height = tmpHeight1 + "px";
    //document.getElementById("id_editPage_AnalyzeMappingDiv").style.height = tmpHeight1 + "px";

    document.getElementById("id_EditPage_DivCMSDescription").style.height = tmpHeight3 + "px";
    document.getElementById("id_EditPage_DivKeyDescription").style.height = tmpHeight3 + "px";
    //document.getElementById("id_EditPage_DivAnalyze").style.height = tmpHeight3 + "px";
    //document.getElementById("id_EditPage_DivMapping").style.height = tmpHeight3 + "px";


    tmpHeight3= Math.floor(windowHeight*0.035);

    document.getElementById("id_EditPage_CMS_NaN_Color").style.height = tmpHeight3 + "px";
    document.getElementById("id_EditPage_CMS_Below_Color").style.height = tmpHeight3 + "px";
    document.getElementById("id_EditPage_CMS_Above_Color").style.height = tmpHeight3 + "px";
    document.getElementById("id_EditPage_CMS_NaN_Color").style.width = tmpHeight3 + "px";
    document.getElementById("id_EditPage_CMS_Below_Color").style.width = tmpHeight3 + "px";
    document.getElementById("id_EditPage_CMS_Above_Color").style.width = tmpHeight3 + "px";

    document.getElementById("id_EditPage_SmileyImg").style.height = tmpHeight3 + "px";
    document.getElementById("id_EditPage_SadleyImg").style.height = tmpHeight3 + "px";


    //*document.getElementById("id_EditPage_Add_Structures").style.display="block";
    tmpBox = document.getElementById("id_EditPage_OnlineCMS_Div").getBoundingClientRect();
    tmpMargin = tmpBox.widht;
    tmpBox = document.getElementById("id_EditPage_OnlineCMS_NotAvailableImg").getBoundingClientRect();
    tmpMargin = Math.floor((tmpMargin-tmpBox.widht)/2)
    document.getElementById("id_EditPage_OnlineCMS_NotAvailableImg").style.marginLeft =tmpMargin+"px";
    document.getElementById("id_EditPage_Add_Structures").style.display = "none";*/ //

    /*
*/
    


}



///////////////////////////////////////////////////////////////

function initAutoCompleteInputs(){
  autocomplete(document.getElementById("id_popupWindow_Input_FilterSemantics"), semanticsArray);
}
