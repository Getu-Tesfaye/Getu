// 1. Separate credits using filter()
export const getCredits = (txList) => {
  return txList.filter((tx) => tx.type === "credit");
};

// 2. Separate debits using filter()
export const getDebits = (txList) => {
  return txList.filter((tx) => tx.type === "debit");
};

// 3. Calculate total amount using reduce()
export const calculateTotal = (txList) => {
  return txList.reduce((sum, tx) => sum + tx.amount, 0);
};

// 4. Format receipts using map(), destructuring ({ customer, amount }), and template literals
export const generateReceipts = (txList) => {
  return txList.map(({ customerName, amount }) => `Receipt: ${customerName} — ETB ${amount}`);
};

// 5. Update a transaction amount using spread syntax without modifying the original
export const updateTransactionAmount = (tx, newAmount) => {
  return { ...tx, amount: newAmount };
};