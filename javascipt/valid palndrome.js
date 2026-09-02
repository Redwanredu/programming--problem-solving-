/* Problem: Valid Palindrome
Difficulty: Easy

Description:
A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string s, return true if it is a palindrome, or false otherwise.

Example:

javascript
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

Input: s = " "
Output: true
Explanation: Empty string after removing non-alphanumeric chars is a palindrome. */

/**
 * LEETCODE SOLUTIONS - Problem 5: Valid Palindrome
 * 
 * File: 05-valid-palindrome.js
 *
 * 
 * Problem: https://leetcode.com/problems/valid-palindrome/
 */

// ============ SOLUTION 1: Two Pointers with Regex ============
function isPalindrome(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0, right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
    }
    return true;
}

// ============ SOLUTION 2: Two Pointers without Regex ============
function isPalindromeClean(s) { /* ... */ }

// ============ SOLUTION 3: Reverse String ============
function isPalindromeReverse(s) { /* ... */ }

// ============ BONUS: Valid Palindrome II ============
function validPalindromeII(s) { /* ... */ }

// ============ BONUS: Longest Palindrome ============
function longestPalindrome(s) { /* ... */ }

// ============ TEST SUITE ============
function runTests() {
    const tests = [
        { input: "A man, a plan, a canal: Panama", expected: true },
        { input: "race a car", expected: false },
        { input: " ", expected: true },
        { input: "aba", expected: true },
        { input: "abba", expected: true },
        { input: "0P", expected: false },
        { input: "12321", expected: true },
    ];
    
    tests.forEach(({ input, expected }) => {
        const result = isPalindrome(input);
        console.log(
            `Input: "${input}"`,
            `Expected: ${expected}`,
            `Got: ${result}`,
            result === expected ? '✅ PASS' : '❌ FAIL'
        );
    });
}

runTests();

module.exports = {
    isPalindrome,
    isPalindromeClean,
    isPalindromeReverse,
    validPalindromeII,
    longestPalindrome
};