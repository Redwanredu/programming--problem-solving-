def first_non_repeating_char(s):
    """
    Find the first non-repeating character in a string.
    Returns the index of the character, or -1 if none exists.
    """
    # Step 1: Count frequency of each character
    char_count = {}
    
    for char in s:
        char_count[char] = char_count.get(char, 0) + 1
    
    # Step 2: Find the first character with count == 1
    for index, char in enumerate(s):
        if char_count[char] == 1:
            return index
    
    return -1


# Test cases
def test_solution():
    test_cases = [
        ("leetcode", 0),
        ("loveleetcode", 2),
        ("aabb", -1),
        ("a", 0),
        ("", -1),
        ("aabbccd", 6),
    ]
    
    for input_str, expected in test_cases:
        result = first_non_repeating_char(input_str)
        status = "✓" if result == expected else "✗"
        print(f"{status} Input: '{input_str}' | Expected: {expected} | Got: {result}")


if __name__ == "__main__":
    test_solution()