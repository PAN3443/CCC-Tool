





function calcNoise(noiseType,noiseProportion,noiseDistribution){
  var workerJSON = {};
  workerJSON['message'] = "calcNoiseField";
  workerJSON['noiseType']=document.getElementById("id_Test_NoiseType").selectedIndex;
  workerJSON['noiseProportion']=parseFloat(document.getElementById("id_Test_NoiseProportion").value);
  workerJSON['noiseDistribution']=document.getElementById("id_Test_NoiseDistribution").selectedIndex;
  workerJSON['noiseScaling']=parseInt(document.getElementById("id_Test_NoiseScaling").value);
  workerJSON['noiseMaxChange']=parseFloat(document.getElementById("id_Test_NoiseMaxChange").value);
  workerJSON['noiseBehavior']=document.getElementById("id_Test_NoiseBehavior").selectedIndex;
  workerJSON['replaceFrom'] = parseFloat(document.getElementById("id_TestPage_Noise_ReplaceFromValue").value);
  workerJSON['replaceNoiseTill'] = parseFloat(document.getElementById("id_TestPage_Noise_ReplaceTillValue").value);
  testfunctionWorker_InteractiveTest.postMessage(workerJSON);
}
