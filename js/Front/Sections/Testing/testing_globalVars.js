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

var redrawTest = true;
var redrawCollection = true;

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

var cccTest_NewGradient_Options = [];
var cccTest_Gradient_Options = [
  [true,0,1,0,2,0,2,101,100],
  [true,0,1,1,2,1,2,101,100],
  [true,0,1,2,2,2,2,101,100],
  [true,1,0,0,2,0,2,101,100],
  [true,1,0,1,2,1,2,101,100],
  [true,1,0,2,2,2,2,101,100]
];


var cccTest_NewRidgeValley_Options = [];
var cccTest_RidgeValleyLine_Options = [  // m,M,type
  [true,0.0,1.0,0,2,0,2,101,101],
  [true,0.0,1.0,0,2,1,2,101,101],
  [true,0.0,1.0,0,2,2,2,101,101],
  [true,0.0,1.0,1,2,0,2,101,101],
  [true,0.0,1.0,1,2,1,2,101,101],
  [true,0.0,1.0,1,2,2,2,101,101],
  [true,0.0,1.0,2,2,0,2,101,101],
  [true,0.0,1.0,2,2,1,2,101,101],
  [true,0.0,1.0,2,2,2,2,101,101]/*,
  [true,1.0,0.0,0,2,0,2,101,101],
  [true,1.0,0.0,0,2,1,2,101,101],
  [true,1.0,0.0,0,2,2,2,101,101],
  [true,1.0,0.0,1,2,0,2,101,101],
  [true,1.0,0.0,1,2,1,2,101,101],
  [true,1.0,0.0,1,2,2,2,101,101],
  [true,1.0,0.0,2,2,0,2,101,101],
  [true,1.0,0.0,2,2,1,2,101,101],
  [true,1.0,0.0,2,2,2,2,101,101]*/
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
  [true,true,1,0,0.0,1.0,100,100],
  [true,false,1,1,0.0,1.0,100,100],
  [true,true,1,2,0.0,1.0,100,100],
  [true,true,1,4,0.0,1.0,100,100],
  [true,true,1,8,0.0,1.0,100,100]
];

var littleBit_NumberOfSinks = 10;
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
  [true,0,2,0.0,0.5,1.0,101,101],
  [true,1,2,0.0,0.5,1.0,101,101],
  [true,2,2,0.0,0.5,1.0,101,101]
];


var topologyField;
var cccTest_NewTopology_Options = [true,
[0,0.5],
[true,1,2,0.0,0.5,1.0,101,101]];

var cccTest_NewTopologyFoundation_Defaults =
[[0,0.5],
 [1,0.0,1.0,0.0,2.0,0.0,2.0],
 [2,0.0,1.0,0.0,2.0,0.0,2.0],
 [3,1,-1,0]
];

var cccTest_Topology_Options = [
1,1
];


///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////
/// User Test Options
var fctTest_NewLocalMin_Options = [];
var fctTest_LocalMin_Options = [
["Ackley Function","Ackley",[-32.768,32.768,-32.768,32.768],100,100,20,0.2,Math.PI*2],// a,b,c
["Bukin Function N. 6","Bukin_N6",[-15,-5,-3,3],100,100],
["Cross-in-Tray Function","Cross-in-Tray",[-10,10,-10,10],100,100],
["Drop-Wave Function","Drop-Wave",[-5,5,-5,5],100,100],
["Eggholder Function","Eggholder",[-512,512,-512,512],100,100],
["Griewank Function","Griewank",[-100,100,-100,100],100,100],
["Holder Table Function","HolderTable",[-10,10,-10,10],100,100],
["Langermann Function","Langermann",[0,10,0,10],100,100,[1, 2, 5, 2, 3],[[3,5,2,1,7],[5,2,1,4,9]]],  // vec_c,mat_A
["Levy Function","Levy",[0,10,0,10],100,100],
["Levy Function N. 13","Levy_N13",[0,10,0,10],100,100],
["Rastrigin Function","Rastrigin",[-5,5,-5,5],100,100],
["Schaffer Function N. 2","Schaffer_N2",[-50,50,-50,50],100,100],
["Schaffer Function N. 4","Schaffer_N4",[-50,50,-50,50],100,100],
["Schwefel Function","Schwefel",[-500,500,-500,500],100,100],
["Shubert Function","Shubert",[-10,10,-10,10],100,100]
];

var fctTest_NewBowlShaped_Options = [];
 var fctTest_BowlShaped_Options =[
   ["Bohachevsky Function ","Bohachevsky_F1",[-100,100,-100,100],100,100],
   ["Perm Function 0, d, β","Perm_V1",[-2,2,-2,2],100,100,10], // b
   ["Rotated Hyper-Ellipsoid Function","Rot_Hyper_Ellipsoid",[-65.536,65.536,-65.536,65.536],100,100],
   ["Sphere Function","Sphere",[-5.12,5.12,-5.12,5.12],100,100],
   ["Sum of Different Powers Function","SumDifPowers",[-1,1,-1,1],100,100],
   ["Sum Squares Function","Sum_Squares",[-10,10,-10,10],100,100],
   ["Trid Function","Trid",[-4,4,-4,4],100,100]
 ];

var fctTest_NewValleyShaped_Options = [];
 var fctTest_ValleyShaped_Options =[
   ["Three-Hump Camel Function","Three_Hump_Camel",[-5,5,-5,5],100,100]
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
