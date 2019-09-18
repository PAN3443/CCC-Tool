
function calcLocalOrderOptimum (){

  globalCMS_Order = cloneCMS(globalCMS1_Original);

  var continuousSections = searchForContinuousSections(optimization_StartKey,optimization_EndKey);

  var addNewKeys = false;

  for (var j = 0; j < continuousSections.length; j++) {

    if(continuousSections[j][0]+1<continuousSections[j][1]){
      for (var i = continuousSections[j][0]+1; i < continuousSections[j][1]; i++) {



        var color_K0 = globalCMS_Order.getRightKeyColor(i-1,globalCMS_Order.getInterpolationSpace());
        var color_K1 = globalCMS_Order.getRightKeyColor(i,globalCMS_Order.getInterpolationSpace());
        var color_K2 = globalCMS_Order.getLeftKeyColor(i+1,globalCMS_Order.getInterpolationSpace());

        // orderVals = [deltaE_K0_K2,deltaE_K1_K2,deltaE_K0_K1,orderVal1,orderVal2]
        var orderVals = getOrderValues(cloneColor(color_K0),cloneColor(color_K1),cloneColor(color_K2), globalCMS_Order.getInterpolationSpace());
        //console.log(orderVals);
        if(orderVals[3]<0 && orderVals[4]<0){
          // create a line between k1 and a ref color, which is defined by the ratio of the distances k0->k1 and  k1->k2
          var intersectionPoints1 = getLineSphereIntersection(cloneColor(color_K1), cloneColor(color_K0), cloneColor(color_K0), orderVals[0]);
          var intersectionPoints2 = getLineSphereIntersection(cloneColor(color_K1), cloneColor(color_K2), cloneColor(color_K2), orderVals[0]);

          if(intersectionPoints1.length!=2 || intersectionPoints1.length!=2){
            continue; // this should never happen! There should be always two intersection points
          }

          var positiveOrderIntersection1 = false;
          var positiveOrderIntersection2 = false;

          var tmpOrder1 = getOrderValues(cloneColor(color_K0),cloneColor(intersectionPoints1[0]),cloneColor(color_K2), globalCMS_Order.getInterpolationSpace());
          var tmpOrder2 = getOrderValues(cloneColor(color_K0),cloneColor(intersectionPoints1[1]),cloneColor(color_K2), globalCMS_Order.getInterpolationSpace());
          var tmpOrder3 = getOrderValues(cloneColor(color_K0),cloneColor(intersectionPoints2[0]),cloneColor(color_K2), globalCMS_Order.getInterpolationSpace());
          var tmpOrder4 = getOrderValues(cloneColor(color_K0),cloneColor(intersectionPoints2[1]),cloneColor(color_K2), globalCMS_Order.getInterpolationSpace());

          var counter = 0;
          var isOrder1 = false;
          var isOrder2 = false;
          var isOrder3 = false;
          var isOrder4 = false;

          if(tmpOrder1[3]>=0 && tmpOrder1[4]>=0){
            counter++;
            isOrder1=true;
          }

          if(tmpOrder2[3]>=0 && tmpOrder2[4]>=0){
            counter++;
            isOrder2=true;
          }

          if(tmpOrder3[3]>=0 && tmpOrder3[4]>=0){
            counter++;
            isOrder3=true;
          }

          if(tmpOrder4[3]>=0 && tmpOrder4[4]>=0){
            counter++;
            isOrder4=true;
          }

          switch (counter) {
            case 1:
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////// CASE 2: k1 is outsides the circles around k0 and k2, and the lines between k1 and k0/k2 have one intersection point with the ordered area  //////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            var intersectionPoints = [];
            console.log("Case 2");

            if(isOrder1){
              //console.log(intersectionPoints1,0,tmpOrder1);
              globalCMS_Order.setRightKeyColor(i,cloneColor(intersectionPoints1[0]));
              globalCMS_Order.setLeftKeyColor(i,cloneColor(intersectionPoints1[0]));
            } else
            if(isOrder2){
              //console.log(intersectionPoints1,1,tmpOrder2);
              globalCMS_Order.setRightKeyColor(i,cloneColor(intersectionPoints1[1]));
              globalCMS_Order.setLeftKeyColor(i,cloneColor(intersectionPoints1[1]));
            } else
            if(isOrder3){
              //console.log(intersectionPoints2,2,tmpOrder3);
              globalCMS_Order.setRightKeyColor(i,cloneColor(intersectionPoints2[0]));
              globalCMS_Order.setLeftKeyColor(i,cloneColor(intersectionPoints2[0]));
            } else
            if(isOrder4){
              //console.log(intersectionPoints2,3,tmpOrder4);
              globalCMS_Order.setRightKeyColor(i,cloneColor(intersectionPoints2[1]));
              globalCMS_Order.setLeftKeyColor(i,cloneColor(intersectionPoints2[1]));
            }
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            break;
            case 2:

            if(isOrder1&&isOrder2){
              for (var k = intersectionPoints1.length-1; k >= 0; k--) {
                intersectionPoints1[k].deleteReferences();
                intersectionPoints1[k]=null;
              }
              for (var k = intersectionPoints2.length-1; k >= 0; k--) {
                intersectionPoints2[k].deleteReferences();
                intersectionPoints2[k]=null;
              }
              continue; // this should never happen
            }

            if(isOrder3&&isOrder4){
              for (var k = intersectionPoints1.length-1; k >= 0; k--) {
                intersectionPoints1[k].deleteReferences();
                intersectionPoints1[k]=null;
              }
              for (var k = intersectionPoints2.length-1; k >= 0; k--) {
                intersectionPoints2[k].deleteReferences();
                intersectionPoints2[k]=null;
              }
              continue; // this should never happen
            }

            var dis_K1_K0 = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(color_K0));
            var dis_K1_K2 = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(color_K2));
            var dis_1_K1_Int = undefined;
            var dis_2_K1_Int = undefined;

            if(isOrder1)
                dis_1_K1_Int = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(intersectionPoints1[0]));
            else
                dis_1_K1_Int = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(intersectionPoints1[1]));

            if(isOrder3)
                dis_2_K1_Int = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(intersectionPoints2[0]));
            else
                dis_2_K1_Int = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(intersectionPoints2[1]));

            var isShorter1 = false;
            var isShorter2 = false;

            if(dis_1_K1_Int<dis_K1_K0)
              isShorter1 = true;

            if(dis_2_K1_Int<dis_K1_K2)
              isShorter2 = true;


            if (isShorter1 || isShorter2 && !(isShorter1 && isShorter2)) {
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //////////////////////// CASE 3: k1 is outsides the circles around k0 and k2, and the lines between k1 and k0/k2 have two intersection point with the ordered area.
              /////////////////////// one before k0/k2 and one is located behind k0/k2
              //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

              console.log("case 3");

              if(isShorter1){
                if(isOrder1){
                  globalCMS_Order.setRightKeyColor(i,cloneColor(intersectionPoints1[0]));
                  globalCMS_Order.setLeftKeyColor(i,cloneColor(intersectionPoints1[0]));
                }
                else {
                  globalCMS_Order.setRightKeyColor(i,cloneColor(intersectionPoints1[1]));
                  globalCMS_Order.setLeftKeyColor(i,cloneColor(intersectionPoints1[1]));
                }
              }
              else {
                if(isOrder3){
                  globalCMS_Order.setRightKeyColor(i,cloneColor(intersectionPoints2[0]));
                  globalCMS_Order.setLeftKeyColor(i,cloneColor(intersectionPoints2[0]));
                }
                else {
                  globalCMS_Order.setRightKeyColor(i,cloneColor(intersectionPoints2[1]));
                  globalCMS_Order.setLeftKeyColor(i,cloneColor(intersectionPoints2[1]));
                }
              }


              // check special case
              //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            }

            break;
            default:
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //////////////////////// CASE 4: k1 is outsides the circles around k0 and k2, and the lines between k1 and k0/k2 have two intersection point with the ordered area.
              /////////////////////// Both are located before k0/k2 at the line.
              //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

              console.log("Case 4");

              var direction = [color_K2.get1Value()-color_K0.get1Value(),
                              color_K2.get2Value()-color_K0.get2Value(),
                              color_K2.get3Value()-color_K0.get3Value()]

              var middle = [color_K0.get1Value()+(0.5*direction[0]),
                            color_K0.get2Value()+(0.5*direction[1]),
                            color_K0.get3Value()+(0.5*direction[2])];

              var norm = vecNorm(direction);

              ///////////////////////////////////////////////
              // PLANE
              // norm form of plane  n*(x-A)=0
              // nx-n*Ax+ny-n*Ay+nz-n*Az = 0
              // nx+ny+nz = n*Ax+n*Ay+n*Az

              var nA = norm[0]*middle[0]+norm[1]*middle[1]+norm[2]*middle[2];

              //////////////////////////////////
              // LINE
              // line with k1 as support vector and norm as direction
              // g(x)=k1+n*r
              //////////////////////////////////
              // Intersection
              // n[0]*(k1[0]+n[0]*r)+n[1]*(k1[1]+n[1]*r)+n[2]*(k1[2]+n[2]*r)= nA
              //  n[0]*n[0]*r+n[1]*n[1]*r+n[2]*n[2]*r = nA - n[0]*k1[0] - n[1]*k1[1] - n[2]*k1[2]
              // r = (nA - n[0]*k1[0] - n[1]*k1[1] - n[2]*k1[2])/(n[0]*n[0]+n[1]*n[1]+n[2]*n[2])
              var divider = Math.pow(norm[0],2)+Math.pow(norm[1],2)+Math.pow(norm[2],2);
              if(divider==0){
                continue;
              }
              var tmp = (norm[0]*color_K1.get1Value())+(norm[1]*color_K1.get2Value())+(norm[2]*color_K1.get3Value());
              var r = (nA-tmp)/divider;

              var intersection = [
                color_K1.get1Value()+norm[0]*r,
                color_K1.get2Value()+norm[1]*r,
                color_K1.get3Value()+norm[2]*r
              ];

              //////////////////////////////////
              /// new Postion using height of uniside triangle
              /// height of uniside triangle : h = a/2 * Math.sqrt(3);
              var height = calc3DEuclideanDistance(cloneColor(color_K0), cloneColor(color_K2))/2 * Math.sqrt(3);

              var direction_MI = [intersection[0]-middle[0],
                                  intersection[1]-middle[1],
                                  intersection[2]-middle[2]];

              var ratio = height/vecLength(direction_MI);

              var newPos = [middle[0]+(direction_MI[0]*ratio),
                            middle[1]+(direction_MI[1]*ratio),
                            middle[2]+(direction_MI[2]*ratio)];

              globalCMS_Order.setRightKeyColor(i,createColor(newPos[0],newPos[1],newPos[2],globalCMS_Order.getInterpolationSpace()));
              globalCMS_Order.setLeftKeyColor(i,createColor(newPos[0],newPos[1],newPos[2],globalCMS_Order.getInterpolationSpace()));

              /*for (var k = intersectionPoints1.length-1; k >= 0; k--) {
                intersectionPoints1[k].deleteReferences();
                intersectionPoints1[k]=null;
              }
              for (var k = intersectionPoints2.length-1; k >= 0; k--) {
                intersectionPoints2[k].deleteReferences();
                intersectionPoints2[k]=null;
              }

              intersectionPoints1 = getLineSphereIntersection(cloneColor(color_K1), cloneColor(color_K0), cloneColor(color_K2), orderVals[0]); // here is the difference, that the sphere center is not the point, which is used to create a line with k1
              intersectionPoints2 = getLineSphereIntersection(cloneColor(color_K1), cloneColor(color_K2), cloneColor(color_K0), orderVals[0]);

              tmpOrder1 = getOrderValues(cloneColor(color_K0),cloneColor(intersectionPoints1[0]),cloneColor(color_K2), globalCMS_Order.getInterpolationSpace());
              tmpOrder2 = getOrderValues(cloneColor(color_K0),cloneColor(intersectionPoints1[1]),cloneColor(color_K2), globalCMS_Order.getInterpolationSpace());
              tmpOrder3 = getOrderValues(cloneColor(color_K0),cloneColor(intersectionPoints2[0]),cloneColor(color_K2), globalCMS_Order.getInterpolationSpace());
              tmpOrder4 = getOrderValues(cloneColor(color_K0),cloneColor(intersectionPoints2[1]),cloneColor(color_K2), globalCMS_Order.getInterpolationSpace());


              isOrder1 = false;
              isOrder2 = false;
              isOrder3 = false;
              isOrder4 = false;

              if(tmpOrder1[3]>=0 && tmpOrder1[4]>=0){
                isOrder1=true;
              }

              if(tmpOrder2[3]>=0 && tmpOrder2[4]>=0){
                isOrder2=true;
              }

              if(tmpOrder3[3]>=0 && tmpOrder3[4]>=0){
                isOrder3=true;
              }

              if(tmpOrder4[3]>=0 && tmpOrder4[4]>=0){
                isOrder4=true;
              }

              if(!isOrder1 || !isOrder2 || !isOrder3 || !isOrder4){ // All have to hit the order
                for (var k = intersectionPoints1.length-1; k >= 0; k--) {
                  intersectionPoints1[k].deleteReferences();
                  intersectionPoints1[k]=null;
                }
                for (var k = intersectionPoints2.length-1; k >= 0; k--) {
                  intersectionPoints2[k].deleteReferences();
                  intersectionPoints2[k]=null;
                }
                continue;

                var dis_K1_Int1 = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(intersectionPoints1[0]));
                var dis_K1_Int2 = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(intersectionPoints1[1]));
                var dis_K1_Int3 = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(intersectionPoints2[0]));
                var dis_K1_Int4 = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(intersectionPoints2[1]));


                if (dis_K1_Int1<dis_K1_Int2 && dis_K1_Int3<dis_K1_Int4) {
                  console.log(123);
                }
                else if (dis_K1_Int2<dis_K1_Int1 && dis_K1_Int4<dis_K1_Int3) {
                  console.log(5555);
                }
                else {
                  continue;
                }
              }*/





                //var middleColor = c

              //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          }
        }
        else if(orderVals[3]<0 || orderVals[4]<0){
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //////////////////////// CASE 1: k1 is inside the circles around k0 and k2, but not in the intersection area of both circles //////////////////////////////////
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          console.log("Case 1");
          var intersectionPoints =[];
          if(orderVals[3]<0){
              // create line between i and i-1
              intersectionPoints = getLineSphereIntersection(cloneColor(color_K1), cloneColor(color_K0), cloneColor(color_K0), orderVals[0]);
          }
          else{ //orderVals[4]<0
              // create line between i and i+1
              intersectionPoints = getLineSphereIntersection(cloneColor(color_K1), cloneColor(color_K2), cloneColor(color_K2), orderVals[0]);
          }

          switch (intersectionPoints.length) {
            case 1:
              globalCMS_Order.setRightKeyColor(i,cloneColor(intersectionPoints[0]));
              globalCMS_Order.setLeftKeyColor(i,cloneColor(intersectionPoints[0]));
            break;
            case 2:
              // the nearest intersection point is the right one
              var dis1 = calc3DEuclideanDistance(cloneColor(intersectionPoints[0]), cloneColor(color_K1));
              var dis2 = calc3DEuclideanDistance(cloneColor(intersectionPoints[1]), cloneColor(color_K1));
              if(dis1<dis2){
                globalCMS_Order.setRightKeyColor(i,cloneColor(intersectionPoints[0]));
                globalCMS_Order.setLeftKeyColor(i,cloneColor(intersectionPoints[0]));
              }
              else {
                globalCMS_Order.setRightKeyColor(i,cloneColor(intersectionPoints[1]));
                globalCMS_Order.setLeftKeyColor(i,cloneColor(intersectionPoints[1]));
              }
            break;
            default:
              console.log("Error at Sphere Intersection Algorithm"); // because there should be always 2 intersection points if the line goes to the sphere center

          }

          for (var k = intersectionPoints.length-1; k >= 0; k--) {
            intersectionPoints[k].deleteReferences();
            intersectionPoints[k]=null;
          }
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }

        color_K0.deleteReferences();
        color_K1.deleteReferences();
        color_K2.deleteReferences();
        color_K0=null;
        color_K1=null;
        color_K2=null;
      }// for
    } // if
  }
}

function getOrderValues(c_K0,c_K1,c_K2, space){

  var deltaE_K0_K2=0;
  var deltaE_K1_K2=0;
  var deltaE_K0_K1=0;

  switch (space) {
      case "lab":
      case "din99":
      case "de94-ds":
      case "de2000-ds":
       deltaE_K0_K2= calc3DEuclideanDistance(cloneColor(c_K0),cloneColor(c_K2));
       deltaE_K1_K2= calc3DEuclideanDistance(cloneColor(c_K1),cloneColor(c_K2));
       deltaE_K0_K1= calc3DEuclideanDistance(cloneColor(c_K0),cloneColor(c_K1));
        break;
        /*case "de94":
         deltaE_K0_K2= calcDeltaDE94(cloneColor(color_K0),cloneColor(color_K2));
         deltaE_K1_K2= calcDeltaDE94(cloneColor(color_K1),cloneColor(color_K2));
         deltaE_K0_K1= calcDeltaDE94(cloneColor(color_K0),cloneColor(color_K1));
          break;
          case "de2000":
           deltaE_K0_K2= calcDeltaCIEDE2000(cloneColor(color_K0),cloneColor(color_K2));
           deltaE_K1_K2= calcDeltaCIEDE2000(cloneColor(color_K1),cloneColor(color_K2));
           deltaE_K0_K1= calcDeltaCIEDE2000(cloneColor(color_K0),cloneColor(color_K1));
            break;*/
  }

  c_K0.deleteReferences();
  c_K0=null;
  c_K1.deleteReferences();
  c_K1=null;
  c_K2.deleteReferences();
  c_K2=null;

  var orderVal1 = (deltaE_K0_K2-deltaE_K0_K1)*errorMath/errorMath;
  var orderVal2 = (deltaE_K0_K2-deltaE_K1_K2)*errorMath/errorMath;

  return [deltaE_K0_K2,deltaE_K1_K2,deltaE_K0_K1,orderVal1,orderVal2];
}


function getLineSphereIntersection(colorL1, colorL2, colorCenter, radius){

    //http://www.ambrsoft.com/TrigoCalc/Sphere/SpherLineIntersection_.htm#SphereLineIntersectionEqDev

    var v_a = Math.pow(colorL2.get1Value()-colorL1.get1Value(),2)+Math.pow(colorL2.get2Value()-colorL1.get2Value(),2)+Math.pow(colorL2.get3Value()-colorL1.get3Value(),2);
    var v_b = -2*((colorL2.get1Value()-colorL1.get1Value())*(colorCenter.get1Value()-colorL1.get1Value())+(colorL2.get2Value()-colorL1.get2Value())*(colorCenter.get2Value()-colorL1.get2Value())+(colorL2.get3Value()-colorL1.get3Value())*(colorCenter.get3Value()-colorL1.get3Value()));
    var v_c = Math.pow(colorCenter.get1Value()-colorL1.get1Value(),2)+Math.pow(colorCenter.get2Value()-colorL1.get2Value(),2)+Math.pow(colorCenter.get3Value()-colorL1.get3Value(),2)-Math.pow(radius,2);

    // check the discriminante
    var v_D = Math.pow(v_b,2)-4*v_a*v_c;
    //console.log(v_D);
    if(v_D>0){
      var val_t_pos = (-1* v_b + Math.sqrt(v_D))/(2 * v_a);
      var val_t_neg = (-1* v_b - Math.sqrt(v_D))/(2 * v_a);
      var intColor1 = determineIntersectionPoint(colorL1, colorL2, val_t_pos);
      var intColor2 = determineIntersectionPoint(colorL1, colorL2, val_t_neg);
      colorL1.deleteReferences();
      colorL2.deleteReferences();
      colorL1=null;
      colorL2=null;
      return [intColor1,intColor2];
    }
    else if(v_D==0){
      var val_t = (-1* v_b)/(2 * v_a);
      var intColor1 = determineIntersectionPoint(colorL1, colorL2, val_t);
      colorL1.deleteReferences();
      colorL2.deleteReferences();
      colorL1=null;
      colorL2=null;
      return [intColor1];
    }
    else {
      colorL1.deleteReferences();
      colorL2.deleteReferences();
      colorL1=null;
      colorL2=null;
      return [];
    }

}

function determineIntersectionPoint(colorL1, colorL2, val_t){
  var c_v1 = colorL1.get1Value() + ((colorL2.get1Value()-colorL1.get1Value())*val_t);
  var c_v2 = colorL1.get2Value() + ((colorL2.get2Value()-colorL1.get2Value())*val_t);
  var c_v3 = colorL1.get3Value() + ((colorL2.get3Value()-colorL1.get3Value())*val_t);
  return createColor(c_v1,c_v2,c_v3,globalCMS_Order.getInterpolationSpace());
}
