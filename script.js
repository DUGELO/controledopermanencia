function changeArrow(imgId, direction) {
    // função para mudar a seta
    var arrow = document.getElementById(imgId);
    if (direction === "direita") {
        arrow.src = "direita.png";
    } else if (direction === "esquerda") {
        arrow.src = "esquerda.png";
    } else if (direction === "desceu") {
        arrow.src = "desceu.png";
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
    // código para adicionar autoridade   
    var nomeAutoridade = document.getElementById('nome-autoridade').value;

    // prosseguir com a adição da nova autoridade
    var novoCodigoHTML = '<span><h3>' + nomeAutoridade + ' <img id="' + nomeAutoridade + '-arrow\" src="direita.png" alt="imagem"></h3><button class="button1" data-direction="esquerda" onclick="changeArrow(\'' + nomeAutoridade + '-arrow\', this.getAttribute(\'data-direction\'))">Esquerda</button1><button class="button1" data-direction="direita" onclick="changeArrow(\'' + nomeAutoridade + '-arrow\', this.getAttribute(\'data-direction\'))">Direita</button><button class="button1" data-direction="desceu" onclick="changeArrow(\'' + nomeAutoridade + '-arrow\', this.getAttribute(\'data-direction\'))">Desceu</button><button class="buttondel" onclick="excluirAutoridade()">Excluir</button></span>';
    document.getElementById('pai').insertAdjacentHTML('beforeend', novoCodigoHTML);

    // redefinir o formulário
    document.getElementById("nome-autoridade").value = "";

    // exibir o botão de adicionar novamente
    document.getElementById("form-container").style.display = "block";

    // ocultar o formulário
    document.getElementById("autoridade-form").style.display = "none";
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
    const container = document.getElementById('pai');
    const lastChild = container.lastElementChild;
    container.removeChild(lastChild);
}
