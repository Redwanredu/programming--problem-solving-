/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
    // Create a set to track seen numbers
    const seen = new Set();
    
    for (let num of nums) {
        // If number already exists in set, we found a duplicate
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }
    
    return false;
}

// Alternative: Compare set size with array length
function containsDuplicateSetSize(nums) {
    const set = new Set(nums);
    return set.size !== nums.length;
}

// Test cases
console.log(containsDuplicate([1,2,3,1]));              // true
console.log(containsDuplicate([1,2,3,4]));              // false
console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2]));  // true
console.log(containsDuplicate([]));                      // false
console.log(containsDuplicate([1]));                    // false
console.log(containsDuplicate([1,2,3,4,1]));           // true