function calculateImageData(testfield, doGreyScaled) {

  var imgWidth = testfield.getXDim();
  var imgHeight = testfield.getYDim();

  if (testfield.getCellValues()) {
    imgWidth--;
    imgHeight--;
  }

  var maxHeightIndex = imgHeight - 1;

  if(isNaN(imgWidth) || isNaN(imgWidth))
    return new ImageData(1, 1);

  if(imgWidth==undefined || imgWidth==undefined)
    return new ImageData(1, 1);

  if(imgWidth<1 || imgWidth<1)
    return new ImageData(1, 1);//*/

  var imgData = new ImageData(imgWidth, imgHeight);

  if (doGreyScaled) {
    for (var y = 0; y < imgHeight; y++) {
      for (var x = 0; x < imgWidth; x++) {
        var greyVal = testfield.getRatioFieldValue(x, y)*255;
        var indices = getColorIndicesForCoord(x, maxHeightIndex - y, imgWidth);
        imgData.data[indices[0]] = Math.round(greyVal); // r
        imgData.data[indices[1]] = Math.round(greyVal); // g
        imgData.data[indices[2]] = Math.round(greyVal); // b
        imgData.data[indices[3]] = 255; //a
      }
    }
  } else {

    for (var y = 0; y < imgHeight; y++) {
      for (var x = 0; x < imgWidth; x++) {
        var colorRGB = globalCMS1.calculateColor(testfield.getFieldValue(x, y));
        var indices = getColorIndicesForCoord(x, maxHeightIndex - y, imgWidth);
        imgData.data[indices[0]] = Math.round(colorRGB.get1Value() * 255); // r
        imgData.data[indices[1]] = Math.round(colorRGB.get2Value() * 255); // g
        imgData.data[indices[2]] = Math.round(colorRGB.get3Value() * 255); // b
        imgData.data[indices[3]] = 255; //a
      }
    }

  }
  return imgData;
}


function calc_Preview_TestingField(index) {
  switch (typeList[index]) {
    case "CCCTest":
      calc_Preview_CCCTestField(index);
      break;
    case "Collection":
      calc_Preview_CollectionField(index);
      break;
    case "RealData":
      calc_Preview_RealDataField(index);
      break;
  }

}

function calc_Preview_CCCTestField(index) {

  switch (subtypeList[index]) {
    case "Jump":
      testFieldList[index].setCellValues(true);
      testFieldList[index].setField(jumpTestField(optionsList[index]));
      break;
    case "LittleBit":
      testFieldList[index].setField(littleBitTestField(optionsList[index]));
      break;
    case "Treshold":
      testFieldList[index].setField(tresholdTestField(optionsList[index]));
      break;
    case "RiVa":
      testFieldList[index].setField(ridgeValleyTestField(optionsList[index]));
      break;
    case "Gradient":
      testFieldList[index].setField(gradientTestField(optionsList[index]));
      break;
    case "Extrema":
      testFieldList[index].setAutoScale(optionsList[index][3]);
      testFieldList[index].setScaleRange(globalCMS1.getRefPosition(0), globalCMS1.getRefPosition(globalCMS1.getKeyLength() - 1));
      testFieldList[index].setField(extremaTestField(optionsList[index]));
      break;
    case "Frequency":
      testFieldList[index].setField(frequencyTestField(optionsList[index]));
      break;
      /*case "Topology":
        break;*/
  }



  //[testFieldDimX,testFieldDimY,testFieldVal,positions]

}

function calc_Preview_CollectionField(index) {

  testFieldList[index].setAutoScale(true);
  testFieldList[index].setScaleRange(globalCMS1.getRefPosition(0), globalCMS1.getRefPosition(globalCMS1.getKeyLength() - 1));

  switch (subtypeList[index]) {
    case "Ackley":
      testFieldList[index].setField(ackley_TestField(optionsList[index]));
      break;
    case "Bukin_N6":
      testFieldList[index].setField(bukin_N6_TestField(optionsList[index]));
      break;
    case "Cross-in-Tray":
      testFieldList[index].setField(crossInTray_TestField(optionsList[index]));
      break;
    case "Drop-Wave":
      testFieldList[index].setField(dropWave_TestField(optionsList[index]));
      break;
    case "Eggholder":
      testFieldList[index].setField(eggholder_TestField(optionsList[index]));
      break;
    case "Griewank":
      testFieldList[index].setField(griewank_TestField(optionsList[index]));
      break;
    case "HolderTable":
      testFieldList[index].setField(holderTable_TestField(optionsList[index]));
      break;
    case "Langermann":
      testFieldList[index].setField(langermann_TestField(optionsList[index]));
      break;
    case "Levy":
      testFieldList[index].setField(levy_TestField(optionsList[index]));
      break;
    case "Levy_N13":
      testFieldList[index].setField(levyN13_TestField(optionsList[index]));
      break;
    case "Rastrigin":
      testFieldList[index].setField(rastrigin_TestField(optionsList[index]));
      break;
    case "Schaffer_N2":
      testFieldList[index].setField(schaffer_N2_TestField(optionsList[index]));
      break;
    case "Schaffer_N4":
      testFieldList[index].setField(schafferN4_TestField(optionsList[index]));
      break;
    case "Schwefel":
      testFieldList[index].setField(schwefel_TestField(optionsList[index]));
      break;
    case "Shubert":
      testFieldList[index].setField(shubert_TestField(optionsList[index]));
      break;
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /// Functions: Bowl-Shaped
    case "Bohachevsky_F1":
      testFieldList[index].setField(bohachevsky_F1_TestField(optionsList[index]));
      break;
    case "Bohachevsky_F2":
      testFieldList[index].setField(bohachevsky_F2_TestField(optionsList[index]));
      break;
    case "Bohachevsky_F3":
    testFieldList[index].setField(bohachevsky_F3_TestField(optionsList[index]));
      break;
    case "Perm_V1":
    testFieldList[index].setField(perm_V1_TestField(optionsList[index]));
      break;
    case "Rot_Hyper_Ellipsoid":
    testFieldList[index].setField(rot_Hyper_Ellipsoid_TestField(optionsList[index]));
      break;
    case "Sphere":
    testFieldList[index].setField(sphere_TestField(optionsList[index]));
      break;
    case "SumDifPowers":
    testFieldList[index].setField(sumDifPowers_TestField(optionsList[index]));
      break;
    case "Sum_Squares":
    testFieldList[index].setField(sum_Squares_TestField(optionsList[index]));
      break;
    case "Trid":
    testFieldList[index].setField(trid_TestField(optionsList[index]));
      break;
      //////////////////////////////////
      /// Functions: Valley-Shaped
    case "Three_Hump_Camel":
    testFieldList[index].setField(three_Hump_Camel_TestField(optionsList[index]));
      break;
    case "Six_Hump_Camel":
    testFieldList[index].setField(six_Hump_Camel_TestField(optionsList[index]));
      break;

  }
}

function calc_Preview_RealDataField(index) {

  testFieldList[index].setAutoScale(true);
  testFieldList[index].setScaleRange(globalCMS1.getRefPosition(0), globalCMS1.getRefPosition(globalCMS1.getKeyLength() - 1));
  testFieldList[index].setField(realWorldDataTestField(optionsList[index]));

}


//////////////////////////////////////////////////////////////////////////////////////////////////////
///// Single Interactive testField

function calc_Single_TestingField() {

  switch (testtype) {
    case "CCCTest":
      calc_Single_CCCTestField();
      break;
    case "Collection":
      calc_Single_CollectionField();
      break;
    case "RealData":
      calc_Single_RealDataField();
      break;
  }

}

function calc_Single_CCCTestField() {

  switch (testsubtype) {
    case "Jump":
      testField.setCellValues(true);
      testField.setField(jumpTestField(testoptions));
      break;
    case "LittleBit":
      testField.setField(littleBitTestField(testoptions));
      break;
    case "Treshold":
      testField.setField(tresholdTestField(testoptions));
      break;
    case "RiVa":
      testField.setField(ridgeValleyTestField(testoptions));
      break;
    case "Gradient":
      testField.setField(gradientTestField(testoptions));
      break;
    case "Extrema":
      testField.setAutoScale(testoptions[3]);
      testField.setScaleRange(globalCMS1.getRefPosition(0), globalCMS1.getRefPosition(globalCMS1.getKeyLength() - 1));
      testField.setField(extremaTestField(testoptions));
      break;
    case "Frequency":
      testField.setField(frequencyTestField(testoptions));
      break;
    case "Topology":
        break;
  }



  //[testFieldDimX,testFieldDimY,testFieldVal,positions]

}

function calc_Single_CollectionField() {

  testField.setAutoScale(true);
  testField.setScaleRange(globalCMS1.getRefPosition(0), globalCMS1.getRefPosition(globalCMS1.getKeyLength() - 1));

  switch (testsubtype) {
    case "Ackley":
      testField.setField(ackley_TestField(testoptions));
      break;
    case "Bukin_N6":
      testField.setField(bukin_N6_TestField(testoptions));
      break;
    case "Cross-in-Tray":
      testField.setField(crossInTray_TestField(testoptions));
      break;
    case "Drop-Wave":
      testField.setField(dropWave_TestField(testoptions));
      break;
    case "Eggholder":
      testField.setField(eggholder_TestField(testoptions));
      break;
    case "Griewank":
      testField.setField(griewank_TestField(testoptions));
      break;
    case "HolderTable":
      testField.setField(holderTable_TestField(testoptions));
      break;
    case "Langermann":
      testField.setField(langermann_TestField(testoptions));
      break;
    case "Levy":
      testField.setField(levy_TestField(testoptions));
      break;
    case "Levy_N13":
      testField.setField(levyN13_TestField(testoptions));
      break;
    case "Rastrigin":
      testField.setField(rastrigin_TestField(testoptions));
      break;
    case "Schaffer_N2":
      testField.setField(schaffer_N2_TestField(testoptions));
      break;
    case "Schaffer_N4":
      testField.setField(schafferN4_TestField(testoptions));
      break;
    case "Schwefel":
      testField.setField(schwefel_TestField(testoptions));
      break;
    case "Shubert":
      testField.setField(shubert_TestField(testoptions));
      break;
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /// Functions: Bowl-Shaped
    case "Bohachevsky_F1":
      testField.setField(bohachevsky_F1_TestField(testoptions));
      break;
    case "Bohachevsky_F2":
      testField.setField(bohachevsky_F2_TestField(testoptions));
      break;
    case "Bohachevsky_F3":
    testField.setField(bohachevsky_F3_TestField(testoptions));
      break;
    case "Perm_V1":
    testField.setField(perm_V1_TestField(testoptions));
      break;
    case "Rot_Hyper_Ellipsoid":
    testField.setField(rot_Hyper_Ellipsoid_TestField(testoptions));
      break;
    case "Sphere":
    testField.setField(sphere_TestField(testoptions));
      break;
    case "SumDifPowers":
    testField.setField(sumDifPowers_TestField(testoptions));
      break;
    case "Sum_Squares":
    testField.setField(sum_Squares_TestField(testoptions));
      break;
    case "Trid":
    testField.setField(trid_TestField(testoptions));
      break;
      //////////////////////////////////
      /// Functions: Valley-Shaped
    case "Three_Hump_Camel":
    testField.setField(three_Hump_Camel_TestField(testoptions));
      break;
    case "Six_Hump_Camel":
    testField.setField(six_Hump_Camel_TestField(testoptions));
      break;

  }
}

function calc_Single_RealDataField() {

  if(isNaN(testoptions) || testoptions==undefined)
    return;

  testField.setAutoScale(true);
  testField.setScaleRange(globalCMS1.getRefPosition(0), globalCMS1.getRefPosition(globalCMS1.getKeyLength() - 1));
  switch (testsubtype) {
      case "medical":

        if(imgData_medical.length<=testoptions)
          return;

        if(imgData_medical[testoptions]==undefined)
          return;

          console.log(123123123);
        testField.setField(realWorldDataTestField(imgData_medical[testoptions]));
      break;
      case "scientificFlowSim":

        if(imgData_scientificFlowSim.length<=testoptions)
          return;

        if(imgData_scientificFlowSim[testoptions]==undefined)
          return;

        testField.setField(realWorldDataTestField(imgData_scientificFlowSim[testoptions]));
      break;
      case "photographs":

        if(imgData_photographs.length<=testoptions)
          return;

        if(imgData_photographs[testoptions]==undefined)
          return;

        testField.setField(realWorldDataTestField(imgData_photographs[testoptions]));
      break;
    }

}
