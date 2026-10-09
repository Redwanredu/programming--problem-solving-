/**
 * LEETCODE SOLUTIONS - Problem 30: Longest Increasing Subsequence
 * 
 * File: 30-longest-increasing-subsequence.js
 * Author: Your Name
 * Date: 2026-10-09
 * 
 * Problem: https://leetcode.com/problems/longest-increasing-subsequence/
 */

// ============ SOLUTION 1: Binary Search + Tails (Optimal) ============
function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;
    
    const tails = [];
    
    for (const num of nums) {
        let left = 0, right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) left = mid + 1;
            else right = mid;
        }
        
        if (left === tails.length) tails.push(num);
        else tails[left] = num;
    }
    
    return tails.length;
}

// ============ SOLUTION 2: DP O(n²) ============
function lengthOfLISDP(nums) {
    if (nums.length === 0) return 0;
    
    const dp = new Array(nums.length).fill(1);
    let maxLen = 1;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    
    return maxLen;
}

// ============ SOLUTION 3: DP with Path ============
function lengthOfLISWithPath(nums) {
    if (nums.length === 0) return { length: 0, path: [] };
    
    const dp = new Array(nums.length).fill(1);
    const prev = new Array(nums.length).fill(-1);
    let maxLen = 1, maxIndex = 0;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
        if (dp[i] > maxLen) {
            maxLen = dp[i];
            maxIndex = i;
        }
    }
    
    const path = [];
    let i = maxIndex;
    while (i !== -1) {
        path.unshift(nums[i]);
        i = prev[i];
    }
    
    return { length: maxLen, path };
}

// ============ BONUS: Number of LIS ============
function findNumberOfLIS(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    
    const lengths = new Array(n).fill(1);
    const counts = new Array(n).fill(1);
    let maxLen = 1;
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                if (lengths[j] + 1 > lengths[i]) {
                    lengths[i] = lengths[j] + 1;
                    counts[i] = counts[j];
                } else if (lengths[j] + 1 === lengths[i]) {
                    counts[i] += counts[j];
                }
            }
        }
        maxLen = Math.max(maxLen, lengths[i]);
    }
    
    let total = 0;
    for (let i = 0; i < n; i++) {
        if (lengths[i] === maxLen) total += counts[i];
    }
    return total;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: [10,9,2,5,3,7,101,18], expected: 4, desc: "Classic" },
        { input: [0,1,0,3,2,3], expected: 4, desc: "Mixed" },
        { input: [7,7,7,7,7,7,7], expected: 1, desc: "All same" },
        { input: [1], expected: 1, desc: "Single" },
        { input: [4,10,4,3,8,9], expected: 3, desc: "Multiple LIS" },
        { input: [1,2,3,4,5], expected: 5, desc: "Sorted" },
        { input: [5,4,3,2,1], expected: 1, desc: "Reverse sorted" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = lengthOfLIS(input);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `[${input}] → ${result}`,
            passed ? '✓ PASS' : `✗ FAIL (expected ${expected})`
        );
    });
    
    // Bonus tests
    console.log("\n=== Bonus Tests ===");
    console.log("Number of LIS [1,3,5,4,7]:", findNumberOfLIS([1,3,5,4,7])); // 2
    console.log("With path:", lengthOfLISWithPath([10,9,2,5,3,7,101,18]));
}

runTests();

module.exports = {
    lengthOfLIS,
    lengthOfLISDP,
    lengthOfLISWithPath,
    findNumberOfLIS
};