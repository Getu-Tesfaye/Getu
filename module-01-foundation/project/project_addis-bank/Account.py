class Account:
    def __init__(self, owner, account_number, balance):
        # 1. You must save these variables to the class instance!
        self.owner = owner
        self.account_number = account_number
        self._balance = balance  # Creates your private balance variable

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdraw amount must be positive.")
        elif amount > self._balance:
            print("Withdraw amount must be less than or equal to balance.")
        else:
            self._balance -= amount
            print(f"Withdraw of {amount} successful. New balance: {self._balance}")

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            print(f"Deposit of {amount} successful. New balance: {self._balance}")
        else:
            print("Deposit amount must be positive.")
    def statement(self):
        return f"Standard Account | No: {self.account_number} | Owner: {self.owner} | Balance: ${self._balance}"


# Creating the instance
account1 = Account("Getu", 100043567654, 5000)

# Test the results
account1.withdraw(500)
account1.deposit(1000)

#day05

class SavingAccount(Account):# inherits account
    def __init__(self, owner, account_number, balance , interest_rate=0.05):#initialize the parrent class

        super().__init__(owner, account_number, balance) # from parent class
        self.interest_rate = interest_rate # ex 5% rate
    def add_interest(self): #withdrawn
       # Uses self.interest_rate to calculate the new interest
        interest = self._balance * self.interest_rate
        print(f"interest for account {self.interest_rate}: {interest}")
        self.deposit(interest)

    def statement(self):
         print(f"saving account: {self.account_number} owner: {self.owner} balance: {self._balance} interest_rate: {self.interest_rate * 100}%")
        
class CurrentAccount(Account): #inherits account
    def __init__(self, owner, account_number, balance, overdraft_limit):
        super().__init__(owner, account_number, balance)
        self.overdraft_limit = overdraft_limit

        #overrides parent withdrawn
    def withdrawn(self, amount):
        max_allowed = self.balance + self.overdraft_limit
        if amount < max_allowed:
            self.balance -= amount
            print(f"withdrawn {amount} new balance {self.balance}")
            return True
        else:
            print(f"withdrawn amount must be positive")
        def statement(self):
         return f"Current Account  | No: {self.account_number} | Owner: {self.owner} | Balance: ${self.balance}"
        # --- STEP 4: Running the Code ---
        if __name__ == "__main__":
         print("--- 1. Creating Accounts ---")
acc1 = Account("Getu", "100056543456", 1000)
    
    # We pass 0.05 (which represents 5%) as the interest_rate parameter
acc2 = SavingAccount("Chala", "100004576876", 2000, 0.05)  
    
acc3 = CurrentAccount("Getu", "100056876789", 100, 500)     # 500 overdraft limit

    
    # 1. Standard deposit
acc1.deposit(200)
    
    # 2. Savings interest calculation using interest_rate
acc2.add_interest()
    
    # 3. Current Account withdraw (goes negative from 100 down to -200)
acc3.withdraw(300)

print("\n--- 3. Printing Statements (Polymorphic Loop) ---")
    # Put all accounts in one list
accounts_list = [acc1, acc2, acc3]

    # Loop through and print the statement for each one
for account in accounts_list:
      print(account.statement())  

                  



    





    
    
        



        


        

