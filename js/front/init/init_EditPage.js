

function init_events_EditPage(){

  var sketchElement = document.getElementById('id_EditPage_CMS_VIS_ColormapSketch');
  sketchElement.addEventListener("dragenter", bandOnEnter);
  sketchElement.addEventListener("dragleave", bandOnLeave);
  //sketchElement.addEventListener("drop dragdrop", createSide_BandOnDrop);

  sketchElement.addEventListener("mousemove", sketch_MouseMove);
  sketchElement.addEventListener("click", sketch_MouseClick);

  sketchElement.ondrop = function(event) {
    event.preventDefault();
    bandOnDrop();
  }; // allow Drop


  sketchElement.ondragover = function(event) {
    event.preventDefault();

    event = event || window.event;
    //var dragX = event.pageX, dragY = event.pageY;

    var rect = event.target.getBoundingClientRect();
    var canvasPosX = event.clientX - rect.left;
    //var canvasPosY = event.clientY - rect.top;
    var ratioToColorspaceResolutionX = event.target.width / rect.width;
    //var ratioToColorspaceResolutionY = event.target.height / rect.height;
    mousePosX = canvasPosX * ratioToColorspaceResolutionX;
    //mousePosY = canvasPosY * ratioToColorspaceResolutionY;

    if (globalCMS1.getKeyLength() == 0) {
      indexOfDroppedPlace = 0;
      return;
    }

    for (var i = 0; i < dropRects.length; i++) {
      if (mousePosX >= dropRects[i] && mousePosX <= dropRects[i] + bandSketchObjLength) {
        if (indexOfDroppedPlace != i) {
          indexOfDroppedPlace = i;
          drawBandSketch(globalCMS1, "id_EditPage_CMS_VIS_ColormapSketch",  true, i);
        }
        return;
      }
    }
    indexOfDroppedPlace = -1;

  }; // allow Drop


  document.getElementById('id_editPage_customConstBand').addEventListener("dragstart", bandOnDragStart);
  document.getElementById('id_editPage_customConstBand').addEventListener("dragend", bandOnDragEnd);
  document.getElementById('id_editPage_customScaleBand').addEventListener("dragstart", bandOnDragStart);
  document.getElementById('id_editPage_customScaleBand').addEventListener("dragend", bandOnDragEnd);


  // Ref Change Key Rects
  document.getElementById('id_EditPage_CMS_VIS_LinearKeys').addEventListener("mouseenter", mouseEnterKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_LinearKeys').addEventListener("mouseleave", mouseLeaveKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_LinearKeys').addEventListener("mousemove", mouseMoveKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_LinearKeys').addEventListener("mousedown", mouseDownKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_LinearKeys').addEventListener("mouseup", mouseUpKeyRef);

  document.getElementById('id_EditPage_CMS_VIS_KeyBurs').addEventListener("mouseenter", mouseEnterKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_KeyBurs').addEventListener("mouseleave", mouseLeaveKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_KeyBurs').addEventListener("mousemove", mouseMoveKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_KeyBurs').addEventListener("mousedown", mouseDownKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_KeyBurs').addEventListener("mouseup", mouseUpKeyRef);


  document.getElementById('id_editPage_CMSDescription').addEventListener("change", updateDescription);
  document.getElementById('id_EditPage_CMSName').addEventListener("change", updateColormapName);

  limitKeyBurLine=true;

  document.getElementById('id_editPage_OrderPredefinedLabel').addEventListener("click", activateDropdown);
  document.getElementById('id_EditPage_PathPlotSpaces_Label').addEventListener("click", activateDropdown);

  initRGB3D();

  document.getElementById('id_EditPage_PathPlot_3D_Div').addEventListener("mousemove", eventRGB3D_mousemove);
  document.getElementById('id_EditPage_PathPlot_3D_Div').addEventListener("mouseleave", eventRGB3D_mouseleave);
  document.getElementById('id_EditPage_PathPlot_3D_Div').addEventListener("mousedown", eventRGB3D_mousedown);
  document.getElementById('id_EditPage_PathPlot_3D_Div').addEventListener("mouseup", eventRGB3D_mouseup);


  // Edit Keys
    document.getElementById('id_EditPage_EditKey_List').addEventListener("click", selectKey);
    document.getElementById('id_editPage_BurKeyTrue').addEventListener("change", changeKeyBurStatus);
    document.getElementById('id_editPage_BurKeyFalse').addEventListener("change", changeKeyBurStatus);
    document.getElementById('id_EditPage_EditKey_SetReference').addEventListener("change", editPage_ChangeReference);

    document.getElementById('id_editPage_KeyTypeNil').addEventListener("change", changeKeyType);
    document.getElementById('id_editPage_KeyTypeTwin').addEventListener("change", changeKeyType);
    document.getElementById('id_editPage_KeyTypeLeft').addEventListener("change", changeKeyType);
    document.getElementById('id_editPage_KeyTypeRight').addEventListener("change", changeKeyType);
    document.getElementById('id_editPage_KeyTypeDual').addEventListener("change", changeKeyType);

    document.getElementById('id_EditPage_HelpButton_DrawnKey').addEventListener("mouseenter", showDrawnKeyHelp);
    document.getElementById('id_EditPage_HelpButton_DrawnKey').addEventListener("mouseleave", hideDrawnKeyHelp);



}
