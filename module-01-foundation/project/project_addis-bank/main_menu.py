
from account_registry import AccountRegistry

# Implement Menu System
class MainMenu:
    def __init__(self):
        pass

    def show_menu(self):
        
        print("\n" + "=" * 50)
        print("           ADDIS BANK MANAGEMENT SYSTEM ")
        print("=" * 50)
        print("1.  Create Account")
        print("2.  View All Accounts")
        print("3.  Find Account")
        print("4.  Top Accounts Leaderboard")
        print("5.  Deposit Money")
        print("6.  Withdraw Money")
        print("7.  Check Balance")
        print("8.  Transfer Money")
        print("9.  View Transaction History")
        print("10. Apply Interest (Savings)")
        print("11. View Bank Statistics")
        print("12. View Branch Hierarchy")
        print("13. Undo Last Transaction")
        print("14. Exit")
        print("=" * 50)

    def create_account(self):
            print("\n---create new account---")
            account_number = input("account_number:  ")
            name = input("holder name:   "  )
            amount = float(input("initial_amount:   "))
    def view_all_accounts(self):
            print("\n   all accounts  ")
            accounts = self.registry.get_all_accounts
            if not accounts:
                print(f"account not found")
                return 
            for acc in accounts:
                print(f"{acc.id}  {acc.account_number}  {acc.name}")
    def find_account(self):
        acc_num = input("Enter account number: ")
        acc = self.registry.find_account(acc_num)
        print(f"ID: {acc.account_number} | Name: {acc.name} | Balance: ${acc.balance:.2f}" if acc else "Account not found.")

    def top_accounts(self):
        n = int(input("Enter number of top accounts to view: "))
        for acc in self.registry.get_top_accounts(n):
            print(f"ID: {acc.account_number} | Name: {acc.name} | Balance: ${acc.balance:.2f}")

    def deposit_money(self):
        acc_num = input("Enter account number: ")
        amount = float(input("Enter amount to deposit: "))
        print("Success!" if self.registry.deposit(acc_num, amount) else "Account not found or invalid amount.")

    def withdraw_money(self):
        acc_num = input("Enter account number: ")
        amount = float(input("Enter amount to withdraw: "))
        print("Success!" if self.registry.withdraw(acc_num, amount) else "Insufficient funds or account not found.")

    def transfer_money(self):
        from_acc = input("Enter sender account number: ")
        to_acc = input("Enter receiver account number: ")
        amount = float(input("Enter transfer amount: "))
        print("Success!" if self.registry.transfer(from_acc, to_acc, amount) else "Transfer failed.")

    def view_statement(self):
        acc_num = input("Enter account number: ")
        statement = self.registry.get_statement(acc_num)
        print(statement if statement else "Account not found.")

    def view_transaction_history(self):
        acc_num = input("Enter account number: ")
        history = self.registry.get_history(acc_num)
        print(history if history else "No history found.")

    def apply_interest(self):
        acc_num = input("Enter savings account number: ")
        print("Interest applied!" if self.registry.apply_interest(acc_num) else "Failed to apply interest.")

    def view_bank_statistics(self):
        stats = self.registry.get_bank_stats()
        print(f"Total Accounts: {stats.get('total_accounts', 0)} | Total Balance: ${stats.get('total_balance', 0):.2f}")

    def view_branch_hierarchy(self):
        self.registry.show_branch_hierarchy()

    def undo_last_transaction(self):
        acc_num = input("Enter account number: ")
        print("Undo successful!" if self.registry.undo_transaction(acc_num) else "Nothing to undo.")

    def exit_app(self):
        print("Exiting application. Goodbye!")
        exit()


    def run(self):
        """Main application loop."""
        while True:
            self.show_menu()
            choice = int(input("Enter menu option (1-14): " ))

            if choice == 1:
                self.create_account()
            elif choice == 2:
                self.view_all_accounts()
            elif choice == 3:
                self.find_account()
            elif choice == 4:
                self.top_accounts()
            elif choice == 5:
                self.deposit_money()
            elif choice == 6:
                self.withdraw_money()
            elif choice == 7:
                self.check_balance()
            elif choice == 8:
                self.transfer_money()
            elif choice == 9:
                self.view_transactions()
            elif choice == 10:
                self.add_interest()
            elif choice == 11:
                self.view_statistics()
            elif choice == 12:
                self.branch_tree_overview()
            elif choice == 13:
                self.undo_transaction()
            elif choice == 14 or choice is None:
                print("\nThank you for using AddisBank! Goodbye.")
                break


    

if __name__ == "__main__":
    menu = MainMenu()
    menu.run()


