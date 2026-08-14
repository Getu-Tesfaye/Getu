


const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const list = document.getElementById("list");
const totalText = document.getElementById("total");
const error = document.getElementById("error");




let total = 0;


form.addEventListener("submit", function(event) {

  
    event.preventDefault();

    const name = nameInput.value.trim();

    const price = Number(priceInput.value);


    if (name === "" || price <= 0) {

        error.textContent = "Please enter an item and a valid price.";

        return;
    }
    error.textContent = "";


    

    
    const item = document.createElement("li");

    item.classList.add("item");

    item.dataset.price = price;


  
    const itemInfo = document.createElement("div");

    itemInfo.classList.add("item-info");

    const itemName = document.createElement("span");

    itemName.classList.add("item-name");

    itemName.textContent = name;

    const itemPrice = document.createElement("span");

    itemPrice.classList.add("item-price");

    itemPrice.textContent = price.toFixed(2) + " ETB";

    itemInfo.append(itemName, itemPrice);

    const buttons = document.createElement("div");

    buttons.classList.add("buttons")

    const buyButton = document.createElement("button");

    buyButton.textContent = "Bought";

    buyButton.classList.add("buy-button");

    buyButton.type = "button";

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.classList.add("delete-button");

    deleteButton.type = "button";


    

    buttons.append(buyButton, deleteButton);

    item.append(itemInfo, buttons);


    list.append(item)

    total = total + price;

    totalText.textContent = total.toFixed(2);


    nameInput.value = "";

    priceInput.value = "";

});





list.addEventListener("click", function(event) {


    const button = event.target.closest("button");


    if (!button) {
        return;
    }


    const item = button.closest(".item");


    if (button.textContent === "Bought") {

        item.classList.toggle("bought");


        if (item.classList.contains("bought")) {

            button.textContent = "Unbuy";

        } else {

            button.textContent = "Bought";
        }
    }


  

    if (button.textContent === "Delete") {

        const price = Number(item.dataset.price);


        
        total = total - price;


        totalText.textContent = total.toFixed(2);


        item.remove();
    }

});





const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const loginError = document.getElementById("loginError");
const loginPage = document.getElementById("loginPage");



loginButton.addEventListener("click", function () {

    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;


    
    if (username === "Getu" && password === "1234") {

        
        loginError.textContent = "Login successful!";

        loginError.style.color = "green";


        
        loginPage.style.display = "none";


    } else {

        
        loginError.textContent = "Wrong username or password.";

        loginError.style.color = "red";
    }

});