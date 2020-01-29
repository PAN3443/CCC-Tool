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


    case "globalCMS":

      if(globalCMS1==undefined)
        break;

      globalCMS1.clear();
      globalCMS1.setPreventIntervals(true);

      globalCMS1.setInterpolationSpace(json.interpolationSpace);
      globalCMS1.setInterpolationType(json.interpolationType);



      if(json.nanC1!=undefined && json.nanC2!=undefined && json.nanC3!=undefined)
        globalCMS1.setNaNColor(new class_Color_LAB(json.nanC1,json.nanC2,json.nanC3));

      if(json.aboveC1!=undefined && json.aboveC2!=undefined && json.aboveC3!=undefined)
        globalCMS1.setAboveColor(new class_Color_LAB(json.aboveC1,json.aboveC2,json.aboveC3));

      if(json.belowC1!=undefined && json.belowC2!=undefined && json.belowC3!=undefined)
        globalCMS1.setBelowColor(new class_Color_LAB(json.belowC1,json.belowC2,json.belowC3));

      for (var i = 0; i < json.refVal.length; i++) {

        var colorL = undefined;
        var colorR = undefined;

        if(json.key1cVal1[i]!=undefined && json.key1cVal2[i]!=undefined && json.key1cVal3[i]!=undefined)
          colorL = new class_Color_LAB(json.key1cVal1[i],json.key1cVal2[i],json.key1cVal3[i]);

        if(json.key2cVal1[i]!=undefined && json.key2cVal2[i]!=undefined && json.key2cVal3[i]!=undefined)
          colorR = new class_Color_LAB(json.key2cVal1[i],json.key2cVal2[i],json.key2cVal3[i]);

        var tmpKey = new class_Key(colorL, colorR, json.refVal[i], false);
        tmpKey.setMoT(json.MoT[i]);

        globalCMS1.pushKey(tmpKey);

      }
      globalCMS1.setPreventIntervals(false);

    break;

  }
}
