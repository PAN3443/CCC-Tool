function drawExistingColormaps(){

    yellow1Colormap = xmlColormapParser(pathyellow1);
    yellow2Colormap = xmlColormapParser(pathyellow2);
    yellow3Colormap = xmlColormapParser(pathyellow3);

    red1Colormap = xmlColormapParser(pathred1);
    red2Colormap = xmlColormapParser(pathred2);
    red3Colormap = xmlColormapParser(pathredw3);

    blue1Colormap = xmlColormapParser(pathblue1);
    blue2Colormap = xmlColormapParser(pathblue2);
    blue3Colormap = xmlColormapParser(pathblue3);

    green1Colormap = xmlColormapParser(pathgreen1);
    green2Colormap = xmlColormapParser(pathgreen2);
    green3Colormap = xmlColormapParser(pathgreen3);

    drawCanvasColormap("id_existMap_yellow_1",700, 50, yellow1Colormap);
    drawCanvasColormap("id_existMap_yellow_2",700, 50, yellow2Colormap);
    drawCanvasColormap("id_existMap_yellow_3",700, 50, yellow3Colormap);

    drawCanvasColormap("id_existMap_red_1",700, 50, red1Colormap);
    drawCanvasColormap("id_existMap_red_2",700, 50, red2Colormap);
    drawCanvasColormap("id_existMap_red_3",700, 50, red3Colormap);

    drawCanvasColormap("id_existMap_blue_1",700, 50, blue1Colormap);
    drawCanvasColormap("id_existMap_blue_2",700, 50, blue2Colormap);
    drawCanvasColormap("id_existMap_blue_3",700, 50, blue3Colormap);

    drawCanvasColormap("id_existMap_green_1",700, 50, green1Colormap);
    drawCanvasColormap("id_existMap_green_2",700, 50, green2Colormap);
    drawCanvasColormap("id_existMap_green_3",700, 50, green3Colormap);
}