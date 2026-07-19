# 1. Load existing stock from file # create empty dictionary
inventory = {}
try:
    with open("stock.txt", "r") as f: # open to read
        for line in f:
            if line.strip():
                item, qty = line.strip().strip(",")
                inventory[item] = int(qty)
except FileNotFoundError:
    pass  # If file doesn't exist yet, start with empty inventory

# 2. Main Menu Loop
while True:
    print("\n1. View Stock 2. Add Medicine  3. Save & Exit")
    choice = input("Choose option (1-3): ").strip()

    if choice == "1":
        # View Stock
        for item, qty in inventory.items():
            print(f"- {item}: {qty} units")
            
    elif choice == "2":
        # Add/Update Stock
        item = input("Enter medicine name: ").strip().capitalize()
        try:
            qty = int(input("Enter quantity: "))
            inventory[item] = inventory.get(item, 0) + qty
            print(f"Updated {item} to {inventory[item]} units.")
        except ValueError:
            print("Error: Quantity must be a number!")
            
    elif choice == "3":
        # Save to file and Exit
        with open("stock.txt", "w") as f:
            for item, qty in inventory.items():
                f.write(f"{item},{qty}\n")
        print("Stock saved to 'stock.txt'. Goodbye!")
        break