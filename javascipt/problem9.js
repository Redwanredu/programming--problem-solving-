/**
 * LEETCODE SOLUTIONS - Problem 9: Valid Anagram
 * 
 * File: 09-valid-anagram.js
 * Author: Your Name
 * Date: 2026-09-07
 * 
 * Problem: https://leetcode.com/problems/valid-anagram/
 */

// ============ SOLUTION 1: Hash Map ============
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const count = {};
    
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    
    for (let char of t) {
        if (!count[char]) return false;
        count[char]--;
    }
    
    return true;
}

// ============ SOLUTION 2: Using Map ============
function isAnagramMap(s, t) {
    if (s.length !== t.length) return false;
    
    const charMap = new Map();
    
    for (let char of s) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    for (let char of t) {
        if (!charMap.has(char) || charMap.get(char) === 0) {
            return false;
        }
        charMap.set(char, charMap.get(char) - 1);
    }
    
    return true;
}

// ============ SOLUTION 3: Sorting ============
function isAnagramSort(s, t) {
    if (s.length !== t.length) return false;
    return s.split('').sort().join('') === t.split('').sort().join('');
}

// ============ SOLUTION 4: Character Code (Lowercase only) ============
function isAnagramCode(s, t) {
    if (s.length !== t.length) return false;
    
    const count = new Array(26).fill(0);
    
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }
    
    return count.every(num => num === 0);
}

// ============ BONUS: Group Anagrams ============
function groupAnagrams(strs) {
    const map = new Map();
    
    for (let str of strs) {
        const key = str.split('').sort().join('');
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
}

// ============ BONUS: Find All Anagrams ============
function findAnagrams(s, p) {
    const result = [];
    const pLen = p.length;
    const sLen = s.length;
    
    if (sLen < pLen) return result;
    
    const pCount = new Array(26).fill(0);
    const sCount = new Array(26).fill(0);
    
    for (let char of p) {
        pCount[char.charCodeAt(0) - 97]++;
    }
    
    for (let i = 0; i < sLen; i++) {
        sCount[s.charCodeAt(i) - 97]++;
        
        if (i >= pLen) {
            sCount[s.charCodeAt(i - pLen) - 97]--;
        }
        
        if (i >= pLen - 1 && arraysEqual(sCount, pCount)) {
            result.push(i - pLen + 1);
        }
    }
    
    return result;
}

function arraysEqual(arr1, arr2) {
    return arr1.every((val, idx) => val === arr2[idx]);
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { s: "anagram", t: "nagaram", expected: true, desc: "Basic anagram" },
        { s: "rat", t: "car", expected: false, desc: "Not anagram" },
        { s: "a", t: "a", expected: true, desc: "Single character" },
        { s: "a", t: "b", expected: false, desc: "Different chars" },
        { s: "", t: "", expected: true, desc: "Empty strings" },
        { s: "listen", t: "silent", expected: true, desc: "Classic anagram" }
    ];
    
    testCases.forEach(({ s, t, expected, desc }) => {
        const result = isAnagram(s, t);
        console.log(
            `✅ ${desc}:`,
            `s="${s}", t="${t}"`,
            `Expected: ${expected}`,
            `Got: ${result}`,
            result === expected ? '✓ PASS' : '✗ FAIL'
        );
    });
}

runTests();

module.exports = {
    isAnagram,
    isAnagramMap,
    isAnagramSort,
    isAnagramCode,
    groupAnagrams,
    findAnagrams
};