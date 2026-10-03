/**
 * LEETCODE SOLUTIONS - Problem 25: Move Zeroes
 * 
 * File: 25-move-zeroes.js
 * Author: Your Name
 * Date: 2026-09-30
 * 
 * Problem: https://leetcode.com/problems/move-zeroes/
 */

// ============ SOLUTION 1: Two Pointers (Swap) ============
function moveZeroes(nums) {
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
            slow++;
        }
    }
}

// ============ SOLUTION 2: Overwrite Then Fill ============
function moveZeroesOverwrite(nums) {
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    while (slow < nums.length) {
        nums[slow++] = 0;
    }
}

// ============ SOLUTION 3: Optimal Swap (Fewer Swaps) ============
function moveZeroesOptimal(nums) {
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            if (slow !== fast) {
                [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
            }
            slow++;
        }
    }
}

// ============ BONUS: Move Any Target ============
function moveElement(nums, target) {
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== target) {
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
            slow++;
        }
    }
}

// ============ BONUS: Remove Element ============
function removeElement(nums, val) {
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== val) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    return slow;
}

// ============ BONUS: Remove Duplicates from Sorted ============
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    let slow = 1;
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[fast - 1]) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    return slow;
}

// ============ BONUS: Sort Colors (Dutch Flag) ============
function sortColors(nums) {
    let low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++; mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: [0,1,0,3,12], expected: [1,3,12,0,0], desc: "Basic" },
        { input: [0], expected: [0], desc: "Single zero" },
        { input: [1,0,2,0,3,0,4], expected: [1,2,3,4,0,0,0], desc: "Many zeros" },
        { input: [1,2,3], expected: [1,2,3], desc: "No zeros" },
        { input: [0,0,0], expected: [0,0,0], desc: "All zeros" },
        { input: [0,0,1], expected: [1,0,0], desc: "Zeros first" },
        { input: [1,0,0], expected: [1,0,0], desc: "Zero last" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const arr = [...input];
        moveZeroes(arr);
        const passed = JSON.stringify(arr) === JSON.stringify(expected);
        console.log(
            `✅ ${desc}:`,
            `[${input}] → [${arr}]`,
            passed ? '✓ PASS' : `✗ FAIL (expected [${expected}])`
        );
    });
    
    // Bonus tests
    console.log("\n=== Bonus Tests ===");
    const arr1 = [3, 2, 2, 3];
    console.log("Remove element 3:", removeElement(arr1, 3), "→", arr1.slice(0, 2));
    
    const arr2 = [0,0,1,1,1,2,2,3,3,4];
    const len = removeDuplicates(arr2);
    console.log("Remove duplicates:", len, "→", arr2.slice(0, len));
    
    const colors = [2,0,2,1,1,0];
    sortColors(colors);
    console.log("Sort colors:", colors);
}

runTests();

module.exports = {
    moveZeroes,
    moveZeroesOverwrite,
    moveZeroesOptimal,
    moveElement,
    removeElement,
    removeDuplicates,
    sortColors
};