function jsonAddGeneral(json){

  json['browserCanOffscreenCanvas'] = browserCanOffscreenCanvas;

  json['transferMatrixColorXYZ'] = tmXYZ_Selected;
  json['transferMatrixColorXYZ_Inv'] = tmXYZ_Selected_Inv;
  json['din99_kE'] = din99_kE;
  json['din99_kCH'] = din99_kCH;
  json['cielab_ref_X'] = cielab_ref_X;
  json['cielab_ref_Y'] = cielab_ref_Y;
  json['cielab_ref_Z'] = cielab_ref_Z;

  return json;
}
