function initMyDesignObj(){

  document.getElementById("id_myDesignsPage_colormap_container").innerHTML = "";


  for (var i = 0; i < numberOfMyDesignsObj; i++) {
    var divRow = document.createElement('div');
    divRow.className = 'row';
    divRow.style.width = '100%';

    var div1 = createMyDesignObject(i);
    divRow.appendChild(div1);

    if(i+1<numberOfMyDesignsObj){
      i++;
      var div2 = createMyDesignObject(i);
      divRow.appendChild(div2);
    }

    document.getElementById("id_myDesignsPage_colormap_container").appendChild(divRow);


  }


  if(anonymousMode==false){
    // load
    // draw
  }

}

function createMyDesignObject(id){

  var divRow = document.createElement('div');
  divRow.className = 'row class_MyDesignObjContainer';


  var tmpDiv = document.createElement('div');
  tmpDiv.className = 'class_MyDesignObjCMSDiv';

  var tmpFirstRow = document.createElement('div');
  tmpFirstRow.className = "row";
  tmpFirstRow.style.width="100%";

  var tmpLabel = document.createElement('div');
  tmpLabel.id="myDesignObj_Label_"+id;
  tmpLabel.className = 'class_MyDesignObjCMSCanvas';
  tmpLabel.style.width="95%";
  tmpLabel.style.color="white";
  tmpLabel.style.background="rgb(128, 128, 128)";
  tmpLabel.style.border = "2px solid rgb(64, 64, 64)";
  tmpLabel.style.borderBottom = "none";
  tmpLabel.style.borderRadius = "5px 0px 0px 0px";
  tmpLabel.innerHTML="Emty CMS:"


  var tmpCMSInfo = document.createElement('div');
  tmpCMSInfo.id="myDesignObj_Info_"+id;
  tmpCMSInfo.className = 'class_MyDesignObjCMSCanvas';
  tmpCMSInfo.style.width="5%";
  tmpCMSInfo.style.color="white";
  tmpCMSInfo.style.background="rgb(80, 80, 80)";
  tmpCMSInfo.style.border = "2px solid rgb(64, 64, 64)";
  tmpCMSInfo.style.borderBottom = "none";
  tmpCMSInfo.style.borderLeft = "none";
  tmpCMSInfo.style.borderRadius = "0px 5px 0px 0px";
  tmpCMSInfo.style.textAlign="center";
  tmpCMSInfo.style.cursor="pointer";
  tmpCMSInfo.innerHTML="i"

  tmpCMSInfo.onmouseover = function() {
    this.style.backgroundColor = "rgb(150, 150, 150)";
  }

  tmpCMSInfo.onmouseleave = function() {
    this.style.backgroundColor = "rgb(80, 80, 80)";
  }

  tmpFirstRow.appendChild(tmpLabel);
  tmpFirstRow.appendChild(tmpCMSInfo);
  tmpDiv.appendChild(tmpFirstRow);

  var tmpCMSlinear = document.createElement('canvas');
  tmpCMSlinear.id="myDesignObj_CMSlinear_"+id;
  tmpCMSlinear.className = 'class_MyDesignObjCMSCanvas';
  tmpCMSlinear.style.background="rgb(191, 191, 191)";
  tmpCMSlinear.style.border = "2px solid rgb(64, 64, 64)";
  tmpCMSlinear.style.borderBottom = "none";
  tmpDiv.appendChild(tmpCMSlinear);

  var tmpCMSsketch = document.createElement('canvas');
  tmpCMSsketch.id="myDesignObj_CMSsketch_"+id;
  tmpCMSsketch.className = 'class_MyDesignObjCMSCanvas';
  tmpCMSsketch.style.background="rgb(191, 191, 191)";
  tmpCMSsketch.style.border = "2px solid rgb(64, 64, 64)";
  tmpCMSsketch.style.borderRadius = "0px 0px 5px 5px";
  tmpDiv.appendChild(tmpCMSsketch);

  divRow.appendChild(tmpDiv);


  var tmpDivButtons = document.createElement('div');
  tmpDivButtons.className = 'row class_MyDesignObjButtonsDiv';

  var tmpSubDiv1_Buttons = document.createElement('div');
  tmpSubDiv1_Buttons.style.width = "50%";

  var editButton = document.createElement("div");
  editButton.className = "class_MyDesignButton";
  editButton.style.backgroundImage = "url(img/editButton_grey.png)";
  tmpSubDiv1_Buttons.appendChild(editButton);

  var exportButton = document.createElement("div");
  exportButton.className = "class_MyDesignButton";
  exportButton.style.backgroundImage = "url(img/exportButton_grey.png)";
  tmpSubDiv1_Buttons.appendChild(exportButton);

  var tmpSubDiv2_Buttons = document.createElement('div');
  tmpSubDiv2_Buttons.style.width = "50%";

  var shareButton = document.createElement("div");
  shareButton.className = "class_MyDesignButton";
  shareButton.style.backgroundImage = "url(img/shareButton_grey.png)";
  tmpSubDiv2_Buttons.appendChild(shareButton);

  var deleteButton = document.createElement("div");
  deleteButton.className = "class_MyDesignButton";
  deleteButton.style.backgroundImage = "url(img/trashButton_grey.png)";
  tmpSubDiv2_Buttons.appendChild(deleteButton);

  tmpDivButtons.appendChild(tmpSubDiv1_Buttons);
  tmpDivButtons.appendChild(tmpSubDiv2_Buttons);
  divRow.appendChild(tmpDivButtons);

  return divRow;

}
