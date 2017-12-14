

class classBandSketch{
    constructor() {
      this.colormapBandSketchC1 = [];
      this.colormapBandSketchC2 = [];
      this.colormapBandSketchR1 = [];
      this.colormapBandSketchR2 = [];
      this.kE=1;
      this.kCH=1;
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


}
