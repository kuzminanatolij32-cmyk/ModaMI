// Функция добавления в корзину
function addToCart(productId) {
  const cartCount = document.querySelector('.cart-count');
  let currentCount = parseInt(cartCount.textContent) || 0;
  cartCount.textContent = currentCount + 1;
  
  // Показываем уведомление
  showNotification('Товар добавлен в корзину!');
  
  // Сохраняем в localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1,
      name: document.querySelectorAll('.product-card h3')[productId-1].textContent,
      price: document.querySelectorAll('.product-card .price')[productId-1].textContent
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Функция показа уведомлений
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
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

// Загрузка количества товаров в корзине при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector('.cart-count').textContent = totalItems;
});