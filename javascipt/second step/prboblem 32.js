/**
 * LEETCODE SOLUTIONS - Problem 32: Unique Paths
 * 
 * File: 32-unique-paths.js
 * Author: Your Name
 * Date: 2026-10-13
 * 
 * Problem: https://leetcode.com/problems/unique-paths/
 */

// ============ SOLUTION 1: 1D DP (Optimal) ============
function uniquePaths(m, n) {
    const dp = new Array(n).fill(1);
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] = dp[j] + dp[j - 1];
        }
    }
    
    return dp[n - 1];
}

// ============ SOLUTION 2: 2D DP ============
function uniquePaths2D(m, n) {
    const dp = Array.from({ length: m }, () => new Array(n).fill(1));
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    
    return dp[m - 1][n - 1];
}

// ============ SOLUTION 3: Combinatorics ============
function uniquePathsMath(m, n) {
    const total = m + n - 2;
    const k = Math.min(m - 1, n - 1);
    
    let result = 1;
    for (let i = 1; i <= k; i++) {
        result = result * (total - k + i) / i;
    }
    
    return Math.round(result);
}

// ============ SOLUTION 4: Memoization ============
function uniquePathsMemo(m, n) {
    const memo = new Map();
    
    function helper(i, j) {
        if (i === 0 || j === 0) return 1;
        
        const key = `${i},${j}`;
        if (memo.has(key)) return memo.get(key);
        
        const result = helper(i - 1, j) + helper(i, j - 1);
        memo.set(key, result);
        return result;
    }
    
    return helper(m - 1, n - 1);
}

// ============ BONUS: Unique Paths II (Obstacles) ============
function uniquePathsWithObstacles(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    
    if (obstacleGrid[0][0] === 1) return 0;
    
    const dp = new Array(n).fill(0);
    dp[0] = 1;
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                dp[j] = 0;
            } else if (j > 0) {
                dp[j] = dp[j] + dp[j - 1];
            }
        }
    }
    
    return dp[n - 1];
}

// ============ BONUS: Minimum Path Sum ============
function minPathSum(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    const dp = new Array(n);
    dp[0] = grid[0][0];
    
    for (let j = 1; j < n; j++) {
        dp[j] = dp[j - 1] + grid[0][j];
    }
    
    for (let i = 1; i < m; i++) {
        dp[0] += grid[i][0];
        for (let j = 1; j < n; j++) {
            dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
        }
    }
    
    return dp[n - 1];
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { m: 3, n: 7, expected: 28, desc: "3x7" },
        { m: 3, n: 2, expected: 3, desc: "3x2" },
        { m: 3, n: 3, expected: 6, desc: "3x3" },
        { m: 1, n: 1, expected: 1, desc: "1x1" },
        { m: 1, n: 5, expected: 1, desc: "1x5" },
        { m: 5, n: 1, expected: 1, desc: "5x1" },
        { m: 7, n: 3, expected: 28, desc: "7x3" }
    ];
    
    testCases.forEach(({ m, n, expected, desc }) => {
        const result = uniquePaths(m, n);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `uniquePaths(${m}, ${n}) = ${result}`,
            passed ? '✓ PASS' : `✗ FAIL (expected ${expected})`
        );
    });
    
    // Bonus tests
    console.log("\n=== Bonus Tests ===");
    console.log("With obstacles:", uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]])); // 2
    console.log("Min path sum:", minPathSum([[1,3,1],[1,5,1],[4,2,1]])); // 7
    console.log("Math approach:", uniquePathsMath(3, 7)); // 28
}

runTests();

module.exports = {
    uniquePaths,
    uniquePaths2D,
    uniquePathsMath,
    uniquePathsMemo,
    uniquePathsWithObstacles,
    minPathSum
};