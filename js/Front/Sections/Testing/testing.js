//////////////////////////////////////
/// Wait /////
///////////////////////////////////


function openTestSection(){

  updateTestMappingCanvas("id_UserTestCanvas"); // updateSize
  document.getElementById("id_Test_ScaleFactor").value = scalefactor3DTest;


  var selectobject=document.getElementById("id_TestSection_CMS_Select")
  for (var i=selectobject.length-1; i>=0; i--){
     selectobject.remove(i);
  }

  for (var i = 0; i < myDesignsList.length; i++) {
    var optionCMS = document.createElement("option");
    optionCMS.innerHTML = myDesignsList[i].getColormapName();

    selectobject.add(optionCMS);
  }
  selectobject.selectedIndex = 0;

  switchTest(0);

}

function selectTestCMS(){

  globalCMS1 = cloneCMS(myDesignsList[document.getElementById("id_TestSection_CMS_Select").selectedIndex]);


  drawCanvasColormap("id_TestPage_CMS_VIS_ColormapLinear", globalCMS1);

  initTesttestField_WorkerJSON();

  startTest();

}

function startTest(){
  switch (testingType) {
    case 0:
      startCCCTest();
      break;
      case 1:
        startUserTest();
        break;
    default:

  }
}

function switchTest(type){

  testingType=type;

  document.getElementById("id_TestPage_CCCTest").style.background=styleNotActiveColor;
  document.getElementById("id_TestPage_CustomTest").style.background=styleNotActiveColor;


  document.getElementById("id_TestPage_CCCTest").style.color=styleNotActiveColorFont;
  document.getElementById("id_TestPage_CustomTest").style.color=styleNotActiveColorFont;

  var selectbox = document.getElementById("id_TestPage_UserTest_List");

  selectbox.innerHTML=[];
  /*for(var i = selectbox.options.length - 1 ; i >= 0 ; i--)
  {
      selectbox.remove(i);
  }*/


  switch (type) {
    case 0:
      document.getElementById("id_TestPage_CCCTest").style.background=styleActiveColor;
      document.getElementById("id_TestPage_CCCTest").style.color=styleActiveColorFont;

      if(cccTest_Jumps_Options.length>0){
        var optgroupJumps = document.createElement('optgroup');
        optgroupJumps.label = "Jump Tests:";
        for (var i = 0; i < cccTest_Jumps_Options.length; i++) {
          var opt = document.createElement('option');

          var name = "Jump : J={";
          for (var j = 0; j < cccTest_Jumps_Options[i].length; j++) {
            name += cccTest_Jumps_Options[i][j];

            if(j!=cccTest_Jumps_Options[i].length-1)
              name += ",";
          }
          name +="}";
          opt.innerHTML = name;
          opt.value = "Jump";
          optgroupJumps.appendChild(opt);
        }
        selectbox.appendChild(optgroupJumps);
      }


      if(cccTest_Gradient_Options.length>0){
        var optgroupGradient = document.createElement('optgroup');
        optgroupGradient.label = "Gradient Tests:";
        for (var i = 0; i < cccTest_Gradient_Options.length; i++) {
          var opt = document.createElement('option');

          var name = "Gradient : S=" + cccTest_Gradient_Options[i][0]*100+"%";

          switch (cccTest_Gradient_Options[i][1]) {
            case 0:
                  name +=", Type=Rising";
              break;
            case 1:
                name +=", Type=Falling";
              break;
            default:

          }

          name +=", Dimension="+cccTest_Gradient_Options[i][2]+"x"+cccTest_Gradient_Options[i][2];
          opt.innerHTML = name;
          opt.value = "Gradient";
          optgroupGradient.appendChild(opt);
        }
        selectbox.appendChild(optgroupGradient);
      }


      if(cccTest_RidgeValleyLine_Options.length>0){
        var optgroupJumps = document.createElement('optgroup');
        optgroupJumps.label = "Ridge & Valley Tests:";
        for (var i = 0; i < cccTest_RidgeValleyLine_Options.length; i++) {
          var opt = document.createElement('option');

          var name = ""

          if(cccTest_RidgeValleyLine_Options[i][0]<cccTest_RidgeValleyLine_Options[i][1])
            name = "Valley"
          else
            name = "Ridge"

          name += " : m=" + cccTest_RidgeValleyLine_Options[i][0] + ", M=" + cccTest_RidgeValleyLine_Options[i][1] +", m-Type=";

          switch (cccTest_RidgeValleyLine_Options[i][2]) {
            case 0:
                name += "\"Linear\"";
              break;
              case 1:
                  name += "\"Hunch-Quad\"";
                  /*var exp = ""+cccTest_RidgeValleyLine_Options[i][3];
                  name += "\"Quad x"+exp.sup()+"\"";*/
                break;
                case 2:
                    name += "\"Crumb-Quad\"";
                    /*var exp = ""+cccTest_RidgeValleyLine_Options[i][3];
                    name += "\"Quad (x&#8723;1)"+exp.sup()+"\"";*/
                  break;
            default:

          }
          name += ", M-Type=";
          switch (cccTest_RidgeValleyLine_Options[i][4]) {
            case 0:
                name += "\"Linear\"";
              break;
              case 1:
                name += "\"Hunch-Quad\"";
                /*var exp = ""+cccTest_RidgeValleyLine_Options[i][5];
                name += "\"Quad x"+exp.sup()+"\"";*/
                break;
                case 2:
                    name += "\"Crumb-Quad\"";
                    /*var exp = ""+cccTest_RidgeValleyLine_Options[i][5];
                    name += "\"Quad (x-1)"+exp.sup()+"\"";/*/
                  break;
            default:

          }
          name += ", Dimension=" + cccTest_RidgeValleyLine_Options[i][6]+"x"+cccTest_RidgeValleyLine_Options[i][7];
          opt.innerHTML = name;
          opt.value = "Valley";
          optgroupJumps.appendChild(opt);
        }
        selectbox.appendChild(optgroupJumps);
      }


      if(cccTest_LocalExtrema_Options.length>0){
        var optgroupJumps = document.createElement('optgroup');
        optgroupJumps.label = "Local Extrema Tests:";
        for (var i = 0; i < cccTest_LocalExtrema_Options.length; i++) {
          var opt = document.createElement('option');

          var name = ""

          if(cccTest_LocalExtrema_Options[i][0]>0 && cccTest_LocalExtrema_Options[i][1]>0){
            name += "Minimum (";
          }
          else if (cccTest_LocalExtrema_Options[i][0]<0 && cccTest_LocalExtrema_Options[i][1]<0) {
            name += "Maximum (";
          }
          else {
            name += "Sattle (";
          }

          name += "a="+cccTest_LocalExtrema_Options[i][0]+", b="+cccTest_LocalExtrema_Options[i][1]+", m="+cccTest_LocalExtrema_Options[i][2]+")";
          name += " : x_step="+cccTest_LocalExtrema_Options[i][3]+", #x_steps="+cccTest_LocalExtrema_Options[i][4]+", y_step="+cccTest_LocalExtrema_Options[i][5]+", #y_steps="+cccTest_LocalExtrema_Options[i][6];

          if(cccTest_LocalExtrema_Options[i][7]){
            name += ", Autoscale To Range";
          }

          opt.innerHTML = name;
          opt.value = "Extrema";
          optgroupJumps.appendChild(opt);
        }
        selectbox.appendChild(optgroupJumps);
      }

      if(cccTest_Frequency_Options.length>0){
        var optgroupJumps = document.createElement('optgroup');
        optgroupJumps.label = "Frequency Tests:";
        for (var i = 0; i < cccTest_Frequency_Options.length; i++) {
          var opt = document.createElement('option');

          var name = "";

          if(cccTest_Frequency_Options[i][0])
            name = "Sinus : ";
          else
            name = "Cosinus : ";

          var tmp = "Start";
          name += "F"+tmp.sub()+"=";

          name += cccTest_Frequency_Options[i][1] +
          ", #Doublings="+cccTest_Frequency_Options[i][2]+
          ", Wave-Range="+cccTest_Frequency_Options[i][3]+
          "-"+cccTest_Frequency_Options[i][4]+
          ", DIM="+cccTest_Frequency_Options[i][5]+"x"+cccTest_Frequency_Options[i][6];

          opt.innerHTML = name;
          opt.value = "Frequency";
          optgroupJumps.appendChild(opt);
        }
        selectbox.appendChild(optgroupJumps);
      }


      selectbox.selectedIndex=0;

      break;
      case 1:
      document.getElementById("id_TestPage_CustomTest").style.background=styleActiveColor;
      document.getElementById("id_TestPage_CustomTest").style.color=styleActiveColorFont;

      var optgroupExtrema = document.createElement('optgroup');
      optgroupExtrema.label = "Local Extrema Functions:";
      for (var i = 0; i < userTest_LocalMin_Options.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = userTest_LocalMin_Options[i][0];
        opt.value = userTest_LocalMin_Options[i][1];
        optgroupExtrema.appendChild(opt);
      }
      selectbox.appendChild(optgroupExtrema);

      var optgroupBowl = document.createElement('optgroup');
      optgroupBowl.label = "Bowl Shaped Functions:";
      for (var i = 0; i < userTest_BowlShaped_Options.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = userTest_BowlShaped_Options[i][0];
        opt.value = userTest_BowlShaped_Options[i][1];
        optgroupBowl.appendChild(opt);
      }
      selectbox.appendChild(optgroupBowl);

      var optgroupValley = document.createElement('optgroup');
      optgroupValley.label = "Valley Shaped Functions:";
      for (var i = 0; i < userTest_ValleyShaped_Options.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = userTest_ValleyShaped_Options[i][0];
        opt.value = userTest_ValleyShaped_Options[i][1];
        optgroupValley.appendChild(opt);
      }
      selectbox.appendChild(optgroupValley);



      selectbox.selectedIndex=0;

        break;
    default:
        switchTest(0);
  }

  selectTestCMS();

}


function swithHightmap(){

    if(do3DTestField){
      do3DTestField=false;
      document.getElementById("id_TestPage_HightmapLabel").innerHTML="Hightmap";
    }
    else{
      do3DTestField=true;
      document.getElementById("id_TestPage_HightmapLabel").innerHTML="2D Map";
    }
    startTest();

}

function workerEvent_showTestField(e) {

  var data = e.data;

  if(data.isUpdate){
    document.getElementById("id_Test_StatusBar").style.width = data.status+"%";
  }
  else{

    if(data.includeCellValues){
      userTestGlobalField.setCellValues(true)
    }

    for (var i = 0; i < data.testFieldVal.length; i++) {
      var y = (i / userTestGlobalField.getXDim()) >> 0
      var x = i - (y * userTestGlobalField.getXDim())
      var newRGB = new classColor_RGB(data.cVal1[i], data.cVal2[i], data.cVal3[i]);
      var value = data.testFieldVal[i];
      var xPos = data.positions[i][0];
      var yPos = data.positions[i][1];

      userTestGlobalField.setFieldValue(x, y, value, newRGB,xPos,yPos);
    }


    usertestWorkerfinished = true;
    drawTestField(userTestGlobalField, "id_UserTestCanvas");
    document.getElementById("id_Test_StatusBar").style.width = "100%";
  }

}


/* Source: https://stackoverflow.com/questions/12796513/html5-canvas-to-png-file*/
/* REGISTER DOWNLOAD HANDLER */
/* Only convert the canvas to Data URL when the user clicks.
   This saves RAM and CPU ressources in case this feature is not required. */
function downloadTestImage() {
  var imageName = "";
  var canvasID ="";

  if(document.getElementById("id_TestPage_CCCTest_Div").style.display!="none"){
    canvasID="id_CCCTestCanvas";
    imageName="CCC-Tool_TestImage_Function_LSLD_Colormap_XYZ";
  }
  else{
    canvasID="id_UserTestCanvas";
    imageName="CCC-Tool_USERImage_Function_LSLD_Colormap_XYZ";
  }

  var canvas = document.getElementById(canvasID);

  var dt = canvas.toDataURL('image/png');
  /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
  dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

  /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
  dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename='+imageName+'.png');

  this.href = dt;
}

function initTesttestField_WorkerJSON(){
  testField_WorkerJSON = {};

  testField_WorkerJSON['testFieldType'] = undefined;
  testField_WorkerJSON['testFieldGenerationType'] = undefined;
  testField_WorkerJSON['testFieldIndex'] = undefined;

  testField_WorkerJSON['testFieldDimX'] = undefined;
  testField_WorkerJSON['testFieldDimY'] = undefined;

  testField_WorkerJSON['originIsRelevant'] = false;
  testField_WorkerJSON['originPosX'] = 0;
  testField_WorkerJSON['originPosY'] = 0;
  testField_WorkerJSON['stepXDirection'] = 0.01;
  testField_WorkerJSON['stepYDirection'] = 0.01;
  testField_WorkerJSON['originIsCenter'] = true;

  testField_WorkerJSON['testFieldRangeStart'] = 0;
  testField_WorkerJSON['testFieldRangeEnd'] = 1;

  //// Additional Field Variables
  testField_WorkerJSON['testFieldVar_a'] = undefined;
  testField_WorkerJSON['testFieldVar_b'] = undefined;
  testField_WorkerJSON['testFieldVar_c'] = undefined;
  testField_WorkerJSON['testFieldVar_d'] = undefined;
  testField_WorkerJSON['testFieldVar_e'] = undefined;
  testField_WorkerJSON['testFieldVar_f'] = undefined;

  testField_WorkerJSON['colorspace'] = globalCMS1.getInterpolationSpace();
  testField_WorkerJSON['refVal'] = [];
  testField_WorkerJSON['key1cVal1'] = [];
  testField_WorkerJSON['key1cVal2'] = [];
  testField_WorkerJSON['key1cVal3'] = [];
  testField_WorkerJSON['key2cVal1'] = [];
  testField_WorkerJSON['key2cVal2'] = [];
  testField_WorkerJSON['key2cVal3'] = [];
  testField_WorkerJSON['MoT'] = [];

  testField_WorkerJSON['transferMatrixColorXYZ'] = tmXYZ_Selected;
  testField_WorkerJSON['transferMatrixColorXYZ_Inv'] = tmXYZ_Selected_Inv;

  testField_WorkerJSON['din99_kE'] = din99_kE;
  testField_WorkerJSON['din99_kCH'] = din99_kCH;
  testField_WorkerJSON['cielab_ref_X'] = cielab_ref_X;
  testField_WorkerJSON['cielab_ref_Y'] = cielab_ref_Y;
  testField_WorkerJSON['cielab_ref_Z'] = cielab_ref_Z;

  testField_WorkerJSON['nanC1'] = undefined;
  testField_WorkerJSON['nanC2'] = undefined;
  testField_WorkerJSON['nanC3'] = undefined;

  testField_WorkerJSON['aboveC1'] = undefined;
  testField_WorkerJSON['aboveC2'] = undefined;
  testField_WorkerJSON['aboveC3'] = undefined;

  testField_WorkerJSON['belowC1'] = undefined;
  testField_WorkerJSON['belowC2'] = undefined;
  testField_WorkerJSON['belowC3'] = undefined;


  var tmpRefVal = [];
  var tmpkey1CVal1 = [];
  var tmpkey1CVal2 = [];
  var tmpkey1CVal3 = [];
  var tmpkey2CVal1 = [];
  var tmpkey2CVal2 = [];
  var tmpkey2CVal3 = [];
  var tmpMoT = [];


  for (var i = 0; i < globalCMS1.getKeyLength()-1; i++) {

    tmpRefVal.push(globalCMS1.getKey(i).getRefPosition());
    var color1=globalCMS1.getKey(i).getRightKeyColor(globalCMS1.getInterpolationSpace());
    var color2=globalCMS1.getKey(i+1).getLeftKeyColor(globalCMS1.getInterpolationSpace());

    if(color1!=undefined){
      tmpkey1CVal1.push(color1.get1Value());
      tmpkey1CVal2.push(color1.get2Value());
      tmpkey1CVal3.push(color1.get3Value());
    }
    else{
      tmpkey1CVal1.push(undefined);
      tmpkey1CVal2.push(undefined);
      tmpkey1CVal3.push(undefined);
    }

    if(color2!=undefined){
      tmpkey2CVal1.push(color2.get1Value());
      tmpkey2CVal2.push(color2.get2Value());
      tmpkey2CVal3.push(color2.get3Value());
    }
    else{
      tmpkey2CVal1.push(undefined);
      tmpkey2CVal2.push(undefined);
      tmpkey2CVal3.push(undefined);
    }

    tmpMoT.push(globalCMS1.getKey(i).getMoT());
  }
  tmpRefVal.push(globalCMS1.getKey(globalCMS1.getKeyLength()-1).getRefPosition());
  tmpMoT.push(globalCMS1.getKey(globalCMS1.getKeyLength()-1).getMoT());

  var tmpNaN = globalCMS1.getNaNColor("rgb");
  var tmpAbove = globalCMS1.getAboveColor("rgb");
  var tmpBelow = globalCMS1.getBelowColor("rgb");

    testField_WorkerJSON.colorspace = globalCMS1.getInterpolationSpace();
    testField_WorkerJSON.refVal=tmpRefVal;
    testField_WorkerJSON.key1cVal1=tmpkey1CVal1;
    testField_WorkerJSON.key1cVal2=tmpkey1CVal2;
    testField_WorkerJSON.key1cVal3=tmpkey1CVal3;
    testField_WorkerJSON.key2cVal1=tmpkey2CVal1;
    testField_WorkerJSON.key2cVal2=tmpkey2CVal2;
    testField_WorkerJSON.key2cVal3=tmpkey2CVal3;
    testField_WorkerJSON.MoT = tmpMoT;
    testField_WorkerJSON.din99_kE = din99_kE;
    testField_WorkerJSON.din99_kCH = din99_kCH;
    testField_WorkerJSON.cielab_ref_X = cielab_ref_X;
    testField_WorkerJSON.cielab_ref_Y = cielab_ref_Y;
    testField_WorkerJSON.cielab_ref_Z = cielab_ref_Z;


    testField_WorkerJSON.simColorBlind = doColorblindnessSim;

    testField_WorkerJSON.transferMatrixColorXYZ = tmXYZ_Selected;
    testField_WorkerJSON.transferMatrixColorXYZ_Inv = tmXYZ_Selected_Inv;
    testField_WorkerJSON.transferMatrixColorLMS = tmLMS_Selected;
    testField_WorkerJSON.transferMatrixColorLMS_Inv = tmLMS_Selected_Inv;
    testField_WorkerJSON.transferMatrixColorSIM = sim_AdaptiveColorblindness;

    testField_WorkerJSON.nanC1 = tmpNaN.get1Value();
    testField_WorkerJSON.nanC2 = tmpNaN.get2Value();
    testField_WorkerJSON.nanC3 = tmpNaN.get3Value();

    testField_WorkerJSON.aboveC1 = tmpAbove.get1Value();
    testField_WorkerJSON.aboveC2 = tmpAbove.get2Value();
    testField_WorkerJSON.aboveC3 = tmpAbove.get3Value();

    testField_WorkerJSON.belowC1 = tmpBelow.get1Value();
    testField_WorkerJSON.belowC2 = tmpBelow.get2Value();
    testField_WorkerJSON.belowC3 = tmpBelow.get3Value();


}
