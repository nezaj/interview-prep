"""
Implements Depth-First Search for a Tree
--> Uses a Stack
"""
from collections import deque

from binary_tree import BinaryTree

def dfs(tree, val):
    """
    Returns whether a value is present in a tree using depth-first search
    """
    stack = [tree.root]
    while stack:
        current = stack.pop()
        if current.data == val:
            return True
        if current.right:
            stack.append(current.right)
        if current.left:
            stack.append(current.left)

    return False

def recursive_dfs(tree, val):
    """ DFS using recursion """
    return recursive_dfs_helper(tree.root, val)

def recursive_dfs_helper(node, val):
    if node.data == val:
        return True
    elif node.left and recursive_dfs_helper(node.left, val):
        return True
    elif node.right and recursive_dfs_helper(node.right, val):
        return True
    else:
        return False


if __name__ == '__main__':
    b = BinaryTree.factory(1)
    b.insert(2)
    b.insert(3)

    assert dfs(b, 1) is True
    assert dfs(b, 3) is True
    assert dfs(b, 4) is False

    assert recursive_dfs(b, 1) is True
    assert recursive_dfs(b, 3) is True
    assert recursive_dfs(b, 4) is False

    print 'All tests pass!'
