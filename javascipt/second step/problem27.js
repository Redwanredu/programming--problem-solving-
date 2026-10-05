/**
 * LEETCODE SOLUTIONS - Problem 27: Majority Element
 * 
 * File: 27-majority-element.js
 * Author: Your Name
 * Date: 2026-10-03
 * 
 * Problem: https://leetcode.com/problems/majority-element/
 */

// ============ SOLUTION 1: Boyer-Moore Voting (Optimal) ============
function majorityElement(nums) {
    let candidate = null;
    let count = 0;
    
    for (let num of nums) {
        if (count === 0) {
            candidate = num;
            count = 1;
        } else if (num === candidate) {
            count++;
        } else {
            count--;
        }
    }
    
    return candidate;
}

// ============ SOLUTION 2: Hash Map ============
function majorityElementMap(nums) {
    const count = {};
    const threshold = Math.floor(nums.length / 2);
    
    for (let num of nums) {
        count[num] = (count[num] || 0) + 1;
        if (count[num] > threshold) return num;
    }
    
    return -1;
}

// ============ SOLUTION 3: Sorting ============
function majorityElementSort(nums) {
    nums.sort((a, b) => a - b);
    return nums[Math.floor(nums.length / 2)];
}

// ============ SOLUTION 4: Divide and Conquer ============
function majorityElementDivide(nums) {
    function majorityRec(lo, hi) {
        if (lo === hi) return nums[lo];
        
        const mid = Math.floor((lo + hi) / 2);
        const left = majorityRec(lo, mid);
        const right = majorityRec(mid + 1, hi);
        
        if (left === right) return left;
        
        let leftCount = 0, rightCount = 0;
        for (let i = lo; i <= hi; i++) {
            if (nums[i] === left) leftCount++;
            else if (nums[i] === right) rightCount++;
        }
        
        return leftCount > rightCount ? left : right;
    }
    
    return majorityRec(0, nums.length - 1);
}

// ============ BONUS: Majority Element II (n/3) ============
function majorityElementII(nums) {
    let c1 = null, c2 = null;
    let count1 = 0, count2 = 0;
    
    for (let num of nums) {
        if (num === c1) count1++;
        else if (num === c2) count2++;
        else if (count1 === 0) { c1 = num; count1 = 1; }
        else if (count2 === 0) { c2 = num; count2 = 1; }
        else { count1--; count2--; }
    }
    
    count1 = 0;
    count2 = 0;
    for (let num of nums) {
        if (num === c1) count1++;
        else if (num === c2) count2++;
    }
    
    const result = [];
    const threshold = Math.floor(nums.length / 3);
    if (count1 > threshold) result.push(c1);
    if (count2 > threshold) result.push(c2);
    
    return result;
}

// ============ BONUS: Majority Element K ============
function majorityElementK(nums, k) {
    const candidates = new Map();
    
    for (let num of nums) {
        if (candidates.has(num)) {
            candidates.set(num, candidates.get(num) + 1);
        } else if (candidates.size < k - 1) {
            candidates.set(num, 1);
        } else {
            for (let [key, val] of candidates) {
                if (val === 1) candidates.delete(key);
                else candidates.set(key, val - 1);
            }
        }
    }
    
    const result = [];
    const threshold = Math.floor(nums.length / k);
    
    for (let [candidate] of candidates) {
        let count = 0;
        for (let num of nums) {
            if (num === candidate) count++;
        }
        if (count > threshold) result.push(candidate);
    }
    
    return result;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: [3,2,3], expected: 3, desc: "Basic" },
        { input: [2,2,1,1,1,2,2], expected: 2, desc: "Classic" },
        { input: [1], expected: 1, desc: "Single" },
        { input: [1,1,1,2,3], expected: 1, desc: "Early majority" },
        { input: [6,5,5], expected: 5, desc: "Two elements" },
        { input: [1,1,1,1,2], expected: 1, desc: "Strong majority" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = majorityElement(input);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `[${input}] → ${result}`,
            passed ? '✓ PASS' : `✗ FAIL (expected ${expected})`
        );
    });
    
    // Bonus tests
    console.log("\n=== Bonus Tests ===");
    console.log("Majority II [3,2,3]:", majorityElementII([3,2,3]));           // [3]
    console.log("Majority II [1,1,1,3,3,2,2,2]:", majorityElementII([1,1,1,3,3,2,2,2])); // [1,2]
    console.log("Majority K=3 [1,1,1,3,3,2,2,2]:", majorityElementK([1,1,1,3,3,2,2,2], 3)); // [1,2]
}

runTests();

module.exports = {
    majorityElement,
    majorityElementMap,
    majorityElementSort,
    majorityElementDivide,
    majorityElementII,
    majorityElementK
};