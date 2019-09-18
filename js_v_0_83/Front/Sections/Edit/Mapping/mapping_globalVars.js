var histogramColor = "rgb(25, 38, 51)";


var mappingBackgroundColor = new class_Color_RGB(1.0,0,0);

var domainContent;
var fileType=0; // 0=vtk;
var currentFieldIndex = 0;
var currentTimeIndex = 0;


var globalDomain;
var domainFieldColors;

var mappingContainerHeight=50;

var doAutoUpdate = true;
var showMappingAxis = true;
var doParallelProcessing = true;

////////// rendering

var mapping_doAnimation = false;
var mapping_animationID;



var mapping_dorotation = false;
var mapping_doTranslation = false;
var mapping_downXPos =0;
var mapping_downYPos =0;
var mapping_xRotationAngle=0; //Math.PI/2;
var mapping_yRotationAngle=0;

var mapping_xRotationDownAngle=0; //Math.PI/2;
var mapping_yRotationDownAngle=0;

var mapping_Translation_X = 0;
var mapping_Translation_Y = 0;

var currentOriginX=0;
var currentOriginY=0;

var oldXPos=0;
var oldYPos=0;


///////////////////////////////////////
//// VIS

var mapping_scene, mapping_camera, mapping_renderer, mapping_stats;
var mapping_cameraLight;

var mapping_maxRadius = 400;
var mapping_minRadius = 10;
var mapping_zoomFactor = 20;

var coordinateArrowsGroup;
var mappingMesh;

// mapping material arrays
var mapping_MaterialPositions;
var mapping_MaterialColors;
var mapping_MaterialNormals;
