/////////////////////////////////////////////////
//////  Testing Global Vars


var testingType = 0;

var testingFieldResolution = 5; // ~ 2 million pixels for realistic


///////////////////////////////////////////
///// Fields

var allFieldsFinished;

/*var useCMSRangeForJumpFields = true;
var jumpTestFields_Array = [];
var jumpTestFields_Names = [];
var allJumpsFinished = false;
var jumpFieldRangeStart =0;
var jumpFieldRangeEnd =0;

// Gradient
var useCMSRangeForGradientFields = true;
var gradientTestFields_Array = [];
var gradientTestFields_Names = [];
var allGradientFinished = false;
var gradientFieldRangeStart =0;
var gradientFieldRangeEnd =0;

// Frequency
var useCMSRangeForFrequencyFields = true;
var frequencyTestFields_Array = [];
var frequencyTestFields_Names = [];
var allFrequencyFinished = false;
var frequencyFieldRangeStart =0;
var frequencyFieldRangeEnd =0;*/

// USER Test Fields
var userTestGlobalField = undefined;

///////////////////////////////////////////
///// worker
var testField_WorkerJSON;

//// Worker : Jumps
var allJumpWorkersFinished=true;
var jumpWorkers_Array=[];
var jumpWorkerStatus_Array=[];

//// Worker : Gradient
var allGradientWorkersFinished=true;
var gradientWorkers_Array=[];
var gradientWorkerStatus_Array=[];

//// Worker : Frequences
var allFrequencyWorkersFinished=true;
var frequencyWorkers_Array=[];
var frequencyWorkerStatus_Array=[];


//// Worker : User Test
var usertestWorker = undefined;
var usertestWorkerfinished = true;

var cccTest_Jumps_Options = [
  [0.25,0.75],
  [0.25,0.75,1.0],
  [0.0,0.25,0.75,1.0],
  [0.0,0.2,0.4,0.6,0.8,1.0]
];

var cccTest_Gradient_Options = [
  [0.2,0,100],
  [0.4,0,100],
  [0.6,0,100],
  [0.8,0,100],
  [0.8,1,100],
  [0.6,1,100],
  [0.4,1,100],
  [0.2,1,100]
];

var cccTest_RidgeValleyLine_Options = [  // m,M,type
  [0.0,1.0,0,undefined,0,undefined,100,100],
  [0.0,1.0,0,undefined,1,2,100,100],
  [0.0,1.0,0,undefined,2,2,100,100],
  [0.0,1.0,1,2,0,undefined,100,100],
  [0.0,1.0,2,2,0,undefined,100,100],
  [0.0,1.0,1,2,1,2,100,100],
  [1.0,0.0,0,undefined,0,undefined,100,100],
  [1.0,0.0,0,undefined,1,2,100,100],
  [1.0,0.0,1,2,0,undefined,100,100],
  [1.0,0.0,0,undefined,2,2,100,100],
  [1.0,0.0,2,2,0,undefined,100,100]
];

var cccTest_LocalExtrema_Options = [
  //[a,b,m,stepX,#stepsX,stepY,#stepsY,autoScale],
  [3,3,0,0.1,50,0.1,50,true],
  [-3,-3,0,0.1,50,0.1,50,true],
  [-3,3,0,0.1,50,0.1,50,true],
  [3,-3,0,0.1,50,0.1,50,true],
];


var cccTest_Frequency_Options = [

  [true,1,4,0.0,1.0,500,50],
  [false,1,4,0.0,1.0,500,50],
  [true,1,6,0.0,1.0,500,50],
  [true,2,4,0.0,1.0,500,50],
  [true,3,4,0.0,1.0,500,50]

];




///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////
/// User Test Options

var userTest_LocalMin_Options = [
["Ackley Function","Ackley"],
["Bukin Function N. 6","Bukin_N6"],
["Cross-in-Tray Function","Cross-in-Tray"],
["Drop-Wave Function","Drop-Wave"],
["Eggholder Function","Eggholder"],
["Griewank Function","Griewank"],
["Holder Table Function","HolderTable"],
["Langermann Function","Langermann"],
["Levy Function","Levy"],
["Levy Function N. 13","Levy_N13"],
["Rastrigin Function","Rastrigin"],
["Schaffer Function N. 2","Schaffer_N2"],
["Schaffer Function N. 4","Schaffer_N4" ],
["Schwefel Function","Schwefel"],
["Shubert Function","Shubert"]
];


 var userTest_BowlShaped_Options =[
   ["Bohachevsky Function 1","Bohachevsky_F1"],
   ["Bohachevsky Function 2","Bohachevsky_F2"],
   ["Bohachevsky Function 3","Bohachevsky_F3"],
   ["Perm Function 0, d, β","Perm_V1"],
   ["Rotated Hyper-Ellipsoid Function","Rot_Hyper_Ellipsoid"],
   ["Sphere Function","Sphere"],
   ["Sum of Different Powers Function","SumDifPowers"],
   ["Sum Squares Function","Sum_Squares"],
   ["Trid Function","Trid"]
 ];

 var userTest_ValleyShaped_Options =[
   ["Three-Hump Camel Function","Three_Hump_Camel"]
 ];

/*
"Beale" "Beale Function"


"Booth" "Booth Function"
"Branin" "Branin Function"

"Colville" "Colville Function"

"De_Jong_N5" "De Jong Function N. 5"
"Dixon-Price" "Dixon-Price Function"

"Easom" "Easom Function"

"Forrester" "Forrester et al. (2008) Function"
"Goldstein-Price" "Goldstein-Price Function"

"Hartmann_3D" "Hartmann 3-D Function"
"Hartmann_4D" "Hartmann 4-D Function"
"Hartmann_6D" "Hartmann 6-D Function"



"Matyas" "Matyas Function"
"McCormick" "McCormick Function"
"Michalewicz" "Michalewicz Function"

"Perm_V2" "Perm Function d, β"
"Powell" "Powell Function"
"Power Sum" "Power Sum Function"

"Rosenbrock" "Rosenbrock Function"



"Shekel" "Shekel Function"

"Six-Hump_Camel" "Six-Hump Camel Function"

"Styblinski-Tang" "Styblinski-Tang Function"




"Zakharov" "Zakharov Function"*/


// ACKLEY
var ackley_xRangeStart = -32.768;
var ackley_xRangeEnd = 32.768;
var ackley_yRangeStart = -32.768;
var ackley_yRangeEnd = 32.768;
var ackley_numStepsX = 200;
var ackley_numStepsY = 200;
var ackley_varA = 20;
var ackley_varB = 0.2;
var ackley_varC = Math.PI*2;

// Bukin N. 6
var bukin_xRangeStart = -15;
var bukin_xRangeEnd = -5;
var bukin_yRangeStart = 3;
var bukin_yRangeEnd = -2;
var bukin_numStepsX = 200;
var bukin_numStepsY = 200;


// CROSS IN TRAY
var cit_xRangeStart = -10;
var cit_xRangeEnd = 10;
var cit_yRangeStart = -10;
var cit_yRangeEnd = 10;
var cit_numStepsX = 200;
var cit_numStepsY = 200;

// Drop Wave
var dropW_xRangeStart = -5;
var dropW_xRangeEnd = 5;
var dropW_yRangeStart = -5;
var dropW_yRangeEnd = 5;
var dropW_numStepsX = 200;
var dropW_numStepsY = 200;

// Eggholder
var egg_xRangeStart = -512;
var egg_xRangeEnd = 512;
var egg_yRangeStart = -512;
var egg_yRangeEnd = 512;
var egg_numStepsX = 200;
var egg_numStepsY = 200;

// Griewank
var griewank_xRangeStart = -100;
var griewank_xRangeEnd = 100;
var griewank_yRangeStart = -100;
var griewank_yRangeEnd = 100;
var griewank_numStepsX = 200;
var griewank_numStepsY = 200;

// Holder Table
var htable_xRangeStart = -10;
var htable_xRangeEnd = 10;
var htable_yRangeStart = -10;
var htable_yRangeEnd = 10;
var htable_numStepsX = 200;
var htable_numStepsY = 200;

// Langermann
var langermann_xRangeStart = 0;
var langermann_xRangeEnd = 10;
var langermann_yRangeStart = 0;
var langermann_yRangeEnd = 10;
var langermann_numStepsX = 200;
var langermann_numStepsY = 200;
var langermann_vec_c = [1, 2, 5, 2, 3];
var langermann_mat_A = [[3,5,2,1,7],[5,2,1,4,9]];

// Levy
var levy_xRangeStart = 0;
var levy_xRangeEnd = 10;
var levy_yRangeStart = 0;
var levy_yRangeEnd = 10;
var levy_numStepsX = 200;
var levy_numStepsY = 200;

// Levy 13
var levy13_xRangeStart = 0;
var levy13_xRangeEnd = 10;
var levy13_yRangeStart = 0;
var levy13_yRangeEnd = 10;
var levy13_numStepsX = 200;
var levy13_numStepsY = 200;

// Rastrigin
var rastrigin_xRangeStart = -5;
var rastrigin_xRangeEnd = 5;
var rastrigin_yRangeStart = -5;
var rastrigin_yRangeEnd = 5;
var rastrigin_numStepsX = 200;
var rastrigin_numStepsY = 200;

// Schaffer N2
var schafferN2_xRangeStart = -50;
var schafferN2_xRangeEnd = 50;
var schafferN2_yRangeStart = -50;
var schafferN2_yRangeEnd = 50;
var schafferN2_numStepsX = 200;
var schafferN2_numStepsY = 200;

// Schaffer N4
var schafferN4_xRangeStart = -50;
var schafferN4_xRangeEnd = 50;
var schafferN4_yRangeStart = -50;
var schafferN4_yRangeEnd = 50;
var schafferN4_numStepsX = 200;
var schafferN4_numStepsY = 200;

// Schwefel
var schwefel_xRangeStart = -500;
var schwefel_xRangeEnd = 500;
var schwefel_yRangeStart = -500;
var schwefel_yRangeEnd = 500;
var schwefel_numStepsX = 200;
var schwefel_numStepsY = 200;

// Shubert
var shubert_xRangeStart = -10;
var shubert_xRangeEnd = 10;
var shubert_yRangeStart = -10;
var shubert_yRangeEnd = 10;
var shubert_numStepsX = 200;
var shubert_numStepsY = 200;

//Bohachevsky
var bohachevsky_xRangeStart = -100;
var bohachevsky_xRangeEnd = 100;
var bohachevsky_yRangeStart = -100;
var bohachevsky_yRangeEnd = 100;
var bohachevsky_numStepsX = 200;
var bohachevsky_numStepsY = 200;

//Perm V1
var permV1_xRangeStart = -2;
var permV1_xRangeEnd = 2;
var permV1_yRangeStart = -2;
var permV1_yRangeEnd = 2;
var permV1_numStepsX = 200;
var permV1_numStepsY = 200;
var permV1_b = 10;

//Rot_Hyper_Ellipsoid
var rotHypEllip_xRangeStart = -65.536;
var rotHypEllip_xRangeEnd = 65.536;
var rotHypEllip_yRangeStart = -65.536;
var rotHypEllip_yRangeEnd = 65.536;
var rotHypEllip_numStepsX = 200;
var rotHypEllip_numStepsY = 200;

//Sphere
var sphere_xRangeStart = -5.12;
var sphere_xRangeEnd = 5.12;
var sphere_yRangeStart = -5.12;
var sphere_yRangeEnd = 5.12;
var sphere_numStepsX = 200;
var sphere_numStepsY = 200;

//sumDifPowers
var sumDifPowers_xRangeStart = -1;
var sumDifPowers_xRangeEnd = 1;
var sumDifPowers_yRangeStart = -1;
var sumDifPowers_yRangeEnd = 1;
var sumDifPowers_numStepsX = 200;
var sumDifPowers_numStepsY = 200;

//sumSquares
var sumSquares_xRangeStart = -10;
var sumSquares_xRangeEnd = 10;
var sumSquares_yRangeStart = -10;
var sumSquares_yRangeEnd = 10;
var sumSquares_numStepsX = 200;
var sumSquares_numStepsY = 200;

//trid
var trid_xRangeStart = -4;
var trid_xRangeEnd = 4;
var trid_yRangeStart = -4;
var trid_yRangeEnd = 4;
var trid_numStepsX = 200;
var trid_numStepsY = 200;

//threeHumpCamel
var threeHumpCamel_xRangeStart = -5;
var threeHumpCamel_xRangeEnd = 5;
var threeHumpCamel_yRangeStart = -5;
var threeHumpCamel_yRangeEnd = 5;
var threeHumpCamel_numStepsX = 200;
var threeHumpCamel_numStepsY = 200;
