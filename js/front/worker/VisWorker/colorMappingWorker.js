self.addEventListener('message', function(e) {

  var data = e.data;
  var error = 100; // 0.01
  var jsonObj = {};

  jsonObj['workerIndex'] = data.workerIndex;
  jsonObj['cellStartIndex'] = data.cellStartIndex;
  jsonObj['cVal1'] = [];
  jsonObj['cVal2'] = [];
  jsonObj['cVal3'] = [];



  switch (data.colorspace) {
    case "rgb":


      for (var valIndex = 0; valIndex < data.cellValues.length; valIndex++) {

        if (isNaN(data.cellValues[valIndex])) {
          jsonObj.cVal1.push(undefined);
          jsonObj.cVal2.push(undefined);
          jsonObj.cVal3.push(undefined);
          continue;
        }

        if (data.cellValues[valIndex] < data.refVal[0] ) {
          jsonObj.cVal1.push(data.belowC1);
          jsonObj.cVal2.push(data.belowC2);
          jsonObj.cVal3.push(data.belowC3);
          continue;
        }

        if (data.cellValues[valIndex] > data.refVal[data.refVal.length - 1]) {
          jsonObj.cVal1.push(data.aboveC1);
          jsonObj.cVal2.push(data.aboveC2);
          jsonObj.cVal3.push(data.aboveC3);
          continue;
        }

        var foundeSomething=false;

        for (var i = 0; i < data.refVal.length - 1; i++) {

          var tmpRatio = (data.cellValues[valIndex] - data.refVal[i]) / (data.refVal[i + 1] - data.refVal[i]);



          if (data.cellValues[valIndex] > data.refVal[i] && data.cellValues[valIndex] < data.refVal[i + 1]) {

            if (data.key1cVal1[i] == undefined) { // cVal2 and cVal3 should also be undefined -> constant band
              jsonObj.cVal1.push(data.key2cVal1[i]);
              jsonObj.cVal2.push(data.key2cVal2[i]);
              jsonObj.cVal3.push(data.key2cVal3[i]);
              foundeSomething=true;
              break;
            }

            jsonObj.cVal1.push(data.key1cVal1[i] + (data.key2cVal1[i] - data.key1cVal1[i]) * tmpRatio);
            jsonObj.cVal2.push(data.key1cVal2[i] + (data.key2cVal2[i] - data.key1cVal2[i]) * tmpRatio);
            jsonObj.cVal3.push(data.key1cVal3[i] + (data.key2cVal3[i] - data.key1cVal3[i]) * tmpRatio);
            foundeSomething=true;
            break;
          }




          if(data.cellValues[valIndex]==data.refVal[i]){

            if(i==0){
              jsonObj.cVal1.push(data.key1cVal1[i]);
              jsonObj.cVal2.push(data.key1cVal2[i]);
              jsonObj.cVal3.push(data.key1cVal3[i]);
            }
            else{
              if(data.MoT[i]){
                //
                jsonObj.cVal1.push(data.key1cVal1[i]);
                jsonObj.cVal2.push(data.key1cVal2[i]);
                jsonObj.cVal3.push(data.key1cVal3[i]);
              }
              else{
                jsonObj.cVal1.push(data.key2cVal1[i-1]);
                jsonObj.cVal2.push(data.key2cVal2[i-1]);
                jsonObj.cVal3.push(data.key2cVal3[i-1]);
              }
            }
            foundSomething=true;
            break;
          }


        }


        if(data.cellValues[valIndex]==data.refVal[data.refVal.length-1]){
            jsonObj.cVal1.push(data.key2cVal1[data.key2cVal1.length-1]);
            jsonObj.cVal2.push(data.key2cVal2[data.key2cVal2.length-1]);
            jsonObj.cVal3.push(data.key2cVal3[data.key2cVal3.length-1]);
            foundSomething=true;
        }

        if(foundSomething==false){
          jsonObj.cVal1.push(undefined);
          jsonObj.cVal2.push(undefined);
          jsonObj.cVal3.push(undefined);
          continue;
        }

      }

      break;


    case "lab":
    case "din99":


      for (var valIndex = 0; valIndex < data.cellValues.length; valIndex++) {

        if (isNaN(data.cellValues[valIndex])) {
          jsonObj.cVal1.push(undefined);
          jsonObj.cVal2.push(undefined);
          jsonObj.cVal3.push(undefined);
          continue;
        }

        if (data.cellValues[valIndex] < data.refVal[0] ) {
          jsonObj.cVal1.push(data.belowC1);
          jsonObj.cVal2.push(data.belowC2);
          jsonObj.cVal3.push(data.belowC3);
          continue;
        }

        if (data.cellValues[valIndex] > data.refVal[data.refVal.length - 1]) {
          jsonObj.cVal1.push(data.aboveC1);
          jsonObj.cVal2.push(data.aboveC2);
          jsonObj.cVal3.push(data.aboveC3);
          continue;
        }

        var foundSomething = false;
        var var_R, var_G, var_B;
        var val1, val2, val3;

        for (var i = 0; i < data.refVal.length - 1; i++) {

          var tmpRatio = (data.cellValues[valIndex] - data.refVal[i]) / (data.refVal[i + 1] - data.refVal[i]);

          if (data.cellValues[valIndex] > data.refVal[i] && data.cellValues[valIndex] < data.refVal[i + 1]) {

            if (data.key1cVal1[i] == undefined) { // cVal2 and cVal3 should also be undefined -> constant band
              val1 = data.key2cVal1[i];
              val2 = data.key2cVal2[i];
              val3 = data.key2cVal3[i];
            } else {
              val1 = data.key1cVal1[i] + (data.key2cVal1[i] - data.key1cVal1[i]) * tmpRatio;
              val2 = data.key1cVal2[i] + (data.key2cVal2[i] - data.key1cVal2[i]) * tmpRatio;
              val3 = data.key1cVal3[i] + (data.key2cVal3[i] - data.key1cVal3[i]) * tmpRatio;
            }

            foundSomething=true;
            break;
          }


          if(data.cellValues[valIndex]==data.refVal[i]){

            if(i==0){
              val1 = data.key1cVal1[i];
              val2 = data.key1cVal2[i];
              val3 = data.key1cVal3[i];
            }
            else{

              if(data.MoT[i]){
                //
                val1 = data.key1cVal1[i];
                val2 = data.key1cVal2[i];
                val3 = data.key1cVal3[i];
              }
              else{
                  val1 = data.key2cVal1[i-1];
                  val2 = data.key2cVal2[i-1];
                  val3 = data.key2cVal3[i-1];
              }
            }
            foundSomething=true;
            break;
          }
        }


        if(data.cellValues[valIndex]==data.refVal[data.refVal.length-1]){
          val1 = data.key2cVal1[data.key2cVal1.length-1];
          val2 = data.key2cVal2[data.key2cVal2.length-1];
          val3 = data.key2cVal3[data.key2cVal3.length-1];
          foundSomething=true;
        }

        if(foundSomething==false){
          jsonObj.cVal1.push(undefined);
          jsonObj.cVal2.push(undefined);
          jsonObj.cVal3.push(undefined);
        }
        else {
          var value_L, value_A, value_B;

          if (data.colorspace === "din99") {
            var angle = 2 * Math.PI / 360 * 26;
            var lScale = 100 / Math.log(139 / 100.0); // = 303.67
            value_L = (Math.exp(val1 * data.din99_kE / lScale) - 1.0) / 0.0039;
            var hef = Math.atan2(val3, val2);
            var h99 = hef - angle;
            var C99 = Math.sqrt(Math.pow(val2, 2) + Math.pow(val3, 2));
            var G = (Math.exp(0.0435 * C99 * data.din99_kCH * data.din99_kE) - 1) / 0.075;
            var e = G * Math.cos(h99);
            var f = G * Math.sin(h99);

            value_A = e * Math.cos(angle) - (f / 0.83) * Math.sin(angle);
            value_B = e * Math.sin(angle) + (f / 0.83) * Math.cos(angle);
          } else {
            value_L = val1;
            value_A = val2;
            value_B = val3;
          }

          /// LAB -> RGB

          //  Calc XYZ
          var var_Y = (value_L + 16.0) / 116.0;
          var var_X = value_A / 500.0 + var_Y;
          var var_Z = var_Y - value_B / 200.0;

          if (Math.pow(var_Y, 3.0) > 0.008856) {
            var_Y = Math.pow(var_Y, 3.0);
          } else {
            var_Y = (var_Y - 16.0 / 116.0) / 7.787;
          }

          if (Math.pow(var_X, 3.0) > 0.008856) {
            var_X = Math.pow(var_X, 3.0);
          } else {
            var_X = (var_X - 16.0 / 116.0) / 7.787;
          }

          if (Math.pow(var_Z, 3.0) > 0.008856) {
            var_Z = Math.pow(var_Z, 3.0);
          } else {
            var_Z = (var_Z - 16.0 / 116.0) / 7.787;
          }

          var_X = (var_X * data.cielab_ref_X);
          var_Y = (var_Y * data.cielab_ref_Y);
          var_Z = (var_Z * data.cielab_ref_Z);

          //    Calc RGB
          var var_X = var_X / 100.0;
          var var_Y = var_Y / 100.0;
          var var_Z = var_Z / 100.0;

          /*var_R = var_X * 3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
          var_G = var_X * -0.9689 + var_Y * 1.8758 + var_Z * 0.0415;
          var_B = var_X * 0.0557 + var_Y * -0.2040 + var_Z * 1.0570;*/

          var_R = var_X * data.transferMatrixColorXYZ_Inv[0][0] + var_Y * data.transferMatrixColorXYZ_Inv[0][1] + var_Z * data.transferMatrixColorXYZ_Inv[0][2];
          var_G = var_X * data.transferMatrixColorXYZ_Inv[1][0] + var_Y * data.transferMatrixColorXYZ_Inv[1][1] + var_Z * data.transferMatrixColorXYZ_Inv[1][2];
          var_B = var_X * data.transferMatrixColorXYZ_Inv[2][0] + var_Y * data.transferMatrixColorXYZ_Inv[2][1] + var_Z * data.transferMatrixColorXYZ_Inv[2][2];

          if (var_R > 0.0031308) var_R = 1.055 * Math.pow(var_R, (1.0 / 2.4)) - 0.055;
          else var_R = 12.92 * var_R;
          if (var_G > 0.0031308) var_G = 1.055 * Math.pow(var_G, (1.0 / 2.4)) - 0.055;
          else var_G = 12.92 * var_G;
          if (var_B > 0.0031308) var_B = 1.055 * Math.pow(var_B, (1.0 / 2.4)) - 0.055;
          else var_B = 12.92 * var_B;


          if (var_R>1.0 || var_G>1.0 || var_B>1.0 || var_R<0.0 || var_G<0.0 || var_B<0.0){
              // Wrong RGB -Values

              if(var_R>1.0 && var_R-1.0<error){
                  var_R=1.0;

              }
              if(var_G>1.0 && var_G-1.0<error){
                  var_G=1.0;
              }
              if(var_B>1.0 && var_B-1.0<error){
                  var_B=1.0;
              }
              if(var_R<0.0 && 1.0-var_R<error){
                  var_R=0.0;
              }
              if(var_G<0.0 && 1.0-var_G<error){
                  var_G=0.0;
              }
              if(var_B<0.0 && 1.0-var_B<error){
                  var_B=0.0;
              }
              if (var_R>1.0 || var_G>1.0 || var_B>1.0 || var_R<0.0 || var_G<0.0 || var_B<0.0){
                  //var rgbString = "rgb(0,0,0)";
                  //return rgbString;
                  jsonObj.cVal1.push(undefined);
                  jsonObj.cVal2.push(undefined);
                  jsonObj.cVal3.push(undefined);
              }
              else{
                  jsonObj.cVal1.push(var_R);
                  jsonObj.cVal2.push(var_G);
                  jsonObj.cVal3.push(var_B);
              }
          }
          else{
              jsonObj.cVal1.push(var_R);
              jsonObj.cVal2.push(var_G);
              jsonObj.cVal3.push(var_B);
          }


        }


        }
      break;

    case "hsv":

      for (var valIndex = 0; valIndex < data.cellValues.length; valIndex++) {

        if (isNaN(data.cellValues[valIndex])) {
          jsonObj.cVal1.push(undefined);
          jsonObj.cVal2.push(undefined);
          jsonObj.cVal3.push(undefined);
          continue;
        }

        if (data.cellValues[valIndex] < data.refVal[0] ) {
          jsonObj.cVal1.push(data.belowC1);
          jsonObj.cVal2.push(data.belowC2);
          jsonObj.cVal3.push(data.belowC3);
          continue;
        }

        if (data.cellValues[valIndex] > data.refVal[data.refVal.length - 1]) {
          jsonObj.cVal1.push(data.aboveC1);
          jsonObj.cVal2.push(data.aboveC2);
          jsonObj.cVal3.push(data.aboveC3);
          continue;
        }



          var foundSomething = false;
          var r, g, b;
          var tmpH, tmpS, tmpV;

        for (var j = 0; j < data.refVal.length - 1; j++) {

          var tmpRatio = (data.cellValues[valIndex] - data.refVal[j]) / (data.refVal[i + 1] - data.refVal[j]);

          if (data.cellValues[valIndex] > data.refVal[j] && data.cellValues[valIndex] < data.refVal[i + 1]) {
            if (data.key1cVal1[j] == undefined) { // cVal2 and cVal3 should also be undefined -> constant band
              tmpH = data.key2cVal1[j];
              tmpS = data.key2cVal2[j];
              tmpV = data.key2cVal3[j];
            } else {
              var tmpDis = data.key1cVal2[j] * 50; // radius 50; center(0,0,0);
              var tmpRad = (data.key1cVal1[j] * Math.PI * 2) - Math.PI;
              var xPos = tmpDis * Math.cos(tmpRad);
              var yPos = tmpDis * Math.sin(tmpRad);
              var zPos = data.key1cVal3[j] - 50;

              var tmpDis2 = data.key2cVal2[j] * 50;
              var tmpRad2 = (data.key2cVal1[j] * Math.PI * 2) - Math.PI;
              var xPos2 = tmpDis2 * Math.cos(tmpRad2);
              var yPos2 = tmpDis2 * Math.sin(tmpRad2);
              var zPos2 = data.key2cVal3[j] - 50;

              var tmpX = xPos + (xPos2 - xPos) * tmpRatio;
              var tmpY = yPos + (yPos2 - yPos) * tmpRatio;
              var tmpZ = zPos + (zPos2 - zPos) * tmpRatio;

              tmpH = (Math.atan2(tmpY, tmpX) + Math.PI) / (Math.PI * 2);
              tmpS = Math.sqrt(Math.pow(tmpX, 2) + Math.pow(tmpY, 2)) / 50;
              tmpV = tmpZ + 50;
            }
            foundSomething=true;
          }

            if(data.cellValues[valIndex]==data.refVal[i]){

              if(i==0){
                tmpH = data.key1cVal1[i];
                tmpS = data.key1cVal2[i];
                tmpV = data.key1cVal3[i];
              }
              else{
                if(data.MoT[i]){
                  //
                  tmpH = data.key1cVal1[i];
                  tmpS = data.key1cVal2[i];
                  tmpV = data.key1cVal3[i];
                }
                else{
                    tmpH = data.key2cVal1[i-1];
                    tmpS = data.key2cVal2[i-1];
                    tmpV = data.key2cVal3[i-1];
                }
              }
              foundSomething=true;

            }
          }

          if(data.cellValues[valIndex]==data.refVal[data.refVal.length-1]){
            tmpH = data.key2cVal1[data.key2cVal1.length-1];
            tmpS = data.key2cVal2[data.key2cVal2.length-1];
            tmpV = data.key2cVal3[data.key2cVal3.length-1];
            foundSomething=true;
          }

          if(foundSomething==false){
            jsonObj.cVal1.push(undefined);
            jsonObj.cVal2.push(undefined);
            jsonObj.cVal3.push(undefined);
          }
          else {

            var i = Math.floor(tmpH * 6);
            var f = tmpH * 6 - i;
            var p = tmpV * (1 - tmpS);
            var q = tmpV * (1 - f * tmpS);
            var t = tmpV * (1 - (1 - f) * tmpS);

            switch (i % 6) {
              case 0:
                r = tmpV, g = t, b = p;
                break;
              case 1:
                r = q, g = tmpV, b = p;
                break;
              case 2:
                r = p, g = tmpV, b = t;
                break;
              case 3:
                r = p, g = q, b = tmpV;
                break;
              case 4:
                r = t, g = p, b = tmpV;
                break;
              case 5:
                r = tmpV, g = p, b = q;
                break;
            }

            jsonObj.cVal1.push(r);
            jsonObj.cVal2.push(g);
            jsonObj.cVal3.push(b);

          }

        }

      break;

      //default:

  }

/*  if(data.simColorBlind){
    for (var i = 0; i < jsonObj.cVal1.length; i++) {

      if(jsonObj.cVal1[i]!=undefined){

        // to xyz

        if (jsonObj.cVal1[i] > 0.04045) jsonObj.cVal1[i] = Math.pow(((jsonObj.cVal1[i] + 0.055) / 1.055), 2.4);
        else jsonObj.cVal1[i] = jsonObj.cVal1[i] / 12.92;
        if (jsonObj.cVal2[i] > 0.04045) jsonObj.cVal2[i] = Math.pow(((jsonObj.cVal2[i] + 0.055) / 1.055), 2.4);
        else jsonObj.cVal2[i] = jsonObj.cVal2[i] / 12.92;
        if (jsonObj.cVal3[i] > 0.04045) jsonObj.cVal3[i] = Math.pow(((jsonObj.cVal3[i] + 0.055) / 1.055), 2.4);
        else jsonObj.cVal3[i] = jsonObj.cVal3[i] / 12.92;

        jsonObj.cVal1[i] = jsonObj.cVal1[i] * 100;
        jsonObj.cVal2[i] = jsonObj.cVal2[i] * 100;
        jsonObj.cVal3[i] = jsonObj.cVal3[i] * 100;

        jsonObj.cVal1[i] = jsonObj.cVal1[i] * data.transferMatrixColorXYZ[0][0] + jsonObj.cVal2[i] * data.transferMatrixColorXYZ[0][1] + jsonObj.cVal3[i] * data.transferMatrixColorXYZ[0][2];
        jsonObj.cVal2[i] = jsonObj.cVal1[i] * data.transferMatrixColorXYZ[1][0] + jsonObj.cVal2[i] * data.transferMatrixColorXYZ[1][1] + jsonObj.cVal3[i] * data.transferMatrixColorXYZ[1][2];
        jsonObj.cVal3[i] = jsonObj.cVal1[i] * data.transferMatrixColorXYZ[2][0] + jsonObj.cVal2[i] * data.transferMatrixColorXYZ[2][1] + jsonObj.cVal3[i] * data.transferMatrixColorXYZ[2][2];

        // to lms
        jsonObj.cVal1[i] = jsonObj.cVal1[i] * data.transferMatrixColorLMS[0][0] + jsonObj.cVal2[i] * data.transferMatrixColorLMS[0][1] + jsonObj.cVal3[i] * data.transferMatrixColorLMS[0][2];
        jsonObj.cVal2[i] = jsonObj.cVal1[i] * data.transferMatrixColorLMS[1][0] + jsonObj.cVal2[i] * data.transferMatrixColorLMS[1][1] + jsonObj.cVal3[i] * data.transferMatrixColorLMS[1][2];
        jsonObj.cVal3[i] = jsonObj.cVal1[i] * data.transferMatrixColorLMS[2][0] + jsonObj.cVal2[i] * data.transferMatrixColorLMS[2][1] + jsonObj.cVal3[i] * data.transferMatrixColorLMS[2][2];

        // to l'm's'
        jsonObj.cVal1[i] = jsonObj.cVal1[i] * data.transferMatrixColorSIM[0][0] + jsonObj.cVal2[i] * data.transferMatrixColorSIM[0][1] + jsonObj.cVal3[i] * data.transferMatrixColorSIM[0][2];
        jsonObj.cVal2[i] = jsonObj.cVal1[i] * data.transferMatrixColorSIM[1][0] + jsonObj.cVal2[i] * data.transferMatrixColorSIM[1][1] + jsonObj.cVal3[i] * data.transferMatrixColorSIM[1][2];
        jsonObj.cVal3[i] = jsonObj.cVal1[i] * data.transferMatrixColorSIM[2][0] + jsonObj.cVal2[i] * data.transferMatrixColorSIM[2][1] + jsonObj.cVal3[i] * data.transferMatrixColorSIM[2][2];

        // to xyz
        jsonObj.cVal1[i] = jsonObj.cVal1[i] * data.transferMatrixColorLMS_Inv[0][0] + jsonObj.cVal2[i] * data.transferMatrixColorLMS_Inv[0][1] + jsonObj.cVal3[i] * data.transferMatrixColorLMS_Inv[0][2];
        jsonObj.cVal2[i] = jsonObj.cVal1[i] * data.transferMatrixColorLMS_Inv[1][0] + jsonObj.cVal2[i] * data.transferMatrixColorLMS_Inv[1][1] + jsonObj.cVal3[i] * data.transferMatrixColorLMS_Inv[1][2];
        jsonObj.cVal3[i] = jsonObj.cVal1[i] * data.transferMatrixColorLMS_Inv[2][0] + jsonObj.cVal2[i] * data.transferMatrixColorLMS_Inv[2][1] + jsonObj.cVal3[i] * data.transferMatrixColorLMS_Inv[2][2];

        // to rgb
        jsonObj.cVal1[i] = jsonObj.cVal1[i] * data.transferMatrixColorXYZ_Inv[0][0] + jsonObj.cVal2[i] * data.transferMatrixColorXYZ_Inv[0][1] + jsonObj.cVal3[i] * data.transferMatrixColorXYZ_Inv[0][2];
        jsonObj.cVal2[i] = jsonObj.cVal1[i] * data.transferMatrixColorXYZ_Inv[1][0] + jsonObj.cVal2[i] * data.transferMatrixColorXYZ_Inv[1][1] + jsonObj.cVal3[i] * data.transferMatrixColorXYZ_Inv[1][2];
        jsonObj.cVal3[i] = jsonObj.cVal1[i] * data.transferMatrixColorXYZ_Inv[2][0] + jsonObj.cVal2[i] * data.transferMatrixColorXYZ_Inv[2][1] + jsonObj.cVal3[i] * data.transferMatrixColorXYZ_Inv[2][2];


        //apply standard gamma correction
        if ( jsonObj.cVal1[i] > 0.0031308 ) jsonObj.cVal1[i] = 1.055 * Math.pow( jsonObj.cVal1[i] , ( 1.0 / 2.4 ) ) - 0.055;
        else                     jsonObj.cVal1[i] = 12.92 * jsonObj.cVal1[i];
        if ( jsonObj.cVal2[i] > 0.0031308 ) jsonObj.cVal2[i] = 1.055 * Math.pow( jsonObj.cVal2[i] , ( 1.0 / 2.4 ) ) - 0.055;
        else                     jsonObj.cVal2[i] = 12.92 * jsonObj.cVal2[i];
        if ( jsonObj.cVal3[i] > 0.0031308 ) jsonObj.cVal3[i] = 1.055 * Math.pow( jsonObj.cVal3[i] , ( 1.0 / 2.4 ) ) - 0.055;
        else                     jsonObj.cVal3[i] = 12.92 * jsonObj.cVal3[i];


        if (jsonObj.cVal1[i]>1.0 || jsonObj.cVal2[i]>1.0 || jsonObj.cVal3[i]>1.0 || jsonObj.cVal1[i]<0.0 || jsonObj.cVal2[i]<0.0 || jsonObj.cVal3[i]<0.0){
            // Wrong RGB -Values

            if(jsonObj.cVal1[i]>1.0 && jsonObj.cVal1[i]-1.0<error){
                jsonObj.cVal1[i]=1.0;

            }
            if(jsonObj.cVal2[i]>1.0 && jsonObj.cVal2[i]-1.0<error){
                jsonObj.cVal2[i]=1.0;
            }
            if(jsonObj.cVal3[i]>1.0 && jsonObj.cVal3[i]-1.0<error){
                jsonObj.cVal3[i]=1.0;
            }
            if(jsonObj.cVal1[i]<0.0 && 1.0-jsonObj.cVal1[i]<error){
                jsonObj.cVal1[i]=0.0;
            }
            if(jsonObj.cVal2[i]<0.0 && 1.0-jsonObj.cVal2[i]<error){
                jsonObj.cVal2[i]=0.0;
            }
            if(jsonObj.cVal3[i]<0.0 && 1.0-jsonObj.cVal3[i]<error){
                jsonObj.cVal3[i]=0.0;
            }
            if (jsonObj.cVal1[i]>1.0 || jsonObj.cVal2[i]>1.0 || jsonObj.cVal3[i]>1.0 || jsonObj.cVal1[i]<0.0 || jsonObj.cVal2[i]<0.0 || jsonObj.cVal3[i]<0.0){
                jsonObj.cVal1[i]=undefined;
                jsonObj.cVal1[i]=undefined;
                jsonObj.cVal1[i]=undefined;
            }
        }


      }

    }
  }

*/
  self.postMessage(jsonObj);


}, false);
