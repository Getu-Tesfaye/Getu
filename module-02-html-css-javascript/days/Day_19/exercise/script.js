
const title = document.querySelector('h1');
title.textContent = 'Day 19 D0M Exercise';
title.classList.toggle('highlight');

const cities = ['Asalla', 'adama', 'mojo'];
const list = document.querySelector('#city-list');

for (let i = 0; i < cities.length; i++) {
  const listItem = document.createElement('li');
  listItem.textContent = cities[i];
  list.appendChild(listItem);
}


const button = document.querySelector('#my-button');
const parentDiv = document.querySelector('#parent-div');

button.addEventListener('click', function(event) {
  console.log('Button clicked! Target is:', event.target);
});

parentDiv.addEventListener('click', function() {
  console.log('Parent DIV received the click event! (Bubbling)');
});

list.addEventListener('click', function(event) {
  if (event.target.className === 'delete-btn') {
    const liToDelete = event.target.parentElement;
    liToDelete.remove();
  }
});


const form = document.querySelector('#my-form');
const input = document.querySelector('#user-input');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const newItem = document.createElement('li');
  newItem.textContent = input.value;
  list.appendChild(newItem);

  input.value = ''; 
});