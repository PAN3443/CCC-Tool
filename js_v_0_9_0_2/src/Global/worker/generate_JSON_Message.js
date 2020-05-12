

function json_message_colorblindSimInfo(){
  var workerJSON = {};
  workerJSON['message'] = "colorSimSettings";
  workerJSON['doColorblindnessSim'] = doColorblindnessSim;
  workerJSON['tmXYZ_Selected'] = tmXYZ_Selected;
  workerJSON['tmXYZ_Selected_Inv'] = tmXYZ_Selected_Inv;
  workerJSON['tmLMS_Selected'] = tmLMS_Selected;
  workerJSON['tmLMS_Selected_Inv'] = tmLMS_Selected_Inv;
  workerJSON['sim_AdaptiveColorblindness'] = sim_AdaptiveColorblindness;
  return workerJSON;
}

function json_message_colorSettingsInfo(){
  var workerJSON = {};
  workerJSON['message'] = "colorSettings";
  workerJSON['din99_kE'] = din99_kE;
  workerJSON['din99_kCH'] = din99_kCH;
  workerJSON['cielab_ref_X'] = cielab_ref_X;
  workerJSON['cielab_ref_Y'] = cielab_ref_Y;
  workerJSON['cielab_ref_Z'] = cielab_ref_Z;
  return workerJSON;
}

function json_message_metricInfo(){
  var workerJSON = {};
  workerJSON['message'] = "colorMetrics";
  // 2000
  workerJSON['de2000_k_L'] = de2000_k_L;
  workerJSON['de2000_k_C'] = de2000_k_C;
  workerJSON['de2000_k_H'] = de2000_k_H;
  // 94
  workerJSON['de94_k_L'] = de94_k_L;
  workerJSON['de94_k_C'] = de94_k_C;
  workerJSON['de94_k_H'] = de94_k_H;
  workerJSON['de94_k_1'] = de94_k_1;
  workerJSON['de94_k_2'] = de94_k_2;
  return workerJSON;
}

function json_message_sendCMS(cmsInfoPackage){

    var workerJSON = {};
    workerJSON['message'] = "undefined";

    if(cmsInfoPackage==undefined)
      return workerJSON;

    workerJSON.message = "updateMainCMS";
    workerJSON['cmsInfoPackage'] = cmsInfoPackage;
    workerJSON['interpolationType'] = cms.getInterpolationType();

    return workerJSON;
}
