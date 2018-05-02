////////////////////////////////////////////////
// ------------ Class Intervall ---------------//
////////////////////////////////////////////////

class class_Interval{
    constructor(color, isKeyPart, refPos) {
        this.isKeyPart = isKeyPart;
        this.iColor= [];
        this.setColor(color);
        this.ref = refPos;
    }

    setColor(color) {
        switch (color.getColorType()) {
          case "rgb":
          this.iColor[0]=color;
          this.iColor[1]=color.calcHSVColor();
          this.iColor[2]=color.calcLABColor();
          this.iColor[3]=color.calcDIN99Color();
          break;
          case "hsv":
          this.iColor[0]=color.calcRGBColor();
          this.iColor[1]=color;
          this.iColor[2]=color.calcLABColor();
          this.iColor[3]=color.calcDIN99Color();
          break;
          case "lab":
          this.iColor[0]=color.calcRGBColor();
          this.iColor[1]=color.calcHSVColor();
          this.iColor[2]=color;
          this.iColor[3]=color.calcDIN99Color();
          break;
          case "din99":
          this.iColor[0]=color.calcRGBColor();
          this.iColor[1]=color.calcHSVColor();
          this.iColor[2]=color.calcLABColor();
          this.iColor[3]=color;
          break;
          default:
        }
    }

    getColor(colorspace) {

        switch (colorspace) {
          case "rgb":
          return this.iColor[0];
          break;
          case "hsv":
          return this.iColor[1];
          break;
          case "lab":
          return this.iColor[2];
          break;
          case "din99":
          return this.iColor[3];
          break;
          default:
        }

    }

    getIsKeyPart(){
      return this.isKeyPart;
    }

    setRefPosition(pos) {
        this.ref = pos;
    }

}
