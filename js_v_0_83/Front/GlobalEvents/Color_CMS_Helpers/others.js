function createColor(v1,v2,v3,space){
  switch (space) {
    case "rgb":
      return new class_Color_RGB(v1,v2,v3);
      break;
      case "hsv":
        return new class_Color_HSV(v1,v2,v3);
        break;
        case "din99":
          return new class_Color_DIN99(v1,v2,v3);
          break;
          case "lab":
          case "de94":
          case "de94-ds":
          case "de2000":
          case "de2000-ds":
            return new class_Color_LAB(v1,v2,v3);
            break;
  }
  return undefined;
}
