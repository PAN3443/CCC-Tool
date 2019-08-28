////////////////////////////////////////////////
// ------------ Class Intervall ---------------//
////////////////////////////////////////////////

class class_Key{
    constructor(colorL, colorR, refPos, isBur) {

        this.type = "";
        this.cL=undefined;
        this.cR = undefined;
        this.setLeftKeyColor(colorL);
        this.setRightKeyColor(colorR);

        this.ref = refPos;
        this.middleOfTriple = false; // if left or twin key -> false = cL, true = cR;

        this.isBur = isBur;

        if(this.isBur==undefined){
            this.isBur=false;
        }

        this.opacityValLeft=1.0;
        this.opacityValRight=1.0;

    }


    setBur(type){
      this.isBur = type;
    }

    getBur(){
      return this.isBur;
    }

    /*updateKeyColorsToSettings(){
      if(this.cL!=undefined){
        this.cL=this.cL.calcLABColor();
      }

      if(this.cR!=undefined){
        this.cR=this.cR.calcLABColor();
      }
    }*/

    setLeftKeyColor(color){

        this.cL = undefined;

        if(color!=undefined)
          this.cL=color.calcLABColor();

        this.determineType();

    }

    setRightKeyColor(color) {

      this.cR = undefined;

      if(color!=undefined)
        this.cR=color.calcLABColor();

      this.determineType();

    }


    determineType(){

      if(this.cL==undefined){
        if(this.cR==undefined){
          this.type = "nil key";
          return;
        }
        else{
          this.type = "right key";
          return;
        }
      }

      if(this.cR==undefined){
        this.type = "left key";
        return;
      }

      if(this.cR.equalTo(this.cL)){
        this.type = "dual key";
        return;
      }
      else{
        this.type = "twin key";
        return;
      }
    }

    getRightKeyColorCB(index){
      if(this.cR==undefined)
      return undefined;

      var ncolor = this.cR.calcRGBColor();
      if(doColorblindnessSim){
        var tmpLMS = ncolor.calcLMSColor();
        ncolor = tmpLMS.calcColorBlindRGBColor();
      }

      return ncolor;
    }

    getLeftKeyColorCB(index){
      if(this.cL==undefined)
      return undefined;

      var ncolor = this.cL.calcRGBColor();
      if(doColorblindnessSim){
        var tmpLMS = ncolor.calcLMSColor();
        ncolor = tmpLMS.calcColorBlindRGBColor();
      }

      return ncolor;
    }


    getLeftKeyColor(colorspace) {

      if(this.cL==undefined)
      return undefined;

        switch (colorspace) {
          case "rgb":
          return this.cL.calcRGBColor();
          break;
          case "hsv":
          return this.cL.calcHSVColor();
          break;
          case "lab":
          var tmpLabColor = new classColor_LAB(this.cL.get1Value(),this.cL.get2Value(),this.cL.get3Value());
          return tmpLabColor;
          break;
          case "din99":
          return this.cL.calcDIN99Color();
          break;
          case "lab_rgb_possible":
          var ncolor = this.cL.calcRGBColor();
          return ncolor.calcLABColor();
          break;
          case "din99_rgb_possible":
          var ncolor = this.cL.calcRGBColor();
          return ncolor.calcDIN99Color();
          break;
          case "lch":
          return this.cL.calcLCHColor();
          break;
          case "lch_rgb_possible":
          var ncolor = this.cL.calcRGBColor();
          return ncolor.calcLCHColor();
          break;
        }

    }

    getRightKeyColor(colorspace) {

      if(this.cR==undefined)
      return undefined;

        switch (colorspace) {
          case "rgb":
          return this.cR.calcRGBColor();
          break;
          case "hsv":
          return this.cR.calcHSVColor();
          break;
          case "lab":
          var tmpLabColor = new classColor_LAB(this.cR.get1Value(),this.cR.get2Value(),this.cR.get3Value());
          return tmpLabColor;
          break;
          case "din99":
          return this.cR.calcDIN99Color();
          break;
          case "lab_rgb_possible":
          var ncolor = this.cR.calcRGBColor();
          return ncolor.calcLABColor();
          break;
          case "din99_rgb_possible":
          var ncolor = this.cR.calcRGBColor();
          return ncolor.calcDIN99Color();
          break;
          case "lch":
          return this.cR.calcLCHColor();
          break;
          case "lch_rgb_possible":
          var ncolor = this.cR.calcRGBColor();
          return ncolor.calcLCHColor();
          break;
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
