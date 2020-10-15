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

    ////// Style Pages /////////
    /*for (let index = 0; index < numPages; index++) {
        
        switch (true) {
            case (index==currentPos):
                document.getElementById("id_page_"+index).style.left="0vw";
            break;
            case (index<currentPos):
                document.getElementById("id_page_"+index).style.left="-100vw";
            break;
            default:
                document.getElementById("id_page_"+index).style.left="100vw";
        }

    }

    console.log(document.getElementById("id_page_"+pageID).style.left);*/

    ////// Do Sliding /////////
    document.getElementById("id_page_"+pageID).style.left="0vw";

    if(pageID<currentPos)
        document.getElementById("id_page_"+currentPos).style.left="100vw";
    else
        document.getElementById("id_page_"+currentPos).style.left="-100vw";

    currentPos=pageID;

}

