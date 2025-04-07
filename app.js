
class App {
  constructor() {
    this.currentOrder = { items: [], total: 0 };
    this.currentStudent = {};
    this.initializeApp();
  }

  initializeApp() {
    document.getElementById('loading').style.display = 'none';
    this.loadStudentSelector();
  }

  recalculateTotal() {
    this.currentOrder.total = this.currentOrder.items.reduce((acc, item) => acc + item.subtotal, 0);
  }

  completeOrder() {
    UIHelpers.showNotification('Orden completada con éxito', 'success');
    this.currentOrder = { items: [], total: 0 };
    this.loadStudentSelector();
  }
}
