const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorArea = document.getElementById("error");
const countArea = document.getElementById("count");


const ethiopianPhoneRegex = /^(?:\+251|0)9\d{8}$/;


function showCount() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  countArea.textContent = `Total signups: ${users.length}`;
}

showCount();


form.addEventListener("submit", function (e) {
  e.preventDefault();
  errorArea.textContent = ""; 

  
  const nameVal = nameInput.value.trim();
  const phoneVal = phoneInput.value.trim();

  
  if (nameVal.length < 2) {
    errorArea.textContent = "Name must be at least two characters.";
    return;
  }

  
  if (!ethiopianPhoneRegex.test(phoneVal)) {
    errorArea.textContent = "Please enter a valid Ethiopian phone number.";
    return;
  }

  
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ name: nameVal, phone: phoneVal });
  localStorage.setItem("users", JSON.stringify(users));

  
  form.reset();
  showCount();
});