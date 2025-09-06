// Espera o DOM carregar para iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    // Adicionar produto
    document.getElementById('addProductForm').addEventListener('submit', async function(e){
        e.preventDefault();
        const name = document.getElementById('productName').value;
        const code = document.getElementById('productCode').value;
        const quantity = parseInt(document.getElementById('productQuantity').value);

        const newProduct = { name, code, quantity };
        await addProduct(newProduct);
        loadProducts();
        this.reset();
    });

    // Registrar venda
    document.getElementById('sellProductForm').addEventListener('submit', async function(e){
        e.preventDefault();
        const code = document.getElementById('sellProductCode').value;
        const quantitySold = parseInt(document.getElementById('sellQuantity').value);

        const products = await getProducts();
        const product = products.find(p => p.code === code);

        if(product){
            if(product.quantity >= quantitySold){
                const newQuantity = product.quantity - quantitySold;
                await updateProductQuantity(code, newQuantity);
                loadProducts();
                this.reset();
            } else {
                alert('Quantidade insuficiente em estoque!');
            }
        } else {
            alert('Produto não encontrado!');
        }
    });
});

// Carrega os produtos e atualiza a tabela
async function loadProducts() {
    const products = await getProducts();
    const tableBody = document.getElementById('inventoryTable');
    tableBody.innerHTML = '';
    products.forEach(prod => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${prod.code}</td><td>${prod.name}</td><td>${prod.quantity}</td>`;
        tableBody.appendChild(row);
    });
}
