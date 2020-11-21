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
const menuPrincipal = document.getElementById('__menu__principal')
const logoNav = document.getElementById('__logoNav')
const navLink = document.getElementsByClassName('nav-link');
let removerTarefa = document.querySelectorAll('.remover_tarefa');

// Muda a aparência do menu fixo ao rolar a página
window.onscroll = (e) => {
    if (pageYOffset > 0) {
        Array.from(navLink).forEach(element => {
            element.classList.remove('text-dark');
            element.classList.add('text-light');
        });
        logoNav.src = 'src/assets/logo-tarefa-feita-negativo.svg'
        logoNav.width = '160'
        menuPrincipal.classList.add('bg-primary', 'p-2')
        menuPrincipal.classList.remove('p-3')
    } else {
        Array.from(navLink).forEach(element => {
            element.classList.add('text-dark');
            element.classList.remove('text-light');
        });
        logoNav.src = 'src/assets/logo-tarefa-feita.svg'
        logoNav.width = '180'
        menuPrincipal.classList.remove('bg-primary', 'p-2')
        menuPrincipal.classList.add('p-3')
    }
    console.log(e);
}

// Assistente de foco

adicionarTarefa.addEventListener('click', () => {
    let tarefa = inputTarefa.value
    let li = document.createElement('li')
    let liClasses = ['list-group-item', 'list-group-item-dark', 'd-flex', 'justify-content-between', 'align-items-center']
    li.classList.add(...liClasses);
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
    let s = 0
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
BotaoAssistente.addEventListener('click', () => {
    if (wrapperAssistente.hasAttribute('visible')) {
        console.log('none');
        wrapperAssistente.style.display = 'none'
    } else {
        console.log('block');
        wrapperAssistente.style.display = 'block'
    }
    wrapperAssistente.toggleAttribute('visible')
})