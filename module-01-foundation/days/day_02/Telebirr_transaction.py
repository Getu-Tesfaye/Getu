# --- STEP 1: Create an empty dictionary to store names and totals 
customer_spend = {}

# --- STEP 2: Safe File Reading (Handles the missing file error) ---
try:
    # Open the file safely
    with open("transactions.txt", "r") as file:
        for line in file:
            # Clean the line and split it by the comma (e.g., "almaz,50.98")
            name, amount_str = line.strip().split(",")
            amount = float(amount_str)  # Convert text "50.98 to decimal number 50.98
            
            # --- STEP 3: Add the amount to the customer's total ---
            # If name exists, add to existing total. If not, start at 0.0 and add.
            customer_spend[name] = customer_spend.get(name, 0.0) + amount

except FileNotFoundError:
    print("Error: The file 'transactions.txt' was not found! Please create it.")
    exit()  # Stop the program here if there is no file

# --- STEP 4: Sort customers by spend (Highest first) ---
# This converts the dictionary into a sorted list of pairs
sorted_customers = sorted(customer_spend.items(), key=lambda x: x[1], reverse=True)

# Print the sorted results to the screen
print("--- Sales Summary ---")
for customer, total in sorted_customers:
    print(f"{customer}: ${total:.2f}")

# --- STEP 5: Save the results to a new report file ---
with open("report.txt", "w") as out_file:
    for customer, total in sorted_customers:
        out_file.write(f"{customer}, {total:.2f}\n")

print("\nSuccess! 'report.txt' has been created.")