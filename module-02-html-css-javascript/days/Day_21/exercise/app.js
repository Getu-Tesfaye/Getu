const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorMsg = document.getElementById("error");
const countDisplay = document.getElementById("count");


const phoneRegex = /^(?:\+251|251|0)(?:9|7)\d{8}$/;


function showCount() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  countDisplay.textContent = `Total signups: ${users.length}`;
}

showCount();


form.addEventListener("submit", function (e) {
  e.preventDefault(); 
  errorMsg.textContent = ""; 

  const nameVal = nameInput.value.trim();
  const phoneVal = phoneInput.value.trim();

  
  if (nameVal.length < 2) {
    errorMsg.textContent = "Name must be at least 2 characters long.";
    return;
  }

  
  if (!phoneRegex.test(phoneVal)) {
    errorMsg.textContent = "Please enter a valid Ethiopian phone number.";
    return;
  }

  
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ name: nameVal, phone: phoneVal });
  localStorage.setItem("users", JSON.stringify(users));

  
  form.reset();
  showCount();
});