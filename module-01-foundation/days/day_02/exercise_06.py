# 1. Function to check the tier based on balance
def tier(balance):
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    else:
        return "Basic"

# 2. List of 5 customers: (name, balance)
customers = [
    ("Alemu", 1200),
    ("bonsa", 750),
    ("chala", 300),
    ("dawit", 1000),
    ("elsa", 150)
]

# 3. Variables to keep count of each tier
premium_count = 0
standard_count = 0
basic_count = 0

# 4. Loop through each customer
for name, balance in customers:
    # Find the tier for this customer
    customer_tier = tier(balance)
    
    # Print the customer line
    print(name, "-", customer_tier, "-", balance, "ETB")
    

# 5. Print the summary counts
print("\nSummary:")
print("Premium:", premium_count)
print("Standard:", standard_count)
print("Basic:", basic_count)