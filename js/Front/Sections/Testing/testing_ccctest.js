function startCCCTest(){

  var children = document.getElementById("id_CCCTest_FieldType_Select").children;
  for (var i = 0; i < children.length; i++) {
    children[i].disabled=true;
  }

  var selectobject=document.getElementById("id_CCCTest_Field_Select")
  for (var i=selectobject.length-1; i>=0; i--){
     selectobject.remove(i);
  }


  allFieldsFinished=false;

  initTesttestField_WorkerJSON();


  //// JUMPS /////////////////////////////////
  if(document.getElementById("id_CCCTest_DoJump").checked){
    if(allJumpWorkersFinished=false){
      for (var i = 0; i < jumpWorkers_Array.length; i++) {
        if(jumpWorkers_Array[i]!=undefined)
          jumpWorkers_Array[i].terminate();
      }

      allJumpWorkersFinished=true;
    }
    startJumpFieldGeneration();
  }

  //// Gradient /////////////////////////////////
  if(document.getElementById("id_CCCTest_DoGradient").checked){
    if(allGradientWorkersFinished=false){
      for (var i = 0; i < gradientWorkers_Array.length; i++) {
        if(gradientWorkers_Array[i]!=undefined)
          gradientWorkers_Array[i].terminate();
      }

      allGradientWorkersFinished=true;
    }
    startGradientFieldGeneration();
  }

  //// Frequency /////////////////////////////////
  if(document.getElementById("id_CCCTest_DoFrequency").checked){
    if(allFrequencyWorkersFinished=false){
      for (var i = 0; i < frequencyWorkers_Array.length; i++) {
        if(frequencyWorkers_Array[i]!=undefined)
          frequencyWorkers_Array[i].terminate();
      }

      allFrequencyWorkersFinished=true;
    }
    startFrequencyFieldGeneration();
  }


  //////////////////////////////////////////////

}

function checkIfGenerationFinished(){

  if(document.getElementById("id_CCCTest_DoJump").checked && allJumpsFinished!=true)
    return;

  if(document.getElementById("id_CCCTest_DoGradient").checked && allGradientFinished!=true)
    return;

  if(document.getElementById("id_CCCTest_DoFrequency").checked && allFrequencyFinished!=true)
    return;


  /////////////////// fill field combo
  var selectobject = document.getElementById("id_CCCTest_FieldType_Select");
  var oldselectedIndex = selectobject.selectedIndex;


  if(document.getElementById("id_CCCTest_DoJump").checked){
    document.getElementById("id_CCCTest_FieldOption_Jump").disabled=false;
  }
  else{
    document.getElementById("id_CCCTest_FieldOption_Jump").disabled=true;
  }

  if(document.getElementById("id_CCCTest_DoGradient").checked){
    document.getElementById("id_CCCTest_FieldOption_Gradient").disabled=false;
  }
  else{
    document.getElementById("id_CCCTest_FieldOption_Gradient").disabled=true;
  }

  if(document.getElementById("id_CCCTest_DoFrequency").checked){
    document.getElementById("id_CCCTest_FieldOption_Frequency").disabled=false;
  }
  else{
    document.getElementById("id_CCCTest_FieldOption_Frequency").disabled=true;
  }



  var newSelectedIndex = -1;

  if (oldselectedIndex>-1)
    if(selectobject.children[oldselectedIndex].disabled==false)
      newSelectedIndex = oldselectedIndex;


  if(newSelectedIndex==-1){
    for (var i = 0; i < selectobject.children.length; i++) {
      if(selectobject.children[i].disabled==false){
        newSelectedIndex=i;
        break;
      }
    }
  }
  selectobject.selectedIndex =  newSelectedIndex;
  selectCCCTestFieldType();
}



function selectCCCTestFieldType(){

  if(document.getElementById("id_CCCTest_FieldType_Select").selectedIndex == -1){

    var children = document.getElementById("id_CCCTest_FieldType_Select").children;
    var allDisabled = true;
    for (var i = 0; i < children.length; i++) {
      if(children[i].disabled==false){
        document.getElementById("id_CCCTest_FieldType_Select").selectedIndex=i;
        break;
      }
    }
    if(allDisabled)
      return;
  }

  var selectobject=document.getElementById("id_CCCTest_Field_Select")
  for (var i=selectobject.length-1; i>=0; i--){
     selectobject.remove(i);
  }


  switch (document.getElementById("id_CCCTest_FieldType_Select").selectedIndex) {
    case 0: // jumps
      for (var i = 0; i < jumpTestFields_Array.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = jumpTestFields_Names[i];

        selectobject.add(option);
      }
      selectobject.selectedIndex = 0;
      selectCCCTestField(false);
    break;
    case 1: // gradient
      for (var i = 0; i < gradientTestFields_Array.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = gradientTestFields_Names[i];

        selectobject.add(option);
      }
      selectobject.selectedIndex = 0;
      selectCCCTestField(false);
    break;

    case 3: // frequency
      for (var i = 0; i < frequencyTestFields_Array.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = frequencyTestFields_Names[i];

        selectobject.add(option);
      }
      selectobject.selectedIndex = 0;
      selectCCCTestField(false);
    break;

    default:

  }


}


function selectCCCTestField(doFullWindow){

  switch (document.getElementById("id_CCCTest_FieldType_Select").selectedIndex) {
    case 0: // Jumps
        if(doFullWindow)
          drawTestField(jumpTestFields_Array[document.getElementById("id_CCCTest_Field_Select").selectedIndex],"id_PopUp_FullTestFuctionCanvas");
        else
          drawTestField(jumpTestFields_Array[document.getElementById("id_CCCTest_Field_Select").selectedIndex],"id_CCCTestCanvas");
      break;

      case 1: // Gradient
          if(doFullWindow)
            drawTestField(gradientTestFields_Array[document.getElementById("id_CCCTest_Field_Select").selectedIndex],"id_PopUp_FullTestFuctionCanvas");
          else
            drawTestField(gradientTestFields_Array[document.getElementById("id_CCCTest_Field_Select").selectedIndex],"id_CCCTestCanvas");
        break;
      case 3: // Frequency
            if(doFullWindow)
              drawTestField(frequencyTestFields_Array[document.getElementById("id_CCCTest_Field_Select").selectedIndex],"id_PopUp_FullTestFuctionCanvas");
            else
              drawTestField(frequencyTestFields_Array[document.getElementById("id_CCCTest_Field_Select").selectedIndex],"id_CCCTestCanvas");
          break;
    default:

  }

}
