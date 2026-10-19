
const subtotal = (...prices) => {
  return prices.reduce((acc, current) => acc + current, 0);
};


const discountBy = (rate) => {
  return (amount) => amount - amount * rate;
};


const withVat = (amount, rate = 0.15) => {
  return amount + amount * rate;
};


const toETB = (amount) => {
  return `${amount.toFixed(2)} ETB`;
};


const makeReceiptMaker = () => {
  let orderNumber = 0;
  return (finalAmount) => {
    orderNumber += 1;
    return `#${orderNumber}: ${toETB(finalAmount)}`;
  };
};


module.exports = {
  subtotal,
  discountBy,
  withVat,
  toETB,
  makeReceiptMaker
};