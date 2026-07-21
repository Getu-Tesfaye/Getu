# day04 project====================================================
print("day_04_project===========")
class Account:
    def __init__(self, owner, account_number, balance):
        #  You must save these variables to the class instance!
        self.owner = owner
        self.account_number = account_number
        self._balance = balance  # Creates your protected balance variable

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

#day05 project==========================================================================
print("day_05_project==============")
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
            self._balance -= amount
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
    
acc3 = CurrentAccount("gemechu", "100056876789", 100, 500)     # 500 overdraft limit

    
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
      print(account.statement() )

#day_06_project=====================================================================
print("day_06_project============")
#Step 1: The Singleton (BankConfig)
#We use Python's __new__ method to guarantee that only one instance of configuration parameters exists across the entire application.

class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(BankConfig, cls).__new__(cls)
            # Shared configuration values
            cls._instance.interest_rate = 0.04       # 4% for savings
            cls._instance.overdraft_limit = 500.0     # $500 for current accounts
        return cls._instance
    
#Step 2: The Observer Pattern (Interfaces & Implementations)
#We decouple notifications from the account logic. First, we define what an observer looks like, then implement specific behaviors.


class TransactionObserver:
    def update(self, account_number, action, amount, new_balance):
        pass

class SMSAlert(TransactionObserver):
    def update(self, account_number, action, amount, new_balance):
        print(f"[SMS Alert] Account {account_number}: {action} of ${amount}. New Balance: ${new_balance}")

class AuditLog(TransactionObserver):
    def update(self, account_number, action, amount, new_balance):
        print(f"[Audit Log] TX recorded -> Acc: {account_number} | Action: {action} |Action: {action} | Amt: ${amount} | Bal: ${new_balance}")


#Step 3: The Base Account and Subclasses (Applying SRP)
#The Account base handles balances and notifications. The subclasses pull constraints directly from the BankConfig singleton.


class Account:
    def __init__(self, owner, number, balance=0.0):
        self.owner = owner
        self.number = number
        self._balance = balance
        self._observers = []

    def subscribe(self, observer):
        if observer not in self._observers:
            self._observers.append(observer)

    def _notify(self, action, amount):
        for observer in self._observers:
            observer.update(self.number, action, amount, self._balance)

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            self._notify("DEPOSIT", amount)
            return True
        return False

    def withdraw(self, amount):
        raise NotImplementedError("Subclasses must implement withdrawal logic.")

# --- Savings Account Subclass ---
class SavingsAccount(Account):
    def withdraw(self, amount):
        if 0 < amount <= self._balance:
            self._balance -= amount
            self._notify("WITHDRAWAL", amount)
            return True
        print(f"Withdrawal denied: Insufficient funds in Savings {self.number}")
        return False

    def apply_interest(self):
        config = BankConfig()
        interest = self._balance * config.interest_rate
        self._balance += interest
        self._notify("INTEREST_APPLIED", interest)

# --- Current Account Subclass ---
class CurrentAccount(Account):
    def withdraw(self, amount):
        config = BankConfig()
        # Available balance includes the overdraft limit
        if 0 < amount <= (self._balance + config.overdraft_limit):
            self._balance -= amount
            self._notify("WITHDRAWAL", amount)
            return True
        print(f"Withdrawal denied: Exceeded overdraft limit in Current {self.number}")
        return False
    

#Step 4: The Factory Pattern (AccountFactory)
#Encapsulates object instantiation logic so the client doesn't need to know the inner workings of SavingsAccount or CurrentAccount.


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0.0):
        kind = kind.lower().strip()

        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        else:
            raise ValueError(f"Unknown account type: {kind}")
        
#========
        
    # 1. Setup shared observers
    sms_service = SMSAlert()
    logger = AuditLog()

    # 2. Use Factory to create accounts
    print("--- Creating Accounts via Factory ---")
class SavingAccount(Account):
 class CurrentAccount(Account):
    
    savings = AccountFactory.create("savings", "chala", "100004576876", 2000.0)
    current = AccountFactory.create("current", "gemechu", "100056876789", 100.0)

    # 3. Register observers (Observer Pattern)
    sms_service = SMSAlert()
    logger = AuditLog()

    savings.subscribe(sms_service)
    savings.subscribe(logger)
    current.subscribe(logger) # gemechu only wants audit logging

    # 4. Perform transactions and witness decoupled logic
    print("\n--- Executing Transactions ---")
    savings.deposit(500)
    savings.apply_interest() # Pulls rate dynamically from Singleton
    
    print("\n--- Testing Current Account Overdraft ---")
    current.withdraw(600)    # Allowed because limit is 500 (200 + 500 = 700 max)
    current.withdraw(200)    # Should fail (Balance is now -400)
    

#day_07_project==========================================================================
print("------day_07_project------")

class AccountRegistry:
    def __init__(self):
        self.accounts = {}       # Dict for O(1) lookup: {account_number: account}
        self.order = []          # List to track insertion order
        self.history_stack = []  # Stack to track global transactions for undo

    def add(self, acc):
        self.accounts[acc.number] = acc
        self.order.append(acc)

    def find(self, number):
        return self.accounts.get(number)

    def list_all(self):
        return self.order

    def deposit(self, acc_num, amount):
        acc = self.find(acc_num)
        if acc:
            acc.deposit(amount)
            self.history_stack.append({"type": "deposit", "acc": acc, "amount": amount})

    def withdraw(self, acc_num, amount):
        acc = self.find(acc_num)
        if acc:
            acc.withdraw(amount)
            self.history_stack.append({"type": "withdraw", "acc": acc, "amount": amount})

    def undo_last(self):
        if not self.history_stack:
            print("No transactions to undo.")
            return

        tx = self.history_stack.pop()
        if tx["type"] == "deposit":
            tx["acc"].withdraw(tx["amount"])  # Reverse deposit
            print(f"Undid deposit of ${tx['amount']}")
        elif tx["type"] == "withdraw":
            tx["acc"].deposit(tx["amount"])   # Reverse withdrawal
            print(f"Undid withdrawal of ${tx['amount']}")


# --- Testing & Calling Functions ---

registry = AccountRegistry()

# 1. Create dummy account structure
class Account:
    def __init__(self, number, name):
        self.number = number
        self.name = name
        self.balance = 0

    def deposit(self, amount): self.balance += amount
    def withdraw(self, amount): self.balance -= amount
    def __repr__(self): return f"Account({self.number}, {self.name}, Balance: ${self.balance})"

# 2. Add accounts
acc1 = Account("almaz", "Savings")
registry.add(acc1)

# 3. Perform actions and print results
registry.deposit("almaz", 200)
print("Before Undo:", registry.find("almaz"))

# 4. Call undo function
registry.undo_last()
print("After Undo:", registry.find("almaz"))
    




    
    
        



        


        

