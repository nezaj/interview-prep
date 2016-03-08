def merge_sort(alist):
    if alist == []:
        return []

    length = len(alist)
    if length == 1:
        return alist

    midpoint = length / 2
    left = alist[:midpoint]
    right = alist[midpoint:]
    sorted_left = merge_sort(left)
    sorted_right = merge_sort(right)

    return merge(sorted_left, sorted_right)

def merge(left, right):
    merged = []
    done = False
    while not done:
        if left and right:
            l_val, r_val = left.pop(), right.pop()
            if l_val > r_val:
                merged.append(l_val)
                right.append(r_val)
            else:
                merged.append(r_val)
                left.append(l_val)
        elif left:
            merged.extend(reversed(left))
            done = True
        else:
            merged.extend(reversed(right))
            done = True

    return list(reversed(merged))

t0 = [2, 1]
assert merge_sort(t0) == [1, 2]

t1 = [6, 2, 4, 1]
assert merge_sort(t1) == [1, 2, 4, 6]

t2 = [1, 2, 3]
assert merge_sort(t2) == [1, 2, 3]

t3 = []
assert merge_sort(t3) == []

t3 = [2, 1, 0]
assert merge_sort(t3) == [0, 1, 2]

print 'All tests pass!'
