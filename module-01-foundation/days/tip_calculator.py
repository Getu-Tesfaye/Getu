# Step 1: Store a bill total (ETB) and number of people in variables
# =====================================================================
bill_total = 2500.00  # Total restaurant bill in Ethiopian Birr
num_people = 5        # Number of friends sharing the bill
friends = ["Almaz", "Dawit", "Tigist", "Bereket", "Getu"]
# ==================================================================
# Step 2: Write a function split_bill with a default tip_rate=0.10
# =============================================================
def split_bill(total, people, tip_rate=0.10):
    # Calculate total tip amount
    tip_amount = total * tip_rate
    # Calculate grand total including tip
    grand_total = total + tip_amount
    # Split equally among the number of people
    per_person_share = grand_total / people
    return per_person_share
# =====================================================================
# Step 3: Use it to compute the per-person amount, tip included
# =====================================================================
# This calls our function to find the exact share amount
individual_share = split_bill(bill_total, num_people)
# =====================================================================
# Step 4: Loop over a list of names and print each person's share
# =====================================================================
print("--- TeleBirr Request Summary ---")
print(f"Original Bill: {bill_total} ETB (10% Default Tip Included)")
print("--------------------------------")
for friend in friends:
    # Print the specific individual share for each friend
    print(f"Sending TeleBirr request to {friend}: {individual_share:.2f} ETB")