// regular function
function vat(amount, rate = 0.15) {
  return amount * rate;
}

// Arrow Function (One-liner):
const arrowvat = (amount, rate = 0.15) => amount * rate;

console.log(vat(100)); // 15


//  2. Private Counter (Closure)
function makeCounter() {
  let count = 0; // Private variable
  
  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// Why is count private?
// Because 'count' is inside makeCounter(). You cannot access or change it directly from outside. Only the returned function can touch it.

//3. Discount Factory
// Factory function that creates discount math
function discountBy(rate) {
  return function(price) {
    return price - (price * rate);
  };
}

const memberPrice = discountBy(0.10); 
const salePrice = discountBy(0.30);   

console.log(memberPrice(1000)); // 900 ETB
console.log(salePrice(1000));   // 700 ETB
  

//4. Custom Function to Process an Array (applyToAll)
function applyToAll(list, fn) {
  const result = [];
  for (let item of list) {
    result.push(fn(item));
  }
  return result;
}

// Function to add 15% VAT to a price
const addVat = (price) => price * 1.15;

const prices = [100, 200, 300];
console.log(applyToAll(prices, addVat)); // [115, 230, 345]
 
//5. Print Ethiopian Cities with Index
const cities = ["Addis Ababa", "Hawassa", "Gondar"];

cities.forEach((city, index) => {
  console.log(`${index + 1}. ${city}`);
});