function init_Testing(){

  //document.getElementById("id_UserTest_downloadCanvas").addEventListener('click', downloadTestImage, false);
  do3DTestField=false;

  document.getElementById('id_UserTestCanvas').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_UserTestCanvas').addEventListener("mousemove", eventTestMapping_mousemove);
  document.getElementById('id_UserTestCanvas').addEventListener("mouseleave", eventMapping_mouseleave);
  document.getElementById('id_UserTestCanvas').addEventListener("mouseenter", eventMapping_mouseenter);
  document.getElementById('id_UserTestCanvas').addEventListener("mousedown", eventMapping_mousedown);
  document.getElementById('id_UserTestCanvas').addEventListener("mouseup", eventMapping_mouseup);
  document.getElementById("id_UserTestCanvas").addEventListener("wheel", eventTestMapping_mousewheel);
}
