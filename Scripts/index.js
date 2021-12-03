"use strict";

let grupos = {};
let contactos = [];

function principal(){
    if (localStorage.getItem('wasVisited' )== undefined){
        localStorage.setItem('wasVisited', false);
        localStorage.setItem('imagem', "EuMascA.png");
        adicionaGrupos();
        contactos = ["Carlos", "David", "Filipe", "Francisco", "João", "Joana", "Leonor", "Mafalda", "Maria", "Rui"]
        gravaHistorico()
        
    }else{
        localStorage.setItem('wasVisited', true);
    }
}

function adicionaGrupos(){
    grupos["Projeto IC"] = ["Carlos", "Francisco", "Leonor", "Mafalda"]
    grupos["Amigos"] = ["David", "Filipe", "Mafalda", "Maria"]
    grupos["Família"] = ["João", "Joana", "Rui"]
    grupos["IC002"] = ["Carlos", "David", "Leonor"]
}

function gravaHistorico() {
    localStorage.setItem("grupos", JSON.stringify(grupos));
    localStorage.setItem("contactos", JSON.stringify(contactos));
}


window.addEventListener("load", principal);