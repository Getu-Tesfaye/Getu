/**
 * Addis Eats — Customer Application
 * All data persisted in localStorage per project spec.
 */

const STORAGE_KEYS = {
  MENU: 'addiseats_menu',
  ORDERS: 'addiseats_orders',
  CART: 'addiseats_cart',
  FAVORITES: 'addiseats_favorites',
  THEME: 'addiseats_theme',
};

const DELIVERY_FEES = {
  bole: 50,
  piassa: 40,
  kazanchis: 45,
  megenagna: 55,
  sarbet: 50,
  cmc: 60,
  other: 70,
};

const DELIVERY_TIMES = {
  bole: '30–45 min',
  piassa: '25–40 min',
  kazanchis: '30–45 min',
  megenagna: '35–50 min',
  sarbet: '30–45 min',
  cmc: '40–55 min',
  other: '45–60 min',
};

const CATEGORY_EMOJI = {
  ethiopian: '🍛',
  pizza: '🍕',
  burgers: '🍔',
  drinks: '🥤',
};

/** Format price as Ethiopian Birr */
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

/** Seed menu from menu.json on first run */
async function seedMenuIfNeeded() {
  const existing = getStorage(STORAGE_KEYS.MENU);
  if (existing && existing.length > 0) return existing;

  const response = await fetch('data/menu.json');
  if (!response.ok) throw new Error('Failed to load menu data. Please refresh the page.');
  const menu = await response.json();
  setStorage(STORAGE_KEYS.MENU, menu);
  return menu;
}

/** State */
let menu = [];
let cart = getStorage(STORAGE_KEYS.CART, []);
let favorites = getStorage(STORAGE_KEYS.FAVORITES, []);
let currentCategory = 'all';
let searchQuery = '';
let selectedDish = null;

/** DOM refs */
const els = {
  loading: document.getElementById('loading-indicator'),
  error: document.getElementById('error-message'),
  menuGrid: document.getElementById('menu-grid'),
  menuEmpty: document.getElementById('menu-empty'),
  searchInput: document.getElementById('search-input'),
  categoryBtns: document.querySelectorAll('.category-btn'),
  cartToggle: document.getElementById('cart-toggle'),
  cartBadge: document.getElementById('cart-badge'),
  cartPanel: document.getElementById('cart-panel'),
  cartOverlay: document.getElementById('cart-overlay'),
  cartClose: document.getElementById('cart-close'),
  cartItems: document.getElementById('cart-items'),
  cartEmpty: document.getElementById('cart-empty'),
  cartSubtotal: document.getElementById('cart-subtotal'),
  cartDeliveryFee: document.getElementById('cart-delivery-fee'),
  cartTotal: document.getElementById('cart-total'),
  checkoutBtn: document.getElementById('checkout-btn'),
  checkoutModal: document.getElementById('checkout-modal'),
  checkoutForm: document.getElementById('checkout-form'),
  deliveryArea: document.getElementById('delivery-area'),
  checkoutTotal: document.getElementById('checkout-total'),
  estimatedDelivery: document.getElementById('estimated-delivery'),
  confirmationModal: document.getElementById('confirmation-modal'),
  confirmMessage: document.getElementById('confirm-message'),
  confirmDeliveryTime: document.getElementById('confirm-delivery-time'),
  confirmClose: document.getElementById('confirm-close'),
  dishModal: document.getElementById('dish-modal'),
  historyBtn: document.getElementById('history-btn'),
  historyModal: document.getElementById('history-modal'),
  historyList: document.getElementById('history-list'),
  historyEmpty: document.getElementById('history-empty'),
  themeToggle: document.getElementById('theme-toggle'),
  themeIcon: document.getElementById('theme-icon'),
};

function showError(message) {
  els.error.textContent = message;
  els.error.hidden = false;
}

function hideError() {
  els.error.hidden = true;
}

function getFilteredMenu() {
  return menu.filter((dish) => {
    const matchesCategory = currentCategory === 'all' || dish.category === currentCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      dish.name.toLowerCase().includes(q) ||
      dish.description.toLowerCase().includes(q) ||
      dish.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
}

function renderMenu() {
  const filtered = getFilteredMenu();
  els.menuEmpty.hidden = filtered.length > 0;
  els.menuGrid.innerHTML = '';

  filtered.forEach((dish) => {
    const card = document.createElement('article');
    card.className = 'dish-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${dish.name}`);

    const isFavorite = favorites.includes(dish.id);
    const emoji = CATEGORY_EMOJI[dish.category] || '🍽️';

    card.innerHTML = `
      <div class="dish-card-image-wrap">
        <img class="dish-card-image" src="${dish.image}" alt="${dish.name}"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="placeholder" style="display:none" aria-hidden="true">${emoji}</div>
        <button type="button" class="favorite-btn ${isFavorite ? 'active' : ''}"
                data-id="${dish.id}" aria-label="${isFavorite ? 'Remove from' : 'Add to'} favorites"
                aria-pressed="${isFavorite}">${isFavorite ? '♥' : '♡'}</button>
      </div>
      <div class="dish-card-body">
        <span class="dish-card-category">${dish.category}</span>
        <h3 class="dish-card-name">${dish.name}</h3>
        <p class="dish-card-desc">${dish.description}</p>
        <div class="dish-card-footer">
          <span class="dish-price">${formatETB(dish.price)}</span>
          <button type="button" class="btn btn-primary btn-sm add-to-cart-btn" data-id="${dish.id}">
            Add to Cart
          </button>
        </div>
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart-btn') || e.target.closest('.favorite-btn')) return;
      openDishModal(dish);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDishModal(dish);
      }
    });

    card.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(dish.id);
    });

    card.querySelector('.favorite-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(dish.id);
    });

    els.menuGrid.appendChild(card);
  });
}

function openDishModal(dish) {
  selectedDish = dish;
  document.getElementById('dish-modal-title').textContent = dish.name;
  document.getElementById('modal-category').textContent = dish.category;
  document.getElementById('modal-description').textContent = dish.description;
  document.getElementById('modal-price').textContent = formatETB(dish.price);
  const img = document.getElementById('modal-image');
  img.src = dish.image;
  img.alt = dish.name;
  img.onerror = () => {
    img.style.display = 'none';
  };

  const ingredientsEl = document.getElementById('modal-ingredients');
  ingredientsEl.innerHTML = dish.ingredients
    .map((i) => `<span class="ingredient-tag">${i}</span>`)
    .join('');

  const favBtn = document.getElementById('modal-favorite-btn');
  const isFav = favorites.includes(dish.id);
  favBtn.textContent = isFav ? '♥ Remove from Favorites' : '♡ Add to Favorites';

  els.dishModal.hidden = false;
  document.getElementById('modal-add-cart-btn').focus();
}

function closeDishModal() {
  els.dishModal.hidden = true;
  selectedDish = null;
}

function addToCart(dishId) {
  const dish = menu.find((d) => d.id === dishId);
  if (!dish) return;

  const existing = cart.find((item) => item.id === dishId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: dish.id, name: dish.name, price: dish.price, quantity: 1 });
  }

  saveCart();
  renderCart();
  updateCartBadge();
}

function updateQuantity(dishId, delta) {
  const item = cart.find((i) => i.id === dishId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.id !== dishId);
  }

  saveCart();
  renderCart();
  updateCartBadge();
}

function removeFromCart(dishId) {
  cart = cart.filter((i) => i.id !== dishId);
  saveCart();
  renderCart();
  updateCartBadge();
}

function saveCart() {
  setStorage(STORAGE_KEYS.CART, cart);
}

function getCartSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getDeliveryFee(area) {
  return area ? DELIVERY_FEES[area] || 70 : 0;
}

function renderCart() {
  const hasItems = cart.length > 0;
  els.cartEmpty.hidden = hasItems;
  els.cartItems.innerHTML = '';
  els.checkoutBtn.disabled = !hasItems;

  cart.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${formatETB(item.price)} each</p>
        <div class="qty-controls">
          <button type="button" class="qty-btn" aria-label="Decrease quantity of ${item.name}">−</button>
          <span class="qty-value" aria-live="polite">${item.quantity}</span>
          <button type="button" class="qty-btn" aria-label="Increase quantity of ${item.name}">+</button>
        </div>
      </div>
      <button type="button" class="remove-btn" aria-label="Remove ${item.name} from cart">Remove</button>
    `;

    el.querySelector('.qty-btn:first-of-type').addEventListener('click', () => updateQuantity(item.id, -1));
    el.querySelector('.qty-btn:last-of-type').addEventListener('click', () => updateQuantity(item.id, 1));
    el.querySelector('.remove-btn').addEventListener('click', () => removeFromCart(item.id));

    els.cartItems.appendChild(el);
  });

  const subtotal = getCartSubtotal();
  const area = els.deliveryArea?.value || '';
  const fee = getDeliveryFee(area);

  els.cartSubtotal.textContent = formatETB(subtotal);
  els.cartDeliveryFee.textContent = formatETB(fee);
  els.cartTotal.textContent = formatETB(subtotal + fee);
}

function updateCartBadge() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  els.cartBadge.textContent = count;
  els.cartBadge.dataset.count = count;
}

function openCart() {
  els.cartPanel.hidden = false;
  els.cartOverlay.hidden = false;
  els.cartClose.focus();
}

function closeCart() {
  els.cartPanel.hidden = true;
  els.cartOverlay.hidden = true;
}

function toggleFavorite(dishId) {
  const idx = favorites.indexOf(dishId);
  if (idx >= 0) {
    favorites.splice(idx, 1);
  } else {
    favorites.push(dishId);
  }
  setStorage(STORAGE_KEYS.FAVORITES, favorites);
  renderMenu();
}

function validatePhone(phone) {
  return /^09\d{8}$/.test(phone.replace(/\s/g, ''));
}

function validateCheckoutForm() {
  let valid = true;
  const name = document.getElementById('customer-name');
  const phone = document.getElementById('customer-phone');
  const area = document.getElementById('delivery-area');
  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');
  const areaError = document.getElementById('area-error');

  nameError.textContent = '';
  phoneError.textContent = '';
  areaError.textContent = '';
  name.classList.remove('invalid');
  phone.classList.remove('invalid');
  area.classList.remove('invalid');

  if (!name.value.trim() || name.value.trim().length < 2) {
    nameError.textContent = 'Please enter your full name (at least 2 characters).';
    name.classList.add('invalid');
    valid = false;
  }

  if (!validatePhone(phone.value)) {
    phoneError.textContent = 'Enter a valid Ethiopian phone number (e.g. 0912345678).';
    phone.classList.add('invalid');
    valid = false;
  }

  if (!area.value) {
    areaError.textContent = 'Please select a delivery area.';
    area.classList.add('invalid');
    valid = false;
  }

  return valid;
}

function placeOrder(formData) {
  const area = formData.area;
  const subtotal = getCartSubtotal();
  const deliveryFee = getDeliveryFee(area);
  const total = subtotal + deliveryFee;
  const orders = getStorage(STORAGE_KEYS.ORDERS, []);

  const order = {
    id: Date.now(),
    customerName: formData.name.trim(),
    phone: formData.phone.trim(),
    deliveryArea: area,
    items: cart.map((item) => ({ ...item })),
    subtotal,
    deliveryFee,
    total,
    specialInstructions: formData.instructions.trim(),
    status: 'pending',
    estimatedDelivery: DELIVERY_TIMES[area] || '45–60 min',
    createdAt: new Date().toISOString(),
  };

  orders.unshift(order);
  setStorage(STORAGE_KEYS.ORDERS, orders);

  cart = [];
  saveCart();
  renderCart();
  updateCartBadge();

  return order;
}

function openCheckout() {
  const subtotal = getCartSubtotal();
  const area = els.deliveryArea.value;
  const fee = getDeliveryFee(area);
  els.checkoutTotal.textContent = formatETB(subtotal + fee);
  updateEstimatedDelivery();
  els.checkoutModal.hidden = false;
  document.getElementById('customer-name').focus();
}

function closeCheckout() {
  els.checkoutModal.hidden = true;
}

function updateEstimatedDelivery() {
  const area = els.deliveryArea.value;
  if (area) {
    els.estimatedDelivery.textContent = `Estimated delivery: ${DELIVERY_TIMES[area]}`;
  } else {
    els.estimatedDelivery.textContent = '';
  }
}

function showConfirmation(order) {
  els.confirmMessage.textContent = `Thank you, ${order.customerName}! Your order #${order.id} has been placed. Total: ${formatETB(order.total)}`;
  els.confirmDeliveryTime.textContent = `Estimated delivery: ${order.estimatedDelivery}`;
  els.confirmationModal.hidden = false;
  closeCheckout();
  closeCart();
}

function renderOrderHistory() {
  const orders = getStorage(STORAGE_KEYS.ORDERS, []);
  const phone = prompt('Enter your phone number to view order history:');
  if (!phone) return;

  const normalized = phone.replace(/\s/g, '');
  const userOrders = orders.filter((o) => o.phone.replace(/\s/g, '') === normalized);

  els.historyList.innerHTML = '';
  els.historyEmpty.hidden = userOrders.length > 0;

  userOrders.forEach((order) => {
    const el = document.createElement('div');
    el.className = 'history-item';
    const itemsList = order.items.map((i) => `${i.name} × ${i.quantity}`).join(', ');
    el.innerHTML = `
      <div class="history-item-header">
        <strong>Order #${order.id}</strong>
        <span class="history-status ${order.status}">${order.status}</span>
      </div>
      <p class="history-items-list">${itemsList}</p>
      <p><strong>${formatETB(order.total)}</strong> · ${new Date(order.createdAt).toLocaleDateString()}</p>
      <button type="button" class="btn btn-secondary btn-sm reorder-btn">Reorder</button>
    `;
    el.querySelector('.reorder-btn').addEventListener('click', () => reorderItems(order));
    els.historyList.appendChild(el);
  });

  els.historyModal.hidden = false;
}

function renderFavorites() {
  const favDishes = menu.filter((d) => favorites.includes(d.id));
  const list = document.getElementById('favorites-list');
  const empty = document.getElementById('favorites-empty');
  const modal = document.getElementById('favorites-modal');

  list.innerHTML = '';
  empty.hidden = favDishes.length > 0;

  favDishes.forEach((dish) => {
    const el = document.createElement('div');
    el.className = 'favorite-item';
    el.innerHTML = `
      <strong>${dish.name}</strong>
      <p>${formatETB(dish.price)} · ${dish.category}</p>
      <button type="button" class="btn btn-primary btn-sm">Add to Cart</button>
    `;
    el.querySelector('button').addEventListener('click', () => {
      addToCart(dish.id);
      modal.hidden = true;
      openCart();
    });
    list.appendChild(el);
  });

  modal.hidden = false;
}

function reorderItems(order) {
  order.items.forEach((item) => {
    const dish = menu.find((d) => d.id === item.id);
    if (dish) {
      for (let i = 0; i < item.quantity; i++) addToCart(item.id);
    }
  });
  els.historyModal.hidden = true;
  openCart();
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  els.themeIcon.textContent = saved === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE_KEYS.THEME, next);
  els.themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
}

/** Event listeners */
function bindEvents() {
  els.searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderMenu();
  });

  els.categoryBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      els.categoryBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderMenu();
    });
  });

  els.cartToggle.addEventListener('click', openCart);
  els.cartClose.addEventListener('click', closeCart);
  els.cartOverlay.addEventListener('click', closeCart);

  els.checkoutBtn.addEventListener('click', openCheckout);

  els.deliveryArea.addEventListener('change', () => {
    const subtotal = getCartSubtotal();
    const fee = getDeliveryFee(els.deliveryArea.value);
    els.checkoutTotal.textContent = formatETB(subtotal + fee);
    els.cartDeliveryFee.textContent = formatETB(fee);
    els.cartTotal.textContent = formatETB(subtotal + fee);
    updateEstimatedDelivery();
  });

  els.checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateCheckoutForm()) return;

    const order = placeOrder({
      name: document.getElementById('customer-name').value,
      phone: document.getElementById('customer-phone').value,
      area: document.getElementById('delivery-area').value,
      instructions: document.getElementById('special-instructions').value,
    });

    showConfirmation(order);
    els.checkoutForm.reset();
  });

  document.querySelectorAll('[data-close-checkout]').forEach((el) => {
    el.addEventListener('click', closeCheckout);
  });

  document.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', closeDishModal);
  });

  document.getElementById('modal-add-cart-btn').addEventListener('click', () => {
    if (selectedDish) addToCart(selectedDish.id);
    closeDishModal();
  });

  document.getElementById('modal-favorite-btn').addEventListener('click', () => {
    if (selectedDish) toggleFavorite(selectedDish.id);
    const isFav = favorites.includes(selectedDish?.id);
    document.getElementById('modal-favorite-btn').textContent = isFav
      ? '♥ Remove from Favorites'
      : '♡ Add to Favorites';
  });

  els.confirmClose.addEventListener('click', () => {
    els.confirmationModal.hidden = true;
  });

  els.historyBtn.addEventListener('click', renderOrderHistory);

  document.querySelectorAll('[data-close-history]').forEach((el) => {
    el.addEventListener('click', () => { els.historyModal.hidden = true; });
  });

  document.getElementById('favorites-btn').addEventListener('click', renderFavorites);
  document.querySelectorAll('[data-close-favorites]').forEach((el) => {
    el.addEventListener('click', () => { document.getElementById('favorites-modal').hidden = true; });
  });

  els.themeToggle.addEventListener('click', toggleTheme);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeCheckout();
      closeDishModal();
      els.confirmationModal.hidden = true;
      els.historyModal.hidden = true;
    }
  });
}

/** Init */
async function init() {
  initTheme();
  bindEvents();
  updateCartBadge();

  try {
    els.loading.classList.remove('hidden');
    menu = await seedMenuIfNeeded();
    hideError();
    renderMenu();
    renderCart();
  } catch (err) {
    showError(err.message || 'Something went wrong loading the menu.');
  } finally {
    els.loading.classList.add('hidden');
  }
}

init();
