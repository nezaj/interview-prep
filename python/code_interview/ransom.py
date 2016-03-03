"""
A ransom note can be formed by cutting words out of a magazine to form a new sentence How would you figure out if a ransom note (string) can be formed from a given magazine (string)?
"""
from collections import defaultdict

def can_make_ransom(magazine, note):
    magazine_words = [w.lower() for w in magazine.split()]
    note_words = [w.lower() for w in note.split()]

    mag_dict = defaultdict(lambda: 0)

    for note_word in note_words:
        # We already found it before!
        if mag_dict[note_word] > 0:
            mag_dict[note_word] -= 1
            continue
        # We need to search inside magazine_words
        else:
            found = False
            while not found:
                try:
                    candidate = magazine_words.pop()
                except IndexError:
                    # No more candidates to match ransom note
                    # so we know for sure we can't make the ransom note
                    # from this magazine -- hence we return False
                    return False

                if candidate == note_word:
                    found = True
                else:
                    mag_dict[candidate] += 1

    # If we get this far, it means we were able to match all the words
    # in the ransom note so we know we can make the words from this magazine
    return True

magazine = "The cat walks"
success = "walks the cat"
failure = "moop"

assert can_make_ransom(magazine, success) == True
assert can_make_ransom(magazine, failure) == False
