var autoridadesExistem = [];
var setas = {
    estadoCh: "", // "direita", "esquerda" ou "desceu"
    estadoVch: "",
    estadoChgpg: "",
    estadoChgab: "",
    estadoAdj: ""
};

var estados = {
    estadoCh: false,
    estadoVch: false,
    estadoChgpg: false,
    estadoChgab: false,
    estadoAdj: false
}
var direcoes = {};

function changeArrow(imgId, direction) {
    var arrow = document.getElementById(imgId);
    arrow.classList.remove("seta");

    if (direction === "direita") {
        arrow.src = "icons\\direita.png";
    } else if (direction === "esquerda") {
        arrow.src = "icons\\esquerda.png";
    } else if (direction === "desceu") {
        arrow.src = "icons\\desceu.png";
    }

    // Salva a direção da seta
    direcoes[imgId] = direction;  // Salva o valor da direção
    console.log("Direção salva para", imgId, ":", direction);  // Log de depuração

    salvarEstadoNoLocalStorage();
}



//função para mudar o estado da autoridade de ausente para presente e vice-versa
function changeEstado(botaoId) {
    
    const botao = document.getElementById(botaoId);
    const card = botao.closest('.card');
    const imagem = card.querySelector('.fotos');
    const nome = card.querySelector('h3').textContent.trim();

    // Alterna o estado
    estados[botaoId] = !estados[botaoId];
    const presente = estados[botaoId];
    
    console.log("estado do : " + nome + " é : " + presente);

    // Atualiza texto
    botao.textContent = presente ? "Presente" : "Ausente";

    // Aplica a classe "presente" se for o caso
    if (presente) {
        botao.classList.add("presente");

    } else {
        botao.classList.remove("presente");
    }

    // Atualiza a imagem se necessário
    
    if (imagem) {
        imagem.classList.toggle("preto-e-branco", !presente);
    }
    
    // Salva no localStorage
    salvarEstadoNoLocalStorage();
};






function showForm() {
    // função para exibir formulário
    var formContainer = document.getElementById('form-container');
    var autoridadeForm = document.getElementById('autoridade-form');
    autoridadeForm.style.display = 'block';
    formContainer.style.display = 'none';
}
                
function addAutoridade() {
    const nome = document.getElementById('nome-autoridade').value.trim();
    if (!nome) {
        alert("Por favor, insira o nome da autoridade.");
        return;
    }
    if (autoridadesExistem.includes(nome)) {
        alert("Autoridade já adicionada.");
        return;
    }

    criarCardAutoridade(nome);
    salvarEstadoNoLocalStorage();

    document.getElementById('nome-autoridade').value = '';
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('autoridade-form').style.display = 'none';
}



function cancelar() {
    // redefinir o formulário
    document.getElementById("nome-autoridade").value = "";

    // exibir o botão de adicionar novamente
    document.getElementById("form-container").style.display = "block";

    // ocultar o formulário
    document.getElementById("autoridade-form").style.display = "none";
}

function excluirAutoridade(botao) {
    // Subir até o elemento .card (pai do botão)
    const card = botao.closest('.card');

    // Pega o nome da autoridade (exibido no h3)
    const nomeAutoridade = card.querySelector('h3').textContent.trim();

    // Remove do DOM
    card.remove();

    // Remove do array de autoridades existentes
    const index = autoridadesExistem.indexOf(nomeAutoridade);
    if (index > -1) {
        autoridadesExistem.splice(index, 1);
    }

    // Remove do objeto de estados
    delete estados[nomeAutoridade];

    // Atualiza localStorage
    salvarEstadoNoLocalStorage();

    alert(`${nomeAutoridade} removida com sucesso.`);
}


// Salvar estado e direção das autoridades
function salvarEstadoNoLocalStorage() {
    const dados = {
        autoridades: autoridadesExistem,
        estados: estados,
        direcoes: direcoes
    };
    localStorage.setItem("autoridadesSalvas", JSON.stringify(dados));
}


// Carregar os dados salvos ao abrir a página
window.onload = function () {
    const dados = localStorage.getItem("autoridadesSalvas");
    if (dados) {
        const { autoridades, estados: estadosSalvos, direcoes: direcoesSalvas } = JSON.parse(dados);

        autoridadesExistem = autoridades;
        Object.assign(estados, estadosSalvos);
        Object.assign(direcoes, direcoesSalvas);

        autoridades.forEach(nome => criarCardAutoridade(nome));
    }

    // Aplica preto-e-branco e estilos conforme estado
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const botao = card.querySelector('.estadoCardHtml');
        const imagem = card.querySelector('.fotos');
        const nome = card.querySelector('h3').textContent.trim();
        const presente = estados[nome];

        if (botao && imagem) {
            imagem.classList.toggle("preto-e-branco", !presente);
            aplicarEstilosEstado(nome, presente);
        }

        const arrow = card.querySelector('img.seta');
        if (arrow && direcoes[`${nome}-arrow`]) {
            arrow.src = `icons\\${direcoes[`${nome}-arrow`]}.png`;
        }
    });
};





function aplicarEstilosEstado(id, presente) {
    const botao = document.getElementById(id);
    const card = botao?.closest('.card');
    const imagem = card?.querySelector('.fotos');

    if (!botao) return;

    botao.textContent = presente ? "Presente" : "Ausente";

    if (presente) {
        botao.classList.add("presente");
    } else {
        botao.classList.remove("presente");
    }

    if (imagem) {
        imagem.classList.toggle("preto-e-branco", !presente);
    }
};




function criarCardAutoridade(nomeAutoridade) {
    // Verifica se já existe visualmente no DOM
    if (document.getElementById(nomeAutoridade)) return;

    if (!autoridadesExistem.includes(nomeAutoridade)) {
        autoridadesExistem.push(nomeAutoridade);
    }

    estados[nomeAutoridade] = estados[nomeAutoridade] || false;

    var novoSpan = document.createElement('span');
    novoSpan.className = 'card';
    
    novoSpan.innerHTML = `
        <img class='fotos' src="imagens\\homem-militar.png" alt="${nomeAutoridade}">
        <h3 class="nome1">${nomeAutoridade}</h3>
        <div class="div_btn">
            <button class="button1" onclick="changeArrow('${nomeAutoridade}-arrow', 'esquerda')">Esquerda</button>
            <button class="button1" onclick="changeArrow('${nomeAutoridade}-arrow', 'direita')">Direita</button>
            <button class="button1" onclick="changeArrow('${nomeAutoridade}-arrow', 'desceu')">Desceu</button>
            <button class="buttondel button1" onclick="excluirAutoridade(this)">Excluir</button>
        </div>
        <div class="setaebotao">
            <img class='seta visitante-arrow' id="${nomeAutoridade}-arrow">
            <button class="estadoCardHtml" id="${nomeAutoridade}" onclick="changeEstado('${nomeAutoridade}')">
                ${estados[nomeAutoridade] ? 'Presente' : 'Ausente'}
            </button>
        </div>`;

    document.getElementById('one').appendChild(novoSpan);

    aplicarEstilosEstado(nomeAutoridade, estados[nomeAutoridade]);
}

window.onload = function () {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const botao = card.querySelector('.estadoCardHtml');
        const imagem = card.querySelector('.fotos');

        if (botao && imagem) {
            // Força o estado inicial como "Ausente"
            botao.textContent = "Ausente";
            imagem.classList.add("preto-e-branco");
        }
    });
};
