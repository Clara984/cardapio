const categorias = {

    "Entradas":
    "Bruschetta,Pastel de Queijo,Pastel de Carne,Pastel de Frango,Coxinha,Bolinho de Queijo,Bolinho de Carne,Bolinho de Bacalhau,Croquete,Dadinho de Tapioca,Batata Frita,Batata Rústica,Batata com Cheddar,Mandioca Frita,Anéis de Cebola,Polenta Frita,Pão de Alho,Pão de Ervas,Queijo Coalho,Isca de Frango,Isca de Carne,Mini Hambúrguer,Mini Sanduíche,Salada Caesar,Salada Tropical,Caprese,Escondidinho,Calabresa Acebolada,Tábua de Frios,Mix de Petiscos",

    "Prato Principal":
    "Filé à Parmegiana,Filé ao Molho Madeira,Filé com Fritas,Filé Grelhado,Picanha na Chapa,Picanha com Fritas,Bife Acebolado,Bife à Cavalo,Frango Grelhado,Frango à Parmegiana,Frango ao Molho,Frango com Catupiry,Peixe Grelhado,Peixe ao Molho,Salmão Grelhado,Salmão ao Limão,Camarão Internacional,Camarão ao Molho,Risoto de Camarão,Risoto de Frango,Risoto de Cogumelos,Lasanha à Bolonhesa,Lasanha de Frango,Nhoque ao Molho,Espaguete à Bolonhesa,Espaguete ao Alho e Óleo,Fettuccine Alfredo,Arroz de Carne,Escondidinho de Carne,Escondidinho de Frango",

    "Sobremesas":
    "Pudim,Brownie,Brownie com Sorvete,Mousse de Chocolate,Mousse de Maracujá,Mousse de Limão,Torta de Limão,Torta de Chocolate,Torta de Morango,Cheesecake,Cheesecake de Morango,Sorvete de Chocolate,Sorvete de Morango,Sorvete de Baunilha,Sorvete de Creme,Petit Gateau,Petit Gateau de Chocolate,Banana Caramelizada,Banana com Sorvete,Açaí com Frutas,Açaí com Granola,Salada de Frutas,Cocada,Cocada Cremosa,Brigadeiro,Brigadeiro de Colher,Beijinho,Pavê de Chocolate,Pavê de Morango,Romeu e Julieta",

    "Bebidas":
    "Água Mineral,Água com Gás,Água de Coco,Refrigerante Cola,Refrigerante Cola Zero,Refrigerante Laranja,Refrigerante Limão,Refrigerante Guaraná,Refrigerante Guaraná Zero,Suco de Laranja,Suco de Limão,Suco de Maracujá,Suco de Abacaxi,Suco de Morango,Suco de Manga,Suco de Acerola,Suco de Goiaba,Suco de Cajá,Limonada,Limonada Suíça,Chá Gelado,Chá de Limão,Café Expresso,Café com Leite,Chocolate Quente,Milkshake de Chocolate,Milkshake de Morango,Milkshake de Baunilha,Vitamina de Banana,Vitamina de Morango",

    "Carta de Vinhos":
    "Vinho Tinto 01,Vinho Tinto 02,Vinho Tinto 03,Vinho Tinto 04,Vinho Tinto 05,Vinho Tinto 06,Vinho Tinto 07,Vinho Tinto 08,Vinho Tinto 09,Vinho Tinto 10,Vinho Branco 01,Vinho Branco 02,Vinho Branco 03,Vinho Branco 04,Vinho Branco 05,Vinho Branco 06,Vinho Branco 07,Vinho Branco 08,Vinho Rosé 01,Vinho Rosé 02,Vinho Rosé 03,Vinho Rosé 04,Vinho Especial 01,Vinho Especial 02,Vinho Especial 03,Vinho Especial 04,Vinho Reserva 01,Vinho Reserva 02,Vinho Reserva 03,Vinho Reserva 04"
};


// transforma as listas em objetos
let produtos = [];
let id = 1;

for (let categoria in categorias) {

    categorias[categoria].split(",").forEach((nome, i) => {

        produtos.push({
            id: id++,
            nome: nome,
            descricao: `${nome} preparado pela casa.`,
            preco: 10 + i * 2,
            categoria: categoria
        });

    });
}


// pedido
let pedido = [];
let filtro = "Todos";


// mostra produtos
function mostrar() {

    let busca = document.getElementById("busca").value.toLowerCase();

    let lista = produtos.filter(p =>
        (filtro == "Todos" || p.categoria == filtro) &&
        p.nome.toLowerCase().includes(busca)
    );

    document.getElementById("produtos").innerHTML = lista.map(p => `

        <div class="produto">

            <h3>${p.nome}</h3>

            <p>${p.descricao}</p>

            <strong>R$ ${p.preco.toFixed(2)}</strong>

            <br><br>

            <button onclick="adicionar(${p.id})">
                Adicionar
            </button>

        </div>

    `).join("");
}


// adiciona produto
function adicionar(id) {

    let item = pedido.find(p => p.id == id);

    if (item)
        item.qtd++;
    else
        pedido.push({
            ...produtos.find(p => p.id == id),
            qtd: 1
        });

    atualizar();
}


// atualiza pedido
function atualizar() {

    let html = "";
    let subtotal = 0;
    let quantidade = 0;

    pedido.forEach(p => {

        let valor = p.preco * p.qtd;

        subtotal += valor;
        quantidade += p.qtd;

        html += `

            <div class="item">

                <b>${p.nome}</b>

                <br>

                ${p.qtd} x R$ ${p.preco.toFixed(2)}
                = R$ ${valor.toFixed(2)}

                <br>

                <button onclick="alterar(${p.id},-1)">−</button>
                <button onclick="alterar(${p.id},1)">+</button>
                <button onclick="remover(${p.id})">Remover</button>

            </div>

        `;
    });


    document.getElementById("itens").innerHTML =
        html || "Nenhum produto adicionado.";

    let taxa =
        document.getElementById("garcom").checked
        ? subtotal * 0.10
        : 0;

    document.getElementById("qtd").textContent = quantidade;
    document.getElementById("subtotal").textContent =
        `R$ ${subtotal.toFixed(2)}`;
    document.getElementById("taxa").textContent =
        `R$ ${taxa.toFixed(2)}`;
    document.getElementById("total").textContent =
        `R$ ${(subtotal + taxa).toFixed(2)}`;
}


// quantidade
function alterar(id, valor) {

    let item = pedido.find(p => p.id == id);

    item.qtd += valor;

    if (item.qtd <= 0)
        remover(id);
    else
        atualizar();
}


// remover
function remover(id) {

    pedido = pedido.filter(p => p.id != id);

    atualizar();
}


// filtro
function filtrar(categoria) {

    filtro = categoria;

    mostrar();
}


// pesquisa
document.getElementById("busca").oninput = mostrar;


// taxa
document.getElementById("garcom").onchange = atualizar;


// finalizar
document.getElementById("finalizar").onclick = function() {

    let nome = document.getElementById("nome").value;
    let mesa = document.getElementById("mesa").value;

    if (!pedido.length)
        return alert("Adicione produtos ao pedido.");

    if (!nome || !mesa)
        return alert("Informe o nome e o número da mesa.");

    let resumo = pedido.map(p =>
        `${p.nome} x${p.qtd}`
    ).join("\n");

    alert(
        "PEDIDO FINALIZADO!\n\n" +
        "Cliente: " + nome +
        "\nMesa: " + mesa +
        "\n\n" + resumo +
        "\n\nTotal: " + document.getElementById("total").textContent
    );
};


mostrar();