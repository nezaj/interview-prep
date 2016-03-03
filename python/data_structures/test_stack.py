import unittest

from stack import Stack

class TestStack(unittest.TestCase):

    def setUp(self):
        self.l = Stack([1, 2, 3])

    def test_push(self):
        self.l.push(4)
        self.l.push(5)
        self.l.push(6)
        self.assertEqual(self.l.items, [1, 2, 3, 4, 5, 6])

    def test_pop(self):
        self.l.pop()
        self.l.pop()
        self.assertEqual(self.l.items, [1])

    def test_peek(self):
        self.assertEqual(self.l.peek(1), 2)
        self.assertEqual(self.l.peek(2), 3)

    def test_len(self):
        self.assertEqual(len(self.l), 3)

if __name__ == '__main__':
    unittest.main()
