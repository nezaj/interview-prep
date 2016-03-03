"""
Design an algorithm and write code to remove the duplicate characters in a string without using any additional buffer NOTE: One or two additional variables are fine An extra copy of the array is not
FOLLOW UP
Write the test cases for this method
"""
def de_dupe(s):
    """ Dedupes a string """
    seen = [False] * 256
    unique = []
    for index, character in enumerate(s):
        seen_index = ord(character)
        if seen[seen_index] is False:
            unique.append(character)
            seen[seen_index] = True

    return ''.join(unique)

assert de_dupe('aabc') == 'abc'
assert de_dupe('moopitymoopity') == 'mopity'
assert de_dupe('lolzatron') == 'lozatrn'
print 'All tests pass!'
