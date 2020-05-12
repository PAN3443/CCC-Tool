/*function checkConstantBand(c1,c2){
  if(c1.equalTo(c2)) // case constant band
    return undefined;
  else
    return c1;
}*/

function equalColorInfo(colorInfo1, colorInfo2){
  gWorkColor1.updateColor(colorInfo1);
  return gWorkColor1.equalTo(colorInfo2)
}

function getRandomColor(space){

  var rValue = getRandomArbitrary(0.0, 1.0);
  var bValue = getRandomArbitrary(0.0, 1.0);
  var gValue = getRandomArbitrary(0.0, 1.0);

  gWorkColor1.setRGB(rValue,gValue,bValue);

  return gWorkColor1.getColorInfo(space);
}
