
const out = document.querySelector("#facts");


function render(parent, label, value) {
  const p = document.createElement("p");
  p.innerHTML = `<strong>${label}:</strong> ${value}`;
  parent.appendChild(p);
}

async function showCountry(name) {
  out.textContent = "Loading...";
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (!res.ok) throw new Error("Country not found");
    const [c] = await res.json();
    out.innerHTML = "";
    render(out, "Capital", c.capital[0]); 
    render(out, "Population", c.population.toLocaleString());
    render(out, "Region", c.region);
  } catch (err) {
    out.textContent = err.message; 
  }
}

document.querySelector("#searchBtn").addEventListener("click", () => {
  const query = document.querySelector("#countryInput").value.trim();
  if (query) showCountry(query);
});


showCountry("Ethiopia");