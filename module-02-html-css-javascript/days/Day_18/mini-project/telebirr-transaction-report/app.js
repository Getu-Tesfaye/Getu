// Import transaction data
import { transactions } from "./transactions.js";
import {
  getCredits,
  getDebits,
  calculateTotal,
  generateReceipts,
  updateTransactionAmount
} from "./report.js";


console.log("  TELEBIRR TRANSACTION REPORT   ");

// Separate credits and debits using filter()
const credits = getCredits(transactions);
const debits = getDebits(transactions);

// Calculate totals using reduce()
const totalCredit = calculateTotal(credits);
const totalDebit = calculateTotal(debits);

console.log("\n--- SUMMARY ---");
console.log(`Total Credit Amount: ETB ${totalCredit}`);
console.log(`Total Debit Amount:  ETB ${totalDebit}`);
console.log(`Net Balance:         ETB ${totalCredit - totalDebit}`);

// Generate receipts using map()
console.log("\n--- CUSTOMER RECEIPTS ---");
const receipts = generateReceipts(transactions);
receipts.forEach((receipt) => console.log(receipt));

// Demonstrate Spread Syntax
console.log("\n--- SPREAD SYNTAX ---");
const originalTx = transactions[2]; 
const correctedTx = updateTransactionAmount(originalTx, 400);

console.log("Original Transaction (Unchanged):", originalTx);
console.log("Corrected Copy (Updated Amount):", correctedTx);

