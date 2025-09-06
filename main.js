// Array para armazenar produtos
let products = [];

// Função para atualizar a tabela de estoque
function updateTable() {
    const tableBody = document.getElementById('inventoryTable');
    tableBody.innerHTML = '';
    products.forEach(prod => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${prod.code}</td><td>${prod.name}</td><td>${prod.quantity}</td>`;
        tableBody.appendChild(row);
    });
}

// Adicionar produto
document.getElementById('addProductForm').addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const code = document.getElementById('productCode').value;
    const quantity = parseInt(document.getElementById('productQuantity').value);

    // Verifica se produto já existe
    const existing = products.find(p => p.code === code);
    if(existing){
        alert('Produto já cadastrado! Atualize a quantidade via venda.');
    } else {
        products.push({name, code, quantity});
        updateTable();
        this.reset();
    }
});

// Registrar venda
document.getElementById('sellProductForm').addEventListener('submit', function(e){
    e.preventDefault();
    const code = document.getElementById('sellProductCode').value;
    const quantity = parseInt(document.getElementById('sellQuantity').value);

    const product = products.find(p => p.code === code);
    if(product){
        if(product.quantity >= quantity){
            product.quantity -= quantity;
            updateTable();
            this.reset();
        } else {
            alert('Quantidade insuficiente em estoque!');
        }
    } else {
        alert('Produto não encontrado!');
    }
});