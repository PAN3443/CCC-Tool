////////////////////////////////////////////////
// ------------ Class Domain ---------------//
////////////////////////////////////////////////

class class_Domain{
    constructor() {
        this.name = "";
        this.grid=new class_Grid();
        this.field=new class_Field();
    }

    getCellGrid(index){
      var cellPoints = this.grid.getCellGrid();
      var cellValues = this.field.getCellValues();
      return new class_Cell(index,cellPoints,cellValues);
    }
}
