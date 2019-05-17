var selectedRealWorldType = undefined;

var realWorldCanvasIndex = 0;

var medicalLabels = ["CT Head","MR Brain","Thermography","Mammography",];
var medicalFiles = ["cthead-8bit061.png","mrbrain-8bit038.png","thermography.png","M0279.LEFT_MLO.2017-05-04.00.png",];
var medicalData = new Array(medicalFiles.length);
var medicalAcknowlegments = [0,0,1,1];


var scientificMeasurmentsLabels = [];
var scientificMeasurmentsFiles = [];
var scientificMeasurmentsData = new Array(scientificMeasurmentsFiles.length);
var scientificMeasurmentsAcknowlegments = [];

var scientificFlowSimLabels = ["Karman Street","FTLE","Asteroid V02 SciVis Contest 18"];
var scientificFlowSimFiles = ["karmanStreet.png","ftle_new.png","asteroid_v02.png"];
var scientificFlowSimData = new Array(scientificFlowSimFiles.length);
var scientificFlowSimAcknowlegments = [undefined,undefined,4];

var statisticalDataLabels = [];
var statisticalDataFiles = [];
var statisticalDataData = new Array(statisticalDataFiles.length);
var statisticalDataAcknowlegments = [];

var photographsLabels = ["ThermalPedestrain","Flir_ADAS","Lenna"];
var photographsFiles = ["img_00029.png","FLIR_02674.png","lena_grey.png"];
var photographsData = new Array(photographsFiles.length);
var photographsAcknowlegments = [2,3,5];


var acknowlegments = ["The Stanford volume data archive",
"DMR - Database For Mastology Research",
"FLIR Thermal Dataset for Algorithm Training",
"OTCBVS Benchmark Dataset Collection",
"SciVis Contest 2018",
"Playboy"
];




var acknowlegmentsURL = ["https://graphics.stanford.edu/data/voldata/",
"http://visual.ic.uff.br/dmi/prontuario/home.php",
"https://www.flir.co.uk/oem/adas/adas-dataset-form/",
"http://vcipl-okstate.org/pbvs/bench/",
"https://sciviscontest2018.org/",
"https://www.playboy.com/"
];


var acknowlegmentsAdditional = [undefined,
"The Database For Mastology Research (DMR) is an online platform with mastologic images for early detection of breast cancer.",
"The FLIR starter thermal dataset is intended for the training of convolutional neural networks.",
"This image comes from OSU Thermal Pedestrian Database. The topic of interest is the person detection in thermal imagery.",
"This data set comes from the SciVis contest 2018 and includes the simulation data of asteroid impacts in deep ocean water.",
"Lenna is a test image often used in the computer science of image processing. The image is popular because of its different areas of multifarious detail degree."
];
