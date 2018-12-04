function fillTable() {

  var old_tbody = document.getElementById("id_tableBody");
  var new_tbody = document.createElement('tbody');

  //fill table



  for (i = 0; i < globalCMS1.getKeyLength()-1; i++) {
    var tr = document.createElement('tr');
    tr.style.background = "white";

    var td = document.createElement('td');
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(i + 1));
    td.style.maxWidth="2vw";
    td.style.width="2vw";
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(globalCMS1.getRefPosition(i)));
    td.style.maxWidth="3.5vw";
    td.style.width="3.5vw";
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(globalCMS1.getRefPosition(i+1)));
    td.style.maxWidth="3.5vw";
    td.style.width="3.5vw";
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";


    var color1 = globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace());
    var color2 = globalCMS1.getLeftKeyColor(i+1,globalCMS1.getInterpolationSpace())

    if(color1==undefined){
      td.appendChild(document.createTextNode("constant"));
      color1 = color2;
    }
    else{
      td.appendChild(document.createTextNode("scaled"));
    }
    td.style.maxWidth="3vw";
    td.style.width="3vw";

    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    var td2 = document.createElement('td')
    td2.className = "class_tableInput";

    switch (globalCMS1.getInterpolationSpace()) {
      case "rgb":
        td.appendChild(document.createTextNode(color1.getRGBString()));
        td2.appendChild(document.createTextNode(color2.getRGBString()));
        break;
      case "hsv":
       td.appendChild(document.createTextNode(color1.getHSVString(numDecimalPlaces)));
       td2.appendChild(document.createTextNode(color2.getHSVString(numDecimalPlaces)));
        break;
      case "lab":
       td.appendChild(document.createTextNode(color1.getLABString(numDecimalPlaces)));
       td2.appendChild(document.createTextNode(color2.getLABString(numDecimalPlaces)));
        break;
      case "din99":
       td.appendChild(document.createTextNode(color1.getDIN99String(numDecimalPlaces)));
       td2.appendChild(document.createTextNode(color2.getDIN99String(numDecimalPlaces)));
        break;
      default:
        console.log("Error at the changeColorspace function");
    }

    td.style.width="4vw";
    td.style.maxWidth="4vw";
    td2.style.width="4vw";
    td2.style.maxWidth="4vw";

    tr.appendChild(td);
    tr.appendChild(td2);

    new_tbody.appendChild(tr);

  }

  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
  new_tbody.id = "id_tableBody";
}
