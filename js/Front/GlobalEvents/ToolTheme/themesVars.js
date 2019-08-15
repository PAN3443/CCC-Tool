
var currentTheme = 0;

var theme_0_darkMode = [
  ["--general-active-color","rgb(218,146,77)"],
  ["--general-hover-color","rgb(225,192,141)"],

  /**************************************
  **** General
  ***************************************/
  ["--main-bg-color","rgb(57,60,67)"],
  ["--main-second-bg-color","rgb(77,80,87)"],
  ["--main-font-color","rgb(157,163,178)"],
  ["--main-font-notactive-color","rgb(107,113,128)"],
  ["--main-warning-font-color","rgb(224,108,117)"],
  ["--main-label-font-color","rgb(218,146,77)"],//--general-active-color)
  ["--main-nonActiveColor","rgb(63, 139, 183)"],
  ["--main-nonActiveColor-hover","rgb(19, 111, 153)"],
  ["--main-button-bg","rgb(157,163,178)"],// = --main-font-color
  ["--main-button-bg-hover","rgb(225,192,141)"],// = --general-hover-color
  ["--main-button-font","rgb(57,60,67)"],// = --main-bg-color
  ["--main-activebutton-bg","rgb(218,146,77)"],// = --general-active-color
  ["--main-activebutton-bg-hover","rgb(225,192,141)"],// = --main-button-bg-hover


  /**** Sep Area ****/
  ["--main-sepArea-bg","rgb(32, 36, 43)"],
  ["--main-optionBox-bg","rgb(32, 36, 43)"],
  ["--main-optionBox-border","rgb(32, 36, 43)"],
  ["--main-Button-sepArea-font-color","rgb(32, 36, 43)"],
  ["--main-Button-sepArea-bg-color","rgb(157,163,178)"],// = --main-font-color)"],
  ["--main-Button-sepArea-bg-color-hover","rgb(225,192,141)"],// = --general-hover-color


  /***** Scrollbar *****/
  ["--scrollbar-track-bg","rgb(57,60,67)"],// = --main-bg-color
  ["--scrollbar-track-shadow","rgb(37,40,47)"],
  ["--scrollbar-thump-bg","rgb(97,100,107)"],
  ["--scrollbar-thump-bg-hover","rgb(225,192,141)"],// = --general-hover-color


  /**** Table *****/
  ["--main-table-bg1-color","rgb(245,245,245)"],
  ["--main-table-bg2-color","rgb(225,225,225)"],
  ["--main-table-border-color","rgb(32, 36, 43)"],
  ["--main-table-font-color","rgb(32, 36, 43)"],


  /**** Input *****/
  ["--radio-bg-color","rgb(157,163,178)"],// = --main-font-color)"],
  ["--radio-bg-color-hover","rgb(225,192,141)"],// = --general-hover-color



  /**************************************
  **** Menue
  ***************************************/
  ["--menue-bg-color","rgb(12, 16, 23)"],
  ["--menue-navi-bg-color","rgba(32, 36, 43,0.95)"],
  ["--menue-font-color","rgb(157,163,178)"],// = --main-font-color)"],
  ["--menue-label-color", "rgb(197,203,218)"],
  ["--menue-warning-font-color","rgb(224,108,117)"],
  ["--menue-bg-color-hover","rgba(157,163,178,0.5)"],
  ["--menue-font-activ-color","rgb(157,163,178)"],// = --main-font-color)"],
  ["--menue-font-notActiv-color","rgb(107,113,128)"],// = --main-font-notactive-color
  ["--menue-barLabel-bg-color","rgba(157,163,178,0.3)"],
  ["--menue-navi-negative-color","rgb(224,108,117)"],
  ["--menue-navi-positive-color","rgb(86,182,194)"],



  ["--main-popUpWindow-bg-color","rgba(255, 255, 255,0.3)"],
  ["--main-popUpWindow-labelbg-color","rgb(12, 16, 23)"] // = --menue-bg-color
];


var theme_1_brightMode = [
  ["--general-active-color","rgb(255,255,255)"],
  ["--general-hover-color","rgb(255,255,255)"],

  /**************************************
  **** General
  ***************************************/
  ["--main-bg-color","rgb(255,255,255)"],
  ["--main-second-bg-color","rgb(255,255,255)"],
  ["--main-font-color","rgb(255,255,255)"],
  ["--main-font-notactive-color","rgb(255,255,255)"],
  ["--main-warning-font-color","rgb(255,255,255)"],
  ["--main-label-font-color","rgb(255,255,255)"],
  ["--main-nonActiveColor","rgb(255,255,255)"],
  ["--main-nonActiveColor-hover","rgb(255,255,255)"],
  ["--main-button-bg","rgb(255,255,255)"],// = --main-font-color
  ["--main-button-bg-hover","rgb(255,255,255)"],// = --general-hover-color
  ["--main-button-font","rgb(57,60,67)"],// = --main-bg-color
  ["--main-activebutton-bg","rgb(218,146,77)"],// = --general-active-color
  ["--main-activebutton-bg-hover","rgb(225,192,141)"],// = --main-button-bg-hover


  /**** Sep Area ****/
  ["--main-sepArea-bg","rgb(32, 36, 43)"],
  ["--main-optionBox-bg","rgb(32, 36, 43)"],
  ["--main-optionBox-border","rgb(32, 36, 43)"],
  ["--main-Button-sepArea-font-color","rgb(32, 36, 43)"],
  ["--main-Button-sepArea-bg-color","rgb(157,163,178)"],// = --main-font-color)"],
  ["--main-Button-sepArea-bg-color-hover","rgb(225,192,141)"],// = --general-hover-color


  /***** Scrollbar *****/
  ["--scrollbar-track-bg","rgb(57,60,67)"],// = --main-bg-color
  ["--scrollbar-track-shadow","rgb(37,40,47)"],
  ["--scrollbar-thump-bg","rgb(97,100,107)"],
  ["--scrollbar-thump-bg-hover","rgb(225,192,141)"],// = --general-hover-color


  /**** Table *****/
  ["--main-table-bg1-color","rgb(245,245,245)"],
  ["--main-table-bg2-color","rgb(225,225,225)"],
  ["--main-table-border-color","rgb(32, 36, 43)"],
  ["--main-table-font-color","rgb(32, 36, 43)"],


  /**** Input *****/
  ["--radio-bg-color","rgb(157,163,178)"],// = --main-font-color)"],
  ["--radio-bg-color-hover","rgb(225,192,141)"],// = --general-hover-color



  /**************************************
  **** Menue
  ***************************************/
  ["--menue-bg-color","rgb(12, 16, 23)"],
  ["--menue-navi-bg-color","rgba(32, 36, 43,0.95)"],
  ["--menue-font-color","rgb(157,163,178)"],// = --main-font-color)"],
  ["--menue-label-color", "rgb(197,203,218)"],
  ["--menue-warning-font-color","rgb(224,108,117)"],
  ["--menue-bg-color-hover","rgba(157,163,178,0.5)"],
  ["--menue-font-activ-color","rgb(157,163,178)"],// = --main-font-color)"],
  ["--menue-font-notActiv-color","rgb(107,113,128)"],// = --main-font-notactive-color
  ["--menue-barLabel-bg-color","rgba(157,163,178,0.3)"],
  ["--menue-navi-negative-color","rgb(224,108,117)"],
  ["--menue-navi-positive-color","rgb(86,182,194)"],



  ["--main-popUpWindow-bg-color","rgba(255, 255, 255,0.3)"],
  ["--main-popUpWindow-labelbg-color","rgb(12, 16, 23)"] // = --menue-bg-color
];
