def merge_two_lists(list1, list2):
    """
    Use a dummy node to simplify edge cases.
    Compare heads of both lists, attach the smaller one, advance that pointer.
    """
    dummy = ListNode()       # Placeholder head
    tail = dummy             # Tail of the merged list
    
    while list1 and list2:
        if list1.val <= list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next
    
    # Attach whatever remains (already sorted)
    tail.next = list1 if list1 else list2
    
    return dummy.next