function openEditKeyDiv(){

  var selectbox = document.getElementById("id_EditPage_EditKey_List");

  for(var i = selectbox.options.length - 1 ; i >= 0 ; i--)
  {
      selectbox.remove(i);
  }

  for (var i = 0; i < globalCMS1.length; i++) {
      var opt = document.createElement('option');
      opt.innerHTML = "Key "+ i +" "+globalCMS1.getKeyType(i);
      selectbox.appendChild(opt);
  }


}
