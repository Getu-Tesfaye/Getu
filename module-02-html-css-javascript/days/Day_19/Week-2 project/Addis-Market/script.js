
let items = [
  { id: 1, name: "HP Laptop", price: 45000, category: "Laptops", bought: true },
  { id: 2, name: "Toshiba Laptop", price: 35000, category: "Laptops", bought: true },
  { id: 3, name: "Samsung Phone", price: 28000, category: "Smartphones", bought: true },
  { id: 4, name: "Tecno Phone", price: 12000, category: "Smartphones", bought: false },
  { id: 5, name: "Apple iPhone", price: 85000, category: "Smartphones", bought: false },
  { id: 6, name: "Memory Card", price: 350, category: "Accessories", bought: false },
  { id: 7, name: "32GB Flash Drive", price: 350, category: "Accessories", bought: false }
];

// DOM elements
const itemForm = document.getElementById("item-form");
const nameInput = document.getElementById("item-name");
const priceInput = document.getElementById("item-price");
const categorySelect = document.getElementById("item-category");
const itemList = document.getElementById("item-list");
const remainingCountEl = document.getElementById("remaining-count");
const totalPriceEl = document.getElementById("total-price");

// Render items on screen
function renderItems() {
  itemList.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = `item-card ${item.bought ? "bought" : ""}`;

    li.innerHTML = `
      <div class="item-info">
        <div class="item-icon-box"></div>
        <div class="item-details">
          <div class="item-title">${item.name}</div>
          <div class="item-category">${item.category}</div>
        </div>
      </div>
      <div class="item-actions">
        <span class="item-price">${item.price.toLocaleString()} ETB</span>
        <button class="btn-status ${item.bought ? 'undo' : ''}" onclick="toggleBought(${item.id})">
          ${item.bought ? "Undo" : "Bought"}
        </button>
        <button class="btn-delete" onclick="deleteItem(${item.id})">Delete</button>
      </div>
    `;

    itemList.appendChild(li);
  });

  updateSummary();
}

// Add new item
itemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const category = categorySelect.value;

  if (name && !isNaN(price)) {
    const newItem = {
      id: Date.now(),
      name: name,
      price: price,
      category: category,
      bought: false
    };

    items.push(newItem);
    renderItems();

    // Reset input fields
    nameInput.value = "";
    priceInput.value = "";
  }
});

// Toggle bought/undo status
function toggleBought(id) {
  items = items.map((item) => {
    if (item.id === id) {
      return { ...item, bought: !item.bought };
    }
    return item;
  });
  renderItems();
}

// Delete item
function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
  renderItems();
}


function updateSummary() {
  const remainingCount = items.filter((item) => !item.bought).length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  remainingCountEl.textContent = `${remainingCount} remaining`;
  totalPriceEl.textContent = `Total: ${totalPrice.toLocaleString()} ETB`;
}

// Initial render
renderItems();