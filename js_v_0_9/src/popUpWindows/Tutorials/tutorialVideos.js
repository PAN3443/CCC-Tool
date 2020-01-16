//////////////////////////////////////
/// Tutorials /////
///////////////////////////////////

function openTutorialWindow(){
  document.getElementById("id_PopUp_TutorialWindow").style.display="flex";
  document.getElementById("id_dropDownContainer").style.display="none";
}

function closeTutorialWindow(){
  document.getElementById("id_PopUp_TutorialWindow").style.display="none";
  // stop video
	var iframeSrc = document.getElementById("id_PopUp_TutorialWindow_Iframe").src;
	document.getElementById("id_PopUp_TutorialWindow_Iframe").src = iframeSrc;
}


function switchChannel(channel) {

  switch (channel) {
    case 2:
      document.getElementById("id_PopUp_TutorialWindow_Iframe").src = "https://www.youtube.com/embed/hmrIzNo5sjE";
      break;
    default:
      document.getElementById("id_PopUp_TutorialWindow_Iframe").src = "https://www.youtube.com/embed/hmrIzNo5sjE";
  }

}
