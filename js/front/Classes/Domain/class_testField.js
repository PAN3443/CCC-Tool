////////////////////////////////////////////////
// ------------ Class Domain ---------------//
////////////////////////////////////////////////

class class_TestField {
  constructor(dimensionX, dimensionY) {

    this.dimensionX = dimensionX;
    this.dimensionY = dimensionY;
    this.fieldValues = [];

    for (var x = 0; x < dimensionX; x++) {
      var newArray = [];
      for (var y = 0; y < dimensionY; y++) {
        newArray.push(undefined);
      }
      this.fieldValues.push(newArray);
    }

  }


  setFieldValue(x,y,value){
    this.fieldValues[x][y] = value;
  }

  getFieldValue(x,y){
    return this.fieldValues[x][y];
  }

  getXDim(){
    return this.dimensionX;
  }

  getYDim(){
    return this.dimensionY;
  }




}
