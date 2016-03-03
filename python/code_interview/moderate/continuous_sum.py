
# Iterate through elements and calculate running total
# if current > current + running_total -> set running_total = val, update running_total indices
# if running_total > best -> best = running_total, best_indices = running_total_indices
# return best, alist[best_start:best_end]

def max_continuous(alist):
    if len(alist) < 2:
        return (sum(alist), alist)

    rt = alist[0]
    best = alist[0]
    rt_start = best_start = best_end = 0

    for idx, val in enumerate(alist[1:]):
        rt += val
        if val > rt:
            rt = val
            rt_start = idx + 1
        if rt > best:
            best = rt
            best_start = rt_start
            best_end = idx + 1

    return (best, alist[best_start:best_end + 1])

t0 = [2, -8, 3, -2, 4, -10]
e0 = (5, [3, -2, 4])

assert max_continuous(t0) == e0
print 'All tests pass!'
