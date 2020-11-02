const inputTarefa = document.getElementById('input_tarefa');
const adicionarTarefa = document.getElementById('adicionar_tarefa');
const listaDeTarefas = document.querySelector('.lista_de_tarefas > ul')
const iniciarTarefa = document.getElementById('iniciar_tarefa')
const configuracao = document.querySelector('.configuracao');
const executando = document.querySelector('.executando');
const inputTempo = document.getElementById('input_tempo')
const pausarResumir = document.getElementById('pausar_resumir');
const reiniciar = document.getElementById('reiniciar');
const tempoConfigurado = document.getElementById('tempoConfigurado')
const tempoRestante = document.getElementById('tempo_restante')
const wrapperAssistente = document.getElementById('wrapper-assistente')
const BotaoAssistente = document.getElementById('assistente')

let removerTarefa = document.querySelectorAll('.remover_tarefa');

adicionarTarefa.addEventListener('click', () => {
    let tarefa = inputTarefa.value
    let li = document.createElement('li')
    li.innerHTML = `${tarefa} <span class="remover_tarefa"><i class="uil uil-minus-circle"></i></span> `
    listaDeTarefas.appendChild(li)
    inputTarefa.value = ''
    removerTarefa = document.querySelectorAll('.remover_tarefa');
    removerTarefa.forEach(e => {
        e.addEventListener('click', (ev) => {
            ev.target.parentNode.parentNode.remove()
            console.log();
        })
    })
})

iniciarTarefa.addEventListener('click', () => {
    configuracao.style.display = 'none'
    executando.style.display = 'block'
    tempoConfigurado.innerHTML = `/ ${inputTempo.value}:0 Minutos`
    timer(inputTempo.value);
    let el = document.querySelector('.lista')
    let ul = listaDeTarefas.cloneNode(true)
    console.log(ul);
    el.append(ul)
})

function timer(m) {
    let s = 60
    let time = setInterval(() => {
        if (s == 0) {
            s = 59;
            m--;
        } else if (s <= 60) {
            s--;
        }
        tempoEncerrado();

        tempoRestante.innerHTML = `${m}:${s}`
    }, 1000)
    reiniciar.addEventListener('click', () => {
        clearInterval(time)
    })
    function tempoEncerrado() {
        if (m == 0 && s == 0) {
            clearInterval(time)
        }
    }
}


reiniciar.addEventListener('click', () => {
    configuracao.style.display = 'block'
    executando.style.display = 'none'
    document.querySelectorAll('.lista > ul > li').forEach(el => {
        el.remove();
    })
    // clearInterval(time)
})


BotaoAssistente.addEventListener('click', () =>{

    if(wrapperAssistente.hasAttribute('visible')){
        console.log('none');
        wrapperAssistente.style.display = 'none'
    }else{
        console.log('block');
        wrapperAssistente.style.display = 'block'
    }
    wrapperAssistente.toggleAttribute('visible')
})