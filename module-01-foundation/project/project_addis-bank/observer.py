from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def update(self, message: str):
        pass

    #3concurete observer
class SMSNotifier(Observer):
    def update(self, message: str):
        print(f"SMSalert {message}")

class EMAILNotifier(Observer):
    def update(self, message: str):
        print(f"EMAILalert {message}")

        #subject observer
class BankAccount():
    def __init__(self, owner: str, balance: float):

        self.owner = owner
        self.__balance = balance
        self._observers = []

    def attach(self, observer):
        self._observers.append(observer)
    def notify(self, message):
            for observer in self._observers:
                observer.update(message)
    def deposit(self, amount: float):
         self.__balance += amount
         self.notify("{self.owner} deposited {amount} new balance {self.__balance}")
    def withdraw (self, amount: float):
         self.__balance -= amount
         self.notify("{self.owner}  withdrawn {amount} new balance {self.__balance}")
    def detach(self, observer):
         self._observers.remove(observer)

         #testing the code


# 1 create account
account = BankAccount("Getu", 1000,)

#2 create observer instances
sms = SMSNotifier()
email = EMAILNotifier()

#3 attach observer to the account
account.attach(sms)
account.attach(email)

account.deposit(400)
account.withdraw(500)

#4 detach observer from account
account.detach(sms)
account.detach(email)

account.deposit(400)
account.withdraw(500)










    
