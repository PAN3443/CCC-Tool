class class_Tutorials_Section extends class_Section {

  constructor() {
    super('id_TutorialPage');
    
  }



  updateSection(){

  }

  switchChannel(channel) {

  switch (channel) {
    case 2:
      document.getElementById("id_PopUp_TutorialWindow_Iframe").src = "https://www.youtube.com/embed/hmrIzNo5sjE";
      document.getElementById("id_tutorial_ChannelLabel").innerHTML = "OLD Channel 2: Tool Overview (Version 0.7)"
      break;
    default:
      document.getElementById("id_PopUp_TutorialWindow_Iframe").src = "https://www.youtube.com/embed/hmrIzNo5sjE";
  }
}

};
