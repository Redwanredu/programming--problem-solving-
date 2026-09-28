def length_of_longest_substring(s):
    """
    Use a sliding window with two pointers and a set.
    Expand the right pointer; if a duplicate appears, shrink from the left.
    """
    char_set = set()
    left = 0
    max_len = 0
    
    for right in range(len(s)):
        # Shrink window until no duplicate
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    
    return max_len