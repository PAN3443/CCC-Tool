class class_Graph_ForcedLegOrder_Distance extends class_Graph_ForcedLayout {

  forceLayout(iterations,degree, optiDistance,isGlobal){

    if(isGlobal){
      this.forceLayoutGlobal(iterations,degree, optiDistance);
    }
    else{
      this.forceLayoutLocal(iterations,degree, optiDistance);
    }
  }

  forceLayoutLocal(iterations,degree, optiDistance) {

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
      orginColors.push(this.getNodeColor(v));
    }

    var orginEdgeLength= [];
    for (var e = 0; e < this.edgeArray.length; e++) {
      orginEdgeLength.push(this.getNodeColorDifference(this.edgeArray[e].getNodeID1(), this.edgeArray[e].getNodeID2()));
    }

    var start_temperature = this.getStartTemp();
    var check_temperature = start_temperature; // maximal distance, will be updated with each interval; convert to null at each step;
    var impulseFactor = 1e-12;
    var nearZero = 1e-12;

    //console.log("degree",degree);

    for (var i = 0; i < iterations; i++) {

      for (var v = 0; v < this.nodeArray.length; ++v) {
        //repusleForces.push([0, 0, 0]);
        this.nodeArray[v].resetDisp();

        if(this.nodeArray[v].getFixStatus())
          continue;

        /////////////////////////////////////////////////
        //// PART 1: add orgin force
        var color_v_Node = this.getNodeColor(v);
        var vec_d = [orginColors[v][1] - color_v_Node[1], orginColors[v][2] - color_v_Node[2], orginColors[v][3] - color_v_Node[3]];
        this.nodeArray[v].addDisp(vecScalMulti(vec_d, (1.0 - degree))); //this.nodeArray[v].addDisp(vec_d); // direction vector = force
      }

    ////////////////////////////
    ///// Local Legendbased

          for (var e = 0; e < this.edgeArray.length; e++) {



              var vec_d = vec_Diff_COLOR(this.getNodeColor(this.edgeArray[e].getNodeID1()),this.getNodeColor(this.edgeArray[e].getNodeID2()));
              var edgeDistance = vecLength(vec_d);

              if(edgeDistance<optiDistance){
                var distanceDif = optiDistance-edgeDistance;
                var cDif_Change = ((distanceDif) / 2) * degree;

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

  forceLayoutGlobal(iterations,degree, optiDistance) {

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
      orginColors.push(this.getNodeColor(v));
    }

    var orginEdgeLength= [];
    for (var e = 0; e < this.edgeArray.length; e++) {
      orginEdgeLength.push(this.getNodeColorDifference(this.edgeArray[e].getNodeID1(), this.edgeArray[e].getNodeID2()));
    }

    var start_temperature = this.getStartTemp();
    var check_temperature = start_temperature; // maximal distance, will be updated with each interval; convert to null at each step;
    var impulseFactor = 1e-12;
    var nearZero = 1e-12;

    //console.log("degree",degree);
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
        var color_v_Node = this.getNodeColor(v);
        var vec_d = [orginColors[v][1] - color_v_Node[1], orginColors[v][2] - color_v_Node[2], orginColors[v][3] - color_v_Node[3]];
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
            var startColor = this.getNodeColor(nodeStartID);
              var closestColor = this.getNearestPoint_PointSegmentDistance(nodeStartID,edgeIDAfter);
              var vec_d = vec_Diff_COLOR(startColor,closestColor[0]);

              var distance = vecLength(vec_d);

              if(distance<optiDistance){

                if(distance == 0){

                  //continue;
                  var secondColor = this.getNodeColor(nodeStartID+1);

                  //// Find a random orthogonal vector
                  var vec_v = vec_Diff_COLOR(startColor,secondColor);
                  var randomX = getRandomArbitrary(0.0,1.0);
                  var randomY = getRandomArbitrary(0.0,1.0);

                  var orthogonalZ = getRandomArbitrary(0.0000001,1.0); // = (-(vec_v[0]*randomX)-(vec_v[1]*randomX))/vec_v[2];

                  vec_d = [randomX,randomY,orthogonalZ];
                  vec_d= vecScalMulti(vec_d,impulseFactor);

                  distance = vecLength(vec_d);
                  if(distance == 0)
                    continue;
                }

                var distanceDif = optiDistance-distance;
                var cDif_Change = ((distanceDif) / 2) * degree;

                var vec_dN = vecNorm(vec_d);
                var force = vecScalMulti(vec_dN, cDif_Change);

                this.nodeArray[nodeStartID].addDisp(force);
                this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID1()].subDisp(force);
                this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID2()].subDisp(force);
              }

          }
          else if(this.nodeArray[v].getColorID()==0){
            /////////////////////////////////////////////////
            //// PART 4.1: add End Node force
            /////////////////////////////////////////////////

            var nodeEndID = v;
            var edgeIDBefore = this.searchEdgeBefore(v);

            var endColor = this.getNodeColor(nodeEndID);
            var closestColor = this.getNearestPoint_PointSegmentDistance(nodeEndID,edgeIDBefore);

            var vec_d = vec_Diff_COLOR(endColor,closestColor[0]);
            var distance = vecLength(vec_d);

            if(distance<optiDistance){

              if(vecLength(vec_d) == 0){
                //continue;
                var penultimateColor = this.getNodeColor(nodeEndID-1);
                //// Find a random orthogonal vector
                var vec_v = vec_Diff_COLOR(endColor,penultimateColor);
                var randomX = getRandomArbitrary(0.0,1.0);
                var randomY = getRandomArbitrary(0.0,1.0);

                var orthogonalZ = getRandomArbitrary(0.0000001,1.0); // = (-(vec_v[0]*randomX)-(vec_v[1]*randomX))/vec_v[2];

                vec_d = [randomX,randomY,orthogonalZ];
                vec_d= vecScalMulti(vec_d,impulseFactor);

                distance = vecLength(vec_d);
                if(distance == 0)
                  continue;
              }

              var distanceDif = optiDistance-distance;
              var cDif_Change = ((distanceDif) / 2) * degree;
              var vec_dN = vecNorm(vec_d);
              var force = vecScalMulti(vec_dN, cDif_Change);


              this.nodeArray[nodeEndID].addDisp(force);
              this.nodeArray[this.edgeArray[edgeIDBefore].getNodeID1()].subDisp(force);
              this.nodeArray[this.edgeArray[edgeIDBefore].getNodeID2()].subDisp(force);
            }
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
                  vec_d= vecScalMulti(vec_d,impulseFactor);

                  if(vecLength(vec_d) == 0)
                    continue;

                  ///////////////////////////////////////////////////////////////////////////////////////////////////////
                }

                var distance = vecLength(vec_d);

                if(distance<optiDistance){

                  var distanceDif = optiDistance-distance;
                  var cDif_Change = ((distanceDif) / 2) * degree;

                  var vec_dN = vecNorm(vec_d);

                  var force = vecScalMulti(vec_dN, cDif_Change);

                  //console.log(force);
                  this.nodeArray[this.edgeArray[e].getNodeID1()].addDisp(force);
                  this.nodeArray[this.edgeArray[e].getNodeID2()].addDisp(force);

                  this.nodeArray[this.edgeArray[k].getNodeID1()].subDisp(force);
                  this.nodeArray[this.edgeArray[k].getNodeID2()].subDisp(force);

                  // Get direction?
                }
              }
            }


          }


          /////////////////////////////////////////////////
          //// PART 3: add edge length maintenance force
          /////////////////////////////////////////////////
          /*var currentEdgeLength = this.getNodeColorDifference(this.edgeArray[e].getNodeID1(), this.edgeArray[e].getNodeID2());

          if(currentEdgeLength-orginEdgeLength[e]<0){
            var nodeColor1 = this.getNodeColor(this.edgeArray[e].getNodeID1());
            var nodeColor2 = this.getNodeColor(this.edgeArray[e].getNodeID2());
            var vec_d = vec_Diff_COLOR(nodeColor2,nodeColor1);

            if(vecLength(vec_d) == 0){
              vec_d = vec_Diff_COLOR(orginColors[this.edgeArray[e].getNodeID2()],orginColors[this.edgeArray[e].getNodeID1()]);

              while (vecLength(vec_d)){
                vec_d[0] = getRandomArbitrary(-impulseFactor, impulseFactor);
                vec_d[1] = getRandomArbitrary(-impulseFactor, impulseFactor);
                vec_d[2] = getRandomArbitrary(-impulseFactor, impulseFactor);
              }
            }

            var vec_dN = vecNorm(vec_d);

            var force = vecScalMulti(vec_dN, (orginEdgeLength[e]-currentEdgeLength)/2 );
            this.nodeArray[this.edgeArray[e].getNodeID1()].subDisp(force);
            this.nodeArray[this.edgeArray[e].getNodeID2()].addDisp(force);
          }*/

        }



        /////////////////////////////////////////////////
        //// PART 4: Node-Edge force
        /////////////////////////////////////////////////
        /*var nodeEndID = this.nodeArray.length-1;
        var edgeIDBefore = this.edgeArray.length-2;

        var nodeStartID = 0;
        var edgeIDAfter = 1;

        var startColor = this.getNodeColor(0);
        var endColor = this.getNodeColor(nodeEndID);

        /////////////////////////////////////////////////
        //// PART 4.1: add End Node force
        /////////////////////////////////////////////////

        var closestColor = this.getNearestPoint_PointSegmentDistance(nodeEndID,edgeIDBefore);

        var vec_d = vec_Diff_COLOR(endColor,closestColor[0]);
        if(vecLength(vec_d) == 0){

          continue;

          var penultimateColor = this.getNodeColor(nodeEndID-1);

          //// Find a random orthogonal vector
          var vec_v = vec_Diff_COLOR(endColor,penultimateColor);
          var randomX = getRandomArbitrary(0.0,1.0);
          var randomY = getRandomArbitrary(0.0,1.0);

          var orthogonalZ = getRandomArbitrary(0.0000001,1.0); // = (-(vec_v[0]*randomX)-(vec_v[1]*randomX))/vec_v[2];

          vec_d = [randomX,randomY,orthogonalZ];
          vec_d= vecScalMulti(vec_d,impulseFactor);

          if(vecLength(vec_d) == 0)
            continue;

        }
        var distance = vecLength(vec_d);
        var refPos_Closes= this.nodeArray[this.edgeArray[edgeIDBefore].getNodeID1()].getNodeRefPos()+closestColor[1]*Math.abs(this.nodeArray[this.edgeArray[edgeIDBefore].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[edgeIDBefore].getNodeID1()].getNodeRefPos());
        var refPos_End= this.nodeArray[nodeEndID].getNodeRefPos();
        var segmentPointSpeed = distance / Math.abs(refPos_End - refPos_Closes);

        if(segmentPointSpeed<optiDistance){

          var speedDif = optiDistance-segmentPointSpeed;
          var cDif_Change = (speedDif * Math.abs(refPos_End - refPos_Closes)) * degree;
          var vec_dN = vecNorm(vec_d);
          var force = vecScalMulti(vec_dN, cDif_Change);

          this.nodeArray[nodeEndID].addDisp(force);
          this.nodeArray[this.edgeArray[edgeIDBefore].getNodeID1()].subDisp(force);
          this.nodeArray[this.edgeArray[edgeIDBefore].getNodeID2()].subDisp(force);
        }


        /////////////////////////////////////////////////
        //// PART 4.2: add Start Node force
        /////////////////////////////////////////////////
          closestColor = this.getNearestPoint_PointSegmentDistance(nodeStartID,edgeIDAfter);

          vec_d = vec_Diff_COLOR(startColor,closestColor[0]);
          if(vecLength(vec_d) == 0){

            continue;

            var secondColor = this.getNodeColor(nodeStartID+1);

            //// Find a random orthogonal vector
            var vec_v = vec_Diff_COLOR(startColor,secondColor);
            var randomX = getRandomArbitrary(0.0,1.0);
            var randomY = getRandomArbitrary(0.0,1.0);

            var orthogonalZ = getRandomArbitrary(0.0000001,1.0); // = (-(vec_v[0]*randomX)-(vec_v[1]*randomX))/vec_v[2];

            vec_d = [randomX,randomY,orthogonalZ];
            vec_d= vecScalMulti(vec_d,impulseFactor);

            if(vecLength(vec_d) == 0)
              continue;
          }
          distance = vecLength(vec_d);

          refPos_Closes= this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID1()].getNodeRefPos()+closestColor[1]*Math.abs(this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID1()].getNodeRefPos());
          var refPos_Start= this.nodeArray[nodeStartID].getNodeRefPos();
          segmentPointSpeed = distance / Math.abs(refPos_Closes-refPos_Start);

          if(segmentPointSpeed<optiDistance){
            var speedDif = optiDistance-segmentPointSpeed;
            var cDif_Change = (speedDif * Math.abs(refPos_Closes-refPos_Start)) * degree;
            var vec_dN = vecNorm(vec_d);
            var force = vecScalMulti(vec_dN, cDif_Change);

            this.nodeArray[nodeStartID].addDisp(force);
            this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID1()].subDisp(force);
            this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID2()].subDisp(force);
          }

          */


      /////////////////////////////////////////////////
      //// PART 5: Do Movement with temperature
      for (var v = 0; v < this.nodeArray.length; v++)
        this.forceMovement_TMP(v, check_temperature);

      /////////////////////////////////////////////////
      //// PART 6: reduce the temperature as the layout approaches a better configuration and update the new edgeWeights
      check_temperature = start_temperature * (1 - i / (iterations - 1)); //temperature_steps;


    } // FOR (interations)

  }

  getMinWeight(isGlobal){ // return the Min Distance
      var minDistance = Infinity;
      //console.log("------------------------------------");
      if(isGlobal){ // check only edges, which are not neighbaurs
        for (var i = 0; i < this.edgeArray.length-1; i++) {
          for (var j = i+1; j < this.edgeArray.length; j++) {
            if(!this.areEdgeNeighbours(i,j)){
              var distanceInfo = this.getLineSegmentDistancePoints(i,j);
              minDistance=Math.min(minDistance,vecLength(vec_Diff_COLOR(distanceInfo[1],distanceInfo[0])));
            }
          }
        }
      }
      else{
          for (var i = 0; i < this.edgeArray.length; i++) {
              minDistance=Math.min(minDistance, this.getNodeColorDifference(this.edgeArray[i].getNodeID1(), this.edgeArray[i].getNodeID2()));
          }
      }
      //console.log("------------------------------------");
      //console.log(minSpeed);
      return minDistance;
  }

}
