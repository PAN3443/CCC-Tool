//////////////////////////
//// Display Options


function updateAddStructureStatus(){

  if (document.getElementById("id_EditPage_Add_Structures").style.display == "none") {
    document.getElementById("id_EditPage_Add_Structures").style.display = "block";
    document.getElementById("id_dropDownMenue_StructureWindow_Label").innerHTML="&#9673; Structure Window";
  }
  else{
    document.getElementById("id_EditPage_Add_Structures").style.display = "none";
    document.getElementById("id_dropDownMenue_StructureWindow_Label").innerHTML="&#9675; Structure Window";
  }

  update_EditPageStyle();
}

function updateAnalzyeMappingProbeSetStatus(){

    if (document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display == "none") {
      document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display = "block";
      document.getElementById("id_dropDownMenue_AnalyzeWindow_Label").innerHTML="&#9673; Analyze Window";
    }
    else{
      document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display = "none";
      document.getElementById("id_dropDownMenue_AnalyzeWindow_Label").innerHTML="&#9675; Analyze Window";
    }

    update_EditPageStyle();
  }

  function updateEditKeyPathPlotStatus(){

    if (document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display == "none") {
      document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display = "block";
      document.getElementById("id_dropDownMenue_EditWindow_Label").innerHTML="&#9673; Edit Window";
    }
    else{
      document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display = "none";
      document.getElementById("id_dropDownMenue_EditWindow_Label").innerHTML="&#9675; Edit Window";
    }

    update_EditPageStyle();
  }


  function updateTableStatus(){

    if (document.getElementById("id_EditPage_Table_Div").style.display == "none") {
      document.getElementById("id_EditPage_Table_Div").style.display = "block";
      document.getElementById("id_dropDownMenue_TableWindow_Label").innerHTML="&#9673; Table Window";
    }
    else{
      document.getElementById("id_EditPage_Table_Div").style.display = "none";
      document.getElementById("id_dropDownMenue_TableWindow_Label").innerHTML="&#9675; Table Window";
    }

    update_EditPageStyle();
  }


//////////////////////////
//// Update Edit Display

function update_EditPageStyle(){

    if (document.getElementById("id_EditPage_Add_Structures").style.display == "none"){
        document.getElementById("id_EditPage_CMSEditAnalzyeMapping_Div").style.width="100%";

    }
    else {
        document.getElementById("id_EditPage_CMSEditAnalzyeMapping_Div").style.width="80%";
        updatePredefined();
    }


    if (document.getElementById("id_EditPage_Table_Div").style.display == "none")
        document.getElementById("id_EditPage_CMS_Div").style.width="100%";
    else
        document.getElementById("id_EditPage_CMS_Div").style.width="75%";


    ///
    var editAnalzyeDivEmpty = false;

    if(document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display == "none" && document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display == "none"){

        document.getElementById("id_EditPage_AnalzyeMappingProbeSetEditKey_Div").style.display="none";
        document.getElementById("id_EditPage_CMSTable_Div").style.height="95vh";
        document.getElementById("id_EditPage_TableBodyDiv").style.height="90vh";

        document.getElementById("id_EditPage_CMS_VIS_LinearKeys").style.marginTop="5vh";
        document.getElementById("id_EditPage_CMS_VIS_LinearKeys").style.height="5vh";
        document.getElementById("id_EditPage_CMS_VIS_Lines1").style.height="2vh";
        document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").style.height="15vh";
        document.getElementById("id_EditPage_CMS_VIS_KeyBurs").style.height="10vh";
        document.getElementById("id_EditPage_DragImage").style.height="22vh";
        document.getElementById("id_EditPage_CMS_VIS_SketchKeyNumbers").style.height="5vh";
        document.getElementById("id_EditPage_CMS_VIS_SketchKeys").style.height="5vh";
        document.getElementById("id_EditPage_CMS_VIS_Lines2").style.height="2vh";
        document.getElementById("id_EditPage_CMS_VIS_ColormapSketch").style.height="15vh";
        document.getElementById("id_EditPage_CMS_VIS_Lines3").style.height="2vh";
        document.getElementById("id_EditPage_CMS_VIS_Label1").style.height="5vh";
        document.getElementById("id_EditPage_CMS_VIS_Label1").style.lineHeight="5vh";
        document.getElementById("id_EditPage_CMS_VIS_Label1").style.fontSize="3vh";
        document.getElementById("id_EditPage_CMS_VIS_Label2").style.height="5vh";
        document.getElementById("id_EditPage_CMS_VIS_Label2").style.lineHeight="5vh";
        document.getElementById("id_EditPage_CMS_VIS_Label2").style.fontSize="3vh";

    }
    else{

        document.getElementById("id_EditPage_AnalzyeMappingProbeSetEditKey_Div").style.display="flex";
        document.getElementById("id_EditPage_CMSTable_Div").style.height="30vh";
        document.getElementById("id_EditPage_TableBodyDiv").style.height="25vh";

        document.getElementById("id_EditPage_CMS_VIS_LinearKeys").style.marginTop="0.5vh";
        document.getElementById("id_EditPage_CMS_VIS_LinearKeys").style.height="2vh";
        document.getElementById("id_EditPage_CMS_VIS_Lines1").style.height="0.5vh";
        document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").style.height="3.5vh";
        document.getElementById("id_EditPage_CMS_VIS_KeyBurs").style.height="2vh";
        document.getElementById("id_EditPage_DragImage").style.height="6.5vh";

        document.getElementById("id_EditPage_CMS_VIS_SketchKeyNumbers").style.height="2vh";
        document.getElementById("id_EditPage_CMS_VIS_SketchKeys").style.height="2vh";
        document.getElementById("id_EditPage_CMS_VIS_Lines2").style.height="0.5vh";
        document.getElementById("id_EditPage_CMS_VIS_ColormapSketch").style.height="3.5vh";
        document.getElementById("id_EditPage_CMS_VIS_Lines3").style.height="0.5vh";
        document.getElementById("id_EditPage_CMS_VIS_Label1").style.height="2vh";
        document.getElementById("id_EditPage_CMS_VIS_Label1").style.lineHeight="2vh";
        document.getElementById("id_EditPage_CMS_VIS_Label1").style.fontSize="1.6vh";
        document.getElementById("id_EditPage_CMS_VIS_Label2").style.height="2vh";
        document.getElementById("id_EditPage_CMS_VIS_Label2").style.lineHeight="2vh";
        document.getElementById("id_EditPage_CMS_VIS_Label2").style.fontSize="1.6vh";

        if (document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display == "none"){
            document.getElementById("id_editPage_EditKeyPathPlotDiv").style.width="100%";

            //

            document.getElementById("id_EditPage_Edit_Keys_Div1").style.width="33%";
            document.getElementById("id_EditPage_Edit_Keys_Div2").style.width="34%";
            document.getElementById("id_EditPage_Edit_Keys_Div3").style.width="33%";

            document.getElementById("id_EditPage_Edit_Keys_Div1").style.height="59vh";
            document.getElementById("id_EditPage_Edit_Keys_Div2").style.height="59vh";
            document.getElementById("id_EditPage_Edit_Keys_Div3").style.height="59vh";
            document.getElementById("id_EditPage_Edit_Keys_Div3").style.height="59vh";

            document.getElementById("id_EditPage_EditKey_List").style.height="49vh";

            ///////////////////////////////

            document.getElementById("id_EditPage_OuterDiv").style.display = "flex";
            document.getElementById("id_EditPage_TopDiv").style.width = "50%";
            document.getElementById("id_EditPage_BottomDiv").style.display = "50%";


        }
        else{
            document.getElementById("id_editPage_EditKeyPathPlotDiv").style.width="30%";


            //
            document.getElementById("id_EditPage_Edit_Keys").style.display="block";
            document.getElementById("id_EditPage_Edit_Keys_Div1").style.width="100%";
            document.getElementById("id_EditPage_Edit_Keys_Div2").style.width="100%";
            document.getElementById("id_EditPage_Edit_Keys_Div3").style.width="100%";

            document.getElementById("id_EditPage_EditKey_List").style.height="11vh";

            document.getElementById("id_EditPage_Edit_Keys_Div1").style.height="20vh";
            document.getElementById("id_EditPage_Edit_Keys_Div2").style.height="15vh";
            document.getElementById("id_EditPage_Edit_Keys_Div3").style.height="24vh";

            document.getElementById("id_EditPage_OuterDiv").style.display = "block";
            document.getElementById("id_EditPage_TopDiv").style.width = "100%";
            document.getElementById("id_EditPage_BottomDiv").style.display = "100%";


        }




        if (document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display == "none"){
            document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.width="100%";

            // style analyze mapping probe div without edit key div
            document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.width="35vw";
            document.getElementById("id_EditPage_Analyze_EmptyDiv").style.width="65vw";
            document.getElementById("id_EditPage_AnalyzePlot_Container").style.width="65vw";
        }
        else{
            document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.width="70%";

            // style analyze mapping probe div with edit key div
            document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.width="20vw";
            document.getElementById("id_EditPage_Analyze_EmptyDiv").style.width="41vw";
            document.getElementById("id_EditPage_AnalyzePlot_Container").style.width="41vw";

        }

    }

    updateEditPage();

    if(document.getElementById("id_EditPage_Edit_Keys").style.display!="none"){
       openEditKeyDiv(document.getElementById("id_EditPage_EditKey_List").selectedIndex);
    }

    if(document.getElementById("id_EditPage_Edit_Path").style.display!="none"){
      switch (pathColorspace) {
        case "rgb":
          choosePathPlotSpace(0);
          break;
          case "hsv":
            choosePathPlotSpace(1);
            break;
            case "lab":
              choosePathPlotSpace(2);
              break;
              case "din99":
                choosePathPlotSpace(3);
                break;
        default:

      }
    }

}
