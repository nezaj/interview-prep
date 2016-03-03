"""
Write an algorithm that computes the number of trailing zeros for a factorial
"""

def trailing_factorial(n):
    if n < 0:
        return -1

    count = 0
    divisor = 5
    multiplier = 1
    while n / divisor > 0:
        count += (n / divisor) * multiplier
        divisor *= divisor

    return count

assert trailing_factorial(5) == 1
assert trailing_factorial(10) == 2
assert trailing_factorial(16) == 3
assert trailing_factorial(20) == 4
assert trailing_factorial(26) == 6
print 'All tests pass!'
