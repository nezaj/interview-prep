
def utopia_tree(x):
    if x == 0:
        return 1
    elif x % 2 == 1:
        return 2 * utopia_tree(x - 1)
    else:
        return (2 * utopia_tree(x - 2)) + 1

assert utopia_tree(0) == 1
assert utopia_tree(1) == 2
assert utopia_tree(4) == 7
assert utopia_tree(7) == 30
print 'All tests pass!'
