# part A (while loop) substracting 100 from balance unti it is 0
print("---part A---")
balance = 500
while balance > 0:
    print(f"current balance: {balance}")
    balance = balance - 100
# part B (for + range) print 5 times tables
print("---part B---")
for i in range(1 , 11):
    result = 5 * i
    print(f"5 * {i} = {result}")
# part C (for +list + continue) print greetings for each name in the list skip for tigist
print("---part C---")
names = ["almaz", "dawit", "tigist", "bereket"]
for name in names:
    if name == "tigist":
     continue # skip the rest
    print(f"welcome to the class {name}")
# part D (break) Find the first number divisible by 7 between 1 and 20
print("---part D---")
for num in range (1, 21):
    if num % 7 == 0:
        print(f"the first number divisible by 7 between 1 and 20 is:{num}")
        break # exit the loop after finding the first number


