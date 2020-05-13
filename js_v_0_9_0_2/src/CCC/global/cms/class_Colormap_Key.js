////////////////////////////////////////////////
// ------------ Class Intervall ---------------//
////////////////////////////////////////////////

class class_Key{
    constructor(colorInfoL,colorInfoR, refPos, isBur,mot) {
        this.type = "";
        this.emty_cL=false;
        this.cL= new class_Color("rgb",0, 0, 0);
        this.emty_cR=false;
        this.cR = new class_Color("rgb",0, 0, 0);
        this.ref = refPos;
        this.middleOfTriple = false; // if left or twin key -> false = cL, true = cR;
        if(mot!=undefined)
          this.middleOfTriple = mot;

        this.isBur = isBur;
        this.setLeftKeyColor(colorInfoL);
        this.setRightKeyColor(colorInfoR);
        if(this.isBur==undefined){
            this.isBur=false;
        }

        this.opacityValLeft=1.0;
        this.opacityValRight=1.0;
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

    setLeftKeyColor(colorInfoL){

        if(colorInfoL==undefined){
          this.emty_cL=true;
        }
        else{
          this.emty_cL=false;
          this.cL.updateColor(colorInfoL[0], colorInfoL[1], colorInfoL[2], colorInfoL[3]);
        }

        this.determineType();

    }

    setRightKeyColor(colorInfoR) {

      if(colorInfoR==undefined){
        this.emty_cR=true;
      }
      else{
        this.emty_cR=false;
        this.cR.updateColor(colorInfoR[0], colorInfoR[1], colorInfoR[2], colorInfoR[3]);
      }

      this.determineType();

    }

    determineType(){

      if(this.emty_cL){
        if(this.emty_cR){
          this.type = "nil key";
          return;
        }
        else{
          this.type = "right key";
          return;
        }
      }

      if(this.emty_cR){
        this.type = "left key";
        return;
      }

      if(this.cR.equalTo(this.cL.getOriginColorInfo())){
        this.type = "dual key";
        return;
      }
      else{
        this.type = "twin key";
        return;
      }
    }



    getLeftKeyColor(colorspace) {
      if(this.emty_cL)
        return undefined;

      var test = this.cL.getColorInfo(colorspace);
      return this.cL.getColorInfo(colorspace);
    }

    getRightKeyColor(colorspace) {
      if(this.emty_cR)
        return undefined;
      return this.cR.getColorInfo(colorspace);
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
