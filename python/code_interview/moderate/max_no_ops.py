"""
Write a method which finds the maximum of two numbers
You should not use if- else or any other comparison operator
"""

def max_no_ops(a, b):
    c = a - b
    k = (c >> 31 ) & 0x1
    return a - (k * c)

assert max_no_ops(3, 5) == 5
assert max_no_ops(-1, 3) == 3
assert max_no_ops(4, 0) == 4
print 'All tests pass!'
