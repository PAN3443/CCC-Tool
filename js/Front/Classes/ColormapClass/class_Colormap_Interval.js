////////////////////////////////////////////////
// ------------ Class Intervall ---------------//
////////////////////////////////////////////////

class class_Interval{
    constructor(color, isKeyPart, refPos) {

        this.isKeyPart = isKeyPart;
        this.iColor= [undefined,undefined,undefined,undefined,undefined];
        this.ref = refPos;

        this.setColor(color);

    }

    setColor(color) {
        switch (color.getColorType()) {
          case "rgb":
          this.iColor[0]=color;
          this.iColor[1]=color.calcHSVColor();
          this.iColor[2]=color.calcLABColor();
          this.iColor[3]=color.calcDIN99Color();
          this.iColor[4]=color.calcLCHColor();
          break;
          case "hsv":
          this.iColor[0]=color.calcRGBColor();
          this.iColor[1]=color;
          this.iColor[2]=color.calcLABColor();
          this.iColor[3]=color.calcDIN99Color();
          this.iColor[4]=color.calcLCHColor();
          break;
          case "lab":
          this.iColor[0]=color.calcRGBColor();
          this.iColor[1]=color.calcHSVColor();
          this.iColor[2]=color;
          this.iColor[3]=color.calcDIN99Color();
          this.iColor[4]=color.calcLCHColor();
          break;
          case "din99":
          this.iColor[0]=color.calcRGBColor();
          this.iColor[1]=color.calcHSVColor();
          this.iColor[2]=color.calcLABColor();
          this.iColor[3]=color;
          this.iColor[4]=color.calcLCHColor();
          break;
          case "lch":
          this.iColor[0]=color.calcRGBColor();
          this.iColor[1]=color.calcHSVColor();
          this.iColor[2]=color.calcLABColor();
          this.iColor[3]=color.calcDIN99Color();
          this.iColor[4]=color;
          break;

          default:
        }

    }

    getColor(colorspace) {

        switch (colorspace) {
          case "rgb":
          return this.iColor[0];
          case "hsv":
          //return this.iColor[1];
          return this.iColor[0].calcHSVColor();
          case "lab":
          return this.iColor[2];
          case "din99":
          return this.iColor[3];
          case "lab_rgb_possible":
          return this.iColor[0].calcLABColor();
          case "din99_rgb_possible":
          return this.iColor[0].calcDIN99Color();
          case "lab":
          return this.iColor[2];
          case "lch":
          return this.iColor[4];
          case "lch_rgb_possible":
          return this.iColor[0].calcLCHColor();

        }

    }

    getIsKeyPart(){
      return this.isKeyPart;
    }

    setRefPosition(pos) {
        this.ref = pos;
    }

    getRefPosition() {
      return this.ref;
    }

}
