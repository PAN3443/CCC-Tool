////////////////////////////////////////////////
// ------------ Class Intervall ---------------//
////////////////////////////////////////////////

class class_Key{
    constructor(colorInfoL,colorInfoR, refPos, isBur,mot) {
        this.type = "";
        this.cL= colorInfoL;
        this.cR = colorInfoR;
        this.ref = refPos;
        this.middleOfTriple = false; // if left or twin key -> false = cL, true = cR;
        if(mot!=undefined)
          this.middleOfTriple = mot;

        this.isBur = isBur;
        if(this.isBur==undefined){
            this.isBur=false;
        }

        this.opacityValLeft=1.0;
        this.opacityValRight=1.0;
        this.determineType();
    }

    getKeyPackage(){
      var tmpPack = [];
      tmpPack.push(this.getLeftKeyColor("rgb"));
      tmpPack.push(this.getRightKeyColor("rgb"));
      tmpPack.push(this.getRefPosition());
      tmpPack.push(this.getBur());
      tmpPack.push(this.getMoT());
      return tmpPack;
    }

    deleteReferences(){
      delete this.type;
      delete this.cL;
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

    setLeftKeyColor(colorInfoL){
        this.cL=colorInfoL;
        this.determineType();
    }

    setRightKeyColor(colorInfoR) {
      this.cR=colorInfoR;
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
      gWorkColor1.autoRGBClipping=true;
      gWorkColor1.updateColor(this.cR[0],this.cR[1],this.cR[2],this.cR[3]);
      if(gWorkColor1.equalTo(this.cL)){
        this.type = "dual key";
        return;
      }
      else{
        this.type = "twin key";
        return;
      }
    }

    getLeftKeyColor(colorspace) {
      if(this.cL==undefined)
        return undefined;
      gWorkColor1.autoRGBClipping=true;
      gWorkColor1.updateColor(this.cL[0],this.cL[1],this.cL[2],this.cL[3]);
      return gWorkColor1.getColorInfo(colorspace);
    }

    getRightKeyColor(colorspace) {
      if(this.cR==undefined)
        return undefined;
      gWorkColor1.autoRGBClipping=true;
      gWorkColor1.updateColor(this.cR[0],this.cR[1],this.cR[2],this.cR[3]);
      return gWorkColor1.getColorInfo(colorspace);
    }

    setRefPosition(pos) {
        this.ref = pos;
    }

    getRefPosition() {
        return this.ref;
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
        }
    }

  }
