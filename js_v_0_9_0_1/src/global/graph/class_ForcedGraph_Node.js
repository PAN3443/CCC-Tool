class class_ForcedGraph_Node extends class_Node {

 constructor(color, refPos, fixed, keyID, colorID) {
   super(color);

   // for force graph
   this.refPos = refPos;
   this.fixedNode = fixed;
   this.disp = [0, 0, 0];
   this.keyID = keyID;
   this.colorID = colorID;
 }


 deleteReferences() {
   super.deleteReferences();

   delete this.disp;
   delete this.fixedNode;
   delete this.refPos;
 }

 getKeyID(){
   return this.keyID;
 }

getColorID(){
    return this.colorID;
  }

 getFixStatus(){
   return this.fixedNode;
 }

 resetDisp() {
    this.disp = [0, 0, 0];
  }

  addDisp(vec) {

    if (Array.isArray(vec)) {
      if (vec.length == 3) {
        this.disp[0] += vec[0];
        this.disp[1] += vec[1];
        this.disp[2] += vec[2];
      }
    }
  }

  subDisp(vec) {
    if (Array.isArray(vec)) {
      if (vec.length == 3) {
        this.disp[0] -= vec[0];
        this.disp[1] -= vec[1];
        this.disp[2] -= vec[2];
      }
    }
  }

  getDisp() {
    return this.disp;
  }

  setDisp(vec) {
    this.disp = vec;
  }


 getNodeRefPos() {
   return this.refPos;
 }

 setNodeRefPos(ref) {
   this.refPos = ref;
 }

 forceMovement(rgbCorrection) {
   if (!this.fixedNode) {
     this.nodeColor.set1Value(this.nodeColor.get1Value() + this.disp[0]);
     this.nodeColor.set2Value(this.nodeColor.get2Value() + this.disp[1]);
     this.nodeColor.set3Value(this.nodeColor.get3Value() + this.disp[2]);

     if (!this.nodeColor.checkRGBPossiblity()) { // rgbCorrection &&
       this.nodeColor.setColorToRGBPossiblity();
     } //*/
   }
   this.disp = [0, 0, 0];
 }

 vecMove(vec){
   this.nodeColor.set1Value(this.nodeColor.get1Value() + vec[0]);
   this.nodeColor.set2Value(this.nodeColor.get2Value() + vec[1]);
   this.nodeColor.set3Value(this.nodeColor.get3Value() + vec[2]);

   if (!this.nodeColor.checkRGBPossiblity()) { // rgbCorrection &&
     this.nodeColor.setColorToRGBPossiblity();
   } //*/
 }

 calcRepulseForce(){
   var tmpColor = createColor(this.nodeColor.get1Value(),this.nodeColor.get2Value(),this.nodeColor.get3Value(),this.nodeColor.getColorType());

   tmpColor.set1Value(tmpColor.get1Value() + this.disp[0]);
   tmpColor.set2Value(tmpColor.get2Value() + this.disp[1]);
   tmpColor.set3Value(tmpColor.get3Value() + this.disp[2]);

   if (this.nodeColor.checkRGBPossiblity()) {
     return undefined;
   }
   else {

     var clonedColor = cloneColor(tmpColor);
     clonedColor.setColorToRGBPossiblity();

     return [clonedColor.get1Value()-tmpColor.get1Value(),clonedColor.get2Value()-tmpColor.get2Value(),clonedColor.get3Value()-tmpColor.get3Value()];
   }

 }


};
