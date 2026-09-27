/**
 * LEETCODE SOLUTIONS - Problem 22: Add Binary
 * 
 * File: 22-add-binary.js
 * Author: Your Name
 * Date: 2026-09-27
 * 
 * Problem: https://leetcode.com/problems/add-binary/
 */

// ============ SOLUTION 1: Two Pointers (Optimal) ============
function addBinary(a, b) {
    let result = '';
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;
    
    while (i >= 0 || j >= 0 || carry > 0) {
        const digitA = i >= 0 ? parseInt(a[i]) : 0;
        const digitB = j >= 0 ? parseInt(b[j]) : 0;
        
        const sum = digitA + digitB + carry;
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);
        
        i--;
        j--;
    }
    
    return result;
}

// ============ SOLUTION 2: Array for Efficiency ============
function addBinaryArray(a, b) {
    const result = [];
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;
    
    while (i >= 0 || j >= 0 || carry > 0) {
        const digitA = i >= 0 ? a.charCodeAt(i) - 48 : 0;
        const digitB = j >= 0 ? b.charCodeAt(j) - 48 : 0;
        
        const sum = digitA + digitB + carry;
        result.push(sum % 2);
        carry = Math.floor(sum / 2);
        
        i--;
        j--;
    }
    
    return result.reverse().join('');
}

// ============ SOLUTION 3: BigInt ============
function addBinaryBigInt(a, b) {
    return (BigInt('0b' + a) + BigInt('0b' + b)).toString(2);
}

// ============ SOLUTION 4: Pad and Add ============
function addBinaryPad(a, b) {
    const maxLen = Math.max(a.length, b.length);
    a = a.padStart(maxLen, '0');
    b = b.padStart(maxLen, '0');
    
    let result = '';
    let carry = 0;
    
    for (let i = maxLen - 1; i >= 0; i--) {
        const sum = parseInt(a[i]) + parseInt(b[i]) + carry;
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);
    }
    
    if (carry > 0) result = '1' + result;
    return result;
}

// ============ BONUS: Subtract Binary ============
function subtractBinary(a, b) {
    let result = '';
    let borrow = 0;
    let i = a.length - 1;
    let j = b.length - 1;
    
    while (i >= 0) {
        let digitA = parseInt(a[i]);
        const digitB = j >= 0 ? parseInt(b[j]) : 0;
        
        digitA -= borrow;
        
        if (digitA < digitB) {
            digitA += 2;
            borrow = 1;
        } else {
            borrow = 0;
        }
        
        result = (digitA - digitB) + result;
        i--;
        j--;
    }
    
    result = result.replace(/^0+/, '') || '0';
    return result;
}

// ============ BONUS: Multiply Binary ============
function multiplyBinary(a, b) {
    if (a === "0" || b === "0") return "0";
    
    const result = new Array(a.length + b.length).fill(0);
    
    for (let i = a.length - 1; i >= 0; i--) {
        for (let j = b.length - 1; j >= 0; j--) {
            const product = parseInt(a[i]) * parseInt(b[j]);
            const pos1 = i + j;
            const pos2 = i + j + 1;
            
            const sum = product + result[pos2];
            result[pos2] = sum % 2;
            result[pos1] += Math.floor(sum / 2);
        }
    }
    
    const start = result.findIndex(x => x !== 0);
    return start === -1 ? "0" : result.slice(start).join('');
}

// ============ BONUS: Decimal to Binary ============
function decimalToBinary(decimal) {
    if (decimal === 0) return "0";
    let binary = '';
    while (decimal > 0) {
        binary = (decimal % 2) + binary;
        decimal = Math.floor(decimal / 2);
    }
    return binary;
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { a: "11", b: "1", expected: "100", desc: "Simple" },
        { a: "1010", b: "1011", expected: "10101", desc: "Longer" },
        { a: "0", b: "0", expected: "0", desc: "Both zero" },
        { a: "1", b: "1", expected: "10", desc: "Carry" },
        { a: "1111", b: "1111", expected: "11110", desc: "All ones" },
        { a: "100", b: "110010", expected: "110110", desc: "Different lengths" },
        { a: "0", b: "1", expected: "1", desc: "One zero" },
        { a: "111", b: "1", expected: "1000", desc: "Carry chain" }
    ];
    
    testCases.forEach(({ a, b, expected, desc }) => {
        const result = addBinary(a, b);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `"${a}" + "${b}" = "${result}"`,
            passed ? '✓ PASS' : `✗ FAIL (expected "${expected}")`
        );
    });
    
    // Bonus tests
    console.log("\n=== Bonus Tests ===");
    console.log("Subtract:", subtractBinary("100", "1"));      // "11"
    console.log("Multiply:", multiplyBinary("11", "11"));      // "1001"
    console.log("Dec to Bin:", decimalToBinary(10));           // "1010"
    console.log("BigInt:", addBinaryBigInt("1111", "1111"));   // "11110"
}

runTests();

module.exports = {
    addBinary,
    addBinaryArray,
    addBinaryBigInt,
    addBinaryPad,
    subtractBinary,
    multiplyBinary,
    decimalToBinary
};