class class_Graph {

  constructor(colorSpace) {
    this.graphColorSpace=colorSpace;
    this.nodeArray = [];
    this.edgeArray = [];
    this.startIndex = 0;
    this.startNodeSet = false;
    this.endIndex = 0;
    this.endNodeSet = false;
    this.intermediateNodes = [];
  }

  deleteReferences(){

    for (var i = this.nodeArray.length-1; i >=0 ; i--) {
      if(this.nodeArray[i]!=undefined){
        this.nodeArray[i].deleteReferences();
        this.nodeArray[i]=null;
      }
    }
    delete this.nodeArray;

    for (var i = this.edgeArray.length-1; i >=0 ; --i) {
      if(this.edgeArray[i]!=undefined){
        this.edgeArray[i].deleteReferences();
        this.edgeArray[i]=null;
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


  /////////////////////////////////////////////////////
  //// Force Layout Graph
  ////////////////////////////////////////////////////

  force(iterations,val_k){ //space,useSpeed){

    ////////////////////////////////////////////////////////////////////
    /// Force-Directed after the algorithm by Fruchterman and Reingold
    //////////////////////////////////

    var area = undefined; // W∗L;{WandLare the width and length of the frame}, RGB 1=255
    //var val_k = undefined;
    switch (this.graphColorSpace) {
      case "rgb":
          area = 1.0; // 1*1*1
          val_k = Math.sqrt(area/this.nodeArray.length); //area/this.nodeArray.length;//
        break;
        case "lab":
          area =Math.pow((128*2),2)*100;
          val_k = Math.sqrt(area/this.nodeArray.length);
          break;
          case "din99":
            area =Math.pow((128*2),2)*100;
            val_k = Math.sqrt(area/this.nodeArray.length);
            break;
            case "hsv":
              area = 100*360*100;
              val_k = Math.sqrt(area/this.nodeArray.length);
              break;
              case "lch":
                area = 100*360*100;
                val_k = Math.sqrt(area/this.nodeArray.length);
                break;
      default:
        return;
    }//*/
    console.log("opti val_k:",Math.sqrt(1/this.nodeArray.length),", you val_k:",val_k);


    var val_ks = Math.pow(val_k,2);
    var impulseFactor = val_ks*1e-12;
    var start_temperature = 1*10;
    var check_temperature = 1*10; // maximal distance, will be updated with each interval; convert to null at each step;
    var temperature_steps = check_temperature/(iterations+1);

    // Alternative use as optimal distance the average speed?



    for (var i = 0; i <iterations; i++) {

    /////////////////////////////////////////////////
    //// PART 1: Calc Respulsive Forces (Forces between nodes)
    for(var v=0; v < this.nodeArray.length; v++)
    {
       this.nodeArray[v].resetDisp(); // set disp to zero
       var color_v_Node = this.nodeArray[v].getNodeColor();

       for(var u=0; u < this.nodeArray.length; u++)
       {
          if(v==u)
          continue;

          var color_u_Node = this.nodeArray[u].getNodeColor();
          var vec_d = [color_v_Node.get1Value()-color_u_Node.get1Value(),color_v_Node.get2Value()-color_u_Node.get2Value(),color_v_Node.get3Value()-color_u_Node.get3Value()]; // difference vector between the positions of the two vertices
          var vec_dN = vecNorm(vec_d);
          var vec_dL = vecLength(vec_d);

          var rep_Force = [0,0,0];


          while(vec_dL==0){
            vec_d[0] = getRandomArbitrary(-impulseFactor, impulseFactor);
            vec_d[1] = getRandomArbitrary(-impulseFactor, impulseFactor);
            vec_d[2] = getRandomArbitrary(-impulseFactor, impulseFactor);
            vec_dN = vecNorm(vec_d);
            vec_dL = vecLength(vec_d);
          }

          var  rep_Force = vecScalMulti(vec_dN,(val_ks/vec_dL)); // function repulse force f(x) = Math.pow(val_k,2)/x





          /*if(isNaN(rep_Force[0]) || isNaN(rep_Force[1]) || isNaN(rep_Force[2])){
            console.log('rep_Force',v,u,rep_Force);
            console.log("c1",color_v_Node.get1Value(),color_v_Node.get2Value(),color_v_Node.get3Value());
            console.log("c2",color_u_Node.get1Value(),color_u_Node.get2Value(),color_u_Node.get3Value());
            console.log("vec_d berechnung",color_v_Node.get1Value()-color_u_Node.get1Value(),color_v_Node.get2Value()-color_u_Node.get2Value(),color_v_Node.get3Value()-color_u_Node.get3Value());
            console.log("vec_d",vec_d);
            console.log("vec_dN",vec_dN);
            console.log("vec_dL",vec_dL);
            console.log("(val_ks/vec_dL)",(val_ks/vec_dL));
            return;
          }*/

          this.nodeArray[v].addDisp(rep_Force);

          color_u_Node.deleteReferences();
          color_u_Node=null;
       }

       color_v_Node.deleteReferences();
       color_v_Node=null;
    }

    /////////////////////////////////////////////////
    //// PART 2: Calc Attractive  Forces (Forces between two the nodes of each edge)
     for(var e=0; e < this.edgeArray.length; e++)
     {
      var color_v_Node = this.nodeArray[this.edgeArray[e].getNodeID1()].getNodeColor();
      var color_u_Node = this.nodeArray[this.edgeArray[e].getNodeID2()].getNodeColor();

      var vec_d = [color_v_Node.get1Value()-color_u_Node.get1Value(),color_v_Node.get2Value()-color_u_Node.get2Value(),color_v_Node.get3Value()-color_u_Node.get3Value()];

      var vec_dN = vecNorm(vec_d);
      var vec_dLs = Math.pow(vecLength(vec_d),2);
      var at_Force = vecScalMulti(vec_dN,(vec_dLs/val_k)); // function attractive f(x) = Math.pow(x,2)/val_k

      /*if(isNaN(at_Force[0]) || isNaN(at_Force[1]) || isNaN(at_Force[2])){
        console.log('at_Force',this.edgeArray[e].getNodeID1(),this.edgeArray[e].getNodeID2(),at_Force);
        console.log("c1",color_v_Node.get1Value(),color_v_Node.get2Value(),color_v_Node.get3Value());
        console.log("c2",color_u_Node.get1Value(),color_u_Node.get2Value(),color_u_Node.get3Value());
        console.log("vec_d berechnung",color_v_Node.get1Value()-color_u_Node.get1Value(),color_v_Node.get2Value()-color_u_Node.get2Value(),color_v_Node.get3Value()-color_u_Node.get3Value());
        console.log("vec_d",vec_d);
        console.log("vec_dN",vec_dN);
        console.log("vec_dLs",vec_dLs);
        console.log("(vec_dLs/val_k)",(vec_dLs/val_k));
        return;
      }*/

      this.nodeArray[this.edgeArray[e].getNodeID1()].subDisp(at_Force);
      this.nodeArray[this.edgeArray[e].getNodeID2()].addDisp(at_Force);

      color_u_Node.deleteReferences();
      color_u_Node=null;
      color_v_Node.deleteReferences();
      color_v_Node=null;
    }

    /////////////////////////////////////////////////
    //// PART 3: limit max displacement to temperaturetand prevent from displacementoutside frame
    for(var v=0; v < this.nodeArray.length; v++) // set new positions
    {
      //v.pos:=v.pos+ (v.disp/|v.disp|)∗min(v.disp, t);

      var tmp_disp= this.nodeArray[v].getDisp();

      var length = vecLength(tmp_disp);

      // check if it is colder than the check_temperature, if not -> update
      if(check_temperature<length){
        var norm = vecNorm(tmp_disp);
        this.nodeArray[v].setDisp(vecScalMulti(norm,check_temperature));
      }
      this.nodeArray[v].forceMovement();

    }
    /////////////////////////////////////////////////
    //// PART 4: reduce the temperature as the layout approaches a better configuration
    check_temperature = start_temperature*(1 - i/(iterations -1)); //temperature_steps;

    /*draw_MetricInt_Graph();
    render_MetricInt_Graph();
    alert(123);//*/


  } // END For Loop (interations)


  /*for(var v=0; v < this.nodeArray.length; v++) // set new positions
  {
    var color_v_Node = this.nodeArray[v].getNodeColor();
    console.log(v,color_v_Node.get1Value(),color_v_Node.get2Value(),color_v_Node.get3Value());
  }*/



}

  ////////////////////////////////////////////////////

  setNodeSize(size){
    if(this.nodeArray.length>0){
      for (var i = this.nodeArray.length-1; i >=0 ; i--) {
        this.nodeArray[i].deleteReferences();
        this.nodeArray[i]=null;
      }
    }
    this.nodeArray = new Array(size);
  }

  setEdgeSize(size){
    if(this.edgeArray.length>0){
      for (var i = this.edgeArray.length-1; i >=0 ; i--) {
        this.edgeArray[i].deleteReferences();
        this.edgeArray[i]=null;
      }
    }
    this.edgeArray = new Array(size);
  }

  setNode(index,color){
      var tmpColor = undefined;

      switch (this.graphColorSpace) {
        case "rgb":
          this.nodeArray[index].deleteReferences();
          this.nodeArray[index] = new class_Node(color.calcRGBColor());
        break;
        case "hsv":
          this.nodeArray[index].deleteReferences();
          this.nodeArray[index] = new class_Node(color.calcHSVColor());
        break;
        case "lab":
          this.nodeArray[index].deleteReferences();
          this.nodeArray[index] = new class_Node(color.calcLABColor());
        break;
        case "din99":
          this.nodeArray[index].deleteReferences();
          this.nodeArray[index] = new class_Node(color.calcDIN99Color());
        break;
        case "lch":
          this.nodeArray[index].deleteReferences();
          this.nodeArray[index] = new class_Node(color.calcLCHColor());
        break;
      }
      color.deleteReferences();
  }

  setEdge(index, nodeID1, nodeID2, weight){

      if(nodeID1==nodeID2)
        return;

      this.edgeArray[index] = new class_Edge(nodeID1, nodeID2, weight);
  }

  pushNode(color){
      switch (this.graphColorSpace) {
        case "rgb":
          this.nodeArray.push(new class_Node(color.calcRGBColor()));
        break;
        case "hsv":
          this.nodeArray.push(new class_Node(color.calcHSVColor()));
        break;
        case "lab":
          this.nodeArray.push(new class_Node(color.calcLABColor()));
        break;
        case "din99":
          this.nodeArray.push(new class_Node(color.calcDIN99Color()));
        break;
        case "lch":
          this.nodeArray.push(new class_Node(color.calcLCHColor()));
        break;
      }
      color.deleteReferences();
  }

  pushEdge(nodeID1, nodeID2, weight){

    if(nodeID1==nodeID2)
      return;

      this.edgeArray.push(new class_Edge(nodeID1, nodeID2, weight));
  }

  pushEdge_DistanceWeight(nodeID1, nodeID2, type){
      switch (type) {
        case "eu":
          this.edgeArray.push(new class_Edge(nodeID1, nodeID2, calc3DEuclideanDistance(this.getNodeColor(nodeID1), this.getNodeColor(nodeID2))));
        break;
        case "de2000":
          this.edgeArray.push(new class_Edge(nodeID1, nodeID2, calcDeltaCIEDE2000(this.getNodeColor(nodeID1), this.getNodeColor(nodeID2))));
        break;
        case "de94":
          this.edgeArray.push(new class_Edge(nodeID1, nodeID2, calcDeltaDE94(this.getNodeColor(nodeID1), this.getNodeColor(nodeID2))));
        break;
      }
  }

  calcEdgeWeights(){
      for (var i = 0; i < array.length; i++) {
        array[i]
      }
  }


  getEdgeLength(){
    return this.edgeArray.length;
  }

  getEdgeNodeID_1 (index) {
    return this.edgeArray[index].getNodeID1();
  }

  getEdgeNodeID_2 (index) {
    return this.edgeArray[index].getNodeID2();
  }

  getEdgeWeight (index) {
    return this.edgeArray[index].getweight();
  }

  getgraphname() {
    return this.graphname;
  }

  getNodeLength() {
    return this.nodeArray.length;
  }

  getNodeColor(index) {
    return this.nodeArray[index].getNodeColor();
  }


  checkNodeActivity (index){
    if(this.nodeArray[index].getIsInactive()==false){
      return true;
    }
    else{
      return false;
    }
  }

  changeNodeActivity (index){
    if(this.nodeArray[index].getIsInactive()==false){
      this.nodeArray[index].setIsInactive(true);
    }
    else{
      this.nodeArray[index].setIsInactive(false);
    }
  }

  checkIfEndNodeSet(){
    return this.endNodeSet;
  }

  getEndNodeIndex(){
    return this.endIndex;
  }

  setEndNodeIndex(eIndex){
    this.endNodeSet=true;
    this.endIndex = eIndex;
    this.nodeArray[this.endIndex].setIsEnd(true);
  }

  unsetEndNodeIndex(){
    this.endNodeSet=false;
    this.nodeArray[this.endIndex].setIsEnd(false);
  }

  checkIfStartNodeSet(){
    return this.startNodeSet;
  }

  getStartNodeIndex (){
    return this.startIndex;
  }

  setStartNodeIndex(sIndex){
    this.startNodeSet=true;
    this.startIndex = sIndex;
    this.nodeArray[this.startIndex].setIsStart(true);
  }

  unsetStartNodeIndex(){
    this.startNodeSet=false;
    this.nodeArray[this.startIndex].setIsStart(false);
  }

  checkNodeState(index){

    if(this.nodeArray[index].getIsStart()==true){
      return 0;
    }

    if(this.nodeArray[index].getIsEnd()==true){
      return 1;
    }

    if(this.nodeArray[index].getIsIntermediate()==true){
      return 2;
    }

    if(this.nodeArray[index].getIsInactive()==true){
      return 3;
    }
      return 4;
  }

  nodeIntermediateIndex(nIndex) {
    return this.nodeArray[nIndex].getIntermediateIndex();
  }

  pushIntermediateColor(nodeIndex){
    this.intermediateNodes.push(nodeIndex);
    this.nodeArray[nodeIndex].setIntermediateIndex(this.intermediateNodes.length);
    this.nodeArray[nodeIndex].setIsIntermediate(true);
  }

  removeIntermediateColor(nodeIndex){
    var index = -1;
    for(var i = this.intermediateNodes.length-1; i>=0; i--){

          if (this.intermediateNodes[i]==nodeIndex){
            index = i;
            break;
          }

    }


    if(index>-1){
      this.intermediateNodes.splice(index,1);
      this.nodeArray[nodeIndex].setIntermediateIndex(0);
      this.nodeArray[nodeIndex].setIsIntermediate(false);
    }
  }

  deleteIntermediateNodesWithL(lValue1,lValue2){
    var deletedElements = false;

    for(var i = this.intermediateNodes.length-1; i>=0; i--){
      if(this.nodeArray[this.intermediateNodes[i]].getXCoord()  > lValue1 || this.nodeArray[this.intermediateNodes[i]].getXCoord() < lValue2){
        this.nodeArray[this.intermediateNodes[i]].setIntermediateIndex(0);
        this.nodeArray[this.intermediateNodes[i]].setIsIntermediate(false);
        this.intermediateNodes.splice(i,1);
        deletedElements = true;
      }
    }

    return deletedElements;
  }

  numberOfIntermediateColor(){
    return this.intermediateNodes.length;
  }

  getNodeindexIntermediateColor(index){
    return this.intermediateNodes[index];
  }

};
