
function changeOpimizationMode(){

  if(editPage_optimizationMode){
    editPage_optimizationMode=false;
    document.getElementById("id_EditPage_OptimizationModeButton").classList.remove("class_EditPage_EditButtonActive");
    document.getElementById("id_EditPage_OptimizationModeButton").classList.add("class_EditPage_EditButton");
    document.getElementById("id_header_OptimizationModus").style.visibility = "hidden";
  }
  else {

    editPage_optimizationMode=true;
    document.getElementById("id_EditPage_OptimizationModeButton").classList.remove("class_EditPage_EditButton");
    document.getElementById("id_EditPage_OptimizationModeButton").classList.add("class_EditPage_EditButtonActive");
    document.getElementById("id_header_OptimizationModus").style.visibility = "visible";
  }

}
