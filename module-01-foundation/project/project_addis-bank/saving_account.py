from account import Account
from bank_config import Bankconfig

class SavingAccount(Account):
    def __init__(self, owner, account_number, balance = 0, interest_rate = 0.05):
        super().__init__(owner, account_number, balance)
        self.interest_rate = interest_rate
    def add_interest(self):
        interest = self.balance * self.interest_rate
        self.deposit(interest)
        self.transaction.append(f"added interest: {interest}") 
        print(f"added interest: {interest}")

if __name__ == "__main__":
    saving = SavingAccount("Getu Tesfaye", 1000456787543, 500, 0.05)
    saving.add_interest()