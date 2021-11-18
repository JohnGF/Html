
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


function imprimeMensagemChat(){  
    var mensagem=document.getElementById("mensagem").value;  
    var resposta = document.createTextNode(mensagem);
    var div = document.getElementById('chatBox');
    var paragrafo = document.createElement("p");
    paragrafo.setAttribute("class", "paragrafo");
    paragrafo.appendChild(resposta);
    div.prepend(paragrafo);
    document.getElementById("mensagem").value = "";    
}

function imprimeMensagemConversa(){  
    var mensagem=document.getElementById("mensagemConversa").value;  
    var resposta = document.createTextNode(mensagem);
    var div = document.getElementById('caixaConversa');
    var paragrafo = document.createElement("p");
    paragrafo.setAttribute("class", "paragrafo");
    paragrafo.appendChild(resposta);
    div.prepend(paragrafo);
    document.getElementById("mensagemConversa").value = "";    
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

