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
