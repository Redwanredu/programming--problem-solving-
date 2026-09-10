/**
 * LEETCODE SOLUTIONS - Problem 10: Two Sum II (Sorted Array)
 * 
 * File: 10-two-sum-ii.js
 * Author: Your Name
 * Date: 2026-09-07
 * 
 * Problem: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
 */

// ============ SOLUTION 1: Two Pointers ============
function twoSumSorted(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        
        if (sum === target) {
            return [left + 1, right + 1];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [-1, -1];
}

// ============ SOLUTION 2: Binary Search ============
function twoSumBinary(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        const complement = target - numbers[i];
        let left = i + 1;
        let right = numbers.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (numbers[mid] === complement) {
                return [i + 1, mid + 1];
            } else if (numbers[mid] < complement) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return [-1, -1];
}

// ============ SOLUTION 3: Hash Map ============
function twoSumHash(numbers, target) {
    const map = new Map();
    
    for (let i = 0; i < numbers.length; i++) {
        const complement = target - numbers[i];
        if (map.has(complement)) {
            return [map.get(complement) + 1, i + 1];
        }
        map.set(numbers[i], i);
    }
    
    return [-1, -1];
}

// ============ BONUS: Find All Pairs ============
function findAllPairs(numbers, target) {
    const result = [];
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        
        if (sum === target) {
            result.push([left + 1, right + 1]);
            while (left < right && numbers[left] === numbers[left + 1]) left++;
            while (left < right && numbers[right] === numbers[right - 1]) right--;
            left++;
            right--;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return result;
}

// ============ BONUS: TwoSum Class ============
class TwoSum {
    constructor() {
        this.numbers = [];
    }
    
    add(number) {
        this.numbers.push(number);
    }
    
    find(target) {
        const seen = new Set();
        for (let num of this.numbers) {
            if (seen.has(target - num)) return true;
            seen.add(num);
        }
        return false;
    }
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: [2,7,11,15], target: 9, expected: [1,2], desc: "Basic case" },
        { input: [2,3,4], target: 6, expected: [1,3], desc: "Multiple options" },
        { input: [-1,0], target: -1, expected: [1,2], desc: "Negative numbers" },
        { input: [1,2,3,4,5], target: 8, expected: [3,5], desc: "Middle pair" },
        { input: [0,0,3,4], target: 0, expected: [1,2], desc: "Duplicates" }
    ];
    
    testCases.forEach(({ input, target, expected, desc }) => {
        const result = twoSumSorted(input, target);
        const passed = JSON.stringify(result) === JSON.stringify(expected);
        console.log(
            `✅ ${desc}:`,
            `Input: [${input}], Target: ${target}`,
            `Expected: [${expected}]`,
            `Got: [${result}]`,
            passed ? '✓ PASS' : '✗ FAIL'
        );
    });
}

runTests();

module.exports = {
    twoSumSorted,
    twoSumBinary,
    twoSumHash,
    findAllPairs,
    TwoSum
};