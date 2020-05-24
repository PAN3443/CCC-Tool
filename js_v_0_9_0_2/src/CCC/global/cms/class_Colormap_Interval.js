////////////////////////////////////////////////
// ------------ Class Intervall ---------------//
////////////////////////////////////////////////

class class_Interval{
    constructor(colorInfo, refPos) {
        this.iColor= colorInfo; //new class_Color(colorInfo[0],colorInfo[1], colorInfo[2], colorInfo[3]);
        this.ref = refPos;
    }

    deleteReferences(){
      delete this.iColor;
      delete this.ref;
    }

    setColor(colorInfo) {
      this.iColor=colorInfo;
    }

    getColor(colorspace) {
      gWorkColor1.updateColor(this.iColor[0],this.iColor[1], this.iColor[2], this.iColor[3]);
      return gWorkColor1.getColorInfo(colorspace);
    }

    setRefPosition(pos) {
        this.ref = pos;
    }

    getRefPosition() {
      return this.ref;
    }

}
