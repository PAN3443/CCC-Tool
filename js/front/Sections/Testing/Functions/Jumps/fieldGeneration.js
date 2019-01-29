

function jump_upstairs(n, rangeStart, rangeEnd){


  var globalTestField = new class_TestField(n,n);

  var rangeDistance = rangeEnd-rangeStart;
  var step = rangeDistance/(n-1);
  var currentStart = rangeStart;

  for (var x = 0; x < n; x++) {
    var substep = (rangeEnd-currentStart)/(n-1);
    for (var y = 0; y < n; y++) {
      var value = currentStart+y*substep;
      globalTestField.setFieldValue(x,y,value);
    }
  }

  jumpTestFields_Array.push(globalTestField);

}
