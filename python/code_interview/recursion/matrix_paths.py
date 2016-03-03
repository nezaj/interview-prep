"""
Imagine a robot sitting on the upper left hand corner of an NxN grid The robot can only move in two directions: right and down How many possible paths are there for the robot?

FOLLOW UP
Imagine certain squares are “off limits”, such that the robot can not step on
them Design an algorithm to get all possible paths for the robot
"""

def matrix_paths(n, x=1, y=1):
    if n < 1 or x < 1 or y < 1:
        raise ValueError

    if (x, y) == (n, n):
        return 1
    elif x > n or y > n:
        return 0
    else:
        return matrix_paths(n, x + 1, y) + matrix_paths(n, x, y + 1)

assert matrix_paths(1) == 1
assert matrix_paths(2) == 2
assert matrix_paths(3) == 6

test_m = [[1, 0, 1], [1, 1, 1], [0, 0, 1]]

def matrix_paths_v2(m, x=0, y=0):
    n = len(m) - 1 # Assume NxN matrix

    if (x, y) == (n, n):
        return 1
    elif x > n or y > n:
        return 0
    elif m[x][y] == 0:
        return 0
    else:
        return matrix_paths_v2(m, x + 1, y) + matrix_paths_v2(m, x, y + 1)

assert matrix_paths_v2(test_m) == 1
print 'All tests pass!'
