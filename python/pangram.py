# Pangramps
# https://www.hackerrank.com/challenges/pangrams
import re

NUM_ALPHA = 26  # Numer of letters in the alpha bet

def is_panagram(input):
    regex = re.compile('[^a-zA-Z]')
    stripped = regex.sub('', input)
    transformed = [c.lower() for c in stripped]
    if len(set(transformed)) == NUM_ALPHA:
        return 'pangram'
    else:
        return 'not pangram'

t1 = 'We promptly judged antique ivory buckles for the next prize'
t2 = 'We promptly judged antique ivory buckles for the prize'

# print is_panagram(t1)
assert is_panagram(t1) == 'pangram'
assert is_panagram(t2) == 'not pangram'
print 'All tests pass!'
