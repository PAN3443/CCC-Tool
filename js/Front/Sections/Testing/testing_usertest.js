function startUserTest() {

  //initTesttestField_WorkerJSON();
  document.getElementById("id_Test_StatusBar").style.width = "0%";


  if (usertestWorkerfinished == false) {

    if (usertestWorker != undefined)
      usertestWorker.terminate();

    usertestWorkerfinished = true;
  }

  console.log("Start User Test: "+ document.getElementById("id_TestPage_UserTest_List").options[document.getElementById("id_TestPage_UserTest_List").selectedIndex].value);

  if (document.getElementById("id_TestPage_UserTest_List").selectedIndex != -1) {
    switch (document.getElementById("id_TestPage_UserTest_List").options[document.getElementById("id_TestPage_UserTest_List").selectedIndex].value) {

      ////////////////////////////////////////////////////////
      //// Functions: Many Local Minima
      ////
      case "Ackley":
        testField_WorkerJSON.testFieldVar_a = ackley_varA;
        testField_WorkerJSON.testFieldVar_b = ackley_varB;
        testField_WorkerJSON.testFieldVar_c = ackley_varC;
        var tmpsteps = calcFieldSteps(ackley_xRangeStart, ackley_xRangeEnd, ackley_yRangeStart, ackley_yRangeEnd, ackley_numStepsX, ackley_numStepsY);
        userTest_startWorker(ackley_numStepsX, ackley_numStepsY, tmpsteps[0], tmpsteps[1], ackley_xRangeStart, ackley_yRangeStart, false, "Ackley");
        break;
      case "Bukin_N6":
        var tmpsteps = calcFieldSteps(bukin_xRangeStart, bukin_xRangeEnd, bukin_yRangeStart, bukin_yRangeEnd, bukin_numStepsX, bukin_numStepsY);
        userTest_startWorker(bukin_numStepsX, bukin_numStepsY, tmpsteps[0], tmpsteps[1], bukin_xRangeStart, bukin_yRangeStart, false, "Bukin_N6");
        break;
      case "Cross-in-Tray":
        var tmpsteps = calcFieldSteps(cit_xRangeStart, cit_xRangeEnd, cit_yRangeStart, cit_yRangeEnd, cit_numStepsX, cit_numStepsY);
        userTest_startWorker(cit_numStepsX, cit_numStepsY, tmpsteps[0], tmpsteps[1], cit_xRangeStart, cit_yRangeStart, false, "Cross-in-Tray");
        break;
      case "Drop-Wave":
        var tmpsteps = calcFieldSteps(dropW_xRangeStart, dropW_xRangeEnd, dropW_yRangeStart, dropW_yRangeEnd, dropW_numStepsX, dropW_numStepsY);
        userTest_startWorker(dropW_numStepsX, dropW_numStepsY, tmpsteps[0], tmpsteps[1], dropW_xRangeStart, dropW_yRangeStart, false, "Drop-Wave");
        break;
      case "Eggholder":
        var tmpsteps = calcFieldSteps(egg_xRangeStart, egg_xRangeEnd, egg_yRangeStart, egg_yRangeEnd, egg_numStepsX, egg_numStepsY);
        userTest_startWorker(egg_numStepsX, egg_numStepsY, tmpsteps[0], tmpsteps[1], egg_xRangeStart, egg_yRangeStart, false, "Eggholder");
        break;
      case "Griewank":
        var tmpsteps = calcFieldSteps(griewank_xRangeStart, griewank_xRangeEnd, griewank_yRangeStart, griewank_yRangeEnd, griewank_numStepsX, griewank_numStepsY);
        userTest_startWorker(griewank_numStepsX, griewank_numStepsY, tmpsteps[0], tmpsteps[1], griewank_xRangeStart, griewank_yRangeStart, false, "Griewank");
        break;
      case "HolderTable":
        var tmpsteps = calcFieldSteps(htable_xRangeStart, htable_xRangeEnd, htable_yRangeStart, htable_yRangeEnd, htable_numStepsX, htable_numStepsY);
        userTest_startWorker(htable_numStepsX, htable_numStepsY, tmpsteps[0], tmpsteps[1], htable_xRangeStart, htable_yRangeStart, false, "HolderTable");
        break;
      case "Langermann":
        testField_WorkerJSON.testFieldVar_a = langermann_vec_c;
        testField_WorkerJSON.testFieldVar_b = langermann_mat_A;
        var tmpsteps = calcFieldSteps(langermann_xRangeStart, langermann_xRangeEnd, langermann_yRangeStart, langermann_yRangeEnd, langermann_numStepsX, langermann_numStepsY);
        userTest_startWorker(langermann_numStepsX, langermann_numStepsY, tmpsteps[0], tmpsteps[1], langermann_xRangeStart, langermann_yRangeStart, false, "Langermann");
        break;
      case "Levy":
        var tmpsteps = calcFieldSteps(levy_xRangeStart, levy_xRangeEnd, levy_yRangeStart, levy_yRangeEnd, levy_numStepsX, levy_numStepsY);
        userTest_startWorker(levy_numStepsX, levy_numStepsY, tmpsteps[0], tmpsteps[1], levy_xRangeStart, levy_yRangeStart, false, "Levy");
        break;
      case "Levy_N13":
        var tmpsteps = calcFieldSteps(levy13_xRangeStart, levy13_xRangeEnd, levy13_yRangeStart, levy13_yRangeEnd, levy13_numStepsX, levy13_numStepsY);
        userTest_startWorker(levy13_numStepsX, levy13_numStepsY, tmpsteps[0], tmpsteps[1], levy13_xRangeStart, levy13_yRangeStart, false, "Levy_N13");
        break;
      case "Rastrigin":
        var tmpsteps = calcFieldSteps(rastrigin_xRangeStart, rastrigin_xRangeEnd, rastrigin_yRangeStart, rastrigin_yRangeEnd, rastrigin_numStepsX, rastrigin_numStepsY);
        userTest_startWorker(rastrigin_numStepsX, rastrigin_numStepsY, tmpsteps[0], tmpsteps[1], rastrigin_xRangeStart, rastrigin_yRangeStart, false, "Rastrigin");
        break;
      case "Schaffer_N2":
        var tmpsteps = calcFieldSteps(schafferN2_xRangeStart, schafferN2_xRangeEnd, schafferN2_yRangeStart, schafferN2_yRangeEnd, schafferN2_numStepsX, schafferN2_numStepsY);
        userTest_startWorker(schafferN2_numStepsX, schafferN2_numStepsY, tmpsteps[0], tmpsteps[1], schafferN2_xRangeStart, schafferN2_yRangeStart, false, "Schaffer_N2");
        break;
      case "Schaffer_N4":
        var tmpsteps = calcFieldSteps(schafferN4_xRangeStart, schafferN4_xRangeEnd, schafferN4_yRangeStart, schafferN4_yRangeEnd, schafferN4_numStepsX, schafferN4_numStepsY);
        userTest_startWorker(schafferN4_numStepsX, schafferN4_numStepsY, tmpsteps[0], tmpsteps[1], schafferN4_xRangeStart, schafferN4_yRangeStart, false, "Schaffer_N4");
        break;
      case "Schwefel":
        var tmpsteps = calcFieldSteps(schwefel_xRangeStart, schwefel_xRangeEnd, schwefel_yRangeStart, schwefel_yRangeEnd, schwefel_numStepsX, schwefel_numStepsY);
        userTest_startWorker(schwefel_numStepsX, schwefel_numStepsY, tmpsteps[0], tmpsteps[1], schwefel_xRangeStart, schwefel_yRangeStart, false, "Schwefel");
        break;
      case "Shubert":
        var tmpsteps = calcFieldSteps(shubert_xRangeStart, shubert_xRangeEnd, shubert_yRangeStart, shubert_yRangeEnd, shubert_numStepsX, shubert_numStepsY);
        userTest_startWorker(shubert_numStepsX, shubert_numStepsY, tmpsteps[0], tmpsteps[1], shubert_xRangeStart, shubert_yRangeStart, false, "Shubert");
        break;

        //////////////////////////////////
        /// Functions: Bowl-Shaped
        ///
      case "Bohachevsky_F1":
      case "Bohachevsky_F2":
      case "Bohachevsky_F3":
        var tmpsteps = calcFieldSteps(bohachevsky_xRangeStart, bohachevsky_xRangeEnd, bohachevsky_yRangeStart, bohachevsky_yRangeEnd, bohachevsky_numStepsX, bohachevsky_numStepsY);
        userTest_startWorker(bohachevsky_numStepsX, bohachevsky_numStepsY, tmpsteps[0], tmpsteps[1], bohachevsky_xRangeStart, bohachevsky_yRangeStart, false, document.getElementById("id_TestPage_UserTest_List").options[document.getElementById("id_TestPage_UserTest_List").selectedIndex].value);
        break;
      case "Perm_V1":
        testField_WorkerJSON.testFieldVar_a = permV1_b;
        var tmpsteps = calcFieldSteps(permV1_xRangeStart, permV1_xRangeEnd, permV1_yRangeStart, permV1_yRangeEnd, permV1_numStepsX, permV1_numStepsY);
        userTest_startWorker(permV1_numStepsX, permV1_numStepsY, tmpsteps[0], tmpsteps[1], permV1_xRangeStart, permV1_yRangeStart, false, "Perm_V1");
        break;
        case "Rot_Hyper_Ellipsoid":
          var tmpsteps = calcFieldSteps(rotHypEllip_xRangeStart, rotHypEllip_xRangeEnd, rotHypEllip_yRangeStart, rotHypEllip_yRangeEnd, rotHypEllip_numStepsX, rotHypEllip_numStepsY);
          userTest_startWorker(rotHypEllip_numStepsX, rotHypEllip_numStepsY, tmpsteps[0], tmpsteps[1], rotHypEllip_xRangeStart, rotHypEllip_yRangeStart, false, "Rot_Hyper_Ellipsoid");
          break;
          case "Sphere":
            var tmpsteps = calcFieldSteps(sphere_xRangeStart, sphere_xRangeEnd, sphere_yRangeStart, sphere_yRangeEnd, sphere_numStepsX, sphere_numStepsY);
            userTest_startWorker(sphere_numStepsX, sphere_numStepsY, tmpsteps[0], tmpsteps[1], sphere_xRangeStart, sphere_yRangeStart, false, "Sphere");
            break;
            case "SumDifPowers":
              var tmpsteps = calcFieldSteps(sumDifPowers_xRangeStart, sumDifPowers_xRangeEnd, sumDifPowers_yRangeStart, sumDifPowers_yRangeEnd, sumDifPowers_numStepsX, sumDifPowers_numStepsY);
              userTest_startWorker(sumDifPowers_numStepsX, sumDifPowers_numStepsY, tmpsteps[0], tmpsteps[1], sumDifPowers_xRangeStart, sumDifPowers_yRangeStart, false, "SumDifPowers");
              break;
              case "Sum_Squares":
                var tmpsteps = calcFieldSteps(sumSquares_xRangeStart, sumSquares_xRangeEnd, sumSquares_yRangeStart, sumSquares_yRangeEnd, sumSquares_numStepsX, sumSquares_numStepsY);
                userTest_startWorker(sumSquares_numStepsX, sumSquares_numStepsY, tmpsteps[0], tmpsteps[1], sumSquares_xRangeStart, sumSquares_yRangeStart, false, "Sum_Squares");
                break;
                case "Trid":
                  var tmpsteps = calcFieldSteps(trid_xRangeStart, trid_xRangeEnd, trid_yRangeStart, trid_yRangeEnd, trid_numStepsX, trid_numStepsY);
                  userTest_startWorker(trid_numStepsX, trid_numStepsY, tmpsteps[0], tmpsteps[1], trid_xRangeStart, trid_yRangeStart, false, "Trid");
                  break;

                  //////////////////////////////////
                  /// Functions: Valley-Shaped
                  ///

                  case "Three_Hump_Camel":
                    var tmpsteps = calcFieldSteps(threeHumpCamel_xRangeStart, threeHumpCamel_xRangeEnd, threeHumpCamel_yRangeStart, threeHumpCamel_yRangeEnd, threeHumpCamel_numStepsX, threeHumpCamel_numStepsY);
                    userTest_startWorker(threeHumpCamel_numStepsX, threeHumpCamel_numStepsY, tmpsteps[0], tmpsteps[1], threeHumpCamel_xRangeStart, threeHumpCamel_yRangeStart, false, "Three_Hump_Camel");
                    break;



      default:

    }
  }

}


function calcFieldSteps(xRangeStart, xRangeEnd, yRangeStart, yRangeEnd, numStepsX, numStepsY) {
  var tmpSteps = [];
  tmpSteps.push((xRangeEnd - xRangeStart) / numStepsX);
  tmpSteps.push((yRangeEnd - yRangeStart) / numStepsY);
  return tmpSteps;
}




function userTest_startWorker(n, m, stepX, stepY, originX, originY, doCentralSpread, type) {

  if (doCentralSpread) {
    testField_WorkerJSON.testFieldDimX = n * 2;
    testField_WorkerJSON.testFieldDimY = m * 2;
    userTestGlobalField = new class_TestField(n * 2, m * 2);
  } else {
    testField_WorkerJSON.testFieldDimX = n;
    testField_WorkerJSON.testFieldDimY = m;
    userTestGlobalField = new class_TestField(n, m);
  }

  testField_WorkerJSON.originIsCenter = doCentralSpread;

  testField_WorkerJSON.testFieldType = "USER";
  testField_WorkerJSON.testFieldGenerationType = type;
  testField_WorkerJSON.testFieldIndex = 0;

  testField_WorkerJSON.originPosX = originX;
  testField_WorkerJSON.originPosY = originY;

  testField_WorkerJSON.stepXDirection = stepX;
  testField_WorkerJSON.stepYDirection = stepY;

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);

  usertestWorkerfinished = false;
  usertestWorker.postMessage(testField_WorkerJSON);

}
