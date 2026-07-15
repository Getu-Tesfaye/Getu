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