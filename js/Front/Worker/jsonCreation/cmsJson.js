function jsonAddCMSInfo(json){

  json['colorspace'] = globalCMS1.getInterpolationSpace();
  json['refVal'] = [];
  json['key1cVal1'] = [];
  json['key1cVal2'] = [];
  json['key1cVal3'] = [];
  json['key2cVal1'] = [];
  json['key2cVal2'] = [];
  json['key2cVal3'] = [];
  json['MoT'] = [];

  json['nanC1'] = undefined;
  json['nanC2'] = undefined;
  json['nanC3'] = undefined;

  json['aboveC1'] = undefined;
  json['aboveC2'] = undefined;
  json['aboveC3'] = undefined;

  json['belowC1'] = undefined;
  json['belowC2'] = undefined;
  json['belowC3'] = undefined;


  var tmpRefVal = [];
  var tmpkey1CVal1 = [];
  var tmpkey1CVal2 = [];
  var tmpkey1CVal3 = [];
  var tmpkey2CVal1 = [];
  var tmpkey2CVal2 = [];
  var tmpkey2CVal3 = [];
  var tmpMoT = [];


  for (var i = 0; i < globalCMS1.getKeyLength()-1; i++) {

    tmpRefVal.push(globalCMS1.getKey(i).getRefPosition());
    var color1=globalCMS1.getKey(i).getRightKeyColor(globalCMS1.getInterpolationSpace());
    var color2=globalCMS1.getKey(i+1).getLeftKeyColor(globalCMS1.getInterpolationSpace());

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

    tmpMoT.push(globalCMS1.getKey(i).getMoT());
  }
  tmpRefVal.push(globalCMS1.getKey(globalCMS1.getKeyLength()-1).getRefPosition());
  tmpMoT.push(globalCMS1.getKey(globalCMS1.getKeyLength()-1).getMoT());

  var tmpNaN = globalCMS1.getNaNColor("rgb");
  var tmpAbove = globalCMS1.getAboveColor("rgb");
  var tmpBelow = globalCMS1.getBelowColor("rgb");

    json.colorspace = globalCMS1.getInterpolationSpace();
    json.refVal=tmpRefVal;
    json.key1cVal1=tmpkey1CVal1;
    json.key1cVal2=tmpkey1CVal2;
    json.key1cVal3=tmpkey1CVal3;
    json.key2cVal1=tmpkey2CVal1;
    json.key2cVal2=tmpkey2CVal2;
    json.key2cVal3=tmpkey2CVal3;
    json.MoT = tmpMoT;
    json.din99_kE = din99_kE;
    json.din99_kCH = din99_kCH;
    json.cielab_ref_X = cielab_ref_X;
    json.cielab_ref_Y = cielab_ref_Y;
    json.cielab_ref_Z = cielab_ref_Z;


    json.simColorBlind = doColorblindnessSim;

    json.transferMatrixColorXYZ = tmXYZ_Selected;
    json.transferMatrixColorXYZ_Inv = tmXYZ_Selected_Inv;
    json.transferMatrixColorLMS = tmLMS_Selected;
    json.transferMatrixColorLMS_Inv = tmLMS_Selected_Inv;
    json.transferMatrixColorSIM = sim_AdaptiveColorblindness;

    json.nanC1 = tmpNaN.get1Value();
    json.nanC2 = tmpNaN.get2Value();
    json.nanC3 = tmpNaN.get3Value();

    json.aboveC1 = tmpAbove.get1Value();
    json.aboveC2 = tmpAbove.get2Value();
    json.aboveC3 = tmpAbove.get3Value();

    json.belowC1 = tmpBelow.get1Value();
    json.belowC2 = tmpBelow.get2Value();
    json.belowC3 = tmpBelow.get3Value();


  return json;
}
