/**
 * LEETCODE SOLUTIONS - Problem 31: Word Break
 * 
 * File: 31-word-break.js
 * Author: Your Name
 * Date: 2026-10-09
 * 
 * Problem: https://leetcode.com/problems/word-break/
 */

// ============ SOLUTION 1: Bottom-Up DP (Optimal) ============
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[n];
}

// ============ SOLUTION 2: Top-Down Memoization ============
function wordBreakMemo(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = new Map();
    
    function canBreak(start) {
        if (start === s.length) return true;
        if (memo.has(start)) return memo.get(start);
        
        for (let end = start + 1; end <= s.length; end++) {
            if (wordSet.has(s.substring(start, end)) && canBreak(end)) {
                memo.set(start, true);
                return true;
            }
        }
        
        memo.set(start, false);
        return false;
    }
    
    return canBreak(0);
}

// ============ SOLUTION 3: BFS ============
function wordBreakBFS(s, wordDict) {
    const wordSet = new Set(wordDict);
    const n = s.length;
    const visited = new Set([0]);
    const queue = [0];
    
    while (queue.length > 0) {
        const start = queue.shift();
        
        for (let end = start + 1; end <= n; end++) {
            if (wordSet.has(s.substring(start, end))) {
                if (end === n) return true;
                if (!visited.has(end)) {
                    visited.add(end);
                    queue.push(end);
                }
            }
        }
    }
    
    return false;
}

// ============ BONUS: Word Break II ============
function wordBreakII(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = new Map();
    
    function backtrack(start) {
        if (start === s.length) return [""];
        if (memo.has(start)) return memo.get(start);
        
        const result = [];
        
        for (let end = start + 1; end <= s.length; end++) {
            const word = s.substring(start, end);
            if (wordSet.has(word)) {
                const suffixes = backtrack(end);
                for (const suffix of suffixes) {
                    result.push(suffix ? word + " " + suffix : word);
                }
            }
        }
        
        memo.set(start, result);
        return result;
    }
    
    return backtrack(0);
}

// ============ BONUS: Minimum Words ============
function wordBreakMinWords(s, wordDict) {
    const wordSet = new Set(wordDict);
    const n = s.length;
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] !== Infinity && wordSet.has(s.substring(j, i))) {
                dp[i] = Math.min(dp[i], dp[j] + 1);
            }
        }
    }
    
    return dp[n] === Infinity ? -1 : dp[n];
}

// ============ BONUS: With Path ============
function wordBreakWithPath(s, wordDict) {
    const wordSet = new Set(wordDict);
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    const parent = new Array(n + 1).fill(-1);
    dp[0] = true;
    
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                parent[i] = j;
                break;
            }
        }
    }
    
    if (!dp[n]) return { possible: false, words: [] };
    
    const words = [];
    let i = n;
    while (i > 0) {
        words.unshift(s.substring(parent[i], i));
        i = parent[i];
    }
    
    return { possible: true, words };
}

// ============ TEST SUITE ============
function runTests() {
    const testCases = [
        { s: "leetcode", dict: ["leet","code"], expected: true, desc: "Basic" },
        { s: "applepenapple", dict: ["apple","pen"], expected: true, desc: "Repeat word" },
        { s: "catsandog", dict: ["cats","dog","sand","and","cat"], expected: false, desc: "Impossible" },
        { s: "a", dict: ["a"], expected: true, desc: "Single" },
        { s: "", dict: ["a"], expected: true, desc: "Empty string" },
        { s: "abcd", dict: ["a","abc","b","cd"], expected: true, desc: "Multiple paths" },
        { s: "aaaaaaa", dict: ["aaaa","aaa"], expected: true, desc: "Overlapping" }
    ];
    
    testCases.forEach(({ s, dict, expected, desc }) => {
        const result = wordBreak(s, dict);
        const passed = result === expected;
        console.log(
            `✅ ${desc}:`,
            `"${s}" → ${result}`,
            passed ? '✓ PASS' : `✗ FAIL (expected ${expected})`
        );
    });
    
    // Bonus tests
    console.log("\n=== Bonus Tests ===");
    console.log("All segmentations 'catsanddog':", wordBreakII("catsanddog", ["cat","cats","and","sand","dog"]));
    console.log("Min words 'leetcode':", wordBreakMinWords("leetcode", ["leet","code"]));
    console.log("With path 'leetcode':", wordBreakWithPath("leetcode", ["leet","code"]));
}

runTests();

module.exports = {
    wordBreak,
    wordBreakMemo,
    wordBreakBFS,
    wordBreakII,
    wordBreakMinWords,
    wordBreakWithPath
};