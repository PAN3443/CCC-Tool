////////////////////////////////////////////////
// ------------ Class Colormap and CMS ---------------//
////////////////////////////////////////////////


class classColormap {

    constructor(colorspace) {
    this.name = "Customer Colormap";
    this.colorspace = colorspace;
    this.ref = [];
    this.color = [];
    this.type = [];

  }

  getColormapLength(){
    return this.ref.length;
  }

  getRef(index){
    return this.ref[index];
  }

  getRefNum(){ // exept the double of left and dual keys

    var counter = 0;

    var leftOrTwinStarted = false;

    for(var i=0; i<this.type.length; i++){


      if(this.type[i]=="left key" || this.type[i]=="interval left key" || this.type[i]=="twin key" ||  this.type[i]=="interval twin key"){
        if(leftOrTwinStarted){
          leftOrTwinStarted=false;
        }
        else{
          leftOrTwinStarted=true;
          counter++;
        }
      }
      else{
        counter++;
      }

      

    }

    return counter;

  }

  getColor(index, colorspace){

    if(this.color[index].getColorType()===colorspace)
    return this.color[index];
    else{

      switch(colorspace){
          case "rgb":;
              return this.color[index].calcRGBColor();
          break;
          case "hsv":
              return this.color[index].calcHSVColor();
          break;
          case "lab":
              return this.color[index].calcLABColor();
          break;
          case "din99":
              return this.color[index].calcDIN99Color(kE,kCH);
          break;
          default:
          console.log("Error at the getColor function");
      }

    }
  }

  getType(index){
    return this.type[index];
  }

  getName(){
    return this.name;
  }

  setName(name){
    this.name=name;
  }

  addElement(color, ref, type){
    this.ref.push(ref);
    this.color.push(color);
    this.type.push(type);
  }

  clear(){
    this.ref = [];
    this.color = [];
    this.type = [];
  }
}
