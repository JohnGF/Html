"use strict";


window.addEventListener("load", principal);

function principal(){
    criaConversa(baseDeDados[baseDeDados.length-1])
    
}

function criaConversa(grupo){
    document.getElementById("nomeGrupo").innerHTML = grupo["nomegrupo"]
    document.getElementById("participantes").innerHTML = grupo["participantes"]
    adicionaLista(grupo["nomegrupo"])

}
function adicionaLista(nomeGrupo){ 
    var grupo = document.createTextNode(nomeGrupo);
    var div = document.getElementById('grupos');
    var paragrafo = document.createElement("a");
    paragrafo.setAttribute('href',"");
    paragrafo.appendChild(grupo);
    div.appendChild(paragrafo);
}
    
