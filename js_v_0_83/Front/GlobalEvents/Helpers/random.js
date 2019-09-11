
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}


// gausian or normal distribution (with Box-Muller transformation)
function randn_bm() {
    var u = 0;
    var v = 0;
    while(u === 0) u = Math.random(); // without 0
    while(v === 0) v = Math.random(); // without 0
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

/////
/// https://stackoverflow.com/questions/16110758/generate-random-number-with-a-non-uniform-distribution
function rand_beta(type) {

  var rand = Math.random();
  var betaRand = Math.pow(Math.sin(rand*Math.PI/2.0),2.0);
  switch (type) {
    case 0:
      return betaRand;
      break;
    case 1:
      // Beta Left
      var betaRandLeft = undefined
      if(betaRand < 0.5)
        betaRandLeft = 2*betaRand;
      else
        betaRandLeft = 2*(1-betaRand);
      return betaRandLeft;
    case 2:
    // Beta Right
    var betaRandRight = undefined
    if(betaRand > 0.5)
      betaRandRight = 2*betaRand-1;
    else
      betaRandRight = 2*(1-betaRand)-1;
    return betaRandRight;

  }
}
