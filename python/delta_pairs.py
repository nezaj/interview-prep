
def delta_pairs(nums, delta):
    pairs = 0
    seen = set()
    for num in nums:
        if num - delta in seen:
            pairs += 1
        if num + delta in seen:
            pairs += 1
        seen.update([num])

    return pairs

t1 = [1, 12, 5, 3, 4, 2]
assert delta_pairs(t1, 2) == 3
print 'All tests pass!'
