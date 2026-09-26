def two_sum_sorted(nums, target):
    """
    If the array is sorted, use two pointers.
    NOTE: This returns VALUES, not original indices.
    """
    left, right = 0, len(nums) - 1
    
    while left < right:
        current = nums[left] + nums[right]
        if current == target:
            return [left, right]
        elif current < target:
            left += 1
        else:
            right -= 1
    
    return []