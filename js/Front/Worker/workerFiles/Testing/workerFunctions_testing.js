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
        var greyVal = 125;
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
