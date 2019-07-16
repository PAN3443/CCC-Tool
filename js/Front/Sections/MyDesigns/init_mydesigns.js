function initMyDesignObj(){

  document.getElementById("id_myDesignsPage_colormap_container").innerHTML = "";


  for (var i = 0; i < myDesignsList.length; i++) {

    var divRow = document.createElement('div');
    divRow.className = 'row';
    divRow.style.width = '100%';


    var div1 = createMyDesignObject(i);
    divRow.appendChild(div1);

    if(i+1<myDesignsList.length){
      i++;
      var div2 = createMyDesignObject(i);
      divRow.appendChild(div2);
    }

    document.getElementById("id_myDesignsPage_colormap_container").appendChild(divRow);
  }

}

function createMyDesignObject(id){

  var tmpDiv = document.createElement('div');
  tmpDiv.className = 'class_MyDesignObjCMSDiv';

  var tmpLabelDiv = document.createElement('div');
  tmpLabelDiv.className = 'class_MyDesignObjCMSCanvas';
  tmpLabelDiv.style.display="flex";
  tmpLabelDiv.style.border = "0.2vh solid rgb(40,40,40)"
  tmpLabelDiv.style.borderBottom = "none";
  tmpLabelDiv.style.borderRadius = "0.5vh 0.5vh 0px 0px";

  var tmpLabel = document.createElement('div');
  tmpLabel.id = "myDesignObj_Label_" + id;
  tmpLabel.style.width="90%";
  tmpLabel.style.paddingLeft="5%";
  tmpLabel.className = 'class_MyDesignObjCMSCanvas';
  tmpLabel.style.color="white";
  tmpLabel.innerHTML="Emty CMS:"


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
  tmpCMSlinear.style.border = "0.2vh solid rgb(40,40,40)"
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
  tmpCMSsketch.style.border = "0.2vh solid rgb(40,40,40)"
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
