/**
 * LEETCODE SOLUTIONS - Problem 6: Contains Duplicate
 * 
 * File: 06-contains-duplicate.js
 * Author: Your Name
 * Date: 2026-09-07
 * 
 * Problem: https://leetcode.com/problems/contains-duplicate/
 */

// ============ SOLUTION 1: Hash Set ============
function containsDuplicate(nums) {
    const seen = new Set();
    for (let num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
}

// ============ SOLUTION 2: Sorting ============
function containsDuplicateSort(nums) {
    nums.sort((a, b) => a - b);
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) return true;
    }
    return false;
}

// ============ SOLUTION 3: Set Size Comparison ============
function containsDuplicateSet(nums) {
    return new Set(nums).size !== nums.length;
}

// ============ BONUS: Find All Duplicates ============
function findAllDuplicates(nums) {
    const seen = new Set();
    const duplicates = new Set();
    
    for (let num of nums) {
        if (seen.has(num)) duplicates.add(num);
        seen.add(num);
    }
    
    return Array.from(duplicates);
}

// ============ BONUS: Contains Nearby Duplicate ============
function containsNearbyDuplicate(nums, k) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
            return true;
        }
        map.set(nums[i], i);
    }
    
    return false;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: [1,2,3,1], expected: true, desc: "Has duplicate" },
        { input: [1,2,3,4], expected: false, desc: "All unique" },
        { input: [1,1,1,3,3,4,3,2,4,2], expected: true, desc: "Many duplicates" },
        { input: [], expected: false, desc: "Empty array" },
        { input: [1], expected: false, desc: "Single element" },
        { input: [1,2,3,4,1], expected: true, desc: "Duplicate at ends" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = containsDuplicate(input);
        console.log(
            `✅ ${desc}:`,
            `Input: [${input}]`,
            `Expected: ${expected}`,
            `Got: ${result}`,
            result === expected ? '✓ PASS' : '✗ FAIL'
        );
    });
    
    // Test bonus functions
    console.log("\n📊 Bonus Tests:");
    console.log("Find Duplicates:", findAllDuplicates([4,3,2,7,8,2,3,1]));
    console.log("Nearby Duplicate (k=2):", containsNearbyDuplicate([1,2,3,1], 2));
    console.log("Nearby Duplicate (k=3):", containsNearbyDuplicate([1,2,3,1], 3));
}

runTests();

module.exports = {
    containsDuplicate,
    containsDuplicateSort,
    containsDuplicateSet,
    findAllDuplicates,
    containsNearbyDuplicate
};