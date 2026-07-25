from Account import Account
from Bank_config import Bankconfig

class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance, overdraft_limit=500):
        super().__init__(owner, account_number, balance)
        self.overdraft_limit = overdraft_limit

    def withdrawn(self, amount):
        if amount <= self.balance + self.overdraft_limit:
            self.transaction.append(f"withdrawn: {amount}")
            print(f"withdrawn: {amount} overdraft: {self.overdraft_limit}")
        else:
            print("overdraft is exceeded")

if __name__ == "__main__":
    current = CurrentAccount("Getu Tesfaye", 1000456787543, 400, 500)
    current.withdrawn(100)







