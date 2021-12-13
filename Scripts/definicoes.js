"use strict";
var slideIndex = 1;
const masculino = ["foto1.png","foto2.png","foto3.png"]
const feminino = ["foto4.png","foto5.png","foto6.png"]

function principal(){
    var fotoAtual = localStorage.getItem('avatar')
    document.getElementById('fotoAtual').src = "Resources/Avatars/"+ fotoAtual
}

function abreForm(id){
    var form = document.getElementById(id);
    var div = document.getElementById("abre" + id);

    if (form.hidden == true){
        form.hidden = false
        div.hidden = true

    }
    else{
        form.hidden = true
        div.hidden = false
    }
    if(id == "formFoto"){
        showSlides(slideIndex);
    }
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}


function mudarFoto(nome){
    localStorage.setItem("avatar", nome)
    principal()
    abreForm("formFoto")
    if(masculino.includes(nome)){
        localStorage.setItem('imagem', "EuMascImg.jpeg");
        localStorage.setItem('imagemVideo', nome);
    } else{
        localStorage.setItem('imagem', "EuFemImg.jpeg");
        localStorage.setItem('imagemVideo', nome);

    }
}

window.addEventListener("load", principal);