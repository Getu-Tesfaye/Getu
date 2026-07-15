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