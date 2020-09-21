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
      gWorkColor1.autoRGBClipping=true;
      gWorkColor1.setColorInfo(this.iColor);
      return gWorkColor1.getColorInfo(colorspace);
    }

    setRefPosition(pos) {
        this.ref = pos;
    }

    getRefPosition() {
      return this.ref;
    }

}
