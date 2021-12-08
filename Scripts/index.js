"use strict";

let grupos = {};
let contactos = [];

function principal(){
    if (localStorage.getItem('wasVisited' )== undefined){
        localStorage.setItem('wasVisited', false);
        localStorage.setItem('imagemEscolhida', "foto1.png");
        localStorage.setItem('imagem', "EuMascImg.jpeg");
        localStorage.setItem('avatar', "foto1.png");
        adicionaGrupos();
        contactos = ["Carlos", "David", "Filipe", "Francisco", "Joao", "Joana", "Leonor", "Mafalda", "Maria", "Rui"];
        localStorage.setItem("historicoProjetoIC" , "");
        localStorage.setItem("historicoAmigos" , "");
        localStorage.setItem("historicoFamília" , "");
        localStorage.setItem("historicoIC002" , "");
        
        for (let i = 0; i < contactos.length; i++){
            localStorage.setItem("historico" + contactos[i] , "");
        }
        gravaHistorico();
        
    }else{
        localStorage.setItem('wasVisited', true);
    }
}

function adicionaGrupos(){
    grupos["Projeto IC"] = ["Carlos", "Francisco", "Leonor", "Mafalda"]
    grupos["Amigos"] = ["David", "Filipe", "Mafalda", "Maria"]
    grupos["Família"] = ["Joao", "Joana", "Rui"]
    grupos["IC002"] = ["Carlos", "David", "Leonor"]
}

function gravaHistorico() {
    localStorage.setItem("grupos", JSON.stringify(grupos));
    localStorage.setItem("contactos", JSON.stringify(contactos));
}


window.addEventListener("load", principal);

