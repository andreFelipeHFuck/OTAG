const menu = document.querySelector('.menu');
const atividade = document.querySelector('.atividade');

const barras = document.querySelectorAll('.barra');

const pergunta_texto = document.querySelector('.pergunta__texto');
const pergunta_imagem = document.querySelector('.pergunta__imagem');

const buttons = document.querySelectorAll('.button');
const formulario = document.querySelector('[data-form]');
const submit = document.querySelector('.resposta__submit');

const feedback = document.querySelector('.feedback');
const feedback_card = document.querySelector('.feedback__card');
const feedback_resposta = document.querySelector('.feedback__resposta');
const feedback_texto = document.querySelector('.feedback__texto');
const feedback_link = document.querySelector('.feedback__link');

const conclusao = document.querySelector('.conclusao');
const conclusao_pontuacao = document.querySelector('.conclusao__pontuacao');
const conclusao_barras = document.querySelectorAll('.conclusao-barra');


let estado = 0;

let acertos = [false, false, false];

let resposta;

let listaDePerguntas;

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

async function lePerguntas(){
    try{

        const perguntas = [];

        const response = await fetch("dados.json");
        const dados = await response.json();

        dados.perguntas.forEach(item => {
            perguntas.push(item);
        });

        return perguntas;

    } catch (error){
        console.log("Erro ao carregar ou processar o arquivo JSON: ", error);
    }
}

function coloreBarras(){
    console.log(conclusao_barras);

    let cont = 0;
    for(let barra of conclusao_barras){
        console.log(barra);

        if(acertos[cont] === true){
            barra.style.background = "var(--green)"
        }else{
            barra.style.background = "var(--red)"
        }

        cont++;
    }
}

function calculaPontos(){
    let count = 0;

    for(let a of acertos){
        if(a === true){
            count++;
        }
    }

    return Number.parseInt((100 * count) / 3);
}

function listaDePerguntasAleatorios(){
    let i = listaDePerguntas.length;
    let j;
    let temp;

    while(--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = listaDePerguntas[j];
        listaDePerguntas[j] = listaDePerguntas[i];
        listaDePerguntas[i] = temp;
    }
}

function tocaSomAcerto(){
    document.querySelector('#som-acerto').play();
}

function tocaSomErro(){
    document.querySelector('#som-erro').play();
}

function tocaSomConclusao(){
    document.querySelector('#som-conclusao').play();
}


conclusao.style.display = "none";

listaDePerguntas =  await lePerguntas();
listaDePerguntasAleatorios();

constroiPergunta(listaDePerguntas[estado])

listaDePerguntas = listaDePerguntas.slice(0, 3);

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const form_resposta = evento.target.querySelector('input[name="option"]:checked').value;

    if(Number(form_resposta) === resposta){
        submit.style.display = "none";
        feedback.style.display = "block";
        feedback_card.style.background = "var(--green-dark)";
        feedback_resposta.textContent = "Correto!"

        feedback_texto.innerHTML = `O conjunto ${listaDePerguntas[estado].respostas[listaDePerguntas[estado].resposta]}`
        MathJax.typesetPromise([feedback_texto]).catch((err) => console.log(err.message));

        acertos[estado] = true;
        tocaSomAcerto();
    }else{
        submit.style.display = "none";
        feedback.style.display = "block";
        feedback_card.style.background = "var(--red)";
        feedback_resposta.textContent = "Errado!"

        feedback_texto.innerHTML = `A respota correta era ${listaDePerguntas[estado].respostas[listaDePerguntas[estado].resposta]}`
        MathJax.typesetPromise([feedback_texto]).catch((err) => console.log(err.message));

        acertos[estado] = false;
        tocaSomErro();
    }

    barras[estado].style.background = "var(--green)";
})

feedback_link.addEventListener('click', (evento) => {
    if(estado < 2){
        formulario.reset();
        estado++;
        console.log(listaDePerguntas[estado]);
        constroiPergunta(listaDePerguntas[estado]);
        console.log(estado);
        submit.style.display = "flex";
        feedback.style.display = "none";
    }else{
        atividade.style.display = "none";
        menu.style.display = "none";
        conclusao.style.display = "flex";


        conclusao_pontuacao.innerHTML = calculaPontos() + " XP";
        coloreBarras();

        tocaSomConclusao();

        console.log(acertos);
    }
})

