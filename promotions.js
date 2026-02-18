// promotions.js - Функционал для страницы акций

// Функция показа промо "Приведи друга"
function showFriendPromo() {
  const modalHTML = `
    <div class="promo-modal" id="friendPromoModal">
      <div class="modal-content">
        <span class="close-modal" onclick="closeModal('friendPromoModal')">&times;</span>
        <h3>Акция "Приведи друга"</h3>
        <div class="promo-details">
          <div class="promo-step">
            <i class="fas fa-user-plus"></i>
            <h4>Шаг 1</h4>
            <p>Поделитесь своей реферальной ссылкой с другом</p>
            <div class="referral-link">
              <input type="text" value="https://modamir.ru/?ref=YOURCODE" readonly>
              <button onclick="copyReferralLink()">Копировать</button>
            </div>
          </div>
          <div class="promo-step">
            <i class="fas fa-shopping-cart"></i>
            <h4>Шаг 2</h4>
            <p>Ваш друг совершает покупку по вашей ссылке</p>
          </div>
          <div class="promo-step">
            <i class="fas fa-gift"></i>
            <h4>Шаг 3</h4>
            <p>Вы получаете скидку 30% на следующую покупку</p>
          </div>
        </div>
        <button class="modal-btn" onclick="closeModal('friendPromoModal')">Понятно</button>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Функция показа промо "Скидка имениннику"
function showBirthdayPromo() {
  const modalHTML = `
    <div class="promo-modal" id="birthdayPromoModal">
      <div class="modal-content">
        <span class="close-modal" onclick="closeModal('birthdayPromoModal')">&times;</span>
        <h3>Скидка имениннику</h3>
        <div class="birthday-form">
          <p>Введите дату вашего рождения для активации скидки</p>
          <input type="date" id="birthdayDate" class="birthday-input">
          <input type="email" placeholder="Ваш email" class="birthday-input">
          <button class="modal-btn" onclick="activateBirthdayDiscount()">Активировать скидку</button>
        </div>
        <div class="promo-info">
          <p><i class="fas fa-info-circle"></i> Скидка действует в течение 7 дней до и после дня рождения</p>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Функция подписки на рассылку
function subscribeNewsletter() {
  const emailInput = document.querySelector('.newsletter-input');
  const email = emailInput.value.trim();
  
  if (!email) {
    showNotification('Введите email для подписки!', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showNotification('Введите корректный email!', 'error');
    return;
  }
  
  // Эмуляция успешной подписки
  showNotification('Вы успешно подписались на рассылку акций!');
  emailInput.value = '';
  
  // Сохраняем в localStorage
  const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
  }
}

// Функция активации скидки именинника
function activateBirthdayDiscount() {
  const dateInput = document.getElementById('birthdayDate');
  const emailInput = document.querySelector('.birthday-input[type="email"]');
  
  if (!dateInput.value || !emailInput.value) {
    showNotification('Заполните все поля!', 'error');
    return;
  }
  
  showNotification('Скидка активирована! Проверьте вашу почту для подтверждения.');
  closeModal('birthdayPromoModal');
}

// Функция копирования реферальной ссылки
function copyReferralLink() {
  const linkInput = document.querySelector('.referral-link input');
  linkInput.select();
  document.execCommand('copy');
  showNotification('Ссылка скопирована в буфер обмена!');
}

// Функция закрытия модального окна
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.remove();
  }
}

// Валидация email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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

// Добавляем стили для модальных окон
const modalStyles = `
  <style>
    .promo-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .modal-content {
      background: white;
      padding: 30px;
      border-radius: 20px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
      animation: slideUp 0.3s ease;
    }
    
    @keyframes slideUp {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .close-modal {
      position: absolute;
      top: 15px;
      right: 20px;
      font-size: 24px;
      cursor: pointer;
      color: #999;
    }
    
    .close-modal:hover {
      color: #333;
    }
    
    .modal-content h3 {
      margin-bottom: 20px;
      color: #333;
      text-align: center;
    }
    
    .promo-details {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 25px;
    }
    
    .promo-step {
      text-align: center;
      padding: 20px;
      border: 2px dashed #dca8c9;
      border-radius: 15px;
    }
    
    .promo-step i {
      font-size: 32px;
      color: #dca8c9;
      margin-bottom: 10px;
    }
    
    .promo-step h4 {
      margin-bottom: 10px;
      color: #333;
    }
    
    .referral-link {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    
    .referral-link input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
    }
    
    .referral-link button {
      background: #dca8c9;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 6px;
      cursor: pointer;
    }
    
    .birthday-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .birthday-input {
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
    }
    
    .modal-btn {
      background: linear-gradient(135deg, #dca8c9, #c995b4);
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 25px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
    }
    
    .modal-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(220, 168, 201, 0.4);
    }
    
    .promo-info {
      background: #f8f8f8;
      padding: 15px;
      border-radius: 10px;
      margin-top: 20px;
    }
    
    .promo-info p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }
    
    .promo-info i {
      color: #dca8c9;
      margin-right: 8px;
    }
  </style>
`;

// Добавляем стили в head при загрузке страницы
document.head.insertAdjacentHTML('beforeend', modalStyles);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Обновляем счетчик дней для акций с ограниченным сроком
  updatePromotionTimers();
});

// Функция обновления таймеров акций
function updatePromotionTimers() {
  const promotionDates = {
    'promo-1': '2024-12-31', // Супер распродажа
    'promo-4': '2024-12-25', // Подарок за покупку
    'promo-5': '2024-12-20'  // Скидка на второй товар
  };
  
  // Здесь можно добавить логику обновления счетчиков дней
}