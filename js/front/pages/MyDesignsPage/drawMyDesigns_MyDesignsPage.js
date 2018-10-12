function drawMyDesigns(){

    for(var i=0; i<myDesignsList.length; i++){
        document.getElementById("myDesignObj_Label_Div"+i).style.background="black";
        document.getElementById("myDesignObj_Label_Div"+i).style.borderColor = "black";
        document.getElementById("myDesignObj_Label_"+i).innerHTML=myDesignsList[i].getColormapName()+":";

        drawCanvasColormap("myDesignObj_CMSlinear_"+i, myList_resolution_X,  myList_resolution_Y, myDesignsList[i]);
        document.getElementById("myDesignObj_CMSlinear_"+i).style.borderColor = "black";
        drawBandSketch(myDesignsList[i],"myDesignObj_CMSsketch_"+i, false, -1);
        document.getElementById("myDesignObj_CMSsketch_"+i).style.border = "2px solid black";

        document.getElementById("myDesignObj_editButton_"+i).style.backgroundImage = "url(img/editButton_black.png)";
        document.getElementById("myDesignObj_exportButton_"+i).style.backgroundImage = "url(img/exportButton_black.png)";
        //document.getElementById("myDesignObj_shareButton_"+i).style.backgroundImage = "url(img/shareButton_black.png)";
        document.getElementById("myDesignObj_deleteButton_"+i).style.backgroundImage = "url(img/trashButton_black.png)";
        document.getElementById("myDesignObj_editButton_"+i).style.borderColor = "black";
        document.getElementById("myDesignObj_exportButton_"+i).style.borderColor = "black";
        //document.getElementById("myDesignObj_shareButton_"+i).style.borderColor = "black";
        document.getElementById("myDesignObj_deleteButton_"+i).style.borderColor = "black";
        document.getElementById("myDesignObj_editButton_"+i).style.cursor = "pointer";
        document.getElementById("myDesignObj_exportButton_"+i).style.cursor = "pointer";
        document.getElementById("myDesignObj_shareButton_"+i).style.cursor = "not-allowed";
        document.getElementById("myDesignObj_deleteButton_"+i).style.cursor = "pointer";

        document.getElementById("myDesignObj_Info_"+i).style.cursor = "pointer";

    }

    for(var i=numberOfMyDesignsObj-1; i>myDesignsList.length-1; i--){
      document.getElementById("myDesignObj_Label_Div"+i).style.background="rgb(128, 128, 128)";
      document.getElementById("myDesignObj_Label_Div"+i).style.borderColor = "rgb(64, 64, 64)";
      document.getElementById("myDesignObj_Label_"+i).innerHTML="Emty CMS:";

      var canvasObject = document.getElementById("myDesignObj_CMSlinear_"+i);
      var canvasContex = canvasObject.getContext("2d");
      canvasContex.clearRect(0, 0, canvasObject.width, canvasObject.height);
      canvasObject.style.borderColor = "rgb(64, 64, 64)";

      canvasObject = document.getElementById("myDesignObj_CMSsketch_"+i);
      canvasContex = canvasObject.getContext("2d");
      canvasContex.clearRect(0, 0, canvasObject.width, canvasObject.height);
      canvasObject.style.borderColor = "rgb(64, 64, 64)";


      document.getElementById("myDesignObj_editButton_"+i).style.backgroundImage = "url(img/editButton_grey.png)";
      document.getElementById("myDesignObj_exportButton_"+i).style.backgroundImage = "url(img/exportButton_grey.png)";
      document.getElementById("myDesignObj_shareButton_"+i).style.backgroundImage = "url(img/shareButton_grey.png)";
      document.getElementById("myDesignObj_deleteButton_"+i).style.backgroundImage = "url(img/trashButton_grey.png)";
      document.getElementById("myDesignObj_editButton_"+i).style.borderColor = "rgb(128, 128, 128)";
      document.getElementById("myDesignObj_exportButton_"+i).style.borderColor = "rgb(128, 128, 128)";
      document.getElementById("myDesignObj_shareButton_"+i).style.borderColor = "rgb(128, 128, 128)";
      document.getElementById("myDesignObj_deleteButton_"+i).style.borderColor = "rgb(128, 128, 128)";
      document.getElementById("myDesignObj_editButton_"+i).style.cursor = "default";
      document.getElementById("myDesignObj_exportButton_"+i).style.cursor = "default";
      //document.getElementById("myDesignObj_shareButton_"+i).style.cursor = "default";
      document.getElementById("myDesignObj_deleteButton_"+i).style.cursor = "default";

      document.getElementById("myDesignObj_editButton_"+i).style.cursor = "not-allowed";
      document.getElementById("myDesignObj_exportButton_"+i).style.cursor = "not-allowed";
      document.getElementById("myDesignObj_shareButton_"+i).style.cursor = "not-allowed";
      document.getElementById("myDesignObj_deleteButton_"+i).style.cursor = "not-allowed";
      document.getElementById("myDesignObj_Info_"+i).style.cursor = "not-allowed";

    }


    /*for(var i=0; i<myList.length; i++){
      //  console.log(myList[i].getColormapName());
      drawCanvasColormap("id_canvasMyListColormap"+i, myList_resolution_X,  myList_resolution_Y, myList[i]);
      document.getElementById("id_canvasMyListColormap"+i).style.border = "0.2vh solid rgb(0,0,0)";

      document.getElementById("id_buttonExportMyList"+i).style.backgroundImage = "url(img/exportButton_black.png)";
      document.getElementById("id_buttonDeleteMyList"+i).style.backgroundImage = "url(img/trashButton_black.png)";



      if(i!=colormap1SelectIndex){
        document.getElementById("id_buttonAcceptMyList"+i).style.border = "0.2vh solid rgb(0,0,0)";
        document.getElementById("id_buttonAcceptMyList"+i).style.color = "rgb(0,0,0)";
      }
      else{
        document.getElementById("id_buttonAcceptMyList"+i).style.border = "0.2vh solid "+styleActiveColor;
        document.getElementById("id_buttonAcceptMyList"+i).style.color = styleActiveColor;
      }

      document.getElementById("id_buttonExportMyList"+i).style.border = "0.2vh solid rgb(0,0,0)";
      document.getElementById("id_buttonDeleteMyList"+i).style.border = "0.2vh solid rgb(0,0,0)";

      document.getElementById("id_nanMyListColormap"+i).style.background = myList[i].getNaNColor("rgb").getRGBString();
    }

    for(var i=9; i>myList.length-1; i--){

      document.getElementById("id_canvasMyListColormap"+i).style.border = "0.2vh solid rgb(180,180,180)";

      document.getElementById("id_buttonExportMyList"+i).style.backgroundImage = "url(img/exportButton_grey.png)";
      document.getElementById("id_buttonAcceptMyList"+i).style.color = "rgb(180,180,180)";
      document.getElementById("id_buttonDeleteMyList"+i).style.backgroundImage = "url(img/trashButton_grey.png)";

      document.getElementById("id_buttonExportMyList"+i).style.border = "0.2vh solid rgb(180,180,180)";
      document.getElementById("id_buttonAcceptMyList"+i).style.border = "0.2vh solid rgb(180,180,180)";
      document.getElementById("id_buttonDeleteMyList"+i).style.border = "0.2vh solid rgb(180,180,180)";

      var canvasObject = document.getElementById("id_canvasMyListColormap"+i);

      var canvasContex = canvasObject.getContext("2d");

      canvasContex.clearRect(0, 0, canvasObject.width, canvasObject.height);

      document.getElementById("id_nanMyListColormap"+i).style.background = "rgb(180,180,180)";

    }*/
}
