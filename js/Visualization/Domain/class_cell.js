class class_Cell{


  /*

  Triangle    Quad
     ?       3----2
    / \      |    |
   /   \     |    |
  ?-----?    0----1
    Tetrahedron        Prism        Pyramid       Hexahedron
                          ?                        4--------5
         ?              / |\             ?        /|       /|
        /|\           /   | \          //|\      / |      / |
       / | \        ?--------?        // | \    3--------2  |
      /  |  \       |     |  |       //  |  \   |  |     |  |
     /   ?   \      |     ?  |      /?---|--?   |  7-----|--6
    /  /   \  \     |   /  \ |     //    | /    | /      | /
   / /       \ \    | /     \|    //     |/     |/       |/
  ?-------------?   ?--------?   ?-------?      0--------1

  */

    constructor(pointArray,valueArray, type) {
        this.points = pointArray;
        this.valueArray = valueArray;
        this.type = type; // 1. Rectangle, 2. Triangle, 3. Hexahedron

        /*if(valueArray.length==1){
          this.cellValue = valueArray[0];
        }
        else{
          if(valueArray.length==this.points.lenght){
            var sum =0;
            for (var i = 0; i < valueArray.length; i++) {
              sum += valueArray[i];
            }
            this.cellValue = sum/valueArray.length;
          }
        }*/
    }


    getCellValueSize(){
      return this.valueArray.length;
    }

    getCellValue(index){
      return this.valueArray[index];
    }

    getCellType(){
      return this.type;
    }

    getCellIndices(){
      return this.points;
    }

    getCellIndex(index){
      return this.points[index];
    }

    getIndicesLength(){
      return this.points.length;
    }

}
