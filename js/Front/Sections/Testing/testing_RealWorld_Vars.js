var selectedRealWorldType = undefined;



var bioLabels = [];
var bioFiles = [];
var bioData = new Array(bioFiles.length);

var medicalLabels = ["CT Head","MR Brain","Thermography","Mammography",];
var medicalFiles = ["cthead-8bit061.png","mrbrain-8bit038.png","thermography.png","M0279.LEFT_MLO.2017-05-04.00.png",];
var medicalData = new Array(medicalFiles.length);

var otherLabels = ["Karman Street","FTLE","ThermalPedestrain","Flir_ADAS"];
var otherFiles = ["karmanStreet.png","ftle.png","img_00029.png","FLIR_02674.png"];
var otherData = new Array(otherFiles.length);
