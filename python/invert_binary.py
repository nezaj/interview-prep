
def getInversedNumber(num):
    inversed = []
    bin_s = bin(num)[2:]
    inversed = ['1' if b == '0' else '0' for b in bin_s]
    return int(''.join(inversed), 2)

assert getInversedNumber(50) == 13
print getInversedNumber(50)
