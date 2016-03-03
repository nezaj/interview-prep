
class Node(object):

    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

    def __repr__(self):
        return str(self.data)

class ParseTree(object):

    @staticmethod
    def factory(expr):
        """ Builds a parse tree from an arthimetic expression """
        values = [c for c in expr if c != ' ']
        new_node = Node(values[0])
        return ParseTree(new_node)

    def __init__(self, root):
        self.root = root

    def evaluate(self):
        return self.root.data

t0 = ParseTree.factory('3')
assert t0.evaluate() == 3
print 'All tests pass!'

# TODO: Support more complex expressions
