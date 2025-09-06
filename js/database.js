// Funções para interagir com o Firestore

// Adicionar um novo produto
async function addProduct(product) {
    try {
        await db.collection('products').doc(product.code).set(product);
        console.log("Produto adicionado com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar produto: ", error);
    }
}

// Obter todos os produtos
async function getProducts() {
    try {
        const snapshot = await db.collection('products').get();
        let products = [];
        snapshot.forEach(doc => {
            products.push(doc.data());
        });
        return products;
    } catch (error) {
        console.error("Erro ao buscar produtos: ", error);
        return [];
    }
}

// Atualizar a quantidade de um produto
async function updateProductQuantity(code, newQuantity) {
    try {
        await db.collection('products').doc(code).update({ quantity: newQuantity });
        console.log("Quantidade atualizada com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar quantidade: ", error);
    }
}
