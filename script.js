var autoridadesExistem = [];
var estados = {
    estadoCh: false,
    estadoVch: false,
    estadoChgpg: false,
    estadoChgab: false,
    estadoAdj: false
}

function changeArrow(imgId, direction) {
    // função para mudar a seta
    var arrow = document.getElementById(imgId);
    arrow.classList.remove("seta");
    if (direction === "direita") {
        arrow.src = "icons\\direita.png";
    } else if (direction === "esquerda") {
        arrow.src = "icons\\esquerda.png";
    } else if (direction === "desceu") {
        arrow.src = "icons\\desceu.png";
    }

}

//função para mudar o estado da autoridade de ausente para presente e vice-versa
function changeEstado(estadoId) {
    var estado = document.getElementById(estadoId);
    if(estados[estadoId]===false) {
        estado.style.background = '#26a32e';
        estado.style.boxShadow = '0px 0px 6px 0 #47d751';
        estado.textContent = 'Presente';
        estados[estadoId] = !estados[estadoId];
    } else if (estados[estadoId]===true) {
        estado.style.background = '#d30000';
        estado.style.boxShadow = '0px 0px 6px 0 #ff0000';
        estado.textContent = 'Ausente';
        estados[estadoId] = !estados[estadoId];
    }
    
}

function showForm() {
    // função para exibir formulário
    var formContainer = document.getElementById('form-container');
    var autoridadeForm = document.getElementById('autoridade-form');
    autoridadeForm.style.display = 'block';
    formContainer.style.display = 'none';
}
                
function addAutoridade() {
    var nomeAutoridade = document.getElementById('nome-autoridade').value;

        // Verifique se o nome já existe no array
        if (autoridadesExistem.includes(nomeAutoridade)) {
            alert('Este nome de autoridade já foi adicionado.');
            return; // Não permita adicionar autoridades com o mesmo nome
        }
    
        // Adicione o nome à lista de autoridades existentes
        autoridadesExistem.push(nomeAutoridade);
        // Adicione o nome ao objeto de estados
        estados[nomeAutoridade] = false;

    // Verificar se o campo de nome está vazio
    if (nomeAutoridade.trim() === "") {
        alert("Por favor, insira o nome da autoridade antes de adicionar.");
        return; // Não adiciona se o nome estiver vazio
    }

    // Crie um novo elemento <span> para a autoridade
    var novoSpan = document.createElement('span');
    novoSpan.className = 'card'; // Aplicar a classe 'card' ao novo span
    
    // Conteúdo dentro do novo span
    novoSpan.innerHTML = `
        <img class='fotos' src="imagens\\homem-militar.png" alt="${nomeAutoridade}"><h3 class="nome1"> ${nomeAutoridade} </h3>
        <div class="div_btn">
            <button class="button1" data-direction="esquerda" onclick="changeArrow('${nomeAutoridade}-arrow', 'esquerda')">Esquerda</button>
            <button class="button1" data-direction="direita" onclick="changeArrow('${nomeAutoridade}-arrow', 'direita')">Direita</button>
            <button class="button1" data-direction="desceu" onclick="changeArrow('${nomeAutoridade}-arrow', 'desceu')">Desceu</button>
            <button class="buttondel button1" onclick="excluirAutoridade()">Excluir</button>
        </div>
        <div class="setaebotao">
            <img class='seta visitante-arrow' id="${nomeAutoridade}-arrow">
            <button class="estadoCardHtml" id="${nomeAutoridade}"
            onclick="changeEstado('${nomeAutoridade}')">
                Ausente
            </button>
        </div>`;

    // Adicione o novo span ao contêiner 'one'
    document.getElementById('one').appendChild(novoSpan);

    // Redefina o formulário e exiba o botão de adicionar novamente
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

function excluirAutoridade() {
    // função para excluir a autoridade adicionada
    var nomeAutoridade = document.getElementById('nome-autoridade').value;
    const container = document.getElementById('one');
    const lastChild = container.lastElementChild;
    container.removeChild(lastChild);

        // Verifique se o nome já existe no array e remove caso exista
        if (autoridadesExistem.includes(nomeAutoridade)) {
            // Remove o nome da lista de autoridades existentes
            autoridadesExistem.pop(nomeAutoridade);
            // Remove o nome do objeto de estados
            delete estados.nomeAutoridade
            alert(`${nomeAutoridade} removida com sucesso.`);
            return;
        }

}
