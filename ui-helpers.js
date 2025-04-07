// Utilidades para la interfaz de usuario - Versión Demo
class UIHelpers {
  // Método para crear elementos de interfaz comunes
  static createButton(text, icon, className = 'btn', onClick = null) {
    const button = document.createElement('button');
    button.className = className;
    
    if (icon) {
      button.innerHTML = `<span class="material-icons">${icon}</span>`;
      if (text) {
        button.innerHTML += ` ${text}`;
      }
    } else {
      button.textContent = text;
    }
    
    if (onClick) {
      button.addEventListener('click', onClick);
    }
    
    return button;
  }
  
  // Método para crear mensajes de notificación
  static showNotification(message, type = 'info', duration = 3000) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span class="notification-icon material-icons">
        ${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}
      </span>
      <span class="notification-message">${message}</span>
    `;
    
    // Añadir al DOM
    const notificationsContainer = document.querySelector('.notifications-container');
    if (!notificationsContainer) {
      const container = document.createElement('div');
      container.className = 'notifications-container';
      document.body.appendChild(container);
      container.appendChild(notification);
    } else {
      notificationsContainer.appendChild(notification);
    }
    
    // Animar entrada
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Eliminar después de la duración
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, duration);
    
    return notification;
  }
  
  // Método para crear diálogos modales
  static showModal(title, content, buttons = []) {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" aria-label="Cerrar">
          <span class="material-icons">close</span>
        </button>
      </div>
      <div class="modal-content">
        ${content}
      </div>
      <div class="modal-footer"></div>
    `;
    
    // Añadir botones
    const footer = modal.querySelector('.modal-footer');
    buttons.forEach(button => {
      const btn = document.createElement('button');
      btn.className = `btn ${button.className || ''}`;
      btn.textContent = button.text;
      btn.addEventListener('click', () => {
        if (button.onClick) {
          button.onClick();
        }
        if (button.closeModal !== false) {
          document.body.removeChild(overlay);
        }
      });
      footer.appendChild(btn);
    });
    
    // Botón de cerrar
    const closeButton = modal.querySelector('.modal-close');
    closeButton.addEventListener('click', () => {
      document.body.removeChild(overlay);
    });
    
    // Añadir al DOM
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Animar entrada
    setTimeout(() => {
      overlay.classList.add('show');
    }, 10);
    
    return {
      modal,
      close: () => {
        overlay.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 300);
      }
    };
  }
  
  // Método para crear selectores de iconos
  static createIconSelector(selectedIcon, onSelect, iconType = 'all') {
    // Definir categorías de iconos
    const iconCategories = {
      food: [
        { name: 'restaurant', label: 'Restaurante' },
        { name: 'lunch_dining', label: 'Almuerzo' },
        { name: 'dinner_dining', label: 'Cena' },
        { name: 'bakery_dining', label: 'Panadería' },
        { name: 'breakfast_dining', label: 'Desayuno' },
        { name: 'brunch_dining', label: 'Brunch' },
        { name: 'fastfood', label: 'Comida Rápida' },
        { name: 'local_pizza', label: 'Pizza' },
        { name: 'local_cafe', label: 'Café' },
        { name: 'local_bar', label: 'Bar' },
        { name: 'icecream', label: 'Helado' },
        { name: 'cake', label: 'Pastel' },
        { name: 'set_meal', label: 'Comida' },
        { name: 'rice_bowl', label: 'Arroz' },
        { name: 'ramen_dining', label: 'Ramen' },
        { name: 'kebab_dining', label: 'Kebab' },
        { name: 'egg', label: 'Huevo' },
        { name: 'cookie', label: 'Galleta' }
      ],
      drinks: [
        { name: 'local_cafe', label: 'Café' },
        { name: 'local_bar', label: 'Bar' },
        { name: 'sports_bar', label: 'Bebidas' },
        { name: 'wine_bar', label: 'Vino' },
        { name: 'liquor', label: 'Licor' },
        { name: 'coffee', label: 'Café' },
        { name: 'free_breakfast', label: 'Desayuno' },
        { name: 'water_drop', label: 'Agua' },
        { name: 'water', label: 'Agua' }
      ],
      categories: [
        { name: 'category', label: 'Categoría' },
        { name: 'list', label: 'Lista' },
        { name: 'grid_view', label: 'Cuadrícula' },
        { name: 'view_module', label: 'Módulos' },
        { name: 'dashboard', label: 'Panel' },
        { name: 'folder', label: 'Carpeta' },
        { name: 'bookmark', label: 'Marcador' },
        { name: 'star', label: 'Estrella' },
        { name: 'favorite', label: 'Favorito' }
      ],
      actions: [
        { name: 'add_shopping_cart', label: 'Añadir al carrito' },
        { name: 'shopping_cart', label: 'Carrito' },
        { name: 'shopping_basket', label: 'Cesta' },
        { name: 'add', label: 'Añadir' },
        { name: 'remove', label: 'Quitar' },
        { name: 'check', label: 'Verificar' },
        { name: 'done', label: 'Hecho' },
        { name: 'close', label: 'Cerrar' },
        { name: 'edit', label: 'Editar' },
        { name: 'delete', label: 'Eliminar' }
      ],
      // Iconos específicos para categorías de alimentos
      foodCategories: [
        { name: 'restaurant', label: 'Todos los alimentos' },
        { name: 'lunch_dining', label: 'Alimentos salados' },
        { name: 'bakery_dining', label: 'Panadería/Repostería' },
        { name: 'cake', label: 'Postres/Dulces' },
        { name: 'breakfast_dining', label: 'Desayunos' },
        { name: 'soup_kitchen', label: 'Sopas' },
        { name: 'dinner_dining', label: 'Cenas' },
        { name: 'fastfood', label: 'Comida rápida' },
        { name: 'local_pizza', label: 'Pizzas' },
        { name: 'set_meal', label: 'Platos principales' },
        { name: 'egg_alt', label: 'Huevos/Desayunos' },
        { name: 'icecream', label: 'Helados' },
        { name: 'cookie', label: 'Galletas' }
      ],
      // Iconos específicos para categorías de bebidas
      drinkCategories: [
        { name: 'local_cafe', label: 'Todas las bebidas' },
        { name: 'coffee', label: 'Café' },
        { name: 'free_breakfast', label: 'Bebidas calientes' },
        { name: 'water_drop', label: 'Agua' },
        { name: 'sports_bar', label: 'Bebidas frías' },
        { name: 'local_bar', label: 'Bebidas especiales' },
        { name: 'wine_bar', label: 'Jugos naturales' },
        { name: 'liquor', label: 'Refrescos' }
      ]
    };
    
    // Determinar qué categorías mostrar según el tipo
    let iconsToShow = [];
    if (iconType === 'all' || iconType === 'food') {
      iconsToShow = iconsToShow.concat(iconCategories.food);
    }
    if (iconType === 'all' || iconType === 'drinks') {
      iconsToShow = iconsToShow.concat(iconCategories.drinks);
    }
    if (iconType === 'all' || iconType === 'categories') {
      iconsToShow = iconsToShow.concat(iconCategories.categories);
    }
    if (iconType === 'all' || iconType === 'actions') {
      iconsToShow = iconsToShow.concat(iconCategories.actions);
    }
    if (iconType === 'foodCategories') {
      iconsToShow = iconCategories.foodCategories;
    }
    if (iconType === 'drinkCategories') {
      iconsToShow = iconCategories.drinkCategories;
    }
    
    // Crear contenido del modal
    let content = `
      <div class="icon-selector">
        <div class="icon-selector-tabs">
          ${iconType === 'all' ? `
            <button class="icon-tab active" data-type="all">Todos</button>
            <button class="icon-tab" data-type="food">Alimentos</button>
            <button class="icon-tab" data-type="drinks">Bebidas</button>
            <button class="icon-tab" data-type="categories">Categorías</button>
            <button class="icon-tab" data-type="actions">Acciones</button>
          ` : ''}
        </div>
        <div class="icon-selector-search">
          <input type="text" placeholder="Buscar icono..." class="icon-search">
        </div>
        <div class="icon-selector-grid">
          ${iconsToShow.map(icon => `
            <div class="icon-item ${selectedIcon === icon.name ? 'selected' : ''}" data-icon="${icon.name}" title="${icon.label}">
              <span class="material-icons">${icon.name}</span>
              <span class="icon-label">${icon.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    // Crear modal
    const modal = this.showModal('Seleccionar Icono', content, [
      { text: 'Cancelar', className: 'btn-secondary' },
      { text: 'Seleccionar', className: 'btn-primary', onClick: () => {
        const selectedIconElement = document.querySelector('.icon-item.selected');
        if (selectedIconElement) {
          const iconName = selectedIconElement.getAttribute('data-icon');
          onSelect(iconName);
        }
      }}
    ]);
    
    // Añadir eventos
    const iconItems = document.querySelectorAll('.icon-item');
    iconItems.forEach(item => {
      item.addEventListener('click', () => {
        // Quitar selección anterior
        document.querySelectorAll('.icon-item.selected').forEach(el => {
          el.classList.remove('selected');
        });
        // Añadir selección
        item.classList.add('selected');
      });
    });
    
    // Filtrado de búsqueda
    const searchInput = document.querySelector('.icon-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        iconItems.forEach(item => {
          const iconName = item.getAttribute('data-icon').toLowerCase();
          const iconLabel = item.querySelector('.icon-label').textContent.toLowerCase();
          if (iconName.includes(searchTerm) || iconLabel.includes(searchTerm)) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
    
    // Cambio de pestañas
    const tabButtons = document.querySelectorAll('.icon-tab');
    tabButtons.forEach(tab => {
      tab.addEventListener('click', () => {
        // Actualizar pestañas
        tabButtons.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Filtrar iconos
        const type = tab.getAttribute('data-type');
        iconItems.forEach(item => {
          const iconName = item.getAttribute('data-icon');
          const iconCategory = this.getIconCategory(iconName, iconCategories);
          
          if (type === 'all' || iconCategory === type) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
    return modal;
  }
  
  // Método auxiliar para determinar la categoría de un icono
  static getIconCategory(iconName, iconCategories) {
    for (const category in iconCategories) {
      if (iconCategories[category].some(icon => icon.name === iconName)) {
        return category;
      }
    }
    return null;
  }
  
  // Método para crear selector de colores
  static createColorSelector(selectedColor, onSelect) {
    // Paleta de colores predefinidos
    const colors = [
      { hex: '#3498db', name: 'Azul' },
      { hex: '#2ecc71', name: 'Verde' },
      { hex: '#e74c3c', name: 'Rojo' },
      { hex: '#f39c12', name: 'Naranja' },
      { hex: '#9b59b6', name: 'Púrpura' },
      { hex: '#1abc9c', name: 'Turquesa' },
      { hex: '#34495e', name: 'Azul Oscuro' },
      { hex: '#e67e22', name: 'Naranja Oscuro' },
      { hex: '#d35400', name: 'Marrón' },
      { hex: '#c0392b', name: 'Rojo Oscuro' },
      { hex: '#16a085', name: 'Verde Oscuro' },
      { hex: '#8e44ad', name: 'Púrpura Oscuro' },
      { hex: '#2c3e50', name: 'Negro Azulado' },
      { hex: '#f1c40f', name: 'Amarillo' },
      { hex: '#27ae60', name: 'Verde Esmeralda' },
      { hex: '#7f8c8d', name: 'Gris' }
    ];
    
    // Crear contenido del modal
    let content = `
      <div class="color-selector">
        <div class="color-selector-grid">
          ${colors.map(color => `
            <div class="color-item ${selectedColor === color.hex ? 'selected' : ''}" 
                 data-color="${color.hex}" 
                 title="${color.name}" 
                 style="background-color: ${color.hex}">
            </div>
          `).join('')}
        </div>
        <div class="color-custom">
          <label for="custom-color">Color personalizado:</label>
          <input type="color" id="custom-color" value="${selectedColor || '#3498db'}">
        </div>
      </div>
    `;
    
    // Crear modal
    const modal = this.showModal('Seleccionar Color', content, [
      { text: 'Cancelar', className: 'btn-secondary' },
      { text: 'Seleccionar', className: 'btn-primary', onClick: () => {
        let selectedColorValue;
        const selectedColorElement = document.querySelector('.color-item.selected');
        if (selectedColorElement) {
          selectedColorValue = selectedColorElement.getAttribute('data-color');
        } else {
          selectedColorValue = document.getElementById('custom-color').value;
        }
        onSelect(selectedColorValue);
      }}
    ]);
    
    // Añadir eventos
    const colorItems = document.querySelectorAll('.color-item');
    colorItems.forEach(item => {
      item.addEventListener('click', () => {
        // Quitar selección anterior
        document.querySelectorAll('.color-item.selected').forEach(el => {
          el.classList.remove('selected');
        });
        // Añadir selección
        item.classList.add('selected');
        // Actualizar color personalizado
        document.getElementById('custom-color').value = item.getAttribute('data-color');
      });
    });
    
    // Evento para color personalizado
    const customColorInput = document.getElementById('custom-color');
    customColorInput.addEventListener('input', () => {
      // Quitar selección de colores predefinidos
      document.querySelectorAll('.color-item.selected').forEach(el => {
        el.classList.remove('selected');
      });
    });
    
    return modal;
  }
  
  // Método para formatear fecha
  static formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Método para formatear precio
  static formatPrice(price, currencySymbol = '$') {
    return `${currencySymbol}${price.toFixed(2)}`;
  }
  
  // Método para generar ID único
  static generateId(prefix) {
    return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
}
