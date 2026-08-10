const { subtotal, discountBy, withVat, toETB, makeReceiptMaker } = require('./order');

// Create single receipt maker instance
const printReceipt = makeReceiptMaker();

// Order 1: Regular order
const order1subtotal = subtotal(100, 200, 300);
const order1withVat = withVat(order1subtotal);
console.log(printReceipt(order1withVat));

// Order 2: With 20% discount
const discounted20 = discountBy(0.2);
const order2subtotal = subtotal(100, 200, 300);
const order2discounted = discounted20(order2subtotal);
const order2withVat = withVat(order2discounted);
console.log(printReceipt(order2withVat));

// Order 3: With 40% discount
const discounted40 = discountBy(0.4);
const order3subtotal = subtotal(100, 200, 300);
const order3discounted = discounted40(order3subtotal);
const order3withVat = withVat(order3discounted);
console.log(printReceipt(order3withVat));