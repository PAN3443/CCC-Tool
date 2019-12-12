// Offscreen Canvas
var graph = undefined;
// CMS
var globalCMS1 = undefined;

/// color settings
var din99_kE = undefined;
var din99_kCH = undefined;
var cielab_ref_X = undefined;
var cielab_ref_Y = undefined;
var cielab_ref_Z = undefined;

/// metric settings
var de2000_k_L = undefined;
var de2000_k_C = undefined;
var de2000_k_H = undefined;
var de94_k_L = undefined;
var de94_k_C = undefined;
var de94_k_H = undefined;
var de94_k_1 = undefined;
var de94_k_2 = undefined;

var initIsDone = false;

var graph = undefined;

self.addEventListener('message', function(e) {

  switch (e.data.message) {


    case "init":
      self.importScripts('../../processingCases.js');
      worker_LoadColorClasses();

      self.importScripts('../../../GlobalEvents/Color_CMS_Helpers/calcColordifference.js');

      self.importScripts('../../../Classes/Graph/class_Edge.js');
      self.importScripts('../../../Classes/Graph/class_Node.js');
      self.importScripts('../../../Classes/Graph/class_Graph.js');

      globalCMS1 = new class_CMS();

      // draw algorithm for the background
      self.importScripts('../../../Sections/Edit/PathPlot/drawPathPlot/drawPathPlotHelpers2D.js');
      self.importScripts('../../../Sections/Edit/PathPlot/drawPathPlot/drawPathPlotHelpersBackground.js');

      initIsDone=true;
    break;


    case "switchMEtric":
      /*switch (e.data.graphType) {
        case "rgb":*/

    break;
    case "createGraph":

      if(graph!=undefined){
        graph.deleteReferences();
        graph = null;
      }

      graph= new class_Graph();

      switch (e.data.graphType) {
        case "rgb":

        var step = 1.0/(e.data.rgb_Sampling-1);

        graph.setNodeSize(Math.pow(e.data.rgb_Sampling,3));


        var numEdges = undefined;
        //if(extendendEdges)
           numEdges = (e.data.rgb_Sampling*(e.data.rgb_Sampling-1))*2*e.data.rgb_Sampling+(e.data.rgb_Sampling*e.data.rgb_Sampling)*(e.data.rgb_Sampling-1);
        //else
        //   numEdges = (e.data.rgb_Sampling*(e.data.rgb_Sampling-1))*2*e.data.rgb_Sampling+(e.data.rgb_Sampling*e.data.rgb_Sampling)*(e.data.rgb_Sampling-1);

        graph.setEdgeSize(numEdges);


        console.log(Math.pow(e.data.rgb_Sampling,3));
        console.log(numEdges);


        var currentEdgeIndex =0;

        var test1 = 0;

        var rgDIM = e.data.rgb_Sampling*e.data.rgb_Sampling;
        for (var r = 0; r <e.data.rgb_Sampling; r++) {
          var currentR = r*step;
          console.log(currentR);
          for (var g = 0; g <e.data.rgb_Sampling; g++) {
            var currentG = r*step;
            for (var b = 0; b <e.data.rgb_Sampling; b++) {
              var currentB = r*step;

              var currentNodeIndex =  b*rgDIM + g* e.data.rgb_Sampling +r;
              graph.setNode(currentNodeIndex, currentR, currentG, currentB)

              //Math.pow(e.data.rgb_Sampling,3)

              if(r!=0){
                var pre_R_NodeIndex =  currentNodeIndex--; // =  b*rgDIM + g* e.data.rgb_Sampling +r-1;
                //graph.setEdge(currentEdgeIndex,currentNodeIndex, pre_R_NodeIndex, undefined)
                currentEdgeIndex++;
              }

              if(g!=0){
                var pre_G_NodeIndex =  currentNodeIndex-e.data.rgb_Sampling; // =  b*rgDIM + (g-1)* e.data.rgb_Sampling +r;
                //graph.setEdge(currentEdgeIndex,currentNodeIndex, pre_R_NodeIndex, undefined)
                currentEdgeIndex++;
                test1++;
              }

              if(b!=0){
                var pre_B_NodeIndex =  currentNodeIndex-rgDIM; // =  (b-1)*rgDIM + g* e.data.rgb_Sampling +r;
                //graph.setEdge(currentEdgeIndex,currentNodeIndex, preB_NodeIndex, undefined)
                currentEdgeIndex++;
                // in extend case here more
              }
            }
          }
        }

        console.log(test1,(e.data.rgb_Sampling*(e.data.rgb_Sampling-1))*e.data.rgb_Sampling);
        console.log(numEdges,currentEdgeIndex);

        break;
        case "hsv":

        break;
      }
    break;

    case "interpolate":




    break;

    default:

      if (initIsDone)
        generalJSON_Processing(e.data);


  }

}, false);
