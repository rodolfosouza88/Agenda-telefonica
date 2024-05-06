const form = document.getElementById('form-agenda');
const tabelaContatos = document.querySelector('table tbody');
const nome = [];
const telefone = [];

// Carrega os contatos salvos quando a página é carregada
window.onload = function() {
    carregarContatosSalvos();
};

form.addEventListener('submit', function (e) {
    e.preventDefault(); 

    adicionaContato();
});

function adicionaContato() {
    const inputNome = document.getElementById('nome');
    const inputTelefone = document.getElementById('telefone');

    if (nome.includes(inputNome.value)) {
        alert(`Contato "${inputNome.value}" já foi inserido.`);
    } else if (telefone.includes(inputTelefone.value)) {
        alert(`Telefone "${inputTelefone.value}" já foi inserido.`);
    } else
        nome.push(inputNome.value);
        telefone.push(inputTelefone.value);

        let novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${inputNome.value}</td>
            <td>${inputTelefone.value}</td>
            <td><button onclick="apagarContato(this)">Apagar</button></td> <!-- Botão Apagar -->
        `;

        tabelaContatos.appendChild(novaLinha);

        // Salva o novo contato localmente
        salvarContatoLocalmente(inputNome.value, inputTelefone.value);
    }

    inputNome.value = '';
    inputTelefone.value = '';

    //Função para formatar telefone
function formatarTelefone(input) {
    // Remove todos os caracteres que não são dígitos
    const telefone = input.value.replace(/\D/g, '');

    // Verifica se o telefone tem pelo menos 5 dígitos e insere o hífen após os 4 primeiros dígitos
    if (telefone.length >= 5) {
        input.value = `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)}-${telefone.substring(7)}`;
    } else {
        // Se o telefone ainda não tem 5 dígitos, exibe apenas os números digitados até agora
        input.value = `(${telefone.substring(0, 2)}) ${telefone.substring(2)}`;
    }
}

function salvarContatoLocalmente(nome, telefone) {
    if (typeof(Storage) !== "undefined") {
        let contatosSalvos = JSON.parse(localStorage.getItem("contatos")) || [];
        contatosSalvos.push({ nome: nome, telefone: telefone });
        localStorage.setItem("contatos", JSON.stringify(contatosSalvos));
    } else {
        alert("Seu navegador não suporta armazenamento local. Os contatos não serão salvos.");
    }
}

function carregarContatosSalvos() {
    if (localStorage.getItem("contatos")) {
        let contatosSalvos = JSON.parse(localStorage.getItem("contatos"));
        contatosSalvos.forEach(function(contato) {
            let novaLinha = document.createElement('tr');
            novaLinha.innerHTML = `
                <td>${contato.nome}</td>
                <td>${contato.telefone}</td>
                <td><button onclick="apagarContato(this)">Apagar</button></td> <!-- Botão Apagar -->
            `;
            tabelaContatos.appendChild(novaLinha);
        });
    }
}

function apagarContato(botao) {
    // Obtém a linha da tabela onde o botão está
    let linha = botao.closest('tr');
    // Obtém o índice da linha na tabela
    let indice = Array.from(linha.parentNode.children).indexOf(linha);
    // Remove o contato do array e do armazenamento local
    nome.splice(indice, 1);
    telefone.splice(indice, 1);
    let contatosSalvos = JSON.parse(localStorage.getItem("contatos"));
    contatosSalvos.splice(indice, 1);
    localStorage.setItem("contatos", JSON.stringify(contatosSalvos));
    // Remove a linha da tabela
    linha.remove();
}


