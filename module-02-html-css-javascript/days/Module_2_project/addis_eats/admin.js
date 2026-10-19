/**
 * Addis Eats — Admin Dashboard
 */

const STORAGE_KEYS = {
  MENU: 'addiseats_menu',
  ORDERS: 'addiseats_orders',
};

const SESSION_KEY = 'adminLoggedIn';
const ORDER_STATUSES = ['pending', 'preparing', 'delivering', 'delivered'];

function formatETB(amount) {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 2,
  }).format(amount);
}

function getStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

async function seedMenuIfNeeded() {
  const existing = getStorage(STORAGE_KEYS.MENU);
  if (existing && existing.length > 0) return existing;

  const response = await fetch('data/menu.json');
  if (!response.ok) throw new Error('Failed to seed menu data');
  const menu = await response.json();
  setStorage(STORAGE_KEYS.MENU, menu);
  return menu;
}

function requireAuth() {
  if (sessionStorage.getItem(SESSION_KEY) !== 'true') {
    window.location.href = 'admin-login.html';
  }
}

let menu = [];
let orders = [];
let dishSearchQuery = '';
let pendingDelete = null;

const els = {
  sectionTitle: document.getElementById('section-title'),
  sections: {
    dashboard: document.getElementById('section-dashboard'),
    dishes: document.getElementById('section-dishes'),
    orders: document.getElementById('section-orders'),
  },
  navItems: document.querySelectorAll('.nav-item[data-section]'),
  statRevenue: document.getElementById('stat-revenue'),
  statOrders: document.getElementById('stat-orders'),
  statAov: document.getElementById('stat-aov'),
  topDishes: document.getElementById('top-dishes'),
  topDishesEmpty: document.getElementById('top-dishes-empty'),
  statusChart: document.getElementById('status-chart'),
  dishesTableBody: document.getElementById('dishes-table-body'),
  dishesEmpty: document.getElementById('dishes-empty'),
  dishSearch: document.getElementById('dish-search'),
  ordersTableBody: document.getElementById('orders-table-body'),
  ordersEmpty: document.getElementById('orders-empty'),
  dishFormModal: document.getElementById('dish-form-modal'),
  dishForm: document.getElementById('dish-form'),
  dishFormTitle: document.getElementById('dish-form-title'),
  orderDetailModal: document.getElementById('order-detail-modal'),
  orderDetailContent: document.getElementById('order-detail-content'),
  confirmModal: document.getElementById('confirm-modal'),
  confirmMessage: document.getElementById('confirm-message'),
  confirmDeleteBtn: document.getElementById('confirm-delete-btn'),
};

function switchSection(name) {
  Object.entries(els.sections).forEach(([key, el]) => {
    el.hidden = key !== name;
  });
  els.navItems.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.section === name);
  });
  els.sectionTitle.textContent = name.charAt(0).toUpperCase() + name.slice(1);

  if (name === 'dashboard') renderDashboard();
  if (name === 'dishes') renderDishes();
  if (name === 'orders') renderOrders();
}

function renderDashboard() {
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const orderCount = orders.length;
  const aov = orderCount > 0 ? totalRevenue / orderCount : 0;

  els.statRevenue.textContent = formatETB(totalRevenue);
  els.statOrders.textContent = orderCount;
  els.statAov.textContent = formatETB(aov);

  const dishCounts = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      dishCounts[item.name] = (dishCounts[item.name] || 0) + item.quantity;
    });
  });

  const top = Object.entries(dishCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  els.topDishes.innerHTML = '';
  els.topDishesEmpty.hidden = top.length > 0;

  top.forEach(([name, count], i) => {
    const row = document.createElement('div');
    row.className = 'top-dish-row';
    row.innerHTML = `<span class="rank">${i + 1}</span><span class="name">${name}</span><span class="count">${count} sold</span>`;
    els.topDishes.appendChild(row);
  });

  const statusCounts = ORDER_STATUSES.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(statusCounts), 1);
  els.statusChart.innerHTML = '';

  ORDER_STATUSES.forEach((status) => {
    const count = statusCounts[status];
    const pct = (count / maxCount) * 100;
    const bar = document.createElement('div');
    bar.className = 'status-bar-row';
    bar.innerHTML = `
      <span class="status-label">${status}</span>
      <div class="status-bar-track">
        <div class="status-bar-fill status-${status}" style="width:${pct}%"></div>
      </div>
      <span class="status-count">${count}</span>
    `;
    els.statusChart.appendChild(bar);
  });
}

function getFilteredDishes() {
  const q = dishSearchQuery.toLowerCase();
  if (!q) return menu;
  return menu.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
  );
}

function renderDishes() {
  const filtered = getFilteredDishes();
  els.dishesTableBody.innerHTML = '';
  els.dishesEmpty.hidden = filtered.length > 0;

  filtered.forEach((dish) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${dish.name}</td>
      <td><span class="badge">${dish.category}</span></td>
      <td>${formatETB(dish.price)}</td>
      <td class="actions-cell">
        <button type="button" class="btn btn-sm btn-secondary edit-dish-btn" data-id="${dish.id}">Edit</button>
        <button type="button" class="btn btn-sm btn-danger delete-dish-btn" data-id="${dish.id}">Delete</button>
      </td>
    `;
    tr.querySelector('.edit-dish-btn').addEventListener('click', () => openDishForm(dish));
    tr.querySelector('.delete-dish-btn').addEventListener('click', () =>
      confirmDelete('dish', dish.id, `Delete "${dish.name}"? This cannot be undone.`)
    );
    els.dishesTableBody.appendChild(tr);
  });
}

function renderOrders() {
  els.ordersTableBody.innerHTML = '';
  els.ordersEmpty.hidden = orders.length > 0;

  orders.forEach((order) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>#${order.id}</td>
      <td>${order.customerName}</td>
      <td>${formatETB(order.total)}</td>
      <td>
        <select class="status-select status-${order.status}" data-id="${order.id}" aria-label="Update status for order ${order.id}">
          ${ORDER_STATUSES.map((s) => `<option value="${s}" ${order.status === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </td>
      <td>${new Date(order.createdAt).toLocaleDateString()}</td>
      <td class="actions-cell">
        <button type="button" class="btn btn-sm btn-secondary view-order-btn" data-id="${order.id}">View</button>
        <button type="button" class="btn btn-sm btn-danger delete-order-btn" data-id="${order.id}">Delete</button>
      </td>
    `;

    tr.querySelector('.status-select').addEventListener('change', (e) => {
      updateOrderStatus(order.id, e.target.value);
    });

    tr.querySelector('.view-order-btn').addEventListener('click', () => showOrderDetail(order));
    tr.querySelector('.delete-order-btn').addEventListener('click', () =>
      confirmDelete('order', order.id, `Delete order #${order.id}? This cannot be undone.`)
    );

    els.ordersTableBody.appendChild(tr);
  });
}

function updateOrderStatus(orderId, status) {
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = status;
    setStorage(STORAGE_KEYS.ORDERS, orders);
    renderOrders();
    renderDashboard();
  }
}

function showOrderDetail(order) {
  const itemsHtml = order.items
    .map((i) => `<li>${i.name} × ${i.quantity} — ${formatETB(i.price * i.quantity)}</li>`)
    .join('');

  els.orderDetailContent.innerHTML = `
    <dl class="detail-list">
      <dt>Order ID</dt><dd>#${order.id}</dd>
      <dt>Customer</dt><dd>${order.customerName}</dd>
      <dt>Phone</dt><dd>${order.phone}</dd>
      <dt>Delivery Area</dt><dd>${order.deliveryArea}</dd>
      <dt>Status</dt><dd><span class="badge status-${order.status}">${order.status}</span></dd>
      <dt>Items</dt><dd><ul>${itemsHtml}</ul></dd>
      <dt>Subtotal</dt><dd>${formatETB(order.subtotal || 0)}</dd>
      <dt>Delivery Fee</dt><dd>${formatETB(order.deliveryFee || 0)}</dd>
      <dt>Total</dt><dd><strong>${formatETB(order.total)}</strong></dd>
      ${order.specialInstructions ? `<dt>Special Instructions</dt><dd>${order.specialInstructions}</dd>` : ''}
      <dt>Estimated Delivery</dt><dd>${order.estimatedDelivery || 'N/A'}</dd>
      <dt>Placed</dt><dd>${new Date(order.createdAt).toLocaleString()}</dd>
    </dl>
  `;
  els.orderDetailModal.hidden = false;
}

function openDishForm(dish = null) {
  els.dishForm.reset();
  document.getElementById('dish-id').value = dish ? dish.id : '';

  if (dish) {
    els.dishFormTitle.textContent = 'Edit Dish';
    document.getElementById('dish-name').value = dish.name;
    document.getElementById('dish-description').value = dish.description;
    document.getElementById('dish-price').value = dish.price;
    document.getElementById('dish-category').value = dish.category;
    document.getElementById('dish-image').value = dish.image;
    document.getElementById('dish-ingredients').value = dish.ingredients.join(', ');
  } else {
    els.dishFormTitle.textContent = 'Add New Dish';
  }

  els.dishFormModal.hidden = false;
}

function saveDish(formData) {
  const id = formData.id ? Number(formData.id) : Date.now();
  const dish = {
    id,
    name: formData.name,
    description: formData.description,
    price: Number(formData.price),
    category: formData.category,
    image: formData.image,
    ingredients: formData.ingredients.split(',').map((i) => i.trim()).filter(Boolean),
  };

  const idx = menu.findIndex((d) => d.id === id);
  if (idx >= 0) {
    menu[idx] = dish;
  } else {
    menu.push(dish);
  }

  setStorage(STORAGE_KEYS.MENU, menu);
  renderDishes();
  els.dishFormModal.hidden = true;
}

function confirmDelete(type, id, message) {
  pendingDelete = { type, id };
  els.confirmMessage.textContent = message;
  els.confirmModal.hidden = false;
}

function executeDelete() {
  if (!pendingDelete) return;

  if (pendingDelete.type === 'dish') {
    menu = menu.filter((d) => d.id !== pendingDelete.id);
    setStorage(STORAGE_KEYS.MENU, menu);
    renderDishes();
  } else if (pendingDelete.type === 'order') {
    orders = orders.filter((o) => o.id !== pendingDelete.id);
    setStorage(STORAGE_KEYS.ORDERS, orders);
    renderOrders();
    renderDashboard();
  }

  pendingDelete = null;
  els.confirmModal.hidden = true;
}

function bindEvents() {
  els.navItems.forEach((btn) => {
    btn.addEventListener('click', () => switchSection(btn.dataset.section));
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = 'admin-login.html';
  });

  els.dishSearch.addEventListener('input', (e) => {
    dishSearchQuery = e.target.value;
    renderDishes();
  });

  document.getElementById('add-dish-btn').addEventListener('click', () => openDishForm());

  els.dishForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveDish({
      id: document.getElementById('dish-id').value,
      name: document.getElementById('dish-name').value.trim(),
      description: document.getElementById('dish-description').value.trim(),
      price: document.getElementById('dish-price').value,
      category: document.getElementById('dish-category').value,
      image: document.getElementById('dish-image').value.trim(),
      ingredients: document.getElementById('dish-ingredients').value,
    });
  });

  document.querySelectorAll('[data-close-dish-form]').forEach((el) => {
    el.addEventListener('click', () => { els.dishFormModal.hidden = true; });
  });

  document.querySelectorAll('[data-close-order-detail]').forEach((el) => {
    el.addEventListener('click', () => { els.orderDetailModal.hidden = true; });
  });

  document.querySelectorAll('[data-close-confirm]').forEach((el) => {
    el.addEventListener('click', () => {
      pendingDelete = null;
      els.confirmModal.hidden = true;
    });
  });

  els.confirmDeleteBtn.addEventListener('click', executeDelete);
}

async function init() {
  requireAuth();
  bindEvents();

  try {
    menu = await seedMenuIfNeeded();
    orders = getStorage(STORAGE_KEYS.ORDERS, []);
    renderDashboard();
  } catch (err) {
    console.error(err);
  }
}

init();
