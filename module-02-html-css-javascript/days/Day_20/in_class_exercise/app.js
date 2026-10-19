
const listEl = document.getElementById("list");


const API_URL = "https://dummyjson.com/recipes?limit=5";


async function load() {
  
  listEl.innerHTML = "";
  listEl.classList.remove("error");
  listEl.classList.add("loading");
  listEl.innerHTML = "<li>Loading...</li>";

  try {
    
    const res = await fetch(API_URL);

    
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    
    const data = await res.json();

    
    render(data.recipes);

  } catch (err) {
    
    listEl.classList.remove("loading");
    listEl.classList.add("error");
    listEl.innerHTML = `<li>Something went wrong: ${err.message}</li>`;

  } finally {
    
    listEl.classList.remove("loading");
  }
}


function render(items) {
  listEl.innerHTML = ""; 

  items.forEach((item) => {
    const li = document.createElement("li");
    
    li.textContent = item.name;
    listEl.appendChild(li);
  });
}


document.getElementById("refreshBtn").addEventListener("click", load);

load();