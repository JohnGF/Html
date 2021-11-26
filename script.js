
"use strict";

const FORMULARIO_DADOS = "frmNovoGrupo";

const BOTAO_CRIAR_GRUPO = "botaoCriarGrupo";

const ITEM_DADOS = "baseDeDados";

const NOME_GRUPO = "name";

const PARTICIPANTES = "participante";

let formulario = null;

let nomegrupo;

let participantes;

let baseDeDados = [];


window.addEventListener("load", principal);

function principal(){
    formulario = document.forms[FORMULARIO_DADOS];
    carregaHistorico();
    defineEventHandlersParaElementosHTML()    
}

function imprimeMensagem(id1,id2){  
    var mensagem=document.getElementById(id1).value;  
    var resposta = document.createTextNode(mensagem);
    var div = document.getElementById(id2);
    var paragrafo = document.createElement("p");
    paragrafo.setAttribute("class", "paragrafo");
    paragrafo.appendChild(resposta);
    div.prepend(paragrafo);
    document.getElementById(id1).value = "";    
}
    
function enviaFicheiro(id1,id2, nomeFicheiro){
    var resposta = document.createTextNode(nomeFicheiro);
    var div = document.getElementById(id2);
    var paragrafo = document.createElement("p");
    paragrafo.setAttribute("class", "paragrafo");
    paragrafo.setAttribute("id", "pdf");
    paragrafo.appendChild(resposta);
    div.prepend(paragrafo);
    document.getElementById(id1).value = "";
    var pdf = document.getElementById("pdf");
    pdf.innerHTML = '<img class="enviar" src="Resources/pdf.png"> ' + pdf.innerHTML;
}
    

function adicionaParticipantes(){

    var listaParticipantes = [];
    var pacote = document.querySelectorAll('[name=participante]:checked');
    
    for (var i = 0; i < pacote.length; i++){
        listaParticipantes.push(pacote[i].value)
    }

    return listaParticipantes;
}


function defineEventHandlersParaElementosHTML() {

    document.getElementById(BOTAO_CRIAR_GRUPO).
      addEventListener("click", verificaDados);
}

function verificaDados(){

    let dadosPorVerificar = obtemDados();

    if (nomegrupo == "") {
        return alert("O grupo tem de ter um nome")
    }

    if (participantes.length == 0) {
        return alert("Não é possível criar um grupo sozinho");
    }

    let dadosValidos = formulario.reportValidity();

    let dados = null;

    if(dadosValidos) {
        dados = obtemDados();
        gravaNoHistorico(dados);
        formulario.reset();
    }

    window.location.href = "Conversa.html";
}


function UserInfo(nomegrupo, participantes) {
    this.nomegrupo = nomegrupo;
    this.participantes = participantes;
}

function obtemDados() {

    nomegrupo = formulario.elements[NOME_GRUPO].value;
    participantes = adicionaParticipantes();
    
    return new UserInfo(nomegrupo, participantes);
}



function carregaHistorico() {

    // Converte o histórico guardado em formato JSON (JavaScript
    // Object Notation) no local storage do browser, para um objeto em memória.
    baseDeDados = JSON.parse(localStorage.getItem("novosGrupos")) || [];
  
    // A parte "|| []" em cima serve para garantir que o histórico 
    // em memória existe (como array), pois pode dar-se o caso de JSON.parse()
    // devolver null se for a primeira vez que executamos a aplicação.
}


/**
 * Grava o histórico de baseDeDados no local storage do browser.
 */

function gravaHistorico() {

    localStorage.setItem("novosGrupos", JSON.stringify(baseDeDados));
  }

/** 
 * Grava os dados do utilizador no histórico de baseDeDados.
 * 
 * @param {UserInfo} userInfo - Objeto com os dados do utilizador.
 */

function gravaNoHistorico(userInfo) {

    baseDeDados.push(userInfo);
    gravaHistorico();
}

function compartilhaTela() {
    document.getElementsByTagName("BODY")[0].style.border = "thick solid red";
}

function loadcontacto(){
   const a=document.querySelector(".logo");
   var newnode=document.createElement("td");
   newnode.className="chamada"
   newnode.id="replaced";
   newnode.innerHTML='<div class="functions">'+' <a href=""><img class="function" src="Resources/Mute.png"></a>'+'<a href=""><img class="function" src="Resources/audio_mute.png"></a>'
   +'<a href=""><img class="function" src="Resources/cam.png"></a>'+'<a href="Chat.html" onclick="abreChat()"><img class="function" src="Resources/chat.png"></a>'+
   '<a href="Chat.html" onclick="abreChat()"><img class="function" src="Resources/chat.png"></a>'+
   '<a onclick="compartilhaTela()"><img class="function" src="Resources/sharescreen.png"></a>'+
   '<a href="IniciarReuniao.html" id = "leaveButton"><img class="function" src="Resources/leave.png"></a>'+
   '</div>';

   a.replaceWith(newnode);
    console.log("funcionei");
}
