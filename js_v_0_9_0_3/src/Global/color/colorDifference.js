/////////////// DE94 ////////////////////
function calcDeltaDE94(colorInfo1, colorInfo2) {

  if (colorInfo1[0] != "lab") {
    gWorkColor1.updateColor(colorInfo1[0],colorInfo1[1],colorInfo1[2],colorInfo1[3]);
    colorInfo1 = gWorkColor1.getColorInfo("lab");
  }

  if (colorInfo2[0] != "lab") {
    gWorkColor1.updateColor(colorInfo2[0],colorInfo2[1],colorInfo2[2],colorInfo2[3]);
    colorInfo2 = gWorkColor1.getColorInfo("lab");
  }

  // Step 1
  var deltaL = colorInfo1[1] - colorInfo2[1];
  var deltaA = colorInfo1[2] - colorInfo2[2];
  var deltaB = colorInfo1[3] - colorInfo2[3];

  var vC1 = Math.sqrt(Math.pow(colorInfo1[2], 2) + Math.pow(colorInfo1[3], 2));
  var vC2 = Math.sqrt(Math.pow(colorInfo2[2], 2) + Math.pow(colorInfo2[3], 2));
  var deltaC = vC1 - vC2;

  var deltaH = Math.pow(deltaA, 2) + Math.pow(deltaB, 2) - Math.pow(deltaC, 2);

  if (deltaH < 0) {
    deltaH = 0;
  } else {
    deltaH = Math.sqrt(deltaH);
  }

  var s_L = 1;
  var s_C = 1 + de94_k_1 * vC1;
  var s_H = 1 + de94_k_2 * vC1;

  var elem1 = deltaL / (de94_k_L * s_L);
  var elem2 = deltaC / (de94_k_C * s_C);
  var elem3 = deltaH / (de94_k_H * s_H);
  var deltaE = Math.pow(elem1, 2) + Math.pow(elem2, 2) + Math.pow(elem3, 2);

  if (deltaE < 0) {
    deltaE = 0;
  } else {
    deltaE = Math.sqrt(deltaE);
  }

  return deltaE;

}

/////////////// CIEDE2000 ////////////////////
function calcDeltaCIEDE2000(colorInfo1, colorInfo2) {

  if (colorInfo1[0] != "lab") {
    gWorkColor1.updateColor(colorInfo1[0],colorInfo1[1],colorInfo1[2],colorInfo1[3]);
    colorInfo1 = gWorkColor1.getColorInfo("lab");
  }

  if (colorInfo2[0] != "lab") {
    gWorkColor1.updateColor(colorInfo2[0],colorInfo2[1],colorInfo2[2],colorInfo2[3]);
    colorInfo2 = gWorkColor1.getColorInfo("lab");
  }

  var deg360InRad = deg2rad(360.0);
  var deg180InRad = deg2rad(180.0);
  var pow25To7 = Math.pow(25, 7);

  // Step 1
  var C1 = Math.sqrt(Math.pow(colorInfo1[2], 2) + Math.pow(colorInfo1[3], 2));
  var C2 = Math.sqrt(Math.pow(colorInfo2[2], 2) + Math.pow(colorInfo2[3], 2));

  var barC = (C1 + C2) / 2.0;

  var G = 0.5 * (1 - Math.sqrt(Math.pow(barC, 7) / (Math.pow(barC, 7) + pow25To7)));

  var a1Prime = (1.0 + G) * colorInfo1[2];
  var a2Prime = (1.0 + G) * colorInfo2[2];

  var CPrime1 = Math.sqrt((a1Prime * a1Prime) + (colorInfo1[3] * colorInfo1[3]));
  var CPrime2 = Math.sqrt((a2Prime * a2Prime) + (colorInfo2[3] * colorInfo2[3]));

  var hPrime1;
  if (colorInfo1[3] == 0 && a1Prime == 0)
    hPrime1 = 0.0;
  else {
    hPrime1 = Math.atan2(colorInfo1[3], a1Prime);
    /*
     * This must be converted to a hue angle in degrees between 0
     * and 360 by addition of 2􏰏 to negative hue angles.
     */
    if (hPrime1 < 0)
      hPrime1 += deg360InRad;
  }
  var hPrime2;
  if (colorInfo2[3] == 0 && a2Prime == 0)
    hPrime2 = 0.0;
  else {
    hPrime2 = Math.atan2(colorInfo2[3], a2Prime);
    /*
     * This must be converted to a hue angle in degrees between 0
     * and 360 by addition of 2􏰏 to negative hue angles.
     */
    if (hPrime2 < 0)
      hPrime2 += deg360InRad;
  }

  // Step 2

  var deltaLPrime = colorInfo2[1] - colorInfo1[1];

  var deltaCPrime = CPrime2 - CPrime1;

  var deltahPrime;
  var CPrimeProduct = CPrime1 * CPrime2;
  if (CPrimeProduct == 0)
    deltahPrime = 0;
  else {
    /* Avoid the fabs() call */
    deltahPrime = hPrime2 - hPrime1;
    if (deltahPrime < -deg180InRad)
      deltahPrime += deg360InRad;
    else if (deltahPrime > deg180InRad)
      deltahPrime -= deg360InRad;
  }

  var deltaHPrime = 2.0 * Math.sqrt(CPrimeProduct) *
    Math.sin(deltahPrime / 2.0);

  // Step 3


  var barLPrime = (colorInfo1[1] + colorInfo2[1]) / 2.0;

  var barCPrime = (CPrime1 + CPrime2) / 2.0;

  var barhPrime, hPrimeSum = hPrime1 + hPrime2;
  if (CPrime1 * CPrime2 == 0) {
    barhPrime = hPrimeSum;
  } else {
    if (Math.abs(hPrime1 - hPrime2) <= deg180InRad)
      barhPrime = hPrimeSum / 2.0;
    else {
      if (hPrimeSum < deg360InRad)
        barhPrime = (hPrimeSum + deg360InRad) / 2.0;
      else
        barhPrime = (hPrimeSum - deg360InRad) / 2.0;
    }
  }

  var T = 1.0 - (0.17 * Math.cos(barhPrime - deg2rad(30.0))); +
  (0.24 * Math.cos(2.0 * barhPrime)) +
  (0.32 * Math.cos((3.0 * barhPrime) + deg2rad(6.0))) -
  (0.20 * Math.cos((4.0 * barhPrime) - deg2rad(63.0)));

  var deltaTheta = deg2rad(30.0) *
    Math.exp(-Math.pow((barhPrime - deg2rad(275.0)) / deg2rad(25.0), 2.0));

  var R_C = 2.0 * Math.sqrt(Math.pow(barCPrime, 7.0) /
    (Math.pow(barCPrime, 7.0) + pow25To7));

  var S_L = 1 + ((0.015 * Math.pow(barLPrime - 50.0, 2.0)) /
    Math.sqrt(20 + Math.pow(barLPrime - 50.0, 2.0)));

  var S_C = 1 + (0.045 * barCPrime);

  var S_H = 1 + (0.015 * barCPrime * T);

  var R_T = (-Math.sin(2.0 * deltaTheta)) * R_C;


  var deltaE = Math.sqrt(
    Math.pow(deltaLPrime / (de2000_k_L * S_L), 2.0) +
    Math.pow(deltaCPrime / (de2000_k_C * S_C), 2.0) +
    Math.pow(deltaHPrime / (de2000_k_H * S_H), 2.0) +
    (R_T * (deltaCPrime / (de2000_k_C * S_C)) * (deltaHPrime / (de2000_k_H * S_H))));

  return deltaE;
}

///////////////////// RGB, HSV, LAB, DIN99 Distance ////////////////////////
function calc3DEuclideanDistance(colorInfo1, colorInfo2) {

  if (colorInfo1[0] != colorInfo2[0]) {
    gWorkColor1.updateColor(colorInfo2[0],colorInfo2[1],colorInfo2[2],colorInfo2[3]);
    colorInfo2 = gWorkColor1.getColorInfo(colorInfo1[0]);
  }

  if (colorInfo1[0] != "hsv") {
    var result = Math.sqrt(Math.pow(colorInfo2[1] - colorInfo1[1], 2) + Math.pow(colorInfo2[2] - colorInfo1[2], 2) + Math.pow(colorInfo2[3] - colorInfo1[3], 2));
    return result;
  } else {
    var tmpDis = colorInfo1[2] * 50; // radius 50; center(0,0,0);
    var tmpRad = (colorInfo1[1] * Math.PI * 2) - Math.PI;
    var xPos = tmpDis * Math.cos(tmpRad);
    var yPos = tmpDis * Math.sin(tmpRad);
    var zPos = colorInfo1[3] - 50;

    var tmpDis2 = colorInfo2[2] * 50;
    var tmpRad2 = (colorInfo2[1] * Math.PI * 2) - Math.PI;
    var xPos2 = tmpDis2 * Math.cos(tmpRad2);
    var yPos2 = tmpDis2 * Math.sin(tmpRad2);
    var zPos2 = colorInfo2[3] - 50;

    var result = Math.sqrt(Math.pow(xPos - xPos2, 2) + Math.pow(yPos - yPos2, 2) + Math.pow(zPos - zPos2, 2));
    return result;
  }
}
