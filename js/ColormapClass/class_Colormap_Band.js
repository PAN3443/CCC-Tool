////////////////////////////////////////////////
// ------------ Class Band ---------------//
////////////////////////////////////////////////

class class_Band{
    constructor(colorRGBleft,colorRGBright,colorHSVleft,colorHSVright,colorLABleft,colorLABright,colorDIN99left,colorDIN99right,refleft,refright, type) {
        this.colorRGBleft = colorRGBleft;
        this.colorRGBright = colorRGBright;
        this.colorHSVleft = colorHSVleft;
        this.colorHSVright = colorHSVright;
        this.colorLABleft = colorLABleft;
        this.colorLABright = colorLABright;
        this.colorDIN99left = colorDIN99left;
        this.colorDIN99right = colorDIN99right;
        this.refleft = refleft;
        this.refright = refright;
        this.isConstant = type; // true false
        this.sample_numberOfIntervals = 10;

        this.intervalUsedMetric = 0; // 0=RGB, 1=HSV, 2=CIEDE2000, 3=DIN99
        this.intervalObjects = [];
        this.refRatio = [];
        this.colorRatio = [];
        this.doMerge = true;

    }

    calcIntervalPoints(){

            // clear intervall objects
            for(var i=this.intervalObjects.length-1; i>=0; i--){
                this.intervalObjects.pop();
                this.refRatio.pop();
                this.colorRatio.pop();
            }

            // cal refIntervals
            var refIntervals = [];
            var colorIntervalls = [];
            var refDistanceArray = [];
            var fullrefDistance = 0;
            var colorDistanceArray = [];
            var fullcolorDistance = 0;


            var refDistance = this.refright-this.refleft;

            // number of intervals
            var intervallDistance = refDistance/this.sample_numberOfIntervals;
            for(var i=1; i<this.sample_numberOfIntervals; i++){
                refIntervals.push(this.refleft+i*intervallDistance);
            }


            switch(this.intervalUsedMetric) {
                case 0:
                    // RGB
                                // check if discrete Band
                                if(this.isConstant==true){

                                    if(this.doMerge==false){
                                        for(var j=0; j<refIntervals.length; j++){

                                            this.intervalObjects.push(new classIntervalPointObject(this.colorRGBleft,refIntervals[i]));

                                        }
                                    }

                                }
                                else{

                                    var color1 = this.colorRGBleft;
                                    var color2 = this.colorRGBright;
                                    var lastref = this.refleft;
                                    var lastColor = color1;

                                    var tmpDistance = 0;

                                    // check intervall refs between

                                    for(var j=0; j<refIntervals.length; j++){

                                            var tmpCurrentRef = refIntervals[j];
                                            // calc color

                                            var tmpRatio = (tmpCurrentRef-this.refleft)/refDistance;

                                            var rValue = color1.getRValue()+(color2.getRValue() - color1.getRValue())*tmpRatio;
                                            var gValue = color1.getGValue()+(color2.getGValue() - color1.getGValue())*tmpRatio;
                                            var bValue = color1.getBValue()+(color2.getBValue() - color1.getBValue())*tmpRatio;


                                            var tmpCurrentColor = new classColor_RGB(rValue,gValue,bValue);

                                            this.intervalObjects.push(new classIntervalPointObject(tmpCurrentColor,tmpCurrentRef));


                                            // calc ref distance
                                            tmpDistance = tmpCurrentRef - lastref;
                                            refDistanceArray.push(tmpDistance);
                                            fullrefDistance=fullrefDistance+tmpDistance;
                                            // calc color distance
                                            tmpDistance = this.calc3DEuclideanDistance(lastColor.getRValue(),lastColor.getGValue(),lastColor.getBValue(),tmpCurrentColor.getRValue(),tmpCurrentColor.getGValue(),tmpCurrentColor.getBValue());
                                            colorDistanceArray.push(tmpDistance);
                                            fullcolorDistance = fullcolorDistance+tmpDistance;

                                            lastref = tmpCurrentRef;
                                            lastColor = tmpCurrentColor;

                                    }

                                    // calc ref distance to the refright point
                                    tmpDistance = this.refright - lastref;
                                    refDistanceArray.push(tmpDistance);
                                    fullrefDistance=fullrefDistance+tmpDistance;
                                    // calc color distance to the refright point
                                    tmpDistance = this.calc3DEuclideanDistance(lastColor.getRValue(),lastColor.getGValue(),lastColor.getBValue(),this.colorRGBright.getRValue(),this.colorRGBright.getGValue(),this.colorRGBright.getBValue());
                                    colorDistanceArray.push(tmpDistance);
                                    fullcolorDistance = fullcolorDistance+tmpDistance;

                                    // calc ratio data
                                    for(var i=0; i<colorDistanceArray.length; i++){
                                        var tmpRatio = refDistanceArray[i]/fullrefDistance;
                                        this.refRatio.push(tmpRatio);
                                        tmpRatio = colorDistanceArray[i]/fullcolorDistance;
                                        this.colorRatio.push(tmpRatio);

                                    }

                                }





                    break;
                case 1:
                    // HSV
                                // check if discrete Band
                                if(this.isConstant==true){

                                    if(this.doMerge==false){
                                        for(var j=0; j<refIntervals.length; j++){

                                            this.intervalObjects.push(new classIntervalPointObject(this.colorHSVleft,refIntervals[i]));

                                        }
                                    }

                                }
                                else{

                                    var tmpDis = this.colorHSVleft.getSValue()*50; // radius 50; center(0,0,0);
                                    var tmpRad = (this.colorHSVleft.getHValue()*Math.PI*2)-Math.PI;
                                    var xPos = tmpDis*Math.cos(tmpRad);
                                    var yPos = tmpDis*Math.sin(tmpRad);
                                    var zPos = this.colorHSVleft.getVValue()-50;

                                    var tmpDis2 = this.colorHSVright.getSValue()*50;
                                    var tmpRad2 = (this.colorHSVright.getHValue()*Math.PI*2)-Math.PI;
                                    var xPos2 = tmpDis2*Math.cos(tmpRad2);
                                    var yPos2 = tmpDis2*Math.sin(tmpRad2);
                                    var zPos2 = this.colorHSVright.getVValue()-50;

                                    var lastref = this.refleft;

                                    var lastX = xPos;
                                    var lastY = yPos;
                                    var lastZ = zPos;

                                    var tmpDistance = 0;

                                    // check intervall refs between

                                    for(var j=0; j<refIntervals.length; j++){

                                            var tmpCurrentRef = refIntervals[j];
                                            // calc color

                                            var tmpRatio = (tmpCurrentRef-this.refleft)/refDistance;

                                            var tmpX = xPos+(xPos2 - xPos)*tmpRatio;
                                            var tmpY = yPos+(yPos2 - yPos)*tmpRatio;
                                            var tmpZ = zPos+(zPos2 - zPos)*tmpRatio;

                                            var tmpH =(Math.atan2(tmpY,tmpX)+Math.PI)/(Math.PI*2);
                                            var tmpS = Math.sqrt(Math.pow(tmpX,2)+Math.pow(tmpY,2))/50;
                                            var tmpV = tmpZ+50;
                                            var tmpCurrentColor = new classColor_HSV(tmpH,tmpS,tmpV);

                                            this.intervalObjects.push(new classIntervalPointObject(tmpCurrentColor,tmpCurrentRef));


                                            // calc ref distance
                                            tmpDistance = tmpCurrentRef - lastref;
                                            refDistanceArray.push(tmpDistance);
                                            fullrefDistance=fullrefDistance+tmpDistance;
                                            // calc color distance
                                            tmpDistance = this.calc3DEuclideanDistance(lastX,lastY,lastZ,tmpX,tmpY,tmpZ);
                                            colorDistanceArray.push(tmpDistance);
                                            fullcolorDistance = fullcolorDistance+tmpDistance;

                                            lastref = tmpCurrentRef;
                                            lastX = tmpX;
                                            lastY = tmpY;
                                            lastZ = tmpZ;

                                    }

                                    // calc ref distance to the refright point
                                    tmpDistance = this.refright - lastref;
                                    refDistanceArray.push(tmpDistance);
                                    fullrefDistance=fullrefDistance+tmpDistance;
                                    // calc color distance to the refright point
                                    tmpDistance = this.calc3DEuclideanDistance(lastX,lastY,lastZ,xPos2,yPos2,zPos2);
                                    colorDistanceArray.push(tmpDistance);
                                    fullcolorDistance = fullcolorDistance+tmpDistance;

                                    // calc ratio data
                                    for(var i=0; i<colorDistanceArray.length; i++){
                                        var tmpRatio = refDistanceArray[i]/fullrefDistance;
                                        this.refRatio.push(tmpRatio);
                                        tmpRatio = colorDistanceArray[i]/fullcolorDistance;
                                        this.colorRatio.push(tmpRatio);

                                    }

                                }


                    break;

                case 2:
                    // LAB
                             // check if discrete Band
                                if(this.isConstant==true){
                                    if(this.doMerge==false){
                                        for(var j=0; j<refIntervals.length; j++){

                                            this.intervalObjects.push(new classIntervalPointObject(this.colorLABleft,refIntervals[i]));

                                        }
                                    }

                                }
                                else{
                                    var color1 = this.colorLABleft;
                                    var color2 = this.colorLABright;
                                    var lastref = this.refleft;
                                    var lastColor = color1;

                                    var tmpDistance = 0;

                                    // check intervall refs between
                                    for(var j=0; j<refIntervals.length; j++){

                                            var tmpCurrentRef = refIntervals[j];
                                            // calc color

                                            var tmpRatio = (tmpCurrentRef-this.refleft)/refDistance;

                                            var lValue = color1.getLValue()+(color2.getLValue() - color1.getLValue())*tmpRatio;
                                            var aValue = color1.getAValue()+(color2.getAValue() - color1.getAValue())*tmpRatio;
                                            var bValue = color1.getBValue()+(color2.getBValue() - color1.getBValue())*tmpRatio;
                                            var tmpCurrentColor = new classColor_LAB(lValue,aValue,bValue);

                                            this.intervalObjects.push(new classIntervalPointObject(tmpCurrentColor,tmpCurrentRef));

                                            // calc ref distance
                                            tmpDistance = tmpCurrentRef - lastref;
                                            refDistanceArray.push(tmpDistance);
                                            fullrefDistance=fullrefDistance+tmpDistance;
                                            // calc color distance
                                            tmpDistance = this.calcDeltaCIEDE2000(lastColor,tmpCurrentColor);
                                            colorDistanceArray.push(tmpDistance);
                                            fullcolorDistance = fullcolorDistance+tmpDistance;

                                            lastref = tmpCurrentRef;
                                            lastColor = tmpCurrentColor;
                                    }

                                    // calc ref distance to the refright point
                                    tmpDistance = this.refright - lastref;
                                    refDistanceArray.push(tmpDistance);
                                    fullrefDistance=fullrefDistance+tmpDistance;
                                    // calc color distance to the refright point
                                    tmpDistance = this.calcDeltaCIEDE2000(lastColor,this.colorLABright);
                                    colorDistanceArray.push(tmpDistance);
                                    fullcolorDistance = fullcolorDistance+tmpDistance;
                                    // calc ratio data
                                    for(var i=0; i<colorDistanceArray.length; i++){
                                        var tmpRatio = refDistanceArray[i]/fullrefDistance;
                                        this.refRatio.push(tmpRatio);
                                        tmpRatio = colorDistanceArray[i]/fullcolorDistance;
                                        this.colorRatio.push(tmpRatio);

                                    }


                                }
                break;

                case 3:
                    // DIN99

                                // check if discrete Band
                                if(this.isConstant==true){
                                    if(this.doMerge==false){
                                        for(var j=0; j<refIntervals.length; j++){

                                            this.intervalObjects.push(new classIntervalPointObject(this.colorDIN99left,refIntervals[i]));

                                        }
                                    }

                                }
                                else{
                                    var color1 = this.colorDIN99left;
                                    var color2 = this.colorDIN99right;
                                    var lastref = this.refleft;
                                    var lastColor = color1;

                                    var tmpDistance = 0;

                                    // check intervall refs between

                                    for(var j=0; j<refIntervals.length; j++){

                                            var tmpCurrentRef = refIntervals[j];
                                            // calc color

                                            var tmpRatio = (tmpCurrentRef-this.refleft)/refDistance;

                                            var l99Value = color1.getL99Value()+(color2.getL99Value() - color1.getL99Value())*tmpRatio;
                                            var a99Value = color1.getA99Value()+(color2.getA99Value() - color1.getA99Value())*tmpRatio;
                                            var b99Value = color1.getB99Value()+(color2.getB99Value() - color1.getB99Value())*tmpRatio;

                                            var tmpCurrentColor = new classColorDIN99(l99Value,a99Value,b99Value);

                                            this.intervalObjects.push(new classIntervalPointObject(tmpCurrentColor,tmpCurrentRef));


                                            // calc ref distance
                                            tmpDistance = tmpCurrentRef - lastref;
                                            refDistanceArray.push(tmpDistance);
                                            fullrefDistance=fullrefDistance+tmpDistance;
                                            // calc color distance
                                            tmpDistance = this.calc3DEuclideanDistance(lastColor.getL99Value(),lastColor.getA99Value(),lastColor.getB99Value(),tmpCurrentColor.getL99Value(),tmpCurrentColor.getA99Value(),tmpCurrentColor.getB99Value());
                                            colorDistanceArray.push(tmpDistance);
                                            fullcolorDistance = fullcolorDistance+tmpDistance;

                                            lastref = tmpCurrentRef;
                                            lastColor = tmpCurrentColor;
                                    }

                                    // calc ref distance to the refright point
                                    tmpDistance = this.refright - lastref;
                                    refDistanceArray.push(tmpDistance);
                                    fullrefDistance=fullrefDistance+tmpDistance;
                                    // calc color distance to the refright point
                                    tmpDistance = this.calc3DEuclideanDistance(lastColor.getL99Value(),lastColor.getA99Value(),lastColor.getB99Value(),this.colorDIN99right.getL99Value(),this.colorDIN99right.getA99Value(),this.colorDIN99right.getB99Value());
                                    colorDistanceArray.push(tmpDistance);
                                    fullcolorDistance = fullcolorDistance+tmpDistance;

                                    // calc ratio data
                                    for(var i=0; i<colorDistanceArray.length; i++){
                                        var tmpRatio = refDistanceArray[i]/fullrefDistance;
                                        this.refRatio.push(tmpRatio);
                                        tmpRatio = colorDistanceArray[i]/fullcolorDistance;
                                        this.colorRatio.push(tmpRatio);
                                    }

                                }


                break;

                default:
                    alert("Distance Metric is not implemented now");

            }
    }


    /////////////////////////////
    /// Setter and Getter
    /////////////////////////////

    /*set(varibale) {
        this. = varibale;
    }

    get() {
        return this.;
    }*/

    setDoMerge(varibale) {
        this.doMerge = varibale;
    }

    getDoMerge() {
        return this.doMerge;
    }


    setSample_numberOfIntervals(varibale) {
        this.sample_numberOfIntervals = varibale;
    }

    getSample_numberOfIntervals() {
        return this.sample_numberOfIntervals;
    }

    setBandType(type) {
        this.isConstant = type;
    }

    getBandType() {
        return this.isConstant;
    }

    setLeftRGBcolor(color) {
        this.colorRGBleft = color;
    }

    getLeftRGBColor() {

        return this.colorRGBleft;
    }

    setRightRGBColor(color) {
        this.colorRGBright = color;
    }

    getRightRGBColor() {
        return this.colorRGBright;
    }

    setLeftHSVcolor(color) {
        this.colorHSVleft = color;
    }

    getLeftHSVColor() {

        return this.colorHSVleft;
    }

    getLeftDIN99Color() {

        return this.colorDIN99left;
    }

    getRightDIN99Color() {
        return this.colorDIN99right;
    }

    setRightHSVColor(color) {
        this.colorHSVright = color;
    }

    getRightHSVColor() {
        return this.colorHSVright;
    }

    setLeftLABcolor(color) {
        this.colorLABleft = color;
    }

    getLeftLABColor() {

        return this.colorLABleft;
    }

    setRightLABColor(color) {
        this.colorLABright = color;
    }

    getRightLABColor() {
        return this.colorLABright;
    }

    getRightRef() {
        return this.refright;
    }

    getLeftRef() {
        return this.refleft;
    }

    getNumberOfIntervalsPoints(){
        return this.intervalObjects.length;
    }

    getIntervalObject(index){
        return this.intervalObjects[index];
    }

    getRefRatio(index){
        return this.refRatio[index];
    }

    getColorRatio(index){
        return this.colorRatio[index];
    }

    getIntervalMetric(){
        return this.intervalUsedMetric;
    }

    setIntervalMetric(index){
        this.intervalUsedMetric=index;
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

    ///////////////////// RGB, HSV, DIN99 Distance ////////////////////////
    calc3DEuclideanDistance(x,y,z,x2,y2,z2){
    return Math.sqrt( Math.pow(x-x2,2) + Math.pow(y-y2,2) + Math.pow(z-z2,2));
    }




}
