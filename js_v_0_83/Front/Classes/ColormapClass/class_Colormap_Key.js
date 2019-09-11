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

    deleteReferences(){
      delete this.type;

      if(this.cL!=undefined){
        this.cL.deleteReferences();
        this.cL=null;
      }
      else
        delete this.cL;

      if(this.cR!=undefined){
        this.cR.deleteReferences();
        this.cR=null;
      }
      else
        delete this.cR;

      delete this.ref;
      delete this.middleOfTriple; // if left or twin key -> false = cL, true = cR;
      delete this.isBur;
      delete this.opacityValLeft;
      delete this.opacityValRight;
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

        if(this.cL != undefined){
          this.cL.deleteReferences();
          this.cL = undefined
        }

        if(color!=undefined){
          this.cL=color.calcLABColor();
          color.deleteReferences();
          color=null;
        }

        this.determineType();

    }

    setRightKeyColor(color) {

      if(this.cR != undefined){
        this.cR.deleteReferences();
        this.cR = undefined
      }

      if(color!=undefined){
        this.cR=color.calcLABColor();
        color.deleteReferences();
        color=null;
      }

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
        tmpLMS.deleteReferences();
        tmpLMS=null;
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
        tmpLMS.deleteReferences();
        tmpLMS=null;
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
          case "de94":
          case "de94-ds":
          case "de2000":
          case "de2000-ds":
          return new classColor_LAB(this.cL.get1Value(),this.cL.get2Value(),this.cL.get3Value());
          break;
          case "din99":
          return this.cL.calcDIN99Color();
          break;
          case "lab_rgb_possible":
          var ncolor = this.cL.calcRGBColor();
          var color = ncolor.calcLABColor();
          ncolor.deleteReferences();
          ncolor=null;
          return color;
          break;
          case "din99_rgb_possible":
          var ncolor = this.cL.calcRGBColor();
          var color = ncolor.calcDIN99Color();
          ncolor.deleteReferences();
          ncolor=null;
          return color;
          break;
          case "lch":
          return this.cL.calcLCHColor();
          break;
          case "lch_rgb_possible":
          var ncolor = this.cL.calcRGBColor();
          var color = ncolor.calcLCHColor();
          ncolor.deleteReferences();
          ncolor=null;
          return color;
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
          case "de94":
          case "de94-ds":
          case "de2000":
          case "de2000-ds":
          return new classColor_LAB(this.cR.get1Value(),this.cR.get2Value(),this.cR.get3Value());
          break;
          case "din99":
          return this.cR.calcDIN99Color();
          break;
          case "lab_rgb_possible":
          var ncolor = this.cR.calcRGBColor();
          var color = ncolor.calcLABColor();
          ncolor.deleteReferences();
          ncolor=null;
          return color;
          break;
          case "din99_rgb_possible":
          var ncolor = this.cR.calcRGBColor();
          var color = ncolor.calcDIN99Color();
          ncolor.deleteReferences();
          ncolor=null;
          return color;
          break;
          case "lch":
          return this.cR.calcLCHColor();
          break;
          case "lch_rgb_possible":
          var ncolor = this.cR.calcRGBColor();
          var color = ncolor.calcLCHColor();
          ncolor.deleteReferences();
          ncolor=null;
          return color;
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
