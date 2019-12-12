

var worker_drawPath; //new Worker('js/worker/worker_drawPath.js');

var workerModus = 0;

//// for mapping
var numWorkers = 1;//12;
var mappingWorker;
var workerFinished=[];
var mappingFaceIndexArray = [];
var mappingVertexIndexArray = [];

var allWorkerFinished=true;
var doneWorkerPreparation=false;
var workerJSON;
