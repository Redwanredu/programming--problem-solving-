/**
 * LEETCODE SOLUTIONS - Problem 28: Missing Number
 * 
 * File: 28-missing-number.js
 * Author: Your Name
 * Date: 2026-10-05
 * 
 * Problem: https://leetcode.com/problems/missing-number/
 */

// ============ SOLUTION 1: XOR (Optimal) ============
function missingNumber(nums) {
    let xor = nums.length;
    for (let i = 0; i < nums.length; i++) {
        xor ^= i ^ nums[i];
    }
    return xor;
}

// ============ SOLUTION 2: Math (Sum Formula) ============
function missingNumberMath(nums) {
    const n = nums.length;
    const expectedSum = n * (n + 1) / 2;
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
    return expectedSum - actualSum;
}

// ============ SOLUTION 3: Sorting ============
function missingNumberSort(nums) {
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i) return i;
    }
    return nums.length;
}

// ============ SOLUTION 4: Hash Set ============
function missingNumberSet(nums) {
    const set = new Set(nums);
    for (let i = 0; i <= nums.length; i++) {
        if (!set.has(i)) return i;
    }
    return -1;
}

// ============ BONUS: Find Disappeared Numbers ============
function findDisappearedNumbers(nums) {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        const index = Math.abs(nums[i]) - 1;
        if (nums[index] > 0) nums[index] = -nums[index];
    }
    
    const result = [];
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) result.push(i + 1);
    }
    return result;
}

// ============ BONUS: First Missing Positive ============
function firstMissingPositive(nums) {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            const idx = nums[i] - 1;
            [nums[i], nums[idx]] = [nums[idx], nums[i]];
        }
    }
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) return i + 1;
    }
    return n + 1;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: [3,0,1], expected: 2, desc: "Basic" },
        { input: [0,1], expected: 2, desc: "Missing at end" },
        { input: [9,6,4,2,3,5,7,0,1], expected: 8, desc: "Large" },
        { input: [0], expected: 1, desc: "Single 0" },
        { input: [1], expected: 0, desc: "Single 1" },
        { input: [0,2], expected: 1, desc: "Missing middle" },
        { input: [1,2,3], expected: 0, desc: "Missing 0" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = missingNumber(input);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `[${input}] → ${result}`,
            passed ? '✓ PASS' : `✗ FAIL (expected ${expected})`
        );
    });
    
    // Bonus tests
    console.log("\n=== Bonus Tests ===");
    console.log("Disappeared [4,3,2,7,8,2,3,1]:", findDisappearedNumbers([4,3,2,7,8,2,3,1])); // [5,6]
    console.log("First missing positive [1,2,0]:", firstMissingPositive([1,2,0])); // 3
    console.log("First missing positive [3,4,-1,1]:", firstMissingPositive([3,4,-1,1])); // 2
}

runTests();

module.exports = {
    missingNumber,
    missingNumberMath,
    missingNumberSort,
    missingNumberSet,
    findDisappearedNumbers,
    firstMissingPositive
};