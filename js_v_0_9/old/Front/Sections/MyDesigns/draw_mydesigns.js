function drawMyDesigns(){




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
  tmpLabel.style.color="var(--cms-obj-font-color)";
  tmpLabel.innerHTML=myDesignsList[id].getColormapName()+" ("+myDesignsList[id].getInterpolationSpace()+" : "+myDesignsList[id].getInterpolationType()+")"; //"Emty CMS:"


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
  tmpCMSlinear.className = 'class_MyDesignObjCMSCanvas class_ColormapCanvas';
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
  tmpCMSsketch.className = 'class_MyDesignObjCMSCanvas class_ColormapCanvas';
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
