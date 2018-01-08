function changeTutorial(type) {

  document.getElementById("button_showMyMapsTutorial").style.border = "0.2vh solid white";
  document.getElementById("button_showMyMapsTutorial").style.color = "white";
  document.getElementById("button_showCreateTutorial").style.border = "0.2vh solid white";
  document.getElementById("button_showCreateTutorial").style.color = "white";
  document.getElementById("button_showExportTutorial").style.border = "0.2vh solid white";
  document.getElementById("button_showExportTutorial").style.color = "white";
  document.getElementById("button_showAnalyseTutorial").style.border = "0.2vh solid white";
  document.getElementById("button_showAnalyseTutorial").style.color = "white";

  document.getElementById("id_tutorialMyMapsPage").style.display = "none";
  document.getElementById("id_tutorialCreatePage").style.display = "none";
  document.getElementById("id_tutorialExportPage").style.display = "none";
  document.getElementById("id_tutorialAnalysePage").style.display = "none";

  switch (type) {
    case 0:
      document.getElementById("button_showMyMapsTutorial").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_showMyMapsTutorial").style.color = "rgb(0,191,255)";
      document.getElementById("id_tutorialMyMapsPage").style.display = "initial";

      break;
    case 1:
      document.getElementById("button_showCreateTutorial").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_showCreateTutorial").style.color = "rgb(0,191,255)";
      document.getElementById("id_tutorialCreatePage").style.display = "initial";

      break;
    case 2:
      document.getElementById("button_showExportTutorial").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_showExportTutorial").style.color = "rgb(0,191,255)";
      document.getElementById("id_tutorialExportPage").style.display = "initial";

      break;
    case 3:
      document.getElementById("button_showAnalyseTutorial").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_showAnalyseTutorial").style.color = "rgb(0,191,255)";
      document.getElementById("id_tutorialAnalysePage").style.display = "initial";
      break;
    default:
      return;
  }



}
