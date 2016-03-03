"""
Implements Breadth-First Search for a Tree
--> Uses a Queue (or a deque in this case)
"""
from collections import deque

from binary_tree import BinaryTree

def bfs(tree, val):
    """
    Returns whether a node is present in a tree using breadth-first search
    """
    deque = deque([tree.root])
    while deque:
        current = deque.popleft()
        if current.data == val:
            return True
        else:
            if current.left:
                deque.append(current.left)
            if current.right:
                deque.append(current.right)

    return False

if __name__ == '__main__':
    b = BinaryTree.factory(1)
    b.insert(2)
    b.insert(3)

    assert bfs(b, 1) is True
    assert bfs(b, 3) is True
    assert bfs(b, 4) is False

    print 'All tests pass!'
