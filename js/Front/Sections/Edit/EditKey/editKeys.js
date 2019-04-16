function openEditKeyDiv(key){

  document.getElementById("id_EditPage_EmptyDiv").style.display="none";
  document.getElementById("id_EditPage_WorkDiv").style.display="none";

  if(globalCMS1.getKeyLength() == 0){
    document.getElementById("id_EditPage_EmptyDiv").style.display="flex";
    return;
  }

  if(document.getElementById("id_EditPage_AnalzyeMappingProbeSetEditKey_Div").style.display==="none" ||
  document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display==="none")
    return;

  if (document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display == "none")
    document.getElementById("id_EditPage_WorkDiv").style.display="flex";
  else
    document.getElementById("id_EditPage_WorkDiv").style.display="block";


  var selectbox = document.getElementById("id_EditPage_EditKey_List");

  for(var i = selectbox.options.length - 1 ; i >= 0 ; i--)
  {
      selectbox.remove(i);
  }

  for (var i = 0; i < globalCMS1.getKeyLength(); i++) {
      var opt = document.createElement('option');
      opt.className = 'standardText';
      opt.innerHTML = "Key : \t"+ (i+1) +";\t  "+globalCMS1.getKeyType(i)+";\t   Reference : " + globalCMS1.getRefPosition(i);
      selectbox.appendChild(opt);

  }

  if(key==undefined || key<0  || key>selectbox.options.length-1){
    selectbox.selectedIndex = 0;
  }
  else{
    selectbox.selectedIndex = key;
  }

  selectKey();

}


function editPage_ChangeReference(event){

  //var inputObj = document.getElementById(event.target.id);
  //checkInputVal(inputObj, true, true);
  var keyIndex = document.getElementById("id_EditPage_EditKey_List").selectedIndex;
  var newRef = parseFloat(document.getElementById(event.target.id).value);

  if(isNaN(newRef)){
    document.getElementById(event.target.id).value = globalCMS1.getRefPosition(keyIndex);
    return;
  }

  switch (keyIndex) {
    case 0:
      var nextRef = globalCMS1.getRefPosition(1);
      if(nextRef<=newRef){
        openAlert("Attention: You can not set the reference value greater than or equal to the reference value of the right neighboring key! Please enter another value.");
        inputObj.value=globalCMS1.getRefPosition(0);
      }
      else {
        globalCMS1.setRefPosition(keyIndex,newRef);
        updateEditPage();
        saveCreateProcess();
        openEditKeyDiv(document.getElementById("id_EditPage_EditKey_List").selectedIndex);
      }
      break;
    case globalCMS1.getKeyLength()-1:
      var prevRef = globalCMS1.getRefPosition(keyIndex-1);
      if(prevRef>=newRef){
        openAlert("Attention: You can not set the reference value smaller than or equal to the reference value of the left neighboring key! Please enter another value.");
        inputObj.value=globalCMS1.getRefPosition(keyIndex);
      }
      else {
        globalCMS1.setRefPosition(keyIndex,newRef);
        updateEditPage();
        saveCreateProcess();
        openEditKeyDiv(document.getElementById("id_EditPage_EditKey_List").selectedIndex);
      }

      break;
    default:
    var nextRef = globalCMS1.getRefPosition(keyIndex+1);
    if(nextRef<=newRef){
      openAlert("Attention: You can not set the reference value greater than or equal to the reference value of the right neighboring key! Please enter another value.");
      inputObj.value=globalCMS1.getRefPosition(keyIndex);
    }
    else{
      var prevRef = globalCMS1.getRefPosition(keyIndex-1);
      if(prevRef>=newRef){
        openAlert("Attention: You can not set the reference value smaller than or equal to the reference value of the left neighboring key! Please enter another value.");
        inputObj.value=globalCMS1.getRefPosition(keyIndex);
      }
      else{
        globalCMS1.setRefPosition(keyIndex,newRef);
        updateEditPage();
        saveCreateProcess();
        openEditKeyDiv(document.getElementById("id_EditPage_EditKey_List").selectedIndex);
      }
    }
  }

}

function changeKeyBurStatus(){
  var selectedKey = document.getElementById("id_EditPage_EditKey_List").selectedIndex;

  if(document.getElementById("id_editPage_BurKeyTrue").checked ){
    globalCMS1.setBur(selectedKey,true);
  }
  else{
    globalCMS1.setBur(selectedKey,false);
  }
  drawKeyBursLine("id_EditPage_CMS_VIS_KeyBurs",globalCMS1);
  saveCreateProcess();
}

function delteKey(){
  var oldIndex = document.getElementById("id_EditPage_EditKey_List").selectedIndex;
  globalCMS1.deleteKey(oldIndex);
  openEditKeyDiv(oldIndex);
  updateEditPage();
  saveCreateProcess();
}

function selectKey(){

  var selectedKey = document.getElementById("id_EditPage_EditKey_List").selectedIndex;

  document.getElementById("id_editPage_BurKeyFalse").disabled = false;

  if(selectedKey==0 || selectedKey==globalCMS1.getKeyLength()-1){
      document.getElementById("id_EditPage_EditKey_DeleteButton").style.display = "none";
      document.getElementById("id_editPage_BurKeyFalse").disabled = true;

      if(selectedKey==0){
          document.getElementById("id_EditPage_EditKey_SetReference").max=globalCMS1.getRefPosition(selectedKey+1);
          document.getElementById("id_EditPage_EditKey_SetReference").min=undefined;
      }
      else{
          document.getElementById("id_EditPage_EditKey_SetReference").max=undefined;
          document.getElementById("id_EditPage_EditKey_SetReference").min=globalCMS1.getRefPosition(selectedKey-1);
      }
  }
  else {
      document.getElementById("id_EditPage_EditKey_DeleteButton").style.display = "block";
      document.getElementById("id_EditPage_EditKey_SetReference").max=globalCMS1.getRefPosition(selectedKey+1);
      document.getElementById("id_EditPage_EditKey_SetReference").min=globalCMS1.getRefPosition(selectedKey-1);
  }

    document.getElementById("id_EditPage_EditKey_SetReference").value = globalCMS1.getRefPosition(selectedKey);

  if(globalCMS1.getBur(selectedKey)){
    document.getElementById("id_editPage_BurKeyTrue").checked = true;
  }
  else{
    document.getElementById("id_editPage_BurKeyFalse").checked = true;

  }

  document.getElementById("id_editPage_KeyTypeNil").disabled = false;
  document.getElementById("id_editPage_KeyTypeRight").disabled = false;
  document.getElementById("id_editPage_KeyTypeTwin").disabled = false;
  document.getElementById("id_editPage_KeyTypeLeft").disabled = false;
  document.getElementById("id_editPage_KeyTypeDual").disabled = false;

  document.getElementById("id_editPage_KeyTypeTwinLabel").style.color = "black";
  document.getElementById("id_editPage_KeyTypeLeftLabel").style.color = "black";
  document.getElementById("id_editPage_KeyTypeDualLabel").style.color = "black";
  document.getElementById("id_editPage_KeyTypeNilLabel").style.color = "black";
  document.getElementById("id_editPage_KeyTypeRightLabel").style.color = "black";

  switch (globalCMS1.getKeyType(selectedKey)) {
    case "nil key":
      document.getElementById("id_editPage_KeyTypeNil").checked = true;
      document.getElementById("id_editPage_KeyTypeTwin").disabled = true;
      document.getElementById("id_editPage_KeyTypeLeft").disabled = true;
      document.getElementById("id_editPage_KeyTypeDual").disabled = true;
      document.getElementById("id_editPage_KeyTypeTwinLabel").style.color = "grey";
      document.getElementById("id_editPage_KeyTypeLeftLabel").style.color = "grey";
      document.getElementById("id_editPage_KeyTypeDualLabel").style.color = "grey";
      break;
    case "right key":
        document.getElementById("id_editPage_KeyTypeRight").checked = true;
        document.getElementById("id_editPage_KeyTypeTwin").disabled = true;
        document.getElementById("id_editPage_KeyTypeLeft").disabled = true;
        document.getElementById("id_editPage_KeyTypeDual").disabled = true;
        document.getElementById("id_editPage_KeyTypeTwinLabel").style.color = "grey";
        document.getElementById("id_editPage_KeyTypeLeftLabel").style.color = "grey";
        document.getElementById("id_editPage_KeyTypeDualLabel").style.color = "grey";
        break;
    case "twin key":
      document.getElementById("id_editPage_KeyTypeTwin").checked = true;
      document.getElementById("id_editPage_KeyTypeNil").disabled = true;
      document.getElementById("id_editPage_KeyTypeRight").disabled = true;
      document.getElementById("id_editPage_KeyTypeNilLabel").style.color = "grey";
      document.getElementById("id_editPage_KeyTypeRightLabel").style.color = "grey";
      break;
    case "left key":
      document.getElementById("id_editPage_KeyTypeLeft").checked = true;
      document.getElementById("id_editPage_KeyTypeNil").disabled = true;
      document.getElementById("id_editPage_KeyTypeRight").disabled = true;
      document.getElementById("id_editPage_KeyTypeNilLabel").style.color = "grey";
      document.getElementById("id_editPage_KeyTypeRightLabel").style.color = "grey";

      if(selectedKey==globalCMS1.getKeyLength()-1){
        document.getElementById("id_editPage_KeyTypeTwin").disabled = true;
        document.getElementById("id_editPage_KeyTypeDual").disabled = true;
        document.getElementById("id_editPage_KeyTypeTwinLabel").style.color = "grey";
        document.getElementById("id_editPage_KeyTypeDualLabel").style.color = "grey";
      }
      break;

    default:
    document.getElementById("id_editPage_KeyTypeDual").checked = true;
    document.getElementById("id_editPage_KeyTypeNil").disabled = true;
    document.getElementById("id_editPage_KeyTypeRight").disabled = true;
    document.getElementById("id_editPage_KeyTypeNilLabel").style.color = "grey";
    document.getElementById("id_editPage_KeyTypeRightLabel").style.color = "grey";
  }


  drawSelectedKey();
}




function updateKeyDrawSize(){

document.getElementById("id_EditPage_EditKey_DrawKeyDiv").style.width = "40%";
document.getElementById("id_EditPage_EditKey_DrawKeyDiv").style.height = "100%";
  var box = document.getElementById("id_EditPage_EditKey_DrawKeyDiv").getBoundingClientRect();


  if(box.width<box.height){
    document.getElementById("id_EditPage_EditKey_DrawKeyDiv").style.width = box.width+"px";
    document.getElementById("id_EditPage_EditKey_DrawKeyDiv").style.height = box.width+"px";
  }
  else {
    document.getElementById("id_EditPage_EditKey_DrawKeyDiv").style.width = box.height+"px";
    document.getElementById("id_EditPage_EditKey_DrawKeyDiv").style.height = box.height+"px";
  }

}


function drawSelectedKey(){

  var selectedKey = document.getElementById("id_EditPage_EditKey_List").selectedIndex;
  document.getElementById("id_EditPage_EditKey_DrawKeyDiv").innerHTML="";
  updateKeyDrawSize();

  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.cursor = "not-allowed";
  svg.style.background = "rgb(125,125,125)";

  var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
  newLine.setAttribute('x1','0');
  newLine.setAttribute('y1','100%');
  newLine.setAttribute('x2','100%');
  newLine.setAttribute('y2','0');
  newLine.setAttribute("stroke", "black");
  svg.append(newLine);


  switch (globalCMS1.getKeyType(selectedKey)) {
    case "nil key": // Nil

      document.getElementById("id_EditPage_EditKey_DrawKeyDiv").appendChild(svg);

      break;

    case "right key": case "twin key": case "left key": // right // twin // left

        var divTop = document.createElement('div');
        divTop.style.width = '100%';
        divTop.style.height = "25%";
        divTop.style.cursor = "pointer";
        divTop.style.borderBottom = "0.2vh solid black";
        divTop.onclick = function() {
          var index = document.getElementById("id_EditPage_EditKey_List").selectedIndex;
          if(globalCMS1.getMoT(index)){
              globalCMS1.setMoT(index,false);
          }
          else{
            globalCMS1.setMoT(index,true);
          }
          drawSelectedKey();
          updateEditPage();
        }

        var divDouble = document.createElement('div');
        divDouble.className = 'row';
        divDouble.style.width = '100%';
        divDouble.style.height = "75%";

        var divLeft = document.createElement('div');
        divLeft.style.width = '50%';
        divLeft.style.height = "100%";
        divLeft.style.borderRight = "0.2vh solid black";
        divLeft.id="id_EditPage_DrawnLeftKey";
        divLeft.addEventListener("click", openColorPicker);

        var divRight = document.createElement('div');
        divRight.style.width = '50%';
        divRight.style.height = "100%";

        divRight.addEventListener("click", openColorPicker);
        divRight.id="id_EditPage_DrawnRightKey";
        divDouble.appendChild(divLeft);
        divDouble.appendChild(divRight);

        switch (globalCMS1.getKeyType(selectedKey)){
          case "right key":
              divDouble.style.height = "100%";
              divLeft.appendChild(svg);
              divRight.style.cursor = "pointer";
              divRight.style.background = globalCMS1.getRightKeyColorCB(selectedKey).getRGBString();
            break;
            case "twin key":
            divLeft.style.cursor = "pointer";
            divLeft.style.background = globalCMS1.getLeftKeyColorCB(selectedKey).getRGBString();
            divRight.style.cursor = "pointer";
            divRight.style.background = globalCMS1.getRightKeyColorCB(selectedKey).getRGBString();


            if(globalCMS1.getMoT(selectedKey)){
                // right color is middle of triple
                divTop.style.background = globalCMS1.getRightKeyColorCB(selectedKey).getRGBString();
            }
            else{
                divTop.style.background = globalCMS1.getLeftKeyColorCB(selectedKey).getRGBString();
            }

            document.getElementById("id_EditPage_EditKey_DrawKeyDiv").appendChild(divTop);
              break;
            case "left key":
              divLeft.style.cursor = "pointer";
              divLeft.style.background = globalCMS1.getLeftKeyColorCB(selectedKey).getRGBString();
              divRight.appendChild(svg);

              if(selectedKey==globalCMS1.getKeyLength()-1){
                divDouble.style.height = "100%";
              }
              else{
                if(globalCMS1.getMoT(selectedKey)){
                    // right color is middle of triple
                    divTop.style.background = globalCMS1.getLeftKeyColorCB(selectedKey+1).getRGBString();
                }
                else{
                    divTop.style.background = globalCMS1.getLeftKeyColorCB(selectedKey).getRGBString();
                }


                document.getElementById("id_EditPage_EditKey_DrawKeyDiv").appendChild(divTop);
              }
              break;
          default:

        }

        document.getElementById("id_EditPage_EditKey_DrawKeyDiv").appendChild(divDouble);

    break;
    default: // case 4 dual

    var divDual = document.createElement('div');
    divDual.id="id_EditPage_DrawnDualKey";
    divDual.style.width = '100%';
    divDual.style.height = "100%";
    divDual.style.cursor = "pointer";
    divDual.style.background = globalCMS1.getLeftKeyColorCB(selectedKey).getRGBString();
    document.getElementById("id_EditPage_EditKey_DrawKeyDiv").appendChild(divDual);
    divDual.addEventListener("click", openColorPicker);



  }
}


function changeKeyType(event){

  var selectedKey= document.getElementById("id_EditPage_EditKey_List").selectedIndex;

  switch (event.target.id) {
    case "id_editPage_KeyTypeNil":
    if(globalCMS1.getKeyType(selectedKey)==="right key"){

      globalCMS1.setRightKeyColor(selectedKey,undefined);
      globalCMS1.setLeftKeyColor(selectedKey,undefined);

    }

      break;
    case "id_editPage_KeyTypeTwin":
      if(globalCMS1.getKeyType(selectedKey)==="dual key" || globalCMS1.getKeyType(selectedKey)==="left key"){

        var tmpColor = globalCMS1.getLeftKeyColor(selectedKey+1,"lab");


        if(tmpColor.get1Value()!=0||tmpColor.get2Value()!=0||tmpColor.get3Value()!=0)
        {
          tmpColor.set1Value(tmpColor.get1Value()*0.75);
          tmpColor.set2Value(tmpColor.get2Value()*0.75);
          tmpColor.set3Value(tmpColor.get3Value()*0.75);
        }
        else{
          tmpColor.set1Value(1);
          tmpColor.set2Value(1);
          tmpColor.set3Value(1);
        }
        globalCMS1.setRightKeyColor(selectedKey,tmpColor);

        var tmpColor2;
        if(globalCMS1.getKeyType(selectedKey-1)==="left key" || globalCMS1.getKeyType(selectedKey-1)==="nil key")
          tmpColor2 = globalCMS1.getLeftKeyColor(selectedKey,"lab");
        else{
          tmpColor2 = globalCMS1.getRightKeyColor(selectedKey-1,"lab");

          if(tmpColor2.get1Value()!=0||tmpColor2.get2Value()!=0||tmpColor2.get3Value()!=0)
          {
            tmpColor2.set1Value(tmpColor2.get1Value()*0.75);
            tmpColor2.set2Value(tmpColor2.get2Value()*0.75);
            tmpColor2.set3Value(tmpColor2.get3Value()*0.75);
          }
          else{
            tmpColor2.set1Value(1);
            tmpColor2.set2Value(1);
            tmpColor2.set3Value(1);
          }
        }

        globalCMS1.setLeftKeyColor(selectedKey,tmpColor2);

      }
      break;
    case "id_editPage_KeyTypeLeft":
      if(globalCMS1.getKeyType(selectedKey)==="dual key" || globalCMS1.getKeyType(selectedKey)==="twin key"){
        globalCMS1.setRightKeyColor(selectedKey,undefined);
      }

      break;
    case "id_editPage_KeyTypeRight":
      if(globalCMS1.getKeyType(selectedKey)==="nil key"){
        var tmpColor = globalCMS1.getLeftKeyColor(selectedKey+1,"lab");

        if(tmpColor.get1Value()!=0||tmpColor.get2Value()!=0||tmpColor.get3Value()!=0)
        {
          tmpColor.set1Value(tmpColor.get1Value()*0.5);
          tmpColor.set2Value(tmpColor.get2Value()*0.5);
          tmpColor.set3Value(tmpColor.get3Value()*0.5);
        }
        else{
          tmpColor.set1Value(1);
          tmpColor.set2Value(1);
          tmpColor.set3Value(1);
        }
        globalCMS1.setRightKeyColor(selectedKey,tmpColor);
        globalCMS1.setLeftKeyColor(selectedKey,undefined);
      }

      break;
    default:
    // dual key+
        if(globalCMS1.getKeyType(selectedKey)==="twin key" || globalCMS1.getKeyType(selectedKey)==="left key"){

            /*var tmpColor1 = globalCMS1.getRightKeyColor(selectedKey-1,"lab");
            var tmpColor2 = globalCMS1.getLeftKeyColor(selectedKey-2,"lab");



            var newlightness;
            if(tmpColor1==undefined){
              var ratio = (globalCMS1.getRefPosition(selectedKey)-globalCMS1.getRefPosition(selectedKey-1))/(globalCMS1.getRefPosition(selectedKey+1)-globalCMS1.getRefPosition(selectedKey-1));
            }
            else{
              if(mpColor.get2Value()!=0)
            }*/

            var tmpColor = globalCMS1.getLeftKeyColor(selectedKey,"lab");

            if(tmpColor.get1Value()!=0||tmpColor.get2Value()!=0||tmpColor.get3Value()!=0)
            {
              tmpColor.set1Value(tmpColor.get1Value()*0.5);
              tmpColor.set2Value(tmpColor.get2Value()*0.5);
              tmpColor.set3Value(tmpColor.get3Value()*0.5);
            }
            else{
              tmpColor.set1Value(1);
              tmpColor.set2Value(1);
              tmpColor.set3Value(1);
            }

            globalCMS1.setRightKeyColor(selectedKey,tmpColor);
            globalCMS1.setLeftKeyColor(selectedKey,tmpColor);


        }


  }

  updateEditPage();
  drawSelectedKey();
  saveCreateProcess();

}



function showDrawnKeyHelp(){

  var selectedKey = document.getElementById("id_EditPage_EditKey_List").selectedIndex;

  switch (globalCMS1.getKeyType(selectedKey)) {
    case "nil key": // Nil
      document.getElementById("id_EditPage_DrawnKey_NilKeyHelp").style.display = "block";
      break;

    case "right key":
    document.getElementById("id_EditPage_DrawnKey_RightKeyHelp").style.visibility = "visible";
    break;
    case "twin key":
      document.getElementById("id_EditPage_DrawnKey_RightKeyHelp").style.visibility = "visible";
      // no break!
    case "left key":

      document.getElementById("id_EditPage_DrawnKey_MoTHelp").style.display = "block";
      document.getElementById("id_EditPage_DrawnKey_LeftKeyHelp").style.visibility = "visible";

      if(selectedKey==globalCMS1.getKeyLength()-1){
        document.getElementById("id_EditPage_DrawnKey_MoTHelp").style.display = "none";
      }

    break;
    default:
    document.getElementById("id_EditPage_DrawnKey_LeftKeyHelp").style.visibility = "visible";
    document.getElementById("id_EditPage_DrawnKey_LeftKeyHelpLabel").innerHTML = "Click to change the dual key color.";
  }

}

function hideDrawnKeyHelp(){

  document.getElementById("id_EditPage_DrawnKey_LeftKeyHelp").style.visibility = "hidden";
  document.getElementById("id_EditPage_DrawnKey_LeftKeyHelpLabel").innerHTML = "Click to change the left key color.";
  document.getElementById("id_EditPage_DrawnKey_RightKeyHelp").style.visibility = "hidden";
  document.getElementById("id_EditPage_DrawnKey_NilKeyHelp").style.display = "none";
  document.getElementById("id_EditPage_DrawnKey_MoTHelp").style.display = "none";


}
