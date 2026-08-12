//Step 1: Create the Private Container
function createLoyaltyAccount(initialBalance = 0) {
  // Hidden variable: Only the functions inside createLoyaltyAccount can read or change this
  let pointsBalance = initialBalance;

 //Step 2: Define a Default Calculation Rule
  // Standard rule: 1 point for every 10 ETB spent
  const standardRule = (amount) => Math.floor(amount / 10);

 //Step 3: Return the Allowed Operations
  return {
    // 1. GET BALANCE (Read-only access)
    balance: () => {
      return pointsBalance;
    },

    // 2. EARN POINTS (Takes spending amount + optional custom rule function)
    earn: (amountSpent, earnRule = standardRule) => {
      const pointsEarned = earnRule(amountSpent); // Calculate points
      pointsBalance += pointsEarned;              // Update balance
      return pointsEarned;
    },

    // 3. REDEEM POINTS (Subtracts points safely)
    redeem: (pointsToRedeem) => {
      // Prevent balance from dropping below zero
      if (pointsToRedeem > pointsBalance) {
        return false;
      }
      pointsBalance -= pointsToRedeem;
      return true;    
    }
  };
}

 // &Clear Output Tests

// --- CREATE ACCOUNT ---
const myAccount = createLoyaltyAccount(0);

// TEST 1: Check initial balance
console.log("Initial Balance:", myAccount.balance()); 
// Result: 0

// TEST 2: Earn with Standard Rule (100 ETB / 10 = 10 points)
myAccount.earn(100);
console.log("After spending 100 ETB:", myAccount.balance()); 
// Result: 10

// TEST 3: Earn with Custom Holiday Rule (Double points)
const doublePointsRule = (amount) => Math.floor(amount / 10) * 2;
myAccount.earn(100, doublePointsRule);
console.log("After spending 100 ETB on Holiday:", myAccount.balance()); 
// Result: 30 (10 existing + 20 new)

// TEST 4: Redeem valid amount
const success = myAccount.redeem(10);
console.log("Redeemed 10 points successful?", success); // Result: true
console.log("Remaining Balance:", myAccount.balance());  // Result: 20

// TEST 5: Try to redeem more than available (Refuses negative balance)
const failed = myAccount.redeem(100);
console.log("Redeemed 100 points successful?", failed);  // Result: false
console.log("Remaining Balance:", myAccount.balance());  // Result: 10