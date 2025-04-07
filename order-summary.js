
class OrderSummary {
  constructor(app) { this.app = app; }
  render(container) {
    container.innerHTML = this.generateHTML();
    this.attachEvents(container);
  }

  generateHTML() {
    const itemsHTML = this.app.currentOrder.items.map(item => `
      <div class="order-item" data-id="${item.id}">
        <div class="order-item-info">
          <span class="material-icons order-item-icon">${item.icon}</span>
          <span class="order-item-name">${item.name}</span>
        </div>
        <div class="quantity-control">
          <button class="decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="increase" data-id="${item.id}">+</button>
        </div>
        <div class="order-item-price">$${item.subtotal.toFixed(2)}</div>
        <button class="remove-item" data-id="${item.id}">✖</button>
      </div>`).join('');

    return `
      <h2>Resumen de Orden</h2>
      ${itemsHTML}
      <div>Total: $${this.app.currentOrder.total.toFixed(2)}</div>
    `;
  }

  attachEvents(container) {
    container.querySelectorAll('.increase').forEach(btn => btn.onclick = () => this.changeQuantity(btn.dataset.id, 1));
    container.querySelectorAll('.decrease').forEach(btn => btn.onclick = () => this.changeQuantity(btn.dataset.id, -1));
    container.querySelectorAll('.remove-item').forEach(btn => btn.onclick = () => this.removeItem(btn.dataset.id));
  }

  changeQuantity(id, delta) {
    const item = this.app.currentOrder.items.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) this.removeItem(id);
    else item.subtotal = item.price * item.quantity;

    this.app.recalculateTotal();
    this.render(document.getElementById('order-summary'));
  }

  removeItem(id) {
    this.app.currentOrder.items = this.app.currentOrder.items.filter(i => i.id !== id);
    this.app.recalculateTotal();
    this.render(document.getElementById('order-summary'));
  }
}
