

function drawPredefined_MyDesignsCMS(){

  var children = document.getElementById("id_EditPage_MyDesigns_Div").children;
  for (var i = children.length-1; i >=0; i--) {
    children[i].parentNode.removeChild(children[i]);
  }


//  tmpDiv.id = 'const'+i;

  for(var i=0; i<myDesignsList.length; i++){

    if(myDesignsList[i].getKeyLength()==0)
      continue;

    var tmpDiv = document.createElement('div');
    tmpDiv.id= "myDesignDiv_"+i;
    tmpDiv.style.marginTop = "5px";

    var tmpCMSlinear = document.createElement('canvas');
    tmpCMSlinear.id="myDesignDiv_linear"+i;
    tmpCMSlinear.className = 'class_predefinedLinearCMSBands'
    tmpDiv.appendChild(tmpCMSlinear);

    var tmpCMSsketch = document.createElement('canvas');
    tmpCMSsketch.id= "myDesignDiv_sketch"+i;
    tmpCMSsketch.className = 'class_predefinedSketchCMSBands';

    tmpDiv.appendChild(tmpCMSsketch);

    tmpDiv.setAttribute('draggable', true);

    tmpDiv.addEventListener("dragstart", bandOnDragStart);
    tmpDiv.addEventListener("dragend", bandOnDragEnd);

    document.getElementById('id_EditPage_MyDesigns_Div').appendChild(tmpDiv);

    drawCanvasColormap("myDesignDiv_linear"+i, myList_resolution_X,  myList_resolution_Y, myDesignsList[i]);
    drawBandSketch(myDesignsList[i],"myDesignDiv_sketch"+i, false, -1);


  }



}
