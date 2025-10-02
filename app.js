// A função para adicionar o produto. Ela valida, salva no localStorage e redireciona.
function adicionarProduto() {
    const nome = document.getElementById("nome_produto").value;
    const preco = document.getElementById("preco_produto").value;
    const categoria = document.getElementById("categoria_produto").value;
    const lote = document.getElementById("lote_produto").value;
    const origem = document.getElementById("origem_produto").value;
    const dataValidade = document.getElementById("data_produto").value;

    const erropreco = document.getElementById("erro-preco");
    const errolote = document.getElementById("erro-lote");
    const erroLoteDuplicado = document.getElementById("erro-lote-duplicado");
    const precoNegativo = document.getElementById("preco-negativo");

    if (erropreco) erropreco.style.display = "none";
    if (errolote) errolote.style.display = "none";
    if (erroLoteDuplicado) erroLoteDuplicado.style.display = "none";
    if (precoNegativo) precoNegativo.style.display = "none";

    let formularioValido = true; 

    const campos = [nome, preco, categoria, lote, origem, dataValidade];
    const algumCampoVazio = campos.some(campo => campo === "" || campo === null);
    if(algumCampoVazio) {
        alert("Preencha todos os campos!");
        formularioValido = false;
    }

    const regexNumeros = /^[0-9]+$/;
    if (!regexNumeros.test(preco)) {
        if (erropreco) erropreco.style.display = "block";
        formularioValido = false;
    }
    if (parseFloat(preco) <= 0) {
        if (precoNegativo) precoNegativo.style.display = "block";
        formularioValido = false;
    }

    if (!regexNumeros.test(lote)) {
        if (errolote) errolote.style.display = "block";
        formularioValido = false;
    }

    const dadosSalvos = JSON.parse(localStorage.getItem("chave_salvar_dados")) || [];
    const loteDuplicado = dadosSalvos.some(produto => produto.lote === lote); 
    
    if (loteDuplicado) {
        if (erroLoteDuplicado) erroLoteDuplicado.style.display = "block";
        formularioValido = false;
    }
    
    if (formularioValido) {
        const dadosDoProduto = {
            "nome": nome,
            "preco": preco,
            "categoria": categoria,
            "lote": lote,
            "data": dataValidade,
            "origem": origem,
        };
        
        dadosSalvos.push(dadosDoProduto);
        localStorage.setItem("chave_salvar_dados", JSON.stringify(dadosSalvos));

        window.location.href = "index.html";
    }
}

function carregarLista() {
    const dadosSalvos = localStorage.getItem("chave_salvar_dados");
    const listaDeProdutos = JSON.parse(dadosSalvos) || [];
    const tbody = document.getElementById("listahtml");

    if (tbody) tbody.innerHTML = '';

    listaDeProdutos.forEach((produto, index) => {
        const trElement = document.createElement("tr");

        trElement.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.preco}</td>
            <td>${produto.categoria}</td>
            <td>${produto.lote}</td>
            <td>${produto.data}</td>
            <td>${produto.origem}</td>
            <td>
                <a href="#" onclick="editarItem(${index})">Editar</a> |
                <a href="#" onclick="removerItem(${index})">Excluir</a>
            </td>
        `;
        
        if (tbody) tbody.appendChild(trElement);
    });
}

function removerItem(index) {
    const listaDeProdutos = JSON.parse(localStorage.getItem("chave_salvar_dados")) || [];
    listaDeProdutos.splice(index, 1);
    localStorage.setItem("chave_salvar_dados", JSON.stringify(listaDeProdutos));
    carregarLista(); 
}

function editarItem(index) {
    const listaDeProdutos = JSON.parse(localStorage.getItem("chave_salvar_dados")) || [];
    const produtoAEditar = listaDeProdutos[index];

    let escolha;
    do {
        escolha = prompt(`
            O que você deseja editar no produto ${produtoAEditar.nome}?
            1. nome
            2. preco
            3. categoria
            4. lote
            5. origem
            6. data
            Digite '7' para terminar.
        `);

        switch (escolha) {
            case '1':
                produtoAEditar.nome = prompt("Novo nome:", produtoAEditar.nome);
                break;
            case '2':
                const novoPreco = prompt("Novo preço:", produtoAEditar.preco);
                if (parseFloat(novoPreco) <= 0) {
                    alert("Por favor, escolha um preço maior que 0.");
                } else {
                    produtoAEditar.preco = novoPreco;
                }
                break;
            case '3':
                produtoAEditar.categoria = prompt("Nova categoria:", produtoAEditar.categoria);
                break;
            case '4': 
                let novoLote = prompt("Novo lote:", produtoAEditar.lote);
                const listaSemItemAtual = listaDeProdutos.filter((_, i) => i !== index);
                const loteJaExiste = listaSemItemAtual.some(produto => produto.lote === novoLote);
                if (loteJaExiste) {
                    alert("Erro: Este número de lote já existe! Por favor, digite outro.");
                } else if (parseFloat(novoLote) <= 0) {
                    alert("Por favor, coloque um número maior que 0 para definir o lote!");
                } else {
                    produtoAEditar.lote = novoLote;
                }
                break;
            case '5':
                produtoAEditar.origem = prompt("Nova origem:", produtoAEditar.origem);
                break;
            case '6': 
                produtoAEditar.data = prompt("Nova data de validade:", produtoAEditar.data);
                break;
            case '7':
                alert("Edição concluída!");
                break;
            default:
                alert("Por favor, digite um número de 1 a 7.");
                break;
        }
    } while (escolha !== '7');

    localStorage.setItem("chave_salvar_dados", JSON.stringify(listaDeProdutos));
    carregarLista();
}

if (document.getElementById("listahtml")) {
    window.onload = carregarLista;
}
























/*
//criação de uma matriz vazia para guardar os dados da tabela
let matriz_crud = []

localStorage.getItem("matriz_salva")

//criação de uma função adicionar para quando clicarmos no botão ele adicionar
function funcaoadicionar(){

    //criamos uma variavel que irá referenciar no JS a tabela que queremos adicionar com JS Aatravés do document,getelemtbyid("id")
    let tabela = document.getElementById("tableid")
    //criamos uma nova linha para adicionarmos os dados (esse -1 adiciona uma  linha sempre abaixo)
    const novalinha = tabela.insertRow(-1)
    //criamos uma variavel que irá criar as celulas dessa linha 
    let celula_nome = novalinha.insertCell(0)
    let celula_sobrenome = novalinha.insertCell(1)


    celula_nome.innerHTML = prompt("Digite o nome:")
    celula_sobrenome.innerHTML = prompt("Digite o sobrenome:")

    nome_array = celula_nome.innerHTML
    sobrenome_array = celula_sobrenome.innerHTML

    // Cria o array com os valores (nome e sobrenome)
    let linha = [nome_array, sobrenome_array];
    
    // Adiciona o array à matriz usando o método push()
    matriz_crud.push(linha);

    localStorage.setItem("matriz_salva", matriz_crud)
}
*/