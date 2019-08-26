
var currentQuickGuidePage = 0;
var maxNumberGuidePages = 7;
var guideImagesUploaded = [false,false,false,false,false,false,false];




function showQuickGuide(){
  document.getElementById("id_WelcomePage_Welcome").style.height = "0vh";
  document.getElementById("id_WelcomePage_QuickGuide").style.height = "80vh";
  updateGuidePage();
}

function hideQuickGuide(){
  document.getElementById("id_WelcomePage_Welcome").style.height = "80vh";
  document.getElementById("id_WelcomePage_QuickGuide").style.height = "0vh";
}


function showNextGuidePage(){
    if(currentQuickGuidePage+1 < maxNumberGuidePages){
      currentQuickGuidePage++;
      updateGuidePage();
    }
}

function showPreviousGuidePage(){
    if(currentQuickGuidePage>0){
      currentQuickGuidePage--;
      updateGuidePage();
    }
}


function updateGuidePage(){

  for (var i = 0; i < maxNumberGuidePages; i++) {
    document.getElementById("id_WelcomePage_Div_"+i).style.width = "0%";
  }



  document.getElementById("id_WelcomePage_Div_"+currentQuickGuidePage).style.width = "100%";

  if(currentQuickGuidePage==0){
    document.getElementById("id_welcomePage_PreviousGuidePage").style.visibility = "hidden";
  }
  else {
    document.getElementById("id_welcomePage_PreviousGuidePage").style.visibility = "visible";
  }

  if(currentQuickGuidePage==maxNumberGuidePages-1){
    document.getElementById("id_welcomePage_NextGuidePage").style.visibility = "hidden";
  }
  else {
    document.getElementById("id_welcomePage_NextGuidePage").style.visibility = "visible";
  }


  /***************  Check for the need of an images upload ********************/

  if(guideImagesUploaded[currentQuickGuidePage]==false){
    switch (currentQuickGuidePage) {
      case 0:
        document.getElementById("id_welcomePage_GuideImg_CCCTool").style.backgroundImage = "url('img/WelcomePageImages/edit_Example.png')";
      break;
      case 1:

      break;
      case 2:

      break;
      case 3:
        document.getElementById("id_welcomePage_GuideImg_Gallery").style.backgroundImage = "url('img/WelcomePageImages/gallery_Example.png')";
      break;
      case 4:

      break;
      case 5:

      break;
      case 6:

      break;
    }
    guideImagesUploaded[currentQuickGuidePage]=true;
  }

}
