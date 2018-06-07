

var globalDomain;


////////// rendering

var mapping_doingAnimation = false;
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

var oldXPos=0;
var oldYPos=0;



///////////////////////////////////////
//// VIS

var mapping_scene, mapping_camera, mapping_renderer, mapping_stats;

var mapping_cameraLight;

var mapping_maxRadius = 400;
var mapping_radius = 200;
var mapping_minRadius = 10;
var mapping_zoomFactor = 20;

var coordinateArrowsGroup, mappingGroup;



// mapping material arrays
var mapping_MaterialPositions;
var mapping_MaterialColors;
var mapping_MaterialNormals;
