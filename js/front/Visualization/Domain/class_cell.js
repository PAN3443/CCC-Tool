class class_Cell{


  /*

  Triangle    Quad
     ?       3----2
    / \      |    |
   /   \     |    |
  ?-----?    0----1


  NOPE :
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

    constructor(pointArray,averageValue, type) {
        this.points = pointArray;
        this.averageValue = averageValue;
        this.type = type; // 1. Rectangle, 2. Triangle, 

        /*if(averageValue.length==1){
          this.cellValue = averageValue[0];
        }
        else{
          if(averageValue.length==this.points.lenght){
            var sum =0;
            for (var i = 0; i < averageValue.length; i++) {
              sum += averageValue[i];
            }
            this.cellValue = sum/averageValue.length;
          }
        }*/
    }


    getCellValue(){
      return this.averageValue;
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
