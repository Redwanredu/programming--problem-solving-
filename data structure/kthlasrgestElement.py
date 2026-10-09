import random

def find_kth_largest_quickselect(nums, k):
    """
    Quickselect: partition around a pivot, only recurse into the side
    that contains the target index. Average O(n), worst O(n²).
    """
    target = len(nums) - k  # Convert kth largest → kth smallest index
    
    def quickselect(left, right):
        # Random pivot to avoid worst case on sorted input
        pivot_idx = random.randint(left, right)
        nums[pivot_idx], nums[right] = nums[right], nums[pivot_idx]
        pivot = nums[right]
        
        # Partition: everything < pivot goes left
        store = left
        for i in range(left, right):
            if nums[i] < pivot:
                nums[store], nums[i] = nums[i], nums[store]
                store += 1
        
        # Place pivot in its final position
        nums[store], nums[right] = nums[right], nums[store]
        
        # Recurse only into the relevant side
        if store == target:
            return nums[store]
        elif store < target:
            return quickselect(store + 1, right)
        else:
            return quickselect(left, store - 1)
    
    return quickselect(0, len(nums) - 1)