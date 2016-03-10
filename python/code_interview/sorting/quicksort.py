def quicksort(arr):
    if len(arr) < 2:
        return arr

    pivot = arr[0]

    lesser = quicksort([x for x in arr[1:] if x < pivot])
    greater = quicksort([x for x in arr[1:] if x > pivot])
    equal = quicksort([x for x in arr[1:] if x == pivot])
    return lesser + [pivot] + equal + greater

t0 = [1, 2, 3, 4]
assert quicksort(t0) == [1, 2, 3, 4]

t1 = [6, 2, 3, 8]
assert quicksort(t1) == [2, 3, 6, 8]

t2 = [1, 5, 3, 3]
assert quicksort(t2) == [1, 3, 3, 5]

print 'All tests pass!'
