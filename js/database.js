// Funções para interagir com o Firestore

// Adicionar um novo produto ao estoque
function addProduct(productName, productCode, productQuantity) {
  return db.collection("products").doc(productCode).set({
    name: productName,
    code: productCode,
    quantity: Number(productQuantity),
  });
}

// Registrar a venda de um produto
async function sellProduct(productCode, sellQuantity) {
  const productRef = db.collection("products").doc(productCode);
  const doc = await productRef.get();

  if (doc.exists) {
    const currentQuantity = doc.data().quantity;
    if (currentQuantity >= sellQuantity) {
      const newQuantity = currentQuantity - sellQuantity;
      return productRef.update({ quantity: newQuantity });
    } else {
      throw new Error("Quantidade em estoque insuficiente.");
    }
  } else {
    throw new Error("Produto não encontrado.");
  }
}

// Excluir um produto do estoque
function deleteProduct(productCode) {
  return db.collection("products").doc(productCode).delete();
}

// Ouvir as mudanças no estoque em tempo real
function listenToStockChanges(callback) {
  db.collection("products").onSnapshot((snapshot) => {
    const products = [];
    snapshot.forEach((doc) => {
      products.push(doc.data());
    });
    callback(products);
  });
}
