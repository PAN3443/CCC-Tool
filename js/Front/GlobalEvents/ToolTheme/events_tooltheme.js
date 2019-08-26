
function drawThemes(){

  document.getElementById("id_dropDownContainerTheme").innerHTML = [];

  for (var i = 0; i < cccTool_Themes.length; i++) {

    var tmpSelection = document.createElement('div');
    tmpSelection.className = "class_Theme_Selector";
    tmpSelection.title = cccTool_Themes[i][0][1];

    if(i==currentTheme){
      tmpSelection.style.border = "0.2vh solid var(--general-active-color)";
    }

    tmpSelection.onclick = (function(tmpID) {
      return function() {
        setToolTheme(tmpID);
      };
    })(i);

    var tmpContainer = document.createElement('div');
    tmpContainer.className = "class_Theme_Container";

    var tmpResColor1 = document.createElement('div');
    tmpResColor1.style.height = "100%";
    tmpResColor1.style.width = "100%";
    tmpResColor1.style.background = cccTool_Themes[i][1][1];
    tmpContainer.appendChild(tmpResColor1);

    var tmpResColor2 = document.createElement('div');
    tmpResColor2.style.height = "100%";
    tmpResColor2.style.width = "100%";
    tmpResColor2.style.background = cccTool_Themes[i][2][1];
    tmpContainer.appendChild(tmpResColor2);

    var tmpResColor3 = document.createElement('div');
    tmpResColor3.style.height = "100%";
    tmpResColor3.style.width = "100%";
    tmpResColor3.style.background = cccTool_Themes[i][3][1];
    tmpContainer.appendChild(tmpResColor3);

    var tmpResColor4 = document.createElement('div');
    tmpResColor4.style.height = "100%";
    tmpResColor4.style.width = "100%";
    tmpResColor4.style.background = cccTool_Themes[i][4][1];
    tmpContainer.appendChild(tmpResColor4);

    tmpSelection.appendChild(tmpContainer);
    document.getElementById("id_dropDownContainerTheme").appendChild(tmpSelection);

  }


}


function setToolTheme(theme){
  currentTheme=theme;
  let root = document.documentElement;
  for (var i = 5; i < cccTool_Themes[theme].length; i++) {
   root.style.setProperty(cccTool_Themes[theme][i][0], cccTool_Themes[theme][i][1]);
  }
  drawThemes();

  if (document.getElementById("id_EditPage").style.display != "none"){

    updateEditColormapVis();

     if(document.getElementById("id_EditPage_Edit_Path").style.display != "none") {
      switch (pathColorspace) {
        case "rgb":
          rgbMesh();
          drawcolormap_RGBSpace(true, true);
          break;
        default:

          drawcolormap_hueSpace(true, true, true);
          switch (pathColorspace) {

            case "hsv":
              hsvMesh();
              break;
            case "lab":
              labMesh();
              break;
            case "din99":
              din99Mesh();
              break;
            case "lch":
              lchMesh();
              break;
          }
      }
    }
  }
}
