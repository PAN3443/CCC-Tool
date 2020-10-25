var vis2020_currentPos=0;
var pageProcess=[];
//var numPages =11;

window.onload = function() {
    vis2020_currentPos=0;
    console.log("WindLoad",vis2020_currentPos);
    pageProcess=[];
}

function nextPage(){
    console.log("Next", vis2020_currentPos,"+",1);
    pageProcess.push(vis2020_currentPos);
    stylePages(vis2020_currentPos+1);
}

function prevPage() {
    var previousePage = pageProcess.pop();
    if(isNaN(previousePage))
        return;
    stylePages(previousePage);
}

function goToPage(pageID){
    console.log("Go To",pageID);
    pageProcess.push(vis2020_currentPos);
    stylePages(pageID);
}

function stylePages(pageID){

    if(pageID==vis2020_currentPos)
        return;

    ///// Stop videos at current page 
    switch (vis2020_currentPos) {
        case 0:
            pauseIframe("id_vis2020_TutVideo1");
        break;
    }

    ////// Do Sliding /////////
    document.getElementById("id_page_"+pageID).style.left="0vw";

    if(pageID<vis2020_currentPos)
        document.getElementById("id_page_"+vis2020_currentPos).style.left="100vw";
    else
        document.getElementById("id_page_"+vis2020_currentPos).style.left="-100vw";

    console.log("Old Pos", vis2020_currentPos);
    vis2020_currentPos=pageID;

    console.log("Current Pos", vis2020_currentPos);
    console.log(pageProcess);
    console.log("---------");

    var element =  document.getElementById('id_page_'+vis2020_currentPos+'_div');
    if (typeof(element) != 'undefined' && element != null)
    {
        element.scrollTop=0;
        checkScrollStatus();
    }

    ///// Start videos at new page 
    switch (vis2020_currentPos) {
        /*case 0:
            document.getElementById("id_vis2020_TutVideo1").src="https://www.youtube.com/embed/UBpY6PNZ2c0?autoplay=1";
        break;*/
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
    var element =  document.getElementById('id_page_'+vis2020_currentPos+'_div');
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

function pauseIframe(id){
    var iframeSrc = document.getElementById(id).src;
    document.getElementById(id).src = iframeSrc;
}

