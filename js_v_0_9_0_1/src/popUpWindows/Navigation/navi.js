
function openNaviWindow(){
 document.getElementById('id_PopUp_navigationWindow').style.display="flex";
 drawCurrentNavi();
}

function closeNaviWindow(){
  document.getElementById('id_PopUp_navigationWindow').style.display="none";
}

function drawCurrentNavi(){

  changeNaviStatus("id_navi_Welcome","Welcome",1);
  changeNaviStatus("id_navi_Tutorial","Tutorial",1);
  changeNaviStatus("id_navi_MyDesigns","MyDesigns",1);
  changeNaviStatus("id_navi_Gallery","Gallery",1);

  changeNaviStatus("id_navi_Edit","Edit",2);
  changeNaviStatus("id_navi_Probe","Probe",2);
  changeNaviStatus("id_navi_Opti","Optimization",2);
  changeNaviStatus("id_navi_AutoGen","Auto Generator",2);

  if(myDesignsSection.checkMyDesignLimit())
    changeNaviStatus("id_navi_New","New CMS",2);
  else
    changeNaviStatus("id_navi_New","New CMS",1);

  if(myDesignsSection.getMyDesignLength()>0)
    changeNaviStatus("id_navi_Testing","Testing",1);
  else
    changeNaviStatus("id_navi_Testing","Testing",2);

  switch (true){
    case welcomeSection.isSectionOpen():
      changeNaviStatus("id_navi_Welcome","Welcome",0);
    break;
    case myDesignsSection.isSectionOpen():
      changeNaviStatus("id_navi_MyDesigns","MyDesigns",0);
    break;
    case gallerySection.isSectionOpen():
      changeNaviStatus("id_navi_Gallery","Gallery",0);
    break;
    case newSection.isSectionOpen():
      changeNaviStatus("id_navi_New","New CMS",0);
    break;
    case autoGenSection.isSectionOpen():
      changeNaviStatus("id_navi_AutoGen","Auto Generator",0);

      // Check status
      // changeNaviStatus("id_navi_Edit","Edit",1);
    break;
    case editSection.isSectionOpen():
      changeNaviStatus("id_navi_Edit","Edit",0);
      changeNaviStatus("id_navi_Probe","Probe",1);
      changeNaviStatus("id_navi_Opti","Optimization",1);
      changeNaviStatus("id_navi_Welcome","Welcome",2);
      changeNaviStatus("id_navi_Gallery","Gallery",2);
      changeNaviStatus("id_navi_New","New CMS",2);
    break;
    case probeSection.isSectionOpen():
      changeNaviStatus("id_navi_Probe","Probe",0);
      changeNaviStatus("id_navi_Welcome","Welcome",2);
      changeNaviStatus("id_navi_Gallery","Gallery",2);
      changeNaviStatus("id_navi_New","New CMS",2);
      changeNaviStatus("id_navi_MyDesigns","MyDesigns",2);
      changeNaviStatus("id_navi_Testing","Testing",2);
      changeNaviStatus("id_navi_Edit","Edit",1);
      changeNaviStatus("id_navi_Tutorial","Tutorial",2);
    break;
    case optiSection.isSectionOpen():
      changeNaviStatus("id_navi_Opti","Optimization",0);
      changeNaviStatus("id_navi_Welcome","Welcome",2);
      changeNaviStatus("id_navi_Gallery","Gallery",2);
      changeNaviStatus("id_navi_New","New CMS",2);
      changeNaviStatus("id_navi_MyDesigns","MyDesigns",2);
      changeNaviStatus("id_navi_Testing","Testing",2);
      changeNaviStatus("id_navi_Edit","Edit",1);
      changeNaviStatus("id_navi_Tutorial","Tutorial",2);
    break;
    case testingSection.isSectionOpen():
      changeNaviStatus("id_navi_Testing","Testing",0);

      if(testingSection.backSection==="id_EditPage"){
        changeNaviStatus("id_navi_Welcome","Welcome",2);
        changeNaviStatus("id_navi_Gallery","Gallery",2);
        changeNaviStatus("id_navi_New","New CMS",2);
        changeNaviStatus("id_navi_MyDesigns","MyDesigns",2);
        changeNaviStatus("id_navi_Tutorial","Tutorial",2);
        changeNaviStatus("id_navi_Edit","Edit",1);
      }

    break;
    case exportSection.isSectionOpen():
      changeNaviStatus("id_navi_Welcome","Welcome",2);
      changeNaviStatus("id_navi_Tutorial","Tutorial",2);
      changeNaviStatus("id_navi_MyDesigns","MyDesigns",2);
      changeNaviStatus("id_navi_Gallery","Gallery",2);
      changeNaviStatus("id_navi_Edit","Edit",2);
      changeNaviStatus("id_navi_Probe","Probe",2);
      changeNaviStatus("id_navi_Opti","Optimization",2);
      changeNaviStatus("id_navi_AutoGen","Auto Generator",2);
      changeNaviStatus("id_navi_New","New CMS",2);
      changeNaviStatus("id_navi_Testing","Testing",2);
    break;
    case tutorialSection.isSectionOpen():
      changeNaviStatus("id_navi_Tutorial","Tutorial",0);
    break;
    default:

  }
}

function changeNaviStatus(id,label,status){
  document.getElementById(id).classList.remove("class_naviButton");
  document.getElementById(id).classList.remove("class_naviButton_Current");
  document.getElementById(id).classList.remove("class_naviButton_Deactive");
  document.getElementById(id).removeEventListener("mousedown", switchViaNavi, true);
  var arrowColor = undefined;
  var allowAction = false;

  if(status==0){
    document.getElementById(id).innerHTML="&#9787; "+label;
    document.getElementById(id).classList.add("class_naviButton_Current");
    arrowColor="var(--main-second-sepArea-bg)";
  }
  else{
    document.getElementById(id).innerHTML=label;

    if(status==2){
      document.getElementById(id).classList.add("class_naviButton_Deactive");
      arrowColor="var(--main-second-sepArea-bg)";
    }
    else{
      document.getElementById(id).classList.add("class_naviButton");
      document.getElementById(id).addEventListener("mousedown", switchViaNavi, true);
      arrowColor="var(--main-sepArea-bg)";
    }
  }

  switch (id) {
    case "id_navi_New":
      document.getElementById("id_Arrow_ToNew_1").style.fill = arrowColor;
      document.getElementById("id_Arrow_ToNew_2").style.fill = arrowColor;
      document.getElementById("id_Arrow_ToNew_3").style.fill = arrowColor;

      var tmpColor =undefined;
      if(status==0)
        tmpColor="var(--main-sepArea-bg)";
      else
        tmpColor="var(--main-second-sepArea-bg)";

      document.getElementById("id_Arrow_NewToEdit_1").style.fill = tmpColor;
      document.getElementById("id_Arrow_NewToEdit_2").style.fill = tmpColor;
      document.getElementById("id_Arrow_NewToEdit_3").style.fill = tmpColor;
      document.getElementById("id_Arrow_NewToEdit_4").style.fill = tmpColor;

      document.getElementById("id_Arrow_NewToAuto_1").style.fill = tmpColor;
      document.getElementById("id_Arrow_NewToAuto_2").style.fill = tmpColor;
    break;
    case "id_navi_Gallery":
      document.getElementById("id_Arrow_ToGallery_1").style.fill = arrowColor;
      document.getElementById("id_Arrow_ToGallery_2").style.fill = arrowColor;
      document.getElementById("id_Arrow_ToGallery_3").style.fill = arrowColor;
    break;
    case "id_navi_Edit":
      var tmpColor =undefined;
      if(status==0)
        tmpColor="var(--main-sepArea-bg)";
      else
        tmpColor="var(--main-second-sepArea-bg)";
      document.getElementById("id_Arrow_EditToMyDesigns_1").style.fill = tmpColor;
      document.getElementById("id_Arrow_EditToMyDesigns_2").style.fill =  tmpColor;
      document.getElementById("id_Arrow_EditToMyDesigns_3").style.fill =  tmpColor;
      document.getElementById("id_Arrow_EditToMyDesigns_4").style.fill =  tmpColor;
    break;
    case "id_navi_Probe":
      document.getElementById("id_Arrow_EditToProbe_5").style.fill =  arrowColor;
      document.getElementById("id_Arrow_EditToProbe_5").style.fill =  arrowColor;
      document.getElementById("id_Arrow_EditToProbe_5").style.fill =  arrowColor;
      document.getElementById("id_Arrow_EditToProbe_5").style.fill =  arrowColor;
      document.getElementById("id_Arrow_EditToProbe_5").style.fill =  arrowColor;
    break;
    case "id_navi_Opti":
      document.getElementById("id_Arrow_EditToOpti_1").style.fill =  arrowColor;
      document.getElementById("id_Arrow_EditToOpti_2").style.fill =  arrowColor;
      document.getElementById("id_Arrow_EditToOpti_3").style.fill =  arrowColor;
    break;
    case "id_navi_Testing":
      document.getElementById("id_Arrow_ToTesting_1").style.fill = arrowColor;
      document.getElementById("id_Arrow_ToTesting_2").style.fill = arrowColor;
      document.getElementById("id_Arrow_ToTesting_3").style.fill = arrowColor;
      document.getElementById("id_Arrow_ToTesting_4").style.fill = arrowColor;

      document.getElementById("id_Arrow_ToTesting_5").style.fill = arrowColor;
      document.getElementById("id_Arrow_ToTesting_6").style.fill = arrowColor;
      document.getElementById("id_Arrow_ToTesting_7").style.fill = arrowColor;
      document.getElementById("id_Arrow_ToTesting_8").style.fill = arrowColor;
    break;
    case "id_navi_AutoGen":
      document.getElementById("id_Arrow_AutoToEdit_1").style.fill = arrowColor;
      document.getElementById("id_Arrow_AutoToEdit_2").style.fill = arrowColor;
    break;
  }

}

function switchViaNavi(event){
  /// Special IF Edit Section is Open

  document.getElementById("id_PopUp_navigationWindow").style.display="none";
  /////
  switch (event.target.id) {
    case "id_navi_Welcome":
      welcomeSection.showSection();
    break;
    case "id_navi_MyDesigns":
      if(editSection.isSectionOpen()){
        showMyDesignsPage();
      }
      else
        myDesignsSection.showSection();
    break;
    case "id_navi_New":
      newSection.showSection();
    break;
    case "id_navi_Gallery":
      gallerySection.showSection();
    break;
    case "id_navi_Edit":
     editSection.showSection();
    break;
    case "id_navi_Probe":
      probeSection.showSection();
    break;
    case "id_navi_Opti":
      optiSection.showSection();
    break;
    case "id_navi_Testing":
      showTesting();
    break;
    case "id_navi_AutoGen":
      autoGenSection.showSection();
    break;
    case "id_navi_Tutorial":
      tutorialSection.showSection();
    break;
  }
}
