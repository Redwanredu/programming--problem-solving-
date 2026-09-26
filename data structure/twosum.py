def two_sum(nums, target):
    """
    Use a hash map to store {value: index} as we iterate.
    For each number, check if its complement (target - num) is already seen.
    """
    seen = {}  # value -> index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return []
