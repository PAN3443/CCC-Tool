function drawMyDesigns(){

    initMyDesignObj();

    for(var i=0; i<myDesignsList.length; i++){
        document.getElementById("myDesignObj_Label_"+i).innerHTML=myDesignsList[i].getColormapName()+" ("+myDesignsList[i].getInterpolationSpace()+"):";
        document.getElementById("myDesignObj_Label_"+i).style.color="white";

        drawCanvasColormap("myDesignObj_CMSlinear_"+i, myDesignsList[i]);
        drawBandSketch(myDesignsList[i],"myDesignObj_CMSsketch_"+i, false, -1);

    }


}
