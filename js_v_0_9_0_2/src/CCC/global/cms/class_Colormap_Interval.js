////////////////////////////////////////////////
// ------------ Class Intervall ---------------//
////////////////////////////////////////////////

class class_Interval{
    constructor(colorInfo, refPos) {
        this.iColor= new class_Color(colorInfo[0],colorInfo[1], colorInfo[2], colorInfo[3]);
        this.ref = refPos;
        this.setColor(color);
    }

    deleteReferences(){
      this.iColor.deleteReferences();
      delete this.ref;
    }

    setColor(colorInfo) {
        if(colorInfo != undefined){ // should never happen
          this.iColor.updateColor(colorInfo[0],colorInfo[1], colorInfo[2], colorInfo[3]);
        }
    }

    getColor(colorspace) {
      this.iColor.getColorInfo(colorspace);
    }

    setRefPosition(pos) {
        this.ref = pos;
    }

    getRefPosition() {
      return this.ref;
    }

}
