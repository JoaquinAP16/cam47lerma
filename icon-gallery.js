// Componente específico para la galería de iconos - Versión Demo
class IconGallery {
  constructor() {
    this.foodCategories = [
      { id: 'salados', name: 'Alimentos Salados', icon: 'lunch_dining', color: '#e74c3c' },
      { id: 'dulces', name: 'Postres/Dulces', icon: 'cake', color: '#9b59b6' },
      { id: 'bebidas', name: 'Bebidas', icon: 'local_cafe', color: '#3498db' },
      { id: 'sopas', name: 'Sopas', icon: 'soup_kitchen', color: '#1abc9c' },
      { id: 'desayunos', name: 'Desayunos', icon: 'breakfast_dining', color: '#2ecc71' },
      { id: 'reposteria', name: 'Repostería', icon: 'bakery_dining', color: '#f39c12' }
    ];
    
    this.productIcons = {
      'salados': [
        { icon: 'lunch_dining', label: 'Plato general' },
        { icon: 'dinner_dining', label: 'Plato principal' },
        { icon: 'set_meal', label: 'Comida completa' },
        { icon: 'rice_bowl', label: 'Arroz/Bowl' },
        { icon: 'ramen_dining', label: 'Sopa/Pasta' },
        { icon: 'kebab_dining', label: 'Carne/Kebab' },
        { icon: 'fastfood', label: 'Comida rápida' },
        { icon: 'local_pizza', label: 'Pizza' }
      ],
      'dulces': [
        { icon: 'cake', label: 'Pastel' },
        { icon: 'icecream', label: 'Helado' },
        { icon: 'cookie', label: 'Galleta' },
        { icon: 'bakery_dining', label: 'Repostería' }
      ],
      'bebidas': [
        { icon: 'local_cafe', label: 'Café' },
        { icon: 'coffee', label: 'Taza de café' },
        { icon: 'free_breakfast', label: 'Bebida caliente' },
        { icon: 'water_drop', label: 'Agua' },
        { icon: 'water', label: 'Vaso de agua' },
        { icon: 'sports_bar', label: 'Bebida fría' },
        { icon: 'local_bar', label: 'Bebida especial' },
        { icon: 'wine_bar', label: 'Jugo' }
      ],
      'sopas': [
        { icon: 'soup_kitchen', label: 'Sopa' },
        { icon: 'ramen_dining', label: 'Sopa con fideos' }
      ],
      'desayunos': [
        { icon: 'breakfast_dining', label: 'Desayuno completo' },
        { icon: 'egg_alt', label: 'Huevo' },
        { icon: 'bakery_dining', label: 'Pan/Panadería' },
        { icon: 'coffee', label: 'Café' }
      ],
      'reposteria': [
        { icon: 'bakery_dining', label: 'Panadería general' },
        { icon: 'cake', label: 'Pastel' },
        { icon: 'cookie', label: 'Galleta' }
      ]
    };
  }
  
  // Obtener todas las categorías de alimentos predefinidas
  getFoodCategories() {
    return this.foodCategories;
  }
  
  // Obtener iconos de productos para una categoría específica
  getProductIconsForCategory(categoryId) {
    return this.productIcons[categoryId] || [];
  }
  
  // Mostrar selector de categoría de alimentos
  showCategorySelector(onSelect) {
    const content = `
      <div class="icon-gallery">
        <p>Selecciona una categoría para tu menú:</p>
        <div class="icon-gallery-grid">
          ${this.foodCategories.map(category => `
            <div class="icon-gallery-item" data-id="${category.id}" data-icon="${category.icon}" data-color="${category.color}">
              <div class="icon-gallery-preview" style="background-color: ${category.color}">
                <span class="material-icons">${category.icon}</span>
              </div>
              <span class="icon-gallery-label">${category.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    const modal = UIHelpers.showModal('Categorías de Alimentos', content, [
      { text: 'Cancelar', className: 'btn-secondary' },
      { text: 'Seleccionar', className: 'btn-primary', onClick: () => {
        const selectedItem = document.querySelector('.icon-gallery-item.selected');
        if (selectedItem) {
          const categoryId = selectedItem.getAttribute('data-id');
          const categoryIcon = selectedItem.getAttribute('data-icon');
          const categoryColor = selectedItem.getAttribute('data-color');
          const categoryName = selectedItem.querySelector('.icon-gallery-label').textContent;
          
          onSelect({
            id: categoryId,
            name: categoryName,
            icon: categoryIcon,
            color: categoryColor
          });
        }
      }}
    ]);
    
    // Añadir eventos
    const galleryItems = document.querySelectorAll('.icon-gallery-item');
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        // Quitar selección anterior
        document.querySelectorAll('.icon-gallery-item.selected').forEach(el => {
          el.classList.remove('selected');
        });
        // Añadir selección
        item.classList.add('selected');
      });
    });
    
    return modal;
  }
  
  // Mostrar selector de iconos de productos para una categoría específica
  showProductIconSelector(categoryId, onSelect) {
    const icons = this.getProductIconsForCategory(categoryId);
    const category = this.foodCategories.find(cat => cat.id === categoryId);
    
    if (!icons.length) {
      // Si no hay iconos específicos para esta categoría, mostrar iconos genéricos
      return UIHelpers.createIconSelector('restaurant', onSelect, 'food');
    }
    
    const content = `
      <div class="icon-gallery">
        <p>Selecciona un icono para el producto (${category ? category.name : 'producto'}):</p>
        <div class="icon-gallery-grid">
          ${icons.map(icon => `
            <div class="icon-gallery-item" data-icon="${icon.icon}">
              <div class="icon-gallery-preview" style="background-color: ${category ? category.color : '#3498db'}">
                <span class="material-icons">${icon.icon}</span>
              </div>
              <span class="icon-gallery-label">${icon.label}</span>
            </div>
          `).join('')}
        </div>
        <div class="icon-gallery-custom">
          <button class="btn btn-secondary" id="show-more-icons">Ver más iconos</button>
        </div>
      </div>
    `;
    
    const modal = UIHelpers.showModal(`Iconos para ${category ? category.name : 'Productos'}`, content, [
      { text: 'Cancelar', className: 'btn-secondary' },
      { text: 'Seleccionar', className: 'btn-primary', onClick: () => {
        const selectedItem = document.querySelector('.icon-gallery-item.selected');
        if (selectedItem) {
          const iconName = selectedItem.getAttribute('data-icon');
          onSelect(iconName);
        }
      }}
    ]);
    
    // Añadir eventos
    const galleryItems = document.querySelectorAll('.icon-gallery-item');
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        // Quitar selección anterior
        document.querySelectorAll('.icon-gallery-item.selected').forEach(el => {
          el.classList.remove('selected');
        });
        // Añadir selección
        item.classList.add('selected');
      });
    });
    
    // Botón para mostrar más iconos
    const showMoreButton = document.getElementById('show-more-icons');
    if (showMoreButton) {
      showMoreButton.addEventListener('click', () => {
        modal.close();
        setTimeout(() => {
          UIHelpers.createIconSelector('', onSelect, 'food');
        }, 300);
      });
    }
    
    return modal;
  }
  
  // Método para personalizar una categoría existente
  customizeCategory(category, onSave) {
    const content = `
      <div class="customize-form">
        <div class="form-group">
          <label for="category-name" class="form-label">Nombre de la categoría:</label>
          <input type="text" id="category-name" class="form-input" value="${category.name || ''}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Icono:</label>
          <div class="icon-preview" id="category-icon-preview">
            <span class="material-icons">${category.icon || 'restaurant'}</span>
          </div>
          <button class="btn btn-secondary" id="change-icon">Cambiar icono</button>
        </div>
        <div class="form-group">
          <label class="form-label">Color:</label>
          <div class="color-preview" id="category-color-preview" style="background-color: ${category.color || '#3498db'}"></div>
          <button class="btn btn-secondary" id="change-color">Cambiar color</button>
        </div>
      </div>
    `;
    
    const modal = UIHelpers.showModal('Personalizar Categoría', content, [
      { text: 'Cancelar', className: 'btn-secondary' },
      { text: 'Guardar', className: 'btn-primary', onClick: () => {
        const name = document.getElementById('category-name').value;
        const icon = document.getElementById('category-icon-preview').querySelector('.material-icons').textContent;
        const color = document.getElementById('category-color-preview').style.backgroundColor;
        
        onSave({
          id: category.id,
          name: name,
          icon: icon,
          color: color
        });
      }}
    ]);
    
    // Botón para cambiar icono
    document.getElementById('change-icon').addEventListener('click', () => {
      UIHelpers.createIconSelector(category.icon, (iconName) => {
        document.getElementById('category-icon-preview').querySelector('.material-icons').textContent = iconName;
      }, 'foodCategories');
    });
    
    // Botón para cambiar color
    document.getElementById('change-color').addEventListener('click', () => {
      UIHelpers.createColorSelector(category.color, (colorValue) => {
        document.getElementById('category-color-preview').style.backgroundColor = colorValue;
      });
    });
    
    return modal;
  }
  
  // Método para personalizar un producto
  customizeProduct(product, categoryId, onSave) {
    const category = this.foodCategories.find(cat => cat.id === categoryId);
    
    const content = `
      <div class="customize-form">
        <div class="form-group">
          <label for="product-name" class="form-label">Nombre del producto:</label>
          <input type="text" id="product-name" class="form-input" value="${product.name || ''}" required>
        </div>
        <div class="form-group">
          <label for="product-price" class="form-label">Precio:</label>
          <input type="number" id="product-price" class="form-input" value="${product.price || '0'}" min="0" step="0.01" required>
        </div>
        <div class="form-group">
          <label class="form-label">Icono:</label>
          <div class="icon-preview" id="product-icon-preview">
            <span class="material-icons">${product.icon || 'restaurant'}</span>
          </div>
          <button class="btn btn-secondary" id="change-icon">Cambiar icono</button>
        </div>
        <div class="form-group">
          <label class="form-label">Disponibilidad:</label>
          <div class="radio-group">
            <input type="radio" id="product-available-yes" name="product-available" value="true" ${product.available !== false ? 'checked' : ''}>
            <label for="product-available-yes">Disponible</label>
            <input type="radio" id="product-available-no" name="product-available" value="false" ${product.available === false ? 'checked' : ''}>
            <label for="product-available-no">No disponible</label>
          </div>
        </div>
      </div>
    `;
    
    const modal = UIHelpers.showModal('Personalizar Producto', content, [
      { text: 'Cancelar', className: 'btn-secondary' },
      { text: 'Guardar', className: 'btn-primary', onClick: () => {
        const name = document.getElementById('product-name').value;
        const price = parseFloat(document.getElementById('product-price').value);
        const icon = document.getElementById('product-icon-preview').querySelector('.material-icons').textContent;
        const available = document.querySelector('input[name="product-available"]:checked').value === 'true';
        
        onSave({
          id: product.id,
          name: name,
          price: price,
          icon: icon,
          available: available,
          categoryId: categoryId
        });
      }}
    ]);
    
    // Botón para cambiar icono
    document.getElementById('change-icon').addEventListener('click', () => {
      this.showProductIconSelector(categoryId, (iconName) => {
        document.getElementById('product-icon-preview').querySelector('.material-icons').textContent = iconName;
      });
    });
    
    return modal;
  }
}
