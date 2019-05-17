////////////////////////////////////////////////
// ------------ Class Domain ---------------//
////////////////////////////////////////////////

class class_TestField {
  constructor(dimensionX, dimensionY) {

    this.dimensionX = dimensionX;
    this.dimensionY = dimensionY;
    this.fieldValues = [];
    this.xPos = [];
    this.yPos = [];
    this.cellValues = false;
    /*this.xmax = -Infinity;
    this.xmin = Infinity;
    this.ymax = -Infinity;
    this.ymin = Infinity;*/
    this.vmax = -Infinity;
    this.vmin = Infinity;
    this.vdis = undefined;
    this.doAutoScale = false;
    this.scaleRangeMin = undefined;
    this.scaleRangeMax = undefined;
    this.scaleRangeDis = undefined;

    for (var x = 0; x < dimensionX; x++) {
      var newArray = [];
      var newArray2 = [];
      var newArray3 = [];
      for (var y = 0; y < dimensionY; y++) {
        newArray.push(undefined);
        newArray2.push(undefined);
        newArray3.push(undefined);
      }
      this.fieldValues.push(newArray);
      this.xPos.push(newArray2);
      this.yPos.push(newArray3);
    }

  }

  setAutoScale(bool){
    this.doAutoScale = bool;
  }

  getAutoScale(){
    return this.doAutoScale;
  }

  setScaleRange(min,max){
    this.scaleRangeMin = min;
    this.scaleRangeMax = max;
    this.scaleRangeDis = Math.abs(this.scaleRangeMax-this.scaleRangeMin);
  }

  setField(data){
    this.dimensionX = data[0];
    this.dimensionY = data[1];
    this.fieldValues = [];
    this.xPos = [];
    this.yPos = [];
    this.vmax = -Infinity;
    this.vmin = Infinity;

    for (var x = 0; x < this.dimensionX; x++) {
      var newArray = [];
      var newArray2 = [];
      var newArray3 = [];
      for (var y = 0; y < this.dimensionY; y++) {

        var index = y*this.dimensionX+x;
        if(data[2][index]!=undefined){
          this.vmax = Math.max(this.vmax,data[2][index]);
          this.vmin = Math.min(this.vmin,data[2][index]);
        }
        newArray.push(data[2][index]);
        newArray2.push(data[3][index][0]);
        newArray3.push(data[3][index][1]);
      }
      this.fieldValues.push(newArray);
      this.xPos.push(newArray2);
      this.yPos.push(newArray3);
    }
    this.vdis = Math.abs(this.vmax-this.vmin);
  }

  setCellValues(bool){
    this.cellValues=bool;
  }

  getCellValues(){
    return this.cellValues;
  }

  /*setFieldValue(x,y,value,color,greyRGB,xPos,yPos){
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
  }*/

  getFieldValue(x,y){
    if(this.doAutoScale){
      var valueRatio = (this.fieldValues[x][y]-this.vmin)/this.vdis;
      return this.scaleRangeMin+this.scaleRangeDis*valueRatio;
    }
    else{
      return this.fieldValues[x][y];
    }
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
