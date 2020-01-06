function initDropDowns(){
 document.getElementById("id_EditPage_CMSInfoDiv").onclick =  function() {dropDownEvents("id_EditPage_CMSInfoDiv", "id_EditPage_CMSInfoDiv_dropdown", false,false);};
}


function dropDownEvents(dropdownID, contentID, onTop,toRight){
  var additionalScrollID="";

  if(document.getElementById(contentID).style.display==="none"){

    document.getElementById(contentID).style.display="flex";

    var refObj = document.getElementById(dropdownID);

    var box = refObj.getBoundingClientRect();

    var dropdownBox = document.getElementById(contentID).getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top,left;

      top = box.top + scrollTop - clientTop;
      left = box.left+ scrollLeft - clientLeft;


    if(onTop){
      document.getElementById(contentID).style.top=(top-dropdownBox.height)+"px";
    }
    else {
      document.getElementById(contentID).style.top=(top+box.height)+"px";
    }
    if(toRight){
        document.getElementById(contentID).style.left=(left+box.width)+"px";
    }
    else {
        document.getElementById(contentID).style.left=(left+box.width-dropdownBox.width)+"px";
    }


  }
  else{
    document.getElementById(contentID).style.display="none";
  }

}
