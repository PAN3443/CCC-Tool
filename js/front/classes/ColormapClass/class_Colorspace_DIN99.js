////////////////////////////////////////////////
// ------------ Class DIN99 ---------------//
////////////////////////////////////////////////

// DIN99 Version o

class classColorDIN99{

      constructor(lValue, aValue, bValue) {
        this.l99Value = lValue;
        this.a99Value = aValue;
        this.b99Value = bValue;
        this.colorType = "din99"
      }

      getColorType(){
        return this.colorType;
      }

      getL99Value() {
        return this.l99Value;
      }

      getA99Value() {
        return this.a99Value;
      }

      getB99Value() {
        return this.b99Value;
      }

      get1Value() {
        return this.l99Value;
      }

      get2Value() {
        return this.a99Value;
      }

      get3Value() {
        return this.b99Value;
      }

      set1Value(newVal) {
          this.l99Value=newVal;
      }

      set2Value(newVal) {
          this.a99Value=newVal;
      }

      set3Value(newVal){
          this.b99Value=newVal;
      }

      setL99Value(newLVal) {
        this.lValue = newLVal;
      }

      setA99Value(newAVal) {
        this.aValue = newAVal;
      }

      setB99Value(newBVal) {
        this.bValue = newBVal;
      }

      equalTo(color){

        switch (color.getColorType()) {
          case "din99":
              if(color.get1Value()==this.get1Value()&&
                 color.get2Value()==this.get2Value()&&
                 color.get3Value()==this.get3Value())
                 return true;
              else
                return false;
          default:
            var tmpColor = color.calcDIN99Color();
            if(color.get1Value()==this.get1Value()&&
               color.get2Value()==this.get2Value()&&
               color.get3Value()==this.get3Value())
               return true;
            else
              return false;

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
          case "din99":
              return new classColorDIN99(this.get1Value(),this.get2Value(),this.get3Value());
          default:
            console.log("Error in function getColorFormat of DIN99 class");
        }

      }

      getDIN99String(){
          var tmpString = "din99("+this.l99Value+","+this.a99Value+","+this.b99Value+")";
          return tmpString;
      }

      getDIN99String(numDecimalPlaces){
          var tmpString = "din99("+this.l99Value.toFixed(numDecimalPlaces)+","+this.a99Value.toFixed(numDecimalPlaces)+","+this.b99Value.toFixed(numDecimalPlaces)+")";
          return tmpString;
      }

      calcRGBColor(){
            var tmpLAB = this.calcLABColor();
            return tmpLAB.calcRGBColor();
      }

      calcRGBColorCorrect(errorRGBColor){
            var tmpLAB = this.calcLABColor();
            return tmpLAB.calcRGBColorCorrect(errorRGBColor);
      }

      calcHSVColor(){
          var tmpRGB = this.calcRGBColor();
          return tmpRGB.calcHSVColor();
      }

      calcLABColor(){
        var angle =  2*Math.PI/360*26;
        var lScale = 100/Math.log(139/100.0); // = 303.67
        var value_L =  (Math.exp(this.l99Value*din99_kE/lScale)-1.0)/0.0039;
        var hef = Math.atan2(this.b99Value,this.a99Value);
        var h99 = hef-angle;
        var C99 = Math.sqrt(Math.pow(this.a99Value,2)+Math.pow(this.b99Value,2));
        var G = (Math.exp(0.0435*C99*din99_kCH*din99_kE)-1)/0.075;
        var e = G*Math.cos(h99);
        var f = G*Math.sin(h99);

        var value_A = e*Math.cos(angle)-(f/0.83)*Math.sin(angle);
        var value_B = e*Math.sin(angle)+(f/0.83)*Math.cos(angle);

        return new classColor_LAB(value_L,value_A,value_B);
      }

    };
