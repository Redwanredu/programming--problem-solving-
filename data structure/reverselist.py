def reverse_list_stack(head):
    """
    Push all nodes onto a stack, then pop them to rebuild the list.
    """
    if head is None:
        return None
    
    stack = []
    curr = head
    while curr:
        stack.append(curr)
        curr = curr.next
    
    # Rebuild from stack
    new_head = stack.pop()
    curr = new_head
    while stack:
        curr.next = stack.pop()
        curr = curr.next
    curr.next = None  # Terminate the list
    
    return new_head