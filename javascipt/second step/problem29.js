/**
 * LEETCODE SOLUTIONS - Problem 29: Coin Change
 * 
 * File: 29-coin-change.js
 * Author: Your Name
 * Date: 2026-10-05
 * 
 * Problem: https://leetcode.com/problems/coin-change/
 */

// ============ SOLUTION 1: Bottom-Up DP (Optimal) ============
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// ============ SOLUTION 2: Top-Down Memoization ============
function coinChangeMemo(coins, amount) {
    const memo = new Map();
    
    function helper(remaining) {
        if (remaining === 0) return 0;
        if (remaining < 0) return -1;
        if (memo.has(remaining)) return memo.get(remaining);
        
        let minCoins = Infinity;
        for (const coin of coins) {
            const result = helper(remaining - coin);
            if (result !== -1) {
                minCoins = Math.min(minCoins, result + 1);
            }
        }
        
        const answer = minCoins === Infinity ? -1 : minCoins;
        memo.set(remaining, answer);
        return answer;
    }
    
    return helper(amount);
}

// ============ SOLUTION 3: BFS ============
function coinChangeBFS(coins, amount) {
    if (amount === 0) return 0;
    
    const visited = new Set([0]);
    const queue = [0];
    let level = 0;
    
    while (queue.length > 0) {
        const size = queue.length;
        level++;
        
        for (let i = 0; i < size; i++) {
            const current = queue.shift();
            for (const coin of coins) {
                const next = current + coin;
                if (next === amount) return level;
                if (next < amount && !visited.has(next)) {
                    visited.add(next);
                    queue.push(next);
                }
            }
        }
    }
    
    return -1;
}

// ============ BONUS: Count Ways ============
function countWays(coins, amount) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;
    
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    
    return dp[amount];
}

// ============ BONUS: With Coins Used ============
function coinChangeWithCoins(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    const used = new Array(amount + 1).fill(-1);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i && dp[i - coin] + 1 < dp[i]) {
                dp[i] = dp[i - coin] + 1;
                used[i] = coin;
            }
        }
    }
    
    if (dp[amount] === Infinity) return { count: -1, coins: [] };
    
    const result = [];
    let remaining = amount;
    while (remaining > 0) {
        result.push(used[remaining]);
        remaining -= used[remaining];
    }
    
    return { count: dp[amount], coins: result };
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { coins: [1,2,5], amount: 11, expected: 3, desc: "Classic" },
        { coins: [2], amount: 3, expected: -1, desc: "Impossible" },
        { coins: [1], amount: 0, expected: 0, desc: "Zero amount" },
        { coins: [1,2,5], amount: 100, expected: 20, desc: "Large" },
        { coins: [186,419,83,408], amount: 6249, expected: 20, desc: "Complex" },
        { coins: [2,5,10,1], amount: 27, expected: 4, desc: "Multiple" },
        { coins: [5], amount: 3, expected: -1, desc: "Coin too big" }
    ];
    
    testCases.forEach(({ coins, amount, expected, desc }) => {
        const result = coinChange(coins, amount);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `coins=[${coins}], amount=${amount} → ${result}`,
            passed ? '✓ PASS' : `✗ FAIL (expected ${expected})`
        );
    });
    
    // Bonus tests
    console.log("\n=== Bonus Tests ===");
    console.log("Count ways [1,2,5], 5:", countWays([1,2,5], 5));  // 4
    console.log("With coins [1,2,5], 11:", coinChangeWithCoins([1,2,5], 11));
}

runTests();

module.exports = {
    coinChange,
    coinChangeMemo,
    coinChangeBFS,
    countWays,
    coinChangeWithCoins
};