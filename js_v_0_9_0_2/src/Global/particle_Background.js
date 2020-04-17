// Little particle_Canvas things
var particle_Canvas = undefined;
var particle_ctx = undefined;
var random_velocity = undefined;
var fixed_velocity = undefined;
var particleMaxRadius = undefined;
var numberPar = 1200;
var particles = [];
var stdStaturationMin = 0.2;
var stdStaturationMax = 0.5;

var alphaMin = 0.05;
var alphaMax = 0.1;
var fixedAlphaMin = 0.4;
var fixedAlphaMax = 0.5;

function vecLength(v){
  var sum = 0;
  for (var i = 0; i < v.length; i++) {
    sum += Math.pow(v[i],2);
  }
  return Math.sqrt(sum);
}


class class_Particle{
  constructor() {
    this.position_X = undefined;
    this.position_Y = undefined;
    this.direction_X = undefined;
    this.direction_Y = undefined;
    this.fixPos_X = undefined;
    this.fixPos_Y = undefined;
    this.radius = 1;
    this.color_h = getRandomArbitrary(0.8, 1.0);
    this.color_s = 100;
    this.color_v = 100;
    this.color_a = 0.8;
    this.randomMove = true;
    this.setRandom_Pos();
    this.setRandom_Velocity();
    this.setRandomSaturation(stdStaturationMin,stdStaturationMax);
    this.resetColorAlpha(alphaMin,alphaMax);
   }

   setRandom_Velocity(){
     this.fixPos_X = undefined;
     this.fixPos_Y = undefined;
     this.randomMove = true;

     if(random_velocity==undefined)
       return;

     if(this.position_X<=0){
       this.direction_X = getRandomInt(1, random_velocity);
     }
     else if(this.position_X>=particle_Canvas.width){
       this.direction_X = getRandomInt(-1*random_velocity, -1);
     }
     else {
       this.direction_X = getRandomInt(-1*random_velocity, random_velocity);
       while (this.direction_X==0) {
         this.direction_X = getRandomInt(-1*random_velocity, random_velocity);
       }
     }

     if(this.position_Y<=0){
       this.direction_Y = getRandomInt(1, random_velocity);
     }
     else if(this.position_Y>=particle_Canvas.height){
       this.direction_Y = getRandomInt(-1*random_velocity, -1);
     }
     else {
       this.direction_Y = getRandomInt(-1*random_velocity, random_velocity);
       while (this.direction_Y==0) {
         this.direction_Y = getRandomInt(-1*random_velocity, random_velocity);
       }
     }
   }

   setFixed_Velocity(){

     var tmp_vec = [this.fixPos_X-this.position_X,this.fixPos_Y-this.position_Y];
     var vecL = vecLength(tmp_vec);
     if(vecL<2){
       // for vibration
       //this.color_v=0.3;
       //this.color_s=0.0;
       this.direction_X = 0;
       this.direction_Y = 0;
       this.resetColorAlpha(fixedAlphaMin,fixedAlphaMax);
     }
     else if(vecL<=fixed_velocity){
       this.direction_X = tmp_vec[0];
       this.direction_Y = tmp_vec[1];
     }
     else{
       var ratio = fixed_velocity/vecL;
       this.direction_X = Math.round(tmp_vec[0]*ratio);
       this.direction_Y = Math.round(tmp_vec[1]*ratio);
     }
   }

   setRandom_Pos(){
     if(particle_Canvas==undefined)
       return;

     this.position_X = getRandomInt(0, particle_Canvas.width);
     this.position_Y = getRandomInt(0, particle_Canvas.height);
   }

   setFixedPos(pathArray){

     this.randomMove = false;
     //this.setRandomSaturation(0.3,0.4);
     //this.resetColorAlpha(fixedAlphaMin,fixedAlphaMax);
     var numLines = pathArray.length-1;
     var lineIndex = getRandomInt(0, numLines);

     var line_x1 = pathArray[lineIndex][0]*particle_Canvas.width;
     var line_y1 = pathArray[lineIndex][1]*particle_Canvas.height;

     var line_x2 = pathArray[lineIndex+1][0]*particle_Canvas.width;
     var line_y2 = pathArray[lineIndex+1][1]*particle_Canvas.height;

     var ratio = Math.random();
     this.fixPos_X = line_x1+ratio*(line_x2-line_x1)+getRandomInt(-2, 2);
     this.fixPos_Y = line_y1+ratio*(line_y2-line_y1)+getRandomInt(-2, 2);

     this.setFixed_Velocity();
   }

   setRandomSaturation(min,max){
     this.color_s = getRandomArbitrary(min,max);
   }

   setRandomRadiusAndValue(){
      var ratio = rand_beta(1)*getRandomArbitrary(0.1, 1); //getRandomInt(2, particleMaxRadius);

      if(ratio<0.5)
        this.color_v = 1.0-ratio;
      else
        this.color_v = ratio;

      this.radius = ratio*particleMaxRadius;
   }

   resetColorAlpha(min,max){
     this.color_a = getRandomArbitrary(min,max);
   }

   draw(){
     if(particle_ctx==undefined)
      return;

      var r, g, b;

          var i = Math.floor(this.color_h * 6);
          var f = this.color_h * 6 - i;
          var p = this.color_v * (1 - this.color_s);
          var q = this.color_v * (1 - f * this.color_s);
          var t = this.color_v * (1 - (1 - f) * this.color_s);

          switch(i % 6){
              case 0: r = this.color_v, g = t, b = p; break;
              case 1: r = q, g = this.color_v, b = p; break;
              case 2: r = p, g = this.color_v, b = t; break;
              case 3: r = p, g = q, b = this.color_v; break;
              case 4: r = t, g = p, b = this.color_v; break;
              case 5: r = this.color_v, g = p, b = q; break;
          }

     particle_ctx.beginPath();
     particle_ctx.fillStyle = "rgba("+r*255+","+g*255+","+b*255+","+this.color_a+")";
     particle_ctx.arc(this.position_X, this.position_Y, this.radius, 0, 2*Math.PI, false);
     particle_ctx.fill();
     particle_ctx.closePath();

     this.move();
   }

   move(){

     var newPos_X = this.position_X+this.direction_X;
     var newPos_Y = this.position_Y+this.direction_Y;
     if(this.randomMove){
       if(newPos_X<0){
         newPos_X=0;
         this.setRandom_Velocity();
       }
       else if(newPos_X>particle_Canvas.width){
         newPos_X=particle_Canvas.width;
         this.setRandom_Velocity();
       }

       if(newPos_Y<0){
         newPos_Y=0;
         this.setRandom_Velocity();
       }
       else if(newPos_Y>particle_Canvas.height){
         newPos_Y=particle_Canvas.height;
         this.setRandom_Velocity();
       }
       this.position_X=newPos_X;
       this.position_Y=newPos_Y;
     }
     else{
       this.position_X=newPos_X;
       this.position_Y=newPos_Y;
       this.setFixed_Velocity();
     }



   }
};



function init_Particles(){

  for (var i = 0; i < numberPar; i++) {
    particles.push(new class_Particle());
    var ratio = i/numberPar;
    switch (true) {
      case (ratio<0.25):
          particles[i].color_h=getRandomArbitrary(0.15,0.2);
        break;
        case (ratio<0.5):
            var tmp = getRandomArbitrary(-0.1,0.1);
            if(tmp<0)
              particles[i].color_h=1.0-tmp;
            else
              particles[i].color_h=tmp;
          break;
          case (ratio<0.75):
              particles[i].color_h=getRandomArbitrary(0.7,0.85);
            break;
            case (ratio<1.0):
                particles[i].color_h=getRandomArbitrary(0.5,0.6);//getRandomArbitrary(min,max);
              break;
      default:

    }
  }
}

function setParticleCanvas(canvasID){
  stopParticleAnimation();
  particle_Canvas = document.getElementById(canvasID);
  var rect = document.getElementById(canvasID).getBoundingClientRect();
  particle_Canvas.width=rect.width;
  particle_Canvas.height=rect.height;
  particle_ctx = particle_Canvas.getContext('2d');

  random_velocity = Math.round((particle_Canvas.width+particle_Canvas.height)/2*0.001);
  if(random_velocity<2)
    random_velocity=2;

  fixed_velocity = Math.round((particle_Canvas.width+particle_Canvas.height)/2*0.003);
  if(fixed_velocity<3)
    fixed_velocity=3;

  particleMaxRadius = Math.round((particle_Canvas.width+particle_Canvas.height)/2*0.02);
  if(particleMaxRadius<5)
    particleMaxRadius=5;

  for (var i = 0; i < particles.length; i++) {
    particles[i].setRandom_Pos();
    particles[i].setRandom_Velocity();
    particles[i].setRandomSaturation(stdStaturationMin,stdStaturationMax);
    particles[i].setRandomRadiusAndValue();
  }

  startParticleAnimation();
}

function drawParticles(){
  particle_ctx.clearRect(0, 0, particle_Canvas.width, particle_Canvas.height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].draw();
  }
}

function startParticleAnimation(){
  timer2DAnimation = setInterval(drawParticles, animationInterval);
}

function stopParticleAnimation(){
  clearInterval(timer2DAnimation);
}
