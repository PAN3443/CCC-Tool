function jumpTestField(){

    testFieldMax = -Infinity;
    testFieldMin = Infinity;


    var dis = Math.round((cmsEndRef - cmsStartRef) * errorMath) / errorMath; // = version with rational number jumps
    for (var y = 0; y < testFieldDimY; y++) {
      for (var x = 0; x < testFieldDimX; x++) {
        jsonObj.testFieldVal.push(undefined);
        jsonObj.positions.push([(x / 2), y]);
      }
    }

    var currentValIndex = 0;
    for (var i = 0; i < data.testFieldVar_a.length; i++) {

      var value = undefined;

      if (data.testFieldVar_b) {
        value = Math.round((cmsStartRef + (data.testFieldVar_a[i] * dis)) * errorMath) / errorMath; // = version with rational number jumps
      } else {
        value = data.testFieldVar_a[i];
      }

      testFieldMin = Math.min(testFieldMin, value);
      testFieldMax = Math.max(testFieldMax, value);

      //var
      var currentXPos = 1;
      for (var y = 0; y < (testFieldDimY - 1); y++) {
        var tmpIndex = (y * testFieldDimX) + currentValIndex;

        //jsonObj.positions[tmpIndex]=[currentValIndex,y];
        jsonObj.testFieldVal[tmpIndex] = value;
        tmpIndex = (i * testFieldDimX) + currentXPos;

        //jsonObj.positions[tmpIndex]=[currentXPos,y];
        jsonObj.testFieldVal[tmpIndex] = value;
        currentXPos += 2;
      }
      currentValIndex += 2;
    }

}
