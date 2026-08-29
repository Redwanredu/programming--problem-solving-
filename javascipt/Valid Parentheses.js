/* Description:
Description:
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.

Open brackets must be closed in the correct order.

Every close bracket has a corresponding open bracket of the same type.

ex:
Input: s = "()[]{}"
Output: true

Input: s = "([)]"
Output: false

Input: s = "{[]}"
Output: true


/**
 * 
 * 
 * /**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Stack to store opening brackets
    const stack = [];
    
    // Map closing brackets to their opening counterparts
    const bracketMap = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    // Iterate through each character
    for (let char of s) {
        // If it's a closing bracket
        if (bracketMap[char]) {
            // Pop from stack or use dummy if empty
            const topElement = stack.length === 0 ? '#' : stack.pop();
            
            // Check if top element matches
            if (topElement !== bracketMap[char]) {
                return false;
            }
        } else {
            // It's an opening bracket - push to stack
            stack.push(char);
        }
    }
    
    // Stack should be empty if all brackets are closed
    return stack.length === 0;
}

// Test cases
console.log(isValid("()"));           // true
console.log(isValid("()[]{}"));       // true
console.log(isValid("(]"));           // false
console.log(isValid("([)]"));         // false
console.log(isValid("{[]}"));         // true
console.log(isValid(""));             // true (empty string)
console.log(isValid("((("));          // false