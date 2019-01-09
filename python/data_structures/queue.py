"""
Implements Queue ADT
"""

class Queue(object):

    @staticmethod
    def factory(values):
        queue = Queue()
        for v in values:
            queue.insert(v)
        return queue

    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0

    def insert(self, val):
        node = QueueNode(val)

        if not self.head:
            self.head = node
            self.tail = self.head
        else:
            self.tail.next = node
            self.tail = node

        self.length += 1

    def remove(self):
        if not self.head:
            return None

        if self.head == self.tail:
            self.head = None
            self.tail = None
        else:
            self.head = self.head.next

        self.length -= 1
        return None

    def peek(self):
        return self.head

    def is_empty(self):
        return self.length == 0

    def list(self):
        res = []
        current = self.head
        while current:
            res.append(current.value)
            current = current.next
        return res

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

class QueueNode(object):
    def __init__(self, value):
        self.value = value
        self.next = None

    def set_next(self, node):
        self.next = node

    def __repr__(self):
        next_value = self.next and self.next.value
        return "(value={}, next={})".format(self.value, next_value)

queue = Queue.factory([2, 3, 8, 10])
assert len(queue) == 4
assert queue.list() == [2, 3, 8, 10]

queue.remove()
assert len(queue) == 3
assert queue.list() == [3, 8, 10]

queue.remove()
queue.remove()
assert len(queue) == 1
assert queue.list() == [10]

queue.insert(1)
assert len(queue) == 2
assert queue.list() == [10, 1]

queue.insert(2)
assert len(queue) == 3
assert queue.list() == [10, 1, 2]

print('All tests pass!')
