/**
 * LEETCODE SOLUTIONS - Problem 15: Palindrome Number
 * 
 * File: 15-palindrome-number.js
 * Author: Your Name
 * Date: 2026-09-14
 * 
 * Problem: https://leetcode.com/problems/palindrome-number/
 */

// ============ SOLUTION 1: Reverse Half (Optimal) ============
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

// ============ SOLUTION 2: Full Reverse ============
function isPalindromeFull(x) {
    if (x < 0) return false;
    
    const original = x;
    let reversed = 0;
    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    
    return original === reversed;
}

// ============ SOLUTION 3: String Conversion ============
function isPalindromeString(x) {
    const str = x.toString();
    let left = 0;
    let right = str.length - 1;
    
    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }
    return true;
}

// ============ SOLUTION 4: Math (No Reverse) ============
function isPalindromeMath(x) {
    if (x < 0) return false;
    
    let divisor = 1;
    while (x / divisor >= 10) divisor *= 10;
    
    while (x > 0) {
        const leading = Math.floor(x / divisor);
        const trailing = x % 10;
        
        if (leading !== trailing) return false;
        
        x = Math.floor((x % divisor) / 10);
        divisor = Math.floor(divisor / 100);
    }
    
    return true;
}

// ============ BONUS: Next Palindrome ============
function nextPalindrome(x) {
    let num = x + 1;
    while (!isPalindrome(num)) num++;
    return num;
}

// ============ BONUS: Find All Palindromes ============
function findPalindromes(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
        if (isPalindrome(i)) result.push(i);
    }
    return result;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: 121, expected: true, desc: "Odd palindrome" },
        { input: -121, expected: false, desc: "Negative" },
        { input: 10, expected: false, desc: "Trailing zero" },
        { input: 0, expected: true, desc: "Zero" },
        { input: 7, expected: true, desc: "Single digit" },
        { input: 1221, expected: true, desc: "Even palindrome" },
        { input: 12321, expected: true, desc: "5-digit palindrome" },
        { input: 1234, expected: false, desc: "Not palindrome" },
        { input: 100, expected: false, desc: "Hundred" },
        { input: 11, expected: true, desc: "Eleven" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = isPalindrome(input);
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
    isPalindrome,
    isPalindromeFull,
    isPalindromeString,
    isPalindromeMath,
    nextPalindrome,
    findPalindromes
};