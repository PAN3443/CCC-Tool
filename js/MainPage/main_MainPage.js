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
        document.getElementById('id_color2_First').addEventListener("change", insertColorChange);
        document.getElementById('id_color2_First').addEventListener("keyup", insertColor);
        document.getElementById('id_color2_Second').addEventListener("change", insertColorChange);
        document.getElementById('id_color2_Second').addEventListener("keyup", insertColor);
        document.getElementById('id_color2_Third').addEventListener("change", insertColorChange);
        document.getElementById('id_color2_Third').addEventListener("keyup", insertColor);

        // Color Input Colorpicker HS
        document.getElementById('id_workcanvasPicker').addEventListener("mouseleave", colorpicker_MouseLeave);
        document.getElementById('id_workcanvasPicker').addEventListener("mousemove", colorpicker_MouseMove);
        document.getElementById('id_workcanvasPicker').addEventListener("click", colorpicker_MouseClick);

        // Color Input Colorpicker V
        document.getElementById('id_canvasPickerC1V').addEventListener("mouseleave", c1Vpicker_MouseLeave);
        document.getElementById('id_canvasPickerC1V').addEventListener("mouseenter", c1Vpicker_MouseEnter);
        document.getElementById('id_canvasPickerC1V').addEventListener("mousemove", c1Vpicker_MouseMove);
        document.getElementById('id_canvasPickerC1V').addEventListener("click",c1Vpicker_MouseClick);
        document.getElementById('id_canvasPickerC2V').addEventListener("mouseleave", c2Vpicker_MouseLeave);
        document.getElementById('id_canvasPickerC2V').addEventListener("mouseenter", c2Vpicker_MouseEnter);
        document.getElementById('id_canvasPickerC2V').addEventListener("mousemove", c2Vpicker_MouseMove);
        document.getElementById('id_canvasPickerC2V').addEventListener("click",c2Vpicker_MouseClick);

        // Band Type Change (Radio Button)
        document.getElementById('radiobutton_ConstantBand').addEventListener("change", changeBandType);
        document.getElementById('radiobutton_ScaledBand').addEventListener("change", changeBandType);

        // Drag And Drop
        document.getElementById('id_creatorBand').addEventListener("dragstart", bandOnDragStart);
        document.getElementById('id_creatorBand').addEventListener("dragend", bandOnDragEnd);
        document.getElementById('id_existConst_yellow_1').addEventListener("dragstart", bandOnDragStart);
        document.getElementById('id_existConst_yellow_1').addEventListener("dragend", bandOnDragEnd);

    // init //
    drawExistingColormaps();
    drawHSBackground();
    document.getElementById("radiobutton_ScaledBand").checked = true;
    drawColorCircles();
    updateCreatorBand();

    // for reload with F5
        document.getElementById('id_color1_First').value = 255;
        document.getElementById('id_color1_Second').value = 255;
        document.getElementById('id_color1_Third').value = 255;

        document.getElementById('id_color2_First').value = 0;
        document.getElementById('id_color2_Second').value = 0;
        document.getElementById('id_color2_Third').value = 0;


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

    var canvasColorspace = document.getElementById("id_workcanvasPicker");
    var rectPickerCanvas = document.getElementById("id_canvasPickerHS").getBoundingClientRect();
    //canvasColorspace.style.display = "initial";
    canvasColorspace.style.position = "absolute";
    canvasColorspace.style.width = rectPickerCanvas.width+"px";
    canvasColorspace.style.height = rectPickerCanvas.height+"px";
    canvasColorspace.style.top = rectPickerCanvas.top+"px";
    canvasColorspace.style.left = rectPickerCanvas.left+"px";


    document.getElementById("bandEditWindow").style.height = document.height+"px"; // workRec.height+"px";

}

