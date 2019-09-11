class class_Point3{
    constructor(x,y,z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    deleteReferences(){
      delete this.x;
      delete this.y;
      delete this.z;
    }

    getXPos(){
      return this.x;
    }

    getYPos(){
      return this.y;
    }

    getZPos(){
      return this.z;
    }

}
