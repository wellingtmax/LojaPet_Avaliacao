// Carrossel de Cards e listagem de produtos
document.addEventListener("DOMContentLoaded", function () {
  // Carrossel de Cards
  const carrosselTrack = document.querySelector(".carrossel-track");
  const carrosselCards = document.querySelectorAll(".card");
  const btnPrev = document.getElementById("carrossel-prev");
  const btnNext = document.getElementById("carrossel-next");
  const dotsContainer = document.getElementById("carrossel-dots");
  
  let currentIndex = 0;
  const cardsToShow = 5; // Número de cards visíveis
  const cardWidth = 240; // Largura do card + gap (220px + 20px)
  const totalCards = carrosselCards.length;
  const maxIndex = Math.max(0, totalCards - cardsToShow);
  let autoSlideInterval;

  // Criar dots baseado no número de posições possíveis
  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    const totalDots = maxIndex + 1;
    
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement("span");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => {
        goToPosition(i);
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });
  }

  function updateCarrossel() {
    if (!carrosselTrack) return;
    const translateX = -currentIndex * cardWidth;
    carrosselTrack.style.transform = `translateX(${translateX}px)`;
    updateDots();
  }

  function nextSlide() {
    if (currentIndex >= maxIndex) {
      currentIndex = 0; // Volta para o início
    } else {
      currentIndex++;
    }
    updateCarrossel();
    resetAutoSlide();
  }

  function prevSlide() {
    if (currentIndex <= 0) {
      currentIndex = maxIndex; // Vai para o final
    } else {
      currentIndex--;
    }
    updateCarrossel();
    resetAutoSlide();
  }

  function goToPosition(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateCarrossel();
    resetAutoSlide();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Muda a cada 3 segundos
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Event listeners
  if (btnNext) {
    btnNext.addEventListener("click", (e) => {
      e.stopPropagation();
      nextSlide();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      prevSlide();
    });
  }

  // Pausar auto-slide quando mouse estiver sobre o carrossel
  const carrosselContainer = document.getElementById("carrossel");
  if (carrosselContainer) {
    carrosselContainer.addEventListener("mouseenter", stopAutoSlide);
    carrosselContainer.addEventListener("mouseleave", startAutoSlide);
  }

  // Inicializar carrossel se houver cards
  if (carrosselCards.length > 0 && carrosselTrack) {
    createDots();
    updateCarrossel();
    startAutoSlide();
    
    // Adicionar event listeners aos botões do carrossel
    addCarrosselEventListeners();
  }

  // Mapeamento de produtos para suas respectivas páginas
  const productPageMap = {
    "Ração Birbo para Cães": "pages/racao-birbo.html",
    "Ração Dog Plus": "pages/racao-dog-plus.html", 
    "Ração Gold para Cães": "pages/racao-gold.html",
    "Ração Mix Dog": "pages/racao-mix-dog.html",
    "Ração Multi para Cães": "pages/racao-multi.html",
    "Ração Nutrive para Cães": "pages/racao-nutrive.html",
    "Ração Origen para Cães": "pages/racao-origen.html",
    "Ração Premium para Gatos Pacato": "pages/racao-gatos-pacato.html",
    "Ração Premium para Gatos Receita": "pages/racao-gatos-receita.html",
    "Ração Premium para Gatos": "pages/racao-premium-gatos.html",
    "Areia Higiênica para Gatos": "pages/areia-higienica-gatos.html",
    "Brinquedo de Borracha para Cães": "pages/brinquedo-borracha-caes.html",
    "Cama para Cachorro": "pages/cama-cachorro.html",
    "Comedouro e Bebedouro Automático para Cães": "pages/comedouro-bebedouro-automatico.html",
    "Shampoo para Pets": "pages/shampoo-pets.html"
  };

  function getProductPageLink(productName) {
    return productPageMap[productName] || "#";
  }

  // Listagem de produtos
  fetch("produtos.json")
    .then((response) => response.json())
    .then((produtos) => {
      const secao = document.getElementById("produtos");
      secao.innerHTML = produtos
        .map(
          (produto) => {
            const pageLink = getProductPageLink(produto.produto);
            const imageWithLink = pageLink !== "#" 
              ? `<a href="${pageLink}" class="produto-link"><img src="${produto.imagem}" alt="${produto.produto}"></a>`
              : `<img src="${produto.imagem}" alt="${produto.produto}">`;
            
            return `
          <div class="produto">
            ${imageWithLink}
            <div class="produto-content">
              <h3>${produto.produto}</h3>
              <p>${produto.detalhe}</p>
              <div class="produto-price">R$ ${produto.preço.toFixed(2)}</div>
              <div class="produto-actions">
                <button class="btn-buy-produto" data-name="${produto.produto}" data-price="${produto.preço}">Comprar</button>
              </div>
            </div>
          </div>
        `;
          }
        )
        .join("");
      
      // Adicionar event listeners após criar o HTML
      addProductEventListeners();
    });
});

// Funcionalidades do Carrinho e Menu de Usuário
let cart = [];
let cartCount = 0;

// Menu de usuário dropdown
const userMenuBtn = document.getElementById('userMenuBtn');
const userDropdown = document.getElementById('userDropdown');

if (userMenuBtn && userDropdown) {
  userMenuBtn.addEventListener('click', () => {
    userDropdown.classList.toggle('show');
    // Fechar carrinho se estiver aberto
    const cartDropdown = document.getElementById('cartDropdown');
    if (cartDropdown) {
      cartDropdown.classList.remove('show');
    }
  });

  // Fechar dropdown ao clicar fora
  document.addEventListener('click', (e) => {
    if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
      userDropdown.classList.remove('show');
    }
  });
}

// Funções do carrinho
function addToCart(productName, price) {
  // Verificar se o produto já existe no carrinho
  const existingItem = cart.find(item => item.name === productName);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ 
      name: productName, 
      price: price, 
      quantity: 1,
      id: Date.now() // ID único para remoção
    });
  }
  
  cartCount++;
  updateCartCount();
  updateCartDisplay();
  showNotification(`${productName} adicionado ao carrinho!`, 'success');
}

function buyNow(productName, price) {
  // Adicionar automaticamente ao carrinho
  addToCart(productName, price);
  
  // Mostrar notificação de compra
  showNotification(`${productName} adicionado ao carrinho! Clique no carrinho para finalizar a compra.`, 'success');
}

function updateCartCount() {
  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotal = document.getElementById('cartTotal');
  
  if (!cartItems) return;
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty"><p>Seu carrinho está vazio</p></div>';
    cartFooter.style.display = 'none';
  } else {
    let total = 0;
    
    cartItems.innerHTML = cart.map(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      return `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">
              ${item.quantity}x R$ ${item.price.toFixed(2)} = R$ ${itemTotal.toFixed(2)}
            </div>
          </div>
          <button class="cart-item-remove" data-item-id="${item.id}" title="Remover item">
            ×
          </button>
        </div>
      `;
    }).join('');
    
    cartTotal.textContent = total.toFixed(2).replace('.', ',');
    cartFooter.style.display = 'block';
    
    // Adicionar event listeners para os botões de remoção
    addRemoveButtonListeners();
  }
}

function addRemoveButtonListeners() {
  document.querySelectorAll('.cart-item-remove').forEach(button => {
    button.addEventListener('click', (e) => {
      const itemId = parseInt(e.currentTarget.getAttribute('data-item-id'));
      removeFromCart(itemId);
    });
  });
}

function removeFromCart(itemId) {
  const itemIndex = cart.findIndex(item => item.id === itemId);
  if (itemIndex > -1) {
    const item = cart[itemIndex];
    cartCount -= item.quantity;
    cart.splice(itemIndex, 1);
    
    updateCartCount();
    updateCartDisplay();
    showNotification('Item removido do carrinho', 'info');
  }
}

function clearCart() {
  cart = [];
  cartCount = 0;
  updateCartCount();
  updateCartDisplay();
  showNotification('Carrinho limpo!', 'info');
}

function checkout() {
  if (cart.length === 0) {
    showNotification('Seu carrinho está vazio!', 'error');
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  showNotification(`Checkout realizado! ${itemCount} itens - Total: R$ ${total.toFixed(2)}`, 'success');
  
  setTimeout(() => {
    showNotification('Compra finalizada com sucesso! Obrigado pela preferência.', 'success');
    clearCart();
    
    // Fechar dropdown
    const cartDropdown = document.getElementById('cartDropdown');
    if (cartDropdown) {
      cartDropdown.classList.remove('show');
    }
  }, 2000);
}

function showNotification(message, type = 'info') {
  // Criar elemento de notificação
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Estilos inline para a notificação
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    font-weight: 600;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Animar entrada
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remover após 3 segundos
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Carrinho click handler e eventos
const cartBtn = document.getElementById('cartBtn');
const cartDropdown = document.getElementById('cartDropdown');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

if (cartBtn && cartDropdown) {
  cartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cartDropdown.classList.toggle('show');
    
    // Fechar menu de usuário se estiver aberto
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
      userDropdown.classList.remove('show');
    }
  });
}

if (clearCartBtn) {
  clearCartBtn.addEventListener('click', clearCart);
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', checkout);
}

// Fechar dropdown do carrinho ao clicar fora
document.addEventListener('click', (e) => {
  if (cartDropdown && cartBtn) {
    if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
      cartDropdown.classList.remove('show');
    }
  }
});

// Função para adicionar event listeners aos produtos
function addProductEventListeners() {
  // Apenas botões de compra dos produtos
  document.querySelectorAll('.btn-buy-produto').forEach(button => {
    button.addEventListener('click', (e) => {
      const productName = e.currentTarget.getAttribute('data-name');
      const productPrice = parseFloat(e.currentTarget.getAttribute('data-price'));
      buyNow(productName, productPrice);
    });
  });
}

// Função para adicionar event listeners aos botões do carrossel
function addCarrosselEventListeners() {
  // Apenas botões de compra do carrossel
  document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', (e) => {
      const productName = e.currentTarget.getAttribute('data-name');
      const productPrice = parseFloat(e.currentTarget.getAttribute('data-price'));
      buyNow(productName, productPrice);
    });
  });
}
