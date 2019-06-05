function calcTensorValueDif(testfield){

  var xDifArray = [];
  var yDifArray = [];
  var diagonal1DifArray = []; // x+1, y+1
  var diagonal2DifArray = []; // x-1, y+1
  var tmpMin = Infinity;
  var tmpMax = -Infinity;
  var minIndex =undefined;
  var maxIndex =undefined;

  if(testfield.length==0)
  return [];

  var xDim = testfield.length;
  var yDim = testfield[0].length;

  for (var x = 0; x < xDim; x++) {
    var tmpArrayX = [];
    var tmpArrayY = [];
    var tmpArrayDiagonal1 = [];
    var tmpArrayDiagonal2 = [];
    for (var y = 0; y < yDim; y++) {
      if(x!=xDim-1){
        var tmpVal = Math.abs(testfield[x][y]-testfield[x+1][y]);

        if(tmpVal<tmpMin){
          tmpMin=tmpVal;
          minIndex = [x,y,x+1,y];
        }

        if(tmpVal>tmpMax){
          tmpMax=tmpVal;
          maxIndex = [x,y,x+1,y];
        }

        tmpArrayX.push(tmpVal);
      }

      if(y!=yDim-1){
        var tmpVal = Math.abs(testfield[x][y]-testfield[x][y+1]);

        if(tmpVal<tmpMin){
          tmpMin=tmpVal;
          minIndex = [x,y,x,y+1];
        }

        if(tmpVal>tmpMax){
          tmpMax=tmpVal;
          maxIndex = [x,y,x,y+1];
        }

        tmpArrayY.push(tmpVal);
      }

      if(x!=xDim-1&&y!=yDim-1){
        var tmpVal = Math.abs(testfield[x][y]-testfield[x+1][y+1]);

        if(tmpVal<tmpMin){
          tmpMin=tmpVal;
          minIndex = [x,y,x+1,y+1];
        }

        if(tmpVal>tmpMax){
          tmpMax=tmpVal;
          maxIndex = [x,y,x+1,y+1];
        }
        tmpArrayDiagonal1.push(tmpVal);
      }

      if(x!=0&&y!=yDim-1){
        var tmpVal = Math.abs(testfield[x][y]-testfield[x-1][y+1]);

        if(tmpVal<tmpMin){
          tmpMin=tmpVal;
          minIndex = [x,y,x-1,y+1];
        }

        if(tmpVal>tmpMax){
          tmpMax=tmpVal;
          maxIndex = [x,y,x-1,y+1];
        }
        tmpArrayDiagonal2.push(tmpVal);
      }
    }
    xDifArray.push(tmpArrayX);
    yDifArray.push(tmpArrayY);
    diagonal1DifArray.push(tmpArrayDiagonal1);
    diagonal2DifArray.push(tmpArrayDiagonal2);
  }

  return [xDifArray,yDifArray,diagonal1DifArray,diagonal2DifArray,minIndex,maxIndex];
}

function calcTensorColorDif(colorField,colorDif){

  var xDifArray = [];
  var yDifArray = [];
  var diagonal1DifArray = []; // x+1, y+1
  var diagonal2DifArray = []; // x-1, y+1
  var tmpMin = Infinity;
  var tmpMax = -Infinity;
  var minIndex =undefined;
  var maxIndex =undefined;

  if(colorField.length==0)
  return [];

  var xDim = colorField.length;
  var yDim = colorField[0].length;

  switch (colorDif) {
    case 0: //
    case 3:
      for (var x = 0; x < xDim; x++) {
        var tmpArrayX = [];
        var tmpArrayY = [];
        var tmpArrayDiagonal1 = [];
        var tmpArrayDiagonal2 = [];
        for (var y = 0; y < yDim; y++) {
          if(x!=xDim-1){
            var tmpVal = calc3DEuclideanDistance(colorField[x][y],colorField[x+1][y]);
            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              minIndex = [x,y,x+1,y];
            }
            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              maxIndex = [x,y,x+1,y];
            }
            tmpArrayX.push(tmpVal);
          }

          if(y!=yDim-1){
            var tmpVal = calc3DEuclideanDistance(colorField[x][y],colorField[x][y+1]);
            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              minIndex = [x,y,x,y+1];
            }
            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              maxIndex = [x,y,x,y+1];
            }
            tmpArrayY.push(tmpVal);
          }

          if(x!=xDim-1&&y!=yDim-1){
            var tmpVal = calc3DEuclideanDistance(colorField[x][y],colorField[x+1][y+1]);

            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              minIndex = [x,y,x+1,y+1];
            }

            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              maxIndex = [x,y,x+1,y+1];
            }
            tmpArrayDiagonal1.push(tmpVal);
          }

          if(x!=0&&y!=yDim-1){
            var tmpVal = calc3DEuclideanDistance(colorField[x][y],colorField[x-1][y+1]);

            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              minIndex = [x,y,x-1,y+1];
            }

            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              maxIndex = [x,y,x-1,y+1];
            }
            tmpArrayDiagonal2.push(tmpVal);
          }
        }
        xDifArray.push(tmpArrayX);
        yDifArray.push(tmpArrayY);
        diagonal1DifArray.push(tmpArrayDiagonal1);
        diagonal2DifArray.push(tmpArrayDiagonal2);
      }
    break;
    case 1:
      for (var x = 0; x < xDim; x++) {
        var tmpArrayX = [];
        var tmpArrayY = [];
        var tmpArrayDiagonal1 = [];
        var tmpArrayDiagonal2 = [];
        for (var y = 0; y < yDim; y++) {
          if(x!=xDim-1){
            var tmpVal = calcDeltaDE94(colorField[x][y],colorField[x+1][y]);
            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              minIndex = [x,y,x+1,y];
            }
            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              maxIndex = [x,y,x+1,y];
            }
            tmpArrayX.push(tmpVal);
          }

          if(y!=yDim-1){
            var tmpVal = calcDeltaDE94(colorField[x][y],colorField[x][y+1]);
            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              minIndex = [x,y,x,y+1];
            }
            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              maxIndex = [x,y,x,y+1];
            }
            tmpArrayY.push(tmpVal);
          }

          if(x!=xDim-1&&y!=yDim-1){
            var tmpVal = calcDeltaDE94(colorField[x][y],colorField[x+1][y+1]);

            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              minIndex = [x,y,x+1,y+1];
            }

            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              maxIndex = [x,y,x+1,y+1];
            }
            tmpArrayDiagonal1.push(tmpVal);
          }

          if(x!=0&&y!=yDim-1){
            var tmpVal = calcDeltaDE94(colorField[x][y],colorField[x-1][y+1]);

            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              minIndex = [x,y,x-1,y+1];
            }

            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              maxIndex = [x,y,x-1,y+1];
            }
            tmpArrayDiagonal2.push(tmpVal);
          }

        }
        xDifArray.push(tmpArrayX);
        yDifArray.push(tmpArrayY);
        diagonal1DifArray.push(tmpArrayDiagonal1);
        diagonal2DifArray.push(tmpArrayDiagonal2);
      }
    break;
    case 2:
      for (var x = 0; x < xDim; x++) {
        var tmpArrayX = [];
        var tmpArrayY = [];
        var tmpArrayDiagonal1 = [];
        var tmpArrayDiagonal2 = [];
        for (var y = 0; y < yDim; y++) {

          if(x!=xDim-1){
            var tmpVal = calcDeltaCIEDE2000(colorField[x][y],colorField[x+1][y]);

            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              minIndex = [x,y,x+1,y];
            }

            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              maxIndex = [x,y,x+1,y];
            }

            tmpArrayX.push(tmpVal);
          }
          if(y!=yDim-1){
            var tmpVal = calcDeltaCIEDE2000(colorField[x][y],colorField[x][y+1]);

            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              minIndex = [x,y,x,y+1];
            }
            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              maxIndex = [x,y,x,y+1];
            }
            tmpArrayY.push(tmpVal);
          }

          if(x!=xDim-1&&y!=yDim-1){
            var tmpVal = calcDeltaCIEDE2000(colorField[x][y],colorField[x+1][y+1]);

            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              minIndex = [x,y,x+1,y+1];
            }

            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              maxIndex = [x,y,x+1,y+1];
            }
            tmpArrayDiagonal1.push(tmpVal);
          }

          if(x!=0&&y!=yDim-1){
            var tmpVal = calcDeltaCIEDE2000(colorField[x][y],colorField[x-1][y+1]);

            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              minIndex = [x,y,x-1,y+1];
            }

            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              maxIndex = [x,y,x-1,y+1];
            }
            tmpArrayDiagonal2.push(tmpVal);
          }
        }
        xDifArray.push(tmpArrayX);
        yDifArray.push(tmpArrayY);
        diagonal1DifArray.push(tmpArrayDiagonal1);
        diagonal2DifArray.push(tmpArrayDiagonal2);
      }
    break;
  }

  return [xDifArray,yDifArray,diagonal1DifArray,diagonal2DifArray,minIndex,maxIndex];
}

function calcRatioDifFields(valueDifField,colorDifField){

  

  var valueDifRatioField = [];
  var colorDifRatioField = [];


}
