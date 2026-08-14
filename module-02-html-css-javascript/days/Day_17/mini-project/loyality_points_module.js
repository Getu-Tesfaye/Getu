
function createLoyaltyAccount(initialBalance = 10) {
  let pointsBalance = initialBalance;

  const standardRule = (amount) => Math.floor(amount / 10);

  return {
    balance: () => {
      return pointsBalance;
    },

    earn: (amountSpent, earnRule = standardRule) => {
      const pointsEarned = earnRule(amountSpent); 
      pointsBalance += pointsEarned;              
      return pointsEarned;
    },

    redeem: (pointsToRedeem) => {
      if (pointsToRedeem > pointsBalance) {
        return false;
      }
      pointsBalance -= pointsToRedeem;
      return true;    
    }
  };
}

const myAccount = createLoyaltyAccount(0);

console.log("Initial Balance:", myAccount.balance()); 
myAccount.earn(100);
console.log("After spending 100 ETB:", myAccount.balance()); 
const doublePointsRule = (amount) => Math.floor(amount / 10) * 2;
myAccount.earn(100, doublePointsRule);
console.log("After spending 100 ETB on Holiday:", myAccount.balance()); 


const success = myAccount.redeem(10);
console.log("Redeemed 10 points successful?", success);
console.log("Remaining Balance:", myAccount.balance());  


const failed = myAccount.redeem(100);
console.log("Redeemed 100 points successful?", failed);  
console.log("Remaining Balance:", myAccount.balance());  