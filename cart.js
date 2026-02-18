
const productsData = {
  1: { 
    name: 'Костюм супергероя "Чёрный Адам"', 
    price: 6500, 
    image: 'https://via.placeholder.com/280x250/8b6e99/ffffff?text=Черный+Адам' 
  },
  2: { 
    name: 'Костюм супергероя "Супермен"', 
    price: 7200, 
    image: 'https://via.placeholder.com/280x250/4285f4/ffffff?text=Супермен' 
  },
  3: { 
    name: 'Костюм супергероя "Бэтмен"', 
    price: 6800, 
    image: 'https://via.placeholder.com/280x250/333333/ffffff?text=Бэтмен' 
  },
  4: { 
    name: 'Костюм супергероя "Чудо-женщина"', 
    price: 7500, 
    image: 'https://via.placeholder.com/280x250/e91e63/ffffff?text=Чудо-женщина' 
  },
  5: { 
    name: 'Костюм супергероя "Флэш"', 
    price: 6900, 
    image: 'https://via.placeholder.com/280x250/ff5722/ffffff?text=Флэш' 
  },
  6: { 
    name: 'Костюм супергероя "Зелёный Фонарь"', 
    price: 7100, 
    image: 'https://via.placeholder.com/280x250/4caf50/ffffff?text=Зеленый+Фонарь' 
  },
  7: { 
    name: 'Костюм супергероя "Аквамен"', 
    price: 7300, 
    image: 'https://via.placeholder.com/280x250/2196f3/ffffff?text=Аквамен' 
  },
  8: { 
    name: 'Костюм супергероя "Халк"', 
    price: 7800, 
    image: 'https://via.placeholder.com/280x250/795548/ffffff?text=Халк' 
  }
};


function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  

  document.querySelectorAll('.cart-count').forEach(element => {
    element.textContent = totalItems;
  });
  
  return totalItems;
}


function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}


function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}


function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const product = productsData[productId];
  
  if (!product) {
    showNotification('Товар не найден!', 'error');
    return;
  }
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity: quantity,
      name: product.name,
      price: product.price,
      image: product.image 
    });
  }
  
  saveCart(cart);
  updateCartCount();
  showNotification(`"${product.name}" добавлен в корзину!`);
  

  if (window.location.pathname.includes('cart.html')) {
    renderCartItems();
  }
}


function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  saveCart(updatedCart);
  updateCartCount();
  
  if (window.location.pathname.includes('cart.html')) {
    renderCartItems();
  }
}


function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) return;
  
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity = newQuantity;
    saveCart(cart);
    updateCartCount();
    
    if (window.location.pathname.includes('cart.html')) {
      renderCartItems();
    }
  }
}


function renderCartItems() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cart = getCart();
  
  if (!cartItemsContainer) return;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте товары из каталога, чтобы сделать заказ</p>
        <a href="catalog.html" class="continue-shopping">Продолжить покупки</a>
      </div>
    `;
    updateOrderSummary();
    return;
  }
  
  let itemsHTML = '';
  
  cart.forEach(item => {
    const product = productsData[item.id];
    if (!product) return;
    
    itemsHTML += `
      <div class="cart-item" data-product-id="${item.id}">
        <div class="item-image">
          <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x80/cccccc/ffffff?text=Нет+фото'">
        </div>
        <div class="item-details">
          <h3>${item.name}</h3>
          <p class="item-size">Размер: S</p>
          <p class="item-color">Цвет: Стандартный</p>
          <div class="item-actions">
            <button class="action-btn favorite"><i class="far fa-heart"></i></button>
            <button class="action-btn delete" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <div class="item-quantity">
          <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <input type="number" value="${item.quantity}" min="1" class="quantity-input" onchange="updateQuantity(${item.id}, parseInt(this.value))">
          <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
        <div class="item-price">
          <span class="current-price">${formatPrice(product.price * item.quantity)}</span>
        </div>
      </div>
    `;
  });
  

  itemsHTML += `
    <div class="cart-promo">
      <div class="promo-input">
        <input type="text" placeholder="Введите промокод" id="promoCode">
        <button class="promo-btn" onclick="applyPromoCode()">Применить</button>
      </div>
    </div>
  `;
  
  cartItemsContainer.innerHTML = itemsHTML;
  updateOrderSummary();
}


function updateOrderSummary() {
  const cart = getCart();
  let subtotal = 0;
  let itemsCount = 0;
  
  cart.forEach(item => {
    const product = productsData[item.id];
    if (product) {
      subtotal += product.price * item.quantity;
      itemsCount += item.quantity;
    }
  });
  
  const discount = 0; 
  const shipping = subtotal > 3000 ? 0 : 500; 
  const total = subtotal - discount + shipping;
  

  const itemsCountElement = document.querySelector('.items-count');
  const subtotalElement = document.querySelector('.summary-row:nth-child(1) span:last-child');
  const discountElement = document.querySelector('.discount');
  const shippingElement = document.querySelector('.shipping');
  const totalElement = document.querySelector('.summary-row.total span:last-child');
  
  if (itemsCountElement) itemsCountElement.textContent = itemsCount;
  if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
  if (discountElement) discountElement.textContent = `-${formatPrice(discount)}`;
  if (shippingElement) shippingElement.textContent = shipping === 0 ? 'Бесплатно' : formatPrice(shipping);
  if (totalElement) totalElement.textContent = formatPrice(total);
}

function applyPromoCode() {
  const promoCode = document.getElementById('promoCode')?.value.trim();
  
  if (!promoCode) {
    showNotification('Введите промокод!', 'error');
    return;
  }
  
 
  const promoCodes = {
    'SUPER10': 0.1, 
    'WELCOME15': 0.15, 
    'FREESHIP': 'free-shipping' 
  };
  
  if (promoCodes[promoCode]) {
    showNotification('Промокод применен!');

  } else {
    showNotification('Неверный промокод!', 'error');
  }
}


function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
}


function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}


function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    showNotification('Корзина пуста!', 'error');
    return;
  }
  
  showNotification('Переход к оформлению заказа...');

}


document.addEventListener('DOMContentLoaded', function() {

  updateCartCount();
  

  if (window.location.pathname.includes('cart.html')) {
    renderCartItems();
  }
  

  document.querySelectorAll('.add-to-cart, .product-btn').forEach(button => {
    if (button.textContent.includes('корзин') || button.classList.contains('add-to-cart')) {
      const productId = button.dataset.product || 
                       Array.from(button.closest('.product-card').parentNode.children).indexOf(button.closest('.product-card')) + 1;
      
      button.addEventListener('click', function(e) {
        e.preventDefault();
        addToCart(parseInt(productId));
      });
    }
  });
});


window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.applyPromoCode = applyPromoCode;
window.checkout = checkout;