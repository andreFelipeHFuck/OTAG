const formulario = document.querySelector('[data-form]');
const submit = document.querySelector('.resposta__submit');
const feedback = document.querySelector('.feedback');
const feedback_card = document.querySelector('.feedback__card');
const feedback_resposta = document.querySelector('.feedback__resposta');
const feedback_texto = document.querySelector('.feedback__texto');

const resposta = 3;


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
        console.log("Errou!");
        submit.style.display = "none";
        feedback.style.display = "block";
        feedback_card.style.background = "var(--red)";
        feedback_resposta.textContent = "Errado!"

        feedback_texto.innerHTML = `A respota correta era \\( A \\cap B  \\)`
        MathJax.typesetPromise([feedback_texto]).catch((err) => console.log(err.message));
        tocaSomErro();
    }

    console.log(form_resposta);
})