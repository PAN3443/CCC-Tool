/*function searchForContinuousSections(cmsRef,startKey, endKey){

  var continuousSections=[];
  var beforeConstant = false;
  //var startKey = 0;
  if(cmsRef.getKeyType(startKey)==="twin key" || cmsRef.getKeyType(startKey)==="left key")
    beforeConstant=true;

  for (var i = startKey; i <= endKey; i++) {

    switch (cmsRef.getKeyType(i)) {
      case "nil key":
        beforeConstant=true;
      break;
      case "left key":
        if(!beforeConstant){
          var tmpStart = startKey;
          var tmpEnd = i;
          continuousSections.push([tmpStart,tmpEnd])
        }
        startKey=i;
        beforeConstant=true;
      break;
      case "twin key":
        if(!beforeConstant){
          var tmpStart = startKey;
          var tmpEnd = i;
          continuousSections.push([tmpStart,tmpEnd])
        }
        startKey=i;
        beforeConstant=false;
      break;
      default:
        if(beforeConstant){
          startKey=i;
          beforeConstant=false;
        }
        else {
          if(i==endKey){
            var tmpStart = startKey;
            var tmpEnd = i;
            continuousSections.push([tmpStart,tmpEnd])
          }
        }

    }

  }

  return continuousSections;
}*/
