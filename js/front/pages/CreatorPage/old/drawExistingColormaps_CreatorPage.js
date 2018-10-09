function drawPredefinedBands(){

    drawConstantBands();
    drawScaledBands();
    drawDoubleBands();
    drawTripleBands();
    drawQuadrupleBands();

}



function drawConstantBands(){
  //---------------------------
  // --------- Empty Divs
  document.getElementById('id_ConstantBand_Div').innerHTML = "";

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
      iDiv.addEventListener("dragstart", bandOnDragStart);
      iDiv.addEventListener("dragend", bandOnDragEnd);
      iDiv.style.cursor = "move";
  }
}

function drawScaledBands(){
  document.getElementById('id_ScaleBand_Div').innerHTML = "";

  var resolutionX = 100;
  var resolutionY = 1;

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
}

function drawDoubleBands(){
  document.getElementById('id_DoubleBands_Div').innerHTML = "";

  var resolutionX = 100;
  var resolutionY = 1;
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
          doubleBands[tmpIndex][0]=doubleBands[tmpIndex][3];
          doubleBands[tmpIndex][3]=tmpVar;
          tmpVar = doubleBands[tmpIndex][1];
          doubleBands[tmpIndex][1]=doubleBands[tmpIndex][2];
          doubleBands[tmpIndex][2]=tmpVar;

          var canObj = document.getElementById("double"+tmpIndex);
          var tmpC1 = doubleBands[tmpIndex][0];
          var tmpC2 = doubleBands[tmpIndex][1];
          var tmpC3 = doubleBands[tmpIndex][2];
          var tmpC4 = doubleBands[tmpIndex][3];

          var ctx = canObj.getContext("2d");
          //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
          var data = ctx.getImageData(0, 0, canObj.width, canObj.height);

          var bandWidth = Math.round(resolutionX/2);

          switch(colorspaceModus){
                      case "rgb":
                          data=createScaledBand(data, 0, bandWidth, resolutionY, tmpC1, tmpC2, resolutionX);
                          data=createScaledBand(data, bandWidth, bandWidth, resolutionY, tmpC3, tmpC4, resolutionX);
                      break;
                      case "hsv":
                          data=createScaledBand(data, 0, bandWidth, resolutionY, tmpC1.calcHSVColor(), tmpC2.calcHSVColor(), resolutionX);
                          data=createScaledBand(data, bandWidth, bandWidth, resolutionY, tmpC3.calcHSVColor(), tmpC4.calcHSVColor(), resolutionX);
                      break;
                      case "lab":
                          data=createScaledBand(data, 0, bandWidth, resolutionY, tmpC1.calcLABColor(), tmpC2.calcLABColor(), resolutionX);
                          data=createScaledBand(data, bandWidth, bandWidth, resolutionY, tmpC3.calcLABColor(), tmpC4.calcLABColor(), resolutionX);
                      break;
                      case "din99":
                          data=createScaledBand(data, 0, bandWidth, resolutionY, tmpC1.calcDIN99Color(), tmpC2.calcDIN99Color(), resolutionX);
                          data=createScaledBand(data, bandWidth, bandWidth, resolutionY, tmpC3.calcDIN99Color(), tmpC4.calcDIN99Color(), resolutionX);
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
      var tmpC4RGB = doubleBands[i][3];

      var canvasContex = iCan.getContext("2d");
      //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
      var canvasData = canvasContex.getImageData(0, 0, iCan.width, iCan.height);

      var bandWidth = Math.round(resolutionX/2);

      switch(colorspaceModus){
                  case "rgb":
                      canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB, tmpC2RGB, resolutionX);
                      canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB, tmpC4RGB, resolutionX);
                  break;
                  case "hsv":
                      canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcHSVColor(), tmpC2RGB.calcHSVColor(), resolutionX);
                      canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcHSVColor(), tmpC4RGB.calcHSVColor(), resolutionX);
                  break;
                  case "lab":
                      canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcLABColor(), tmpC2RGB.calcLABColor(), resolutionX);
                      canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcLABColor(), tmpC4RGB.calcLABColor(), resolutionX);
                  break;
                  case "din99":
                      canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcDIN99Color(), tmpC2RGB.calcDIN99Color(), resolutionX);
                      canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcDIN99Color(), tmpC4RGB.calcDIN99Color(), resolutionX);
                  break;
                  default:
                      console.log("Error at the updateCreatorBand function");
      }

      canvasContex.putImageData(canvasData, 0, 0);

  }



}

function drawTripleBands(){
  document.getElementById('id_TripleBands_Div').innerHTML = "";

  var resolutionX = 120;
  var resolutionY = 1;

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
          tribleBands[tmpIndex][0]=tribleBands[tmpIndex][5];
          tribleBands[tmpIndex][5]=tmpVar;

          tmpVar = tribleBands[tmpIndex][1];
          tribleBands[tmpIndex][1]=tribleBands[tmpIndex][4];
          tribleBands[tmpIndex][4]=tmpVar;

          tmpVar = tribleBands[tmpIndex][2];
          tribleBands[tmpIndex][2]=tribleBands[tmpIndex][3];
          tribleBands[tmpIndex][3]=tmpVar;

          var canObj = document.getElementById("triple"+tmpIndex);

          var tmpC1RGB = tribleBands[tmpIndex][0];
          var tmpC2RGB = tribleBands[tmpIndex][1];
          var tmpC3RGB = tribleBands[tmpIndex][2];
          var tmpC4RGB = tribleBands[tmpIndex][3];
          var tmpC5RGB = tribleBands[tmpIndex][4];
          var tmpC6RGB = tribleBands[tmpIndex][5];

          canObj.width = resolutionX;
          canObj.height = resolutionY;

          var canvasContex = canObj.getContext("2d");
          //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
          var canvasData = canvasContex.getImageData(0, 0, canObj.width, canObj.height);

          var bandWidth = Math.round(resolutionX/3);

          switch(colorspaceModus){
                      case "rgb":
                          canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB, tmpC2RGB, resolutionX);
                          canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB, tmpC4RGB, resolutionX);
                          canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB, tmpC6RGB, resolutionX);
                      break;
                      case "hsv":
                          canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcHSVColor(), tmpC2RGB.calcHSVColor(), resolutionX);
                          canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcHSVColor(), tmpC4RGB.calcHSVColor(), resolutionX);
                          canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB.calcHSVColor(), tmpC6RGB.calcHSVColor(), resolutionX);
                      break;
                      case "lab":
                          canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcLABColor(), tmpC2RGB.calcLABColor(), resolutionX);
                          canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcLABColor(), tmpC4RGB.calcLABColor(), resolutionX);
                          canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB.calcLABColor(), tmpC6RGB.calcLABColor(), resolutionX);
                      break;
                      case "din99":
                          canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcDIN99Color(), tmpC2RGB.calcDIN99Color(), resolutionX);
                          canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcDIN99Color(), tmpC4RGB.calcDIN99Color(), resolutionX);
                          canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB.calcDIN99Color(), tmpC6RGB.calcDIN99Color(), resolutionX);
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
      var tmpC5RGB = tribleBands[i][4];
      var tmpC6RGB = tribleBands[i][5];

      iCan.width = resolutionX;
      iCan.height = resolutionY;

      var canvasContex = iCan.getContext("2d");
      //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
      var canvasData = canvasContex.getImageData(0, 0, iCan.width, iCan.height);

      var bandWidth = Math.round(resolutionX/3);

      switch(colorspaceModus){
                  case "rgb":
                      canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB, tmpC2RGB, resolutionX);
                      canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB, tmpC4RGB, resolutionX);
                      canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB, tmpC6RGB, resolutionX);
                  break;
                  case "hsv":
                      canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcHSVColor(), tmpC2RGB.calcHSVColor(), resolutionX);
                      canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcHSVColor(), tmpC4RGB.calcHSVColor(), resolutionX);
                      canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB.calcHSVColor(), tmpC6RGB.calcHSVColor(), resolutionX);
                  break;
                  case "lab":
                      canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcLABColor(), tmpC2RGB.calcLABColor(), resolutionX);
                      canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcLABColor(), tmpC4RGB.calcLABColor(), resolutionX);
                      canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB.calcLABColor(), tmpC6RGB.calcLABColor(), resolutionX);
                  break;
                  case "din99":
                      canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcDIN99Color(), tmpC2RGB.calcDIN99Color(), resolutionX);
                      canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcDIN99Color(), tmpC4RGB.calcDIN99Color(), resolutionX);
                      canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB.calcDIN99Color(), tmpC6RGB.calcDIN99Color(), resolutionX);
                  break;
                  default:
                      console.log("Error at the updateCreatorBand function");
      }

      canvasContex.putImageData(canvasData, 0, 0);

  }



}

function drawQuadrupleBands(){
  document.getElementById('id_QuadrupleBands_Div').innerHTML = "";

  var resolutionX = 100;
  var resolutionY = 1;

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
         quadBands[tmpIndex][0]=quadBands[tmpIndex][7];
         quadBands[tmpIndex][7]=tmpVar;

         tmpVar = quadBands[tmpIndex][1];
         quadBands[tmpIndex][1]=quadBands[tmpIndex][6];
         quadBands[tmpIndex][6]=tmpVar;

         tmpVar = quadBands[tmpIndex][2];
         quadBands[tmpIndex][2]=quadBands[tmpIndex][5];
         quadBands[tmpIndex][5]=tmpVar;

         tmpVar = quadBands[tmpIndex][3];
         quadBands[tmpIndex][3]=quadBands[tmpIndex][4];
         quadBands[tmpIndex][4]=tmpVar;

         var canObj = document.getElementById("quads"+tmpIndex);

         var tmpC1RGB = quadBands[tmpIndex][0];
         var tmpC2RGB = quadBands[tmpIndex][1];
         var tmpC3RGB = quadBands[tmpIndex][2];
         var tmpC4RGB = quadBands[tmpIndex][3];
         var tmpC5RGB = quadBands[tmpIndex][4];
         var tmpC6RGB = quadBands[tmpIndex][5];
         var tmpC7RGB = quadBands[tmpIndex][6];
         var tmpC8RGB = quadBands[tmpIndex][7];

         canObj.width = resolutionX;
         canObj.height = resolutionY;

         var canvasContex = canObj.getContext("2d");
         //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
         var canvasData = canvasContex.getImageData(0, 0, canObj.width, canObj.height);

         var bandWidth = Math.round(resolutionX/4);

         switch(colorspaceModus){
                     case "rgb":
                         canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB, tmpC2RGB, resolutionX);
                         canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB, tmpC4RGB, resolutionX);
                         canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB, tmpC6RGB, resolutionX);
                         canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC7RGB, tmpC8RGB, resolutionX);
                     break;
                     case "hsv":
                         canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcHSVColor(), tmpC2RGB.calcHSVColor(), resolutionX);
                         canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcHSVColor(), tmpC4RGB.calcHSVColor(), resolutionX);
                         canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB.calcHSVColor(), tmpC6RGB.calcHSVColor(), resolutionX);
                         canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC7RGB.calcHSVColor(), tmpC8RGB.calcHSVColor(), resolutionX);
                     break;
                     case "lab":
                         canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcLABColor(), tmpC2RGB.calcLABColor(), resolutionX);
                         canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcLABColor(), tmpC4RGB.calcLABColor(), resolutionX);
                         canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB.calcLABColor(), tmpC6RGB.calcLABColor(), resolutionX);
                         canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC7RGB.calcLABColor(), tmpC8RGB.calcLABColor(), resolutionX);
                     break;
                     case "din99":
                         canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcDIN99Color(), tmpC2RGB.calcDIN99Color(), resolutionX);
                         canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcDIN99Color(), tmpC4RGB.calcDIN99Color(), resolutionX);
                         canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB.calcDIN99Color(), tmpC6RGB.calcDIN99Color(), resolutionX);
                         canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC7RGB.calcDIN99Color(), tmpC8RGB.calcDIN99Color(), resolutionX);
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
     var tmpC6RGB = quadBands[i][5];
     var tmpC7RGB = quadBands[i][6];
     var tmpC8RGB = quadBands[i][7];

     iCan.width = resolutionX;
     iCan.height = resolutionY;

     var canvasContex = iCan.getContext("2d");
     //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
     var canvasData = canvasContex.getImageData(0, 0, iCan.width, iCan.height);

     var bandWidth = Math.round(resolutionX/4);

     switch(colorspaceModus){
                 case "rgb":
                     canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB, tmpC2RGB, resolutionX);
                     canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB, tmpC4RGB, resolutionX);
                     canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB, tmpC6RGB, resolutionX);
                     canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC7RGB, tmpC8RGB, resolutionX);
                 break;
                 case "hsv":
                     canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcHSVColor(), tmpC2RGB.calcHSVColor(), resolutionX);
                     canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcHSVColor(), tmpC4RGB.calcHSVColor(), resolutionX);
                     canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB.calcHSVColor(), tmpC6RGB.calcHSVColor(), resolutionX);
                     canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC7RGB.calcHSVColor(), tmpC8RGB.calcHSVColor(), resolutionX);
                 break;
                 case "lab":
                     canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcLABColor(), tmpC2RGB.calcLABColor(), resolutionX);
                     canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcLABColor(), tmpC4RGB.calcLABColor(), resolutionX);
                     canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB.calcLABColor(), tmpC6RGB.calcLABColor(), resolutionX);
                     canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC7RGB.calcLABColor(), tmpC8RGB.calcLABColor(), resolutionX);
                 break;
                 case "din99":
                     canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcDIN99Color(), tmpC2RGB.calcDIN99Color(), resolutionX);
                     canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC3RGB.calcDIN99Color(), tmpC4RGB.calcDIN99Color(), resolutionX);
                     canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC5RGB.calcDIN99Color(), tmpC6RGB.calcDIN99Color(), resolutionX);
                     canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC7RGB.calcDIN99Color(), tmpC8RGB.calcDIN99Color(), resolutionX);
                 break;
                 default:
                     console.log("Error at the updateCreatorBand function");
     }

     canvasContex.putImageData(canvasData, 0, 0);

 }

}
