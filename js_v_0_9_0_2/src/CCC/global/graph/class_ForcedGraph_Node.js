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
     gWorkColor1.autoRGBClipping=true;
     gWorkColor1.updateColor(this.nodeColor[0],this.nodeColor[1]+this.disp[0],this.nodeColor[2]+this.disp[1],this.nodeColor[3]+this.disp[2]);
     this.nodeColor=gWorkColor1.getColorInfo(this.nodeColor[0]);
   }
   this.disp = [0, 0, 0];
 }

 vecMove(vec){
   gWorkColor1.autoRGBClipping=true;
   gWorkColor1.updateColor(this.nodeColor[0],this.nodeColor[1]+vec[0],this.nodeColor[2]+vec[1],this.nodeColor[3]+vec[2]);
   this.nodeColor=gWorkColor1.getColorInfo(this.nodeColor[0]);
 }

 /*calcRepulseForce(){
   gWorkColor1.autoRGBClipping=false;
   gWorkColor1.updateColor(this.nodeColor[0],this.nodeColor[1],this.nodeColor[2],this.nodeColor[3]);
   if (gWorkColor1.checkRGBPossiblity()) {
     return undefined;
   }
   else {
     var tmpColor = [this.nodeColor[0],this.nodeColor[1]+this.disp[0],this.nodeColor[2]+this.disp[1],this.nodeColor[3]+this.disp[2]];
     gWorkColor1.autoRGBClipping=true;
     gWorkColor1.updateColor(tmpColor[0],tmpColor[1],tmpColor[2],tmpColor[3]);
     var colorInfo=gWorkColor1.getColorInfo(tmpColor[0]);
     return [colorInfo[1]-tmpColor[1],colorInfo[2]-tmpColor[2],colorInfo[3]-tmpColor[3]];
   }
   gWorkColor1.autoRGBClipping=true;
 }*/


};
