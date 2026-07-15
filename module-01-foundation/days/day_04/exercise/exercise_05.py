# Create three separate Product objects
prod1 = Product("Apple", 20, 50)
prod2 = Product("Banana", 15, 30)
prod3 = Product("Orange", 18, 40)

# Modify only the first product (prod1)
prod1.sell(10) # Apple quantity goes from 50 down to 40

print(f"{prod1.name} quantity: {prod1.quantity}")  
print(f"{prod2.name} quantity: {prod2.quantity}")  
print(f"{prod3.name} quantity: {prod3.quantity}")