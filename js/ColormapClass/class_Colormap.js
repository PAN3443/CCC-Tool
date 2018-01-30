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
