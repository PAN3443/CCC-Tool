class class_Graph_ForcedDisPower_Speed extends class_Graph_ForcedLayout {

  forceLayout(iterations, optiSpeedDegree,degree,isGlobal){
    if(isGlobal){
      this.forceLayoutGlobal(iterations, optiSpeedDegree,degree);
    }
    else{
      this.forceLayoutLocal(iterations, optiSpeedDegree,degree);
    }
  }

  forceLayoutGlobal(iterations, optiSpeedDegree,degree) {

    if (isNaN(iterations))
      return;

    if (degree == 1)
      degree = 1 - 1e-5;

    /////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    ////  LegendBased Forced Graph
    /////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

    var orginColors = [];
    for (var v = 0; v < this.nodeArray.length; v++) {
      orginColors.push(this.nodeArray[v].getNodeColor());
    }

    var orginEdgeLength= [];
    for (var e = 0; e < this.edgeArray.length; e++) {
      orginEdgeLength.push(this.getNodeColorDifference(this.edgeArray[e].getNodeID1(), this.edgeArray[e].getNodeID2()));
    }

    var start_temperature = this.getStartTemp();
    var check_temperature = start_temperature; // maximal distance, will be updated with each interval; convert to null at each step;
    var impulseFactor = 1e-12;
    var nearZero = 1e-12;

    var optiSpeed=this.determineMaxSetting(true)*optiSpeedDegree;

    for (var i = 0; i < iterations; i++) {

      for (var v = 0; v < this.nodeArray.length; ++v) {
        //repusleForces.push([0, 0, 0]);
        this.nodeArray[v].resetDisp();
      }

      for (var v = 0; v < this.nodeArray.length; ++v) {
        if(this.nodeArray[v].getFixStatus())
          continue;

        /////////////////////////////////////////////////
        //// PART 1: add orgin force
        var color_v_Node = this.nodeArray[v].getNodeColor();
        var vec_d = [orginColors[v].get1Value() - color_v_Node.get1Value(), orginColors[v].get2Value() - color_v_Node.get2Value(), orginColors[v].get3Value() - color_v_Node.get3Value()];
        this.nodeArray[v].addDisp(vecScalMulti(vec_d, (1.0 - degree))); //this.nodeArray[v].addDisp(vec_d); // direction vector = force

        //////////////////////////////////////////////////////////////////////////////////
        //////////// TEST

        /////////////////////////////////////////////////
        //// PART 4: Node-Edge force
        /////////////////////////////////////////////////

        if(this.nodeArray[v].getColorID()!=2){

          if(this.nodeArray[v].getColorID()==1){

            /////////////////////////////////////////////////
            //// PART 4.2: add Start Node force
            /////////////////////////////////////////////////
            var nodeStartID = v;
            var edgeIDAfter = this.searchEdgeAfter(v);
            var startColor = this.nodeArray[nodeStartID].getNodeColor();
              var closestColor = this.getNearestPoint_PointSegmentDistance(nodeStartID,edgeIDAfter);
              var vec_d = vec_Diff_COLOR(startColor,closestColor[0]);
              if(vecLength(vec_d) == 0){

                //continue;
                var secondColor = this.nodeArray[nodeStartID+1].getNodeColor();

                //// Find a random orthogonal vector
                var vec_v = vec_Diff_COLOR(startColor,secondColor);
                var randomX = getRandomArbitrary(0.0,1.0);
                var randomY = getRandomArbitrary(0.0,1.0);

                var orthogonalZ = (-(vec_v[0]*randomX)-(vec_v[1]*randomX))/vec_v[2];

                vec_d = [randomX,randomY,orthogonalZ];
                vec_d= vecScalMulti(vec_d,impulseFactor);
                secondColor.deleteReferences();
                //randomPoint.deleteReferences();

                if(vecLength(vec_d) == 0)
                  continue;
              }
              var distance = vecLength(vec_d);

              var refPos_Closes= this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID1()].getNodeRefPos()+closestColor[1]*Math.abs(this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID1()].getNodeRefPos());
              var refPos_Start= this.nodeArray[nodeStartID].getNodeRefPos();
              var segmentPointSpeed = distance / Math.abs(refPos_Closes-refPos_Start);

              if(segmentPointSpeed<optiSpeed){
                var speedDif = optiSpeed-segmentPointSpeed;
                var cDif_Change = (speedDif * Math.abs(refPos_Closes-refPos_Start)) * degree;
                var vec_dN = vecNorm(vec_d);
                var force = vecScalMulti(vec_dN, cDif_Change/2);

                this.nodeArray[nodeStartID].addDisp(force);
                this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID1()].subDisp(force);
                this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID2()].subDisp(force);
              }

              closestColor[0].deleteReferences();

            startColor.deleteReferences();

          }
          else if(this.nodeArray[v].getColorID()==0){
            /////////////////////////////////////////////////
            //// PART 4.1: add End Node force
            /////////////////////////////////////////////////
            var nodeEndID = v;
            var edgeIDBefore = this.searchEdgeBefore(v);

            var endColor = this.nodeArray[nodeEndID].getNodeColor();
            var closestColor = this.getNearestPoint_PointSegmentDistance(nodeEndID,edgeIDBefore);

            var vec_d = vec_Diff_COLOR(endColor,closestColor[0]);
            if(vecLength(vec_d) == 0){

              continue;

              var penultimateColor = this.nodeArray[nodeEndID-1].getNodeColor();

              //// Find a random orthogonal vector
              var vec_v = vec_Diff_COLOR(endColor,penultimateColor);
              var randomX = getRandomArbitrary(0.0,1.0);
              var randomY = getRandomArbitrary(0.0,1.0);

              var orthogonalZ = (-(vec_v[0]*randomX)-(vec_v[1]*randomX))/vec_v[2];

              vec_d = [randomX,randomY,orthogonalZ];
              vec_d= vecScalMulti(vec_d,impulseFactor);

              if(vecLength(vec_d) == 0)
                continue;

            }
            var distance = vecLength(vec_d);
            var refPos_Closes= this.nodeArray[this.edgeArray[edgeIDBefore].getNodeID1()].getNodeRefPos()+closestColor[1]*Math.abs(this.nodeArray[this.edgeArray[edgeIDBefore].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[edgeIDBefore].getNodeID1()].getNodeRefPos());
            var refPos_End= this.nodeArray[nodeEndID].getNodeRefPos();
            var segmentPointSpeed = distance / Math.abs(refPos_End - refPos_Closes);

            if(segmentPointSpeed<optiSpeed){

              var speedDif = optiSpeed-segmentPointSpeed;
              var cDif_Change = (speedDif * Math.abs(refPos_End - refPos_Closes)) * degree;
              var vec_dN = vecNorm(vec_d);
              var force = vecScalMulti(vec_dN, cDif_Change/2);


              this.nodeArray[nodeEndID].addDisp(force);
              this.nodeArray[this.edgeArray[edgeIDBefore].getNodeID1()].subDisp(force);
              this.nodeArray[this.edgeArray[edgeIDBefore].getNodeID2()].subDisp(force);
            }

            closestColor[0].deleteReferences();
            closestColor=undefined;
            endColor.deleteReferences();
          }
        }
      }



        for (var e = 0; e < this.edgeArray.length; e++) {

          /////////////////////////////////////////////////
          //// PART 2: add repusle force
          /////////////////////////////////////////////////
          if(e != this.edgeArray.length-1){
            for (var k = e+1; k < this.edgeArray.length; k++) {
              if(!this.areEdgeNeighbours(e,k)){

                var distanceInfo = this.getLineSegmentDistancePoints(e,k);
                var vec_d = vec_Diff_COLOR(distanceInfo[0],distanceInfo[1]); // direction vector from k to e

                if(vecLength(vec_d) < nearZero){
                  ///////////////////////////////////////////////////////////////////////////////////////////////////////
                  // we have no direction and an intersection point => we don't want to use a random direction -> create a plane with the four key colors and use the plane normale as direction!

                  // determine plane and norm => easier cross product
                  vec_d = this.getEdgeCrossProduct(e,k);

                  // set to a very small length
                  vec_d = vecScalMulti(vec_d,impulseFactor);

                  if(vecLength(vec_d) == 0)
                    continue;

                  ///////////////////////////////////////////////////////////////////////////////////////////////////////
                }

                var distance = vecLength(vec_d);
                var refPos1= this.nodeArray[this.edgeArray[e].getNodeID1()].getNodeRefPos()+distanceInfo[2]*Math.abs(this.nodeArray[this.edgeArray[e].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[e].getNodeID1()].getNodeRefPos());
                var refPos2= this.nodeArray[this.edgeArray[k].getNodeID1()].getNodeRefPos()+distanceInfo[3]*Math.abs(this.nodeArray[this.edgeArray[k].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[k].getNodeID1()].getNodeRefPos());

                var segmentSpeed = distance / Math.abs(refPos2 - refPos1);

                /*if(i==iterations-1){
                  console.log("Edge Speed (",e,"):",segmentSpeed,"<",optiSpeed);
                }*/


                if(segmentSpeed<optiSpeed){

                  var speedDif = optiSpeed-segmentSpeed;
                  var cDif_Change = ((speedDif * Math.abs(refPos2 - refPos1)) / 2) * degree;

                  var vec_dN = vecNorm(vec_d);

                  var force = vecScalMulti(vec_dN, cDif_Change);

                  /*if(i==iterations-1){
                    console.log(force);
                  }*/

                  //console.log(force);
                  this.nodeArray[this.edgeArray[e].getNodeID1()].addDisp(force);
                  this.nodeArray[this.edgeArray[e].getNodeID2()].addDisp(force);

                  this.nodeArray[this.edgeArray[k].getNodeID1()].subDisp(force);
                  this.nodeArray[this.edgeArray[k].getNodeID2()].subDisp(force);

                  // Get direction?
                }

                distanceInfo[0].deleteReferences();
                distanceInfo[1].deleteReferences();
              }
            }


          }

        }





      /////////////////////////////////////////////////
      //// PART 5: Do Movement with temperature
      for (var v = 0; v < this.nodeArray.length; v++)
        this.forceMovement_TMP(v, check_temperature);

      /////////////////////////////////////////////////
      //// PART 6: reduce the temperature as the layout approaches a better configuration and update the new edgeWeights
      check_temperature = start_temperature * (1 - i / (iterations - 1)); //temperature_steps;


    } // FOR (interations)

  }

  forceLayoutLocal(iterations, optiSpeedDegree,degree) {

    if (isNaN(iterations))
      return;

    if (degree == 1)
      degree = 1 - 1e-5;

    /////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    ////  LegendBased Forced Graph
    /////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

    var orginColors = [];
    for (var v = 0; v < this.nodeArray.length; v++) {
      orginColors.push(this.nodeArray[v].getNodeColor());
    }

    var orginEdgeLength= [];
    for (var e = 0; e < this.edgeArray.length; e++) {
      orginEdgeLength.push(this.getNodeColorDifference(this.edgeArray[e].getNodeID1(), this.edgeArray[e].getNodeID2()));
    }

    var start_temperature = this.getStartTemp();
    var check_temperature = start_temperature; // maximal distance, will be updated with each interval; convert to null at each step;
    var impulseFactor = 1e-12;
    var nearZero = 1e-12;

    var optiSpeed=this.determineMaxSetting(false)*optiSpeedDegree;

    for (var i = 0; i < iterations; i++) {

      for (var v = 0; v < this.nodeArray.length; ++v) {
        //repusleForces.push([0, 0, 0]);
        this.nodeArray[v].resetDisp();

        /////////////////////////////////////////////////
        //// PART 1: add orgin force
        var color_v_Node = this.nodeArray[v].getNodeColor();
        var vec_d = [orginColors[v].get1Value() - color_v_Node.get1Value(), orginColors[v].get2Value() - color_v_Node.get2Value(), orginColors[v].get3Value() - color_v_Node.get3Value()];
        this.nodeArray[v].addDisp(vecScalMulti(vec_d, (1.0 - degree))); //this.nodeArray[v].addDisp(vec_d); // direction vector = force
      }


          ////////////////////////////
          ///// Local Legendbased

          for (var e = 0; e < this.edgeArray.length; e++) {

              var edgeSpeed = this.getNodeSpeed(this.edgeArray[e].getNodeID1(), this.edgeArray[e].getNodeID2());

              var vec_d = vec_Diff_COLOR(this.nodeArray[this.edgeArray[e].getNodeID1()].getNodeColor(),this.nodeArray[this.edgeArray[e].getNodeID2()].getNodeColor());

              if(edgeSpeed<optiSpeed){

                var refDis = Math.abs(this.nodeArray[this.edgeArray[e].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[e].getNodeID1()].getNodeRefPos());

                var speedDif = optiSpeed-edgeSpeed;
                var cDif_Change = ((speedDif * refDis) / 2) * degree;

                var vec_dN = vecNorm(vec_d);

                var force = vecScalMulti(vec_dN, cDif_Change);

                this.nodeArray[this.edgeArray[e].getNodeID1()].addDisp(force);
                this.nodeArray[this.edgeArray[e].getNodeID2()].subDisp(force);
              }
          }


      /////////////////////////////////////////////////
      //// PART 5: Do Movement with temperature
      for (var v = 0; v < this.nodeArray.length; v++)
        this.forceMovement_TMP(v, check_temperature);

      /////////////////////////////////////////////////
      //// PART 6: reduce the temperature as the layout approaches a better configuration and update the new edgeWeights
      check_temperature = start_temperature * (1 - i / (iterations - 1)); //temperature_steps;


    } // FOR (interations)

  }

  determineMaxSetting(isGlobal){

    var refDis = Math.abs(this.nodeArray[this.edgeArray[this.edgeArray.length-1].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[0].getNodeID1()].getNodeRefPos());
    var weakening = 1.0;
    if(isGlobal){
      switch (this.graphColorSpace) {
        case "rgb":
          return (3.4/refDis)*weakening;
        case "lab":
          return (3.4*75/refDis)*weakening;
        case "din99":
          return (3.4*75/refDis)*weakening;
        default:
          return undefined;
      }

      ///////////////////////////////////
      // Old Volume Idea
      /*var volumen = undefined;
      switch (this.graphColorSpace) {
        case "rgb":
          volumen = 1.0; //area/this.nodeArray.length; //Math.sqrt(area/this.nodeArray.length);
          break;
        case "lab":
          volumen = 4/3*Math.PI*Math.pow(75,3); // approximation: use sphere with radius 75;
          break;
        case "din99":
          volumen = 4/3*Math.PI*Math.pow(75,3); // approximation: use sphere with radius 75;
          break;
        default:
          return;
      }
      var optimalDistanceSegment = Math.pow(volumen/this.nodeArray.length, 1/3); // in 2D rood of plane, in 3D 3th root of volumen
      var optimalDistance = optimalDistanceSegment*this.edgeArray.length;

      return optimalDistance/refDis;*/
    }
    else {
      switch (this.graphColorSpace) {
        case "rgb":
          return Math.sqrt(3)/refDis * this.edgeArray.length*weakening;
        case "lab":
          return 100/refDis * this.edgeArray.length*weakening;
        case "din99":
          return 100/refDis * this.edgeArray.length*weakening;
        default:
          return undefined;
      }
    }
  }


}




/*forceLayout(iterations, power, degree) {

  if (isNaN(iterations))
    return;

  var orginColors = [];
  for (var v = 0; v < this.nodeArray.length; v++) {
    orginColors.push(this.nodeArray[v].getNodeColor());
  }

  /////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////  Forced Graph
  /////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  var val_k = undefined;
  switch (this.graphColorSpace) {
    case "rgb":
      val_k = power; //Math.sqrt(1.0/this.nodeArray.length); //area/this.nodeArray.length; //Math.sqrt(area/this.nodeArray.length);
      break;
    case "lab":
      val_k = power * 128;
      break;
    case "din99":
      val_k = power * 128;
      break;
    case "hsv":
      val_k = power * 100;
      break;
    case "lch":
      val_k = power * 100;
      break;
    default:
      return;
  } //* /

  ///////////////////////////////////////////////////////////////
  var impulseFactor = 1e-12;
  var start_temperature = 1 * 10;
  var check_temperature = 1 * 10; // maximal distance, will be updated with each interval; convert to null at each step;

  // Alternative use as optimal distance the average speed?

  for (var i = 0; i < iterations; i++) {

    /////////////////////////////////////////////////
    //// PART 1: Set Disp to zero and add orgin force
    for (var v = 0; v < this.nodeArray.length; v++) {
      this.nodeArray[v].resetDisp();

      var color_v_Node = this.nodeArray[v].getNodeColor();
      var vec_d = [orginColors[v].get1Value() - color_v_Node.get1Value(), orginColors[v].get2Value() - color_v_Node.get2Value(), orginColors[v].get3Value() - color_v_Node.get3Value()];
      this.nodeArray[v].addDisp(vecScalMulti(vec_d, (1.0 - degree))); // direction vector = force* /
    }

    /////////////////////////////////////////////////
    //// PART 2:
    for (var e = 0; e < this.edgeArray.length; e++) {
      var idV = this.edgeArray[e].getNodeID1();
      var idU = this.edgeArray[e].getNodeID2();
      var color_v_Node = this.nodeArray[idV].getNodeColor();
      var color_u_Node = this.nodeArray[idU].getNodeColor();

      var vec_d = [color_v_Node.get1Value() - color_u_Node.get1Value(), color_v_Node.get2Value() - color_u_Node.get2Value(), color_v_Node.get3Value() - color_u_Node.get3Value()];
      var vec_dL = vecLength(vec_d);

      while (vec_dL == 0) {
        vec_d[0] = getRandomArbitrary(-impulseFactor, impulseFactor);
        vec_d[1] = getRandomArbitrary(-impulseFactor, impulseFactor);
        vec_d[2] = getRandomArbitrary(-impulseFactor, impulseFactor);
        vec_dL = vecLength(vec_d);
      }

      var vec_dN = vecNorm(vec_d);
      var cDif_Change = ((val_k - vec_dL) / 2) * degree;

      if (i == 0)
        console.log(cDif_Change);

      var force = vecScalMulti(vec_dN, cDif_Change);

      /*this.nodeArray[this.edgeArray[e].getNodeID1()].addDisp(force);
      this.nodeArray[this.edgeArray[e].getNodeID2()].subDisp(force);* /

      this.nodeArray[this.edgeArray[e].getNodeID1()].addDisp(force);
      this.nodeArray[this.edgeArray[e].getNodeID2()].subDisp(force);

      color_u_Node.deleteReferences();
      color_u_Node = null;
      color_v_Node.deleteReferences();
      color_v_Node = null;
    }

    /////////////////////////////////////////////////
    //// PART 3: limit max displacement to temperaturetand prevent from displacementoutside frame

    for (var v = 0; v < this.nodeArray.length; v++)
      this.forceMovement_TMP(v, check_temperature);

    /////////////////////////////////////////////////
    //// PART 4: reduce the temperature as the layout approaches a better configuration and update the new edgeWeights
    check_temperature = start_temperature * (1 - i / (iterations - 1)); //temperature_steps;
    this.updateEdgeColorWeights();

    if (this.avgSpeedUpdate) {
      optimumSpeed = this.getAvgSpeed();
    }

  } // FOR (interations)

}*/

/*forceLayout(iterations, power) { //space,useSpeed){
  console.log("disPower with orgin force:", this.originForce);
  var orginColors = [];
  for (var v = 0; v < this.nodeArray.length; v++) {
    orginColors.push(this.nodeArray[v].getNodeColor());
  }

  ////////////////////////////////////////////////////////////////////
  /// Force-Directed after the algorithm by Fruchterman and Reingold
  //////////////////////////////////

  var val_k = undefined;
  switch (this.graphColorSpace) {
    case "rgb":
      val_k = power; //area/this.nodeArray.length; //Math.sqrt(area/this.nodeArray.length);
      break;
    case "lab":
      val_k = power * 100;
      break;
    case "din99":
      val_k = power * 100;
      break;
    case "hsv":
      val_k = power * 100;
      break;
    case "lch":
      val_k = power * 100;
      break;
    default:
      return;
  } //

  var val_ks = Math.pow(val_k, 2);
  var impulseFactor = val_ks * 1e-12;
  var start_temperature = 1 * 10;
  var check_temperature = 1 * 10; // maximal distance, will be updated with each interval; convert to null at each step;
  var temperature_steps = check_temperature / (iterations + 1);

  // Alternative use as optimal distance the average speed?

  for (var i = 0; i < iterations; i++) {

    /////////////////////////////////////////////////
    //// PART 1: Calc Respulsive Forces (Forces between nodes)
    for (var v = 0; v < this.nodeArray.length; v++) {
      this.nodeArray[v].resetDisp(); // set disp to zero
      var color_v_Node = this.nodeArray[v].getNodeColor();

      if (this.originForce) {
        var vec_d = [orginColors[v].get1Value() - color_v_Node.get1Value(), orginColors[v].get2Value() - color_v_Node.get2Value(), orginColors[v].get3Value() - color_v_Node.get3Value()];
        this.nodeArray[v].addDisp(vec_d); // direction vector = force
      } //

      for (var u = 0; u < this.nodeArray.length; u++) {
        if (v == u)
          continue;

        var color_u_Node = this.nodeArray[u].getNodeColor();
        var vec_d = [color_v_Node.get1Value() - color_u_Node.get1Value(), color_v_Node.get2Value() - color_u_Node.get2Value(), color_v_Node.get3Value() - color_u_Node.get3Value()]; // difference vector between the positions of the two vertices
        var vec_dN = vecNorm(vec_d);
        var vec_dL = vecLength(vec_d);

        var rep_Force = [0, 0, 0];

        while (vec_dL == 0) {
          vec_d[0] = getRandomArbitrary(-impulseFactor, impulseFactor);
          vec_d[1] = getRandomArbitrary(-impulseFactor, impulseFactor);
          vec_d[2] = getRandomArbitrary(-impulseFactor, impulseFactor);
          vec_dN = vecNorm(vec_d);
          vec_dL = vecLength(vec_d);
        }

        var rep_Force = vecScalMulti(vec_dN, (val_ks / vec_dL)); // function repulse force f(x) = Math.pow(val_k,2)/x

        this.nodeArray[v].addDisp(rep_Force);

        color_u_Node.deleteReferences();
        color_u_Node = null;
      }

      color_v_Node.deleteReferences();
      color_v_Node = null;
    }

    /////////////////////////////////////////////////
    //// PART 2: Calc Attractive  Forces (Forces between two the nodes of each edge)
    for (var e = 0; e < this.edgeArray.length; e++) {
      var color_v_Node = this.nodeArray[this.edgeArray[e].getNodeID1()].getNodeColor();
      var color_u_Node = this.nodeArray[this.edgeArray[e].getNodeID2()].getNodeColor();

      var vec_d = [color_v_Node.get1Value() - color_u_Node.get1Value(), color_v_Node.get2Value() - color_u_Node.get2Value(), color_v_Node.get3Value() - color_u_Node.get3Value()];

      var vec_dN = vecNorm(vec_d);
      var vec_dLs = Math.pow(vecLength(vec_d), 2);
      var at_Force = vecScalMulti(vec_dN, (vec_dLs / val_k)); // function attractive f(x) = Math.pow(x,2)/val_k

      this.nodeArray[this.edgeArray[e].getNodeID1()].subDisp(at_Force);
      this.nodeArray[this.edgeArray[e].getNodeID2()].addDisp(at_Force);

      color_u_Node.deleteReferences();
      color_u_Node = null;
      color_v_Node.deleteReferences();
      color_v_Node = null;
    }

    /////////////////////////////////////////////////
    //// PART 3: limit max displacement to temperaturetand prevent from displacementoutside frame
    for (var v = 0; v < this.nodeArray.length; v++) // set new positions
    {
      //v.pos:=v.pos+ (v.disp/|v.disp|)∗min(v.disp, t);

      var tmp_disp = this.nodeArray[v].getDisp();

      var length = vecLength(tmp_disp);

      // check if it is colder than the check_temperature, if not -> update
      if (check_temperature < length) {
        var norm = vecNorm(tmp_disp);
        this.nodeArray[v].setDisp(vecScalMulti(norm, check_temperature));
      }
      this.nodeArray[v].forceMovement(this.rgbCorr);

    }

    /////////////////////////////////////////////////
    //// PART 4: Prevent Colormap Path Intersections
    /*if(this.preventCMapPathIntersections){

      var foundIntersection = true;
      var maxCounter = 0;

      while (foundIntersection && maxCounter<1000) {
        foundIntersection = false;
        maxCounter++;
        for(var v=0; v < this.nodeArray.length; v++) // set new positions
        {
          for(var u=0; u < this.nodeArray.length; u++) // set new positions
          {
            if(v==u || v+1==u || v==u+1 || v+1==u+1)
              continue;

            if(this.hasIntersectionPoint(v,v+1,u,u+1)){
              foundIntersection = true;
            }
          }

        }
      }
      console.log(maxCounter);
    }

    /////////////////////////////////////////////////
    //// PART 5: reduce the temperature as the layout approaches a better configuration
    check_temperature = start_temperature * (1 - i / (iterations - 1)); //temperature_steps;

  } // END For Loop (interations)
}

*/
