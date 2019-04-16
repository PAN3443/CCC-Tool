////////////////////////////////////////////////
// ------------ Class Domain ---------------//
////////////////////////////////////////////////

class class_TestField {
  constructor(dimensionX, dimensionY) {

    this.dimensionX = dimensionX;
    this.dimensionY = dimensionY;
    this.fieldValues = [];
    this.fieldColors = [];
    this.fieldGreyColors = [];
    this.xPos = [];
    this.yPos = [];
    this.cellValues = false;
    this.xmax = -Infinity;
    this.xmin = Infinity;
    this.ymax = -Infinity;
    this.ymin = Infinity;
    this.vmax = -Infinity;
    this.vmin = Infinity;


    for (var x = 0; x < dimensionX; x++) {
      var newArray = [];
      var newArray2 = [];
      var newArray3 = [];
      var newArray4 = [];
      var newArray5 = [];
      for (var y = 0; y < dimensionY; y++) {
        newArray.push(undefined);
        newArray2.push(undefined);
        newArray3.push(undefined);
        newArray4.push(undefined);
        newArray5.push(undefined);
      }
      this.fieldValues.push(newArray);
      this.fieldColors.push(newArray2);
      this.xPos.push(newArray3);
      this.yPos.push(newArray4);
      this.fieldGreyColors.push(newArray5);
    }

  }

  setCellValues(bool){
    this.cellValues=bool;
  }

  getCellValues(){
    return this.cellValues;
  }

  setFieldValue(x,y,value,color,greyRGB,xPos,yPos){

    this.xmax = Math.max(this.xmax,xPos);
    this.xmin = Math.min(this.xmin,xPos);
    this.ymax = Math.max(this.ymax,yPos);
    this.ymin = Math.min(this.ymin,yPos);
    this.vmax = Math.max(this.vmax,value);
    this.vmin = Math.min(this.vmin,value);

    this.fieldValues[x][y] = value;
    this.fieldColors[x][y] = color;
    this.fieldGreyColors[x][y] = greyRGB;
    this.xPos[x][y] = xPos;
    this.yPos[x][y] = yPos;
  }

  getFieldValue(x,y){
    return this.fieldValues[x][y];
  }

  getFieldColor(x,y){
    return this.fieldColors[x][y];
  }

  getFieldGreyColor(x,y){
    return this.fieldGreyColors[x][y];
  }


  getXPos(x,y){
    return this.xPos[x][y];
  }

  getYPos(x,y){
    return this.yPos[x][y];
  }

  getYDim(){
    return this.dimensionY;
  }

  getXDim(){
    return this.dimensionX;
  }

  getYDim(){
    return this.dimensionY;
  }

  getTHREEPointArray(){
    var newArray = [];


    for (var y = 0; y < this.dimensionY; y++) {
      for (var x = 0; x < this.dimensionX; x++) {
        newArray.push(new THREE.Vector3(this.xPos[x][y],this.yPos[x][y],0))
      }
    }

    return newArray;
  }

  getTHREEPointArray3D(scalefactor3DTest){

    var newArray = [];
    var goToNull = this.vmin * scalefactor3DTest;


    for (var y = 0; y < this.dimensionY; y++) {
      for (var x = 0; x < this.dimensionX; x++) {
        newArray.push(new THREE.Vector3(this.xPos[x][y],this.yPos[x][y],(this.fieldValues[x][y]*scalefactor3DTest)-goToNull));
      }
    }


    return newArray;
  }


  getZPos(scalefactor3DTest, x,y){
    return this.fieldValues[x][y]*scalefactor3DTest;
  }


}
