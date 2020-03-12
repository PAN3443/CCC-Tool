////////////////////////////////////////////////
// ------------ Class CIELab ---------------//
////////////////////////////////////////////////

class class_Color_Basis{

  // for future # => private  .... change this. to this.#
  // private fields are not supported at the moment
  /*#lValue = undefined;
  #aValue = undefined;
  #bValue = undefined;
  #colorType = undefined;*/

      constructor(value_1, value_2, value_3) {
        this.value_1 = value_1;
        this.value_2 = value_2;
        this.value_3 = value_3;
        this.colorType = "";
      }

      deleteReferences(){
        delete this.value_1;
        delete this.value_2;
        delete this.value_3;
        delete this.colorType;
      }

      getColorType(){
        return this.colorType;
      }

      get1Value() {
        return this.value_1;
      }

      get2Value() {
        return this.value_2;
      }

      get3Value() {
        return this.value_3;
      }

      getValueArray(){
        return [this.value_1,this.value_2,this.value_3];
      }

      set1Value(newVal) {
          this.value_1=newVal;
      }

      set2Value(newVal) {
          this.value_2=newVal;
      }

      set3Value(newVal){
          this.value_3=newVal;
      }

      equalTo(color){
        switch (true) {
          case (color.getColorType()===this.colorType):
              if(color.get1Value()==this.get1Value()&&
                 color.get2Value()==this.get2Value()&&
                 color.get3Value()==this.get3Value())
                 return true;
              else
                return false;
          default:
            var tmpColor = color.getInColorFormat(this.colorType);
            if(color.get1Value()==this.get1Value()&&
               color.get2Value()==this.get2Value()&&
               color.get3Value()==this.get3Value()){
                 tmpColor.deleteReferences();
                 return true;
            }
            else{
              tmpColor.deleteReferences();
              return false;
            }


        }

      }

      getInColorFormat(format){

        switch (format) {
          case "rgb":
              return this.calcRGBColor();
          case "hsv":
              return this.calcHSVColor();
          case "lab":
              return this.calcLABColor();
          case "lms":
              return this.calcLMSColor();
          case "din99":
              return this.calcDIN99Color();
          case "lch":
              return this.calcLCHColor();
          default:
            console.log("Error in function getColorFormat of LAB class");
        }

      }

      getRGBString() {
        var tmpRGB = this.calcRGBColor();
        var string = tmpRGB.getRGBString();
        tmpRGB.deleteReferences();
        return string;
      }

      calcLABColor() {
        console.debug("Error: this color has no calcLABColor function!");
      }

      calcLMSColor() {
        console.debug("Error: this color has no calcLMSColor function!");
      }

      calcXYZColor(){
        console.debug("Error: this color has no calcXYZColor function!");
      }

      calcRGBColor(){
        console.debug("Error: this color has no calcRGBColor function!");
      }

      checkRGBPossiblity(){
        console.debug("Error: this color has no checkRGBPossiblity function!");
      }

      calcHSVColor(){
        console.debug("Error: this color has no calcHSVColor function!");
      }

      calcLCHColor(){
        console.debug("Error: this color has no calcLCHColor function!");
      }

      calcDIN99Color(){
        console.debug("Error: this color has no calcDIN99Color function!");
      }

      setColorToRGBPossiblity(){
        console.debug("Error: this color has no calcLCHColor function!");
      }

    };
