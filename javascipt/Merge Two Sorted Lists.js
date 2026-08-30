Difficulty: Easy (but has a trickier recursion version)

Description:
You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.

Example:

javascript
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Input: list1 = [], list2 = []
Output: []

Input: list1 = [], list2 = [0]
Output: [0]
Solution (Optimal Approach - Iterative):
javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
    // Create a dummy node to simplify handling
    const dummy = new ListNode(0);
    let current = dummy;
    
    // Traverse both lists
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    // Attach remaining nodes from either list
    if (list1 !== null) {
        current.next = list1;
    }
    if (list2 !== null) {
        current.next = list2;
    }
    
    // Return the head (skip dummy node)
    return dummy.next;
}

// Helper function to create linked list from array (for testing)
function createLinkedList(arr) {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to convert linked list to array (for testing)
function linkedListToArray(head) {
    const result = [];
    let current = head;
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

// Test cases
const list1 = createLinkedList([1, 2, 4]);
const list2 = createLinkedList([1, 3, 4]);
const merged = mergeTwoLists(list1, list2);
console.log(linkedListToArray(merged)); // [1, 1, 2, 3, 4, 4]

console.log(linkedListToArray(mergeTwoLists(null, null))); // []
console.log(linkedListToArray(mergeTwoLists(null, createLinkedList([0])))); // [0]
Alternative Solution (Recursive - Elegant):
javascript
function mergeTwoListsRecursive(list1, list2) {
    // Base cases
    if (list1 === null) return list2;
    if (list2 === null) return list1;
    
    // Recursive case
    if (list1.val <= list2.val) {
        list1.next = mergeTwoListsRecursive(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoListsRecursive(list1, list2.next);
        return list2;
    }
}
Alternative Solution (Using Array - Not Recommended but Good for Understanding):
javascript
function mergeTwoListsArray(list1, list2) {
    // Convert linked lists to arrays
    let arr = [];
    
    while (list1 !== null) {
        arr.push(list1.val);
        list1 = list1.next;
    }
    while (list2 !== null) {
        arr.push(list2.val);
        list2 = list2.next;
    }
    
    // Sort array
    arr.sort((a, b) => a - b);
    
    // Convert back to linked list
    return createLinkedList(arr);
}
🎯 BONUS CHALLENGES (for your GitHub):
Challenge 1: Merge K Sorted Lists
javascript
function mergeKLists(lists) {
    // Merge all lists using divide and conquer
    if (lists.length === 0) return null;
    if (lists.length === 1) return lists[0];
    
    // Split and merge recursively
    const mid = Math.floor(lists.length / 2);
    const left = mergeKLists(lists.slice(0, mid));
    const right = mergeKLists(lists.slice(mid));
    return mergeTwoLists(left, right);
}
Challenge 2: Remove Duplicates from Sorted List
javascript
function deleteDuplicates(head) {
    let current = head;
    while (current !== null && current.next !== null) {
        if (current.val === current.next.val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    return head;
}
📝 Key Concepts to Learn:
Linked Lists - Understanding nodes and pointers

Dummy Node Technique - Simplifies edge cases

Two-Pointer Technique - Traversing two structures

Recursion vs Iteration - Trade-offs

In-place vs Creating New - Memory optimization

📊 Updated Practice Tracker:
