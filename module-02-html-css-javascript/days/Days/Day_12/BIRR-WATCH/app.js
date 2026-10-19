const state = {
  rates: {},
  loading: true,
  error: null,
  selectedCurrency: localStorage.getItem("lastCurrency") || "USD",
  conversionResult: null,
  watchlist: JSON.parse(localStorage.getItem("watchlist")) || []
};

const elements = {
  status: document.getElementById("status"),
  app: document.getElementById("app"),
  etbAmount: document.getElementById("etbAmount"),
  currencySelect: document.getElementById("currencySelect"),
  convertBtn: document.getElementById("convertBtn"),
  conversionResult: document.getElementById("conversionResult"),
  addToWatchlistBtn: document.getElementById("addToWatchlistBtn"),
  watchlist: document.getElementById("watchlist")
};

async function fetchRates() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/ETB");
    if (!res.ok) throw new Error("Failed to fetch rates");
    const data = await res.json();
    state.rates = data.rates;
    state.loading = false;
  } catch (err) {
    state.loading = false;
    state.error = "Could not load exchange rates. Please try again.";
  }
  render();
}

function render() {
  if (state.loading) {
    elements.status.innerHTML = '<p class="loading">Loading exchange rates...</p>';
    elements.app.style.display = "none";
    return;
  }

  if (state.error) {
    elements.status.innerHTML = `<p class="error">${state.error}</p>`;
    elements.app.style.display = "none";
    return;
  }

  elements.status.innerHTML = "";
  elements.app.style.display = "block";

  if (elements.currencySelect.options.length === 0) {
    const keys = Object.keys(state.rates).sort();
    elements.currencySelect.innerHTML = keys
      .map(cur => `<option value="${cur}" ${cur === state.selectedCurrency ? "selected" : ""}>${cur}</option>`)
      .join("");
  }

  elements.conversionResult.innerHTML = state.conversionResult
    ? state.conversionResult.error
      ? `<span class="error">${state.conversionResult.error}</span>`
      : `${state.conversionResult.amount} ETB = <strong>${state.conversionResult.total} ${state.conversionResult.currency}</strong> (Rate: ${state.conversionResult.rate})`
    : "";

  if (state.watchlist.length === 0) {
    elements.watchlist.innerHTML = '<li class="empty-text">No currencies in watchlist.</li>';
  } else {
    elements.watchlist.innerHTML = state.watchlist
      .map(cur => {
        const rate = state.rates[cur] ? state.rates[cur].toFixed(4) : "N/A";
        return `
          <li>
            <span><strong>${cur}</strong>: ${rate}</span>
            <button class="delete-btn" data-currency="${cur}">Remove</button>
          </li>
        `;
      })
      .join("");
  }
}

elements.convertBtn.addEventListener("click", () => {
  const value = elements.etbAmount.value.trim();
  const amount = Number(value);
  const cur = elements.currencySelect.value;

  state.selectedCurrency = cur;
  localStorage.setItem("lastCurrency", cur);

  if (!value || isNaN(amount) || amount <= 0) {
    state.conversionResult = { error: "Please enter a valid amount greater than 0." };
  } else {
    const rate = state.rates[cur] || 0;
    state.conversionResult = {
      amount: amount,
      currency: cur,
      rate: rate.toFixed(4),
      total: (amount * rate).toFixed(2)
    };
  }
  render();
});

elements.currencySelect.addEventListener("change", (e) => {
  state.selectedCurrency = e.target.value;
  localStorage.setItem("lastCurrency", state.selectedCurrency);
});

elements.addToWatchlistBtn.addEventListener("click", () => {
  const cur = elements.currencySelect.value;
  if (!state.watchlist.includes(cur)) {
    state.watchlist.push(cur);
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    render();
  }
});

elements.watchlist.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const cur = e.target.dataset.currency;
    state.watchlist = state.watchlist.filter(item => item !== cur);
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    render();
  }
});

fetchRates();