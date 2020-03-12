calcLocalSmoothOptimum(){
  var continuousSections = this.editCMS.searchForContinuousSections(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex,document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex);

  for (var j = 0; j < continuousSections.length; j++) {

    if(continuousSections[j][0]+1<continuousSections[j][1]){
      for (var i = continuousSections[j][0]+1; i < continuousSections[j][1]; i++) {
        this.testCalcSmoothnessOptiumumForKey(i-1,i,i+1,continuousSections[j][0],continuousSections[j][1]);//calcSmoothnessOptiumumForKey(i-1,i,i+1);
      }// for
    } // if
  }
}

calcGlobalSmoothOptimum(){
  var continuousSections = this.editCMS.searchForContinuousSections(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex,document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex);

  for (var j = 0; j < continuousSections.length; j++) {

    if(continuousSections[j][0]+1==continuousSections[j][1])
      continue;

    if(continuousSections[j][0]+2==continuousSections[j][1]){
      this.calcSmoothnessOptiumumForKey(continuousSections[j][0],continuousSections[j][0]+1,continuousSections[j][1]);
    }
    else {
      for (var k0 = continuousSections[j][0]; k0 < continuousSections[j][1]-1; k0++) {
      for (var k2=k0+2; k2<=continuousSections[j][1]; k2++) {
      for (var k1=k0+1; k1<k2; k1++) {
        this.testCalcSmoothnessOptiumumForKey(k0,k1,k2,continuousSections[j][0],continuousSections[j][1]);//calcSmoothnessOptiumumForKey(k0,k1,k2);
      }// for k1
      }// for k2
      }// for k0
    } // if
  }
}

testCalcSmoothnessOptiumumForKey(k0,k1,k2,startID,endID){
  var status = this.calcSmoothnessOptiumumForKey(k0,k1,k2);

  /*if(status==2){
    if(k0!=startID){
      this.testCalcSmoothnessOptiumumForKey(k0-1,k1-1,k2-1,startID,endID);
    }
    if(k2!=endID){
      this.testCalcSmoothnessOptiumumForKey(k0+1,k1+1,k2+1,startID,endID);
    }
  }*/

}

calcSmoothnessOptiumumForKey(k0,k1,k2){

  var color_Ci = this.editCMS.getRightKeyColor(k0,this.editCMS.getInterpolationSpace());
  var color_Cj = this.editCMS.getRightKeyColor(k1,this.editCMS.getInterpolationSpace());
  var color_Ck = this.editCMS.getLeftKeyColor(k2,this.editCMS.getInterpolationSpace());
  var small_NUM = 1e-6;

  if(color_Ci.equalTo(color_Cj))
    return 0;

  if(color_Ci.equalTo(color_Ck))
    return 0;

  if(color_Ck.equalTo(color_Cj))
    return 0;


  /////////////////////////
  // Translation of color_Ci into the origin


  /////////////////////////
  // calc plane unit normal


  ///////////////////////////
  /// Determine Radius

  var ref_i = this.editCMS.getRefPosition(k0);
  var ref_j = this.editCMS.getRefPosition(k1);
  var ref_k = this.editCMS.getRefPosition(k2);

  var tangentVec_ij = vec_Divi(vec_Diff_COLOR(color_Cj,color_Ci),ref_j-ref_i);
  var tangentVec_jk = vec_Divi(vec_Diff_COLOR(color_Ck,color_Cj),ref_k-ref_j);

  var tangentVec_Norm_ij = vecNorm(tangentVec_ij);
  var tangentVec_Norm_jk = vecNorm(tangentVec_jk);

  console.log("----------------------------------------------------");
  console.log("Smooth: tangent vec (ci) = (",color_Ci.get1Value(),",",color_Ci.get2Value(),",",color_Ci.get3Value(),")");
  console.log("Smooth: tangent vec (cj) = (",color_Cj.get1Value(),",",color_Cj.get2Value(),",",color_Cj.get3Value(),")");
  console.log("Smooth: tangent vec (ck) = (",color_Ck.get1Value(),",",color_Ck.get2Value(),",",color_Ck.get3Value(),")");
  console.log("Smooth: normierter tangent vec (ci,cj) = ", tangentVec_Norm_ij);
  console.log("Smooth: normierter tangent vec (cj,ck) = ", tangentVec_Norm_jk);

  var scalarProduct = vec_Dot(tangentVec_Norm_ij,tangentVec_Norm_jk);
  console.log("Smooth: scalarProduct <tangentVec_ij,tangentVec_jk> = ", scalarProduct);

  if(scalarProduct>1){
    console.log("Smooth: scalarProduct > 1 => Clippen to 1 ");
    scalarProduct=1;
  }

  if(scalarProduct<-1){
    console.log("Smooth: scalarProduct < -1 => Clippen to -1 ");
    scalarProduct=-1;
  }

  var curvature = Math.sqrt(1-Math.pow(scalarProduct,2))/(0.5*(ref_k-ref_i));
  var curvature2 = Math.sin(Math.acos(scalarProduct))/(0.5*(ref_k-ref_i));

  console.log("Smooth: curvature (Math.sqrt(1-Math.pow(scalarProduct,2))/(0.5*(ref_k-ref_i))) = ", curvature);
  console.log("Smooth: curvature (Math.sin(Math.acos(scalarProduct))/(0.5*(ref_k-ref_i))) = ", curvature2);

  if(isNaN(curvature)){
    console.log("curvature is NaN for i=",k0,", j=",k1,", k=",k2);
    return 0;
  }

  var radius = 1/curvature;


  //console.log("curvature = ", curvature,"=Math.sqrt(1-Math.pow(",scalarProduct,",2))/0.5*(",ref_k,"-",ref_i,")");
  console.log("radius = ", radius);

  ///////////////////////////////////////////////
  // PLANE 1
  // norm form of plane  n*(x-A)=0

  var vec_JI = vec_Diff_COLOR(color_Ci,color_Cj);
  var vec_JK = vec_Diff_COLOR(color_Ck,color_Cj);
  var norm1 = vecNorm(vec_Cross(vec_JI,vec_JK));
  var vec_Cj = [color_Cj.get1Value(),color_Cj.get2Value(),color_Cj.get3Value()];

  //////////////////////////////////////////////
  /// Parameter form  = positionvector+r*intersectionLine_dirVector +s*intersectionLine_dirVector
  // => parameter form H: = vec_Cj + r*vec_JI + r*vec_JK

  ///////////////////////////////////////////////
  /// convert to coordinate form
  /// plane = Ax+By+Cz+D=0
  /// A=norm[0], B=norm[1], C=norm[2],
  /// insert known point for x,y,z
  /// D =  (Ax+By+Cz)*-1

  var plane_Point1 = [color_Ci.get1Value(),color_Ci.get2Value(),color_Ci.get3Value()];
  //var val_D1 = (plane_Point1[0]*norm1[0]+plane_Point1[1]*norm1[1]+plane_Point1[2]*norm1[2])*-1;
  var d1 = -vec_Dot(norm1, plane_Point1);

  ///////////////////////////////////////////////
  // PLANE 2
  // norm form of plane  n*(x-A)=0

  var direction = [color_Ck.get1Value()-color_Ci.get1Value(),
                  color_Ck.get2Value()-color_Ci.get2Value(),
                  color_Ck.get3Value()-color_Ci.get3Value()];

  var plane_Point2 = [color_Ci.get1Value()+(0.5*direction[0]),
                color_Ci.get2Value()+(0.5*direction[1]),
                color_Ci.get3Value()+(0.5*direction[2])]; // = middle point between c_i and c_k

  var norm2 = vecNorm(direction);

  ///////////////////////////////////////////////////
  // get coordinate form of plane 2
  //var val_D2 = (plane_Point2[0]*norm2[0]+plane_Point2[1]*norm2[1]+plane_Point2[2]*norm2[2])*-1;
  var d2 = -vec_Dot(norm2, plane_Point2);

  ///////////////////////////////////////////////
  // PLANE-PLANE Intersection Line
  // use parameterform of plane1 and coordinate form of plane 2
  // x= vec_Cj[0] + r*vec_JI[0] + s*vec_JK[0]
  // y= vec_Cj[1] + r*vec_JI[1] + s*vec_JK[1]
  // z= vec_Cj[2] + r*vec_JI[2] + s*vec_JK[2]

  // norm2[0]*x+ norm2[1]*y + norm2[2]*z +d2 = 0

  // norm2[0]*(vec_Cj[0] + r*vec_JI[0] + s*vec_JK[0]) +
  // norm2[1]*(vec_Cj[1] + r*vec_JI[1] + s*vec_JK[1]) +
  // norm2[2]*(vec_Cj[2] + r*vec_JI[2] + s*vec_JK[2]) +
  // d2 = 0

  var notRSFactor = norm2[0]*vec_Cj[0]+norm2[1]*vec_Cj[1]+norm2[2]*vec_Cj[2]+d2;
  var rFactor = norm2[0]*vec_JI[0]+norm2[1]*vec_JI[1]+norm2[2]*vec_JI[2];
  var sFactor = norm2[0]*vec_JK[0]+norm2[1]*vec_JK[1]+norm2[2]*vec_JK[2];

  // - s*sFactor =  r*rFactor+notRSFactor
  //  s = r*rFactor/(-sFactor)+(notRSFactor/rFactor)

  var sR= rFactor/(-sFactor);
  var sNonR = (notRSFactor/rFactor);

  // x= vec_Cj[0] + r*vec_JI[0] + s*vec_JK[0]
  // y= vec_Cj[1] + r*vec_JI[1] + s*vec_JK[1]
  // z= vec_Cj[2] + r*vec_JI[2] + s*vec_JK[2]

  var intersectionLine_supVec = [undefined,undefined,undefined];
  var intersectionLine_dirVec = [undefined,undefined,undefined];

  // Line G: = intersectionLine_supVec + r*intersectionLine_dirVec

  intersectionLine_supVec[0]= vec_Cj[0] + sNonR*vec_JK[0];
  intersectionLine_supVec[1]= vec_Cj[1] + sNonR*vec_JK[1];
  intersectionLine_supVec[2]= vec_Cj[2] + sNonR*vec_JK[2];

  intersectionLine_dirVec[0] = vec_JI[0]+ sR*vec_JK[0];
  intersectionLine_dirVec[1] = vec_JI[1]+ sR*vec_JK[1];
  intersectionLine_dirVec[2] = vec_JI[2]+ sR*vec_JK[2];

  ///////////////////////////////////////////////
  // PLANE-PLANE Intersection Line
  // http://geomalgorithms.com/a05-_intersect-1.html
  /*var intersectionLine_dirVec = vecNorm(vec_Cross(norm1,norm2));
  var ax = (intersectionLine_dirVec[0] >= 0 ? intersectionLine_dirVec[0] : -intersectionLine_dirVec[0]);
  var ay = (intersectionLine_dirVec[1] >= 0 ? intersectionLine_dirVec[1] : -intersectionLine_dirVec[1]);
  var az = (intersectionLine_dirVec[2] >= 0 ? intersectionLine_dirVec[2] : -intersectionLine_dirVec[2]);

  // test if the two planes are parallel
    if ((ax+ay+az) < small_NUM) {        // Pn1 and Pn2 are near parallel
        // test if disjoint or coincide
        var vec_V = vec_Diff(plane_Point2,plane_Point1);
        if (vec_Dot(norm1, vec_V) == 0)          // Pn2.V0 lies in Pn1
            return 0;                    // Pn1 and Pn2 coincide
        else
            return 0;                    // Pn1 and Pn2 are disjoint
    }


    // Pn1 and Pn2 intersect in a line
    // first determine max abs coordinate of cross product
    var  maxc = undefined;                       // max coordinate
    if (ax > ay) {
        if (ax > az)
             maxc =  1;
        else maxc = 3;
    }
    else {
        if (ay > az)
             maxc =  2;
        else maxc = 3;
    }

    // next, to get a point on the intersect line
    // zero the max coord, and solve for the other two
    var intersectionLine_supVec = [undefined,undefined,undefined];                // intersect point

    // the constants in the 2 plane equations
    switch (maxc) {             // select max coordinate
    case 1:                     // intersect with x=0
        intersectionLine_supVec[0] = 0;
        intersectionLine_supVec[1] = (d2*norm1[2] - d1*norm2[2]) /  intersectionLine_dirVec[0];
        intersectionLine_supVec[2] = (d1*norm2[1] - d2*norm1[1]) /  intersectionLine_dirVec[0];
        break;
    case 2:                     // intersect with y=0
        intersectionLine_supVec[0] = ((d1*norm2[2]) - (d2*norm1[2])) /  intersectionLine_dirVec[1];//((d1*norm2[2]) - (d2*norm1[2])) /  intersectionLine_dirVec[1];
        intersectionLine_supVec[1] = 0;
        intersectionLine_supVec[2] = ((d2*norm1[0]) - (d1*norm2[0])) /  intersectionLine_dirVec[1];//((d2*norm1[0]) - (d1*norm2[0])) /  intersectionLine_dirVec[1];


        //console.log("intersectionLine_supVec[0]=(",d1,"*",norm2[2],"-",d2,"*",norm1[2],")/",intersectionLine_dirVec[1],"=",intersectionLine_supVec[0]);
        //console.log("intersectionLine_supVec[2]=(",d2,"*",norm1[0],"-",d1,"*",norm2[0],")/",intersectionLine_dirVec[1],"=",intersectionLine_supVec[2]);

        break;
    case 3:                     // intersect with z=0
        intersectionLine_supVec[0] = ((d2*norm1[1]) - (d1*norm2[1])) /  intersectionLine_dirVec[2];
        intersectionLine_supVec[1] = ((d1*norm2[0]) - (d2*norm1[0])) /  intersectionLine_dirVec[2];
        intersectionLine_supVec[2] = 0;

        //console.log("intersectionLine_supVec[0]=(",d2,"*",norm1[1],"-",d1,"*",norm2[1],")/",intersectionLine_dirVec[2],"=",intersectionLine_supVec[0]);
        //console.log("intersectionLine_supVec[1]=(",d1,"*",norm2[0],"-",d2,"*",norm1[0],")/",intersectionLine_dirVec[2],"=",intersectionLine_supVec[1]);
        break;
    }//*/

    console.log("Smooth: Intersection Line G:= ",intersectionLine_supVec,"+r*",intersectionLine_dirVec);
    /////////////////////////////////////////////////////
    /// get two points on this line with the distance of r to c_i and c_k
    /// line = intersectionLine_supVec + delta * intersectionLine_dirVec;
    /// line_q1 = intersectionLine_supVec[0] + delta * intersectionLine_dirVec[0]
    /// line_q2 = intersectionLine_supVec[1] + delta * intersectionLine_dirVec[1]
    /// line_q3 = intersectionLine_supVec[2] + delta * intersectionLine_dirVec[2]
    /// Searching for one or two points with the distance r to point_P1 with distance r to our line
    /// distance (= Math.pow(r,2))= Math.sqrt(Math.pow(line_q1-P1[0],2)+Math.pow(line_q2-P1[1],2)+Math.pow(line_q3-P1[2],2))
    var point_P1 = [color_Ci.get1Value(),color_Ci.get2Value(),color_Ci.get3Value()];// we can choose c_i or c_j as this color
    var point_Controll = [color_Ck.get1Value(),color_Ck.get2Value(),color_Ck.get3Value()];
    var equation_Part3 = Math.pow(intersectionLine_supVec[0]-point_P1[0],2)+Math.pow(intersectionLine_supVec[1]-point_P1[1],2)+Math.pow(intersectionLine_supVec[2]-point_P1[2],2)-Math.pow(radius,2);
    var equation_Part2 = 2*((intersectionLine_dirVec[0]*(intersectionLine_supVec[0]-point_P1[0])) + (intersectionLine_dirVec[1]*(intersectionLine_supVec[1]-point_P1[1])) + (intersectionLine_dirVec[2]*(intersectionLine_supVec[2]-point_P1[2])));// delta part
    var equation_Part1 = Math.pow(intersectionLine_dirVec[0],2)+Math.pow(intersectionLine_dirVec[1],2)+Math.pow(intersectionLine_dirVec[2],2);// delta square part

    var deltas = midnightFormula(equation_Part1,equation_Part2,equation_Part3);


    var point_m = [undefined,undefined,undefined];
    switch (deltas.length) {
      case 0:
        console.log("Smooth: Midnight Formula found no Point m with a distance \"radius\" to the intersection line!.");
        return;
      break;
      case 1:
        point_m[0] = intersectionLine_supVec[0] + deltas[0] * intersectionLine_dirVec[0];
        point_m[1] = intersectionLine_supVec[1] + deltas[0] * intersectionLine_dirVec[1];
        point_m[2] = intersectionLine_supVec[2] + deltas[0] * intersectionLine_dirVec[2];
      break;
      case 2:
        var tmp_M1 = [undefined,undefined,undefined];
        tmp_M1[0] = intersectionLine_supVec[0] + deltas[0] * intersectionLine_dirVec[0];
        tmp_M1[1] = intersectionLine_supVec[1] + deltas[0] * intersectionLine_dirVec[1];
        tmp_M1[2] = intersectionLine_supVec[2] + deltas[0] * intersectionLine_dirVec[2];

        var tmp_M2 = [undefined,undefined,undefined];
        tmp_M2[0] = intersectionLine_supVec[0] + deltas[1] * intersectionLine_dirVec[0];
        tmp_M2[1] = intersectionLine_supVec[1] + deltas[1] * intersectionLine_dirVec[1];
        tmp_M2[2] = intersectionLine_supVec[2] + deltas[1] * intersectionLine_dirVec[2];

        var dist_M1_Cj = vecLength(vec_Diff(tmp_M1,vec_Cj));
        var dist_M2_Cj = vecLength(vec_Diff(tmp_M2,vec_Cj));

        if(dist_M1_Cj>dist_M2_Cj){
          point_m=tmp_M1;
          console.log("Smooth: Refused alternate Point m = (",tmp_M2[0],",",tmp_M2[1],",",tmp_M2[2],")" );
        }
        else {
          point_m=tmp_M2;
          console.log("Smooth: Refused alternate Point m = (",tmp_M1[0],",",tmp_M1[1],",",tmp_M1[2],")" );
        }
      break;

    }

    console.log("Smooth: Point m = (",point_m[0],",",point_m[1],",",point_m[2],")" );
    var direction_m_To_Cj = vec_Diff(vec_Cj,point_m);
    var distance_m_Cj = vecLength(direction_m_To_Cj);

    if(distance_m_Cj>radius){
      console.log("Smooth: c_j need a movement");
      var newPoint = vec_Add(point_m,vecScalMulti(vecNorm(direction_m_To_Cj),radius));
      this.editCMS.setRightKeyColor(k1,createColor(newPoint[0],newPoint[1],newPoint[2],this.editCMS.getInterpolationSpace()));
      this.editCMS.setLeftKeyColor(k1,createColor(newPoint[0],newPoint[1],newPoint[2],this.editCMS.getInterpolationSpace()));
      return 2;
    }
    else {
      console.log("Smooth: the position of c_j is fine.");
      return 1;
    }

  color_Ci.deleteReferences();
  color_Cj.deleteReferences();
  color_Ck.deleteReferences();
  }
};
