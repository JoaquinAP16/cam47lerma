
class App {
  constructor() {
    this.currentStudent = { name: "María López" };
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
    document.getElementById('loading').style.display = 'none';
    document.getElementById('student-selector').style.display = 'block';
  }

  completeOrder() {
    alert("Orden completada con éxito");
    this.currentOrder = { items: [], total: 0 };
  }
}
