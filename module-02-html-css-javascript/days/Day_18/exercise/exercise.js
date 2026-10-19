const prices = [500, 800, 1200, 300];

const total = prices
  .map(price => price * 1.15)        // Add 15% VAT
  .filter(price => price < 1000)     // Keep prices under 1000 ETB
  .reduce((sum, price) => sum + price, 0); // Calculate grand total

console.log(total);
  // 2
const customer = {
  name: "meron",
  city: "jimma",
  balance: 5000
};

for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}

// 3
// Destructure name and city
const { name, city } = customer;

// Function using parameter destructuring
function greet({ name }) {
  console.log(`Hello, ${name}!`);
}

greet(customer);

// 4
const updatedCustomer = {
  ...customer,
  city: "adama",      
  phone: "0910657800"   
};

console.log(updatedCustomer);
console.log(customer); 