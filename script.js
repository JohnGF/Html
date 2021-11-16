
"use strict";

function imprimeMensagem(){  
    var mensagem=document.getElementById("mensagem").value;  
    var resposta = document.createTextNode(mensagem)
    var div = document.getElementById('chatBox');
    var paragrafo = document.createElement("p")
    paragrafo.setAttribute("class", "paragrafo")
    paragrafo.appendChild(resposta)
    div.prepend(paragrafo)
    document.getElementById("mensagem").value = ""    

    }
    


