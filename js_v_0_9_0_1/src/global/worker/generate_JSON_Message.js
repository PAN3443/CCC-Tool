

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

function json_message_sendCMS(cms){

    var workerJSON = {};
    workerJSON['message'] = "undefined";

    if(cms==undefined)
      return workerJSON;

    workerJSON.message = "globalCMS";

    workerJSON['interpolationSpace'] = cms.getInterpolationSpace();
    workerJSON['interpolationType'] = cms.getInterpolationType();
    workerJSON['refVal'] = [];
    workerJSON['key1cVal1'] = [];
    workerJSON['key1cVal2'] = [];
    workerJSON['key1cVal3'] = [];
    workerJSON['key2cVal1'] = [];
    workerJSON['key2cVal2'] = [];
    workerJSON['key2cVal3'] = [];
    workerJSON['MoT'] = [];

    workerJSON['nanC1'] = undefined;
    workerJSON['nanC2'] = undefined;
    workerJSON['nanC3'] = undefined;

    workerJSON['aboveC1'] = undefined;
    workerJSON['aboveC2'] = undefined;
    workerJSON['aboveC3'] = undefined;

    workerJSON['belowC1'] = undefined;
    workerJSON['belowC2'] = undefined;
    workerJSON['belowC3'] = undefined;


    var tmpRefVal = [];
    var tmpkey1CVal1 = [];
    var tmpkey1CVal2 = [];
    var tmpkey1CVal3 = [];
    var tmpkey2CVal1 = [];
    var tmpkey2CVal2 = [];
    var tmpkey2CVal3 = [];
    var tmpMoT = [];

    if(cms.getKeyLength()>0){

      for (var i = 0; i < cms.getKeyLength(); i++) {

        tmpRefVal.push(cms.getKey(i).getRefPosition());
        var color2=cms.getKey(i).getRightKeyColor("lab");
        var color1=cms.getKey(i).getLeftKeyColor("lab");

        if(color1!=undefined){
          tmpkey1CVal1.push(color1.get1Value());
          tmpkey1CVal2.push(color1.get2Value());
          tmpkey1CVal3.push(color1.get3Value());
        }
        else{
          tmpkey1CVal1.push(undefined);
          tmpkey1CVal2.push(undefined);
          tmpkey1CVal3.push(undefined);
        }

        if(color2!=undefined){
          tmpkey2CVal1.push(color2.get1Value());
          tmpkey2CVal2.push(color2.get2Value());
          tmpkey2CVal3.push(color2.get3Value());
        }
        else{
          tmpkey2CVal1.push(undefined);
          tmpkey2CVal2.push(undefined);
          tmpkey2CVal3.push(undefined);
        }

        tmpMoT.push(cms.getKey(i).getMoT());
      }

      //tmpRefVal.push(cms.getKey(cms.getKeyLength()-1).getRefPosition());
      //tmpMoT.push(cms.getKey(cms.getKeyLength()-1).getMoT());
    }


    var tmpNaN = cms.getNaNColor("lab");
    var tmpAbove = cms.getAboveColor("lab");
    var tmpBelow = cms.getBelowColor("lab");

      workerJSON.colorspace = cms.getInterpolationSpace();
      workerJSON.refVal=tmpRefVal;
      workerJSON.key1cVal1=tmpkey1CVal1;
      workerJSON.key1cVal2=tmpkey1CVal2;
      workerJSON.key1cVal3=tmpkey1CVal3;
      workerJSON.key2cVal1=tmpkey2CVal1;
      workerJSON.key2cVal2=tmpkey2CVal2;
      workerJSON.key2cVal3=tmpkey2CVal3;
      workerJSON.MoT = tmpMoT;

      workerJSON.nanC1 = tmpNaN.get1Value();
      workerJSON.nanC2 = tmpNaN.get2Value();
      workerJSON.nanC3 = tmpNaN.get3Value();

      workerJSON.aboveC1 = tmpAbove.get1Value();
      workerJSON.aboveC2 = tmpAbove.get2Value();
      workerJSON.aboveC3 = tmpAbove.get3Value();

      workerJSON.belowC1 = tmpBelow.get1Value();
      workerJSON.belowC2 = tmpBelow.get2Value();
      workerJSON.belowC3 = tmpBelow.get3Value();

    cms.deleteReferences();
    return workerJSON;
}
