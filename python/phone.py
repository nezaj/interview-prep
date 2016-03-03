# Standardize mobile number using Decorators
# https://www.hackerrank.com/challenges/standardize-mobile-number-using-decorators

def standardize_phone_numbers(func):
    """
    Decorator which transforms array of phone numbers in standarized
    format
    Format: +91 xxxxx xxxxx
    """
    def inner(phone_numbers):
        standardized = []
        cleaned = func(phone_numbers)
        for phone in cleaned:
            p1, p2 = phone[0:5], phone[5:10]
            transformed = '+91 ' + ''.join(p1) + ' ' + ''.join(p2)
            standardized.append(transformed)
        return standardized

    return inner

@standardize_phone_numbers
def sort_phone_numbers(phone_numbers):
    """ Returns sorted array of phone numbers """
    cleaned = []
    for phone in phone_numbers:
        # If number starts with +91, remove three characters
        if phone[0:3] == '+91':
            cleaned.append(phone[3:])

        # If number starts with 0, remove first character
        elif phone[0] == '0':
            cleaned.append(phone[1:])

        # If number start 91 and length is greater than 10,
        # .. remove first two characters
        elif phone[0:2] == '91' and len(phone) > 10:
            cleaned.append(phone[2:])
        else:
            cleaned.append(phone)

    return sorted(cleaned)

# Input
input_numbers = [
    '07895462130',
    '919875641230',
    '9195969878'
]

output_numbers = [
    '+91 78954 62130',
    '+91 91959 69878',
    '+91 98756 41230'
]

# print sort_phone_numbers(input_numbers)
assert sort_phone_numbers(input_numbers) == output_numbers
print 'All tests pass!'
