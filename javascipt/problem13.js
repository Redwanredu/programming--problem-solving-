/**
 * LEETCODE SOLUTIONS - Problem 13: Reverse String
 * 
 * File: 13-reverse-string.js
 * Author: Your Name
 * Date: 2026-09-12
 * 
 * Problem: https://leetcode.com/problems/reverse-string/
 */

// ============ SOLUTION 1: Two Pointers (Optimal) ============
function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}

// ============ SOLUTION 2: Temp Variable ============
function reverseStringTemp(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        const temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}

// ============ SOLUTION 3: Recursive ============
function reverseStringRecursive(s, left = 0, right = s.length - 1) {
    if (left >= right) return;
    [s[left], s[right]] = [s[right], s[left]];
    reverseStringRecursive(s, left + 1, right - 1);
}

// ============ BONUS: Reverse Words ============
function reverseWords(s) {
    return s.split(' ').filter(w => w !== '').reverse().join(' ');
}

// ============ BONUS: Reverse Vowels ============
function reverseVowels(s) {
    const vowels = new Set(['a','e','i','o','u','A','E','I','O','U']);
    const chars = s.split('');
    let left = 0, right = chars.length - 1;
    
    while (left < right) {
        while (left < right && !vowels.has(chars[left])) left++;
        while (left < right && !vowels.has(chars[right])) right--;
        [chars[left], chars[right]] = [chars[right], chars[left]];
        left++;
        right--;
    }
    
    return chars.join('');
}

// ============ BONUS: Reverse String II ============
function reverseStr(s, k) {
    const chars = s.split('');
    
    for (let i = 0; i < chars.length; i += 2 * k) {
        let left = i;
        let right = Math.min(i + k - 1, chars.length - 1);
        
        while (left < right) {
            [chars[left], chars[right]] = [chars[right], chars[left]];
            left++;
            right--;
        }
    }
    
    return chars.join('');
}

// ============ BONUS: Reverse Integer ============
function reverseInteger(x) {
    const sign = x < 0 ? -1 : 1;
    let num = Math.abs(x);
    let reversed = 0;
    
    while (num > 0) {
        reversed = reversed * 10 + num % 10;
        num = Math.floor(num / 10);
    }
    
    reversed *= sign;
    if (reversed > 2**31 - 1 || reversed < -(2**31)) return 0;
    return reversed;
}

// ============ TEST SUITE ============
function runTests() {
    // Test reverseString
    console.log("=== Reverse String Tests ===");
    const testCases = [
        { input: ["h","e","l","l","o"], expected: ["o","l","l","e","h"] },
        { input: ["H","a","n","n","a","h"], expected: ["h","a","n","n","a","H"] },
        { input: ["a"], expected: ["a"] },
        { input: [], expected: [] }
    ];
    
    testCases.forEach(({ input, expected }, idx) => {
        const arr = [...input];
        reverseString(arr);
        const passed = JSON.stringify(arr) === JSON.stringify(expected);
        console.log(
            `Test ${idx + 1}:`,
            `[${input}] → [${arr}]`,
            passed ? '✓ PASS' : '✗ FAIL'
        );
    });
    
    // Test bonuses
    console.log("\n=== Bonus Tests ===");
    console.log("Reverse Words:", reverseWords("the sky is blue"));
    console.log("Reverse Vowels:", reverseVowels("hello"));
    console.log("Reverse String II:", reverseStr("abcdefg", 2));
    console.log("Reverse Integer:", reverseInteger(-123));
}

runTests();

module.exports = {
    reverseString,
    reverseStringTemp,
    reverseStringRecursive,
    reverseWords,
    reverseVowels,
    reverseStr,
    reverseInteger
};