def bsearch(l, x):
    """
    Returns the index of an element in a list using binary srach
    Returns -1 if the element cannot be found
    """
    index = 0
    while len(l) > 0:
        mid_index = len(l) // 2
        pivot = l[mid_index]
        if pivot == x:
            return index + mid_index
        elif pivot < x:
            index += mid_index + 1
            l = l[mid_index + 1:]
        else:
            l = l[0:mid_index]

    return -1

t1 = [1, 2, 3, 4, 5, 6, 7]
assert bsearch(t1, 0) == -1
assert bsearch(t1, 1) == 0
assert bsearch(t1, 3) == 2
assert bsearch(t1, 4) == 3
assert bsearch(t1, 5) == 4
assert bsearch(t1, 7) == 6

t2 = [2, 3]
assert bsearch(t2, 0) == -1

print('All tests pass!')
