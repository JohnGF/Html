"use strict";

function abreChamada(nome){
    nome = nome + ""
    var mudaCamera = 'onclick="mudarCam(`'+ nome + '`)"';
    var mudaMic = 'onclick="mudarMic(`'+ nome + '`)"';
    var mudaAudio = 'onclick="mudarAudio(`'+ nome + '`)"';
    var detalhes = 'onclick="abreDetalhes(`'+ nome + '`)"';
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
    '<a id="nomeChamada" '+ detalhes + '>'+nome+'</a>'+
    '<a href="IniciarReuniao.html" id = "leaveButton"><img class="function" src="Resources/leave.png"></a>'+
    '</div>';
    
    var div=document.createElement("div");
    div.id = "perfis"
    div.innerHTML = mostraAvatares(nome)
    newnode.appendChild(div)
    a.replaceWith(newnode);
   
}

function abreDetalhes(nome){
    var div=document.createElement("div");
    newnode.className="chamada tdConversa"
    newnode.id="replaced";
}


function mostraAvatares(nome){

    var result = '';
    if (contactos.includes(nome)){
        result = '<img src="Resources/Avatars/'+nome+'Img.jpeg" height="400"/>'
    } else{
        let part = grupos[nome];
        for(var cada in part){
            result += '<img src="Resources/Avatars/'+part[cada]+'Img.jpeg" height="200"/>' 
        }
        result += '<br>'
    }
    result += '<br>'
    result += '<div><img src="Resources/Avatars/'+ imagemEscolhida+'" height="150"/></div>'
    return result;
}


function compartilhaTela() {
    if (document.getElementsByTagName("BODY")[0].style.border == "thick solid red") {
        document.getElementsByTagName("BODY")[0].style.border = "none"
    } else {
        document.getElementsByTagName("BODY")[0].style.border = "thick solid red"
    }
}


function abreChat(){
    var x = document.getElementById("chat");
    if (document.getElementById("chat").hidden == true) {
        document.getElementById("chat").hidden = false;
    } else {
        document.getElementById("chat").hidden = true;
    }
}


function mudarCam(nome){    
    if (imagemEscolhida == "EuMascA.png") {
        imagemEscolhida = "EuMascImg.jpeg"
        cam = "Resources/cam.png"
        localStorage.setItem('imagem', imagemEscolhida);

    } else {
        imagemEscolhida = "EuMascA.png"
        cam = "Resources/noCam.png"
        localStorage.setItem('imagem', imagemEscolhida);
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