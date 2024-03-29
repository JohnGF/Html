"use strict";

var historicoMensagens = [];
var pagAtual;
var pagAnterior;
var localEnviaFicheiro1;
var localEnviaFicheiro2;

function criaConversa(grupo){
    if (contactos.includes(grupo) && contactosInicial.includes(grupo)){
        document.getElementById("nomeGrupo").innerHTML = 
        '<img src="Resources/Avatars/'+grupo+'A.png" height="60"/> ' + grupo
    } else{
        document.getElementById("nomeGrupo").innerHTML = 
        '<img src="Resources/Avatars/user.png" height="60"/> ' + grupo
    }
}

function abreConversa(nome){
    nome = nome + "";
    const a=document.querySelector(".tdConversa");
    var reuniao = 'onclick="abreChamada(`'+ nome + '`)"';
    var detalhesOver = 'onmouseover="abreDetalhes(`'+ nome + '`)"';
    var detalhesOut = 'onmouseout="abreDetalhes(`'+ nome + '`)"';
    var newnode=document.createElement("td");
    newnode.className="barraGrupo"
    newnode.id="replaced";
    newnode.className="tdConversa"
    newnode.innerHTML=
    '<div class="descricaoGrupo">'+
    '<div id="nomeGrupo"></div>' +
    '<img '+ reuniao + 'id="videocall" src="Resources/videocall.png" height="60"/>  '+
    '<img '+ detalhesOver + detalhesOut + 'id="more" src="Resources/grupos.png" height="60"/>  '+
    '</div><div id = "conversa">'+
    '<div id = "caixaConversa" class="scroll"></div>'+
    '<textarea placeholder="Escreva uma mensagem..."  onkeyup="verificaChatConversa()" id="mensagemConversa"></textarea>'+
    '<button id="enviaMensagem" disabled onclick="imprimeMensagem(`mensagemConversa`, `caixaConversa`, `enviaMensagem`, true)" style="height: 50px; width: 50px;"><img class="enviar" src="Resources/enviar.png"></button>'+
    '<button type="button" class="enviaFicheiros" onclick= "toggleEscolha(`mensagemConversa`, `caixaConversa`)" style="height: 50px; width: 50px;"><img class="ficheiros" src="Resources/anexo.png"></button>'+
    '</div>';
    a.replaceWith(newnode);
    criaConversa(nome);
    enviaEnterConversa()

    if (localStorage.getItem("paginaAtual") != localStorage.getItem("paginaAnterior")){
        historicoMensagens = [];
    }
    if (localStorage.getItem("paginaAtual") != null){ 
        definePagAnterior(localStorage.getItem("paginaAtual"))
    }
    definePagAtual(nome);
    historicoMensagens.push(localStorage.getItem("historico"+pagAtual));
    carregaMensagens(pagAtual);
}

function definePagAtual(pagina){
    pagAtual = pagina;
    localStorage.setItem("paginaAtual",pagAtual)
}

function definePagAnterior(pagina){
    pagAnterior = pagina;
    localStorage.setItem("paginaAnterior",pagAnterior)
}


function adicionaLista(nomeGrupo){ 
    var grupo = document.createTextNode(nomeGrupo);
    var div = document.getElementById('grupos');
    var paragrafo = document.createElement("a");
    paragrafo.setAttribute('href',"");
    paragrafo.appendChild(grupo);
    div.appendChild(paragrafo);
}


function imprimeMensagem(id1,id2, botao, guarda){ 
    
    var mensagem=document.getElementById(id1).value;
    if (mensagem != " "){
        var resposta = document.createTextNode(mensagem);
        var div = document.getElementById(id2);
        var paragrafo = document.createElement("p");
        paragrafo.setAttribute("class", "paragrafo");
        paragrafo.appendChild(resposta);
        div.prepend(paragrafo);
        document.getElementById(id1).value = "";
        document.getElementById(botao).disabled=true; 
        if (guarda){
        historicoMensagens.push(  
            document.getElementsByClassName("paragrafo")[0].innerHTML
        )
        localStorage.setItem("historico"+pagAtual, historicoMensagens);
        } 
    }
}


function verificaChatConversa(){
    
    if(document.getElementById("mensagemConversa").value==="") { 
        document.getElementById('enviaMensagem').disabled = true; 
    } else { 
        document.getElementById('enviaMensagem').disabled = false;
    }
}

function verificaChatReuniao(){
    
    if(document.getElementById("mensagem").value==="") { 
        document.getElementById('enviarMensagem').disabled = true; 
    } else { 
        document.getElementById('enviarMensagem').disabled = false;
    }
}


function verificaConversa(){
    if (document.getElementById("mensagemConversa").value != ""){
        document.getElementById("enviarMensagem1").disabled=false;        
    } 
}
    

function enviaFicheiro(){
    let nomeFicheiro = escolherFicheiro()
    var resposta = document.createTextNode(nomeFicheiro);
    var div = document.getElementById(localEnviaFicheiro2);
    var paragrafo = document.createElement("p");
    paragrafo.setAttribute("class", "paragrafo");
    paragrafo.setAttribute("id", "pdf");
    paragrafo.appendChild(resposta);
    div.prepend(paragrafo);
    document.getElementById(localEnviaFicheiro1).value = "";
    var pdf = document.getElementById("pdf");
    pdf.innerHTML = '<img class="enviar" src="Resources/pdf.png"> ' + pdf.innerHTML;
    historicoMensagens.push(nomeFicheiro +".pdf") 
    localStorage.setItem("historico"+pagAtual, historicoMensagens);
    toggleEscolha()

}

function toggleEscolha(id1,id2){
    
    var escolha = document.getElementById("escolhaFicheiro");
    if (escolha.hidden == true) {
        escolha.hidden = false;
    } else {
        escolha.hidden = true;
    }
    localEnviaFicheiro1 = id1
    localEnviaFicheiro2 = id2
}

function escolherFicheiro(){
    let elemento = document.getElementsByName('ficheiro');
    for(let i = 0; i < elemento.length; i++) {
        if(elemento[i].checked){
            return elemento[i].value;
        }
    }
}

function clicaFicheiro(id){
    let elemento = document.getElementById(id);
   elemento.checked = true;
}


function clicaParticipante(id){
    let elemento = document.getElementById(id);
    if (elemento.checked){
        elemento.checked = false;
    } else {
        elemento.checked = true;
    }
    
}


function enviaEnterConversa(){
    var input = document.getElementById("mensagemConversa");
    input.addEventListener("keyup", function(event) {
        if(document.getElementById("mensagemConversa").value == ""){}
        else{
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("enviaMensagem").disabled = false;
    document.getElementById("enviaMensagem").click();
    document.getElementById("mensagemConversa").value = "";
    document.getElementById("enviaMensagem").disabled = true;
    }}
});
}


function carregaMensagens(pag){
    var mensagens =  localStorage.getItem("historico"+pag);


    if (mensagens != null){

       var mensagensSeparadas = mensagens.split(",");
    
        for(var i = 0; i < mensagensSeparadas.length; i++){

            if (mensagensSeparadas[i] != ""){
            var resposta = document.createTextNode(mensagensSeparadas[i]);
            var paragrafo = document.createElement("p");
            paragrafo.setAttribute("class", "paragrafo");
            paragrafo.appendChild(resposta);
            document.getElementById("caixaConversa").prepend(paragrafo);
            }
        }
    }
}


