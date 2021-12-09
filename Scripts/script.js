"use strict";

const FORMULARIO_DADOS = "frmNovoGrupo";

const BOTAO_CRIAR_GRUPO = "botaoCriarGrupo";

const ITEM_DADOS = "baseDeDados";

const NOME_GRUPO = "name";

const PARTICIPANTES = "participante";

let formulario = null;

let nomegrupo;

let participantes;

let grupos = {};

let contactos;

let contactosInicial = ["Carlos", "David", "Filipe", "Francisco", "Joao", "Joana", "Leonor", "Mafalda", "Maria", "Rui"]

let imagem = localStorage.getItem('imagem')

let imagemVideo = localStorage.getItem('imagemVideo')

let avatar = localStorage.getItem('avatar')

let cam = "Resources/noCam.png";

let mic = "Resources/mic.png";

let audio = "Resources/audio.png";



function principal(){
    formulario = document.forms[FORMULARIO_DADOS];
    carregaHistorico();
    mostraContactos() 
    defineEventHandlersParaElementosHTML() 
      
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

function verificaInputs() {
    var ParticipantesGrupo = getChecked()    
    if(document.getElementById("inputNomeGrupo").value==""){ 
        document.getElementById('botaoCriarGrupo').disabled = true;
    } if ( ParticipantesGrupo == false) {
        document.getElementById('botaoCriarGrupo').disabled = true;
    } if (document.getElementById("inputNomeGrupo").value!="" && ParticipantesGrupo == true ) {
        document.getElementById('botaoCriarGrupo').disabled = false;
    }
}

function getChecked() {
    var selecionados = document.querySelectorAll('[name=participante]:checked');
    if( selecionados.length == 0){
        return false;
    }else{
        return true;
    }
  }

function verificaChecks() {
    var selecionados = document.querySelectorAll('[name=participante]:checked');
    if (selecionados.length > 0){
        verificaInputs()
    } else {
        document.getElementById('botaoCriarGrupo').disabled = true;
    }
}


function verificaDados(){
   

    obtemDados();
    let antigo = document.getElementById("alerta");
    if (nomegrupo == "") {
        let paragrafo = document.createElement("p");
        paragrafo.id = "alerta";
        paragrafo.innerHTML = "O grupo tem de ter um nome!";
        antigo.replaceWith(paragrafo);
        return 0;
    }

    if (participantes.length == 0) {
        let paragrafo = document.createElement("p");
        paragrafo.id = "alerta";
        paragrafo.innerHTML = "Não é possível criar um grupo sozinho!";
        antigo.replaceWith(paragrafo);
        return 0;
    }
    
    let dadosValidos = formulario.reportValidity();
    let dados = null;

    if(dadosValidos) { 
        
        dados = obtemDados();
        gravaHistoricoGrupos(dados);
        formulario.reset();
    }
    
    window.location.href = "ListaContactos.html";
}


function obtemDados() {
    nomegrupo = formulario.elements[NOME_GRUPO].value;
    participantes = adicionaParticipantes();
    grupos[nomegrupo] = participantes;

    return grupos;
}


function carregaHistorico() {
    grupos = JSON.parse(localStorage.getItem("grupos")) || {};
    contactos = JSON.parse(localStorage.getItem("contactos")) || [];
}


function criaContacto(){
    var nomeContacto = document.getElementById("inputNomeContacto").value
    gravaHistoricoContactos(nomeContacto);
    nomeContacto = ""
    document.getElementById("inputEmailContacto").value = ""
    window.location.href = "ListaContactos.html";
 } 
 
 
 function gravaHistoricoGrupos() {
     localStorage.setItem("grupos", JSON.stringify(grupos));
 }
 
 function gravaHistoricoContactos(nomeContacto) {
     contactos = JSON.parse(localStorage.getItem("contactos")) 
     contactos.push(nomeContacto)
     localStorage.setItem("contactos", JSON.stringify(contactos));
     
 }

function mostraContactos(){
    var funcionalidade;
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page == "ListaContactos.html"){
        funcionalidade = "Conversa"
    }else{
        funcionalidade = "Chamada"
    }
    adicionaGrupos(funcionalidade)
    adicionaContactos(funcionalidade)
}

function adicionaGrupos(funcionalidade){
    var div = document.getElementById('grupos');
    var elemento;
    for (var nome in grupos){
        elemento = document.createElement("div");
        var funcao = 'abre'+funcionalidade+'("'+nome+'")'
        elemento.setAttribute("id",nome)
        elemento.setAttribute('class',"elemento");
        elemento.setAttribute('onclick',funcao);
        elemento.innerHTML += '<img src="Resources/Avatars/user.png" height="40"/>  <p>' + nome + '</p>'
        div.appendChild(elemento);
    }
} 

function adicionaContactos(funcionalidade){
    var div = document.getElementById('contactos');
    var elemento;
    for (var nome in contactos){
        elemento = document.createElement("div");
        var funcao = 'abre'+funcionalidade+'("'+contactos[nome]+'")'
        elemento.setAttribute('class',"elemento");
        elemento.setAttribute('onclick',funcao);
        if(contactosInicial.includes(contactos[nome])){
            elemento.innerHTML += '<img src="Resources/Avatars/'+contactos[nome]+'A.png" height="40"/>  <p>' + contactos[nome] + '</p>'
        } else{
            elemento.innerHTML += '<img src="Resources/Avatars/user.png" height="40"/>  <p>' + contactos[nome] + '</p>'
        }
        div.appendChild(elemento);
    }
}

function verificaContacto() {
    var nomeContacto = document.getElementById("inputNomeContacto")
   if (nomeContacto.value != ""){
    document.getElementById('botaoCriarContacto').disabled = false;
   } else {
    document.getElementById('botaoCriarContacto').disabled = true;
   }
}


window.addEventListener("load", principal);