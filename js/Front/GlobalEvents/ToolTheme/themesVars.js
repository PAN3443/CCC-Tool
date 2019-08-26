
var currentTheme = 0;

var cccTool_Themes = [

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  ///////////////////////////  Bright Mode    ////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  [
  ["name","Bright Mode"],
  ["representativeColor1","rgb(0, 0, 0)"], // --menue-bg-color
  ["representativeColor2","rgb(50,50,50)"], // --main--sepArea-bg-color
  ["representativeColor3","rgb(51,153,255)"], //--general-active-color
  ["representativeColor4","rgb(255,255,255)"], // --main-bg-color


  //////////////////////////////////////////////////////////////////////////
  ["--general-active-color","rgb(51,153,255"],
  ["--general-hover-color","rgb(0,102,204"],
  ["--general-warning-color","rgb(255,153,153"],
  ["--general-lowWarning-color ","rgb(255,69,0"],
  ["--general-check-color","rgb(124,252,0"],
  ["--general-bg-hover-color","rgb(107,113,128"], /*brighter than background, darker than font*/

  /**************************************
  **** Menue
  ***************************************/
  ["--menue-bg-color","rgb(0, 0, 0"],
  ["--menue-navi-bg-color","rgba(0, 0, 0,0.9"],
  ["--menue-font-color","rgb(255,255,255"],
  ["--menue-label-color"," rgb(255,255,255"],
  ["--menue-warning-font-color","var(--general-warning-color)"],
  ["--menue-bg-color-hover","rgba(255,255,255,0.3"],
  ["--menue-font-activ-color","rgb(255,255,255"],
  ["--menue-font-notActiv-color","rgb(180 ,180,180"],
  ["--menue-barLabel-bg-color","rgba(255,255,255,0.3"],
  ["--menue-navi-negative-color","var(--general-warning-color)"],
  ["--menue-navi-positive-color","rgb(153,204,255"],

  ["--main-popUpWindow-bg-color","rgba(0, 0, 0,0.75"],
  ["--main-popUpWindow-labelbg-color","var(--menue-bg-color)"],
  ["--main-popUpWindow-labelfont-color"," rgb(153,204,255"],

  /**************************************
  **** General
  ***************************************/
  ["--main-bg-color","rgb(255,255,255"],
  ["--main-second-bg-color","rgb(240,240,240"],
  ["--main-font-color","rgb(0,0,0"],
  ["--main-font-notactive-color","rgb(120,120,120"],
  ["--main-warning-font-color","rgb(224,108,117"],
  ["--main-label-font-color","rgb(255,255,255"],
  ["--main-nonActiveColor","rgb(63, 139, 183"],
  ["--main-nonActiveColor-hover","rgb(19, 111, 153"],
  ["--main-button-bg","var(--main-font-color)"],
  ["--main-button-bg-hover","var(--general-hover-color)"],
  ["--main-button-font","var(--main-bg-color)"],
  ["--main-activebutton-bg","var(--general-active-color)"],
  ["--main-activebutton-bg-hover","var(--main-button-bg-hover)"],

  /**** Link Colors ****/
  ["--link-color","rgb(0, 102, 204"],
  ["--link-color-visited","rgb(128, 0, 128"],
  ["--link-color-hover","rgb(0, 152, 254"],
  ["--link-color-active","rgb(0, 152, 254"],


  /****** Gallery MyDesigns Objects *****/
  ["--cms-obj-font-color","rgb(255,255,255"],

  /**** Sep Area ****/
  ["--main-sepArea-bg","rgb(50, 50, 50"],
  ["--main-sepArea-font-color","rgb(255,255,255"],
  ["--main-sepArea-border","none"],
  ["--main-Button-sepArea-font-color","rgb(255,255,255"],
  ["--main-Button-sepArea-font-hover","rgb(153,204,255"],
  ["--main-Button-sepArea-bg-color","none"],
  ["--main-Button-sepArea-bg-color-hover","none"],
  ["--main-sepArea-link-color","var(--link-color)"],
  ["--main-sepArea-link-color-visited","var(--link-color-visited)"],
  ["--main-sepArea-link-color-hover","var(--link-color-hover)"],
  ["--main-sepArea-link-color-active","var(--link-color-active)"],


  /***** Scrollbar *****/
  ["--scrollbar-track-bg","var(--main-bg-color)"],
  ["--scrollbar-track-shadow","rgb(37,40,47"],
  ["--scrollbar-thump-bg","rgb(97,100,107"],
  ["--scrollbar-thump-bg-hover","var(--general-hover-color)"],


  /**** Table *****/
  ["--main-table-bg1-color","var(--main-bg-color)"],
  ["--main-table-bg2-color","var(--main-second-bg-color)"],
  ["--main-table-border-color","var(--main-sepArea-bg)"],
  ["--main-table-font-color","var(--main-font-color)"],


  /**** Input *****/
  ["--input-bg-color","rgb(255,255,255"],
  ["--input-font-color","rgb(0,0,0"],
  ["--input-placeholder-font-color","rgb(80,80,80"],
  ["--input-disabled-bg-color","rgb(220,220,220"],
  ["--input-disabled-font-color","rgb(160,160,160"],


  ["--radio-bg-color","rgb(180,180,180"],
  ["--radio-disabled-bg-color","rgb(220,220,220"],
  ["--radio-bg-color-hover","var(--general-hover-color)"],
  ["--radio-disabled-bg-color-hover","rgb(255,153,153)"],

  ["--range-bg-color","var(--menue-bg-color)"],
  ["--range-track-color","var(--menue-bg-color)"],
  ["--range-lower-color","var(--general-active-color)"],
  ["--range-upper-color","var(--main-sepArea-bg)"],
  ["--range-slider-thumb-color","rgb(217,220,227"],
  ["--range-slider-thumb-border-color","rgb(32, 36, 43"],
  ["--range-slider-thumb-color-hover","var(--general-hover-color)"],

  /***** Tab Row ******/
  ["--tabrow-bg-color","var(--main-sepArea-bg)"],
  ["--tabrow-font-color","rgb(255,255,255"],
  ["--tabrow-active-color","rgb(255,255,255"],
  ["--tabrow-active-font-color","var(--main-sepArea-bg)"],

],



  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  ///////////////////////////  Bright Oxfort var()   ////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  [
  ["name","Bright Oxfort"],
  ["representativeColor1","rgb(0, 33, 71)"], // --menue-bg-color
  ["representativeColor2","rgb(30, 63, 101)"], // --main--sepArea-bg-color
  ["representativeColor3","rgb(150, 183, 221)"], //--general-active-color
  ["representativeColor4","rgb(255,255,255)"], // --main-bg-color


  ////////////////////////////////////////////////////////

  ["--general-active-color","rgb(150, 183, 221)"],
  ["--general-hover-color","rgb(70, 103, 141)"],
  ["--general-warning-color","rgb(255,153,153)"],
  ["--general-lowWarning-color ","rgb(255,204,150)"],
  ["--general-check-color","rgb(153,255,255)"],
  ["--general-bg-hover-color","rgb(107,113,128)"], /*brighter than background, darker than font*/

  /**************************************
  **** Menue
  ***************************************/
  ["--menue-bg-color","rgb(0, 33, 71)"],
  ["--menue-navi-bg-color","rgba(0, 33, 71,0.95)"],
  ["--menue-font-color","rgb(255,255,255)"],
  ["--menue-label-color"," rgb(255,255,255)"],
  ["--menue-warning-font-color","rgb(255,153,153)"], // --general-warning-color"],
  ["--menue-bg-color-hover","rgba(255,255,255,0.3)"],
  ["--menue-font-activ-color","rgb(255,255,255)"],
  ["--menue-font-notActiv-color","rgb(180 ,180,180)"],
  ["--menue-barLabel-bg-color","rgba(255,255,255,0.3)"],
  ["--menue-navi-negative-color","rgb(255,153,153)"], // --general-warning-color"],
  ["--menue-navi-positive-color","rgb(255,255,153)"],

  ["--main-popUpWindow-bg-color","rgba(0, 13, 51,0.5)"],
  ["--main-popUpWindow-labelbg-color","rgb(0, 33, 71)"], // --menue-bg-color"],
  ["--main-popUpWindow-labelfont-color"," rgb(255,255,255)"],

  /**************************************
  **** General
  ***************************************/
  ["--main-bg-color","rgb(255,255,255)"],
  ["--main-second-bg-color","rgb(240,240,240)"],
  ["--main-font-color","rgb(50,50,50)"],
  ["--main-font-notactive-color","rgb(120,120,120)"],
  ["--main-warning-font-color","rgb(224,108,117)"],
  ["--main-label-font-color","rgb(160, 193, 231)"],
  ["--main-nonActiveColor","rgb(63, 139, 183)"],
  ["--main-nonActiveColor-hover","rgb(19, 111, 153)"],
  ["--main-button-bg","rgb(50,50,50)"], // --main-font-color"],
  ["--main-button-bg-hover","rgb(70, 103, 141)"], // --general-hover-color"],
  ["--main-button-font","rgb(255,255,255)"], // --main-bg-color"],
  ["--main-activebutton-bg","rgb(150, 183, 221)"], // --general-active-color"],
  ["--main-activebutton-bg-hover","rgb(70, 103, 141)"], // --main-button-bg-hover"],

  /**** Link Colors ****/
  ["--link-color","rgb(63, 139, 183)"],
  ["--link-color-visited","rgb(228,62,0)"],
  ["--link-color-hover","rgb(19, 111, 153)"],
  ["--link-color-active","rgb(19, 111, 153)"],


  /****** Gallery MyDesigns Objects *****/
  ["--cms-obj-font-color","rgb(255,255,255)"],

  /**** Sep Area ****/
  ["--main-sepArea-bg","rgb(30, 63, 101)"],
  ["--main-sepArea-font-color","rgb(255,255,255)"],
  ["--main-sepArea-border","none"],
  ["--main-Button-sepArea-font-color","rgb(255,255,255)"],
  ["--main-Button-sepArea-font-hover","rgb(160, 193, 231)"],
  ["--main-Button-sepArea-bg-color","none"],
  ["--main-Button-sepArea-bg-color-hover","none"],
  ["--main-sepArea-link-color","rgb(63, 139, 183)"], // --link-color"],
  ["--main-sepArea-link-color-visited","rgb(228,62,0)"], // (--link-color-visited"],
  ["--main-sepArea-link-color-hover","rgb(19, 111, 153)"], // --link-color-hover"],
  ["--main-sepArea-link-color-active","rgb(19, 111, 153)"], // --link-color-active"],


  /***** Scrollbar *****/
  ["--scrollbar-track-bg","rgb(255,255,255)"], // --main-bg-color"],
  ["--scrollbar-track-shadow","rgb(37,40,47)"],
  ["--scrollbar-thump-bg","rgb(97,100,107)"],
  ["--scrollbar-thump-bg-hover","rgb(70, 103, 141)"], // --general-hover-color"],


  /**** Table *****/
  ["--main-table-bg1-color","rgb(255,255,255)"], // --main-bg-color"],
  ["--main-table-bg2-color","rgb(240,240,240)"], // --main-second-bg-color"],
  ["--main-table-border-color","rgb(30, 63, 101)"], // --main-sepArea-bg"],
  ["--main-table-font-color","rgb(50,50,50)"], // --main-font-color"],


  /**** Input *****/
  ["--input-bg-color","rgb(157,163,178)"],
  ["--input-font-color","rgb(32, 36, 43)"],
  ["--input-placeholder-font-color","rgb(240,240,240)"], // --main-second-bg-color"], /*brighter than normal font color and darker than background color*/
  ["--input-disabled-bg-color","rgb(107,113,128)"],
  ["--input-disabled-font-color","rgb(50,50,50)"], // --main-font-color"],


  ["--radio-bg-color","rgb(180,180,180)"],
  ["--radio-disabled-bg-color","rgb(50,50,50)"], /* darker than main-sepArea-bg*/
  ["--radio-bg-color-hover","rgb(70, 103, 141)"], // --general-hover-color"],
  ["--radio-disabled-bg-color-hover","rgb(255,153,153)"], // --general-warning-color"],

  ["--range-bg-color","rgb(0, 33, 71)"], // --menue-bg-color"],
  ["--range-track-color","rgb(0, 33, 71)"], // --menue-bg-color"],
  ["--range-lower-color","rgb(150, 183, 221)"], // --general-active-color"],
  ["--range-upper-color","rgb(30, 63, 101)"], // --main-sepArea-bg"],
  ["--range-slider-thumb-color","rgb(217,220,227)"],
  ["--range-slider-thumb-border-color","rgb(32, 36, 43)"],
  ["--range-slider-thumb-color-hover","rgb(225,192,141)"],

  /***** Tab Row ******/
  ["--tabrow-bg-color","rgb(30, 63, 101)"], // --main-sepArea-bg"],
  ["--tabrow-font-color","rgb(255,255,255)"],
  ["--tabrow-active-color","rgb(255,255,255)"],
  ["--tabrow-active-font-color","rgb(30, 63, 101)"], // --main-sepArea-bg"],


  ],

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
 ///////////////////////////  DARK MODE   /////////////////////////////////
 //////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////

  [

  ["name","Dark Mode"],
  ["representativeColor1","rgb(12, 16, 23)"], // --menue-bg-color
  ["representativeColor2","rgb(32, 36, 43)"], // --main--sepArea-bg-color
  ["representativeColor3","rgb(218,146,77)"], //--general-active-color
  ["representativeColor4","rgb(77,80,87)"], // --main-bg-color

  ////////////////////////////////////////////////////////
  ["--general-active-color","rgb(218,146,77)"],
  ["--general-hover-color","rgb(225,192,141)"],
  ["--general-warning-color","rgb(224,108,117)"],
    ["--general-lowWarning-color","rgb(255,204,150)"],
    ["--general-check-color"," rgb(178,255,102)"],
  ["--general-bg-hover-color","rgb(107,113,128)"],

  /**************************************
  **** Menue
  ***************************************/
  ["--menue-bg-color","rgb(12, 16, 23)"],
  ["--menue-navi-bg-color","rgba(32, 36, 43,0.95)"],
  ["--menue-font-color","rgb(157,163,178)"], //--main-font-color)
  ["--menue-label-color", "rgb(197,203,218)"],
  ["--menue-warning-font-color","rgb(224,108,117)"],//--general-warning-color)
  ["--menue-bg-color-hover","rgba(157,163,178,0.5)"],
  ["--menue-font-activ-color","rgb(157,163,178)"],//--main-font-color)
  ["--menue-font-notActiv-color","rgb(107,113,128)"],//--main-font-notactive-color)
  ["--menue-barLabel-bg-color","rgba(157,163,178,0.1)"],
  ["--menue-navi-negative-color","rgb(224,108,117)"],//--general-warning-color
  ["--menue-navi-positive-color","rgb(218,146,77)"],//--general-active-color



  ["--main-popUpWindow-bg-color","rgba(255, 255, 255,0.3)"],
  ["--main-popUpWindow-labelbg-color","rgb(12, 16, 23)"], //-menue-bg-color
  ["--main-popUpWindow-labelfont-color","rgb(218,146,77)"],

  /**************************************
  **** General
  ***************************************/
  ["--main-bg-color","rgb(77,80,87)"],
  ["--main-second-bg-color","rgb(57,60,67)"],
  ["--main-font-color","rgb(157,163,178)"],
  ["--main-font-notactive-color","rgb(107,113,128)"],
  ["--main-warning-font-color","rgb(224,108,117)"],//--general-warning-color
  ["--main-label-font-color","rgb(218,146,77)"],//--general-active-color
  ["--main-nonActiveColor","rgb(63, 139, 183)"],
  ["--main-nonActiveColor-hover","rgb(19, 111, 153)"],

  ["--main-button-bg","rgb(157,163,178)"],//--main-font-color
  ["--main-button-bg-hover","rgb(225,192,141)"],//--general-hover-color
  ["--main-button-font","rgb(77,80,87)"], //--main-bg-color
  ["--main-activebutton-bg","rgb(218,146,77)"],//--general-active-color
  ["--main-activebutton-bg-hover","rgb(225,192,141)"],//--main-button-bg-hover

  /**** Link Colors ****/
  ["--link-color","rgb(63, 139, 183)"],
  ["--link-color-visited","rgb(228,62,0)"],
  ["--link-color-hover","rgb(19, 111, 153)"],
  ["--link-color-active","rgb(19, 111, 153)"],

  /****** Gallery MyDesigns Objects *****/
  ["--cms-obj-font-color","rgb(157,163,178)"],//--main-font-color


  /**** Sep Area ****/
  ["--main-sepArea-bg","rgb(32, 36, 43)"],
  ["--main-sepArea-font-color","rgb(157,163,178)"],//--main-font-color
  ["--main-sepArea-border","none"],
  ["--main-Button-sepArea-font-color","rgb(157,163,178)"],
  ["--main-Button-sepArea-font-hover","rgb(225,192,141)"],//--general-hover-color)
  ["--main-Button-sepArea-bg-color","none"],
  ["--main-Button-sepArea-bg-color-hover","none"],
  ["--main-sepArea-link-color","rgb(63, 139, 183)"],//--link-color)
  ["--main-sepArea-link-color-visited","//--link-color-visited)"],
  ["--main-sepArea-link-color-hover","//--link-color-hover)"],
  ["--main-sepArea-link-color-active","//--link-color-active)"],


  /***** Scrollbar *****/
  ["--scrollbar-track-bg","rgb(77,80,87)"],//--main-bg-color)
  ["--scrollbar-track-shadow","rgb(37,40,47)"],
  ["--scrollbar-thump-bg","rgb(97,100,107)"],
  ["--scrollbar-thump-bg-hover","rgb(225,192,141)"],//--general-hover-color)


  /**** Table *****/
  ["--main-table-bg1-color","rgb(77,80,87)"],//--main-bg-color)
  ["--main-table-bg2-color","rgb(57,60,67)"],//--main-second-bg-color)
  ["--main-table-border-color","rgb(32, 36, 43)"],//--main-sepArea-bg)
  ["--main-table-font-color","rgb(157,163,178)"],//--main-font-color)


  /**** Input *****/
  ["--input-bg-color","rgb(157,163,178)"],
  ["--input-font-color","rgb(32, 36, 43)"],
  ["--input-placeholder-font-color","rgb(57,60,67)"], //--main-second-bg-color)
  ["--input-disabled-bg-color","rgb(107,113,128)"],
  ["--input-disabled-font-color","rgb(157,163,178)"],//--main-font-color)


  ["--radio-bg-color","rgb(157,163,178)"],//--main-font-color)
  ["--radio-disabled-bg-color","rgb(2, 6, 13)"],// darker than --main-sepArea-bg)
  ["--radio-bg-color-hover","rgb(225,192,141)"],//--general-hover-color)
  ["--radio-disabled-bg-color-hover","rgb(224,108,117)"],//--general-warning-color)

  ["--range-bg-color","rgb(97,100,107)"],
  ["--range-track-color","rgb(127,130,137)"],
  ["--range-lower-color","rgb(218,146,77)"],//--general-active-color)
  ["--range-upper-color","rgb(157,163,178)"],//--main-font-color)
  ["--range-slider-thumb-color","rgb(217,220,227)"],
  ["--range-slider-thumb-border-color","rgb(32, 36, 43)"],
  ["--range-slider-thumb-color-hover","rgb(225,192,141)"],

  /***** Tab Row ******/
  ["--tabrow-bg-color","rgb(32, 36, 43)"],//--main-sepArea-bg)
  ["--tabrow-font-color","rgb(157,163,178)"],//--main-font-color)
  ["--tabrow-active-color","rgb(157,163,178)"], //--main-font-color)
  ["--tabrow-active-font-color","rgb(32, 36, 43)"],//--main-sepArea-bg)

]



];
