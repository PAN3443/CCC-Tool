function init_events_PopUp_ColorPicker(){

  document.getElementById('id_EditPage_CMS_NaN_Color').addEventListener("click", openColorPicker);
  document.getElementById('id_EditPage_CMS_Below_Color').addEventListener("click", openColorPicker);
  document.getElementById('id_EditPage_CMS_Above_Color').addEventListener("click", openColorPicker);
  document.getElementById('id_editPage_customConstColor').addEventListener("click", openColorPicker);
  document.getElementById('id_editPage_customScaleColor1').addEventListener("click", openColorPicker);
  document.getElementById('id_editPage_customScaleColor2').addEventListener("click", openColorPicker);
  document.getElementById('id_inputEditProbeColor').addEventListener("click", openColorPicker);
  document.getElementById('id_inputProbeColor').addEventListener("click", openColorPicker);

  document.getElementById('id_popupWindow_Colorpicker_RG_B').addEventListener("click", changeColorpickerType);
  document.getElementById('id_popupWindow_Colorpicker_RB_G').addEventListener("click", changeColorpickerType);
  document.getElementById('id_popupWindow_Colorpicker_GB_R').addEventListener("click", changeColorpickerType);
  document.getElementById('id_popupWindow_Colorpicker_HS_V').addEventListener("click", changeColorpickerType);
  document.getElementById('id_popupWindow_Colorpicker_HV_S').addEventListener("click", changeColorpickerType);
  document.getElementById('id_popupWindow_Colorpicker_SV_H').addEventListener("click", changeColorpickerType);

  document.getElementById('id_popupWindow_Colorpicker_canvasPicker_circle').addEventListener("mousemove", event_colorpicker_MouseMove);
  document.getElementById('id_popupWindow_Colorpicker_canvasPicker_circle').addEventListener("click", event_colorpicker_MouseClick);

  document.getElementById('id_popupWindow_Colorpicker_canvasPicker2_bar').addEventListener("mousemove", event_colorpicker_MouseMove);
  document.getElementById('id_popupWindow_Colorpicker_canvasPicker2_bar').addEventListener("click", event_colorpicker_MouseClick);

  document.getElementById('id_popupWindow_Colorpicker_Input1').addEventListener("change", changeColorPickerInput);
  document.getElementById('id_popupWindow_Colorpicker_Input2').addEventListener("change", changeColorPickerInput);
  document.getElementById('id_popupWindow_Colorpicker_Input3').addEventListener("change", changeColorPickerInput);


}

function init_ExportWindow(){

  document.getElementById('id_ExportIntervalNum').addEventListener("change", checkIntervalInputFieldsChange);
  document.getElementById('id_ExportIntervalNum').addEventListener("keyup", checkIntervalInputFieldsKey);
}
