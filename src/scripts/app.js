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
        menuPrincipal.classList.add('bg-primary', 'pt-2', 'pt-2')
        menuPrincipal.classList.remove('p-3')
        document.getElementById('__toggleIcon').classList.add('text-light')
    } else {
        Array.from(navLink).forEach(element => {
            element.classList.add('text-dark');
            element.classList.remove('text-light');
        });
        logoNav.src = 'src/assets/logo-tarefa-feita.svg'
        logoNav.width = '180'
        menuPrincipal.classList.remove('bg-primary', 'pt-2', 'pt-2')
        menuPrincipal.classList.add('p-3')
        document.getElementById('__toggleIcon').classList.remove('text-light')
    }
    // console.log(e);
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
            // console.log();
        })
    })
})


iniciarTarefa.addEventListener('click', () => {
    configuracao.style.display = 'none'
    executando.style.display = 'block'
    tempoConfigurado.innerHTML = `/ ${formatarNum(inputTempo.value)}:00 Minutos`


    //Configurar o timer 
    cronometro.tempo = inputTempo.value * 60
    cronometro.iniciar()

    let el = document.querySelector('.lista')
    let ul = listaDeTarefas.cloneNode(true)
    // console.log(ul);
    el.append(ul)
})




function formatarNum(num) {
    return num <= 9 ? '0' + num : num
}


class Cronometro {
    constructor({ tempo }) {
        this.tempo = tempo

    }
}


var cronometro = {

    tempo: 0,
    minuto: 0,
    segundo: 0,
    iniciar: function () {



        var t = setInterval(() => {
            this.tempo--
            this.minuto = Math.floor(this.tempo / 60)
            this.segundo = this.tempo % 60

            // console.log(`${formatarNum(this.minuto)}:${formatarNum(this.segundo)}`)
            tempoRestante.innerHTML = `${formatarNum(this.minuto)}:${formatarNum(this.segundo)}`

            this.fim(this.tempo, t)
            this.parar(this.tempo, t)
            this.pausar(this.tempo, t)

        }, 1000);
    },
    fim: function (tempo, timer) {
        this.tempo == 0 ? clearTimeout(timer) : null
    },
    parar: function (tempo, timer) {


        reiniciar.addEventListener('click', () => {
            clearTimeout(timer)
            configuracao.style.display = 'block'
            executando.style.display = 'none'
            document.querySelectorAll('.lista > ul > li').forEach(el => {
                el.remove();
            })

        })

    },
    pausar: function (tempo, timer) {

        pausarResumir.addEventListener('click', () => {


            pausarResumir.classList.toggle('paused')

            if (pausarResumir.classList.contains('paused')) {
                clearTimeout(timer)
                localStorage.setItem('cronometro_pausado', tempo);
                console.log('paused');
            } else {
                localStorage.removeItem('cronometro_pausado', tempo);
                this.tempo = localStorage.getItem('cronometro_pausado');
                this.iniciar();
            }


        });

    }

};

// Secao de Favoritos

function botaofav() {
    fetch('src/scripts/data.json').then(res => {
        return res.json();
    }).then(data => {
        let codigo_html = '';
        data.forEach((e) => {
            for (i = 0; i <= corrente.fav.length; i++) {
                if (corrente.fav[i] == e.id) {
                    codigo_html += `<div class="col-12 col-sm-12 col-md-12 col-lg-6"><h3 class="iteize">${e.title}</h3></div>
                                    <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                                    <img src="${e.thumbnail}" class="card-img-top" alt="${e.title}">
                                    </div>`;
                }
            }
        });
        $('#bodyangels').html(codigo_html)
    });
}
