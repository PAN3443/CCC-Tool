function getOrderValues(c_K0, c_K1, c_K2, space) {

  var deltaE_K0_K2 = 0;
  var deltaE_K1_K2 = 0;
  var deltaE_K0_K1 = 0;

  switch (space) {
    case "rgb":
    case "hsv":
    case "lab":
    case "din99":
    case "de94-ds":
    case "de2000-ds":
      deltaE_K0_K2 = calc3DEuclideanDistance(cloneColor(c_K0), cloneColor(c_K2));
      deltaE_K1_K2 = calc3DEuclideanDistance(cloneColor(c_K1), cloneColor(c_K2));
      deltaE_K0_K1 = calc3DEuclideanDistance(cloneColor(c_K0), cloneColor(c_K1));
      break;
      case "de94":
       deltaE_K0_K2= calcDeltaDE94(cloneColor(color_K0),cloneColor(color_K2));
       deltaE_K1_K2= calcDeltaDE94(cloneColor(color_K1),cloneColor(color_K2));
       deltaE_K0_K1= calcDeltaDE94(cloneColor(color_K0),cloneColor(color_K1));
        break;
        case "de2000":
         deltaE_K0_K2= calcDeltaCIEDE2000(cloneColor(color_K0),cloneColor(color_K2));
         deltaE_K1_K2= calcDeltaCIEDE2000(cloneColor(color_K1),cloneColor(color_K2));
         deltaE_K0_K1= calcDeltaCIEDE2000(cloneColor(color_K0),cloneColor(color_K1));
          break;
  }

  c_K0.deleteReferences();
  c_K0 = null;
  c_K1.deleteReferences();
  c_K1 = null;
  c_K2.deleteReferences();
  c_K2 = null;


  var orderVal1 = (deltaE_K0_K2 - deltaE_K0_K1);// * errorMath / errorMath;
  var orderVal2 = (deltaE_K0_K2 - deltaE_K1_K2);// * errorMath / errorMath;

  if(orderVal1>-1*smallErrorMath && orderVal1<0){
    orderVal1=0;
  }

  if(orderVal2>-1*smallErrorMath && orderVal2<0){
    orderVal2=0;
  }

  return [deltaE_K0_K2, deltaE_K1_K2, deltaE_K0_K1, orderVal1, orderVal2];
}
