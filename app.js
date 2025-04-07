
class App {
  constructor() {
    this.currentStudent = { name: "Alumno Ejemplo" };
    this.currentOrder = {
      items: [
        { name: "Agua", quantity: 1, price: 10, subtotal: 10 }
      ],
      total: 10
    };
    document.getElementById('loading').style.display = 'none';
    document.getElementById('student-selector').style.display = 'block';
  }
}
