class class_Edit_Section extends class_Edit_Basis_Section {

  constructor() {
    super('id_EditPage','id_EditPage_CMS_Canvas');
    this.myDesignID = undefined;
  }

  updateSection(){
    if(this.editCMS.getKeyLength==0){

    }
    else{

    }

    super.updateSection();
  }

  setCMS(cms,id){
    super.setCMS(cms);
    this.myDesignID = id;
  }

  createCMS(name, intSpace){
    this.editCMS.clear();
    this.editCMS.setColormapName(name);
    this.editCMS.setInterpolationType(intSpace);
    this.myDesignID = myDesignsSection.getMyDesignLength();

    this.editCMS= new class_CMS();
    this.editCMS.setPreventIntervals(true);
    this.editCMS.pushKey(new class_Key(undefined, new class_Color_RGB(0.25,0.25,0.5), 0, false));
    this.editCMS.pushKey(new class_Key(new class_Color_RGB(0.5,0.75,0.5), new class_Color_RGB(0.5,0.75,0.5), 0.5, false));
    this.editCMS.pushKey(new class_Key(new class_Color_RGB(0.75,0.25,0.5), undefined, 1, false));
    this.editCMS.setAboveColor(new class_Color_RGB(1.0,0,0));
    this.editCMS.setBelowColor(new class_Color_RGB(0,0,1.0));
    this.editCMS.setInterpolationSpace("rgb");
    this.editCMS.setPreventIntervals(false);

  }

};
