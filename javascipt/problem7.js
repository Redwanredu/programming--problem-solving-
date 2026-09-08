/**
 * LEETCODE SOLUTIONS - Problem 7: Maximum Subarray
 * 
 * File: 07-maximum-subarray.js
 * Author: Your Name
 * Date: 2026-09-07
 * 
 * Problem: https://leetcode.com/problems/maximum-subarray/
 */

// ============ SOLUTION 1: Kadane's Algorithm ============
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// ============ SOLUTION 2: DP Array ============
function maxSubArrayDP(nums) {
    if (nums.length === 0) return 0;
    
    const dp = new Array(nums.length);
    dp[0] = nums[0];
    let maxSum = dp[0];
    
    for (let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
        maxSum = Math.max(maxSum, dp[i]);
    }
    
    return maxSum;
}

// ============ SOLUTION 3: Divide and Conquer ============
function maxSubArrayDivide(nums) {
    return divideHelper(nums, 0, nums.length - 1);
}

function divideHelper(nums, left, right) {
    if (left === right) return nums[left];
    
    const mid = Math.floor((left + right) / 2);
    const leftMax = divideHelper(nums, left, mid);
    const rightMax = divideHelper(nums, mid + 1, right);
    const crossMax = crossSum(nums, left, mid, right);
    
    return Math.max(leftMax, rightMax, crossMax);
}

function crossSum(nums, left, mid, right) {
    let leftSum = -Infinity;
    let sum = 0;
    for (let i = mid; i >= left; i--) {
        sum += nums[i];
        leftSum = Math.max(leftSum, sum);
    }
    
    let rightSum = -Infinity;
    sum = 0;
    for (let i = mid + 1; i <= right; i++) {
        sum += nums[i];
        rightSum = Math.max(rightSum, sum);
    }
    
    return leftSum + rightSum;
}

// ============ BONUS: With Subarray ============
function maxSubArrayWithSubarray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    let start = 0, end = 0, tempStart = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > currentSum + nums[i]) {
            currentSum = nums[i];
            tempStart = i;
        } else {
            currentSum += nums[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    return {
        sum: maxSum,
        subarray: nums.slice(start, end + 1),
        indices: [start, end]
    };
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { input: [-2,1,-3,4,-1,2,1,-5,4], expected: 6, desc: "Standard case" },
        { input: [1], expected: 1, desc: "Single element" },
        { input: [5,4,-1,7,8], expected: 23, desc: "All positive" },
        { input: [-1], expected: -1, desc: "Single negative" },
        { input: [-2,-1], expected: -1, desc: "Two negatives" },
        { input: [0], expected: 0, desc: "Zero" },
        { input: [-2,1,-3,4,-1,2,1,-5,4], expected: 6, desc: "Complex" }
    ];
    
    testCases.forEach(({ input, expected, desc }) => {
        const result = maxSubArray(input);
        console.log(
            `✅ ${desc}:`,
            `Input: [${input}]`,
            `Expected: ${expected}`,
            `Got: ${result}`,
            result === expected ? '✓ PASS' : '✗ FAIL'
        );
    });
    
    // Test bonus
    console.log("\n📊 Subarray Details:");
    console.log(maxSubArrayWithSubarray([-2,1,-3,4,-1,2,1,-5,4]));
}

runTests();

module.exports = {
    maxSubArray,
    maxSubArrayDP,
    maxSubArrayDivide,
    maxSubArrayWithSubarray
};