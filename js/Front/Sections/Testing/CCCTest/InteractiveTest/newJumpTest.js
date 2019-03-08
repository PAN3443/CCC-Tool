function selectNewJumpTestType(){

  document.getElementById("id_TestPage_NewTest_JumpDiv").style.display="block";

  document.getElementById("id_TestPage_doRatioCheckbox").checked = cccTest_NewJump_Options[0];

  fillNewJumpsList();

}


function newJumpTestStartPerEnter(event){

  var keynum;
  if(window.event) { // IE
    keynum = event.keyCode;
  } else if(event.which){ // Netscape/Firefox/Opera
    keynum = event.which;
  }

  if (keynum == 13) {
      addJumpToJumpSet();
  }
}

function updateJumpTestVariables(){

  cccTest_NewJump_Options[0]=document.getElementById("id_TestPage_doRatioCheckbox").checked;
  if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
    cccTest_NewJump_Options[1]=[0,1];
  }
  else{
    cccTest_NewJump_Options[1]=[globalCMS1.getRefPosition(0),globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1)];
  }
  fillNewJumpsList();
}

function fillNewJumpsList(){

  document.getElementById("id_TestPage_NewTest_JumpList").innerHTML = "";
  for (var i = 0; i < cccTest_NewJump_Options[1].length; i++) {
    var option = document.createElement("option");
    option.innerHTML = cccTest_NewJump_Options[1][i];
    document.getElementById("id_TestPage_NewTest_JumpList").add(option);
  }

  if(cccTest_NewJump_Options[1].length>0){

    if (usertestWorkerfinished == false) {

      if (usertestWorker != undefined)
        usertestWorker.terminate();

      usertestWorkerfinished = true;
    }

    jumpTest_startWorker(cccTest_NewJump_Options);
  }
  else{
    testmappingMesh.visible = false;
    testmappingMeshGrey.visible = false;
  }

}

function addJumpToJumpSet(){

  var newValue = document.getElementById("id_TestPage_NewJumpValue").value;
  if(isNaN(newValue)){
    openAlert("Invalid value for adding a new jump!");
    return;
  }

  if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (newValue<0 || newValue>1.0)){
    openAlert("Invalid value for adding a new jump! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
    return;
  }


    var foundValue = false;
    for (var i = 0; i < cccTest_NewJump_Options[1].length; i++) {
      if(cccTest_NewJump_Options[1][i]==newValue){
        foundValue=true;
        break;
      }
    }

    if(foundValue){
      openAlert("The value is already in the jump set! Please enter another value.");
      return;
    }

    cccTest_NewJump_Options[1].push(newValue);
    cccTest_NewJump_Options[1].sort(function(a, b){return a - b});
    fillNewJumpsList();

}

function removeJumpToJumpSet(){

  if(document.getElementById("id_TestPage_NewTest_JumpList").selectedIndex!=-1){
    cccTest_NewJump_Options[1].splice(document.getElementById("id_TestPage_NewTest_JumpList").selectedIndex, 1);
    fillNewJumpsList();
  }

}
