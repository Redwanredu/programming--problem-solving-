/**
 * LEETCODE SOLUTIONS - Problem 23: Sqrt(x)
 * 
 * File: 23-sqrt-x.js
 * Author: Your Name
 * Date: 2026-09-29
 * 
 * Problem: https://leetcode.com/problems/sqrtx/
 */

// ============ SOLUTION 1: Binary Search (Optimal) ============
function mySqrt(x) {
    if (x < 2) return x;
    
    let left = 1;
    let right = Math.floor(x / 2);
    let result = 0;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const square = mid * mid;
        
        if (square === x) return mid;
        if (square < x) {
            result = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// ============ SOLUTION 2: Newton's Method ============
function mySqrtNewton(x) {
    if (x < 2) return x;
    
    let guess = x;
    while (guess * guess > x) {
        guess = Math.floor((guess + x / guess) / 2);
    }
    return guess;
}

// ============ SOLUTION 3: Bit Manipulation ============
function mySqrtBitwise(x) {
    if (x < 2) return x;
    
    let bit = 1 << 15;
    let result = 0;
    
    while (bit > 0) {
        const candidate = result + bit;
        if (candidate * candidate <= x) {
            result = candidate;
        }
        bit >>= 1;
    }
    
    return result;
}

// ============ BONUS: Perfect Square Check ============
function isPerfectSquare(num) {
    if (num < 2) return true;
    
    let left = 1;
    let right = Math.floor(num / 2);
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const square = mid * mid;
        
        if (square === num) return true;
        if (square < num) left = mid + 1;
        else right = mid - 1;
    }
    
    return false;
}

// ============ BONUS: Cube Root ============
function cubeRoot(x) {
    if (x === 0) return 0;
    
    const isNegative = x < 0;
    const target = Math.abs(x);
    
    let left = 0, right = target, result = 0;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const cube = mid * mid * mid;
        
        if (cube === target) return isNegative ? -mid : mid;
        if (cube < target) {
            result = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return isNegative ? -result : result;
}

// ============ BONUS: Sqrt with Precision ============
function sqrtPrecision(x, precision = 6) {
    if (x < 2) return x;
    
    let left = 0, right = x;
    
    while (right - left > Math.pow(10, -precision)) {
        const mid = (left + right) / 2;
        if (mid * mid < x) left = mid;
        else right = mid;
    }
    
    return parseFloat(((left + right) / 2).toFixed(precision));
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: 4, expected: 2, desc: "Perfect square" },
        { input: 8, expected: 2, desc: "Non-perfect" },
        { input: 0, expected: 0, desc: "Zero" },
        { input: 1, expected: 1, desc: "One" },
        { input: 16, expected: 4, desc: "Perfect square 16" },
        { input: 2, expected: 1, desc: "Small" },
        { input: 3, expected: 1, desc: "Small" },
        { input: 2147395599, expected: 46339, desc: "Large number" },
        { input: 2147483647, expected: 46340, desc: "Max 32-bit" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = mySqrt(input);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `√${input} = ${result}`,
            passed ? '✓ PASS' : `✗ FAIL (expected ${expected})`
        );
    });
    
    // Bonus tests
    console.log("\n=== Bonus Tests ===");
    console.log("Perfect square 16?", isPerfectSquare(16));   // true
    console.log("Perfect square 14?", isPerfectSquare(14));   // false
    console.log("Cube root 27:", cubeRoot(27));                // 3
    console.log("Cube root -27:", cubeRoot(-27));              // -3
    console.log("√2 precise:", sqrtPrecision(2, 10));          // 1.4142135624
    console.log("Newton √8:", mySqrtNewton(8));                // 2
}

runTests();

module.exports = {
    mySqrt,
    mySqrtNewton,
    mySqrtBitwise,
    isPerfectSquare,
    cubeRoot,
    sqrtPrecision
};