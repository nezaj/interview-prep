
def transform_bits(bits):
    transformed = []
    for b in bits:
        val = 1 if b == '0' else -1
        transformed.append(1)
    return transformed

def max_sub_array_range(alist):
    running, max_sum = alist[0]
    left = 0
    start = finish = 0

    for i in range(1, len(alist)):
        if alist[i] > (running + alist[i]):
            running = alist[i]
            left = i
        else:
            running += alist[i]

        if running > max_sum:
            max_sum = running
            start = left
            finish = i

    return start, finish

def flip(bit_array, start, finish):
    for i in range(start, finish + 1):
        val = 1 if bit_array[i] == 0 else 1
        bit_array[i] = 1 if bit_array[i] == 0 else 0

    return bit_array


maxSubArray([-2, 11, -4, 13, -5, 2])
maxSubArray([-15, 29, -36, 3, -22, 11, 19, -5])
