// Servicio de datos para la versión demo que utiliza localStorage
class DemoDataService {
  constructor() {
    this.storagePrefix = 'menu_interactivo_demo_';
    this.initializeDefaultData();
  }
  
  // Inicializar datos por defecto si no existen
  async initializeDefaultData() {
    // Verificar si ya hay datos
    const hasData = localStorage.getItem(`${this.storagePrefix}initialized`);
    
    if (!hasData) {
      console.log('Inicializando datos por defecto...');
      
      // Crear datos por defecto
      await this.resetToDefaults();
      
      // Marcar como inicializado
      localStorage.setItem(`${this.storagePrefix}initialized`, 'true');
    }
  }
  
  // Restablecer a datos por defecto
  async resetToDefaults() {
    // Configuración
    const defaultSettings = {
      appName: 'Menú Interactivo',
      schoolName: 'Escuela de Educación Especial',
      currencySymbol: '$',
      adminPassword: 'demo2025',
      theme: {
        primaryColor: '#3498db',
        secondaryColor: '#2ecc71'
      }
    };
    
    // Categorías
    const defaultCategories = [
      { id: 'cat1', name: 'Alimentos Salados', icon: 'lunch_dining', color: '#e74c3c', active: true, order: 1 },
      { id: 'cat2', name: 'Postres', icon: 'cake', color: '#9b59b6', active: true, order: 2 },
      { id: 'cat3', name: 'Bebidas', icon: 'local_cafe', color: '#3498db', active: true, order: 3 },
      { id: 'cat4', name: 'Sopas', icon: 'soup_kitchen', color: '#1abc9c', active: true, order: 4 }
    ];
    
    // Productos
    const defaultProducts = [
      // Alimentos Salados
      { id: 'prod1', name: 'Sándwich', categoryId: 'cat1', price: 25.00, icon: 'lunch_dining', available: true },
      { id: 'prod2', name: 'Quesadilla', categoryId: 'cat1', price: 20.00, icon: 'lunch_dining', available: true },
      { id: 'prod3', name: 'Taco', categoryId: 'cat1', price: 15.00, icon: 'lunch_dining', available: true },
      
      // Postres
      { id: 'prod4', name: 'Pastel', categoryId: 'cat2', price: 30.00, icon: 'cake', available: true },
      { id: 'prod5', name: 'Galletas', categoryId: 'cat2', price: 15.00, icon: 'cookie', available: true },
      { id: 'prod6', name: 'Helado', categoryId: 'cat2', price: 20.00, icon: 'icecream', available: true },
      
      // Bebidas
      { id: 'prod7', name: 'Café', categoryId: 'cat3', price: 18.00, icon: 'coffee', available: true },
      { id: 'prod8', name: 'Jugo', categoryId: 'cat3', price: 15.00, icon: 'local_bar', available: true },
      { id: 'prod9', name: 'Agua', categoryId: 'cat3', price: 10.00, icon: 'water_drop', available: true },
      
      // Sopas
      { id: 'prod10', name: 'Sopa de Verduras', categoryId: 'cat4', price: 25.00, icon: 'soup_kitchen', available: true },
      { id: 'prod11', name: 'Caldo de Pollo', categoryId: 'cat4', price: 30.00, icon: 'soup_kitchen', available: true }
    ];
    
    // Estudiantes
    const defaultStudents = [
      { id: 'stu1', name: 'Ana García', group: 'Taller Alimentos', active: true },
      { id: 'stu2', name: 'Carlos López', group: 'Taller Alimentos', active: true },
      { id: 'stu3', name: 'María Rodríguez', group: 'Taller Alimentos', active: true },
      { id: 'stu4', name: 'Juan Pérez', group: 'Taller Alimentos', active: true }
    ];
    
    // Órdenes (vacío por defecto)
    const defaultOrders = [];
    
    // Guardar datos por defecto
    await this.saveSettings(defaultSettings);
    
    // Guardar categorías
    for (const category of defaultCategories) {
      await this.saveCategory(category);
    }
    
    // Guardar productos
    for (const product of defaultProducts) {
      await this.saveProduct(product);
    }
    
    // Guardar estudiantes
    for (const student of defaultStudents) {
      await this.saveStudent(student);
    }
    
    // Guardar órdenes
    localStorage.setItem(`${this.storagePrefix}orders`, JSON.stringify(defaultOrders));
    
    return true;
  }
  
  // Obtener configuración
  async getSettings() {
    const settings = localStorage.getItem(`${this.storagePrefix}settings`);
    return settings ? JSON.parse(settings) : {};
  }
  
  // Guardar configuración
  async saveSettings(settings) {
    localStorage.setItem(`${this.storagePrefix}settings`, JSON.stringify(settings));
    return settings;
  }
  
  // Obtener categorías
  async getCategories() {
    const categories = localStorage.getItem(`${this.storagePrefix}categories`);
    return categories ? JSON.parse(categories) : [];
  }
  
  // Guardar categoría
  async saveCategory(category) {
    // Obtener categorías existentes
    const categories = await this.getCategories();
    
    // Verificar si ya existe
    const index = categories.findIndex(c => c.id === category.id);
    
    if (index !== -1) {
      // Actualizar
      categories[index] = category;
    } else {
      // Añadir
      categories.push(category);
    }
    
    // Guardar
    localStorage.setItem(`${this.storagePrefix}categories`, JSON.stringify(categories));
    
    return category;
  }
  
  // Eliminar categoría
  async deleteCategory(categoryId) {
    // Obtener categorías existentes
    const categories = await this.getCategories();
    
    // Filtrar
    const updatedCategories = categories.filter(c => c.id !== categoryId);
    
    // Guardar
    localStorage.setItem(`${this.storagePrefix}categories`, JSON.stringify(updatedCategories));
    
    return true;
  }
  
  // Obtener productos
  async getProducts() {
    const products = localStorage.getItem(`${this.storagePrefix}products`);
    return products ? JSON.parse(products) : [];
  }
  
  // Obtener productos por categoría
  async getProductsByCategory(categoryId) {
    const products = await this.getProducts();
    return products.filter(p => p.categoryId === categoryId && p.available);
  }
  
  // Guardar producto
  async saveProduct(product) {
    // Obtener productos existentes
    const products = await this.getProducts();
    
    // Verificar si ya existe
    const index = products.findIndex(p => p.id === product.id);
    
    if (index !== -1) {
      // Actualizar
      products[index] = product;
    } else {
      // Añadir
      products.push(product);
    }
    
    // Guardar
    localStorage.setItem(`${this.storagePrefix}products`, JSON.stringify(products));
    
    return product;
  }
  
  // Eliminar producto
  async deleteProduct(productId) {
    // Obtener productos existentes
    const products = await this.getProducts();
    
    // Filtrar
    const updatedProducts = products.filter(p => p.id !== productId);
    
    // Guardar
    localStorage.setItem(`${this.storagePrefix}products`, JSON.stringify(updatedProducts));
    
    return true;
  }
  
  // Obtener estudiantes
  async getStudents() {
    const students = localStorage.getItem(`${this.storagePrefix}students`);
    return students ? JSON.parse(students) : [];
  }
  
  // Guardar estudiante
  async saveStudent(student) {
    // Obtener estudiantes existentes
    const students = await this.getStudents();
    
    // Verificar si ya existe
    const index = students.findIndex(s => s.id === student.id);
    
    if (index !== -1) {
      // Actualizar
      students[index] = student;
    } else {
      // Añadir
      students.push(student);
    }
    
    // Guardar
    localStorage.setItem(`${this.storagePrefix}students`, JSON.stringify(students));
    
    return student;
  }
  
  // Eliminar estudiante
  async deleteStudent(studentId) {
    // Obtener estudiantes existentes
    const students = await this.getStudents();
    
    // Filtrar
    const updatedStudents = students.filter(s => s.id !== studentId);
    
    // Guardar
    localStorage.setItem(`${this.storagePrefix}students`, JSON.stringify(updatedStudents));
    
    return true;
  }
  
  // Obtener órdenes
  async getOrders() {
    const orders = localStorage.getItem(`${this.storagePrefix}orders`);
    return orders ? JSON.parse(orders) : [];
  }
  
  // Guardar orden
  async saveOrder(order) {
    // Obtener órdenes existentes
    const orders = await this.getOrders();
    
    // Verificar si ya existe
    const index = orders.findIndex(o => o.id === order.id);
    
    if (index !== -1) {
      // Actualizar
      orders[index] = order;
    } else {
      // Añadir
      orders.push(order);
    }
    
    // Guardar
    localStorage.setItem(`${this.storagePrefix}orders`, JSON.stringify(orders));
    
    return order;
  }
  
  // Eliminar orden
  async deleteOrder(orderId) {
    // Obtener órdenes existentes
    const orders = await this.getOrders();
    
    // Filtrar
    const updatedOrders = orders.filter(o => o.id !== orderId);
    
    // Guardar
    localStorage.setItem(`${this.storagePrefix}orders`, JSON.stringify(updatedOrders));
    
    return true;
  }
}

// Crear instancia global
window.demoDataService = new DemoDataService();
