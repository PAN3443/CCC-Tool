
var somethingChanged = false;

var colormapProcess = [];
var processPosition = -1;
var processLimitation = 20;

// mouseposition
var mousePosX;
var mousePosY;

var timer2DAnimation;
var animationInterval = 1000/30;

// key moving vars
var grappedKey = false;
var overKeyID = -1;
var mouseKeyChangeUp = false;

var colorpickerAffectID="";
var colorpickerType = "RG_B";
var colorpickerColor = new classColor_RGB(1,1,1);
var customConstBandColor = new classColor_RGB(0.5,0.5,0.5);
var customScaleBandColor1 = new classColor_RGB(1.0,1.0,1.0);
var customScaleBandColor2 = new classColor_RGB(0.0,0.0,0.0);
