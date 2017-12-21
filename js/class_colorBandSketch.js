

class classBandSketch{
    constructor() {
      this.colormapBandSketchC1 = [];
      this.colormapBandSketchC2 = [];
      this.colormapBandSketchR1 = [];
      this.colormapBandSketchR2 = [];
      this.kE=1;
      this.kCH=1;

      this.distanceLAB = [];
      this.distanceDIN99 = [];
      this.distanceCIEDE2000 = [];
      this.distanceDE94 = [];
      this.distanceRGB = [];
      this.distanceHSV = [];
      this.distanceRef = [];
      this.distanceSumRef = 0;
      this.distanceSumCIEDE2000 = 0;
      this.distanceSumRGB = 0;
      this.distanceSumHSV = 0;
      this.distanceSumLAB = 0;
      this.distanceSumDE94 = 0;
      this.distanceSumDIN99 = 0;

      this.numConstantBands = 0;
  }

  setC1(colorC1, index){

    var colorType = colorC1.getColorType();
    var tmpArray = [];
    switch (colorType) {
      case "rgb":
          this.colormapBandSketchC1[index][0] = colorC1;
          this.colormapBandSketchC1[index][1] = colorC1.calcHSVColor();
          this.colormapBandSketchC1[index][2] = colorC1.calcLABColor();
          this.colormapBandSketchC1[index][3] = colorC1.calcDIN99Color(this.kE,this.kCH);
        break;
      case "hsv":
          this.colormapBandSketchC1[index][0] = colorC1.calcRGBColor();
          this.colormapBandSketchC1[index][1] = colorC1;
          this.colormapBandSketchC1[index][2] = colorC1.calcLABColor();
          this.colormapBandSketchC1[index][3] = colorC1.calcDIN99Color(this.kE,this.kCH);
        break;
      case "lab":
          this.colormapBandSketchC1[index][0] = colorC1.calcRGBColor();
          this.colormapBandSketchC1[index][1] = colorC1.calcHSVColor();
          this.colormapBandSketchC1[index][2] = colorC1;
          this.colormapBandSketchC1[index][3] = colorC1.calcDIN99Color(this.kE,this.kCH);
        break;
      case "din99":
          this.colormapBandSketchC1[index][0] = colorC1.calcRGBColor();
          this.colormapBandSketchC1[index][1] = colorC1.calcHSVColor();
          this.colormapBandSketchC1[index][2] = colorC1.calcLABColor();
          this.colormapBandSketchC1[index][3] = colorC1;
        break;
      default:

    }
  }

  setC2(colorC2, index){

    var colorType = colorC2.getColorType();
    var tmpArray = [];
    switch (colorType) {
      case "rgb":
          this.colormapBandSketchC2[index][0] = colorC2;
          this.colormapBandSketchC2[index][1] = colorC2.calcHSVColor();
          this.colormapBandSketchC2[index][2] = colorC2.calcLABColor();
          this.colormapBandSketchC2[index][3] = colorC2.calcDIN99Color(this.kE,this.kCH);
        break;
      case "hsv":
          this.colormapBandSketchC2[index][0] = colorC2.calcRGBColor();
          this.colormapBandSketchC2[index][1] = colorC2;
          this.colormapBandSketchC2[index][2] = colorC2.calcLABColor();
          this.colormapBandSketchC2[index][3] = colorC2.calcDIN99Color(this.kE,this.kCH);
        break;
      case "lab":
          this.colormapBandSketchC2[index][0] = colorC2.calcRGBColor();
          this.colormapBandSketchC2[index][1] = colorC2.calcHSVColor();
          this.colormapBandSketchC2[index][2] = colorC2;
          this.colormapBandSketchC2[index][3] = colorC2.calcDIN99Color(this.kE,this.kCH);
        break;
      case "din99":
          this.colormapBandSketchC2[index][0] = colorC2.calcRGBColor();
          this.colormapBandSketchC2[index][1] = colorC2.calcHSVColor();
          this.colormapBandSketchC2[index][2] = colorC2.calcLABColor();
          this.colormapBandSketchC2[index][3] = colorC2;
        break;
      default:
    }
  }

  pushBand(colorC1, colorC2, refR1, refR2){

    var colorType = colorC1.getColorType();
    var tmpArray = [];
    switch (colorType) {
      case "rgb":
          tmpArray.push(colorC1);
          tmpArray.push(colorC1.calcHSVColor());
          tmpArray.push(colorC1.calcLABColor());
          tmpArray.push(colorC1.calcDIN99Color(this.kE,this.kCH));
        break;
      case "hsv":
          tmpArray.push(colorC1.calcRGBColor());
          tmpArray.push(colorC1);
          tmpArray.push(colorC1.calcLABColor());
          tmpArray.push(colorC1.calcDIN99Color(this.kE,this.kCH));
        break;
      case "lab":
          tmpArray.push(colorC1.calcRGBColor());
          tmpArray.push(colorC1.calcHSVColor());
          tmpArray.push(colorC1);
          tmpArray.push(colorC1.calcDIN99Color(this.kE,this.kCH));
        break;
      case "din99":
          tmpArray.push(colorC1.calcRGBColor());
          tmpArray.push(colorC1.calcHSVColor());
          tmpArray.push(colorC1.calcLABColor());
          tmpArray.push(colorC1);
        break;
      default:

    }
    this.colormapBandSketchC1.push(tmpArray);

    colorType = colorC2.getColorType();
    tmpArray = [];
    switch (colorType) {
      case "rgb":
          tmpArray.push(colorC2);
          tmpArray.push(colorC2.calcHSVColor());
          tmpArray.push(colorC2.calcLABColor());
          tmpArray.push(colorC2.calcDIN99Color(this.kE,this.kCH));
        break;
      case "hsv":
          tmpArray.push(colorC2.calcRGBColor());
          tmpArray.push(colorC2);
          tmpArray.push(colorC2.calcLABColor());
          tmpArray.push(colorC2.calcDIN99Color(this.kE,this.kCH));
        break;
      case "lab":
          tmpArray.push(colorC2.calcRGBColor());
          tmpArray.push(colorC2.calcHSVColor());
          tmpArray.push(colorC2);
          tmpArray.push(colorC2.calcDIN99Color(this.kE,this.kCH));
        break;
      case "din99":
          tmpArray.push(colorC2.calcRGBColor());
          tmpArray.push(colorC2.calcHSVColor());
          tmpArray.push(colorC2.calcLABColor());
          tmpArray.push(colorC2);
        break;
      default:

    }
    this.colormapBandSketchC2.push(tmpArray);

    this.colormapBandSketchR1.push(refR1);
    this.colormapBandSketchR2.push(refR2);

  }



  spliceBand(index, colorC1, colorC2, refR1, refR2){


    var colorType = colorC1.getColorType();
    var tmpArray = [];
    switch (colorType) {
      case "rgb":
          tmpArray.push(colorC1);
          tmpArray.push(colorC1.calcHSVColor());
          tmpArray.push(colorC1.calcLABColor());
          tmpArray.push(colorC1.calcDIN99Color(this.kE,this.kCH));
        break;
      case "hsv":
          tmpArray.push(colorC1.calcRGBColor());
          tmpArray.push(colorC1);
          tmpArray.push(colorC1.calcLABColor());
          tmpArray.push(colorC1.calcDIN99Color(this.kE,this.kCH));
        break;
      case "lab":
          tmpArray.push(colorC1.calcRGBColor());
          tmpArray.push(colorC1.calcHSVColor());
          tmpArray.push(colorC1);
          tmpArray.push(colorC1.calcDIN99Color(this.kE,this.kCH));
        break;
      case "din99":
          tmpArray.push(colorC1.calcRGBColor());
          tmpArray.push(colorC1.calcHSVColor());
          tmpArray.push(colorC1.calcLABColor());
          tmpArray.push(colorC1);
        break;
      default:

    }
    this.colormapBandSketchC1.splice(index, 0, tmpArray);


    colorType = colorC2.getColorType();
    tmpArray = [];
    switch (colorType) {
      case "rgb":
          tmpArray.push(colorC2);
          tmpArray.push(colorC2.calcHSVColor());
          tmpArray.push(colorC2.calcLABColor());
          tmpArray.push(colorC2.calcDIN99Color(this.kE,this.kCH));
        break;
      case "hsv":
          tmpArray.push(colorC2.calcRGBColor());
          tmpArray.push(colorC2);
          tmpArray.push(colorC2.calcLABColor());
          tmpArray.push(colorC2.calcDIN99Color(this.kE,this.kCH));
        break;
      case "lab":
          tmpArray.push(colorC2.calcRGBColor());
          tmpArray.push(colorC2.calcHSVColor());
          tmpArray.push(colorC2);
          tmpArray.push(colorC2.calcDIN99Color(this.kE,this.kCH));
        break;
      case "din99":
          tmpArray.push(colorC2.calcRGBColor());
          tmpArray.push(colorC2.calcHSVColor());
          tmpArray.push(colorC2.calcLABColor());
          tmpArray.push(colorC2);
        break;
      default:

    }
    this.colormapBandSketchC2.splice(index, 0, tmpArray);

    this.colormapBandSketchR1.splice(indexOfDroppedPlace, 0,refR1);
    this.colormapBandSketchR2.splice(indexOfDroppedPlace, 0, refR2);
  }


  deleteBand(index){
    this.colormapBandSketchC1.splice(index, 1);
    this.colormapBandSketchC2.splice(index, 1);
    this.colormapBandSketchR1.splice(index, 1);
    this.colormapBandSketchR2.splice(index, 1);
  }

  clearSketch(){
    this.colormapBandSketchC1 = [];
    this.colormapBandSketchC2 = [];
    this.colormapBandSketchR1 = [];
    this.colormapBandSketchR2 = [];
  }

  getBandLenght(){
    return this.colormapBandSketchC1.length;
  }

  getRefR1(index){
    return this.colormapBandSketchR1[index];
  }
  getRefR2(index){
    return this.colormapBandSketchR2[index];
  }

  setRefR1(index, val){
    this.colormapBandSketchR1[index]=val;
  }
  setRefR2(index, val){
    this.colormapBandSketchR2[index]=val;
  }

  getC1RGBColor(index){
    return this.colormapBandSketchC1[index][0];
  }
  getC1HSVColor(index){
    return this.colormapBandSketchC1[index][1];
  }
  getC1LABColor(index){
    return this.colormapBandSketchC1[index][2];
  }
  getC1DIN99Color(index){
    return this.colormapBandSketchC1[index][3];
  }

  getC2RGBColor(index){
    return this.colormapBandSketchC2[index][0];
  }
  getC2HSVColor(index){
    return this.colormapBandSketchC2[index][1];
  }
  getC2LABColor(index){
    return this.colormapBandSketchC2[index][2];
  }
  getC2DIN99Color(index){
    return this.colormapBandSketchC2[index][3];
  }

  getC1Color(index,space){
    switch (space) {
      case "rgb":
        return this.colormapBandSketchC1[index][0];
      case "hsv":
        return this.colormapBandSketchC1[index][1];
      case "lab":
        return this.colormapBandSketchC1[index][2];
      case "din99":
        return this.colormapBandSketchC1[index][3];
      default:
        console.log("Error at getC1Color function of the bandSketch class");
    }
  }

  getC2Color(index,space){
    switch (space) {
      case "rgb":
        return this.colormapBandSketchC2[index][0];
      case "hsv":
        return this.colormapBandSketchC2[index][1];
      case "lab":
        return this.colormapBandSketchC2[index][2];
      case "din99":
        return this.colormapBandSketchC2[index][3];
      default:
        console.log("Error at getC2Color function of the bandSketch class");
    }
  }


  sketch2Colormap(colorspace){

      var saveNext = true;
      var tmpColormap = new xclassColorMap();

      var index = 0;

      switch (colorspace) {
        case "rgb":
            index=0;
          break;
        case "hsv":
            index=1;
          break;
        case "lab":
            index=2;
          break;
        case "din99":
            index=3;
          break;
        default:
      }


      for(var i=0; i<this.colormapBandSketchC1.length; i++){

              if(saveNext){
                      tmpColormap.pushPositionPoints(this.colormapBandSketchR1[i]);
                      tmpColormap.pushColor(this.colormapBandSketchC1[i][index]);
              }

                    tmpColormap.pushPositionPoints(this.colormapBandSketchR2[i]);
                    tmpColormap.pushColor(this.colormapBandSketchC2[i][index]);

                    saveNext=this.keyColorEqual(i,index); // if false -> case dual key

        }

        tmpColormap.createKeys();
        tmpColormap.calcBands();

        //tmpColormap.setColormapName(document.getElementById("id_InputMapName").value);

        return tmpColormap;
  }

  keyColorEqual(i,index){
    if(i+1<this.colormapBandSketchC1.length &&
    (this.colormapBandSketchC2[i][index].get1Value()!=this.colormapBandSketchC1[i][index].get1Value() ||  // i = scaled
    this.colormapBandSketchC2[i][index].get2Value()!=this.colormapBandSketchC1[i][index].get2Value() ||
    this.colormapBandSketchC2[i][index].get3Value()!=this.colormapBandSketchC1[i][index].get3Value())
    &&
    (this.colormapBandSketchC2[i+1][index].get1Value()!=this.colormapBandSketchC1[i+1][index].get1Value() || // i+1 = scaled
    this.colormapBandSketchC2[i+1][index].get2Value()!=this.colormapBandSketchC1[i+1][index].get2Value() ||
    this.colormapBandSketchC2[i+1][index].get3Value()!=this.colormapBandSketchC1[i+1][index].get3Value())
    &&
    (this.colormapBandSketchC2[i][index].get1Value()==this.colormapBandSketchC1[i+1][index].get1Value() && // -> dual key
    this.colormapBandSketchC2[i][index].get2Value()==this.colormapBandSketchC1[i+1][index].get2Value() &&
    this.colormapBandSketchC2[i][index].get3Value()==this.colormapBandSketchC1[i+1][index].get3Value())){
      return false;
    }else {
      return true;
    }

  }

  colormap2Sketch(tmpColormap){

    this.colormapBandSketchC1 = [];
    this.colormapBandSketchC2 = [];
    this.colormapBandSketchR1 = [];
    this.colormapBandSketchR2 = [];

    for(var i=0; i<tmpColormap.getNumberOfBands(); i++){

      var tmpArray=[];
      tmpArray.push(tmpColormap.getBand(i).getLeftRGBColor());
      tmpArray.push(tmpColormap.getBand(i).getLeftHSVColor());
      tmpArray.push(tmpColormap.getBand(i).getLeftLABColor());
      tmpArray.push(tmpColormap.getBand(i).getLeftDIN99Color());
      this.colormapBandSketchC1.push(tmpArray);

      tmpArray=[];
      tmpArray.push(tmpColormap.getBand(i).getRightRGBColor());
      tmpArray.push(tmpColormap.getBand(i).getRightHSVColor());
      tmpArray.push(tmpColormap.getBand(i).getRightLABColor());
      tmpArray.push(tmpColormap.getBand(i).getRightDIN99Color());
      this.colormapBandSketchC2.push(tmpArray);

      this.colormapBandSketchR1.push(tmpColormap.getBand(i).getLeftRef());
      this.colormapBandSketchR2.push(tmpColormap.getBand(i).getRightRef());
    }

  }

  isBandConstant(index, space){

    var i = 0;

    switch (space) {
      case "rgb":
          i=0;
        break;
      case "hsv":
          i=1;
        break;
      case "lab":
          i=2;
        break;
      case "din99":
          i=3;
        break;
      default:
    }

    if(this.colormapBandSketchC2[index][i].get1Value()!=this.colormapBandSketchC1[index][i].get1Value() ||  // i = scaled
       this.colormapBandSketchC2[index][i].get2Value()!=this.colormapBandSketchC1[index][i].get2Value() ||
       this.colormapBandSketchC2[index][i].get3Value()!=this.colormapBandSketchC1[index][i].get3Value()){
         return false;
    }
    else {
        return true;
    }
  }

  ///////////////////////////////////
  /// DISTANCE functions
  //////////////////////////////////


  calcNewDistances(){

    this.distanceLAB = [];
    this.distanceDIN99 = [];
    this.distanceCIEDE2000 = [];
    this.distanceDE94 = [];
    this.distanceRGB = [];
    this.distanceHSV = [];
    this.distanceRef = [];
    this.distanceSumRef = 0;
    this.distanceSumCIEDE2000 = 0;
    this.distanceSumRGB = 0;
    this.distanceSumHSV = 0;
    this.distanceSumLAB = 0;
    this.distanceSumDE94 = 0;
    this.distanceSumDIN99 = 0;
    this.numConstantBands = 0;


        var twinStarted = false;
        var leftStarted = false;
        for(var i = 0; i<this.colormapBandSketchC1.length; i++){

            if(this.isBandConstant(i, "rgb")){
              this.distanceRef.push(0);
              this.distanceRGB.push(0);
              this.distanceHSV.push(0);
              this.distanceLAB.push(0);
              this.distanceDE94.push(0);
              this.distanceCIEDE2000.push(0);
              this.distanceDIN99.push(0);
              this.numConstantBands++;
            }
            else{
              // ref
              var tmpDis = this.colormapBandSketchR2[i]-this.colormapBandSketchR1[i];
              console.log("tmpDis: "+tmpDis);
              this.distanceRef.push(tmpDis);
              this.distanceSumRef= this.distanceSumRef + tmpDis;

              /// RGB
              tmpDis = this.calc3DEuclideanDistance(this.colormapBandSketchC1[i][0],this.colormapBandSketchC2[i][0]);

              this.distanceRGB.push(tmpDis);
              this.distanceSumRGB = this.distanceSumRGB + tmpDis;

              /// HSV
              tmpDis = this.colormapBandSketchC1[i][1].getSValue()*50; // radius 50; center(0,0,0);
              var tmpRad = (this.colormapBandSketchC1[i][1].getHValue()*Math.PI*2)-Math.PI;
              var x = tmpDis*Math.cos(tmpRad);
              var y = tmpDis*Math.sin(tmpRad);
              var z = this.colormapBandSketchC1[i][1].getVValue()-50;

              tmpDis = this.colormapBandSketchC2[i][1].getSValue()*50;
              tmpRad = (this.colormapBandSketchC2[i][1].getHValue()*Math.PI*2)-Math.PI;
              var x2 = tmpDis*Math.cos(tmpRad);
              var y2 = tmpDis*Math.sin(tmpRad);
              var z2 = this.colormapBandSketchC2[i][1].getVValue()-50;
              tmpDis= Math.sqrt( Math.pow(x-x2,2) + Math.pow(y-y2,2) + Math.pow(z-z2,2));
              this.distanceHSV.push(tmpDis);
              this.distanceSumHSV = this.distanceSumHSV + tmpDis;

              /// LAB
              tmpDis = this.calc3DEuclideanDistance(this.colormapBandSketchC1[i][2],this.colormapBandSketchC2[i][2]);
              this.distanceLAB.push(tmpDis);
              this.distanceSumLAB = this.distanceSumLAB + tmpDis;

              /// DE94
              tmpDis = this.calcDeltaDE94(this.colormapBandSketchC1[i][2],this.colormapBandSketchC2[i][2]);
              this.distanceDE94.push(tmpDis);
              this.distanceSumDE94 = this.distanceSumDE94 + tmpDis;

              /// CIEDE2000
              tmpDis = this.calcDeltaCIEDE2000(this.colormapBandSketchC1[i][2],this.colormapBandSketchC2[i][2]);
              this.distanceCIEDE2000.push(tmpDis);
              this.distanceSumCIEDE2000 = this.distanceSumCIEDE2000 + tmpDis;

              // DIN99
              tmpDis = this.calc3DEuclideanDistance(this.colormapBandSketchC1[i][3],this.colormapBandSketchC2[i][3]);
              this.distanceDIN99.push(tmpDis);
              this.distanceSumDIN99 = this.distanceSumDIN99 + tmpDis;
            }

        }


    


  }

  /////////////// DE94 ////////////////////
  calcDeltaDE94(color1,color2){

            var k_L = 1.0, k_C = 1.0, k_H = 1.0;
            var k_1 = 0.045, k_2 = 0.015; // K1: 0.045 graphic arts  0.048 textiles  K2: 0.015 graphic arts 0.014 textiles


            var deg360InRad = deg2rad(360.0);
            var deg180InRad = deg2rad(180.0);
            var pow25To7 = Math.pow(25, 7);

            // Step 1
            var deltaL = color1.getLValue()-color2.getLValue();
            var C1 = Math.sqrt((color1.getAValue() * color1.getAValue()) + (color1.getBValue() * color1.getBValue()));
            var C2 = Math.sqrt((color2.getAValue() * color2.getAValue()) + (color2.getBValue() * color2.getBValue()));
            var deltaC = C1-C2;
            var deltaA = color1.getAValue()-color2.getAValue();
            var deltaB = color1.getBValue()-color2.getBValue();
            var deltaH = Math.sqrt((deltaA * deltaA) + (deltaB * deltaB) - (deltaC * deltaC));
            var s_L =1;
            var s_C =1+k_1*C1;
            var s_H =1+k_2*C2;


            var elem1 = deltaL/(k_L*s_L);
            var elem2 = deltaC/(k_C*s_C);
            var elem3 = deltaH/(k_H*s_H);
            var deltaE =  Math.sqrt((elem1 * elem1) + (elem2 * elem2) + (elem3 * elem3));

            return deltaE;

    }

  /////////////// CIEDE2000 ////////////////////
  calcDeltaCIEDE2000(color1,color2){
            var k_L = 1.0, k_C = 1.0, k_H = 1.0;
            var deg360InRad = deg2rad(360.0);
            var deg180InRad = deg2rad(180.0);
            var pow25To7 = Math.pow(25, 7);

            // Step 1
            var C1 = Math.sqrt((color1.getAValue() * color1.getAValue()) + (color1.getBValue() * color1.getBValue()));
            var C2 = Math.sqrt((color2.getAValue() * color2.getAValue()) + (color2.getBValue() * color2.getBValue()));

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

  getNumConstBands(){
    return this.numConstantBands;
  }
  getRGBDistance(index) {
   return this.distanceRGB[index];
  }

  getHSVDistance(index) {
   return this.distanceHSV[index];
  }

  getLABDistance(index) {
   return this.distanceLAB[index];
  }

  getDE94Distance(index) {
   return this.distanceDE94[index];
  }

  getCIEDE2000Distance(index) {
   return this.distanceCIEDE2000[index];
  }

  getDIN99Distance(index) {
   return this.distanceDIN99[index];
  }

  getRefDistance(index) {
   return this.distanceRef[index];
  }

  getDistanceIndizes(index){
    return this.distanceIndizes[index];
  }


  getDistanceSumRef(){
      return this.distanceSumRef;
  }


  getDistanceSumRGB(){
      return this.distanceSumRGB;
  }


  getDistanceSumHSV(){
      return this.distanceSumHSV;
  }

  getDistanceSumLAB(){
      return this.distanceSumLAB;
  }

  getDistanceSumDE94(){
      return this.distanceSumDE94;
  }

  getDistanceSumCIEDE2000(){
      return this.distanceSumCIEDE2000;
  }

  getDistanceSumDIN99(){
      return this.distanceSumDIN99;
  }


}
