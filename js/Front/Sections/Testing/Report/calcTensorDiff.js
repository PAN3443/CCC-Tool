function getRatioDifField(testfield, colorField, colorDifType){

  ////////////////////////////////////////////
  ////  Step 1: Calc Value Dif and Color Dif
  ////////////////////////////////////////////

  var xColorDifArray = [];
  var yColorDifArray = [];
  var diagonal1ColorDifArray = []; // x+1, y+1
  var diagonal2ColorDifArray = []; // x-1, y+1

  var xDifArray = [];
  var yDifArray = [];
  var diagonal1DifArray = []; // x+1, y+1
  var diagonal2DifArray = []; // x-1, y+1

  var tmpMin = Infinity;
  var tmpMax = -Infinity;
  var tmpColorMin = Infinity;
  var tmpColorMax = -Infinity;
  var tmpShouldBeColorMin = undefined;
  var tmpShouldBeColorMax = undefined;

  if(colorField.length==0)
  return [];

  var xDim = colorField.length;
  var yDim = colorField[0].length;

        for (var x = 0; x < xDim; x++) {
        var tmpArrayX = [];
        var tmpCDifArrayX = [];
        var tmpArrayY = [];
        var tmpCDifArrayY = [];
        var tmpArrayDiagonal1 = [];
        var tmpCDifArrayDiagonal1 = [];
        var tmpArrayDiagonal2 = [];
        var tmpCDifArrayDiagonal2 = [];

        for (var y = 0; y < yDim; y++) {
          if(x!=xDim-1){
            var tmpColorDifVal = getColorDif(colorDifType,colorField[x][y],colorField[x+1][y]);
            tmpCDifArrayX.push(tmpColorDifVal);

            var tmpVal = Math.abs(testfield[x][y]-testfield[x+1][y]);
            tmpArrayX.push(tmpVal);

            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              tmpShouldBeColorMin=tmpColorDifVal;
            }

            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              tmpShouldBeColorMax=tmpColorDifVal;
            }

            tmpColorMax=Math.max(tmpColorMax,tmpColorDifVal);
            tmpColorMin=Math.min(tmpColorMin,tmpColorDifVal);

          }

          if(y!=yDim-1){
            var tmpColorDifVal = getColorDif(colorDifType,colorField[x][y],colorField[x][y+1]);
            tmpCDifArrayY.push(tmpColorDifVal);
            var tmpVal = Math.abs(testfield[x][y]-testfield[x][y+1]);
            tmpArrayY.push(tmpVal);

            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              tmpShouldBeColorMin=tmpColorDifVal;
            }

            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              tmpShouldBeColorMax=tmpColorDifVal;
            }

            tmpColorMax=Math.max(tmpColorMax,tmpColorDifVal);
            tmpColorMin=Math.min(tmpColorMin,tmpColorDifVal);
          }

          if(x!=xDim-1&&y!=yDim-1){
            var tmpColorDifVal = getColorDif(colorDifType,colorField[x][y],colorField[x+1][y+1]);
            tmpCDifArrayDiagonal1.push(tmpColorDifVal);

            var tmpVal = Math.abs(testfield[x][y]-testfield[x+1][y+1]);
            tmpArrayDiagonal1.push(tmpVal);

            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              tmpShouldBeColorMin=tmpColorDifVal;
            }

            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              tmpShouldBeColorMax=tmpColorDifVal;
            }

            tmpColorMax=Math.max(tmpColorMax,tmpColorDifVal);
            tmpColorMin=Math.min(tmpColorMin,tmpColorDifVal);
          }

          if(x!=0&&y!=yDim-1){
            var tmpColorDifVal = getColorDif(colorDifType,colorField[x][y],colorField[x-1][y+1]);
            tmpCDifArrayDiagonal2.push(tmpColorDifVal);

            var tmpVal = Math.abs(testfield[x][y]-testfield[x-1][y+1]);
            tmpArrayDiagonal2.push(tmpVal);

            if(tmpVal<tmpMin){
              tmpMin=tmpVal;
              tmpShouldBeColorMin=tmpColorDifVal;
            }

            if(tmpVal>tmpMax){
              tmpMax=tmpVal;
              tmpShouldBeColorMax=tmpColorDifVal;
            }

            tmpColorMax=Math.max(tmpColorMax,tmpColorDifVal);
            tmpColorMin=Math.min(tmpColorMin,tmpColorDifVal);
          }
        }
        if(tmpCDifArrayX.length!=0)
        xColorDifArray.push(tmpCDifArrayX);
        if(tmpCDifArrayY.length!=0)
        yColorDifArray.push(tmpCDifArrayY);
        if(tmpCDifArrayDiagonal1.length!=0)
        diagonal1ColorDifArray.push(tmpCDifArrayDiagonal1);
        if(tmpCDifArrayDiagonal2.length!=0)
        diagonal2ColorDifArray.push(tmpCDifArrayDiagonal2);
        if(tmpArrayX.length!=0)
        xDifArray.push(tmpArrayX);
        if(tmpArrayY.length!=0)
        yDifArray.push(tmpArrayY);
        if(tmpArrayDiagonal1.length!=0)
        diagonal1DifArray.push(tmpArrayDiagonal1);
        if(tmpArrayDiagonal2.length!=0)
        diagonal2DifArray.push(tmpArrayDiagonal2);
      }


      ////////////////////////////////////////////
      ////  Step 2: Calc Ratio of Value Dif and Color Dif
      ////////////////////////////////////////////


      console.log("Min=",tmpShouldBeColorMin,"Max=",tmpShouldBeColorMax);

      /*xColorDifArray = makeRatioField(xColorDifArray, tmpShouldBeColorMin, tmpShouldBeColorMax);
      yColorDifArray = makeRatioField(yColorDifArray, tmpShouldBeColorMin, tmpShouldBeColorMax);
      diagonal1ColorDifArray = makeRatioField(diagonal1ColorDifArray, tmpShouldBeColorMin, tmpShouldBeColorMax);
      diagonal2ColorDifArray = makeRatioField(diagonal2ColorDifArray, tmpShouldBeColorMin, tmpShouldBeColorMax);//*/

      xColorDifArray = makeRatioField(xColorDifArray, tmpColorMin, tmpColorMax);
      yColorDifArray = makeRatioField(yColorDifArray, tmpColorMin, tmpColorMax);
      diagonal1ColorDifArray = makeRatioField(diagonal1ColorDifArray, tmpColorMin, tmpColorMax);
      diagonal2ColorDifArray = makeRatioField(diagonal2ColorDifArray, tmpColorMin, tmpColorMax);//*/

      xDifArray = makeRatioField(xDifArray, tmpMin, tmpMax);
      yDifArray = makeRatioField(yDifArray, tmpMin, tmpMax);
      diagonal1DifArray = makeRatioField(diagonal1DifArray, tmpMin, tmpMax);
      diagonal2DifArray = makeRatioField(diagonal2DifArray, tmpMin, tmpMax);

      ////////////////////////////////////////////
      ////  Step 3: Subtraction Differences
      ////////////////////////////////////////////
      var subxDifArray = calcSubtractionField(xDifArray, xColorDifArray);
      var subyDifArray = calcSubtractionField(yDifArray, yColorDifArray);
      var subdiagonal1DifArray = calcSubtractionField(diagonal1DifArray, diagonal1ColorDifArray);
      var subdiagonal2DifArray = calcSubtractionField(diagonal2DifArray, diagonal2ColorDifArray);

      ////////////////////////////////////////////
      ////  Step 4: Calc Colors for Vis
      ////////////////////////////////////////////
      var color_xColorDifArray = getDifFieldColorArray(xColorDifArray);
      var color_yColorDifArray = getDifFieldColorArray(yColorDifArray);
      var color_diagonal1ColorDifArray = getDifFieldColorArray(diagonal1ColorDifArray);
      var color_diagonal2ColorDifArray = getDifFieldColorArray(diagonal2ColorDifArray);
      var color_xDifArray = getDifFieldColorArray(xDifArray);
      var color_yDifArray = getDifFieldColorArray(yDifArray);
      var color_diagonal1DifArray = getDifFieldColorArray(diagonal1DifArray);
      var color_diagonal2DifArray = getDifFieldColorArray(diagonal2DifArray);
      var color_subxDifArray = getDifFieldColorArray(subxDifArray);
      var color_subyDifArray = getDifFieldColorArray(subyDifArray);
      var color_subdiagonal1DifArray = getDifFieldColorArray(subdiagonal1DifArray);
      var color_subdiagonal2DifArray = getDifFieldColorArray(subdiagonal2DifArray);

      ////////////////////////////////////////////
      ////  Step 5: Create Field
      ////////////////////////////////////////////

      /*var newXDim = testfield.length*3-2;
      var newYDim = testfield[0].length*3-2;
      var maxHeightIndex = newYDim - 1;

      var ratioColorDifField=new ImageData(newXDim, newYDim);
      var ratioValueDifField=new ImageData(newXDim, newYDim);
      var ratioDifField =new ImageData(newXDim, newYDim);*/

      var maxHeightIndex = yDim - 1;
      var ratioColorDifField=new ImageData(xDim, yDim);
      var ratioValueDifField=new ImageData(xDim, yDim);
      var ratioDifField =new ImageData(xDim, yDim);

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
      ///   var subdiagonal2DifArray[x-1][y] = ((diagonal2DifArray[x-1][y]-valueDifField[6])/valueMinMaxDis)-((diagonal2ColorDifArray[x-1][y]-colorDifMinRef)/colorDifMinMaxDis);
      ///   var subxDifArray[x][y] = ((xDifArray[x][y]-valueDifField[6])/valueMinMaxDis)-((yColorDifArray[x][y]-colorDifMinRef)/colorDifMinMaxDis);
      ///   var subdiagonal1DifArray[x][y] = ((diagonal1DifArray[x][y]-valueDifField[6])/valueMinMaxDis)-((diagonal1ColorDifArray[x][y]-colorDifMinRef)/colorDifMinMaxDis);
      ///   var subyDifArray[x-1][y] = ((yDifArray[x-1][y]-valueDifField[6])/valueMinMaxDis)-((xColorDifArray[x-1][y]-colorDifMinRef)/colorDifMinMaxDis);
      ///   var subyDifArray[x][y] = ((yDifArray[x][y]-valueDifField[6])/valueMinMaxDis)-((xColorDifArray[x][y]-colorDifMinRef)/colorDifMinMaxDis);
      ///   var subdiagonal1DifArray[x-1][y-1] = ((diagonal1DifArray[x-1][y-1]-valueDifField[6])/valueMinMaxDis)-((diagonal2ColorDifArray[x-1][y-1]-colorDifMinRef)/colorDifMinMaxDis);
      ///   var subxDifArray[x][y-1] = ((xDifArray[x][y-1]-valueDifField[6])/valueMinMaxDis)-((yColorDifArray[x][y-1]-colorDifMinRef)/colorDifMinMaxDis);
      ///   var subdiagonal2DifArray[x][y-1] = ((diagonal2DifArray[x][y-1]-valueDifField[6])/valueMinMaxDis)-((diagonal2ColorDifArray[x][y-1]-colorDifMinRef)/colorDifMinMaxDis);

      ///////////////////////////////////////////////////
      for (var x = 0; x < xDim; x++) {
        for (var y = 0; y < yDim; y++) {
          var maxABSRatio = undefined;
          var maxRatioV = undefined;
          var maxRatioC = undefined;

          /*var mIndexX = x*3;
          var mIndexY = y*3;*/
          // isEdgeElement or isSideElement
          if(x==0){
            if(y==0){
              // corner leftBottom
              var tmpMax = Math.max(subyDifArray[x][y],subdiagonal1DifArray[x][y],subxDifArray[x][y]);
              var tmpMin = Math.min(subyDifArray[x][y],subdiagonal1DifArray[x][y],subxDifArray[x][y]);
              if(Math.abs(tmpMin)>Math.abs(tmpMax))
                maxABSRatio = tmpMin;
              else
                maxABSRatio = tmpMax;

              /*setColorToImgData(ratioDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_subyDifArray[x][y]);
              setColorToImgData(ratioDifField,mIndexX+1,mIndexY+1,maxHeightIndex,newXDim,color_subdiagonal1DifArray[x][y]);
              setColorToImgData(ratioDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_subxDifArray[x][y]);*/

              maxRatioV = Math.max(yDifArray[x][y],diagonal1DifArray[x][y],xDifArray[x][y]);
              /*setColorToImgData(ratioValueDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_yDifArray[x][y]);
              setColorToImgData(ratioValueDifField,mIndexX+1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal1DifArray[x][y]);
              setColorToImgData(ratioValueDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_xDifArray[x][y]);*/

              maxRatioC = Math.max(yColorDifArray[x][y],diagonal1ColorDifArray[x][y],xColorDifArray[x][y]);
              /*setColorToImgData(ratioColorDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_yColorDifArray[x][y]);
              setColorToImgData(ratioColorDifField,mIndexX+1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal1ColorDifArray[x][y]);
              setColorToImgData(ratioColorDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_xColorDifArray[x][y]);*/
            }
            else if (y==yDim-1) {
              // corner leftTop
              var tmpMax = Math.max(subxDifArray[x][y],subyDifArray[x][y-1],subdiagonal2DifArray[x][y-1]);
              var tmpMin = Math.min(subxDifArray[x][y],subyDifArray[x][y-1],subdiagonal2DifArray[x][y-1]);
              if(Math.abs(tmpMin)>Math.abs(tmpMax))
                maxABSRatio = tmpMin;
              else
                maxABSRatio = tmpMax;
              /*setColorToImgData(ratioDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_subxDifArray[x][y]);
              setColorToImgData(ratioDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_subyDifArray[x][y-1]);
              setColorToImgData(ratioDifField,mIndexX+1,mIndexY-1,maxHeightIndex,newXDim,color_subdiagonal2DifArray[x][y-1]);*/

              maxRatioV = Math.max(xDifArray[x][y],yDifArray[x][y-1],diagonal2DifArray[x][y-1]);
              /*setColorToImgData(ratioValueDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_xDifArray[x][y]);
              setColorToImgData(ratioValueDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_yDifArray[x][y-1]);
              setColorToImgData(ratioValueDifField,mIndexX+1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal2DifArray[x][y-1]);*/

              maxRatioC = Math.max(xColorDifArray[x][y],yColorDifArray[x][y-1],diagonal2ColorDifArray[x][y-1]);
              /*setColorToImgData(ratioColorDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_xColorDifArray[x][y]);
              setColorToImgData(ratioColorDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_yColorDifArray[x][y-1]);
              setColorToImgData(ratioColorDifField,mIndexX+1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal2ColorDifArray[x][y-1]);*/
            }
            else {
              // left side
              // max
              var tmpMax = Math.max(subyDifArray[x][y],subdiagonal1DifArray[x][y],subxDifArray[x][y],subyDifArray[x][y-1],subdiagonal2DifArray[x][y-1]);
              var tmpMin = Math.min(subyDifArray[x][y],subdiagonal1DifArray[x][y],subxDifArray[x][y],subyDifArray[x][y-1],subdiagonal2DifArray[x][y-1]);
              if(Math.abs(tmpMin)>Math.abs(tmpMax))
                maxABSRatio = tmpMin;
              else
                maxABSRatio = tmpMax;
              /*setColorToImgData(ratioDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_subyDifArray[x][y]);
              setColorToImgData(ratioDifField,mIndexX+1,mIndexY+1,maxHeightIndex,newXDim,color_subdiagonal1DifArray[x][y]);
              setColorToImgData(ratioDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_subxDifArray[x][y]);
              setColorToImgData(ratioDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_subyDifArray[x][y-1]);
              setColorToImgData(ratioDifField,mIndexX+1,mIndexY-1,maxHeightIndex,newXDim,color_subdiagonal2DifArray[x][y-1]);*/

              maxRatioV = Math.max(yDifArray[x][y],diagonal1DifArray[x][y],xDifArray[x][y],yDifArray[x][y-1],diagonal2DifArray[x][y-1]);
              /*setColorToImgData(ratioValueDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_yDifArray[x][y]);
              setColorToImgData(ratioValueDifField,mIndexX+1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal1DifArray[x][y]);
              setColorToImgData(ratioValueDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_xDifArray[x][y]);
              setColorToImgData(ratioValueDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_yDifArray[x][y-1]);
              setColorToImgData(ratioValueDifField,mIndexX+1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal2DifArray[x][y-1]);*/

              maxRatioC = Math.max(yColorDifArray[x][y],diagonal1ColorDifArray[x][y],xColorDifArray[x][y],yColorDifArray[x][y-1],diagonal2ColorDifArray[x][y-1]);
              /*setColorToImgData(ratioColorDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_yColorDifArray[x][y]);
              setColorToImgData(ratioColorDifField,mIndexX+1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal1ColorDifArray[x][y]);
              setColorToImgData(ratioColorDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_xColorDifArray[x][y]);
              setColorToImgData(ratioColorDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_yColorDifArray[x][y-1]);
              setColorToImgData(ratioColorDifField,mIndexX+1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal2ColorDifArray[x][y-1]);*/
            }
          }
          else if(x==xDim-1){
            if(y==0){
              // corner
              var tmpMax = Math.max(subdiagonal2DifArray[x-1][y],subyDifArray[x][y],subxDifArray[x-1][y]);
              var tmpMin = Math.min(subdiagonal2DifArray[x-1][y],subyDifArray[x][y],subxDifArray[x-1][y]);
              if(Math.abs(tmpMin)>Math.abs(tmpMax))
                maxABSRatio = tmpMin;
              else
                maxABSRatio = tmpMax;

              /*setColorToImgData(ratioDifField,mIndexX-1,mIndexY+1,maxHeightIndex,newXDim,color_subdiagonal2DifArray[x-1][y]);
              setColorToImgData(ratioDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_subyDifArray[x][y]);
              setColorToImgData(ratioDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_subxDifArray[x-1][y]);*/

              maxRatioV = Math.max(diagonal2DifArray[x-1][y],yDifArray[x][y],xDifArray[x-1][y]);
              /*setColorToImgData(ratioValueDifField,mIndexX-1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal2DifArray[x-1][y]);
              setColorToImgData(ratioValueDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_yDifArray[x][y]);
              setColorToImgData(ratioValueDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_xDifArray[x-1][y]);*/

              maxRatioC = Math.max(diagonal2ColorDifArray[x-1][y],yColorDifArray[x][y],xColorDifArray[x-1][y]);
              /*setColorToImgData(ratioColorDifField,mIndexX-1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal2ColorDifArray[x-1][y]);
              setColorToImgData(ratioColorDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_yColorDifArray[x][y]);
              setColorToImgData(ratioColorDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_xColorDifArray[x-1][y]);*/
            }
            else if (y==yDim-1) {
              // corner
              var tmpMax = Math.max(subxDifArray[x-1][y],subdiagonal1DifArray[x-1][y-1],subyDifArray[x][y-1]);
              var tmpMin = Math.min(subxDifArray[x-1][y],subdiagonal1DifArray[x-1][y-1],subyDifArray[x][y-1]);
              if(Math.abs(tmpMin)>Math.abs(tmpMax))
                maxABSRatio = tmpMin;
              else
                maxABSRatio = tmpMax;
              /*setColorToImgData(ratioDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_subxDifArray[x-1][y]);
              setColorToImgData(ratioDifField,mIndexX-1,mIndexY-1,maxHeightIndex,newXDim,color_subdiagonal1DifArray[x-1][y-1]);
              setColorToImgData(ratioDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_subyDifArray[x][y-1]);*/

              maxRatioV = Math.max(xDifArray[x-1][y],diagonal1DifArray[x-1][y-1],yDifArray[x][y-1]);
              /*setColorToImgData(ratioValueDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_xDifArray[x-1][y]);
              setColorToImgData(ratioValueDifField,mIndexX-1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal1DifArray[x-1][y-1]);
              setColorToImgData(ratioValueDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_yDifArray[x][y-1]);*/

              maxRatioC = Math.max(xColorDifArray[x-1][y],diagonal2ColorDifArray[x-1][y-1],yColorDifArray[x][y-1]);
              /*setColorToImgData(ratioColorDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_xColorDifArray[x-1][y]);
              setColorToImgData(ratioColorDifField,mIndexX-1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal1ColorDifArray[x-1][y-1]);
              setColorToImgData(ratioColorDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_yColorDifArray[x][y-1]);*/
            }
            else {
              // right side
              var tmpMax = Math.max(subdiagonal2DifArray[x-1][y],subyDifArray[x][y],subxDifArray[x-1][y],subdiagonal1DifArray[x-1][y-1],subyDifArray[x][y-1]);
              var tmpMin = Math.min(subdiagonal2DifArray[x-1][y],subyDifArray[x][y],subxDifArray[x-1][y],subdiagonal1DifArray[x-1][y-1],subyDifArray[x][y-1]);
              if(Math.abs(tmpMin)>Math.abs(tmpMax))
                maxABSRatio = tmpMin;
              else
                maxABSRatio = tmpMax;
              /*setColorToImgData(ratioDifField,mIndexX-1,mIndexY+1,maxHeightIndex,newXDim,color_subdiagonal2DifArray[x-1][y]);
              setColorToImgData(ratioDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_subyDifArray[x][y]);
              setColorToImgData(ratioDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_subxDifArray[x-1][y]);
              setColorToImgData(ratioDifField,mIndexX-1,mIndexY-1,maxHeightIndex,newXDim,color_subdiagonal1DifArray[x-1][y-1]);
              setColorToImgData(ratioDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_subyDifArray[x][y-1]);*/

              maxRatioV = Math.max(diagonal2DifArray[x-1][y],yDifArray[x][y],xDifArray[x-1][y],diagonal1DifArray[x-1][y-1],yDifArray[x][y-1]);
              /*setColorToImgData(ratioValueDifField,mIndexX-1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal2DifArray[x-1][y]);
              setColorToImgData(ratioValueDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_yDifArray[x][y]);
              setColorToImgData(ratioValueDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_xDifArray[x-1][y]);
              setColorToImgData(ratioValueDifField,mIndexX-1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal1DifArray[x-1][y-1]);
              setColorToImgData(ratioValueDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_yDifArray[x][y-1]);*/

              maxRatioC = Math.max(diagonal2ColorDifArray[x-1][y],yColorDifArray[x][y],xColorDifArray[x-1][y],diagonal2ColorDifArray[x-1][y-1],yColorDifArray[x][y-1]);
              /*setColorToImgData(ratioColorDifField,mIndexX-1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal2ColorDifArray[x-1][y]);
              setColorToImgData(ratioColorDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_yColorDifArray[x][y]);
              setColorToImgData(ratioColorDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_xColorDifArray[x-1][y]);
              setColorToImgData(ratioColorDifField,mIndexX-1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal1ColorDifArray[x-1][y-1]);
              setColorToImgData(ratioColorDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_yColorDifArray[x][y-1]);*/
             }
          }
          else {
            if(y==0){
              // bottom side
              var tmpMax = Math.max(subdiagonal2DifArray[x-1][y],subyDifArray[x][y],subdiagonal1DifArray[x][y],subxDifArray[x-1][y],subxDifArray[x][y]);
              var tmpMin = Math.min(subdiagonal2DifArray[x-1][y],subyDifArray[x][y],subdiagonal1DifArray[x][y],subxDifArray[x-1][y],subxDifArray[x][y]);
              if(Math.abs(tmpMin)>Math.abs(tmpMax))
                maxABSRatio = tmpMin;
              else
                maxABSRatio = tmpMax;
              /*setColorToImgData(ratioDifField,mIndexX-1,mIndexY+1,maxHeightIndex,newXDim,color_subdiagonal2DifArray[x-1][y]);
              setColorToImgData(ratioDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_subyDifArray[x][y]);
              setColorToImgData(ratioDifField,mIndexX+1,mIndexY+1,maxHeightIndex,newXDim,color_subdiagonal1DifArray[x][y]);
              setColorToImgData(ratioDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_subxDifArray[x-1][y]);
              setColorToImgData(ratioDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_subxDifArray[x][y]);*/

              maxRatioV = Math.max(diagonal2DifArray[x-1][y],yDifArray[x][y],diagonal1DifArray[x][y],xDifArray[x-1][y],xDifArray[x][y]);
              /*setColorToImgData(ratioValueDifField,mIndexX-1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal2DifArray[x-1][y]);
              setColorToImgData(ratioValueDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_yDifArray[x][y]);
              setColorToImgData(ratioValueDifField,mIndexX+1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal1DifArray[x][y]);
              setColorToImgData(ratioValueDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_xDifArray[x-1][y]);
              setColorToImgData(ratioValueDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_xDifArray[x][y]);*/

              maxRatioC = Math.max(diagonal2ColorDifArray[x-1][y],yColorDifArray[x][y],diagonal1ColorDifArray[x][y],xColorDifArray[x-1][y],xColorDifArray[x][y]);
              /*setColorToImgData(ratioColorDifField,mIndexX-1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal2ColorDifArray[x-1][y]);
              setColorToImgData(ratioColorDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_yColorDifArray[x][y]);
              setColorToImgData(ratioColorDifField,mIndexX+1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal1ColorDifArray[x][y]);
              setColorToImgData(ratioColorDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_xColorDifArray[x-1][y]);
              setColorToImgData(ratioColorDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_xColorDifArray[x][y]);*/
            }
            else if(y==yDim-1){
              // top side
              var tmpMax = Math.max(subxDifArray[x-1][y],subxDifArray[x][y],subdiagonal1DifArray[x-1][y-1],subyDifArray[x][y-1],subdiagonal2DifArray[x][y-1]);
              var tmpMin = Math.min(subxDifArray[x-1][y],subxDifArray[x][y],subdiagonal1DifArray[x-1][y-1],subyDifArray[x][y-1],subdiagonal2DifArray[x][y-1]);
              if(Math.abs(tmpMin)>Math.abs(tmpMax))
                maxABSRatio = tmpMin;
              else
                maxABSRatio = tmpMax;
              /*setColorToImgData(ratioDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_subxDifArray[x-1][y]);
              setColorToImgData(ratioDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_subxDifArray[x][y]);
              setColorToImgData(ratioDifField,mIndexX-1,mIndexY-1,maxHeightIndex,newXDim,color_subdiagonal1DifArray[x-1][y-1]);
              setColorToImgData(ratioDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_subyDifArray[x][y-1]);
              setColorToImgData(ratioDifField,mIndexX+1,mIndexY-1,maxHeightIndex,newXDim,color_subdiagonal2DifArray[x][y-1]);*/

              maxRatioV = Math.max(xDifArray[x-1][y],xDifArray[x][y],diagonal1DifArray[x-1][y-1],yDifArray[x][y-1],diagonal2DifArray[x][y-1]);
              /*setColorToImgData(ratioValueDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_xDifArray[x-1][y]);
              setColorToImgData(ratioValueDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_xDifArray[x][y]);
              setColorToImgData(ratioValueDifField,mIndexX-1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal1DifArray[x-1][y-1]);
              setColorToImgData(ratioValueDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_yDifArray[x][y-1]);
              setColorToImgData(ratioValueDifField,mIndexX+1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal2DifArray[x][y-1]);*/

              maxRatioC = Math.max(xColorDifArray[x-1][y],xColorDifArray[x][y],diagonal2ColorDifArray[x-1][y-1],yColorDifArray[x][y-1],diagonal2ColorDifArray[x][y-1]);
              /*setColorToImgData(ratioColorDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_xColorDifArray[x-1][y]);
              setColorToImgData(ratioColorDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_xColorDifArray[x][y]);
              setColorToImgData(ratioColorDifField,mIndexX-1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal1ColorDifArray[x-1][y-1]);
              setColorToImgData(ratioColorDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_yColorDifArray[x][y-1]);
              setColorToImgData(ratioColorDifField,mIndexX+1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal2ColorDifArray[x][y-1]);*/
            }
            else{
              // isInsideElement
              var tmpMax = Math.max(subdiagonal2DifArray[x-1][y],subyDifArray[x][y],subdiagonal1DifArray[x][y],subxDifArray[x-1][y],subxDifArray[x][y],subdiagonal1DifArray[x-1][y-1],subyDifArray[x][y-1],subdiagonal2DifArray[x][y-1]);
              var tmpMin = Math.min(subdiagonal2DifArray[x-1][y],subyDifArray[x][y],subdiagonal1DifArray[x][y],subxDifArray[x-1][y],subxDifArray[x][y],subdiagonal1DifArray[x-1][y-1],subyDifArray[x][y-1],subdiagonal2DifArray[x][y-1]);
              if(Math.abs(tmpMin)>Math.abs(tmpMax))
                maxABSRatio = tmpMin;
              else
                maxABSRatio = tmpMax;
              /*setColorToImgData(ratioDifField,mIndexX-1,mIndexY+1,maxHeightIndex,newXDim,color_subdiagonal2DifArray[x-1][y]);
              setColorToImgData(ratioDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_subyDifArray[x][y]);
              setColorToImgData(ratioDifField,mIndexX+1,mIndexY+1,maxHeightIndex,newXDim,color_subdiagonal1DifArray[x][y]);
              setColorToImgData(ratioDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_subxDifArray[x-1][y]);
              setColorToImgData(ratioDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_subxDifArray[x][y]);
              setColorToImgData(ratioDifField,mIndexX-1,mIndexY-1,maxHeightIndex,newXDim,color_subdiagonal1DifArray[x-1][y-1]);
              setColorToImgData(ratioDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_subyDifArray[x][y-1]);
              setColorToImgData(ratioDifField,mIndexX+1,mIndexY-1,maxHeightIndex,newXDim,color_subdiagonal2DifArray[x][y-1]);*/

              maxRatioV = Math.max(diagonal2DifArray[x-1][y],yDifArray[x][y],diagonal1DifArray[x][y],xDifArray[x-1][y],xDifArray[x][y],diagonal1DifArray[x-1][y-1],yDifArray[x][y-1],diagonal2DifArray[x][y-1]);
              /*setColorToImgData(ratioValueDifField,mIndexX-1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal2DifArray[x-1][y]);
              setColorToImgData(ratioValueDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_yDifArray[x][y]);
              setColorToImgData(ratioValueDifField,mIndexX+1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal1DifArray[x][y]);
              setColorToImgData(ratioValueDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_xDifArray[x-1][y]);
              setColorToImgData(ratioValueDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_xDifArray[x][y]);
              setColorToImgData(ratioValueDifField,mIndexX-1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal1DifArray[x-1][y-1]);
              setColorToImgData(ratioValueDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_yDifArray[x][y-1]);
              setColorToImgData(ratioValueDifField,mIndexX+1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal2DifArray[x][y-1]);*/

              maxRatioC = Math.max(diagonal2ColorDifArray[x-1][y],yColorDifArray[x][y],diagonal1ColorDifArray[x][y],xColorDifArray[x-1][y],xColorDifArray[x][y],diagonal2ColorDifArray[x-1][y-1],yColorDifArray[x][y-1],diagonal2ColorDifArray[x][y-1]);
              /*setColorToImgData(ratioColorDifField,mIndexX-1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal2ColorDifArray[x-1][y]);
              setColorToImgData(ratioColorDifField,mIndexX,mIndexY+1,maxHeightIndex,newXDim,color_yColorDifArray[x][y]);
              setColorToImgData(ratioColorDifField,mIndexX+1,mIndexY+1,maxHeightIndex,newXDim,color_diagonal1ColorDifArray[x][y]);
              setColorToImgData(ratioColorDifField,mIndexX-1,mIndexY,maxHeightIndex,newXDim,color_xColorDifArray[x-1][y]);
              setColorToImgData(ratioColorDifField,mIndexX+1,mIndexY,maxHeightIndex,newXDim,color_xColorDifArray[x][y]);
              setColorToImgData(ratioColorDifField,mIndexX-1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal1ColorDifArray[x-1][y-1]);
              setColorToImgData(ratioColorDifField,mIndexX,mIndexY-1,maxHeightIndex,newXDim,color_yColorDifArray[x][y-1]);
              setColorToImgData(ratioColorDifField,mIndexX+1,mIndexY-1,maxHeightIndex,newXDim,color_diagonal2ColorDifArray[x][y-1]);*/

            }
          }

          /*setColorToImgData(ratioDifField,mIndexX,mIndexY,maxHeightIndex,newXDim,ratioDifCMS.calculateColor(maxABSRatio));
          setColorToImgData(ratioValueDifField,mIndexX,mIndexY,maxHeightIndex,newXDim,ratioDifCMS.calculateColor(maxRatioV));
          setColorToImgData(ratioColorDifField,mIndexX,mIndexY,maxHeightIndex,newXDim,ratioDifCMS.calculateColor(maxRatioC));*/

          setColorToImgData(ratioDifField,x,y,maxHeightIndex,xDim,ratioDifCMS.calculateColor(maxABSRatio));
          setColorToImgData(ratioValueDifField,x,y,maxHeightIndex,xDim,ratioDifCMS.calculateColor(maxRatioV));
          setColorToImgData(ratioColorDifField,x,y,maxHeightIndex,xDim,ratioDifCMS.calculateColor(maxRatioC));
        }
      }



      return [ratioValueDifField,ratioColorDifField,ratioDifField];

}

function calcSubtractionField(sub1_2D, sub2_2D){
  var result = [];
    for (var x = 0; x < sub1_2D.length; x++) {
      var tmpArray = [];
      for (var y = 0; y < sub1_2D[0].length; y++) {
        tmpArray.push(sub1_2D[x][y]-sub2_2D[x][y])
      }
      result.push(tmpArray);
    }
  return result;
}

function makeRatioField(array2D, min, max){
  var result = [];
  var dis = max-min;
    for (var x = 0; x < array2D.length; x++) {
      var tmpArray = [];
      for (var y = 0; y < array2D[0].length; y++) {
        tmpArray.push((array2D[x][y]-min)/dis)
      }
      result.push(tmpArray);
    }
  return result;
}


function getColorDif(colorDifType, c1, c2){
  switch (colorDifType) {
    case 0: //
    case 3:
      return calc3DEuclideanDistance(c1,c2);
    break;
    case 1:
      return calcDeltaDE94(c1,c2);
    break;
    case 2:
      return calcDeltaCIEDE2000(c1,c2);
    break;
  }
}

function getDifFieldColorArray(array2D){
  var result = [];
    for (var x = 0; x < array2D.length; x++) {
      var tmpArray = [];
      for (var y = 0; y < array2D[0].length; y++) {
        tmpArray.push(ratioDifCMS.calculateColor(array2D[x][y]));
      }
      result.push(tmpArray);
    }
  return result;
}


function setColorToImgData(imgData,x,y,maxHeightIndex,width,colorRGB){
  if(colorRGB!=undefined){
    var indices = getColorIndicesForCoord(x, maxHeightIndex - y, width)
    imgData.data[indices[0]] = Math.round(colorRGB.get1Value() * 255); // r
    imgData.data[indices[1]] = Math.round(colorRGB.get2Value() * 255); // g
    imgData.data[indices[2]] = Math.round(colorRGB.get3Value() * 255); // b
    imgData.data[indices[3]] = 255; //a
  }

}
