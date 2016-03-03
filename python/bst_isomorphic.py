"""
Google Interview Question:
Write a function check(bs1, bs2) that accepts two binary search trees
and returns true or false depending on whether they have the same data sequence.

Good solution:
Build a list of sorted data elements and compare the elements in order.

Better solution:
Use two pointers to traverse the trees in-order and compare the elements
"""

def check(bs1, bs2):
    """
    Returns True if bs1 and bs2 contain the same data sequence

    Use an inorder generator for each tree to compare values one at a time.

    True case:
    - If we are unable to generate another value for both trees
    then we know we have exhausted all nodes and therefore the trees must
    have equal data sequences

    False case:
    - We can't generate a value for the first bst but we can for the second
    - We can generate a value for the first bst but we cannot for the second
    - We can generate values for both bst, but the values are different
    """
    bs1_gen = inorder_traverse(bs1.root)
    bs2_gen = inorder_traverse(bs2.root)
    while True:
        try:
            n1 = bs1_gen.next()
        except StopIteration:
            try:
                n2 = bs2_gen.next()
                return False
            except StopIteration:
                print 'Exhausted all nodes -- bsts are the same'
                return True

        try:
            n2 = bs2_gen.next()
        except StopIteration:
            return False

        if n1 != n2:
            return False

def inorder_traverse(node):
    if node:
        for n in inorder_traverse(node.left):
            yield n
        yield node.data
        for n in inorder_traverse(node.right):
            yield n

class BinaryNode(object):

    def __init__(self, data, parent=None, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

class BinaryTree(object):

    def __init__(self, root):
        self.root = root

    @staticmethod
    def factory(val):
        root = BinaryNode(val)
        return BinaryTree(root)

    def insert(self, val):
        node = BinaryNode(val)
        current = self.root
        inserted = False
        while not inserted:
            if node.data < current.data:
                if not current.left:
                    current.left = node
                    inserted = True
                else:
                    current = current.left
            else:
                if not current.right:
                    current.right = node
                    inserted = True
                else:
                    current = current.right

    def inorder(self, node=None):
        if not node:
            node = self.root

        vals = []
        if node.left:
            vals.extend(self.inorder(node.left))
        vals.append(node.data)
        if node.right:
            vals.extend(self.inorder(node.right))
        return vals

t1 = BinaryTree.factory(5)
t1.insert(3)
t1.insert(4)
t1.insert(2)
t1.insert(1)
t1.insert(7)
t1.insert(6)

t2 = BinaryTree.factory(1)
t2.insert(2)
t2.insert(3)
t2.insert(4)
t2.insert(5)
t2.insert(6)
t2.insert(7)

assert check(t1, t2) == True

t2.insert(8)
assert check(t1, t2) == False

print 'All tests pass!'
