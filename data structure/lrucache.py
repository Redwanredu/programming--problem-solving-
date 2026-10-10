class DListNode:
    """Node for the doubly linked list."""
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCache:
    """
    LRU Cache using:
    - dict: key -> DListNode   (O(1) lookup)
    - doubly linked list: most-recent at head, least-recent at tail
    """
    
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> DListNode
        
        # Dummy head/tail to eliminate edge cases
        self.head = DListNode()  # most recently used side
        self.tail = DListNode()  # least recently used side
        self.head.next = self.tail
        self.tail.prev = self.head
    
    # ---- Internal helpers ----
    
    def _remove(self, node):
        """Unlink a node from the list."""
        node.prev.next = node.next
        node.next.prev = node.prev
    
    def _add_to_front(self, node):
        """Insert a node right after the dummy head (most recent position)."""
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node
    
    # ---- Public API ----
    
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        
        node = self.cache[key]
        # Mark as recently used: move to front
        self._remove(node)
        self._add_to_front(node)
        return node.value
    
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Update value and mark as recently used
            node = self.cache[key]
            node.value = value
            self._remove(node)
            self._add_to_front(node)
        else:
            # Insert new node at the front
            node = DListNode(key, value)
            self.cache[key] = node
            self._add_to_front(node)
            
            # Evict if over capacity
            if len(self.cache) > self.capacity:
                lru = self.tail.prev      # Node just before dummy tail
                self._remove(lru)
                del self.cache[lru.key]