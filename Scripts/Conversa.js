"use strict";


 window.addEventListener("load", principal);

 function principal(){

    
    
}

function criaConversa(grupo){
    if (contactos.includes(grupo) && contactosInicial.includes(grupo)){
       var nomeGrupo =  document.getElementById("nomeGrupo").innerHTML = 
        '<img src="Resources/Avatars/'+grupo+'A.png" height="60"/> <p class = "nomeContacto">' + grupo + '</p>';
    } else{
        document.getElementById("nomeGrupo").innerHTML = 
        '<img src="Resources/Avatars/user.png" height="60"/>  <p class = "nomeContacto">' + grupo + '</p>';
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
    '<textarea placeholder="Escreva uma mensagem..." id="mensagemConversa" required></textarea>'+
    '<button type="submit" id="enviaMensagem" onclick="imprimeMensagem(`mensagemConversa`, `caixaConversa`)" style="height: 50px; width: 50px;"><img class="enviar" src="Resources/enviar.png"></button>'+
    '<button type="button" class="enviaFicheiros" onclick= "enviaFicheiro(`mensagemConversa`, `caixaConversa`,`anexo1.pdf`)" style="height: 50px; width: 50px;"><img class="ficheiros" src="Resources/anexo.png"></button>'+
    '</div>';
 
    a.replaceWith(newnode);
    criaConversa(nome)
    
}

$("#mensagemConversa").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#myButton").click();
    }
});



function adicionaLista(nomeGrupo){ 
    var grupo = document.createTextNode(nomeGrupo);
    var div = document.getElementById('grupos');
    var paragrafo = document.createElement("a");
    paragrafo.setAttribute('href',"");
    paragrafo.appendChild(grupo);
    div.appendChild(paragrafo);
}


function imprimeMensagem(id1,id2){  
    var mensagem=document.getElementById(id1).value;
    if (mensagem != ""){
        var resposta = document.createTextNode(mensagem);
        var div = document.getElementById(id2);
        var paragrafo = document.createElement("p");
        paragrafo.setAttribute("class", "paragrafo");
        paragrafo.appendChild(resposta);
        div.prepend(paragrafo);
        document.getElementById(id1).value = "";
    }  
    
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
    

