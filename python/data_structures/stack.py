"""
Implements Stack ADT
"""

class Stack(object):

    def __init__(self, items=None):
        self.items = items if items else []

    def push(self, val):
        self.items.append(val)

    def pop(self):
        return self.items.pop()

    def peek(self, index):
        return self.items[index]

    def __repr__(self):
        return repr(self.items)

    def __len__(self):
        return len(self.items)
