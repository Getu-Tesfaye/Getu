class Account:
    def __init__(self, owner, account_number, balance):
        # 1. You must save these variables to the class instance!
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance  # Creates your private balance variable

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdraw amount must be positive.")
        elif amount > self.__balance:
            print("Withdraw amount must be less than or equal to balance.")
        else:
            self.__balance -= amount
            print(f"Withdraw of {amount} successful. New balance: {self.__balance}")

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposit of {amount} successful. New balance: {self.__balance}")
        else:
            print("Deposit amount must be positive.")



# Creating the instance
account1 = Account("Getu", 100043567654, 5000)

# Test the results
account1.withdraw(500)
account1.deposit(1000)