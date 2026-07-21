import heapq
from collections import deque

# ==========================================
# Exercise 1 & 2: BST, In-order Traversal & Tree Depth
# ==========================================
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def insert(root, val):
    if not root:
        return Node(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root

def inorder(root):
    if root:
        inorder(root.left)
        print(root.val, end=" ")
        inorder(root.right)

def height(node):
    if not node:
        return 0
    return 1 + max(height(node.left), height(node.right))

# Step 1 & 2 Test
print("--- Ex 1 & 2: BST Traversal & Depth ---")
balances = [500, 200, 800, 100, 300]
root = None
for b in balances:
    root = insert(root, b)

print("In-order traversal (sorted):", end=" ")
inorder(root)
print()
print("Tree Depth:", height(root))


# ==========================================
# Exercise 3: Graph BFS
# ==========================================
def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    order = []
    
    while queue:
        vertex = queue.popleft()
        order.append(vertex)
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order

# Step 3 Test
graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['E'],
    'D': [],
    'E': []
}

print("\n--- Ex 3: Graph BFS ---")
print("BFS Order from A:", bfs(graph, 'A'))


# ==========================================
# Exercise 4: Graph DFS (Recursive)
# ==========================================
def dfs(graph, start, visited=None):
    if visited is None:
        visited = []
    
    if start not in visited:
        visited.append(start)
        for neighbor in graph.get(start, []):
            dfs(graph, neighbor, visited)
            
    return visited

# Step 4 Test
print("\n--- Ex 4: Graph DFS ---")
print("DFS Order from A:", dfs(graph, 'A'))


# ==========================================
# Exercise 5: Priority Queue with heapq
# ==========================================
# Step 5 Test
print("\n--- Ex 5: Priority Queue ---")
tasks = [
    (3, "Medium Priority Task"),
    (1, "High Priority Task"),
    (5, "Low Priority Task"),
    (2, "Urgent Task"),
    (4, "Normal Task")
]

# Push all items onto heap
pq = []
for task in tasks:
    heapq.heappush(pq, task)

# Pop all by priority
print("Popping tasks in priority order:")
while pq:
    priority, name = heapq.heappop(pq)
    print(f"Priority {priority}: {name}")