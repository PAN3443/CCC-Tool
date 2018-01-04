function drawMyList(){

    for(var i=0; i<myList.length; i++){

      drawCanvasColormap("id_canvasMyListColormap"+i, myList_resolution_X,  myList_resolution_Y, myList[i]);
      document.getElementById("id_canvasMyListColormap"+i).style.border = "0.2vh solid rgb(0,0,0)";

      document.getElementById("id_buttonExportMyList"+i).style.backgroundImage = "url(img/exportButton_black.png)";
      document.getElementById("id_buttonEditMyList"+i).style.backgroundImage = "url(img/editButton_black.png)";
      document.getElementById("id_buttonDeleteMyList"+i).style.backgroundImage = "url(img/trashButton_black.png)";

      document.getElementById("id_buttonExportMyList"+i).style.border = "0.2vh solid rgb(0,0,0)";
      document.getElementById("id_buttonEditMyList"+i).style.border = "0.2vh solid rgb(0,0,0)";
      document.getElementById("id_buttonDeleteMyList"+i).style.border = "0.2vh solid rgb(0,0,0)";

      document.getElementById("id_nanMyListColormap"+i).style.background = myList[i].getNaNColor("rgb").getRGBString();
    }

    for(var i=9; i>myList.length-1; i--){

      /*<canvas id="id_canvasColormap0" class="class_MyListColormapCanvas" style="height:100%; width:70%; margin-left:4%; border-radius: 0.5vh;">

      </canvas>*/
      document.getElementById("id_canvasMyListColormap"+i).style.border = "0.2vh solid rgb(180,180,180)";

      document.getElementById("id_buttonExportMyList"+i).style.backgroundImage = "url(img/exportButton_grey.png)";
      document.getElementById("id_buttonEditMyList"+i).style.backgroundImage = "url(img/editButton_grey.png)";
      document.getElementById("id_buttonDeleteMyList"+i).style.backgroundImage = "url(img/trashButton_grey.png)";

      document.getElementById("id_buttonExportMyList"+i).style.border = "0.2vh solid rgb(180,180,180)";
      document.getElementById("id_buttonEditMyList"+i).style.border = "0.2vh solid rgb(180,180,180)";
      document.getElementById("id_buttonDeleteMyList"+i).style.border = "0.2vh solid rgb(180,180,180)";

      var canvasObject = document.getElementById("id_canvasMyListColormap"+i);

      var canvasContex = canvasObject.getContext("2d");

      canvasContex.clearRect(0, 0, canvasObject.width, canvasObject.height);

      document.getElementById("id_nanMyListColormap"+i).style.background = "rgb(180,180,180)";

    }
}
