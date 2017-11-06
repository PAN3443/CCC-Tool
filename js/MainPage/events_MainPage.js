function expandTable(){

    if(tableIsExpand){
        document.getElementById("id_table_workwindow").style.width = 0+"%";
        document.getElementById("id_table_workwindow").style.display = "none";
        tableIsExpand=false;
    }
    else{
        document.getElementById("id_table_workwindow").style.width = 17+"cm";
        document.getElementById("id_table_workwindow").style.display = "initial";
        tableIsExpand=true;
    }
}


///////////////////////////////
//// switch colorspace //////
///////////////////////////////

function changeColorspace(type){

    document.getElementById("button_RGB").style.border = "2px solid white";
    document.getElementById("button_RGB").style.color = "white";
    document.getElementById("button_HSV").style.border = "2px solid white";
    document.getElementById("button_HSV").style.color = "white";
    document.getElementById("button_LAB").style.border = "2px solid white";
    document.getElementById("button_LAB").style.color = "white";
    document.getElementById("button_DIN99").style.border = "2px solid white";
    document.getElementById("button_DIN99").style.color = "white";

    switch(type){
        case 0:
        colorspaceModus="rgb";
        document.getElementById("button_RGB").style.border = "2px solid yellow";
        document.getElementById("button_RGB").style.color = "yellow";
        break;
        case 1:
        colorspaceModus="hsv";
        document.getElementById("button_HSV").style.border = "2px solid yellow";
        document.getElementById("button_HSV").style.color = "yellow";
        break;
        case 2:
        colorspaceModus="lab";
        document.getElementById("button_LAB").style.border = "2px solid yellow";
        document.getElementById("button_LAB").style.color = "yellow";
        break;
        case 3:
        colorspaceModus="din99";
        document.getElementById("button_DIN99").style.border = "2px solid yellow";
        document.getElementById("button_DIN99").style.color = "yellow";
        break;
        default:
        colorspaceModus="rgb";
        document.getElementById("button_RGB").style.border = "2px solid yellow";
        document.getElementById("button_RGB").style.color = "yellow";
    }

    drawExistingColormaps();

}