Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
}


function deg2rad (degree)
{
    return (degree/180*Math.PI);
}


Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
}


String.prototype.blankLink = function(url) {
    return "<a target='_blank' href='"+url+"'>"+url+"</a>";
}


function canvasToHTMLSize(canvasID){
  var canvasObj = document.getElementById(canvasID);
  var canvasObjBox = canvasObj.getBoundingClientRect();
  canvasObj.width = canvasObjBox.width;
  canvasObj.height = canvasObjBox.height;
}

function clearCanvas (canvasID){
  var canvasObj = document.getElementById(canvasID);
  const context = canvasObj.getContext('2d');
  context.clearRect(0, 0, canvasObj.width, canvasObj.height);
}


function checkBrowser(){
  // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';

  // Safari 3.0+ "[object HTMLElementConstructor]"
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1 - 71
  var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;

  if(isBlink){
    browsertype = 6;
    return;
  }

  if(isChrome){
    browsertype = 1;
    return;
  }

  if(isBlink){
    browsertype = 6;
    return;
  }

  if(isFirefox){
    browsertype = 0;
    return;
  }

  if(isOpera){
    browsertype = 5;
    return;
  }

  if(isEdge){
    browsertype = 2;
    return;
  }

  if(isIE){
    browsertype = 4;
    return;
  }

  if(isSafari){
    browsertype = 3;
    return;
  }



}
