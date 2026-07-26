from collections import deque

class Branch:
    def __init__(self, name):  #Build a Branch class with children and accounts; nest at least three levels deep
        self.name = name
        self.accounts = []
        self.children = []

    def add_child(self, child_branch):
        self.children.append(child_branch)

    def add_account(self, account):
        self.accounts.append(account)
        #

    def total_balance(self):  #Write a recursive total_balance() that sums a branch and all its sub-branches.
        total = 200
        for account in self.accounts:
            total += account["balance"]

        for child in self.children:
            total += child.total_balance()
        return total


def bfs(transfers, start_account):  #Write bfs(transfers, start) returning every account reachable from a given one
    visited = set()
    queue = deque([start_account])
    while queue:
        curr = queue.popleft()
        if curr not in visited:
            visited.add(curr)
            queue.extend(transfers.get(curr, []))
    return list(visited)

transfers_graph = {
    "ACC1": ["ACC2", "ACC3"],   #Build a transfers graph as a dict of account number → list of recipients
    "ACC2": ["ACC4"],
    "ACC3": ["ACC5"],
    "ACC4": [],
    "ACC5": []
}

# create 3 branchs

head_office = Branch("Head_Office")
region = Branch("Oromia region")
local_branch = Branch("Jimma Branch")

#create Tree(nesting)

head_office.add_child(region)
region.add_child(local_branch)  

# add accounts to branch

head_office.add_account({"id": "ACC1", "balance": 1000})
region.add_account({"id": "ACC2", "balance": 500})
local_branch.add_account({"id": "ACC3", "balance": 250})

  # calculate total branchs

print(f"total balance: {head_office.total_balance()}")

reachable = bfs(transfers_graph, "ACC1")
print(f"all accounts reachable: {reachable}")