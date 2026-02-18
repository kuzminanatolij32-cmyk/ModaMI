
// Функции для каталога
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    const productsView = document.getElementById('productsView');
    if (this.dataset.view === 'list') {
      productsView.classList.add('list-view');
    } else {
      productsView.classList.remove('list-view');
    }
  });
});

// Фильтрация по размеру
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// Применение фильтров
document.querySelector('.apply-filters').addEventListener('click', function() {
  showNotification('Фильтры применены!');
});

// Сброс фильтров
document.querySelector('.reset-filters').addEventListener('click', function() {
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector('.size-btn:nth-child(2)').classList.add('active');
  showNotification('Фильтры сброшены!');
});

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