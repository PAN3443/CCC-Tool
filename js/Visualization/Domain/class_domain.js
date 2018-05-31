////////////////////////////////////////////////
// ------------ Class Domain ---------------//
////////////////////////////////////////////////

class class_Domain{
    constructor(gridtype, numberOfPoints, is3D) {
        this.name = "";
        this.gridType=gridtype;
        this.fieldArray=[];
        this.timeSteps=[];
        this.fieldType=[];
        this.dimensionX = 0;
        this.dimensionY = 0;
        this.dimensionZ = 0;
        this.is3D=is3D;
        this.gridPoints= new Array(numberOfPoints);

     }

    addNewField(valueArray,type){
        this.fieldArray.push(valueArray);
        this.fieldType.push(type);

        switch (this.gridType) {
          case 1: //STRUCTURED_POINTS

            return true;
            case 2://"STRUCTURED_GRID"
            case 3://"UNSTRUCTURED_GRID"
            case 5://"RECTILINEAR_GRID"

              if(type){ // cell data
                if(this.is3D){
                  var numberOfPointsTimeStep = (this.dimensionX-1)*(this.dimensionY-1)*(this.dimensionZ-1);
                  if(valueArray.length%numberOfPointsTimeStep==0){
                      this.timeSteps.push(valueArray.length/numberOfPointsTimeStep);
                      console.log("Detected Time Steps:"+this.timeSteps[this.timeSteps.length-1]);
                  }
                  else{
                    console.log("Size of the field values are not appropriate to the grid dimensions");
                    return false;
                  }
                }
                else {
                  var numberOfPointsTimeStep = (this.dimensionX-1)*(this.dimensionY-1);
                  if(valueArray.length%numberOfPointsTimeStep==0){
                     this.timeSteps.push(valueArray.length/numberOfPointsTimeStep);
                     console.log("Detected Time Steps:"+this.timeSteps[this.timeSteps.length-1]);
                  }
                  else{
                    console.log("Size of the field values are not appropriate to the grid dimensions");
                    return false;
                  }
                }
              }
              else{ // point data
                if(this.is3D){
                  var numberOfPointsTimeStep = this.dimensionX*this.dimensionY*this.dimensionZ;
                  if(valueArray.length%numberOfPointsTimeStep==0){
                      this.timeSteps.push(valueArray.length/numberOfPointsTimeStep);
                      console.log("Detected Time Steps:"+this.timeSteps[this.timeSteps.length-1]);
                  }
                  else{
                    console.log("Size of the field values are not appropriate to the grid dimensions");
                    return false;
                  }
                }
                else {
                  var numberOfPointsTimeStep = this.dimensionX*this.dimensionY;
                  if(valueArray.length%numberOfPointsTimeStep==0){
                     this.timeSteps.push(valueArray.length/numberOfPointsTimeStep);
                     console.log("Detected Time Steps:"+this.timeSteps[this.timeSteps.length-1]);
                  }
                  else{
                    console.log("Size of the field values are not appropriate to the grid dimensions");
                    return false;
                  }
                }
              }

              return true;
            case 4:// "POLYDATA"

              return true;
            case 6:// "FIELD"

              return true;
            default:
              return false;
          }
    }

    /// for grid
    getNumberOfPoints(){
      return this.gridPoints.length;
    }

    insertGridPoint(point, index){
      if(index<this.gridPoints.length)
        this.gridPoints[index]=point;
      else{
        console.log("Error at the insertGridPoint function. The point array size is smaller than the index.");
        console.log(point.getXPos()+" "+point.getYPos()+" "+point.getZPos());
      }

    }

    setGrid_XDimension(val){
      this.dimensionX = val;
    }

    setGrid_YDimension(val){
      this.dimensionY = val;
    }

    setGrid_ZDimension(val){
      this.dimensionZ = val;
    }

    getGrid_XDimension(val){
      return this.dimensionX;
    }

    getGrid_YDimension(val){
      return this.dimensionY;
    }

    getGrid_ZDimension(val){
      return this.dimensionZ;
    }

    // for field


    // for both


}
