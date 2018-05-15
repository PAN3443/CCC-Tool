////////////////////////////////////////////////
// ------------ Class Intervall ---------------//
////////////////////////////////////////////////

class class_Interval{
    constructor(color, isKeyPart, refPos) {

        this.isKeyPart = isKeyPart;
        this.iColor= [];
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
          //return this.iColor[1];
          //break;
          return this.iColor[0].calcHSVColor();
          case "lab":
          return this.iColor[2];
          break;
          case "din99":
          return this.iColor[3];
          break;
          case "lab_rgb_possible":
          return this.iColor[0].calcLABColor();
          break;
          case "din99_rgb_possible":
          return this.iColor[0].calcDIN99Color();
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

    getRefPosition() {
      return this.ref;
    }

}
