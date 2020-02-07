class class_Welcome_Section extends class_Section {

  constructor() {
    super('id_welcomePage');
  }

  updateSection(){
      //
      document.getElementById("id_WelcomePage_Loading_Animation").style.display="none";
      document.getElementById("id_WelcomePage_Loading").style.height="0vh";
      document.getElementById("id_WelcomePage_Welcome").style.height="100vh";

      // later switch images or something like that
  }

  closeInfo(){
    document.getElementById("id_WelcomePage_Info").style.display="none";
  }

};
