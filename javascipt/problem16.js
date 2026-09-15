/**
 * LEETCODE SOLUTIONS - Problem 16: Roman to Integer
 * 
 * File: 16-roman-to-integer.js
 * Author: Your Name
 * Date: 2026-09-15
 * 
 * Problem: https://leetcode.com/problems/roman-to-integer/
 */

// ============ SOLUTION 1: Left-to-Right with Lookahead ============
function romanToInt(s) {
    const values = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000
    };
    
    let total = 0;
    for (let i = 0; i < s.length; i++) {
        const current = values[s[i]];
        const next = values[s[i + 1]];
        
        if (next && current < next) {
            total -= current;
        } else {
            total += current;
        }
    }
    return total;
}

// ============ SOLUTION 2: Right-to-Left ============
function romanToIntRight(s) {
    const values = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000
    };
    
    let total = 0;
    let prev = 0;
    
    for (let i = s.length - 1; i >= 0; i--) {
        const current = values[s[i]];
        if (current < prev) {
            total -= current;
        } else {
            total += current;
        }
        prev = current;
    }
    return total;
}

// ============ SOLUTION 3: Replace Subtraction Pairs ============
function romanToIntReplace(s) {
    const values = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000
    };
    const pairs = {
        'IV': 4, 'IX': 9, 'XL': 40, 'XC': 90,
        'CD': 400, 'CM': 900
    };
    
    let total = 0;
    let i = 0;
    
    while (i < s.length) {
        const pair = s.substring(i, i + 2);
        if (pairs[pair]) {
            total += pairs[pair];
            i += 2;
        } else {
            total += values[s[i]];
            i++;
        }
    }
    return total;
}

// ============ BONUS: Integer to Roman ============
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

// ============ BONUS: Validate Roman ============
function isValidRoman(s) {
    if (!/^[IVXLCDM]+$/.test(s)) return false;
    
    const invalid = [
        /IIII/, /VV/, /XXXX/, /LL/, /CCCC/, /DD/, /MMMM/,
        /IL/, /IC/, /ID/, /IM/, /XD/, /XM/,
        /VX/, /VL/, /VC/, /VD/, /VM/,
        /LC/, /LD/, /LM/, /DM/
    ];
    
    return !invalid.some(p => p.test(s));
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: "III", expected: 3, desc: "Simple addition" },
        { input: "LVIII", expected: 58, desc: "Mixed" },
        { input: "MCMXCIV", expected: 1994, desc: "Complex" },
        { input: "IV", expected: 4, desc: "Subtraction IV" },
        { input: "IX", expected: 9, desc: "Subtraction IX" },
        { input: "XL", expected: 40, desc: "Subtraction XL" },
        { input: "XC", expected: 90, desc: "Subtraction XC" },
        { input: "CD", expected: 400, desc: "Subtraction CD" },
        { input: "CM", expected: 900, desc: "Subtraction CM" },
        { input: "MMMCMXCIX", expected: 3999, desc: "Maximum" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = romanToInt(input);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `Input: "${input}"`,
            `Expected: ${expected}`,
            `Got: ${result}`,
            passed ? '✓ PASS' : '✗ FAIL'
        );
    });
    
    // Bonus tests
    console.log("\n=== Bonus Tests ===");
    console.log("intToRoman(1994):", intToRoman(1994));
    console.log("Round trip 3999:", romanToInt(intToRoman(3999)));
    console.log("Valid 'MCMXCIV':", isValidRoman("MCMXCIV"));
    console.log("Valid 'IIII':", isValidRoman("IIII"));
}

runTests();

module.exports = {
    romanToInt,
    romanToIntRight,
    romanToIntReplace,
    intToRoman,
    isValidRoman
};