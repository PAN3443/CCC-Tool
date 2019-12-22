//////////////////////////
//// Display Options


function updateAddStructureStatus(){

  if (document.getElementById("id_EditPage_Add_Structures_Optimization").style.display == "none") {
    document.getElementById("id_EditPage_Add_Structures_Optimization").style.display = "block";
    document.getElementById("id_dropDownMenue_StructureWindow_Label").innerHTML="&#9673; Structure Window";
  }
  else{
    document.getElementById("id_EditPage_Add_Structures_Optimization").style.display = "none";
    document.getElementById("id_dropDownMenue_StructureWindow_Label").innerHTML="&#9675; Structure Window";
  }

  update_EditPageStyle();
}

function updateAnalzyeMappingProbeSetStatus(){

    if (document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display == "none") {
      document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display = "block";
      document.getElementById("id_dropDownMenue_AnalyzeWindow_Label").innerHTML="&#9673; Analysis Window";

      if(document.getElementById("id_EditPage_DivMapping").style.display != "none"){
        startAnimationMapping();
      }
    }
    else{
      document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display = "none";
      document.getElementById("id_dropDownMenue_AnalyzeWindow_Label").innerHTML="&#9675; Analysis Window";
      stopAnimationMapping();
    }

    update_EditPageStyle();
}



function updateEditKeyPathPlotStatus(){

    if (document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display == "none") {
      document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display = "block";
      document.getElementById("id_dropDownMenue_EditWindow_Label").innerHTML="&#9673; Edit Window";

      if(document.getElementById("id_EditPage_Edit_Path").style.display != "none"){
        startPathPlotAnimation()
      }
    }
    else{
      document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display = "none";
      document.getElementById("id_dropDownMenue_EditWindow_Label").innerHTML="&#9675; Edit Window";
      stopPathPlotAnimation();
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

function showEditMode(){

  if(editPage_optimizationMode)
    return;

  document.getElementById("id_EditPage_Table_Div").style.display = "none";
  document.getElementById("id_dropDownMenue_TableWindow_Label").innerHTML="&#9675; Table Window";
  document.getElementById("id_EditPage_Add_Structures_Optimization").style.display = "block";
  document.getElementById("id_dropDownMenue_StructureWindow_Label").innerHTML="&#9673; Structure Window";
  document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display = "block";
  document.getElementById("id_dropDownMenue_EditWindow_Label").innerHTML="&#9673; Edit Window";
  document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display = "none";
  document.getElementById("id_dropDownMenue_AnalyzeWindow_Label").innerHTML="&#9675; Analysis Window";
  update_EditPageStyle();
}

function showAnalyzeMode(){

  if(editPage_optimizationMode)
    return;

  document.getElementById("id_EditPage_Table_Div").style.display = "none";
  document.getElementById("id_dropDownMenue_TableWindow_Label").innerHTML="&#9675; Table Window";
  document.getElementById("id_EditPage_Add_Structures_Optimization").style.display = "none";
  document.getElementById("id_dropDownMenue_StructureWindow_Label").innerHTML="&#9675; Structure Window";
  document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display = "none";
  document.getElementById("id_dropDownMenue_EditWindow_Label").innerHTML="&#9675; Edit Window";
  document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display = "block";
  document.getElementById("id_dropDownMenue_AnalyzeWindow_Label").innerHTML="&#9673; Analysis Window";

  if(document.getElementById("id_EditPage_DivAnalyze").style.display=="none")
    switchAnalyzeMappingProbeSet(0)

  update_EditPageStyle();
}

function showMappingMode(){

  if(editPage_optimizationMode)
    return;

  document.getElementById("id_EditPage_Table_Div").style.display = "none";
  document.getElementById("id_dropDownMenue_TableWindow_Label").innerHTML="&#9675; Table Window";
  document.getElementById("id_EditPage_Add_Structures_Optimization").style.display = "none";
  document.getElementById("id_dropDownMenue_StructureWindow_Label").innerHTML="&#9675; Structure Window";
  document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display = "none";
  document.getElementById("id_dropDownMenue_EditWindow_Label").innerHTML="&#9675; Edit Window";
  document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display = "block";
  document.getElementById("id_dropDownMenue_AnalyzeWindow_Label").innerHTML="&#9673; Analysis Window";

  if(document.getElementById("id_EditPage_DivMapping").style.display=="none")
    switchAnalyzeMappingProbeSet(1)

  update_EditPageStyle();
}
//////////////////////////
//// Update Edit Display

function update_EditPageStyle(){

    if (document.getElementById("id_EditPage_Add_Structures_Optimization").style.display == "none"){
        document.getElementById("id_EditPage_CMSEditAnalzyeMapping_Div").style.width="100%";

        if (document.getElementById("id_EditPage_Table_Div").style.display == "none"){
          document.getElementById("id_EditPage_CMS_Div").style.width="100vw";
        }
        else {
          document.getElementById("id_EditPage_CMS_Div").style.width="80vw";
        }
    }
    else {
        document.getElementById("id_EditPage_CMSEditAnalzyeMapping_Div").style.width="80%";

        if (document.getElementById("id_EditPage_Table_Div").style.display == "none"){
          document.getElementById("id_EditPage_CMS_Div").style.width="80vw";
        }
        else {
          document.getElementById("id_EditPage_CMS_Div").style.width="60vw";
        }
        updatePredefined();
    }


    ///
    var editAnalzyeDivEmpty = false;

    if(document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display == "none" && document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display == "none"){

        document.getElementById("id_EditPage_AnalzyeMappingProbeSetEditKey_Div").style.display="none";
        document.getElementById("id_EditPage_CMSTable_Div").style.height="95vh";
        document.getElementById("id_EditPage_TableBodyDiv").style.height="90vh";
        document.getElementById("id_EditPage_CMSVisDiv").style.height="86.5vh";
    }
    else{

        document.getElementById("id_EditPage_AnalzyeMappingProbeSetEditKey_Div").style.display="flex";
        document.getElementById("id_EditPage_CMSTable_Div").style.height="30vh";
        document.getElementById("id_EditPage_TableBodyDiv").style.height="25vh";
        document.getElementById("id_EditPage_CMSVisDiv").style.height="21.5vh";

        if (document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display == "none"){


            if(document.getElementById("id_EditPage_Add_Structures_Optimization").style.display == "none"){
              document.getElementById("id_editPage_EditKeyPathPlotDiv").style.width="100vw";

              document.getElementById("id_EditPage_Edit_Keys_Div1").style.width="33vw";
              document.getElementById("id_EditPage_Edit_Keys_Div2").style.width="34vw";
              document.getElementById("id_EditPage_Edit_Keys_Div3").style.width="33vw";

              document.getElementById("id_EditPage_Edit_Keys_Div3_1").style.width="33vw";
              document.getElementById("id_EditPage_Edit_Keys_Div3_2").style.width="33vw";
              document.getElementById("id_EditPage_Edit_Keys_Div3_3").style.width="33vw";

              /// because document.getElementById("id_EditPage_Edit_Keys_Div2").style.width="34vw";
              document.getElementById("id_EditPage_DrawnKey_LeftKeyHelp").style.width="11vw";
              document.getElementById("id_EditPage_DrawnKey_RightKeyHelp").style.width="12vw";
              document.getElementById("id_EditPage_EditKey_DrawKeyDiv").style.width="11vw";

            }
            else {
              document.getElementById("id_editPage_EditKeyPathPlotDiv").style.width="80vw";

              document.getElementById("id_EditPage_Edit_Keys_Div1").style.width="26.4vw";
              document.getElementById("id_EditPage_Edit_Keys_Div2").style.width="27.2vw";
              document.getElementById("id_EditPage_Edit_Keys_Div3").style.width="26.4vw";

              document.getElementById("id_EditPage_Edit_Keys_Div3_1").style.width="26.4vw";
              document.getElementById("id_EditPage_Edit_Keys_Div3_2").style.width="26.4vw";
              document.getElementById("id_EditPage_Edit_Keys_Div3_3").style.width="26.4vw";

              /// because document.getElementById("id_EditPage_Edit_Keys_Div2").style.width="27.2vw";
              document.getElementById("id_EditPage_DrawnKey_LeftKeyHelp").style.width="8.6vw";
              document.getElementById("id_EditPage_DrawnKey_RightKeyHelp").style.width="10vw";
              document.getElementById("id_EditPage_EditKey_DrawKeyDiv").style.width="8.6vw";

            }

            document.getElementById("id_EditPage_Edit_Keys_Div1").style.height="59vh";
            document.getElementById("id_EditPage_Edit_Keys_Div2").style.height="59vh";
            document.getElementById("id_EditPage_Edit_Keys_Div3").style.height="59vh";


            document.getElementById("id_EditPage_EditKey_List").style.height="49vh";


            ///// because document.getElementById("id_EditPage_Edit_Keys_Div2").style.height="59vh";
              document.getElementById("id_EditPage_Edit_Keys_Div2_Subdiv1").style.marginTop="2vh";
              document.getElementById("id_EditPage_Edit_Keys_Div2_Subdiv1").style.height="20vh";
              document.getElementById("id_EditPage_Edit_Keys_Div2_Subdiv2").style.height="35vh";
              document.getElementById("id_EditPage_EditKey_DrawKeyDiv").style.height="35vh";
              document.getElementById("id_EditPage_Edit_Keys_Div2_Subdiv1").style.marginBottom="2vh";


          /// because document.getElementById("id_EditPage_Edit_Keys_Div3").style.height="59vh";
            document.getElementById("id_EditPage_Edit_Keys_Div3_1").style.paddingTop="2vh";
            document.getElementById("id_EditPage_Edit_Keys_Div3_1").style.paddingBottom="2vh";
            document.getElementById("id_EditPage_Edit_Keys_Div3_2").style.paddingTop="2vh";
            document.getElementById("id_EditPage_Edit_Keys_Div3_2").style.paddingBottom="2vh";
            document.getElementById("id_EditPage_Edit_Keys_Div3_3").style.paddingTop="2vh";
            document.getElementById("id_EditPage_Edit_Keys_Div3_3").style.paddingBottom="2vh";

        }
        else{

          if(document.getElementById("id_EditPage_Add_Structures_Optimization").style.display == "none"){
            document.getElementById("id_editPage_EditKeyPathPlotDiv").style.width="30vw";

            document.getElementById("id_EditPage_Edit_Keys_Div1").style.width="30vw";
            document.getElementById("id_EditPage_Edit_Keys_Div2").style.width="30vw";
            document.getElementById("id_EditPage_Edit_Keys_Div3").style.width="30vw";

            document.getElementById("id_EditPage_Edit_Keys_Div3_1").style.width="30vw";
            document.getElementById("id_EditPage_Edit_Keys_Div3_2").style.width="30vw";
            document.getElementById("id_EditPage_Edit_Keys_Div3_3").style.width="30vw";

            /// because document.getElementById("id_EditPage_Edit_Keys_Div2").style.width="30vw";
            document.getElementById("id_EditPage_DrawnKey_LeftKeyHelp").style.width="10vw";
            document.getElementById("id_EditPage_DrawnKey_RightKeyHelp").style.width="10vw";
            document.getElementById("id_EditPage_EditKey_DrawKeyDiv").style.width="10vw";

          }
          else {
            document.getElementById("id_editPage_EditKeyPathPlotDiv").style.width="24vw";

            document.getElementById("id_EditPage_Edit_Keys_Div1").style.width="24vw";
            document.getElementById("id_EditPage_Edit_Keys_Div2").style.width="24vw";
            document.getElementById("id_EditPage_Edit_Keys_Div3").style.width="24vw";

            document.getElementById("id_EditPage_Edit_Keys_Div3_1").style.width="24vw";
            document.getElementById("id_EditPage_Edit_Keys_Div3_2").style.width="24vw";
            document.getElementById("id_EditPage_Edit_Keys_Div3_3").style.width="24vw";

            /// because document.getElementById("id_EditPage_Edit_Keys_Div2").style.width="24vw";
            document.getElementById("id_EditPage_DrawnKey_LeftKeyHelp").style.width="8vw";
            document.getElementById("id_EditPage_DrawnKey_RightKeyHelp").style.width="8vw";
            document.getElementById("id_EditPage_EditKey_DrawKeyDiv").style.width="8vw";

          }

            document.getElementById("id_EditPage_EditKey_List").style.height="11vh";

            document.getElementById("id_EditPage_Edit_Keys_Div1").style.height="20vh";
            document.getElementById("id_EditPage_Edit_Keys_Div2").style.height="15vh";
            document.getElementById("id_EditPage_Edit_Keys_Div3").style.height="24vh";


            ///// because document.getElementById("id_EditPage_Edit_Keys_Div2").style.height="15";
            document.getElementById("id_EditPage_Edit_Keys_Div2_Subdiv1").style.marginTop="0.5vh";
            document.getElementById("id_EditPage_Edit_Keys_Div2_Subdiv1").style.height="5vh";
            document.getElementById("id_EditPage_Edit_Keys_Div2_Subdiv2").style.height="9vh";
            document.getElementById("id_EditPage_EditKey_DrawKeyDiv").style.height="9vh";
            document.getElementById("id_EditPage_Edit_Keys_Div2_Subdiv1").style.marginBottom="0.5vh";

            /// because document.getElementById("id_EditPage_Edit_Keys_Div3").style.height="24vh";
              document.getElementById("id_EditPage_Edit_Keys_Div3_1").style.paddingTop="0.5vh";
              document.getElementById("id_EditPage_Edit_Keys_Div3_1").style.paddingBottom="0.5vh";
              document.getElementById("id_EditPage_Edit_Keys_Div3_2").style.paddingTop="0.5vh";
              document.getElementById("id_EditPage_Edit_Keys_Div3_2").style.paddingBottom="0.5vh";
              document.getElementById("id_EditPage_Edit_Keys_Div3_3").style.paddingTop="0.5vh";
              document.getElementById("id_EditPage_Edit_Keys_Div3_3").style.paddingBottom="0.5vh";

        }


        if (document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display == "none"){
            document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.width="100%";

            // style analyze mapping probe div without edit key div
            document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.width = "40vw";
            document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.maxWidth = "50vh";
            document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.height = "50vh";
            document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.maxHeight= "40vw";
            document.getElementById("id_EditPage_LabelDiv_GlobalLocalOrder").style.maxWidth = "40vw";

            if(document.getElementById("id_EditPage_Add_Structures_Optimization").style.display == "none"){
              document.getElementById("id_EditPage_Analyze_EmptyDiv").style.width="85vw";
              document.getElementById("id_EditPage_AnalyzePlot_Container").style.width="85vw";
            }
            else {
              document.getElementById("id_EditPage_Analyze_EmptyDiv").style.width="65vw";
              document.getElementById("id_EditPage_AnalyzePlot_Container").style.width="65vw";
            }

        }
        else{
            document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.width="70%";

            // style analyze mapping probe div with edit key div
            if(document.getElementById("id_EditPage_Add_Structures_Optimization").style.display == "none"){
              document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.width = "35vw";
              document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.maxWidth = "50vh";
              document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.height = "50vh";
              document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.maxHeight= "35vw";
              document.getElementById("id_EditPage_LabelDiv_GlobalLocalOrder").style.maxWidth = "35vw";
              document.getElementById("id_EditPage_Analyze_EmptyDiv").style.width="56vw";
              document.getElementById("id_EditPage_AnalyzePlot_Container").style.width="56vw";
            }
            else {
              document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.width = "20vw";
              document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.maxWidth = "50vh";
              document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.height = "50vh";
              document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.maxHeight= "20vw";
              document.getElementById("id_EditPage_LabelDiv_GlobalLocalOrder").style.maxWidth = "20vw";
              document.getElementById("id_EditPage_Analyze_EmptyDiv").style.width="41vw";
              document.getElementById("id_EditPage_AnalyzePlot_Container").style.width="41vw";
            }


        }

    }

    drawEditCMSVIS(globalCMS1,[]);

    if(document.getElementById("id_EditPage_DivMapping").style.display!="none"){
      updateMappingSize();
    }


    if(document.getElementById("id_EditPage_Edit_Keys").style.display!="none"){
       openEditKeyDiv(document.getElementById("id_EditPage_EditKey_List").selectedIndex);
       updateKeyDrawSize();
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