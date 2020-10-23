class class_Edit_CBSim_Section extends class_Edit_Basis_Section {

  constructor() {
    super('id_CBSimPage');
    this.cmsCanvasID = 'id_cbSim_CMS_Canvas';
    this.cmsOrigCanvasID = 'id_cbSim_OriginalCMS_Canvas';
    this.cmsNameID = 'id_cbSim_cms_name';
    this.cmsInterpolationID = 'id_cbSim_cms_interpolation';
    this.cmsNaNColorID = 'id_cbSim_cms_NaN';
    this.cmsAboveID = 'id_cbSim_cms_Below';
    this.cmsBelowID = 'id_cbSim_cms_Above';

    /// Part: Pathplot
    this.part_Pathplot.partDivID="id_cbSim_PathplotContainer";
    this.part_Pathplot.pathPlot_CoordID="id_cbSim_PathplotCoord";
    this.part_Pathplot.pathPlot_Width_VW=30;
    this.part_Pathplot.pathPlot_Height_VH=90;
    //this.part_Pathplot.partIsReady=true;
    /// Part: Analysis
    this.part_Analysis.partDivID="id_cbSim_AnalysisContainer";
    this.part_Analysis.optionRowID="id_cbSim_AnalysisOptions";
    this.part_Analysis.selectTypeID="id_cbSim_SelectAnalysisType";
    this.part_Analysis.analysis_Width_VW=45;
    this.part_Analysis.analysis_Height_VH=60;

    this.somethingChanged=false;

    this.cbType=undefined;

    /////
    gWorkColor1.setColorInfo(["rgb",1, 1, 1]);
    this.lmsWhiteOrigin =  gWorkColor1.getColorInfo("lms");
    gWorkColor1.setColorInfo(["rgb",0, 0, 1]);
    this.lmsBluePrimary =  gWorkColor1.getColorInfo("lms");
    gWorkColor1.setColorInfo(["rgb",1, 0, 0]);
    this.lmsRedPrimary =  gWorkColor1.getColorInfo("lms");

  }

  updateSection(){
    super.updateSection();
  }

  hideSection(){
    doColorblindnessSim = false;
    super.hideSection();
    this.part_Pathplot.pp_3D_StopAnimation();
  }

  showSection(){

    if(editSection.editCMS.getKeyLength()<2){
      openAlert("Your CMS is empty and can't be analyzed for colorblindness!");
      return;
    }

    var editPackage = editSection.editCMS.createCMSInfoPackage();
    this.editCMS.setCMSFromPackage(editPackage);
    editSection.editCMS.drawCMS_Horizontal(this.cmsOrigCanvasID)

    this.updateElements_CMS_Ref();
    doColorblindnessSim = true;

    super.showSection();
    //this.part_Pathplot.pp_3D_StartAnimation();
    document.getElementById("id_cbSim_SelectCBType").selectedIndex=0;
    this.changeCBType();
    this.part_Pathplot.pp_3D_StartAnimation();
    this.part_Pathplot.changePathPlotSpace();
    this.part_Analysis.stylePart();

  }

  saveCreateProcess(){
      this.somethingChanged=true;
      document.getElementById("id_cbSim_editWarning").style.visibility="visible";
  }

  reset(){
    if(this.somethingChanged){
      var editPackage = editSection.editCMS.createCMSInfoPackage();
      this.editCMS.setCMSFromPackage(editPackage);
      this.somethingChanged=false;
      document.getElementById("id_cbSim_editWarning").style.visibility="hidden";
      this.updateSection();
    }
  }

  acceptAndReplace(){
    editSection.editCMS.setCMSFromPackage(this.editCMS.createCMSInfoPackage());
    editSection.saveCreateProcess();

    editSection.showSection();
  }


  changeCBType(){

    document.getElementById("id_cbSim_Anomalous_Trichomacy").style.display="none";
    document.getElementById("id_cbSim_Monochromatic").style.display="none";
    document.getElementById("id_cbSim_Monochromatic").style.display="none";

    switch (document.getElementById("id_cbSim_SelectCBType").selectedIndex) {
      case 0:
        document.getElementById("id_cbSim_Anomalous_Trichomacy").style.display="flex";
        document.getElementById("id_cbSim_Protanomaly_InputDegree").value=0;
        this.activateCB("Protanomaly");
      break;
      case 1:
        document.getElementById("id_cbSim_Monochromatic").style.display="flex";
      break;
      case 2:
        document.getElementById("id_cbSim_Monochromatic").style.display="flex";
      break;

    }
  }

  activateCB(type){

    document.getElementById("id_cbSim_Protanomaly_Degree").innerHTML="0%";
    document.getElementById("id_cbSim_Deuteranomaly_Degree").innerHTML="0%";
    document.getElementById("id_cbSim_Tritanomaly_Degree").innerHTML="0%";

    document.getElementById("ProtanopiaLabel").style.visibility="hidden";
    document.getElementById("DeuteranopiaLabel").style.visibility="hidden";
    document.getElementById("TritanopiaLabel").style.visibility="hidden";

    sim_AdaptiveColorblindness = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];

    switch (type) {
      case "Protanomaly":
        var degree = document.getElementById("id_cbSim_Protanomaly_InputDegree").value;
        document.getElementById("id_cbSim_Deuteranomaly_InputDegree").value=0;
        document.getElementById("id_cbSim_Tritanomaly_InputDegree").value=0;
        document.getElementById("id_cbSim_Protanomaly_Degree").innerHTML=degree+"%";

        if(degree==0)
          break;
        if(degree==100)
          document.getElementById("ProtanopiaLabel").style.visibility="visible";

          var degreeOFColorblindness = degree/100;

          //// Calc Protanopia
          //
          //  [ 0 a b ][l]    [a*m+b*s]
          //  [ 0 1 0 ][m]  = [m]
          //  [ 0 0 1 ][s]    [s]
          //
          //  L_blue =  a*M_blue + b*S_blue
          //  L_white =  a*M_white + b*S_white
          //
          //  a = (L_blue*S_white-L_white*S_blue)/(M_blue*S_white-M_white*S_blue);
          //  b = (L_blue*M_white-L_white*M_blue)/(S_blue*M_white-S_white*M_blue);
          var a = (this.lmsBluePrimary[1] * this.lmsWhiteOrigin[3] - this.lmsWhiteOrigin[1] * this.lmsBluePrimary[3]) / (this.lmsBluePrimary[2] * this.lmsWhiteOrigin[3] - this.lmsWhiteOrigin[2] * this.lmsBluePrimary[3]); // new a value
          var b = (this.lmsBluePrimary[1] * this.lmsWhiteOrigin[2] - this.lmsWhiteOrigin[1] * this.lmsBluePrimary[2]) / (this.lmsBluePrimary[3] * this.lmsWhiteOrigin[2] - this.lmsWhiteOrigin[3] * this.lmsBluePrimary[2]);; // new b value
          sim_AdaptiveColorblindness = [
            [1 - degreeOFColorblindness, a * degreeOFColorblindness, b * degreeOFColorblindness],
            [0, 1, 0],
            [0, 0, 1]
          ];

          /*document.getElementById("inputCBTransferMatrix00").value = "1-" + degreeOFColorblindness;
          document.getElementById("inputCBTransferMatrix01").value = degreeOFColorblindness + "*" + a.toFixed(5);
          document.getElementById("inputCBTransferMatrix02").value = degreeOFColorblindness + "*" + b.toFixed(5);

          document.getElementById("inputCBTransferMatrix10").value = "0";
          document.getElementById("inputCBTransferMatrix11").value = "1";
          document.getElementById("inputCBTransferMatrix12").value = "0";

          document.getElementById("inputCBTransferMatrix20").value = "0";
          document.getElementById("inputCBTransferMatrix21").value = "0";
          document.getElementById("inputCBTransferMatrix22").value = "1";*/

      break;
      case "Deuteranomaly":
        var degree = document.getElementById("id_cbSim_Deuteranomaly_InputDegree").value;
        document.getElementById("id_cbSim_Protanomaly_InputDegree").value=0;
        document.getElementById("id_cbSim_Deuteranomaly_Degree").innerHTML=degree+"%";
        document.getElementById("id_cbSim_Tritanomaly_InputDegree").value=0;

        if(degree==0)
          break;
        if(degree==100)
          document.getElementById("DeuteranopiaLabel").style.visibility="visible";

          var degreeOFColorblindness = degree/100;

          //// Calc Deuteranopia
          //
          //  [ 1 0 0 ][l]    [l]
          //  [ a 0 b ][m]  = [a*l+b*s]
          //  [ 0 0 1 ][s]    [s]
          //
          //  M_blue =  a*L_blue + b*S_blue
          //  M_white =  a*L_white + b*S_white
          //
          //  a = (M_blue*S_white-M_white*S_blue)/(L_blue*S_white-L_white*S_blue);
          //  b = (M_blue*L_white-M_white*L_blue)/(S_blue*L_white-S_white*L_blue);

          var a = (this.lmsBluePrimary[2] * this.lmsWhiteOrigin[3] - this.lmsWhiteOrigin[2] * this.lmsBluePrimary[3]) / (this.lmsBluePrimary[1] * this.lmsWhiteOrigin[3] - this.lmsWhiteOrigin[1] * this.lmsBluePrimary[3]); // new a value
          var b = (this.lmsBluePrimary[2] * this.lmsWhiteOrigin[1] - this.lmsWhiteOrigin[2] * this.lmsBluePrimary[1]) / (this.lmsBluePrimary[3] * this.lmsWhiteOrigin[1] - this.lmsWhiteOrigin[3] * this.lmsBluePrimary[1]);; // new b value

          sim_AdaptiveColorblindness = [
            [1, 0, 0],
            [a * degreeOFColorblindness, 1 - degreeOFColorblindness, b * degreeOFColorblindness],
            [0, 0, 1]
          ];

          /*document.getElementById("inputCBTransferMatrix00").value = "1";
          document.getElementById("inputCBTransferMatrix01").value = "0";
          document.getElementById("inputCBTransferMatrix02").value = "0";

          document.getElementById("inputCBTransferMatrix10").value = degreeOFColorblindness + "*" + a.toFixed(5);
          document.getElementById("inputCBTransferMatrix11").value = "1-" + degreeOFColorblindness;
          document.getElementById("inputCBTransferMatrix12").value = degreeOFColorblindness + "*" + b.toFixed(5);

          document.getElementById("inputCBTransferMatrix20").value = "0";
          document.getElementById("inputCBTransferMatrix21").value = "0";
          document.getElementById("inputCBTransferMatrix22").value = "1";*/

      break;
      case "Tritanomaly":
        var degree = document.getElementById("id_cbSim_Tritanomaly_InputDegree").value;
        document.getElementById("id_cbSim_Protanomaly_InputDegree").value=0;
        document.getElementById("id_cbSim_Deuteranomaly_InputDegree").value=0;
        document.getElementById("id_cbSim_Tritanomaly_Degree").innerHTML=degree+"%";

        var degreeOFColorblindness = degree/100;

        if(degree==0)
          break;
        if(degree==100)
          document.getElementById("TritanopiaLabel").style.visibility="visible";

          //// Calc Tritanopes
          //
          //  [ 1 0 0 ][l]    [l]
          //  [ 0 1 0 ][m]  = [m]
          //  [ a b 0 ][s]    [a*l+b*M]
          //
          //  S_red =  a*L_red + b*M_red
          //  S_white =  a*L_white + b*M_white
          //
          //  a = (S_red*M_white-S_white*M_red)/(L_red*M_white-L_white*M_red);
          //  b = (S_red*L_white-S_white*L_red)/(M_red*L_white-M_white*L_red);

          var a = (this.lmsRedPrimary[3] * this.lmsWhiteOrigin[2] - this.lmsWhiteOrigin[3] * this.lmsRedPrimary[2]) / (this.lmsRedPrimary[1] * this.lmsWhiteOrigin[2] - this.lmsWhiteOrigin[1] * this.lmsRedPrimary[2]); // new a value
          var b = (this.lmsRedPrimary[3] * this.lmsWhiteOrigin[1] - this.lmsWhiteOrigin[3] * this.lmsRedPrimary[1]) / (this.lmsRedPrimary[2] * this.lmsWhiteOrigin[1] - this.lmsWhiteOrigin[2] * this.lmsRedPrimary[1]);; // new b value

          sim_AdaptiveColorblindness = [
            [1, 0, 0],
            [0, 1, 0],
            [a * degreeOFColorblindness, b * degreeOFColorblindness, 1 - degreeOFColorblindness]
          ];

          /*document.getElementById("inputCBTransferMatrix00").value = "1";
          document.getElementById("inputCBTransferMatrix01").value = "0";
          document.getElementById("inputCBTransferMatrix02").value = "0";

          document.getElementById("inputCBTransferMatrix10").value = "0";
          document.getElementById("inputCBTransferMatrix11").value = "1";
          document.getElementById("inputCBTransferMatrix12").value = "0";

          document.getElementById("inputCBTransferMatrix20").value = degreeOFColorblindness + "*" + a.toFixed(5);
          document.getElementById("inputCBTransferMatrix21").value = degreeOFColorblindness + "*" + b.toFixed(5);
          document.getElementById("inputCBTransferMatrix22").value = "1-" + degreeOFColorblindness;*/

      break;

    }
  /*console.log("----------------------------------------------------------------------------------");
    console.log(sim_AdaptiveColorblindness[0][0],sim_AdaptiveColorblindness[0][1],sim_AdaptiveColorblindness[0][2]);
    console.log(sim_AdaptiveColorblindness[1][0],sim_AdaptiveColorblindness[1][1],sim_AdaptiveColorblindness[1][2]);
    console.log(sim_AdaptiveColorblindness[2][0],sim_AdaptiveColorblindness[2][1],sim_AdaptiveColorblindness[2][2]);
    console.log("----------------------------------------------------------------------------------");*/
    this.updateTransformationMatrices();
    this.updateSection();
  }

};
