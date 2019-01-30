////////////////////////////////////////////////
// ------------ Class Domain ---------------//
////////////////////////////////////////////////

class class_TestField {
  constructor(dimensionX, dimensionY) {

    this.dimensionX = dimensionX;
    this.dimensionY = dimensionY;
    this.fieldValues = [];
    this.fieldColors = [];

    for (var x = 0; x < dimensionX; x++) {
      var newArray = [];
      var newArray2 = [];
      for (var y = 0; y < dimensionY; y++) {
        newArray.push(undefined);
        newArray2.push(undefined);
      }
      this.fieldValues.push(newArray);
      this.fieldColors.push(newArray2);

    }

  }


  setFieldValue(x,y,value,color){
    this.fieldValues[x][y] = value;
    this.fieldColors[x][y] = color;
  }

  getFieldValue(x,y){
    return this.fieldValues[x][y];
  }

  getFieldColor(x,y){
    return this.fieldColors[x][y];
  }

  getXDim(){
    return this.dimensionX;
  }

  getYDim(){
    return this.dimensionY;
  }




}
