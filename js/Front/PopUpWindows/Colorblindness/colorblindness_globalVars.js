////////////////////////// http://ixora.io/projects/colorblindness/color-blindness-simulation-research/

var colorblindnessType = 0; // 0=sim_Protanopia, 1=sim_Deuteranopia, 2=sim_Tritanopes, 3=sim_BlueConeMonochromatism, 4=sim_Achromatopsia sim_Custom
// simulate ColorBlindness
var doColorblindnessSim = false;


var degreeOFColorblindness = 1.0;
var sim_AdaptiveColorblindness = [
  [0, 1.05118294, -0.05116099],
  [0, 1, 0],
  [0, 0, 1]
];

//////////////////////////////////////////////////////////////
/// from User
///////////////////////////////////////////////////////////////
var sim_Custom = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
];
