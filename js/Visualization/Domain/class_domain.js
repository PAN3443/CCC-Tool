////////////////////////////////////////////////
// ------------ Class Domain ---------------//
////////////////////////////////////////////////

class class_Domain {
  constructor(gridtype, numberOfPoints, is3D) {
    this.name = "";
    this.gridType = gridtype;
    this.fieldArray = [];
    this.timeSteps = [];
    this.fieldType = [];
    this.dimensionX = 1;
    this.dimensionY = 1;
    this.dimensionZ = 1;
    this.is3D = is3D;
    this.gridPoints = new Array(numberOfPoints);
    this.cellArray = [];


    /*this.minX, this.minY, this.minZ = Infinity;
    this.maxX, this.maxY, this.maxZ = -Infinity;
    this.centerX, this.centerY, this.centerZ = undefined;*/
  }

  addNewField(valueArray, type) {

    switch (this.gridType) {
      case 1: //STRUCTURED_POINTS

        return true;
      case 2: //"STRUCTURED_GRID"
      case 3: //"UNSTRUCTURED_GRID"
      case 5: //"RECTILINEAR_GRID"

        if (type) { // cell data
          if (this.is3D) {

            var numberOfPointsTimeStep;
            if(this.dimensionZ==1)
            numberOfPointsTimeStep = (this.dimensionX - 1) * (this.dimensionY - 1);
            else
            numberOfPointsTimeStep = (this.dimensionX - 1) * (this.dimensionY - 1) * (this.dimensionZ - 1);

            if (valueArray.length % numberOfPointsTimeStep == 0) {
              this.timeSteps.push(valueArray.length / numberOfPointsTimeStep);
              console.log("Detected Time Steps:" + this.timeSteps[this.timeSteps.length - 1]);
            } else {
              console.log("Size of the field values are not appropriate to the grid dimensions");
              return false;
            }
          } else {
            var numberOfPointsTimeStep = (this.dimensionX - 1) * (this.dimensionY - 1);
            if (valueArray.length % numberOfPointsTimeStep == 0) {
              this.timeSteps.push(valueArray.length / numberOfPointsTimeStep);
              console.log("Detected Time Steps:" + this.timeSteps[this.timeSteps.length - 1]);

            } else {
              console.log("Size of the field values are not appropriate to the grid dimensions");
              return false;
            }
          }
        } else { // point data
          if (this.is3D) {
            var numberOfPointsTimeStep = this.dimensionX * this.dimensionY * this.dimensionZ;
            if (valueArray.length % numberOfPointsTimeStep == 0) {
              this.timeSteps.push(valueArray.length / numberOfPointsTimeStep);
              console.log("Detected Time Steps:" + this.timeSteps[this.timeSteps.length - 1]);
            } else {
              console.log("Size of the field values are not appropriate to the grid dimensions");
              return false;
            }
          } else {
            var numberOfPointsTimeStep = this.dimensionX * this.dimensionY;
            if (valueArray.length % numberOfPointsTimeStep == 0) {
              this.timeSteps.push(valueArray.length / numberOfPointsTimeStep);
              console.log("Detected Time Steps:" + this.timeSteps[this.timeSteps.length - 1]);
            } else {
              console.log("Size of the field values are not appropriate to the grid dimensions");
              return false;
            }
          }
        }

        this.fieldArray.push(valueArray);
        this.fieldType.push(type);

        return true;
      case 4: // "POLYDATA"

        return true;
      case 6: // "FIELD"

        return true;
      default:
        return false;
    }
  }

  /// for grid
  getNumberOfPoints() {
    return this.gridPoints.length;
  }



  insertGridPoint(point, index) {
    if (index < this.gridPoints.length){

      // get Max Min Center
      /*this.minX = Math.min(this.minX,point.x);
      this.minY = Math.min(this.minY,point.y);
      this.minZ = Math.min(this.minZ,point.z);
      this.maxX = Math.max(this.maxX,point.x);
      this.maxY = Math.max(this.maxY,point.y);
      this.maxZ = Math.max(this.maxZ,point.z);

      this.centerX = this.minX+(this.maxX-this.minX)/2;
      this.centerY = this.minY+(this.maxY-this.minY)/2;
      this.centerZ = this.minZ+(this.maxZ-this.minZ)/2;*/

      this.gridPoints[index] = point;
    }
    else {
      console.log("Error at the insertGridPoint function. The point array size is smaller than the index.");
      console.log(point.getXPos() + " " + point.getYPos() + " " + point.getZPos());
    }

  }

  /*getCenter(){
    return new THREE.Vector3(this.centerX, this.centerY, this.centerZ);
  }

  getMinPoint(){
    return new THREE.Vector3(this.minX, this.minY, this.minZ);
  }

  getMaxPoint(){
    return new THREE.Vector3(this.maxX, this.maxY, this.maxZ);
  }*/

  getPointArray(){
    return this.gridPoints;
  }

  setGrid_XDimension(val) {
    this.dimensionX = val;
  }

  setGrid_YDimension(val) {
    this.dimensionY = val;
  }

  setGrid_ZDimension(val) {
    this.dimensionZ = val;
  }

  getGrid_XDimension(val) {
    return this.dimensionX;
  }

  getGrid_YDimension(val) {
    return this.dimensionY;
  }

  getGrid_ZDimension(val) {
    return this.dimensionZ;
  }



  // for field


  // for both

  generateCells(ifield, time) {

    if (ifield > this.fieldArray.lenght - 1)
      return;

    if (time > this.timeSteps[ifield])
      return;

    this.cellArray = [];
    switch (this.gridType) {
      case 1: //STRUCTURED_POINTS

        return 0;

      case 3: //"UNSTRUCTURED_GRID"

        return 0;
      case 2: //"STRUCTURED_GRID"
      case 5: //"RECTILINEAR_GRID"

        var xyDim = this.dimensionX*this.dimensionY;
        var xyzDim = this.dimensionX*this.dimensionY*this.dimensionZ;
        var xyCellDim = (this.dimensionX-1)*(this.dimensionY-1);
        var xyzCellDim = (this.dimensionX-1)*(this.dimensionY-1)*(this.dimensionZ-1);
        var xCellDim = this.dimensionX-1;

        var tmp3D = this.is3D;

        if(tmp3D && this.dimensionZ==1){
          tmp3D=false;
        }
            if (tmp3D) {

              /////////////////////////////////////////////
              ////////////   3D
              /////////////////////////////////////////////

              ////////////////////////////////////////////////////////////////
                    // front and back plane

                for (var y = 0; y < this.dimensionY - 1; y++) {
                  for (var x = 0; x < this.dimensionX - 1; x++) {

                      /////////////////////////////////////////////
                      // back -> first z
                      var indexArray = [x + y * this.dimensionX,
                        (x + 1) + y * this.dimensionX,
                        (x + 1) + (y + 1) * this.dimensionX,
                        x + (y + 1) * this.dimensionX
                      ];

                      var averageValue;

                      if (this.fieldType[ifield]) {
                        // cell values
                        averageValue = this.fieldArray[ifield][x + y * xCellDim + time * xyzCellDim];
                      } else {
                        // cell points
                        averageValue = (this.fieldArray[ifield][x + y * this.dimensionX + time * xyzDim]+
                          this.fieldArray[ifield][(x + 1) + y * this.dimensionX+  time * xyzDim]+
                          this.fieldArray[ifield][(x + 1) + (y + 1) * this.dimensionX+  time * xyzDim]+
                          this.fieldArray[ifield][x + (y + 1) * this.dimensionX+  time * xyzDim])/4;


                      }

                      var tmpCell = new class_Cell(indexArray, averageValue, 1, this.fieldType[ifield]);
                      this.cellArray.push(tmpCell);

                      /////////////////////////////////////////////
                      // front -> last z

                      var lastZIndex = this.dimensionZ- 1;
                      indexArray = [x + y * this.dimensionX + lastZIndex*xyDim,
                        (x + 1) + y * this.dimensionX+ lastZIndex*xyDim,
                        (x + 1) + (y + 1) * this.dimensionX+ lastZIndex*xyDim,
                        x + (y + 1) * this.dimensionX+ lastZIndex*xyDim
                      ];



                      if (this.fieldType[ifield]) {
                        // cell values
                        averageValue = this.fieldArray[ifield][x + y * xCellDim + (lastZIndex-1)* xyCellDim + time * xyzCellDim];
                      } else {
                        // cell points
                        averageValue = (this.fieldArray[ifield][x + y * this.dimensionX + lastZIndex*xyDim + time * xyzDim]+
                          this.fieldArray[ifield][(x + 1) + y * this.dimensionX+ lastZIndex*xyDim + time * xyzDim]+
                          this.fieldArray[ifield][(x + 1) + (y + 1) * this.dimensionX+ lastZIndex*xyDim + time * xyzDim]+
                          this.fieldArray[ifield][x + (y + 1) * this.dimensionX+ lastZIndex*xyDim + time * xyzDim])/4;

                          //averageValue=500;
                      }

                     var tmpCell2 = new class_Cell(indexArray, averageValue, 1, this.fieldType[ifield]);
                     this.cellArray.push(tmpCell2);

                    }
                  }


                  ////////////////////////////////////////////////////////////
                // left and right side plane
              for (var y = 0; y < this.dimensionY - 1; y++) {
                  for (var z = 0; z < this.dimensionZ - 1; z++) {

                    // left -> first x
                    var indexArray = [y * this.dimensionX + z*xyDim,
                      y * this.dimensionX+ (z+1)*xyDim,
                      (y + 1) * this.dimensionX+ (z+1)*xyDim,
                      (y + 1) * this.dimensionX+ z*xyDim
                    ];

                    var averageValue;
                    if (this.fieldType[ifield]) {
                      // cell values

                      averageValue = this.fieldArray[ifield][y * xCellDim + z*xyDim + time * xyzCellDim];


                    } else {
                      // cell points
                      averageValue = (this.fieldArray[ifield][y * this.dimensionX + time * xyzDim]+
                        this.fieldArray[ifield][y * this.dimensionX+ (z+1)*xyDim+  time * xyzDim]+
                        this.fieldArray[ifield][(y + 1) * this.dimensionX+ (z+1)*xyDim+  time * xyzDim]+
                        this.fieldArray[ifield][(y + 1) * this.dimensionX+ z*xyDim+  time * xyzDim])/4;
                    }

                    var tmpCell = new class_Cell(indexArray, averageValue, 1, this.fieldType[ifield]);
                    this.cellArray.push(tmpCell);

                    /////////////////////////////////////////////
                    // right -> last x
                    var lastXIndex = this.dimensionX- 1;
                    indexArray = [lastXIndex+y * this.dimensionX + z*xyDim,
                      lastXIndex+y * this.dimensionX+ (z+1)*xyDim,
                      lastXIndex+(y + 1) * this.dimensionX+ (z+1)*xyDim,
                      lastXIndex+(y + 1) * this.dimensionX+ z*xyDim
                    ];


                    if (this.fieldType[ifield]) {
                      // cell values
                      averageValue = this.fieldArray[ifield][(lastXIndex-1) + y * xCellDim + z* xyCellDim + time * xyzCellDim];
                    } else {
                      // cell points
                      averageValue = (this.fieldArray[ifield][lastXIndex + y * this.dimensionX + time * xyzDim]+
                        this.fieldArray[ifield][lastXIndex+y * this.dimensionX+ (z+1)*xyDim+  time * xyzDim]+
                        this.fieldArray[ifield][lastXIndex+(y + 1) * this.dimensionX+ (z+1)*xyDim+  time * xyzDim]+
                        this.fieldArray[ifield][lastXIndex+(y + 1) * this.dimensionX+ z*xyDim+  time * xyzDim])/4;
                    }

                   var tmpCell2 = new class_Cell(indexArray, averageValue, 1, this.fieldType[ifield]);
                    this.cellArray.push(tmpCell2);

                  }}

                  ////////////////////////////////////////////////////////////
                    // top and bottom plane

                    for (var x = 0; x < this.dimensionX - 1; x++) {
                      for (var z = 0; z < this.dimensionZ - 1; z++) {

                        // bottom -> first y
                        var indexArray = [x + z*xyDim,
                          x+ (z+1)*xyDim,
                          (x + 1) + (z+1)*xyDim,
                          (x + 1) + z*xyDim
                        ];

                        var averageValue;
                        if (this.fieldType[ifield]) {
                          // cell values
                          averageValue = this.fieldArray[ifield][x + z*xyDim + time * xyzCellDim];
                        } else {
                          // cell points
                          averageValue = (this.fieldArray[ifield][x + time * xyzDim]+
                            this.fieldArray[ifield][x+ (z+1)*xyDim+  time * xyzDim]+
                            this.fieldArray[ifield][(x + 1) + (z+1)*xyDim+  time * xyzDim]+
                            this.fieldArray[ifield][(x + 1) + z*xyDim+  time * xyzDim])/4;
                        }

                        var tmpCell = new class_Cell(indexArray, averageValue, 1, this.fieldType[ifield]);
                        this.cellArray.push(tmpCell);

                        /////////////////////////////////////////////
                        // top -> last y
                        var lastYIndex = this.dimensionY- 1;

                        var indexArray = [x +lastYIndex * this.dimensionX+ z*xyDim,
                          x +lastYIndex * this.dimensionX+ (z+1)*xyDim,
                          (x + 1) +lastYIndex * this.dimensionX+ (z+1)*xyDim,
                          (x + 1) +lastYIndex * this.dimensionX+ z*xyDim
                        ];


                        if (this.fieldType[ifield]) {
                          // cell values
                          averageValue = this.fieldArray[ifield][x + (lastYIndex-1) * xCellDim + z* xyCellDim + time * xyzCellDim];
                        } else {
                          // cell points
                          averageValue = (this.fieldArray[ifield][x + lastYIndex * this.dimensionX + time * xyzDim]+
                            this.fieldArray[ifield][x+lastYIndex * this.dimensionX+ (z+1)*xyDim+  time * xyzDim]+
                            this.fieldArray[ifield][(x + 1)+lastYIndex * this.dimensionX+ (z+1)*xyDim+  time * xyzDim]+
                            this.fieldArray[ifield][(x + 1)+lastYIndex * this.dimensionX+ z*xyDim+  time * xyzDim])/4;
                        }

                       var tmpCell2 = new class_Cell(indexArray, averageValue, 3, this.fieldType[ifield]);
                        this.cellArray.push(tmpCell2);

                      }}//*/


            } else {

              /////////////////////////////////////////////
              ////////////   2D
              /////////////////////////////////////////////

              for (var y = 0; y < this.dimensionY - 1; y++) {
                for (var x = 0; x < this.dimensionX - 1; x++) {

                  // cell points
                  var indexArray = [x + y * this.dimensionX,
                    (x + 1) + y * this.dimensionX,
                    (x + 1) + (y + 1) * this.dimensionX,
                    x + (y + 1) * this.dimensionX
                  ];

                  var averageValue;
                  if (this.fieldType[ifield]) {
                    // cell values
                    averageValue = this.fieldArray[ifield][x + (y * xCellDim) + time * xyCellDim];

                  } else {
                    // cell points
                    averageValue = (this.fieldArray[ifield][x + y * this.dimensionX + time * xyDim]+
                      this.fieldArray[ifield][(x + 1) + y * this.dimensionX + time * xyDim]+
                      this.fieldArray[ifield][(x + 1) + (y + 1) * this.dimensionX + time * xyDim]+
                      this.fieldArray[ifield][x + (y + 1) * this.dimensionX + time * xyDim])/4;
                  }

                  var tmpCell = new class_Cell(indexArray, averageValue, 1, this.fieldType[ifield]);



                  this.cellArray.push(tmpCell);
                }

              }
        }

        return this.cellArray.length;
      case 4: // "POLYDATA"

        return 0;
      case 6: // "FIELD"

        return 0;
      default:
        return 0;
    }

  }


  getNumberOfCells() {
    return this.cellArray.length;
  }

  getCell(index){

    return this.cellArray[index];

  }

  getNumberOfFields(){
    return this.fieldArray.length;
  }

  getNumberOfFieldValues(fieldIndex){
    if(fieldIndex<this.fieldArray.length){
      return this.fieldArray[fieldIndex].length;
    }else {
      return 0;
    }
  }

  getFieldValue(fieldIndex, index){
    if(fieldIndex<this.fieldArray.length){
      if(index<this.fieldArray[fieldIndex].length){
        return this.fieldArray[fieldIndex][index];
      }else {
        return undefined;
      }
    }else {
      return undefined;
    }
  }

  getFieldTimeValue(fieldIndex,time, index){

    if(fieldIndex<this.fieldArray.length){
      var numValPerTime = this.fieldArray[fieldIndex].length/this.timeSteps[fieldIndex];
      if(index<numValPerTime){
        var startIndex = numValPerTime*(time);
        return this.fieldArray[fieldIndex][startIndex+index];
      }else {
        return undefined;
      }
    }else {
      return undefined;
    }

  }

  getNumValPerTime(fieldIndex){
    if(fieldIndex<this.fieldArray.length){
      return this.fieldArray[fieldIndex].length/this.timeSteps[fieldIndex];
    }else {
      return 0;
    }
  }

  getNumberOfTimeSteps(fieldIndex){
    if(fieldIndex<this.fieldArray.length){
      return this.timeSteps[fieldIndex];
    }else {
      return 0;
    }
  }

  getMinField(fieldIndex){
    if(fieldIndex<this.fieldArray.length){

      var minVal = Infinity;
      for (var i = 0; i < this.fieldArray[fieldIndex].length; i++) {
        minVal=Math.min(minVal, this.fieldArray[fieldIndex][i]);
      }

      return minVal;
    }else {
      return undefined;
    }
  }

  getMaxField(fieldIndex){
    if(fieldIndex<this.fieldArray.length){
      var maxVal = -Infinity;
      for (var i = 0; i < this.fieldArray[fieldIndex].length; i++) {
        maxVal=Math.max(maxVal, this.fieldArray[fieldIndex][i]);
      }

      return maxVal;
    }else {
      return undefined;
    }
  }


  getMinTimeStep(fieldIndex,timeStep){


    if(fieldIndex<this.fieldArray.length){

      var numValPerTime = this.fieldArray[fieldIndex].length/this.timeSteps[fieldIndex];
      var startIndex = numValPerTime*(timeStep);

      var minVal = Infinity;
      for (var i = startIndex; i < startIndex+numValPerTime; i++) {
        minVal=Math.min(minVal, this.fieldArray[fieldIndex][i]);
      }

      return minVal;
    }else {
      return undefined;
    }

  }

  getMaxTimeStep(fieldIndex,timeStep){

    if(fieldIndex<this.fieldArray.length){

      var numValPerTime = this.fieldArray[fieldIndex].length/this.timeSteps[fieldIndex];
      var startIndex = numValPerTime*(timeStep);

      var maxVal = -Infinity;
      for (var i = startIndex; i < startIndex+numValPerTime; i++) {
        maxVal=Math.max(maxVal, this.fieldArray[fieldIndex][i]);
      }

      return maxVal;
    }else {
      return undefined;
    }

  }
}
