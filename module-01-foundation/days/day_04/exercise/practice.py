#question1
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
     print(f"pages{self.title} written by {self.author} has {self.pages}")
           
book1 = Book("the lion", "jened.h.j.j", 250)
book2 = Book("the bird", "J.J.kal", 150)
book1.describe()
book2.describe()

#question2
class product:
     def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

     def restock(self,n): # add n to the stock
         self.quantity  += n
         print(f"restock {n} units. new quantity: {self.quantity}")
     def sell(self,n):
         self.quantity -= n # substracts n from stock
         print(f"sold {n} units. remaining unit: {self.quantity}")
#create a object
mobile =  product("mobile", 30000, 5)
mobile.restock(20)
mobile.sell(6)

#question3
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity  # Double underscore makes it private

    @property
    def quantity(self):
        # The getter allows us to read __quantity safely
        return self.__quantity

    def restock(self, n):
        self.__quantity += n

    def sell(self, n):
        self.__quantity -= n

# Quick test of the getter
mobile = Product("mobile", 30000, 5)
print(mobile.quantity)
print(f"Starting quantity: {mobile.quantity}") 

mobile.restock(20)
print(f"Quantity after restocking 10: {mobile.quantity}")

mobile.sell(6)
print(f"Quantity after selling 3: {mobile.quantity}")

#question4
print("---quetion4---")
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity  # This runs the setter during initialization!

    @property
    def quantity(self):
        return self.__quantity

    @quantity.setter
    def quantity(self, value):
        # Validation guard: refuses negative stock assignments
        if value < 0:
            raise ValueError("Quantity cannot be negative!")
        self.__quantity = value
    def restock(self, n):
         self.quantity += n  # Triggers setter validation

    def sell(self, n):
        # Guard clause inside sell method
        if n > self.quantity:
            print(f"Error: Not enough stock to sell {n} units! We only have {self.quantity}.")
        else:
            self.quantity -= n  # Triggers setter validation
            print(f"Sold {n} units. Remaining: {self.quantity}")

# Quick validation test
tv = Product("Smart TV", 25000, 5)

try:
    tv.quantity = -2  # Will trigger the ValueError from the setter
except ValueError as e:
    print(e)  # Output: Quantity cannot be negative!

tv.sell(10)

#question5
# Create three separate Product objects
prod1 = Product("Apple", 20, 50)
prod2 = Product("Banana", 15, 30)
prod3 = Product("Orange", 18, 40)

# Modify only the first product (prod1)
prod1.sell(10) #

print(f"{prod1.name} quantity: {prod1.quantity}")  
print(f"{prod2.name} quantity: {prod2.quantity}")  
print(f"{prod3.name} quantity: {prod3.quantity}")

