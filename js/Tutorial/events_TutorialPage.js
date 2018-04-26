function changeTutorial(type) {


  document.getElementById("button_showMyDesignsTutorial").style.background=styleInactiveColor;
  document.getElementById("button_showCreateTutorial").style.background=styleInactiveColor;
  document.getElementById("button_showExportTutorial").style.background=styleInactiveColor;
  document.getElementById("button_showAnalyseTutorial").style.background=styleInactiveColor;
  document.getElementById("button_showSpecificationTutorial").style.background=styleInactiveColor;

  document.getElementById("id_colormapspecification").style.display = "none";
  document.getElementById("id_tutorialMyDesignsPage").style.display = "none";
  document.getElementById("id_tutorialCreatePage").style.display = "none";
  document.getElementById("id_tutorialExportPage").style.display = "none";
  document.getElementById("id_tutorialAnalysePage").style.display = "none";

  switch (type) {
    case 0:
      document.getElementById("button_showMyDesignsTutorial").style.background=styleActiveColor;
      document.getElementById("id_tutorialMyDesignsPage").style.display = "inline-block";

      if(loadWebtoolImages == false){
        document.getElementById("tutImg_toolConstruction").src="img/Tutorial/webtoolConstruction.png";
        document.getElementById("tutImg_example_myDesigns").src="img/Tutorial/myDesignsExample.png";
        document.getElementById("tutImg_example_Gallery").src="img/Tutorial/galleryExample.png";
        document.getElementById("tutImg_example_SelectCompare").src="img/Tutorial/chooseCompareCMSExample.png";
        loadWebtoolImages=true;
      }

      break;
    case 1:
      document.getElementById("button_showCreateTutorial").style.background=styleActiveColor;
      document.getElementById("id_tutorialCreatePage").style.display = "inline-block";

      if(loadCMSImages == false){
        loadCMSImages=true;
      }

      break;
    case 2:
      document.getElementById("button_showExportTutorial").style.background=styleActiveColor;
      document.getElementById("id_tutorialExportPage").style.display = "inline-block";

      if(loadCreationImages == false){
        loadCreationImages=true;
      }

      break;
    case 3:
      document.getElementById("button_showAnalyseTutorial").style.background=styleActiveColor;
      document.getElementById("id_tutorialAnalysePage").style.display = "inline-block";



      if(loadAnalyzeImages == false){
        loadAnalyzeImages=true;
      }

      break;
    case 4:
      document.getElementById("button_showSpecificationTutorial").style.background=styleActiveColor;
      document.getElementById("id_colormapspecification").style.display = "inline-block";

      if(loadExportImages == false){
        loadExportImages=true;
      }

    break;
    default:
      return;
  }



}

function expandTutorialDivs (event){

  switch (event.target.id) {
    case "id_expandCreatePageMenueLayout":
      if(document.getElementById("id_createPageMenueLayout").style.display === "none")
        document.getElementById("id_createPageMenueLayout").style.display = "inline-block";
      else
        document.getElementById("id_createPageMenueLayout").style.display = "none";
      break;
    case "id_expandCreatePageHowCreateColormap":
      if(document.getElementById("id_createPageHowCreateColormap").style.display === "none")
        document.getElementById("id_createPageHowCreateColormap").style.display = "inline-block";
      else
        document.getElementById("id_createPageHowCreateColormap").style.display = "none";

      break;
    case "id_expandCreatePageHowCreateBand":
      if(document.getElementById("id_createPageHowCreateBand").style.display === "none")
        document.getElementById("id_createPageHowCreateBand").style.display = "inline-block";
      else
        document.getElementById("id_createPageHowCreateBand").style.display = "none";
      break;
    case "id_expandCreatePageExampleVideos":
      if(document.getElementById("id_createPageExampleVideos").style.display === "none")
        document.getElementById("id_createPageExampleVideos").style.display = "inline-block";
      else
        document.getElementById("id_createPageExampleVideos").style.display = "none";
      break;

      case "id_expandAnalyseCourse":
        if(document.getElementById("id_analyseCourse").style.display === "none")
          document.getElementById("id_analyseCourse").style.display = "inline-block";
        else
          document.getElementById("id_analyseCourse").style.display = "none";
        break;

        case "id_expandAnalyseColorspaces":
          if(document.getElementById("id_analyseColorspaces").style.display === "none")
            document.getElementById("id_analyseColorspaces").style.display = "inline-block";
          else
            document.getElementById("id_analyseColorspaces").style.display = "none";
          break;

          case "id_expandAnalyseDifferenceMaps":
            if(document.getElementById("id_analyseDifferenceMaps").style.display === "none")
              document.getElementById("id_analyseDifferenceMaps").style.display = "inline-block";
            else
              document.getElementById("id_analyseDifferenceMaps").style.display = "none";
            break;


    default:

  }

}
