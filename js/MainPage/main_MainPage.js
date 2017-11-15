window.onload = function () {


    // Style Init
    styleMainPage();

    //// set events
        // Table
        document.getElementById('id_expandTablebutton').addEventListener("click", expandTable);

        // Color Input
        document.getElementById('id_color1_First').addEventListener("change", insertColorChange);
        document.getElementById('id_color1_First').addEventListener("keyup", insertColor);
        document.getElementById('id_color1_Second').addEventListener("change", insertColorChange);
        document.getElementById('id_color1_Second').addEventListener("keyup", insertColor);
        document.getElementById('id_color1_Third').addEventListener("change", insertColorChange);
        document.getElementById('id_color1_Third').addEventListener("keyup", insertColor);

        // Color Input Colorpicker HS
        document.getElementById('id_workcanvasPicker').addEventListener("mousemove", colorpicker_MouseMove);
        document.getElementById('id_workcanvasPicker').addEventListener("click", colorpicker_MouseClick);

        // Color Input Colorpicker V
        document.getElementById('id_canvasPickerC1V').addEventListener("mousemove", c1Vpicker_MouseMove);
        document.getElementById('id_canvasPickerC1V').addEventListener("click",c1Vpicker_MouseClick);

        // Drag And Drop
        document.getElementById('id_creatorBand').addEventListener("dragstart", bandOnDragStart);
        document.getElementById('id_creatorBand').addEventListener("dragend", bandOnDragEnd);

        // Band Editor
        document.getElementById('cancelBandEdit').addEventListener("click", deleteBandEditor);
        document.getElementById('acceptBandEdit').addEventListener("click", acceptBandEditor);
    
        // init //
        drawPredefinedBands();
        drawHSBackground("id_canvasPickerHS");
        drawHSBackground("id_bandEditCanvasPickerHS");
        drawColorCircles();
        updateCreatorBand();
        styleBandCreator();

        // for reload with F5
        document.getElementById('id_color1_First').value = 255;
        document.getElementById('id_color1_Second').value = 255;
        document.getElementById('id_color1_Third').value = 255;


    // init color sketch
        orderColorSketch();

}

window.onresize = function(event) {
    drawColorCircles();
    styleMainPage();
};

window.onscroll = function () {

    drawColorCircles();


};

function styleMainPage(){
    var workRec = document.getElementById("id_mainpage").getBoundingClientRect();
    document.getElementById("id_expandTablebutton").style.height = workRec.height+"px";

    // Main Page colorpicker
    var canvasColorspace = document.getElementById("id_workcanvasPicker");
    var rectPickerCanvas = document.getElementById("id_canvasPickerHS").getBoundingClientRect();
    //canvasColorspace.style.display = "initial";
    canvasColorspace.style.position = "absolute";
    canvasColorspace.style.width = rectPickerCanvas.width+"px";
    canvasColorspace.style.height = rectPickerCanvas.height+"px";
    canvasColorspace.style.top = rectPickerCanvas.top+"px";
    canvasColorspace.style.left = rectPickerCanvas.left+"px";

    // Band Edit colorpicker
    canvasColorspace = document.getElementById("id_bandEditWorkcanvasPicker");
    rectPickerCanvas = document.getElementById("id_bandEditCanvasPickerHS").getBoundingClientRect();
    //canvasColorspace.style.display = "initial";
    canvasColorspace.style.position = "absolute";
    canvasColorspace.style.width = rectPickerCanvas.width+"px";
    canvasColorspace.style.height = rectPickerCanvas.height+"px";
    canvasColorspace.style.top = rectPickerCanvas.top+"px";
    canvasColorspace.style.left = rectPickerCanvas.left+"px";

    document.getElementById("bandEditWindow").style.height = document.height+"px"; // workRec.height+"px";

}

