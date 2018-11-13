function drawMyDesigns(){

    for(var i=0; i<myDesignsList.length; i++){
        document.getElementById("myDesignObj_Label_Div"+i).style.background="black";
        document.getElementById("myDesignObj_Label_Div"+i).style.borderColor = "black";
        document.getElementById("myDesignObj_Label_"+i).innerHTML=myDesignsList[i].getColormapName()+":";
        document.getElementById("myDesignObj_Label_"+i).style.color="white";

        drawCanvasColormap("myDesignObj_CMSlinear_"+i, myDesignsList[i]);
        document.getElementById("myDesignObj_CMSlinear_"+i).style.borderColor = "black";
        drawBandSketch(myDesignsList[i],"myDesignObj_CMSsketch_"+i, false, -1);
        document.getElementById("myDesignObj_CMSsketch_"+i).style.border = "2px solid black";

        document.getElementById("myDesignObj_editButton_"+i).style.backgroundImage = "url(img/Buttons/editButton_black.png)";
        document.getElementById("myDesignObj_exportButton_"+i).style.backgroundImage = "url(img/Buttons/exportButton_black.png)";
        //document.getElementById("myDesignObj_shareButton_"+i).style.backgroundImage = "url(img/Buttons/shareButton_black.png)";
        document.getElementById("myDesignObj_deleteButton_"+i).style.backgroundImage = "url(img/Buttons/trashButton_black.png)";
        document.getElementById("myDesignObj_editButton_"+i).style.borderColor = "black";
        document.getElementById("myDesignObj_exportButton_"+i).style.borderColor = "black";
        //document.getElementById("myDesignObj_shareButton_"+i).style.borderColor = "black";
        document.getElementById("myDesignObj_deleteButton_"+i).style.borderColor = "black";
        document.getElementById("myDesignObj_editButton_"+i).style.cursor = "pointer";
        document.getElementById("myDesignObj_exportButton_"+i).style.cursor = "pointer";
        document.getElementById("myDesignObj_shareButton_"+i).style.cursor = "not-allowed";
        document.getElementById("myDesignObj_deleteButton_"+i).style.cursor = "pointer";

        document.getElementById("myDesignObj_Info_"+i).style.cursor = "pointer";
        document.getElementById("myDesignObj_Info_"+i).style.color="white";

    }

    for(var i=numberOfMyDesignsObj-1; i>myDesignsList.length-1; i--){
      document.getElementById("myDesignObj_Label_Div"+i).style.background="rgb(220,220,220)";
      document.getElementById("myDesignObj_Label_Div"+i).style.borderColor = "rgb(180,180,180)";
      document.getElementById("myDesignObj_Label_"+i).innerHTML="Emty CMS:";
      document.getElementById("myDesignObj_Label_"+i).style.color="rgb(180,180,180)";

      var canvasObject = document.getElementById("myDesignObj_CMSlinear_"+i);
      var canvasContex = canvasObject.getContext("2d");
      canvasContex.clearRect(0, 0, canvasObject.width, canvasObject.height);
      canvasObject.style.borderColor = "rgb(180,180,180)";

      canvasObject = document.getElementById("myDesignObj_CMSsketch_"+i);
      canvasContex = canvasObject.getContext("2d");
      canvasContex.clearRect(0, 0, canvasObject.width, canvasObject.height);
      canvasObject.style.borderColor = "rgb(180,180,180)";


      document.getElementById("myDesignObj_editButton_"+i).style.backgroundImage = "url(img/Buttons/editButton_grey.png)";
      document.getElementById("myDesignObj_exportButton_"+i).style.backgroundImage = "url(img/Buttons/exportButton_grey.png)";
      document.getElementById("myDesignObj_shareButton_"+i).style.backgroundImage = "url(img/Buttons/shareButton_grey.png)";
      document.getElementById("myDesignObj_deleteButton_"+i).style.backgroundImage = "url(img/Buttons/trashButton_grey.png)";
      document.getElementById("myDesignObj_editButton_"+i).style.borderColor = "rgb(180,180,180)";
      document.getElementById("myDesignObj_exportButton_"+i).style.borderColor = "rgb(180,180,180)";
      document.getElementById("myDesignObj_shareButton_"+i).style.borderColor = "rgb(180,180,180)";
      document.getElementById("myDesignObj_deleteButton_"+i).style.borderColor = "rgb(180,180,180)";
      document.getElementById("myDesignObj_editButton_"+i).style.cursor = "default";
      document.getElementById("myDesignObj_exportButton_"+i).style.cursor = "default";
      //document.getElementById("myDesignObj_shareButton_"+i).style.cursor = "default";
      document.getElementById("myDesignObj_deleteButton_"+i).style.cursor = "default";

      document.getElementById("myDesignObj_editButton_"+i).style.cursor = "not-allowed";
      document.getElementById("myDesignObj_exportButton_"+i).style.cursor = "not-allowed";
      document.getElementById("myDesignObj_shareButton_"+i).style.cursor = "not-allowed";
      document.getElementById("myDesignObj_deleteButton_"+i).style.cursor = "not-allowed";
      document.getElementById("myDesignObj_Info_"+i).style.cursor = "not-allowed";
      document.getElementById("myDesignObj_Info_"+i).style.color="rgb(180,180,180)";

    }

}
