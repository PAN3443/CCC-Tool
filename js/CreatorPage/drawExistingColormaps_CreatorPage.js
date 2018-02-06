function drawPredefinedBands(){

    /*document.getElementById('button_AddConstantBand').style.display = "none";
    document.getElementById('id_tmpContainer').appendChild(document.getElementById('button_AddConstantBand'));
    document.getElementById('button_AddScaleBand').style.display = "none";
    document.getElementById('id_tmpContainer').appendChild(document.getElementById('button_AddScaleBand'));
    document.getElementById('button_AddDoubleBands').style.display = "none";
    document.getElementById('id_tmpContainer').appendChild(document.getElementById('button_AddDoubleBands'));
    document.getElementById('button_AddTripleBands').style.display = "none";
    document.getElementById('id_tmpContainer').appendChild(document.getElementById('button_AddTripleBands'));
    document.getElementById('button_AddQuadrupleBands').style.display = "none";
    document.getElementById('id_tmpContainer').appendChild(document.getElementById('button_AddQuadrupleBands'));*/

    //---------------------------
    // --------- Empty Divs
    document.getElementById('id_ConstantBand_Div').innerHTML = "";
    document.getElementById('id_ScaleBand_Div').innerHTML = "";
    document.getElementById('id_DoubleBands_Div').innerHTML = "";
    document.getElementById('id_TripleBands_Div').innerHTML = "";
    document.getElementById('id_QuadrupleBands_Div').innerHTML = "";

    var resolutionX = 100;
    var resolutionY = 1;

    //---------------------------
    // --------- Const
    for(var i=0; i<constBands.length; i++){

        var iDiv = document.createElement('div');
        iDiv.id = 'const'+i;
        iDiv.className = 'class_predefinedConstBands';
        iDiv.setAttribute('draggable', true);
        iDiv.style.background = constBands[i].getRGBString();
        document.getElementById('id_ConstantBand_Div').appendChild(iDiv);
        iDiv.addEventListener("click", openPredefinedBand);
        iDiv.addEventListener("dragstart", bandOnDragStart);
        iDiv.addEventListener("dragend", bandOnDragEnd);
        iDiv.style.cursor = "move";
    }
    //document.getElementById('id_ConstantBand_Div').appendChild(document.getElementById('button_AddConstantBand'));
    //document.getElementById('button_AddConstantBand').style.display = "initial";

    //---------------------------
    // --------- Scale
    for(var i=0; i<scaleBands.length; i++){

        var div = document.createElement("div");
        div.className = "row";
        div.style.width = "100%";
        div.style.marginTop = "1vh";

        var iCan = document.createElement('canvas');
        var id = 'scale'+i
        iCan.id = id;
        iCan.className = 'class_predefinedScaledBands';
        iCan.setAttribute('draggable', true);
        iCan.addEventListener("click", openPredefinedBand);
        iCan.addEventListener("dragstart", bandOnDragStart);
        iCan.addEventListener("dragend", bandOnDragEnd);
        iCan.style.cursor = "move";

        var tmpC1RGB = scaleBands[i][0];
        var tmpC2RGB = scaleBands[i][1];

        var reverseButton = document.createElement("div");
        reverseButton.className = "class_reversebuttonCreatePage classButtonWhite";
        reverseButton.innerHTML = "&#8646;";
        reverseButton.style.cursor = "pointer";

        reverseButton.onclick = (function(tmpIndex) {
        return function() {
            // do the reverse
            var tmpVar = scaleBands[tmpIndex][0];
            scaleBands[tmpIndex][0]=scaleBands[tmpIndex][1];
            scaleBands[tmpIndex][1]=tmpVar;
            var canObj = document.getElementById("scale"+tmpIndex);
            var tmpC1 = scaleBands[tmpIndex][0];
            var tmpC2 = scaleBands[tmpIndex][1];
            drawCanvasBand(canObj, tmpC1, tmpC2,resolutionX);

        };
      })(i);

        div.appendChild(iCan);
        div.appendChild(reverseButton);
        document.getElementById('id_ScaleBand_Div').appendChild(div);

        drawCanvasBand(iCan, tmpC1RGB, tmpC2RGB,resolutionX);

    }
    //document.getElementById('id_ScaleBand_Div').appendChild(document.getElementById('button_AddScaleBand'));
    //document.getElementById('button_AddScaleBand').style.display = "initial";

    //---------------------------
    // --------- Double

    for(var i=0; i<doubleBands.length; i++){

      var div = document.createElement("div");
      div.className = "row";
      div.style.width = "100%";
      div.style.marginTop = "1vh";

        var iCan = document.createElement('canvas');
        iCan.id = 'double'+i;
        iCan.className = 'class_predefinedScaledBands';
        iCan.setAttribute('draggable', true);

        //document.getElementById('id_DoubleBands_Div').appendChild(iCan);
        iCan.addEventListener("click", openPredefinedBand);
        iCan.addEventListener("dragstart", bandOnDragStart);
        iCan.addEventListener("dragend", bandOnDragEnd);
        iCan.style.cursor = "move";

        iCan.width = resolutionX;
        iCan.height = resolutionY;

        var reverseButton = document.createElement("div");
        reverseButton.className = "class_reversebuttonCreatePage classButtonWhite";
        reverseButton.innerHTML = "&#8646;";
        reverseButton.style.cursor = "pointer";

        reverseButton.onclick = (function(tmpIndex) {
        return function() {
            // do the reverse
            var tmpVar = doubleBands[tmpIndex][0];
            doubleBands[tmpIndex][0]=doubleBands[tmpIndex][2];
            doubleBands[tmpIndex][2]=tmpVar;
            var canObj = document.getElementById("double"+tmpIndex);
            var tmpC1 = doubleBands[tmpIndex][0];
            var tmpC2 = doubleBands[tmpIndex][1];
            var tmpC3 = doubleBands[tmpIndex][2];

            var ctx = canObj.getContext("2d");
            //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
            var data = ctx.getImageData(0, 0, canObj.width, canObj.height);

            var bandWidth = Math.round(resolutionX/2);

            switch(colorspaceModus){
                        case "rgb":
                            data=createScaledBand(data, 0, bandWidth, resolutionY, tmpC1, tmpC2, resolutionX);
                            data=createScaledBand(data, bandWidth, bandWidth, resolutionY, tmpC2, tmpC3, resolutionX);
                        break;
                        case "hsv":
                            data=createScaledBand(data, 0, bandWidth, resolutionY, tmpC1.calcHSVColor(), tmpC2.calcHSVColor(), resolutionX);
                            data=createScaledBand(data, bandWidth, bandWidth, resolutionY, tmpC2.calcHSVColor(), tmpC3.calcHSVColor(), resolutionX);
                        break;
                        case "lab":
                            data=createScaledBand(data, 0, bandWidth, resolutionY, tmpC1.calcLABColor(), tmpC2.calcLABColor(), resolutionX);
                            data=createScaledBand(data, bandWidth, bandWidth, resolutionY, tmpC2.calcLABColor(), tmpC3.calcLABColor(), resolutionX);
                        break;
                        case "din99":
                            data=createScaledBand(data, 0, bandWidth, resolutionY, tmpC1.calcDIN99Color(kE,kCH), tmpC2.calcDIN99Color(kE,kCH), resolutionX);
                            data=createScaledBand(data, bandWidth, bandWidth, resolutionY, tmpC2.calcDIN99Color(kE,kCH), tmpC3.calcDIN99Color(kE,kCH), resolutionX);
                        break;
                        default:
                            console.log("Error at the updateCreatorBand function");
            }

            ctx.putImageData(data, 0, 0);

        };
      })(i);

        div.appendChild(iCan);
        div.appendChild(reverseButton);
        document.getElementById('id_DoubleBands_Div').appendChild(div);

        var tmpC1RGB = doubleBands[i][0];
        var tmpC2RGB = doubleBands[i][1];
        var tmpC3RGB = doubleBands[i][2];

        var canvasContex = iCan.getContext("2d");
        //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
        var canvasData = canvasContex.getImageData(0, 0, iCan.width, iCan.height);

        var bandWidth = Math.round(resolutionX/2);

        switch(colorspaceModus){
                    case "rgb":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB, tmpC2RGB, resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB, tmpC3RGB, resolutionX);
                    break;
                    case "hsv":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcHSVColor(), tmpC2RGB.calcHSVColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcHSVColor(), tmpC3RGB.calcHSVColor(), resolutionX);
                    break;
                    case "lab":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcLABColor(), tmpC2RGB.calcLABColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcLABColor(), tmpC3RGB.calcLABColor(), resolutionX);
                    break;
                    case "din99":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcDIN99Color(kE,kCH), tmpC2RGB.calcDIN99Color(kE,kCH), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcDIN99Color(kE,kCH), tmpC3RGB.calcDIN99Color(kE,kCH), resolutionX);
                    break;
                    default:
                        console.log("Error at the updateCreatorBand function");
        }

        canvasContex.putImageData(canvasData, 0, 0);

    }
    //document.getElementById('id_DoubleBands_Div').appendChild(document.getElementById('button_AddDoubleBands'));
    //document.getElementById('button_AddDoubleBands').style.display = "initial";

     //---------------------------
    // --------- Tripe

    for(var i=0; i<tribleBands.length; i++){

        var div = document.createElement("div");
        div.className = "row";
        div.style.width = "100%";
        div.style.marginTop = "1vh";

        var iCan = document.createElement('canvas');
        var id= 'triple'+i;
        iCan.id = id;
        iCan.className = 'class_predefinedScaledBands';
        iCan.setAttribute('draggable', true);
        iCan.style.cursor = "move";

        //document.getElementById('id_TripleBands_Div').appendChild(iCan);
        iCan.addEventListener("click", openPredefinedBand);
        iCan.addEventListener("dragstart", bandOnDragStart);
        iCan.addEventListener("dragend", bandOnDragEnd);


        var reverseButton = document.createElement("div");
        reverseButton.className = "class_reversebuttonCreatePage classButtonWhite";
        reverseButton.innerHTML = "&#8646;";
        reverseButton.style.cursor = "pointer";

        reverseButton.onclick = (function(tmpIndex) {
        return function() {
            // do the reverse
            var tmpVar = tribleBands[tmpIndex][0];
            tribleBands[tmpIndex][0]=tribleBands[tmpIndex][3];
            tribleBands[tmpIndex][3]=tmpVar;

            tmpVar = tribleBands[tmpIndex][1];
            tribleBands[tmpIndex][1]=tribleBands[tmpIndex][2];
            tribleBands[tmpIndex][2]=tmpVar;

            var canObj = document.getElementById("triple"+tmpIndex);

            var tmpC1RGB = tribleBands[tmpIndex][0];
            var tmpC2RGB = tribleBands[tmpIndex][1];
            var tmpC3RGB = tribleBands[tmpIndex][2];
            var tmpC4RGB = tribleBands[tmpIndex][3];

            canObj.width = resolutionX;
            canObj.height = resolutionY;

            var canvasContex = canObj.getContext("2d");
            //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
            var canvasData = canvasContex.getImageData(0, 0, canObj.width, canObj.height);

            var bandWidth = Math.round(resolutionX/3);

            switch(colorspaceModus){
                        case "rgb":
                            canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB, tmpC2RGB, resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB, tmpC3RGB, resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB, tmpC4RGB, resolutionX);
                        break;
                        case "hsv":
                            canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcHSVColor(), tmpC2RGB.calcHSVColor(), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcHSVColor(), tmpC3RGB.calcHSVColor(), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcHSVColor(), tmpC4RGB.calcHSVColor(), resolutionX);
                        break;
                        case "lab":
                            canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcLABColor(), tmpC2RGB.calcLABColor(), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcLABColor(), tmpC3RGB.calcLABColor(), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcLABColor(), tmpC4RGB.calcLABColor(), resolutionX);
                        break;
                        case "din99":
                            canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcDIN99Color(kE,kCH), tmpC2RGB.calcDIN99Color(kE,kCH), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcDIN99Color(kE,kCH), tmpC3RGB.calcDIN99Color(kE,kCH), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcDIN99Color(kE,kCH), tmpC4RGB.calcDIN99Color(kE,kCH), resolutionX);
                        break;
                        default:
                            console.log("Error at the updateCreatorBand function");
            }

            canvasContex.putImageData(canvasData, 0, 0);


        };
      })(i);

      div.appendChild(iCan);
      div.appendChild(reverseButton);
      document.getElementById('id_TripleBands_Div').appendChild(div);


        var tmpC1RGB = tribleBands[i][0];
        var tmpC2RGB = tribleBands[i][1];
        var tmpC3RGB = tribleBands[i][2];
        var tmpC4RGB = tribleBands[i][3];

        iCan.width = resolutionX;
        iCan.height = resolutionY;

        var canvasContex = iCan.getContext("2d");
        //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
        var canvasData = canvasContex.getImageData(0, 0, iCan.width, iCan.height);

        var bandWidth = Math.round(resolutionX/3);

        switch(colorspaceModus){
                    case "rgb":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB, tmpC2RGB, resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB, tmpC3RGB, resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB, tmpC4RGB, resolutionX);
                    break;
                    case "hsv":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcHSVColor(), tmpC2RGB.calcHSVColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcHSVColor(), tmpC3RGB.calcHSVColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcHSVColor(), tmpC4RGB.calcHSVColor(), resolutionX);
                    break;
                    case "lab":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcLABColor(), tmpC2RGB.calcLABColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcLABColor(), tmpC3RGB.calcLABColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcLABColor(), tmpC4RGB.calcLABColor(), resolutionX);
                    break;
                    case "din99":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcDIN99Color(kE,kCH), tmpC2RGB.calcDIN99Color(kE,kCH), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcDIN99Color(kE,kCH), tmpC3RGB.calcDIN99Color(kE,kCH), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcDIN99Color(kE,kCH), tmpC4RGB.calcDIN99Color(kE,kCH), resolutionX);
                    break;
                    default:
                        console.log("Error at the updateCreatorBand function");
        }

        canvasContex.putImageData(canvasData, 0, 0);

    }
    //document.getElementById('id_TripleBands_Div').appendChild(document.getElementById('button_AddTripleBands'));
    //document.getElementById('button_AddTripleBands').style.display = "initial";

     //---------------------------
    // --------- Quad

    for(var i=0; i<quadBands.length; i++){

        var div = document.createElement("div");
        div.className = "row";
        div.style.width = "100%";
        div.style.marginTop = "1vh";

        var iCan = document.createElement('canvas');
        var id= 'quads'+i;
        iCan.id = id;
        iCan.className = 'class_predefinedScaledBands';
        iCan.setAttribute('draggable', true);
        iCan.style.cursor = "move";

        //document.getElementById('id_QuadrupleBands_Div').appendChild(iCan);
        iCan.addEventListener("click", openPredefinedBand);
        iCan.addEventListener("dragstart", bandOnDragStart);
        iCan.addEventListener("dragend", bandOnDragEnd);

        var reverseButton = document.createElement("div");
        reverseButton.className = "class_reversebuttonCreatePage classButtonWhite";
        reverseButton.innerHTML = "&#8646;";
        reverseButton.style.cursor = "pointer";

        reverseButton.onclick = (function(tmpIndex) {
        return function() {
            // do the reverse
            var tmpVar = quadBands[tmpIndex][0];
            quadBands[tmpIndex][0]=quadBands[tmpIndex][4];
            quadBands[tmpIndex][4]=tmpVar;

            tmpVar = quadBands[tmpIndex][1];
            quadBands[tmpIndex][1]=quadBands[tmpIndex][3];
            quadBands[tmpIndex][3]=tmpVar;

            var canObj = document.getElementById("quads"+tmpIndex);

            var tmpC1RGB = quadBands[tmpIndex][0];
            var tmpC2RGB = quadBands[tmpIndex][1];
            var tmpC3RGB = quadBands[tmpIndex][2];
            var tmpC4RGB = quadBands[tmpIndex][3];
            var tmpC5RGB = quadBands[tmpIndex][4];

            canObj.width = resolutionX;
            canObj.height = resolutionY;

            var canvasContex = canObj.getContext("2d");
            //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
            var canvasData = canvasContex.getImageData(0, 0, canObj.width, canObj.height);

            var bandWidth = Math.round(resolutionX/4);

            switch(colorspaceModus){
                        case "rgb":
                            canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB, tmpC2RGB, resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB, tmpC3RGB, resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB, tmpC4RGB, resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC4RGB, tmpC5RGB, resolutionX);
                        break;
                        case "hsv":
                            canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcHSVColor(), tmpC2RGB.calcHSVColor(), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcHSVColor(), tmpC3RGB.calcHSVColor(), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcHSVColor(), tmpC4RGB.calcHSVColor(), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC4RGB.calcHSVColor(), tmpC5RGB.calcHSVColor(), resolutionX);
                        break;
                        case "lab":
                            canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcLABColor(), tmpC2RGB.calcLABColor(), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcLABColor(), tmpC3RGB.calcLABColor(), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcLABColor(), tmpC4RGB.calcLABColor(), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC4RGB.calcLABColor(), tmpC5RGB.calcLABColor(), resolutionX);
                        break;
                        case "din99":
                            canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcDIN99Color(kE,kCH), tmpC2RGB.calcDIN99Color(kE,kCH), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcDIN99Color(kE,kCH), tmpC3RGB.calcDIN99Color(kE,kCH), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcDIN99Color(kE,kCH), tmpC4RGB.calcDIN99Color(kE,kCH), resolutionX);
                            canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC4RGB.calcDIN99Color(kE,kCH), tmpC5RGB.calcDIN99Color(kE,kCH), resolutionX);
                        break;
                        default:
                            console.log("Error at the updateCreatorBand function");
            }

            canvasContex.putImageData(canvasData, 0, 0);


        };
      })(i);

      div.appendChild(iCan);
      div.appendChild(reverseButton);
      document.getElementById('id_QuadrupleBands_Div').appendChild(div);

        var tmpC1RGB = quadBands[i][0];
        var tmpC2RGB = quadBands[i][1];
        var tmpC3RGB = quadBands[i][2];
        var tmpC4RGB = quadBands[i][3];
        var tmpC5RGB = quadBands[i][4];

        iCan.width = resolutionX;
        iCan.height = resolutionY;

        var canvasContex = iCan.getContext("2d");
        //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
        var canvasData = canvasContex.getImageData(0, 0, iCan.width, iCan.height);

        var bandWidth = Math.round(resolutionX/4);

        switch(colorspaceModus){
                    case "rgb":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB, tmpC2RGB, resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB, tmpC3RGB, resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB, tmpC4RGB, resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC4RGB, tmpC5RGB, resolutionX);
                    break;
                    case "hsv":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcHSVColor(), tmpC2RGB.calcHSVColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcHSVColor(), tmpC3RGB.calcHSVColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcHSVColor(), tmpC4RGB.calcHSVColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC4RGB.calcHSVColor(), tmpC5RGB.calcHSVColor(), resolutionX);
                    break;
                    case "lab":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcLABColor(), tmpC2RGB.calcLABColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcLABColor(), tmpC3RGB.calcLABColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcLABColor(), tmpC4RGB.calcLABColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC4RGB.calcLABColor(), tmpC5RGB.calcLABColor(), resolutionX);
                    break;
                    case "din99":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcDIN99Color(kE,kCH), tmpC2RGB.calcDIN99Color(kE,kCH), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcDIN99Color(kE,kCH), tmpC3RGB.calcDIN99Color(kE,kCH), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcDIN99Color(kE,kCH), tmpC4RGB.calcDIN99Color(kE,kCH), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC4RGB.calcDIN99Color(kE,kCH), tmpC5RGB.calcDIN99Color(kE,kCH), resolutionX);
                    break;
                    default:
                        console.log("Error at the updateCreatorBand function");
        }

        canvasContex.putImageData(canvasData, 0, 0);

    }
    //document.getElementById('id_QuadrupleBands_Div').appendChild(document.getElementById('button_AddQuadrupleBands'));
    //document.getElementById('button_AddQuadrupleBands').style.display = "initial";
}
