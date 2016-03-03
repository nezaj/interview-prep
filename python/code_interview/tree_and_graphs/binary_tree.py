from collections import deque

class BinaryNode(object):

    def __init__(self, data, parent=None, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

class BinaryTree(object):
    """ Binary tree Implementation, fills tree from left -> right """

    def __init__(self, root):
        self.root = root

    @staticmethod
    def factory(val):
        root = BinaryNode(val)
        return BinaryTree(root)

    def insert(self, val):
        new_node = BinaryNode(val)
        explore = deque([self.root])
        done = False
        while not done:
            current = explore.popleft()
            if not current.left:
                current.left = new_node
                done = True
            elif not current.right:
                current.right = new_node
                done = True
            else:
                explore.extend([current.left, current.right])
        return new_node

    def find(self, val):
        """
        Searches tree for a node with a given value.
        Returns node if found -- Returns None otherwise
        """
        explore = deque([self.root])
        while explore:
            current = explore.popleft()
            if current.data == val:
                return current
            else:
                if current.left:
                    explore.append(current.left)
                if current.right:
                    explore.append(current.right)

        return None

    def preorder(self, node=None):
        if not node:
            node = self.root

        vals = []
        vals.append(node.data)
        if node.left:
            vals.extend(self.preorder(node.left))
        if node.right:
            vals.extend(self.preorder(node.right))
        return vals

    def __repr__(self):
        return str(self.preorder())

if __name__ == '__main__':
    b = BinaryTree.factory(1)
    assert b.preorder() == [1]

    root = b.find(1)
    assert root.data == 1

    b.insert(2)
    b.insert(3)
    assert b.preorder() == [1, 2, 3]
    assert root.left.data == 2
    assert root.right.data == 3

    second = b.find(2)
    b.insert(4)
    b.insert(5)
    assert second.left.data == 4
    assert second.right.data == 5
    print 'All tests pass!'
