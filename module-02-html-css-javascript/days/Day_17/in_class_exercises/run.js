const { subtotal, discountBy, withVat, toETB, makeReceiptMaker } = require('./order');


const printReceipt = makeReceiptMaker();


const order1subtotal = subtotal(100, 200, 300);
const order1withVat = withVat(order1subtotal);
console.log(printReceipt(order1withVat));


const discounted20 = discountBy(0.2);
const order2subtotal = subtotal(100, 200, 300);
const order2discounted = discounted20(order2subtotal);
const order2withVat = withVat(order2discounted);
console.log(printReceipt(order2withVat));


const discounted40 = discountBy(0.4);
const order3subtotal = subtotal(100, 200, 300);
const order3discounted = discounted40(order3subtotal);
const order3withVat = withVat(order3discounted);
console.log(printReceipt(order3withVat));