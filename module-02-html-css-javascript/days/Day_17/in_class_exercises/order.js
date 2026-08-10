// Calculate sum of item prices
const subtotal = (...prices) => {
  return prices.reduce((acc, current) => acc + current, 0);
};

// Returns a function that applies a percentage discount
const discountBy = (rate) => {
  return (amount) => amount - amount * rate;
};

// Calculates total price with VAT (default 15%)
const withVat = (amount, rate = 0.15) => {
  return amount + amount * rate;
};

// Formats number to ETB currency format
const toETB = (amount) => {
  return `${amount.toFixed(2)} ETB`;
};

// Closure to manage auto-incrementing order numbers
const makeReceiptMaker = () => {
  let orderNumber = 0;
  return (finalAmount) => {
    orderNumber += 1;
    return `#${orderNumber}: ${toETB(finalAmount)}`;
  };
};

// Export all functions
module.exports = {
  subtotal,
  discountBy,
  withVat,
  toETB,
  makeReceiptMaker
};