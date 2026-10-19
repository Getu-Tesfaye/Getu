import { withVat, format, total } from './pricing.js'; 
import { orders } from './orders.js';                  

// 1. Add total with VAT to each order
const ordersWithTotal = orders.map(order => {
  const subtotal = total(order.items);                
  const totalWithVat = withVat(subtotal);            
  return {
    ...order,                                         
    total: totalWithVat                             
  };
});

// 2. Filter orders over 500 ETB
const highValueOrders = ordersWithTotal.filter(order => order.total > 500);

// 3. Calculate total for all orders
const grandTotal = ordersWithTotal.reduce((sum, order) => sum + order.total, 0);

// 4. Print results
console.log('--- High-Value Orders (> 500 ETB) ---');
highValueOrders.forEach(order => {
  console.log(`Order #${order.id}: ${format(order.total)}`);
});

console.log(`Grand Total: ${format(grandTotal)}`);         