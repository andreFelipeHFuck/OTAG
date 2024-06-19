const barra1 = document.querySelector('#barra1');
const barra2 = document.querySelector('#barra2');
const barra3 = document.querySelector('#barra3');

const pergunta_texto = document.querySelector('.pergunta__texto');
const pergunta_imagem = document.querySelector('.pergunta__imagem');

const buttons = document.querySelectorAll('.button');
const formulario = document.querySelector('[data-form]');
const submit = document.querySelector('.resposta__submit');

const feedback = document.querySelector('.feedback');
const feedback_card = document.querySelector('.feedback__card');
const feedback_resposta = document.querySelector('.feedback__resposta');
const feedback_texto = document.querySelector('.feedback__texto');



let resposta;

let listaDePerguntas;

function escolhePergunta(perguntas){
    return perguntas[0];
}

function constroiPergunta(pergunta){
    pergunta_texto.innerHTML = pergunta.enunciado;
    pergunta_imagem.src = pergunta.url_imagem;

    buttons[0].innerHTML = pergunta.respostas[0];
    MathJax.typesetPromise([buttons[0]]).catch((err) => console.log(err.message));

    buttons[1].innerHTML = pergunta.respostas[1];
    MathJax.typesetPromise([buttons[1]]).catch((err) => console.log(err.message));

    buttons[2].innerHTML = pergunta.respostas[2];
    MathJax.typesetPromise([buttons[2]]).catch((err) => console.log(err.message));

    resposta = pergunta.resposta + 1;
}

fetch("dados.json").then((response) => {
    response.json().then((dados) =>{
        listaDePerguntas = dados.perguntas;
        console.log(listaDePerguntas[0]);
        constroiPergunta(listaDePerguntas[0]);
    })
})


function tocaSomAcerto(){
    document.querySelector('#som-acerto').play();
}

function tocaSomErro(){
    document.querySelector('#som-erro').play();
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const form_resposta = evento.target.querySelector('input[name="option"]:checked').value;

    if(Number(form_resposta) === resposta){
        submit.style.display = "none";
        feedback.style.display = "block";
        feedback_card.style.background = "var(--green-dark)";
        feedback_resposta.textContent = "Correto!"

        feedback_texto.innerHTML = 'O conjunto \\( A \\cap B  \\)'
        MathJax.typesetPromise([feedback_texto]).catch((err) => console.log(err.message));
        tocaSomAcerto();
    }else{
        submit.style.display = "none";
        feedback.style.display = "block";
        feedback_card.style.background = "var(--red)";
        feedback_resposta.textContent = "Errado!"

        feedback_texto.innerHTML = `A respota correta era \\( A \\cap B  \\)`
        MathJax.typesetPromise([feedback_texto]).catch((err) => console.log(err.message));
        tocaSomErro();
    }

    barra1.style.background = "var(--green)";

    console.log(form_resposta);
})