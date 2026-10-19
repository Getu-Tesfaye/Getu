from saving_account import SavingAccount
from current_account import CurrentAccount

class AccountFactory:
    @staticmethod
    def create_account(account_type, owner, account_number, balance):
        account_type = account_type.lower()

        if account_type == "savings":
            account = SavingAccount(owner, account_number, balance)
            account.type = "savings"
            return account
        elif account_type == "current":
            account = CurrentAccount(owner, account_number, balance)
            account.type = "current"
            return account
        else:
            raise ValueError("account_type must be 'savings' or 'current'")


if __name__ == "__main__":
      account1 = AccountFactory.create_account("savings", "chala", 10006576654, 1000)
      account2 = AccountFactory.create_account("current", "chaltu", 10006743209, 2000)

      print(f"{account1.owner}  {account1.type}  {account1.balance}")
      print(f"{account2.owner}  {account2.type}  {account2.balance}")

 
       

    



