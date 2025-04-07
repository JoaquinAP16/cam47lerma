
document.addEventListener('DOMContentLoaded', () => {
  window.iconGallery = new IconGallery();
  window.app = new App();

  const updateCartIndicator = () => {
    const cartIndicator = document.getElementById('cart-indicator');
    if (!cartIndicator) return;

    if (window.app && window.app.currentOrder && window.app.currentOrder.items) {
      const itemCount = window.app.currentOrder.items.length;
      const total = window.app.currentOrder.total || 0;

      cartIndicator.querySelector('.cart-count').textContent = itemCount;
      cartIndicator.querySelector('.cart-total').textContent = `$${total.toFixed(2)}`;
      cartIndicator.style.display = itemCount > 0 ? 'flex' : 'none';
    } else {
      cartIndicator.style.display = 'none';
    }
  };

  const observer = new MutationObserver(() => updateCartIndicator());
  observer.observe(document.querySelector('.app-content'), { childList: true, subtree: true, attributes: true });

  setInterval(updateCartIndicator, 1000);
});
