/**
 * LEETCODE SOLUTIONS - Problem 18: Climbing Stairs
 * 
 * File: 18-climbing-stairs.js
 * Author: Your Name
 * Date: 2026-09-22
 * 
 * Problem: https://leetcode.com/problems/climbing-stairs/
 */

// ============ SOLUTION 1: Space Optimized DP ============
function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev2 = 1;
    let prev1 = 2;
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// ============ SOLUTION 2: Full DP Array ============
function climbStairsDP(n) {
    if (n <= 2) return n;
    
    const dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// ============ SOLUTION 3: Memoization ============
function climbStairsMemo(n, memo = {}) {
    if (n <= 2) return n;
    if (memo[n]) return memo[n];
    
    memo[n] = climbStairsMemo(n - 1, memo) + climbStairsMemo(n - 2, memo);
    return memo[n];
}

// ============ BONUS: Print All Ways ============
function climbStairsAllWays(n) {
    const result = [];
    
    function backtrack(remaining, path) {
        if (remaining === 0) {
            result.push([...path]);
            return;
        }
        if (remaining < 0) return;
        
        path.push(1);
        backtrack(remaining - 1, path);
        path.pop();
        
        path.push(2);
        backtrack(remaining - 2, path);
        path.pop();
    }
    
    backtrack(n, []);
    return result;
}

// ============ BONUS: Min Cost Climbing Stairs ============
function minCostClimbingStairs(cost) {
    const n = cost.length;
    let prev2 = cost[0];
    let prev1 = cost[1];
    
    for (let i = 2; i < n; i++) {
        const current = cost[i] + Math.min(prev1, prev2);
        prev2 = prev1;
        prev1 = current;
    }
    
    return Math.min(prev1, prev2);
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: 1, expected: 1, desc: "1 step" },
        { input: 2, expected: 2, desc: "2 steps" },
        { input: 3, expected: 3, desc: "3 steps" },
        { input: 4, expected: 5, desc: "4 steps" },
        { input: 5, expected: 8, desc: "5 steps" },
        { input: 10, expected: 89, desc: "10 steps" },
        { input: 20, expected: 10946, desc: "20 steps" },
        { input: 45, expected: 1836311903, desc: "45 steps (max int)" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = climbStairs(input);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `n=${input}`,
            `Expected: ${expected}`,
            `Got: ${result}`,
            passed ? '✓ PASS' : '✗ FAIL'
        );
    });
    
    // Test all ways
    console.log("\n=== All Ways for n=4 ===");
    console.log(climbStairsAllWays(4));
    
    // Test min cost
    console.log("\n=== Min Cost Climbing Stairs ===");
    console.log(minCostClimbingStairs([10, 15, 20])); // 15
    console.log(minCostClimbingStairs([1,100,1,1,1,100,1,1,100,1])); // 6
}

runTests();

module.exports = {
    climbStairs,
    climbStairsDP,
    climbStairsMemo,
    climbStairsAllWays,
    minCostClimbingStairs
};