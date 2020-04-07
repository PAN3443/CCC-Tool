
class class_ShortestPath_Node extends class_Node {

 constructor(color) {
   super(color);

   this.isStart = false;
   this.isEnd = false;
   this.isIntermediate = false;
   this.intermediateIndex = 0;
   this.isInactive = false;
 }

 deleteReferences() {
   super.deleteReferences();

   delete this.isStart;
   delete this.isEnd;
   delete this.isIntermediate;
   delete this.intermediateIndex;
   delete this.isInactive;
 }

 getIntermediateIndex() {
   return this.intermediateIndex;
 }

 setIntermediateIndex(intermediateIndex) {
   this.intermediateIndex = intermediateIndex;
 }

 getIsStart() {
   return this.isStart;
 }

 setIsStart(isStart) {
   this.isStart = isStart;
 }

 getIsEnd() {
   return this.isEnd;
 }

 setIsEnd(isEnd) {
   this.isEnd = isEnd;
 }

 getIsIntermediate() {
   return this.isIntermediate;
 }

 setIsIntermediate(isIntermediate) {
   this.isIntermediate = isIntermediate;
 }

 getIsInactive() {
   return this.isInactive;
 }

 setIsInactive(isInactive) {
   this.isInactive = isInactive;
 }

};
