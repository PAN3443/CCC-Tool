class class_Graph_ForcedLegOrder extends class_Graph_ForcedLayout {

  forceLayout(iterations,degree, optiSpeed,isGlobal){

    if(isGlobal){
      this.forceLayoutGlobal(iterations,degree, optiSpeed);
    }
    else{
      this.forceLayoutLocal(iterations,degree, optiSpeed);
    }
  }

  forceLayoutLocal(iterations,degree, optiSpeed) {

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

    //console.log("degree",degree);

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

                //console.log(3,edgeSpeed,"<",optiSpeed);

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

  forceLayoutGlobal(iterations,degree, optiSpeed) {

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

    //console.log("degree",degree);

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

                  //console.log("nearZero", e);
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
                var refPos1= this.nodeArray[this.edgeArray[e].getNodeID1()].getNodeRefPos()+distanceInfo[2]*Math.abs(this.nodeArray[this.edgeArray[e].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[e].getNodeID1()].getNodeRefPos());
                var refPos2= this.nodeArray[this.edgeArray[k].getNodeID1()].getNodeRefPos()+distanceInfo[3]*Math.abs(this.nodeArray[this.edgeArray[k].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[k].getNodeID1()].getNodeRefPos());

                var segmentSpeed = distance / Math.abs(refPos2 - refPos1);

                //console.log(segmentSpeed,"<",optiSpeed);
                if(segmentSpeed<optiSpeed){

                  var speedDif = optiSpeed-segmentSpeed;
                  var cDif_Change = ((speedDif * Math.abs(refPos2 - refPos1)) / 2) * degree;

                  var vec_dN = vecNorm(vec_d);

                  var force = vecScalMulti(vec_dN, cDif_Change);

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


          /////////////////////////////////////////////////
          //// PART 3: add edge length maintenance force
          /////////////////////////////////////////////////
          /*var currentEdgeLength = this.getNodeColorDifference(this.edgeArray[e].getNodeID1(), this.edgeArray[e].getNodeID2());

          if(currentEdgeLength-orginEdgeLength[e]<0){
            var nodeColor1 = this.nodeArray[this.edgeArray[e].getNodeID1()].getNodeColor();
            var nodeColor2 = this.nodeArray[this.edgeArray[e].getNodeID2()].getNodeColor();
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
        var nodeEndID = this.nodeArray.length-1;
        var edgeIDBefore = this.edgeArray.length-2;

        var nodeStartID = 0;
        var edgeIDAfter = 1;

        var startColor = this.nodeArray[0].getNodeColor();
        var endColor = this.nodeArray[nodeEndID].getNodeColor();

        /////////////////////////////////////////////////
        //// PART 4.1: add End Node force
        /////////////////////////////////////////////////

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

        /////////////////////////////////////////////////
        //// PART 4.2: add Start Node force
        /////////////////////////////////////////////////
          closestColor = this.getNearestPoint_PointSegmentDistance(nodeStartID,edgeIDAfter);

          vec_d = vec_Diff_COLOR(startColor,closestColor[0]);
          if(vecLength(vec_d) == 0){

            continue;

            var secondColor = this.nodeArray[nodeStartID+1].getNodeColor();

            //// Find a random orthogonal vector
            var vec_v = vec_Diff_COLOR(startColor,secondColor);
            var randomX = getRandomArbitrary(0.0,1.0);
            var randomY = getRandomArbitrary(0.0,1.0);

            var orthogonalZ = (-(vec_v[0]*randomX)-(vec_v[1]*randomX))/vec_v[2];

            vec_d = [randomX,randomY,orthogonalZ];
            vec_d= vecScalMulti(vec_d,impulseFactor);
            secondColor.deleteReferences();
            randomPoint.deleteReferences();

            if(vecLength(vec_d) == 0)
              continue;
          }
          distance = vecLength(vec_d);

          refPos_Closes= this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID1()].getNodeRefPos()+closestColor[1]*Math.abs(this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID2()].getNodeRefPos() - this.nodeArray[this.edgeArray[edgeIDAfter].getNodeID1()].getNodeRefPos());
          var refPos_Start= this.nodeArray[nodeStartID].getNodeRefPos();
          segmentPointSpeed = distance / Math.abs(refPos_Closes-refPos_Start);

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
        endColor.deleteReferences();


      /////////////////////////////////////////////////
      //// PART 5: Do Movement with temperature
      for (var v = 0; v < this.nodeArray.length; v++)
        this.forceMovement_TMP(v, check_temperature);

      /////////////////////////////////////////////////
      //// PART 6: reduce the temperature as the layout approaches a better configuration and update the new edgeWeights
      check_temperature = start_temperature * (1 - i / (iterations - 1)); //temperature_steps;


    } // FOR (interations)

  }

  getMinSpeed(isGlobal){
      var minSpeed = Infinity;
      //console.log("------------------------------------");
      if(isGlobal){ // check only edges, which are not neighbaurs
        for (var i = 0; i < this.edgeArray.length-1; i++) {
          for (var j = i+1; j < this.edgeArray.length; j++) {
            if(!this.areEdgeNeighbours(i,j))
              minSpeed=Math.min(minSpeed,this.getLineSegmentSpeed(i,j));
          }
        }
      }
      else{
          for (var i = 0; i < this.edgeArray.length; i++) {
              minSpeed=Math.min(minSpeed,this.getNodeSpeed(this.edgeArray[i].getNodeID1(), this.edgeArray[i].getNodeID2()));
          }
      }
      //console.log("------------------------------------");
      //console.log(minSpeed);
      return minSpeed;
  }

}
