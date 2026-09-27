/**
 * LEETCODE SOLUTIONS - Problem 21: Plus One
 * 
 * File: 21-plus-one.js
 * Author: Your Name
 * Date: 2026-09-27
 * 
 * Problem: https://leetcode.com/problems/plus-one/
 */

// ============ SOLUTION 1: In-Place (Optimal) ============
function plusOne(digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    
    digits.unshift(1);
    return digits;
}

// ============ SOLUTION 2: New Array ============
function plusOneNew(digits) {
    const result = [...digits];
    
    for (let i = result.length - 1; i >= 0; i--) {
        if (result[i] < 9) {
            result[i]++;
            return result;
        }
        result[i] = 0;
    }
    
    return [1, ...result];
}

// ============ SOLUTION 3: Recursive ============
function plusOneRecursive(digits, index = digits.length - 1) {
    if (index < 0) {
        digits.unshift(1);
        return digits;
    }
    
    if (digits[index] < 9) {
        digits[index]++;
        return digits;
    }
    
    digits[index] = 0;
    return plusOneRecursive(digits, index - 1);
}

// ============ BONUS: Plus N ============
function plusN(digits, n) {
    const result = [...digits];
    let carry = n;
    let i = result.length - 1;
    
    while (i >= 0 && carry > 0) {
        const sum = result[i] + carry;
        result[i] = sum % 10;
        carry = Math.floor(sum / 10);
        i--;
    }
    
    while (carry > 0) {
        result.unshift(carry % 10);
        carry = Math.floor(carry / 10);
    }
    
    return result;
}

// ============ BONUS: Add Two Arrays ============
function addArrays(a, b) {
    const result = [];
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;
    
    while (i >= 0 || j >= 0 || carry > 0) {
        const sum = (i >= 0 ? a[i] : 0) + (j >= 0 ? b[j] : 0) + carry;
        result.unshift(sum % 10);
        carry = Math.floor(sum / 10);
        i--;
        j--;
    }
    
    return result;
}

// ============ BONUS: Multiply Array ============
function multiplyArray(digits, multiplier) {
    const result = [];
    let carry = 0;
    
    for (let i = digits.length - 1; i >= 0; i--) {
        const product = digits[i] * multiplier + carry;
        result.unshift(product % 10);
        carry = Math.floor(product / 10);
    }
    
    while (carry > 0) {
        result.unshift(carry % 10);
        carry = Math.floor(carry / 10);
    }
    
    return result;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: [1,2,3], expected: [1,2,4], desc: "Simple" },
        { input: [4,3,2,1], expected: [4,3,2,2], desc: "Decreasing" },
        { input: [9], expected: [1,0], desc: "Single 9" },
        { input: [9,9,9], expected: [1,0,0,0], desc: "All 9s" },
        { input: [1,9,9], expected: [2,0,0], desc: "Trailing 9s" },
        { input: [0], expected: [1], desc: "Zero" },
        { input: [8,9,9,9], expected: [9,0,0,0], desc: "Carry chain" },
        { input: [1,0,0,0], expected: [1,0,0,1], desc: "Trailing zeros" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = plusOne([...input]);
        const passed = JSON.stringify(result) === JSON.stringify(expected);
        console.log(
            `✅ ${desc}:`,
            `[${input}] → [${result}]`,
            passed ? '✓ PASS' : `✗ FAIL (expected [${expected}])`
        );
    });
    
    // Bonus tests
    console.log("\n=== Bonus Tests ===");
    console.log("plusN([9,9,9], 1):", plusN([9,9,9], 1));
    console.log("addArrays([1,2,3], [4,5,6]):", addArrays([1,2,3], [4,5,6]));
    console.log("multiplyArray([1,2,3], 2):", multiplyArray([1,2,3], 2));
}

runTests();

module.exports = {
    plusOne,
    plusOneNew,
    plusOneRecursive,
    plusN,
    addArrays,
    multiplyArray
};