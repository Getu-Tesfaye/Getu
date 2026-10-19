class AccountRegistry:
    def __init__(self):
        self.by_number = {}

    def top_by_balance(self, n=5):
        accts = sorted(self.by_number.values(), key=lambda a: a.balance, reverse=True)
        return accts[:n]

    def binary_search(self, arr, target):
        low, high = 0, len(arr) - 1

        while low <= high:
            mid = (low + high) // 2

            if arr[mid] == target:
                return mid
            elif arr[mid] < target:
                low = mid + 1
            else:
                high = mid - 1

        return -1

    def find_by_number(self, number):
        nums = sorted(self.by_number.keys())
        idx = self.binary_search(nums, number)
        if idx != -1:
            return self.by_number[nums[idx]]
        return None

    def sum_recursive(self, transactions, idx=0):
        if idx >= len(transactions):
            return 0
        return transactions[idx] + self.sum_recursive(transactions, idx + 1)

    def total_transactions(self, number):
        account = self.find_by_number(number)
        if not account or not hasattr(account, "transactions"):
            return 0
        return self.sum_recursive(account.transactions)


if __name__ == "__main__":
    registry = AccountRegistry()

    top_accounts = registry.top_by_balance(n=5)
    print("top_by_balance", top_accounts)

    account = registry.find_by_number(10005676543)
    print("account", account)

    total = registry.total_transactions(8000)
    print("total", total)

    

        
       