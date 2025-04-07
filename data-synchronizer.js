// Integración específica para sincronización de datos con OneDrive
class DataSynchronizer {
  constructor(oneDriveIntegration) {
    this.oneDrive = oneDriveIntegration;
    this.syncQueue = [];
    this.isSyncing = false;
    this.lastSyncTime = null;
    this.syncInterval = 5 * 60 * 1000; // 5 minutos por defecto
    this.autoSyncEnabled = true;
  }
  
  // Inicializar el sincronizador
  async initialize() {
    try {
      // Inicializar la integración con OneDrive
      await this.oneDrive.initialize();
      
      // Configurar sincronización automática
      this.setupAutoSync();
      
      // Sincronizar datos pendientes
      await this.syncPendingData();
      
      return true;
    } catch (error) {
      console.error('Error al inicializar sincronizador de datos:', error);
      return false;
    }
  }
  
  // Configurar sincronización automática
  setupAutoSync() {
    // Limpiar intervalo existente si hay
    if (this.autoSyncInterval) {
      clearInterval(this.autoSyncInterval);
    }
    
    // Configurar nuevo intervalo
    if (this.autoSyncEnabled) {
      this.autoSyncInterval = setInterval(() => {
        this.syncPendingData();
      }, this.syncInterval);
      
      // También sincronizar cuando la ventana recupera el foco
      window.addEventListener('focus', () => {
        if (this.autoSyncEnabled && !this.isSyncing) {
          this.syncPendingData();
        }
      });
      
      // Y antes de cerrar la ventana
      window.addEventListener('beforeunload', () => {
        if (this.syncQueue.length > 0) {
          this.syncPendingData(true);
        }
      });
    }
  }
  
  // Añadir operación a la cola de sincronización
  addToSyncQueue(operation) {
    this.syncQueue.push({
      ...operation,
      timestamp: Date.now()
    });
    
    // Guardar cola en localStorage
    this.saveSyncQueue();
    
    // Intentar sincronizar inmediatamente si está habilitado
    if (this.autoSyncEnabled && !this.isSyncing) {
      this.syncPendingData();
    }
  }
  
  // Guardar cola de sincronización en localStorage
  saveSyncQueue() {
    try {
      localStorage.setItem('menu_interactivo_sync_queue', JSON.stringify(this.syncQueue));
    } catch (error) {
      console.error('Error al guardar cola de sincronización:', error);
    }
  }
  
  // Cargar cola de sincronización desde localStorage
  loadSyncQueue() {
    try {
      const queue = localStorage.getItem('menu_interactivo_sync_queue');
      if (queue) {
        this.syncQueue = JSON.parse(queue);
      }
    } catch (error) {
      console.error('Error al cargar cola de sincronización:', error);
      this.syncQueue = [];
    }
  }
  
  // Sincronizar datos pendientes
  async syncPendingData(isSync = false) {
    // Si ya está sincronizando, salir
    if (this.isSyncing) return;
    
    // Cargar cola desde localStorage (por si se actualizó en otra pestaña)
    this.loadSyncQueue();
    
    // Si no hay nada que sincronizar, salir
    if (this.syncQueue.length === 0) return;
    
    this.isSyncing = true;
    
    try {
      // Procesar operaciones en orden
      const successfulOperations = [];
      
      for (const operation of this.syncQueue) {
        try {
          let success = false;
          
          switch (operation.type) {
            case 'saveSettings':
              success = await this.saveSettings(operation.data);
              break;
            case 'saveCategory':
              success = await this.saveCategory(operation.data);
              break;
            case 'deleteCategory':
              success = await this.deleteCategory(operation.data.id);
              break;
            case 'saveProduct':
              success = await this.saveProduct(operation.data);
              break;
            case 'deleteProduct':
              success = await this.deleteProduct(operation.data.id);
              break;
            case 'saveStudent':
              success = await this.saveStudent(operation.data);
              break;
            case 'deleteStudent':
              success = await this.deleteStudent(operation.data.id);
              break;
            case 'saveOrder':
              success = await this.saveOrder(operation.data);
              break;
          }
          
          if (success) {
            successfulOperations.push(operation);
          } else if (!isSync) {
            // Si no es sincronización forzada, detener en el primer error
            break;
          }
        } catch (error) {
          console.error(`Error al procesar operación ${operation.type}:`, error);
          if (!isSync) {
            // Si no es sincronización forzada, detener en el primer error
            break;
          }
        }
      }
      
      // Eliminar operaciones exitosas de la cola
      if (successfulOperations.length > 0) {
        this.syncQueue = this.syncQueue.filter(op => 
          !successfulOperations.some(sop => 
            sop.type === op.type && 
            JSON.stringify(sop.data) === JSON.stringify(op.data)
          )
        );
        
        // Guardar cola actualizada
        this.saveSyncQueue();
      }
      
      // Actualizar tiempo de última sincronización
      this.lastSyncTime = Date.now();
      
      return successfulOperations.length > 0;
    } catch (error) {
      console.error('Error al sincronizar datos pendientes:', error);
      return false;
    } finally {
      this.isSyncing = false;
    }
  }
  
  // Métodos para operaciones específicas
  
  async saveSettings(settings) {
    try {
      await this.oneDrive.saveDataFile('/data/settings.json', settings);
      return true;
    } catch (error) {
      console.error('Error al guardar configuración:', error);
      return false;
    }
  }
  
  async saveCategory(category) {
    try {
      // Obtener categorías actuales
      const categoriesData = await this.oneDrive.getDataFile('/data/categories.json');
      
      if (!categoriesData || !categoriesData.categories) {
        throw new Error('No se pudieron obtener las categorías');
      }
      
      // Buscar si la categoría ya existe
      const index = categoriesData.categories.findIndex(c => c.id === category.id);
      
      if (index >= 0) {
        // Actualizar categoría existente
        categoriesData.categories[index] = category;
      } else {
        // Añadir nueva categoría
        categoriesData.categories.push(category);
      }
      
      // Actualizar fecha
      categoriesData.lastUpdated = new Date().toISOString();
      
      // Guardar cambios
      await this.oneDrive.saveDataFile('/data/categories.json', categoriesData);
      
      return true;
    } catch (error) {
      console.error('Error al guardar categoría:', error);
      return false;
    }
  }
  
  async deleteCategory(categoryId) {
    try {
      // Obtener categorías actuales
      const categoriesData = await this.oneDrive.getDataFile('/data/categories.json');
      
      if (!categoriesData || !categoriesData.categories) {
        throw new Error('No se pudieron obtener las categorías');
      }
      
      // Filtrar la categoría a eliminar
      categoriesData.categories = categoriesData.categories.filter(c => c.id !== categoryId);
      
      // Actualizar fecha
      categoriesData.lastUpdated = new Date().toISOString();
      
      // Guardar cambios
      await this.oneDrive.saveDataFile('/data/categories.json', categoriesData);
      
      return true;
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      return false;
    }
  }
  
  async saveProduct(product) {
    try {
      // Obtener productos actuales
      const productsData = await this.oneDrive.getDataFile('/data/products.json');
      
      if (!productsData || !productsData.products) {
        throw new Error('No se pudieron obtener los productos');
      }
      
      // Buscar si el producto ya existe
      const index = productsData.products.findIndex(p => p.id === product.id);
      
      if (index >= 0) {
        // Actualizar producto existente
        productsData.products[index] = product;
      } else {
        // Añadir nuevo producto
        productsData.products.push(product);
      }
      
      // Actualizar fecha
      productsData.lastUpdated = new Date().toISOString();
      
      // Guardar cambios
      await this.oneDrive.saveDataFile('/data/products.json', productsData);
      
      return true;
    } catch (error) {
      console.error('Error al guardar producto:', error);
      return false;
    }
  }
  
  async deleteProduct(productId) {
    try {
      // Obtener productos actuales
      const productsData = await this.oneDrive.getDataFile('/data/products.json');
      
      if (!productsData || !productsData.products) {
        throw new Error('No se pudieron obtener los productos');
      }
      
      // Filtrar el producto a eliminar
      productsData.products = productsData.products.filter(p => p.id !== productId);
      
      // Actualizar fecha
      productsData.lastUpdated = new Date().toISOString();
      
      // Guardar cambios
      await this.oneDrive.saveDataFile('/data/products.json', productsData);
      
      return true;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      return false;
    }
  }
  
  async saveStudent(student) {
    try {
      // Obtener estudiantes actuales
      const studentsData = await this.oneDrive.getDataFile('/data/students.json');
      
      if (!studentsData || !studentsData.students) {
        throw new Error('No se pudieron obtener los estudiantes');
      }
      
      // Buscar si el estudiante ya existe
      const index = studentsData.students.findIndex(s => s.id === student.id);
      
      if (index >= 0) {
        // Actualizar estudiante existente
        studentsData.students[index] = student;
      } else {
        // Añadir nuevo estudiante
        studentsData.students.push(student);
      }
      
      // Actualizar fecha
      studentsData.lastUpdated = new Date().toISOString();
      
      // Guardar cambios
      await this.oneDrive.saveDataFile('/data/students.json', studentsData);
      
      return true;
    } catch (error) {
      console.error('Error al guardar estudiante:', error);
      return false;
    }
  }
  
  async deleteStudent(studentId) {
    try {
      // Obtener estudiantes actuales
      const studentsData = await this.oneDrive.getDataFile('/data/students.json');
      
      if (!studentsData || !studentsData.students) {
        throw new Error('No se pudieron obtener los estudiantes');
      }
      
      // Filtrar el estudiante a eliminar
      studentsData.students = studentsData.students.filter(s => s.id !== studentId);
      
      // Actualizar fecha
      studentsData.lastUpdated = new Date().toISOString();
      
      // Guardar cambios
      await this.oneDrive.saveDataFile('/data/students.json', studentsData);
      
      return true;
    } catch (error) {
      console.error('Error al eliminar estudiante:', error);
      return false;
    }
  }
  
  async saveOrder(order) {
    try {
      // Obtener órdenes actuales
      const ordersData = await this.oneDrive.getDataFile('/data/orders/current_month_orders.json');
      
      if (!ordersData) {
        // Si no existe el archivo, crear uno nuevo
        const newOrdersData = {
          orders: [order],
          month: this.getCurrentMonth(),
          lastUpdated: new Date().toISOString()
        };
        
        await this.oneDrive.saveDataFile('/data/orders/current_month_orders.json', newOrdersData);
        return true;
      }
      
      // Verificar si es el mes actual
      if (ordersData.month !== this.getCurrentMonth()) {
        // Si es un mes diferente, archivar el actual y crear uno nuevo
        await this.archiveCurrentOrders(ordersData);
        
        // Crear nuevo archivo para el mes actual
        const newOrdersData = {
          orders: [order],
          month: this.getCurrentMonth(),
          lastUpdated: new Date().toISOString()
        };
        
        await this.oneDrive.saveDataFile('/data/orders/current_month_orders.json', newOrdersData);
      } else {
        // Es el mes actual, actualizar
        // Buscar si la orden ya existe
        const index = ordersData.orders.findIndex(o => o.id === order.id);
        
        if (index >= 0) {
          // Actualizar orden existente
          ordersData.orders[index] = order;
        } else {
          // Añadir nueva orden
          ordersData.orders.push(order);
        }
        
        // Actualizar fecha
        ordersData.lastUpdated = new Date().toISOString();
        
        // Guardar cambios
        await this.oneDrive.saveDataFile('/data/orders/current_month_orders.json', ordersData);
      }
      
      return true;
    } catch (error) {
      console.error('Error al guardar orden:', error);
      return false;
    }
  }
  
  async archiveCurrentOrders(ordersData) {
    try {
      // Guardar en archivo de mes anterior
      const archiveFileName = `/data/orders/previous_months/${ordersData.month}.json`;
      await this.oneDrive.saveDataFile(archiveFileName, ordersData);
      
      return true;
    } catch (error) {
      console.error('Error al archivar órdenes:', error);
      return false;
    }
  }
  
  getCurrentMonth() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }
  
  // Métodos para sincronización completa
  
  async fullSync() {
    try {
      this.isSyncing = true;
      
      // Sincronizar datos pendientes primero
      await this.syncPendingData(true);
      
      // Obtener datos actualizados de OneDrive
      const settings = await this.oneDrive.getDataFile('/data/settings.json');
      const categories = await this.oneDrive.getDataFile('/data/categories.json');
      const products = await this.oneDrive.getDataFile('/data/products.json');
      const students = await this.oneDrive.getDataFile('/data/students.json');
      const orders = await this.oneDrive.getDataFile('/data/orders/current_month_orders.json');
      
      // Actualizar datos en localStorage
      if (settings) localStorage.setItem('menu_interactivo_settings', JSON.stringify(settings));
      if (categories) localStorage.setItem('menu_interactivo_categories', JSON.stringify(categories.categories));
      if (products) localStorage.setItem('menu_interactivo_products', JSON.stringify(products.products));
      if (students) localStorage.setItem('menu_interactivo_students', JSON.stringify(students.students));
      if (orders) localStorage.setItem('menu_interactivo_orders', JSON.stringify(orders.orders));
      
      // Actualizar tiempo de última sincronización
      this.lastSyncTime = Date.now();
      localStorage.setItem('menu_interactivo_last_sync', this.lastSyncTime.toString());
      
      return {
        success: true,
        settings,
        categories: categories?.categories,
        products: products?.products,
        students: students?.students,
        orders: orders?.orders
      };
    } catch (error) {
      console.error('Error en sincronización completa:', error);
      return {
        success: false,
        error: error.message
      };
    } finally {
      this.isSyncing = false;
    }
  }
  
  // Configuración de sincronización
  
  setAutoSync(enabled) {
    this.autoSyncEnabled = enabled;
    localStorage.setItem('menu_interactivo_auto_sync', enabled.toString());
    this.setupAutoSync();
  }
  
  setSyncInterval(minutes) {
    this.syncInterval = minutes * 60 * 1000;
    localStorage.setItem('menu_interactivo_sync_interval', minutes.toString());
    this.setupAutoSync();
  }
  
  getLastSyncTime() {
    return this.lastSyncTime;
  }
  
  getSyncStatus() {
    return {
      isSyncing: this.isSyncing,
      lastSyncTime: this.lastSyncTime,
      pendingOperations: this.syncQueue.length,
      aut
(Content truncated due to size limit. Use line ranges to read in chunks)