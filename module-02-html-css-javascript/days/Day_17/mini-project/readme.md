Mini-Project: Loyalty Points Module

A JavaScript loyalty-points module designed for a TeleBirr shop. It securely tracks customer point balances using **closures** and applies dynamic rules using **higher-order functions**.

---

## 📌 Features

- **Private State (Closure):** The customer's point balance cannot be accessed or modified directly from outside the module.
- **Dynamic Rules (Higher-Order Functions):** Flexible earning rules (e.g., standard points vs. holiday double points) can be passed in without modifying core logic.
- **Safe Redemption:** Refuses any point redemption that would result in a negative balance.
- **Pure Logic:** Pure functions handle calculations, isolating console logs to the application edges.

---

## 🛠️ API Reference

### `createLoyaltyAccount(initialBalance = 0)`
Initializes a new customer loyalty account.

#### Returned Methods:
1. **`balance()`**
   - **Returns:** `number` (The current point balance)
2. **`earn(amountSpent, earnRule)`**
   - **Parameters:**
     - `amountSpent` (`number`): Spending total in ETB.
     - `earnRule` (`function`, optional): Rule function determining points earned. Default is 1 point per 10 ETB.
   - **Returns:** `number` (Points earned from transaction)
3. **`redeem(pointsToRedeem)`**
   - **Parameters:**
     - `pointsToRedeem` (`number`): Number of points to deduct.
   - **Returns:** `boolean` (`true` if successful, `false` if balance is insufficient