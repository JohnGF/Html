"use strict";

var acaoAudio = "Desligar Audio"
var acaoMic = "Desligar Mic"
var acaoCam = "Ligar Cam"
var acaoChat = "Chat"
var acaoPartilha = "Partilha Ecrã"


function abreChamada(nome){
    removeChat()
    nome = nome + ""
    var mudaCamera = 'onclick="mudarCam(`'+ nome + '`)"';
    var mudaMic = 'onclick="mudarMic(`'+ nome + '`)"';
    var mudaAudio = 'onclick="mudarAudio(`'+ nome + '`)"';
    var detalhesOver = 'onmouseover="abreDetalhes(`'+ nome + '`)"';
    var detalhesOut = 'onmouseout="abreDetalhes(`'+ nome + '`)"';
    const a=document.querySelector(".tdConversa");
    var newnode=document.createElement("td");
    newnode.className="chamada tdConversa"
    newnode.id="replaced";
    newnode.innerHTML='<div class="functions">'+
    '<a '+ mudaMic + ' onmouseover = "mostraFunc(`acaoMic`)" onmouseout = "mostraFunc(`acaoMic`)"><img class="function" src='+mic+'></a>'
    + '<p id="acaoMic" hidden>' + acaoMic +'</p>'
    +'<a '+ mudaAudio + 'onmouseover = "mostraFunc(`acaoAudio`)" onmouseout = "mostraFunc(`acaoAudio`)"><img class="function" src='+audio+'></a>'
    + '<p id="acaoAudio" hidden>' + acaoAudio +'</p>'
    +'<a '+ mudaCamera + ' onmouseover = "mostraFunc(`acaoCam`)" onmouseout = "mostraFunc(`acaoCam`)"><img id="cam" class="function" src='+cam+'></a>'+
    '<p id="acaoCam" hidden>' + acaoCam +'</p>'+
    '<a onclick="abreChat()" onmouseover = "mostraFunc(`acaoChat`)" onmouseout = "mostraFunc(`acaoChat`)" ><img class="function" src="Resources/chat.png"></a>'+
    '<p id="acaoChat" hidden>' + acaoChat +'</p>'+
    '<a onclick="compartilhaTela()" onmouseover = "mostraFunc(`acaoPartilha`)" onmouseout = "mostraFunc(`acaoPartilha`)" ><img class="function" src="Resources/sharescreen.png"></a>'+
    '<p id="acaoPartilha" hidden>' + acaoPartilha +'</p>'+
    '<a id="nomeChamada" '+ detalhesOver + detalhesOut + '>'+nome+'</a>'+
    '<a href="IniciarReuniao.html" id = "leaveButton"><img class="function" src="Resources/leave.png"></a>'+
    '</div>';
    
    var div=document.createElement("div");
    div.id = "perfis"
    div.className = "scroll"
    div.innerHTML = mostraAvatares(nome)
    newnode.appendChild(div)
    a.replaceWith(newnode);
    var chat = document.getElementById("chat");
    chat.hidden = true;
}

function mostraFunc(id){
    var elemento = document.getElementById(id);
    if (elemento.hidden == true) {
        elemento.hidden = false;
    } else {
        elemento.hidden = true;
    }
}

function criaDetalhes(nome,detalhes){
    let lista = mostraParticipantes(nome)
    var p = document.createElement("p");
    p.innerHTML = lista
    p.id = "divParticipantes"
    detalhes.appendChild(p)}

function abreDetalhes(nome){
    var detalhes = document.getElementById("detalhes");
    detalhes.innerHTML = ''
    if (detalhes.hidden == true) {
        detalhes.hidden = false;
    } else {
        detalhes.hidden = true;
    }
    criaDetalhes(nome,detalhes)
}

function mostraParticipantes(nome,img){
    var result = '';
    if (contactos.includes(nome)){
        if(contactosInicial.includes(nome)){
            result = '<img src="Resources/Avatars/'+nome+'A.png" height="40"/>' + nome+ '<br>' 
        } else{
            result = '<img src="Resources/Avatars/user.png" height="40"/>' + nome + '<br>' 
        }
    } else{
        let part = grupos[nome];
        for(var cada in part){
            result += '<img src="Resources/Avatars/'+part[cada]+'A.png" height="40"/> ' + part[cada]
            result += '<br>' 
        }  
    }
    result += '<img src="Resources/Avatars/'+ avatar +'" height="40"/> Eu'
    return result;
}

function mostraAvatares(nome){

    var result = '';
    if (contactos.includes(nome)){
        if(contactosInicial.includes(nome)){
            result = '<img src="Resources/Avatars/'+nome+'Img.jpeg" height="450"/>'
        } else{
            result = '<img src="Resources/Avatars/user.png" height="450"/>'
        }
    } else{
        let part = grupos[nome];
        for(var cada in part){            
            result += '<div class="cadaPart">'+'<img src="Resources/Avatars/'+part[cada]+'Img.jpeg" height="260"/> <span class="nomeParticipante">' + part[cada]+'</span></div>'
 
        }
        result += '<br>'
    }
    result += '<br>'
    result += '<div id="meuAvatar" ><img src="Resources/Avatars/'+ imagemAtiva+'" height="150"/></div>'
    return result;
}


function compartilhaTela() {
    if (document.getElementsByTagName("BODY")[0].style.border == "thick solid red") {
        document.getElementsByTagName("BODY")[0].style.border = "none"
    } else {
        document.getElementsByTagName("BODY")[0].style.border = "thick solid red"
        document.getElementsByTagName("BODY")[0].style.position = "absolute";
    }
}


function abreChat(){
    var chat = document.getElementById("chat");
    if (chat.hidden == true) {
        chat.hidden = false;
    } else {
        chat.hidden = true;
        //removeChat()
    }
    enviaEnterReuniao()
}

function removeChat() {
    var x = 0;
    var lista = document.getElementsByClassName("paragrafo")
    var len = document.getElementsByClassName("paragrafo").length
    
    while (x < len){
    lista[0].remove();
    x++
    }
  }

function mudarCam(nome){    
    if (imagemAtiva == "foto1.png") {
        imagemAtiva = "EuMascImg.jpeg"
        cam = "Resources/cam.png"
        localStorage.setItem('imagem', imagemAtiva);

    } else {
        imagemAtiva = "foto1.png"
        cam = "Resources/noCam.png"
        localStorage.setItem('imagem', imagemAtiva);
    }
    abreChamada(nome)
}

function mudarMic(nome){    
    if (mic == "Resources/Mute.png") {
        mic = "Resources/mic.png"

    } else {
        mic = "Resources/Mute.png"
    }
    abreChamada(nome)
}

function mudarAudio(nome){    
    if (audio == "Resources/audio_mute.png") {
        audio = "Resources/audio.png"

    } else {
        audio = "Resources/audio_mute.png"
    }
    abreChamada(nome)
}

function enviaEnterReuniao(){
    var input = document.getElementById("mensagem");
    input.addEventListener("keyup", function(event) {
        if(document.getElementById("mensagem").value === ""){
            return 0;
        }
        else{
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("enviarMensagem").disabled = false;
    document.getElementById("enviarMensagem").click();
    document.getElementById("mensagem").value = "";
    document.getElementById("enviarMensagem").disabled = true;
    }}
});
}