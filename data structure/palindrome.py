from collections import deque

def is_palindrome_deque(s):
    """
    Check palindrome using a deque for efficient O(1) pops from both ends.
    """
    chars = deque(ch.lower() for ch in s if ch.isalnum())
    
    while len(chars) > 1:
        if chars.popleft() != chars.pop():
            return False
    
    return True