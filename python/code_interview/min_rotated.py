"""
Example: A sorted array has been rotated so that the elements might appear in the order 3 4 5 6 7 1 2 How would you find the minimum element?
"""

def min_rotated(l):
    if len(l) == 0:
        return []
    if len(l) == 1:
        return l[0]

    while True:
        mid_index = len(l) / 2
        mid_val = l[mid_index]
        left_val = l[0]
        right_val = l[-1]
        if mid_val < left_val:
            # Rotated to right, so pivot must be on left side
            if l[0:mid_index-1] == []:
                return mid_val
            else:
                l = l[0:mid_index-1]
        elif mid_val > right_val:
            # Rotated to the left, so pivot must be on right side
            if l[mid_index+1:-1] == []:
                return mid_val
            else:
                l = l[mid_index+1:]
        elif mid_val > left_val and mid_val < right_val:
            # Now we know the array is in order, so we can return the first element
            return l[0]
        else:
            raise RuntimeError('Not a rotated sorted array!')

t1 = [3, 4, 5, 6, 7, 1, 2]
t2 = [5, 6, 7, 8, 9, 2, 3, 4]
assert min_rotated(t1) == 1
assert min_rotated(t2) == 2
print 'ALl tests pass!'
