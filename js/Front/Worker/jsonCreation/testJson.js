


function jsonAddTestfield(json){

  json['testFieldType'] = undefined;
  json['testFieldGenerationType'] = undefined;
  json['testFieldIndex'] = undefined;

  json['testFieldDimX'] = undefined;
  json['testFieldDimY'] = undefined;

  json['originIsRelevant'] = false;
  json['functionDim'] = undefined;

  json['testFieldVar_ratio'] = false;
  json['testFieldRangeStart'] = 0;
  json['testFieldRangeEnd'] = 1;

  ////// Noise
  json['doNoise'] = false;
  json['noiseBehavior'] = undefined;
  json['maxChange'] = undefined;
  json['noiseField'] = undefined;

  json['canvasID'] = undefined;

  //// Additional Field Variables
  json['testFieldVar_a'] = undefined;
  json['testFieldVar_b'] = undefined;
  json['testFieldVar_c'] = undefined;
  json['testFieldVar_d'] = undefined;
  json['testFieldVar_e'] = undefined;
  json['testFieldVar_f'] = undefined;
  json['testFieldVar_g'] = undefined;

  return json;
}
