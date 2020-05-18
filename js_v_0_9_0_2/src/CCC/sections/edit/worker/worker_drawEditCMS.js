self.addEventListener('message', function(e) {
  switch (e.data.message) {
    case "init":
      console.log(123);
    break;
    case "drawCMS":
        console.log("draaaaw");
    break;
  default:
    generalJSON_Processing(e.data);


  }

}, false);
