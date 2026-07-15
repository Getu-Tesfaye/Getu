class product:
     def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

     def restock(self,n): # adda n to the stock
         self.quantity  += n
         print(f"restock {n} units. new quantity: {self.quantity}")
     def sell(self,n):
         self.quantity -= n # substracts n from stock
         print(f"sold {n} units. remaining unit: {self.quantity}")
#create a object
mobile =  product("mobile", 30000, 5)
mobile.restock(20)
mobile.sell(6)





        