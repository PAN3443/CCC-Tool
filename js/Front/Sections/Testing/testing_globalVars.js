/////////////////////////////////////////////////
//////  Testing Global Vars
var testingModus = 0;

var testingType = 0;

var testingFieldResolution = 5; // ~ 2 million pixels for realistic

var current_yFktType = 0;
var current_xFktType = 0;
///////////////////////////////////////////
///// Fields

var allFieldsFinished;

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

var cccTest_NewJump_Options = [];
var cccTest_Jumps_Options = [
  [true,[0.25,0.75]],
  [true,[0.25,0.75,1.0]],
  [true,[0.0,0.25,0.75,1.0]],
  [true,[0.0,0.2,0.4,0.6,0.8,1.0]]
];
var cccTest_Jumps_Files = [
  ["img/TestFunctions/CCCTest/Jump/jumps_1.png","J = {25%,75%}"],
  ["img/TestFunctions/CCCTest/Jump/jumps_2.png","J = {25%,75%,100%}"],
  ["img/TestFunctions/CCCTest/Jump/jumps_3.png","J = {0%,25%,75%,100%}"],
  ["img/TestFunctions/CCCTest/Jump/jumps_4.png","J = {0%,20%,40%,60%,80%,100%}"]
];

var cccTest_NewGradient_Options = [];
var cccTest_Gradient_Options = [
  [true,0,1,0,2,0,2,101,100],
  [true,0,1,1,2,1,2,101,100],
  [true,0,1,2,2,2,2,101,100]
];
var cccTest_Gradient_Files = [
  ["img/TestFunctions/CCCTest/Gradient/gradient_1_linear.png","Gradient Linear"],
  ["img/TestFunctions/CCCTest/Gradient/gradient_2_convex.png","Gradient Convex"],
  ["img/TestFunctions/CCCTest/Gradient/gradient_3_concave.png","Gradient Concave"]
];

var cccTest_NewRidgeValley_Options = [];
var cccTest_RidgeValleyLine_Options = [  // m,M,type
  [true,0.0,1.0,0,0,0,0,101,101],
  [true,0.0,1.0,0,0,1,2,101,101],
  [true,0.0,1.0,0,0,2,2,101,101],
  [true,0.0,1.0,1,2,0,0,101,101],
  [true,0.0,1.0,1,2,1,2,101,101],
  [true,0.0,1.0,1,2,2,2,101,101],
  [true,0.0,1.0,2,2,0,0,101,101],
  [true,0.0,1.0,2,2,1,2,101,101],
  [true,0.0,1.0,2,2,2,2,101,101],
  [true,1.0,0.0,0,0,0,0,101,101],
  [true,1.0,0.0,0,0,1,2,101,101],
  [true,1.0,0.0,0,0,2,2,101,101],
  [true,1.0,0.0,1,2,0,0,101,101],
  [true,1.0,0.0,1,2,1,2,101,101],
  [true,1.0,0.0,1,2,2,2,101,101],
  [true,1.0,0.0,2,2,0,0,101,101],
  [true,1.0,0.0,2,2,1,2,101,101],
  [true,1.0,0.0,2,2,2,2,101,101]
];

var cccTest_RidgeValley_Files = [
  ["img/TestFunctions/CCCTest/RidgeValley/ridge_1_linear_linear.png","Ridge Linear:Linear"],
  ["img/TestFunctions/CCCTest/RidgeValley/ridge_2_linear_convex.png","Ridge Linear:Convex"],
  ["img/TestFunctions/CCCTest/RidgeValley/ridge_3_linear_concave.png","Ridge Linear:Concave"],
  ["img/TestFunctions/CCCTest/RidgeValley/ridge_4_convex_linear.png","Ridge Convex:Linear"],
  ["img/TestFunctions/CCCTest/RidgeValley/ridge_5_convex_convex.png","Ridge Convex:Convex"],
  ["img/TestFunctions/CCCTest/RidgeValley/ridge_6_convex_concave.png","Ridge Convex:Concave"],
  ["img/TestFunctions/CCCTest/RidgeValley/ridge_7_concave_linear.png","Ridge Concave:Linear"],
  ["img/TestFunctions/CCCTest/RidgeValley/ridge_8_concave_convex.png","Ridge Concave:Convex"],
  ["img/TestFunctions/CCCTest/RidgeValley/ridge_9_concave_concave.png","Ridge Concave:Concave"],
  ["img/TestFunctions/CCCTest/RidgeValley/valley_1_linear_linear.png","Valley Linear:Linear"],
  ["img/TestFunctions/CCCTest/RidgeValley/valley_2_linear_convex.png","Valley Linear:Convex"],
  ["img/TestFunctions/CCCTest/RidgeValley/valley_3_linear_concave.png","Valley Linear:Concave"],
  ["img/TestFunctions/CCCTest/RidgeValley/valley_4_convex_linear.png","Valley Convex:Linear"],
  ["img/TestFunctions/CCCTest/RidgeValley/valley_5_convex_convex.png","Valley Convex:Convex"],
  ["img/TestFunctions/CCCTest/RidgeValley/valley_6_convex_concave.png","Valley Convex:Concave"],
  ["img/TestFunctions/CCCTest/RidgeValley/valley_7_concave_linear.png","Valley Concave:Linear"],
  ["img/TestFunctions/CCCTest/RidgeValley/valley_8_concave_convex.png","Valley Concave:Convex"],
  ["img/TestFunctions/CCCTest/RidgeValley/valley_9_concave_concave.png","Valley Concave:Concave"]
];

var cccTest_NewLocalExtrema_Options = [];
var cccTest_LocalExtrema_Options = [
  //[a,b,m,stepX,#stepsX,stepY,#stepsY,autoScale],
  [1,1,0,true,101,101],
  [-1,-1,0,true,101,101],
  [-1,1,0,true,101,101],
  [1,-1,0,true,101,101],
];



var cccTest_NewFrequency_Options = [];
var cccTest_Frequency_Options = [

  [true,true,1,4,0.0,1.0],
  [true,false,1,4,0.0,1.0],
  [true,true,1,6,0.0,1.0],
  [true,true,2,4,0.0,1.0],
  [true,true,3,4,0.0,1.0]

];

var cccTest_NewLittleBit_Options = [];
var cccTest_LittleBit_Options = [
  [true,0.0001,0.001,10],
  [true,0.0001,0.005,10],
  [true,0.0001,0.01,10],
  [true,0.0001,0.05,10],
  [true,0.0001,0.1,10]
];

var cccTest_NewTreshold_Options = [];
var cccTest_Treshold_Options = [
  [true,0,2,0.0,0.25,0.5,101,101],
  [true,1,2,0.0,0.25,0.5,101,101],
  [true,1,3,0.0,0.25,0.5,101,101],
  [true,2,2,0.0,0.25,0.5,101,101],
  [true,2,3,0.0,0.25,0.5,101,101],
  [true,0,2,0.0,0.5,1.0,101,101],
  [true,1,2,0.0,0.5,1.0,101,101],
  [true,1,3,0.0,0.5,1.0,101,101],
  [true,2,2,0.0,0.5,1.0,101,101],
  [true,2,3,0.0,0.5,1.0,101,101],
  [true,0,2,0.5,0.75,1.0,101,101],
  [true,1,2,0.5,0.75,1.0,101,101],
  [true,1,3,0.5,0.75,1.0,101,101],
  [true,2,2,0.5,0.75,1.0,101,101],
  [true,2,3,0.5,0.75,1.0,101,101]

];




///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////
/// User Test Options

var userTest_LocalMin_Options = [
["Ackley Function","Ackley","img/TestFunctions/FunctionCollection/LocalMinimum/Ackley.png"],
["Bukin Function N. 6","Bukin_N6","img/TestFunctions/FunctionCollection/LocalMinimum/Bukin_N6.png"],
["Cross-in-Tray Function","Cross-in-Tray","img/TestFunctions/FunctionCollection/LocalMinimum/Cross_in_Tray.png"],
["Drop-Wave Function","Drop-Wave","img/TestFunctions/FunctionCollection/LocalMinimum/Drop_Wave.png"],
["Eggholder Function","Eggholder","img/TestFunctions/FunctionCollection/LocalMinimum/Eggholder.png"],
["Griewank Function","Griewank","img/TestFunctions/FunctionCollection/LocalMinimum/Griewank.png"],
["Holder Table Function","HolderTable","img/TestFunctions/FunctionCollection/LocalMinimum/HolderTable.png"],
["Langermann Function","Langermann","img/TestFunctions/FunctionCollection/LocalMinimum/Langermann.png"],
["Levy Function","Levy","img/TestFunctions/FunctionCollection/LocalMinimum/Levy.png"],
["Levy Function N. 13","Levy_N13","img/TestFunctions/FunctionCollection/LocalMinimum/Levy_N13.png"],
["Rastrigin Function","Rastrigin","img/TestFunctions/FunctionCollection/LocalMinimum/Rastrigin.png"],
["Schaffer Function N. 2","Schaffer_N2","img/TestFunctions/FunctionCollection/LocalMinimum/Schaffer_N2.png"],
["Schaffer Function N. 4","Schaffer_N4","img/TestFunctions/FunctionCollection/LocalMinimum/Schaffer_N4.png"],
["Schwefel Function","Schwefel","img/TestFunctions/FunctionCollection/LocalMinimum/Schwefel.png"],
["Shubert Function","Shubert","img/TestFunctions/FunctionCollection/LocalMinimum/Shubert.png"]
];


 var userTest_BowlShaped_Options =[
   ["Bohachevsky Function ","Bohachevsky_F1"],
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
