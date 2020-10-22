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
      deltaE_K0_K2 = calc3DEuclideanDistance(c_K0, c_K2);
      deltaE_K1_K2 = calc3DEuclideanDistance(c_K1, c_K2);
      deltaE_K0_K1 = calc3DEuclideanDistance(c_K0, c_K1);
      break;
      case "de94":
       deltaE_K0_K2= calcDeltaDE94(color_K0,color_K2);
       deltaE_K1_K2= calcDeltaDE94(color_K1,color_K2);
       deltaE_K0_K1= calcDeltaDE94(color_K0,color_K1);
        break;
        case "de2000":
         deltaE_K0_K2= calcDeltaCIEDE2000(color_K0,color_K2);
         deltaE_K1_K2= calcDeltaCIEDE2000(color_K1,color_K2);
         deltaE_K0_K1= calcDeltaCIEDE2000(color_K0,color_K1);
          break;
  }

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
