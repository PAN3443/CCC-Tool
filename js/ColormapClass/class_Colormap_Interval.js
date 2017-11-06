////////////////////////////////////////////////
// ------------ Class Intervall ---------------//
////////////////////////////////////////////////

class classIntervalPointObject{
    constructor(color,refPos) {
        this.color = color;
        this.refPosition = refPos;
        
        //this.color1HasEqualRight = right;  // if true color1 values>=; color2 values<, else  color1 values>; color2 values<=
        //this.iskey = key; // 0 = no key; 1 = nil key, 2 = left key, 3 =  twin key, 4 = dual key; 5 = right key;
    }

    setColor1(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    setRefPosition(pos) {
        this.refPosition = pos;
    }

    getRefPosition() {
        return this.refPosition;
    }
    
}