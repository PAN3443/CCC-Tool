

var browserCanWorker = false;

var worker_drawPath; //new Worker('js/worker/worker_drawPath.js');

var workerModus = 0;

//// for mapping
var numWorkers = 1;//12;
var workerArray=[];
var workerFinished=[];
var allWorkerFinished=true;
var doneWorkerPreparation=false;
var workerJSON=[];

// path plot?
/*var workerElementContext;
var workerPathContext;
var workerVPathContext;

var workerBackgroundContext;
var workerBackgroundData;


var workerDrawPathIsBusy = false;

var workerDrawHueBackgroundIsBusy = false;
var workerDrawVBackgroundIsBusy = false;
var workerDrawElementsIsBusy = false;*/
