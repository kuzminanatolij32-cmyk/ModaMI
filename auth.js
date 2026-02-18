// Переключение видимости пароля
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
      const passwordInput = this.parentElement.querySelector('input');
      const icon = this.querySelector('i');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });
  
  const passwordInput = document.getElementById('reg-password');
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      const password = this.value;
      const strengthBar = document.querySelector('.strength-bar');
      const strengthText = document.querySelector('.strength-text');
      
      let strength = 0;
      if (password.length >= 8) strength += 25;
      if (/[A-Z]/.test(password)) strength += 25;
      if (/[0-9]/.test(password)) strength += 25;
      if (/[^A-Za-z0-9]/.test(password)) strength += 25;
      
      if (strengthBar) strengthBar.style.width = strength + '%';
      
      if (strength < 50) {
        strengthBar.style.background = '#e91e63';
        strengthText.textContent = 'Слабый пароль';
      } else if (strength < 75) {
        strengthBar.style.background = '#ff9800';
        strengthText.textContent = 'Средний пароль';
      } else {
        strengthBar.style.background = '#4caf50';
        strengthText.textContent = 'Надежный пароль';
      }
    });
  }
  
  // Обработка формы входа
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Простая валидация
      if (!email || !password) {
        showNotification('Заполните все поля!', 'error');
        return;
      }
      
      // Эмуляция успешного входа
      showNotification('Вход выполнен успешно!');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    });
  }
  
  // Обработка формы регистрации
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      // Валидация
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showNotification('Заполните все поля!', 'error');
        return;
      }
      
      if (password !== confirmPassword) {
        showNotification('Пароли не совпадают!', 'error');
        return;
      }
      
      if (password.length < 6) {
        showNotification('Пароль должен содержать минимум 6 символов!', 'error');
        return;
      }
      
      // Эмуляция успешной регистрации
      showNotification('Регистрация прошла успешно!');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    });
  }
  
  // Функция показа уведомлений
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
  
  // Загрузка количества товаров в корзине
  document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = totalItems;
    }
  });
  
  // Добавляем стили для уведомлений
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4caf50;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 1000;
      animation: slideInRight 0.3s ease;
    }
    
    .notification.error {
      background: #e91e63;
    }
    
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);