

function drawCurrentNavi(){

    var colorPosArrow = getComputedStyle(document.documentElement).getPropertyValue('--menue-navi-positive-color');
    var colorNegArrow = getComputedStyle(document.documentElement).getPropertyValue('--menue-navi-negative-color');

    var cArrowWelcomeToMyDesign = colorNegArrow;

    var cArrowMyDesignToTesting = colorNegArrow;
    var cArrowMyDesignToNew = colorNegArrow;
    var cArrowMyDesignToEdit = colorNegArrow;
    var arrowToEditDashed = true;
    var cArrowMyDesignToGallery = colorNegArrow;

    var cArrowNewToEdit = colorNegArrow;
    var cArrowGalleryToEdit = colorNegArrow;

    clearCanvas("id_navi_WelcomeToMyDesigns");
    clearCanvas("id_navi_ArrowsFromMyDesigns");
    clearCanvas("id_navi_NewToEdit");
    clearCanvas("id_navi_GalleryToEdit");

    changeNaviStatus("id_navi_WelcomePage",0);
    changeNaviStatus("id_navi_MyDesigns",0);
    changeNaviStatus("id_navi_Testing",0);
    changeNaviStatus("id_navi_New",0);
    changeNaviStatus("id_navi_Edit",0);
    changeNaviStatus("id_navi_Gallery",0);

    document.getElementById("id_navi_MyDesigns").removeEventListener("click", showMyDesignsPage);
    document.getElementById("id_navi_MyDesigns").removeEventListener("click", startLeaveEditPage);

    document.getElementById("id_navi_Edit").removeEventListener("click", showEditPage);
    document.getElementById("id_navi_New").removeEventListener("click", showNewCMSPage);
    document.getElementById("id_navi_Gallery").removeEventListener("click", showGallery);
    document.getElementById("id_navi_Testing").removeEventListener("click", showTestPage);


    // Check Welcome
    if(document.getElementById("id_welcomePage").style.display!="none"){
      changeNaviStatus("id_navi_WelcomePage",1);
      changeNaviStatus("id_navi_MyDesigns",2);
      cArrowWelcomeToMyDesign = colorPosArrow;
      document.getElementById("id_navi_MyDesigns").addEventListener("click", showMyDesignsPage);
    }

    // Check MyDesigns
    if(document.getElementById("id_myDesignsPage").style.display!="none"){
      changeNaviStatus("id_navi_MyDesigns",1);
      changeNaviStatus("id_navi_Testing",2);
      changeNaviStatus("id_navi_New",2);
      changeNaviStatus("id_navi_Gallery",2);
      cArrowMyDesignToTesting = colorPosArrow;
      cArrowMyDesignToNew = colorPosArrow;
      cArrowMyDesignToGallery = colorPosArrow;

      document.getElementById("id_navi_New").addEventListener("click", showNewCMSPage);
      document.getElementById("id_navi_Gallery").addEventListener("click", showGallery);
      document.getElementById("id_navi_Testing").addEventListener("click", showTestPage);

      if(myDesignsList.length>0){
        changeNaviStatus("id_navi_Edit",3);
        cArrowMyDesignToEdit = colorPosArrow;
      }

    }

    // Check Testing
    if(document.getElementById("id_TestingPage").style.display!="none"){
      changeNaviStatus("id_navi_MyDesigns",2);
      changeNaviStatus("id_navi_Testing",1);
      cArrowMyDesignToTesting = colorPosArrow;
      document.getElementById("id_navi_MyDesigns").addEventListener("click", showMyDesignsPage);
    }

    // Check New
    if(document.getElementById("id_newCMSPage").style.display!="none"){
      changeNaviStatus("id_navi_MyDesigns",2);
      changeNaviStatus("id_navi_New",1);
      changeNaviStatus("id_navi_Edit",2);
      cArrowMyDesignToNew = colorPosArrow;
      cArrowNewToEdit = colorPosArrow;
      document.getElementById("id_navi_MyDesigns").addEventListener("click", showMyDesignsPage);
      document.getElementById("id_navi_Edit").addEventListener("click", showEditPage);
    }

    // Check Edit
    if(document.getElementById("id_EditPage").style.display!="none"){
      changeNaviStatus("id_navi_MyDesigns",2);
      changeNaviStatus("id_navi_Edit",1);
      cArrowMyDesignToEdit = colorPosArrow;
      arrowToEditDashed=false;
      document.getElementById("id_navi_MyDesigns").addEventListener("click", startLeaveEditPage);
    }

    // Check Gallery
    if(document.getElementById("id_GalleryPage").style.display!="none"){
      changeNaviStatus("id_navi_MyDesigns",2);
      changeNaviStatus("id_navi_Gallery",1);
      changeNaviStatus("id_navi_Edit",3);
      cArrowMyDesignToGallery = colorPosArrow;
      cArrowGalleryToEdit = colorPosArrow;
      document.getElementById("id_navi_MyDesigns").addEventListener("click", showMyDesignsPage);
    }


    //////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////
/////// draw Arrows
  ////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////

    //////////////////////////////////////////////////////
    ////////////////// Welcome To MyDesigns //////////////
    //////////////////////////////////////////////////////

    var canvas = document.getElementById("id_navi_WelcomeToMyDesigns");
    var canvasObjBox = canvas.getBoundingClientRect();
    canvas.width = canvasObjBox.width;
    canvas.height = canvasObjBox.height;
    var context = canvas.getContext("2d");
    context.strokeStyle = cArrowWelcomeToMyDesign;
    context.fillStyle = cArrowWelcomeToMyDesign;

    var arrowHead1 = Math.round(canvas.width*0.1);
    var arrowHead2 = Math.round(canvas.height*0.1);
    var arrowHead = Math.min(arrowHead1,arrowHead2);
    var arrowSite = Math.round(arrowHead/2.0);
    var middle=Math.round(canvas.width*0.5);
    var middleMinus=Math.round(middle-arrowSite);
    var middlePlus=Math.round(middle+arrowSite);
    var start=Math.round(canvas.height*0.0);
    var endArrow=Math.round(canvas.height*1.0);
    var end=Math.round(endArrow-arrowHead);

    // Line
    context.moveTo(middle, start);
    context.lineTo(middle, end);
    context.stroke();

    // Triangle
    context.beginPath();
    context.moveTo(middleMinus, end);
    context.lineTo(middle, endArrow);
    context.lineTo(middlePlus, end);
    context.closePath();
    context.fill();
    context.stroke();

    //////////////////////////////////////////////////////
    ////////////////// New To Edit //////////////
    //////////////////////////////////////////////////////

    canvas = document.getElementById("id_navi_NewToEdit");
    canvasObjBox = canvas.getBoundingClientRect();
    canvas.width = canvasObjBox.width;
    canvas.height = canvasObjBox.height;
    context = canvas.getContext("2d");
    context.strokeStyle = cArrowNewToEdit;
    context.fillStyle = cArrowNewToEdit;


    middle=Math.round(canvas.height*0.5);
    middleMinus=Math.round(middle-arrowSite);
    middlePlus=Math.round(middle+arrowSite);
    start=Math.round(canvas.width*0.05);
    endArrow=Math.round(canvas.width*0.95);
    end=Math.round(endArrow-arrowHead);

    // Line
    context.moveTo(start,middle);
    context.lineTo(end,middle);
    context.stroke();

    // Triangle
    context.beginPath();
    context.moveTo(end,middleMinus);
    context.lineTo(endArrow,middle);
    context.lineTo(end,middlePlus);
    context.closePath();
    context.fill();
    context.stroke();

    //////////////////////////////////////////////////////
    ////////////////// Gallery To Edit //////////////
    //////////////////////////////////////////////////////

    canvas = document.getElementById("id_navi_GalleryToEdit");
    canvasObjBox = canvas.getBoundingClientRect();
    canvas.width = canvasObjBox.width;
    canvas.height = canvasObjBox.height;
    context = canvas.getContext("2d");
    context.strokeStyle = cArrowGalleryToEdit;
    context.fillStyle = cArrowGalleryToEdit;


    middle=Math.round(canvas.height*0.5);
    middleMinus=Math.round(middle-arrowSite);
    middlePlus=Math.round(middle+arrowSite);
    start=Math.round(canvas.width*0.95);
    endArrow=Math.round(canvas.width*0.05);
    end=Math.round(endArrow+arrowHead);

    // Line
    context.setLineDash([3, 5]);
    context.moveTo(start,middle);
    context.lineTo(end,middle);
    context.stroke();

    // Triangle
    context.beginPath();
    context.moveTo(end,middleMinus);
    context.lineTo(endArrow,middle);
    context.lineTo(end,middlePlus);
    context.closePath();
    context.fill();
    context.stroke();

    //////////////////////////////////////////////////////
    ////////////////// From MyDesings //////////////
    //////////////////////////////////////////////////////

    canvas = document.getElementById("id_navi_ArrowsFromMyDesigns");
    canvasObjBox = canvas.getBoundingClientRect();
    canvas.width = canvasObjBox.width;
    canvas.height = canvasObjBox.height;
    context = canvas.getContext("2d");

    ///////////////// MyDesign To Testing //////////////////////
    drawMyDesignArrows(context, cArrowMyDesignToTesting, false, Math.round(canvas.width*0.42), Math.round(canvas.width*0.09), Math.round(canvas.height*0.05), Math.round(canvas.height*0.4), Math.round(canvas.height*0.95),arrowHead,arrowSite);

    ///////////////// MyDesign To New //////////////////////
    drawMyDesignArrows(context, cArrowMyDesignToNew, false, Math.round(canvas.width*0.47), Math.round(canvas.width*0.37), Math.round(canvas.height*0.05), Math.round(canvas.height*0.6), Math.round(canvas.height*0.95),arrowHead,arrowSite);

    ///////////////// MyDesign To Edit //////////////////////
    drawMyDesignArrows(context, cArrowMyDesignToEdit, arrowToEditDashed, Math.round(canvas.width*0.53), Math.round(canvas.width*0.64), Math.round(canvas.height*0.05), Math.round(canvas.height*0.6), Math.round(canvas.height*0.95),arrowHead,arrowSite);

    ///////////////// MyDesign To Edit //////////////////////
    drawMyDesignArrows(context, cArrowMyDesignToGallery, false, Math.round(canvas.width*0.58), Math.round(canvas.width*0.91), Math.round(canvas.height*0.05), Math.round(canvas.height*0.4), Math.round(canvas.height*0.95),arrowHead,arrowSite);

}

function drawMyDesignArrows(context, color, isDashed, xpos1, xpos2, yPos1, yPos2, yPos3,arrowHead,arrowSite){

  context.strokeStyle = color;
  context.fillStyle = color;

  if(isDashed)
    context.setLineDash([3, 5]);
  else
    context.setLineDash([]);

  // Line
  context.moveTo(xpos1,yPos1);
  context.lineTo(xpos1,yPos2);
  context.lineTo(xpos2,yPos2);
  context.lineTo(xpos2,yPos3);
  context.stroke();

  // Triangle
  context.beginPath();
  context.moveTo(xpos1-arrowSite,yPos1+arrowHead);
  context.lineTo(xpos1,yPos1);
  context.lineTo(xpos1+arrowSite,yPos1+arrowHead);
  context.closePath();
  context.fill();
  context.stroke();

  // Triangle
  context.beginPath();
  context.moveTo(xpos2-arrowSite,yPos3-arrowHead);
  context.lineTo(xpos2,yPos3);
  context.lineTo(xpos2+arrowSite,yPos3-arrowHead);
  context.closePath();
  context.fill();
  context.stroke();
}



function changeNaviStatus(id,type){
  document.getElementById(id).classList.remove("navi_divPos");
  document.getElementById(id).classList.remove("navi_divCurrent");
  document.getElementById(id).classList.remove("navi_divNeg");

  document.getElementById(id+"_Label").style.display = "none";

  switch (type) {
    case 0:
      document.getElementById(id).classList.add("navi_divNeg");
      break;
      case 1:
        document.getElementById(id+"_Label").style.display = "block";
        document.getElementById(id).classList.add("navi_divCurrent");
        document.getElementById(id+"_Label").innerHTML = "&#9787;";
        break;
        case 2:
          document.getElementById(id+"_Label").style.display = "block";
          document.getElementById(id).classList.add("navi_divPos");
          document.getElementById(id+"_Label").innerHTML = "&#128743;";
          break;
          case 3:
            document.getElementById(id).classList.add("navi_divPos");
            document.getElementById(id).style.cursor = "not-allowed";
            break;
  }


}
