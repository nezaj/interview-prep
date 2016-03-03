"""
Design an algorithm to print all permutations. Assume all chracters of a string
are unique
"""
### Psuedo-Code
# If length of word is 1, return the word
# otherwise
    # Initialize an array to hold new_combinations
    # Get the last letter of the string
    # Get the combinations of all substrings with one letter less
    # iterate through each combination
        # Iterate through the number of letters to get a position x
            # Create a new string by inserting the character at position x
            # ... add this string to the list of new combinations

# Return the new combinations

def string_permutations(s):
    num_letters = len(s)
    if num_letters == 1:
        return [s]
    else:
        permutations = []
        last_letter = s[-1]
        sub_permutations = string_permutations(s[0:-1])
        for sub_string_perm in sub_permutations:
            for x in range(0, num_letters):
                new_perm = sub_string_perm[0:x] + \
                    last_letter + sub_string_perm[x:]
                permutations.append(new_perm)

    return permutations

t1 = 'abc'
t1_res = ['cba', 'bca', 'bac', 'cab', 'acb', 'abc']
assert string_permutations(t1) == t1_res

t2 = 'a'
t2_res = ['a']
assert string_permutations(t2) == t2_res

print 'All tests pass!'
