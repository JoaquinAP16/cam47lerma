class App {
  constructor() {
    this.currentStudent = { name: "María López" };
    this.currentOrder = {
      ...
    };

    // Orden de ejemplo
    this.currentOrder = {
      items: [
        { id: "agua", name: "Agua", icon: "local_drink", quantity: 2, price: 10, subtotal: 20 },
        { id: "sandwich", name: "Sándwich", icon: "lunch_dining", quantity: 1, price: 25, subtotal: 25 }
      ],
      total: 45
    };

    this.initializeApp();
  }

  initializeApp() {
    // Oculta la pantalla de carga
    document.getElementById('loading').style.display = 'none';

    // Muestra la sección del selector de alumnos (puede ser cualquier parte de tu app)
    document.getElementById('student-selector').style.display = 'block';
  }

  // (Opcional) puedes mantener este método si tienes botón de orden real
  completeOrder() {
    UIHelpers.showNotification('Orden completada con éxito', 'success');
    this.currentOrder = { items: [], total: 0 };
    this.loadStudentSelector();
  }
}
