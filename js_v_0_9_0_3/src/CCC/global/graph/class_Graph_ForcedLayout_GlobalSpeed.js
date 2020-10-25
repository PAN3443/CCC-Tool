class class_Graph_ForcedGlobalSpeed extends class_Graph_ForcedLayout {

  forceLayout(iterations, degree) {

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
      orginColors.push(this.getNodeColor(v));
    }

    ///////////////////////////////////////////////////////////////

    var distance = Math.abs(this.nodeArray[this.nodeArray.length - 1].getNodeRefPos() - this.nodeArray[0].getNodeRefPos());
    var optimumSpeed = undefined;
    var blackWhiteSpeed = undefined;
    var averageSpeed = this.getAvgSpeed();
    switch (this.graphColorSpace) {
      case "rgb":
        var rgbBlack = ["rgb",0, 0, 0];
        var rgbWhite = ["rgb",1, 1, 1];
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


    if(averageSpeed<blackWhiteSpeed){
      optimumSpeed=averageSpeed;
    }
    else {
      optimumSpeed=blackWhiteSpeed;
    }


    var impulseFactor = 1e-12;
    var start_temperature = this.getStartTemp();
    var check_temperature = start_temperature; // maximal distance, will be updated with each interval; convert to null at each step;
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
        var color_v_Node = this.getNodeColor(v);
        var vec_d = [orginColors[v][1] - color_v_Node[1], orginColors[v][2] - color_v_Node[2], orginColors[v][3] - color_v_Node[3]];
        this.nodeArray[v].addDisp(vecScalMulti(vec_d, (1.0 - degree))); //this.nodeArray[v].addDisp(vec_d); // direction vector = force

        /////////////////////////////////////////////////
        //// PART 2:
        for (var u = v+1; u < this.nodeArray.length; ++u) {

          var damping = 1.0;

          if(this.doDamping)
            damping = 1-(u-v-1)/(this.nodeArray.length-2);

          /*if(i==0)
            console.log(u,v,damping);//*/

          var color_v_Node = this.getNodeColor(v);
          var color_u_Node = this.getNodeColor(u);
          var refDis = Math.abs(this.nodeArray[u].getNodeRefPos() - this.nodeArray[v].getNodeRefPos());

          var vec_d = [color_v_Node[1] - color_u_Node[1], color_v_Node[2] - color_u_Node[2], color_v_Node[3] - color_u_Node[3]];
          var vec_dL = vecLength(vec_d);


          if(vec_dL == 0) { // two eqal colors
            var originalDirection = [orginColors[u][1]-orginColors[v][1],orginColors[u][2]-orginColors[v][2],orginColors[u][3]-orginColors[v][3]]; // try original direction
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

        }
      }


      /////////////////////////////////////////////////
      //// PART 3: limit max displacement to temperaturetand prevent from displacementoutside frame

      for (var v = 0; v < this.nodeArray.length; v++){
        /*if(this.useRepulse)
          this.nodeArray[v].addDisp(repusleForces[v]); /// Add repulse force*/
        this.forceMovement_TMP(v, check_temperature);
      }

      /////////////////////////////////////////////////
      //// PART 4: reduce the temperature as the layout approaches a better configuration and update the new edgeWeights
      check_temperature = start_temperature * (1 - i / (iterations - 1)); //temperature_steps;

    } // FOR (interations)

  }

}