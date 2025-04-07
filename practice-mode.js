// Componente para la sección de práctica con productos aleatorios
class PracticeMode {
  constructor() {
    this.practiceProducts = [];
    this.practiceCategories = [];
    this.currentOrder = {
      items: [],
      total: 0
    };
    this.studentName = '';
    this.generatePracticeData();
  }
  
  // Generar datos aleatorios para la práctica
  generatePracticeData() {
    // Categorías de práctica
    this.practiceCategories = [
      { id: 'prac_cat1', name: 'Frutas', icon: 'nutrition', color: '#e74c3c' },
      { id: 'prac_cat2', name: 'Verduras', icon: 'eco', color: '#2ecc71' },
      { id: 'prac_cat3', name: 'Lácteos', icon: 'water_drop', color: '#3498db' },
      { id: 'prac_cat4', name: 'Panadería', icon: 'bakery_dining', color: '#f39c12' }
    ];
    
    // Productos de práctica
    const fruitProducts = [
      { id: 'prac_prod1', name: 'Manzana', categoryId: 'prac_cat1', price: this.getRandomPrice(5, 15), icon: 'nutrition', available: true },
      { id: 'prac_prod2', name: 'Plátano', categoryId: 'prac_cat1', price: this.getRandomPrice(5, 15), icon: 'nutrition', available: true },
      { id: 'prac_prod3', name: 'Naranja', categoryId: 'prac_cat1', price: this.getRandomPrice(5, 15), icon: 'nutrition', available: true },
      { id: 'prac_prod4', name: 'Fresa', categoryId: 'prac_cat1', price: this.getRandomPrice(5, 15), icon: 'nutrition', available: true },
      { id: 'prac_prod5', name: 'Uvas', categoryId: 'prac_cat1', price: this.getRandomPrice(10, 25), icon: 'nutrition', available: true }
    ];
    
    const vegetableProducts = [
      { id: 'prac_prod6', name: 'Zanahoria', categoryId: 'prac_cat2', price: this.getRandomPrice(5, 15), icon: 'eco', available: true },
      { id: 'prac_prod7', name: 'Lechuga', categoryId: 'prac_cat2', price: this.getRandomPrice(5, 15), icon: 'eco', available: true },
      { id: 'prac_prod8', name: 'Tomate', categoryId: 'prac_cat2', price: this.getRandomPrice(5, 15), icon: 'eco', available: true },
      { id: 'prac_prod9', name: 'Pepino', categoryId: 'prac_cat2', price: this.getRandomPrice(5, 15), icon: 'eco', available: true },
      { id: 'prac_prod10', name: 'Pimiento', categoryId: 'prac_cat2', price: this.getRandomPrice(5, 15), icon: 'eco', available: true }
    ];
    
    const dairyProducts = [
      { id: 'prac_prod11', name: 'Leche', categoryId: 'prac_cat3', price: this.getRandomPrice(15, 25), icon: 'water_drop', available: true },
      { id: 'prac_prod12', name: 'Yogur', categoryId: 'prac_cat3', price: this.getRandomPrice(10, 20), icon: 'water_drop', available: true },
      { id: 'prac_prod13', name: 'Queso', categoryId: 'prac_cat3', price: this.getRandomPrice(20, 40), icon: 'water_drop', available: true },
      { id: 'prac_prod14', name: 'Mantequilla', categoryId: 'prac_cat3', price: this.getRandomPrice(15, 30), icon: 'water_drop', available: true },
      { id: 'prac_prod15', name: 'Crema', categoryId: 'prac_cat3', price: this.getRandomPrice(15, 25), icon: 'water_drop', available: true }
    ];
    
    const bakeryProducts = [
      { id: 'prac_prod16', name: 'Pan', categoryId: 'prac_cat4', price: this.getRandomPrice(10, 20), icon: 'bakery_dining', available: true },
      { id: 'prac_prod17', name: 'Croissant', categoryId: 'prac_cat4', price: this.getRandomPrice(15, 25), icon: 'bakery_dining', available: true },
      { id: 'prac_prod18', name: 'Donut', categoryId: 'prac_cat4', price: this.getRandomPrice(10, 20), icon: 'bakery_dining', available: true },
      { id: 'prac_prod19', name: 'Galletas', categoryId: 'prac_cat4', price: this.getRandomPrice(10, 20), icon: 'cookie', available: true },
      { id: 'prac_prod20', name: 'Pastel', categoryId: 'prac_cat4', price: this.getRandomPrice(30, 50), icon: 'cake', available: true }
    ];
    
    // Combinar todos los productos
    this.practiceProducts = [
      ...fruitProducts,
      ...vegetableProducts,
      ...dairyProducts,
      ...bakeryProducts
    ];
  }
  
  // Obtener un precio aleatorio entre min y max
  getRandomPrice(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
  }
  
  // Iniciar modo práctica
  startPracticeMode(container, onExit) {
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Crear encabezado
    const header = document.createElement('div');
    header.className = 'practice-header';
    header.innerHTML = `
      <h2>Modo Práctica</h2>
      <p>Practica la toma de órdenes con productos aleatorios</p>
      <button class="btn btn-secondary" id="exit-practice">Salir de Práctica</button>
    `;
    container.appendChild(header);
    
    // Añadir evento para salir
    document.getElementById('exit-practice').addEventListener('click', () => {
      if (onExit) onExit();
    });
    
    // Crear formulario para nombre de estudiante
    const studentForm = document.createElement('div');
    studentForm.className = 'practice-student-form card';
    studentForm.innerHTML = `
      <div class="form-group">
        <label for="practice-student-name" class="form-label">Nombre del Alumno:</label>
        <input type="text" id="practice-student-name" class="form-input" placeholder="Escribe tu nombre">
      </div>
      <button class="btn btn-primary" id="start-practice-order">Comenzar Práctica</button>
    `;
    container.appendChild(studentForm);
    
    // Añadir evento para comenzar
    document.getElementById('start-practice-order').addEventListener('click', () => {
      const nameInput = document.getElementById('practice-student-name');
      this.studentName = nameInput.value.trim();
      
      if (!this.studentName) {
        UIHelpers.showNotification('Por favor, escribe tu nombre para comenzar', 'error');
        return;
      }
      
      this.showCategoriesView(container);
    });
  }
  
  // Mostrar vista de categorías
  showCategoriesView(container) {
    // Limpiar contenedor manteniendo el encabezado
    const header = container.querySelector('.practice-header');
    container.innerHTML = '';
    container.appendChild(header);
    
    // Crear contenedor de categorías
    const categoriesContainer = document.createElement('div');
    categoriesContainer.className = 'practice-categories';
    
    // Añadir título
    const title = document.createElement('h3');
    title.textContent = 'Selecciona una categoría';
    categoriesContainer.appendChild(title);
    
    // Crear grid de categorías
    const grid = document.createElement('div');
    grid.className = 'grid-container';
    
    // Añadir categorías
    this.practiceCategories.forEach(category => {
      const categoryItem = document.createElement('div');
      categoryItem.className = 'grid-item';
      categoryItem.innerHTML = `
        <span class="material-icons grid-item-icon" style="color: ${category.color}">${category.icon}</span>
        <span class="grid-item-label">${category.name}</span>
      `;
      
      // Añadir evento de clic
      categoryItem.addEventListener('click', () => {
        this.showProductsView(container, category.id);
      });
      
      grid.appendChild(categoryItem);
    });
    
    categoriesContainer.appendChild(grid);
    container.appendChild(categoriesContainer);
    
    // Mostrar orden actual si hay productos
    if (this.currentOrder.items.length > 0) {
      this.showCurrentOrder(container);
    }
  }
  
  // Mostrar vista de productos
  showProductsView(container, categoryId) {
    // Limpiar contenedor manteniendo el encabezado
    const header = container.querySelector('.practice-header');
    container.innerHTML = '';
    container.appendChild(header);
    
    // Obtener categoría
    const category = this.practiceCategories.find(cat => cat.id === categoryId);
    
    // Crear contenedor de productos
    const productsContainer = document.createElement('div');
    productsContainer.className = 'practice-products';
    
    // Añadir título y botón de volver
    const titleBar = document.createElement('div');
    titleBar.className = 'practice-title-bar';
    titleBar.innerHTML = `
      <button class="btn btn-secondary" id="back-to-categories">
        <span class="material-icons">arrow_back</span> Volver
      </button>
      <h3>${category.name}</h3>
    `;
    productsContainer.appendChild(titleBar);
    
    // Añadir evento de volver
    document.getElementById('back-to-categories').addEventListener('click', () => {
      this.showCategoriesView(container);
    });
    
    // Crear grid de productos
    const grid = document.createElement('div');
    grid.className = 'product-grid';
    
    // Filtrar productos por categoría
    const products = this.practiceProducts.filter(product => product.categoryId === categoryId);
    
    // Añadir productos
    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.className = 'product-item';
      productItem.innerHTML = `
        <div class="product-icon" style="background-color: ${category.color}">
          <span class="material-icons">${product.icon}</span>
        </div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
      `;
      
      // Añadir evento de clic
      productItem.addEventListener('click', () => {
        this.addToOrder(product);
        UIHelpers.showNotification(`${product.name} añadido a la orden`, 'success');
      });
      
      grid.appendChild(productItem);
    });
    
    productsContainer.appendChild(grid);
    container.appendChild(productsContainer);
    
    // Mostrar orden actual
    this.showCurrentOrder(container);
  }
  
  // Añadir producto a la orden
  addToOrder(product) {
    // Verificar si el producto ya está en la orden
    const existingItem = this.currentOrder.items.find(item => item.id === product.id);
    
    if (existingItem) {
      // Incrementar cantidad
      existingItem.quantity += 1;
      existingItem.subtotal = existingItem.quantity * existingItem.price;
    } else {
      // Añadir nuevo item
      this.currentOrder.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        subtotal: product.price,
        icon: product.icon
      });
    }
    
    // Recalcular total
    this.recalculateTotal();
    
    // Actualizar vista de orden si existe
    const orderContainer = document.querySelector('.practice-order');
    if (orderContainer) {
      this.updateOrderView(orderContainer.parentNode);
    }
  }
  
  // Eliminar producto de la orden
  removeFromOrder(productId) {
    // Encontrar índice del producto
    const index = this.currentOrder.items.findIndex(item => item.id === productId);
    
    if (index !== -1) {
      // Decrementar cantidad o eliminar
      if (this.currentOrder.items[index].quantity > 1) {
        this.currentOrder.items[index].quantity -= 1;
        this.currentOrder.items[index].subtotal = this.currentOrder.items[index].quantity * this.currentOrder.items[index].price;
      } else {
        this.currentOrder.items.splice(index, 1);
      }
      
      // Recalcular total
      this.recalculateTotal();
      
      // Actualizar vista de orden
      const orderContainer = document.querySelector('.practice-order');
      if (orderContainer) {
        this.updateOrderView(orderContainer.parentNode);
      }
    }
  }
  
  // Recalcular total de la orden
  recalculateTotal() {
    this.currentOrder.total = this.currentOrder.items.reduce((total, item) => total + item.subtotal, 0);
  }
  
  // Mostrar orden actual
  showCurrentOrder(container) {
    // Verificar si ya existe la orden
    let orderContainer = container.querySelector('.practice-order');
    
    if (!orderContainer) {
      // Crear contenedor de orden
      orderContainer = document.createElement('div');
      orderContainer.className = 'practice-order card';
      container.appendChild(orderContainer);
    }
    
    this.updateOrderView(container);
  }
  
  // Actualizar vista de orden
  updateOrderView(container) {
    const orderContainer = container.querySelector('.practice-order');
    
    if (this.currentOrder.items.length === 0) {
      orderContainer.innerHTML = `
        <h3>Tu Orden</h3>
        <p>No hay productos en la orden</p>
      `;
      return;
    }
    
    // Crear contenido de orden
    let orderContent = `
      <h3>Tu Orden</h3>
      <div class="order-items">
    `;
    
    // Añadir items
    this.currentOrder.items.forEach(item => {
      orderContent += `
        <div class="order-item">
          <div class="order-item-info">
            <span class="material-icons order-item-icon">${item.icon}</span>
            <span class="order-item-name">${item.name} x${item.quantity}</span>
          </div>
          <div class="order-item-price">$${item.subtotal.toFixed(2)}</div>
          <div class="order-item-actions">
            <button class="btn btn-small btn-accent remove-item" data-id="${item.id}">
              <span class="material-icons">remove</span>
            </button>
          </div>
        </div>
      `;
    });
    
    // Añadir total y botones
    orderContent += `
      </div>
      <div class="order-total">
        <span>Total:</span>
        <span>$${this.currentOrder.total.toFixed(2)}</span>
      </div>
      <div class="order-actions">
        <button class="btn btn-secondary" id="clear-order">Cancelar</button>
        <button class="btn btn-primary" id="complete-order">Completar Orden</button>
      </div>
    `;
    
    orderContainer.innerHTML = orderContent;
    
    // Añadir eventos
    
    // Botones de eliminar
    const removeButtons = orderContainer.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        this.removeFromOrder(productId);
      });
    });
    
    // Botón de cancelar
    const clearButton = document.getElementById('clear-order');
    clearButton.addEventListener('click', () => {
      this.currentOrder.items = [];
      this.currentOrder.total = 0;
      this.updateOrderView(container);
      UIHelpers.showNotification('Orden cancelada', 'info');
    });
    
    // Botón de completar
    const completeButton = document.getElementById('complete-order');
    completeButton.addEventListener('click', () => {
      this.completeOrder(container);
    });
  }
  
  // Completar orden
  completeOrder(container) {
    // Limpiar contenedor manteniendo el encabezado
    const header = container.querySelector('.practice-header');
    container.innerHTML = '';
    container.appendChild(header);
    
    // Crear contenedor de confirmación
    const confirmationContainer = document.createElement('div');
    confirmationContainer.className = 'confirmation';
    
    // Crear contenido de confirmación
    confirmationContainer.innerHTML = `
      <div class="confirmation-icon">
        <span class="material-icons">check_circle</span>
      </div>
      <h2 class="confirmation-title">¡Orden Completada!</h2>
      <p class="confirmation-message">
        ${this.studentName}, has completado exitosamente una orden de práctica.
      </p>
      <div class="order-summary card">
        <h3>Resumen de la Orden</h3>
        <div class="order-items">
          ${this.currentOrder.items.map(item => `
            <div class="order-item">
              <div class="order-item-info">
                <span class="material-icons order-item-icon">${item.icon}</span>
                <span class="order-item-name">${item.name} x${item.quantity}</span>
              </div>
              <div class="order-item-price">$${item.subtotal.toFixed(2)}</div>
            </div>
          `).join('')}
        </div>
        <div class="order-total">
          <span>Total:</span>
          <span>$${this.currentOrder.total.toFixed(2)}</span>
        </div>
      </div>
   
(Content truncated due to size limit. Use line ranges to read in chunks)