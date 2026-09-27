/**
 * LEETCODE SOLUTIONS - Problem 20: Happy Number
 * 
 * File: 20-happy-number.js
 * Author: Your Name
 * Date: 2026-09-27
 * 
 * Problem: https://leetcode.com/problems/happy-number/
 */

// ============ HELPER: Sum of Squares of Digits ============
function sumOfSquares(num) {
    let sum = 0;
    while (num > 0) {
        const digit = num % 10;
        sum += digit * digit;
        num = Math.floor(num / 10);
    }
    return sum;
}

// ============ SOLUTION 1: Floyd's Cycle Detection (Optimal) ============
function isHappy(n) {
    let slow = n;
    let fast = n;
    
    do {
        slow = sumOfSquares(slow);
        fast = sumOfSquares(sumOfSquares(fast));
    } while (slow !== fast);
    
    return slow === 1;
}

// ============ SOLUTION 2: Hash Set ============
function isHappySet(n) {
    const seen = new Set();
    
    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = sumOfSquares(n);
    }
    
    return n === 1;
}

// ============ SOLUTION 3: Known Cycle Detection ============
function isHappyMath(n) {
    const cycle = new Set([4, 16, 37, 58, 89, 145, 42, 20]);
    
    while (n !== 1 && !cycle.has(n)) {
        n = sumOfSquares(n);
    }
    
    return n === 1;
}

// ============ SOLUTION 4: String Conversion ============
function isHappyString(n) {
    const seen = new Set();
    
    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = n.toString()
            .split('')
            .reduce((sum, d) => sum + d * d, 0);
    }
    
    return n === 1;
}

// ============ BONUS: Find All Happy Numbers ============
function findHappyNumbers(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
        if (isHappy(i)) result.push(i);
    }
    return result;
}

// ============ BONUS: Steps to Happy ============
function stepsToHappy(n) {
    const seen = new Set();
    let steps = 0;
    
    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = sumOfSquares(n);
        steps++;
    }
    
    return n === 1 ? steps : -1;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: 19, expected: true, desc: "Happy (classic)" },
        { input: 2, expected: false, desc: "Unhappy" },
        { input: 1, expected: true, desc: "Happy (1)" },
        { input: 7, expected: true, desc: "Happy (7)" },
        { input: 100, expected: true, desc: "Happy (100)" },
        { input: 4, expected: false, desc: "Unhappy (4)" },
        { input: 0, expected: false, desc: "Zero" },
        { input: 23, expected: true, desc: "Happy (23)" },
        { input: 28, expected: true, desc: "Happy (28)" },
        { input: 50, expected: false, desc: "Unhappy (50)" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = isHappy(input);
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
    console.log("Happy numbers 1-50:", findHappyNumbers(1, 50));
    console.log("Steps to happy(19):", stepsToHappy(19));
    console.log("Steps to happy(2):", stepsToHappy(2), "(never reaches 1)");
}

runTests();

module.exports = {
    isHappy,
    isHappySet,
    isHappyMath,
    isHappyString,
    sumOfSquares,
    findHappyNumbers,
    stepsToHappy
};