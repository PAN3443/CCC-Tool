function updateSpaceGridInfo(e) {
    switch (e.data.type) {
      case "lab":
        positionsLAB=[];
        for(var i = 0; i < e.data.positions.length; i++){
          var lArray = [];
          for(var j = 0; j < e.data.positions[i].length; j++){
            lArray.push(new class_Color_LAB(e.data.positions[i][j].lValue,e.data.positions[i][j].aValue,e.data.positions[i][j].bValue));
          }
          positionsLAB.push(lArray);
        }
        labSPos = e.data.labSPos;
        labEPos = e.data.labEPos;
        labABMax = e.data.labABMax;
      break;
      case "din99":
        positionsDIN99=[];
        for(var i = 0; i < e.data.positions.length; i++){
          var lArray = [];
          for(var j = 0; j < e.data.positions[i].length; j++){
            lArray.push(new class_Color_DIN99(e.data.positions[i][j].l99Value,e.data.positions[i][j].a99Value,e.data.positions[i][j].b99Value));
          }
          positionsDIN99.push(lArray);
        }
        din99ABMax = e.data.din99ABMax;
        din99SPos = e.data.din99SPos; // -100-200
        din99EPos = e.data.din99EPos; // -100-200
      break;
      case "lms":
        positionsLMS=e.data.positions;
      break;
    }

}
