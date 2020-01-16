


function createColor(v1,v2,v3,space){
  switch (space) {
    case "RGB": case "rgb": case "Rgb":
      return new class_Color_RGB(v1,v2,v3);
      break;
      case "HSV": case "hsv": case "Hsv":
        return new class_Color_HSV(v1,v2,v3);
        break;
        case "DIN99": case "din99": case "Din99":
          return new class_Color_DIN99(v1,v2,v3);
          break;
          case "LAB": case "lab": case "Lab":
          case "de94":
          case "de94-ds":
          case "de2000":
          case "de2000-ds":
            return new class_Color_LAB(v1,v2,v3);
          break;
          case "LCH": case "lch": case "Lch": case "LCh":
            return new class_Color_LCH(v1,v2,v3);
          break;

  }
  return undefined;
}

function checkConstantBand(c1,c2){
  if(c1.equalTo(c2)) // case constant band
    return undefined;
  else
    return c1;
}


function getRandomColor(space){

  var rValue = getRandomArbitrary(0.0, 1.0);
  var bValue = getRandomArbitrary(0.0, 1.0);
  var gValue = getRandomArbitrary(0.0, 1.0);

  var rgbColor = new class_Color_RGB(rValue,gValue,bValue);

  switch (space) {
    case "RGB": case "rgb": case "Rgb":
      return rgbColor;
      break;
      case "HSV": case "hsv": case "Hsv":
        var hsvColor = rgbColor.calcHSVColor();
        rgbColor.deleteReferences();
        return hsvColor;
        break;
        case "DIN99": case "din99": case "Din99":
        var din99Color = rgbColor.calcDIN99Color();
        rgbColor.deleteReferences();
        return din99Color;
          break;
          case "LAB": case "lab": case "Lab":
          case "de94":
          case "de94-ds":
          case "de2000":
          case "de2000-ds":
          var labColor = rgbColor.calcLABColor();
          rgbColor.deleteReferences();
          return labColor;
          break;
          case "LCH": case "lch": case "Lch": case "LCh":
          var lchColor = rgbColor.calcLCHColor();
          rgbColor.deleteReferences();
          return lchColor;
          break;
  }
}
