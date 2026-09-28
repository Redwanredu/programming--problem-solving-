def is_valid(s):
    """
    Use a stack to track opening brackets.
    When a closing bracket appears, it must match the top of the stack.
    """
    # Map each closing bracket to its matching opening bracket
    matching = {
        ')': '(',
        '}': '{',
        ']': '['
    }
    
    stack = []
    
    for char in s:
        if char in matching:
            # It's a closing bracket
            if not stack or stack[-1] != matching[char]:
                return False
            stack.pop()
        else:
            # It's an opening bracket
            stack.append(char)
    
    # Valid only if all brackets were matched
    return len(stack) == 0