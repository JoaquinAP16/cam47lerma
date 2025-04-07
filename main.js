
document.addEventListener('DOMContentLoaded', () => {
  window.iconGallery = new IconGallery();

  window.app = new App();

  // Simular estudiante
  window.app.currentStudent = {
    name: "María López"
  };

  // Simular orden
  window.app.currentOrder = {
    items: [
      { id: "agua", name: "Agua", icon: "local_drink", quantity: 2, price: 10, subtotal: 20 },
      { id: "sandwich", name: "Sándwich", icon: "lunch_dining", quantity: 1, price: 25, subtotal: 25 }
    ],
    total: 45
  };

  // Mostrar mensaje o actualizar interfaz si se requiere
  console.log("Orden de ejemplo cargada. Estudiante: María López");

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
