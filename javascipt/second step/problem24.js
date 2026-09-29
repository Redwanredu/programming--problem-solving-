/**
 * LEETCODE SOLUTIONS - Problem 24: House Robber
 * 
 * File: 24-house-robber.js
 * Author: Your Name
 * Date: 2026-09-29
 * 
 * Problem: https://leetcode.com/problems/house-robber/
 */

// ============ SOLUTION 1: Space Optimized DP (Optimal) ============
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = 0;
    let prev1 = 0;
    
    for (const money of nums) {
        const current = Math.max(prev1, prev2 + money);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// ============ SOLUTION 2: DP Array ============
function robDP(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    const dp = new Array(nums.length);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    
    return dp[nums.length - 1];
}

// ============ SOLUTION 3: Memoization ============
function robMemo(nums) {
    const memo = {};
    
    function robFrom(i) {
        if (i >= nums.length) return 0;
        if (memo[i] !== undefined) return memo[i];
        
        memo[i] = Math.max(
            nums[i] + robFrom(i + 2),
            robFrom(i + 1)
        );
        return memo[i];
    }
    
    return robFrom(0);
}

// ============ BONUS: House Robber II (Circular) ============
function robCircular(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    const robRange = (start, end) => {
        let prev2 = 0;
        let prev1 = 0;
        for (let i = start; i <= end; i++) {
            const current = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    };
    
    return Math.max(
        robRange(0, nums.length - 2),
        robRange(1, nums.length - 1)
    );
}

// ============ BONUS: House Robber with Houses ============
function robWithHouses(nums) {
    if (nums.length === 0) return { max: 0, houses: [] };
    if (nums.length === 1) return { max: nums[0], houses: [0] };
    
    const dp = new Array(nums.length);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    
    const houses = [];
    let i = nums.length - 1;
    
    while (i >= 0) {
        if (i === 0) {
            houses.unshift(0);
            break;
        }
        if (i === 1) {
            houses.unshift(nums[0] > nums[1] ? 0 : 1);
            break;
        }
        if (dp[i] === dp[i - 1]) {
            i--;
        } else {
            houses.unshift(i);
            i -= 2;
        }
    }
    
    return { max: dp[nums.length - 1], houses };
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: [1,2,3,1], expected: 4, desc: "Classic" },
        { input: [2,7,9,3,1], expected: 12, desc: "Complex" },
        { input: [2,1,1,2], expected: 4, desc: "Edge case" },
        { input: [5], expected: 5, desc: "Single house" },
        { input: [], expected: 0, desc: "Empty" },
        { input: [2,7,9,3,1,4,5], expected: 19, desc: "Longer" },
        { input: [1,2], expected: 2, desc: "Two houses" },
        { input: [2,1], expected: 2, desc: "Two houses alt" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = rob(input);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `[${input}] → ${result}`,
            passed ? '✓ PASS' : `✗ FAIL (expected ${expected})`
        );
    });
    
    // Bonus tests
    console.log("\n=== Bonus Tests ===");
    console.log("Circular [2,3,2]:", robCircular([2,3,2]));      // 3
    console.log("Circular [1,2,3,1]:", robCircular([1,2,3,1]));  // 4
    console.log("With houses [2,7,9,3,1]:", robWithHouses([2,7,9,3,1]));
}

runTests();

module.exports = {
    rob,
    robDP,
    robMemo,
    robCircular,
    robWithHouses
};