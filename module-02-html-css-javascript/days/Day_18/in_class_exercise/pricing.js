 const withVat = (amount, rate = 0.15) => amount * (1 + rate); // Add 15% VAT
 const format = (amount) => `${amount.toFixed(2)} ETB`;         // Format as ETB
 const total = (items) =>                                       // Sum item prices
  items.reduce((sum, { unitPrice, quantity }) => sum + unitPrice * quantity, 0);

  export {withVat, format, total};