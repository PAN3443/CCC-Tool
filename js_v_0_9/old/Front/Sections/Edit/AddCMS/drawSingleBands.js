function drawConstantBands(){

  //---------------------------
  // --------- Empty Divs
  document.getElementById('id_EditPage_ConstBandDiv').innerHTML = "";

  //---------------------------
  // --------- Const
  /*var doBreak = false;
  var row;*/

  for(var i=0; i<constBands.length; i++){

      var iDiv = document.createElement('div');
      iDiv.id = 'const'+i;
      iDiv.className = 'class_predefinedConstBands';
      iDiv.setAttribute('draggable', true);

      if(doColorblindnessSim){
        var tmpLMS = constBands[i].calcLMSColor();
        var toolColor = tmpLMS.calcColorBlindRGBColor();
        iDiv.style.background = toolColor.getRGBString();
        tmpLMS.deleteReferences();
        toolColor.deleteReferences();
        tmpLMS=null;
      }
      else{
        iDiv.style.background = constBands[i].getRGBString();
      }

      iDiv.addEventListener("dragstart", cmsStructureOnDragStart);
      iDiv.addEventListener("dragend", cmsStructureOnDragEnd);
      //iDiv.style.cursor = "move";

      document.getElementById('id_EditPage_ConstBandDiv').appendChild(iDiv);

      /*if(i%2==0){
        row = document.createElement("div");
        row.className = "class_predefinedRow";
        row.appendChild(iDiv);
      }
      else{
        row.appendChild(iDiv);
        document.getElementById('id_EditPage_ConstBandDiv').appendChild(row);
      }*/

  }
}
