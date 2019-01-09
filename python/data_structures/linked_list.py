"""
Implements LinkedList ADT
"""
class LinkedList(object):

    @staticmethod
    def factory(values):
        linked = LinkedList()
        for v in values:
            linked.insert(v)
        return linked

    def __init__(self):
        self.head = None
        self.length = 0

    def insert(self, v):
        new_node = Node(v)
        if self.head is None:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.set_next(new_node)

        self.length += 1

    def remove(self, v):
        if (self.head.value == v):
            self.head = self.head.next

        current = self.head
        while current.next and current.next.value != v:
            current = current.next

        if current.next and current.next.value == v:
            current.next = current.next.next
            self.length -= 1

    def list(self):
        res = []
        current = self.head
        while current:
            res.append(current.value)
            current = current.next
        return res

    def reverse(self):
        reversed = LinkedList()
        reversed.head = None
        node = self.head
        while node:
            n = Node(node.value)
           n.next = reversed.head
            reversed.head = n
            reversed.length += 1
            node = node.next

        return reversed

    def __len__(self):
        return self.length

    def __repr__(self):
        values = []
        current = self.head
        while current:
            values.append(repr(current))
            current = current.next
        values_str = '\n'.join(values)
        return '{}\n{}'.format(self.__class__, values_str)

class Node(object):
    def __init__(self, value):
        self.value = value
        self.next = None

    def set_next(self, node):
        self.next = node

    def __repr__(self):
        next_value = self.next and self.next.value
        return "(value={}, next={})".format(self.value, next_value)

linked = LinkedList.factory([2, 3, 8, 10])
assert len(linked) == 4
assert linked.list() == [2, 3, 8, 10]

linked.remove(8)
assert len(linked) == 3
assert linked.list() == [2, 3, 10]

linked.insert(8)
assert len(linked) == 4
assert linked.list() == [2, 3, 10, 8]

reversed = linked.reverse()
assert len(reversed) == 4
assert reversed.list() == [8, 10, 3, 2]
print('All tests pass!')
