

function generalJSON_Processing(json){

  switch (json.message) {
    case "canvas":
        canvas = json.canvas;
        canvasContex = canvas.getContext("2d");
    break;
    case "canvas2":
        canvas2 = json.canvas;
        canvasContex2 = canvas2.getContext("2d");
    break;
    case "general_parameter":
      labSpaceRange = json.labSpaceRange;
      rangeA99Neg = json.rangeA99Neg;
      rangeA99Pos = json.rangeA99Pos;
      rangeB99Neg = json.rangeB99Neg;
      rangeB99Pos = json.rangeB99Pos;
    break;
    case "colorSimSettings":
      doColorblindnessSim = json.doColorblindnessSim;
      tmXYZ_Selected = json.tmXYZ_Selected;
      tmXYZ_Selected_Inv = json.tmXYZ_Selected_Inv;
      tmLMS_Selected = json.tmLMS_Selected;
      tmLMS_Selected_Inv = json.tmLMS_Selected_Inv;
      sim_AdaptiveColorblindness = json.sim_AdaptiveColorblindness;
    break;
    case "colorSettings":
      din99_kE = json.din99_kE;
      din99_kCH = json.din99_kCH;
      cielab_ref_X = json.cielab_ref_X;
      cielab_ref_Y = json.cielab_ref_Y;
      cielab_ref_Z = json.cielab_ref_Z;
    break;
    case "colorMetrics":
      // 2000
      de2000_k_L = json.de2000_k_L;
      de2000_k_C = json.de2000_k_C;
      de2000_k_H = json.de2000_k_H;
      // 94
      de94_k_L = json.de94_k_L;
      de94_k_C = json.de94_k_C;
      de94_k_H = json.de94_k_H;
      de94_k_1 = json.de94_k_1;
      de94_k_2 = json.de94_k_2;
    break;
    case "updateMainCMS":
      if(mainCMS==undefined)
        break;
      mainCMS.setCMSFromPackage(json.cmsInfoPackage);
    break;

  }
}
