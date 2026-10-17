from collections import deque

def coin_change_bfs(coins, amount):
    """
    BFS over amounts: level i = amounts reachable with i coins.
    First time we reach 0, that's the answer.
    """
    if amount == 0:
        return 0
    
    visited = {amount}
    queue = deque([(amount, 0)])  # (remaining, coins_used)
    
    while queue:
        remaining, steps = queue.popleft()
        for coin in coins:
            nxt = remaining - coin
            if nxt == 0:
                return steps + 1
            if nxt > 0 and nxt not in visited:
                visited.add(nxt)
                queue.append((nxt, steps + 1))
    
    return -1