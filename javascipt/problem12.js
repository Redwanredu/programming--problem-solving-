/**
 * LEETCODE SOLUTIONS - Problem 11: First Unique Character
 * 
 * File: 11-first-unique-character.js
 * Author: Your Name
 * Date: 2026-09-10
 * 
 * Problem: https://leetcode.com/problems/first-unique-character-in-a-string/
 */

// ============ SOLUTION 1: Hash Map (Two Pass) ============
function firstUniqChar(s) {
    const count = {};
    
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    
    for (let i = 0; i < s.length; i++) {
        if (count[s[i]] === 1) return i;
    }
    
    return -1;
}

// ============ SOLUTION 2: Map ============
function firstUniqCharMap(s) {
    const map = new Map();
    
    for (let char of s) {
        map.set(char, (map.get(char) || 0) + 1);
    }
    
    for (let i = 0; i < s.length; i++) {
        if (map.get(s[i]) === 1) return i;
    }
    
    return -1;
}

// ============ SOLUTION 3: Array (Lowercase Only) ============
function firstUniqCharArray(s) {
    const count = new Array(26).fill(0);
    const aCode = 'a'.charCodeAt(0);
    
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - aCode]++;
    }
    
    for (let i = 0; i < s.length; i++) {
        if (count[s.charCodeAt(i) - aCode] === 1) return i;
    }
    
    return -1;
}

// ============ BONUS: FirstUnique Class ============
class FirstUnique {
    constructor(nums) {
        this.count = new Map();
        this.queue = [];
        
        for (let num of nums) {
            this.add(num);
        }
    }
    
    add(num) {
        this.count.set(num, (this.count.get(num) || 0) + 1);
        this.queue.push(num);
    }
    
    showFirstUnique() {
        while (this.queue.length > 0 && this.count.get(this.queue[0]) > 1) {
            this.queue.shift();
        }
        return this.queue.length > 0 ? this.queue[0] : -1;
    }
}

// ============ BONUS: First Repeated Character ============
function firstRepeatedChar(s) {
    const seen = new Set();
    for (let char of s) {
        if (seen.has(char)) return char;
        seen.add(char);
    }
    return null;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: "leetcode", expected: 0, desc: "First char unique" },
        { input: "loveleetcode", expected: 2, desc: "Middle char unique" },
        { input: "aabb", expected: -1, desc: "No unique char" },
        { input: "z", expected: 0, desc: "Single char" },
        { input: "", expected: -1, desc: "Empty string" },
        { input: "dddccdbba", expected: 8, desc: "Last char unique" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = firstUniqChar(input);
        console.log(
            `✅ ${desc}:`,
            `Input: "${input}"`,
            `Expected: ${expected}`,
            `Got: ${result}`,
            result === expected ? '✓ PASS' : '✗ FAIL'
        );
    });
}

runTests();

module.exports = {
    firstUniqChar,
    firstUniqCharMap,
    firstUniqCharArray,
    FirstUnique,
    firstRepeatedChar
};