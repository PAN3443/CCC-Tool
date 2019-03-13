function openTopologyTest(tmpID){

var tmpArray = [];
for (var i = 0; i < cccTest_Topology_Options[tmpID].length; i++) {
  tmpArray.push(cccTest_Topology_Options[tmpID][i])
}
cccTest_NewTopology_Options = tmpArray;

initNewTest();
document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 4;
selectNewTopologyTestType();

}

function topologyTest_Htmlupdate(){

  document.getElementById("id_TestPage_NewTest_D1").style.display="none";
  document.getElementById("id_TestPage_NewTest_D2").style.display="none";
  document.getElementById("id_TestPage_NewTest_D3").style.display="none";
  document.getElementById("id_TestPage_NewTest_D4").style.display="none";

  document.getElementById("id_TestPage_XFctType_Div").style.display="none";
  document.getElementById("id_TestPage_YFctType_Div").style.display="none";

  document.getElementById("id_TestPage_NewTest_I3").disabled=false;
  document.getElementById("id_TestPage_NewTest_I4").disabled=false;

  switch (document.getElementById("id_Test_TopologyFoundation").selectedIndex) {
    case 0:
          //Plane // has one option
          document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
          document.getElementById("id_TestPage_NewTest_V1").innerHTML="m-Value: ";

      break;

        case 1: //Gradient
        case 2://Ridge/Valley

        document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
        document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
        document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
        document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

        document.getElementById("id_TestPage_NewTest_XTypeL1").innerHTML=" : Linear";
        document.getElementById("id_TestPage_NewTest_XTypeL2").innerHTML=" : Convex";
        document.getElementById("id_TestPage_NewTest_XTypeL3").innerHTML=" : Concave";

        document.getElementById("id_TestPage_NewTest_YTypeL1").innerHTML=" : Linear";
        document.getElementById("id_TestPage_NewTest_YTypeL2").innerHTML=" : Convex";
        document.getElementById("id_TestPage_NewTest_YTypeL3").innerHTML=" : Concave";


        switch (current_xFktType) { // mType
          case 0:
            document.getElementById("id_TestPage_NewTest_XType1").checked = true;
            break;
            case 1:
              document.getElementById("id_TestPage_NewTest_XType2").checked = true;
              break;
              case 2:
                document.getElementById("id_TestPage_NewTest_XType3").checked = true;
                break;
        }

        switch (current_yFktType) { // mType
          case 0:
            document.getElementById("id_TestPage_NewTest_YType1").checked = true;
            break;
            case 1:
              document.getElementById("id_TestPage_NewTest_YType2").checked = true;
              break;
              case 2:
                document.getElementById("id_TestPage_NewTest_YType3").checked = true;
                break;
        }


        document.getElementById("id_TestPage_NewTest_I3").min=2;
        document.getElementById("id_TestPage_NewTest_I4").min=2;

        document.getElementById("id_TestPage_NewTest_I3").step=1;
        document.getElementById("id_TestPage_NewTest_I4").step=1;


        if(document.getElementById("id_TestPage_doRatioCheckbox").checked){

          document.getElementById("id_TestPage_NewTest_I1").min=0;
          document.getElementById("id_TestPage_NewTest_I1").max=1.0;

          document.getElementById("id_TestPage_NewTest_I1").min=0;
          document.getElementById("id_TestPage_NewTest_I1").max=1.0;

        }

        document.getElementById("id_TestPage_NewTest_V1").innerHTML="m-Value: ";
        document.getElementById("id_TestPage_NewTest_V2").innerHTML="M-Value: ";
        document.getElementById("id_TestPage_XFctType_Div").style.display="block";

        document.getElementById("id_TestPage_NewTest_V3").innerHTML="X-Exponent: ";
        document.getElementById("id_TestPage_NewTest_V4").innerHTML="Y-Exponent: ";
        document.getElementById("id_TestPage_YFctType_Div").style.display="block";

        if(current_xFktType==0)
          document.getElementById("id_TestPage_NewTest_I3").disabled=true;
        else
          document.getElementById("id_TestPage_NewTest_I3").disabled=false;

        if(current_yFktType==0)
          document.getElementById("id_TestPage_NewTest_I4").disabled=true;
        else
          document.getElementById("id_TestPage_NewTest_I4").disabled=false;


    break;

    case 3: //Minimum, Maximum, Saddle
    document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
    document.getElementById("id_TestPage_NewTest_V1").innerHTML="a-Value: ";
    document.getElementById("id_TestPage_NewTest_V2").innerHTML="b-Value: ";
    document.getElementById("id_TestPage_NewTest_V3").innerHTML="m-Value: ";

    break;
  }
}

function selectNewTopologyTestType(){


  document.getElementById("id_TestPage_doRatioCheckbox").checked = cccTest_NewTopology_Options[0];

  document.getElementById("id_NewTest_TopologySubDivOptionDiv").style.display="block";
  document.getElementById("id_TestPage_Dimension_Div").style.display="block";

  document.getElementById("id_TestPage_NewTest_TopologyDiv1").style.display="flex";

  document.getElementById("id_TestPage_NewTest_TopologyDiv2").style.display="flex";

  document.getElementById("id_Test_TopologyFoundation").selectedIndex = cccTest_NewTopology_Options[1][0];


  switch (document.getElementById("id_Test_TopologyFoundation").selectedIndex) {
    case 0:
    document.getElementById("id_TestPage_NewTest_I1").value=cccTest_NewTopology_Options[1][1];
    break;
    case 1:
    case 2:
    document.getElementById("id_TestPage_NewTest_I3").value=cccTest_NewTopology_Options[1][4];
    document.getElementById("id_TestPage_NewTest_I4").value=cccTest_NewTopology_Options[1][6];
    document.getElementById("id_TestPage_NewTest_I1").value=cccTest_NewTopology_Options[1][1];
    document.getElementById("id_TestPage_NewTest_I2").value=cccTest_NewTopology_Options[1][2];
    current_xFktType= cccTest_NewTopology_Options[1][3];
    current_yFktType= cccTest_NewTopology_Options[1][5];
      if(document.getElementById("id_Test_TopologyFoundation").selectedIndex==1)
        draw_GradientFunctionType();
      else
        draw_RidgeValleyFunctionType();
    break;
    case 3:
    document.getElementById("id_TestPage_NewTest_I1").value=cccTest_NewTopology_Options[1][1];
    document.getElementById("id_TestPage_NewTest_I2").value=cccTest_NewTopology_Options[1][2];
    document.getElementById("id_TestPage_NewTest_I3").value=cccTest_NewTopology_Options[1][3];
    break;

  }
  topologyTest_Htmlupdate();

/*  document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

  document.getElementById("id_TestPage_NewTest_V1").innerHTML="Start Topology: ";
  document.getElementById("id_TestPage_NewTest_V2").innerHTML="#Increases: ";
  document.getElementById("id_TestPage_NewTest_V3").innerHTML="Wava-Range Start: ";
  document.getElementById("id_TestPage_NewTest_V4").innerHTML="Wava-Range End: ";*/



  chooseTopologySubDiv(0);
  updateNoise();
  topology_startWorker(cccTest_NewTopology_Options);
}


function switchFoundation (){
  var tmpArray = [];
  var index = document.getElementById("id_Test_TopologyFoundation").selectedIndex;
  for (var i = 0; i < cccTest_NewTopologyFoundation_Defaults[index].length; i++) {
    var tmpVal = cccTest_NewTopologyFoundation_Defaults[index][i];
    tmpArray.push(tmpVal);
  }

  cccTest_NewTopology_Options[1] = tmpArray;


  switch (document.getElementById("id_Test_TopologyFoundation").selectedIndex) {
    case 0:
    document.getElementById("id_TestPage_NewTest_I1").value=cccTest_NewTopology_Options[1][1];
    break;
    case 1:
    case 2:
    document.getElementById("id_TestPage_NewTest_I3").value=cccTest_NewTopology_Options[1][4];
    document.getElementById("id_TestPage_NewTest_I4").value=cccTest_NewTopology_Options[1][6];
    document.getElementById("id_TestPage_NewTest_I1").value=cccTest_NewTopology_Options[1][1];
    document.getElementById("id_TestPage_NewTest_I2").value=cccTest_NewTopology_Options[1][2];
    current_xFktType= cccTest_NewTopology_Options[1][3];
    current_yFktType= cccTest_NewTopology_Options[1][5];
    break;
    case 3:
    document.getElementById("id_TestPage_NewTest_I1").value=cccTest_NewTopology_Options[1][1];
    document.getElementById("id_TestPage_NewTest_I2").value=cccTest_NewTopology_Options[1][2];
    document.getElementById("id_TestPage_NewTest_I3").value=cccTest_NewTopology_Options[1][3];
    break;

  }

  topologyTest_Htmlupdate();
  updateTopologyTestVariables();
}


function updateTopologyTestVariables(){
  //updateNoise();

  // check x,y DIM
  var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
  document.getElementById("id_TestPage_GridDimX").value=dimX;
  if(isNaN(dimX)){
    openAlert("Invalid input for the Grid x-dimension!");
    return;
  }
  if(dimX<100){
    openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 100 or greater than 100.");
    return;
  }

  var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
  document.getElementById("id_TestPage_GridDimY").value=dimY;
  if(isNaN(dimY)){
    openAlert("Invalid input for the Grid y-dimension!");
    return;
  }
  if(dimY<100){
    openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 100 or greater than 100.");
    return;
  }



  switch (document.getElementById("id_Test_TopologyFoundation").selectedIndex) {
    case 0:
      cccTest_NewTopology_Options[1][1] = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
    break;
    case 1:
    case 2:
        check_xFktType();
        check_yFktType();

        if(current_xFktType==0)
          document.getElementById("id_TestPage_NewTest_I3").disabled=true;
        else
          document.getElementById("id_TestPage_NewTest_I3").disabled=false;

        if(current_yFktType==0)
          document.getElementById("id_TestPage_NewTest_I4").disabled=true;
        else
          document.getElementById("id_TestPage_NewTest_I4").disabled=false;

        // check m-value
        var value_m = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
        if(isNaN(value_m)){
          openAlert("Invalid input for the m-Value");
          return;
        }
        if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_m<0 || value_m>1.0)){
          openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
          return;
        }

        // check M-value
        var value_M = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
        if(isNaN(value_M)){
          openAlert("Invalid input for M-Value");
          return;
        }
        if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_M<0 || value_M>1.0)){
          openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
          return;
        }


        if(value_m==value_M){
          openAlert("Invalid input! The m-Value and M-Value have to be different!");
          return;
        }

        // check m-exp
        var exp_m = parseInt(document.getElementById("id_TestPage_NewTest_I3").value);
        if(isNaN(exp_m)){
          openAlert("Invalid input for m-Exponent");
          return;
        }
        document.getElementById("id_TestPage_NewTest_I3").value =exp_m;
        if(exp_m<2){
          openAlert("Invalid input for m-Exponent. The exponent has to be an integer and has to be 2 or greater than 2.");
          return;
        }

        // check M-exp
        var exp_M = parseInt(document.getElementById("id_TestPage_NewTest_I4").value);
        document.getElementById("id_TestPage_NewTest_I4").value = exp_M;
        if(isNaN(exp_M)){
          openAlert("Invalid input for m-Exponent");
          return;
        }
        if(exp_M<2){
          openAlert("Invalid input for m-Exponent. The exponent has to be an integer and has to be 2 or greater than 2.");
          return;
        }

        cccTest_NewTopology_Options[1][1]=value_m;
        cccTest_NewTopology_Options[1][2]=value_M;
        cccTest_NewTopology_Options[1][3] = current_xFktType;
        cccTest_NewTopology_Options[1][4]=exp_m;
        cccTest_NewTopology_Options[1][5] = current_yFktType;
        cccTest_NewTopology_Options[1][6] = exp_M;

      if(document.getElementById("id_Test_TopologyFoundation").selectedIndex==1)
        draw_GradientFunctionType();
      else
        draw_RidgeValleyFunctionType();
    break;
    case 3:
      cccTest_NewTopology_Options[1][1]= parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
      document.getElementById("id_TestPage_NewTest_I1").value = cccTest_NewTopology_Options[1][1];

      cccTest_NewTopology_Options[1][2]= parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
      document.getElementById("id_TestPage_NewTest_I2").value=cccTest_NewTopology_Options[1][2];

      cccTest_NewTopology_Options[1][3]= parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
      document.getElementById("id_TestPage_NewTest_I3").value=cccTest_NewTopology_Options[1][3];
    break;

  }



  updateNoise();
  topology_startWorker(cccTest_NewTopology_Options);
}



function chooseTopologySubDiv(type){

  document.getElementById("id_TestPage_NewTest_subDiv1").style.display="none";
  document.getElementById("id_TestPage_NewTest_subDiv2").style.display="none";

  document.getElementById("id_NewTest_SubDivOption1").style.background = styleNotActiveColor;
  document.getElementById("id_NewTest_SubDivOption2").style.background = styleNotActiveColor;

  document.getElementById("id_NewTest_SubDivOption1").style.color=styleNotActiveColorFont;
  document.getElementById("id_NewTest_SubDivOption2").style.color=styleNotActiveColorFont;


  if(type==0){
    document.getElementById("id_TestPage_NewTest_subDiv1").style.display="block";
    document.getElementById("id_NewTest_SubDivOption1").style.background=styleActiveColor;
    document.getElementById("id_NewTest_SubDivOption1").style.color=styleActiveColorFont;
  }
  else {
    document.getElementById("id_TestPage_NewTest_subDiv2").style.display="block";
    document.getElementById("id_NewTest_SubDivOption2").style.background=styleActiveColor;
    document.getElementById("id_NewTest_SubDivOption2").style.color=styleActiveColorFont;
  }
}

/////
/// [
// bool,
// [],  = Foundation  [Type,Option1,Option2,Option3, ......]
// []
// ]
