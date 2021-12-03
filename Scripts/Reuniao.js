"use strict";

function abreChamada(nome){
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
    '<a '+ mudaMic + '><img class="function" src='+mic+'></a>'
    +'<a '+ mudaAudio + '><img class="function" src='+audio+'></a>'
    +'<a '+ mudaCamera + '><img id="cam" class="function" src='+cam+'></a>'+
    '<a onclick="abreChat()"><img class="function" src="Resources/chat.png"></a>'+
    '<a onclick="compartilhaTela()"><img class="function" src="Resources/sharescreen.png"></a>'+
    '<a id="nomeChamada" '+ detalhesOver + detalhesOut + '>'+nome+'</a>'+
    '<a href="IniciarReuniao.html" id = "leaveButton"><img class="function" src="Resources/leave.png"></a>'+
    '</div>';
    
    var div=document.createElement("div");
    div.id = "perfis"
    div.innerHTML = mostraAvatares(nome)
    newnode.appendChild(div)
    a.replaceWith(newnode);
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
    result += '<img src="Resources/Avatars/'+ avatar+'" height="40"/> Eu'
    return result;
}

function mostraAvatares(nome){

    var result = '';
    if (contactos.includes(nome)){
        if(contactosInicial.includes(nome)){
            result = '<img src="Resources/Avatars/'+nome+'Img.jpeg" height="400"/>'
        } else{
            result = '<img src="Resources/Avatars/user.png" height="400"/>'
        }
    } else{
        let part = grupos[nome];
        for(var cada in part){
            result += '<img src="Resources/Avatars/'+part[cada]+'Img.jpeg" height="200"/>' 
        }
        result += '<br>'
    }
    result += '<br>'
    result += '<div><img src="Resources/Avatars/'+ imagemAtiva+'" height="150"/></div>'
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
    }
}


function mudarCam(nome){    
    if (imagemAtiva == "EuMascA.png") {
        imagemAtiva = "EuMascImg.jpeg"
        cam = "Resources/cam.png"
        localStorage.setItem('imagem', imagemAtiva);

    } else {
        imagemAtiva = "EuMascA.png"
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
        audio = "Resources/Audio_mute.png"
    }
    abreChamada(nome)
}
