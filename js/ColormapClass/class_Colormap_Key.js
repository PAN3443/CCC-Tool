////////////////////////////////////////////////
// ------------ Class Intervall ---------------//
////////////////////////////////////////////////

class class_Key{
    constructor(colorL, colorR, refPos) {

        this.type = "";
        this.cL=[undefined,undefined,undefined,undefined];
        this.cR = [undefined,undefined,undefined,undefined];
        this.setLeftKeyColor(colorL);
        this.setRightKeyColor(colorR);

        this.ref = refPos;
        this.middleOfTriple = false; // if left or twin key -> false = cL, true = cR;

        this.opacityValLeft=1.0;
        this.opacityValRight=1.0;

    }

    setLeftKeyColor(color){


        this.cL = [undefined,undefined,undefined,undefined];

        if(color!=undefined)
        switch (color.getColorType()) {
          case "rgb":
          this.cL[0]=color;
          this.cL[1]=color.calcHSVColor();
          this.cL[2]=color.calcLABColor();
          this.cL[3]=color.calcDIN99Color();
          break;
          case "hsv":
          this.cL[0]=color.calcRGBColor();
          this.cL[1]=color;
          this.cL[2]=color.calcLABColor();
          this.cL[3]=color.calcDIN99Color();
          break;
          case "lab":
          this.cL[0]=color.calcRGBColor();
          this.cL[1]=color.calcHSVColor();
          this.cL[2]=color;
          this.cL[3]=color.calcDIN99Color();
          break;
          case "din99":
          this.cL[0]=color.calcRGBColor();
          this.cL[1]=color.calcHSVColor();
          this.cL[2]=color.calcLABColor();
          this.cL[3]=color;
          break;
          default:
        }

        this.determineType("lab");

    }

    setRightKeyColor(color) {
      this.cR = [undefined,undefined,undefined,undefined];

      if(color!=undefined)
      switch (color.getColorType()) {
        case "rgb":
        this.cR[0]=color;
        this.cR[1]=color.calcHSVColor();
        this.cR[2]=color.calcLABColor();
        this.cR[3]=color.calcDIN99Color();
        break;
        case "hsv":
        this.cR[0]=color.calcRGBColor();
        this.cR[1]=color;
        this.cR[2]=color.calcLABColor();
        this.cR[3]=color.calcDIN99Color();
        break;
        case "lab":
        this.cR[0]=color.calcRGBColor();
        this.cR[1]=color.calcHSVColor();
        this.cR[2]=color;
        this.cR[3]=color.calcDIN99Color();
        break;
        case "din99":
        this.cR[0]=color.calcRGBColor();
        this.cR[1]=color.calcHSVColor();
        this.cR[2]=color.calcLABColor();
        this.cR[3]=color;
        break;
        default:
      }

      this.determineType("lab");

    }


    determineType(colorspace){
      var colorL,colorR;

      switch (colorspace) {
        case "rgb":
        colorL=this.cL[0];
        colorR=this.cR[0];
        break;
        case "hsv":
        colorL=this.cL[1];
        colorR=this.cR[1];
        break;
        case "lab":
        colorL=this.cL[2];
        colorR=this.cR[2];
        break;
        case "din99":
        colorL=this.cL[3];
        colorR=this.cR[3];
        break;
        default:
      }

      if(colorL==undefined){
        if(colorR==undefined){
          this.type = "nil key";
          return;
        }
        else{
          this.type = "right key";
          return;
        }
      }

      if(colorR==undefined){
        this.type = "left key";
        return;
      }

      if(colorR.equalTo(colorL)){
        this.type = "dual key";
        return;
      }
      else{
        this.type = "twin key";
        return;
      }
    }

    getLeftKeyColor(colorspace) {

      if(this.cL[0]==undefined)
      return undefined;

        switch (colorspace) {
          case "rgb":
          var ncolor = new classColor_RGB(this.cL[0].get1Value(),this.cL[0].get2Value(),this.cL[0].get3Value());
          return ncolor;
          break;
          case "hsv":
          var ncolor = new classColor_HSV(this.cL[1].get1Value(),this.cL[1].get2Value(),this.cL[1].get3Value());
          return ncolor;
          //var ncolor = new classColor_RGB(this.cL[0].get1Value(),this.cL[0].get2Value(),this.cL[0].get3Value());
          //return ncolor.calcHSVColor();
          break;
          case "lab":
          var ncolor = new classColor_LAB(this.cL[2].get1Value(),this.cL[2].get2Value(),this.cL[2].get3Value());
          return ncolor;
          break;
          case "din99":
          var ncolor = new classColorDIN99(this.cL[3].get1Value(),this.cL[3].get2Value(),this.cL[3].get3Value());
          return ncolor;
          break;
          case "lab_rgb_possible":
          var ncolor = new classColor_RGB(this.cL[0].get1Value(),this.cL[0].get2Value(),this.cL[0].get3Value());
          return ncolor.calcLABColor();
          break;
          case "din99_rgb_possible":
          var ncolor = new classColor_RGB(this.cL[0].get1Value(),this.cL[0].get2Value(),this.cL[0].get3Value());
          return ncolor.calcDIN99Color();
          break;
          default:
          return undefined;
        }

    }

    getRightKeyColor(colorspace) {

      if(this.cR[0]==undefined)
      return undefined;

      switch (colorspace) {
        case "rgb":
        var ncolor = new classColor_RGB(this.cR[0].get1Value(),this.cR[0].get2Value(),this.cR[0].get3Value());
        return ncolor;
        break;
        case "hsv":
        var ncolor = new classColor_HSV(this.cR[1].get1Value(),this.cR[1].get2Value(),this.cR[1].get3Value());
        return ncolor;
        //var ncolor = new classColor_RGB(this.cR[0].get1Value(),this.cR[0].get2Value(),this.cR[0].get3Value());
        //return ncolor.calcHSVColor();
        break;
        case "lab":
        var ncolor = new classColor_LAB(this.cR[2].get1Value(),this.cR[2].get2Value(),this.cR[2].get3Value());
        return ncolor;
        break;
        case "din99":
        var ncolor = new classColorDIN99(this.cR[3].get1Value(),this.cR[3].get2Value(),this.cR[3].get3Value());
        return ncolor;
        break;
        case "lab_rgb_possible":
        var ncolor = new classColor_RGB(this.cR[0].get1Value(),this.cR[0].get2Value(),this.cR[0].get3Value());
        return ncolor.calcLABColor();
        break;
        case "din99_rgb_possible":
        var ncolor = new classColor_RGB(this.cR[0].get1Value(),this.cR[0].get2Value(),this.cR[0].get3Value());
        return ncolor.calcDIN99Color();
        break;
        default:
      }

    }


    setRefPosition(pos) {
        this.ref = pos;
    }

    getRefPosition() {
        return this.ref;
    }

    setOpacityVal(val,side) {
      switch (side) {
        case "left":
          this.opacityValLeft=val;
          break;
          case "right":
            this.opacityValRight=val;
            break;
        default:

      }

    }

    getOpacityVal(side){
        switch (side) {
          case "left":
            return this.opacityValLeft;
            break;
            case "right":
              return this.opacityValRight;
              break;
          default:

        }
    }

    getKeyType(){
        return this.type;
    }


    getMoT(){
      return this.middleOfTriple;
    }

    setMoT(mot){
      this.middleOfTriple=mot;
    }

  }
