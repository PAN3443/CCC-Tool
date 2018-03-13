////////////////////////////////////////////////
// ------------ Class Colormap and CMS ---------------//
////////////////////////////////////////////////


class classColormap {

    constructor(colorspace) {
    this.name = "Custom Colormap";
    this.colorspace = colorspace;
    this.ref = [];
    this.color = [];
    this.type = [];
    this.IntervalIndex=[];
    this.kE=1;
    this.kCH=1;
  }

  getColormapLength(){
    return this.ref.length;
  }

  getRef(index){
    return this.ref[index];
  }

  getRefNum(){ // exept the double of left and dual keys

    var counter = 0;

    var leftOrTwinStarted = false;

    for(var i=0; i<this.type.length; i++){


      if(this.type[i]=="left key" || this.type[i]=="interval left key" || this.type[i]=="twin key" ||  this.type[i]=="interval twin key"){
        if(leftOrTwinStarted){
          leftOrTwinStarted=false;
        }
        else{
          leftOrTwinStarted=true;
          counter++;
        }
      }
      else{
        counter++;
      }



    }

    return counter;

  }

  getColor(index, colorspace){

    if(this.color[index].getColorType()===colorspace)
    return this.color[index];
    else{

      switch(colorspace){
          case "rgb":;
              return this.color[index].calcRGBColor();
          break;
          case "hsv":
              return this.color[index].calcHSVColor();
          break;
          case "lab":
              return this.color[index].calcLABColor();
          break;
          case "din99":
              return this.color[index].calcDIN99Color(this.kE,this.kCH);
          break;
          default:
          console.log("Error at the getColor function");
      }

    }
  }

  getType(index){
    return this.type[index];
  }

  getName(){
    return this.name;
  }

  setName(name){
    this.name=name;
  }

  addElement(color, ref, type){

    if(type==="interval" || type==="interval nil key" || type==="interval twin key" || type==="interval left key" || type==="interval right key"){
      this.IntervalIndex.push(this.color.length);
    }

    this.ref.push(ref);
    this.color.push(color);
    this.type.push(type);

  }

  getIntervalLength(){

    /*for(var i = 0; i < this.IntervalIndex.length; i++) {
      console.log(this.type[this.IntervalIndex[i]]);
      console.log(this.ref[this.IntervalIndex[i]]);
      console.log("");
    }*/

    return this.IntervalIndex.length;
  }

  getIntervalColor(index, colorspace){
    if(this.color[this.IntervalIndex[index]].getColorType()===colorspace)
    return this.color[this.IntervalIndex[index]];
    else{

      switch(colorspace){
          case "rgb":;
              return this.color[this.IntervalIndex[index]].calcRGBColor();
          break;
          case "hsv":
              return this.color[this.IntervalIndex[index]].calcHSVColor();
          break;
          case "lab":
              return this.color[this.IntervalIndex[index]].calcLABColor();
          break;
          case "din99":
              return this.color[this.IntervalIndex[index]].calcDIN99Color(this.kE,this.kCH);
          break;
          default:
          console.log("Error at the getColor function");
      }

    }
  }

  getIntervalRef(index){
    return this.ref[this.IntervalIndex[index]];
  }

  calcDeltaE_Interval_DIN99(index1, index2){
      return this.calc3DEuclideanDistance(this.getIntervalColor(index1, "din99"),this.getIntervalColor(index2, "din99"));
  }

  calcDeltaE_Interval_Lab(index1, index2){
      return this.calc3DEuclideanDistance(this.getIntervalColor(index1, "lab"),this.getIntervalColor(index2, "lab"));
  }

  calcDeltaE_Interval_De2000(index1, index2){
      return this.calcDeltaCIEDE2000(this.getIntervalColor(index1, "lab"),this.getIntervalColor(index2, "lab"));
  }

  calcDeltaE_Interval_De94(index1, index2){

    /*if(index1==0 && index2==this.getIntervalLength()-1){
      console.log(this.getIntervalColor(index1, "lab").get1Value()+" "+this.getIntervalColor(index2, "lab").get1Value());
      console.log(this.getIntervalColor(index1, "lab").get2Value()+" "+this.getIntervalColor(index2, "lab").get2Value());
      console.log(this.getIntervalColor(index1, "lab").get3Value()+" "+this.getIntervalColor(index2, "lab").get3Value());
      console.log("");
    }


    if(index1==this.getIntervalLength()-1 && index2==0){
    console.log(this.getIntervalColor(index1, "lab").get1Value()+" "+this.getIntervalColor(index2, "lab").get1Value());
    console.log(this.getIntervalColor(index1, "lab").get2Value()+" "+this.getIntervalColor(index2, "lab").get2Value());
    console.log(this.getIntervalColor(index1, "lab").get3Value()+" "+this.getIntervalColor(index2, "lab").get3Value());
    console.log("");
  }*/

      return this.calcDeltaDE94(this.getIntervalColor(index1, "lab"),this.getIntervalColor(index2, "lab"));


  }

  clear(){
    this.ref = [];
    this.color = [];
    this.type = [];
    this.IntervalIndex=[];
  }


  /////////////// DE94 ////////////////////
  calcDeltaDE94(color1,color2){

            var k_L = 1.0, k_C = 1.0, k_H = 1.0; // K_l = 1 default, = 2 textiles
            var k_1 = 0.045, k_2 = 0.015; // K1: 0.045 graphic arts  0.048 textiles  K2: 0.015 graphic arts 0.014 textiles

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
            var s_C =1+k_1*vC1;
            var s_H =1+k_2*vC1;

            var elem1 = deltaL/(k_L*s_L);
            var elem2 = deltaC/(k_C*s_C);
            var elem3 = deltaH/(k_H*s_H);
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
  calcDeltaCIEDE2000(color1,color2){
            var k_L = 1.0, k_C = 1.0, k_H = 1.0;
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
                Math.pow(deltaLPrime / (k_L * S_L), 2.0) +
                Math.pow(deltaCPrime / (k_C * S_C), 2.0) +
                Math.pow(deltaHPrime / (k_H * S_H), 2.0) +
                (R_T * (deltaCPrime / (k_C * S_C)) * (deltaHPrime / (k_H * S_H))));

            return deltaE;

    }

    ///////////////////// RGB, HSV, LAB, DIN99 Distance ////////////////////////
    calc3DEuclideanDistance(color1,color2){
    return Math.sqrt( Math.pow(color1.get1Value()-color2.get1Value(),2) + Math.pow(color1.get2Value()-color2.get2Value(),2) + Math.pow(color1.get3Value()-color2.get3Value(),2));
    }
}
