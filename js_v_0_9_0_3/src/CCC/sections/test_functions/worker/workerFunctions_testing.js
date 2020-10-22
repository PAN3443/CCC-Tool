function worker_LoadColorClasses(){
  // Colors
  self.importScripts('../../../../Global/color/class_Colorspace_Allrounder.js');
  /*self.importScripts('../../../../Global/color/class_Colorspace_Basis.js');
  self.importScripts('../../../../Global/color/class_Colorspace_RGB.js');
  self.importScripts('../../../../Global/color/class_Colorspace_XYZ.js');
  self.importScripts('../../../../Global/color/class_Colorspace_LMS.js');
  self.importScripts('../../../../Global/color/class_Colorspace_HSV.js');
  self.importScripts('../../../../Global/color/class_Colorspace_LAB.js');
  self.importScripts('../../../../Global/color/class_Colorspace_LCH.js');
  self.importScripts('../../../../Global/color/class_Colorspace_DIN99.js');*/

  self.importScripts('../../../global/cms/class_Colormap_Specification.js');
  self.importScripts('../../../global/cms/class_Colormap_Key.js');
  self.importScripts('../../../global/cms/class_Colormap_Interval.js');
  /*self.importScripts('../../../global/cms/class_Colormap_Probe.js');
  self.importScripts('../../../global/cms/class_Colormap_ProbeSet.js');*/
}

function calculateMesh(field, do3DTestField, scalefactor3DTest) {

  if (do3DTestField && field.getCellValues()) {

    testMappingMesh = new THREE.Group();
    testMappingMeshGrey = new THREE.Group();

    for (var y = 0; y < field.getYDim() - 1; y++) {
      for (var x = 0; x < field.getXDim() - 1; x++) {

        var xpos1 = field.getXPos(x, y);
        var xpos2 = field.getXPos(x + 1, y + 1);
        var ypos1 = field.getYPos(x, y);
        var ypos2 = field.getYPos(x + 1, y + 1);

        var width = Math.abs(xpos1 - xpos2);
        var height = Math.abs(ypos1 - ypos2);
        var deep = field.getZPos(scalefactor3DTest, x, y);

        var geometry = undefined;
        var geometryGrey = undefined;

        if (deep == 0) {
          geometry = new THREE.PlaneGeometry(width, height, 1, 1);
          geometryGrey = new THREE.PlaneGeometry(width, height, 1, 1);
        } else {
          geometry = new THREE.BoxBufferGeometry(width, height, deep);
          geometryGrey = new THREE.BoxBufferGeometry(width, height, deep);
        }

        var xmeshPos = (xpos1 + xpos2) / 2;
        var ymeshPos = (ypos1 + ypos2) / 2;
        var zmeshPos = deep / 2;

        var colorRGB = testingCMS.calculateColor(field.getFieldValue(x, y),"rgb");
        var material = new THREE.MeshLambertMaterial({
          side: THREE.DoubleSide
        });
        material.color.set(new THREE.Color(colorRGB[1],colorRGB[2],colorRGB[3]));
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = xmeshPos;
        mesh.position.y = ymeshPos;
        mesh.position.z = zmeshPos;
        testMappingMesh.add(mesh);

        var greyVal = field.getRatioFieldValue(x, y);
        var materialGrey = new THREE.MeshLambertMaterial({
          side: THREE.DoubleSide
        });
        materialGrey.color.set(new THREE.Color(greyVal,greyVal,greyVal));
        var meshGrey = new THREE.Mesh(geometryGrey, materialGrey);
        meshGrey.position.x = xmeshPos;
        meshGrey.position.y = ymeshPos;
        meshGrey.position.z = zmeshPos;
        testMappingMeshGrey.add(meshGrey);


      }
    }

  } else {
    var geometry = new THREE.Geometry(); //
    var geometryGrey = new THREE.Geometry(); //

    if (do3DTestField) {
      geometry.vertices = field.getTHREEPointArray3D(scalefactor3DTest);
      geometryGrey.vertices = geometry.vertices; //field.getTHREEPointArray3D(scalefactor3DTest);
    } else {
      geometry.vertices = field.getTHREEPointArray();
      geometryGrey.vertices = geometry.vertices //field.getTHREEPointArray();
    }

    //// create faces
    var numFaces = (field.getXDim() - 1) * (field.getYDim() - 1) * 2;
    var faceArray = new Array(numFaces).fill(undefined); //[];
    var faceArrayGrey = new Array(numFaces).fill(undefined);

    if (field.getCellValues()) {
      for (var y = 1; y < field.getYDim(); y++) {

        for (var x = 1; x < field.getXDim(); x++) {

          var currentIndex = y * field.getXDim() + x;
          var preIndex = currentIndex - 1;
          var currentIndexLastLoop = (y - 1) * field.getXDim() + x;
          var preIndexLastLoop = currentIndexLastLoop - 1;

          var faceID1 = ((y - 1) * (field.getXDim() - 1) + (x - 1)) * 2;
          var faceID2 = faceID1 + 1;

          var colorRGB = testingCMS.calculateColor(field.getFieldValue(x - 1, y - 1),"rgb");
          faceArray[faceID1] = new THREE.Face3(preIndexLastLoop, currentIndex, preIndex);
          faceArray[faceID1].vertexColors[0] = new THREE.Color(colorRGB[1],colorRGB[2],colorRGB[3]);
          faceArray[faceID1].vertexColors[1] = new THREE.Color(colorRGB[1],colorRGB[2],colorRGB[3]);
          faceArray[faceID1].vertexColors[2] = new THREE.Color(colorRGB[1],colorRGB[2],colorRGB[3]);

          faceArray[faceID2] = new THREE.Face3(preIndexLastLoop, currentIndexLastLoop, currentIndex);
          faceArray[faceID2].vertexColors[0] = new THREE.Color(colorRGB[1],colorRGB[2],colorRGB[3]);
          faceArray[faceID2].vertexColors[1] = new THREE.Color(colorRGB[1],colorRGB[2],colorRGB[3]);
          faceArray[faceID2].vertexColors[2] = new THREE.Color(colorRGB[1],colorRGB[2],colorRGB[3]);

          var greyVal = field.getRatioFieldValue(x - 1, y - 1);
          faceArrayGrey[faceID1] = new THREE.Face3(preIndexLastLoop, currentIndex, preIndex);
          faceArrayGrey[faceID1].vertexColors[0] = new THREE.Color(greyVal,greyVal,greyVal);
          faceArrayGrey[faceID1].vertexColors[1] = new THREE.Color(greyVal,greyVal,greyVal);
          faceArrayGrey[faceID1].vertexColors[2] = new THREE.Color(greyVal,greyVal,greyVal);

          faceArrayGrey[faceID2] = new THREE.Face3(preIndexLastLoop, currentIndexLastLoop, currentIndex);
          faceArrayGrey[faceID2].vertexColors[0] = new THREE.Color(greyVal,greyVal,greyVal);
          faceArrayGrey[faceID2].vertexColors[1] = new THREE.Color(greyVal,greyVal,greyVal);
          faceArrayGrey[faceID2].vertexColors[2] = new THREE.Color(greyVal,greyVal,greyVal);

        }
      }
    } else {

      for (var y = 1; y < field.getYDim(); y++) {

        for (var x = 1; x < field.getXDim(); x++) {

          var currentIndex = y * field.getXDim() + x;
          var preIndex = currentIndex - 1;
          var currentIndexLastLoop = (y - 1) * field.getXDim() + x;
          var preIndexLastLoop = currentIndexLastLoop - 1;

          var faceID1 = ((y - 1) * (field.getXDim() - 1) + (x - 1)) * 2;
          var faceID2 = faceID1 + 1;

          faceArray[faceID1] = new THREE.Face3(preIndexLastLoop, currentIndex, preIndex);
          faceArray[faceID2] = new THREE.Face3(preIndexLastLoop, currentIndexLastLoop, currentIndex);
          var colorRGB = testingCMS.calculateColor(field.getFieldValue(x - 1, y - 1),"rgb");
          faceArray[faceID1].vertexColors[0] = new THREE.Color(colorRGB[1],colorRGB[2],colorRGB[3]);
          faceArray[faceID2].vertexColors[0] = new THREE.Color(colorRGB[1],colorRGB[2],colorRGB[3]);

          colorRGB = testingCMS.calculateColor(field.getFieldValue(x, y),"rgb");
          faceArray[faceID1].vertexColors[1] = new THREE.Color(colorRGB[1],colorRGB[2],colorRGB[3]);
          faceArray[faceID2].vertexColors[2] = new THREE.Color(colorRGB[1],colorRGB[2],colorRGB[3]);

          colorRGB = testingCMS.calculateColor(field.getFieldValue(x - 1, y),"rgb");
          faceArray[faceID1].vertexColors[2] = new THREE.Color(colorRGB[1],colorRGB[2],colorRGB[3]);

          colorRGB = testingCMS.calculateColor(field.getFieldValue(x, y - 1),"rgb");
          faceArray[faceID2].vertexColors[1] = new THREE.Color(colorRGB[1],colorRGB[2],colorRGB[3]);


          faceArrayGrey[faceID1] = new THREE.Face3(preIndexLastLoop, currentIndex, preIndex);
          faceArrayGrey[faceID2] = new THREE.Face3(preIndexLastLoop, currentIndexLastLoop, currentIndex);
          var greyVal = field.getRatioFieldValue(x - 1, y - 1);
          faceArrayGrey[faceID1].vertexColors[0] = new THREE.Color(greyVal,greyVal,greyVal);
          faceArrayGrey[faceID2].vertexColors[0] = new THREE.Color(greyVal,greyVal,greyVal);
          greyVal = field.getRatioFieldValue(x, y);
          faceArrayGrey[faceID1].vertexColors[1] = new THREE.Color(greyVal,greyVal,greyVal);
          faceArrayGrey[faceID2].vertexColors[2] = new THREE.Color(greyVal,greyVal,greyVal);
          greyVal = field.getRatioFieldValue(x - 1, y);
          faceArrayGrey[faceID1].vertexColors[2] = new THREE.Color(greyVal,greyVal,greyVal);
          greyVal = field.getRatioFieldValue(x, y - 1);
          faceArrayGrey[faceID2].vertexColors[1] = new THREE.Color(greyVal,greyVal,greyVal);

        }
      }

    }

    geometry.faces = faceArray;
    geometryGrey.faces = faceArrayGrey;
    geometry.computeBoundingBox();

    var material =
      //new THREE.MeshDepthMaterial( {
      new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
        vertexColors: THREE.VertexColors
        //  blending: THREE.NoBlending,
        //depthTest: true,
        //depthWrite:true,
        // depthFunc : THREE.NeverDepth
        // depthFunc : THREE.AlwaysDepth
        // depthFunc : THREE.LessDepth
        // depthFunc : THREE.LessEqualDepth
        // depthFunc : THREE.GreaterEqualDepth
        // depthFunc : THREE.GreaterDepth
        // depthFunc : THREE.NotEqualDepth
        //wireframe: true
      });

    testMappingMesh = new THREE.Mesh(geometry, material);
    testMappingMeshGrey = new THREE.Mesh(geometryGrey, material);
  }

}

function calculateTransferMeshData(field, do3DTestField, scalefactor3DTest) {

  testMappingMeshData=[];

  testMappingMeshData.push(field.getCellValues());
  testMappingMeshData.push(do3DTestField);

  if (do3DTestField && field.getCellValues()) {

    var dataRows = [];
    for (var y = 0; y < field.getYDim() - 1; y++) {

      for (var x = 0; x < field.getXDim() - 1; x++) {

        var xpos1 = field.getXPos(x, y);
        var xpos2 = field.getXPos(x + 1, y + 1);
        var ypos1 = field.getYPos(x, y);
        var ypos2 = field.getYPos(x + 1, y + 1);

        var width = Math.abs(xpos1 - xpos2);
        var height = Math.abs(ypos1 - ypos2);
        var deep = field.getZPos(scalefactor3DTest, x, y);

        var xmeshPos = (xpos1 + xpos2) / 2;
        var ymeshPos = (ypos1 + ypos2) / 2;
        var zmeshPos = deep / 2;

        var colorRGB = testingCMS.calculateColor(field.getFieldValue(x, y),"rgb");
        var greyVal = field.getRatioFieldValue(x, y);

        var dataRow = [width,height,deep,xmeshPos,ymeshPos,zmeshPos,colorRGB[1],colorRGB[2],colorRGB[3],greyVal];
        dataRows.push(dataRow);
      }
    }
    testMappingMeshData.push(dataRows);

  } else {

    if(do3DTestField)
      testMappingMeshData.push(field.getTHREEPointArray3D(scalefactor3DTest));
    else
      testMappingMeshData.push(field.getTHREEPointArray());


    //// create faces
    var numFaces = (field.getXDim() - 1) * (field.getYDim() - 1) * 2;
    var faceArray = new Array(numFaces).fill(undefined); //[];

    if (field.getCellValues()) {
      for (var y = 1; y < field.getYDim(); y++) {

        for (var x = 1; x < field.getXDim(); x++) {

          var currentIndex = y * field.getXDim() + x;
          var preIndex = currentIndex - 1;
          var currentIndexLastLoop = (y - 1) * field.getXDim() + x;
          var preIndexLastLoop = currentIndexLastLoop - 1;

          var faceID1 = ((y - 1) * (field.getXDim() - 1) + (x - 1)) * 2;
          var faceID2 = faceID1 + 1;

          var colorRGB = testingCMS.calculateColor(field.getFieldValue(x - 1, y - 1),"rgb");
          var greyVal = field.getRatioFieldValue(x - 1, y - 1);

          faceArray[faceID1] = [preIndexLastLoop, currentIndex, preIndex,colorRGB[1],colorRGB[2],colorRGB[3],greyVal];
          faceArray[faceID2] = [preIndexLastLoop, currentIndexLastLoop, currentIndex,colorRGB[1],colorRGB[2],colorRGB[3],greyVal];
        }
      }
    } else {

      for (var y = 1; y < field.getYDim(); y++) {

        for (var x = 1; x < field.getXDim(); x++) {

          var currentIndex = y * field.getXDim() + x;
          var preIndex = currentIndex - 1;
          var currentIndexLastLoop = (y - 1) * field.getXDim() + x;
          var preIndexLastLoop = currentIndexLastLoop - 1;

          var faceID1 = ((y - 1) * (field.getXDim() - 1) + (x - 1)) * 2;
          var faceID2 = faceID1 + 1;

          var greyVal1 = field.getRatioFieldValue(x - 1, y - 1);
          var greyVal2 = field.getRatioFieldValue(x, y);
          var greyVal3 = field.getRatioFieldValue(x - 1, y);
          var greyVal4 = field.getRatioFieldValue(x, y - 1);

          var colorRGB1 = testingCMS.calculateColor(field.getFieldValue(x - 1, y - 1),"rgb");
          var colorRGB2 = testingCMS.calculateColor(field.getFieldValue(x, y),"rgb");
          var colorRGB3 = testingCMS.calculateColor(field.getFieldValue(x - 1, y),"rgb");
          var colorRGB4 = testingCMS.calculateColor(field.getFieldValue(x, y-1),"rgb");
          faceArray[faceID1] = [preIndexLastLoop, currentIndex, preIndex,
            [colorRGB1[1],colorRGB1[2],colorRGB1[3],greyVal1],
            [colorRGB2[1],colorRGB2[2],colorRGB2[3],greyVal2],
            [colorRGB3[1],colorRGB3[2],colorRGB3[3],greyVal3]
          ];
          faceArray[faceID2] = [preIndexLastLoop, currentIndexLastLoop, currentIndex,
            [colorRGB1[1],colorRGB1[2],colorRGB1[3],greyVal1],
            [colorRGB4[1],colorRGB4[2],colorRGB4[3],greyVal4],
            [colorRGB2[1],colorRGB2[2],colorRGB2[3],greyVal2]
          ];

        }
      }
    }

    testMappingMeshData.push(faceArray);
  }

}

function calculateImageData(testfield, doGreyScaled) {

  var imgWidth = testfield.getXDim();
  var imgHeight = testfield.getYDim();

  if (testfield.getCellValues()) {
    imgWidth--;
    imgHeight--;
  }

  var maxHeightIndex = imgHeight - 1;

  if (isNaN(imgWidth) || isNaN(imgWidth))
    return new ImageData(1, 1);

  if (imgWidth == undefined || imgWidth == undefined)
    return new ImageData(1, 1);

  if (imgWidth < 1 || imgWidth < 1)
    return new ImageData(1, 1); //*/

  var imgData = new ImageData(imgWidth, imgHeight);

  if (doGreyScaled) {
    for (var y = 0; y < imgHeight; y++) {
      for (var x = 0; x < imgWidth; x++) {
        var greyVal = greyScaledCMS.calculateColor(testfield.getRatioFieldValue(x, y),"rgb");
        var indices = getColorIndicesForCoord(x, maxHeightIndex - y, imgWidth);
        imgData.data[indices[0]] = Math.round(greyVal[1]*255); // r
        imgData.data[indices[1]] = Math.round(greyVal[2]*255); // g
        imgData.data[indices[2]] = Math.round(greyVal[3]*255); // b
        imgData.data[indices[3]] = 255; //a
      }
    }
  } else {
    for (var y = 0; y < imgHeight; y++) {
      for (var x = 0; x < imgWidth; x++) {
        var colorRGB = testingCMS.calculateColor(testfield.getFieldValue(x, y),"rgb");
        var indices = getColorIndicesForCoord(x, maxHeightIndex - y, imgWidth);
        imgData.data[indices[0]] = Math.round(colorRGB[1] * 255); // r
        imgData.data[indices[1]] = Math.round(colorRGB[2] * 255); // g
        imgData.data[indices[2]] = Math.round(colorRGB[3] * 255); // b
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
    case "Step":
      testFieldList[index].setCellValues(true);
      testFieldList[index].setField(stepTestField(optionsList[index]));
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
      testFieldList[index].setScaleRange(testingCMS.getRefPosition(0), testingCMS.getRefPosition(testingCMS.getKeyLength() - 1));
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
  testFieldList[index].setScaleRange(testingCMS.getRefPosition(0), testingCMS.getRefPosition(testingCMS.getKeyLength() - 1));

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
  testFieldList[index].setScaleRange(testingCMS.getRefPosition(0), testingCMS.getRefPosition(testingCMS.getKeyLength() - 1));
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
    case "Step":
      testField.setCellValues(true);
      testField.setField(stepTestField(testoptions));
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
      testField.setScaleRange(testingCMS.getRefPosition(0), testingCMS.getRefPosition(testingCMS.getKeyLength() - 1));
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
  testField.setScaleRange(testingCMS.getRefPosition(0), testingCMS.getRefPosition(testingCMS.getKeyLength() - 1));

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

  if (isNaN(testoptions) || testoptions == undefined)
    return;

  testField.setAutoScale(true);
  testField.setScaleRange(testingCMS.getRefPosition(0), testingCMS.getRefPosition(testingCMS.getKeyLength() - 1));
  switch (testsubtype) {
    case "medical":

      if (imgData_medical.length <= testoptions)
        return;

      if (imgData_medical[testoptions] == undefined)
        return;

      testField.setField(realWorldDataTestField(imgData_medical[testoptions]));
      break;
    case "scientific":

      if (imgData_scientific.length <= testoptions)
        return;

      if (imgData_scientific[testoptions] == undefined)
        return;

      testField.setField(realWorldDataTestField(imgData_scientific[testoptions]));
      break;
    case "photographs":

      if (imgData_photographs.length <= testoptions)
        return;

      if (imgData_photographs[testoptions] == undefined)
        return;

      testField.setField(realWorldDataTestField(imgData_photographs[testoptions]));
      break;
  }

}
