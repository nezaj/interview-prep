"""
Word-wrap
"""

# string
# split on spaces
# counter starts at 0
# iterate through list of words
    # get length of that word
    # if length + count > 80
        # get list of words up to start_index
        # update start_index to current position
    # count += length of word

# if start_index != length(words) - 1
# append one more list of remaining words

def word_wrap(astring, width):
    words = astring.split()
    start_index = 0
    lines = []
    for idx, word in enumerate(words):
        wlength = len(word)
        sentence = ' '.join(words[start_index:idx + 1])
        if len(sentence) > width:
            new_sentence = ' '.join(words[start_index:idx])
            lines.append(new_sentence)
            start_index = idx

    lines.append(' '.join(words[start_index:]))

    return lines

t0 = ('Hello World', 5)
e0 = ['Hello', 'World']
assert word_wrap(*t0) == e0

t1 = ('Hello World', 20)
e1 = ['Hello World']
assert word_wrap(*t1) == e1

t2 = ('Hello World', 11)
e2 = ['Hello World']
assert word_wrap(*t2) == e2

t3 = ('Hello World', 10)
e3 = ['Hello', 'World']
assert word_wrap(*t3) == e3

print 'All tests pass!'
