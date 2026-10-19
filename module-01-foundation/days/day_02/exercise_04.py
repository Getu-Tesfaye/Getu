# Task 9: Function to check if a number is even
#===================================================
def is_even(number):
    if number % 2 == 0:
        return True
    else:
        return False  
# Task 10: Function to add tax with a default parameter (rate = 0.15)
 #===================================================================
def add_tax(price, rate=0.15):
    return price + (price * rate)   
# Task 11: Call add_tax using default rate and keyword arguments
# =====================================================================
print("--- Task 11 Results ---")
# Call using the default tax rate (0.15)
result_default = add_tax(1000)
print(f"Price with default tax: {result_default}")
# Call using a keyword argument override (rate = 0.10)
result_keyword = add_tax(1000, rate=0.10)
print(f"Price with custom keyword tax: {result_keyword}")    
# Task 12: Function to describe tier based on balance
# =====================================================================
def describe_balance(balance):
    if balance >= 1000:
        tier = "Premium"
    elif balance >= 500:
        tier = "Standard"
    else:
        tier = "Basic"
    return tier    
# Task 13: Local Scope Demonstration & Error Observation
# =====================================================================
print("\n--- Task 13 Results ---")
# Call the function and print the return value
user_tier = describe_balance(750)
print(f"The returned user tier is: {user_tier}")

