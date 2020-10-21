var currentPos=0;
var pageProcess=[];
var numPages =11;

window.onload = function() {
    currentPos=0;
    pageProcess=[];
}

function nextPage(){
    pageProcess.push(currentPos);
    stylePages(currentPos+1);
}

function prevPage() {
    var previousePage = pageProcess.pop();
    if(isNaN(previousePage))
        return;
    stylePages(previousePage);
}

function goToPage(pageID){
    pageProcess.push(currentPos);
    stylePages(pageID);
}

function stylePages(pageID){

    if(pageID==currentPos)
        return;

    ///// Stop videos at current page 
    switch (currentPos) {
        case 0:
            document.getElementById("id_vis2020_TutVideo1").src="";
        break;
    }

    ////// Do Sliding /////////
    document.getElementById("id_page_"+pageID).style.left="0vw";

    if(pageID<currentPos)
        document.getElementById("id_page_"+currentPos).style.left="100vw";
    else
        document.getElementById("id_page_"+currentPos).style.left="-100vw";

    currentPos=pageID;

    var element =  document.getElementById('id_page_'+currentPos+'_div');
    if (typeof(element) != 'undefined' && element != null)
    {
        element.scrollTop=0;
        checkScrollStatus();
    }

    ///// Start videos at new page 
    switch (currentPos) {
        case 0:
            document.getElementById("id_vis2020_TutVideo1").src="https://www.youtube.com/embed/UBpY6PNZ2c0?autoplay=1";
        break;
        case 6:
            document.getElementById("id_vis20tut_process").style.width="20%";
        break;
        case 7:
            document.getElementById("id_vis20tut_process").style.width="40%";
        break;
        case 8:
            document.getElementById("id_vis20tut_process").style.width="60%";
        break;
        case 9:
            document.getElementById("id_vis20tut_process").style.width="80%";
        break;
        case 10:
            document.getElementById("id_vis20tut_process").style.width="100%";
        break;
        default:
            document.getElementById("id_vis20tut_process").style.width="0%";
    }

    

}


function checkScrollStatus(){
    var element =  document.getElementById('id_page_'+currentPos+'_div');
    if (typeof(element) != 'undefined' && element != null)
    {
        var isOverflowing = element.clientHeight < element.scrollHeight; 
        if(element.scrollTop==0 && isOverflowing){
            document.getElementById('id_ScrollSign_Left').style.display="block";
            document.getElementById('id_ScrollSign_Right').style.display="block";
        }
        else{
            document.getElementById('id_ScrollSign_Left').style.display="none";
            document.getElementById('id_ScrollSign_Right').style.display="none";
        }

    }
}

function openBigImg (src,title){
  document.getElementById("id_PopUp_BigImg").style.display = "flex";
  document.getElementById("id_bigImg").src = src;
  document.getElementById("id_bigImg").title = title;
}


//<div id="id_page_1_div" style="margin-top: auto; width: 100%; height:75vh; overflow-y: auto; display: flex;"></div>