/* Description:
Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.

You may assume that each input has exactly one solution, and you may not use the same element twice.
 Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].*/


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Create a hash map to store number and its index
    const numMap = new Map();
    
    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
        // Calculate the complement needed
        const complement = target - nums[i];
        
        // Check if complement exists in map
        if (numMap.has(complement)) {
            // Return the indices
            return [numMap.get(complement), i];
        }
        
        // Store current number with its index
        numMap.set(nums[i], i);
    }
    
    // Return empty array if no solution (though problem guarantees one)
    return [];
}

// Test the solution
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]
console.log(twoSum([3, 3], 6));         // [0, 1]
