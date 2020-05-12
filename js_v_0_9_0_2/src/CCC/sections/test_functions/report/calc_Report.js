function getRatioDifField(testfield, colorField, colorDifType, selectionType,normalization,customNormValue){


  //// CalcBlackWhite
  var blackWhiteDif = 100;
  switch (colorDifType) {
    case "lab":
    case "din99":
      blackWhiteDif = 100; //blackWhiteDif = calc3DEuclideanDistance(cloneColor(c1),cloneColor(c2));
    break;
    case "de94":
      blackWhiteDif = calcDeltaDE94(new class_Color_LAB(0,0,0),new class_Color_LAB(100,0,0));
    break;
    case "de2000":
      blackWhiteDif = calcDeltaCIEDE2000(new class_Color_LAB(0,0,0),new class_Color_LAB(100,0,0));
    break;
  }


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


      //console.log("Min=",tmpShouldBeColorMin,"Max=",tmpShouldBeColorMax);


      /*var xColorDifArray_Ratio = makeRatioField(xColorDifArray, tmpShouldBeColorMin, tmpShouldBeColorMax);
      var yColorDifArray_Ratio = makeRatioField(yColorDifArray, tmpShouldBeColorMin, tmpShouldBeColorMax);
      var diagonal1ColorDifArray_Ratio = makeRatioField(diagonal1ColorDifArray, tmpShouldBeColorMin, tmpShouldBeColorMax);
      var diagonal2ColorDifArray_Ratio = makeRatioField(diagonal2ColorDifArray, tmpShouldBeColorMin, tmpShouldBeColorMax);//*/

      var xColorDifArray_Ratio = makeRatioField(xColorDifArray, tmpColorMin, tmpColorMax);
      var yColorDifArray_Ratio = makeRatioField(yColorDifArray, tmpColorMin, tmpColorMax);
      var diagonal1ColorDifArray_Ratio = makeRatioField(diagonal1ColorDifArray, tmpColorMin, tmpColorMax);
      var diagonal2ColorDifArray_Ratio = makeRatioField(diagonal2ColorDifArray, tmpColorMin, tmpColorMax);//*/

      switch (normalization) {
        case "minMax":
          xColorDifArray_Ratio = makeRatioField(xColorDifArray, tmpColorMin, tmpColorMax);
          yColorDifArray_Ratio = makeRatioField(yColorDifArray, tmpColorMin, tmpColorMax);
          diagonal1ColorDifArray_Ratio = makeRatioField(diagonal1ColorDifArray, tmpColorMin, tmpColorMax);
          diagonal2ColorDifArray_Ratio = makeRatioField(diagonal2ColorDifArray, tmpColorMin, tmpColorMax);//*/
        break;
        case "blackWhite":
          xColorDifArray_Ratio = makeRatioField(xColorDifArray, 0, blackWhiteDif);
          yColorDifArray_Ratio = makeRatioField(yColorDifArray, 0, blackWhiteDif);
          diagonal1ColorDifArray_Ratio = makeRatioField(diagonal1ColorDifArray, 0, blackWhiteDif);
          diagonal2ColorDifArray_Ratio = makeRatioField(diagonal2ColorDifArray, 0, blackWhiteDif);//*/
        break;
        case "custom":
          xColorDifArray_Ratio = makeRatioField(xColorDifArray, 0, customNormValue);
          yColorDifArray_Ratio = makeRatioField(yColorDifArray, 0, customNormValue);
          diagonal1ColorDifArray_Ratio = makeRatioField(diagonal1ColorDifArray, 0, customNormValue);
          diagonal2ColorDifArray_Ratio = makeRatioField(diagonal2ColorDifArray, 0, customNormValue);//*/
        break;
        default:
          xColorDifArray_Ratio = makeRatioField(xColorDifArray, tmpColorMin, tmpColorMax);
          yColorDifArray_Ratio = makeRatioField(yColorDifArray, tmpColorMin, tmpColorMax);
          diagonal1ColorDifArray_Ratio = makeRatioField(diagonal1ColorDifArray, tmpColorMin, tmpColorMax);
          diagonal2ColorDifArray_Ratio = makeRatioField(diagonal2ColorDifArray, tmpColorMin, tmpColorMax);//*/
      }


      var xDifArray_Ratio = makeRatioField(xDifArray, tmpMin, tmpMax);
      var yDifArray_Ratio = makeRatioField(yDifArray, tmpMin, tmpMax);
      var diagonal1DifArray_Ratio = makeRatioField(diagonal1DifArray, tmpMin, tmpMax);
      var diagonal2DifArray_Ratio = makeRatioField(diagonal2DifArray, tmpMin, tmpMax);

      ////////////////////////////////////////////
      ////  Step 3: Subtraction Differences
      ////////////////////////////////////////////
      var xDifArray_Sub = calcSubtractionField(xColorDifArray_Ratio,xDifArray_Ratio);
      var yDifArray_Sub = calcSubtractionField(yColorDifArray_Ratio,yDifArray_Ratio);
      var diagonal1DifArray_Sub = calcSubtractionField(diagonal1ColorDifArray_Ratio,diagonal1DifArray_Ratio);
      var diagonal2DifArray_Sub = calcSubtractionField(diagonal2ColorDifArray_Ratio,diagonal2DifArray_Ratio);


      ////////////////////////////////////////////
      ////  Step 4: Create Field
      ////////////////////////////////////////////


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
              switch (selectionType) {
                case "max":
                  var tmpMax = Math.max(yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x][y]);
                  var tmpMin = Math.min(yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x][y]);
                  if(Math.abs(tmpMin)>Math.abs(tmpMax))
                    maxABSRatio = tmpMin;
                  else
                    maxABSRatio = tmpMax;

                  maxRatioV = Math.max(yDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x][y],xDifArray_Ratio[x][y]);
                  maxRatioC = Math.max(yColorDifArray_Ratio[x][y],diagonal1ColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x][y]);
                  break;
                  case "avg":
                    maxABSRatio = calcAverage([yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x][y]]);
                    maxRatioV = calcAverage([yDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x][y],xDifArray_Ratio[x][y]]);
                    maxRatioC = calcAverage([yColorDifArray_Ratio[x][y],diagonal1ColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x][y]]);
                  break;
                  case "median":
                    maxABSRatio = calcMedian([yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x][y]]);
                    maxRatioV = calcMedian([yDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x][y],xDifArray_Ratio[x][y]]);
                    maxRatioC = calcMedian([yColorDifArray_Ratio[x][y],diagonal1ColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x][y]]);
                  break;
              }

            }
            else if (y==yDim-1) {
              // corner leftTop
              switch (selectionType) {
                case "max":
                  var tmpMax = Math.max(xDifArray_Sub[x][y],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]);
                  var tmpMin = Math.min(xDifArray_Sub[x][y],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]);
                  if(Math.abs(tmpMin)>Math.abs(tmpMax))
                    maxABSRatio = tmpMin;
                  else
                    maxABSRatio = tmpMax;

                  maxRatioV = Math.max(xDifArray_Ratio[x][y],yDifArray_Ratio[x][y-1],diagonal2DifArray_Ratio[x][y-1]);

                  maxRatioC = Math.max(xColorDifArray_Ratio[x][y],yColorDifArray_Ratio[x][y-1],diagonal2ColorDifArray_Ratio[x][y-1]);
                break;
                case "avg":
                  maxABSRatio = calcAverage([xDifArray_Sub[x][y],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]]);
                  maxRatioV = calcAverage([xDifArray_Ratio[x][y],yDifArray_Ratio[x][y-1],diagonal2DifArray_Ratio[x][y-1]]);
                  maxRatioC = calcAverage([xColorDifArray_Ratio[x][y],yColorDifArray_Ratio[x][y-1],diagonal2ColorDifArray_Ratio[x][y-1]]);
                break;
                case "median":
                  maxABSRatio = calcMedian([xDifArray_Sub[x][y],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]]);
                  maxRatioV = calcMedian([xDifArray_Ratio[x][y],yDifArray_Ratio[x][y-1],diagonal2DifArray_Ratio[x][y-1]]);
                  maxRatioC = calcMedian([xColorDifArray_Ratio[x][y],yColorDifArray_Ratio[x][y-1],diagonal2ColorDifArray_Ratio[x][y-1]]);
                break;
              }

            }
            else {
              // left side
              switch (selectionType) {
                case "max":
                  var tmpMax = Math.max(yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x][y],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]);
                  var tmpMin = Math.min(yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x][y],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]);
                  if(Math.abs(tmpMin)>Math.abs(tmpMax))
                    maxABSRatio = tmpMin;
                  else
                    maxABSRatio = tmpMax;

                  maxRatioV = Math.max(yDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x][y],xDifArray_Ratio[x][y],yDifArray_Ratio[x][y-1],diagonal2DifArray_Ratio[x][y-1]);
                  maxRatioC = Math.max(yColorDifArray_Ratio[x][y],diagonal1ColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x][y],yColorDifArray_Ratio[x][y-1],diagonal2ColorDifArray_Ratio[x][y-1]);
                break;
                case "avg":
                  maxABSRatio = calcAverage([yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x][y],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]]);
                  maxRatioV = calcAverage([yDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x][y],xDifArray_Ratio[x][y],yDifArray_Ratio[x][y-1],diagonal2DifArray_Ratio[x][y-1]]);
                  maxRatioC = calcAverage([yColorDifArray_Ratio[x][y],diagonal1ColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x][y],yColorDifArray_Ratio[x][y-1],diagonal2ColorDifArray_Ratio[x][y-1]]);
                break;
                case "median":
                  maxABSRatio = calcMedian([yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x][y],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]]);
                  maxRatioV = calcMedian([yDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x][y],xDifArray_Ratio[x][y],yDifArray_Ratio[x][y-1],diagonal2DifArray_Ratio[x][y-1]]);
                  maxRatioC = calcMedian([yColorDifArray_Ratio[x][y],diagonal1ColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x][y],yColorDifArray_Ratio[x][y-1],diagonal2ColorDifArray_Ratio[x][y-1]]);
                break;
              }

            }
          }
          else if(x==xDim-1){
            if(y==0){
              // corner
              switch (selectionType) {
                case "max":
                  var tmpMax = Math.max(diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],xDifArray_Sub[x-1][y]);
                  var tmpMin = Math.min(diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],xDifArray_Sub[x-1][y]);
                  if(Math.abs(tmpMin)>Math.abs(tmpMax))
                    maxABSRatio = tmpMin;
                  else
                    maxABSRatio = tmpMax;

                  maxRatioV = Math.max(diagonal2DifArray_Ratio[x-1][y],yDifArray_Ratio[x][y],xDifArray_Ratio[x-1][y]);
                  maxRatioC = Math.max(diagonal2ColorDifArray_Ratio[x-1][y],yColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x-1][y]);
                break;
                case "avg":
                  maxABSRatio = calcAverage([diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],xDifArray_Sub[x-1][y]]);
                  maxRatioV = calcAverage([diagonal2DifArray_Ratio[x-1][y],yDifArray_Ratio[x][y],xDifArray_Ratio[x-1][y]]);
                  maxRatioC = calcAverage([diagonal2ColorDifArray_Ratio[x-1][y],yColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x-1][y]]);
                break;
                case "median":
                  maxABSRatio = calcMedian([diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],xDifArray_Sub[x-1][y]]);
                  maxRatioV = calcMedian([diagonal2DifArray_Ratio[x-1][y],yDifArray_Ratio[x][y],xDifArray_Ratio[x-1][y]]);
                  maxRatioC = calcMedian([diagonal2ColorDifArray_Ratio[x-1][y],yColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x-1][y]]);
                break;
              }

            }
            else if (y==yDim-1) {
              // corner
              switch (selectionType) {
                case "max":
                  var tmpMax = Math.max(xDifArray_Sub[x-1][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1]);
                  var tmpMin = Math.min(xDifArray_Sub[x-1][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1]);
                  if(Math.abs(tmpMin)>Math.abs(tmpMax))
                    maxABSRatio = tmpMin;
                  else
                    maxABSRatio = tmpMax;

                  maxRatioV = Math.max(xDifArray_Ratio[x-1][y],diagonal1DifArray_Ratio[x-1][y-1],yDifArray_Ratio[x][y-1]);

                  maxRatioC = Math.max(xColorDifArray_Ratio[x-1][y],diagonal2ColorDifArray_Ratio[x-1][y-1],yColorDifArray_Ratio[x][y-1]);
                break;
                case "avg":
                  maxABSRatio = calcAverage([xDifArray_Sub[x-1][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1]]);
                  maxRatioV = calcAverage([xDifArray_Ratio[x-1][y],diagonal1DifArray_Ratio[x-1][y-1],yDifArray_Ratio[x][y-1]]);
                  maxRatioC = calcAverage([xColorDifArray_Ratio[x-1][y],diagonal2ColorDifArray_Ratio[x-1][y-1],yColorDifArray_Ratio[x][y-1]]);
                break;
                case "median":
                  maxABSRatio = calcMedian([xDifArray_Sub[x-1][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1]]);
                  maxRatioV = calcMedian([xDifArray_Ratio[x-1][y],diagonal1DifArray_Ratio[x-1][y-1],yDifArray_Ratio[x][y-1]]);
                  maxRatioC = calcMedian([xColorDifArray_Ratio[x-1][y],diagonal2ColorDifArray_Ratio[x-1][y-1],yColorDifArray_Ratio[x][y-1]]);
                break;
              }

            }
            else {
              // right side
              switch (selectionType) {
                case "max":
                  var tmpMax = Math.max(diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],xDifArray_Sub[x-1][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1]);
                  var tmpMin = Math.min(diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],xDifArray_Sub[x-1][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1]);
                  if(Math.abs(tmpMin)>Math.abs(tmpMax))
                    maxABSRatio = tmpMin;
                  else
                    maxABSRatio = tmpMax;

                  maxRatioV = Math.max(diagonal2DifArray_Ratio[x-1][y],yDifArray_Ratio[x][y],xDifArray_Ratio[x-1][y],diagonal1DifArray_Ratio[x-1][y-1],yDifArray_Ratio[x][y-1]);

                  maxRatioC = Math.max(diagonal2ColorDifArray_Ratio[x-1][y],yColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x-1][y],diagonal2ColorDifArray_Ratio[x-1][y-1],yColorDifArray_Ratio[x][y-1]);
                break;
                case "avg":
                  maxABSRatio = calcAverage([diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],xDifArray_Sub[x-1][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1]]);
                  maxRatioV = calcAverage([diagonal2DifArray_Ratio[x-1][y],yDifArray_Ratio[x][y],xDifArray_Ratio[x-1][y],diagonal1DifArray_Ratio[x-1][y-1],yDifArray_Ratio[x][y-1]]);
                  maxRatioC = calcAverage([diagonal2ColorDifArray_Ratio[x-1][y],yColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x-1][y],diagonal2ColorDifArray_Ratio[x-1][y-1],yColorDifArray_Ratio[x][y-1]]);
                break;
                case "median":
                  maxABSRatio = calcMedian([diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],xDifArray_Sub[x-1][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1]]);
                  maxRatioV = calcMedian([diagonal2DifArray_Ratio[x-1][y],yDifArray_Ratio[x][y],xDifArray_Ratio[x-1][y],diagonal1DifArray_Ratio[x-1][y-1],yDifArray_Ratio[x][y-1]]);
                  maxRatioC = calcMedian([diagonal2ColorDifArray_Ratio[x-1][y],yColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x-1][y],diagonal2ColorDifArray_Ratio[x-1][y-1],yColorDifArray_Ratio[x][y-1]]);
                break;
              }

             }
          }
          else {
            if(y==0){
              // bottom side
              switch (selectionType) {
                case "max":
                  var tmpMax = Math.max(diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x-1][y],xDifArray_Sub[x][y]);
                  var tmpMin = Math.min(diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x-1][y],xDifArray_Sub[x][y]);
                  if(Math.abs(tmpMin)>Math.abs(tmpMax))
                    maxABSRatio = tmpMin;
                  else
                    maxABSRatio = tmpMax;

                  maxRatioV = Math.max(diagonal2DifArray_Ratio[x-1][y],yDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x][y],xDifArray_Ratio[x-1][y],xDifArray_Ratio[x][y]);

                  maxRatioC = Math.max(diagonal2ColorDifArray_Ratio[x-1][y],yColorDifArray_Ratio[x][y],diagonal1ColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x-1][y],xColorDifArray_Ratio[x][y]);
                break;
                case "avg":
                  maxABSRatio = calcAverage([diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x-1][y],xDifArray_Sub[x][y]]);
                  maxRatioV = calcAverage([diagonal2DifArray_Ratio[x-1][y],yDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x][y],xDifArray_Ratio[x-1][y],xDifArray_Ratio[x][y]]);
                  maxRatioC = calcAverage([diagonal2ColorDifArray_Ratio[x-1][y],yColorDifArray_Ratio[x][y],diagonal1ColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x-1][y],xColorDifArray_Ratio[x][y]]);
                break;
                case "median":
                  maxABSRatio = calcMedian([diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x-1][y],xDifArray_Sub[x][y]]);
                  maxRatioV = calcMedian([diagonal2DifArray_Ratio[x-1][y],yDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x][y],xDifArray_Ratio[x-1][y],xDifArray_Ratio[x][y]]);
                  maxRatioC = calcMedian([diagonal2ColorDifArray_Ratio[x-1][y],yColorDifArray_Ratio[x][y],diagonal1ColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x-1][y],xColorDifArray_Ratio[x][y]]);
                break;
              }

            }
            else if(y==yDim-1){
              // top side
              switch (selectionType) {
                case "max":
                  var tmpMax = Math.max(xDifArray_Sub[x-1][y],xDifArray_Sub[x][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]);
                  var tmpMin = Math.min(xDifArray_Sub[x-1][y],xDifArray_Sub[x][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]);
                  if(Math.abs(tmpMin)>Math.abs(tmpMax))
                    maxABSRatio = tmpMin;
                  else
                    maxABSRatio = tmpMax;

                  maxRatioV = Math.max(xDifArray_Ratio[x-1][y],xDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x-1][y-1],yDifArray_Ratio[x][y-1],diagonal2DifArray_Ratio[x][y-1]);

                  maxRatioC = Math.max(xColorDifArray_Ratio[x-1][y],xColorDifArray_Ratio[x][y],diagonal2ColorDifArray_Ratio[x-1][y-1],yColorDifArray_Ratio[x][y-1],diagonal2ColorDifArray_Ratio[x][y-1]);
                break;
                case "avg":
                  maxABSRatio = calcAverage([xDifArray_Sub[x-1][y],xDifArray_Sub[x][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]]);
                  maxRatioV = calcAverage([xDifArray_Ratio[x-1][y],xDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x-1][y-1],yDifArray_Ratio[x][y-1],diagonal2DifArray_Ratio[x][y-1]]);
                  maxRatioC = calcAverage([xColorDifArray_Ratio[x-1][y],xColorDifArray_Ratio[x][y],diagonal2ColorDifArray_Ratio[x-1][y-1],yColorDifArray_Ratio[x][y-1],diagonal2ColorDifArray_Ratio[x][y-1]]);
                break;
                case "median":
                  maxABSRatio = calcMedian([xDifArray_Sub[x-1][y],xDifArray_Sub[x][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]]);
                  maxRatioV = calcMedian([xDifArray_Ratio[x-1][y],xDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x-1][y-1],yDifArray_Ratio[x][y-1],diagonal2DifArray_Ratio[x][y-1]]);
                  maxRatioC = calcMedian([xColorDifArray_Ratio[x-1][y],xColorDifArray_Ratio[x][y],diagonal2ColorDifArray_Ratio[x-1][y-1],yColorDifArray_Ratio[x][y-1],diagonal2ColorDifArray_Ratio[x][y-1]]);
                break;
              }

            }
            else{
              // isInsideElement
              switch (selectionType) {
                case "max":
                  var tmpMax = Math.max(diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x-1][y],xDifArray_Sub[x][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]);
                  var tmpMin = Math.min(diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x-1][y],xDifArray_Sub[x][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]);
                  if(Math.abs(tmpMin)>Math.abs(tmpMax))
                    maxABSRatio = tmpMin;
                  else
                    maxABSRatio = tmpMax;

                  maxRatioV = Math.max(diagonal2DifArray_Ratio[x-1][y],yDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x][y],xDifArray_Ratio[x-1][y],xDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x-1][y-1],yDifArray_Ratio[x][y-1],diagonal2DifArray_Ratio[x][y-1]);
                  maxRatioC = Math.max(diagonal2ColorDifArray_Ratio[x-1][y],yColorDifArray_Ratio[x][y],diagonal1ColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x-1][y],xColorDifArray_Ratio[x][y],diagonal2ColorDifArray_Ratio[x-1][y-1],yColorDifArray_Ratio[x][y-1],diagonal2ColorDifArray_Ratio[x][y-1]);
                break;
                case "avg":
                  maxABSRatio = calcAverage([diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x-1][y],xDifArray_Sub[x][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]]);
                  maxRatioV = calcAverage([diagonal2DifArray_Ratio[x-1][y],yDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x][y],xDifArray_Ratio[x-1][y],xDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x-1][y-1],yDifArray_Ratio[x][y-1],diagonal2DifArray_Ratio[x][y-1]]);
                  maxRatioC = calcAverage([diagonal2ColorDifArray_Ratio[x-1][y],yColorDifArray_Ratio[x][y],diagonal1ColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x-1][y],xColorDifArray_Ratio[x][y],diagonal2ColorDifArray_Ratio[x-1][y-1],yColorDifArray_Ratio[x][y-1],diagonal2ColorDifArray_Ratio[x][y-1]]);
                break;
                case "median":
                  maxABSRatio = calcMedian([diagonal2DifArray_Sub[x-1][y],yDifArray_Sub[x][y],diagonal1DifArray_Sub[x][y],xDifArray_Sub[x-1][y],xDifArray_Sub[x][y],diagonal1DifArray_Sub[x-1][y-1],yDifArray_Sub[x][y-1],diagonal2DifArray_Sub[x][y-1]]);
                  maxRatioV = calcMedian([diagonal2DifArray_Ratio[x-1][y],yDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x][y],xDifArray_Ratio[x-1][y],xDifArray_Ratio[x][y],diagonal1DifArray_Ratio[x-1][y-1],yDifArray_Ratio[x][y-1],diagonal2DifArray_Ratio[x][y-1]]);
                  maxRatioC = calcMedian([diagonal2ColorDifArray_Ratio[x-1][y],yColorDifArray_Ratio[x][y],diagonal1ColorDifArray_Ratio[x][y],xColorDifArray_Ratio[x-1][y],xColorDifArray_Ratio[x][y],diagonal2ColorDifArray_Ratio[x-1][y-1],yColorDifArray_Ratio[x][y-1],diagonal2ColorDifArray_Ratio[x][y-1]]);
                break;
              }

            }
          }


          setColorToImgData(ratioDifField,x,y,maxHeightIndex,xDim,ratioDifCMS.calculateColor(maxABSRatio));
          setColorToImgData(ratioValueDifField,x,y,maxHeightIndex,xDim,ratioDifCMS.calculateColor(maxRatioV));
          setColorToImgData(ratioColorDifField,x,y,maxHeightIndex,xDim,ratioDifCMS.calculateColor(maxRatioC));
        }
      }

      var valueDifInfo = [xDifArray,yDifArray,diagonal1DifArray,diagonal2DifArray];
      var colorDifInfo = [xColorDifArray,yColorDifArray,diagonal1ColorDifArray,diagonal2ColorDifArray];
      var valueRatioInfo = [xDifArray_Ratio,yDifArray_Ratio,diagonal1DifArray_Ratio,diagonal2DifArray_Ratio];
      var colorRatioInfo = [xColorDifArray_Ratio,yColorDifArray_Ratio,diagonal1ColorDifArray_Ratio,diagonal2ColorDifArray_Ratio];
      var subtractionInfo = [xDifArray_Sub,yDifArray_Sub,diagonal1DifArray_Sub,diagonal2DifArray_Sub];

      return [ratioValueDifField,ratioColorDifField,ratioDifField,valueDifInfo,colorDifInfo,valueRatioInfo,colorRatioInfo,subtractionInfo];

}


function calcMedian(tmpArray){
  var sortValues = quickSort(tmpArray, 0, tmpArray.length-1);
  //var medianIndex = Math.floor(tmpArray.length/2);
  return sortValues[Math.floor(tmpArray.length/2)];
}

function calcAverage(tmpArray){
  var sum = 0;
  for (var i = 0; i < tmpArray.length; i++) {
    sum += tmpArray[i];
  }
  return sum/tmpArray.length;
}

function calcSubtractionField(sub1_2D, sub2_2D){
  var result = [];
    for (var x = 0; x < sub1_2D.length; x++) {
      var tmpArray = [];
      for (var y = 0; y < sub1_2D[0].length; y++) {
        tmpArray.push(sub1_2D[x][y]-sub2_2D[x][y]);
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
    case "lab": //
    case "din99":
      return calc3DEuclideanDistance(cloneColor(c1),cloneColor(c2));
    break;
    case "de94":
      return calcDeltaDE94(cloneColor(c1),cloneColor(c2));
    break;
    case "de2000":
      return calcDeltaCIEDE2000(cloneColor(c1),cloneColor(c2));
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
