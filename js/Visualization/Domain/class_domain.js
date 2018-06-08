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
    this.dimensionX = 0;
    this.dimensionY = 0;
    this.dimensionZ = 0;
    this.is3D = is3D;
    this.gridPoints = new Array(numberOfPoints);
    this.cellArray = [];

  }

  addNewField(valueArray, type) {

    this.fieldArray.push(valueArray);
    this.fieldType.push(type);

    switch (this.gridType) {
      case 1: //STRUCTURED_POINTS

        return true;
      case 2: //"STRUCTURED_GRID"
      case 3: //"UNSTRUCTURED_GRID"
      case 5: //"RECTILINEAR_GRID"

        if (type) { // cell data
          if (this.is3D) {
            var numberOfPointsTimeStep = (this.dimensionX - 1) * (this.dimensionY - 1) * (this.dimensionZ - 1);
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
    if (index < this.gridPoints.length)
      this.gridPoints[index] = point;
    else {
      console.log("Error at the insertGridPoint function. The point array size is smaller than the index.");
      console.log(point.getXPos() + " " + point.getYPos() + " " + point.getZPos());
    }

  }

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
      case 2: //"STRUCTURED_GRID"
      case 3: //"UNSTRUCTURED_GRID"
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

        for (var x = 0; x < this.dimensionX - 1; x++) {

          for (var y = 0; y < this.dimensionY - 1; y++) {

            if (tmp3D) {
              for (var z = 0; z < this.dimensionZ- 1; z++) {
                // cell points
                var pointArray = [x + y * this.dimensionX + z*xyDim,
                  (x + 1) + y * this.dimensionX+ z*xyDim,
                  (x + 1) + (y + 1) * this.dimensionX+ z*xyDim,
                  x + (y + 1) * this.dimensionX+ z*xyDim,
                  x + (y + 1) * this.dimensionX+ (z+1)*xyDim,
                  (x + 1) + (y + 1) * this.dimensionX+ (z+1)*xyDim,
                  (x + 1) + y * this.dimensionX+ (z+1)*xyDim,
                  x + y * this.dimensionX+ (z+1)*xyDim
                ];

                var valueArray;
                if (this.fieldType[ifield]) {
                  // cell values
                  valueArray = [this.fieldArray[ifield][x + y * this.dimensionX + z*xyDim + time * xyzDim],
                    this.fieldArray[ifield][(x + 1) + y * this.dimensionX+ z*xyDim + time * xyzDim],
                    this.fieldArray[ifield][(x + 1) + (y + 1) * this.dimensionX+ z*xyDim + time * xyzDim],
                    this.fieldArray[ifield][x + (y + 1) * this.dimensionX+ z*xyDim + time * xyzDim],
                    this.fieldArray[ifield][x + (y + 1) * this.dimensionX+ (z+1)*xyDim + time * xyzDim],
                    this.fieldArray[ifield][(x + 1) + (y + 1) * this.dimensionX+ (z+1)*xyDim + time * xyzDim],
                    this.fieldArray[ifield][(x + 1) + y * this.dimensionX+ (z+1)*xyDim + time * xyzDim],
                    this.fieldArray[ifield][x + y * this.dimensionX+ (z+1)*xyDim + time * xyzDim]
                  ];
                } else {
                  // cell points
                  valueArray = [this.fieldArray[ifield][x + y * xCellDim + z* xyCellDim + time * xyzCellDim]];
                }

                var tmpCell = new class_Cell(pointArray, valueArray, 3, this.fieldType[ifield]);
                this.cellArray.push(tmpCell);
              }
            } else {

              // cell points
              var pointArray = [x + y * this.dimensionX,
                (x + 1) + y * this.dimensionX,
                (x + 1) + (y + 1) * this.dimensionX,
                x + (y + 1) * this.dimensionX
              ];

              var valueArray;
              if (this.fieldType[ifield]) {
                // cell values
                valueArray = [this.fieldArray[ifield][x + y * this.dimensionX + time * xyDim],
                  this.fieldArray[ifield][(x + 1) + y * this.dimensionX + time * xyDim],
                  this.fieldArray[ifield][(x + 1) + (y + 1) * this.dimensionX + time * xyDim],
                  this.fieldArray[ifield][x + (y + 1) * this.dimensionX + time * xyDim]
                ];
              } else {
                // cell points
                valueArray = [this.fieldArray[ifield][x + y * xCellDim + time * xyCellDim]];
              }

              var tmpCell = new class_Cell(pointArray, valueArray, 1, this.fieldType[ifield]);

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


}
