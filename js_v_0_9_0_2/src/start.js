window.onload = function() {

  /*includeHTML();

  updateToolVersion();

  init_Particles();
  setParticleCanvas("id_startPage_ParticleCanvas");*/
  leaveButton(); // for shadow
  openCCCTool();

}


function openCCCTool(){
  window.open("html/ToolVariations/cccTool.html","_self");
}

function openCCBCTool(){
  //window.open("html/ToolVariations/cccTool.html","_self");
}

function openCCRCTool(){
  //window.open("html/ToolVariations/cccTool.html","_self");
}

function enterCCC(){
  changeDivStatus(false,"id_Start_Info_Div");
  changeDivStatus(true,"id_CCC_Info_Div");
  changeDivStatus(false,"id_CCBC_Info_Div");
  changeDivStatus(false,"id_CCRC_Info_Div");
  changeDivStatus(false,"id_Wiki_Info_Div");
  var int1 = Math.round(particles.length/3);
  var int2 = int1*2;
  for (var i = 0; i < int1; i++) {
    particles[i].setFixedPos([[0.675,0.05],[0.625,0.05],[0.6,0.10],[0.6,0.20],[0.625,0.25],[0.675,0.25]]); //
  }
  for (var i = int1; i < int2; i++) {
    particles[i].setFixedPos([[0.8,0.05],[0.75,0.05],[0.725,0.10],[0.725,0.20],[0.75,0.25],[0.8,0.25]]); //
  }
  for (var i = int2; i < particles.length; i++) {
    particles[i].setFixedPos([[0.925,0.05],[0.875,0.05],[0.85,0.10],[0.85,0.20],[0.875,0.25],[0.925,0.25]]); //
  }


}

function enterCCBC(){
  changeDivStatus(false,"id_Start_Info_Div");
  changeDivStatus(false,"id_CCC_Info_Div");
  changeDivStatus(true,"id_CCBC_Info_Div");
  changeDivStatus(false,"id_CCRC_Info_Div");
  changeDivStatus(false,"id_Wiki_Info_Div");
  var int1 = Math.round(particles.length/4);
  var int2 = int1*2;
  var int3 = int1*3;
  for (var i = 0; i < int1; i++) {
    particles[i].setFixedPos([[0.65,0.05],[0.6,0.05],[0.575,0.10],[0.575,0.20],[0.6,0.25],[0.65,0.25]]); //
  }
  for (var i = int1; i < int2; i++) {
    particles[i].setFixedPos([[0.75,0.05],[0.7,0.05],[0.675,0.10],[0.675,0.20],[0.7,0.25],[0.75,0.25]]); //
  }
  for (var i = int2; i < int3; i++) {
    particles[i].setFixedPos([[0.775,0.15],[0.775,0.05],[0.8,0.05],[0.85,0.1],[0.8,0.15],[0.775,0.15],[0.775,0.25],[0.8,0.25],[0.85,0.2],[0.8,0.15]]); //
  }
  for (var i = int3; i < particles.length; i++) {
    particles[i].setFixedPos([[0.95,0.05],[0.9,0.05],[0.875,0.10],[0.875,0.20],[0.9,0.25],[0.95,0.25]]); //
  }
}

function enterCCRC(){
  changeDivStatus(false,"id_Start_Info_Div");
  changeDivStatus(false,"id_CCC_Info_Div");
  changeDivStatus(false,"id_CCBC_Info_Div");
  changeDivStatus(true,"id_CCRC_Info_Div");
  changeDivStatus(false,"id_Wiki_Info_Div");
  var int1 = Math.round(particles.length/4);
  var int2 = int1*2;
  var int3 = int1*3;
  for (var i = 0; i < int1; i++) {
    particles[i].setFixedPos([[0.65,0.05],[0.6,0.05],[0.575,0.10],[0.575,0.20],[0.6,0.25],[0.65,0.25]]); //
  }
  for (var i = int1; i < int2; i++) {
    particles[i].setFixedPos([[0.75,0.05],[0.7,0.05],[0.675,0.10],[0.675,0.20],[0.7,0.25],[0.75,0.25]]); //
  }
  for (var i = int2; i < int3; i++) {
    particles[i].setFixedPos([[0.775,0.25],[0.775,0.05],[0.8,0.05],[0.85,0.1],[0.8,0.15],[0.775,0.15],[0.85,0.25]]); //
  }
  for (var i = int3; i < particles.length; i++) {
    particles[i].setFixedPos([[0.95,0.05],[0.9,0.05],[0.875,0.10],[0.875,0.20],[0.9,0.25],[0.95,0.25]]); //
  }
}

function leaveButton(){
  changeDivStatus(true,"id_Start_Info_Div");
  changeDivStatus(false,"id_CCC_Info_Div");
  changeDivStatus(false,"id_CCBC_Info_Div");
  changeDivStatus(false,"id_CCRC_Info_Div");
  changeDivStatus(false,"id_Wiki_Info_Div");
  for (var i = 0; i < particles.length; i++) {
    particles[i].setRandom_Velocity();
    particles[i].setRandomSaturation(stdStaturationMin,stdStaturationMax);
    particles[i].resetColorAlpha(alphaMin,alphaMax);
    particles[i].setRandomRadiusAndValue();
  }
}

function enterWiki(){
  changeDivStatus(false,"id_Start_Info_Div");
  changeDivStatus(false,"id_CCC_Info_Div");
  changeDivStatus(false,"id_CCBC_Info_Div");
  changeDivStatus(false,"id_CCRC_Info_Div");
  changeDivStatus(true,"id_Wiki_Info_Div");
  var int1 = Math.round(particles.length/3);
  var dotParticle = Math.round(int1/10);
  var int2 = int1*2;
  for (var i = 0; i < int1; i++) {
    if(i<dotParticle)
      particles[i].setFixedPos([[0.645,0.275],[0.655,0.275]]);
    else
      particles[i].setFixedPos([[0.675,0.05],[0.625,0.05],[0.6,0.10],[0.6,0.15],[0.625,0.175],[0.65,0.175],[0.65,0.225]]);
  }
  for (var i = int1; i < int2; i++) {
    if(i<int1+dotParticle)
      particles[i].setFixedPos([[0.77,0.275],[0.78,0.275]]);
    else
      particles[i].setFixedPos([[0.8,0.05],[0.75,0.05],[0.725,0.10],[0.725,0.15],[0.75,0.175],[0.775,0.175],[0.775,0.225]]);
  }
  for (var i = int2; i < particles.length; i++) {
    if(i<int2+dotParticle)
      particles[i].setFixedPos([[0.895,0.275],[0.905,0.275]]);
    else
      particles[i].setFixedPos([[0.925,0.05],[0.875,0.05],[0.85,0.10],[0.85,0.15],[0.875,0.175],[0.9,0.175],[0.9,0.225]]);
  }


}




function changeDivStatus(isVis,id){
  if(isVis){
    document.getElementById(id).style.display="flex";
    //document.getElementById(id).style.width="50vw";
    /*document.getElementById(id).style.webkitBoxShadow= "0vh 0vh 1vh 1vh var(--main-bg-color-alpha)";
    document.getElementById(id).style.mozBoxShadow= "0vh 0vh 1vh 1vh var(--main-bg-color-alpha)";
    document.getElementById(id).style.boxShadow= "0vh 0vh 1vh 1vh var(--main-bg-color-alpha)";*/
  }
  else {
    document.getElementById(id).style.display="none";
    //document.getElementById(id).style.width="0vw";
    /*document.getElementById(id).style.webkitBoxShadow= "0vh 0vh 0vh 0vh rgba(0,0,0,0.0)";
    document.getElementById(id).style.mozBoxShadow= "0vh 0vh 0vh 0vh rgba(0,0,0,0.0)";
    document.getElementById(id).style.boxShadow= "0vh 0vh 0vh 0vh rgba(0,0,0,0.0)";*/
  }
}
