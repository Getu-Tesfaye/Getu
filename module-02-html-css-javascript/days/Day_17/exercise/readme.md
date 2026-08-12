Steps to Build the Module
Create the Outer Function (createLoyaltyAccount)
Declare a function that takes an optional starting balance. Inside it, create a points variable. Because this variable lives inside the function, it is private (a closure) and cannot be modified directly from the outside.

Define a Default Earn Rule
Create a small pure function that calculates standard points (for example, amountSpent / 10).

Expose the 3 Required Methods
Return an object containing three methods:

balance(): Simply returns the current private points value.

earn(amount, rule): Runs the rule function on the amount, adds the result to the private points balance, and returns the points earned.

redeem(amount): Checks if there are enough points. If yes, subtracts them and returns true. If not, leaves the balance untouched and returns false.

Keep Console Logs Outside
Keep all console.log statements outside the core logic so the calculation functions remain pure.