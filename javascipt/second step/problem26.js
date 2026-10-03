/**
 * LEETCODE SOLUTIONS - Problem 26: Single Number
 * 
 * File: 26-single-number.js
 * Author: Your Name
 * Date: 2026-09-30
 * 
 * Problem: https://leetcode.com/problems/single-number/
 */

// ============ SOLUTION 1: XOR (Optimal) ============
function singleNumber(nums) {
    let result = 0;
    for (let num of nums) {
        result ^= num;
    }
    return result;
}

// ============ SOLUTION 2: Hash Set ============
function singleNumberSet(nums) {
    const seen = new Set();
    
    for (let num of nums) {
        if (seen.has(num)) {
            seen.delete(num);
        } else {
            seen.add(num);
        }
    }
    
    return [...seen][0];
}

// ============ SOLUTION 3: Hash Map ============
function singleNumberMap(nums) {
    const count = {};
    
    for (let num of nums) {
        count[num] = (count[num] || 0) + 1;
    }
    
    for (let num of nums) {
        if (count[num] === 1) return num;
    }
    
    return -1;
}

// ============ SOLUTION 4: Sorting ============
function singleNumberSort(nums) {
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length - 1; i += 2) {
        if (nums[i] !== nums[i + 1]) {
            return nums[i];
        }
    }
    
    return nums[nums.length - 1];
}

// ============ BONUS: Single Number II (K=3) ============
function singleNumberII(nums) {
    let result = 0;
    
    for (let i = 0; i < 32; i++) {
        let bitSum = 0;
        for (let num of nums) {
            bitSum += (num >> i) & 1;
        }
        result |= (bitSum % 3) << i;
    }
    
    return result;
}

// ============ BONUS: Single Number III (Two Singles) ============
function singleNumberIII(nums) {
    let xorAll = 0;
    for (let num of nums) xorAll ^= num;
    
    const diffBit = xorAll & (-xorAll);
    
    let a = 0, b = 0;
    for (let num of nums) {
        if (num & diffBit) a ^= num;
        else b ^= num;
    }
    
    return [a, b];
}

// ============ BONUS: Missing Number ============
function missingNumber(nums) {
    let xor = nums.length;
    for (let i = 0; i < nums.length; i++) {
        xor ^= i ^ nums[i];
    }
    return xor;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: [2,2,1], expected: 1, desc: "Basic" },
        { input: [4,1,2,1,2], expected: 4, desc: "Five elements" },
        { input: [1], expected: 1, desc: "Single element" },
        { input: [1,2,3,2,1], expected: 3, desc: "Middle single" },
        { input: [-1,-1,-2], expected: -2, desc: "Negative" },
        { input: [0,1,0], expected: 1, desc: "With zero" },
        { input: [7,7,9], expected: 9, desc: "Simple" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = singleNumber(input);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `[${input}] → ${result}`,
            passed ? '✓ PASS' : `✗ FAIL (expected ${expected})`
        );
    });
    
    // Bonus tests
    console.log("\n=== Bonus Tests ===");
    console.log("Single II [2,2,3,2]:", singleNumberII([2,2,3,2]));      // 3
    console.log("Single II [0,1,0,1,0,1,99]:", singleNumberII([0,1,0,1,0,1,99])); // 99
    console.log("Single III [1,2,1,3,2,5]:", singleNumberIII([1,2,1,3,2,5])); // [3,5]
    console.log("Missing [3,0,1]:", missingNumber([3,0,1]));              // 2
}

runTests();

module.exports = {
    singleNumber,
    singleNumberSet,
    singleNumberMap,
    singleNumberSort,
    singleNumberII,
    singleNumberIII,
    missingNumber
};