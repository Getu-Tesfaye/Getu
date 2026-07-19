import time

# --- EXERCISE 1: Name the Big-O ---
# a list index: O(1)Constant time. Accessing an element by index takes the same time regardless of list size.
#Assume this is our data
sample_list = [10, 20, 30, 40, 50]
sample_dict = {"apple": 1, "banana": 2, "cherry": 3}
# a single loop: O(n)) - Linear time. Runs proportional to the number of items.
item = sample_list[2]
# a nested loop: O(n^2) - Quadratic time. Loop inside a loop scales poorly.
for num in sample_list:
    print(num)
# a dict lookup: O(1) - Constant time. Dictionaries use hashing to find keys instantly.
for x in sample_list:
    for y in sample_list:
        print(x, y)
# a binary search: O(log n) - Logarithmic time. Divides the search space in half each step.
def binary_search(sorted_list, target):
    low = 0
    high = len(sorted_list) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if sorted_list[mid] == target:
            return mid  # Found it!
        elif sorted_list[mid] < target:
            low = mid + 1   # Cut out the left half
        else:
            high = mid - 1  # Cut out the right half
    return -1


# --- EXERCISE 2: List vs. Dict Lookup ---
# Build data structures with 100,000 fake accounts
large_list = list(range(100000))
large_dict = {i: f"Account_{i}" for i in range(100000)}
target = 99999  # Near the end

# Time the list lookup
start = time.perf_counter()
is_in_list = target in large_list
list_time = time.perf_counter() - start

# Time the dict lookup
start = time.perf_counter()
is_in_dict = target in large_dict
dict_time = time.perf_counter() - start

print(f"List lookup took: {list_time:.6f} seconds")
print(f"Dict lookup took: {dict_time:.6f} seconds (Much faster!)")

from collections import deque

# --- EXERCISE 3: Build a Stack & Reverse Names ---

class Stack:
    def __init__(self):
        self.items = []
    def push(self, item):
        self.items.append(item)
    def pop(self):
        return self.items.pop() if self.items else None
    def peek(self):
        return self.items[-1] if self.items else None

# Reverse a list of names using the Stack
names = ["Alice", "Bob", "Charlie"]
stack = Stack()

for name in names:
    stack.push(name)

reversed_names = []
while stack.peek() is not None:
    reversed_names.append(stack.pop())

print("Reversed Names:", reversed_names) # Output: ['Charlie', 'Bob', 'Alice']


# --- EXERCISE 4: Build a Queue (Bank Service Line) ---
# Use deque for efficient O(1) pops from the left side
bank_queue = deque()

# Enqueue 5 customers
for i in range(1, 6):
    bank_queue.append(f"Customer {i}")

# Serve them in order (First-In, First-Out)
while bank_queue:
    served = bank_queue.popleft()
    print(f"Serving: {served}")


# --- EXERCISE 5: Singly Linked List ---
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, data):
        new_node = Node(data)
        new_node.next = self.head  # Point new node to current head
        self.head = new_node       # Make new node the new head

    def print_all(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

# Test the Linked List
ll = LinkedList()
ll.push_front("Node C")
ll.push_front("Node B")
ll.push_front("Node A")
ll.print_all() # Output: Node A -> Node B -> Node C -> None