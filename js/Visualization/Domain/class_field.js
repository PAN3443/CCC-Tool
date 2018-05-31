class class_Field{
    constructor(valueArray, type, gridtype) {
        this.type = type; // false if point data or true if cell data
        this.dimensionX = 0;
        this.dimensionY = 0;
        this.dimensionZ = 0;
        this.timesteps = 0;
        this.values=valueArray;
        this.gridtype=gridtype;

        
    }



    getCellValues(index){

    }
}
