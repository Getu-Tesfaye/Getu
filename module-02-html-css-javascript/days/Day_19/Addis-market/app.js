// TODO 1: 
let items = [];

// DOM References
const form = document.getElementById('item-form');
const input = document.getElementById('item-input');
const list = document.getElementById('list');
const countDisplay = document.getElementById('count-display');

// TODO 2
function render() {
  list.innerHTML = '';

  items.forEach(item => {
    const li = document.createElement('li');
    li.dataset.id = item.id;

    const span = document.createElement('span');
    span.textContent = item.text;
    if (item.done) {
      span.classList.add('done');
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.classList.add('delete-btn');

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  
  const remainingCount = items.filter(item => !item.done).length;
  countDisplay.textContent = `Items remaining: ${remainingCount}`;
}

// TODO 3: 
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const text = input.value.trim();
  if (text === '') return;

  items.push({
    id: Date.now(),
    text: text,
    done: false
  });

  input.value = '';
  render();
});

// TODO 4: 
list.addEventListener('click', function(event) {
  const li = event.target.closest('li');
  if (!li) return;

  const itemId = Number(li.dataset.id);

  if (event.target.classList.contains('delete-btn')) {
    
    items = items.filter(item => item.id !== itemId);
  } else {
    items = items.map(item => {
      if (item.id === itemId) {
        return { ...item, done: !item.done };
      }
      return item;
    });
  }

  render();
});