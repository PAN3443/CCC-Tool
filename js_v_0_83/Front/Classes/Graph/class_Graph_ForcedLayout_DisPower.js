class class_Graph_ForcedDisPower extends class_Graph_ForcedLayout {

  forceLayout(iterations, power, degree) {

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
    } //*/

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
        this.nodeArray[v].addDisp(vecScalMulti(vec_d, (1.0 - degree))); // direction vector = force*/
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
        this.nodeArray[this.edgeArray[e].getNodeID2()].subDisp(force);*/

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

  }

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
}
