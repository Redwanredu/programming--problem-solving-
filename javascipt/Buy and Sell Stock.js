/* Problem: Best Time to Buy and Sell Stock
Difficulty: Easy

Description:
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If no profit is possible, return 0.

Example:Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: No transactions are done, max profit = 0.

Input: prices = [1,2]
Output: 1
Explanation: Buy on day 1 (price = 1), sell on day 2 (price = 2), profit = 1.*/
/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
    // Edge case: need at least 2 prices
    if (prices.length < 2) return 0;
    
    let minPrice = Infinity;  // Track minimum price seen so far
    let maxProfit = 0;        // Track maximum profit
    
    for (let i = 0; i < prices.length; i++) {
        // Update minimum price if current is lower
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } 
        // Calculate profit if we sell at current price
        else {
            const profit = prices[i] - minPrice;
            // Update max profit if this is better
            if (profit > maxProfit) {
                maxProfit = profit;
            }
        }
    }
    
    return maxProfit;
}

// Alternative cleaner version
function maxProfitClean(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (let price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}

// Test cases
console.log(maxProfit([7,1,5,3,6,4]));  // 5
console.log(maxProfit([7,6,4,3,1]));    // 0
console.log(maxProfit([1,2]));          // 1
console.log(maxProfit([2,4,1]));        // 2
console.log(maxProfit([3,2,6,5,0,3]));  // 4
console.log(maxProfit([1]));            // 0
console.log(maxProfit([]));             // 0