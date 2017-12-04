function csvColormapParserFile(csvString){

console.log(123123);
      var lines = csvString.split("\n");
console.log(lines.lenght);
      if(lines.lenght>0){
        var space  = checkCSVColorspace(lines[0])

        console.log(space);
        for(var i=1; i<lines.length; i++){

            if(lines[i].length>0){
              console.log(lines[i]);
              console.log("-----------------------------");
            }
        }
      }


       /*switch (space) {
          case "RGB": case "rgb": case "Rgb":
                if(jsonObj.colormaps[0].points[0].r == "undefined" || jsonObj.colormaps[0].points[0].g == "undefined" || jsonObj.colormaps[0].points[0].b == "undefined"){
                    space = checkJSONColorspace(jsonObj);
                }
            break;
          case "HSV": case "hsv": case "Hsv":
                if(jsonObj.colormaps[0].points[0].h == "undefined" || jsonObj.colormaps[0].points[0].s == "undefined" || jsonObj.colormaps[0].points[0].v == "undefined"){
                    space = checkJSONColorspace(jsonObj);
                }
            break;
           case "LAB": case "lab": case "Lab":
                 if(jsonObj.colormaps[0].points[0].l == "undefined" || jsonObj.colormaps[0].points[0].a== "undefined" || jsonObj.colormaps[0].points[0].b == "undefined"){
                     space = checkJSONColorspace(jsonObj);
                 }
            break;
          case "DIN99": case "din99": case "Din99":
                if(jsonObj.colormaps[0].points[0].r == "undefined" || jsonObj.colormaps[0].points[0].g == "undefined" || jsonObj.colormaps[0].points[0].b == "undefined"){
                    space = checkJSONColorspace(jsonObj);
                }
            break;
          default:
                  space = checkJSONColorspace(jsonObj);
        }*/



}


function checkCSVColorspace(headerLine){

    var headerAttr = headerLine.split(/[;,]+/);

    if(headerAttr.lenght==6){

      if((headerAttr[1] === "r" || headerAttr[1] === "R") && (headerAttr[1] === "g" || headerAttr[1] === "G") && (headerAttr[1] === "b" || headerAttr[1] === "B")){
          return "RGB";
      }

      if((headerAttr[1] === "h" || headerAttr[1] === "H") && (headerAttr[1] === "s" || headerAttr[1] === "S") && (headerAttr[1] === "v" || headerAttr[1] === "V")){
          return "HSV";
      }

      if((headerAttr[1] === "l" || headerAttr[1] === "L") && (headerAttr[1] === "a" || headerAttr[1] === "A") && (headerAttr[1] === "b" || headerAttr[1] === "B")){
          return "LAB";
      }

      if((headerAttr[1] === "l99" || headerAttr[1] === "L99") && (headerAttr[1] === "a99" || headerAttr[1] === "A99") && (headerAttr[1] === "b99" || headerAttr[1] === "B99")){
          return "DIN99";
      }
    }

    return "NoSpace";

}
