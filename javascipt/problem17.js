/**
 * LEETCODE SOLUTIONS - Problem 17: Integer to Roman
 * 
 * File: 17-integer-to-roman.js
 * Author: Your Name
 * Date: 2026-09-21
 * 
 * Problem: https://leetcode.com/problems/integer-to-roman/
 */

// ============ SOLUTION 1: Greedy Value-Symbol Pairs ============
function intToRoman(num) {
    const values = [
        [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
        [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
        [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    
    let result = '';
    for (const [value, symbol] of values) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }
    return result;
}

// ============ SOLUTION 2: Division by Place Values ============
function intToRomanDivision(num) {
    const thousands = ['', 'M', 'MM', 'MMM'];
    const hundreds = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
    const tens = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
    const ones = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    
    return thousands[Math.floor(num / 1000)] +
           hundreds[Math.floor((num % 1000) / 100)] +
           tens[Math.floor((num % 100) / 10)] +
           ones[num % 10];
}

// ============ SOLUTION 3: Map/Object Approach ============
function intToRomanMap(num) {
    const map = {
        1000: 'M', 900: 'CM', 500: 'D', 400: 'CD',
        100: 'C', 90: 'XC', 50: 'L', 40: 'XL',
        10: 'X', 9: 'IX', 5: 'V', 4: 'IV', 1: 'I'
    };
    
    let result = '';
    const values = Object.keys(map).map(Number).sort((a, b) => b - a);
    
    for (const value of values) {
        while (num >= value) {
            result += map[value];
            num -= value;
        }
    }
    return result;
}

// ============ BONUS: Round Trip Test ============
function roundTrip(num) {
    const roman = intToRoman(num);
    const back = romanToInt(roman);
    return num === back;
}

function romanToInt(s) {
    const values = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000
    };
    let total = 0;
    for (let i = 0; i < s.length; i++) {
        const current = values[s[i]];
        const next = values[s[i + 1]];
        if (next && current < next) total -= current;
        else total += current;
    }
    return total;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: 3749, expected: "MMMDCCXLIX", desc: "Complex" },
        { input: 58, expected: "LVIII", desc: "Simple" },
        { input: 1994, expected: "MCMXCIV", desc: "Classic" },
        { input: 4, expected: "IV", desc: "Subtractive 4" },
        { input: 9, expected: "IX", desc: "Subtractive 9" },
        { input: 1, expected: "I", desc: "Minimum" },
        { input: 3999, expected: "MMMCMXCIX", desc: "Maximum" },
        { input: 400, expected: "CD", desc: "Subtractive 400" },
        { input: 900, expected: "CM", desc: "Subtractive 900" },
        { input: 40, expected: "XL", desc: "Subtractive 40" },
        { input: 90, expected: "XC", desc: "Subtractive 90" },
        { input: 500, expected: "D", desc: "Single D" },
        { input: 1000, expected: "M", desc: "Single M" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = intToRoman(input);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `${input} → "${result}"`,
            passed ? '✓ PASS' : `✗ FAIL (expected "${expected}")`
        );
    });
    
    // Round trip test
    console.log("\n=== Round Trip Test (1-3999) ===");
    let passed = 0;
    for (let i = 1; i <= 3999; i++) {
        if (roundTrip(i)) passed++;
    }
    console.log(`✅ Passed: ${passed}/3999 ${passed === 3999 ? '🎉' : '❌'}`);
}

runTests();

module.exports = {
    intToRoman,
    intToRomanDivision,
    intToRomanMap,
    romanToInt
};