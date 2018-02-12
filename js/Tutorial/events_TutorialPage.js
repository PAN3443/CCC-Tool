function changeTutorial(type) {

  /*document.getElementById("button_showMyDesignsTutorial").style.border = "0.2vh solid white";
  document.getElementById("button_showMyDesignsTutorial").style.color = "white";
  document.getElementById("button_showCreateTutorial").style.border = "0.2vh solid white";
  document.getElementById("button_showCreateTutorial").style.color = "white";
  document.getElementById("button_showExportTutorial").style.border = "0.2vh solid white";
  document.getElementById("button_showExportTutorial").style.color = "white";
  document.getElementById("button_showAnalyseTutorial").style.border = "0.2vh solid white";
  document.getElementById("button_showAnalyseTutorial").style.color = "white";
  document.getElementById("button_showSpecificationTutorial").style.border = "0.2vh solid white";
  document.getElementById("button_showSpecificationTutorial").style.color = "white";



  document.getElementById("id_colormapspecification").style.display = "none";
  document.getElementById("id_tutorialMyDesignsPage").style.display = "none";
  document.getElementById("id_tutorialCreatePage").style.display = "none";
  document.getElementById("id_tutorialExportPage").style.display = "none";
  document.getElementById("id_tutorialAnalysePage").style.display = "none";

  switch (type) {
    case 0:
      document.getElementById("button_showMyDesignsTutorial").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_showMyDesignsTutorial").style.color = "rgb(0,191,255)";
      document.getElementById("id_tutorialMyDesignsPage").style.display = "inline-block";

      break;
    case 1:
      document.getElementById("button_showCreateTutorial").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_showCreateTutorial").style.color = "rgb(0,191,255)";
      document.getElementById("id_tutorialCreatePage").style.display = "inline-block";

      break;
    case 2:
      document.getElementById("button_showExportTutorial").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_showExportTutorial").style.color = "rgb(0,191,255)";
      document.getElementById("id_tutorialExportPage").style.display = "inline-block";

      break;
    case 3:
      document.getElementById("button_showAnalyseTutorial").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_showAnalyseTutorial").style.color = "rgb(0,191,255)";
      document.getElementById("id_tutorialAnalysePage").style.display = "inline-block";
      break;

    case 4:
      document.getElementById("button_showSpecificationTutorial").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_showSpecificationTutorial").style.color = "rgb(0,191,255)";
      document.getElementById("id_colormapspecification").style.display = "inline-block";
    break;
    default:
      return;
  }*/



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
