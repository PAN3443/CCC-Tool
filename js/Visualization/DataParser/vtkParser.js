
function vtk_reader(content) {



  /*var vtkline = content.replace("\n", ";");
  vtkline = vtkline.replace(" ",";");
  var vtkElements = vtkline.split(";");*/

  // found Attributes
  var foundFileFormat = false;
  var foundDimension = false;
  var foundDataset = false;

  // attributes
  var isASCII = false;
  var is3D = undefined;
  var dimension_x = 1; // equal or greater than 1
  var dimension_y = 1; // equal or greater than 1
  var dimension_z = 1; // equal or greater than 1
  var datasetType = 0;

  // for structured points
  var originFound = false;
  var origin_x = undefined;
  var origin_y = undefined;
  var origin_z = undefined;
  // vtk version 1.0
  var aspectRatio = undefined; //ASPECT_RATIO
  // vtk version 2.0
  var spacingFound = false;
  var spacing_x = undefined; // greater than 0
  var spacing_y = undefined; // greater than 0
  var spacing_z = undefined; // greater than 0
  ////////////////////////////////////////////////////////

  // for RECTILINEAR_GRID
  var xCoordinatesArray;
  var dataType_xCoordinates="";
  var yCoordinatesArray;
  var dataType_yCoordinates="";
  var zCoordinatesArray;
  var dataType_zCoordinates="";
  ////////////////////////////////////////////////////////

  // for structured grid, unstructured grid, polydata grid
  var numberPoints = 0;
  var gridPointsDatatype = "";
  var tmpX=0;
  var tmpY=0;
  var tmpZ=0;

  // for unstructured grid, polydata grid
  var numberCells = 0;
  var sizeOfCellList = 0; // (i.e., sum of numPoints and connectivity indices over each cell).

  // for polydata grid
  var isVertices = false;
  var isLines = false;
  var isPolygons = false;
  var isTriangleStrip = false;
  ////////////////////////////////////////////////////////

  var numberFieldValues = 0;
  var tmpValueArray;
  var loadedField=false;
  var valueType = 0;
  var valueDataType; // double, float, char ....
  var fieldNames = [];
  var tableName;
  var isCellData = false; // cell or point data
  var alreadyFoundE = false;
  var foundCharE = false;

  // other

  var loadedField = false;
  var loadedGrid = false;
  var doLoadValues = false;

  var vtkVersion = -1;


  /////////////////////////////

  var substring = "";
  var isNum = true;
  var foundMinus=false;
  var pointIsSet = false;
  var counter = 0;
  var dimCounter = 0;
  var nextDataset = false;
  var sleep = false;
  var nextVersionNumber = false;
  var nextDimension = false;
  var nextOrigin = false;
  var nextSpacing = false;
  var nextPointInformation = false;
  var nextLoadPoints = false;
  var nextLoadXCoordinates=false;
  var nextLoadYCoordinates=false;
  var nextLoadZCoordinates=false;
  var nextLoadfieldValues=false; // cell data, point data

  // 60% == content
  var phase1 = 50;
  // 10% == cellgeneration
  var phase2 = 15;
  // 30% ==
  var phase3 = 25;

  var steps = Math.round(content.length/50);
  var stepcounter=0;

/*  //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content";
  document.getElementById("id_processBar").style.width = "0px";*/

  var barElement =  document.getElementById("mappingProcessBar");

  for (var i = 0; i < content.length; i++) {

    if(stepcounter==steps){
      var status = Math.round(i/content.length*phase1)+10;
      updateProgressBar(status);
      stepcounter=0;
    }
    else {
      stepcounter++;
    }

    switch (content[i]) {
      case " ":
      case "\n":
      case "\t":
      case "\r":

        // substr is ready

        while(content[i+1]===" " || content[i+1]==="\n" || content[i+1]==="\t" || content[i+1]==="\r"){
          i++;
        }

        foundMinus=false;
        alreadyFoundE = false;
        foundCharE = false;
        var tmpIsNum = isNum;
        isNum = true;
        var tmpPointIsSet = pointIsSet;
        pointIsSet = false;
        var tmpSubstring = substring;
        substring = "";

        if (sleep){
          counter--;
          if (counter == 0) {
            sleep = false;
          }
          else{
            continue;
          }
        }


        if (tmpIsNum) {

          // load field cellValues
          if(nextLoadfieldValues){


            switch (valueType) {
              case -1: // just got the information of cell or point data
                if(tmpPointIsSet){
                  openAlert("Error. The loader algorithm was not able to load the number of field values. The algorithm found a float number instead of an integer.");
                  return false;
                }
                numberFieldValues = parseFloat(tmpSubstring);

                if(dimension_z<1){
                  openAlert("Error. The loader algorithm was not able to load the number of field values. The algorithm found a value less than 1!");
                  return false;
                }
                //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Start loading of "  +numberFieldValues+ " SCALAR field values.";
                console.log("Load Text Content: Start loading of "  +numberFieldValues+ " SCALAR field values.");
                tmpValueArray = new Array(numberFieldValues).fill(NaN);
                valueType=0;
                break;
              case 0: // just got the information of cell or point data
                  //console.log("Error at the field value loader part. This should be a text part, but the algorithm found a number.");

              break;
              case 1: //SCALAR FIELD
                  switch (counter) {
                    case -5:
                      fieldNames.push(tmpSubstring);
                      counter++;
                    break;
                    case -4: case -2: case -1:
                      //console.log("Error at the field value loader part for SCALAR FIELDS. This should be a text part, but the algorithm found a number.");
                      nextLoadfieldValues=false;
                      return false;
                      break;
                    case -3:
                      var numComp = parseFloat(tmpSubstring);
                      //console.log("Error. The loader algorithm was not able to load the number of field values. The algorithm found a value less than 1!");

                      /*if(tmpPointIsSet){
                        console.log("Error. The loader algorithm was not able to determine the nValues variable. The algorithm found a float number instead of an integer.");
                      }

                      // numComp must  range between (1,4) inclusive; in versions of VTK prior to vtk2.3 this parameter was not supported
                      if(numComp<1 || numComp>4 ){
                        console.log("Error. The loader algorithm was not able to determine the nValues variable. The algorithm found a value less than 1!");
                      }*/
                      counter++;
                      break;
                    default:

                        tmpValueArray[counter]=parseFloat(tmpSubstring);

                        counter++;

                        if(counter==numberFieldValues){
                          counter=0;
                          if(!globalDomain.addNewField(tmpValueArray, isCellData)){
                            console.log("Algorithm was not able to loading the field values of the type SCALARS.");
                          }
                          else{
                            //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Finished loading field values of the type SCALARS.";
                            console.log("Load Text Content: Finished loading field values of the type SCALARS.");
                          }
                          nextLoadfieldValues=false;
                          loadedField=true;
                          valueType = 0;
                        }


                  }
              break;
              default:


            }
            continue;
          }
          // load grid points
          if(nextLoadPoints){
            switch (dimCounter) {
              case 0:
                tmpX=parseFloat(tmpSubstring);


                dimCounter++;
                break;
                case 1:
                  tmpY=parseFloat(tmpSubstring);
                  dimCounter++;
                  if(is3D==false){
                    var newPoint = new THREE.Vector3(tmpX,tmpY, 0.0);
                    globalDomain.insertGridPoint(newPoint, counter);
                    dimCounter=0;
                    counter++;
                  }
                  break;
                  case 2:
                    tmpZ=parseFloat(tmpSubstring);
                    var newPoint = new THREE.Vector3(tmpX,tmpY, tmpZ);
                    globalDomain.insertGridPoint(newPoint, counter);
                    dimCounter=0;
                    counter++;
                    break;
              default:

            }

            if(counter==numberPoints){
              nextLoadPoints = false;
              loadedGrid = true;
              counter=0;
            }
          }
          /////////////////////////////////////////////////////////
          if (nextDataset) {
            openAlert("Sorry, the vtk file is maybe not correct. The DATASET " + tmpSubstring + " is unknown or can't be handled by the loader algorithm.");
            return false;
          }
          /////////////////////////////////////////////////////////
          if (nextVersionNumber) {
            //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Start vtk load process (vtk version " + tmpSubstring + ").";
            console.log("Load Text Content: Start vtk load process (vtk version " + tmpSubstring + ").");
            nextVersionNumber = false;
            continue;
          }
          /////////////////////////////////////////////////////////
          if(nextDimension){

            if(counter<3){
              if(tmpPointIsSet==true){
                openAlert("Sorry, the vtk loader was not able to load the vtk file. There was an error at the code part to indentify the dimension. The dimension information was not an integer!");
                return false;
              }

              if(parseFloat(tmpSubstring)<1){
                openAlert("Sorry, the vtk loader was not able to load the vtk file. There was an error at the code part to indentify the dimension. The dimension information is not allowed to be smaller than 1!");
                return false;
              }

            }

            switch (counter) {
              case 0:
                dimension_x = parseFloat(tmpSubstring);
                counter++;
                break;
                case 1:
                  dimension_y = parseFloat(tmpSubstring);
                  counter++;
                  break;
                  case 2:
                    dimension_z = parseFloat(tmpSubstring);
                    counter=0;
                    nextDimension=false;
                    foundDimension = true;
                    is3D = true;
                    //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Found 3D Dimension: X = "+dimension_x+", Y = "+dimension_y+", Z = "+dimension_z+".";
                    console.log("Load Text Content: Found 3D Dimension: X = "+dimension_x+", Y = "+dimension_y+", Z = "+dimension_z+".");
                    break;
              default:
              openAlert("Sorry, the vtk loader was not able to load the vtk file. There was an error at the code part to indentify the dimension. Please inform us about this error!");
              return false;
            }
            continue;
          }
          /////////////////////////////////////////////////////////
          if(nextOrigin){

            switch (counter) {
              case 0:
                origin_x = parseFloat(tmpSubstring);
                counter++;
                break;
                case 1:
                  origin_y = parseFloat(tmpSubstring);
                  counter++;
                  break;
                  case 2:
                    origin_z = parseFloat(tmpSubstring);

                    counter=0;
                    nextOrigin=false;

                    if(is3D==false){
                      openAlert("Sorry, the vtk loader was not able to load the vtk file. The Dimension and the Orgin information are not compatible!");
                      return false;
                    }
                    else{
                      is3D = true;
                      //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Found 3D Origin: X = "+origin_x+", Y = "+origin_y+", Z = "+origin_z+".";
                      console.log("Load Text Content: Found 3D Origin: X = "+origin_x+", Y = "+origin_y+", Z = "+origin_z+".");
                      originFound = true;
                      if (spacingFound) {
                          numberPoints = dimension_x * dimension_y * dimension_z;
                          globalDomain = new class_Domain(datasetType, numberPoints, is3D);
                          globalDomain.setGrid_XDimension(dimension_x);
                          globalDomain.setGrid_YDimension(dimension_y);
                          globalDomain.setGrid_ZDimension(dimension_z);
                          console.log("Start generating grid for 3D structured points dataset.");
                          var xyDim = dimension_x*dimension_y;
                          for (var x = 0; x < dimension_x; x++) {
                            for (var y = 0; y < dimension_y; y++) {
                              for (var z = 0; z < dimension_z; z++) {
                                var tmpX = origin_x + (spacing_x * x);
                                var tmpY = origin_y + (spacing_y * y);
                                var tmpZ = origin_z + (spacing_z * z);
                                var newPoint = new THREE.Vector3(tmpX, tmpY, tmpZ);
                                var index = x+y*dimension_y+z*xyDim;
                                globalDomain.insertGridPoint(newPoint, index);
                              }
                            }
                          }
                          loadedGrid = true;
                        }
                    }
                    break;
              default:
              openAlert("Sorry, the vtk loader was not able to load the vtk file. There was an error at the code part to indentify the origin. Please inform us about this error!");
              return false;
            }
            continue;
          }
          /////////////////////////////////////////////////////////
          if(nextSpacing){

            switch (counter) {
              case 0:
                spacing_x = parseFloat(tmpSubstring);
                counter++;
                break;
                case 1:
                  spacing_y = parseFloat(tmpSubstring);
                  counter++;
                  break;
                  case 2:
                    spacing_z = parseFloat(tmpSubstring);

                    counter=0;
                    nextSpacing=false;
                    if(is3D==false){
                      openAlert("Sorry, the vtk loader was not able to load the vtk file. The Dimension and the Spacing information are not compatible!");
                      return false;
                    }
                    else{
                      is3D = true;
                      //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Found 3D Spacing: X = "+spacing_x+", Y = "+spacing_y+", Z = "+spacing_z+".";
                      console.log("Load Text Content: Found 3D Spacing: X = "+spacing_x+", Y = "+spacing_y+", Z = "+spacing_z+".");
                      spacingFound = true;
                      if (originFound) {
                          numberPoints = dimension_x * dimension_y * dimension_z;
                          globalDomain = new class_Domain(datasetType, numberPoints, is3D);
                          globalDomain.setGrid_XDimension(dimension_x);
                          globalDomain.setGrid_YDimension(dimension_y);
                          globalDomain.setGrid_ZDimension(dimension_z);
                          console.log("Start generating grid for 3D structured points dataset.");
                          var xyDim = dimension_x*dimension_y;
                          for (var x = 0; x < dimension_x; x++) {
                            for (var y = 0; y < dimension_y; y++) {
                              for (var z = 0; z < dimension_z; z++) {
                                var tmpX = origin_x + (spacing_x * x);
                                var tmpY = origin_y + (spacing_y * y);
                                var tmpZ = origin_z + (spacing_z * z);
                                var newPoint = new THREE.Vector3(tmpX, tmpY, tmpZ);
                                var index = x+y*dimension_y+z*xyDim;
                                globalDomain.insertGridPoint(newPoint, index);
                              }
                            }
                          }
                          loadedGrid = true;
                        }
                    }
                    break;
              default:
              openAlert("Sorry, the vtk loader was not able to load the vtk file. There was an error at the code part to indentify the spacing. Please inform us about this error!");
              return false;
            }
            continue;
          }
          /////////////////////////////////////////////////////////
          if(nextPointInformation){
            switch (counter) {
              case 0:
                if(tmpPointIsSet==true){
                  openAlert("Sorry, the vtk loader was not able to load the vtk file. There was an error at the code part to indentify the grid points. The number of grid points is not an integer!");
                  return false;
                }

                numberPoints=parseFloat(tmpSubstring);

                switch (datasetType) {
                  case 1: //STRUCTURED_POINTS
                    if(numberPoints<1){
                      openAlert("Sorry, the vtk loader was not able to load the vtk file. There was an error at the code part to indentify the grid points. The number of grid points is not allowed to be smaller than 1!");
                      return false;
                    }
                    break;
                  case 2: case 3: // STRUCTURED_GRID //UNSTRUCTURED_GRID

                    if(is3D){
                      if(numberPoints<8){
                        openAlert("Sorry, the vtk loader was not able to load the vtk file. There was an error at the code part to indentify the grid points. The number of grid points should be at least 8 points for a 3D STRUCTURED_GRID or UNSTRUCTURED_GRID!");
                        return false;
                      }
                    }
                    else{
                      if(numberPoints<4){
                        openAlert("Sorry, the vtk loader was not able to load the vtk file. There was an error at the code part to indentify the grid points. The number of grid points should be at least 4 points for a 2D STRUCTURED_GRID or UNSTRUCTURED_GRID!");
                        return false;
                      }
                    }
                    break;
                  case 4: //POLYDATA:

                    break;
                  case 5: //RECTILINEAR_GRID
                    openAlert("Sorry, the vtk loader was not able to load the vtk file. There should not be grid point informations for rectlinear datasets.");
                    return false;
                    break;
                  case 6: //FIELD

                    break;
                  default:
                    openAlert("Sorry, the vtk file is maybe not correct. The DATASET has to be defined before the grid point informations.");
                    return false;
                }
                counter++;
                break;
                case 1: // datatype
                  console.log("Error the loader was not able to identify the datatype of the grid points.");
                  counter=0;
                  nextPointInformation=false;
                  nextLoadPoints=true;
                  globalDomain = new class_Domain(datasetType, numberPoints, is3D);
                  globalDomain.setGrid_XDimension(dimension_x);
                  globalDomain.setGrid_YDimension(dimension_y);
                  globalDomain.setGrid_ZDimension(dimension_z);
                break;
              default:
                openAlert("Sorry, there is a bug at the vtk loader algorithm. The loader was not able to get the grid point informations");
                return false;

            }
          }
          /////////////////////////////////////////////////////////
          if(nextLoadXCoordinates){
            switch (counter) {
              case -2:
              if(tmpPointIsSet){
                openAlert("Error. The loader algorithm was not able to load the number of the x-coordinates. The algorithm found a float number instead of an integer.");
                return false;
              }
              dimension_x = parseFloat(tmpSubstring);

              if(dimension_x<1){
                openAlert("Error. The loader algorithm was not able to load the number of the x-coordinates. The algorithm found a value less than 1!");
                return false;
              }

              xCoordinatesArray = new Array(dimension_x).fill(NaN);;
              counter++;
              break;
              case -1:
                console.log("Error. The loader algorithm was not able to load the datatype of the x-coordinates.");
                counter++;
                break;
              default:

                  xCoordinatesArray[counter]=parseFloat(tmpSubstring);
                  counter++;
                if(counter==dimension_x){
                  counter=0;
                  nextLoadXCoordinates=false;
                }
            }
          }
          /////////////////////////////////////////////////////////
          if(nextLoadYCoordinates){
              switch (counter) {
                case -2:
                if(tmpPointIsSet){
                  openAlert("Error. The loader algorithm was not able to load the number of the y-coordinates. The algorithm found a float number instead of an integer.");
                  return false;
                }
                dimension_y = parseFloat(tmpSubstring);

                if(dimension_y<1){
                  openAlert("Error. The loader algorithm was not able to load the number of the y-coordinates. The algorithm found a value less than 1!");
                  return false;
                }
                yCoordinatesArray = new Array(dimension_y).fill(NaN);;
                counter++;
                break;
                case -1:
                  console.log("Error. The loader algo was not able to load the datatype of the y-coordinates");
                  counter++;
                  break;
                default:

                    yCoordinatesArray[counter]=parseFloat(tmpSubstring);
                    counter++;

                  if(counter==dimension_y){
                    counter=0;
                    nextLoadYCoordinates=false;

                    if(is3D==false){

                      numberPoints = dimension_x * dimension_y; //* dimension_z;
                      globalDomain = new class_Domain(datasetType, numberPoints, is3D);
                      globalDomain.setGrid_XDimension(dimension_x);
                      globalDomain.setGrid_YDimension(dimension_y);
                      globalDomain.setGrid_ZDimension(1);
                      //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Start generating grid for 3D structured points dataset.";
                      console.log("Load Text Content: Start generating grid for 2D rectlinear points dataset.");
                      for (var x = 0; x < dimension_x; x++) {
                        for (var y = 0; y < dimension_y; y++) {
                            var tmpX = xCoordinatesArray[x];
                            var tmpY = yCoordinatesArray[y];
                            var tmpZ = 0.0; //zCoordinatesArray[z];
                            var newPoint = new THREE.Vector3(tmpX, tmpY, tmpZ);
                            var index = x+y*dimension_x;
                            globalDomain.insertGridPoint(newPoint, index);
                        }
                      }

                      loadedGrid = true;


                    }
                  }
              }
          }
          /////////////////////////////////////////////////////////
          if(nextLoadZCoordinates){
            switch (counter) {
              case -2:
              if(tmpPointIsSet){
                openAlert("Error. The loader algorithm was not able to load the number of the z-coordinates. The algorithm found a float number instead of an integer.");
                return false;
              }
              dimension_z = parseFloat(tmpSubstring);
              if(dimension_z<1){
                openAlert("Error. The loader algorithm was not able to load the number of the z-coordinates. The algorithm found a value less than 1!");
                return false;
              }
              zCoordinatesArray = new Array(dimension_z).fill(NaN);;
              counter++;
              break;
              case -1:
                console.log("Error. The loader algo was not able to load the datatype of the z-coordinates");
                counter++;
                break;
              default:

                  zCoordinatesArray[counter]=parseFloat(tmpSubstring);
                  counter++;

                if(counter==dimension_z){
                  counter=0;
                  nextLoadZCoordinates=false;
                  if(is3D){

                    console.log(xCoordinatesArray);
                    console.log(yCoordinatesArray);
                    console.log(zCoordinatesArray);

                    numberPoints = dimension_x * dimension_y * dimension_z;
                    globalDomain = new class_Domain(datasetType, numberPoints, is3D);
                    globalDomain.setGrid_XDimension(dimension_x);
                    globalDomain.setGrid_YDimension(dimension_y);
                    globalDomain.setGrid_ZDimension(dimension_z);
                    var xyDim = dimension_x*dimension_y;
                    //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Start generating grid for 3D structured points dataset.";
                    console.log("Load Text Content: Start generating grid for 3D rectlinear points dataset.");

                    for (var x = 0; x < dimension_x; x++) {
                      for (var y = 0; y < dimension_y; y++) {
                        for (var z = 0; z < dimension_z; z++) {
                          var tmpX = xCoordinatesArray[x];
                          var tmpY = yCoordinatesArray[y];
                          var tmpZ = zCoordinatesArray[z];

                          var newPoint = new THREE.Vector3(tmpX, tmpY, tmpZ);
                          var index = x+y*dimension_x+z*xyDim;

                          globalDomain.insertGridPoint(newPoint, index);
                        }
                      }
                    }
                    loadedGrid = true;
                  }
                }
            }
          }
          /////////////////////////////////////////////////////////

        } else {
          // load field cellValues
          if(nextLoadfieldValues){

            switch (valueType) {
              case 0:
                switch (tmpSubstring) {
                  case "SCALARS":
                    valueType = 1;
                    //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content:Start loading field values of the type SCALARS.";
                    console.log("Load Text Content: Start loading field values of the type SCALARS.");
                    counter=-5;
                  break;
                  case "COLOR_SCALARS":
                    valueType = 2;
                    nextLoadfieldValues=false;
                    console.log("The current version of the vtk loader is not able to load field values of the type COLOR_SCALARS.");
                    break;
                  case "VECTORS":
                    valueType = 3;
                    nextLoadfieldValues=false;
                    console.log("The current version of the vtk loader is not able to load field values of the type VECTORS.");
                    break;
                  case "NORMALS":
                    valueType = 4;
                    nextLoadfieldValues=false;
                    console.log("The current version of the vtk loader is not able to load field values of the type NORMALS.");
                    break;
                  case "TEXTURE_COORDINATES":
                    valueType = 5;
                    nextLoadfieldValues=false;
                    console.log("The current version of the vtk loader is not able to load field values of the type TEXTURE_COORDINATES.");
                    break;
                  case "TENSORS":
                    valueType = 6;
                    nextLoadfieldValues=false;
                    console.log("The current version of the vtk loader is not able to load field values of the type TENSORS.");
                    //Currently only 3x3 real-valued, symmetric tensors are supported.
                    break;
                  case "FIELD":
                    valueType = 7;
                    nextLoadfieldValues=false;
                    console.log("The current version of the vtk loader is not able to load field values of the type FIELD.");
                    break;
                  case "LOOKUP_TABLE":
                    valueType = 8;
                    nextLoadfieldValues=false;
                    console.log("The current version of the vtk loader is not able to load field values of the type LOOKUP_TABLE.");
                    break;
                  default:

                }
                break;

                case 1: //SCALAR FIELD
                    switch (counter) {
                      case -5:
                      fieldNames.push(tmpSubstring);
                      counter++;
                      break;
                      case -4:
                      valueDataType=tmpSubstring;
                      counter++;
                      break;
                      case -2: case -3: // case -3 because older version do not have the numComp
                        if(tmpSubstring==="LOOKUP_TABLE"){
                          counter=-1;
                        }
                        else{
                          openAlert("Sorry, the vtk file seems to be not correct. After the \"SCALARS\" part, there should be \"LOOKUP_TABLE\" !");
                          return false;
                        }
                      break;
                      case -1:
                        tableName = tmpSubstring;
                        counter++;
                        break;
                      case -3:
                        /*if(tmpPointIsSet){
                          console.log("Error. There should be a number. But the algorithm found text");
                        }*/
                        counter++;
                        break;
                      default:
                      if(counter<numberFieldValues){
                        if(loadedField==true){
                          tmpValueArray[counter]=parseFloat(tmpSubstring);
                        }
                        counter++;
                      }
                      else{

                        console.log(numberFieldValues, tmpSubstring);
                        counter=0;

                        if(!globalDomain.addNewField(tmpValueArray, isCellData)){
                          //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Algorithm was not able to loading the field values of the type SCALARS.";
                          console.log("Load Text Content: Algorithm was not able to loading the field values of the type SCALARS.");
                        }
                        else{
                          //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Finished loading field values of the type SCALARS.";
                          console.log("Load Text Content: Finished loading field values of the type SCALARS.");
                        }
                        counter=0;
                        nextLoadfieldValues=false;
                        valueType = 0;
                      }
                    }
                break;
              default:

            }

            continue;
          }
          /////////////////////////////////////////////////////////
          if(nextLoadPoints){
            openAlert("Sorry, there is a bug at the vtk loader algorithm. The loader was not able to load the grid points.");
            return false;
          }
          /////////////////////////////////////////////////////////
          if (nextVersionNumber) {
            console.log("Error in the vtk format. Placement of the version number = " + tmpSubstring + "?");
            nextVersionNumber = false;
            continue;
          }
          /////////////////////////////////////////////////////////
          if (nextDataset) {

            switch (tmpSubstring) {
              case "STRUCTURED_POINTS":
                datasetType = 1;
                //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Found DATASET Format: STRUCTURED_POINTS";
                console.log("Load Text Content: Found DATASET Format: STRUCTURED_POINTS");
                //openAlert("Sorry, the ccc-tool did not support STRUCTURED_POINTS datasets.");
                //return false;
                break;
              case "STRUCTURED_GRID":
                datasetType = 2;
                //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Found DATASET Format: STRUCTURED_GRID";
                console.log("Load Text Content: Found DATASET Format: STRUCTURED_GRID");
                break;
              case "UNSTRUCTURED_GRID":
                datasetType = 3;
                //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Found DATASET Format: UNSTRUCTURED_GRID";
                console.log("Load Text Content: Found DATASET Format: UNSTRUCTURED_GRID");
                break;
              case "POLYDATA":
                datasetType = 4;
                //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Found DATASET Format: POLYDATA";
                console.log("Load Text Content: Found DATASET Format: POLYDATA");
                openAlert("Sorry, the ccc-tool did not support POLYDATA datasets.");
                return false;
                break;
              case "RECTILINEAR_GRID":
                datasetType = 5;
                //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Found DATASET Format: RECTILINEAR_GRID";
                console.log("Load Text Content: Found DATASET Format: RECTILINEAR_GRID");
                break;
              case "FIELD":
                datasetType = 6;
                //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Found DATASET Format: FIELD";
                console.log("Load Text Content: Found DATASET Format: FIELD");
                openAlert("Sorry, the ccc-tool did not support FIELD datasets.");
                return false;
                break;
              default:
                openAlert("Sorry, the vtk file is maybe not correct. The DATASET " + tmpSubstring + " is unknown or can't be handled by the loader algorithm.");
                return false;
            }
            nextDataset = false;
            continue;
          }
          /////////////////////////////////////////////////////////
          if(nextDimension){

            switch (counter) {
                case 2:
                  is3D = false;
                  counter=0;
                  nextDimension=false;
                  foundDimension = true;
                  //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Found 2D Dimension: X = "+dimension_x+", Y = "+dimension_y+".";
                  console.log("Load Text Content: Found 2D Dimension: X = "+dimension_x+", Y = "+dimension_y+".");
                break;
              default:
              openAlert("Sorry, the vtk loader was not able to load the vtk file. There was an error at the code part to indentify the dimension. Please inform us about this error!");
              return false;
            }

            continue;
          }
          /////////////////////////////////////////////////////////
          if(nextOrigin){

            switch (counter) {
                  case 2:
                    counter=0;
                    nextOrigin=false;
                    if(is3D==true){
                      openAlert("Sorry, the vtk loader was not able to load the vtk file. The Dimension and the Orgin information are not compatible!");
                      return false;
                    }
                    else{
                      is3D = false;
                      //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Found 2D Origin: X = "+origin_x+", Y = "+origin_y+".";
                      console.log("Load Text Content: Found 2D Origin: X = "+origin_x+", Y = "+origin_y+".");
                      originFound = true;
                      if (spacingFound) {
                          numberPoints = dimension_x * dimension_y;
                          globalDomain = new class_Domain(datasetType, numberPoints, is3D);
                          globalDomain.setGrid_XDimension(dimension_x);
                          globalDomain.setGrid_YDimension(dimension_y);
                          globalDomain.setGrid_ZDimension(1);
                          //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Start generating grid for 3D structured points dataset.";
                          console.log("Load Text Content: Start generating grid for 3D structured points dataset.");
                          for (var x = 0; x < dimension_x; x++) {
                            for (var y = 0; y < dimension_y; y++) {
                              var tmpX = origin_x + (spacing_x * x);
                              var tmpY = origin_y + (spacing_y * y);
                              var newPoint = new THREE.Vector3(tmpX, tmpY, 0.0);
                              var index = x+y*dimension_y;
                              globalDomain.insertGridPoint(newPoint,index );
                            }
                          }
                          loadedGrid = true;
                        }
                    }
                    break;
              default:
              openAlert("Sorry, the vtk loader was not able to load the vtk file. There was an error at the code part to indentify the origin. Please inform us about this error!");
              return false;
            }
            continue;
          }
          /////////////////////////////////////////////////////////
          if(nextSpacing){

            switch (counter) {
                  case 2:
                    counter=0;
                    nextSpacing=false;
                    if(is3D==true){
                      openAlert("Sorry, the vtk loader was not able to load the vtk file. The dimension and the spacing information are not compatible!");
                      return false;
                    }
                    else{
                      is3D = false;
                      //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Found 2D Spacing: X = "+spacing_x+", Y = "+spacing_y+".";
                      console.log("Load Text Content: Found 2D Spacing: X = "+spacing_x+", Y = "+spacing_y+".");
                      originFound = true;
                      if (spacingFound) {
                          numberPoints = dimension_x * dimension_y;
                          globalDomain = new class_Domain(datasetType, numberPoints, is3D);
                          globalDomain.setGrid_XDimension(dimension_x);
                          globalDomain.setGrid_YDimension(dimension_y);
                          globalDomain.setGrid_ZDimension(1);
                          //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Start generating grid for 3D structured points dataset.";
                          console.log("Load Text Content: Start generating grid for 3D structured points dataset.");
                          for (var x = 0; x < dimension_x; x++) {
                            for (var y = 0; y < dimension_y; y++) {
                              var tmpX = origin_x + (spacing_x * x);
                              var tmpY = origin_y + (spacing_y * y);
                              var newPoint = new THREE.Vector3(tmpX, tmpY, 0.0);
                              var index = x+y*dimension_y;
                              globalDomain.insertGridPoint(newPoint, index);
                            }
                          }
                          loadedGrid = true;
                        }
                    }
                    break;
              default:
              openAlert("Sorry, the vtk loader was not able to load the vtk file. There was an error at the code part to indentify the spaxing. Please inform us about this error!");
              return false;
            }
            continue;
          }
          /////////////////////////////////////////////////////////
          if(nextPointInformation){
            switch (counter) {
              case 0:
                openAlert("Sorry, the vtk loader was not able to get the grid point informations. Please check the file for the right vkt format.");
                return false;
              case 1: // datatype
                  gridPointsDatatype=tmpSubstring;
                  counter=0;
                  nextPointInformation=false;
                  nextLoadPoints=true;
                  globalDomain = new class_Domain(datasetType, numberPoints, is3D);
                  globalDomain.setGrid_XDimension(dimension_x);
                  globalDomain.setGrid_YDimension(dimension_y);
                  globalDomain.setGrid_ZDimension(dimension_z);
                break;
              default:
                openAlert("Sorry, there is a bug at the vtk loader algorithm. The loader was not able to get the grid point informations");
                return false;

            }
          }
          /////////////////////////////////////////////////////////
          if(nextLoadXCoordinates){
            switch (counter) {
              case -2:
                openAlert("Sorry, the vtk loader was not able to determine the size of the x-coordinates.");
                return false;
              case -1:
                dataType_xCoordinates=tmpSubstring;
                counter++;
                break;
              default:
                openAlert("Sorry, there was an error at the load part of the x-coordinates. Please inform us!");
                return false;
            }
          }
          /////////////////////////////////////////////////////////
          if(nextLoadYCoordinates){
            switch (counter) {
              case -2:
                openAlert("Sorry, the vtk loader was not able to determine the size of the y-coordinates.");
                return false;
              case -1:
                dataType_yCoordinates=tmpSubstring;
                counter++;
                break;
              default:
                openAlert("Sorry, there was an error at the load part of the y-coordinates. Please inform us!");
                return false;
            }
          }
          /////////////////////////////////////////////////////////
          if(nextLoadZCoordinates){
            switch (counter) {
              case -2:
                openAlert("Sorry, the vtk loader was not able to determine the size of the z-coordinates.");
                return false;
              case -1:
                dataType_zCoordinates=tmpSubstring;
                counter++;
                break;
              default:
                openAlert("Sorry, there was an error at the load part of the z-coordinates. Please inform us!");
                return false;
            }
          }

          switch (tmpSubstring) {
            case "#":
              nextVersionNumber = true;
              counter = 4;
              sleep = true;
              break;
              case "BINARY":
                isASCII = false;
                //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Found File Format: BINARY.";
                console.log("Load Text Content: Found File Format: BINARY.");
                foundFileFormat = true;
                openAlert("Sorry, the current version of the vtk loader algorithm is not albe to read binary data.");
                return false;
                break;
              case "ASCII":
                isASCII = true;
                //document.getElementById("id_currentProcessText").innerHTML = "Load Text Content: Found File Format: ASCII.";
                console.log("Load Text Content: Found File Format: ASCII.");
                foundFileFormat = true;
                break;
              case "DATASET":
                nextDataset = true;
                break;
              case "DIMENSIONS":
                nextDimension = true;
                break;
             case "ORIGIN":
              nextOrigin = true;
             break;
             case "SPACING":
              nextSpacing = true;
             break;
             case "POINTS":
              nextPointInformation = true;
             break;
             case "X_COORDINATES":
              nextLoadXCoordinates=true;
              counter=-2;
             break;
             case "Y_COORDINATES":
              nextLoadYCoordinates=true;
              counter=-2;
             break;
             case "Z_COORDINATES":
              nextLoadZCoordinates=true;
              counter=-2;
             break;
             case "CELL_DATA":
              isCellData = true;
              nextLoadfieldValues=true;
              valueType=-1;
             break;
             case "POINT_DATA":
               isCellData = false;
               nextLoadfieldValues=true;
               valueType=-1;
             break;
            default:
              ////// -> do nothing

          }
        }



        break;

      default:

        if(foundCharE){

            if(content[i]!="-")
            isNum = false;


            foundCharE=false;
        }

        if (isNum) {


            switch (content[i]) {
              case "0":
                break;
              case "1":
                break;
              case "2":
                break;
              case "3":
                break;
              case "4":
                break;
              case "5":
                break;
              case "6":
                break;
              case "7":
                break;
              case "8":
                break;
              case "9":
                break;
              case ".":
                if (pointIsSet == true) {
                  isNum = false;
                } else {
                  pointIsSet = true;
                }
                break;
              case "-":
                if (foundMinus) {
                  isNum = false;
                }
                else{
                  foundMinus=true;
                }
                break;
              case "e":

              if(alreadyFoundE){
                isNum = false;
              }
              else{
                alreadyFoundE=true;
                foundCharE=true;
                foundMinus=false;
              }
                break;
              default:
                isNum = false;

            }


        }
        substring = substring + content[i];

    }
  }


  if(globalDomain.getNumberOfFields()==0){
    openAlert("Sorry, the algorithm was not able to find a useable field.");
    return false;
  }

  currentFieldIndex = 0;
  currentTimeIndex = 0;

  for (var i = fieldNames.length-1; i >=0; i--) {
    var option = document.createElement("option");
    option.text = fieldNames[i];
    document.getElementById("combobox_selectField").add(option);
  }

  for (var i = 1; i <= globalDomain.getNumberOfTimeSteps(currentFieldIndex); i++) {
    var option = document.createElement("option");
    option.text = i+"";
    document.getElementById("combobox_selectTimeStep").add(option);
  }

  document.getElementById("id_fieldMinValue").innerHTML = globalDomain.getMinField(currentFieldIndex);
  document.getElementById("id_fieldMaxValue").innerHTML = globalDomain.getMaxField(currentFieldIndex);
  return true;
}





function vtk_XML_reader() {




}
