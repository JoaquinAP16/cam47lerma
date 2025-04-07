let students = JSON.parse(localStorage.getItem('students') || '[]');
let categories = JSON.parse(localStorage.getItem('categories') || '[]');
let products = JSON.parse(localStorage.getItem('products') || '[]');
let cart = [];

function renderStudents() {
  const container = document.getElementById('student-list');
  container.innerHTML = '';
  students.forEach(s => {
    const el = document.createElement('div');
    el.textContent = s;
    container.appendChild(el);
  });
}
function renderCategories() {
  const container = document.getElementById('category-list');
  const select = document.getElementById('product-category');
  container.innerHTML = '';
  select.innerHTML = '';
  categories.forEach(c => {
    const el = document.createElement('div');
    el.textContent = c;
    container.appendChild(el);
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    select.appendChild(opt);
  });
}
function renderProducts() {
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  products.forEach(p => {
    const btn = document.createElement('button');
    btn.textContent = `${p.name} ($${p.price})`;
    btn.onclick = () => {
      cart.push(p);
      updateCart();
    };
    container.appendChild(btn);
  });
}
function updateCart() {
  const list = document.getElementById('cart-list');
  list.innerHTML = '';
  let total = 0;
  cart.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.name} - $${p.price}`;
    list.appendChild(li);
    total += p.price;
  });
  document.getElementById('cart-total').textContent = total;
}

function openConfig() {
  const pass = prompt("Contraseña:");
  if (pass === "camlerma47") {
    document.getElementById('config-panel').classList.remove('hidden');
    renderConfigLists();
  } else {
    alert("Incorrecto");
  }
}
function closeConfig() {
  document.getElementById('config-panel').classList.add('hidden');
}

function addStudent() {
  const name = document.getElementById('student-name').value.trim();
  if (name) {
    students.push(name);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
    renderConfigLists();
  }
}
function addCategory() {
  const name = document.getElementById('category-name').value.trim();
  if (name) {
    categories.push(name);
    localStorage.setItem('categories', JSON.stringify(categories));
    renderCategories();
    renderConfigLists();
  }
}
function addProduct() {
  const name = document.getElementById('product-name').value.trim();
  const price = parseFloat(document.getElementById('product-price').value);
  const category = document.getElementById('product-category').value;
  if (name && !isNaN(price)) {
    products.push({ name, price, category });
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
    renderConfigLists();
  }
}
function renderConfigLists() {
  document.getElementById('student-config-list').innerHTML = students.map(s => `<li>${s}</li>`).join('');
  document.getElementById('category-config-list').innerHTML = categories.map(c => `<li>${c}</li>`).join('');
  document.getElementById('product-config-list').innerHTML = products.map(p => `<li>${p.name} ($${p.price})</li>`).join('');
}

window.onload = () => {
  renderStudents();
  renderCategories();
  renderProducts();
};