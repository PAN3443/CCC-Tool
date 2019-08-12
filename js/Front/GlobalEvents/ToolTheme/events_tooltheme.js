function switchToolTheme(){

  if(currentTheme==0){
    currentTheme=1;
  }
  else {
    currentTheme=0;
  }
  selectToolTheme();
}


function selectToolTheme(){

  switch (currentTheme) {
    case 0:
      setToolTheme(theme_0_darkMode);
    break;
    case 1:
      setToolTheme(theme_1_brightMode);
    break;

  }
}


function setToolTheme(theme){
  let root = document.documentElement;
  for (var i = 0; i < theme.length; i++) {
   root.style.setProperty(theme[i][0], theme[i][1]);
  }
}
