document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const nameInput = document.getElementById("fullName");
  const phoneInput = document.getElementById("phone");
  const errorDiv = document.getElementById("error");
  const countDisplay = document.getElementById("signup-count");

  

  const ethiopianPhoneRegex = /^(?:\+251|251|0)(?:9|7)\d{8}$/;

  
  function updateCountDisplay() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    countDisplay.textContent = `Total registered users: ${users.length}`;
  }

  
  updateCountDisplay();

  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorDiv.textContent = ""; 

    const trimmedName = nameInput.value.trim();
    const trimmedPhone = phoneInput.value.trim();

    
    if (trimmedName.length < 2) {
      errorDiv.textContent = "Error: Name must be at least 2 characters long.";
      return;
    }

    
    if (!ethiopianPhoneRegex.test(trimmedPhone)) {
      errorDiv.textContent = "Error: Please enter a valid Ethiopian phone number (e.g., 0912345678 or +251912345678).";
      return;
    }

    
    const users = JSON.parse(localStorage.getItem("users")) || [];

    
    users.push({
      name: trimmedName,
      phone: trimmedPhone,
      timestamp: new Date().toISOString()
    });

    localStorage.setItem("users", JSON.stringify(users));

    
    form.reset();
    updateCountDisplay();
  });
});