/**
 * LEETCODE SOLUTIONS - Problem 12: Longest Common Prefix
 * 
 * File: 12-longest-common-prefix.js
 * Author: Your Name
 * Date: 2026-09-10
 * 
 * Problem: https://leetcode.com/problems/longest-common-prefix/
 */

// ============ SOLUTION 1: Vertical Scanning ============
function longestCommonPrefix(strs) {
    if (strs.length === 0) return "";
    
    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];
        
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== char) {
                return strs[0].substring(0, i);
            }
        }
    }
    
    return strs[0];
}

// ============ SOLUTION 2: Horizontal Scanning ============
function longestCommonPrefixHorizontal(strs) {
    if (strs.length === 0) return "";
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }
    
    return prefix;
}

// ============ SOLUTION 3: Sorting ============
function longestCommonPrefixSort(strs) {
    if (strs.length === 0) return "";
    
    strs.sort();
    const first = strs[0];
    const last = strs[strs.length - 1];
    
    let i = 0;
    while (i < first.length && i < last.length && first[i] === last[i]) {
        i++;
    }
    
    return first.substring(0, i);
}

// ============ SOLUTION 4: Divide and Conquer ============
function longestCommonPrefixDivide(strs) {
    if (strs.length === 0) return "";
    return divideHelper(strs, 0, strs.length - 1);
}

function divideHelper(strs, left, right) {
    if (left === right) return strs[left];
    
    const mid = Math.floor((left + right) / 2);
    const leftPrefix = divideHelper(strs, left, mid);
    const rightPrefix = divideHelper(strs, mid + 1, right);
    
    return commonPrefix(leftPrefix, rightPrefix);
}

function commonPrefix(s1, s2) {
    let i = 0;
    while (i < s1.length && i < s2.length && s1[i] === s2[i]) {
        i++;
    }
    return s1.substring(0, i);
}

// ============ BONUS: Longest Common Suffix ============
function longestCommonSuffix(strs) {
    if (strs.length === 0) return "";
    
    const reversed = strs.map(s => s.split('').reverse().join(''));
    const prefix = longestCommonPrefix(reversed);
    
    return prefix.split('').reverse().join('');
}

// ============ BONUS: Longest Common Substring ============
function longestCommonSubstring(strs) {
    if (strs.length === 0) return "";
    if (strs.length === 1) return strs[0];
    
    let shortest = strs[0];
    for (let str of strs) {
        if (str.length < shortest.length) shortest = str;
    }
    
    let longest = "";
    
    for (let i = 0; i < shortest.length; i++) {
        for (let j = i + 1; j <= shortest.length; j++) {
            const substring = shortest.substring(i, j);
            if (substring.length <= longest.length) continue;
            
            let isCommon = true;
            for (let str of strs) {
                if (!str.includes(substring)) {
                    isCommon = false;
                    break;
                }
            }
            
            if (isCommon) longest = substring;
        }
    }
    
    return longest;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: ["flower","flow","flight"], expected: "fl", desc: "Basic case" },
        { input: ["dog","racecar","car"], expected: "", desc: "No common prefix" },
        { input: ["a"], expected: "a", desc: "Single string" },
        { input: ["abab","aba","abc"], expected: "ab", desc: "Partial match" },
        { input: ["same","same","same"], expected: "same", desc: "All identical" },
        { input: [], expected: "", desc: "Empty array" },
        { input: ["", "b"], expected: "", desc: "Empty string in array" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = longestCommonPrefix(input);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `Input: [${input}]`,
            `Expected: "${expected}"`,
            `Got: "${result}"`,
            passed ? '✓ PASS' : '✗ FAIL'
        );
    });
}

runTests();

module.exports = {
    longestCommonPrefix,
    longestCommonPrefixHorizontal,
    longestCommonPrefixSort,
    longestCommonPrefixDivide,
    longestCommonSuffix,
    longestCommonSubstring
};