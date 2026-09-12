/**
 * LEETCODE SOLUTIONS - Problem 14: Reverse Integer
 * 
 * File: 14-reverse-integer.js
 * Author: Your Name
 * Date: 2026-09-12
 * 
 * Problem: https://leetcode.com/problems/reverse-integer/
 */

// ============ SOLUTION 1: Math with Post-Check ============
function reverse(x) {
    const INT_MAX = 2 ** 31 - 1;
    const INT_MIN = -(2 ** 31);
    
    let reversed = 0;
    let num = Math.abs(x);
    
    while (num > 0) {
        reversed = reversed * 10 + num % 10;
        num = Math.floor(num / 10);
    }
    
    reversed = x < 0 ? -reversed : reversed;
    
    if (reversed > INT_MAX || reversed < INT_MIN) return 0;
    return reversed;
}

// ============ SOLUTION 2: Early Overflow Check ============
function reverseEarly(x) {
    const INT_MAX = 2147483647;
    const INT_MIN = -2147483648;
    
    let reversed = 0;
    
    while (x !== 0) {
        const digit = x % 10;
        x = Math.trunc(x / 10);
        
        if (reversed > Math.floor(INT_MAX / 10) ||
            (reversed === Math.floor(INT_MAX / 10) && digit > 7)) return 0;
        if (reversed < Math.ceil(INT_MIN / 10) ||
            (reversed === Math.ceil(INT_MIN / 10) && digit < -8)) return 0;
        
        reversed = reversed * 10 + digit;
    }
    
    return reversed;
}

// ============ SOLUTION 3: String Approach ============
function reverseString(x) {
    const INT_MAX = 2 ** 31 - 1;
    const INT_MIN = -(2 ** 31);
    
    const sign = Math.sign(x);
    const str = Math.abs(x).toString();
    const result = sign * parseInt(str.split('').reverse().join(''), 10);
    
    if (result > INT_MAX || result < INT_MIN) return 0;
    return result;
}

// ============ BONUS: Palindrome Number ============
function isPalindrome(x) {
    if (x < 0) return false;
    if (x !== 0 && x % 10 === 0) return false;
    
    let reversed = 0;
    while (x > reversed) {
        reversed = reversed * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    
    return x === reversed || x === Math.floor(reversed / 10);
}

// ============ BONUS: Sum of Digits ============
function sumDigits(x) {
    let sum = 0;
    let num = Math.abs(x);
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return sum;
}

// ============ BONUS: Reverse Bits ============
function reverseBits(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n = n >>> 1;
    }
    return result >>> 0;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: 123, expected: 321, desc: "Positive" },
        { input: -123, expected: -321, desc: "Negative" },
        { input: 120, expected: 21, desc: "Trailing zero" },
        { input: 0, expected: 0, desc: "Zero" },
        { input: 1534236469, expected: 0, desc: "Overflow positive" },
        { input: -2147483648, expected: 0, desc: "Overflow negative" },
        { input: 1463847412, expected: 2147483641, desc: "Max valid" },
        { input: 7, expected: 7, desc: "Single digit" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = reverse(input);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `Input: ${input}`,
            `Expected: ${expected}`,
            `Got: ${result}`,
            passed ? '✓ PASS' : '✗ FAIL'
        );
    });
}

runTests();

module.exports = {
    reverse,
    reverseEarly,
    reverseString,
    isPalindrome,
    sumDigits,
    reverseBits
};