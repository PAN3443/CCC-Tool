function checkSettingInputKey(event){

  checkInputVal(document.getElementById(event.target.id),true,false);

  if (event.keyCode == 13) {
    switch (event.target.id) {
      case "id_cielab_refX_Input":
        cielab_ref_X = parseFloat(event.target.value);
        break;
      case "id_cielab_refY_Input":
        cielab_ref_Y = parseFloat(event.target.value);
        break;
      case "id_cielab_refZ_Input":
        cielab_ref_Z = parseFloat(event.target.value);
        break;
      case "id_din99_k_E_Input":
        din99_kE = parseFloat(event.target.value);
        break;
      case "id_din99_k_CH_Input":
        din99_kCH = parseFloat(event.target.value);
        break;
      case "id_de94_k_L_Input":
        de94_k_L = parseFloat(event.target.value);
        break;
      case "id_de94_k_C_Input":
        de94_k_C = parseFloat(event.target.value);
        break;
      case "id_de94_k_H_Input":
        de94_k_H = parseFloat(event.target.value);
        break;
      case "id_de94_k_1_Input":
        de94_k_1 = parseFloat(event.target.value);
        break;
      case "id_de94_k_2_Input" :
        de94_k_2 = parseFloat(event.target.value);
        break;
      case "id_de2000_k_L_Input":
        de2000_k_L = parseFloat(event.target.value);
        break;
      case "id_de2000_k_C_Input":
        de2000_k_C = parseFloat(event.target.value);
        break;
      case "id_de2000_k_H_Input":
        de2000_k_H = parseFloat(event.target.value);
        break;
      default:
    }
  }
}

function checkSettingInputChange(event){

  checkInputVal(document.getElementById(event.target.id),true,false);

    switch (event.target.id) {
      case "id_cielab_refX_Input":
        cielab_ref_X = parseFloat(event.target.value);
        break;
      case "id_cielab_refY_Input":
        cielab_ref_Y = parseFloat(event.target.value);
        break;
      case "id_cielab_refZ_Input":
        cielab_ref_Z = parseFloat(event.target.value);
        break;
      case "id_din99_k_E_Input":
        din99_kE = parseFloat(event.target.value);
        break;
      case "id_din99_k_CH_Input":
        din99_kCH = parseFloat(event.target.value);
        break;
      case "id_de94_k_L_Input":
        de94_k_L = parseFloat(event.target.value);
        break;
      case "id_de94_k_C_Input":
        de94_k_C = parseFloat(event.target.value);
        break;
      case "id_de94_k_H_Input":
        de94_k_H = parseFloat(event.target.value);
        break;
      case "id_de94_k_1_Input":
        de94_k_1 = parseFloat(event.target.value);
        break;
      case "id_de94_k_2_Input" :
        de94_k_2 = parseFloat(event.target.value);
        break;
      case "id_de2000_k_L_Input":
        de2000_k_L = parseFloat(event.target.value);
        break;
      case "id_de2000_k_C_Input":
        de2000_k_C = parseFloat(event.target.value);
        break;
      case "id_de2000_k_H_Input":
        de2000_k_H = parseFloat(event.target.value);
        break;
      default:

    }

}

function updateAllSetting(){
  cielab_ref_X = parseFloat(document.getElementById("id_cielab_refX_Input").value);
  cielab_ref_Y = parseFloat(document.getElementById("id_cielab_refY_Input").value);
  cielab_ref_Z = parseFloat(document.getElementById("id_cielab_refZ_Input").value);
  din99_kE = parseFloat(document.getElementById("id_din99_k_E_Input").value);
  din99_kCH = parseFloat(document.getElementById("id_din99_k_CH_Input").value);
  de94_k_L = parseFloat(document.getElementById("id_de94_k_L_Input").value);
  de94_k_C = parseFloat(document.getElementById("id_de94_k_C_Input").value);
  de94_k_H = parseFloat(document.getElementById("id_de94_k_H_Input").value);
  de94_k_1 = parseFloat(document.getElementById("id_de94_k_1_Input").value);
  de94_k_2 = parseFloat(document.getElementById("id_de94_k_2_Input").value);
  de2000_k_L = parseFloat(document.getElementById("id_de2000_k_L_Input").value);
  de2000_k_C = parseFloat(document.getElementById("id_de2000_k_C_Input").value);
  de2000_k_H = parseFloat(document.getElementById("id_de2000_k_H_Input").value);
}

function updateSettingInputFields(){
  document.getElementById("id_cielab_refX_Input").value=cielab_ref_X;
  document.getElementById("id_cielab_refY_Input").value=cielab_ref_Y;
  document.getElementById("id_cielab_refZ_Input").value=cielab_ref_Z;
  document.getElementById("id_din99_k_E_Input").value=din99_kE;
  document.getElementById("id_din99_k_CH_Input").value=din99_kCH;
  document.getElementById("id_de94_k_L_Input").value=de94_k_L;
  document.getElementById("id_de94_k_C_Input").value=de94_k_C;
  document.getElementById("id_de94_k_H_Input").value=de94_k_H;
  document.getElementById("id_de94_k_1_Input").value=de94_k_1;
  document.getElementById("id_de94_k_2_Input").value=de94_k_2;
  document.getElementById("id_de2000_k_L_Input").value=de2000_k_L;
  document.getElementById("id_de2000_k_C_Input").value=de2000_k_C;
  document.getElementById("id_de2000_k_H_Input").value=de2000_k_H;
}
