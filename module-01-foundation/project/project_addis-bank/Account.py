class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self.transaction = []
    @property
    def balance(self):
        return self.__balance
    @balance.setter
    def balance(self, amount):
        if amount < 0:
            raise ValueError("self.balance can not be negative")
        self.balance = amount
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            self.transaction.append(f"deposited: +{amount} new balance: {self.balance}")
            print(f"deposited: {amount} new balance: {self.balance}")       
        else:
            print(f"deposit must be positive")
    def withdrawn(self, amount):
     if 0 < amount <= self.__balance:
        self.__balance -= amount
        self.transaction.append("withdrawn: -{amount}")
        print(f"withdrawn {amount}")
     else:
        print(f"insuficent funds")

account = Account("Getu_Tesfaye", 1000456787543, 500)
account.deposit(1000)
account.withdrawn(500)






    
        


        
    

