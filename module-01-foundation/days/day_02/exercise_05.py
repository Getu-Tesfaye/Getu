# Task 14: Create a list of tuples called customers (name, balance)
# =====================================================================
customers = [
    ("Almaz", 1200),
    ("Dawit", 650),
    ("Tigist", 300),
    ("Bereket", 1500)]
# Task 15: Function to determine customer membership tier
# =====================================================================
def get_tier(balance):
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    else:
        return "Basic"
# Task 16: Function to calculate final balance after tax
# =====================================================================
def apply_tax(balance, rate=0.15):
    return balance + (balance * rate)
# Task 17: Loop through customers with a for loop and process billing
# =====================================================================
print("--- Customer Billing Summary ---")

for customer in customers:
    # Unpack the tuple into name and balance variables
    name = customer[0]
    balance = customer[1]
    
    # Use get_tier() to find their tier
    tier = get_tier(balance)
    
    # Use apply_tax() to find their balance with tax added
    final_balance = apply_tax(balance)
    
    # Print the core summary line with an f-string
    print(f"Customer: {name} | Original Balance: {balance} ETB | Tier: {tier} | Total Bill (with tax): {final_balance:.2f} ETB")
    
    # If the tier is "Premium", print an extra congratulatory message
    if tier == "Premium":
        print(f" Thank you for being a valued Premium member, {name}!")
        
