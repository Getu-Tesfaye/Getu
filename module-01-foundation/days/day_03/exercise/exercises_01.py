#=======part1============
# goal: remove duplicates from the list
#step1 :start with a lists that has duplicate
from string.templatelib import convert
cities =["addis ababa","adama","jimma","asalaa","adama","jimma"]
#step2 : convert the list in to set to remove duplicates
unique_cities = set(cities)
#step3 : use python len() function to count how many items are left
city_count =len(unique_cities)
print(f"unique cities : {unique_cities}")
print(f"number of unique cities : {city_count}")
#=======part2============
# goal : creat a dictionary of 5 grocery items and ther prices
#step1 : create a dictionary using curly braces
groceries = { "teff": 100, "sugar": 150, "oil": 450, "powder": 500, "coffee": 350 }
#step2 :use for loop combined with .items()
for item, price in groceries.items():
    print(f"{item} :{price}")
#===================part3=============tax comprehension
# goal : Take prices = [100, 250, 400, 80] and add a 15% tax to each
# step1:  To add 15% tax to a price, you multiply it by 1.15 (115%)
prices =[100,250,400,80]
#  step2: multiply price by added tax
taxed_prices = [price * 1.15 ]
print(f"original prices: {prices}")
print(f"after 15% tax added: {taxed_prices}")
#===========part4=====cheap items========
# goal: select cheapest one
# step1: Use the exact same list comprehension technique as Question 3, but this time add a gatekeeper at the end.
prices = [100,250,400,80]
cheap_prices = [price for price in prices if price < 200]
print(f"original prices: {price}")
print(f"prices < 200 ETB: {cheap_prices}")
#========part5=======write and read========
# goal: Write 3 names to a file called names.txt, then read them back.
#  step1: Open a file in "write" mode ("w").
with open("names.txt", "w") as file:
# with: means safely closes the file after done
# "W": means open the file to write 
 file.write("tolosa\n")
 file.write("gemechu\n")
 file.write("bedada\n")
# \n means saved files in new files
print("saved names to `named.txt` seccsesfully:")
# Now, open the file in 'r' (read) mode and print them
with open("names.txt", "r") as file:
    for line in file:
        print("Reading names back from file:")
#=========================part6============safe division
# goal: Divide 1000 by a user's input.
# step1: Use a try block. This tells Python: "Try to run this code, but watch out for trouble.
try:
    user_input = input("inter a number to divide 1000 by")
#  convert this user typed in to whole number or integers
    number = int(user_input)
    result = 1000 / number
    print(f"result: 1000 divide by a {number} is {result}")
except ValueError:
 print("Error: that wasn't a valid number! please enter digits only")
except ZeroDivisionError:
 print("Error: You cannot divide by zero!")


           


      












