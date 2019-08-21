function drawMyDesigns(){

  //document.getElementById("id_myDesignsPage_colormap_container").innerHTML = "";
  var children = document.getElementById("id_myDesignsPage_colormap_container").children;
  for (var i = children.length-1; i >0; i--) { // i=0 => id_myDesignsPage_emptyImgDiv
    children[i].parentNode.removeChild(children[i]);
  }

  if(myDesignsList.length==0){
    document.getElementById("id_myDesignsPage_emptyImgDiv").style.display="flex";
  }
  else {
    document.getElementById("id_myDesignsPage_emptyImgDiv").style.display="none";
  }


  for (var i = 0; i < myDesignsList.length; i++) {

    var check =false;
    var divRow = document.createElement('div');
    divRow.className = 'row';
    divRow.style.width = '100%';


    var div1 = createMyDesignObject(i);
    divRow.appendChild(div1);



    if(i+1<myDesignsList.length){
      i++;
      check=true;
      var div2 = createMyDesignObject(i);
      divRow.appendChild(div2);
    }

    document.getElementById("id_myDesignsPage_colormap_container").appendChild(divRow);

    drawCanvasColormap("myDesignObj_CMSlinear_"+i, myDesignsList[i]);
    drawBandSketch(myDesignsList[i],"myDesignObj_CMSsketch_"+i, false, -1);

    if(check){
      drawCanvasColormap("myDesignObj_CMSlinear_"+(i-1), myDesignsList[(i-1)]);
      drawBandSketch(myDesignsList[(i-1)],"myDesignObj_CMSsketch_"+(i-1), false, -1);
    }


  }


}

function createMyDesignObject(id){

  var tmpDiv = document.createElement('div');
  tmpDiv.className = 'class_MyDesignObjCMSDiv';

  var tmpLabelDiv = document.createElement('div');
  tmpLabelDiv.className = 'class_MyDesignObjCMSCanvas';
  tmpLabelDiv.style.display="flex";
  tmpLabelDiv.style.borderBottom = "none";
  tmpLabelDiv.style.borderRadius = "0.5vh 0.5vh 0px 0px";

  var tmpLabel = document.createElement('div');
  tmpLabel.id = "myDesignObj_Label_" + id;
  tmpLabel.style.width="90%";
  tmpLabel.style.paddingLeft="5%";
  tmpLabel.className = 'class_MyDesignObjCMSCanvas';
  tmpLabel.style.border = "none";
  tmpLabel.style.color="var(--main-font-color)";
  tmpLabel.innerHTML=myDesignsList[id].getColormapName()+" ("+myDesignsList[id].getInterpolationSpace()+")"; //"Emty CMS:"


  tmpLabel.onclick = (function(cmsID) {
  return function() {
     if(cmsID<=myDesignsList.length-1){
       indexActiveCMS=cmsID;
       showEditPage();
     }
  };
  })(id);


  var tmpCMSDownload = document.createElement('div');
  tmpCMSDownload.className = 'class_MyDesignObjButton';
  tmpCMSDownload.title = 'Export CMS';
  tmpCMSDownload.innerHTML="&#8615;";

  tmpCMSDownload.onclick = (function(cmsID) {
  return function() {
     if(cmsID<=myDesignsList.length-1){
       globalCMS1=myDesignsList[cmsID];
       openExportWindow();
     }
  };
  })(id);

  var tmpCMSDelete = document.createElement('div');
  tmpCMSDelete.className = 'class_MyDesignObjButton';
  tmpCMSDelete.title = 'Delete CMS';
  tmpCMSDelete.innerHTML="X";

  tmpCMSDelete.onclick = (function(cmsID) {
  return function() {
     if(cmsID<=myDesignsList.length-1){
       askType=3;
       askIndex=cmsID;
       openAskWindow();
     }
  };
  })(id);

  tmpLabelDiv.appendChild(tmpLabel);
  tmpLabelDiv.appendChild(tmpCMSDownload);
  tmpLabelDiv.appendChild(tmpCMSDelete);
  tmpDiv.appendChild(tmpLabelDiv);

  var tmpCMSlinear = document.createElement('canvas');
  tmpCMSlinear.id="myDesignObj_CMSlinear_"+id;
  tmpCMSlinear.className = 'class_MyDesignObjCMSCanvas classColormapCanvas';
  tmpCMSlinear.style.borderBottom = "none";
  tmpDiv.appendChild(tmpCMSlinear);

  tmpCMSlinear.onclick = (function(cmsID) {
  return function() {
     if(cmsID<=myDesignsList.length-1){
       indexActiveCMS=cmsID;
       showEditPage();
     }
  };
  })(id);

  var tmpCMSsketch = document.createElement('canvas');
  tmpCMSsketch.id="myDesignObj_CMSsketch_"+id;
  tmpCMSsketch.className = 'class_MyDesignObjCMSCanvas classColormapCanvas';
  tmpCMSsketch.style.borderRadius = "0px 0px 0.5vh 0.5vh";
  tmpDiv.appendChild(tmpCMSsketch);

  tmpCMSsketch.onclick = (function(cmsID) {
  return function() {
     if(cmsID<=myDesignsList.length-1){
       indexActiveCMS=cmsID;
       showEditPage();
     }
  };
  })(id);

  return tmpDiv;

}
