/**
 * LEETCODE SOLUTIONS - Problem 19: Fibonacci Number
 * 
 * File: 19-fibonacci-number.js
 * Author: Your Name
 * Date: 2026-09-22
 * 
 * Problem: https://leetcode.com/problems/fibonacci-number/
 */

// ============ SOLUTION 1: Iterative O(1) Space (Optimal) ============
function fib(n) {
    if (n <= 1) return n;
    
    let prev2 = 0;
    let prev1 = 1;
    
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// ============ SOLUTION 2: Memoization ============
function fibMemo(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n] !== undefined) return memo[n];
    
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// ============ SOLUTION 3: DP Array ============
function fibDP(n) {
    if (n <= 1) return n;
    
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// ============ SOLUTION 4: Matrix Exponentiation O(log n) ============
function fibMatrix(n) {
    if (n <= 1) return n;
    
    function multiply(a, b) {
        return [
            [a[0][0]*b[0][0] + a[0][1]*b[1][0], a[0][0]*b[0][1] + a[0][1]*b[1][1]],
            [a[1][0]*b[0][0] + a[1][1]*b[1][0], a[1][0]*b[0][1] + a[1][1]*b[1][1]]
        ];
    }
    
    function power(matrix, exp) {
        if (exp === 1) return matrix;
        if (exp % 2 === 0) {
            const half = power(matrix, exp / 2);
            return multiply(half, half);
        }
        return multiply(matrix, power(matrix, exp - 1));
    }
    
    const base = [[1, 1], [1, 0]];
    return power(base, n)[0][1];
}

// ============ BONUS: Print Sequence ============
function printFibSequence(n) {
    const seq = [];
    if (n >= 0) seq.push(0);
    if (n >= 1) seq.push(1);
    
    for (let i = 2; i <= n; i++) {
        seq.push(seq[i-1] + seq[i-2]);
    }
    return seq;
}

// ============ BONUS: Is Fibonacci Number ============
function isFibonacci(num) {
    function isPerfectSquare(x) {
        const sqrt = Math.floor(Math.sqrt(x));
        return sqrt * sqrt === x;
    }
    
    return isPerfectSquare(5*num*num + 4) || isPerfectSquare(5*num*num - 4);
}

// ============ BONUS: Tribonacci ============
function tribonacci(n) {
    if (n === 0) return 0;
    if (n === 1 || n === 2) return 1;
    
    let a = 0, b = 1, c = 1;
    for (let i = 3; i <= n; i++) {
        const d = a + b + c;
        a = b;
        b = c;
        c = d;
    }
    return c;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: 0, expected: 0, desc: "F(0)" },
        { input: 1, expected: 1, desc: "F(1)" },
        { input: 2, expected: 1, desc: "F(2)" },
        { input: 3, expected: 2, desc: "F(3)" },
        { input: 4, expected: 3, desc: "F(4)" },
        { input: 5, expected: 5, desc: "F(5)" },
        { input: 10, expected: 55, desc: "F(10)" },
        { input: 20, expected: 6765, desc: "F(20)" },
        { input: 30, expected: 832040, desc: "F(30)" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = fib(input);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `n=${input}`,
            `Expected: ${expected}`,
            `Got: ${result}`,
            passed ? '✓ PASS' : '✗ FAIL'
        );
    });
    
    // Bonus tests
    console.log("\n=== Bonus Tests ===");
    console.log("Sequence F(0-10):", printFibSequence(10));
    console.log("Is 8 Fibonacci?", isFibonacci(8));
    console.log("Is 10 Fibonacci?", isFibonacci(10));
    console.log("Tribonacci(10):", tribonacci(10));
}

runTests();

module.exports = {
    fib,
    fibMemo,
    fibDP,
    fibMatrix,
    printFibSequence,
    isFibonacci,
    tribonacci
};