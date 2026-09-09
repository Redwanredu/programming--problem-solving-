/**
 * LEETCODE SOLUTIONS - Problem 8: Product of Array Except Self
 * 
 * File: 08-product-except-self.js
 * Author: Your Name
 * Date: 2026-09-07
 * 
 * Problem: https://leetcode.com/problems/product-of-array-except-self/
 */

// ============ SOLUTION 1: Optimal (No Extra Space) ============
function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n);
    
    // Left pass (prefix)
    result[0] = 1;
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Right pass (suffix)
    let suffixProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= suffixProduct;
        suffixProduct *= nums[i];
    }
    
    return result;
}

// ============ SOLUTION 2: With Prefix & Suffix Arrays ============
function productExceptSelfArrays(nums) {
    const n = nums.length;
    const prefix = new Array(n);
    const suffix = new Array(n);
    const result = new Array(n);
    
    prefix[0] = 1;
    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] * nums[i - 1];
    }
    
    suffix[n - 1] = 1;
    for (let i = n - 2; i >= 0; i--) {
        suffix[i] = suffix[i + 1] * nums[i + 1];
    }
    
    for (let i = 0; i < n; i++) {
        result[i] = prefix[i] * suffix[i];
    }
    
    return result;
}

// ============ SOLUTION 3: With Zero Handling ============
function productExceptSelfZero(nums) {
    const n = nums.length;
    const result = new Array(n);
    let zeroCount = 0;
    let zeroIndex = -1;
    let product = 1;
    
    for (let i = 0; i < n; i++) {
        if (nums[i] === 0) {
            zeroCount++;
            zeroIndex = i;
        } else {
            product *= nums[i];
        }
    }
    
    if (zeroCount === 0) {
        for (let i = 0; i < n; i++) {
            result[i] = product / nums[i];
        }
    } else if (zeroCount === 1) {
        result.fill(0);
        result[zeroIndex] = product;
    } else {
        result.fill(0);
    }
    
    return result;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: [1,2,3,4], expected: [24,12,8,6], desc: "Standard case" },
        { input: [-1,1,0,-3,3], expected: [0,0,9,0,0], desc: "With zero" },
        { input: [2,3,4,5], expected: [60,40,30,24], desc: "All positive" },
        { input: [1,2], expected: [2,1], desc: "Two elements" },
        { input: [0,0], expected: [0,0], desc: "Multiple zeros" },
        { input: [1], expected: [1], desc: "Single element" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = productExceptSelf(input);
        const passed = JSON.stringify(result) === JSON.stringify(expected);
        console.log(
            `✅ ${desc}:`,
            `Input: [${input}]`,
            `Expected: [${expected}]`,
            `Got: [${result}]`,
            passed ? '✓ PASS' : '✗ FAIL'
        );
    });
}

runTests();

module.exports = {
    productExceptSelf,
    productExceptSelfArrays,
    productExceptSelfZero
};