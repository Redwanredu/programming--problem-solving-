def lowest_common_ancestor_paths(root, p, q):
    """
    Find the path from root to p and from root to q.
    The LCA is the last node common to both paths.
    """
    def find_path(node, target, path):
        if node is None:
            return False
        path.append(node)
        if node == target:
            return True
        if find_path(node.left, target, path) or find_path(node.right, target, path):
            return True
        path.pop()  # Backtrack
        return False
    
    path_p, path_q = [], []
    find_path(root, p, path_p)
    find_path(root, q, path_q)
    
    # Walk both paths until they diverge
    lca = None
    for a, b in zip(path_p, path_q):
        if a == b:
            lca = a
        else:
            break
    
    return lca