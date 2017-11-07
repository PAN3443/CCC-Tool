window.onload = function () {


    //// set events
    // Table
        document.getElementById('id_expandTablebutton').addEventListener("click", expandTable);

    //

    // init //
    drawExistingColormaps();
    drawHSBackground();
    document.getElementById("radiobutton_ScaledBand").checked = true;
    drawColorCircles();

}

window.onresize = function(event) {
    drawColorCircles();
};