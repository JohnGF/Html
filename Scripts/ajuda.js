"use strict";

function resposta(num){
    var idResposta = "resposta" + num
    var div = document.getElementById(idResposta);
    if (div.hidden == true){
        div.hidden = false
    }
    else{
        div.hidden = true
    }
    var idPergunta = "pergunta" + num
    var div = document.getElementById(idPergunta);
    if (div.hidden == true){
        div.hidden = false
    }
    else{
        div.hidden = true
    }
}