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

    constructor(indexArray,valueArray, type) {
        //this.points = pointArray;
        this.indexArray = indexArray;
        this.valueArray = valueArray;
        this.type = type; // 1. Rectangle, 2. Triangle,

    }

    getVertexValue(index){

      switch (this.type) {
        case 2:
          if(index<3){
            return this.valueArray[index];
          }
          else {
            return undefined;
          }

          break;

          case 1:
            if(index<4){
              return this.valueArray[index];
            }
            else {
              return undefined;
            }

            break;

        default:
         return undefined;
      }
    }


    getCellValue(){

      switch (this.valueArray.lenght) {
        case 0:
          return undefined;
        case 1:
          return this.valueArray[0];
        default:

        var averageValue = 0;

        for (var i = 0; i < averageValue.length; i++) {
          averageValue += this.valueArray[i];
        }
        return  averageValue/this.valueArray.length;

      }

    }

    getCellType(){
      return this.type;
    }

    /*getCellIndices(){
      return this.indexArray;
    }*/

    getCellIndex(index){
      return this.indexArray[index];
    }

    getIndicesLength(){
      return this.points.length;
    }

}
