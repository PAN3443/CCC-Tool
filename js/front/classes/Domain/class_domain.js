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
    this.faceRelationArray = [];
    this.numberOfFaces = undefined;

    //////
    // THE CELL ARRAY
    //      Grid index f
    //
    //                                f=1                                   f=2                               f3
    //  [ [[gridID,facevertex],[gridID,facevertex],[gridID,facevertex]], undefined , [[gridID,facevertex],[gridID,facevertex],[gridID,facevertex]],   ....  ]
    //
    // with this array the algorithm has to calculate the colors only for field values with are part of a face. And the algo knows how many faces are using this field value


    /*this.minX, this.minY, this.minZ = Infinity;
    this.maxX, this.maxY, this.maxZ = -Infinity;
    this.centerX, this.centerY, this.centerZ = undefined;*/
  }

  addNewField(valueArray, type) {

    switch (this.gridType) {
      case 1: //STRUCTURED_POINTS

        //return true;
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

    this.faceRelationArray = [];

    this.numberOfFaces = undefined;
    var faceindex =0;

    switch (this.gridType) {


      case 3: //"UNSTRUCTURED_GRID"

        return 0;

      case 1: //STRUCTURED_POINTS //return 0;
      case 2: //"STRUCTURED_GRID"
      case 5: //"RECTILINEAR_GRID"

        var xyDim = this.dimensionX*this.dimensionY;

        var tmp3D = this.is3D;
        var xyDim = this.dimensionX*this.dimensionY;
        var xyzDim = this.dimensionX*this.dimensionY*this.dimensionZ;
        var xyCellDim = (this.dimensionX-1)*(this.dimensionY-1);
        var xyzCellDim = (this.dimensionX-1)*(this.dimensionY-1)*(this.dimensionZ-1);
        var xCellDim = this.dimensionX-1;

        if(tmp3D && this.dimensionZ==1){
          tmp3D=false;
        }
            if (tmp3D) {

              /////////////////////////////////////////////
              ////////////   3D
              /////////////////////////////////////////////

              for (var i = 0; i < xyzDim; i++) {
                this.faceRelationArray.push(undefined);
              }


              for (var z = 0; z < this.dimensionZ; z++) {
                for (var y = 0; y < this.dimensionY; y++) {
                   for (var x = 0; x < this.dimensionX; x++){


                    /////////////////////
                    /// FRONT
                    if(z==0){

                        // front
                        if(y!=0 && x!=0){

                          /////////////////////////////////////////////////////////////
                          //       y
                          //        ^
                          //        |
                          //        |---> x
                          //
                          //
                          //  preIndex               *-------------*   currentIndex
                          //                         |           / |
                          //                         |         /   |
                          //                         |      /      |
                          //                         |   /         |
                          //                         |/            |
                          //  preIndexLastLoop       *-------------*  currentIndexLastLoop
                          //
                          var currentIndex =  y* this.dimensionX +x;
                          var preIndex = currentIndex-1;
                          var currentIndexLastLoop = (y-1)*this.dimensionX +x;
                          var preIndexLastLoop = currentIndexLastLoop-1;


                          if (this.fieldType[ifield]) {
                            // cell values
                            fieldIndex = (x-1) + (y-1) * xCellDim +  time * xyzCellDim;

                            this.addCells(preIndexLastLoop, fieldIndex, faceindex, 0);
                            this.addCells(preIndex, fieldIndex, faceindex, 1);
                            this.addCells(currentIndex, fieldIndex, faceindex, 2);
                            faceindex++;

                            this.addCells(preIndexLastLoop, fieldIndex,faceindex, 0);
                            this.addCells(currentIndex,fieldIndex,faceindex, 1);
                            this.addCells(currentIndexLastLoop,fieldIndex,faceindex, 2);
                            faceindex++;

                          } else {
                            // cell points
                              this.addCells(preIndexLastLoop, preIndexLastLoop+time * xyzDim, faceindex, 0);
                              this.addCells(preIndex,preIndex+time * xyzDim, faceindex, 1);
                              this.addCells(currentIndex,currentIndex+time * xyzDim, faceindex, 2);
                              faceindex++;

                              this.addCells(preIndexLastLoop, preIndexLastLoop+time * xyzDim, faceindex, 0);
                              this.addCells(currentIndex,currentIndex+time * xyzDim, faceindex, 1);
                              this.addCells(currentIndexLastLoop,currentIndexLastLoop+time * xyzDim, faceindex, 2);
                              faceindex++;


                          }

                          //var indexArray  = [preIndexLastLoop,preIndex,currentIndex,currentIndexLastLoop];



                        }
                    }
                    else{

                      /////////////////////
                      /// Back
                      if(z==this.dimensionZ-1 && y!=0 && x!=0){
                        /////////////////////////////////////////////////////////////
                        //       G
                        //        ^
                        //        |
                        //        |---> R
                        //
                        //
                        //  preIndex               *-------------*   currentIndex
                        //                         |           / |
                        //                         |         /   |
                        //                         |      /      |
                        //                         |   /         |
                        //                         |/            |
                        //  preIndexLastLoop       *-------------*  currentIndexLastLoop
                        //

                        var currentIndex =  z*xyDim + y* this.dimensionX +x;
                        var preIndex = currentIndex-1;
                        var currentIndexLastLoop = z*xyDim+(y-1)*this.dimensionX +x;
                        var preIndexLastLoop = currentIndexLastLoop-1;



                        //var indexArray  = [currentIndex,preIndex,preIndexLastLoop,currentIndexLastLoop];

                        if (this.fieldType[ifield]) {
                          // cell values
                          fieldIndex = (x-1) + (y-1) * xCellDim + (z-1)*xyCellDim + time * xyzCellDim;

                          this.addCells(currentIndex, fieldIndex, faceindex, 0);
                          this.addCells(preIndex, fieldIndex, faceindex, 1);
                          this.addCells(preIndexLastLoop, fieldIndex, faceindex, 2);
                          faceindex++;

                          this.addCells(currentIndex, fieldIndex, faceindex, 0);
                          this.addCells(preIndexLastLoop, fieldIndex, faceindex, 1);
                          this.addCells(currentIndexLastLoop, fieldIndex, faceindex, 2);
                          faceindex++;

                        } else {
                          // cell points



                            this.addCells(currentIndex,currentIndex+time * xyzDim, faceindex, 0);
                            this.addCells(preIndex,preIndex+time * xyzDim, faceindex, 1);
                            this.addCells(preIndexLastLoop,preIndexLastLoop+time * xyzDim, faceindex, 2);
                            faceindex++;


                            this.addCells(currentIndex,currentIndex+time * xyzDim, faceindex, 0);
                            this.addCells(preIndexLastLoop,preIndexLastLoop+time * xyzDim, faceindex, 1);
                            this.addCells(currentIndexLastLoop,currentIndexLastLoop+time * xyzDim, faceindex, 2);
                            faceindex++;

                        }

                      } // Back end

                      /////////////////////
                      /// Left Side
                      if(x==0 && y!=0){

                        /////////////////////////////////////////////////////////////
                        //       G
                        //        ^
                        //        |
                        //        |---> B
                        //
                        //
                        //  currentIndexLastZ      *-------------*   currentIndex
                        //  (g,b-1)                |           / |   (g,b)
                        //                         |         /   |
                        //                         |      /      |
                        //                         |   /         |
                        //                         |/            |
                        //  preIndexLastZ          *-------------*  preIndex
                        //  (g-1,b-1)                                 (g-1,b)

                        /////////////////////////////////////////////////////////////
                        //       Y
                        //        ^
                        //        |
                        //        |---> z
                        //
                        //
                        //  currentIndexLastZ      *-------------*   currentIndex
                        //  (y,z-1)                |           / |   (y,z)
                        //                         |         /   |
                        //                         |      /      |
                        //                         |   /         |
                        //                         |/            |
                        //  preIndexLastZ          *-------------*  preIndex
                        //  (y-1,z-1)                                 (y-1,z)

                        var currentIndex = z*xyDim + y* this.dimensionX;
                        var preIndex = currentIndex - this.dimensionX;
                        var currentIndexLastZ = (z-1)*xyDim+y*this.dimensionX;
                        var preIndexLastZ = currentIndexLastZ-this.dimensionX;

                        //var indexArray  = [currentIndex,currentIndexLastZ,preIndexLastZ,preIndex];


                        if (this.fieldType[ifield]) {
                          // cell values
                          fieldIndex =  (y-1) * xCellDim + (z-1)*xyCellDim + time * xyzCellDim;

                          this.addCells(currentIndex,fieldIndex, faceindex, 0);
                          this.addCells(currentIndexLastZ,fieldIndex, faceindex, 1);
                          this.addCells(preIndexLastZ,fieldIndex, faceindex, 2);
                          faceindex++;

                          this.addCells(currentIndex,fieldIndex, faceindex, 0);
                          this.addCells(preIndexLastZ,fieldIndex, faceindex, 1);
                          this.addCells(preIndex,fieldIndex, faceindex, 2);
                          faceindex++;

                        } else {
                          // cell points

                            this.addCells(currentIndex,currentIndex+time * xyzDim, faceindex, 0);
                            this.addCells(currentIndexLastZ,currentIndexLastZ+time * xyzDim, faceindex, 1);
                            this.addCells(preIndexLastZ,preIndexLastZ+time * xyzDim, faceindex, 2);
                            faceindex++;

                            this.addCells(currentIndex,currentIndex+time * xyzDim, faceindex, 0);
                            this.addCells(preIndexLastZ,preIndexLastZ+time * xyzDim, faceindex, 1);
                            this.addCells(preIndex,preIndex+time * xyzDim,faceindex, 2);
                            faceindex++;

                        }

                      }

                      //////////////////////
                      /// Right Side
                      if(x==this.dimensionX-1 && y!=0){

                        /////////////////////////////////////////////////////////////
                        //       G
                        //        ^
                        //        |
                        //        |---> B
                        //
                        //
                        //  currentIndexLastZ      *-------------*   currentIndex
                        //  (g,b-1)                |           / |   (g,b)
                        //                         |         /   |
                        //                         |      /      |
                        //                         |   /         |
                        //                         |/            |
                        //  preIndexLastZ          *-------------*  preIndex
                        //  (g-1,b-1)                                 (g-1,b)

                        var currentIndex = z*xyDim + y* this.dimensionX+x;
                        var preIndex = currentIndex - this.dimensionX;
                        var currentIndexLastZ = (z-1)*xyDim+y*this.dimensionX+x;
                        var preIndexLastZ = currentIndexLastZ-this.dimensionX;

                        //var indexArray  = [preIndexLastZ,currentIndexLastZ,currentIndex,preIndex];

                        if (this.fieldType[ifield]) {
                          // cell values
                          fieldIndex = (x-1) + (y-1) * xCellDim + (z-1)*xyCellDim + time * xyzCellDim;

                          this.addCells(preIndexLastZ,fieldIndex, faceindex, 0);
                          this.addCells(currentIndexLastZ,fieldIndex, faceindex, 1);
                          this.addCells(currentIndex,fieldIndex, faceindex, 2);
                          faceindex++;

                          this.addCells(preIndexLastZ,fieldIndex, faceindex, 0);
                          this.addCells(currentIndex,fieldIndex, faceindex, 1);
                          this.addCells(preIndex,fieldIndex, faceindex, 2);
                          faceindex++;

                        } else {
                          // cell points

                            this.addCells(preIndexLastZ,preIndexLastZ+time * xyzDim, faceindex, 0);
                            this.addCells(currentIndexLastZ,currentIndexLastZ+time * xyzDim, faceindex, 1);
                            this.addCells(currentIndex,currentIndex+time * xyzDim, faceindex, 2);
                            faceindex++;

                            this.addCells(preIndexLastZ,preIndexLastZ+time * xyzDim, faceindex, 0);
                            this.addCells(currentIndex,currentIndex+time * xyzDim, faceindex, 1);
                            this.addCells(preIndex,preIndex+time * xyzDim, faceindex, 2);
                            faceindex++;

                        }


                      }


                      /////////////////////
                      /// Bottom Side
                      if(y==0 && x!=0){
                        /////////////////////////////////////////////////////////////
                        //       G
                        //        ^
                        //        |
                        //        |---> B
                        //
                        //
                        //   preIndexLastZ         *-------------*   currentIndexLastZ
                        //  (r-1,b-1)              |           / |   (r,b-1)
                        //                         |         /   |
                        //                         |      /      |
                        //                         |   /         |
                        //                         |/            |
                        //   preIndex              *-------------*   currentIndex
                        //  (r-1,b)                                  (r,b)

                        /////////////////////////////////////////////////////////////
                        //       X
                        //        ^
                        //        |
                        //        |---> Z
                        //
                        //
                        //   preIndexLastZ         *-------------*   currentIndexLastZ
                        //  (x-1,z-1)              |           / |   (x,z-1)
                        //                         |         /   |
                        //                         |      /      |
                        //                         |   /         |
                        //                         |/            |
                        //   preIndex              *-------------*   currentIndex
                        //  (x-1,z)                                  (x,z)

                        var currentIndex = z*xyDim +x;
                        var preIndex = currentIndex-1;
                        var currentIndexLastZ = (z-1)*xyDim+x;
                        var preIndexLastZ = currentIndexLastZ-1;

                        //var indexArray  = [preIndex,preIndexLastZ,currentIndexLastZ,currentIndex];


                        if (this.fieldType[ifield]) {
                          // cell values
                          fieldIndex = (x-1) + (z-1)*xyCellDim + time * xyzCellDim;

                          this.addCells(preIndex,fieldIndex, faceindex, 0);
                          this.addCells(preIndexLastZ,fieldIndex, faceindex, 1);
                          this.addCells(currentIndexLastZ,fieldIndex, faceindex, 2);
                          faceindex++;

                          this.addCells(preIndex,fieldIndex, faceindex, 0);
                          this.addCells(currentIndexLastZ,fieldIndex, faceindex, 1);
                          this.addCells(currentIndex,fieldIndex, faceindex, 2);
                          faceindex++;

                        } else {
                          // cell points

                            this.addCells(preIndex,preIndex+time * xyzDim, faceindex, 0);
                            this.addCells(preIndexLastZ,preIndexLastZ+time * xyzDim, faceindex, 1);
                            this.addCells(currentIndexLastZ,currentIndexLastZ+time * xyzDim, faceindex, 2);
                            faceindex++;

                            this.addCells(preIndex,preIndex+time * xyzDim, faceindex, 0);
                            this.addCells(currentIndexLastZ,currentIndexLastZ+time * xyzDim, faceindex, 1);
                            this.addCells(currentIndex,currentIndex+time * xyzDim, faceindex, 2);
                            faceindex++;

                        }

                      }

                      /////////////////////
                      /// Top Side
                      if(y==this.dimensionY-1 && x!=0){
                        /////////////////////////////////////////////////////////////
                        //       G
                        //        ^
                        //        |
                        //        |---> B
                        //
                        //
                        //   preIndexLastZ         *-------------*   currentIndexLastZ
                        //  (r-1,b-1)              |           / |   (r,b-1)
                        //                         |         /   |
                        //                         |      /      |
                        //                         |   /         |
                        //                         |/            |
                        //   preIndex              *-------------*   currentIndex
                        //  (r-1,b)                                  (r,b)


                        var currentIndex = z*xyDim+ y* this.dimensionX +x;
                        var preIndex = currentIndex-1;
                        var currentIndexLastZ = (z-1)*xyDim+ y* this.dimensionX +x;
                        var preIndexLastZ = currentIndexLastZ-1;

                        var indexArray  = [currentIndexLastZ,preIndexLastZ,preIndex,currentIndex];




                        if (this.fieldType[ifield]) {
                          // cell values
                          fieldIndex = (x-1) + (y-1) * xCellDim + (z-1)*xyCellDim + time * xyzCellDim;

                          this.addCells(currentIndexLastZ,fieldIndex, faceindex, 0);
                          this.addCells(preIndexLastZ,fieldIndex, faceindex, 1);
                          this.addCells(preIndex,fieldIndex, faceindex, 2);
                          faceindex++;

                          this.addCells(currentIndexLastZ,fieldIndex, faceindex, 0);
                          this.addCells(preIndex,fieldIndex, faceindex, 1);
                          this.addCells(currentIndex,fieldIndex, faceindex, 2);
                          faceindex++;

                        } else {
                          // cell points

                            this.addCells(currentIndexLastZ,currentIndexLastZ+time * xyzDim, faceindex, 0);
                            this.addCells(preIndexLastZ,preIndexLastZ+time * xyzDim, faceindex, 1);
                            this.addCells(preIndex,preIndex+time * xyzDim, faceindex, 2);
                            faceindex++;

                            this.addCells(currentIndexLastZ,currentIndexLastZ+time * xyzDim, faceindex, 0);
                            this.addCells(preIndex,preIndex+time * xyzDim, faceindex, 1);
                            this.addCells(currentIndex,currentIndex+time * xyzDim, faceindex, 2);
                            faceindex++;

                        }

                      }


                    }


                  } // For loop end (r)
                } // For loop end (g)
              } // For loop end (b)


            } else {

              /////////////////////////////////////////////
              ////////////   2D
              /////////////////////////////////////////////


              for (var i = 0; i < xyDim; i++) {
                this.faceRelationArray.push(undefined);
              }

              for (var y = 1; y < this.dimensionY; y++) {
                for (var x = 1; x < this.dimensionX; x++) {

                  // cell points

                  /////////////////////////////////////////////////////////////
                  //       y
                  //        ^
                  //        |
                  //        |---> x
                  //
                  //
                  //  preIndex               *-------------*   currentIndex
                  //                         |           / |
                  //                         |         /   |
                  //                         |      /      |
                  //                         |   /         |
                  //                         |/            |
                  //  preIndexLastLoop       *-------------*  currentIndexLastLoop
                  //
                  var currentIndex =  y* this.dimensionX +x;
                  var preIndex = currentIndex-1;
                  var currentIndexLastLoop = (y-1)*this.dimensionX +x;
                  var preIndexLastLoop = currentIndexLastLoop-1;

                  //var indexArray  = [preIndexLastLoop,preIndex,currentIndex,currentIndexLastLoop];


                  if (this.fieldType[ifield]) {
                    // cell values
                    fieldIndex = (x-1) + (y-1) * xCellDim + time * xyCellDim;

                    this.addCells(preIndexLastLoop,fieldIndex, faceindex, 0);
                    this.addCells(preIndex,fieldIndex, faceindex, 1);
                    this.addCells(currentIndex,fieldIndex, faceindex, 2);
                    faceindex++;

                    this.addCells(preIndexLastLoop,fieldIndex, faceindex, 0);
                    this.addCells(currentIndex,fieldIndex, faceindex, 1);
                    this.addCells(currentIndexLastLoop,fieldIndex, faceindex, 2);
                    faceindex++;

                  } else {
                    // cell points

                      this.addCells(preIndexLastLoop,preIndexLastLoop+time * xyDim, faceindex, 0);
                      this.addCells(preIndex,preIndex+time * xyDim, faceindex, 1);
                      this.addCells(currentIndex,currentIndex+time * xyDim, faceindex, 2);
                      faceindex++;

                      this.addCells(preIndexLastLoop,preIndexLastLoop+time * xyDim, faceindex, 0);
                      this.addCells(currentIndex,currentIndex+time * xyDim, faceindex, 1);
                      this.addCells(currentIndexLastLoop,currentIndexLastLoop+time * xyDim, faceindex, 2);
                      faceindex++;

                  }


                }

              }
        }
        this.numberOfFaces = faceindex;
        return faceindex/2;
      case 4: // "POLYDATA"

        return 0;
      case 6: // "FIELD"

        return 0;
      default:
        return 0;
    }



  }



  addCells(gridIndex, fieldIndex, faceIndex, vertexIndex){
    if(this.faceRelationArray[gridIndex]==undefined){
      this.faceRelationArray[gridIndex] = [[faceIndex,vertexIndex,fieldIndex]];
    }
    else{
      this.faceRelationArray[gridIndex].push([faceIndex,vertexIndex,fieldIndex])
    }
  }

  getFieldType(fieldIndex){
    return this.fieldType[fieldIndex];
  }

  getNumberOfFaces() {
    return this.numberOfFaces;
  }

  getLengthOfFaceRelationArray(){

    return this.faceRelationArray.length;

  }

  getFaceRelations(index){

    return this.faceRelationArray[index];

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
