// regular function
function vat(amount, rate = 0.15) {
  return amount * rate;
}

const arrowvat = (amount, rate = 0.15) => amount * rate;

console.log(vat(100)); // 15



function makeCounter() {
  let count = 0; 
  
  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2

function discountBy(rate) {
  return function(price) {
    return price - (price * rate);
  };
}

const memberPrice = discountBy(0.10); 
const salePrice = discountBy(0.30);   

console.log(memberPrice(1000)); 
console.log(salePrice(1000));   
  


function applyToAll(list, fn) {
  const result = [];
  for (let item of list) {
    result.push(fn(item));
  }
  return result;
}


const addVat = (price) => price * 1.15;

const prices = [100, 200, 300];
console.log(applyToAll(prices, addVat)); 
 

const cities = ["Addis Ababa", "Hawassa", "Gondar"];

cities.forEach((city, index) => {
  console.log(`${index + 1}. ${city}`);
});