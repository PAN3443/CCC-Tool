/////////////// DE94 ////////////////////
function calcDeltaDE94(color1,color2){

          if(color1.getColorType()!="lab")
          color1=color1.calcLABColor();

          if(color2.getColorType()!="lab")
          color2=color2.calcLABColor();

          // Step 1
          var deltaL = color1.getLValue()-color2.getLValue();
          var deltaA = color1.getAValue()-color2.getAValue();
          var deltaB = color1.getBValue()-color2.getBValue();


          var vC1 = Math.sqrt(Math.pow(color1.getAValue(), 2) + Math.pow(color1.getBValue(), 2));
          var vC2 = Math.sqrt(Math.pow(color2.getAValue(), 2) + Math.pow(color2.getBValue(), 2));
          var deltaC = vC1 - vC2;

          var deltaH = Math.pow(deltaA, 2) + Math.pow(deltaB, 2) - Math.pow(deltaC, 2);

          if(deltaH<0){
            deltaH = 0;
          }
          else{
            deltaH = Math.sqrt(deltaH);
          }

          var s_L =1;
          var s_C =1+de94_k_1*vC1;
          var s_H =1+de94_k_2*vC1;

          var elem1 = deltaL/(de94_k_L*s_L);
          var elem2 = deltaC/(de94_k_C*s_C);
          var elem3 = deltaH/(de94_k_H*s_H);
          var deltaE =  Math.pow(elem1, 2) + Math.pow(elem2, 2) + Math.pow(elem3, 2);

          if(deltaE<0){
            deltaE = 0;
          }
          else{
            deltaE = Math.sqrt(deltaE);
          }

          return deltaE;

  }

/////////////// CIEDE2000 ////////////////////
function calcDeltaCIEDE2000(color1,color2){

          var deg360InRad = deg2rad(360.0);
          var deg180InRad = deg2rad(180.0);
          var pow25To7 = Math.pow(25, 7);

          // Step 1
          var C1 = Math.sqrt(Math.pow(color1.getAValue(), 2) + Math.pow(color1.getBValue(), 2));
          var C2 = Math.sqrt(Math.pow(color2.getAValue(), 2) + Math.pow(color2.getBValue(), 2));

          var barC = (C1 + C2) / 2.0;

          var G = 0.5 * (1 - Math.sqrt(Math.pow(barC, 7) / (Math.pow(barC, 7) + pow25To7)));

          var a1Prime = (1.0 + G) * color1.getAValue();
          var a2Prime = (1.0 + G) * color2.getAValue();

          var CPrime1 = Math.sqrt((a1Prime * a1Prime) + (color1.getBValue() * color1.getBValue()));
          var CPrime2 = Math.sqrt((a2Prime * a2Prime) + (color2.getBValue() * color2.getBValue()));

          var hPrime1;
          if (color1.getBValue() == 0 && a1Prime == 0)
              hPrime1 = 0.0;
          else {
              hPrime1 = Math.atan2(color1.getBValue(), a1Prime);
              /*
              * This must be converted to a hue angle in degrees between 0
              * and 360 by addition of 2􏰏 to negative hue angles.
              */
              if (hPrime1 < 0)
                  hPrime1 += deg360InRad;
          }
          var hPrime2;
          if (color2.getBValue() == 0 && a2Prime == 0)
              hPrime2 = 0.0;
          else {
              hPrime2 = Math.atan2(color2.getBValue(), a2Prime);
              /*
              * This must be converted to a hue angle in degrees between 0
              * and 360 by addition of 2􏰏 to negative hue angles.
              */
              if (hPrime2 < 0)
                  hPrime2 += deg360InRad;
          }

          // Step 2

          var deltaLPrime = color2.getLValue() - color1.getLValue();

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


          var barLPrime = (color1.getLValue() + color2.getLValue()) / 2.0;

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
function calc3DEuclideanDistance(color1,color2){

  var typ1 = color1.getColorType();
  var typ2 = color2.getColorType();

  if(typ1!=typ2){
    switch (typ1) {
      case "rgb":
        color2=color2.calcRGBColor();
        break;
        case "hsv":
          color2=color2.calcHSVColor();
          break;
          case "lab":
            color2=color2.calcLABColor();
            break;
            case "din99":
              color2=color2.calcDIN99Color();
              break;
      default:
      console.log("Error: function calc3DEuclideanDistance");
      return undefined;
    }
  }

  if(typ1!="hsv")
    return Math.sqrt( Math.pow(color1.get1Value()-color2.get1Value(),2) + Math.pow(color1.get2Value()-color2.get2Value(),2) + Math.pow(color1.get3Value()-color2.get3Value(),2));
  else{
      var tmpDis = color1.getSValue()*50; // radius 50; center(0,0,0);
      var tmpRad = (color1.getHValue()*Math.PI*2)-Math.PI;
      var xPos = tmpDis*Math.cos(tmpRad);
      var yPos = tmpDis*Math.sin(tmpRad);
      var zPos = color1.getVValue()-50;

      var tmpDis2 = color2.getSValue()*50;
      var tmpRad2 = (color2.getHValue()*Math.PI*2)-Math.PI;
      var xPos2 = tmpDis2*Math.cos(tmpRad2);
      var yPos2 = tmpDis2*Math.sin(tmpRad2);
      var zPos2 = color2.getVValue()-50;

      return Math.sqrt( Math.pow(xPos-xPos2,2) + Math.pow(yPos-yPos2,2) + Math.pow(zPos-zPos2,2));
  }
}
