document.addEventListener('DOMContentLoaded', () => {

  // Lógica para expandir/recolher os formulários
  const collapsibles = document.querySelectorAll('.collapsible');
  collapsibles.forEach(collapsible => {
    collapsible.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Formulário para adicionar produtos
  const addProductForm = document.getElementById('addProductForm');
  addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const productCode = document.getElementById('productCode').value;
    const productQuantity = document.getElementById('productQuantity').value;

    addProduct(productName, productCode, productQuantity)
      .then(() => {
        console.log('Produto adicionado com sucesso!');
        addProductForm.reset();
      })
      .catch((error) => {
        console.error('Erro ao adicionar produto: ', error);
        alert('Erro ao adicionar produto: ' + error.message);
      });
  });

  // Formulário para registrar venda
  const sellProductForm = document.getElementById('sellProductForm');
  sellProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productCode = document.getElementById('sellProductCode').value;
    const sellQuantity = document.getElementById('sellQuantity').value;

    sellProduct(productCode, sellQuantity)
      .then(() => {
        console.log('Venda registrada com sucesso!');
        sellProductForm.reset();
      })
      .catch((error) => {
        console.error('Erro ao registrar venda: ', error);
        alert('Erro ao registrar venda: ' + error.message);
      });
  });

  // Ouvir as mudanças no estoque e atualizar a tabela
  listenToStockChanges((products) => {
    const tableBody = document.getElementById('inventoryTable');
    tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os novos dados
    products.sort((a, b) => a.code.localeCompare(b.code)); // Ordena por código

    if (products.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="3">Nenhum produto em estoque.</td>`;
        tableBody.appendChild(row);
    } else {
        products.forEach(prod => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${prod.code}</td><td>${prod.name}</td><td>${prod.quantity}</td>`;
            tableBody.appendChild(row);
        });
    }
  });
});
