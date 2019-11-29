function  calcLocalSmoothOptimum(){
  var continuousSections = searchForContinuousSections(document.getElementById("id_editPage_Optimization_FromKey").selectedIndex,document.getElementById("id_editPage_Optimization_TillKey").selectedIndex);

  for (var j = 0; j < continuousSections.length; j++) {

    if(continuousSections[j][0]+1<continuousSections[j][1]){
      for (var i = continuousSections[j][0]+1; i < continuousSections[j][1]; i++) {
        calcSmoothnessOptiumumForKey(i-1,i,i+1);
        break;
      }// for
    } // if
  }
}



function calcGlobalSmoothOptimum(){
  var continuousSections = searchForContinuousSections(document.getElementById("id_editPage_Optimization_FromKey").selectedIndex,document.getElementById("id_editPage_Optimization_TillKey").selectedIndex);

  for (var j = 0; j < continuousSections.length; j++) {

    if(continuousSections[j][0]+1==continuousSections[j][1])
      continue;

    if(continuousSections[j][0]+2==continuousSections[j][1]){
      calcSmoothnessOptiumumForKey(continuousSections[j][0],continuousSections[j][0]+1,continuousSections[j][1]);
    }
    else {
      for (var k0 = continuousSections[j][0]; k0 < continuousSections[j][1]-1; k0++) {
      for (var k2=k0+2; k2<=continuousSections[j][1]; k2++) {
      for (var k1=k0+1; k1<k2; k1++) {
        calcSmoothnessOptiumumForKey(k0,k1,k2);
        break;
      }// for k1
      }// for k2
      }// for k0
    } // if
  }
}



function calcSmoothnessOptiumumForKey(k0,k1,k2){

  var color_K0 = globalCMS1_Optimum.getRightKeyColor(k0,globalCMS1_Optimum.getInterpolationSpace());
  var color_K1 = globalCMS1_Optimum.getRightKeyColor(k1,globalCMS1_Optimum.getInterpolationSpace());
  var color_K2 = globalCMS1_Optimum.getLeftKeyColor(k2,globalCMS1_Optimum.getInterpolationSpace());

  /*console.log("color_K0: ",color_K0.get1Value(),color_K0.get2Value(),color_K0.get3Value());
  console.log("color_K1: ",color_K1.get1Value(),color_K1.get2Value(),color_K1.get3Value());
  console.log("color_K2: ",color_K2.get1Value(),color_K2.get2Value(),color_K2.get3Value());

  /*color_K0.set1Value(0.25);color_K0.set2Value(0.25);color_K0.set3Value(0.5);
  color_K1.set1Value(0.25);color_K1.set2Value(0.75);color_K1.set3Value(0.5);
  color_K2.set1Value(0.25);color_K2.set2Value(0.75);color_K2.set3Value(0.75);

  console.log("color_K0: ",color_K0.get1Value(),color_K0.get2Value(),color_K0.get3Value());
  console.log("color_K1: ",color_K1.get1Value(),color_K1.get2Value(),color_K1.get3Value());
  console.log("color_K2: ",color_K2.get1Value(),color_K2.get2Value(),color_K2.get3Value());//*/

  if(color_K0.equalTo(color_K1))
    return;

  if(color_K0.equalTo(color_K2))
    return;

  if(color_K2.equalTo(color_K1))
    return;


  /////////////////////////
  // Translation of color_K0 into the origin
  /*var vec_A = vec_Diff_COLOR(color_K1,color_K0);
  var vec_B = vec_Diff_COLOR(color_K2,color_K0);*/

  /*var vec_A = [color_K1.get1Value()-color_K0.get1Value(),color_K1.get2Value()-color_K0.get2Value(),color_K1.get3Value()-color_K0.get3Value()];
  var vec_B = [color_K2.get1Value()-color_K0.get1Value(),color_K2.get2Value()-color_K0.get2Value(),color_K2.get3Value()-color_K0.get3Value()];*/


  var vec_A = [0.26,0.85,0.7];
  var vec_B = [0.2,0.44,0.65];//*/

  /*var vec_A = [0,0.0,0.75];
  var vec_B = [0,0.8,0.75];*/

  /////////////////////////
  // calc plane unit normal
  var vec_PUN = vecNorm(vec_Cross(vec_A,vec_B));

  console.log("vec_A:",vec_A);
  console.log("vec_B:",vec_B);
  console.log("vec_PUN:",vec_PUN);

  /////////////////////////
  // For the rotation of the plane to the xy plane we need to rotate vec_PUN to (0,0,1)
  // alternative Rodrigues' rotation formula to rotate about the axis n×(0,0,1)?


  var angleToX = Math.atan2(vec_PUN[0],vec_PUN[1]);

  var roation_Z = [
    [Math.cos(angleToX),-Math.sin(angleToX),0],
    [Math.sin(angleToX),Math.cos(angleToX),0],
    [0,0,1]
  ];
  console.log("angleToX",angleToX);
  console.log(roation_Z);

  console.log("1. Rotation (Z-Axis):");
  var vec_PUN_RZ = matrixVectorMultiplication(roation_Z,vec_PUN);
  var vec_A_Rot = matrixVectorMultiplication(roation_Z,vec_A);
  var vec_B_Rot = matrixVectorMultiplication(roation_Z,vec_B);
  console.log("vec_PUN_RZ:",vec_PUN_RZ," vs. Cross:",vecNorm(vec_Cross(vec_A_Rot,vec_B_Rot)));
  console.log("vec_A_Rot: ",vec_A_Rot);
  console.log("vec_B_Rot: ",vec_B_Rot);

  var angleToZ = Math.atan2(vec_PUN[1],vec_PUN[2]);

  var roation_X = [
    [1,0,0],
    [0,Math.cos(angleToZ),-Math.sin(angleToZ)],
    [0,Math.sin(angleToZ),Math.cos(angleToZ)]
  ];

  console.log("angleToZ",angleToZ);
  console.log(roation_X);

  console.log("2. Rotation (X-Axis):");
  var vec_A_Rot2 = matrixVectorMultiplication(roation_X,vec_A_Rot);
  var vec_B_Rot2 = matrixVectorMultiplication(roation_X,vec_B_Rot);
  console.log("vec_PUN_RX:",matrixVectorMultiplication(roation_X,vec_PUN_RZ)," vs. Cross:",vecNorm(vec_Cross(vec_A_Rot2,vec_B_Rot2)));
  console.log("vec_A_Rot2: ",vec_A_Rot2);
  console.log("vec_B_Rot2: ",vec_B_Rot2);

  //console.log("Rot_Norm: ", matrixVectorMultiplication(roation_X,matrixVectorMultiplication(roation_Z,vec_PUN)));
  //console.log("Cross Rot: ", vecNorm(vec_Cross(vec_A_Rot2,vec_B_Rot2)));


  /*var roation_Y = [
    [Math.cos(angleToZ),0,Math.sin(angleToZ)],
    [0,1,0],
    [-Math.sin(angleToZ),0,Math.cos(angleToZ)]
  ];//*/


  ////////////////
  /// Inverse Rotation Matrix == Transponierte Rotation Matrix (because it is orthogonal)
  var roation_Z_INV = [
    [roation_Z[0][0],roation_Z[1][0],roation_Z[2][0]],
    [roation_Z[0][1],roation_Z[1][1],roation_Z[2][1]],
    [roation_Z[0][2],roation_Z[1][2],roation_Z[2][2]]
  ];


  var roation_X_INV = [
    [roation_X[0][0],roation_X[1][0],roation_X[2][0]],
    [roation_X[0][1],roation_X[1][1],roation_X[2][1]],
    [roation_X[0][2],roation_X[1][2],roation_X[2][2]]
  ];

  /*var roation_Y_INV = [
    [roation_Y[0][0],roation_Y[1][0],roation_Y[2][0]],
    [roation_Y[0][1],roation_Y[1][1],roation_Y[2][1]],
    [roation_Y[0][2],roation_Y[1][2],roation_Y[2][2]]
  ];*/


  ////////////////////////////
  // Calc Rotated Points



  color_K0.set1Value(0);color_K0.set2Value(0);color_K0.set3Value(0);
  color_K1.set1Value(vec_A_Rot[0]);color_K1.set2Value(vec_A_Rot[1]);color_K1.set3Value(vec_A_Rot[2]);
  color_K2.set1Value(vec_B_Rot[0]);color_K2.set2Value(vec_B_Rot[1]);color_K2.set3Value(vec_B_Rot[2]);

  globalCMS1_Optimum.setRightKeyColor(k0,color_K0);
  globalCMS1_Optimum.setRightKeyColor(k1,cloneColor(color_K1));
  globalCMS1_Optimum.setLeftKeyColor(k1,color_K1);
  globalCMS1_Optimum.setLeftKeyColor(k2,color_K2);//*/

  /*var middle = vecScalMulti(vec_B_Rot,0.5);
  var radius = vecLength(middle);
  var dis_MtoA = vecLength(vec_Diff(vec_A_Rot,middle));*/


  /*////////////////////////////////////////////////
  // create plane out of
  // plane: a*x+b*y+c*z+d = 0.

  var a1 = color_K1.get1Value()-color_K0.get1Value();//x2 - x1;
  var b1 = color_K1.get2Value()-color_K0.get2Value();//y2 - y1;
  var c1 = color_K1.get3Value()-color_K0.get3Value();//z2 - z1;
  var a2 = color_K2.get1Value()-color_K0.get1Value();//x3 - x1;
  var b2 = color_K2.get2Value()-color_K0.get2Value();//y3 - y1;
  var c2 = color_K2.get3Value()-color_K0.get3Value();//z3 - z1;
  var a = b1 * c2 - b2 * c1;
  var b = a2 * c1 - a1 * c2;
  var c = a1 * b2 - b1 * a2;
  var d = (- a * x1 - b * y1 - c * z1);

  ///////////////////////////////////////////////////
  ////  Determine Middle Point between K0 and K2
  var direction = [color_K2.get1Value()-color_K0.get1Value(),
                  color_K2.get2Value()-color_K0.get2Value(),
                  color_K2.get3Value()-color_K0.get3Value()]

  var middle = [color_K0.get1Value()+(0.5*direction[0]),
                color_K0.get2Value()+(0.5*direction[1]),
                color_K0.get3Value()+(0.5*direction[2])];*/

  /*var result = calcolor_K2ColorOrderOptimum(globalCMS1_Optimum.getRightKeyColor(k0,globalCMS1_Optimum.getInterpolationSpace()),
  var c1 = _Optimum.getRightKeyColor(k1,globalCMS1_Optimum.getInterpolationSpace()),
  var c1 = _Optimum.getLeftKeyColor(k2,globalCMS1_Optimum.getInterpolationSpace()));

  switch (result[0]) {
    //case 0: break; //do nothing
    case 1:
      globalCMS1_Optimum.setRightKeyColor(k1,cloneColor(result[1]));
      globalCMS1_Optimum.setLeftKeyColor(k1,cloneColor(result[1]));
      result[1].deleteReferences();
      result[1]=null;
    break;
  }*/
}
