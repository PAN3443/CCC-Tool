function calcValueDifField(testfield){

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
    if(tmpArrayX.length!=0)
    xDifArray.push(tmpArrayX);
    if(tmpArrayY.length!=0)
    yDifArray.push(tmpArrayY);
    if(tmpArrayDiagonal1.length!=0)
    diagonal1DifArray.push(tmpArrayDiagonal1);
    if(tmpArrayDiagonal2.length!=0)
    diagonal2DifArray.push(tmpArrayDiagonal2);
  }

  return [xDifArray,yDifArray,diagonal1DifArray,diagonal2DifArray,minIndex,maxIndex,tmpMin,tmpMax];
}

function calcColorDifField(colorField,colorDif){

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

  //console.log(colorField);
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
        if(tmpArrayX.length!=0)
        xDifArray.push(tmpArrayX);
        if(tmpArrayY.length!=0)
        yDifArray.push(tmpArrayY);
        if(tmpArrayDiagonal1.length!=0)
        diagonal1DifArray.push(tmpArrayDiagonal1);
        if(tmpArrayDiagonal2.length!=0)
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
        if(tmpArrayX.length!=0)
        xDifArray.push(tmpArrayX);
        if(tmpArrayY.length!=0)
        yDifArray.push(tmpArrayY);
        if(tmpArrayDiagonal1.length!=0)
        diagonal1DifArray.push(tmpArrayDiagonal1);
        if(tmpArrayDiagonal2.length!=0)
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
        if(tmpArrayX.length!=0)
        xDifArray.push(tmpArrayX);
        if(tmpArrayY.length!=0)
        yDifArray.push(tmpArrayY);
        if(tmpArrayDiagonal1.length!=0)
        diagonal1DifArray.push(tmpArrayDiagonal1);
        if(tmpArrayDiagonal2.length!=0)
        diagonal2DifArray.push(tmpArrayDiagonal2);
      }
    break;
  }

  return [xDifArray,yDifArray,diagonal1DifArray,diagonal2DifArray,minIndex,maxIndex,tmpMin,tmpMax];
}


function getDifIndexType(indexValDifMax){

  var anserArray = [undefined,undefined,undefined];

  if(indexValDifMax[1]==indexValDifMax[3]){
    // y pos is equal -> vertical difference (x,y)-(x+1,y)
    anserArray[0]=0;

    return anserArray;
  }

  if(indexValDifMax[0]==indexValDifMax[2]){
    // x pos is equal -> vertical difference (x,y)-(x,y+1)
    anserArray[0]=1;

    return anserArray;
  }

  if(indexValDifMax[1]<indexValDifMax[3]){
    // diagonal difference (x,y)-(x+1,y+1)
  }
  else{
    // diagonal difference (x,y)-(x+1,y-1)
  }


}


function calcRatioDifFields(valueDifField,colorDifField){

  var xDim = valueDifField[0].length+1;
  var yDim = valueDifField[1][0].length+1;

  var newXDim = 3*xDim-2;
  var newYDim = 3*yDim-2;

  var valueMinMaxDis = valueDifField[7]-valueDifField[6];
  var colorDifMinMaxDis = colorDifField[7]-colorDifField[6];

  var ratioColorDifField=[];
  var ratioValueDifField=[];
  var ratioDifField = [];
  var maxDif = -Infinity;


  /// get color dif values at the location of the min and max of the value dif

  /*var indexValDifMin = getDifIndexType(valueDifField[4]);
  var indexValDifMax = getDifIndexType(valueDifField[5]);

  switch (indexValDifMin[0]) {
    case 0:

    break;
    case 1:

    break;
    case 2:

    break;
    case 3:

    break;
  }

  switch (indexValDifMax[0]) {
    case 0:

    break;
    case 1:

    break;
    case 2:

    break;
    case 3:

    break;
  }*/


  for (var x = 0; x < newXDim; x++) {
    var tmpRow0 = new Array(newYDim).fill(undefined);
    var tmpRow1 = new Array(newYDim).fill(undefined);
    var tmpRow2 = new Array(newYDim).fill(undefined);
    ratioDifField.push(tmpRow0);
    ratioValueDifField.push(tmpRow1);
    ratioColorDifField.push(tmpRow2);
  }

  // Ratio Dif Cell
  //////////////////////////
  ///
  ///   ----------------
  ///   | 0  | 1  | 2  |
  ///   ----------------
  ///   | 3  | M  | 4  |
  ///   ----------------
  ///   | 5  | 6  |  7 |
  ///   ----------------
  ///
  ///   M = Math.max(0,1,2,3,4,5,6,7)
  ///   var tmpRV0 = ((valueDifField[3][x-1][y]-valueDifField[6])/valueMinMaxDis)-((colorDifField[3][x-1][y]-colorDifField[6])/colorDifMinMaxDis);
  ///   var tmpRV1 = ((valueDifField[1][x][y]-valueDifField[6])/valueMinMaxDis)-((colorDifField[1][x][y]-colorDifField[6])/colorDifMinMaxDis);
  ///   var tmpRV2 = ((valueDifField[2][x][y]-valueDifField[6])/valueMinMaxDis)-((colorDifField[2][x][y]-colorDifField[6])/colorDifMinMaxDis);
  ///   var tmpRV3 = ((valueDifField[0][x-1][y]-valueDifField[6])/valueMinMaxDis)-((colorDifField[0][x-1][y]-colorDifField[6])/colorDifMinMaxDis);
  ///   var tmpRV4 = ((valueDifField[0][x][y]-valueDifField[6])/valueMinMaxDis)-((colorDifField[0][x][y]-colorDifField[6])/colorDifMinMaxDis);
  ///   var tmpRV5 = ((valueDifField[2][x-1][y-1]-valueDifField[6])/valueMinMaxDis)-((colorDifField[3][x-1][y-1]-colorDifField[6])/colorDifMinMaxDis);
  ///   var tmpRV6 = ((valueDifField[1][x][y-1]-valueDifField[6])/valueMinMaxDis)-((colorDifField[1][x][y-1]-colorDifField[6])/colorDifMinMaxDis);
  ///   var tmpRV7 = ((valueDifField[3][x][y-1]-valueDifField[6])/valueMinMaxDis)-((colorDifField[3][x][y-1]-colorDifField[6])/colorDifMinMaxDis);

  ///////////////////////////////////////////////////
  for (var x = 0; x < xDim; x++) {
    for (var y = 0; y < yDim; y++) {
      var maxABSRatio = undefined;
      var maxRatioV = undefined;
      var maxRatioC = undefined;

      var mIndexX = x*3;
      var mIndexY = y*3;
      // isEdgeElement or isSideElement
      if(x==0){
        if(y==0){
          // corner leftBottom
          var tmpVDif1=(valueDifField[1][x][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif2=(valueDifField[2][x][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif4=(valueDifField[0][x][y]-valueDifField[6])/valueMinMaxDis;

          var tmpCDif1=(colorDifField[1][x][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif2=(colorDifField[2][x][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif4=(colorDifField[0][x][y]-colorDifField[6])/colorDifMinMaxDis;

          var tmpRV1 = tmpVDif1-tmpCDif1;
          var tmpRV2 = tmpVDif2-tmpCDif2;
          var tmpRV4 = tmpVDif4-tmpCDif4;

          var tmpMax = Math.max(tmpRV1,tmpRV2,tmpRV4);
          var tmpMin = Math.min(tmpRV1,tmpRV2,tmpRV4);
          if(Math.abs(tmpMin)>Math.abs(tmpMax))
            maxABSRatio = tmpMin;
          else
            maxABSRatio = tmpMax;
          ratioDifField[mIndexX][mIndexY+1]=tmpRV1;
          ratioDifField[mIndexX+1][mIndexY+1]=tmpRV2;
          ratioDifField[mIndexX+1][mIndexY]=tmpRV4;

          maxRatioV = Math.max(tmpVDif1,tmpVDif2,tmpVDif4);
          ratioValueDifField[mIndexX][mIndexY+1]=tmpVDif1;
          ratioValueDifField[mIndexX+1][mIndexY+1]=tmpVDif2;
          ratioValueDifField[mIndexX+1][mIndexY]=tmpVDif4;

          maxRatioC = Math.max(tmpCDif1,tmpCDif2,tmpCDif4);
          ratioColorDifField[mIndexX][mIndexY+1]=tmpCDif1;
          ratioColorDifField[mIndexX+1][mIndexY+1]=tmpCDif2;
          ratioColorDifField[mIndexX+1][mIndexY]=tmpCDif4;
        }
        else if (y==yDim-1) {
          // corner leftTop
          var tmpVDif4=(valueDifField[0][x][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif6=(valueDifField[1][x][y-1]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif7=(valueDifField[3][x][y-1]-valueDifField[6])/valueMinMaxDis;

          var tmpCDif4=(colorDifField[0][x][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif6=(colorDifField[1][x][y-1]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif7=(colorDifField[3][x][y-1]-colorDifField[6])/colorDifMinMaxDis;

          var tmpRV4 = tmpVDif4-tmpCDif4;
          var tmpRV6 = tmpVDif6-tmpCDif6;
          var tmpRV7 = tmpVDif7-tmpCDif7;

          var tmpMax = Math.max(tmpRV4,tmpRV6,tmpRV7);
          var tmpMin = Math.min(tmpRV4,tmpRV6,tmpRV7);
          if(Math.abs(tmpMin)>Math.abs(tmpMax))
            maxABSRatio = tmpMin;
          else
            maxABSRatio = tmpMax;
          ratioDifField[mIndexX+1][mIndexY]=tmpRV4;
          ratioDifField[mIndexX][mIndexY-1]=tmpRV6;
          ratioDifField[mIndexX+1][mIndexY-1]=tmpRV7;

          maxRatioV = Math.max(tmpVDif4,tmpVDif6,tmpVDif7);
          ratioValueDifField[mIndexX+1][mIndexY]=tmpVDif4;
          ratioValueDifField[mIndexX][mIndexY-1]=tmpVDif6;
          ratioValueDifField[mIndexX+1][mIndexY-1]=tmpVDif7;

          maxRatioC = Math.max(tmpCDif4,tmpCDif6,tmpCDif7);
          ratioColorDifField[mIndexX+1][mIndexY]=tmpCDif4;
          ratioColorDifField[mIndexX][mIndexY-1]=tmpCDif6;
          ratioColorDifField[mIndexX+1][mIndexY-1]=tmpCDif7;
        }
        else {
          // left side
          var tmpVDif1=(valueDifField[1][x][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif2=(valueDifField[2][x][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif4=(valueDifField[0][x][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif6=(valueDifField[1][x][y-1]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif7=(valueDifField[3][x][y-1]-valueDifField[6])/valueMinMaxDis;

          var tmpCDif1=(colorDifField[1][x][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif2=(colorDifField[2][x][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif4=(colorDifField[0][x][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif6=(colorDifField[1][x][y-1]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif7=(colorDifField[3][x][y-1]-colorDifField[6])/colorDifMinMaxDis;

          var tmpRV1 = tmpVDif1-tmpCDif1;
          var tmpRV2 = tmpVDif2-tmpCDif2;
          var tmpRV4 = tmpVDif4-tmpCDif4;
          var tmpRV6 = tmpVDif6-tmpCDif6;
          var tmpRV7 = tmpVDif7-tmpCDif7;

          // max
          var tmpMax = Math.max(tmpRV1,tmpRV2,tmpRV4,tmpRV6,tmpRV7);
          var tmpMin = Math.min(tmpRV1,tmpRV2,tmpRV4,tmpRV6,tmpRV7);
          if(Math.abs(tmpMin)>Math.abs(tmpMax))
            maxABSRatio = tmpMin;
          else
            maxABSRatio = tmpMax;
          ratioDifField[mIndexX][mIndexY+1]=tmpRV1;
          ratioDifField[mIndexX+1][mIndexY+1]=tmpRV2;
          ratioDifField[mIndexX+1][mIndexY]=tmpRV4;
          ratioDifField[mIndexX][mIndexY-1]=tmpRV6;
          ratioDifField[mIndexX+1][mIndexY-1]=tmpRV7;

          maxRatioV = Math.max(tmpVDif1,tmpVDif2,tmpVDif4,tmpVDif6,tmpVDif7);
          ratioValueDifField[mIndexX][mIndexY+1]=tmpVDif1;
          ratioValueDifField[mIndexX+1][mIndexY+1]=tmpVDif2;
          ratioValueDifField[mIndexX+1][mIndexY]=tmpVDif4;
          ratioValueDifField[mIndexX][mIndexY-1]=tmpVDif6;
          ratioValueDifField[mIndexX+1][mIndexY-1]=tmpVDif7;

          maxRatioC = Math.max(tmpCDif1,tmpCDif2,tmpCDif4,tmpCDif6,tmpCDif7);
          ratioColorDifField[mIndexX][mIndexY+1]=tmpCDif1;
          ratioColorDifField[mIndexX+1][mIndexY+1]=tmpCDif2;
          ratioColorDifField[mIndexX+1][mIndexY]=tmpCDif4;
          ratioColorDifField[mIndexX][mIndexY-1]=tmpCDif6;
          ratioColorDifField[mIndexX+1][mIndexY-1]=tmpCDif7;
        }
      }
      else if(x==xDim-1){
        if(y==0){
          // corner
          var tmpVDif0=(valueDifField[3][x-1][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif1=(valueDifField[1][x][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif3=(valueDifField[0][x-1][y]-valueDifField[6])/valueMinMaxDis;

          var tmpCDif0=(colorDifField[3][x-1][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif1=(colorDifField[1][x][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif3=(colorDifField[0][x-1][y]-colorDifField[6])/colorDifMinMaxDis;

          var tmpRV0 = tmpVDif0-tmpCDif0;
          var tmpRV1 = tmpVDif1-tmpCDif1;
          var tmpRV3 = tmpVDif3-tmpCDif3;

          var tmpMax = Math.max(tmpRV0,tmpRV1,tmpRV3);
          var tmpMin = Math.min(tmpRV0,tmpRV1,tmpRV3);
          if(Math.abs(tmpMin)>Math.abs(tmpMax))
            maxABSRatio = tmpMin;
          else
            maxABSRatio = tmpMax;
          ratioDifField[mIndexX-1][mIndexY+1]=tmpRV0;
          ratioDifField[mIndexX][mIndexY+1]=tmpRV1;
          ratioDifField[mIndexX-1][mIndexY]=tmpRV3;

          maxRatioV = Math.max(tmpVDif0,tmpVDif1,tmpVDif3);
          ratioValueDifField[mIndexX-1][mIndexY+1]=tmpVDif0;
          ratioValueDifField[mIndexX][mIndexY+1]=tmpVDif1;
          ratioValueDifField[mIndexX-1][mIndexY]=tmpVDif3;

          maxRatioC = Math.max(tmpCDif0,tmpCDif1,tmpCDif3);
          ratioColorDifField[mIndexX-1][mIndexY+1]=tmpCDif0;
          ratioColorDifField[mIndexX][mIndexY+1]=tmpCDif1;
          ratioColorDifField[mIndexX-1][mIndexY]=tmpCDif3;
        }
        else if (y==yDim-1) {
          // corner
          var tmpVDif3=(valueDifField[0][x-1][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif5=(valueDifField[2][x-1][y-1]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif6=(valueDifField[1][x][y-1]-valueDifField[6])/valueMinMaxDis;

          var tmpCDif3=(colorDifField[0][x-1][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif5=(colorDifField[3][x-1][y-1]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif6=(colorDifField[1][x][y-1]-colorDifField[6])/colorDifMinMaxDis;

          var tmpRV3 = tmpVDif3-tmpCDif3;
          var tmpRV5 = tmpVDif5-tmpCDif5;
          var tmpRV6 = tmpVDif6-tmpCDif6;

          var tmpMax = Math.max(tmpRV3,tmpRV5,tmpRV6);
          var tmpMin = Math.min(tmpRV3,tmpRV5,tmpRV6);
          if(Math.abs(tmpMin)>Math.abs(tmpMax))
            maxABSRatio = tmpMin;
          else
            maxABSRatio = tmpMax;
          ratioDifField[mIndexX-1][mIndexY]=tmpRV3;
          ratioDifField[mIndexX-1][mIndexY-1]=tmpRV5;
          ratioDifField[mIndexX][mIndexY-1]=tmpRV6;

          maxRatioV = Math.max(tmpVDif3,tmpVDif5,tmpVDif6);
          ratioValueDifField[mIndexX-1][mIndexY]=tmpVDif3;
          ratioValueDifField[mIndexX-1][mIndexY-1]=tmpVDif5;
          ratioValueDifField[mIndexX][mIndexY-1]=tmpVDif6;

          maxRatioC = Math.max(tmpCDif3,tmpCDif5,tmpCDif6);
          ratioColorDifField[mIndexX-1][mIndexY]=tmpCDif3;
          ratioColorDifField[mIndexX-1][mIndexY-1]=tmpCDif5;
          ratioColorDifField[mIndexX][mIndexY-1]=tmpCDif6;
        }
        else {
          // right side
          var tmpVDif0=(valueDifField[3][x-1][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif1=(valueDifField[1][x][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif3=(valueDifField[0][x-1][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif5=(valueDifField[2][x-1][y-1]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif6=(valueDifField[1][x][y-1]-valueDifField[6])/valueMinMaxDis;

          var tmpCDif0=(colorDifField[3][x-1][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif1=(colorDifField[1][x][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif3=(colorDifField[0][x-1][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif5=(colorDifField[3][x-1][y-1]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif6=(colorDifField[1][x][y-1]-colorDifField[6])/colorDifMinMaxDis;

          var tmpRV0 = tmpVDif0-tmpCDif0;
          var tmpRV1 = tmpVDif1-tmpCDif1;
          var tmpRV3 = tmpVDif3-tmpCDif3;
          var tmpRV5 = tmpVDif5-tmpCDif5;
          var tmpRV6 = tmpVDif6-tmpCDif6;

          var tmpMax = Math.max(tmpRV0,tmpRV1,tmpRV3,tmpRV5,tmpRV6);
          var tmpMin = Math.min(tmpRV0,tmpRV1,tmpRV3,tmpRV5,tmpRV6);
          if(Math.abs(tmpMin)>Math.abs(tmpMax))
            maxABSRatio = tmpMin;
          else
            maxABSRatio = tmpMax;
          ratioDifField[mIndexX-1][mIndexY+1]=tmpRV0;
          ratioDifField[mIndexX][mIndexY+1]=tmpRV1;
          ratioDifField[mIndexX-1][mIndexY]=tmpRV3;
          ratioDifField[mIndexX-1][mIndexY-1]=tmpRV5;
          ratioDifField[mIndexX][mIndexY-1]=tmpRV6;

          maxRatioV = Math.max(tmpVDif0,tmpVDif1,tmpVDif3,tmpVDif5,tmpVDif6);
          ratioValueDifField[mIndexX-1][mIndexY+1]=tmpVDif0;
          ratioValueDifField[mIndexX][mIndexY+1]=tmpVDif1;
          ratioValueDifField[mIndexX-1][mIndexY]=tmpVDif3;
          ratioValueDifField[mIndexX-1][mIndexY-1]=tmpVDif5;
          ratioValueDifField[mIndexX][mIndexY-1]=tmpVDif6;

          maxRatioC = Math.max(tmpCDif0,tmpCDif1,tmpCDif3,tmpCDif5,tmpCDif6);
          ratioColorDifField[mIndexX-1][mIndexY+1]=tmpCDif0;
          ratioColorDifField[mIndexX][mIndexY+1]=tmpCDif1;
          ratioColorDifField[mIndexX-1][mIndexY]=tmpCDif3;
          ratioColorDifField[mIndexX-1][mIndexY-1]=tmpCDif5;
          ratioColorDifField[mIndexX][mIndexY-1]=tmpCDif6;
         }
      }
      else {
        if(y==0){
          // bottom side
          var tmpVDif0=(valueDifField[3][x-1][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif1=(valueDifField[1][x][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif2=(valueDifField[2][x][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif3=(valueDifField[0][x-1][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif4=(valueDifField[0][x][y]-valueDifField[6])/valueMinMaxDis;

          var tmpCDif0=(colorDifField[3][x-1][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif1=(colorDifField[1][x][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif2=(colorDifField[2][x][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif3=(colorDifField[0][x-1][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif4=(colorDifField[0][x][y]-colorDifField[6])/colorDifMinMaxDis;

          var tmpRV0 = tmpVDif0-tmpCDif0;
          var tmpRV1 = tmpVDif1-tmpCDif1;
          var tmpRV2 = tmpVDif2-tmpCDif2;
          var tmpRV3 = tmpVDif3-tmpCDif3;
          var tmpRV4 = tmpVDif4-tmpCDif4;

          var tmpMax = Math.max(tmpRV0,tmpRV1,tmpRV2,tmpRV3,tmpRV4);
          var tmpMin = Math.min(tmpRV0,tmpRV1,tmpRV2,tmpRV3,tmpRV4);
          if(Math.abs(tmpMin)>Math.abs(tmpMax))
            maxABSRatio = tmpMin;
          else
            maxABSRatio = tmpMax;
          ratioDifField[mIndexX-1][mIndexY+1]=tmpRV0;
          ratioDifField[mIndexX][mIndexY+1]=tmpRV1;
          ratioDifField[mIndexX+1][mIndexY+1]=tmpRV2;
          ratioDifField[mIndexX-1][mIndexY]=tmpRV3;
          ratioDifField[mIndexX+1][mIndexY]=tmpRV4;

          maxRatioV = Math.max(tmpVDif0,tmpVDif1,tmpVDif2,tmpVDif3,tmpVDif4);
          ratioValueDifField[mIndexX-1][mIndexY+1]=tmpVDif0;
          ratioValueDifField[mIndexX][mIndexY+1]=tmpVDif1;
          ratioValueDifField[mIndexX+1][mIndexY+1]=tmpVDif2;
          ratioValueDifField[mIndexX-1][mIndexY]=tmpVDif3;
          ratioValueDifField[mIndexX+1][mIndexY]=tmpVDif4;

          maxRatioC = Math.max(tmpCDif0,tmpCDif1,tmpCDif2,tmpCDif3,tmpCDif4);
          ratioColorDifField[mIndexX-1][mIndexY+1]=tmpCDif0;
          ratioColorDifField[mIndexX][mIndexY+1]=tmpCDif1;
          ratioColorDifField[mIndexX+1][mIndexY+1]=tmpCDif2;
          ratioColorDifField[mIndexX-1][mIndexY]=tmpCDif3;
          ratioColorDifField[mIndexX+1][mIndexY]=tmpCDif4;
        }
        else if(y==yDim-1){
          // top side
          var tmpVDif3=(valueDifField[0][x-1][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif4=(valueDifField[0][x][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif5=(valueDifField[2][x-1][y-1]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif6=(valueDifField[1][x][y-1]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif7=(valueDifField[3][x][y-1]-valueDifField[6])/valueMinMaxDis;

          var tmpCDif3=(colorDifField[0][x-1][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif4=(colorDifField[0][x][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif5=(colorDifField[3][x-1][y-1]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif6=(colorDifField[1][x][y-1]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif7=(colorDifField[3][x][y-1]-colorDifField[6])/colorDifMinMaxDis;

          var tmpRV3 = tmpVDif3-tmpCDif3;
          var tmpRV4 = tmpVDif4-tmpCDif4;
          var tmpRV5 = tmpVDif5-tmpCDif5;
          var tmpRV6 = tmpVDif6-tmpCDif6;
          var tmpRV7 = tmpVDif7-tmpCDif7;

          var tmpMax = Math.max(tmpRV3,tmpRV4,tmpRV5,tmpRV6,tmpRV7);
          var tmpMin = Math.min(tmpRV3,tmpRV4,tmpRV5,tmpRV6,tmpRV7);
          if(Math.abs(tmpMin)>Math.abs(tmpMax))
            maxABSRatio = tmpMin;
          else
            maxABSRatio = tmpMax;
          ratioDifField[mIndexX-1][mIndexY]=tmpRV3;
          ratioDifField[mIndexX+1][mIndexY]=tmpRV4;
          ratioDifField[mIndexX-1][mIndexY-1]=tmpRV5;
          ratioDifField[mIndexX][mIndexY-1]=tmpRV6;
          ratioDifField[mIndexX+1][mIndexY-1]=tmpRV7;

          maxRatioV = Math.max(tmpVDif3,tmpVDif4,tmpVDif5,tmpVDif6,tmpVDif7);
          ratioValueDifField[mIndexX-1][mIndexY]=tmpVDif3;
          ratioValueDifField[mIndexX+1][mIndexY]=tmpVDif4;
          ratioValueDifField[mIndexX-1][mIndexY-1]=tmpVDif5;
          ratioValueDifField[mIndexX][mIndexY-1]=tmpVDif6;
          ratioValueDifField[mIndexX+1][mIndexY-1]=tmpVDif7;

          maxRatioC = Math.max(tmpCDif3,tmpCDif4,tmpCDif5,tmpCDif6,tmpCDif7);
          ratioColorDifField[mIndexX-1][mIndexY]=tmpCDif3;
          ratioColorDifField[mIndexX+1][mIndexY]=tmpCDif4;
          ratioColorDifField[mIndexX-1][mIndexY-1]=tmpCDif5;
          ratioColorDifField[mIndexX][mIndexY-1]=tmpCDif6;
          ratioColorDifField[mIndexX+1][mIndexY-1]=tmpCDif7;
        }
        else{
          // isInsideElement
          var tmpVDif0=(valueDifField[3][x-1][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif1=(valueDifField[1][x][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif2=(valueDifField[2][x][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif3=(valueDifField[0][x-1][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif4=(valueDifField[0][x][y]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif5=(valueDifField[2][x-1][y-1]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif6=(valueDifField[1][x][y-1]-valueDifField[6])/valueMinMaxDis;
          var tmpVDif7=(valueDifField[3][x][y-1]-valueDifField[6])/valueMinMaxDis;

          var tmpCDif0=(colorDifField[3][x-1][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif1=(colorDifField[1][x][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif2=(colorDifField[2][x][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif3=(colorDifField[0][x-1][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif4=(colorDifField[0][x][y]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif5=(colorDifField[3][x-1][y-1]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif6=(colorDifField[1][x][y-1]-colorDifField[6])/colorDifMinMaxDis;
          var tmpCDif7=(colorDifField[3][x][y-1]-colorDifField[6])/colorDifMinMaxDis;

          var tmpRV0 = tmpVDif0-tmpCDif0;
          var tmpRV1 = tmpVDif1-tmpCDif1;
          var tmpRV2 = tmpVDif2-tmpCDif2;
          var tmpRV3 = tmpVDif3-tmpCDif3;
          var tmpRV4 = tmpVDif4-tmpCDif4;
          var tmpRV5 = tmpVDif5-tmpCDif5;
          var tmpRV6 = tmpVDif6-tmpCDif6;
          var tmpRV7 = tmpVDif7-tmpCDif7;

          var tmpMax = Math.max(tmpRV0,tmpRV1,tmpRV2,tmpRV3,tmpRV4,tmpRV5,tmpRV6,tmpRV7);
          var tmpMin = Math.min(tmpRV0,tmpRV1,tmpRV2,tmpRV3,tmpRV4,tmpRV5,tmpRV6,tmpRV7);
          if(Math.abs(tmpMin)>Math.abs(tmpMax))
            maxABSRatio = tmpMin;
          else
            maxABSRatio = tmpMax;
          ratioDifField[mIndexX-1][mIndexY+1]=tmpRV0;
          ratioDifField[mIndexX][mIndexY+1]=tmpRV1;
          ratioDifField[mIndexX+1][mIndexY+1]=tmpRV2;
          ratioDifField[mIndexX-1][mIndexY]=tmpRV3;
          ratioDifField[mIndexX+1][mIndexY]=tmpRV4;
          ratioDifField[mIndexX-1][mIndexY-1]=tmpRV5;
          ratioDifField[mIndexX][mIndexY-1]=tmpRV6;
          ratioDifField[mIndexX+1][mIndexY-1]=tmpRV7;

          maxRatioV = Math.max(tmpVDif0,tmpVDif1,tmpVDif2,tmpVDif3,tmpVDif4,tmpVDif5,tmpVDif6,tmpVDif7);
          ratioValueDifField[mIndexX-1][mIndexY+1]=tmpVDif0;
          ratioValueDifField[mIndexX][mIndexY+1]=tmpVDif1;
          ratioValueDifField[mIndexX+1][mIndexY+1]=tmpVDif2;
          ratioValueDifField[mIndexX-1][mIndexY]=tmpVDif3;
          ratioValueDifField[mIndexX+1][mIndexY]=tmpVDif4;
          ratioValueDifField[mIndexX-1][mIndexY-1]=tmpVDif5;
          ratioValueDifField[mIndexX][mIndexY-1]=tmpVDif6;
          ratioValueDifField[mIndexX+1][mIndexY-1]=tmpVDif7;

          maxRatioC = Math.max(tmpCDif0,tmpCDif1,tmpCDif2,tmpCDif3,tmpCDif4,tmpCDif5,tmpCDif6,tmpCDif7);
          ratioColorDifField[mIndexX-1][mIndexY+1]=tmpCDif0;
          ratioColorDifField[mIndexX][mIndexY+1]=tmpCDif1;
          ratioColorDifField[mIndexX+1][mIndexY+1]=tmpCDif2;
          ratioColorDifField[mIndexX-1][mIndexY]=tmpCDif3;
          ratioColorDifField[mIndexX+1][mIndexY]=tmpCDif4;
          ratioColorDifField[mIndexX-1][mIndexY-1]=tmpCDif5;
          ratioColorDifField[mIndexX][mIndexY-1]=tmpCDif6;
          ratioColorDifField[mIndexX+1][mIndexY-1]=tmpCDif7;

        }
      }
      ratioDifField[mIndexX][mIndexY]=maxABSRatio;
      ratioValueDifField[mIndexX][mIndexY]=maxRatioV;
      ratioColorDifField[mIndexX][mIndexY]=maxRatioC;
    }
  }

  // normalize Dif field
  /*for (var x = 0; x < newXDim; x++) {
    for (var y = 0; y < newXDim; y++) {
      ratioDifField[mIndexX][mIndexY]=ratioDifField[mIndexX][mIndexY]/maxDif;
    }
  }*/

  return [ratioValueDifField,ratioColorDifField,ratioDifField];


}
