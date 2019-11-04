class class_Graph {

  constructor(colorSpace) {
    this.graphColorSpace = colorSpace;
    this.nodeArray = [];
    this.edgeArray = [];
    this.startIndex = 0;
    this.startNodeSet = false;
    this.endIndex = 0;
    this.endNodeSet = false;
    this.intermediateNodes = [];
    this.cmsInfo = [];

    // color depending weith options
    this.useSpeed = true;
    this.distanceType = "eu"; // eu is (euclidean distance), de94, de2000
    this.originForce = true;
    this.rgbCorr = true;
    this.doDamping = false;
    this.avgSpeedUpdate = false;
    this.preventCMapPathIntersections = true;
  }

  deleteReferences() {

    for (var i = this.nodeArray.length - 1; i >= 0; i--) {
      if (this.nodeArray[i] != undefined) {
        this.nodeArray[i].deleteReferences();
        this.nodeArray[i] = null;
      }
    }
    delete this.nodeArray;

    for (var i = this.edgeArray.length - 1; i >= 0; --i) {
      if (this.edgeArray[i] != undefined) {
        this.edgeArray[i].deleteReferences();
        this.edgeArray[i] = null;
      }
    }
    delete this.edgeArray;
    delete this.graphColorSpace;
    delete this.startIndex;
    delete this.startNodeSet;
    delete this.endIndex;
    delete this.endNodeSet;
    delete this.intermediateNodes;
  }

  setDamping(bool){
    this.doDamping = bool;
  }

  setOF( of ) {
    this.originForce = of ;
  }

  setRGBCorr(bool) {
    this.rgbCorr = bool;
  }

  setAvgSpeedUpdate(bool) {
    this.avgSpeedUpdate = bool;
  }

  pushCMSInfo(info) {
    this.cmsInfo.push(info);
  }

  getCMSInfo(index) {
    return this.cmsInfo[index];
  }

  /////////////////////////////////////////////////////
  //// Force Layout Graph
  ////////////////////////////////////////////////////

  getAvgSpeed() {
    var sum = 0;
    var counter=0;

    for (var v = 0; v < this.nodeArray.length; ++v) {
      for (var u = v+1; u < this.nodeArray.length; ++u) {
          sum += this.getNodeSpeed(v, u);
          counter++;
      }
    }
    return sum / counter;
  }


  forceMovement_TMP(nodeID, tmp) {
    var tmp_disp = this.nodeArray[nodeID].getDisp();
    var length = vecLength(tmp_disp);

    // check if it is colder than the check_temperature, if not -> update
    if (tmp < length) {
      var norm = vecNorm(tmp_disp);
      this.nodeArray[nodeID].setDisp(vecScalMulti(norm, tmp));
    }

    this.nodeArray[nodeID].forceMovement(this.rgbCorr);
  }

  speedForce_LegendOrder(iterations,degree) {

    var orginColors = [];
    for(var v=0; v < this.nodeArray.length; v++)
    {
       orginColors.push(this.nodeArray[v].getNodeColor());
    }

    if (degree == 1)
      degree = 1 - 1e-5;


    var start_temperature = 1 * 10;
    var check_temperature = 1 * 10; // maximal distance, will be updated with each interval; convert to null at each step;

    // Alternative use as optimal distance the average speed?

    for (var i = 0; i < iterations; i++) {

      var minFirstSpeed = Infinity;
      var min_1_SpeedIDs = [];
      var min_2_SpeedIDs = [];
      var minSecondSpeed = Infinity;

      /////////////////////////////////////////////////
      //// PART 1: Set Disp to zero and add orgin force
      for (var v = 0; v < this.nodeArray.length; ++v) {
      for (var u = v+1; u < this.nodeArray.length; ++u) {

        var edgeSpeed = this.getNodeSpeed(v, u);

        if(u==v)
          continue;
      //for (var e = 0; e < this.edgeArray.length; e++) {
        //var edgeSpeed = this.getNodeSpeed(this.edgeArray[e].getNodeID1(), this.edgeArray[e].getNodeID2());

        if(edgeSpeed == minFirstSpeed){ //
          min_1_SpeedIDs.push(v);
          min_2_SpeedIDs.push(u);
        }
        else if (edgeSpeed < minFirstSpeed) {
          minSecondSpeed=minFirstSpeed;
          minFirstSpeed = edgeSpeed;
          min_1_SpeedIDs=[];
          min_2_SpeedIDs=[];
          min_1_SpeedIDs.push(v);
          min_2_SpeedIDs.push(u);
        }
        else if(edgeSpeed < minSecondSpeed){
          minSecondSpeed = edgeSpeed;
        }
      }
    }

      if(minSecondSpeed == Infinity){ // all edges have the same speed
        break;
      }

      var optimumSpeed = minSecondSpeed; //this.getAvgSpeed();
      var impulseFactor = optimumSpeed * 1e-12;

      /*console.log("minFirstSpeed",minFirstSpeed);
      console.log(min_1_SpeedIDs);
      console.log(min_2_SpeedIDs);
      console.log("minSecondSpeed",minSecondSpeed);//*/

      /////////////////////////////////////////////////
      //// PART 2:
      for (var o = 0; o < min_1_SpeedIDs.length; o++) {

        var color_v_Node = this.nodeArray[min_1_SpeedIDs[o]].getNodeColor();
        var color_u_Node = this.nodeArray[min_2_SpeedIDs[o]].getNodeColor();

        /////////////////////////////////////////////////
        //// PART 2.1: Force To Origin
        var vec_d = [orginColors[min_1_SpeedIDs[o]].get1Value() - color_v_Node.get1Value(), orginColors[min_1_SpeedIDs[o]].get2Value() - color_v_Node.get2Value(), orginColors[min_1_SpeedIDs[o]].get3Value() - color_v_Node.get3Value()];
        this.nodeArray[min_1_SpeedIDs[o]].addDisp(vecScalMulti(vec_d, (1.0 - degree)));

        vec_d = [orginColors[min_2_SpeedIDs[o]].get1Value() - color_u_Node.get1Value(), orginColors[min_2_SpeedIDs[o]].get2Value() - color_u_Node.get2Value(), orginColors[min_2_SpeedIDs[o]].get3Value() - color_u_Node.get3Value()];
        this.nodeArray[min_2_SpeedIDs[o]].addDisp(vecScalMulti(vec_d, (1.0 - degree)));

        /////////////////////////////////////////////////
        //// PART 2.2: Force To Opti Speed
        var refDis = Math.abs(this.nodeArray[min_2_SpeedIDs[o]].getNodeRefPos() - this.nodeArray[min_1_SpeedIDs[o]].getNodeRefPos());
        var vec_d = [color_v_Node.get1Value() - color_u_Node.get1Value(), color_v_Node.get2Value() - color_u_Node.get2Value(), color_v_Node.get3Value() - color_u_Node.get3Value()];
        var vec_dL = vecLength(vec_d);

        while (vec_dL == 0) {
          var impulseDistance = refDis * impulseFactor;
          if (impulseDistance == 0)
            impulseDistance = 1e-12;
          vec_d[0] = getRandomArbitrary(-impulseDistance, impulseDistance);
          vec_d[1] = getRandomArbitrary(-impulseDistance, impulseDistance);
          vec_d[2] = getRandomArbitrary(-impulseDistance, impulseDistance);
          vec_dL = vecLength(vec_d);
        }

        var vec_dN = vecNorm(vec_d);

        var speedDif = this.getNodeSpeed(min_1_SpeedIDs[o], min_2_SpeedIDs[o]) - optimumSpeed;
        var cDif_Change = ((speedDif * refDis) / 2) * degree;
        var force = vecScalMulti(vec_dN, cDif_Change);

        /*this.nodeArray[this.edgeArray[e].getNodeID1()].addDisp(force);
        this.nodeArray[this.edgeArray[e].getNodeID2()].subDisp(force);*/

        this.nodeArray[min_1_SpeedIDs[o]].subDisp(force);
        this.nodeArray[min_2_SpeedIDs[o]].addDisp(force);

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

    } // FOR (interations)

  }

  speedForce_GlobalSpeed(iterations, degree, optiSpeedDegree) {

    if (isNaN(iterations))
      return;

    if (degree == 1)
      degree = 1 - 1e-5;

    /////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    ////  SPEED Forced Graph
    /////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

    var orginColors = [];
    for (var v = 0; v < this.nodeArray.length; v++) {
      orginColors.push(this.nodeArray[v].getNodeColor());
    }

    ///////////////////////////////////////////////////////////////

    var distance = Math.abs(this.nodeArray[this.nodeArray.length - 1].getNodeRefPos() - this.nodeArray[0].getNodeRefPos());
    var optimumSpeed = undefined;
    var blackWhiteSpeed = undefined;
    var averageSpeed = this.getAvgSpeed();
    switch (this.graphColorSpace) {
      case "rgb":
        var rgbBlack = new class_Color_RGB(0, 0, 0);
        var rgbWhite = new class_Color_RGB(1, 1, 1);
        blackWhiteSpeed = calc3DEuclideanDistance(rgbBlack,rgbWhite)/ distance; //
        break;
      case "hsv":
        blackWhiteSpeed = 100.0 / distance;
        break;
      case "lab":
      case "de94":
      case "de94-ds":
      case "de2000":
      case "de2000-ds":
        blackWhiteSpeed = 100.0 / distance;
        break;
      case "din99":
        blackWhiteSpeed = 100.0 / distance;
        break;
      case "lch":
        blackWhiteSpeed = 100.0 / distance;
        break;
      default:
    }



    /*optimumSpeed = blackWhiteSpeed*optiSpeedDegree;
    console.log(optimumSpeed,"=",blackWhiteSpeed,"*",optiSpeedDegree);*/

    if(averageSpeed<blackWhiteSpeed){
      optimumSpeed=averageSpeed;
    }
    else {
      optimumSpeed=blackWhiteSpeed;
    }

    console.log(averageSpeed,blackWhiteSpeed,optimumSpeed);

    var impulseFactor = 1e-12;
    var start_temperature = 1 * 10;
    var check_temperature = 1 * 10; // maximal distance, will be updated with each interval; convert to null at each step;
    //var repusleForces = [];
    // Alternative use as optimal distance the average speed?

    for (var i = 0; i < iterations; i++) {

      /////////////////////////////////////////////////
      //// PART 0: Set Disp to zero
      for (var v = 0; v < this.nodeArray.length; ++v) {
        //repusleForces.push([0, 0, 0]);
        this.nodeArray[v].resetDisp();
      }


      for (var v = 0; v < this.nodeArray.length; ++v) {

        /////////////////////////////////////////////////
        //// PART 1: add orgin force
        var color_v_Node = this.nodeArray[v].getNodeColor();
        var vec_d = [orginColors[v].get1Value() - color_v_Node.get1Value(), orginColors[v].get2Value() - color_v_Node.get2Value(), orginColors[v].get3Value() - color_v_Node.get3Value()];
        this.nodeArray[v].addDisp(vecScalMulti(vec_d, (1.0 - degree))); //this.nodeArray[v].addDisp(vec_d); // direction vector = force

        /////////////////////////////////////////////////
        //// PART 2:
        for (var u = v+1; u < this.nodeArray.length; ++u) {

          var damping = 1.0;

          if(this.doDamping)
            damping = 1-(u-v-1)/(this.nodeArray.length-2);

          /*if(i==0)
            console.log(u,v,damping);//*/

          var color_v_Node = this.nodeArray[v].getNodeColor();
          var color_u_Node = this.nodeArray[u].getNodeColor();
          var refDis = Math.abs(this.nodeArray[u].getNodeRefPos() - this.nodeArray[v].getNodeRefPos());

          var vec_d = [color_v_Node.get1Value() - color_u_Node.get1Value(), color_v_Node.get2Value() - color_u_Node.get2Value(), color_v_Node.get3Value() - color_u_Node.get3Value()];
          var vec_dL = vecLength(vec_d);


          if(vec_dL == 0) { // two eqal colors
            var originalDirection = [orginColors[u].get1Value()-orginColors[v].get1Value(),orginColors[u].get2Value()-orginColors[v].get2Value(),orginColors[u].get3Value()-orginColors[v].get3Value()]; // try original direction
            vec_dL = vecLength(originalDirection);

            if(vec_dL == 0)
              continue;

            // move one color with the direction of the origin colors just a little bit.
            var od_norm = vecNorm(originalDirection);
            vec_d[0]=od_norm[0]*impulseFactor;
            vec_d[1]=od_norm[1]*impulseFactor;
            vec_d[2]=od_norm[2]*impulseFactor;
            this.nodeArray[u].vecMove(vec_d);
          }

          var vec_dN = vecNorm(vec_d);

          /////////////////////////////////////////////////
          /////////   calc Speed
          var colorDis = this.getNodeColorDifference(v, u);
          var edgeSpeed = this.getNodeSpeed(v, u);

          var speedDif = edgeSpeed - optimumSpeed;
          //console.log(speedDif,"=",edgeSpeed,"-", optimumSpeed);
          var cDif_Change = ((speedDif * refDis) / 2) * degree;// * damping; // /2 because we want to move both nodes in opposite direction

          var force = vecScalMulti(vec_dN, cDif_Change);

          this.nodeArray[v].subDisp(force);
          this.nodeArray[u].addDisp(force);

          color_u_Node.deleteReferences();
          color_u_Node = null;
          color_v_Node.deleteReferences();
          color_v_Node = null;
        }
      }



      /////////////////////////////////////////////////
      //  PART 3: Calc Repulse Force from the
      /*if(this.useRepulse){
        for (var v = 0; v < this.nodeArray.length; v++) {
          var repulse = this.nodeArray[v].calcRepulseForce();
          if(repulse==undefined)
            continue;

          switch (v) {
            case 0:
                repusleForces[1][0] += repulse[0];
                repusleForces[1][1] += repulse[1];
                repusleForces[1][2] += repulse[2];
              break;
              case this.nodeArray.length-1:
                repusleForces[this.nodeArray.length-2][0] += repulse[0];
                repusleForces[this.nodeArray.length-2][1] += repulse[1];
                repusleForces[this.nodeArray.length-2][2] += repulse[2];
              break;
            default:
              repusleForces[v-1][0] += repulse[0]*0.5;
              repusleForces[v-1][1] += repulse[1]*0.5;
              repusleForces[v-1][2] += repulse[2]*0.5;
              repusleForces[v+1][0] += repulse[0]*0.5;
              repusleForces[v+1][1] += repulse[1]*0.5;
              repusleForces[v+1][2] += repulse[2]*0.5;
          }
        }
      }//*/

      /////////////////////////////////////////////////
      //// PART 4: limit max displacement to temperaturetand prevent from displacementoutside frame

      for (var v = 0; v < this.nodeArray.length; v++){
        /*if(this.useRepulse)
          this.nodeArray[v].addDisp(repusleForces[v]); /// Add repulse force*/
        this.forceMovement_TMP(v, check_temperature);
      }

      /////////////////////////////////////////////////
      //// PART 5: reduce the temperature as the layout approaches a better configuration and update the new edgeWeights
      check_temperature = start_temperature * (1 - i / (iterations - 1)); //temperature_steps;

    } // FOR (interations)

  }

  getNodeSpeed(id1, id2) {
    var cDif = this.getNodeColorDifference(id1, id2);
    return cDif / Math.abs(this.nodeArray[id2].getNodeRefPos() - this.nodeArray[id1].getNodeRefPos());
  }

  getNodeColorDifference(id1, id2) {
    switch (this.distanceType) {
      case "eu":
        return calc3DEuclideanDistance(this.getNodeColor(id1), this.getNodeColor(id2));
        break;
      case "de2000":
        return calcDeltaCIEDE2000(this.getNodeColor(id1), this.getNodeColor(id2));
        break;
      case "de94":
        return calcDeltaDE94(this.getNodeColor(id1), this.getNodeColor(id2));
        break;
      default:
        return undefined;
    }
  }

  speedForce_DisPower_v2(iterations, power, degree) {

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

      /*draw_MetricInt_Graph();
      render_MetricInt_Graph();
      alert(123);*/

    } // FOR (interations)

  }

  speedForce_DisPower(iterations, power) { //space,useSpeed){
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
    } //*/

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
        } //*/

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
      }*/


      /////////////////////////////////////////////////
      //// PART 5: reduce the temperature as the layout approaches a better configuration
      check_temperature = start_temperature * (1 - i / (iterations - 1)); //temperature_steps;

      /*draw_MetricInt_Graph();
      render_MetricInt_Graph();
      alert(123);//*/


    } // END For Loop (interations)
  }

  hasIntersectionPoint(e1_id1, e1_id2, e2_id1, e2_id2) {
    var edge1_color1 = this.nodeArray[e1_id1].getNodeColor();
    var edge1_color2 = this.nodeArray[e1_id2].getNodeColor();
    var edge2_color1 = this.nodeArray[e2_id1].getNodeColor();
    var edge2_color2 = this.nodeArray[e2_id2].getNodeColor();

    ////////////////////////////
    /// two lines : positionVec+x*directionVec
    //  positionVec_1 = edge1_color1
    //  positionVec_1 = edge2_color1

    var directionVec_1 = [edge1_color2.get1Value() - edge1_color1.get1Value(), edge1_color2.get2Value() - edge1_color1.get2Value(), edge1_color2.get2Value() - edge1_color1.get2Value()];
    var directionVec_2 = [edge2_color2.get1Value() - edge2_color1.get1Value(), edge2_color2.get2Value() - edge2_color1.get2Value(), edge2_color2.get2Value() - edge2_color1.get2Value()];

    // check if lines are collinear
    var f1 = directionVec_1[0] / directionVec_2[0];
    var f2 = directionVec_1[1] / directionVec_2[1];
    var f3 = directionVec_1[2] / directionVec_2[2];


    if (f1 == f2 && f1 == f3 && f3 == f2)
      return false;

    // o1x*d1y + r*d1x*d1y = o2x*d1y + s*d2x*d1y
    // o1y*d1x + r*d1y*d1x = o2y*d1x + s*d2y*d1x
    // o1z*d1x + r*d1z*d1x = o2z*d1x + s*d2z*d1x


    //s = (o2x*d1y - o2y*d1x + o1x*d1y - o1x*d1y) / (d2y*d1x-d2x*d1y)

  }


  ////////////////////////////////////////////////////
  changeColorEdgeOptions(graphColorSpace, useSpeed, distanceType) {
    this.graphColorSpace = graphColorSpace;
    this.useSpeed = useSpeed;
    this.distanceType = distanceType;

    ///////////////////////////
    // set node color to right type
    for (var i = 0; i < this.nodeArray.length; i++) {
      this.nodeArray[i].changeColorType(this.graphColorSpace);
    }
    this.updateEdgeColorWeights();
  }
  ///////////////////////////////////////////////////

  setNodeSize(size) {
    if (this.nodeArray.length > 0) {
      for (var i = this.nodeArray.length - 1; i >= 0; i--) {
        this.nodeArray[i].deleteReferences();
        this.nodeArray[i] = null;
      }
    }
    this.nodeArray = new Array(size);
  }

  setEdgeSize(size) {
    if (this.edgeArray.length > 0) {
      for (var i = this.edgeArray.length - 1; i >= 0; i--) {
        this.edgeArray[i].deleteReferences();
        this.edgeArray[i] = null;
      }
    }
    this.edgeArray = new Array(size);
  }

  setNode(index, color, refPos) {
    var tmpColor = undefined;

    switch (this.graphColorSpace) {
      case "rgb":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_Node(color.calcRGBColor(), refPos);
        break;
      case "hsv":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_Node(color.calcHSVColor(), refPos);
        break;
      case "lab":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_Node(color.calcLABColor(), refPos);
        break;
      case "din99":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_Node(color.calcDIN99Color(), refPos);
        break;
      case "lch":
        this.nodeArray[index].deleteReferences();
        this.nodeArray[index] = new class_Node(color.calcLCHColor(), refPos);
        break;
    }
    color.deleteReferences();
  }

  setEdge(index, nodeID1, nodeID2, weight) {

    if (nodeID1 == nodeID2)
      return;

    this.edgeArray[index] = new class_Edge(nodeID1, nodeID2, weight);
  }

  pushNode(color, refPos) {
    switch (this.graphColorSpace) {
      case "rgb":
        this.nodeArray.push(new class_Node(color.calcRGBColor(), refPos));
        break;
      case "hsv":
        this.nodeArray.push(new class_Node(color.calcHSVColor(), refPos));
        break;
      case "lab":
        this.nodeArray.push(new class_Node(color.calcLABColor(), refPos));
        break;
      case "din99":
        this.nodeArray.push(new class_Node(color.calcDIN99Color(), refPos));
        break;
      case "lch":
        this.nodeArray.push(new class_Node(color.calcLCHColor(), refPos));
        break;
    }
    color.deleteReferences();
  }

  pushEdge(nodeID1, nodeID2) {

    if (nodeID1 == nodeID2)
      return;

    this.edgeArray.push(new class_Edge(nodeID1, nodeID2));
  }

  pushEdge_ColorWeight(nodeID1, nodeID2) {
    this.edgeArray.push(new class_Edge(nodeID1, nodeID2));
    if (this.useSpeed) {
      this.edgeArray[this.edgeArray.length - 1].setForceWeight(this.getNodeSpeed(nodeID1, nodeID2));
    } else {
      this.edgeArray[this.edgeArray.length - 1].setForceWeight(this.getNodeColorDifference(nodeID1, nodeID2));
    }
  }

  updateEdgeColorWeights() {
    for (var i = this.edgeArray.length - 1; i >= 0; i--) {
      if (this.useSpeed) {
        this.edgeArray[i].setForceWeight(this.getNodeSpeed(this.edgeArray[i].getNodeID1(), this.edgeArray[i].getNodeID2()));
      } else {
        this.edgeArray[i].setForceWeight(this.getNodeColorDifference(this.edgeArray[i].getNodeID1(), this.edgeArray[i].getNodeID2()));
      }
    }
  }

  getGraphColorSpace() {
    return this.graphColorSpace;
  }

  getEdgeLength() {
    return this.edgeArray.length;
  }

  getEdgeNodeID_1(index) {
    return this.edgeArray[index].getNodeID1();
  }

  getEdgeNodeID_2(index) {
    return this.edgeArray[index].getNodeID2();
  }

  getEdgeWeight(index) {
    return this.edgeArray[index].getweight();
  }

  getgraphname() {
    return this.graphname;
  }

  getNodeRefPos(indes) {
    return this.nodeArray[index].getNodeRefPos();
  }

  setNodeRefPos(indes, ref) {
    this.nodeArray[index].setNodeRefPos(ref);
  }

  getNodeLength() {
    return this.nodeArray.length;
  }

  getNodeColor(index) {
    return this.nodeArray[index].getNodeColor();
  }


  checkNodeActivity(index) {
    if (this.nodeArray[index].getIsInactive() == false) {
      return true;
    } else {
      return false;
    }
  }

  changeNodeActivity(index) {
    if (this.nodeArray[index].getIsInactive() == false) {
      this.nodeArray[index].setIsInactive(true);
    } else {
      this.nodeArray[index].setIsInactive(false);
    }
  }

  checkIfEndNodeSet() {
    return this.endNodeSet;
  }

  getEndNodeIndex() {
    return this.endIndex;
  }

  setEndNodeIndex(eIndex) {
    this.endNodeSet = true;
    this.endIndex = eIndex;
    this.nodeArray[this.endIndex].setIsEnd(true);
  }

  unsetEndNodeIndex() {
    this.endNodeSet = false;
    this.nodeArray[this.endIndex].setIsEnd(false);
  }

  checkIfStartNodeSet() {
    return this.startNodeSet;
  }

  getStartNodeIndex() {
    return this.startIndex;
  }

  setStartNodeIndex(sIndex) {
    this.startNodeSet = true;
    this.startIndex = sIndex;
    this.nodeArray[this.startIndex].setIsStart(true);
  }

  unsetStartNodeIndex() {
    this.startNodeSet = false;
    this.nodeArray[this.startIndex].setIsStart(false);
  }

  checkNodeState(index) {

    if (this.nodeArray[index].getIsStart() == true) {
      return 0;
    }

    if (this.nodeArray[index].getIsEnd() == true) {
      return 1;
    }

    if (this.nodeArray[index].getIsIntermediate() == true) {
      return 2;
    }

    if (this.nodeArray[index].getIsInactive() == true) {
      return 3;
    }
    return 4;
  }

  nodeIntermediateIndex(nIndex) {
    return this.nodeArray[nIndex].getIntermediateIndex();
  }

  pushIntermediateColor(nodeIndex) {
    this.intermediateNodes.push(nodeIndex);
    this.nodeArray[nodeIndex].setIntermediateIndex(this.intermediateNodes.length);
    this.nodeArray[nodeIndex].setIsIntermediate(true);
  }

  removeIntermediateColor(nodeIndex) {
    var index = -1;
    for (var i = this.intermediateNodes.length - 1; i >= 0; i--) {

      if (this.intermediateNodes[i] == nodeIndex) {
        index = i;
        break;
      }

    }


    if (index > -1) {
      this.intermediateNodes.splice(index, 1);
      this.nodeArray[nodeIndex].setIntermediateIndex(0);
      this.nodeArray[nodeIndex].setIsIntermediate(false);
    }
  }

  deleteIntermediateNodesWithL(lValue1, lValue2) {
    var deletedElements = false;

    for (var i = this.intermediateNodes.length - 1; i >= 0; i--) {
      if (this.nodeArray[this.intermediateNodes[i]].getXCoord() > lValue1 || this.nodeArray[this.intermediateNodes[i]].getXCoord() < lValue2) {
        this.nodeArray[this.intermediateNodes[i]].setIntermediateIndex(0);
        this.nodeArray[this.intermediateNodes[i]].setIsIntermediate(false);
        this.intermediateNodes.splice(i, 1);
        deletedElements = true;
      }
    }

    return deletedElements;
  }

  numberOfIntermediateColor() {
    return this.intermediateNodes.length;
  }

  getNodeindexIntermediateColor(index) {
    return this.intermediateNodes[index];
  }

};
