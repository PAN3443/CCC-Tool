class class_Edge {

  constructor(nodeID1, nodeID2) {
    this.nodeID1 = nodeID1;
    this.nodeID2 = nodeID2;
    this.forceWeight = undefined;
    this.weight_DE94 = undefined;
    this.weight_DE2000 = undefined;
  }

  deleteReferences(){
    delete this.nodeID1;
    delete this.nodeID2;
      delete this.weight_DE94;
    delete this.weight_DE2000;
  }

  setForceWeight(weight){
    this.forceWeight = weight;
  }

  getForceWeight(){
    return this.forceWeight;
  }

  getNodeID1() {
    return this.nodeID1;
  }

  getNodeID2() {
    return this.nodeID2;
  }

  setweight_DE2000(weight) {
    this.weight_DE2000 = weight;
  }

  setweight_DE94(weight) {
    this.weight_DE94 = weight;
  }

  getweight_DE2000() {
    return this.weight_DE2000;
  }

  getweight_DE94() {
    return this.weight_DE94;
  }

};
