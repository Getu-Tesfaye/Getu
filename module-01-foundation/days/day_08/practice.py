# ==========================================
# Exercise 1: Recursive sum & count_down
# ==========================================
def total(nums):
    if not nums:
        return 0
    return nums[0] + total(nums[1:])

def count_down(n):
    if n <= 0:
        return
    print(n)
    count_down(n - 1)

# Step 1 Test
print("--- Ex 1: Recursion ---")
print("Total sum:", total([1, 2, 3, 4, 5]))
print("Count down:")
count_down(3)


# ==========================================
# Exercise 2: Binary Search
# ==========================================
def binary_search(items, target):
    low, high = 0, len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

# Step 2 Test
print("\n--- Ex 2: Binary Search ---")
balances = [100, 250, 400, 550, 900]
print("Index of 400:", binary_search(balances, 400))
print("Index of 999:", binary_search(balances, 999))


# ==========================================
# Exercise 3: Merge Sort
# ==========================================
def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

def merge_sort(items):
    if len(items) <= 1:
        return items
    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])
    return merge(left, right)

# Step 3 Test
print("\n--- Ex 3: Merge Sort ---")
random_list = [42, 12, 88, 3, 25]
print("Sorted list:", merge_sort(random_list))


# ==========================================
# Exercise 4: Sort with a Key (Descending)
# ==========================================
# Step 4 Test
print("\n--- Ex 4: Sort with Key ---")
accounts = [("Almaz", 500), ("tigist", 1200), ("surafel", 300)]
sorted_accounts = sorted(accounts, key=lambda acc: acc[1], reverse=True)
print("Sorted by balance (descending):", sorted_accounts)


# ==========================================
# Exercise 5: Two Pointers
# ==========================================
def has_pair(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return False

# Step 5 Test
print("\n--- Ex 5: Two Pointers ---")
sorted_nums = [10, 20, 35, 50, 75]
print("Has pair summing to 70:", has_pair(sorted_nums, 70))
print("Has pair summing to 100:", has_pair(sorted_nums, 100))