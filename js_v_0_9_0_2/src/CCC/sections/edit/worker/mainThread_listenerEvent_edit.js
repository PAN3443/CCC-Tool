function workerEvent_EditSection(e) {
  switch (e.data.type) {
    case "singleUpdate":

    switch (true) {
      case editSection.isSectionOpen():
      //document.getElementById('id_edit_cms_SetName').value = this.editCMS.getColormapName();+
        document.getElementById("id_edit_cms_SetName").value = e.data.name;
        document.getElementById(editSection.cmsNaNColorID).style.background = e.data.nan;
        document.getElementById(editSection.cmsAboveID).style.background = e.data.above;
        document.getElementById(editSection.cmsBelowID).style.background = e.data.below;

        for (var i = 0; i < document.getElementById("id_EditPage_SelectInterpolationSpace").options.length; i++) {
          if(document.getElementById("id_EditPage_SelectInterpolationSpace").options[i].value===e.data.interSpace){
            document.getElementById("id_EditPage_SelectInterpolationSpace").selectedIndex=i;
          }
        }

        document.getElementById("id_edit_SetTypeLinear").style.background = "var(--main-coloredButton_Dark)";
        document.getElementById("id_edit_SetTypeSpline").style.background = "var(--main-coloredButton_Dark)";
        switch (e.data.interType){
          case "linear":
            document.getElementById("id_edit_SetTypeLinear").style.background = "var(--main-active-coloredButton_Dark)";
          break;
          case "spline":
            document.getElementById("id_edit_SetTypeSpline").style.background = "var(--main-active-coloredButton_Dark)";
          break;
        }
      break;
      case optiSection.isSectionOpen():
        document.getElementById(optiSection.cmsNameID).innerHTML = "Name: " + e.data.name;
        document.getElementById(optiSection.cmsInterpolationID).innerHTML = "Interpolation: " + e.data.interSpace + " (" + e.data.interType + ")";
        document.getElementById(optiSection.cmsNaNColorID).style.background = e.data.nan;
        document.getElementById(optiSection.cmsAboveID).style.background = e.data.above;
        document.getElementById(optiSection.cmsBelowID).style.background = e.data.below;
      break;
      case probeSection.isSectionOpen():
        document.getElementById(probeSection.cmsNameID).innerHTML = "Name: " + e.data.name;
        document.getElementById(probeSection.cmsInterpolationID).innerHTML = "Interpolation: " + e.data.interSpace + " (" + e.data.interType + ")";
        document.getElementById(probeSection.cmsNaNColorID).style.background = e.data.nan;
        document.getElementById(probeSection.cmsAboveID).style.background = e.data.above;
        document.getElementById(probeSection.cmsBelowID).style.background = e.data.below;
      break;
    }



    break;
  }
}
